import React from 'react';
import { MapPin, Star, Clock, Plane, Building2, UtensilsCrossed, Compass, CheckCircle2, ChevronRight, Sparkles, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function PackageCard({ pkg, onSelectPackage, onQuickBook }) {
  const { lang, t } = useLanguage();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="glass-card rounded-3xl overflow-hidden flex flex-col h-full border border-slate-200 dark:border-slate-800 group relative shadow-md hover:shadow-xl"
    >
      {/* Package Image & Badges */}
      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title[lang]}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

        {/* Category / Customizable Tag */}
        <div className="absolute top-3 left-3 bg-teal-600/90 text-white backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
          {t('packages.card.customizable')}
        </div>

        {/* Rating Pill */}
        <div className="absolute top-3 right-3 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-extrabold text-amber-500 flex items-center gap-1 border border-amber-500/30 shadow-md">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>{pkg.rating}</span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">({pkg.reviewsCount})</span>
        </div>

        {/* Duration & Location */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-semibold text-white">
          <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10">
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            <span>
              {pkg.durationDays} {t('packages.card.days')} / {pkg.durationNights} {t('packages.card.nights')}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-xl text-teal-300 border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-teal-400" />
            <span className="truncate max-w-[130px]">{pkg.location[lang]}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow justify-between gap-4 bg-white dark:bg-slate-900">
        <div>
          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors line-clamp-2 font-outfit">
            {pkg.title[lang]}
          </h3>

          {/* Highlights List */}
          <ul className="mt-3 space-y-1.5">
            {pkg.highlights[lang].slice(0, 2).map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Inclusions Icon Bar */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span className="font-semibold text-[11px] uppercase tracking-wider">{t('packages.card.inclusions')}:</span>
          <div className="flex items-center gap-2.5 text-teal-700 dark:text-teal-400">
            {pkg.inclusions.flight && <Plane className="w-4 h-4" title="Flight Included" />}
            {pkg.inclusions.hotel && <Building2 className="w-4 h-4" title="Hotel Included" />}
            {pkg.inclusions.meals && <UtensilsCrossed className="w-4 h-4" title="Meals Included" />}
            {pkg.inclusions.guide && <Compass className="w-4 h-4" title="Guide Included" />}
          </div>
        </div>

        {/* Action Buttons (No Prices) */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => onSelectPackage(pkg)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 text-xs font-bold transition-all cursor-pointer text-center"
          >
            {t('packages.card.viewDetails')}
          </button>

          <button
            onClick={() => onQuickBook(pkg)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-teal-600 to-sky-700 hover:from-teal-500 hover:to-sky-600 text-white text-xs font-extrabold shadow-md shadow-teal-600/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{t('packages.card.bookTrip')}</span>
          </button>
        </div>

      </div>
    </motion.div>
  );
}
