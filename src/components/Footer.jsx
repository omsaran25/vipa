import React, { useState } from 'react';
import { Compass, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { siteLinks } from '../data/siteLinks';

const destinationFilters = [
  { label: 'Kashmir Valley & Gulmarg', query: 'Kashmir' },
  { label: 'Kerala Backwaters & Munnar', query: 'Kerala' },
  { label: 'Rajasthan Royal Forts', query: 'Rajasthan' },
  { label: 'Manali & Solang Valley', query: 'Manali' },
  { label: 'Leh Ladakh Expedition', query: 'Ladakh' },
  { label: 'Goa Beach Vacation', query: 'Goa' },
];

export default function Footer({ onSelectDestination }) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const handleDestClick = (query) => {
    if (onSelectDestination) {
      onSelectDestination(query);
      return;
    }
    const el = document.getElementById('packages');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

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
              <a href={siteLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 hover:bg-teal-500 hover:text-white transition-colors" aria-label="Facebook">
                <span className="text-xs font-bold">FB</span>
              </a>
              <a href={siteLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 hover:bg-teal-500 hover:text-white transition-colors" aria-label="Instagram">
                <span className="text-xs font-bold">IG</span>
              </a>
              <a href={siteLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 hover:bg-teal-500 hover:text-white transition-colors" aria-label="YouTube">
                <span className="text-xs font-bold">YT</span>
              </a>
              <a href={siteLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 hover:bg-teal-500 hover:text-white transition-colors" aria-label="WhatsApp">
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
              <li><a href="#packages" className="hover:text-teal-400 transition-colors">Rajasthan Tour Packages</a></li>
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
              {destinationFilters.map((dest) => (
                <li key={dest.query}>
                  <button
                    type="button"
                    onClick={() => handleDestClick(dest.query)}
                    className="hover:text-teal-400 transition-colors text-left"
                  >
                    {dest.label}
                  </button>
                </li>
              ))}
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
            {subscribed && (
              <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Thanks! You are subscribed for deal alerts.
              </p>
            )}
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 pt-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.subscribePlaceholder')}
                className="w-full px-3 py-2 bg-slate-800 text-xs text-slate-200 rounded-xl border border-slate-700 focus:outline-none focus:border-teal-400"
              />
              <button type="submit" className="p-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold shadow-md transition-all">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Vipa Holidays. {t('footer.rights')}</p>
          <div className="flex items-center gap-4">
            <a href="#contact" className="hover:underline hover:text-teal-400">Privacy Policy</a>
            <span>•</span>
            <a href="#faq" className="hover:underline hover:text-teal-400">Terms of Service</a>
            <span>•</span>
            <a href="#faq" className="hover:underline hover:text-teal-400">Cancellation Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
