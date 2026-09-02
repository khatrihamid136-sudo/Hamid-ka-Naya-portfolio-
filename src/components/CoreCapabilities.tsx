import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { DynamicIcon } from './DynamicIcon';

export const CoreCapabilities: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section id="capabilities" className="py-12 px-4 sm:px-6 max-w-4xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-10 text-left">
        {/* Badge */}
        <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E8E2D5] bg-[#F4EFE6] text-[#3C3830] text-xs font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#B59E75]" />
          <span>CORE CREATIVE CAPABILITIES</span>
        </div>

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#141414] font-display leading-[1.05] mb-4">
          Design <br />
          Disciplines <br />
          Tailored for <br />
          <span className="text-[#B59E75] font-accent">Global Scale</span>
        </h2>

        {/* Subtitle */}
        <p className="text-[#6B655B] text-sm sm:text-base max-w-2xl leading-relaxed">
          From strategic brand identities and shelf-commanding luxury packaging to algorithmic social creative suites, I deliver complete end-to-end design solutions for international enterprises and creative ventures.
        </p>
      </div>

      {/* Discipline Cards List */}
      <div className="flex flex-col gap-6">
        {data.capabilities.map((cap) => (
          <div
            key={cap.id}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-[#EDE7DC] shadow-xs hover:border-[#D9CFBE] transition-all flex flex-col justify-between"
          >
            {/* Top row: Icon & Number */}
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-xl bg-[#F8F5EE] border border-[#EAE3D5] flex items-center justify-center text-[#1C1A17]">
                <DynamicIcon name={cap.iconName} className="w-6 h-6" />
              </div>

              <span className="text-sm font-mono font-bold text-[#A89F91] tracking-widest">
                {cap.number}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#141414] mb-3 tracking-tight">
              {cap.title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#6E685E] leading-relaxed mb-6">
              {cap.description}
            </p>

            {/* Key Deliverables */}
            <div className="pt-4 border-t border-[#F2ECE1]">
              <h4 className="text-xs font-bold tracking-wider text-[#9E8B67] uppercase mb-3">
                {cap.deliverablesTitle || "KEY DELIVERABLES:"}
              </h4>

              <ul className="space-y-2.5">
                {cap.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#3E3A33] font-medium leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#B59E75] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
