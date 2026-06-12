/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { STORE_INFO } from '../data';
import { Award, BookOpen, PenTool, Backpack, Footprints, Flame, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutView() {
  const itemOffered = [
    {
      icon: <PenTool size={20} className="text-violet-600" />,
      title: 'Precision Stationery',
      desc: 'Featuring elite class pens like Speed New Radium with fluorescent body, smooth Doms gel ink, and deep graphite Apsara extra dark and Nataraj pencils.'
    },
    {
      icon: <BookOpen size={20} className="text-blue-600" />,
      title: 'Scholastic Books',
      desc: 'Expertly curated Oxford student atlases, illustrated science encyclopedias, and ultra-white Classmate single line and spiral note repositories.'
    },
    {
      icon: <Backpack size={20} className="text-emerald-600" />,
      title: 'Ergonomic Bags & Packs',
      desc: 'Thick dual air-mesh breathable backing from Skybags and Safari. Protects school children from long luggage weight stresses.'
    },
    {
      icon: <Footprints size={20} className="text-rose-600" />,
      title: 'Comfort School Shoes',
      desc: 'Action White Canvas PT athletic shoes and black Bata leather uniform wear to guarantee soft support for morning parade sessions.'
    },
    {
      icon: <Flame size={20} className="text-orange-600" />,
      title: 'Thermos Bottles &🍱 Bento LunchBoxes',
      desc: 'Premium grade Milton stainless steel dual-insulated vacuum flasks keeping water chilled 24 hours, and food-safe Signoraware bento kits.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-2 px-2" id="about-panel">
      {/* Narrative Card */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs mb-8">
        <div className="max-w-2xl">
          <span className="text-[10px] uppercase font-bold text-violet-700 bg-violet-100 px-3 py-1 rounded-full inline-block tracking-widest mb-3">
            Since {STORE_INFO.founded} • Vizag Origin
          </span>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-4">
            Inspiring the Next Generation of Thinkers, Creators & Leader Scholars
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            {STORE_INFO.aboutBrief}
          </p>
          <div className="border-l-4 border-violet-600 pl-4 py-1 my-4 bg-violet-50/50 rounded-r-xl">
            <p className="text-xs font-bold text-slate-800 leading-relaxed italic">
              "We understand that a student’s stationery is not just a tool, but an extension of their dreams. A clean notebook and an ultra-smooth pen make learning a joyful celebration."
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Items details */}
      <div className="mb-8">
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-1.5">
          <Award size={15} className="text-violet-600" />
          The Student Gear We Premiumize
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {itemOffered.map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex gap-3">
              <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flagship location promo */}
      <div className="bg-gradient-to-tr from-slate-900 to-slate-850 text-white rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-violet-600/10 pointer-events-none rounded-l-full"></div>
        <div className="relative z-10 max-w-xl">
          <span className="text-[9px] uppercase font-bold text-violet-300 bg-violet-950/60 border border-violet-800/50 px-2.5 py-0.5 rounded-full inline-block tracking-wider mb-2">
            Local Flagship Hub
          </span>
          <h4 className="text-sm font-black tracking-wide mb-1 flex items-center gap-1.5">
            <Sparkles size={14} className="text-amber-400" /> Visakhapatnam HQ Store
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed max-w-md">
            Our flagship showroom is physically located in <strong className="text-white">Vizag (Dwaraka Nagar)</strong>. All regional orders are picked, packed, and sanitized under extremely secure academic guidelines here. If you reside in Vizag, visit us directly for student loyalty stamp cards!
          </p>
          <div className="text-[11px] text-slate-400 mt-4 font-mono font-medium">
            🚩 Address: Dwaraka Nagar Main Road, opposite RTC Bus Complex, Vizag - 530016
          </div>
        </div>
      </div>
    </div>
  );
}
