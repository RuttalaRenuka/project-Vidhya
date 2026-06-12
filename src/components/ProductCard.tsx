/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Product } from '../types';
import { Star, ShoppingCart, Eye, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
  key?: string | number;
}

export default function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const hasDiscount = product.originalPrice ? product.originalPrice > product.price : false;
  const discountPercent = hasDiscount && product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      id={`product-card-${product.id}`}
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-2xl border border-slate-100 hover:border-violet-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {hasDiscount && (
          <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm tracking-wide">
            SAVE {discountPercent}%
          </span>
        )}
        {product.price > 500 && (
          <span className="bg-emerald-500 text-white text-[11px] font-medium px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
            <Sparkles size={10} /> Free Delivery
          </span>
        )}
      </div>

      {/* Image container */}
      <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden cursor-pointer" onClick={() => onViewDetails(product)}>
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="p-2.5 bg-white text-slate-800 rounded-full hover:bg-violet-600 hover:text-white transition-colors duration-200 shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
            title="Quick View"
          >
            <Eye size={18} />
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4.5 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-1 text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-1">
          <span>{product.brand}</span>
          {product.subcategory && (
            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
              {product.subcategory}
            </span>
          )}
        </div>

        <h3 
          className="text-slate-800 font-semibold text-sm line-clamp-2 hover:text-violet-600 cursor-pointer transition-colors mb-2 flex-1"
          onClick={() => onViewDetails(product)}
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3.5">
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={13}
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                className={i < Math.floor(product.rating) ? "" : "text-slate-200"}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-500">{product.rating}</span>
          <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
        </div>

        {/* Price & Cart Actions */}
        <div className="flex items-center justify-between pt-3.5 border-t border-slate-50">
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="text-xs text-slate-400 line-through font-medium">
                ₹{product.originalPrice}
              </span>
            )}
            <span className="text-base font-bold text-slate-900 leading-none">
              ₹{product.price}
            </span>
          </div>

          <button
            id={`btn-add-to-cart-${product.id}`}
            type="button"
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              product.inStock
                ? 'bg-violet-600 text-white hover:bg-violet-700 hover:shadow-sm'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart size={14} />
            {product.inStock ? 'Add' : 'OOS'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
