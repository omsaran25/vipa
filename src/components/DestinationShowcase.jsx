import React from 'react';
import { Compass, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { handleImageError } from '../utils/imageFallback';

export default function DestinationShowcase({ onSelectDestination }) {
  const { lang, t } = useLanguage();

  const destinations = [
    {
      id: 'dest-jodhpur',
      name: { en: 'Jodhpur — Blue City & Mehrangarh', hi: 'जोधपुर — ब्लू सिटी और मेहरानगढ़' },
      state: { en: 'Jodhpur', hi: 'जोधपुर' },
      image: 'https://images.unsplash.com/photo-1602643163983-ed0babc397d6?auto=format&fit=crop&w=800&q=80',
      query: 'Jodhpur',
      badge: 'POPULAR'
    },
    {
      id: 'dest-jaisalmer',
      name: { en: 'Jaisalmer — Golden Fort & Sam Dunes', hi: 'जैसलमेर — गोल्डन फोर्ट और सैम ड्यून्स' },
      state: { en: 'Jaisalmer', hi: 'जैसलमेर' },
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      query: 'Jaisalmer',
      badge: 'DESERT'
    },
    {
      id: 'dest-jawai',
      name: { en: 'Jawai — Leopard Hills & Lakeside', hi: 'जवाई — तेंदुआ पहाड़ियां और झील' },
      state: { en: 'Jawai', hi: 'जवाई' },
      image: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=800&q=80',
      query: 'Jawai',
      badge: 'WILDLIFE'
    },
    {
      id: 'dest-group',
      name: { en: 'Rajasthan Group & Student Tours', hi: 'राजस्थान ग्रुप और स्टूडेंट टूर' },
      state: { en: 'Group departures', hi: 'ग्रुप प्रस्थान' },
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
      query: 'Group',
      badge: 'GROUPS'
    }
  ];

  return (
    <section id="destinations" className="py-20 bg-white dark:bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-100 dark:bg-slate-800 border border-teal-300 dark:border-teal-500/30 text-teal-800 dark:text-teal-300 text-xs font-extrabold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>{t('destinationsShowcase.tag')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-outfit">
              {t('destinationsShowcase.title')}
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md font-medium">
            {t('destinationsShowcase.subtitle')}
          </p>
        </div>

        {/* Grid Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <motion.div
              key={dest.id}
              whileHover={{ y: -8 }}
              className="relative h-96 rounded-3xl overflow-hidden group cursor-pointer border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all"
              onClick={() => onSelectDestination(dest.query)}
            >
              <img
                src={dest.image}
                alt={dest.name[lang]}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

              <div className="absolute top-4 left-4 bg-teal-600 text-white font-black text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                {dest.badge}
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-1 text-white">
                <span className="text-xs text-teal-300 font-bold tracking-widest uppercase">
                  {dest.state[lang]} • Rajasthan
                </span>
                <h3 className="text-xl font-black font-outfit line-clamp-2 group-hover:text-teal-200 transition-colors">
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
