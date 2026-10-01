import { handleContactSubmission } from './contactHandler.js';

/**
 * Vercel Serverless Function Handler for POST /api/contact
 * @param {import('http').IncomingMessage} req 
 * @param {import('http').ServerResponse} res 
 */
export default async function handler(req, res) {
  // CORS configuration for allowed origins (if called externally or in development)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Extract client IP (handle proxies & Vercel forwarded headers)
  const forwardedFor = req.headers['x-forwarded-for'];
  const clientIp = typeof forwardedFor === 'string'
    ? forwardedFor.split(',')[0].trim()
    : req.socket?.remoteAddress || '127.0.0.1';

  try {
    // Body is automatically parsed by Vercel Node runtime for application/json
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ success: false, message: 'Invalid JSON payload.' });
      }
    }

    const result = await handleContactSubmission({
      method: req.method,
      body: body || {},
      clientIp,
      env: process.env,
    });

    return res.status(result.status).json(result.body);
  } catch (error) {
    console.error('[Vercel Serverless Contact Function Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while processing your request.',
    });
  }
}
