/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  screenshot: string;
  techStack: string[];
  demoUrl: string;
  githubUrl: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  feedbackText: string;
  rating: number;
}

export interface SocialLink {
  platform: string;
  url: string;
  iconClass: string;
  label: string;
  colorClass: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}
