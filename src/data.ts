/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Coupon } from './types';

// Let's use clean, targeted Unsplash and generated image URLs
export const HERO_BANNER_IMG = '/src/assets/images/vidhya_hero_banner_1781247037619.jpg';
export const HOME_PENS_IMG = '/src/assets/images/vidhya_pens_collection_1781247054022.jpg';

// Other beautiful curated stock images
export const STATIONERY_BANNER_IMG = 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800';
export const BOOKS_BANNER_IMG = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800';
export const BAGS_BANNER_IMG = 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800';
export const SHOES_BANNER_IMG = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800';
export const BOTTLE_BANNER_IMG = 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800';
export const LUNCH_BANNER_IMG = 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=800';

export const products: Product[] = [
  // PENS (speed new radium, doms, elite)
  {
    id: 'pen-speed-radium',
    name: 'Speed New Radium Neon Gel Pen',
    description: 'A revolutionary glow-in-the-dark accent writing pen with ultra-smooth fluid neon ink. Specially engineered for energetic students who love stylish highlights and fast note-taking.',
    category: 'stationery',
    subcategory: 'Pens',
    brand: 'Speed',
    price: 45,
    rating: 4.8,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1585336139055-343152645dd1?auto=format&fit=crop&q=80&w=600',
    features: ['Fluorescent Radium accents on body', 'High-speed flow ink technology', 'Comfort soft-gel finger padding', '0.5mm Japanese micro-ball tip'],
    suggestions: ['Speed New Radium Core Series', 'Speed Radium Glitter Edition', 'Speed Radium Multi-Color Pack of 5'],
    inStock: true
  },
  {
    id: 'pen-doms-gel',
    name: 'Doms Super Gel Smooth Pen',
    description: 'Perfect for regular classroom tasks, this gel pen features quick-dry water-resistant dark ink. High-density pigment ensures crisp writing with minimal bleed.',
    category: 'stationery',
    subcategory: 'Pens',
    brand: 'Doms',
    price: 25,
    originalPrice: 30,
    rating: 4.6,
    reviewsCount: 84,
    image: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&q=80&w=600',
    features: ['Smudge-free waterproof ink', 'Crystal see-through ink level window', 'Perfect balance body weighting', 'Recommended by top schools for junior grades'],
    suggestions: ['Doms C-Gel Comfort Series', 'Doms Glitter Sparkle Set', 'Doms Neon Touch Sign Roller'],
    inStock: true
  },
  {
    id: 'pen-elite-fountain',
    name: 'Elite Executive Matte Pro Rollerball',
    description: 'A premium-grade writing instrument for high school and university students preparing for exams. Balanced weight provides tireless writing for hours with an elegant aesthetic.',
    category: 'stationery',
    subcategory: 'Pens',
    brand: 'Elite Suggestions',
    price: 120,
    rating: 4.9,
    reviewsCount: 62,
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600',
    features: ['Premium heavy carbon fiber matte body', 'Gold-plated tungsten alloy tip', 'Refillable luxury cartridges', 'Comes in an elegant metal storage case'],
    suggestions: ['Elite Royale Rollerball', 'Elite Gold Touch Presentation Pack', 'Elite Scholar Soft-gilded Fountain'],
    inStock: true
  },

  // PENCILS (nataraj, apsara, doms)
  {
    id: 'pencil-nataraj-621',
    name: 'Nataraj 621 Red & Black Pencils',
    description: 'The legends of classrooms. Trusted across generations for its high-durability break-resistant lead and neat graphite transfer. Ideal for math, diagrams, and writing.',
    category: 'stationery',
    subcategory: 'Pencils',
    brand: 'Nataraj',
    price: 10,
    rating: 4.7,
    reviewsCount: 450,
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=600',
    features: ['Signature red and black striped design', 'Super-bonded break resistant graphite lead', 'Certified non-toxic forest-friendly wood', 'Sharpens cleanly without splintering'],
    suggestions: ['Nataraj 621 Classic Box of 10', 'Nataraj Bold Super Graphite Pack', 'Nataraj Junior Hexagonal Grip'],
    inStock: true
  },
  {
    id: 'pencil-apsara-platinum',
    name: 'Apsara Platinum Extra Dark Pencil',
    description: 'Engineered for darker writing that lasts. A favorite among students for exam writing as it requires minimal pressure to leave clear, bold lines that scan perfectly.',
    category: 'stationery',
    subcategory: 'Pencils',
    brand: 'Apsara',
    price: 15,
    rating: 4.8,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1508830524289-0adcbe822b40?auto=format&fit=crop&q=80&w=600',
    features: ['Extra dark premium grade graphite', 'Distinctive grey & black design', 'Includes high-quality eraser and sharpener inside', 'Ideal for both sketching and rapid examination writing'],
    suggestions: ['Apsara Platinum Extra Dark Pack of 10', 'Apsara Matt Magic Pastel Edition', 'Apsara Beauty Writing Speciality Pencil'],
    inStock: true
  },
  {
    id: 'pencil-doms-zoom',
    name: 'Doms Zoom Triangle Dark Pencil',
    description: 'Ergonomically designed triangular body helps small hands form the perfect pencil grip. The super-dark, smooth-glide lead makes writing playful and effortlessly clean.',
    category: 'stationery',
    subcategory: 'Pencils',
    brand: 'Doms',
    price: 18,
    rating: 4.5,
    reviewsCount: 195,
    image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1141?auto=format&fit=crop&q=80&w=600',
    features: ['Comfortable soft-touch triangular grip', 'Super-dark 2B equivalent lead quality', 'Rich bright colored pastel coatings', 'Fumigated wood safe for toddlers'],
    suggestions: ['Doms Zoom Pastel Triangle Set', 'Doms Groove Child Metallic Pencils', 'Doms Fusion Ultimate Pack'],
    inStock: true
  },
  {
    id: 'pencil-staedtler-mechanical',
    name: 'Staedtler Mars Carbon Professional 2.0mm Mechanical Pencil',
    description: 'An exceptional high-end drafting and sketching mechanical pencil with comfortable ribbed finger zone. Perfect for professional scale drawings and math exams.',
    category: 'stationery',
    subcategory: 'Pencils',
    brand: 'Staedtler',
    price: 180,
    rating: 4.9,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1510172951991-856a654063f9?auto=format&fit=crop&q=80&w=600',
    features: ['Ribbed metallic-style finger holding zone', 'Removable sharpener integrated into push-button', 'Highly impact-resistant lead clutch', 'Includes tube of 4 super HB carbon leads'],
    suggestions: ['Staedtler Mars Lead refills', 'Vidhya Drawing Pro Layout Board'],
    inStock: true
  },
  {
    id: 'pencil-kuelox-charcoal',
    name: 'Kuelox Premium Charcoal Sketching Pencils (Set of 3)',
    description: 'Professional grade dense charcoal sketching pencils containing soft, medium, and hard grades. Glides effortlessly on paper for rich shading and depth contrast.',
    category: 'stationery',
    subcategory: 'Pencils',
    brand: 'Kuelox',
    price: 110,
    rating: 4.8,
    reviewsCount: 54,
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=600',
    features: ['Smooth clay-free deep charcoal cores', 'Varnish-coated light basswood protection body', 'Washes out neatly with water-blenders', 'Perfect for studio sketching and anatomy drawings'],
    suggestions: ['Kuelox Blending stumps', 'Faber Kneaded Eraser Deluxe'],
    inStock: true
  },

  // ERASERS & STATIONERY ACCESSORIES
  {
    id: 'eraser-doms',
    name: 'Doms Dust-Free Jumbo Eraser',
    description: 'A revolutionary premium non-abrasive soft eraser that rolls all dust into single strands, leaving your exam papers pristine and tear-free.',
    category: 'stationery',
    subcategory: 'Erasers',
    brand: 'Doms',
    price: 5,
    rating: 4.6,
    reviewsCount: 120,
    image: 'https://images.unsplash.com/photo-1515256449343-4b8826048fc2?auto=format&fit=crop&q=80&w=600',
    features: ['High-tech non-abrasive rubber polymer', 'Dust collecting strand formulation', 'Protected by durable slide cardboard sleeve'],
    inStock: true
  },
  {
    id: 'eraser-apsara',
    name: 'Apsara Non-Dust Deluxe Erasers (Pack of 5)',
    description: 'Reliable and soft premium-grade erasers. Gently rolls over any pencil mark without tearing the delicate page surface, protecting student project books.',
    category: 'stationery',
    subcategory: 'Erasers',
    brand: 'Apsara',
    price: 20,
    originalPrice: 25,
    rating: 4.7,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=600',
    features: ['Leaves very minimal residue', 'Ultra gentle on school graph papers', 'Excellent for technical blueprint work'],
    inStock: true
  },
  {
    id: 'geometry-box-vidhya',
    name: 'Vidhya Precision Geometry & Drawing Box',
    description: 'An ultimate high-grade drawing and mathematical instrument kit. Features premium die-cast compasses, accurate millimeter-perfect markings on transparent rulers, and a protective anti-rust metal container.',
    category: 'stationery',
    subcategory: 'Geometry Boxes',
    brand: 'Vidhya',
    price: 210,
    rating: 4.8,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600',
    features: ['Shatterproof transparent grade rulers', 'Die-cast zinc self-centering compass', 'Friction-free pencil holding locks', 'Includes custom mechanical steel pencil'],
    suggestions: ['Vidhya Deluxe Math Pro', 'Vidhya Refillable Lead Tubes'],
    inStock: true
  },
  {
    id: 'scale-maped-shatterproof',
    name: 'Maped Precision Shatterproof Transparent Scale 30cm',
    description: 'A 30cm shatter-resistant high-clarity crystal ruler. Engineered to withstand high physical stress in student schoolbags without cracking, with non-wearing metric and imperial lines.',
    category: 'stationery',
    subcategory: 'Rulers & Scales',
    brand: 'Maped',
    price: 45,
    rating: 4.8,
    reviewsCount: 140,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600',
    features: ['Shatterproof high-bend plastic build', 'Grid-aligned magnifying central bar', 'Includes double-sided millimeter and inch graduations', 'Ultra-clean non-slip bottom texture'],
    suggestions: ['Maped Compact Scale Set', 'Vidhya Geometric Set Pro'],
    inStock: true
  },
  {
    id: 'scale-camlin-steel',
    name: 'Camlin Elegant Rust-Free Stainless Steel Scale 15cm',
    description: 'A pocket-sized 15cm high-grade stainless steel rule. Built with deeply etched high-contrast dark markings that never fade or rub off, making physics diagrams simple and correct.',
    category: 'stationery',
    subcategory: 'Rulers & Scales',
    brand: 'Camlin',
    price: 30,
    rating: 4.7,
    reviewsCount: 92,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
    features: ['Rust-resisting hardened stainless steel', 'Rounded corner ends for pocket safety', 'Incredibly thin non-wobbling paper flush profile', 'Includes precise conversion table on backside'],
    suggestions: ['Camlin Steel Pro 30cm', 'Apsara Platinum Sharpener'],
    inStock: true
  },
  {
    id: 'highlighter-luxor-pastel',
    name: 'Luxor Pastel Chisel Accent Highlighters (Pack of 5)',
    description: 'A pack of beautiful light-tone pastel highlighters that do not obstruct readability. Non-bleeding water-proof water-based ink makes studying and outlining textbooks a delightful visual experience.',
    category: 'stationery',
    subcategory: 'Highlighters',
    brand: 'Luxor',
    price: 140,
    rating: 4.7,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=600',
    features: ['Ergonomic soft rectangular grip body', 'Non-toxic quick dry smart ink', 'Dual-width chisel tip lines (1mm & 5mm)', 'Aesthetic pastel shades: Mint, Lavender, Peach, Yellow, Sky Blue'],
    suggestions: ['Luxor Neon Glow Pack', 'Luxor Micro Fine Outline Liners'],
    inStock: true
  },
  {
    id: 'wax-crayons-faber',
    name: 'Faber-Castell Triangular Super Wax Crayons (Pack of 12)',
    description: 'Vibrant, clean-touch coloring crayons designed with safety and comfort in mind. The unique safety triangular shape assists early learners in developing the correct writing grip without strain.',
    category: 'stationery',
    subcategory: 'Colors',
    brand: 'Faber-Castell',
    price: 125,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600',
    features: ['Non-smudge waterproof smooth coloring', 'Comes with helpful scratch-art dual stylus', 'Tough break-resistant core composition', 'Safe, certified skin-friendly materials'],
    suggestions: ['Faber Paint Set', 'Faber Sketch Pens Washable Board'],
    inStock: true
  },
  {
    id: 'scissors-camel',
    name: 'Camel Heavy-Duty Premium Steel Scissors 6-Inch',
    description: 'Safety-certified craft and paper utility scissors featuring durable rust-free stainless steel blades. Excellent for collage, art projects, and precise model crafting.',
    category: 'stationery',
    subcategory: 'Art Crafts',
    brand: 'Camel',
    price: 95,
    rating: 4.6,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1515256449343-4b8826048fc2?auto=format&fit=crop&q=80&w=600',
    features: ['Premium rounded blunt tip design for student safety', 'Soft comfortable grip handles prevents fatigue', 'Laser sharp edge cuts craft sheets smoothly'],
    suggestions: ['Camel Glue Stick Pack', 'Camel Colored Craft Board Sheets'],
    inStock: true
  },

  // NOTEBOOKS
  {
    id: 'notebook-classmate-ruled',
    name: 'Classmate Premium Single Line Notebook',
    description: 'High-quality wood-free notebook with ultra-white pages. Each page features an index, date stamp section, and helpful fun-facts for students in the margins.',
    category: 'stationery',
    subcategory: 'Notebooks',
    brand: 'Classmate',
    price: 65,
    rating: 4.9,
    reviewsCount: 380,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=600',
    features: ['Chlorine-free premium environmental paper', 'Sturdy 3-pin central step-wire binding', 'Includes custom student index page', 'Back cover includes interactive puzzles'],
    inStock: true
  },
  {
    id: 'notebook-classmate-spiral',
    name: 'Classmate Spiral Bound long Book',
    description: 'Ideal for taking college lectures and long class notes. The strong spiral binding allows the book to lay completely flat on desks, making writing super easy.',
    category: 'stationery',
    subcategory: 'Notebooks',
    brand: 'Classmate',
    price: 110,
    originalPrice: 130,
    rating: 4.8,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600',
    features: ['Spiral flexible wire binding', '200 multi-subject micro-perforated sheets', 'Extra thick protector plastic cover', 'Integrated layout dividers'],
    inStock: true
  },

  // BOOKS
  {
    id: 'book-oxford-atlas',
    name: 'Oxford Student Atlas for India',
    description: 'The perfect companion for geography classes. Outstanding detailed graphical and analytical maps of Indian rivers, mountains, minerals, and international grids.',
    category: 'books',
    brand: 'Oxford',
    price: 340,
    rating: 4.8,
    reviewsCount: 160,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600',
    features: ['Over 120 color detailed administrative & physical maps', 'Updated geopolitical borders and highway layouts', 'Interactive digital map exercise codes inside'],
    inStock: true
  },
  {
    id: 'book-encyclopedia',
    name: 'Illustrated Children’s Science Encyclopedia',
    description: 'Spark the fire of exploration in young minds. Packed with visual diagrams, simplified descriptions, and experiments covering physics, astronomy, and biology.',
    category: 'books',
    brand: 'Vidhya Publication',
    price: 550,
    originalPrice: 700,
    rating: 4.9,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600',
    features: ['More than 500 hand-drawn vector science illustrations', 'Simple words structured for grade 1-10 students', 'Hardcover gold-gilt collector edition'],
    inStock: true
  },

  // BAGS
  {
    id: 'bag-skybags-campus',
    name: 'Skybags Campus Ergonomic Backpack',
    description: 'Spacious and lightweight school backpack featuring double air-mesh back ventilation cushions to protect growing shoulder spines. Includes a dedicated tablet sleeve.',
    category: 'bags',
    brand: 'Skybags',
    price: 1250,
    originalPrice: 1800,
    rating: 4.7,
    reviewsCount: 187,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600',
    features: ['Premium ripstop weather-resistant polyester fabric', '3 separate full-zip compartments', 'Includes high-visibility reflective night markers', 'Integrated secret cash zip and umbrella mesh holder'],
    inStock: true
  },
  {
    id: 'bag-safari-prime',
    name: 'Safari Prime Flexi-back School Bag',
    description: 'A robust daily pack that handles heavy textbooks with ease. Engineered with reinforced dual stitching and durable heavy-duty nylon runners that never slip.',
    category: 'bags',
    brand: 'Safari',
    price: 999,
    rating: 4.6,
    reviewsCount: 145,
    image: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&q=80&w=600',
    features: ['Featherlight structure design weight < 450g', 'Deep water-bottle pockets on both sides', 'Comfort-grab thick soft carrying handle'],
    inStock: true
  },

  // SHOES
  {
    id: 'shoes-bata-leather',
    name: 'Bata Scholar Black Uniform Shoes',
    description: 'Premium anti-scuff black leather dress shoes matching standard school uniforms. Offers thick cushioned heels for active game periods and assemblies.',
    category: 'shoes',
    brand: 'Bata',
    price: 850,
    rating: 4.7,
    reviewsCount: 230,
    image: 'https://images.unsplash.com/photo-1620138546344-7b2c08f58146?auto=format&fit=crop&q=80&w=600',
    features: ['Grip-lock anti-slip rubber traction sole', 'Sweat-absorbing porous leather lining', 'Easy wipe-clean shiny school finish'],
    inStock: true
  },
  {
    id: 'shoes-action-canvas',
    name: 'Action School-Time White Canvas PT Shoes',
    description: 'The absolute mandatory shoes for physical training, sports, and parade days. Easy lace support, light body, and simple machine washable design.',
    category: 'shoes',
    brand: 'Action',
    price: 499,
    originalPrice: 599,
    rating: 4.5,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=600',
    features: ['Vulcanized double-press secure white canvas', 'Flexible non-marking rubber outsole', 'Anti-fungal cushioned orthotic insoles'],
    inStock: true
  },

  // WATER BOTTLES
  {
    id: 'bottle-milton-thermo',
    name: 'Milton Thermosteel Vacuum Student Flask',
    description: 'A food-grade 18/8 stainless steel double-walled vacuum flask that keeps pure drinking water crisp, ice-cold, or warm for a full 24 hours of school schedule.',
    category: 'water_bottles',
    brand: 'Milton',
    price: 720,
    rating: 4.9,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600',
    features: ['100% Rust-proof 18/8 culinary-grade stainless steel', 'Condensation-free powder coated sweatproof hand grip', 'Leak-proof screw dome lid with safety lock strap', 'Wide mouth allows easy ice cubes insertion'],
    inStock: true
  },
  {
    id: 'bottle-cello-h2o',
    name: 'Cello H2O Food-Grade Water Bottle (Set of 2)',
    description: 'Vibrant, translucent, BPA-free premium grade bottles. Fits snugly inside backpack side sleeves, perfect for younger student lockers.',
    category: 'water_bottles',
    brand: 'Cello',
    price: 220,
    originalPrice: 280,
    rating: 4.6,
    reviewsCount: 155,
    image: 'https://images.unsplash.com/photo-1523362140464-7ab7a0f7af9d?auto=format&fit=crop&q=80&w=600',
    features: ['FDA Approved non-toxic PET materials', 'Ergonomic easy-grip shape', 'Flip-top wide-sip dust-proof lid'],
    inStock: true
  },

  // LUNCH BOXES
  {
    id: 'lunch-milton-steel',
    name: 'Milton Insulated Deluxe Lunch Box Set',
    description: 'Keeps student meals fresh and piping hot until lunch break. Double-wall insulated cover with food-safe interior steel tins and an insulated carrying handbag.',
    category: 'lunch_boxes',
    brand: 'Milton',
    price: 580,
    rating: 4.8,
    reviewsCount: 290,
    image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&q=80&w=600',
    features: ['3 air-tight leak-proof stainless steel bowls', 'Highly insulated canvas pouch with robust zippers', 'Food-contact safe materials that preserve nutrient values'],
    inStock: true
  },
  {
    id: 'lunch-signoraware-bento',
    name: 'Signoraware Slim Bento Box with Cutlery',
    description: 'Slim, leak-proof bento compartment box that slips flat in school bags. Keep snacks, salad, and main course separated and perfectly fresh.',
    category: 'lunch_boxes',
    brand: 'Signoraware',
    price: 290,
    originalPrice: 350,
    rating: 4.5,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=600',
    features: ['Compact flat profile layout', 'Microwave safe and dishwasher safe construction', 'Comes with clip-in fork and spoon set'],
    inStock: true
  }
];

export const coupons: Coupon[] = [
  { code: 'STUDENT10', discountPercentage: 10, description: 'Get 10% off on all back-to-school items!' },
  { code: 'VIZAGSCHOLAR', discountPercentage: 18, description: 'Special 18% off celebrating our flagship store in Vizag!' },
  { code: 'BULKPEN', discountPercentage: 15, description: '15% discount for ultimate stationery stacks (Orders above ₹500)' }
];

export const STORE_INFO = {
  name: 'Vidhya Student hub',
  tagline: 'Your premium school companion & stationary treasure.',
  founded: '2020',
  flagshipStoreAddress: 'Vidhya Student Hub, 45-2-12 Dwaraka Nagar, Vizag, Andhra Pradesh, 530016, India',
  city: 'Vizag (Visakhapatnam)',
  phone: '+91 891 2456781',
  email: 'hello@vidhyastudenthub.com',
  workingHours: 'Monday - Saturday: 9:00 AM to 9:00 PM | Sunday: 10:00 AM to 6:00 PM',
  aboutBrief: 'Founded in the heart of Vizag, Vidhya is dedicated to premiumizing standard student accessories. We believe that top-quality pens, ergonomic bags, comfortable uniform shoes, and pure water flasks inspire a sense of joy and dedication in students. We source the best brands such as Doms, Speed Radium, Elite, Apsara, Nataraj, Bata, and Milton to deliver excellent tools to school and college scholars alike.'
};
