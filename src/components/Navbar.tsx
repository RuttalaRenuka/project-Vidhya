/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, ShoppingBag, Menu, X, Gift, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export type TabID =
  | 'home'
  | 'categories'
  | 'books'
  | 'stationery'
  | 'bags'
  | 'shoes'
  | 'water_bottles'
  | 'lunch_boxes'
  | 'offers'
  | 'track_order'
  | 'contact'
  | 'about';

interface NavbarProps {
  activeTab: TabID;
  setActiveTab: (tab: TabID) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Navbar({ activeTab, setActiveTab, cartCount, onOpenCart }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact tabs derived from the user request
  const navItems: { id: TabID; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'categories', label: 'Categories' },
    { id: 'books', label: 'Books' },
    { id: 'stationery', label: 'Stationery' },
    { id: 'bags', label: 'Bags' },
    { id: 'shoes', label: 'Shoes' },
    { id: 'water_bottles', label: 'Water Bottles' },
    { id: 'lunch_boxes', label: 'LunchBoxes' },
    { id: 'offers', label: 'Offers' },
    { id: 'track_order', label: 'Track Order' },
    { id: 'contact', label: 'Contact' },
    { id: 'about', label: 'About Us' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo brand */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-9 h-9 bg-violet-600 text-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-violet-700 transition-colors">
              <BookOpen size={18} className="translate-y-[0.5px]" />
            </div>
            <span className="text-lg font-black tracking-tight text-slate-900 group-hover:text-violet-600 transition-colors">
              Vidhya
            </span>
          </div>

          {/* Desktop Navigation Items (Wrap nicely on larger displays) */}
          <nav className="hidden xl:flex space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  id={`nav-tab-${item.id}`}
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-violet-50 text-violet-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Cart triggers & Actions */}
          <div className="flex items-center gap-2.5">
            {/* Promo banner quicklink */}
            <button
              onClick={() => setActiveTab('offers')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-100 text-amber-800 text-[11px] font-bold rounded-xl transition"
            >
              <Gift size={13} /> Exclusive Deals
            </button>

            {/* Shopping Cart button */}
            <button
              id="navbar-cart-trigger"
              type="button"
              onClick={onOpenCart}
              className="relative p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-xl transition flex items-center justify-center shadow-xs"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-violet-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile navigation toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 text-slate-600 hover:bg-slate-50 rounded-xl transition"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Categories Horizontal scrolling bar for viewports (except desktop) so they can instantly pick categories */}
      <div className="xl:hidden bg-slate-50/50 border-t border-slate-100 px-4 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={`scroll-${item.id}`}
              onClick={() => {
                setActiveTab(item.id);
              }}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wide transition-all shrink-0 ${
                isActive
                  ? 'bg-violet-600 text-white'
                  : 'bg-white border border-slate-200/60 text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Mobile Menu Drawer */}
      <motion.div
        animate={mobileMenuOpen ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, height: 'auto', display: 'block' },
          closed: { opacity: 0, height: 0, transitionEnd: { display: 'none' } }
        }}
        className="hidden border-t border-slate-100 xl:hidden bg-white overflow-hidden shadow-lg"
      >
        <div className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={`mobile-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                  isActive ? 'bg-violet-50 text-violet-700' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <Sparkles size={12} className="text-violet-600" />}
              </button>
            );
          })}
        </div>
      </motion.div>
    </header>
  );
}
