/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { ChatMessage } from '../types';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: 'Marhaban! Hello! Welcome to the premium portfolio of Sadaf Ameer. 👋 How can I assist you with your digital venture today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroller to keep bottom messages visible
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPrompts = [
    { text: 'Core Skills?', val: 'What are your core skills?' },
    { text: 'Arabian Projects', val: 'Show me projects suitable for UAE/KSA/Qatar clients' },
    { text: 'Start Collaboration', val: 'How can we initiate a project together?' },
  ];

  const processResponse = async (userInput: string) => {
    setIsTyping(true);
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await res.json();
      
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: data.reply || "I am currently undergoing database refinements. Please try again shortly or ping via WhatsApp!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error('Chat API Error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: "My full-stack connection is operating offline. Let's communicate on WhatsApp at +92 329 5806515!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    processResponse(textToSend);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="portfolio-chatbot-widget">
      {/* Chat Window Panel */}
      {isOpen && (
        <div
          id="chat-window-panel"
          className="glass-premium neon-border-cyan rounded-2xl w-[320px] sm:w-[360px] h-[450px] flex flex-col shadow-2xl mb-4 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          {/* Header Card */}
          <div className="bg-gradient-to-r from-[#D4AF37]/15 to-[#F5E56B]/15 p-4 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-black/50 overflow-hidden">
                  <i className="fa-solid fa-robot text-[#D4AF37] text-base"></i>
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-black animate-pulse" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-sm text-white tracking-wide">Sadaf Luxury AI</h4>
                <p className="text-[10px] text-yellow-400/80">Premium Web Representative</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-1"
              title="Minimize chat"
            >
              <i className="fa-solid fa-minus text-sm" />
            </button>
          </div>

          {/* Quick Suggestions Shelf */}
          <div className="px-3 pt-2 pb-1 border-b border-white/5 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none bg-black/20">
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(p.val)}
                className="text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition-all text-gray-300 pointer-events-auto cursor-pointer"
              >
                {p.text}
              </button>
            ))}
          </div>

          {/* Messages Node Shelf */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-black/40">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col max-w-[85%] ${
                  m.sender === 'user' ? 'ml-auto items-end animate-in slide-in-from-right-3 duration-200' : 'items-start animate-in slide-in-from-left-3 duration-200'
                }`}
              >
                <div
                  className={`px-3 py-2.5 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5E56B] text-black font-semibold rounded-tr-none shadow-cyan-glow/15'
                      : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>
                <span className="text-[9px] text-gray-500 mt-1 px-1">{m.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-1 pb-2">
                <div className="bg-white/5 border border-white/10 text-gray-400 text-xs px-3 py-2 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Panel Board */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="p-3 bg-black/80 border-t border-white/5 flex gap-2 items-center"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all placeholder:text-gray-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-8 h-8 rounded-xl bg-[#D4AF37] text-black flex items-center justify-center hover:bg-[#F5E56B] transition-all text-xs font-semibold disabled:bg-white/5 disabled:text-gray-500 disabled:pointer-events-none"
            >
              <i className="fa-solid fa-paper-plane" />
            </button>
          </form>
        </div>
      )}

      {/* Floating launcher Bubble Trigger icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg relative cursor-pointer focus:outline-none transition-transform hover:scale-105 active:scale-95 group"
        style={{
          background: 'rgba(10, 8, 8, 0.9)',
          border: isOpen ? '1.5px solid #F5E56B' : '1.5px solid #D4AF37',
          boxShadow: isOpen 
            ? '0 0 15px rgba(245, 229, 107, 0.45)' 
            : '0 0 15px rgba(212, 175, 55, 0.45)',
        }}
        title={isOpen ? 'Close Chat Assistant' : 'Chat with Sadaf Luxury Assistant'}
      >
        {/* Glow pulsing ring around launcher */}
        <span
          className={`absolute inset-0 rounded-full border opacity-40 animate-ping [animation-duration:1.5s] ${
            isOpen ? 'border-[#F5E56B]' : 'border-[#D4AF37]'
          }`}
        />
        
        {isOpen ? (
          <i className="fa-solid fa-xmark text-lg text-[#F5E56B] group-hover:rotate-90 transition-transform duration-300" />
        ) : (
          <i className="fa-solid fa-comments text-lg text-[#D4AF37] group-hover:bounce transition-all duration-300" />
        )}
      </button>
    </div>
  );
}
