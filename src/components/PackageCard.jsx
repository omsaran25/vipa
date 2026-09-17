import React from 'react';
import { MapPin, Star, Clock, Plane, Building2, UtensilsCrossed, Compass, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function PackageCard({ pkg, onSelectPackage, onQuickBook }) {
  const { lang, t } = useLanguage();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="bg-white rounded-3xl overflow-hidden flex flex-col h-full border border-slate-200 group relative shadow-md hover:shadow-2xl transition-all duration-300"
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

        {/* Customizable Tag */}
        <div className="absolute top-3 left-3 bg-teal-600 text-white backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
          {t('packages.card.customizable')}
        </div>

        {/* Rating Pill */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-extrabold text-amber-500 flex items-center gap-1 border border-amber-400 shadow-md">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>{pkg.rating}</span>
          <span className="text-[10px] text-slate-500 font-medium">({pkg.reviewsCount})</span>
        </div>

        {/* Duration & Location */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-semibold text-white">
          <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/20">
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            <span>
              {pkg.durationDays} {t('packages.card.days')} / {pkg.durationNights} {t('packages.card.nights')}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-xl text-teal-300 border border-white/20">
            <MapPin className="w-3.5 h-3.5 text-teal-400" />
            <span className="truncate max-w-[130px]">{pkg.location[lang]}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow justify-between gap-4 bg-white">
        <div>
          {/* Title */}
          <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2 font-outfit">
            {pkg.title[lang]}
          </h3>

          {/* Highlights List */}
          <ul className="mt-3 space-y-1.5">
            {pkg.highlights[lang].slice(0, 2).map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium line-clamp-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Inclusions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="font-bold text-[11px] uppercase tracking-wider text-slate-600">{t('packages.card.inclusions')}:</span>
          <div className="flex items-center gap-2.5 text-teal-700">
            {pkg.inclusions.flight && <Plane className="w-4 h-4" title="Flight Included" />}
            {pkg.inclusions.hotel && <Building2 className="w-4 h-4" title="Hotel Included" />}
            {pkg.inclusions.meals && <UtensilsCrossed className="w-4 h-4" title="Meals Included" />}
            {pkg.inclusions.guide && <Compass className="w-4 h-4" title="Guide Included" />}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => onSelectPackage(pkg)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 text-xs font-bold transition-all cursor-pointer text-center border border-slate-200"
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
