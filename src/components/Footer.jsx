import React from 'react';
import { Compass, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-sky-600 flex items-center justify-center text-white shadow-lg">
                <Compass className="w-6 h-6 animate-spin-slow" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight font-outfit">
                VIPA <span className="gradient-text">HOLIDAYS</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t('footer.desc')}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 hover:bg-teal-500 hover:text-white transition-colors">
                <span className="text-xs font-bold">FB</span>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 hover:bg-teal-500 hover:text-white transition-colors">
                <span className="text-xs font-bold">IG</span>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 hover:bg-teal-500 hover:text-white transition-colors">
                <span className="text-xs font-bold">YT</span>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 hover:bg-teal-500 hover:text-white transition-colors">
                <span className="text-xs font-bold">WA</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-outfit">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#home" className="hover:text-teal-400 transition-colors">Home</a></li>
              <li><a href="#packages" className="hover:text-teal-400 transition-colors">India Tour Packages</a></li>
              <li><a href="#destinations" className="hover:text-teal-400 transition-colors">Destinations</a></li>
              <li><a href="#services" className="hover:text-teal-400 transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-teal-400 transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-teal-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Popular Spots */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-outfit">
              {t('footer.popularDestinations')}
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#packages" className="hover:text-teal-400 transition-colors">Kashmir Valley & Gulmarg</a></li>
              <li><a href="#packages" className="hover:text-teal-400 transition-colors">Kerala Backwaters & Munnar</a></li>
              <li><a href="#packages" className="hover:text-teal-400 transition-colors">Rajasthan Royal Forts</a></li>
              <li><a href="#packages" className="hover:text-teal-400 transition-colors">Manali & Solang Valley</a></li>
              <li><a href="#packages" className="hover:text-teal-400 transition-colors">Leh Ladakh Expedition</a></li>
              <li><a href="#packages" className="hover:text-teal-400 transition-colors">Goa Beach Vacation</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-outfit">
              {t('footer.newsletterTitle')}
            </h4>
            <p className="text-xs text-slate-400">
              {t('footer.newsletterDesc')}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="email"
                placeholder={t('footer.subscribePlaceholder')}
                className="w-full px-3 py-2 bg-slate-800 text-xs text-slate-200 rounded-xl border border-slate-700 focus:outline-none focus:border-teal-400"
              />
              <button className="p-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold shadow-md transition-all">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Vipa Holidays. {t('footer.rights')}</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:underline">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:underline">Cancellation Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
