import React from 'react';
import { Compass, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function DestinationShowcase({ onSelectDestination }) {
  const { lang, t } = useLanguage();

  const destinations = [
    {
      id: 'dest-kashmir',
      name: { en: 'Kashmir Valley & Gulmarg Snow', hi: 'कश्मीर घाटी और गुलमर्ग बर्फ' },
      state: { en: 'Jammu & Kashmir', hi: 'जम्मू और कश्मीर' },
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
      badge: 'POPULAR'
    },
    {
      id: 'dest-kerala',
      name: { en: 'Kerala Backwaters & Munnar Hills', hi: 'केरल बैकवाटर और मुन्नार पहाड़ियां' },
      state: { en: 'Kerala', hi: 'केरल' },
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
      badge: 'TOP CHOICE'
    },
    {
      id: 'dest-rajasthan',
      name: { en: 'Royal Forts of Rajasthan', hi: 'राजस्थान के शाही किले' },
      state: { en: 'Rajasthan', hi: 'राजस्थान' },
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
      badge: 'HERITAGE'
    },
    {
      id: 'dest-ladakh',
      name: { en: 'Leh Ladakh Pangong Odyssey', hi: 'लेह लद्दाख पैंगोंग यात्रा' },
      state: { en: 'Ladakh', hi: 'लद्दाख' },
      image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
      badge: 'ADVENTURE'
    }
  ];

  return (
    <section id="destinations" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-100 border border-teal-300 text-teal-800 text-xs font-extrabold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5 text-teal-600" />
              <span>{t('destinationsShowcase.tag')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-outfit">
              {t('destinationsShowcase.title')}
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md font-medium">
            {t('destinationsShowcase.subtitle')}
          </p>
        </div>

        {/* Grid Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <motion.div
              key={dest.id}
              whileHover={{ y: -8 }}
              className="relative h-96 rounded-3xl overflow-hidden group cursor-pointer border border-slate-200 shadow-lg hover:shadow-2xl transition-all"
              onClick={() => onSelectDestination(dest.state.en)}
            >
              <img
                src={dest.image}
                alt={dest.name[lang]}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

              {/* Badge */}
              <div className="absolute top-4 left-4 bg-teal-600 text-white font-black text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                {dest.badge}
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-1 text-white">
                <span className="text-xs text-teal-300 font-bold tracking-widest uppercase">
                  {dest.state[lang]} • India
                </span>
                <h3 className="text-xl font-black font-outfit line-clamp-1 group-hover:text-teal-200 transition-colors">
                  {dest.name[lang]}
                </h3>
                <div className="mt-2 flex items-center gap-2 text-xs font-bold text-slate-200 group-hover:text-white">
                  <span>{t('destinationsShowcase.exploreMore')}</span>
                  <ArrowRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
