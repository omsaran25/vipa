import React, { useState, useEffect } from 'react';
import { Compass, Globe2, Menu, X, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ onOpenBooking }) {
  const { lang, toggleLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.packages'), href: '#packages' },
    { name: t('nav.destinations'), href: '#destinations' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.testimonials'), href: '#testimonials' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 shadow-sm py-3'
          : 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-600 via-teal-700 to-sky-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-outfit">
              VIPA <span className="gradient-text">HOLIDAYS</span>
            </span>
            <span className="text-[10px] tracking-widest text-teal-700 dark:text-teal-400 font-bold uppercase -mt-1">
              {t('nav.tagline')}
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors relative py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Controls (Language Switcher, Theme Toggle, CTA) */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-teal-500 transition-all cursor-pointer shadow-sm"
          >
            <Globe2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>{t('nav.lang')}</span>
          </button>

          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Quick Free Quote CTA */}
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-teal-600 via-teal-700 to-sky-700 hover:from-teal-500 hover:to-sky-600 text-white font-extrabold text-xs shadow-md shadow-teal-600/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{t('nav.bookNow')}</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white/98 dark:bg-slate-950/98 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 px-6 py-6 shadow-2xl">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold text-slate-800 dark:text-slate-200 hover:text-teal-600 py-1 border-b border-slate-100 dark:border-slate-800"
              >
                {link.name}
              </a>
            ))}

            <div className="flex items-center justify-between pt-3">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-800 dark:text-slate-200"
              >
                <Globe2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>{t('nav.lang')}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-teal-600 to-sky-700 text-white font-extrabold text-sm shadow-md"
              >
                <span>{t('nav.bookNow')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
