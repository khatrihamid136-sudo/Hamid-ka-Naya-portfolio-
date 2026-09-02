import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, MapPin, Calendar, Building, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export const CaseStudyModal: React.FC = () => {
  const { selectedProject, setSelectedProject } = usePortfolio();
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  if (!selectedProject) return null;

  const images = selectedProject.galleryImages && selectedProject.galleryImages.length > 0
    ? selectedProject.galleryImages
    : [selectedProject.thumbnail];

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentImg = images[activeImageIndex] || selectedProject.thumbnail;
  const isFailed = failedImages[currentImg];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[94vh] bg-[#FAF8F5] rounded-3xl border border-[#EDE7DC] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-5 sm:p-6 border-b border-[#EBE4D6] bg-white flex items-center justify-between sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9E8B67]">
              <span>{selectedProject.categoryName}</span>
              <span className="w-1 h-1 rounded-full bg-[#B59E75]"></span>
              <span>Case Study</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#141414] tracking-tight truncate max-w-xl">
              {selectedProject.title}
            </h2>
          </div>

          <button
            onClick={() => setSelectedProject(null)}
            className="w-10 h-10 rounded-full border border-[#E5DFD3] bg-[#F8F5EE] flex items-center justify-center text-[#443F37] hover:bg-[#141414] hover:text-white transition-all cursor-pointer shrink-0"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Main Visual Display */}
          <div className="flex flex-col gap-3">
            <div className="w-full aspect-16/9 rounded-2xl bg-[#1D1A17] overflow-hidden border border-[#E8E1D2] shadow-sm flex items-center justify-center">
              {!isFailed ? (
                <img
                  src={currentImg}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  onError={() => setFailedImages((prev) => ({ ...prev, [currentImg]: true }))}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#26211C] to-[#141210] text-[#EFEBE4]">
                  <div className="w-14 h-14 rounded-2xl bg-[#383129] border border-[#524639] flex items-center justify-center mb-3 text-[#E2C799]">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#B59E75]/20 border border-[#B59E75]/40 text-[#E2C799] text-xs font-bold uppercase tracking-wider mb-2">
                    Slide {activeImageIndex + 1} of {images.length}
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold text-white max-w-lg mb-1">
                    {selectedProject.title}
                  </h4>
                  <p className="text-xs text-[#A89F93] max-w-md">
                    Image path: <span className="text-[#E2C799] font-mono bg-black/40 px-2 py-0.5 rounded">{currentImg}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Slider Navigation Controls (Outside/Below the image) */}
            {images.length > 1 && (
              <div className="flex items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="px-4 py-2 rounded-xl bg-white border border-[#D9D3C7] text-[#141414] text-xs font-bold flex items-center gap-1.5 hover:bg-[#141414] hover:text-white hover:border-[#141414] transition-all cursor-pointer shadow-2xs"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeImageIndex === idx 
                          ? 'w-6 bg-[#141414]' 
                          : 'w-2 bg-[#D9D3C7] hover:bg-[#A69E90]'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                  <span className="text-xs font-bold text-[#736E65] ml-2">
                    {activeImageIndex + 1} / {images.length}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleNextImage}
                  className="px-4 py-2 rounded-xl bg-white border border-[#D9D3C7] text-[#141414] text-xs font-bold flex items-center gap-1.5 hover:bg-[#141414] hover:text-white hover:border-[#141414] transition-all cursor-pointer shadow-2xs"
                  aria-label="Next Slide"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Thumbnail Selectors if multiple images exist */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 mt-1">
                {images.map((img, idx) => {
                  const isThumbErr = failedImages[img];
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer bg-[#241F1A] relative flex items-center justify-center ${
                        activeImageIndex === idx
                          ? 'border-[#B59E75] scale-105 shadow-xs'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      {!isThumbErr ? (
                        <img 
                          src={img} 
                          alt="Thumbnail preview" 
                          onError={() => setFailedImages((prev) => ({ ...prev, [img]: true }))}
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="text-[11px] font-bold text-[#E2C799]">
                          #{idx + 1}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Project Metadata Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#EDE7DC] grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div>
              <div className="text-[11px] font-bold text-[#8C764E] uppercase flex items-center gap-1">
                <Building className="w-3 h-3" /> Client
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#141414] mt-0.5">{selectedProject.client}</div>
            </div>

            <div>
              <div className="text-[11px] font-bold text-[#8C764E] uppercase flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Location
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#141414] mt-0.5">{selectedProject.clientLocation}</div>
            </div>

            <div>
              <div className="text-[11px] font-bold text-[#8C764E] uppercase flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Year
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#141414] mt-0.5">{selectedProject.year || "---"}</div>
            </div>

            <div>
              <div className="text-[11px] font-bold text-[#8C764E] uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Discipline
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#141414] mt-0.5">{selectedProject.categoryName}</div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="p-6 rounded-2xl bg-white border border-[#EDE7DC]">
            <h3 className="text-xs font-bold text-[#9E8B67] uppercase tracking-wider mb-2">
              Executive Summary
            </h3>
            <p className="text-sm sm:text-base text-[#2A2620] leading-relaxed font-medium">
              {selectedProject.summary}
            </p>
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Challenge */}
            <div className="p-6 rounded-2xl bg-[#FCFAF7] border border-[#EDE7DC]">
              <h4 className="text-xs font-bold text-[#B05D3B] uppercase tracking-wider mb-2">
                The Commercial Challenge
              </h4>
              <p className="text-xs sm:text-sm text-[#5C5549] leading-relaxed">
                {selectedProject.challenge}
              </p>
            </div>

            {/* Strategic Solution */}
            <div className="p-6 rounded-2xl bg-[#FCFAF7] border border-[#EDE7DC]">
              <h4 className="text-xs font-bold text-[#4B7354] uppercase tracking-wider mb-2">
                The Design Solution
              </h4>
              <p className="text-xs sm:text-sm text-[#5C5549] leading-relaxed">
                {selectedProject.solution}
              </p>
            </div>
          </div>

          {/* Key Deliverables & Commercial Outcome */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Deliverables */}
            {selectedProject.deliverables && selectedProject.deliverables.length > 0 && (
              <div className="p-6 rounded-2xl bg-white border border-[#EDE7DC]">
                <h4 className="text-xs font-bold text-[#8C764E] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B59E75]" /> Key Project Deliverables
                </h4>
                <ul className="space-y-2">
                  {selectedProject.deliverables.map((item, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-[#3E3A32] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B59E75] shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Measurable Outcome */}
            {selectedProject.outcome && (
              <div className="p-6 rounded-2xl bg-[#F8F5ED] border border-[#E8E0D2] flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#2A2620] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span> Commercial Impact & Result
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-[#1A1815] leading-relaxed mt-1">
                    "{selectedProject.outcome}"
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#EAE2D4] flex items-center justify-between text-[11px] font-bold text-[#736E65]">
                  <span>Status: Completed & Live</span>
                  <span>Verified Client Feedback</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 sm:p-5 border-t border-[#EAE2D4] bg-white flex items-center justify-end">
          <button
            onClick={() => setSelectedProject(null)}
            className="px-6 py-2.5 rounded-full bg-[#141414] text-white text-xs font-bold hover:bg-[#2B2925] transition-all cursor-pointer"
          >
            Back to Gallery
          </button>
        </div>
      </div>
    </div>
  );
};
