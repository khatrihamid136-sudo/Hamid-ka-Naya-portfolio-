import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  X, 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  RefreshCw, 
  Download, 
  Upload, 
  Check, 
  Layers, 
  Sparkles, 
  Briefcase, 
  FolderPlus,
  HelpCircle,
  MessageSquare,
  Cpu,
  Target,
  FileText,
  Image as ImageIcon,
  ExternalLink,
  Copy,
  Info,
  Link,
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Project, Category, Capability, ProblemSolutionCase, Testimonial, FAQItem } from '../../types/portfolio';

export const AdminDashboardModal: React.FC = () => {
  const { 
    data, 
    updateData, 
    resetToDefaults, 
    isAdminOpen, 
    setIsAdminOpen,
    saveProject,
    deleteProject,
    saveCategory,
    deleteCategory,
    saveCapability,
    deleteCapability,
    saveProblemCase,
    deleteProblemCase,
    saveTestimonial,
    deleteTestimonial,
    saveFAQ,
    deleteFAQ
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'hero' | 'projects' | 'categories' | 'capabilities' | 'problems' | 'skills' | 'testimonials' | 'faqs' | 'contact' | 'image-guide' | 'backup'>('projects');
  const [saveNotification, setSaveNotification] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Project List Filter & Search
  const [projectFilterCategory, setProjectFilterCategory] = useState<string>('all');
  const [projectSearch, setProjectSearch] = useState<string>('');

  // Editing Sub-states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newGalleryUrl, setNewGalleryUrl] = useState<string>('');

  if (!isAdminOpen) return null;

  const triggerSaveNotice = () => {
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 2500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `muhammad_hamid_portfolio_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          updateData(parsed);
          triggerSaveNotice();
        } catch (err) {
          alert("Invalid JSON configuration file format.");
        }
      };
    }
  };

  const handleLocalImageUpload = (file: File, callback: (url: string) => void) => {
    // If file is > 1.5MB warn user about localStorage limits and suggest ImgBB
    if (file.size > 1.5 * 1024 * 1024) {
      alert("⚠️ Large image detected! Local browser storage has limited capacity (5MB total). For high-res images, we recommend uploading to ImgBB (free) and pasting the image URL instead.");
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        callback(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const createBlankProject = (): Project => ({
    id: `proj-${Date.now()}`,
    categorySlug: data.categories[0]?.slug || 'brand-identity',
    categoryName: data.categories[0]?.name || 'Brand Identity',
    title: 'New Commercial Design Project',
    client: 'Client / Enterprise',
    clientLocation: 'Global',
    year: '2026',
    thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop'
    ],
    tags: ['Brand Strategy', 'Visual Identity'],
    summary: 'Executive summary of design deliverables and visual transformation.',
    challenge: 'Key business bottleneck or branding challenge.',
    solution: 'Engineered design strategy and creative execution.',
    deliverables: ['Primary Vector Assets', 'Brand Guidelines (PDF)'],
    outcome: 'Commercial result, ROI, or engagement boost.'
  });

  // Filtered projects
  const filteredProjects = data.projects.filter(p => {
    const matchesCat = projectFilterCategory === 'all' || p.categorySlug === projectFilterCategory;
    const matchesSearch = !projectSearch || 
      p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.client.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(projectSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-5xl h-[92vh] bg-[#FAF8F5] rounded-3xl border border-[#EDE7DC] shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8E1D2] bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#141414] text-[#B59E75] flex items-center justify-center font-bold text-xs shadow-sm">
              MH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-[#141414] leading-tight">
                  Portfolio Admin Panel
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#141414] text-[#B59E75] text-[10px] font-mono font-bold tracking-wider">
                  AUTHENTICATED
                </span>
              </div>
              <p className="text-xs text-[#736E65]">
                Edit all content, image URLs, categories, and portfolio projects in real-time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {saveNotification && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 animate-in fade-in">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Changes Saved!
              </span>
            )}

            <button
              onClick={() => setIsAdminOpen(false)}
              className="w-9 h-9 rounded-full border border-[#DED8CC] bg-[#F8F5EE] flex items-center justify-center text-[#443F37] hover:bg-[#141414] hover:text-white transition-all cursor-pointer"
              title="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-3 py-2 border-b border-[#E8E1D2] bg-[#F4EFE6] flex items-center gap-1.5 overflow-x-auto shrink-0">
          {[
            { id: 'projects', label: 'Projects & Images', icon: Briefcase },
            { id: 'image-guide', label: 'Image URL Guide', icon: ImageIcon },
            { id: 'hero', label: 'Hero & Bio', icon: Sparkles },
            { id: 'categories', label: 'Categories', icon: FolderPlus },
            { id: 'capabilities', label: 'Disciplines', icon: Layers },
            { id: 'problems', label: 'Problem Solver', icon: Target },
            { id: 'skills', label: 'Skills & Tools', icon: Cpu },
            { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
            { id: 'faqs', label: 'FAQs', icon: HelpCircle },
            { id: 'contact', label: 'Contact & Footer', icon: FileText },
            { id: 'backup', label: 'Backup & Reset', icon: Download }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setEditingProject(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#141414] text-white shadow-xs'
                    : 'bg-white/80 text-[#554F44] hover:bg-white hover:text-[#141414] border border-[#E5DFD1]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto grow space-y-6">

          {/* ======================================================== */}
          {/* TAB 1: PROJECTS & IMAGE URL MANAGEMENT */}
          {/* ======================================================== */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {editingProject ? (
                /* Project Editor Form */
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#EDE7DC] space-y-6">
                  {/* Top Bar inside Project Editor */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EAE2D4] pb-4">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-[#968054] uppercase tracking-wider">
                        {editingProject.categoryName}
                      </span>
                      <h3 className="text-lg font-bold text-[#141414]">
                        {editingProject.title ? `Editing: ${editingProject.title}` : 'New Project'}
                      </h3>
                    </div>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="px-4 py-2 rounded-full border border-[#D5CEC0] bg-[#F5F1E8] text-xs font-bold text-[#443F37] hover:bg-[#EAE3D5] transition-colors"
                    >
                      ← Back to Projects List
                    </button>
                  </div>

                  {/* Free Image Hosting Guidance Card */}
                  <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E6DDCE] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <ImageIcon className="w-5 h-5 text-[#968054] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-[#141414]">
                          Need to upload new images without filling browser storage?
                        </h4>
                        <p className="text-[11px] text-[#6B655B] leading-relaxed">
                          Upload high-resolution images to free hosting like <span className="font-semibold text-[#141414]">ImgBB (No account needed)</span> or <span className="font-semibold text-[#141414]">PostImages</span>, then copy & paste the direct Image URL here.
                        </p>
                      </div>
                    </div>
                    <a
                      href="https://imgbb.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-[#141414] text-white text-[11px] font-bold inline-flex items-center gap-1.5 shrink-0 hover:bg-[#2C2925]"
                    >
                      <span>Open Free ImgBB Uploader</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Basic Project Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#554F44] mb-1">Project Title *</label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm text-[#141414]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#554F44] mb-1">Category *</label>
                      <select
                        value={editingProject.categorySlug}
                        onChange={(e) => {
                          const cat = data.categories.find(c => c.slug === e.target.value);
                          setEditingProject({
                            ...editingProject,
                            categorySlug: e.target.value,
                            categoryName: cat?.name || editingProject.categoryName
                          });
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm text-[#141414]"
                      >
                        {data.categories.map((c) => (
                          <option key={c.slug} value={c.slug}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#554F44] mb-1">Client Name</label>
                      <input
                        type="text"
                        value={editingProject.client}
                        onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm text-[#141414]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#554F44] mb-1">Client Location</label>
                      <input
                        type="text"
                        value={editingProject.clientLocation || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, clientLocation: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm text-[#141414]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#554F44] mb-1">Year</label>
                      <input
                        type="text"
                        value={editingProject.year}
                        onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm text-[#141414]"
                      />
                    </div>
                  </div>

                  {/* Primary Thumbnail Image URL Section */}
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E1D2] space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-[#3B362F] flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-[#968054]" />
                        <span>Primary Cover / Thumbnail Image URL *</span>
                      </label>
                      <span className="text-[11px] text-[#7A7367]">Used in card grids & main preview</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="grow space-y-2">
                        <input
                          type="text"
                          placeholder="Paste direct image URL (https://... or /image.jpg)"
                          value={editingProject.thumbnail}
                          onChange={(e) => setEditingProject({ ...editingProject, thumbnail: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-white text-xs font-mono text-[#141414]"
                        />

                        <div className="flex flex-wrap gap-2 text-xs">
                          <label className="px-3 py-1.5 rounded-lg border border-[#D5CEC0] bg-white hover:bg-[#F2ECE0] text-[#443F37] cursor-pointer inline-flex items-center gap-1 font-semibold text-[11px]">
                            <Upload className="w-3 h-3" />
                            <span>Upload Local File</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  handleLocalImageUpload(e.target.files[0], (url) => {
                                    setEditingProject({
                                      ...editingProject,
                                      thumbnail: url,
                                      galleryImages: editingProject.galleryImages.includes(url) 
                                        ? editingProject.galleryImages 
                                        : [url, ...editingProject.galleryImages]
                                    });
                                  });
                                }
                              }}
                            />
                          </label>

                          {editingProject.thumbnail && (
                            <a
                              href={editingProject.thumbnail}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg border border-[#D5CEC0] bg-white hover:bg-[#F2ECE0] text-[#443F37] inline-flex items-center gap-1 font-semibold text-[11px]"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>Test Link in New Tab</span>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Thumbnail Preview Box */}
                      <div className="w-32 h-24 sm:w-40 sm:h-28 rounded-xl bg-black/5 border border-[#DDD5C7] overflow-hidden shrink-0 flex items-center justify-center relative group">
                        {editingProject.thumbnail ? (
                          <img
                            src={editingProject.thumbnail}
                            alt="thumbnail preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400';
                            }}
                          />
                        ) : (
                          <span className="text-[10px] text-[#8C8477]">No Image</span>
                        )}
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] text-white font-mono">
                          COVER
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Multi-Image Gallery Manager */}
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E1D2] space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-[#141414] flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-[#968054]" />
                          <span>Gallery Visuals & Case Study Slides ({editingProject.galleryImages.length} Images)</span>
                        </h4>
                        <p className="text-[11px] text-[#736E65]">
                          Add all slide images, presentation mockups, and high-res angles shown in the modal
                        </p>
                      </div>

                      <label className="px-3 py-1.5 rounded-lg bg-[#141414] text-white hover:bg-[#2C2925] cursor-pointer inline-flex items-center gap-1 font-semibold text-xs shadow-xs">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload File to Gallery</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleLocalImageUpload(e.target.files[0], (url) => {
                                setEditingProject({
                                  ...editingProject,
                                  galleryImages: [...editingProject.galleryImages, url]
                                });
                              });
                            }
                          }}
                        />
                      </label>
                    </div>

                    {/* Add Image URL Row */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Paste additional Image URL to add to gallery..."
                        value={newGalleryUrl}
                        onChange={(e) => setNewGalleryUrl(e.target.value)}
                        className="grow px-3 py-2 rounded-xl border border-[#D9D3C7] bg-white text-xs font-mono text-[#141414]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newGalleryUrl.trim()) {
                            setEditingProject({
                              ...editingProject,
                              galleryImages: [...editingProject.galleryImages, newGalleryUrl.trim()]
                            });
                            setNewGalleryUrl('');
                          }
                        }}
                        className="px-4 py-2 rounded-xl bg-[#141414] text-white text-xs font-bold shrink-0 hover:bg-[#2B2925]"
                      >
                        + Add Image URL
                      </button>
                    </div>

                    {/* Gallery Images List Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {editingProject.galleryImages.map((imgUrl, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-white border border-[#E5DEC\-D] flex gap-3 items-center justify-between"
                        >
                          <img
                            src={imgUrl}
                            alt={`Gallery ${idx + 1}`}
                            className="w-16 h-12 rounded-lg object-cover bg-[#EBE5DA] shrink-0 border"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400';
                            }}
                          />

                          <div className="grow overflow-hidden">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-mono font-bold text-[#968054]">
                                #{idx + 1}
                              </span>
                              {editingProject.thumbnail === imgUrl && (
                                <span className="text-[9px] font-bold bg-[#141414] text-[#B59E75] px-1.5 py-0.2 rounded">
                                  COVER
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] font-mono text-[#736E65] truncate">
                              {imgUrl}
                            </p>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {editingProject.thumbnail !== imgUrl && (
                              <button
                                type="button"
                                title="Set as Cover Thumbnail"
                                onClick={() => setEditingProject({ ...editingProject, thumbnail: imgUrl })}
                                className="p-1.5 rounded-lg text-xs font-semibold text-[#6E675B] hover:bg-[#F2ECE0]"
                              >
                                Set Cover
                              </button>
                            )}
                            <button
                              type="button"
                              title="Remove image from gallery"
                              onClick={() => {
                                const updated = editingProject.galleryImages.filter((_, i) => i !== idx);
                                setEditingProject({
                                  ...editingProject,
                                  galleryImages: updated,
                                  thumbnail: editingProject.thumbnail === imgUrl ? (updated[0] || '') : editingProject.thumbnail
                                });
                              }}
                              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Text Details */}
                  <div>
                    <label className="block text-xs font-bold text-[#554F44] mb-1">Executive Summary</label>
                    <textarea
                      rows={2}
                      value={editingProject.summary}
                      onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm text-[#141414]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#554F44] mb-1">The Commercial Challenge</label>
                      <textarea
                        rows={3}
                        value={editingProject.challenge}
                        onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm text-[#141414]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#554F44] mb-1">The Design Solution</label>
                      <textarea
                        rows={3}
                        value={editingProject.solution}
                        onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm text-[#141414]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#554F44] mb-1">Tags (Comma-separated)</label>
                      <input
                        type="text"
                        value={editingProject.tags.join(', ')}
                        onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                        className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm text-[#141414]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#554F44] mb-1">Deliverables (Comma-separated)</label>
                      <input
                        type="text"
                        value={editingProject.deliverables.join(', ')}
                        onChange={(e) => setEditingProject({ ...editingProject, deliverables: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                        className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm text-[#141414]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#554F44] mb-1">Commercial Outcome / Result Metric</label>
                    <input
                      type="text"
                      value={editingProject.outcome}
                      onChange={(e) => setEditingProject({ ...editingProject, outcome: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm text-[#141414]"
                    />
                  </div>

                  {/* Save Project Actions Bar */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EAE2D4]">
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="px-5 py-2.5 rounded-full border border-[#D5CEC0] bg-[#F5F1E8] text-xs font-bold text-[#443F37] hover:bg-[#EAE3D5]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        saveProject(editingProject);
                        setEditingProject(null);
                        triggerSaveNotice();
                      }}
                      className="px-6 py-2.5 rounded-full bg-[#141414] text-white text-xs font-bold shadow-sm hover:bg-[#2A2824] flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5 text-[#B59E75]" />
                      <span>Save Project</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Projects List Overview */
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-[#141414]">
                        Portfolio Projects ({data.projects.length})
                      </h3>
                      <p className="text-xs text-[#736E65]">
                        Manage visuals, image URLs, and case study documentation
                      </p>
                    </div>

                    <button
                      onClick={() => setEditingProject(createBlankProject())}
                      className="px-4 py-2 rounded-full bg-[#141414] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-[#2B2925] cursor-pointer self-start sm:self-auto"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#B59E75]" />
                      <span>Add New Project</span>
                    </button>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="text"
                      placeholder="Search projects by title, client, or category..."
                      value={projectSearch}
                      onChange={(e) => setProjectSearch(e.target.value)}
                      className="grow px-3 py-2 rounded-xl border border-[#D9D3C7] bg-white text-xs text-[#141414]"
                    />

                    <select
                      value={projectFilterCategory}
                      onChange={(e) => setProjectFilterCategory(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-[#D9D3C7] bg-white text-xs font-semibold text-[#443F37]"
                    >
                      <option value="all">All Categories ({data.projects.length})</option>
                      {data.categories.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name} ({data.projects.filter(p => p.categorySlug === c.slug).length})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Project Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {filteredProjects.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-3.5 rounded-xl bg-white border border-[#EDE7DC] flex gap-3.5 items-start justify-between hover:border-[#D5CBBA] transition-all group"
                      >
                        <div className="relative w-20 h-16 rounded-lg bg-[#EBE5DA] overflow-hidden shrink-0 border border-[#E0D8CA]">
                          <img
                            src={proj.thumbnail}
                            alt={proj.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400';
                            }}
                          />
                          <span className="absolute bottom-0 right-0 px-1 py-0.5 bg-black/75 text-[8px] text-white font-mono rounded-tl">
                            {proj.galleryImages.length} img
                          </span>
                        </div>

                        <div className="grow overflow-hidden pr-2">
                          <span className="text-[10px] font-bold uppercase text-[#968054] tracking-wide">
                            {proj.categoryName}
                          </span>
                          <h4 className="text-sm font-bold text-[#141414] truncate">
                            {proj.title}
                          </h4>
                          <p className="text-xs text-[#736E65] truncate">
                            {proj.client} • {proj.year}
                          </p>
                        </div>

                        <div className="flex flex-col gap-1 shrink-0">
                          <button
                            onClick={() => setEditingProject(proj)}
                            className="p-1.5 rounded-md hover:bg-[#F2EDE2] text-[#443F37] transition-colors"
                            title="Edit Project & Images"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete project "${proj.title}"?`)) {
                                deleteProject(proj.id);
                                triggerSaveNotice();
                              }
                            }}
                            className="p-1.5 rounded-md hover:bg-red-50 text-red-600 transition-colors"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: IMAGE URL & HOSTING GUIDE */}
          {/* ======================================================== */}
          {activeTab === 'image-guide' && (
            <div className="space-y-6 max-w-3xl">
              <div className="p-6 rounded-2xl bg-white border border-[#EDE7DC] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#141414] text-[#B59E75] flex items-center justify-center">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#141414]">
                      Free Image Hosting & URL Guide (Zero Storage Limit)
                    </h3>
                    <p className="text-xs text-[#736E65]">
                      How to upload portfolio images online and paste direct URLs
                    </p>
                  </div>
                </div>

                <div className="text-xs text-[#554F44] space-y-3 leading-relaxed pt-2">
                  <p>
                    Browsers only provide ~5MB of local storage. If you upload large full-resolution image files directly, browser memory can fill up. 
                    <strong> The best industry practice is to use free external image hosts and paste their direct image links.</strong>
                  </p>
                </div>

                {/* Recommended Platforms */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E1D2] space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#141414]">1. ImgBB (Recommended)</h4>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        FREE & NO LOGIN
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B655B]">
                      Upload any JPG/PNG up to 32MB. Instant direct image links that never expire.
                    </p>
                    <a
                      href="https://imgbb.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#968054] hover:underline inline-flex items-center gap-1"
                    >
                      Visit imgbb.com <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E1D2] space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#141414]">2. PostImages</h4>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        FAST & PERMANENT
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B655B]">
                      Fast uploader. Choose "Direct Link" (ending in .jpg/.png) and paste into project.
                    </p>
                    <a
                      href="https://postimages.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#968054] hover:underline inline-flex items-center gap-1"
                    >
                      Visit postimages.org <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E1D2] space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#141414]">3. Cloudinary</h4>
                      <span className="text-[10px] font-bold text-[#736E65] bg-[#F2EDE2] px-2 py-0.5 rounded">
                        DEVELOPER CDN
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B655B]">
                      Free tier with 25GB bandwidth and automated image compression & resizing.
                    </p>
                    <a
                      href="https://cloudinary.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#968054] hover:underline inline-flex items-center gap-1"
                    >
                      Visit cloudinary.com <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E1D2] space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#141414]">4. Unsplash</h4>
                      <span className="text-[10px] font-bold text-[#736E65] bg-[#F2EDE2] px-2 py-0.5 rounded">
                        STOCK ASSETS
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B655B]">
                      Royalty-free high quality photography for placeholder concepts and mockups.
                    </p>
                    <a
                      href="https://unsplash.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#968054] hover:underline inline-flex items-center gap-1"
                    >
                      Visit unsplash.com <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Steps checklist */}
                <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E6DDCE] space-y-2 pt-3">
                  <h4 className="text-xs font-bold text-[#141414]">3 Simple Steps to Add Any New Project Image:</h4>
                  <ol className="text-xs text-[#5A544A] list-decimal list-inside space-y-1">
                    <li>Go to <strong className="text-[#141414]">imgbb.com</strong> and click "Start Uploading".</li>
                    <li>Copy the <strong className="text-[#141414]">Direct Link</strong> (e.g. <code className="bg-white px-1 py-0.5 rounded font-mono text-[10px]">https://i.ibb.co/xyz/image.jpg</code>).</li>
                    <li>Go to the <strong className="text-[#141414]">Projects & Images</strong> tab here and paste the URL into Thumbnail or Gallery!</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: HERO & BIO */}
          {/* ======================================================== */}
          {activeTab === 'hero' && (
            <div className="space-y-6 max-w-3xl">
              <div className="p-5 rounded-2xl bg-white border border-[#EDE7DC] space-y-4">
                <h3 className="text-sm font-bold text-[#141414] uppercase tracking-wider">
                  Header & Identity Names
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5A554B] mb-1">First Name</label>
                    <input
                      type="text"
                      value={data.hero.nameFirst}
                      onChange={(e) => {
                        updateData({ ...data, hero: { ...data.hero, nameFirst: e.target.value } });
                        triggerSaveNotice();
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm text-[#141414]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5A554B] mb-1">Last Name (Accent)</label>
                    <input
                      type="text"
                      value={data.hero.nameLast}
                      onChange={(e) => {
                        updateData({ ...data, hero: { ...data.hero, nameLast: e.target.value } });
                        triggerSaveNotice();
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm text-[#141414]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5A554B] mb-1">Role Badge</label>
                    <input
                      type="text"
                      value={data.hero.roleBadge}
                      onChange={(e) => {
                        updateData({ ...data, hero: { ...data.hero, roleBadge: e.target.value } });
                        triggerSaveNotice();
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm text-[#141414]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5A554B] mb-1">Client Focus Badge</label>
                    <input
                      type="text"
                      value={data.hero.clientFocusBadge}
                      onChange={(e) => {
                        updateData({ ...data, hero: { ...data.hero, clientFocusBadge: e.target.value } });
                        triggerSaveNotice();
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm text-[#141414]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5A554B] mb-1">Hero Headline Slogan / Quote</label>
                  <textarea
                    rows={2}
                    value={data.hero.headlineQuote}
                    onChange={(e) => {
                      updateData({ ...data, hero: { ...data.hero, headlineQuote: e.target.value } });
                      triggerSaveNotice();
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm text-[#141414]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5A554B] mb-1">Bio Paragraph</label>
                  <textarea
                    rows={3}
                    value={data.hero.bioParagraph}
                    onChange={(e) => {
                      updateData({ ...data, hero: { ...data.hero, bioParagraph: e.target.value } });
                      triggerSaveNotice();
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm text-[#141414]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5A554B] mb-1">Top Banner Availability Notice</label>
                  <input
                    type="text"
                    value={data.contact.availabilityText}
                    onChange={(e) => {
                      updateData({ ...data, contact: { ...data.contact, availabilityText: e.target.value } });
                      triggerSaveNotice();
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm text-[#141414]"
                  />
                </div>
              </div>

              {/* Metrics */}
              <div className="p-5 rounded-2xl bg-white border border-[#EDE7DC] space-y-4">
                <h3 className="text-sm font-bold text-[#141414] uppercase tracking-wider">
                  Hero Metrics Cards (3 Cards)
                </h3>
                
                {data.metrics.map((m, idx) => (
                  <div key={m.id || idx} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EBE4D6] grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#706B62]">Value / Number</label>
                      <input
                        type="text"
                        value={m.value}
                        onChange={(e) => {
                          const updated = [...data.metrics];
                          updated[idx] = { ...updated[idx], value: e.target.value };
                          updateData({ ...data, metrics: updated });
                          triggerSaveNotice();
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#DDD6C8] bg-white text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#706B62]">Label</label>
                      <input
                        type="text"
                        value={m.label}
                        onChange={(e) => {
                          const updated = [...data.metrics];
                          updated[idx] = { ...updated[idx], label: e.target.value };
                          updateData({ ...data, metrics: updated });
                          triggerSaveNotice();
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#DDD6C8] bg-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#706B62]">Subtext</label>
                      <input
                        type="text"
                        value={m.subtext}
                        onChange={(e) => {
                          const updated = [...data.metrics];
                          updated[idx] = { ...updated[idx], subtext: e.target.value };
                          updateData({ ...data, metrics: updated });
                          triggerSaveNotice();
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#DDD6C8] bg-white text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: CATEGORIES */}
          {/* ======================================================== */}
          {activeTab === 'categories' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="text-base font-bold text-[#141414]">
                Portfolio Categories ({data.categories.length})
              </h3>
              
              <div className="space-y-3">
                {data.categories.map((cat, idx) => (
                  <div key={cat.id || idx} className="p-4 rounded-xl bg-white border border-[#EDE7DC] space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#736E65]">Category Name</label>
                        <input
                          type="text"
                          value={cat.name}
                          onChange={(e) => {
                            const updated = [...data.categories];
                            updated[idx] = { ...updated[idx], name: e.target.value };
                            updateData({ ...data, categories: updated });
                            triggerSaveNotice();
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#D9D3C7] bg-[#FCFAF7] text-xs font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#736E65]">Slug (URL Identifier)</label>
                        <input
                          type="text"
                          value={cat.slug}
                          onChange={(e) => {
                            const updated = [...data.categories];
                            updated[idx] = { ...updated[idx], slug: e.target.value };
                            updateData({ ...data, categories: updated });
                            triggerSaveNotice();
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#D9D3C7] bg-[#FCFAF7] text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#736E65]">Description</label>
                      <input
                        type="text"
                        value={cat.description}
                        onChange={(e) => {
                          const updated = [...data.categories];
                          updated[idx] = { ...updated[idx], description: e.target.value };
                          updateData({ ...data, categories: updated });
                          triggerSaveNotice();
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#D9D3C7] bg-[#FCFAF7] text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: CAPABILITIES / DISCIPLINES */}
          {/* ======================================================== */}
          {activeTab === 'capabilities' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="text-base font-bold text-[#141414]">
                Design Disciplines (01-07)
              </h3>
              
              <div className="space-y-4">
                {data.capabilities.map((cap, idx) => (
                  <div key={cap.id || idx} className="p-4 rounded-xl bg-white border border-[#EDE7DC] space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#9E8B67] px-2 py-0.5 rounded bg-[#FAF7F0] border">
                        {cap.number}
                      </span>
                      <input
                        type="text"
                        value={cap.title}
                        onChange={(e) => {
                          const updated = [...data.capabilities];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          updateData({ ...data, capabilities: updated });
                          triggerSaveNotice();
                        }}
                        className="grow px-3 py-1.5 rounded-lg border border-[#D9D3C7] bg-[#FCFAF7] text-xs font-bold"
                      />
                    </div>

                    <textarea
                      rows={2}
                      value={cap.description}
                      onChange={(e) => {
                        const updated = [...data.capabilities];
                        updated[idx] = { ...updated[idx], description: e.target.value };
                        updateData({ ...data, capabilities: updated });
                        triggerSaveNotice();
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#D9D3C7] bg-[#FCFAF7] text-xs"
                    />

                    <div>
                      <label className="block text-[11px] font-semibold text-[#736E65] mb-1">Deliverables (Comma separated)</label>
                      <input
                        type="text"
                        value={cap.deliverables.join(', ')}
                        onChange={(e) => {
                          const updated = [...data.capabilities];
                          updated[idx] = {
                            ...updated[idx],
                            deliverables: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                          };
                          updateData({ ...data, capabilities: updated });
                          triggerSaveNotice();
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#D9D3C7] bg-[#FCFAF7] text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 6: PROBLEM SOLVER */}
          {/* ======================================================== */}
          {activeTab === 'problems' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="text-base font-bold text-[#141414]">
                Problem Solver & Business Solutions ({data.problemCases.length})
              </h3>
              
              <div className="space-y-4">
                {data.problemCases.map((pc, idx) => (
                  <div key={pc.id || idx} className="p-4 rounded-xl bg-white border border-[#EDE7DC] space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={pc.categoryBadge}
                        onChange={(e) => {
                          const updated = [...data.problemCases];
                          updated[idx] = { ...updated[idx], categoryBadge: e.target.value };
                          updateData({ ...data, problemCases: updated });
                          triggerSaveNotice();
                        }}
                        className="font-bold text-xs px-2 py-1 rounded border bg-[#FCFAF7]"
                      />
                      <input
                        type="text"
                        value={pc.metricBadge}
                        onChange={(e) => {
                          const updated = [...data.problemCases];
                          updated[idx] = { ...updated[idx], metricBadge: e.target.value };
                          updateData({ ...data, problemCases: updated });
                          triggerSaveNotice();
                        }}
                        className="font-bold text-xs px-2 py-1 rounded border bg-[#FCFAF7] text-[#968054]"
                      />
                    </div>

                    <input
                      type="text"
                      value={pc.problemTitle}
                      onChange={(e) => {
                        const updated = [...data.problemCases];
                        updated[idx] = { ...updated[idx], problemTitle: e.target.value };
                        updateData({ ...data, problemCases: updated });
                        triggerSaveNotice();
                      }}
                      className="font-bold text-sm px-2 py-1 rounded border w-full"
                    />

                    <textarea
                      rows={2}
                      value={pc.problemDescription}
                      onChange={(e) => {
                        const updated = [...data.problemCases];
                        updated[idx] = { ...updated[idx], problemDescription: e.target.value };
                        updateData({ ...data, problemCases: updated });
                        triggerSaveNotice();
                      }}
                      className="w-full text-xs p-2 rounded border"
                    />

                    <input
                      type="text"
                      value={pc.solutionTitle}
                      onChange={(e) => {
                        const updated = [...data.problemCases];
                        updated[idx] = { ...updated[idx], solutionTitle: e.target.value };
                        updateData({ ...data, problemCases: updated });
                        triggerSaveNotice();
                      }}
                      className="text-xs font-semibold px-2 py-1 rounded border w-full text-emerald-800"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 7: SKILLS & TOOLS */}
          {/* ======================================================== */}
          {activeTab === 'skills' && (
            <div className="space-y-4 max-w-3xl">
              <div className="p-5 rounded-2xl bg-white border border-[#EDE7DC] space-y-4">
                <h3 className="text-sm font-bold text-[#141414] uppercase tracking-wider">
                  Competencies & Software Tools
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-[#5A554B] mb-1">
                    Core Design Competencies (Comma-separated)
                  </label>
                  <textarea
                    rows={3}
                    value={data.skills.competencies.join(', ')}
                    onChange={(e) => {
                      updateData({
                        ...data,
                        skills: {
                          ...data.skills,
                          competencies: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        }
                      });
                      triggerSaveNotice();
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm text-[#141414]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5A554B] mb-1">
                    Software Tools (Comma-separated)
                  </label>
                  <textarea
                    rows={2}
                    value={data.skills.softwareTools.map(t => t.name).join(', ')}
                    onChange={(e) => {
                      const tools = e.target.value.split(',').map(s => ({ name: s.trim() })).filter(t => t.name);
                      updateData({
                        ...data,
                        skills: {
                          ...data.skills,
                          softwareTools: tools
                        }
                      });
                      triggerSaveNotice();
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm text-[#141414]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 8: TESTIMONIALS */}
          {/* ======================================================== */}
          {activeTab === 'testimonials' && (
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#141414]">
                  Client Testimonials ({data.testimonials.length})
                </h3>
                <button
                  onClick={() => {
                    const newTest: Testimonial = {
                      id: `test-${Date.now()}`,
                      rating: 5,
                      badgeText: "VERIFIED CLIENT REVIEW",
                      quote: "Outstanding visual craft and impeccable communication.",
                      author: "Client Name",
                      role: "Creative Director",
                      company: "Global Agency",
                      location: "USA",
                      initials: "CN"
                    };
                    saveTestimonial(newTest);
                    triggerSaveNotice();
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#141414] text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#B59E75]" /> Add Review
                </button>
              </div>

              <div className="space-y-4">
                {data.testimonials.map((test, idx) => (
                  <div key={test.id || idx} className="p-4 rounded-xl bg-white border border-[#EDE7DC] space-y-3">
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        value={test.author}
                        onChange={(e) => {
                          const updated = [...data.testimonials];
                          updated[idx] = { ...updated[idx], author: e.target.value };
                          updateData({ ...data, testimonials: updated });
                          triggerSaveNotice();
                        }}
                        className="font-bold text-sm px-2 py-1 rounded border border-[#DDD5C7] bg-[#FCFAF7]"
                      />
                      <button
                        onClick={() => {
                          deleteTestimonial(test.id);
                          triggerSaveNotice();
                        }}
                        className="text-xs text-red-600 hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="Role"
                        value={test.role}
                        onChange={(e) => {
                          const updated = [...data.testimonials];
                          updated[idx] = { ...updated[idx], role: e.target.value };
                          updateData({ ...data, testimonials: updated });
                          triggerSaveNotice();
                        }}
                        className="text-xs px-2 py-1 rounded border"
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={test.company}
                        onChange={(e) => {
                          const updated = [...data.testimonials];
                          updated[idx] = { ...updated[idx], company: e.target.value };
                          updateData({ ...data, testimonials: updated });
                          triggerSaveNotice();
                        }}
                        className="text-xs px-2 py-1 rounded border"
                      />
                      <input
                        type="text"
                        placeholder="Location"
                        value={test.location}
                        onChange={(e) => {
                          const updated = [...data.testimonials];
                          updated[idx] = { ...updated[idx], location: e.target.value };
                          updateData({ ...data, testimonials: updated });
                          triggerSaveNotice();
                        }}
                        className="text-xs px-2 py-1 rounded border"
                      />
                    </div>

                    <textarea
                      rows={3}
                      value={test.quote}
                      onChange={(e) => {
                        const updated = [...data.testimonials];
                        updated[idx] = { ...updated[idx], quote: e.target.value };
                        updateData({ ...data, testimonials: updated });
                        triggerSaveNotice();
                      }}
                      className="w-full text-xs p-2 rounded border"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 9: FAQS */}
          {/* ======================================================== */}
          {activeTab === 'faqs' && (
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#141414]">
                  Frequently Asked Questions ({data.faqs.length})
                </h3>
                <button
                  onClick={() => {
                    const newFaq: FAQItem = {
                      id: `faq-${Date.now()}`,
                      question: "New Question?",
                      answer: "Detailed answer goes here."
                    };
                    saveFAQ(newFaq);
                    triggerSaveNotice();
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#141414] text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#B59E75]" /> Add FAQ
                </button>
              </div>

              <div className="space-y-3">
                {data.faqs.map((faq, idx) => (
                  <div key={faq.id || idx} className="p-4 rounded-xl bg-white border border-[#EDE7DC] space-y-2">
                    <div className="flex justify-between items-center gap-2">
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => {
                          const updated = [...data.faqs];
                          updated[idx] = { ...updated[idx], question: e.target.value };
                          updateData({ ...data, faqs: updated });
                          triggerSaveNotice();
                        }}
                        className="w-full text-xs font-bold px-2 py-1 rounded border"
                      />
                      <button
                        onClick={() => {
                          deleteFAQ(faq.id);
                          triggerSaveNotice();
                        }}
                        className="text-xs text-red-600 hover:underline shrink-0 cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>

                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => {
                        const updated = [...data.faqs];
                        updated[idx] = { ...updated[idx], answer: e.target.value };
                        updateData({ ...data, faqs: updated });
                        triggerSaveNotice();
                      }}
                      className="w-full text-xs p-2 rounded border"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 10: CONTACT & FOOTER */}
          {/* ======================================================== */}
          {activeTab === 'contact' && (
            <div className="space-y-4 max-w-3xl">
              <div className="p-5 rounded-2xl bg-white border border-[#EDE7DC] space-y-4">
                <h3 className="text-sm font-bold text-[#141414] uppercase tracking-wider">
                  Contact Details & Direct Links
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-[#5A554B] mb-1">
                    WhatsApp Raw Number (e.g. 923001234567 - No plus sign, for direct wa.me chat)
                  </label>
                  <input
                    type="text"
                    value={data.contact.whatsapp}
                    onChange={(e) => {
                      updateData({ ...data, contact: { ...data.contact, whatsapp: e.target.value } });
                      triggerSaveNotice();
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm font-mono text-[#141414]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5A554B] mb-1">
                    WhatsApp Display Number (e.g. +92 300 1234567)
                  </label>
                  <input
                    type="text"
                    value={data.contact.whatsappDisplay}
                    onChange={(e) => {
                      updateData({ ...data, contact: { ...data.contact, whatsappDisplay: e.target.value } });
                      triggerSaveNotice();
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm text-[#141414]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5A554B] mb-1">Email Address</label>
                  <input
                    type="email"
                    value={data.contact.email}
                    onChange={(e) => {
                      updateData({ ...data, contact: { ...data.contact, email: e.target.value } });
                      triggerSaveNotice();
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm text-[#141414]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5A554B] mb-1">Location Focus</label>
                  <input
                    type="text"
                    value={data.contact.locationFocus || 'London • New York • Dubai • Worldwide'}
                    onChange={(e) => {
                      updateData({ ...data, contact: { ...data.contact, locationFocus: e.target.value } });
                      triggerSaveNotice();
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm text-[#141414]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5A554B] mb-1">Footer Copyright Text</label>
                  <input
                    type="text"
                    value={data.footer?.copyrightText || '© 2026 Muhammad Hamid. All rights reserved.'}
                    onChange={(e) => {
                      updateData({
                        ...data,
                        footer: {
                          ...data.footer,
                          copyrightText: e.target.value
                        }
                      });
                      triggerSaveNotice();
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm text-[#141414]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5A554B] mb-1">Footer Subtext</label>
                  <input
                    type="text"
                    value={data.footer?.subText || 'Crafted with precision for international brands.'}
                    onChange={(e) => {
                      updateData({
                        ...data,
                        footer: {
                          ...data.footer,
                          subText: e.target.value
                        }
                      });
                      triggerSaveNotice();
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-[#D9D3C7] bg-[#FCFAF7] text-sm text-[#141414]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 11: BACKUP & RESET */}
          {/* ======================================================== */}
          {activeTab === 'backup' && (
            <div className="space-y-6 max-w-2xl">
              <div className="p-6 rounded-2xl bg-white border border-[#EDE7DC] space-y-4">
                <h3 className="text-base font-bold text-[#141414]">
                  Export / Import Portfolio JSON Data
                </h3>
                <p className="text-xs text-[#736E65]">
                  Download a complete backup of your customized portfolio state, or restore an earlier backup file.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={handleExportJSON}
                    className="px-5 py-2.5 rounded-full bg-[#141414] text-white text-xs font-bold flex items-center gap-2 hover:bg-[#2A2824] cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#B59E75]" />
                    <span>Download JSON Backup</span>
                  </button>

                  <label className="px-5 py-2.5 rounded-full border border-[#D9D3C7] bg-[#F8F5EE] text-xs font-bold text-[#3B362F] flex items-center gap-2 hover:bg-[#EAE4D7] cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>Restore from JSON File</span>
                    <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-red-50 border border-red-200 space-y-3">
                <h3 className="text-sm font-bold text-red-900">
                  Reset to Original Portfolio Defaults
                </h3>
                <p className="text-xs text-red-700">
                  This will reset all data, images, and copy back to default settings.
                </p>
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to reset all portfolio data to default?")) {
                      resetToDefaults();
                      triggerSaveNotice();
                    }
                  }}
                  className="px-5 py-2.5 rounded-full bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-red-700 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset All Data</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
