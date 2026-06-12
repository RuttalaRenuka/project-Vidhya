/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { coupons, products } from '../data';
import { Tag, Check, ShoppingBag, Sparkles, Star, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface OffersViewProps {
  onAddToCart: (p: Product) => void;
  onShowNotification: (m: string) => void;
}

export default function OffersView({ onAddToCart, onShowNotification }: OffersViewProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    onShowNotification(`Coupon "${code}" copied successfully to clipboard!`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const handleAddClassicCombo = () => {
    // Collect 3 essential high-quality items for starter pack:
    // 1. Speed Radium Pen, 2. Apsara Platinum Pencil, 3. Doms Jumbo Eraser
    const itemsToAdd = [
      products.find(p => p.id === 'pen-speed-radium'),
      products.find(p => p.id === 'pencil-apsara-platinum'),
      products.find(p => p.id === 'eraser-doms')
    ];

    itemsToAdd.forEach(p => {
      if (p) onAddToCart(p);
    });

    onShowNotification('🎉 Success! Ultimate Student Starter Pack added to your bag at standard discounted prices!');
  };

  const handleAddPremiumExamCombo = () => {
    // Collect: Elite Pen, Oxford Atlas, Classmate spiral notebook
    const premiumItems = [
      products.find(p => p.id === 'pen-elite-fountain'),
      products.find(p => p.id === 'book-oxford-atlas'),
      products.find(p => p.id === 'notebook-classmate-spiral')
    ];

    premiumItems.forEach(p => {
      if (p) onAddToCart(p);
    });

    onShowNotification('💎 Success! Premium Scholar Exam Pack added to your bag!');
  };

  return (
    <div className="max-w-4xl mx-auto py-2 px-2" id="offers-panel">
      {/* Hero promo code */}
      <div className="bg-gradient-to-tr from-violet-600 to-indigo-700 rounded-3xl p-6 md:p-8 text-white shadow-md relative overflow-hidden mb-8">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 pointer-events-none md:block hidden">
          <Sparkles size={180} />
        </div>

        <div className="relative z-10 max-w-xl">
          <span className="bg-violet-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
            Vizag Flagship Launch Offer
          </span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
            Celebrate Academic Success with Vidhya Student Core
          </h2>
          <p className="text-xs text-violet-100 leading-relaxed mb-6">
            Get premium grade stationery, books, and bags dispatched directly from our flagship center in Vizag. Type code below at checkout for instant discounts!
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 flex items-center justify-between gap-4 min-w-[220px]">
              <div>
                <span className="text-[9px] uppercase font-bold text-violet-200 block">Flagship Premium Discount</span>
                <span className="font-mono text-lg font-black tracking-widest text-warning">VIZAGSCHOLAR</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyCode('VIZAGSCHOLAR')}
                className="p-1 px-3 bg-white text-violet-700 hover:bg-violet-50 rounded-xl text-[10px] font-black transition-all shadow-sm shrink-0"
              >
                {copiedCode === 'VIZAGSCHOLAR' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <span className="text-xs font-semibold text-violet-200">
              ⚡ 18% Flat discount on total student bag value.
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column: Discount Coupons list */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <Tag size={15} className="text-violet-600" />
            Available Coupons
          </h3>

          {coupons.map((coupon) => (
            <div
              key={coupon.code}
              className="bg-white border border-slate-100 hover:border-violet-100 rounded-2xl p-5 shadow-xs transition duration-200 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                  Save {coupon.discountPercentage}%
                </span>
                <h4 className="font-mono text-sm font-extrabold text-slate-900 tracking-wider mb-1">
                  {coupon.code}
                </h4>
                <p className="text-xs text-slate-500 leading-normal line-clamp-2">
                  {coupon.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleCopyCode(coupon.code)}
                className={`p-2 px-3.5 rounded-xl text-xs font-bold transition flex items-center gap-1 shrink-0 ${
                  copiedCode === coupon.code
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {copiedCode === coupon.code ? (
                  <>
                    <Check size={12} /> Copied
                  </>
                ) : (
                  'Copy Code'
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Right column: Interactive Combo Pack items */}
        <div>
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-1.5">
            <Sparkles size={15} className="text-amber-500 animate-pulse" />
            Custom Student Combos
          </h3>

          <div className="space-y-4">
            {/* Combo 1: Starter Pack */}
            <div className="bg-white border border-slate-100 hover:border-violet-100 rounded-3xl p-5 shadow-xs transition duration-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-sm font-black text-slate-950">Ultimate Student Starter Pack</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Perfect combination for school and drawing.</p>
                </div>
                <span className="text-xs font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded">
                  20% OFF Combo
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl space-y-2 text-xs text-slate-600 mb-4">
                <div className="flex items-center justify-between">
                  <span>✏️ 1x Apsara Platinum Dark Pencil</span>
                  <span className="text-slate-400">₹15</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>🖋️ 1x Speed New Radium Neon Gel Pen</span>
                  <span className="text-slate-400">₹45</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>🧼 1x Doms Dust-Free Jumbo Eraser</span>
                  <span className="text-slate-400">₹5</span>
                </div>
                <div className="border-t border-slate-200/50 pt-2 flex justify-between font-bold text-slate-900 mt-1">
                  <span>Student Combo Pricing:</span>
                  <span>₹60 <span className="text-[10px] text-slate-400 line-through">₹70</span></span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddClassicCombo}
                className="w-full bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1"
              >
                <ShoppingBag size={13} />
                Activate & Add Starter Pack
              </button>
            </div>

            {/* Combo 2: Scholar Premium Exam Ready */}
            <div className="bg-white border border-slate-100 hover:border-violet-100 rounded-3xl p-5 shadow-xs transition duration-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-sm font-black text-slate-950">Premium Scholar Exam Pack</h4>
                  <p className="text-xs text-slate-500 mt-0.5">High school and college prep essentials.</p>
                </div>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded flex items-center gap-0.5">
                  <Star size={11} fill="currentColor" /> Expert Pick
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl space-y-2 text-xs text-slate-600 mb-4">
                <div className="flex items-center justify-between">
                  <span>🖋️ 1x Elite Executive Rollerball Pen</span>
                  <span className="text-slate-400">₹120</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>🗺️ 1x Oxford Student Indian Atlas Book</span>
                  <span className="text-slate-400">₹340</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>📓 1x Classmate Spiral Long Book Notebook</span>
                  <span className="text-slate-400">₹110</span>
                </div>
                <div className="border-t border-slate-200/50 pt-2 flex justify-between font-bold text-slate-900 mt-1">
                  <span>Premium Combo Pricing:</span>
                  <span>₹570</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddPremiumExamCombo}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1"
              >
                <Award size={13} />
                Activate & Add Exam Pack
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
