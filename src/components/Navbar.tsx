import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';

export const TopBanner: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <div className="w-full flex justify-center px-4 pt-4 pb-2">
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#E8E2D5] bg-[#F4EFE6]/80 text-[#3C3830] text-xs md:text-sm font-medium shadow-xs backdrop-blur-xs transition-all hover:bg-[#EFE9DD]">
        <span className="w-2 h-2 rounded-full bg-[#B59E75] animate-pulse shrink-0"></span>
        <span className="tracking-tight text-center">{data.contact.availabilityText}</span>
        <Sparkles className="w-3.5 h-3.5 text-[#B59E75] shrink-0" />
      </div>
    </div>
  );
};

export const Navbar: React.FC = () => {
  const { data } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EFE9DE]/80 transition-all">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-[#121212] text-[#FAF8F5] flex items-center justify-center font-bold text-sm tracking-wider shadow-sm group-hover:scale-105 transition-transform">
            MH
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-bold text-base md:text-lg text-[#141414] tracking-tight leading-tight">
              <span>{data.hero.nameFirst} {data.hero.nameLast}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B59E75]"></span>
            </div>
            <span className="text-xs text-[#736E65] font-medium leading-tight">
              Graphic Designer
            </span>
          </div>
        </div>

        {/* Desktop Quick Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#4A453E]">
          <button onClick={() => scrollToSection('portfolio')} className="hover:text-[#121212] transition-colors cursor-pointer">Work</button>
          <button onClick={() => scrollToSection('capabilities')} className="hover:text-[#121212] transition-colors cursor-pointer">Services</button>
          <button onClick={() => scrollToSection('problem-solver')} className="hover:text-[#121212] transition-colors cursor-pointer">Solutions</button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="px-4 py-1.5 rounded-full bg-[#141414] text-white text-xs font-semibold hover:bg-[#2A2A2A] transition-all flex items-center gap-1 cursor-pointer"
          >
            Inquire <ArrowUpRight className="w-3 h-3" />
          </button>
        </nav>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 rounded-xl border border-[#E5DFD3] bg-white flex items-center justify-center text-[#2A2824] shadow-xs active:scale-95 transition-all"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8E2D5] bg-[#FAF8F5] px-6 py-5 shadow-lg flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <button 
            onClick={() => scrollToSection('portfolio')}
            className="text-left font-medium text-base text-[#2E2A24] py-1 border-b border-[#EFE9DD]"
          >
            Portfolio & Case Studies
          </button>
          <button 
            onClick={() => scrollToSection('capabilities')}
            className="text-left font-medium text-base text-[#2E2A24] py-1 border-b border-[#EFE9DD]"
          >
            Design Disciplines & Capabilities
          </button>
          <button 
            onClick={() => scrollToSection('problem-solver')}
            className="text-left font-medium text-base text-[#2E2A24] py-1 border-b border-[#EFE9DD]"
          >
            Problem Solving & Impact
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="w-full py-3 rounded-xl bg-[#141414] text-white text-sm font-semibold flex items-center justify-center gap-2"
          >
            Let's Work Together <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
