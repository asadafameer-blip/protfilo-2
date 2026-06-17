/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, SocialLink, Testimonial } from './types';

export const developerInfo = {
  name: 'Sadaf Ameer',
  legalName: 'Sadaf Bibi',
  tagline: 'Premium Web Systems Developer | Architectural UX Specialist',
  shortBio: 'Bespoke web developer dedicated to building elite high-fidelity digital systems. Specializing in high-performance React, Next.js, and custom API architectures for international enterprises in UAE, Saudi Arabia, Qatar, and beyond.',
  skills: [
    { name: 'React.js & Next', rating: 97, icon: 'fa-react' },
    { name: 'Express.js & Node', rating: 95, icon: 'fa-node-js' },
    { name: 'TypeScript', rating: 94, icon: 'fa-code' },
    { name: 'MongoDB', rating: 92, icon: 'fa-database' },
    { name: 'API Integration', rating: 96, icon: 'fa-link' },
    { name: 'Tailwind CSS', rating: 98, icon: 'fa-css3-alt' },
  ]
};

export const projectsData: Project[] = [
  {
    id: 'p1',
    title: 'Markazz Shop E-Commerce',
    description: 'An premium e-commerce marketplace platform implementing responsive shopping grids, dynamic filters, responsive cart configurations, and secure checkout simulation.',
    screenshot: 'https://i.postimg.cc/4Hcz6R6w/aurelius.png', // ✅ Direct Link
    techStack: ['React', 'Node.js', 'Tailwind', 'REST API'],
    demoUrl: 'https://markazzshop.com/',
    githubUrl: 'https://github.com/asadafameer-blip',
  },
  {
    id: 'p2',
    title: 'Lazak Store & Finder',
    description: 'A responsive search and discovery network enabling speedy category browsing, sleek transitions, and detailed product showcase layouts.',
    screenshot: 'https://i.postimg.cc/JHXbNCNp/collection.png', // ✅ Direct Link
    techStack: ['React', 'Next.js', 'Framer Motion', 'Tailwind'],
    demoUrl: 'https://lazak.vercel.app/',
    githubUrl: 'https://github.com/asadafameer-blip',
  },
  {
    id: 'p3',
    title: 'Hamme Administrative System',
    description: 'Bespoke administrative dashboard and enterprise system engineered with a backend API container to handle large volume tracking logs in real-time.',
    screenshot: 'https://i.postimg.cc/RJtc7x7d/demo2.png', // ✅ Direct Link
    techStack: ['Express.js', 'MongoDB', 'React', 'REST API'],
    demoUrl: 'https://www.hamme.com.pk/',
    githubUrl: 'https://github.com/asadafameer-blip',
  },
  {
    id: 'p4',
    title: 'Aurelius Food Delivery',
    description: 'Modern food catering directory designed with interactive menu toggles, custom cart count tracking, and speedy checkouts.',
    screenshot: 'https://i.postimg.cc/30GgXQXn/demo3.png', // ✅ Direct Link
    techStack: ['React', 'Tailwind v4', 'Vite', 'State API'],
    demoUrl: 'https://aurelius-food.vercel.app/',
    githubUrl: 'https://github.com/asadafameer-blip',
  },
  {
    id: 'p5',
    title: 'Al-Manzoor Education System',
    description: 'Academic administrative workspace facilitating announcements management, dynamic calendars, and school activities trackers.',
    screenshot: 'https://i.postimg.cc/5QzwBWBK/demo4.png', // ✅ Direct Link
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    demoUrl: 'https://al-manzoor-education-system-gogera.vercel.app/',
    githubUrl: 'https://github.com/asadafameer-blip',
  },
  {
    id: 'p6',
    title: 'Aurelius Collection Gallery',
    description: 'Extravagant design portfolio showcasing structural assets, responsive layouts, search query integrations, and hover graphics.',
    screenshot: 'https://i.postimg.cc/7Jzg3r3W/demo5.png', // ✅ Direct Link
    techStack: ['Next.js', 'Tailwind CSS', 'Motion Hooks', 'CSS Theme'],
    demoUrl: 'https://aurelius-collection.vercel.app/',
    githubUrl: 'https://github.com/asadafameer-blip',
  }
];

export const socialLinksData: SocialLink[] = [
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/sadaf-ameer-654864386',
    iconClass: 'fa-brands fa-linkedin-in',
    label: 'Professional Network',
    colorClass: 'neon-border-cyan hover:shadow-cyan-glow',
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/asadafameer-blip',
    iconClass: 'fa-brands fa-github',
    label: 'Open Source Code',
    colorClass: 'neon-border-pink hover:shadow-pink-glow',
  },
  {
    platform: 'WhatsApp',
    url: 'https://wa.me/923295806515',
    iconClass: 'fa-brands fa-whatsapp',
    label: 'Direct Chat Connection',
    colorClass: 'neon-border-cyan hover:shadow-cyan-glow',
  },
  {
    platform: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61579831676376',
    iconClass: 'fa-brands fa-facebook-f',
    label: 'Social Community',
    colorClass: 'neon-border-pink hover:shadow-pink-glow',
  },
  {
    platform: 'Instagram',
    url: 'https://www.instagram.com/29.ameer.123455/',
    iconClass: 'fa-brands fa-instagram',
    label: 'Visual Moments',
    colorClass: 'neon-border-cyan hover:shadow-cyan-glow',
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 't1',
    clientName: 'Alexander Hayes',
    role: 'Product Director',
    company: 'Synergy Labs',
    feedbackText: 'Working with Sadaf was an absolute pleasure. They took our custom design prototypes and engineered a pixel-perfect, hyper-fast e-commerce experience on Vercel. Highly recommended for creative UI/UX!',
    rating: 5,
  },
  {
    id: 't2',
    clientName: 'Amina Mansoor',
    role: 'Principal Executive',
    company: 'Gogera Academic Council',
    feedbackText: 'Sadaf developed the Al-Manzoor system portal within a tight deadline. The neon-ambient interface was custom tailored to make our administrative information stand out incredibly well on mobile tools!',
    rating: 5,
  },
  {
    id: 't3',
    clientName: 'Klaus Reinhardt',
    role: 'Founder',
    company: 'Aurelius Gastro',
    feedbackText: 'Exceptional Express.js, MongoDB, and React performance skills. Sadaf built both our food catalog application and design gallery with robust grid adapters. The custom transitions on navigation are world-class!',
    rating: 5,
  }
];