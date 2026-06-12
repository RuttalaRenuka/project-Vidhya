/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Order, OrderStatus } from '../types';
import { Check, ClipboardList, MapPin, Search, Calendar, Landmark, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface TrackOrderViewProps {
  orders: Order[];
}

export default function TrackOrderView({ orders }: TrackOrderViewProps) {
  const [searchId, setSearchId] = useState('');
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Sample seed demo order so that the view is exciting on load
  const [demoOrder, setDemoOrder] = useState<Order | null>(null);

  useEffect(() => {
    // If there is a real order placed recently, select that.
    if (orders.length > 0) {
      setActiveOrder(orders[orders.length - 1]);
    } else {
      // Seed a beautiful demo order
      const demo: Order = {
        id: 'VIDHYA-7492-VIZAG',
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleString(), // 1 day ago
        status: 'dispatched_from_vizag',
        items: [
          {
            product: {
              id: 'pen-speed-radium',
              name: 'Speed New Radium Neon Gel Pen',
              description: '',
              category: 'stationery',
              brand: 'Speed',
              price: 45,
              rating: 4.8,
              reviewsCount: 12,
              image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=200',
              features: [],
              inStock: true
            },
            quantity: 3
          },
          {
            product: {
              id: 'pencil-apsara-platinum',
              name: 'Apsara Platinum Extra Dark Pencil',
              description: '',
              category: 'stationery',
              brand: 'Apsara',
              price: 15,
              rating: 4.8,
              reviewsCount: 22,
              image: 'https://images.unsplash.com/photo-1508830524289-0adcbe822b40?auto=format&fit=crop&q=80&w=200',
              features: [],
              inStock: true
            },
            quantity: 1
          }
        ],
        totalAmount: 150,
        customerName: 'Anil Kumar',
        customerPhone: '+91 91234 56789',
        customerAddress: 'MVP Colony, Visakhapatnam, Andhra Pradesh - 530017'
      };
      setDemoOrder(demo);
      setActiveOrder(demo);
    }
  }, [orders]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const idToSearch = searchId.trim().toUpperCase();

    // Check custom lists
    const found = orders.find(o => o.id.toUpperCase() === idToSearch);
    if (found) {
      setActiveOrder(found);
      return;
    }

    // Check demo order
    if (demoOrder && demoOrder.id.toUpperCase() === idToSearch) {
      setActiveOrder(demoOrder);
      return;
    }

    setErrorMessage(`Could not find an order with ID "${idToSearch}". Please check the spelling.`);
  };

  const getStepStatus = (step: OrderStatus, currentStatus: OrderStatus): 'completed' | 'active' | 'pending' => {
    const sequence: OrderStatus[] = [
      'placed',
      'packaged',
      'dispatched_from_vizag',
      'out_for_delivery',
      'delivered'
    ];

    const currentIdx = sequence.indexOf(currentStatus);
    const stepIdx = sequence.indexOf(step);

    if (stepIdx < currentIdx) return 'completed';
    if (stepIdx === currentIdx) return 'active';
    return 'pending';
  };

  const statusMeta = {
    placed: { label: 'Order Registered', desc: 'Received successfully inside Vidhya servers.' },
    packaged: { label: 'Boxed & Labeled', desc: 'Packed securely with safety seal at Dwaraka Nagar, Vizag.' },
    dispatched_from_vizag: { label: 'Shipped from Vizag Hub', desc: 'Sorted and loaded onto delivery flight/express truck from Vizag port.' },
    out_for_delivery: { label: 'Out with Courier Partner', desc: 'Arrived at your local delivery station; advisor matches address.' },
    delivered: { label: 'Handover Completed', desc: 'Delivered securely to the scholar. Thank you for choosing Vidhya!' }
  };

  return (
    <div className="max-w-4xl mx-auto py-4 px-2" id="track-order-panel">
      {/* Search Header */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm mb-6">
        <h2 className="text-xl font-bold text-slate-950 mb-1 flex items-center gap-2">
          <ClipboardList className="text-violet-600" size={22} />
          Student Hub Transit Tracking
        </h2>
        <p className="text-xs text-slate-500 mb-5">
          Enter your unique Vidhya Order ID to view instant real-time dispatch progress from our Vizag central store.
        </p>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              required
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="e.g. VIDHYA-7492-VIZAG"
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 text-xs focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-slate-800 font-bold uppercase transition"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl text-xs font-bold transition flex items-center gap-1.5"
          >
            Track Dispatch
          </button>
        </form>

        {errorMessage && (
          <p className="text-xs text-red-500 font-semibold mt-2">{errorMessage}</p>
        )}
      </div>

      {activeOrder && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Progress Steps */}
          <div className="md:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-50 pb-4 mb-6">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Currently Tracking</span>
                <h3 className="text-sm font-black text-slate-900 tracking-wide">{activeOrder.id}</h3>
              </div>
              <span className="text-[11px] font-bold text-violet-700 bg-violet-50 px-3 py-1 rounded-full flex items-center gap-1">
                <Sparkles size={11} />
                {activeOrder.status === 'dispatched_from_vizag' ? 'Leaving Vizag Port' : 
                 activeOrder.status === 'placed' ? 'Registering' : 
                 activeOrder.status === 'packaged' ? 'Ready to Ship' : 
                 activeOrder.status === 'out_for_delivery' ? 'On Local Route' : 'Delivered'}
              </span>
            </div>

            {/* Stepper Timeline */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              {(['placed', 'packaged', 'dispatched_from_vizag', 'out_for_delivery', 'delivered'] as OrderStatus[]).map((step, idx) => {
                const status = getStepStatus(step, activeOrder.status);
                const stepDetails = statusMeta[step];

                return (
                  <div key={idx} className="relative flex gap-4">
                    {/* Stepper Circle */}
                    <span
                      className={`absolute -left-[20px] top-1.5 w-[10px] h-[10px] rounded-full border-2 transition-all ${
                        status === 'completed'
                          ? 'bg-emerald-500 border-emerald-500 scale-120'
                          : status === 'active'
                          ? 'bg-white border-violet-600 ring-4 ring-violet-100 scale-125'
                          : 'bg-white border-slate-200'
                      }`}
                    />

                    {/* Step Content */}
                    <div className="pl-4 min-w-0">
                      <h4
                        className={`text-xs font-bold transition-colors ${
                          status === 'completed'
                            ? 'text-slate-600'
                            : status === 'active'
                            ? 'text-violet-700 text-sm'
                            : 'text-slate-400'
                        }`}
                      >
                        {step === 'dispatched_from_vizag' ? (
                          <span className="flex items-center gap-1">
                            <Landmark size={13} className="text-amber-500" />
                            {stepDetails.label}
                          </span>
                        ) : stepDetails.label}
                      </h4>
                      <p
                        className={`text-[11px] leading-relaxed transition-colors mt-0.5 ${
                          status === 'pending' ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {stepDetails.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Summary Meta */}
          <div className="bg-slate-50 border border-slate-100/50 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4">
                Delivery Coordinates
              </h4>

              <div className="space-y-4 text-xs">
                <div className="flex gap-2.5">
                  <MapPin size={16} className="text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Scholar Destination</span>
                    <p className="font-bold text-slate-800 mt-0.5">{activeOrder.customerName}</p>
                    <p className="text-slate-500 leading-relaxed text-[11px] mt-0.5">{activeOrder.customerAddress}</p>
                  </div>
                </div>

                <div className="flex gap-2.5 pt-3 border-t border-slate-200/60">
                  <Calendar size={16} className="text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Checkout Timestamp</span>
                    <p className="font-semibold text-slate-700 mt-0.5">{activeOrder.date}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/60">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-2">Items inside Cargo</span>
                  <div className="space-y-2">
                    {activeOrder.items.map((it, i) => (
                      <div key={i} className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-600 truncate max-w-[150px] font-medium">{it.product.name}</span>
                        <span className="text-slate-400 font-bold">qty: {it.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/60 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">Collected Cash</span>
                <span className="text-base font-extrabold text-slate-900">₹{activeOrder.totalAmount}</span>
              </div>
              <p className="text-[10px] text-emerald-600 font-semibold mt-1">Paid via Cash on Delivery</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
