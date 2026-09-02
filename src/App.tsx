import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { TopBanner, Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioCategories } from './components/PortfolioCategories';
import { CoreCapabilities } from './components/CoreCapabilities';
import { ProblemSolverSection } from './components/ProblemSolverSection';
import { ContactSection, Footer } from './components/ContactSection';
import { CategoryGalleryModal } from './components/CategoryGalleryModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { PasswordModal } from './components/AdminPanel/PasswordModal';
import { AdminDashboardModal } from './components/AdminPanel/AdminDashboardModal';

export default function App() {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-[#FAF8F5] text-[#141414] font-sans antialiased selection:bg-[#B59E75]/20 selection:text-[#141414] flex flex-col">
        {/* Top Notification Announcement */}
        <TopBanner />

        {/* Sticky Header Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="grow">
          {/* Hero Section */}
          <Hero />

          {/* Selected Portfolio & Case Studies by Category */}
          <PortfolioCategories />

          {/* Core Creative Capabilities (01-07) */}
          <CoreCapabilities />

          {/* Problem Solver & Impact */}
          <ProblemSolverSection />

          {/* Contact Section & Form */}
          <ContactSection />
        </main>

        {/* Footer with 5-tap Hidden Admin trigger on Copyright */}
        <Footer />

        {/* Interactive Modals */}
        <CategoryGalleryModal />
        <CaseStudyModal />
        <PasswordModal />
        <AdminDashboardModal />
      </div>
    </PortfolioProvider>
  );
}

