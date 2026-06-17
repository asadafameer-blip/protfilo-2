/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';

export default function TypingEffect() {
  const words = ['Creative Web Developer', 'UI/UX Enthusiast', 'Problem Solver'];
  const [wordIdx, setWordIdx] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleTyping = () => {
      const fullWord = words[wordIdx];
      
      if (!isDeleting) {
        // Typing letters
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setSpeed(80 + Math.random() * 40); // natural keystroke speed
        
        if (currentText === fullWord) {
          // Finished typing, hold for a while
          setIsDeleting(false);
          setSpeed(2000); // Wait 2s before starting deleting
          setIsDeleting(true);
        }
      } else {
        // Deleting letters
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setSpeed(40); // Delete fast
        
        if (currentText === '') {
          setIsDeleting(false);
          setWordIdx((prev) => (prev + 1) % words.length);
          setSpeed(500); // brief pause before next word
        }
      }
    };

    timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIdx, speed]);

  return (
    <span className="inline-block font-mono font-medium tracking-wide text-gray-300 min-h-[1.5em]" id="typing-tagline">
      {currentText}
      <span className="ml-[2px] animate-pulse font-bold text-[#D4AF37] cursor-caret">|</span>
    </span>
  );
}
