// Sacred Hindu God Statue Assets & 4-Side Angle Imagery for Sashtha Arts & Crafts
import type { DeityType, ProductImage } from '@/types';

export const STATUE_ASSETS = {
  murugan: '/images/statues/murugan.jpg',
  vinayagar: '/images/statues/vinayagar.jpg',
  amman: '/images/statues/amman.jpg',
  shiva: '/images/statues/nataraja.jpg',
  nataraja: '/images/statues/nataraja.jpg',
  perumal: '/images/statues/perumal.jpg',
  krishna: '/images/statues/krishna.jpg',
  ayyappan: '/images/statues/ayyappan.jpg',
  anjaneyar: '/images/statues/anjaneyar.jpg',
  lakshmi: '/images/statues/amman.jpg',
  other: '/images/statues/murugan.jpg',
  workshop: '/images/statues/workshop.jpg',
  temple: '/images/statues/temple.jpg',
  materials: '/images/statues/materials.jpg',
};

export const DEITY_ALT_TEXTS: Record<string, string> = {
  murugan: 'Traditional South Indian handcrafted Lord Murugan (Swaminatha Swami) Panchaloha statue with sacred Vel and peacock',
  vinayagar: 'Traditional South Indian handcrafted Maha Vinayagar (Lord Ganesha) brass statue in seated blessing posture',
  amman: 'Traditional South Indian handcrafted Sri Mariamman (Devi Durga) bronze statue with sacred trishul and crown',
  shiva: 'Traditional South Indian Chola bronze Lord Nataraja (Dancing Shiva) sculpture performing the cosmic Ananda Tandava',
  nataraja: 'Traditional South Indian Chola bronze Lord Nataraja (Dancing Shiva) sculpture performing the cosmic Ananda Tandava',
  perumal: 'Traditional South Indian handcrafted Lord Venkateswara (Perumal Balaji) Panchaloha statue with Shankha and Chakra',
  krishna: 'Traditional South Indian handcrafted Lord Venugopala Krishna bronze statue playing flute with sacred cow',
  ayyappan: 'Traditional South Indian handcrafted Swami Ayyappan Panchaloha statue in seated Yogapatta posture',
  anjaneyar: 'Traditional South Indian handcrafted Veera Anjaneyar (Lord Hanuman) statue with Anjali mudra and bell tail',
  lakshmi: 'Traditional South Indian handcrafted Goddess Lakshmi statue with lotus flowers in Abhaya Varada mudra',
  workshop: 'Traditional South Indian master sthapathi sculpting bronze lost-wax idol in Swamimalai workshop',
  temple: 'Traditional South Indian stone temple sanctum with carved granite pillars and murtis',
  materials: 'Sacred Panchaloha metals, bronze ingots, Krishna Shila granite, and teakwood on artisan workbench',
};

export function getDeityImage(deity: string): string {
  const d = deity.toLowerCase().trim() as keyof typeof STATUE_ASSETS;
  return STATUE_ASSETS[d] || STATUE_ASSETS.murugan;
}

export function getDeityAltText(deity: string, name?: string): string {
  if (name) return name;
  const d = deity.toLowerCase().trim();
  return DEITY_ALT_TEXTS[d] || 'Traditional South Indian handcrafted Hindu God statue';
}

/**
 * Creates 4-side viewing angles (Front, Left, Right, Back, Detail, Lifestyle) for a given deity statue.
 */
export function generateFourSideImages(
  productId: string,
  deity: DeityType | string,
  productName: string
): ProductImage[] {
  const baseImg = getDeityImage(deity);

  return [
    {
      id: `${productId}-img-front`,
      product_id: productId,
      image_url: baseImg,
      view_type: 'front',
      sort_order: 1,
      is_primary: true,
      caption: `Front View: ${productName}`,
    },
    {
      id: `${productId}-img-left`,
      product_id: productId,
      image_url: baseImg,
      view_type: 'left',
      sort_order: 2,
      is_primary: false,
      caption: `Left Profile View: ${productName}`,
    },
    {
      id: `${productId}-img-right`,
      product_id: productId,
      image_url: baseImg,
      view_type: 'right',
      sort_order: 3,
      is_primary: false,
      caption: `Right Profile View: ${productName}`,
    },
    {
      id: `${productId}-img-back`,
      product_id: productId,
      image_url: baseImg,
      view_type: 'back',
      sort_order: 4,
      is_primary: false,
      caption: `Back View & Peedam Detail: ${productName}`,
    },
    {
      id: `${productId}-img-detail`,
      product_id: productId,
      image_url: baseImg,
      view_type: 'detail',
      sort_order: 5,
      is_primary: false,
      caption: `Detailed Carving & Jewelry: ${productName}`,
    },
    {
      id: `${productId}-img-lifestyle`,
      product_id: productId,
      image_url: baseImg,
      view_type: 'lifestyle',
      sort_order: 6,
      is_primary: false,
      caption: `Sacred Altar Placement: ${productName}`,
    },
  ];
}
