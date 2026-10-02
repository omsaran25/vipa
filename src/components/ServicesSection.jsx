import React from 'react';
import { Building2, FileCheck2, Ship, Headphones, Sparkles, Map, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { serviceCardImages } from '../data/siteLinks';
import { handleImageError } from '../utils/imageFallback';

export default function ServicesSection({ onOpenBooking }) {
  const { t } = useLanguage();

  const serviceIcons = [
    <Map className="w-6 h-6 text-teal-700 dark:text-teal-400" />,
    <FileCheck2 className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
    <Building2 className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />,
    <Ship className="w-6 h-6 text-indigo-700 dark:text-indigo-400" />,
    <Headphones className="w-6 h-6 text-purple-700 dark:text-purple-400" />
  ];

  const items = t('services.items');

  const handleRequestDetails = () => {
    if (onOpenBooking) onOpenBooking();
  };

  return (
    <section id="services" className="py-20 bg-slate-50 dark:bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-teal-100 dark:bg-slate-900 border border-teal-300 dark:border-teal-500/30 text-teal-800 dark:text-teal-300 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('services.tag')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-outfit">
            {t('services.title')}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((srv, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-400 shadow-md hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between overflow-hidden"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={serviceCardImages[idx] || serviceCardImages[0]}
                  alt={srv.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                <div className="absolute bottom-3 left-4 w-12 h-12 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-teal-200 dark:border-slate-700 flex items-center justify-center shadow-sm">
                  {serviceIcons[idx]}
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4 flex flex-col flex-1">
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-outfit group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                  {srv.title}
                </h3>

                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed flex-1">
                  {srv.desc}
                </p>

                <button
                  type="button"
                  onClick={handleRequestDetails}
                  className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-teal-700 dark:text-teal-400 flex items-center justify-between group-hover:translate-x-1 transition-transform w-full text-left cursor-pointer"
                >
                  <span>Request Details</span>
                  <ArrowRight className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
