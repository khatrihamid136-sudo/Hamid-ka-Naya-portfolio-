import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Globe, Users, Star } from 'lucide-react';

export const Hero: React.FC = () => {
  const { data } = usePortfolio();

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-6 pb-12 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col items-center text-center">
      {/* Name Title */}
      <div className="mb-4 flex flex-col items-center select-none">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#141414] font-display leading-[1.05]">
          {data.hero.nameFirst}
        </h1>
        <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#B59E75] font-accent leading-[1.05]">
          {data.hero.nameLast}
        </span>
      </div>

      {/* Role Badge */}
      <div className="mb-3 inline-flex items-center px-4 py-1.5 rounded-full border border-[#E8E2D5] bg-[#F2EDE2]/60 text-[#3C3830] text-xs sm:text-sm font-semibold tracking-wide">
        {data.hero.roleBadge}
      </div>

      {/* Location / Focus */}
      <div className="mb-8 inline-flex items-center gap-1.5 text-[#B59E75] text-xs sm:text-sm font-medium">
        <Globe className="w-3.5 h-3.5 text-[#B59E75]" />
        <span>{data.hero.clientFocusBadge}</span>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-md flex flex-col gap-3 mb-12">
        <button
          onClick={scrollToPortfolio}
          className="w-full py-3.5 px-6 rounded-full bg-[#141414] text-white font-medium text-sm sm:text-base shadow-md hover:bg-[#282624] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {data.hero.primaryCta}
        </button>
        <button
          onClick={scrollToContact}
          className="w-full py-3.5 px-6 rounded-full bg-[#F5F1E8] border border-[#E5DFD1] text-[#1E1C19] font-medium text-sm sm:text-base hover:bg-[#EFE9DC] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {data.hero.secondaryCta}
        </button>
      </div>

      {/* 3 Metric Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
        {/* Metric 1 */}
        <div className="p-6 rounded-2xl bg-white border border-[#EDE7DC] shadow-xs flex flex-col justify-between hover:border-[#D9CFBE] transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl text-[#141414]">
              {data.metrics[0]?.value || "Projects Completed •"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#736E65] leading-relaxed">
            {data.metrics[0]?.subtext || "Delivered for brands & creators across 15+ countries"}
          </p>
        </div>

        {/* Metric 2 */}
        <div className="p-6 rounded-2xl bg-white border border-[#EDE7DC] shadow-xs flex flex-col justify-between hover:border-[#D9CFBE] transition-all">
          <div className="flex items-start justify-between mb-2">
            <span className="text-4xl sm:text-5xl font-black text-[#141414] font-display">
              {data.metrics[1]?.value || "40+"}
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#F6F2EA] border border-[#EAE4D7] flex items-center justify-center text-[#B59E75]">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h4 className="font-bold text-base text-[#141414] mb-1">
              {data.metrics[1]?.label || "Happy Clients •"}
            </h4>
            <p className="text-xs sm:text-sm text-[#736E65] leading-relaxed">
              {data.metrics[1]?.subtext || "Founders, directors, agencies & global scaleups"}
            </p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-6 rounded-2xl bg-white border border-[#EDE7DC] shadow-xs flex flex-col justify-between hover:border-[#D9CFBE] transition-all">
          <div className="flex items-start justify-between mb-2">
            <span className="text-4xl sm:text-5xl font-black text-[#141414] font-display">
              {data.metrics[2]?.value || "4.9/5"}
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#F6F2EA] border border-[#EAE4D7] flex items-center justify-center text-[#B59E75]">
              <Star className="w-5 h-5 fill-[#B59E75]/20" />
            </div>
          </div>
          <div>
            <h4 className="font-bold text-base text-[#141414] mb-1">
              {data.metrics[2]?.label || "Average Rating •"}
            </h4>
            <p className="text-xs sm:text-sm text-[#736E65] leading-relaxed">
              {data.metrics[2]?.subtext || "Consistently praised for communication & craft"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
