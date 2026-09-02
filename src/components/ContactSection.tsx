import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Send, CheckCircle2, Mail } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { data } = usePortfolio();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    // Construct pre-filled WhatsApp message URL
    const text = encodeURIComponent(
      `Hello Muhammad,\n\nName: ${formData.name}\nProject Details: ${formData.message}`
    );
    window.open(`https://wa.me/${data.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-12 px-4 sm:px-6 max-w-3xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="flex flex-col items-start mb-8 text-left">
        {/* Badge */}
        <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E8E2D5] bg-[#F4EFE6] text-[#3C3830] text-xs font-semibold tracking-wider uppercase">
          <Send className="w-3.5 h-3.5 text-[#B59E75]" />
          <span>START A CONVERSATION</span>
        </div>

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#141414] font-display leading-[1.05] mb-4">
          Let's Build <br />
          Something <br />
          <span className="text-[#B59E75] font-accent">Iconic</span>
        </h2>

        {/* Subtitle */}
        <p className="text-[#6B655B] text-sm sm:text-base max-w-2xl leading-relaxed">
          Ready to elevate your brand identity, launch high-conversion advertising, or engineer flawless packaging? Submit your project brief below.
        </p>
      </div>

      {/* Interactive Project Inquiry Form */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#EDE7DC] shadow-xs">
        <h3 className="text-2xl font-bold text-[#141414] mb-2 tracking-tight">
          Send a Project Brief
        </h3>
        <p className="text-xs sm:text-sm text-[#736E65] mb-6">
          Fill in your details below to start your direct consultation with Muhammad Hamid.
        </p>

        {formSubmitted ? (
          <div className="p-6 rounded-xl bg-[#FAF8F5] border border-[#E5DFD1] text-center flex flex-col items-center">
            <CheckCircle2 className="w-10 h-10 text-[#B59E75] mb-3" />
            <h4 className="font-bold text-lg text-[#141414] mb-1">Inquiry Prepared</h4>
            <p className="text-xs sm:text-sm text-[#736E65] max-w-md mb-4">
              Your inquiry has been formulated and sent. You can also connect directly via WhatsApp or Email below.
            </p>
            <button
              onClick={() => setFormSubmitted(false)}
              className="text-xs font-semibold text-[#141414] underline cursor-pointer"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#443F37] uppercase tracking-wider mb-1.5">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Julian Vance"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#E2DCCE] bg-[#FCFAF7] text-sm text-[#141414] focus:outline-none focus:border-[#B59E75] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#443F37] uppercase tracking-wider mb-1.5">
                Project Scope & Details *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Describe your brand goals, deliverables required, target launch dates, and reference brands..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#E2DCCE] bg-[#FCFAF7] text-sm text-[#141414] focus:outline-none focus:border-[#B59E75] focus:bg-white transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#141414] text-white font-bold text-sm sm:text-base hover:bg-[#2A2824] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Send Project Brief</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Colorless WhatsApp and Email Direct Icons below Send Project Brief */}
        <div className="mt-8 pt-6 border-t border-[#EDE7DC] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#736E65] font-medium text-center sm:text-left">
            Or connect directly via direct channels:
          </span>

          <div className="flex items-center gap-3">
            {/* Colorless exact Official WhatsApp Icon */}
            <a
              href={`https://wa.me/${data.contact.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp Chat"
              title={`WhatsApp: ${data.contact.whatsappDisplay || '+92 322 0226494'}`}
              className="w-11 h-11 rounded-full bg-[#FAF8F5] border border-[#D9D3C7] flex items-center justify-center text-[#141414] hover:bg-[#141414] hover:text-[#FAF8F5] hover:border-[#141414] transition-all duration-200 cursor-pointer shadow-2xs group"
            >
              <svg 
                viewBox="0 0 448 512" 
                className="w-5 h-5 fill-current transition-transform group-hover:scale-110"
              >
                {/* FontAwesome Official WhatsApp SVG Path */}
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
              </svg>
            </a>

            {/* Colorless Email Icon */}
            <a
              href={`mailto:${data.contact.email}`}
              aria-label="Direct Email"
              title={`Email: ${data.contact.email || 'khatrihamid136@gmail.com'}`}
              className="w-11 h-11 rounded-full bg-[#FAF8F5] border border-[#D9D3C7] flex items-center justify-center text-[#141414] hover:bg-[#141414] hover:text-[#FAF8F5] hover:border-[#141414] transition-all duration-200 cursor-pointer shadow-2xs group"
            >
              <Mail className="w-5 h-5 transition-transform group-hover:scale-110 stroke-[1.8]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer: React.FC = () => {
  const { handleCopyrightClick, data } = usePortfolio();

  return (
    <footer className="w-full border-t border-[#EBE4D8] bg-[#F7F4ED] pt-8 pb-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Quick Footer Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-medium text-[#585247] mb-6">
          <a href="#portfolio" className="hover:text-[#121212] transition-colors">Portfolio</a>
          <a href="#capabilities" className="hover:text-[#121212] transition-colors">Disciplines</a>
          <a href="#problem-solver" className="hover:text-[#121212] transition-colors">Solutions</a>
          <a href="#contact" className="hover:text-[#121212] transition-colors">Contact</a>
        </div>

        {/* Copyright & Crafted with Notice */}
        <div className="pt-6 border-t border-[#EAE3D5] w-full flex flex-col items-center gap-1.5">
          <p
            onClick={handleCopyrightClick}
            title="Click to open Admin Panel (Password: admin123)"
            className="text-xs sm:text-sm text-[#7D766B] select-none cursor-pointer hover:text-[#141414] transition-colors leading-relaxed font-medium"
          >
            {data.footer?.copyrightText || '© 2026 Muhammad Hamid. All rights reserved.'}
          </p>
          <p className="text-[11px] sm:text-xs text-[#A39B8D] tracking-wide">
            {data.footer?.subText || 'Crafted with precision for international brands.'}
          </p>
        </div>
      </div>
    </footer>
  );
};
