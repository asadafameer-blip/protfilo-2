/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [follower, setFollower] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if on touch screen
    const checkViewport = () => {
      const coarseMedia = window.matchMedia('(pointer: coarse)');
      setIsMobile(coarseMedia.matches || window.innerWidth < 768);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);

    if (isMobile) {
      return () => window.removeEventListener('resize', checkViewport);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setIsHidden(false);
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    // Hover state trackers
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'button, a, input, textarea, select, [role="button"], .interactive-card'
      );
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovered(true));
        el.addEventListener('mouseleave', () => setIsHovered(false));
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Set up brief timer to register dynamically added clickable nodes
    const timeoutId = setTimeout(addHoverListeners, 1000);

    return () => {
      window.removeEventListener('resize', checkViewport);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timeoutId);
    };
  }, [isMobile]);

  // Smooth follow interpolation effect inside requestAnimationFrame
  useEffect(() => {
    if (isMobile || isHidden) return;

    let animFrame: number;
    
    const followMouse = () => {
      setFollower((prev) => {
        const ease = 0.15; // interpolation strength
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * ease,
          y: prev.y + dy * ease,
        };
      });
      animFrame = requestAnimationFrame(followMouse);
    };

    animFrame = requestAnimationFrame(followMouse);
    return () => cancelAnimationFrame(animFrame);
  }, [position, isMobile, isHidden]);

  if (isMobile || isHidden) return null;

  return (
    <>
      {/* Glow dot follower */}
      <div
        id="cursor-dot-follower-halo"
        className="cursor-dot-follower"
        style={{
          left: `${follower.x}px`,
          top: `${follower.y}px`,
          width: isHovered ? '42px' : '24px',
          height: isHovered ? '42px' : '24px',
          borderColor: isHovered ? '#F5E56B' : '#D4AF37',
          backgroundColor: isHovered ? 'rgba(245, 229, 107, 0.05)' : 'transparent',
          boxShadow: isHovered 
            ? '0 0 15px rgba(245, 229, 107, 0.4)' 
            : '0 0 10px rgba(212, 175, 55, 0.2)',
        }}
      />
      {/* Center gold pointer dot */}
      <div
        id="cursor-dot-core"
        className="cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.5 : 1})`,
          backgroundColor: isHovered ? '#D4AF37' : '#F5E56B',
          boxShadow: isHovered 
            ? '0 0 10px #D4AF37, 0 0 20px #D4AF37' 
            : '0 0 10px #F5E56B, 0 0 20px #F5E56B',
        }}
      />
    </>
  );
}
