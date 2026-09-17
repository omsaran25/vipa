import React from 'react';
import { Plane, Building2, FileCheck2, Ship, Headphones, Sparkles, Map, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ServicesSection() {
  const { t } = useLanguage();

  const serviceIcons = [
    <Map className="w-6 h-6 text-teal-700" />,
    <Plane className="w-6 h-6 text-sky-700" />,
    <FileCheck2 className="w-6 h-6 text-amber-600" />,
    <Building2 className="w-6 h-6 text-emerald-700" />,
    <Ship className="w-6 h-6 text-indigo-700" />,
    <Headphones className="w-6 h-6 text-purple-700" />
  ];

  const items = t('services.items');

  return (
    <section id="services" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-teal-100 border border-teal-300 text-teal-800 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('services.tag')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-outfit">
            {t('services.title')}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-medium">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Cards Grid with High-Contrast Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((srv, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 hover:border-teal-500 shadow-md hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Icon Badge */}
                <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  {serviceIcons[idx]}
                </div>

                {/* High Contrast Header Title */}
                <h3 className="text-xl font-extrabold text-slate-900 font-outfit group-hover:text-teal-700 transition-colors">
                  {srv.title}
                </h3>

                {/* High Contrast Body Prose */}
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  {srv.desc}
                </p>
              </div>

              {/* Bottom CTA Link */}
              <div className="mt-8 pt-4 border-t border-slate-100 text-xs font-bold text-teal-700 flex items-center justify-between group-hover:translate-x-1 transition-transform">
                <span>Request Details</span>
                <ArrowRight className="w-4 h-4 text-teal-700" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
