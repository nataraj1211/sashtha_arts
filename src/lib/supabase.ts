import { createClient } from '@supabase/supabase-js';
import type {
  Product,
  Category,
  Enquiry,
  Order,
  CustomOrder,
  TempleOrder,
  GalleryItem,
  HomepageContent,
  AdminSettings,
  OrderStatusHistory,
  EnquiryStatus,
  OrderStatus,
} from '@/types';
import { generateFourSideImages } from '@/lib/statueAssets';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('your-project') &&
    !supabaseAnonKey.includes('your-anon-key')
);

export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'placeholder-anon-key'
);

export const INITIAL_SETTINGS: AdminSettings = {
  id: 's-1',
  business_name: 'Sashtha Arts & Crafts',
  admin_email: import.meta.env.VITE_ADMIN_EMAIL || 'contact@sashthaarts.com',
  admin_whatsapp: import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || '+919342839218',
  business_phone: '+919342839218',
  instagram_url: 'https://instagram.com/sashthaartsncrafts',
  whatsapp_url: 'https://wa.me/919342839218',
  address: 'Sashtha Arts & Crafts / Dindigul - 624005, Tamil Nadu, India',
  email_notifications_enabled: true,
  whatsapp_notifications_enabled: true,
};

export const INITIAL_HOMEPAGE: HomepageContent = {
  id: 'h-1',
  hero_title: 'Sacred Art, Crafted by Hand.',
  hero_subtitle:
    'Discover beautifully handcrafted South Indian God statues made with traditional artistry and timeless craftsmanship.',
  hero_badge: 'Traditional Shilpa Shastra Excellence',
  announcement_banner:
    '✦ Auspicious Panguni Uthiram Special Murugan & Nataraja Sanctum Castings Now Available ✦',
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p-murugan-swaminatha',
    slug: 'traditional-lord-murugan-swaminatha-statue',
    product_code: 'MUR-SW-24',
    name: 'Lord Swaminatha Murugan Panchaloha Statue',
    deity: 'murugan',
    category_id: 'cat-bronze',
    category_name: 'Panchaloha Statues',
    description:
      'Handcrafted using the ancient lost-wax casting technique conforming to authentic Shilpa Shastra proportions. Features the sacred Vel, lotus pedestal (Padma Peedam), and intricate divine ornaments.',
    material: 'Panchaloha (5-Metal Alloy)',
    height: 24,
    width: 12,
    depth: 9,
    weight: 18.5,
    finish: 'Antique Temple Patina',
    price: 68500,
    price_on_request: false,
    availability: 'in_stock',
    made_to_order: false,
    customizable: true,
    featured: true,
    sort_order: 1,
    primary_image: '/images/statues/murugan.jpg',
    images: generateFourSideImages('p-murugan-swaminatha', 'murugan', 'Lord Swaminatha Murugan'),
  },
  {
    id: 'p-nataraja-tandava',
    slug: 'divine-ananda-tandava-nataraja-bronze-sculpture',
    product_code: 'SHV-NAT-36',
    name: 'Cosmic Ananda Tandava Nataraja Bronze Idol',
    deity: 'shiva',
    category_id: 'cat-bronze',
    category_name: 'Lost-Wax Bronze Sculptures',
    description:
      'The supreme icon of Chola artistic mastery. Shiva dancing within the flaming Prabhamandala, subduing Muyalaka (ignorance) with divine flow, Damaru in hand and Agni flame in palm.',
    material: 'Lost-Wax Bronze',
    height: 36,
    width: 28,
    depth: 14,
    weight: 34.0,
    finish: 'Chola Heritage Brown Patina',
    price: 145000,
    price_on_request: false,
    availability: 'made_to_order',
    made_to_order: true,
    customizable: true,
    featured: true,
    sort_order: 2,
    primary_image: '/images/statues/nataraja.jpg',
    images: generateFourSideImages('p-nataraja-tandava', 'shiva', 'Ananda Tandava Nataraja'),
  },
  {
    id: 'p-vinayagar-siddhi',
    slug: 'maha-siddhi-ganapathi-brass-idol',
    product_code: 'VIN-SID-18',
    name: 'Maha Siddhi Vinayagar Heavy Brass Idol',
    deity: 'vinayagar',
    category_id: 'cat-brass',
    category_name: 'Heavy Brass Murtis',
    description:
      'Solid heavyweight casting of Lord Ganesha seated upon a double lotus throne holding Modaka, Pasha, and Ankusha. Perfect for sanctums, pooja rooms, and temple entryways.',
    material: 'Brass',
    height: 18,
    width: 11,
    depth: 9,
    weight: 12.8,
    finish: 'Polished Brass & Lacquer',
    price: 34000,
    price_on_request: false,
    availability: 'in_stock',
    made_to_order: false,
    customizable: true,
    featured: true,
    sort_order: 3,
    primary_image: '/images/statues/vinayagar.jpg',
    images: generateFourSideImages('p-vinayagar-siddhi', 'vinayagar', 'Maha Siddhi Vinayagar'),
  },
  {
    id: 'p-perumal-balaji',
    slug: 'sri-venkateswara-perumal-panchaloha-murti',
    product_code: 'PRM-BAL-30',
    name: 'Lord Venkateswara Balaji Panchaloha Murti',
    deity: 'perumal',
    category_id: 'cat-bronze',
    category_name: 'Panchaloha Statues',
    description:
      'Magnificent Tirupati Balaji Murti with finely etched Shankha, Chakra, Varada Hasta, and richly detailed Makara Toranam backdrop.',
    material: 'Panchaloha (5-Metal Alloy)',
    height: 30,
    width: 16,
    depth: 10,
    weight: 29.5,
    finish: 'Temple Black & Antique Gold',
    price: 112000,
    price_on_request: false,
    availability: 'made_to_order',
    made_to_order: true,
    customizable: true,
    featured: true,
    sort_order: 4,
    primary_image: '/images/statues/perumal.jpg',
    images: generateFourSideImages('p-perumal-balaji', 'perumal', 'Lord Venkateswara Balaji'),
  },
  {
    id: 'p-mariamman-devi',
    slug: 'sri-maha-mariamman-bronze-vigraham',
    product_code: 'AMM-MAR-21',
    name: 'Sri Maha Mariamman Bronze Vigraham',
    deity: 'amman',
    category_id: 'cat-bronze',
    category_name: 'Lost-Wax Bronze Sculptures',
    description:
      'Goddess Mariamman in fierce yet compassionate pose with sacred Trishul, Kapala, and flame crown. Sculpted following Agama guidelines for temple consecration.',
    material: 'Lost-Wax Bronze',
    height: 21,
    width: 13,
    depth: 8,
    weight: 15.0,
    finish: 'Antique Patina',
    price: 54000,
    price_on_request: false,
    availability: 'in_stock',
    made_to_order: false,
    customizable: true,
    featured: false,
    sort_order: 5,
    primary_image: '/images/statues/amman.jpg',
    images: generateFourSideImages('p-mariamman-devi', 'amman', 'Sri Maha Mariamman'),
  },
  {
    id: 'p-krishna-venugopala',
    slug: 'sri-venugopala-krishna-bronze-statue',
    product_code: 'KRS-VNU-24',
    name: 'Sri Venugopala Krishna with Sacred Cow',
    deity: 'krishna',
    category_id: 'cat-bronze',
    category_name: 'Lost-Wax Bronze Sculptures',
    description:
      'Lord Krishna playing the enchanting flute with cross-legged Tribhanga posture, accompanied by the calf Kamadhenu.',
    material: 'Lost-Wax Bronze',
    height: 24,
    width: 14,
    depth: 10,
    weight: 19.2,
    finish: 'Natural Matte Bronze',
    price: 62000,
    price_on_request: false,
    availability: 'in_stock',
    made_to_order: false,
    customizable: true,
    featured: false,
    sort_order: 6,
    primary_image: '/images/statues/krishna.jpg',
    images: generateFourSideImages('p-krishna-venugopala', 'krishna', 'Sri Venugopala Krishna'),
  },
  {
    id: 'p-ayyappan-panchaloha',
    slug: 'swami-ayyappan-panchaloha-vigraham',
    product_code: 'AYY-SW-18',
    name: 'Swami Ayyappan Panchaloha Vigraham',
    deity: 'ayyappan',
    category_id: 'cat-bronze',
    category_name: 'Panchaloha Statues',
    description:
      'Sacred Manikandan seated in Yogapatta posture on Peedam with Chin Mudra and serene face. Highly revered for Sabarimala devotion.',
    material: 'Panchaloha (5-Metal Alloy)',
    height: 18,
    width: 11,
    depth: 9,
    weight: 14.5,
    finish: 'Polished Gold Patina',
    price: 49000,
    price_on_request: false,
    availability: 'in_stock',
    made_to_order: false,
    customizable: true,
    featured: false,
    sort_order: 7,
    primary_image: '/images/statues/ayyappan.jpg',
    images: generateFourSideImages('p-ayyappan-panchaloha', 'ayyappan', 'Swami Ayyappan'),
  },
  {
    id: 'p-anjaneyar-veera',
    slug: 'veera-anjaneyar-hanuman-statue',
    product_code: 'ANJ-VR-24',
    name: 'Sri Veera Anjaneyar Hanuman Murti',
    deity: 'anjaneyar',
    category_id: 'cat-brass',
    category_name: 'Heavy Brass Murtis',
    description:
      'Valorous Lord Hanuman with hands joined in humble Anjali Mudra, auspicious bell attached to the tail curving over crown.',
    material: 'Brass',
    height: 24,
    width: 12,
    depth: 8,
    weight: 16.0,
    finish: 'Antique Brass Patina',
    price: 42000,
    price_on_request: false,
    availability: 'in_stock',
    made_to_order: false,
    customizable: true,
    featured: false,
    sort_order: 8,
    primary_image: '/images/statues/anjaneyar.jpg',
    images: generateFourSideImages('p-anjaneyar-veera', 'anjaneyar', 'Sri Veera Anjaneyar'),
  },
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Panchaloha Lord Murugan Consecration',
    description: '4-foot lost wax casting consecrated for a temple sanctum in Tamil Nadu.',
    image_url: '/images/statues/murugan.jpg',
    category: 'Consecrations',
    deity: 'murugan',
    material: 'Panchaloha',
    featured: true,
    sort_order: 1,
  },
  {
    id: 'g-2',
    title: 'Chola Style Ananda Tandava Nataraja',
    description: 'Masterwork bronze featuring 32 flaming tongues in the sacred Prabhavali.',
    image_url: '/images/statues/nataraja.jpg',
    category: 'Museum Quality',
    deity: 'shiva',
    material: 'Lost-Wax Bronze',
    featured: true,
    sort_order: 2,
  },
  {
    id: 'g-3',
    title: 'Sri Venkateswara Perumal Sanctum Murti',
    description: 'Intricate kiritam and abhaya hasta detail cast for private sanctum.',
    image_url: '/images/statues/perumal.jpg',
    category: 'Custom Sanctums',
    deity: 'perumal',
    material: 'Panchaloha',
    featured: true,
    sort_order: 3,
  },
  {
    id: 'g-4',
    title: 'Traditional Swamimalai Workshop',
    description: 'Master sthapatis performing crucible metal pouring at 1200°C.',
    image_url: '/images/statues/workshop.jpg',
    category: 'Workshop & Craft',
    material: 'Bronze',
    featured: true,
    sort_order: 4,
  },
  {
    id: 'g-5',
    title: 'Granite Temple Sanctum Work',
    description: 'Hand-chiseled monolithic Krishna Shila granite stone temple pillars.',
    image_url: '/images/statues/temple.jpg',
    category: 'Temple Architecture',
    material: 'Monolithic Granite Stone',
    featured: true,
    sort_order: 5,
  },
  {
    id: 'g-6',
    title: 'Maha Siddhi Vinayagar in Heavy Brass',
    description: 'Detailed prabhavali engraving on 2-foot seated Ganesha.',
    image_url: '/images/statues/vinayagar.jpg',
    category: 'Brass Castings',
    deity: 'vinayagar',
    material: 'Brass',
    featured: true,
    sort_order: 6,
  },
];

// In-Memory fallback store
class DataStore {
  private products: Product[] = [...INITIAL_PRODUCTS];
  private enquiries: Enquiry[] = [];
  private orders: Order[] = [];
  private customOrders: CustomOrder[] = [];
  private templeOrders: TempleOrder[] = [];
  private gallery: GalleryItem[] = [...INITIAL_GALLERY];
  private homepage: HomepageContent = { ...INITIAL_HOMEPAGE };
  private settings: AdminSettings = { ...INITIAL_SETTINGS };
  private statusHistory: OrderStatusHistory[] = [];

  constructor() {
    this.loadLocal();
  }

  private loadLocal() {
    if (typeof window === 'undefined') return;
    try {
      const p = localStorage.getItem('sashtha_products') || localStorage.getItem('vetri_products');
      if (p) this.products = JSON.parse(p);

      const e = localStorage.getItem('sashtha_enquiries') || localStorage.getItem('vetri_enquiries');
      if (e) this.enquiries = JSON.parse(e);

      const o = localStorage.getItem('sashtha_orders') || localStorage.getItem('vetri_orders');
      if (o) this.orders = JSON.parse(o);

      const c = localStorage.getItem('sashtha_custom_orders') || localStorage.getItem('vetri_custom_orders');
      if (c) this.customOrders = JSON.parse(c);

      const t = localStorage.getItem('sashtha_temple_orders') || localStorage.getItem('vetri_temple_orders');
      if (t) this.templeOrders = JSON.parse(t);

      const g = localStorage.getItem('sashtha_gallery') || localStorage.getItem('vetri_gallery');
      if (g) this.gallery = JSON.parse(g);

      const h = localStorage.getItem('sashtha_homepage') || localStorage.getItem('vetri_homepage');
      if (h) this.homepage = JSON.parse(h);

      const s = localStorage.getItem('sashtha_settings') || localStorage.getItem('vetri_settings');
      if (s) {
        const parsed = JSON.parse(s);
        if (parsed.address === 'Swamimalai / Mahabalipuram Heritage Workshop, Tamil Nadu, India') {
          parsed.address = 'Sashtha Arts & Crafts / Dindigul - 624005, Tamil Nadu, India';
          this.save('sashtha_settings', parsed);
        }
        this.settings = parsed;
      }

      const hist = localStorage.getItem('sashtha_status_history') || localStorage.getItem('vetri_status_history');
      if (hist) this.statusHistory = JSON.parse(hist);
    } catch {}
  }

  private save(key: string, data: any) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {}
  }

  async getProducts(): Promise<Product[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, product_images(*)')
          .order('sort_order', { ascending: true });
        if (!error && data && data.length > 0) {
          return data.map((p) => ({
            ...p,
            images: p.product_images || generateFourSideImages(p.id, p.deity, p.name),
          }));
        }
      } catch {}
    }
    return this.products;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const products = await this.getProducts();
    return products.find((p) => p.slug === slug || p.id === slug) || null;
  }

  async saveProduct(payload: Partial<Product>): Promise<Product> {
    const id = payload.id || `prod-${Date.now()}`;
    const deity = payload.deity || 'murugan';
    const name = payload.name || 'Statue';
    const images = payload.images || generateFourSideImages(id, deity, name);
    const item: Product = {
      id,
      slug: payload.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      product_code: payload.product_code || `VA-${id.slice(-4).toUpperCase()}`,
      name,
      deity,
      description: payload.description || '',
      material: payload.material || 'Lost-Wax Bronze',
      height: Number(payload.height) || 12,
      finish: payload.finish || 'Antique Bronze Finish',
      price: Number(payload.price) || 0,
      price_on_request: Boolean(payload.price_on_request),
      availability: payload.availability || 'made_to_order',
      made_to_order: payload.made_to_order ?? true,
      customizable: payload.customizable ?? true,
      featured: Boolean(payload.featured),
      sort_order: payload.sort_order || 99,
      images,
      primary_image: payload.primary_image || images[0]?.image_url || '',
      created_at: payload.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...payload,
    };

    const idx = this.products.findIndex((p) => p.id === item.id);
    if (idx >= 0) {
      this.products[idx] = item;
    } else {
      this.products.unshift(item);
    }
    this.save('sashtha_products', this.products);
    return item;
  }

  async deleteProduct(id: string): Promise<void> {
    this.products = this.products.filter((p) => p.id !== id);
    this.save('sashtha_products', this.products);
  }

  async getEnquiries(): Promise<Enquiry[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('enquiries')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) return data;
      } catch {}
    }
    return this.enquiries;
  }

  async createEnquiry(payload: Partial<Enquiry>): Promise<Enquiry> {
    const reqId = payload.request_id || `ENQ-${Date.now().toString(36).toUpperCase()}`;
    const item: Enquiry = {
      id: payload.id || reqId,
      request_id: reqId,
      customer_name: payload.customer_name || 'Anonymous',
      customer_phone: payload.customer_phone || '',
      customer_email: payload.customer_email,
      message: payload.message || '',
      product_id: payload.product_id,
      product_name: payload.product_name,
      product_code: payload.product_code,
      status: 'New',
      created_at: new Date().toISOString(),
      ...payload,
    } as Enquiry;

    if (isSupabaseConfigured) {
      try {
        await supabase.from('enquiries').insert([item]);
      } catch {}
    }

    this.enquiries.unshift(item);
    this.save('sashtha_enquiries', this.enquiries);
    return item;
  }

  async updateEnquiryStatus(id: string, status: EnquiryStatus, notes?: string): Promise<void> {
    const item = this.enquiries.find((e) => e.id === id);
    if (item) {
      const prevStatus = item.status;
      item.status = status;
      if (notes) {
        item.admin_notes = notes;
        item.notes = notes;
      }
      item.updated_at = new Date().toISOString();
      this.save('sashtha_enquiries', this.enquiries);

      const hist: OrderStatusHistory = {
        id: `HIST-${Date.now()}`,
        order_id: id,
        order_type: 'regular',
        status,
        previous_status: prevStatus,
        new_status: status,
        notes,
        created_at: new Date().toISOString(),
      };
      this.statusHistory.unshift(hist);
      this.save('sashtha_status_history', this.statusHistory);
    }
  }

  async getOrders(): Promise<Order[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) return data;
      } catch {}
    }
    return this.orders;
  }

  async createOrder(payload: Partial<Order>): Promise<Order> {
    const item: Order = {
      id: `ord-${Date.now()}`,
      order_number: `ORD-${Date.now().toString(36).toUpperCase()}`,
      product_name: payload.product_name || 'Statue',
      customer_name: payload.customer_name || 'Customer',
      customer_phone: payload.customer_phone || '',
      customer_email: payload.customer_email,
      delivery_address: payload.delivery_address || '',
      city: payload.city || '',
      state: payload.state || '',
      country: payload.country || 'India',
      postal_code: payload.postal_code || '',
      notes: payload.notes,
      status: 'Received',
      created_at: new Date().toISOString(),
      ...payload,
    } as Order;

    this.orders.unshift(item);
    this.save('sashtha_orders', this.orders);
    return item;
  }

  async updateOrderStatus(id: string, status: OrderStatus, notes?: string): Promise<void> {
    const item = this.orders.find((o) => o.id === id);
    if (item) {
      item.status = status;
      if (notes) item.status_notes = notes;
      item.updated_at = new Date().toISOString();
      this.save('sashtha_orders', this.orders);
    }
  }

  async getCustomOrders(): Promise<CustomOrder[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('custom_orders')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) return data;
      } catch {}
    }
    return this.customOrders;
  }

  async createCustomOrder(payload: Partial<CustomOrder>): Promise<CustomOrder> {
    const item: CustomOrder = {
      id: `cust-${Date.now()}`,
      request_id: `CUST-${Date.now().toString(36).toUpperCase()}`,
      deity: payload.deity || 'murugan',
      preferred_height: payload.preferred_height || 24,
      preferred_material: payload.preferred_material || 'Lost-Wax Bronze',
      customer_name: payload.customer_name || 'Customer',
      customer_phone: payload.customer_phone || '',
      customer_email: payload.customer_email,
      status: 'Received',
      created_at: new Date().toISOString(),
      ...payload,
    } as CustomOrder;

    this.customOrders.unshift(item);
    this.save('sashtha_custom_orders', this.customOrders);
    return item;
  }

  async updateCustomOrderStatus(
    id: string,
    status: OrderStatus | string,
    notes?: string
  ): Promise<void> {
    const item = this.customOrders.find((c) => c.id === id);
    if (item) {
      item.status = status;
      if (notes) item.admin_notes = notes;
      item.updated_at = new Date().toISOString();
      this.save('sashtha_custom_orders', this.customOrders);
    }
  }

  async getTempleOrders(): Promise<TempleOrder[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('temple_orders')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) return data;
      } catch {}
    }
    return this.templeOrders;
  }

  async createTempleOrder(payload: Partial<TempleOrder>): Promise<TempleOrder> {
    const item: TempleOrder = {
      id: `tmpl-${Date.now()}`,
      request_id: `TMPL-${Date.now().toString(36).toUpperCase()}`,
      organization_name: payload.organization_name || 'Temple Trust',
      contact_person: payload.contact_person || 'Trustee',
      phone: payload.phone || '',
      email: payload.email,
      location: payload.location || 'India',
      status: 'Received',
      created_at: new Date().toISOString(),
      ...payload,
    } as TempleOrder;

    this.templeOrders.unshift(item);
    this.save('sashtha_temple_orders', this.templeOrders);
    return item;
  }

  async updateTempleOrderStatus(
    id: string,
    status: OrderStatus | string,
    notes?: string
  ): Promise<void> {
    const item = this.templeOrders.find((t) => t.id === id);
    if (item) {
      item.status = status;
      if (notes) item.admin_notes = notes;
      item.updated_at = new Date().toISOString();
      this.save('sashtha_temple_orders', this.templeOrders);
    }
  }

  async getGallery(): Promise<GalleryItem[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .order('sort_order', { ascending: true });
        if (!error && data && data.length > 0) return data;
      } catch {}
    }
    return this.gallery;
  }

  async saveGalleryItem(payload: Partial<GalleryItem>): Promise<GalleryItem> {
    const id = payload.id || `gal-${Date.now()}`;
    const item: GalleryItem = {
      id,
      title: payload.title || 'Artwork',
      description: payload.description || '',
      image_url: payload.image_url || '',
      category: payload.category || 'workshop',
      deity: payload.deity,
      material: payload.material,
      featured: Boolean(payload.featured ?? payload.is_featured),
      is_featured: Boolean(payload.is_featured ?? payload.featured),
      sort_order: payload.sort_order || 99,
      created_at: payload.created_at || new Date().toISOString(),
      ...payload,
    };
    const idx = this.gallery.findIndex((g) => g.id === item.id);
    if (idx >= 0) {
      this.gallery[idx] = item;
    } else {
      this.gallery.unshift(item);
    }
    this.save('sashtha_gallery', this.gallery);
    return item;
  }

  async deleteGalleryItem(id: string): Promise<void> {
    this.gallery = this.gallery.filter((g) => g.id !== id);
    this.save('sashtha_gallery', this.gallery);
  }

  async getHomepage(): Promise<HomepageContent> {
    return this.homepage;
  }

  async saveHomepage(payload: HomepageContent): Promise<HomepageContent> {
    this.homepage = { ...payload, updated_at: new Date().toISOString() };
    this.save('sashtha_homepage', this.homepage);
    return this.homepage;
  }

  async getSettings(): Promise<AdminSettings> {
    return this.settings;
  }

  async saveSettings(payload: AdminSettings): Promise<AdminSettings> {
    this.settings = { ...payload, updated_at: new Date().toISOString() };
    this.save('sashtha_settings', this.settings);
    return this.settings;
  }

  async getStatusHistory(orderId: string): Promise<OrderStatusHistory[]> {
    return this.statusHistory.filter((h) => h.order_id === orderId);
  }
}

export const db = new DataStore();
