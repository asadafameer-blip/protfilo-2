/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorNotice, setErrorNotice] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorNotice('Please fill out all mandatory fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorNotice('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setIsSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        // Clear success banner after 6s
        setTimeout(() => setIsSuccess(false), 6000);
      } else {
        setErrorNotice(data.error || 'Server rejected the submission.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setErrorNotice('Connection error: could not transmit logs to the full-stack database.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 px-6 max-w-6xl mx-auto font-sans">
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full blur-[100px] accent-glow-cyan pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-[100px] accent-glow-pink pointer-events-none" />

      {/* Main Grid Card layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="contact-outer-grid">
        {/* Left Column Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase bg-[#D4AF37]/5 border border-[#D4AF37]/20 px-3 py-1 rounded-full">
              Get In Touch
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-4">
              Let's build something <span className="neon-text-pink">extraordinary</span> together
            </h2>
            <p className="text-gray-400 mt-4 text-sm leading-relaxed font-light">
              I am currently open to exciting freelance development contracts, design collaborations, and full-time remote engineering positions. Drop a line; my inbox is always online!
            </p>
          </div>

          <div className="space-y-4">
            {/* Direct Email Card */}
            <div className="glass p-5 rounded-2xl border border-white/5 flex gap-4 items-center">
              <div className="w-11 h-11 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0">
                <i className="fa-solid fa-envelope text-base" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-medium">Email Desk</span>
                <a
                  href="mailto:ameersadaf456@gmail.com"
                  className="text-white hover:text-[#D4AF37] text-sm font-semibold transition-colors mt-0.5 inline-block"
                >
                  ameersadaf456@gmail.com
                </a>
              </div>
            </div>

            {/* Direct WhatsApp Call Card */}
            <div className="glass p-5 rounded-2xl border border-white/5 flex gap-4 items-center">
              <div className="w-11 h-11 rounded-xl bg-[#F5E56B]/5 border border-[#F5E56B]/20 flex items-center justify-center text-[#F5E56B] shrink-0">
                <i className="fa-solid fa-phone text-base" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-medium">WhatsApp Call / Chat</span>
                <a
                  href="https://wa.me/923295806515"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#F5E56B] text-sm font-semibold transition-colors mt-0.5 inline-block"
                >
                  +92 329 5806515
                </a>
              </div>
            </div>

            {/* Availability status badge */}
            <div className="glass p-5 rounded-2xl border border-white/5 flex gap-4 items-center bg-[#D4AF37]/5">
              <div className="w-5 h-5 flex items-center justify-center relative shrink-0">
                <div className="w-2.5 h-2.5 bg-[#D4AF37] rounded-full animate-ping absolute" />
                <div className="w-2.5 h-2.5 bg-[#D4AF37] rounded-full" />
              </div>
              <div>
                <span className="text-white text-xs font-semibold tracking-wide block">Freelance availability: Active</span>
                <p className="text-[10px] text-gray-400 mt-0.5">Booking assigns for local & GCC clients</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Modern Glass Input Form */}
        <div className="lg:col-span-7">
          <div className="glass shadow-2xl rounded-2xl p-6 sm:p-10 border border-white/5 relative" id="contact-form-panel">
            {/* Success screen overlay */}
            {isSuccess && (
              <div className="absolute inset-0 bg-[#050404]/95 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center text-center p-8 z-10 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center mb-6 shadow-cyan-glow/10 animate-scale-up">
                  <i className="fa-solid fa-paper-plane text-2xl animate-pulse" />
                </div>
                <h3 className="font-display font-bold text-white text-xl sm:text-2xl tracking-tight">
                  Transmission <span className="neon-text-cyan">Dispatched</span>!
                </h3>
                <p className="text-gray-400 text-sm mt-3 max-w-sm leading-relaxed font-light">
                  Thank you for reaching out. Your message has been routed directly to Sadaf's inbox. A response will be returned shortly.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:border-[#D4AF37] transition-all text-xs font-mono cursor-pointer"
                >
                  Configure new message
                </button>
              </div>
            )}

            <h3 className="font-display font-semibold text-white text-lg sm:text-xl tracking-wide mb-6">
              Send a <span className="neon-text-cyan">Direct Message</span>
            </h3>

            {errorNotice && (
              <div className="mb-6 p-3 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs">
                <i className="fa-solid fa-circle-exclamation mr-2" />
                {errorNotice}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" id="contact-details-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 mb-1.5 uppercase tracking-wider">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Salim Al Mansoor"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/30 transition-all font-sans"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 mb-1.5 uppercase tracking-wider">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. salim@almansoorgroup.ae"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/30 transition-all font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-400 mb-1.5 uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Web portal development / custom quote"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/30 transition-all font-sans"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-400 mb-1.5 uppercase tracking-wider">Message Details *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please describe project scope, timelines, or general enquiries..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/30 transition-all font-sans resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-neon-cyan py-3.5 rounded-xl font-display font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer disabled:bg-white/5 disabled:text-gray-500 disabled:pointer-events-none"
                  id="send-message-submit-button"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4.5 h-4.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Packet...</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-regular fa-paper-plane text-xs" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
