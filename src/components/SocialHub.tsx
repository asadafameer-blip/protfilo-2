/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { socialLinksData } from '../data';

export default function SocialHub() {
  const scrollToFeedback = () => {
    const feedbackSection = document.getElementById('feedback');
    if (feedbackSection) {
      feedbackSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Smoothly toggle feedback form visibility
    setTimeout(() => {
      const toggleBtn = document.getElementById('toggle-feedback-submission-form');
      if (toggleBtn) {
        // Only click if form isn't already open or trigger manually
        const form = document.querySelector('form[class*="feedback-submission-form"]');
        if (!form) {
          toggleBtn.click();
        }
      }
    }, 850);
  };

  return (
    <section id="socials" className="relative py-20 px-6 max-w-6xl mx-auto font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[120px] bg-[#D4AF37]/5 pointer-events-none" />

      {/* Title Header */}
      <div className="text-center mb-16">
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-3">
          My <span className="neon-text-cyan">Social Hub</span>
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-[#D4AF37] to-[#F5E56B] mx-auto rounded-full" />
        <p className="text-gray-400 mt-4 max-w-md mx-auto text-sm leading-relaxed">
          Connect with me instantly across primary channels or leave your feedback directly below.
        </p>
      </div>

      {/* Grid Display Board */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" id="social-cards-grid">
        {socialLinksData.map((link) => {
          // Select custom brand gradients for hover
          let hoverBorder = '';
          let iconColor = '';
          if (link.platform === 'LinkedIn') {
            hoverBorder = 'hover:border-[#0077b5] hover:shadow-[0_0_15px_rgba(0,119,181,0.25)]';
            iconColor = 'text-[#0077b5]';
          } else if (link.platform === 'GitHub') {
            hoverBorder = 'hover:border-[#fafafa] hover:shadow-[0_0_15px_rgba(250,250,250,0.15)]';
            iconColor = 'text-[#fafafa]';
          } else if (link.platform === 'WhatsApp') {
            hoverBorder = 'hover:border-[#25d366] hover:shadow-[0_0_15px_rgba(37,211,102,0.25)]';
            iconColor = 'text-[#25d366]';
          } else if (link.platform === 'Facebook') {
            hoverBorder = 'hover:border-[#1877f2] hover:shadow-[0_0_15px_rgba(24,119,242,0.25)]';
            iconColor = 'text-[#1877f2]';
          } else if (link.platform === 'Instagram') {
            hoverBorder = 'hover:border-[#e1306c] hover:shadow-[0_0_15px_rgba(225,48,108,0.25)]';
            iconColor = 'text-[#e1306c]';
          }

          return (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass p-5 rounded-2xl flex flex-col items-center justify-center text-center group cursor-pointer transition-all duration-300 border border-white/5 ${hoverBorder}`}
              title={`Visit Sadaf's ${link.platform}`}
            >
              {/* Icon Container with glowing base ring */}
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-3.5 group-hover:bg-white/10 transition-colors border border-white/5">
                <i className={`${link.iconClass} text-xl text-gray-300 group-hover:${iconColor} transition-all group-hover:scale-110 drop-shadow-[0_0_4px_currentColor]`} />
              </div>
              <h3 className="text-white font-medium text-xs sm:text-sm tracking-wide mb-1">
                {link.platform}
              </h3>
              <p className="text-[10px] text-gray-500 font-mono scale-95 uppercase group-hover:text-gray-300 transition-colors">
                Connect
              </p>
            </a>
          );
        })}

        {/* Custom trigger card for testimonial feedback registration */}
        <button
          onClick={scrollToFeedback}
          className="col-span-2 sm:col-span-1 md:col-span-3 lg:col-span-6 glass border border-[#D4AF37]/15 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4 cursor-pointer hover:border-[#D4AF37]/50 hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all duration-300"
          id="testimonial-trigger-card"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shadow-pink-glow/5">
               <i className="fa-solid fa-comment-medical text-lg" />
            </div>
            <div>
              <h3 className="text-white font-display font-semibold text-sm tracking-wide">
                Client Review Desk
              </h3>
              <p className="text-gray-400 text-xs mt-0.5">
                Have you worked on a coding project or custom application with Sadaf? Leave your feedback!
              </p>
            </div>
          </div>
          <span className="text-xs px-3 py-1.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#F5E56B] group-hover:bg-[#D4AF37] group-hover:text-black font-mono transition-colors font-medium">
            Write Feedback &rarr;
          </span>
        </button>
      </div>
    </section>
  );
}
