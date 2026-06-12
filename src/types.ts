/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CategoryType = 
  | 'books'
  | 'stationery'
  | 'bags'
  | 'shoes'
  | 'water_bottles'
  | 'lunch_boxes'
  | 'offers';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: CategoryType;
  subcategory?: string; // e.g. 'Pens', 'Pencils', 'Erasers', 'Notebooks'
  brand: string; // e.g. 'Speed', 'Doms', 'Elite', 'Nataraj', 'Apsara'
  price: number;
  originalPrice?: number; // for offers
  rating: number;
  reviewsCount: number;
  image: string;
  features: string[];
  suggestions?: string[]; // e.g. Types of pens/pencils suggested
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 
  | 'placed'
  | 'packaged' | 'dispatched_from_vizag'
  | 'out_for_delivery'
  | 'delivered';

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: CartItem[];
  totalAmount: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  description: string;
}
