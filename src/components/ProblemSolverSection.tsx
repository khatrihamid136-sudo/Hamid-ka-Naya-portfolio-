import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Target, TrendingUp, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { DynamicIcon } from './DynamicIcon';

export const ProblemSolverSection: React.FC = () => {
  const { data } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState('All');

  const filterTabs = [
    'All',
    'Brand Identity',
    'Social Media',
    'Advertising & Marketing',
    'Packaging Design',
    'Print Design',
    'YouTube & Content',
    'Web Graphics'
  ];

  const filteredCases = activeFilter === 'All'
    ? data.problemCases
    : data.problemCases.filter(c => c.categoryFilter.toLowerCase() === activeFilter.toLowerCase());

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="problem-solver" className="py-12 px-4 sm:px-6 max-w-4xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="flex flex-col items-start mb-8 text-left">
        {/* Badge */}
        <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E8E2D5] bg-[#F4EFE6] text-[#3C3830] text-xs font-semibold tracking-wider uppercase">
          <Target className="w-3.5 h-3.5 text-[#B59E75]" />
          <span>{data.problemSection?.badge || "PROBLEM SOLVER & IMPACT"}</span>
        </div>

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#141414] font-display leading-[1.05] mb-4">
          Turning Client <br />
          Challenges <br />
          Into <span className="text-[#B59E75] font-accent">Proven <br className="hidden sm:inline" />Commercial <br className="hidden sm:inline" />Results</span>
        </h2>

        {/* Subtitle */}
        <p className="text-[#6B655B] text-sm sm:text-base max-w-2xl leading-relaxed">
          {data.problemSection?.subtitle || "Great graphic design goes beyond looking good — it solves specific commercial bottlenecks. Here is how I solve real-world problems for clients:"}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer border ${
              activeFilter === tab
                ? 'bg-[#141414] text-white border-[#141414] shadow-xs'
                : 'bg-white border-[#E8E2D5] text-[#555047] hover:border-[#B59E75] hover:text-[#141414]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Problem Cards List */}
      <div className="flex flex-col gap-6 mb-12">
        {filteredCases.map((item) => (
          <div
            key={item.id}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-[#EDE7DC] shadow-xs hover:border-[#D9CFBE] transition-all flex flex-col justify-between"
          >
            {/* Top Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#F8F5EE] border border-[#EAE2D4] text-[#4E483E] text-xs font-semibold">
                <DynamicIcon name={item.categoryBadge} className="w-3.5 h-3.5 text-[#B59E75]" />
                <span>{item.categoryBadge}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FAF7F0] border border-[#EAE2D4] text-[#968054] text-xs font-bold">
                <TrendingUp className="w-3.5 h-3.5 text-[#B59E75]" />
                <span>{item.metricBadge}</span>
              </div>
            </div>

            {/* Problem Section */}
            <div className="mb-6">
              <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#A17C46] uppercase mb-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>THE CLIENT PROBLEM</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#141414] mb-2 tracking-tight">
                {item.problemTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#6B655B] leading-relaxed">
                {item.problemDescription}
              </p>
            </div>

            {/* Solution Section */}
            <div className="pt-5 border-t border-[#F2ECE1] mb-5">
              <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#141414] uppercase mb-3">
                <CheckCircle2 className="w-4 h-4 text-[#B59E75]" />
                <span>{item.solutionTitle}</span>
              </div>

              <ul className="space-y-2.5 mb-5">
                {item.solutionPoints.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#3E3A33] font-medium leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B59E75] shrink-0 mt-2"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcome */}
            <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#EFE8DC]">
              <p className="text-xs sm:text-sm text-[#2E2B26] leading-relaxed">
                <strong className="font-bold text-[#141414]">Outcome:</strong> {item.outcome}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dark Problem CTA Box */}
      <div className="p-8 sm:p-10 rounded-2xl bg-[#141311] text-white flex flex-col items-center text-center shadow-lg">
        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[#B59E75] mb-5">
          <Target className="w-4 h-4" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 font-display">
          {data.problemSection?.ctaTitle || "Have a specific design problem in your business?"}
        </h3>

        <p className="text-xs sm:text-sm text-[#A8A29A] max-w-lg leading-relaxed mb-6">
          {data.problemSection?.ctaDescription || "Whether you need to boost ad performance, refresh your brand identity, or prepare error-free packaging and print files, let's create a custom visual solution."}
        </p>

        <button
          onClick={scrollToContact}
          className="py-3.5 px-7 rounded-full bg-white text-[#141311] font-bold text-xs sm:text-sm hover:bg-[#EFEAE1] transition-all flex items-center gap-2 cursor-pointer shadow-md"
        >
          <span>{data.problemSection?.ctaButtonText || "Discuss Your Project Problem →"}</span>
        </button>
      </div>
    </section>
  );
};
