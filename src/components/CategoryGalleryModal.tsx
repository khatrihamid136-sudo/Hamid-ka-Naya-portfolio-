import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, ArrowRight, ExternalLink, Sparkles, Layers } from 'lucide-react';
import { DynamicIcon } from './DynamicIcon';
import { Project } from '../types/portfolio';

export const CategoryGalleryModal: React.FC = () => {
  const { data, selectedCategorySlug, setSelectedCategorySlug, setSelectedProject } = usePortfolio();
  const [failedThumbs, setFailedThumbs] = React.useState<Record<string, boolean>>({});

  if (!selectedCategorySlug) return null;

  const currentCategory = data.categories.find(c => c.slug === selectedCategorySlug);
  const categoryProjects = data.projects.filter(p => p.categorySlug === selectedCategorySlug);

  const handleOpenCaseStudy = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#FAF8F5] rounded-3xl border border-[#EDE7DC] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-[#EBE4D6] bg-white flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F8F5EE] border border-[#EAE2D4] flex items-center justify-center text-[#141414] shrink-0">
              <DynamicIcon name={currentCategory?.iconName || 'sparkle'} className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9E8B67]">
                  Category Showcase
                </span>
                <span className="w-1 h-1 rounded-full bg-[#B59E75]"></span>
                <span className="text-xs font-semibold text-[#5A554C]">
                  {categoryProjects.length} Projects Available
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141414] tracking-tight">
                {currentCategory?.name || "Design Showcase"}
              </h2>

              <p className="text-xs sm:text-sm text-[#736E65] mt-1 max-w-xl">
                {currentCategory?.description}
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedCategorySlug(null)}
            className="w-10 h-10 rounded-full border border-[#E5DFD3] bg-[#F8F5EE] flex items-center justify-center text-[#443F37] hover:bg-[#141414] hover:text-white transition-all cursor-pointer shrink-0"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Project Cards */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {categoryProjects.length === 0 ? (
            <div className="py-16 text-center text-[#827B70]">
              <Layers className="w-12 h-12 mx-auto mb-3 text-[#B59E75]/50" />
              <p className="font-semibold text-lg">No projects published in this category yet.</p>
              <p className="text-xs mt-1">Use the hidden admin dashboard to add new projects to this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {categoryProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => handleOpenCaseStudy(project)}
                  className="group bg-white rounded-2xl border border-[#EDE7DC] overflow-hidden shadow-xs hover:border-[#B59E75] hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  {/* Thumbnail Image */}
                  <div className="relative aspect-4/3 w-full bg-[#1D1A17] overflow-hidden flex items-center justify-center">
                    {!failedThumbs[project.id] ? (
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        onError={() => setFailedThumbs((prev) => ({ ...prev, [project.id]: true }))}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#29221C] to-[#141210] text-[#EFEBE4]">
                        <div className="w-12 h-12 rounded-xl bg-[#3B3227] border border-[#524639] flex items-center justify-center mb-2 text-[#E2C799]">
                          <Sparkles className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-white max-w-[200px] truncate">
                          {project.title.split('•')[0]}
                        </span>
                        <span className="text-[11px] text-[#A89F93] mt-0.5">
                          {project.client}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-xs text-white text-[11px] font-semibold">
                      {project.year || "---"}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-5 flex flex-col justify-between grow">
                    <div>
                      <div className="text-xs font-semibold text-[#8C764E] mb-1">
                        {project.client} • {project.clientLocation}
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-[#141414] leading-snug mb-2 group-hover:text-[#B59E75] transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between text-xs font-bold text-[#141414] group-hover:text-[#B59E75]">
                      <span>View Full Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer with Category Switcher Tabs */}
        <div className="p-4 sm:p-5 border-t border-[#EAE2D4] bg-[#F5F1E8] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
            <span className="text-xs font-bold text-[#635D52] shrink-0 mr-1">Other Categories:</span>
            {data.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategorySlug(cat.slug)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  cat.slug === selectedCategorySlug
                    ? 'bg-[#141414] text-white'
                    : 'bg-white text-[#4A453E] border border-[#E2DCCE] hover:border-[#B59E75]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSelectedCategorySlug(null)}
            className="px-5 py-2 rounded-full bg-[#141414] text-white text-xs font-bold hover:bg-[#2A2824] transition-all ml-auto shrink-0"
          >
            Close Gallery
          </button>
        </div>
      </div>
    </div>
  );
};
