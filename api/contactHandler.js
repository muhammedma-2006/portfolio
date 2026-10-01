/**
 * Shared Contact Form Request Handler
 * Used by both Vite local dev server and Vercel/Netlify serverless endpoints.
 */

// Simple in-memory rate limiter (5 requests per 10 minutes per IP)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

/**
 * Checks if the client IP is rate limited
 * @param {string} ip 
 * @returns {boolean}
 */
function isRateLimited(ip) {
  if (!ip) return false;
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Filter out expired timestamps
  const validTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  
  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);

  // Periodic cleanup if map grows too large
  if (rateLimitMap.size > 1000) {
    for (const [key, times] of rateLimitMap.entries()) {
      if (times.every(t => now - t >= RATE_LIMIT_WINDOW_MS)) {
        rateLimitMap.delete(key);
      }
    }
  }

  return false;
}

/**
 * Strips carriage returns and newlines to prevent email header injection
 * @param {string} str 
 * @returns {string}
 */
function sanitizeSingleLine(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[\r\n\t]/g, ' ').trim();
}

/**
 * Format date in clean, readable format e.g. "30 September 2026, 7:30 PM"
 * @param {Date} date 
 * @returns {string}
 */
function formatSubmissionDate(date = new Date()) {
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  return date.toLocaleString('en-US', options);
}

/**
 * Core handler logic for POST /api/contact
 * @param {Object} params
 * @param {string} params.method
 * @param {Object} params.body
 * @param {string} params.clientIp
 * @param {Object} params.env
 * @returns {Promise<{ status: number, body: Object }>}
 */
export async function handleContactSubmission({ method, body, clientIp, env = process.env }) {
  // 1. Only allow POST requests
  if (method !== 'POST') {
    return {
      status: 405,
      body: { success: false, message: 'Method Not Allowed. Use POST.' }
    };
  }

  // 2. Check rate limit
  if (isRateLimited(clientIp)) {
    return {
      status: 429,
      body: { 
        success: false, 
        message: 'Too many messages sent. Please wait a few minutes before trying again.' 
      }
    };
  }

  // 3. Extract and parse body
  const { name, email, subject, message } = body || {};

  // 4. Server-side validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return {
      status: 400,
      body: { success: false, message: 'Please provide a valid name (at least 2 characters).' }
    };
  }

  if (name.trim().length > 100) {
    return {
      status: 400,
      body: { success: false, message: 'Name must be 100 characters or fewer.' }
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    return {
      status: 400,
      body: { success: false, message: 'Please provide a valid email address.' }
    };
  }

  if (email.trim().length > 254) {
    return {
      status: 400,
      body: { success: false, message: 'Email address is too long.' }
    };
  }

  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    return {
      status: 400,
      body: { success: false, message: 'Message must be at least 5 characters long.' }
    };
  }

  // Prevent excessively long messages
  if (message.trim().length > 5000) {
    return {
      status: 400,
      body: { success: false, message: 'Message is too long. Maximum allowed is 5,000 characters.' }
    };
  }

  // 5. Sanitize fields
  const sanitizedName = sanitizeSingleLine(name);
  const sanitizedEmail = sanitizeSingleLine(email);
  const rawSubject = typeof subject === 'string' && subject.trim() 
    ? subject.trim() 
    : `Portfolio Contact from ${sanitizedName}`;
  const sanitizedSubject = sanitizeSingleLine(rawSubject).slice(0, 200);
  const trimmedMessage = message.trim();
  const submissionTime = formatSubmissionDate(new Date());

  // 6. Check email credentials
  const apiKey = env.EMAIL_API_KEY || process.env.EMAIL_API_KEY;
  const adminEmail = env.ADMIN_EMAIL || process.env.ADMIN_EMAIL || 'muhammedmaponnani@gmail.com';
  const fromEmail = env.EMAIL_FROM || process.env.EMAIL_FROM || 'Muhammed Portfolio <onboarding@resend.dev>';

  if (!apiKey) {
    console.error('[Contact API Error]: EMAIL_API_KEY is not configured in environment variables.');
    return {
      status: 500,
      body: { 
        success: false, 
        message: 'Email service is currently misconfigured. Please reach out via direct email.' 
      }
    };
  }

  // 7. Compose Email Content
  const textContent = `New Portfolio Contact
Name: ${sanitizedName}
Email: ${sanitizedEmail}
Subject: ${sanitizedSubject}
Message:
${trimmedMessage}

Submitted:
${submissionTime}`;

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Portfolio Contact</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #080c14; color: #f8fafc; padding: 24px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #0f1624; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden;">
    
    <div style="background-color: #131c2e; padding: 20px 24px; border-bottom: 1px solid #1e293b;">
      <h2 style="margin: 0; color: #38bdf8; font-size: 20px;">New Portfolio Contact</h2>
      <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 13px;">Received via portfolio contact form</p>
    </div>

    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; color: #94a3b8; width: 100px; font-weight: 600; font-size: 13px;">Name:</td>
          <td style="padding: 8px 0; color: #f8fafc; font-size: 14px;"><strong>${escapeHtml(sanitizedName)}</strong></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #94a3b8; font-weight: 600; font-size: 13px;">Email:</td>
          <td style="padding: 8px 0; color: #38bdf8; font-size: 14px;">
            <a href="mailto:${escapeHtml(sanitizedEmail)}" style="color: #38bdf8; text-decoration: none;">${escapeHtml(sanitizedEmail)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #94a3b8; font-weight: 600; font-size: 13px;">Subject:</td>
          <td style="padding: 8px 0; color: #f8fafc; font-size: 14px;">${escapeHtml(sanitizedSubject)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #94a3b8; font-weight: 600; font-size: 13px;">Submitted:</td>
          <td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">${escapeHtml(submissionTime)}</td>
        </tr>
      </table>

      <div style="margin-top: 16px; padding: 16px; background-color: #080c14; border: 1px solid #1e293b; border-radius: 8px;">
        <div style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; font-weight: 600;">Message Content:</div>
        <div style="color: #f1f5f9; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(trimmedMessage)}</div>
      </div>
    </div>

    <div style="background-color: #080c14; padding: 16px 24px; border-top: 1px solid #1e293b; text-align: center; font-size: 12px; color: #64748b;">
      Direct reply will send to <strong>${escapeHtml(sanitizedEmail)}</strong>
    </div>

  </div>
</body>
</html>`;

  // 8. Dispatch via Resend API
  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [adminEmail],
        reply_to: sanitizedEmail,
        subject: `New Portfolio Contact: ${sanitizedSubject}`,
        text: textContent,
        html: htmlContent,
      }),
    });

    const resData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error('[Contact API Resend Error]:', resData);
      const safeMessage = resData?.message && resData.message.includes('domain')
        ? 'Email service verification pending. Please contact directly via email.'
        : 'Failed to send notification email. Please try again or reach out directly.';
      return {
        status: resendResponse.status >= 400 && resendResponse.status < 500 ? 400 : 502,
        body: { success: false, message: safeMessage }
      };
    }

    return {
      status: 200,
      body: { 
        success: true, 
        message: 'Thank you for reaching out! Your message has been received.' 
      }
    };
  } catch (error) {
    console.error('[Contact API Network Error]:', error.message || error);
    return {
      status: 500,
      body: { 
        success: false, 
        message: 'Internal server error while processing your request. Please try again later.' 
      }
    };
  }
}

/**
 * Basic HTML escaping for safe email rendering
 * @param {string} str 
 * @returns {string}
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
