export type DeityType =
  | 'murugan'
  | 'vinayagar'
  | 'amman'
  | 'shiva'
  | 'perumal'
  | 'krishna'
  | 'ayyappan'
  | 'anjaneyar'
  | 'other';

export type MaterialType =
  | 'Lost-Wax Bronze'
  | 'Panchaloha (5-Metal Alloy)'
  | 'Brass'
  | 'Monolithic Granite Stone'
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
  request_id?: string;
  product_id?: string;
  product_name?: string;
  product_code?: string;
  customer_name: string;
  customer_phone: string;
  customer_whatsapp?: string;
  customer_email?: string;
  message: string;
  status: EnquiryStatus;
  notes?: string;
  admin_notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Order {
  id: string;
  request_id: string;
  order_number?: string;
  product_id?: string;
  product_name: string;
  product_code?: string;
  customer_name: string;
  customer_phone: string;
  customer_whatsapp?: string;
  customer_email?: string;
  delivery_address?: string;
  delivery_location: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  quantity?: number | string;
  preferred_size?: string;
  preferred_material?: string;
  preferred_finish?: string;
  special_requirements?: string;
  reference_image_url?: string;
  estimated_total?: number;
  price_on_request?: boolean;
  notes?: string;
  status: OrderStatus;
  status_notes?: string;
  total_amount?: number;
  estimated_delivery?: string;
  tracking_number?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CustomOrder {
  id: string;
  request_id: string;
  deity: DeityType | string;
  preferred_height?: number | string;
  height?: number | string;
  preferred_material?: string;
  material?: string;
  finish_preference?: string;
  sanctum_type?: string;
  delivery_location?: string;
  width?: number | string;
  depth?: number | string;
  pose?: string;
  requirements?: string;
  customer_name: string;
  customer_phone: string;
  customer_whatsapp?: string;
  customer_email?: string;
  reference_images?: string[];
  notes?: string;
  budget_range?: string;
  status: OrderStatus | string;
  admin_notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TempleOrderItem {
  deity: string;
  height: string;
  material: string;
  count: number;
  notes?: string;
}

export interface TempleOrder {
  id: string;
  request_id: string;
  organization_name: string;
  contact_person: string;
  phone: string;
  email?: string;
  location: string;
  project_type?: string;
  deity: string;
  required_height?: string;
  material?: string;
  quantity?: number | string;
  expected_timeline?: string;
  requirements?: string;
  consecration_date?: string;
  scope_summary?: string;
  items?: TempleOrderItem[];
  notes?: string;
  status: OrderStatus | string;
  admin_notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OrderStatusHistory {
  id: string;
  order_id: string;
  order_type: 'regular' | 'custom' | 'temple';
  status: string;
  previous_status?: string;
  new_status?: string;
  notes?: string;
  changed_by?: string;
  created_at?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category: string;
  deity?: DeityType | string;
  material?: string;
  featured: boolean;
  is_featured?: boolean;
  sort_order?: number;
  created_at?: string;
}

export interface HomepageContent {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  hero_badge: string;
  announcement_banner?: string;
  cta_banner_title?: string;
  cta_banner_subtitle?: string;
  created_at?: string;
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
  email_notifications_enabled?: boolean;
  whatsapp_notifications_enabled?: boolean;
  updated_at?: string;
}

export interface FilterState {
  deity: string;
  material: string;
  category?: string;
  searchQuery?: string;
  search?: string;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'height-asc' | 'height-desc' | string;
  availability?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}
