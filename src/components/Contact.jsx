import React, { useState } from 'react';
import { personalData, contactData } from '../data/portfolioData';
import { 
  Mail, 
  Copy, 
  Check, 
  Send, 
  MapPin, 
  MessageSquare,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export default function Contact() {
  const { socialLinks, location } = personalData;
  const [copied, setCopied] = useState(false);
  
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(socialLinks.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error message when user starts retyping
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Client-side validation
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedSubject = formData.subject.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || trimmedName.length < 2) {
      setStatus('error');
      setErrorMessage('Please enter your name (at least 2 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!trimmedMessage || trimmedMessage.length < 5) {
      setStatus('error');
      setErrorMessage('Please enter a message (at least 5 characters).');
      return;
    }

    if (trimmedMessage.length > 5000) {
      setStatus('error');
      setErrorMessage('Message is too long. Please keep it under 5,000 characters.');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          subject: trimmedSubject,
          message: trimmedMessage,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrorMessage('');
      } else {
        setStatus('error');
        setErrorMessage(
          data?.message || 'Failed to send message. Please try again or reach out directly via email.'
        );
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        'A network error occurred. Please check your connection or reach out directly via email.'
      );
    }
  };

  return (
    <section 
      id="contact" 
      className="py-20 lg:py-28 relative border-t border-slate-850"
      aria-label="Contact Muhammed M A"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-sky-400 bg-sky-950/50 border border-sky-800/40 px-3 py-1 rounded-full mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {contactData.heading}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
            {contactData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Left Column: Direct Info & Social Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-surface/70 border border-slate-800/80 space-y-6">
              
              {/* Email Card with Quick Copy */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
                  Direct Email
                </span>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center space-x-2.5 truncate mr-2">
                    <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="text-sm font-mono text-slate-200 truncate">
                      {socialLinks.email}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 shrink-0"
                    title="Copy email to clipboard"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <span className="flex items-center text-xs text-emerald-400 font-sans">
                        <Check className="w-3.5 h-3.5 mr-1" /> Copied
                      </span>
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Social Channels */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3 font-semibold">
                  Developer Profiles
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-200 transition-all focus-visible:ring-2 focus-visible:ring-blue-400"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-medium">GitHub</span>
                  </a>

                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-200 transition-all focus-visible:ring-2 focus-visible:ring-blue-400"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-medium">LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Location & Availability Note */}
              <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-400 space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>Located in {location} • Open to Remote & In-Person Roles</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  {contactData.emailNote}
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Accessible Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-surface/70 border border-slate-800/80 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-1">
                Send a Message
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Have a question or looking to collaborate? Fill out the details below.
              </p>

              {status === 'success' ? (
                <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-semibold text-white">
                    Message Sent Successfully
                  </h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Thank you for reaching out! Your message has been sent to Muhammed's inbox, and he will review your inquiry and get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle');
                      setErrorMessage('');
                    }}
                    className="mt-2 text-xs text-blue-400 hover:text-blue-300 underline font-medium"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Error Notification Alert */}
                  {status === 'error' && errorMessage && (
                    <div 
                      className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 flex items-start space-x-3 text-rose-300 text-xs sm:text-sm animate-fadeIn"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span className="font-semibold text-rose-200 block mb-0.5">Submission Error</span>
                        <span className="text-rose-300/90 leading-relaxed">{errorMessage}</span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label 
                        htmlFor="contact-name" 
                        className="block text-xs font-mono font-medium text-slate-300 mb-1.5"
                      >
                        Your Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        disabled={status === 'submitting'}
                        placeholder="Alex Morgan"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder:text-slate-600 focus:border-blue-500 focus:bg-slate-950 transition-colors focus-visible:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label 
                        htmlFor="contact-email" 
                        className="block text-xs font-mono font-medium text-slate-300 mb-1.5"
                      >
                        Your Email <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        disabled={status === 'submitting'}
                        placeholder="alex@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder:text-slate-600 focus:border-blue-500 focus:bg-slate-950 transition-colors focus-visible:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label 
                      htmlFor="contact-subject" 
                      className="block text-xs font-mono font-medium text-slate-300 mb-1.5"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      placeholder="Internship opportunity / Project inquiry"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder:text-slate-600 focus:border-blue-500 focus:bg-slate-950 transition-colors focus-visible:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label 
                      htmlFor="contact-message" 
                      className="block text-xs font-mono font-medium text-slate-300 mb-1.5"
                    >
                      Message <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      placeholder="Hi Muhammed, I came across your Blood Link and PocketFlow projects..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder:text-slate-600 focus:border-blue-500 focus:bg-slate-950 transition-colors focus-visible:outline-none resize-y min-h-[110px] disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800/70 disabled:cursor-not-allowed text-white font-medium text-sm transition-all shadow-md shadow-blue-900/30 hover:shadow-glow focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
