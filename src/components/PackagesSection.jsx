import React, { useState, useMemo } from 'react';
import { Sparkles, Search } from 'lucide-react';
import { packagesData } from '../data/packagesData';
import { useLanguage } from '../context/LanguageContext';
import PackageCard from './PackageCard';

export default function PackagesSection({ searchFilters, onSelectPackage, onQuickBook }) {
  const { lang, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryKeys = ['all', 'himalayas', 'south', 'heritage', 'beaches'];

  const filteredPackages = useMemo(() => {
    return packagesData.filter((pkg) => {
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'himalayas' && pkg.region !== 'himalayas') return false;
        if (selectedCategory === 'south' && pkg.region !== 'south') return false;
        if (selectedCategory === 'heritage' && pkg.region !== 'heritage') return false;
        if (selectedCategory === 'beaches' && pkg.region !== 'beaches') return false;
      }

      const query = (searchQuery || searchFilters?.destination || '').toLowerCase().trim();
      if (query) {
        const titleText = pkg.title[lang].toLowerCase();
        const locText = pkg.location[lang].toLowerCase();
        if (!titleText.includes(query) && !locText.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, searchQuery, searchFilters, lang]);

  return (
    <section id="packages" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-100 border border-teal-300 text-teal-800 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('packages.tag')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-outfit">
            {t('packages.title')}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-medium">
            {t('packages.subtitle')}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-white p-3 sm:p-4 rounded-3xl border border-slate-200 shadow-lg">
          
          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categoryKeys.map((catKey) => (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === catKey
                    ? 'bg-gradient-to-r from-teal-600 to-sky-700 text-white shadow-md shadow-teal-600/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {t(`packages.categories.${catKey}`)}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search Indian destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 text-slate-900 text-xs font-semibold rounded-2xl border border-slate-200 focus:outline-none focus:border-teal-500"
            />
          </div>

        </div>

        {/* Package Grid */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onSelectPackage={onSelectPackage}
                onQuickBook={onQuickBook}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">No Indian packages found matching your query.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-teal-700 text-xs font-extrabold underline"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
