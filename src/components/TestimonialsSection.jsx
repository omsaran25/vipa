import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { testimonialsData } from '../data/testimonialsData';
import { useLanguage } from '../context/LanguageContext';

export default function TestimonialsSection() {
  const { lang, t } = useLanguage();

  return (
    <section id="testimonials" className="py-20 bg-slate-50 dark:bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-100 dark:bg-slate-900 border border-teal-300 dark:border-teal-500/30 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('testimonials.tag')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-outfit">
            {t('testimonials.title')}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between relative group shadow-md hover:shadow-xl"
            >
              <Quote className="w-10 h-10 text-teal-500/15 dark:text-teal-400/20 absolute top-6 right-6 pointer-events-none group-hover:text-teal-500/30 transition-colors" />

              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 italic leading-relaxed font-medium">
                  "{item.comment[lang]}"
                </p>
              </div>

              {/* User Bio Footer */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name[lang]}
                  className="w-12 h-12 rounded-full object-cover border-2 border-teal-600 dark:border-teal-400 shadow-md"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white font-outfit">
                    {item.name[lang]}
                  </span>
                  <span className="text-[11px] text-teal-700 dark:text-teal-400 font-bold">
                    {item.location[lang]} • {item.package[lang]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
