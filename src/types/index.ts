export type DeityType =
  | 'murugan'
  | 'vinayagar'
  | 'amman'
  | 'shiva'
  | 'perumal'
  | 'krishna'
  | 'ayyappan'
  | 'anjaneyar'
  | 'lakshmi'
  | 'other';

export type MaterialType =
  | 'Panchaloha (5-Metal Sacred Alloy)'
  | 'Chola Lost-Wax Cast Bronze'
  | 'Traditional Solid Bronze'
  | 'Solid Pure Brass'
  | 'Heavy Pure Brass'
  | 'Monolithic Black Granite Stone'
  | 'Hand-Carved Teak Wood'
  | 'Country Teak & Rosewood'
  | 'Other';

export type ProductViewType = 'front' | 'left' | 'right' | 'back' | 'detail' | 'lifestyle';

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  storage_path?: string;
  caption?: string;
  view_type: ProductViewType;
  sort_order: number;
  is_primary: boolean;
  created_at?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image_url?: string;
  sort_order: number;
  created_at?: string;
}

export interface Product {
  id: string;
  slug: string;
  product_code: string;
  name: string;
  deity: DeityType;
  category_id?: string;
  category_name?: string;
  description: string;
  material: string;
  height: number; // inches
  width?: number; // inches
  depth?: number; // inches
  weight?: number; // kg
  finish: string;
  price: number;
  price_on_request: boolean;
  availability: 'in_stock' | 'made_to_order' | 'out_of_stock';
  made_to_order: boolean;
  customizable: boolean;
  featured: boolean;
  sort_order: number;
  images?: ProductImage[];
  primary_image?: string;
  created_at?: string;
  updated_at?: string;
}

export type OrderStatus =
  | 'Received'
  | 'Contacted'
  | 'Quote Sent'
  | 'Confirmed'
  | 'In Crafting'
  | 'Quality Check'
  | 'Ready'
  | 'Dispatched'
  | 'Delivered'
  | 'Completed'
  | 'Cancelled';

export type EnquiryStatus =
  | 'New'
  | 'Contacted'
  | 'Quote Sent'
  | 'Confirmed'
  | 'In Crafting'
  | 'Ready'
  | 'Dispatched'
  | 'Completed'
  | 'Cancelled';

export interface Enquiry {
  id: string;
  request_id: string;
  product_id?: string;
  product_name?: string;
  customer_name: string;
  customer_phone: string;
  customer_whatsapp?: string;
  customer_email?: string;
  message: string;
  status: EnquiryStatus;
  email_notified: boolean;
  whatsapp_notified: boolean;
  email_error?: string;
  whatsapp_error?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Order {
  id: string;
  request_id: string;
  product_id?: string;
  product_name: string;
  quantity: number;
  customer_name: string;
  customer_phone: string;
  customer_whatsapp?: string;
  customer_email?: string;
  delivery_location: string;
  preferred_size?: string;
  preferred_material?: string;
  preferred_finish?: string;
  special_requirements?: string;
  reference_image_url?: string;
  estimated_total?: number;
  price_on_request: boolean;
  status: OrderStatus;
  email_notified: boolean;
  whatsapp_notified: boolean;
  email_error?: string;
  whatsapp_error?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CustomOrder {
  id: string;
  request_id: string;
  deity: DeityType;
  material: string;
  height?: string;
  width?: string;
  depth?: string;
  pose?: string;
  reference_images?: string[];
  requirements?: string;
  customer_name: string;
  customer_phone: string;
  customer_whatsapp?: string;
  customer_email?: string;
  delivery_location?: string;
  status: OrderStatus;
  email_notified: boolean;
  whatsapp_notified: boolean;
  email_error?: string;
  whatsapp_error?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TempleOrder {
  id: string;
  request_id: string;
  organization_name: string;
  location: string;
  deity: string;
  project_type:
    | 'temple_idols'
    | 'large_sculptures'
    | 'temple_pillars'
    | 'temple_doors'
    | 'vimana_sculptures'
    | 'restoration'
    | 'bulk_orders';
  required_height?: string;
  material?: string;
  quantity?: string;
  reference_images?: string[];
  expected_timeline?: string;
  contact_person: string;
  phone: string;
  email?: string;
  requirements?: string;
  status: OrderStatus;
  email_notified: boolean;
  whatsapp_notified: boolean;
  email_error?: string;
  whatsapp_error?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OrderStatusHistory {
  id: string;
  order_id: string;
  order_type: 'enquiry' | 'order' | 'custom' | 'temple';
  previous_status?: string;
  new_status: string;
  changed_by?: string;
  notes?: string;
  created_at?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category: string;
  deity?: string;
  material?: string;
  product_id?: string;
  is_featured: boolean;
  sort_order: number;
  created_at?: string;
}

export interface HomepageContent {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image_url?: string;
  hero_badge: string;
  cta_banner_title: string;
  cta_banner_subtitle: string;
  updated_at?: string;
}

export interface AdminSettings {
  id: string;
  business_name: string;
  admin_email: string;
  admin_whatsapp: string;
  business_phone: string;
  instagram_url: string;
  whatsapp_url: string;
  address: string;
  email_notifications_enabled: boolean;
  whatsapp_notifications_enabled: boolean;
  updated_at?: string;
}

export interface FilterState {
  deity: string;
  material: string;
  category: string;
  minPrice?: number;
  maxPrice?: number;
  minHeight?: number;
  maxHeight?: number;
  madeToOrder?: boolean;
  customizable?: boolean;
  searchQuery: string;
  sortBy: 'featured' | 'price_asc' | 'price_desc' | 'height_asc' | 'height_desc' | 'newest';
}
