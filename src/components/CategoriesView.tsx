/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Product, CategoryType } from '../types';
import { products } from '../data';
import { LayoutGrid, Filter, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import ProductCard from './ProductCard';

interface CategoriesViewProps {
  initialCategoryFilter?: CategoryType | 'all';
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
}

export default function CategoriesView({
  initialCategoryFilter = 'all',
  onAddToCart,
  onViewDetails
}: CategoriesViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>(initialCategoryFilter);
  const [selectedSub, setSelectedSub] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');

  const categoriesMeta: { id: CategoryType | 'all'; label: string; desc: string; emoji: string }[] = [
    { id: 'all', label: 'All Items', desc: 'Complete student academic store inventory.', emoji: '🎒' },
    { id: 'stationery', label: 'Stationery', desc: 'Pens, pencils, premium erasers, notebooks.', emoji: '✏️' },
    { id: 'books', label: 'Books', desc: 'Reference school books and premium atlases.', emoji: '📚' },
    { id: 'bags', label: 'Bags', desc: 'Flexible back-support student luggage options.', emoji: '🎒' },
    { id: 'shoes', label: 'Shoes', desc: 'Classic Bata black leather and Action white canvas.', emoji: '👟' },
    { id: 'water_bottles', label: 'Water Bottles', desc: 'Double-walled vacuum thermal student flasks.', emoji: '🥛' },
    { id: 'lunch_boxes', label: 'LunchBoxes', desc: 'Food-grade stainless steel bento lunchboxes.', emoji: '🍱' }
  ];

  // Derive available subcategories for Stationery
  // e.g. 'Pens', 'Pencils', 'Erasers', 'Notebooks'
  const subCategories = ['All', 'Pens', 'Pencils', 'Erasers', 'Notebooks'];

  // Brands filter list based on selections
  const pensBrands = ['All', 'Speed', 'Doms', 'Elite Suggestions'];
  const pencilsBrands = ['All', 'Nataraj', 'Apsara', 'Doms'];

  const filteredProducts = products.filter(p => {
    // 1. Category Filter
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }

    // 2. Subcategory Filter (If Stationery and subcategory is selected)
    if (selectedCategory === 'stationery' && selectedSub !== 'All') {
      if (p.subcategory !== selectedSub) return false;
    }

    // 3. Brand Filter for Pens / Pencils
    if (selectedCategory === 'stationery' && selectedSub === 'Pens' && selectedBrand !== 'All') {
      if (selectedBrand === 'Elite Suggestions') {
        if (p.brand !== 'Elite Suggestions') return false;
      } else {
        if (p.brand !== selectedBrand) return false;
      }
    }
    if (selectedCategory === 'stationery' && selectedSub === 'Pencils' && selectedBrand !== 'All') {
      if (p.brand !== selectedBrand) return false;
    }

    return true;
  });

  const handleSelectCategory = (catId: CategoryType | 'all') => {
    setSelectedCategory(catId);
    setSelectedSub('All');
    setSelectedBrand('All');
  };

  const handleSelectSub = (sub: string) => {
    setSelectedSub(sub);
    setSelectedBrand('All');
  };

  return (
    <div className="max-w-7xl mx-auto py-2 px-2" id="categories-panel">
      {/* Category selection banner */}
      <div className="bg-slate-50 border border-slate-100 rounded-3xl p-5 mb-8">
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <LayoutGrid size={14} className="text-violet-600" /> Filter by Student Section
        </h3>

        <div className="flex flex-wrap gap-2.5">
          {categoriesMeta.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-violet-600 text-white border-violet-600 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200/70 hover:border-violet-200 hover:text-slate-900'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left: Dynamic specifications for Stationery requested by the user */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-5.5 shadow-xs">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Filter size={13} className="text-violet-600" />
              Shopping Controls
            </h4>

            {/* If Stationery is active, show the nested brand and items suggestions */}
            {selectedCategory === 'stationery' ? (
              <div className="space-y-5">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-2">
                    Stationery Item Types
                  </span>
                  <div className="space-y-1.5">
                    {subCategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => handleSelectSub(sub)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${
                          selectedSub === sub
                            ? 'bg-violet-50 text-violet-700 font-bold'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{sub}</span>
                        {selectedSub === sub && <span className="w-1.5 h-1.5 bg-violet-600 rounded-full"></span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subcategory Brand suggestions specific to customer request: 
                    Pens suggestions (speed new radium, doms, elite)
                    Pencils suggestions (nataraj, apsara, doms) */}
                {selectedSub === 'Pens' && (
                  <div className="pt-4 border-t border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-violet-700 block tracking-wider mb-2 flex items-center gap-1">
                      ✒️ Suggest Pen Brand
                    </span>
                    <div className="space-y-1.5">
                      {pensBrands.map((brand) => (
                        <button
                          key={brand}
                          onClick={() => setSelectedBrand(brand)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${
                            selectedBrand === brand
                              ? 'bg-amber-50 text-amber-800 font-bold border border-amber-100'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span>{brand === 'All' ? 'All Pen Brands' : brand}</span>
                          {selectedBrand === brand && <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSub === 'Pencils' && (
                  <div className="pt-4 border-t border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-violet-700 block tracking-wider mb-2 flex items-center gap-1">
                      ✏️ Suggest Pencil Brand
                    </span>
                    <div className="space-y-1.5">
                      {pencilsBrands.map((brand) => (
                        <button
                          key={brand}
                          onClick={() => setSelectedBrand(brand)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${
                            selectedBrand === brand
                              ? 'bg-amber-50 text-amber-800 font-bold border border-amber-100'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span>{brand === 'All' ? 'All Pencil Brands' : brand}</span>
                          {selectedBrand === brand && <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Choose <strong className="text-slate-600">Stationery</strong> above to test brand controls for suggestions (Speed, Doms, Elite, Nataraj, Apsara).
              </p>
            )}
          </div>

          <div className="bg-violet-50/50 border border-violet-100/30 rounded-3xl p-5 text-center">
            <ShieldCheck className="mx-auto text-violet-600 mb-2" size={24} />
            <h5 className="text-xs font-bold text-slate-800">Academic Verified Brands</h5>
            <p className="text-[10px] text-slate-400 mt-1 leading-normal">
              Every item inside our index is officially sourced from the verified brands to guarantee children safety and write durability.
            </p>
          </div>
        </div>

        {/* Right: Products Grid */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500">
              Showing {filteredProducts.length} premium academic supplies
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-3xl p-10 text-center flex flex-col items-center justify-center min-h-[300px]">
              <p className="text-sm font-bold text-slate-800 mb-1">No stationery items match these filter parameters</p>
              <p className="text-xs text-slate-400">Try changing your brand/type sidebar filter options.</p>
              <button
                onClick={() => {
                  setSelectedSub('All');
                  setSelectedBrand('All');
                }}
                className="mt-4 text-xs font-bold text-violet-600 underline hover:text-violet-700"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
