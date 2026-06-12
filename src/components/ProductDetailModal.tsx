/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '../types';
import { products } from '../data';
import { X, Check, Star, ShoppingCart, Info, Award, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
}

export default function ProductDetailModal({ product, onClose, onAddToCart, onSelectProduct }: ProductDetailModalProps) {
  if (!product) return null;

  // Find related brand suggestion products
  const relatedProducts = products.filter(
    p => p.category === product.category && p.id !== product.id
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors z-20"
          >
            <X size={20} />
          </button>

          {/* Left: Product Image */}
          <div className="md:w-1/2 bg-slate-50 relative flex items-center justify-center p-6 md:p-10 border-r border-slate-100">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="max-h-[300px] md:max-h-[400px] object-contain rounded-2xl shadow-sm mix-blend-multiply"
            />
          </div>

          {/* Right: Info & Recommendations */}
          <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[90vh]">
            <span className="text-xs font-bold text-violet-600 bg-violet-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
              {product.brand}
            </span>

            <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug mb-2">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                    className={i < Math.floor(product.rating) ? "" : "text-slate-200"}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700">{product.rating} / 5</span>
              <span className="text-xs text-slate-400">({product.reviewsCount} student reviews)</span>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-2xl font-extrabold text-slate-950">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through font-medium">
                  ₹{product.originalPrice}
                </span>
              )}
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded ml-2">
                In Stock & Ready to Dispatch
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Highlights */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-2.5">
                Key Features for Students
              </h4>
              <ul className="text-xs text-slate-600 space-y-2">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brands Selection: The "Pens" / "Pencils" dynamic specifications requested by user */}
            <div className="border-t border-slate-100 pt-5 mb-6">
              <h4 className="text-xs font-bold text-violet-700 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                <Award size={14} />
                {product.subcategory === 'Pens' ? 'Pen Brands we Suggest' : 
                 product.subcategory === 'Pencils' ? 'Pencil Types we Suggest' : 
                 'Premium Student Suggestions'}
              </h4>

              {/* Specific pen brands requested: speed new radium, doms, elite suggestions.
                  For pencils: nataraj, apsara, doms. */}
              {product.subcategory === 'Pens' ? (
                <div className="bg-slate-50 p-3 rounded-2xl space-y-2 mb-4">
                  <p className="text-[11px] text-slate-500 font-medium italic">
                    Students recommend these primary types based on requirements:
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-100 shadow-sm cursor-pointer hover:border-violet-300" onClick={() => {
                      const speedPen = products.find(p => p.id === 'pen-speed-radium');
                      if (speedPen) onSelectProduct(speedPen);
                    }}>
                      <span className="w-2.5 h-2.5 bg-neon rounded-full" style={{ backgroundColor: '#22c55e' }}></span>
                      <div className="text-xs font-semibold text-slate-800">Speed New Radium: <span className="font-normal text-slate-500">Fluid flow, glowing colors.</span></div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-100 shadow-sm cursor-pointer hover:border-violet-300" onClick={() => {
                      const domsPen = products.find(p => p.id === 'pen-doms-gel');
                      if (domsPen) onSelectProduct(domsPen);
                    }}>
                      <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
                      <div className="text-xs font-semibold text-slate-800">Doms: <span className="font-normal text-slate-500">Water resistant ink, ideal for classrooms.</span></div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-100 shadow-sm cursor-pointer hover:border-violet-300" onClick={() => {
                      const elitePen = products.find(p => p.id === 'pen-elite-fountain');
                      if (elitePen) onSelectProduct(elitePen);
                    }}>
                      <span className="w-2.5 h-2.5 bg-purple-600 rounded-full"></span>
                      <div className="text-xs font-semibold text-slate-800">Elite Suggestions: <span className="font-normal text-slate-400 text-[11px]">Premium weighted alloy body, exam ready.</span></div>
                    </div>
                  </div>
                </div>
              ) : product.subcategory === 'Pencils' ? (
                <div className="bg-slate-50 p-3 rounded-2xl space-y-2 mb-4">
                  <p className="text-[11px] text-slate-500 font-medium italic">
                    Students prefer these graphite options for neat notebooks:
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-100 shadow-sm cursor-pointer hover:border-violet-300" onClick={() => {
                      const natPencil = products.find(p => p.id === 'pencil-nataraj-621');
                      if (natPencil) onSelectProduct(natPencil);
                    }}>
                      <span className="w-2.5 h-2.5 bg-red-600 rounded-full"></span>
                      <div className="text-xs font-semibold text-slate-800">Nataraj: <span className="font-normal text-slate-500">Classic red & black stripe, durable lead.</span></div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-100 shadow-sm cursor-pointer hover:border-violet-300" onClick={() => {
                      const apPencil = products.find(p => p.id === 'pencil-apsara-platinum');
                      if (apPencil) onSelectProduct(apPencil);
                    }}>
                      <span className="w-2.5 h-2.5 bg-slate-700 rounded-full"></span>
                      <div className="text-xs font-semibold text-slate-800">Apsara: <span className="font-normal text-slate-500">Platinum Extra dark, scans easily for exams.</span></div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-100 shadow-sm cursor-pointer hover:border-violet-300" onClick={() => {
                      const domPencil = products.find(p => p.id === 'pencil-doms-zoom');
                      if (domPencil) onSelectProduct(domPencil);
                    }}>
                      <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></span>
                      <div className="text-xs font-semibold text-slate-800">Doms: <span className="font-normal text-slate-500">Triangular body, comfortable hand hold.</span></div>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Sub-item specific bullet list suggestions */}
              {product.suggestions && product.suggestions.length > 0 && (
                <div className="bg-violet-50/50 p-3.5 rounded-xl border border-violet-100/30">
                  <p className="text-xs font-semibold text-violet-800 mb-1.5 flex items-center gap-1">
                    <Info size={12} /> Model Suggestions Available:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.suggestions.map((sug, i) => (
                      <span key={i} className="text-[11px] bg-white border border-slate-100 px-2.5 py-1 rounded-md text-slate-700 font-medium shadow-2xs">
                        {sug}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Related items in the same student category */}
            {relatedProducts.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-1 mb-2.5">
                  <LayoutGrid size={13} /> Similar Student Packs
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {relatedProducts.slice(0, 2).map(rp => (
                    <div
                      key={rp.id}
                      onClick={() => onSelectProduct(rp)}
                      className="flex items-center gap-2 p-2 rounded-xl border border-slate-100 hover:border-violet-200 bg-slate-50/50 cursor-pointer transition-all hover:bg-white"
                    >
                      <img src={rp.image} alt={rp.name} className="w-10 h-10 object-cover rounded-md" />
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-slate-800 truncate mb-0.5">{rp.name}</p>
                        <p className="text-[11px] font-extrabold text-violet-600">₹{rp.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 sticky bottom-0 bg-white">
              <button
                id={`modal-add-to-cart-${product.id}`}
                type="button"
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm shadow-sm transition-all duration-200 ${
                  product.inStock
                    ? 'bg-violet-600 text-white hover:bg-violet-700'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart size={16} />
                {product.inStock ? `Add to Student Bag • ₹${product.price}` : 'Out of Stock'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
