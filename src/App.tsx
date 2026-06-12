/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Product, CartItem, Order, CategoryType } from './types';
import { products, HERO_BANNER_IMG, HOME_PENS_IMG, STORE_INFO } from './data';
import Navbar, { TabID } from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CategoriesView from './components/CategoriesView';
import OffersView from './components/OffersView';
import TrackOrderView from './components/TrackOrderView';
import ContactView from './components/ContactView';
import AboutView from './components/AboutView';
import AIAssistant from './components/AIAssistant';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, ChevronRight, Award, ShoppingCart, ShieldCheck, Mail, MapPin } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabID>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Load cart and orders from localStorage on load if available
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('vidhya_cart');
      if (storedCart) setCart(JSON.parse(storedCart));
      
      const storedOrders = localStorage.getItem('vidhya_orders');
      if (storedOrders) setOrders(JSON.parse(storedOrders));
    } catch (e) {
      console.warn("Cookies / Safe iframe storage blocked context", e);
    }
  }, []);

  // Save changes to localStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('vidhya_cart', JSON.stringify(newCart));
    } catch {}
  };

  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    try {
      localStorage.setItem('vidhya_orders', JSON.stringify(newOrders));
    } catch {}
  };

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 4000);
  };

  // Cart actions
  const handleAddToCart = (product: Product) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      const updated = cart.map(item =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      saveCart(updated);
    } else {
      saveCart([...cart, { product, quantity: 1 }]);
    }
    showToast(`🛒 Added "${product.name}" to your stationery bag!`);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    const updated = cart
      .map(item => {
        if (item.product.id === productId) {
          const nextQty = item.quantity + delta;
          return { ...item, quantity: nextQty };
        }
        return item;
      })
      .filter(item => item.quantity > 0);
    saveCart(updated);
  };

  const handleRemoveCartItem = (productId: string) => {
    const updated = cart.filter(item => item.product.id !== productId);
    saveCart(updated);
    showToast('🗑️ Item removed from student bag.');
  };

  const handlePlaceOrder = (customerDetails: { name: string; phone: string; address: string; total: number }) => {
    const newOrderId = `VIDHYA-${Math.floor(1000 + Math.random() * 9000)}-VIZAG`;
    
    const newOrder: Order = {
      id: newOrderId,
      date: new Date().toLocaleString(),
      status: 'placed',
      items: [...cart],
      totalAmount: customerDetails.total,
      customerName: customerDetails.name,
      customerPhone: customerDetails.phone,
      customerAddress: customerDetails.address
    };

    const newOrders = [...orders, newOrder];
    saveOrders(newOrders);
    saveCart([]); // clear cart
    
    showToast(`🎉 Order Placed successfully! Code: ${newOrderId}`);
    
    // Automatically navigate to specific tracking tab
    setActiveTab('track_order');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans selection:bg-violet-100 selection:text-violet-800">
      {/* Top sticky navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              {/* Hero Showcase Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-100 p-6 md:p-10 rounded-[32px] shadow-sm overflow-hidden relative">
                <div className="absolute right-0 top-0 w-1/4 h-1/4 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute left-10 bottom-0 w-1/3 h-1/4 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="lg:col-span-7 space-y-6 relative z-10">
                  <span className="inline-flex items-center gap-1.5 bg-violet-50 text-violet-700 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide border border-violet-100">
                    <Sparkles size={12} className="text-violet-600 animate-pulse" /> Back-to-School Season Collection
                  </span>
                  <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
                    Unleash Your Academic Potential with <span className="text-violet-600">Vidhya</span>
                  </h1>
                  <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed max-w-lg">
                    Discover premium educational gear and stationery designed to motivate students and spark focus. From ultra-smooth pens and strong carbon pencils to robust backpacks and vacuum flasks — we curate the finest materials from certified manufacturers.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('categories')}
                      className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl text-xs font-bold transition shadow-sm hover:shadow-md flex items-center gap-1"
                    >
                      Explore Stationery Catalog <ChevronRight size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('about')}
                      className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-semibold transition"
                    >
                      Our Story (Vizag Flagship)
                    </button>
                  </div>
                </div>

                {/* Main Hero Generated Graphic banner */}
                <div className="lg:col-span-5 relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                    <img
                      src={HERO_BANNER_IMG}
                      alt="Student stationery collection flatlay"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Special Student Pen Attraction Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gradient-to-br from-indigo-50/50 to-violet-50/50 rounded-[32px] p-6 md:p-10 border border-violet-150/20">
                {/* Visual Attraction image of pens */}
                <div className="relative">
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-sm border border-white">
                    <img
                      src={HOME_PENS_IMG}
                      alt="Premium colourful gel pens showcase"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-violet-600 bg-violet-100/60 px-3 py-1 rounded-full inline-block">
                    Stationery Highlights
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                    Fine Rollers, Neon Gels & Premium Sugggestions
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Vidhya offers a custom collection of writing options tailored to high school exams and homework. Choose the stunning <strong>Speed New Radium Pen</strong> for bright fluorescent notes that emphasize key facts. View <strong>Doms</strong> smooth rollers for everyday durable homework flow, or purchase <strong>Elite Suggestions</strong> equipped with luxury weighted bodies for long prep sessions.
                  </p>

                  <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl space-y-2 border border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-violet-600 rounded-full shrink-0"></span>
                      <p className="text-xs font-bold text-slate-800">Speed New Radium: <span className="font-normal text-slate-500">Glow accents and quick drying.</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>
                      <p className="text-xs font-bold text-slate-800">Doms Roller: <span className="font-normal text-slate-500">Certified smudge-free dark pigments.</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0"></span>
                      <p className="text-xs font-bold text-slate-800">Elite Suggests: <span className="font-normal text-slate-500">Weighted carbon grip for exam fatigue prevention.</span></p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('stationery');
                    }}
                    className="text-xs font-bold text-violet-700 hover:text-violet-800 flex items-center gap-1.5 pt-1 hover:underline"
                  >
                    View suggested brand items <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Direct Categories Quick Access */}
              <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-1">
                  <Award size={14} className="text-violet-600" /> Discover Student Departments
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { id: 'stationery', label: 'Stationery', emoji: '✏️', count: 8 },
                    { id: 'books', label: 'Books', emoji: '📚', count: 2 },
                    { id: 'bags', label: 'Bags', emoji: '🎒', count: 2 },
                    { id: 'shoes', label: 'Shoes', emoji: '👟', count: 2 },
                    { id: 'water_bottles', label: 'Water Bottles', emoji: '🥛', count: 2 },
                    { id: 'lunch_boxes', label: 'LunchBoxes', emoji: '🍱', count: 2 }
                  ].map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => {
                        // Switch tab directly
                        setActiveTab(cat.id as TabID);
                      }}
                      className="bg-white border border-slate-100 hover:border-violet-200 p-5 rounded-2xl text-center cursor-pointer shadow-xs hover:shadow-sm transition-all duration-250 group flex flex-col items-center"
                    >
                      <span className="text-3xl mb-2.5 block transform group-hover:scale-110 transition-transform duration-200">
                        {cat.emoji}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-violet-700 transition-colors">
                        {cat.label}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-semibold mt-1 block uppercase">
                        {cat.count} items
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Showcase */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-1">
                    <Sparkles size={14} className="text-amber-500" /> Featured Supplies
                  </h3>
                  <button
                    onClick={() => setActiveTab('categories')}
                    className="text-xs font-bold text-violet-600 hover:underline"
                  >
                    View All Items →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.slice(0, 4).map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onAddToCart={handleAddToCart}
                      onViewDetails={(prod) => setSelectedProduct(prod)}
                    />
                  ))}
                </div>
              </div>

              {/* Value Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-slate-100 bg-white rounded-3xl p-6 shadow-xs text-center">
                <div className="p-4">
                  <ShieldCheck className="mx-auto text-emerald-500 mb-2" size={24} />
                  <h4 className="text-xs font-bold text-slate-900">Certified Brands</h4>
                  <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] mx-auto">Only standard original tools. Doms, Milton, Bata, Apsara physical guarantees.</p>
                </div>
                <div className="p-4 border-y sm:border-y-0 sm:border-x border-slate-100">
                  <MapPin className="mx-auto text-rose-500 mb-2" size={24} />
                  <h4 className="text-xs font-bold text-slate-900">Vizag Storage Direct</h4>
                  <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] mx-auto">Dispatched from Dwaraka Nagar, Vizag sorting complex. Fast transit.</p>
                </div>
                <div className="p-4">
                  <Mail className="mx-auto text-violet-500 mb-2" size={24} />
                  <h4 className="text-xs font-bold text-slate-900">Scholar Support</h4>
                  <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] mx-auto">24-hour delivery query solutions for schools and coaching batches.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Integrated Dynamic categories filters based on specific Tab clicks */}
          {activeTab === 'categories' && (
            <motion.div key="categories" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CategoriesView
                initialCategoryFilter="all"
                onAddToCart={handleAddToCart}
                onViewDetails={(p) => setSelectedProduct(p)}
              />
            </motion.div>
          )}

          {activeTab === 'stationery' && (
            <motion.div key="stationery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CategoriesView
                initialCategoryFilter="stationery"
                onAddToCart={handleAddToCart}
                onViewDetails={(p) => setSelectedProduct(p)}
              />
            </motion.div>
          )}

          {activeTab === 'books' && (
            <motion.div key="books" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CategoriesView
                initialCategoryFilter="books"
                onAddToCart={handleAddToCart}
                onViewDetails={(p) => setSelectedProduct(p)}
              />
            </motion.div>
          )}

          {activeTab === 'bags' && (
            <motion.div key="bags" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CategoriesView
                initialCategoryFilter="bags"
                onAddToCart={handleAddToCart}
                onViewDetails={(p) => setSelectedProduct(p)}
              />
            </motion.div>
          )}

          {activeTab === 'shoes' && (
            <motion.div key="shoes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CategoriesView
                initialCategoryFilter="shoes"
                onAddToCart={handleAddToCart}
                onViewDetails={(p) => setSelectedProduct(p)}
              />
            </motion.div>
          )}

          {activeTab === 'water_bottles' && (
            <motion.div key="water-bottles" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CategoriesView
                initialCategoryFilter="water_bottles"
                onAddToCart={handleAddToCart}
                onViewDetails={(p) => setSelectedProduct(p)}
              />
            </motion.div>
          )}

          {activeTab === 'lunch_boxes' && (
            <motion.div key="lunch-boxes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CategoriesView
                initialCategoryFilter="lunch_boxes"
                onAddToCart={handleAddToCart}
                onViewDetails={(p) => setSelectedProduct(p)}
              />
            </motion.div>
          )}

          {activeTab === 'offers' && (
            <motion.div key="offers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <OffersView onAddToCart={handleAddToCart} onShowNotification={showToast} />
            </motion.div>
          )}

          {activeTab === 'track_order' && (
            <motion.div key="track_order" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <TrackOrderView orders={orders} />
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ContactView onShowNotification={showToast} />
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AboutView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Persistent Student Footer */}
      <footer className="bg-white border-t border-slate-100 py-8 text-center text-slate-500 text-xs mt-12">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex justify-center items-center gap-2 text-slate-800 font-bold">
            <span className="w-2.5 h-2.5 bg-violet-600 rounded-lg"></span> Vidhya Student Hub
          </div>
          <p className="max-w-md mx-auto text-slate-400 text-[11px] leading-relaxed">
            Dwaraka Nagar, Vizag, AP. Premium educational tools curated with excellence for diagnostics, examinations, and creative learning.
          </p>
          <div className="text-[10px] text-slate-300 font-mono">
            © {new Date().getFullYear()} Vidhya Store. All rights reserved. Sourced & packaged at Vizag central workspace.
          </div>
        </div>
      </footer>

      {/* Cart Drawer Layer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Bottom Floating Toast Notification Popover */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4.5 py-3.5 rounded-2xl shadow-xl border border-slate-800 max-w-sm flex items-center gap-2"
          >
            <span className="shrink-0">💡</span>
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Fast Floating Cart Trigger (Matches Desktop-First ease) */}
      {cart.length > 0 && !cartOpen && (
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-24 z-35 p-4 bg-violet-600 hover:bg-violet-700 text-white rounded-full shadow-lg hover:shadow-xl transition flex items-center gap-2 animate-pulse"
        >
          <ShoppingCart size={20} />
          <span className="text-xs font-black">{cart.reduce((acc, item) => acc + item.quantity, 0)} items</span>
        </button>
      )}

      {/* AI Student Assistant Chat Panel */}
      <AIAssistant onAddToCart={handleAddToCart} onViewDetails={setSelectedProduct} />
    </div>
  );
}
