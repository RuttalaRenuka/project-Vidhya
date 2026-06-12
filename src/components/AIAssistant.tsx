/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Send, Bot, User, ShoppingCart, Info, RefreshCw, MessageSquare } from "lucide-react";
import { Product } from "../types";
import { products } from "../data";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
}

export default function AIAssistant({ onAddToCart, onViewDetails }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "👋 Hello! I am your **Vidhya AI Student Advisor**!\n\nI can help you find excellent school and college gear. Ask me about premium neon gel pens, heavy duty backpacks, water bottles, and active uniform shoes.\n\nType something like *'recommend a bag'*, *'pencils for exams'*, or *'what coupon codes are active?'* to start!",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPromo, setShowPromo] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages list updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const quickPrompts = [
    { label: "🎒 Best school bags", text: "Recommend some high quality comfortable school backpacks" },
    { label: "✍️ Exam writing pens", text: "What are the best pens and pencils for taking exams?" },
    { label: "🍱 Lunch & Bottle combos", text: "Show me hot-insulated lunch boxes and stainless water flasks" },
    { label: "🎟️ Get Active Promo Codes", text: "What active coupon codes can I use for discount?" },
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setShowPromo(false);

    try {
      // Prepare history payload for server
      const chatHistory = [...messages, userMessage].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory }),
      });

      if (!res.ok) {
        throw new Error("Failed to receive assistant reply");
      }

      const data = await res.json();

      const assistantMessage: Message = {
        id: `msg-${Date.now()}-assistant`,
        role: "assistant",
        content: data.text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI Assistant error:", error);
      
      const errorMessage: Message = {
        id: `msg-${Date.now()}-error`,
        role: "assistant",
        content: "⚠️ Sorry, I had trouble connecting to the Vidhya academic servers. Please verify that your dev server is active, or try asking again. \n\nCheck **Settings > Secrets** to make sure your **GEMINI_API_KEY** is active if you wish to run direct GenAI queries!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Extract products found in text for interactive micro-cards
  const detectProductsInText = (text: string): Product[] => {
    const lowercaseText = text.toLowerCase();
    return products.filter((prod) => {
      const nameParts = prod.name.toLowerCase().split(" ");
      // Match full brand or distinct name tokens
      return (
        lowercaseText.includes(prod.name.toLowerCase()) ||
        (nameParts.length > 2 && lowercaseText.includes(nameParts.slice(0, 3).join(" "))) ||
        (prod.id && lowercaseText.includes(prod.id.toLowerCase()))
      );
    });
  };

  // Simple formatter to parse bold and line-breaks
  const renderFormattedMessage = (content: string) => {
    return content.split("\n").map((line, idx) => {
      // Bold text formatting **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={`bold-${match.index}`} className="font-bold text-slate-900">
            {match[1]}
          </strong>
        );
        lastIndex = boldRegex.lastIndex;
      }

      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const isBullet = line.trim().startsWith("-") || line.trim().startsWith("*");
      const cleanParts = isBullet ? (parts.slice(1).length > 0 ? parts.slice(1) : line.replace(/^[-*]\s*/, "")) : parts;

      if (isBullet) {
        return (
          <li key={idx} className="ml-4 list-disc text-slate-700 text-xs my-0.5 leading-relaxed">
            {cleanParts}
          </li>
        );
      }

      return (
        <p key={idx} className="text-slate-700 text-xs leading-relaxed my-1 min-h-[4px]">
          {parts.length === 0 ? " " : parts}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Sparkle Promo / Badge on load */}
      <AnimatePresence>
        {!isOpen && showPromo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-40 max-w-xs bg-white border border-violet-100 rounded-2xl p-3.5 shadow-xl flex items-start gap-2.5 cursor-pointer hover:border-violet-300 transition group"
            onClick={() => {
              setIsOpen(true);
              setShowPromo(false);
            }}
          >
            <div className="bg-violet-100 p-1.5 rounded-xl text-violet-600 group-hover:scale-110 transition shrink-0 animate-pulse">
              <Sparkles size={16} />
            </div>
            <div className="space-y-1">
              <span className="block text-[11px] font-black text-violet-600 uppercase tracking-wider">Vidhya Student AI</span>
              <p className="text-xs text-slate-600 font-medium">
                Need back-to-school recommendations? Chat with me for personalized checklists!
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPromo(false);
              }}
              className="text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          id="toggle-ai-assistant"
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) setShowPromo(false);
          }}
          className={`h-14 w-14 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105 active:scale-95 duration-300 focus:outline-none cursor-pointer ${
            isOpen ? "bg-slate-900 border border-slate-800" : "bg-violet-600 border border-violet-500 shadow-violet-600/20"
          }`}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }}>
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div key="chat" className="relative" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
                <MessageSquare size={22} />
                <span className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 bg-rose-500 rounded-full border-2 border-violet-600 flex items-center justify-center animate-bounce" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Assistant Main Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="vidhya-ai-chat-panel"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-40 w-full sm:w-[420px] h-[550px] bg-white rounded-3xl border border-slate-100 shadow-2xl flex flex-col overflow-hidden max-w-[calc(100vw-32px)]"
          >
            {/* Header */}
            <div className="bg-violet-600 px-5 py-4 text-white flex items-center justify-between relative shadow-md">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-violet-500/25 rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/25">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm tracking-tight flex items-center gap-1.5">
                    Vidhya AI Advisor <Sparkles size={12} className="text-amber-300 animate-pulse" />
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-ping" />
                    <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full absolute" />
                    <span className="text-[10px] text-violet-100 font-semibold tracking-wide uppercase">Dwaraka Nagar Flagship</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/10 p-1.5 rounded-lg transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Conversation Window */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-slate-50/50 scrollbar-none">
              {messages.map((message) => {
                const isUser = message.role === "user";
                const detectedProds = isUser ? [] : detectProductsInText(message.content);

                return (
                  <div key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"} items-start gap-2.5`}>
                    {!isUser && (
                      <div className="h-7 w-7 rounded-lg bg-violet-100 border border-violet-200 flex items-center justify-center text-violet-600 shrink-0 mt-0.5">
                        <Bot size={14} />
                      </div>
                    )}
                    
                    <div className="space-y-2 max-w-[82%]">
                      <div
                        className={`rounded-2xl px-4 py-3 shadow-xs text-xs font-medium ${
                          isUser
                            ? "bg-violet-600 text-white rounded-tr-none"
                            : "bg-white border border-slate-100 text-slate-800 rounded-tl-none"
                        }`}
                      >
                        {isUser ? (
                          <p>{message.content}</p>
                        ) : (
                          <div className="space-y-1">{renderFormattedMessage(message.content)}</div>
                        )}
                      </div>

                      {/* Render micro product recommendations if detected in the model output */}
                      {detectedProds.length > 0 && (
                        <div className="space-y-2 mt-2">
                          <span className="block text-[10px] font-bold text-violet-600 uppercase tracking-widest pl-1">
                            🎯 Mentioned Academic Supplies:
                          </span>
                          {detectedProds.map((prod) => (
                            <motion.div
                              key={prod.id}
                              whileHover={{ y: -1 }}
                              className="bg-white border border-slate-100 rounded-xl p-2.5 shadow-xs flex items-center gap-3"
                            >
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-11 h-11 object-cover rounded-lg bg-slate-100 shrink-0"
                                referrerPolicy="no-referrer"
                              />
                              <div className="flex-grow min-w-0">
                                <h4 className="text-[11px] font-bold text-slate-800 truncate leading-tight">
                                  {prod.name}
                                </h4>
                                <span className="text-[10px] font-black text-violet-600">
                                  ₹{prod.price}
                                </span>
                              </div>
                              <div className="flex gap-1">
                                <button
                                  type="button"
                                  onClick={() => onViewDetails(prod)}
                                  className="p-1.5 text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-lg transition"
                                  title="View Details"
                                >
                                  <Info size={11} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => onAddToCart(prod)}
                                  className="p-1.5 text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition"
                                  title="Add to student Bag"
                                >
                                  <ShoppingCart size={11} />
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start items-start gap-2.5">
                  <div className="h-7 w-7 rounded-lg bg-violet-100 border border-violet-200 flex items-center justify-center text-violet-600 shrink-0 mt-0.5">
                    <Bot size={14} />
                  </div>
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3.5 shadow-xs max-w-[82%] flex items-center gap-1.5">
                    <div className="h-2 w-2 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="h-2 w-2 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="h-2 w-2 bg-violet-400 rounded-full animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggested Prompt Rails */}
            {messages.length < 3 && (
              <div className="px-4 py-2 border-t border-slate-100 bg-white grid grid-cols-2 gap-1.5">
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(p.text)}
                    className="text-left bg-slate-50 hover:bg-violet-50/50 border border-slate-100 hover:border-violet-100 px-2.5 py-1.5 rounded-xl transition text-[10px] text-slate-600 font-bold leading-tight"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input Action Bar */}
            <div className="border-t border-slate-100 px-4 py-3 bg-white flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage(inputMessage);
                }}
                disabled={isLoading}
                placeholder="Ask about pens, bags, coupons or orders..."
                className="flex-grow text-xs font-medium border border-slate-100 focus:border-violet-400 focus:outline-none bg-slate-50/55 rounded-xl px-3.5 py-2.5 transition min-w-0"
              />
              <button
                type="button"
                onClick={() => handleSendMessage(inputMessage)}
                disabled={!inputMessage.trim() || isLoading}
                className="h-9 w-9 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-100 text-white disabled:text-slate-400 rounded-xl flex items-center justify-center transition shrink-0 cursor-pointer"
              >
                <Send size={14} className={isLoading ? "animate-pulse" : ""} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
