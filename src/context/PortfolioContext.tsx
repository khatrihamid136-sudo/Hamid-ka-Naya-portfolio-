import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioSiteData, Project, Category, Capability, ProblemSolutionCase, Testimonial, FAQItem } from '../types/portfolio';
import { initialPortfolioData } from '../data/initialData';

const STORAGE_KEY = 'muhammad_hamid_portfolio_data_v13';

interface PortfolioContextType {
  data: PortfolioSiteData;
  updateData: (newData: PortfolioSiteData) => void;
  resetToDefaults: () => void;
  isSyncing: boolean;
  
  // Project & Category Modals
  selectedCategorySlug: string | null;
  setSelectedCategorySlug: (slug: string | null) => void;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  
  // Admin Panel
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isPasswordPromptOpen: boolean;
  setIsPasswordPromptOpen: (open: boolean) => void;
  handleCopyrightClick: () => void;
  verifyAdminPassword: (password: string) => boolean;
  
  // Quick entity helpers
  saveProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  saveCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  saveCapability: (capability: Capability) => void;
  deleteCapability: (id: string) => void;
  saveProblemCase: (problemCase: ProblemSolutionCase) => void;
  deleteProblemCase: (id: string) => void;
  saveTestimonial: (testimonial: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  saveFAQ: (faq: FAQItem) => void;
  deleteFAQ: (id: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioSiteData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load portfolio data from localStorage', e);
    }
    return initialPortfolioData;
  });

  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isPasswordPromptOpen, setIsPasswordPromptOpen] = useState<boolean>(false);

  // Fetch latest global data from server on mount to ensure all devices and browsers see the same changes
  useEffect(() => {
    let isMounted = true;
    const fetchServerData = async () => {
      try {
        const res = await fetch('/api/portfolio-data');
        if (res.ok) {
          const json = await res.json();
          if (json?.data && isMounted) {
            setData(json.data);
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
            } catch (e) {
              console.warn('LocalStorage save failed', e);
            }
          }
        }
      } catch (err) {
        console.warn('Could not fetch server data, using local fallback:', err);
      }
    };

    fetchServerData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Helper function to sync data to server and localStorage
  const persistGlobally = async (newData: PortfolioSiteData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Failed to save portfolio data to localStorage', e);
    }

    try {
      setIsSyncing(true);
      await fetch('/api/portfolio-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });
    } catch (err) {
      console.warn('Server sync request failed:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  const updateData = (newData: PortfolioSiteData) => {
    setData(newData);
    persistGlobally(newData);
  };

  const resetToDefaults = async () => {
    setData(initialPortfolioData);
    localStorage.removeItem(STORAGE_KEY);
    try {
      await fetch('/api/reset-portfolio-data', { method: 'POST' });
    } catch (e) {
      console.warn('Failed to reset on server', e);
    }
  };

  const handleCopyrightClick = () => {
    setIsPasswordPromptOpen(true);
  };

  const verifyAdminPassword = (password: string): boolean => {
    if (password === 'admin123') {
      setIsPasswordPromptOpen(false);
      setIsAdminOpen(true);
      return true;
    }
    return false;
  };

  // Helper CRUD methods
  const saveProject = (project: Project) => {
    setData(prev => {
      const exists = prev.projects.some(p => p.id === project.id);
      const updatedProjects = exists
        ? prev.projects.map(p => (p.id === project.id ? project : p))
        : [project, ...prev.projects];

      // Update category project counts
      const updatedCategories = prev.categories.map(cat => {
        const count = updatedProjects.filter(p => p.categorySlug === cat.slug).length;
        return { ...cat, projectCount: count };
      });

      const nextData = {
        ...prev,
        projects: updatedProjects,
        categories: updatedCategories
      };
      persistGlobally(nextData);
      return nextData;
    });
  };

  const deleteProject = (id: string) => {
    setData(prev => {
      const updatedProjects = prev.projects.filter(p => p.id !== id);
      const updatedCategories = prev.categories.map(cat => {
        const count = updatedProjects.filter(p => p.categorySlug === cat.slug).length;
        return { ...cat, projectCount: count };
      });
      const nextData = {
        ...prev,
        projects: updatedProjects,
        categories: updatedCategories
      };
      persistGlobally(nextData);
      return nextData;
    });
  };

  const saveCategory = (category: Category) => {
    setData(prev => {
      const exists = prev.categories.some(c => c.id === category.id);
      const updatedCategories = exists
        ? prev.categories.map(c => (c.id === category.id ? category : c))
        : [...prev.categories, category];
      const nextData = { ...prev, categories: updatedCategories };
      persistGlobally(nextData);
      return nextData;
    });
  };

  const deleteCategory = (id: string) => {
    setData(prev => {
      const nextData = {
        ...prev,
        categories: prev.categories.filter(c => c.id !== id)
      };
      persistGlobally(nextData);
      return nextData;
    });
  };

  const saveCapability = (capability: Capability) => {
    setData(prev => {
      const exists = prev.capabilities.some(c => c.id === capability.id);
      const updated = exists
        ? prev.capabilities.map(c => (c.id === capability.id ? capability : c))
        : [...prev.capabilities, capability];
      const nextData = { ...prev, capabilities: updated };
      persistGlobally(nextData);
      return nextData;
    });
  };

  const deleteCapability = (id: string) => {
    setData(prev => {
      const nextData = {
        ...prev,
        capabilities: prev.capabilities.filter(c => c.id !== id)
      };
      persistGlobally(nextData);
      return nextData;
    });
  };

  const saveProblemCase = (problemCase: ProblemSolutionCase) => {
    setData(prev => {
      const exists = prev.problemCases.some(p => p.id === problemCase.id);
      const updated = exists
        ? prev.problemCases.map(p => (p.id === problemCase.id ? problemCase : p))
        : [...prev.problemCases, problemCase];
      const nextData = { ...prev, problemCases: updated };
      persistGlobally(nextData);
      return nextData;
    });
  };

  const deleteProblemCase = (id: string) => {
    setData(prev => {
      const nextData = {
        ...prev,
        problemCases: prev.problemCases.filter(p => p.id !== id)
      };
      persistGlobally(nextData);
      return nextData;
    });
  };

  const saveTestimonial = (testimonial: Testimonial) => {
    setData(prev => {
      const exists = prev.testimonials.some(t => t.id === testimonial.id);
      const updated = exists
        ? prev.testimonials.map(t => (t.id === testimonial.id ? testimonial : t))
        : [...prev.testimonials, testimonial];
      const nextData = { ...prev, testimonials: updated };
      persistGlobally(nextData);
      return nextData;
    });
  };

  const deleteTestimonial = (id: string) => {
    setData(prev => {
      const nextData = {
        ...prev,
        testimonials: prev.testimonials.filter(t => t.id !== id)
      };
      persistGlobally(nextData);
      return nextData;
    });
  };

  const saveFAQ = (faq: FAQItem) => {
    setData(prev => {
      const exists = prev.faqs.some(f => f.id === faq.id);
      const updated = exists
        ? prev.faqs.map(f => (f.id === faq.id ? faq : f))
        : [...prev.faqs, faq];
      const nextData = { ...prev, faqs: updated };
      persistGlobally(nextData);
      return nextData;
    });
  };

  const deleteFAQ = (id: string) => {
    setData(prev => {
      const nextData = {
        ...prev,
        faqs: prev.faqs.filter(f => f.id !== id)
      };
      persistGlobally(nextData);
      return nextData;
    });
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateData,
        resetToDefaults,
        isSyncing,
        selectedCategorySlug,
        setSelectedCategorySlug,
        selectedProject,
        setSelectedProject,
        isAdminOpen,
        setIsAdminOpen,
        isPasswordPromptOpen,
        setIsPasswordPromptOpen,
        handleCopyrightClick,
        verifyAdminPassword,
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
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
