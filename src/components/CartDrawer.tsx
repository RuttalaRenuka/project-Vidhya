/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartItem, Product, Coupon } from '../types';
import { coupons, STORE_INFO } from '../data';
import { X, Trash2, Plus, Minus, Tag, MapPin, Truck, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onPlaceOrder: (customerDetails: { name: string; phone: string; address: string; total: number }) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState('');
  
  // Checkout Form Details
  const [checkoutStep, setCheckoutStep] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('Dwaraka Nagar, Vizag');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercentage) / 100 : 0;
  const deliveryCharge = subtotal > 500 || subtotal === 0 ? 0 : 40;
  const total = subtotal - discountAmount + deliveryCharge;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const matched = coupons.find(c => c.code.toUpperCase() === couponCode.trim().toUpperCase());
    if (matched) {
      if (matched.code === 'BULKPEN' && subtotal < 500) {
        setCouponError('BULKPEN coupon is applicable only on orders above ₹500.');
        return;
      }
      setAppliedCoupon(matched);
      setCouponCode('');
    } else {
      setCouponError('Invalid Coupon Code! Try STUDENT10 or VIZAGSCHOLAR.');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleSubmitCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Please fill out all delivery fields for your delivery details.');
      return;
    }
    
    onPlaceOrder({
      name: customerName,
      phone: customerPhone,
      address: customerAddress,
      total: Math.round(total)
    });

    // Reset steps
    setCheckoutStep(false);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('Dwaraka Nagar, Vizag');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
        />

        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/55">
              <div className="flex items-center gap-2">
                <Truck className="text-violet-600" size={20} />
                <h2 className="text-base font-bold text-slate-900">
                  {checkoutStep ? 'Delivery Details' : 'Your Stationery Bag'}
                </h2>
                <span className="bg-violet-100 text-violet-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (checkoutStep) {
                    setCheckoutStep(false);
                  } else {
                    onClose();
                  }
                }}
                className="p-1.5 hover:bg-slate-200 text-slate-500 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content list */}
            <div className="flex-1 overflow-y-auto p-5">
              {!checkoutStep ? (
                /* Cart Items List Step */
                cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="w-16 h-16 bg-violet-50 text-violet-500 rounded-full flex items-center justify-center mb-4">
                      <Truck size={32} />
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm mb-1.5">Your student bag is empty!</h3>
                    <p className="text-xs text-slate-400 max-w-xs">
                      Explore Vidhya's colorful collection of pens, pencils, books, shoes, and notebooks to equip yourself for class success.
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-5 px-5 py-2 bg-violet-600 text-white rounded-xl text-xs font-bold hover:bg-violet-700 transition"
                    >
                      Browse Items
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center gap-3 pb-4 border-b border-slate-100 last:border-b-0 last:pb-0"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-14 h-14 object-cover rounded-xl border border-slate-100"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-950 truncate mb-0.5">
                            {item.product.name}
                          </h4>
                          <p className="text-[11px] font-semibold text-slate-400 uppercase mb-1">
                            {item.product.brand}
                          </p>
                          <span className="text-xs font-bold text-slate-900">
                            ₹{item.product.price}
                          </span>
                        </div>

                        {/* Adjust qty */}
                        <div className="flex flex-col items-end gap-1.5">
                          <div className="flex items-center bg-slate-50 border border-slate-100 rounded-lg p-0.5">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="p-1 hover:bg-white text-slate-500 rounded transition"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="px-2 text-xs font-bold text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="p-1 hover:bg-white text-slate-500 rounded transition"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-[11px] text-red-500 hover:text-red-600 hover:underline flex items-center gap-1 font-medium"
                          >
                            <Trash2 size={11} /> Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                /* Checkout Form Step */
                <form id="checkout-form" onSubmit={handleSubmitCheckout} className="space-y-4">
                  <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-[11px] text-amber-800 leading-relaxed mb-4">
                    <span className="font-bold flex items-center gap-1.5 mb-1 text-xs">
                      <MapPin size={13} /> Swift Packaging from Vizag Core Hub
                    </span>
                    Your order will be instantly packed and dispatched from our main student station in Dwaraka Nagar, Vizag. Guaranteed delivery within Andhra Pradesh inside 24-48 hours!
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      Student Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g., Harsha Vardhan"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-slate-800 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g., +91 98480 22338"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-slate-800 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      Delivery Address *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="e.g., Room 102, Dwaraka PG, Near Complex, Vizag - 530016"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-slate-800 font-semibold"
                    />
                  </div>
                </form>
              )}
            </div>

            {/* Calculations and Actions Footer */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-slate-100 bg-slate-50/70">
                {/* Coupon form */}
                {!checkoutStep && (
                  <div className="mb-4">
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl text-xs text-emerald-800">
                        <span className="flex items-center gap-1.5 font-bold">
                          <CheckCircle2 size={13} className="text-emerald-600" />
                          Code {appliedCoupon.code} Applied ({appliedCoupon.discountPercentage}% off)
                        </span>
                        <button
                          type="button"
                          onClick={handleRemoveCoupon}
                          className="text-[10px] text-emerald-600 underline hover:text-emerald-800 font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Coupon Code (e.g. VIZAGSCHOLAR)"
                          className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-violet-500 text-slate-800 font-semibold uppercase"
                        />
                        <button
                          type="submit"
                          className="bg-slate-800 text-white rounded-xl px-3.5 text-xs font-bold hover:bg-slate-900 transition flex items-center gap-1"
                        >
                          <Tag size={12} /> Apply
                        </button>
                      </form>
                    )}
                    {couponError && <p className="text-[10px] text-red-500 font-medium mt-1">{couponError}</p>}
                  </div>
                )}

                {/* Subcounts */}
                <div className="space-y-1.5 text-xs mb-4">
                  <div className="flex justify-between text-slate-500">
                    <span>Bag Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Discount ({appliedCoupon.discountPercentage}%)</span>
                      <span>-₹{Math.round(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-500">
                    <span>Delivery Charges</span>
                    <span>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span>
                  </div>
                  {deliveryCharge > 0 && (
                    <p className="text-[10px] text-slate-400 italic">Add ₹{500 - subtotal} more of student gear for free shipping!</p>
                  )}
                  <div className="flex justify-between text-sm font-black text-slate-900 pt-1.5 border-t border-slate-200">
                    <span>Total Amount</span>
                    <span className="text-base text-violet-700">₹{Math.round(total)}</span>
                  </div>
                </div>

                {/* Main operational flow button */}
                {!checkoutStep ? (
                  <button
                    type="button"
                    onClick={() => setCheckoutStep(true)}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-2xl font-bold text-xs transition shadow-sm text-center flex items-center justify-center gap-1.5"
                  >
                    Proceed to Delivery Info <Truck size={14} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    form="checkout-form"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-bold text-xs transition shadow-sm text-center flex items-center justify-center gap-1.5"
                  >
                    Confirm Order • Pay on Delivery <CheckCircle2 size={14} />
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
