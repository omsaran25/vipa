import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Star, ShieldCheck, Headphones, Award, Sparkles, ChevronRight, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Hero({ onSearchSubmit, onOpenBooking }) {
  const { lang, t } = useLanguage();

  const [destinationQuery, setDestinationQuery] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [guests, setGuests] = useState('2');
  const [budget, setBudget] = useState('all');

  const heroSpotlights = [
    {
      title: { en: "Kashmir Snow Paradise", hi: "कश्मीर बर्फ पैराडाइज" },
      tag: "Himalayas",
      image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
      query: "Kashmir"
    },
    {
      title: { en: "Kerala Serene Backwaters", hi: "केरल शांत बैकवाटर" },
      tag: "God's Own Country",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
      query: "Kerala"
    },
    {
      title: { en: "Royal Forts of Rajasthan", hi: "राजस्थान के शाही किले" },
      tag: "Heritage",
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
      query: "Rajasthan"
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit({ destination: destinationQuery, travelDate, guests, budget });
    }
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSpotlightClick = (q) => {
    setDestinationQuery(q);
    if (onSearchSubmit) {
      onSearchSubmit({ destination: q });
    }
    const pkgSec = document.getElementById('packages');
    if (pkgSec) pkgSec.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-b from-teal-50/70 via-white to-slate-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 overflow-hidden">
      
      {/* Background ambient lighting glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-teal-400/15 dark:bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-sky-400/15 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Search Box */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100 dark:bg-slate-900 border border-teal-300 dark:border-teal-500/30 text-teal-800 dark:text-teal-300 text-xs sm:text-sm font-bold tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{t('hero.badge')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15] font-outfit">
              {t('hero.titlePrefix')}{' '}
              <span className="gradient-text">{t('hero.titleHighlight')}</span>
              <br />
              <span className="text-slate-800 dark:text-slate-200 font-extrabold text-3xl sm:text-4xl lg:text-5xl block mt-2">
                {t('hero.titleSuffix')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-xl font-medium leading-relaxed">
              {t('hero.subtitle')}
            </p>

            {/* Search Box */}
            <div className="w-full bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-teal-900/5">
              <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                    {t('hero.searchBox.destination')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('hero.searchBox.destinationPlaceholder')}
                    value={destinationQuery}
                    onChange={(e) => setDestinationQuery(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                    {t('hero.searchBox.travelDate')}
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                    {t('hero.searchBox.guests')}
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal-500"
                  >
                    <option value="1">1 Solo Traveler</option>
                    <option value="2">2 Couple / Duo</option>
                    <option value="4">4 Family Group</option>
                    <option value="6+">6+ Large Group</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-600 via-teal-700 to-sky-700 hover:from-teal-500 hover:to-sky-600 text-white font-extrabold text-xs shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    <span>{t('hero.searchBox.searchBtn')}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 w-full">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <Star className="w-5 h-5 text-amber-500 shrink-0 fill-amber-500" />
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">4.9/5 Rating</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">2.4k+ Reviews</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">100% Verified</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Luxury Stays</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <Headphones className="w-5 h-5 text-teal-700 dark:text-teal-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">24/7 VIP Desk</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">On-Trip Support</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <Award className="w-5 h-5 text-sky-700 dark:text-sky-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">Best Quotes</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Customized Deals</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Spotlight Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-widest flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                Trending Indian Spotlights
              </span>
              <button
                onClick={() => onOpenBooking()}
                className="text-xs font-extrabold text-teal-700 dark:text-teal-400 hover:underline"
              >
                Request Custom Package →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {heroSpotlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, scale: 1.02 }}
                  onClick={() => handleSpotlightClick(item.query)}
                  className="relative h-72 rounded-3xl overflow-hidden shadow-xl cursor-pointer group border border-slate-200 dark:border-slate-800"
                >
                  <img
                    src={item.image}
                    alt={item.title[lang]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  
                  <div className="absolute top-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-extrabold text-teal-800 dark:text-teal-300 uppercase tracking-wider shadow-sm">
                    {item.tag}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-sm font-bold font-outfit line-clamp-2 group-hover:text-teal-300 transition-colors">
                      {item.title[lang]}
                    </h3>
                    <span className="text-[11px] text-teal-300 font-semibold mt-1 inline-flex items-center gap-1">
                      View Package <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
