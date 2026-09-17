import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PackagesSection from './components/PackagesSection';
import DestinationShowcase from './components/DestinationShowcase';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import PackageDetailModal from './components/PackageDetailModal';
import BookingModal from './components/BookingModal';

function AppContent() {
  const [searchFilters, setSearchFilters] = useState(null);
  const [activeDetailPackage, setActiveDetailPackage] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingPackage, setBookingPackage] = useState(null);

  const handleOpenBooking = (pkg = null) => {
    setBookingPackage(pkg);
    setBookingModalOpen(true);
  };

  const handleSelectDestination = (destName) => {
    setSearchFilters({ destination: destName });
    const pkgElem = document.getElementById('packages');
    if (pkgElem) {
      pkgElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
      {/* Top Navbar */}
      <Navbar onOpenBooking={() => handleOpenBooking(null)} />

      <main>
        {/* Hero Section */}
        <Hero
          onSearchSubmit={(filters) => setSearchFilters(filters)}
          onOpenBooking={() => handleOpenBooking(null)}
        />

        {/* Filterable Tour Packages */}
        <PackagesSection
          searchFilters={searchFilters}
          onSelectPackage={(pkg) => setActiveDetailPackage(pkg)}
          onQuickBook={(pkg) => handleOpenBooking(pkg)}
        />

        {/* Indian Spotlights */}
        <DestinationShowcase onSelectDestination={handleSelectDestination} />

        {/* Services Showcase */}
        <ServicesSection />

        {/* About Company & Stats */}
        <AboutSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* FAQ Accordions */}
        <FAQSection />

        {/* Contact Form & Locations */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {activeDetailPackage && (
        <PackageDetailModal
          pkg={activeDetailPackage}
          onClose={() => setActiveDetailPackage(null)}
          onBookNow={(pkg) => handleOpenBooking(pkg)}
        />
      )}

      {bookingModalOpen && (
        <BookingModal
          preselectedPackage={bookingPackage}
          onClose={() => setBookingModalOpen(false)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
