/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded GenAI Client
let genAIClient: any = null;

function getGenAI() {
  if (!genAIClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY is not defined. The assistant will fall back to local responses.");
      return null;
    }
    genAIClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

// System instructions for Vidhya e-commerce student helper
const systemInstruction = `
You are "Vidhya AI Assistant", a smart, helpful, and friendly student advisor and shopping assistant for "Vidhya" Student Hub.
Vidhya is a premium e-commerce platform in Visakhapatnam (Vizag), Dwaraka Nagar, Andhra Pradesh (530016), India, dedicated to supplying high-quality school and college gear.

Core personality guidelines:
1. Warm, encouraging, motivating for students, polite and reassuring for parents.
2. Extremely knowledgeable about products, student organization, stationery checklists, back-to-school preparation, exam-taking gear, and study habits.
3. Keep answers relatively concise, well-structured, using bullet points for recommendations. Use rupees sign ₹ for prices.
4. Highlight active coupon codes:
   - "STUDENT10": 10% off on all back-to-school items.
   - "VIZAGSCHOLAR": 18% off celebrating our flagship store in Visakhapatnam.
   - "BULKPEN": 15% off for stationery stacks on orders above ₹500.

Product Catalog details you must recommend:
- Stationery:
  - "Speed New Radium Neon Gel Pen" (₹45): Glows in dark accents, high-speed neon flow ink.
  - "Doms Super Gel Smooth Pen" (₹25, was ₹30): Smudge-free waterproof gel ink, School-recommended.
  - "Elite Executive Matte Pro Rollerball" (₹120): Premium matte carbon body, refillable, exam preparation companion.
  - "Nataraj 621 Red & Black Pencils" (₹10): Iconic, durable, break-resistant red-and-black pencils.
  - "Apsara Platinum Extra Dark Pencil" (₹15): Extra dark premium graphite, exam superstar.
  - "Doms Zoom Triangle Dark Pencil" (₹18): Ergonomic triangular body for small hands.
  - "Staedtler Mars Carbon Professional 2.0mm Mechanical Pencil" (₹180): Premium heavy drafting body, built-in sharpener, 4 HB carbon leads.
  - "Kuelox Premium Charcoal Sketching Pencils (Set of 3)" (₹110): Dense artistic charcoal for deep shading and contrast.
  - "Vidhya Precision Geometry & Drawing Box" (₹210): Zinc die-cast self-centering compass, shatterproof millimeter rulers.
  - "Maped Precision Shatterproof Transparent Scale 30cm" (₹45): Multi-stress resilient bendy body, high magnification reading bar, precise graduations.
  - "Camlin Elegant Rust-Free Stainless Steel Scale 15cm" (₹30): Pocket profile steel with deeply etched dark conversion metrics.
  - "Camel Professional Triangular Architect Scale 30cm" (₹240): High-precision dynamic 3-sided scale with color indexes.
  - "Luxor Pastel Chisel Accent Highlighters (Pack of 5)" (₹140): Beautiful warm non-toxic pastel shades.
  - "Tombow Dual Brush Calligraphy & Art Pens (Set of 6)" (₹480): Dual tip calligraphy & blending pastel markers.
  - "Casio ClassWiz FX-991EX Scientific Student Calculator" (₹1250): Natural textbook displays with 552 high-level math utilities.
  - "Faber-Castell Triangular Super Wax Crayons (Pack of 12)" (₹125): Ergonomic shape helps child find the perfect handgrip.
  - "Camel Heavy-Duty Premium Steel Scissors 6-Inch" (₹95): Blunt rounded tip craft shears.
  - Erasers: "Doms Dust-Free Jumbo Eraser" (₹5), "Apsara Non-Dust Deluxe Erasers Pack of 5" (₹20, was ₹25).
  - Notebooks: "Classmate Premium Single Line Notebook" (₹65), "Classmate Spiral Bound long Book" (₹110, was ₹130) with 200 sheets.
- Books:
  - "Oxford Student Atlas for India" (₹340): Compiles over 120 detailed administrative & physical maps.
  - "Illustrated Children’s Science Encyclopedia" (₹550, was ₹700): Packed with vector diagrams, science topics.
- Bags:
  - "Skybags Campus Ergonomic Backpack" (₹1250, was ₹1800): Air-mesh back cushions, high-comfort premium fabric.
  - "Safari Prime Flexi-back School Bag" (₹999): Lightweight (< 450g), deep side pockets, dual stitching.
- Shoes:
  - "Bata Scholar Black Uniform Shoes" (₹850): Anti-scuff dress shoes with anti-slip rubber grip.
  - "Action School-Time White Canvas PT Shoes" (₹499, was ₹599): Machine-washable, double-press canvas, PT classes.
- Water Bottles:
  - "Milton Thermosteel Vacuum Student Flask" (₹720): 18/8 stainless steel, hot/cold for 24 hours.
  - "Cello H2O Food-Grade Water Bottle Set of 2" (₹220, was ₹280): Translucent, BPA-free.
- Lunch Boxes:
  - "Milton Insulated Deluxe Lunch Box Set" (₹580): Insulated bag, 3 leak-proof steel bowls.
  - "Signoraware Slim Bento Box with Cutlery" (₹290, was ₹350): Leak-proof compact profile, includes utensils.

If asked about tracking orders, explain they can go to the "Track Order" view and enter their Order reference (e.g., VIDHYA-XXXX-VIZAG).

Always stick to these products. If the user asks for random things under the sun not matching e-commerce, try to relate it to education or student productivity, then politely guide them back to finding the best equipment.
`;

// Fallback message generator (when GEMINI_API_KEY is not defined)
function getLocalFallbackResponse(userPrompt: string): string {
  const prompt = userPrompt.toLowerCase();
  
  if (prompt.includes("pen") || prompt.includes("write") || prompt.includes("pencil")) {
    return `📝 **Vidhya Assistant Selection Guide: Pens & Pencils**\n\nI highly recommend our academic favorites:\n- **Speed New Radium Neon Gel Pen** (₹45): Perfect for energetic writing and vibrant note-taking.\n- **Staedtler Mars Carbon Professional 2.0mm Mechanical Pencil** (₹180): Premium heavy drafting body with built-in sharpener for accurate drawings.\n- **Apsara Platinum Extra Dark Pencil** (₹15): The perfect companion for rapid exam writing and clear bubble shading.\n- **Kuelox Premium Charcoal Sketching Pencils (Set of 3)** (₹110): Dense clay-free deep charcoal for professional shading.\n\n💡 *Tip: Apply coupon **BULKPEN** to get 15% off stationery stacks when ordering above ₹500!*`;
  }
  
  if (prompt.includes("geometry") || prompt.includes("math") || prompt.includes("ruler") || prompt.includes("scale") || prompt.includes("instrument") || prompt.includes("compass") || prompt.includes("calculator")) {
    return `📐 **Vidhya Assistant Selection Guide: Mathematics & Instruments**\n\nCheckout our high-precision drawing instruments and scales:\n- **Casio ClassWiz FX-991EX Scientific Student Calculator** (₹1250): Natural Textbook Display with 552 math functions.\n- **Vidhya Precision Geometry & Drawing Box** (₹210): Features self-centering die-cast zinc compasses, zero-glare transparent scales and set squares.\n- **Maped Precision Shatterproof Transparent Scale 30cm** (₹45): Highly physical-stress-tolerant bendy body with non-wearing metric and inches markings.\n- **Camel Professional Triangular Architect Scale 30cm** (₹240): High-precision 3-sided scale with color index grids for drafts.\n- **Camlin Elegant Rust-Free Stainless Steel Scale 15cm** (₹30): Pocket rule with deeply etched dark conversion metrics that never rub off. No more wobbles!`;
  }

  if (prompt.includes("highlight") || prompt.includes("marker") || prompt.includes("luxor") || prompt.includes("color") || prompt.includes("crayon") || prompt.includes("art")) {
    return `🎨 **Vidhya Art & Text-Highlighting Essentials**\n\nMake study notebooks and project charts gorgeous with these:\n- **Tombow Dual Brush Calligraphy & Art Pens (6-pack)** (₹480): Dual brush & fine tips with exquisite blendable pastel shades.\n- **Luxor Pastel Chisel Accent Highlighters (Pack of 5)** (₹140): Light-tone water-based inks that dry instantly. Colors: Mint, Lavender, Peach, Yellow, Sky Blue!\n- **Faber-Castell Triangular Super Wax Crayons (Pack of 12)** (₹125): Specially sculpted triangular body that comfortable teaches correct writing grip. Safe & non-smudging!`;
  }

  if (prompt.includes("bag") || prompt.includes("pack") || prompt.includes("backpack")) {
    return `🎒 **Vidhya Assistant Recommendation: School Bags**\n\nTo ensure comfortable posture, check these out:\n- **Skybags Campus Ergonomic Backpack** (₹1250 - *30% Off!*): Built with air-mesh double cushioning to protect growing student shoulders.\n- **Safari Prime Flexi-back School Bag** (₹999): Exceptionally lightweight (<450g) and heavily reinforced with dual seams.\n\nUse code **STUDENT10** for an additional 10% discount on these premium bags!`;
  }

  if (prompt.includes("coupon") || prompt.includes("code") || prompt.includes("discount") || prompt.includes("offer")) {
    return `🎟️ **Vidhya Student Deals & Coupons**\n\nHere are active discounts you can use at checkout right now:\n1. **VIZAGSCHOLAR** - 18% OFF celebrating our Visakhapatnam flagship store!\n2. **STUDENT10** - 10% OFF on all backpacks, bottles and back-to-school items.\n3. **BULKPEN** - 15% OFF on stationery orders exceeding ₹500.\n\nSimply paste any of these codes into your Student Bag at checkout!`;
  }

  if (prompt.includes("track") || prompt.includes("order") || prompt.includes("status")) {
    return `🚚 **Tracking Your Vidhya Order**\n\nYou can track any simulated order instantly! \n1. Note your Order ID (such as \`VIDHYA-1234-VIZAG\`) displayed after checkout.\n2. Head over to the **Track Order** tab in the main navigation.\n3. Enter your code to view the live progress of packaging and dispatch from our Vizag warehouse!`;
  }

  if (prompt.includes("bottle") || prompt.includes("lunch") || prompt.includes("flask") || prompt.includes("bento")) {
    return `🍱 **Healthy Student hydration & Lunches**\n\nHere are some crowd favorites:\n- **Milton Thermosteel Vacuum Student Flask** (₹720): keeps water cool or tea warm for up to 24 hours.\n- **Signoraware Slim Bento Box with Cutlery** (₹290): Fits absolutely flat inside your academic backpack, including native spoon and fork.`;
  }

  return `👋 Hello! I am your **Vidhya AI Assistant**! \n\nI can help you select books, stationery, premium water bottles, and uniform essentials for the back-to-school season. \n\n*What are you preparing for today? (e.g., examination prep list, ergonomic school bags, active student water flasks, or looking for special coupon codes?)*`;
}

// API Routes
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format" });
  }

  const latestMessage = messages[messages.length - 1]?.content || "";

  try {
    const aiClient = getGenAI();
    if (!aiClient) {
      // Simulate slow response for natural interactive feeling
      await new Promise((resolve) => setTimeout(resolve, 800));
      const fallbackText = getLocalFallbackResponse(latestMessage);
      return res.json({ text: fallbackText, isFallback: true });
    }

    // Format message history for standard Gemini model interface
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I apologize, I could not process your text. How else can I assist you?";
    res.json({ text: replyText, isFallback: false });
  } catch (error: any) {
    console.error("Error communicating with Gemini API:", error);
    // Graceful presentation back to user
    res.status(500).json({
      error: "Could not execute chat request",
      details: error.message,
      text: "Vidhya AI Assistant is currently experiencing high load. In the meantime, here is a helpful automated guide:\n\n" + getLocalFallbackResponse(latestMessage),
    });
  }
});

// Configure Vite or Static Assets depending on Environment
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
