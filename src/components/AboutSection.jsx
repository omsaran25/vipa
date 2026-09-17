import React from 'react';
import { CheckCircle2, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();

  const stats = [
    { count: '15,000+', label: t('stats.items.0.label') || 'Happy Travelers' },
    { count: '100+', label: t('stats.items.1.label') || 'Indian Destinations' },
    { count: '99%', label: t('stats.items.2.label') || 'Satisfaction Rate' },
    { count: '12+', label: t('stats.items.3.label') || 'Years of Trust' },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Media Collage */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80"
                  alt="Kashmir Valley"
                  className="rounded-3xl object-cover h-64 w-full shadow-lg border border-slate-200 dark:border-slate-800"
                />
                <img
                  src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80"
                  alt="Kerala Backwaters"
                  className="rounded-3xl object-cover h-44 w-full shadow-lg border border-slate-200 dark:border-slate-800"
                />
              </div>

              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80"
                  alt="Rajasthan Fort"
                  className="rounded-3xl object-cover h-44 w-full shadow-lg border border-slate-200 dark:border-slate-800"
                />
                <img
                  src="https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80"
                  alt="Ladakh Lake"
                  className="rounded-3xl object-cover h-64 w-full shadow-lg border border-slate-200 dark:border-slate-800"
                />
              </div>
            </div>

            {/* Floating Trust Badge */}
            <div className="absolute -bottom-6 left-6 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-xl border border-amber-300 dark:border-amber-500/40">
                ★ 4.9
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-slate-900 dark:text-white">Top Rated Agency</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Awarded Best Tour Planner 2025</span>
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-100 dark:bg-slate-800 border border-teal-300 dark:border-teal-500/30 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>{t('about.tag')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-outfit">
              {t('about.title')}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('about.desc1')}
            </p>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('about.desc2')}
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {t('about.features').map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
              {stats.map((s, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-black text-amber-500 font-outfit">
                    {s.count}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
