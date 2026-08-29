import { createClient } from '@supabase/supabase-js';
import type {
  Product,
  Category,
  GalleryItem,
  Enquiry,
  Order,
  CustomOrder,
  TempleOrder,
  OrderStatusHistory,
  HomepageContent,
  AdminSettings,
} from '@/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project.supabase.co' &&
  supabaseAnonKey !== 'your-anon-key-here'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ============================================================================
// INITIAL SEED DATA FOR SEAMLESS RUNTIME / LOCAL / PREVIEW EXECUTION
// ============================================================================

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'c1000000-0000-0000-0000-000000000001',
    slug: 'panchaloha-statues',
    name: 'Panchaloha Statues',
    description: 'Sacred five-metal alloy statues cast via ancient lost-wax technique (Madhuchishtavidhana).',
    sort_order: 1,
  },
  {
    id: 'c1000000-0000-0000-0000-000000000002',
    slug: 'bronze-sculptures',
    name: 'Bronze Sculptures',
    description: 'Traditional Chola style lost-wax cast bronze idols for sanctums and temples.',
    sort_order: 2,
  },
  {
    id: 'c1000000-0000-0000-0000-000000000003',
    slug: 'brass-idols',
    name: 'Brass Idols',
    description: 'Finely engraved brass statues with rich antique polish and sacred details.',
    sort_order: 3,
  },
  {
    id: 'c1000000-0000-0000-0000-000000000004',
    slug: 'black-stone-sculptures',
    name: 'Black Granite Stone',
    description: 'Hand-chiselled Krishna Shila and black granite murtis according to Shilpa Shastra.',
    sort_order: 4,
  },
  {
    id: 'c1000000-0000-0000-0000-000000000005',
    slug: 'wood-carvings',
    name: 'Sacred Wood Carvings',
    description: 'Virasana and Ananda Nilayam style idols in solid Country Teak and Rosewood.',
    sort_order: 5,
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1000000-0000-0000-0000-000000000001',
    slug: 'traditional-lord-murugan-swaminatha-statue',
    product_code: 'VAC-MRG-001',
    name: 'Lord Murugan (Swaminatha Swami) Handcrafted Panchaloha Statue',
    deity: 'murugan',
    category_id: 'c1000000-0000-0000-0000-000000000001',
    category_name: 'Panchaloha Statues',
    description: 'A magnificent, divinely energized representation of Lord Murugan (Karthikeya / Subramanya) holding the sacred Vel and displaying Abhaya Mudra. Mastercrafted in traditional Swamimalai Panchaloha (Gold, Silver, Copper, Zinc, Lead alloy) using the ancient Madhuchishtavidhana (lost-wax) casting process strictly conforming to Shilpa Shastra guidelines. Features an intricately sculpted Mayil (Peacock) vahana at the base.',
    material: 'Panchaloha (5-Metal Sacred Alloy)',
    height: 24,
    width: 11,
    depth: 8,
    weight: 14.5,
    finish: 'Traditional Antique Patina & Temple Gold Polish',
    price: 68500,
    price_on_request: false,
    availability: 'in_stock',
    made_to_order: false,
    customizable: true,
    featured: true,
    sort_order: 1,
    primary_image: '/images/statues/murugan.jpg',
    images: [
      {
        id: 'img-1-1',
        product_id: 'p1000000-0000-0000-0000-000000000001',
        image_url: '/images/statues/murugan.jpg',
        view_type: 'front',
        sort_order: 1,
        is_primary: true,
      },
      {
        id: 'img-1-2',
        product_id: 'p1000000-0000-0000-0000-000000000001',
        image_url: '/images/statues/murugan.jpg',
        view_type: 'left',
        sort_order: 2,
        is_primary: false,
      },
      {
        id: 'img-1-3',
        product_id: 'p1000000-0000-0000-0000-000000000001',
        image_url: '/images/statues/murugan.jpg',
        view_type: 'right',
        sort_order: 3,
        is_primary: false,
      },
      {
        id: 'img-1-4',
        product_id: 'p1000000-0000-0000-0000-000000000001',
        image_url: '/images/statues/murugan.jpg',
        view_type: 'back',
        sort_order: 4,
        is_primary: false,
      },
      {
        id: 'img-1-5',
        product_id: 'p1000000-0000-0000-0000-000000000001',
        image_url: '/images/statues/murugan.jpg',
        view_type: 'detail',
        sort_order: 5,
        is_primary: false,
      },
      {
        id: 'img-1-6',
        product_id: 'p1000000-0000-0000-0000-000000000001',
        image_url: '/images/statues/murugan.jpg',
        view_type: 'lifestyle',
        sort_order: 6,
        is_primary: false,
      },
    ],
  },
  {
    id: 'p1000000-0000-0000-0000-000000000002',
    slug: 'divine-ananda-tandava-nataraja-bronze-sculpture',
    product_code: 'VAC-SHV-002',
    name: 'Lord Nataraja (Cosmic Dance) Lost-Wax Chola Bronze',
    deity: 'shiva',
    category_id: 'c1000000-0000-0000-0000-000000000002',
    category_name: 'Bronze Sculptures',
    description: 'Iconic South Indian Chola style Nataraja depicting the cosmic Ananda Tandava within the flaming Prabha-mandala. Lord Shiva balances upon the demon Apasmara, holding the Damaru (creation) and Agni (transformation). Hand-poured lost-wax cast bronze with magnificent facial expression and divine proportions.',
    material: 'Chola Lost-Wax Cast Bronze',
    height: 30,
    width: 24,
    depth: 10,
    weight: 22.0,
    finish: 'Deep Temple Bronze Patina',
    price: 95000,
    price_on_request: false,
    availability: 'in_stock',
    made_to_order: false,
    customizable: true,
    featured: true,
    sort_order: 2,
    primary_image: '/images/statues/nataraja.jpg',
    images: [
      {
        id: 'img-2-1',
        product_id: 'p1000000-0000-0000-0000-000000000002',
        image_url: '/images/statues/nataraja.jpg',
        view_type: 'front',
        sort_order: 1,
        is_primary: true,
      },
      {
        id: 'img-2-2',
        product_id: 'p1000000-0000-0000-0000-000000000002',
        image_url: '/images/statues/nataraja.jpg',
        view_type: 'left',
        sort_order: 2,
        is_primary: false,
      },
      {
        id: 'img-2-3',
        product_id: 'p1000000-0000-0000-0000-000000000002',
        image_url: '/images/statues/nataraja.jpg',
        view_type: 'right',
        sort_order: 3,
        is_primary: false,
      },
      {
        id: 'img-2-4',
        product_id: 'p1000000-0000-0000-0000-000000000002',
        image_url: '/images/statues/nataraja.jpg',
        view_type: 'back',
        sort_order: 4,
        is_primary: false,
      },
    ],
  },
  {
    id: 'p1000000-0000-0000-0000-000000000003',
    slug: 'lord-maha-ganapathi-vinayagar-brass-statue',
    product_code: 'VAC-VNY-003',
    name: 'Maha Ganapathi (Vinayagar) with Prabhavali Handcrafted Brass Idol',
    deity: 'vinayagar',
    category_id: 'c1000000-0000-0000-0000-000000000003',
    category_name: 'Brass Idols',
    description: 'Auspicious seated Maha Ganapathi featuring a regal arch (Prabhavali), holding the sacred Gada, Pasha, Ankusha, and the Modaka in His curved trunk (Valampuri / Idampuri posture). Ideal for home sanctums, temple altars, and auspicious inaugural ceremonies.',
    material: 'Solid Pure Brass',
    height: 18,
    width: 12,
    depth: 9,
    weight: 11.2,
    finish: 'Antique Golden Sandalwood Glow',
    price: 32000,
    price_on_request: false,
    availability: 'in_stock',
    made_to_order: false,
    customizable: true,
    featured: true,
    sort_order: 3,
    primary_image: '/images/statues/vinayagar.jpg',
    images: [
      {
        id: 'img-3-1',
        product_id: 'p1000000-0000-0000-0000-000000000003',
        image_url: '/images/statues/vinayagar.jpg',
        view_type: 'front',
        sort_order: 1,
        is_primary: true,
      },
      {
        id: 'img-3-2',
        product_id: 'p1000000-0000-0000-0000-000000000003',
        image_url: '/images/statues/vinayagar.jpg',
        view_type: 'left',
        sort_order: 2,
        is_primary: false,
      },
      {
        id: 'img-3-3',
        product_id: 'p1000000-0000-0000-0000-000000000003',
        image_url: '/images/statues/vinayagar.jpg',
        view_type: 'right',
        sort_order: 3,
        is_primary: false,
      },
      {
        id: 'img-3-4',
        product_id: 'p1000000-0000-0000-0000-000000000003',
        image_url: '/images/statues/vinayagar.jpg',
        view_type: 'back',
        sort_order: 4,
        is_primary: false,
      },
    ],
  },
  {
    id: 'p1000000-0000-0000-0000-000000000004',
    slug: 'sri-mariamman-devi-panchaloha-idol',
    product_code: 'VAC-AMM-004',
    name: 'Goddess Sri Mariamman Devi Sacred Panchaloha Idol',
    deity: 'amman',
    category_id: 'c1000000-0000-0000-0000-000000000001',
    category_name: 'Panchaloha Statues',
    description: 'Divine Mother Sri Mariamman seated majestically with five-headed serpent canopy (Nagakudai), holding the Trishula, Udukkai, Kapala, and sword. Masterfully detailed ornaments, kiritam, and flowing saree drapery sculpted by hereditary sthapathis.',
    material: 'Panchaloha (5-Metal Sacred Alloy)',
    height: 21,
    width: 12,
    depth: 9,
    weight: 13.0,
    finish: 'Sacred Temple Gold & Red Sindoor Accent',
    price: 59000,
    price_on_request: false,
    availability: 'in_stock',
    made_to_order: false,
    customizable: true,
    featured: true,
    sort_order: 4,
    primary_image: '/images/statues/amman.jpg',
    images: [
      {
        id: 'img-4-1',
        product_id: 'p1000000-0000-0000-0000-000000000004',
        image_url: '/images/statues/amman.jpg',
        view_type: 'front',
        sort_order: 1,
        is_primary: true,
      },
      {
        id: 'img-4-2',
        product_id: 'p1000000-0000-0000-0000-000000000004',
        image_url: '/images/statues/amman.jpg',
        view_type: 'left',
        sort_order: 2,
        is_primary: false,
      },
      {
        id: 'img-4-3',
        product_id: 'p1000000-0000-0000-0000-000000000004',
        image_url: '/images/statues/amman.jpg',
        view_type: 'right',
        sort_order: 3,
        is_primary: false,
      },
      {
        id: 'img-4-4',
        product_id: 'p1000000-0000-0000-0000-000000000004',
        image_url: '/images/statues/amman.jpg',
        view_type: 'back',
        sort_order: 4,
        is_primary: false,
      },
    ],
  },
  {
    id: 'p1000000-0000-0000-0000-000000000005',
    slug: 'lord-venkateswara-perumal-black-granite-sculpture',
    product_code: 'VAC-PRM-005',
    name: 'Lord Venkateswara (Balaji Perumal) Hand-Chiseled Black Granite',
    deity: 'perumal',
    category_id: 'c1000000-0000-0000-0000-000000000004',
    category_name: 'Black Granite Stone',
    description: 'Sublime depiction of Lord Srinivasa (Tirupati Balaji) hand-chiselled from dense, monolithic Krishna Shila black granite stone. Features sacred Shankha, Chakra, and Katyavalambita mudra along with exquisite stone jewellery carving.',
    material: 'Monolithic Black Granite Stone',
    height: 36,
    width: 18,
    depth: 12,
    weight: 65.0,
    finish: 'Natural Temple Oil Treated Black Finish',
    price: 0,
    price_on_request: true,
    availability: 'made_to_order',
    made_to_order: true,
    customizable: true,
    featured: true,
    sort_order: 5,
    primary_image: '/images/statues/perumal.jpg',
    images: [
      {
        id: 'img-5-1',
        product_id: 'p1000000-0000-0000-0000-000000000005',
        image_url: '/images/statues/perumal.jpg',
        view_type: 'front',
        sort_order: 1,
        is_primary: true,
      },
      {
        id: 'img-5-2',
        product_id: 'p1000000-0000-0000-0000-000000000005',
        image_url: '/images/statues/perumal.jpg',
        view_type: 'left',
        sort_order: 2,
        is_primary: false,
      },
      {
        id: 'img-5-3',
        product_id: 'p1000000-0000-0000-0000-000000000005',
        image_url: '/images/statues/perumal.jpg',
        view_type: 'right',
        sort_order: 3,
        is_primary: false,
      },
      {
        id: 'img-5-4',
        product_id: 'p1000000-0000-0000-0000-000000000005',
        image_url: '/images/statues/perumal.jpg',
        view_type: 'back',
        sort_order: 4,
        is_primary: false,
      },
    ],
  },
  {
    id: 'p1000000-0000-0000-0000-000000000006',
    slug: 'venugopala-krishna-with-cow-bronze-idol',
    product_code: 'VAC-KRS-006',
    name: 'Venugopala Krishna with Kamadhenu Cow Handcrafted Bronze',
    deity: 'krishna',
    category_id: 'c1000000-0000-0000-0000-000000000002',
    category_name: 'Bronze Sculptures',
    description: 'Enchanting Lord Krishna in Tribhanga pose playing the divine flute (Venu) alongside a loving calf and cow under the Kadamba tree. Cast using high-purity bronze with soft facial serenity and peacock feather crown (Mayil Peeli).',
    material: 'Traditional Solid Bronze',
    height: 20,
    width: 13,
    depth: 8,
    weight: 9.8,
    finish: 'Warm Honey Bronze & Antique Dark Tone',
    price: 46500,
    price_on_request: false,
    availability: 'in_stock',
    made_to_order: false,
    customizable: true,
    featured: true,
    sort_order: 6,
    primary_image: '/images/statues/krishna.jpg',
    images: [
      {
        id: 'img-6-1',
        product_id: 'p1000000-0000-0000-0000-000000000006',
        image_url: '/images/statues/krishna.jpg',
        view_type: 'front',
        sort_order: 1,
        is_primary: true,
      },
      {
        id: 'img-6-2',
        product_id: 'p1000000-0000-0000-0000-000000000006',
        image_url: '/images/statues/krishna.jpg',
        view_type: 'left',
        sort_order: 2,
        is_primary: false,
      },
      {
        id: 'img-6-3',
        product_id: 'p1000000-0000-0000-0000-000000000006',
        image_url: '/images/statues/krishna.jpg',
        view_type: 'right',
        sort_order: 3,
        is_primary: false,
      },
      {
        id: 'img-6-4',
        product_id: 'p1000000-0000-0000-0000-000000000006',
        image_url: '/images/statues/krishna.jpg',
        view_type: 'back',
        sort_order: 4,
        is_primary: false,
      },
    ],
  },
  {
    id: 'p1000000-0000-0000-0000-000000000007',
    slug: 'swami-ayyappan-panchaloha-sanctum-murti',
    product_code: 'VAC-AYY-007',
    name: 'Swami Ayyappan (Dharma Sastha) Panchaloha Sanctum Murti',
    deity: 'ayyappan',
    category_id: 'c1000000-0000-0000-0000-000000000001',
    category_name: 'Panchaloha Statues',
    description: 'Sacred Lord Ayyappan seated in Yogarudha posture with knee band (Yoga Patta) on a tiered lotus pedestal (Padma Peedam). Imbued with tranquility, spiritual depth, and flawless anatomical precision according to Sabarimala iconometry.',
    material: 'Panchaloha (5-Metal Sacred Alloy)',
    height: 16,
    width: 10,
    depth: 8,
    weight: 7.8,
    finish: 'Sacred Antique Golden Patina',
    price: 42000,
    price_on_request: false,
    availability: 'in_stock',
    made_to_order: false,
    customizable: true,
    featured: true,
    sort_order: 7,
    primary_image: '/images/statues/ayyappan.jpg',
    images: [
      {
        id: 'img-7-1',
        product_id: 'p1000000-0000-0000-0000-000000000007',
        image_url: '/images/statues/ayyappan.jpg',
        view_type: 'front',
        sort_order: 1,
        is_primary: true,
      },
      {
        id: 'img-7-2',
        product_id: 'p1000000-0000-0000-0000-000000000007',
        image_url: '/images/statues/ayyappan.jpg',
        view_type: 'left',
        sort_order: 2,
        is_primary: false,
      },
      {
        id: 'img-7-3',
        product_id: 'p1000000-0000-0000-0000-000000000007',
        image_url: '/images/statues/ayyappan.jpg',
        view_type: 'right',
        sort_order: 3,
        is_primary: false,
      },
      {
        id: 'img-7-4',
        product_id: 'p1000000-0000-0000-0000-000000000007',
        image_url: '/images/statues/ayyappan.jpg',
        view_type: 'back',
        sort_order: 4,
        is_primary: false,
      },
    ],
  },
  {
    id: 'p1000000-0000-0000-0000-000000000008',
    slug: 'veera-anjaneyar-hanuman-brass-statue',
    product_code: 'VAC-HNM-008',
    name: 'Veera Anjaneyar (Lord Hanuman) Hand-Carved Heavy Brass Idol',
    deity: 'anjaneyar',
    category_id: 'c1000000-0000-0000-0000-000000000003',
    category_name: 'Brass Idols',
    description: 'Majestic Lord Hanuman in courageous posture with Sanjeevi mountain in hand and Gada over shoulder, tail coiled with sacred bell at the tip. Represents supreme devotion, strength, and protection for the home or temple.',
    material: 'Heavy Pure Brass',
    height: 22,
    width: 11,
    depth: 9,
    weight: 12.5,
    finish: 'Dual Tone Gold & Antique Dark Brass',
    price: 38000,
    price_on_request: false,
    availability: 'in_stock',
    made_to_order: false,
    customizable: true,
    featured: true,
    sort_order: 8,
    primary_image: '/images/statues/anjaneyar.jpg',
    images: [
      {
        id: 'img-8-1',
        product_id: 'p1000000-0000-0000-0000-000000000008',
        image_url: '/images/statues/anjaneyar.jpg',
        view_type: 'front',
        sort_order: 1,
        is_primary: true,
      },
      {
        id: 'img-8-2',
        product_id: 'p1000000-0000-0000-0000-000000000008',
        image_url: '/images/statues/anjaneyar.jpg',
        view_type: 'left',
        sort_order: 2,
        is_primary: false,
      },
      {
        id: 'img-8-3',
        product_id: 'p1000000-0000-0000-0000-000000000008',
        image_url: '/images/statues/anjaneyar.jpg',
        view_type: 'right',
        sort_order: 3,
        is_primary: false,
      },
      {
        id: 'img-8-4',
        product_id: 'p1000000-0000-0000-0000-000000000008',
        image_url: '/images/statues/anjaneyar.jpg',
        view_type: 'back',
        sort_order: 4,
        is_primary: false,
      },
    ],
  },
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Handcrafted Lord Murugan with Sacred Vel',
    description: 'Mastercrafted Swamimalai Panchaloha Murugan statue with Mayil peacock vahana.',
    image_url: '/images/statues/murugan.jpg',
    category: 'murugan',
    deity: 'murugan',
    material: 'Panchaloha',
    is_featured: true,
    sort_order: 1,
  },
  {
    id: 'g-2',
    title: 'Grand Chola Bronze Nataraja Cosmic Dance',
    description: 'Ananda Tandava Nataraja within the flaming prabhamandala for temple sanctum.',
    image_url: '/images/statues/nataraja.jpg',
    category: 'nataraja',
    deity: 'shiva',
    material: 'Bronze',
    is_featured: true,
    sort_order: 2,
  },
  {
    id: 'g-3',
    title: 'Solid Brass Maha Vinayagar on Lotus Peedam',
    description: 'Auspicious seated Lord Ganesha with modaka and traditional temple arch.',
    image_url: '/images/statues/vinayagar.jpg',
    category: 'vinayagar',
    deity: 'vinayagar',
    material: 'Brass',
    is_featured: true,
    sort_order: 3,
  },
  {
    id: 'g-4',
    title: 'Panchaloha Sri Mariamman Devi Sanctum Murti',
    description: 'Divine Mother Mariamman with sacred trishul, nagakudai, and crown.',
    image_url: '/images/statues/amman.jpg',
    category: 'amman',
    deity: 'amman',
    material: 'Panchaloha',
    is_featured: true,
    sort_order: 4,
  },
  {
    id: 'g-5',
    title: 'Master Sthapathi Lost-Wax Hand Carving',
    description: 'Hereditary sthapathi hand-chiselling bronze statue in our Swamimalai workshop.',
    image_url: '/images/statues/workshop.jpg',
    category: 'workshop',
    deity: 'all',
    material: 'Bronze',
    is_featured: true,
    sort_order: 5,
  },
  {
    id: 'g-6',
    title: 'Lord Venkateswara Balaji Perumal Murti',
    description: 'Divine Perumal with Shankha, Chakra, and traditional temple gold finish.',
    image_url: '/images/statues/perumal.jpg',
    category: 'perumal',
    deity: 'perumal',
    material: 'Bronze',
    is_featured: true,
    sort_order: 6,
  },
  {
    id: 'g-7',
    title: 'Venugopala Krishna Playing Flute',
    description: 'Enchanting bronze Krishna standing gracefully alongside sacred cow.',
    image_url: '/images/statues/krishna.jpg',
    category: 'krishna',
    deity: 'krishna',
    material: 'Bronze',
    is_featured: true,
    sort_order: 7,
  },
  {
    id: 'g-8',
    title: 'Swami Ayyappan Yogapatta Posture',
    description: 'Panchaloha idol of Lord Manikandan seated on tiered lotus peedam.',
    image_url: '/images/statues/ayyappan.jpg',
    category: 'ayyappan',
    deity: 'ayyappan',
    material: 'Panchaloha',
    is_featured: true,
    sort_order: 8,
  },
  {
    id: 'g-9',
    title: 'Veera Anjaneyar Hanuman in Anjali Mudra',
    description: 'Solid brass Anjaneyar with bell tail and devotional posture.',
    image_url: '/images/statues/anjaneyar.jpg',
    category: 'anjaneyar',
    deity: 'anjaneyar',
    material: 'Brass',
    is_featured: true,
    sort_order: 9,
  },
  {
    id: 'g-10',
    title: 'Traditional South Indian Temple Sanctum',
    description: 'Sanctum mandapam with carved granite pillars and consecrated murtis.',
    image_url: '/images/statues/temple.jpg',
    category: 'temple',
    deity: 'all',
    material: 'Stone',
    is_featured: true,
    sort_order: 10,
  },
  {
    id: 'g-11',
    title: 'Sacred Panchaloha & Sculpture Materials',
    description: 'Pure copper, bronze ingots, Krishna Shila stone, and teakwood workbench.',
    image_url: '/images/statues/materials.jpg',
    category: 'materials',
    deity: 'all',
    material: 'Panchaloha',
    is_featured: true,
    sort_order: 11,
  },
];

export const INITIAL_HOMEPAGE: HomepageContent = {
  id: 'h-1',
  hero_title: 'Sacred Art, Crafted by Hand.',
  hero_subtitle: 'Discover beautifully handcrafted South Indian God statues made with traditional artistry and timeless craftsmanship.',
  hero_badge: 'Traditional Shilpa Shastra Excellence',
  cta_banner_title: 'Envisioning a Sacred Statue for Your Sanctum or Temple?',
  cta_banner_subtitle: 'Speak directly with our master sthapathis to sculpt your custom Panchaloha, bronze, or granite deity according to Agama Shastra standards.',
};

export const INITIAL_SETTINGS: AdminSettings = {
  id: 's-1',
  business_name: 'Vetri Arts & Crafts',
  admin_email: import.meta.env.VITE_ADMIN_EMAIL || 'contact@vetriarts.com',
  admin_whatsapp: import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || '+919342839218',
  business_phone: '+919342839218',
  instagram_url: 'https://instagram.com/vetriartsncrafts',
  whatsapp_url: 'https://wa.me/919342839218',
  address: 'Swamimalai / Mahabalipuram Heritage Workshop, Tamil Nadu, India',
  email_notifications_enabled: true,
  whatsapp_notifications_enabled: true,
};

// ============================================================================
// RESILIENT REPOSITORY SERVICE LAYER
// Seamlessly delegates to Supabase if configured, or uses Local/Store fallback
// ============================================================================

class DataStore {
  private products: Product[] = [];
  private categories: Category[] = [];
  private gallery: GalleryItem[] = [];
  private enquiries: Enquiry[] = [];
  private orders: Order[] = [];
  private customOrders: CustomOrder[] = [];
  private templeOrders: TempleOrder[] = [];
  private statusHistory: OrderStatusHistory[] = [];
  private homepage: HomepageContent = INITIAL_HOMEPAGE;
  private settings: AdminSettings = INITIAL_SETTINGS;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const savedProducts = localStorage.getItem('vac_products');
      this.products = savedProducts ? JSON.parse(savedProducts) : INITIAL_PRODUCTS;

      const savedCategories = localStorage.getItem('vac_categories');
      this.categories = savedCategories ? JSON.parse(savedCategories) : INITIAL_CATEGORIES;

      const savedGallery = localStorage.getItem('vac_gallery');
      this.gallery = savedGallery ? JSON.parse(savedGallery) : INITIAL_GALLERY;

      const savedEnquiries = localStorage.getItem('vac_enquiries');
      this.enquiries = savedEnquiries ? JSON.parse(savedEnquiries) : [];

      const savedOrders = localStorage.getItem('vac_orders');
      this.orders = savedOrders ? JSON.parse(savedOrders) : [];

      const savedCustom = localStorage.getItem('vac_custom_orders');
      this.customOrders = savedCustom ? JSON.parse(savedCustom) : [];

      const savedTemple = localStorage.getItem('vac_temple_orders');
      this.templeOrders = savedTemple ? JSON.parse(savedTemple) : [];

      const savedHistory = localStorage.getItem('vac_status_history');
      this.statusHistory = savedHistory ? JSON.parse(savedHistory) : [];

      const savedSettings = localStorage.getItem('vac_settings');
      this.settings = savedSettings ? JSON.parse(savedSettings) : INITIAL_SETTINGS;

      const savedHomepage = localStorage.getItem('vac_homepage');
      this.homepage = savedHomepage ? JSON.parse(savedHomepage) : INITIAL_HOMEPAGE;
    } catch {
      this.products = INITIAL_PRODUCTS;
      this.categories = INITIAL_CATEGORIES;
      this.gallery = INITIAL_GALLERY;
      this.settings = INITIAL_SETTINGS;
      this.homepage = INITIAL_HOMEPAGE;
    }
  }

  // --- PRODUCTS ---
  async getProducts(): Promise<Product[]> {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, product_images(*)')
          .order('sort_order', { ascending: true });
        if (!error && data && data.length > 0) {
          return data.map((item: any) => ({
            ...item,
            images: item.product_images || [],
            primary_image: item.product_images?.find((img: any) => img.is_primary)?.image_url || item.product_images?.[0]?.image_url || '',
          }));
        }
      } catch (e) {
        console.warn('Supabase fetch failed, fallback to local', e);
      }
    }
    return this.products;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const products = await this.getProducts();
    return products.find((p) => p.slug === slug) || null;
  }

  async saveProduct(product: Partial<Product>): Promise<Product> {
    if (product.id) {
      const index = this.products.findIndex((p) => p.id === product.id);
      if (index >= 0) {
        this.products[index] = { ...this.products[index], ...product, updated_at: new Date().toISOString() } as Product;
      }
    } else {
      const newProduct: Product = {
        id: `p-${Date.now()}`,
        slug: product.slug || `statue-${Date.now()}`,
        product_code: product.product_code || `VAC-${Date.now().toString().slice(-4)}`,
        name: product.name || 'Handcrafted Deity Statue',
        deity: product.deity || 'murugan',
        category_id: product.category_id,
        description: product.description || '',
        material: product.material || 'Panchaloha (5-Metal Sacred Alloy)',
        height: product.height || 18,
        width: product.width || 10,
        depth: product.depth || 8,
        weight: product.weight || 10,
        finish: product.finish || 'Antique Patina',
        price: product.price || 0,
        price_on_request: Boolean(product.price_on_request),
        availability: product.availability || 'in_stock',
        made_to_order: Boolean(product.made_to_order),
        customizable: product.customizable !== false,
        featured: Boolean(product.featured),
        sort_order: this.products.length + 1,
        images: product.images || [],
        primary_image: product.images?.find((i) => i.is_primary)?.image_url || product.images?.[0]?.image_url || '',
        created_at: new Date().toISOString(),
      };
      this.products.unshift(newProduct);
    }
    localStorage.setItem('vac_products', JSON.stringify(this.products));
    return product as Product;
  }

  async deleteProduct(id: string): Promise<boolean> {
    this.products = this.products.filter((p) => p.id !== id);
    localStorage.setItem('vac_products', JSON.stringify(this.products));
    return true;
  }

  // --- ENQUIRIES ---
  async getEnquiries(): Promise<Enquiry[]> {
    return this.enquiries;
  }

  async createEnquiry(enquiry: Omit<Enquiry, 'id' | 'created_at' | 'updated_at'>): Promise<Enquiry> {
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.enquiries.unshift(newEnquiry);
    localStorage.setItem('vac_enquiries', JSON.stringify(this.enquiries));
    return newEnquiry;
  }

  async updateEnquiryStatus(id: string, status: Enquiry['status'], notes?: string): Promise<void> {
    const enq = this.enquiries.find((e) => e.id === id);
    if (enq) {
      const prev = enq.status;
      enq.status = status;
      enq.updated_at = new Date().toISOString();
      if (notes) enq.notes = notes;
      this.recordStatusHistory(id, 'enquiry', prev, status, notes);
      localStorage.setItem('vac_enquiries', JSON.stringify(this.enquiries));
    }
  }

  // --- ORDERS ---
  async getOrders(): Promise<Order[]> {
    return this.orders;
  }

  async createOrder(order: Omit<Order, 'id' | 'created_at' | 'updated_at'>): Promise<Order> {
    const newOrder: Order = {
      ...order,
      id: `ord-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.orders.unshift(newOrder);
    localStorage.setItem('vac_orders', JSON.stringify(this.orders));
    return newOrder;
  }

  async updateOrderStatus(id: string, status: Order['status'], notes?: string): Promise<void> {
    const ord = this.orders.find((o) => o.id === id);
    if (ord) {
      const prev = ord.status;
      ord.status = status;
      ord.updated_at = new Date().toISOString();
      if (notes) ord.notes = notes;
      this.recordStatusHistory(id, 'order', prev, status, notes);
      localStorage.setItem('vac_orders', JSON.stringify(this.orders));
    }
  }

  // --- CUSTOM ORDERS ---
  async getCustomOrders(): Promise<CustomOrder[]> {
    return this.customOrders;
  }

  async createCustomOrder(custom: Omit<CustomOrder, 'id' | 'created_at' | 'updated_at'>): Promise<CustomOrder> {
    const newCustom: CustomOrder = {
      ...custom,
      id: `cst-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.customOrders.unshift(newCustom);
    localStorage.setItem('vac_custom_orders', JSON.stringify(this.customOrders));
    return newCustom;
  }

  async updateCustomOrderStatus(id: string, status: CustomOrder['status'], notes?: string): Promise<void> {
    const cst = this.customOrders.find((c) => c.id === id);
    if (cst) {
      const prev = cst.status;
      cst.status = status;
      cst.updated_at = new Date().toISOString();
      if (notes) cst.notes = notes;
      this.recordStatusHistory(id, 'custom', prev, status, notes);
      localStorage.setItem('vac_custom_orders', JSON.stringify(this.customOrders));
    }
  }

  // --- TEMPLE ORDERS ---
  async getTempleOrders(): Promise<TempleOrder[]> {
    return this.templeOrders;
  }

  async createTempleOrder(temple: Omit<TempleOrder, 'id' | 'created_at' | 'updated_at'>): Promise<TempleOrder> {
    const newTemple: TempleOrder = {
      ...temple,
      id: `tmp-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.templeOrders.unshift(newTemple);
    localStorage.setItem('vac_temple_orders', JSON.stringify(this.templeOrders));
    return newTemple;
  }

  async updateTempleOrderStatus(id: string, status: TempleOrder['status'], notes?: string): Promise<void> {
    const tmp = this.templeOrders.find((t) => t.id === id);
    if (tmp) {
      const prev = tmp.status;
      tmp.status = status;
      tmp.updated_at = new Date().toISOString();
      if (notes) tmp.notes = notes;
      this.recordStatusHistory(id, 'temple', prev, status, notes);
      localStorage.setItem('vac_temple_orders', JSON.stringify(this.templeOrders));
    }
  }

  // --- STATUS HISTORY ---
  async getStatusHistory(orderId: string): Promise<OrderStatusHistory[]> {
    return this.statusHistory.filter((h) => h.order_id === orderId);
  }

  private recordStatusHistory(
    orderId: string,
    orderType: OrderStatusHistory['order_type'],
    prevStatus?: string,
    newStatus: string = 'Received',
    notes?: string
  ) {
    const history: OrderStatusHistory = {
      id: `hist-${Date.now()}`,
      order_id: orderId,
      order_type: orderType,
      previous_status: prevStatus,
      new_status: newStatus,
      changed_by: 'Admin',
      notes,
      created_at: new Date().toISOString(),
    };
    this.statusHistory.unshift(history);
    localStorage.setItem('vac_status_history', JSON.stringify(this.statusHistory));
  }

  // --- GALLERY ---
  async getGallery(): Promise<GalleryItem[]> {
    return this.gallery;
  }

  async saveGalleryItem(item: Partial<GalleryItem>): Promise<GalleryItem> {
    const newItem: GalleryItem = {
      id: item.id || `g-${Date.now()}`,
      title: item.title || 'Sacred Sculpture',
      description: item.description || '',
      image_url: item.image_url || '',
      category: item.category || 'all',
      deity: item.deity,
      material: item.material,
      is_featured: Boolean(item.is_featured),
      sort_order: item.sort_order || this.gallery.length + 1,
      created_at: new Date().toISOString(),
    };
    if (item.id) {
      const idx = this.gallery.findIndex((g) => g.id === item.id);
      if (idx >= 0) this.gallery[idx] = newItem;
    } else {
      this.gallery.unshift(newItem);
    }
    localStorage.setItem('vac_gallery', JSON.stringify(this.gallery));
    return newItem;
  }

  async deleteGalleryItem(id: string): Promise<boolean> {
    this.gallery = this.gallery.filter((g) => g.id !== id);
    localStorage.setItem('vac_gallery', JSON.stringify(this.gallery));
    return true;
  }

  // --- SETTINGS & HOMEPAGE ---
  async getSettings(): Promise<AdminSettings> {
    return this.settings;
  }

  async saveSettings(settings: Partial<AdminSettings>): Promise<AdminSettings> {
    this.settings = { ...this.settings, ...settings, updated_at: new Date().toISOString() };
    localStorage.setItem('vac_settings', JSON.stringify(this.settings));
    return this.settings;
  }

  async getHomepage(): Promise<HomepageContent> {
    return this.homepage;
  }

  async saveHomepage(homepage: Partial<HomepageContent>): Promise<HomepageContent> {
    this.homepage = { ...this.homepage, ...homepage, updated_at: new Date().toISOString() };
    localStorage.setItem('vac_homepage', JSON.stringify(this.homepage));
    return this.homepage;
  }
}

export const db = new DataStore();
