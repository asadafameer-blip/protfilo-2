/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { Testimonial } from '../types';
import { initialTestimonials } from '../data';

export default function FeedbackCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    role: '',
    company: '',
    feedbackText: '',
    rating: 5,
  });
  const [msgNotice, setMsgNotice] = useState('');

  // Fetch testimonials from real backend on mount
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonials');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setTestimonials(data);
          }
        }
      } catch (err) {
        console.error('Failed to query testimonials API:', err);
      }
    };
    fetchTestimonials();
  }, []);

  // Auto sliding carousel rotation every 6 seconds
  useEffect(() => {
    if (isSubmitOpen || testimonials.length === 0) return; // Freeze slide while user is typing feedback

    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length, isSubmitOpen]);

  const handleNext = () => {
    if (testimonials.length === 0) return;
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleSubmitFeedback = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.feedbackText) {
      setMsgNotice('Name and feedback description are required.');
      return;
    }

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Fetch fresh testimonials list from backend to include our new insert
        const refreshRes = await fetch('/api/testimonials');
        if (refreshRes.ok) {
          const freshData = await refreshRes.json();
          setTestimonials(freshData);
        } else {
          // Fallback to local push if refresh failed
          const fallbackNew: Testimonial = data.document || {
            id: `client-${Date.now()}`,
            ...formData
          };
          setTestimonials((prev) => [fallbackNew, ...prev]);
        }
        
        setActiveIdx(0); // View the newly added review instantly
        setIsSubmitOpen(false);
        setMsgNotice('Thank you! Your testimonial has been posted live onto the MongoDB instance.');
      } else {
        setMsgNotice(data.error || 'Connection failed.');
      }
    } catch (err) {
      console.error('Error posting review:', err);
      setMsgNotice('offline error: could not insert document.');
    }

    // Clear form
    setFormData({
      clientName: '',
      role: '',
      company: '',
      feedbackText: '',
      rating: 5,
    });

    setTimeout(() => setMsgNotice(''), 5000);
  };

  return (
    <section id="feedback" className="relative py-20 px-6 max-w-5xl mx-auto font-sans">
      <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full blur-[100px] accent-glow-pink pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full blur-[100px] accent-glow-cyan pointer-events-none" />

      {/* Title block */}
      <div className="text-center mb-16">
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-3">
          Client <span className="neon-text-pink">Feedback</span>
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-[#D4AF37] to-[#F5E56B] mx-auto rounded-full" />
        <p className="text-gray-400 mt-4 max-w-md mx-auto text-sm leading-relaxed">
          Invaluable testimonials from our esteemed international and GCC clients.
        </p>
      </div>

      {msgNotice && (
        <div className="max-w-2xl mx-auto mb-6 p-3 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#F5E56B] text-center text-xs tracking-wide">
          <i className="fa-solid fa-circle-check mr-2" />
          {msgNotice}
        </div>
      )}

      {/* Main Slider Panel */}
      <div className="relative max-w-3xl mx-auto" id="testimonial-slider-container">
        <div className="glass shadow-2xl rounded-2xl p-8 sm:p-12 relative overflow-hidden border border-white/5 transition-all duration-500">
          {/* Cyber accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/10" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/10" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#F5E56B]" />

          {/* Large decorative quotation mark */}
          <span className="absolute -top-4 -left-2 text-9xl text-white/[0.03] font-serif select-none pointer-events-none">“</span>

          <div className="flex flex-col items-center text-center">
            {/* Star Rating render */}
            <div className="flex gap-1 mb-5">
              {Array.from({ length: testimonials[activeIdx].rating }).map((_, i) => (
                <i key={i} className="fa-solid fa-star text-amber-500 text-sm drop-shadow-[0_0_6px_rgba(212,175,55,0.6)]" />
              ))}
            </div>

            {/* Testimonial body */}
            <blockquote className="text-gray-200 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-8 italic">
              "{testimonials[activeIdx].feedbackText}"
            </blockquote>

            {/* Author details */}
            <cite className="not-italic">
              <h4 className="font-display font-bold text-white text-base tracking-wide">
                {testimonials[activeIdx].clientName}
              </h4>
              <p className="text-xs text-[#D4AF37] mt-0.5 font-mono">
                {testimonials[activeIdx].role} @ <span className="text-gray-400 font-sans">{testimonials[activeIdx].company}</span>
              </p>
            </cite>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex justify-between items-center mt-8">
          {/* Slider pagination */}
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIdx === idx ? 'w-6 bg-[#D4AF37]' : 'w-2 bg-white/20'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5 transition-all text-xs flex items-center justify-center cursor-pointer"
              title="Previous feedback"
            >
              <i className="fa-solid fa-arrow-left" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-[#F5E56B] hover:border-[#F5E56B]/30 hover:bg-[#F5E56B]/5 transition-all text-xs flex items-center justify-center cursor-pointer"
              title="Next feedback"
            >
              <i className="fa-solid fa-arrow-right" />
            </button>
          </div>
        </div>
      </div>

      {/* Button to open Feedback Input Drawer */}
      <div className="text-center mt-12">
        <button
          onClick={() => setIsSubmitOpen(!isSubmitOpen)}
          className={`px-5 py-3 rounded-xl font-display font-medium text-xs tracking-wider transition-all cursor-pointer ${
            isSubmitOpen 
              ? 'bg-red-500/10 border border-red-500/30 text-red-400' 
              : 'btn-neon-pink'
          }`}
          id="toggle-feedback-submission-form"
        >
          {isSubmitOpen ? 'Cancel Feedback Action' : 'Write Personal Review'}
        </button>
      </div>

      {/* Dynamic Feedback Creator Panel */}
      {isSubmitOpen && (
        <div className="max-w-xl mx-auto mt-8 glass rounded-2xl p-6 sm:p-8 border border-[#D4AF37]/40 animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="font-display font-semibold text-white text-lg tracking-wide mb-4">
            Leave Your <span className="neon-text-pink">Feedback</span>
          </h3>
          <form onSubmit={handleSubmitFeedback} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-gray-400 mb-1.5 uppercase tracking-wider">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="e.g. Salim Al Mansoor"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-gray-400 mb-1.5 uppercase tracking-wider">Designation / Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Managing Director"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-gray-400 mb-1.5 uppercase tracking-wider">Company Name</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Abu Dhabi Digital Hub"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">Stars Rating</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                >
                  <option value={5}>★★★★★ (5 Stars)</option>
                  <option value={4}>★★★★☆ (4 Stars)</option>
                  <option value={3}>★★★☆☆ (3 Stars)</option>
                  <option value={2}>★★☆☆☆ (2 Stars)</option>
                  <option value={1}>★☆☆☆☆ (1 Star)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-gray-400 mb-1.5 uppercase tracking-wider">Detailed Feedback *</label>
              <textarea
                required
                rows={4}
                value={formData.feedbackText}
                onChange={(e) => setFormData({ ...formData, feedbackText: e.target.value })}
                placeholder="What was it like designing / developing projects with Sadaf Ameer?"
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-neon-cyan py-3 rounded-xl font-display font-semibold text-xs tracking-wider uppercase"
              id="submit-testimonial-btn"
            >
              Post Live Testimonial
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
