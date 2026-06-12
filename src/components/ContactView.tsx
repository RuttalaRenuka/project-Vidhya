/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { STORE_INFO } from '../data';
import { MapPin, Phone, Mail, Clock, Send, Landmark, HelpCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactViewProps {
  onShowNotification: (m: string) => void;
}

export default function ContactView({ onShowNotification }: ContactViewProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Simulate messaging api
    setSubmitted(true);
    onShowNotification('Thank you for contacting Vidhya! Our student counselor will reply within 2 hours.');
    
    // Clear
    setName('');
    setEmail('');
    setMessage('');

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="max-w-4xl mx-auto py-2 px-2" id="contact-panel">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Left column: Address & Store Info (2 Cols) */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Landmark size={15} className="text-violet-600" />
              Vizag Flagship Hub
            </h3>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex gap-2.5 items-start">
                <MapPin size={18} className="text-rose-500 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800 block mb-0.5">Physical Hub Address</span>
                  <p className="leading-relaxed">{STORE_INFO.flagshipStoreAddress}</p>
                  <span className="text-[10px] text-zinc-400 font-semibold uppercase mt-1 inline-block bg-slate-100 px-1.5 py-0.5 rounded">
                    Vizag, AP, India
                  </span>
                </div>
              </div>

              <div className="flex gap-2.5 items-start pt-3 border-t border-slate-50">
                <Phone size={18} className="text-emerald-500 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800 block mb-0.5">Consultation Mobile</span>
                  <a href={`tel:${STORE_INFO.phone}`} className="hover:underline hover:text-violet-600">
                    {STORE_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-2.5 items-start pt-3 border-t border-slate-50">
                <Mail size={18} className="text-blue-500 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800 block mb-0.5">Email Helpline</span>
                  <a href={`mailto:${STORE_INFO.email}`} className="hover:underline hover:text-violet-600">
                    {STORE_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex gap-2.5 items-start pt-3 border-t border-slate-50">
                <Clock size={18} className="text-amber-500 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800 block mb-0.5">Active Office Hours</span>
                  <p className="leading-relaxed">{STORE_INFO.workingHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vizag aesthetic map mock */}
          <div className="bg-gradient-to-br from-violet-100 to-indigo-50 border border-slate-100 rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[160px]">
            <div className="absolute right-3 bottom-3 text-violet-500/20">
              <MapPin size={100} />
            </div>
            <div className="relative z-10">
              <span className="text-[9px] uppercase font-bold text-violet-700 bg-violet-200/50 px-2.5 py-0.5 rounded-full inline-block">
                Vizag Center Point
              </span>
              <h4 className="text-xs font-bold text-slate-800 mt-2">Dwaraka Nagar Flagship</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-1 max-w-[180px]">
                Located near the famous Dwaraka bus complex, the ideal location for local student pickups.
              </p>
            </div>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[11px] font-bold text-violet-600 hover:underline inline-flex items-center gap-1 mt-4 relative z-10"
            >
              Get Directions on Map →
            </a>
          </div>
        </div>

        {/* Right column: Query Message Box (3 Cols) */}
        <div className="md:col-span-3">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs h-full flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <HelpCircle size={15} className="text-violet-600 animate-bounce" />
                Submit a Student Inquiry
              </h3>
              <p className="text-xs text-slate-500 mb-5 leading-normal">
                Have custom school batch orders or special brand requirements? Send us a message and our counselor will assist you!
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center space-y-3"
                >
                  <div className="w-12 h-12 bg-white text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-xs font-bold text-emerald-900">Message Dispatched!</h4>
                  <p className="text-[11px] text-emerald-700 leading-relaxed max-w-xs mx-auto">
                    We have successfully received your query inside our Dwaraka Nagar hub. A scholar representative will reply to your student email shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      Your First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Renuka"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-slate-800 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      Your Student Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g., studentname@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-slate-800 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      Detailed Message / Batch list
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g., We need 15 boxes of Speed New Radium pens and 10 pairs of white canvas shoes..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-slate-800 font-semibold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-2xl font-bold text-xs transition shadow-sm hover:shadow-md flex items-center justify-center gap-1.5"
                  >
                    Submit Query <Send size={12} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
