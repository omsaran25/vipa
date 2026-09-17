import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ContactSection() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-100 dark:bg-slate-900 border border-teal-300 dark:border-teal-500/30 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5 text-teal-600" />
            <span>{t('contact.tag')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-outfit">
            {t('contact.title')}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Headquarters Card */}
            <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-4 shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0 border border-teal-300 dark:border-teal-500/30">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
                  {t('contact.info.addressTitle')}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {t('contact.info.address')}
                </p>
                <p className="text-[11px] text-teal-700 dark:text-teal-400 pt-1 font-bold">
                  {t('contact.info.mumbaiOffice')}
                </p>
              </div>
            </div>

            {/* Helpline Card */}
            <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-4 shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 flex items-center justify-center shrink-0 border border-sky-300 dark:border-sky-500/30">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
                  {t('contact.info.phoneTitle')}
                </h4>
                <p className="text-xs font-black text-amber-600 dark:text-amber-400">
                  {t('contact.info.phone')}
                </p>
                <p className="text-[11px] text-slate-500 font-bold">Toll Free 24/7 VIP Travel Desk</p>
              </div>
            </div>

            {/* Email & Hours */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-3 shadow-sm">
                <Mail className="w-5 h-5 text-indigo-600 shrink-0" />
                <div className="flex flex-col truncate">
                  <span className="text-[11px] text-slate-400 font-bold">Email</span>
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                    {t('contact.info.email')}
                  </span>
                </div>
              </div>

              <div className="glass-card p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-3 shadow-sm">
                <Clock className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-400 font-bold">Working Hours</span>
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                    Mon - Sat 9am-8.5pm
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Message Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white font-outfit mb-6">
                Send Us a Direct Message
              </h3>

              {sent && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{t('contact.form.success')}</span>
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      {t('contact.form.name')} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      {t('contact.form.phone')} *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 Mobile Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {t('contact.form.email')} *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {t('contact.form.message')} *
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Describe your travel dates, preferred Indian destination, or family requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-teal-600 via-teal-700 to-sky-700 hover:from-teal-500 hover:to-sky-600 text-white font-extrabold text-sm shadow-xl shadow-teal-600/20 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('contact.form.send')}</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
