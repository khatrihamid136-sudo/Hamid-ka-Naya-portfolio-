import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Layers, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { DynamicIcon } from './DynamicIcon';

export const PortfolioCategories: React.FC = () => {
  const { data, setSelectedCategorySlug } = usePortfolio();

  return (
    <section id="portfolio" className="py-12 px-4 sm:px-6 max-w-4xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-10 text-left">
        {/* Badge */}
        <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E8E2D5] bg-[#F4EFE6] text-[#3C3830] text-xs font-semibold tracking-wider uppercase">
          <Layers className="w-3.5 h-3.5 text-[#B59E75]" />
          <span>SELECTED PORTFOLIO & CASE STUDIES</span>
        </div>

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#141414] font-display leading-[1.05] mb-4">
          Explore <br />
          Design Work <br />
          by <span className="text-[#B59E75] font-accent">Category</span>
        </h2>

        {/* Subtitle */}
        <p className="text-[#6B655B] text-sm sm:text-base max-w-2xl leading-relaxed">
          Click any category below to reveal its specific design gallery, case studies, and high-resolution commercial assets.
        </p>
      </div>

      {/* Category Cards List */}
      <div className="flex flex-col gap-5">
        {data.categories.map((cat) => {
          const categoryProjectCount = data.projects.filter(p => p.categorySlug === cat.slug).length || cat.projectCount;

          return (
            <div
              key={cat.id}
              onClick={() => setSelectedCategorySlug(cat.slug)}
              className="group p-6 sm:p-7 rounded-2xl bg-white border border-[#EDE7DC] shadow-xs hover:border-[#B59E75]/60 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header row: Icon & Projects count badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#F8F5EE] border border-[#EAE3D5] flex items-center justify-center text-[#1C1A17] group-hover:bg-[#141414] group-hover:text-white transition-colors duration-300">
                    <DynamicIcon name={cat.iconName} className="w-6 h-6" />
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#EBE4D6] bg-[#FBF9F5] text-[#91794D] text-xs font-semibold">
                    <ImageIcon className="w-3.5 h-3.5 text-[#B59E75]" />
                    <span>{categoryProjectCount} Projects</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#141414] mb-2 tracking-tight group-hover:text-[#B59E75] transition-colors">
                  {cat.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#6E685E] leading-relaxed mb-6 max-w-xl">
                  {cat.description}
                </p>
              </div>

              {/* Bottom footer: Click info & Open button */}
              <div className="pt-4 border-t border-[#F2ECE1] flex items-center justify-between">
                <span className="text-xs text-[#827C72] font-medium hidden sm:inline">
                  Click to View Images
                </span>

                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#DFD8C9] bg-[#F7F4EC] text-[#24211D] text-xs sm:text-sm font-semibold group-hover:bg-[#141414] group-hover:text-white group-hover:border-[#141414] transition-all ml-auto sm:ml-0">
                  <span>Open Category</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
