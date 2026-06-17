/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import TypingEffect from './components/TypingEffect';
import Chatbot from './components/Chatbot';
import FeedbackCarousel from './components/FeedbackCarousel';
import ProjectCard from './components/ProjectCard';
import SocialHub from './components/SocialHub';
import ContactSection from './components/ContactSection';
import MongoStatus from './components/MongoStatus';
import { developerInfo, projectsData } from './data';
const avatarImg = "https://i.postimg.cc/J4kFZkFv/fiver.png";


export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Socials', href: '#socials' },
    { label: 'Feedback', href: '#feedback' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-gray-100 selection:bg-[#D4AF37]/30 selection:text-white transition-colors duration-500 overflow-x-hidden" id="app-viewport-root">
      {/* Custom Cursor Effects */}
      <CustomCursor />

      {/* Modern Cyber Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-[#0a0a0af0] backdrop-blur-md border-b border-white/5 font-sans" id="main-navigation-header">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 h-14 sm:h-16 md:h-20 flex items-center justify-between">
          {/* Logo Name block */}
          <a href="#home" className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 group" title="Sadaf Ameer Brand">
            <span className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#F5E56B] flex items-center justify-center font-display font-extrabold text-black text-[10px] sm:text-xs md:text-sm tracking-tighter shadow-cyan-glow/25 group-hover:scale-105 transition-transform">
              S
            </span>
            <span className="font-display font-extrabold text-xs sm:text-sm md:text-base tracking-wider text-white group-hover:neon-text-cyan transition-all">
              Sadaf <span className="text-[#F5E56B] hidden xs:inline">Ameer</span>
              <span className="text-[#F5E56B] xs:hidden">A.</span>
            </span>
          </a>

          {/* Desktop Navigation Link Node */}
          <div className="hidden md:flex items-center gap-3 lg:gap-6 xl:gap-8">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[9px] lg:text-[10px] xl:text-xs font-mono font-medium tracking-widest text-gray-400 hover:text-[#D4AF37] uppercase transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="px-2.5 py-1.5 lg:px-3 lg:py-1.5 xl:px-4 xl:py-2 border border-[#D4AF37]/30 rounded-xl bg-[#D4AF37]/5 hover:bg-[#D4AF37] hover:text-black font-display font-bold text-[9px] lg:text-[10px] xl:text-xs tracking-wider transition-all whitespace-nowrap"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile hamburger menu button trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle mobile directory"
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'} text-xs sm:text-sm md:text-base`} />
          </button>
        </div>

        {/* Swipe-down Mobile Overlay Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden glass border-b border-[#D4AF37]/10 py-3 sm:py-4 md:py-6 px-3 sm:px-4 md:px-6 space-y-2.5 sm:space-y-3 md:space-y-4 animate-in slide-in-from-top duration-300">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[10px] sm:text-xs md:text-sm font-mono font-medium uppercase tracking-widest text-gray-300 hover:text-[#D4AF37] py-1.5 sm:py-2 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-1.5 sm:pt-2 md:pt-3">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2 sm:py-2.5 md:py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5E56B] text-black font-display font-bold text-[9px] sm:text-[10px] md:text-xs tracking-wider uppercase transition-transform hover:scale-[1.02]"
              >
                Hire Me
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <header
        id="home"
        className="relative min-h-[100dvh] flex items-center justify-center bg-[#070707] overflow-hidden cyber-grid animate-grid px-3 sm:px-4 md:px-6 pt-14 sm:pt-16 md:pt-20"
      >
        {/* Glow ambient clusters */}
        <div className="absolute top-1/4 left-1/4 w-[150px] sm:w-[200px] md:w-[300px] lg:w-[350px] h-[150px] sm:h-[200px] md:h-[300px] lg:h-[350px] rounded-full blur-[80px] sm:blur-[100px] md:blur-[140px] bg-[#D4AF37]/10 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[150px] sm:w-[200px] md:w-[300px] lg:w-[350px] h-[150px] sm:h-[200px] md:h-[300px] lg:h-[350px] rounded-full blur-[80px] sm:blur-[100px] md:blur-[140px] bg-[#F5E56B]/10 pointer-events-none" />

        {/* Network Constellation Layer */}
        <ParticleBackground />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-3 sm:space-y-4 md:space-y-6 px-1 sm:px-2">
          <span className="text-[8px] sm:text-[9px] md:text-xs font-mono tracking-[0.12em] sm:tracking-[0.15em] md:tracking-[0.25em] text-[#D4AF37] uppercase">
            Protocol Initialized // Welcome
          </span>

          <h1 className="font-display font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white tracking-tight leading-[1.1] sm:leading-[1.15] md:leading-none">
            Sadaf <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F5E56B]">Ameer</span>
          </h1>

          {/* Typing tagline */}
          <div className="py-0.5 sm:py-1 md:py-2">
            <TypingEffect />
          </div>

          <p className="text-gray-400 text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto font-light leading-relaxed px-1 sm:px-2">
            I customize and craft clean, fast, and responsive digital apps on Vercel. 
            Blending solid backend functionality with glowing neon design components.
          </p>

          <div className="pt-3 sm:pt-4 md:pt-6 lg:pt-8 flex flex-col xs:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4">
            <a href="#projects" className="w-full xs:w-auto btn-neon-cyan px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-xl font-display font-bold text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest text-center transition-all hover:scale-105">
              View My Work
            </a>
            <a href="#contact" className="w-full xs:w-auto btn-glass px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-xl font-display font-semibold text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest text-center transition-all hover:scale-105">
              Contact Desk &rarr;
            </a>
          </div>
        </div>

        {/* Scroll helper anchor tag */}
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 sm:gap-1 md:gap-2 hover:opacity-100 opacity-60 transition-opacity">
          <span className="text-[6px] sm:text-[7px] md:text-[8px] lg:text-[10px] font-mono uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] text-gray-500">Scroll down</span>
          <div className="w-3 h-5 sm:w-3.5 sm:h-6 md:w-4 md:h-6 lg:w-5 lg:h-8 rounded-full border border-gray-600 flex justify-center p-0.5 sm:p-1 md:p-1.5">
            <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-duration:1.2s]" />
          </div>
        </div>
      </header>

      {/* ABOUT ME SECTION */}
      <section id="about" className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-6 max-w-6xl mx-auto font-sans">
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-36 sm:w-48 md:w-64 h-36 sm:h-48 md:h-64 blur-[80px] sm:blur-[100px] md:blur-[120px] accent-glow-pink pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Avatar side card frame */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative group/avatar w-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[320px]">
              {/* Pulsing neon frames */}
              <div className="absolute -inset-0.5 sm:-inset-1 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D4AF37] to-[#F5E56B] opacity-20 sm:opacity-25 blur-lg sm:blur-xl group-hover/avatar:opacity-35 sm:group-hover/avatar:opacity-45 transition-all duration-500" />
              <div className="absolute -inset-[1.5px] sm:-inset-[2px] md:-inset-[3px] rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D4AF37] to-[#F5E56B] opacity-15 sm:opacity-20" />
              
              <div className="relative glass p-2 sm:p-2.5 md:p-3 lg:p-3.5 rounded-2xl sm:rounded-3xl shadow-2xl">
                <img
                  src={avatarImg}
                  alt="Sadaf Ameer Digital Art Portait"
                  className="rounded-xl sm:rounded-2xl w-full object-cover aspect-square grayscale-[20%] group-hover/avatar:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                <div className="mt-2 sm:mt-3 md:mt-4 text-center">
                  <h4 className="font-display font-extrabold text-white text-xs sm:text-sm md:text-base">Sadaf Ameer</h4>
                  <p className="text-[7px] sm:text-[8px] md:text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider mt-0.5">
                    Creative Web Developer
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills competence and bio side */}
          <div className="md:col-span-7 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
            <div>
              <h2 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white tracking-tight mb-1.5 sm:mb-2 md:mb-3">
                About <span className="neon-text-cyan">Me</span>
              </h2>
              <div className="w-10 sm:w-12 md:w-16 h-0.5 sm:h-1 bg-gradient-to-r from-[#D4AF37] to-[#F5E56B] rounded-full" />
              <p className="text-gray-300 mt-3 sm:mt-4 md:mt-6 text-[10px] xs:text-xs sm:text-sm md:text-base leading-relaxed font-light">
                {developerInfo.shortBio}
              </p>
            </div>

            {/* Core Skills Competency progression bars */}
            <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
              <h3 className="font-display font-semibold text-white text-[9px] sm:text-[10px] md:text-sm tracking-wider uppercase mb-0.5 sm:mb-1 md:mb-2">
                Core Competencies & Stack
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
                {developerInfo.skills.map((skill) => (
                  <div key={skill.name} className="glass p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-white/5 space-y-1 sm:space-y-1.5 md:space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] sm:text-[10px] md:text-sm font-semibold text-white tracking-wide">
                        {skill.name}
                      </span>
                      <span className="text-[7px] sm:text-[8px] md:text-[10px] font-mono text-gray-400">
                        {skill.rating}%
                      </span>
                    </div>

                    {/* Progress Slider track visualizer */}
                    <div className="h-0.5 sm:h-1 md:h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5E56B] transition-all"
                        style={{ width: `${skill.rating}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE PROJECTS SECTION */}
      <section id="projects" className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-6 max-w-7xl mx-auto font-sans border-t border-white/5">
        <div className="absolute top-1/3 left-10 w-40 sm:w-50 md:w-60 lg:w-80 h-40 sm:h-50 md:h-60 lg:h-80 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] bg-[#00f0ff]/5 pointer-events-none" />

        {/* Title Block */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white tracking-tight mb-1.5 sm:mb-2 md:mb-3">
            Live <span className="neon-text-cyan">Projects</span> Showcase
          </h2>
          <div className="w-10 sm:w-12 md:w-16 h-0.5 sm:h-1 bg-gradient-to-r from-[#D4AF37] to-[#F5E56B] mx-auto rounded-full" />
          <p className="text-gray-400 mt-2.5 sm:mt-3 md:mt-4 max-w-lg mx-auto text-[10px] xs:text-xs sm:text-sm leading-relaxed px-1 sm:px-2">
            A hand-picked selection of full-scale professional e-commerce interfaces, portfolios, finders, and portals deployed with high speed metrics.
          </p>
        </div>

        {/* Project Card responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8" id="projects-feed-grid">
          {projectsData.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </section>

      {/* MONGO DB REAL-TIME CLUSTER & EXPRESS API INTEGRATION MONITOR */}
      <div className="border-t border-white/5 bg-black/30">
        <MongoStatus />
      </div>

      {/* SOCIAL HUB INTERACTION SECTION */}
      <div className="border-t border-white/5 bg-[#080808]">
        <SocialHub />
      </div>

      {/* CLIENT FEEDBACK TESTIMONIAL VIEW CAROUSEL */}
      <div className="border-t border-white/5">
        <FeedbackCarousel />
      </div>

      {/* MODERN CONTACT SECTION FORM */}
      <div className="border-t border-white/5 bg-[#080808]">
        <ContactSection />
      </div>

      {/* FLOAT CHATBOT / AI CHAT ASSISTANT ASSISTANCE COMPONENT */}
      <Chatbot />

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-[#030303] py-6 sm:py-8 md:py-10 lg:py-12 px-3 sm:px-4 md:px-6 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-6 text-center md:text-left">
          {/* Logo Name brand and meta */}
          <div>
            <h4 className="font-display font-extrabold tracking-widest text-[#D4AF37] text-[10px] sm:text-xs md:text-sm">
              Sadaf Ameer <span className="text-gray-400 font-sans text-[7px] sm:text-[8px] md:text-xs">({developerInfo.legalName})</span>
            </h4>
            <p className="text-gray-500 text-[6px] sm:text-[7px] md:text-[8px] lg:text-[10px] font-mono mt-0.5 sm:mt-1 uppercase tracking-wider">
              Professional: Sadaf Ameer &nbsp;|&nbsp; Legal: {developerInfo.legalName}
            </p>
          </div>

          <p className="text-gray-500 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-light order-3 md:order-none px-2">
            &copy; {new Date().getFullYear()} Sadaf Ameer. All international rights reserved. Deployed with Luxury Gold Theme.
          </p>

          {/* Simple row of interactive social icons */}
          <div className="flex gap-2.5 sm:gap-3 md:gap-4">
            <a
              href="https://www.linkedin.com/in/sadaf-ameer-654864386"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#D4AF37] transition-colors"
              title="LinkedIn Profile"
            >
              <i className="fa-brands fa-linkedin text-[10px] sm:text-xs md:text-sm" />
            </a>
            <a
              href="https://github.com/asadafameer-blip"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#F5E56B] transition-colors"
              title="GitHub Repositories"
            >
              <i className="fa-brands fa-github text-[10px] sm:text-xs md:text-sm" />
            </a>
            <a
              href="https://wa.me/923295806515"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#25d366] transition-colors"
              title="WhatsApp Chat Helpline"
            >
              <i className="fa-brands fa-whatsapp text-[10px] sm:text-xs md:text-sm" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}