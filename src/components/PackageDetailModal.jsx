import React, { useState } from 'react';
import { X, MapPin, Clock, Star, CheckCircle, XCircle, Plane, Building2, UtensilsCrossed, Compass, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function PackageDetailModal({ pkg, onClose, onBookNow }) {
  const { lang, t } = useLanguage();
  const [activeImage, setActiveImage] = useState(pkg?.image);
  const [activeTab, setActiveTab] = useState('itinerary');

  if (!pkg) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div>
            <span className="text-xs font-extrabold text-teal-700 dark:text-teal-400 uppercase tracking-widest">
              India Tour Package • {pkg.durationDays} Days
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-outfit line-clamp-1">
              {pkg.title[lang]}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Main Photo & Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 h-64 sm:h-80 rounded-2xl overflow-hidden relative shadow-lg">
              <img src={activeImage} alt={pkg.title[lang]} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-xl text-xs text-white font-semibold flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>{pkg.location[lang]}</span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            <div className="flex flex-col justify-between gap-3">
              <div className="grid grid-cols-3 md:grid-cols-1 gap-2.5">
                {pkg.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`h-20 md:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === imgUrl ? 'border-teal-600 scale-95' : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="gallery" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Badges */}
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span>{pkg.rating} ({pkg.reviewsCount})</span>
                </div>
                <div className="flex items-center gap-1.5 text-teal-700 dark:text-teal-400 font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>{pkg.durationDays}D / {pkg.durationNights}N</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-2">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'itinerary'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t('modal.itinerary')}
            </button>

            <button
              onClick={() => setActiveTab('inclusions')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'inclusions'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t('modal.inclusions')}
            </button>
          </div>

          {/* Tab 1: Day-by-Day Itinerary */}
          {activeTab === 'itinerary' && (
            <div className="space-y-4">
              {pkg.itinerary[lang].map((item) => (
                <div
                  key={item.day}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start gap-4"
                >
                  <div className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-sky-700 text-white font-extrabold text-xs shadow-md shrink-0">
                    Day {item.day}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Inclusions & Exclusions */}
          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-500/30">
                <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-2 mb-3">
                  <CheckCircle className="w-4 h-4" />
                  {t('modal.inclusions')}
                </h4>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-200">
                  <li className="flex items-center gap-2">✓ 4-Star / 5-Star Accommodations with Breakfast & Dinner</li>
                  <li className="flex items-center gap-2">✓ Private AC Vehicle transfers for all sightseeing</li>
                  <li className="flex items-center gap-2">✓ All Entry Permits, Toll Taxes, Driver Allowance</li>
                  <li className="flex items-center gap-2">✓ 24/7 Dedicated Travel Concierge support</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-300 dark:border-rose-500/30">
                <h4 className="text-sm font-bold text-rose-800 dark:text-rose-400 flex items-center gap-2 mb-3">
                  <XCircle className="w-4 h-4" />
                  {t('modal.exclusions')}
                </h4>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-200">
                  <li className="flex items-center gap-2">✕ Personal expenses (Shopping, Laundry, Telephone)</li>
                  <li className="flex items-center gap-2">✕ Travel Insurance & Medical Expenses</li>
                  <li className="flex items-center gap-2">✕ Tips for drivers and tour guides</li>
                  <li className="flex items-center gap-2">✕ Anything not mentioned in inclusions</li>
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer CTA */}
        <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-500">Pricing Policy</span>
            <span className="text-sm font-extrabold text-teal-700 dark:text-teal-400">
              100% Customized Rates For Your Group Size
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-300 transition-all"
            >
              {t('modal.close')}
            </button>

            <button
              onClick={() => {
                onClose();
                onBookNow(pkg);
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 via-teal-700 to-sky-700 text-white font-extrabold text-xs shadow-lg shadow-teal-600/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t('modal.bookThisTrip')}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
