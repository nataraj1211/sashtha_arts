-- ====================================================================
-- VETRI ARTS & CRAFTS — SEED DATA
-- Authentic South Indian Deities, Dimensions, and 4-Side Views
-- ====================================================================

-- 1. Insert Categories
INSERT INTO public.categories (id, slug, name, description, sort_order) VALUES
('c1000000-0000-0000-0000-000000000001', 'panchaloha-statues', 'Panchaloha Statues', 'Sacred five-metal alloy statues cast via ancient lost-wax technique (Madhuchishtavidhana).', 1),
('c1000000-0000-0000-0000-000000000002', 'bronze-sculptures', 'Bronze Sculptures', 'Traditional Chola style lost-wax cast bronze idols for sanctums and temples.', 2),
('c1000000-0000-0000-0000-000000000003', 'brass-idols', 'Brass Idols', 'Finely engraved brass statues with rich antique polish and sacred details.', 3),
('c1000000-0000-0000-0000-000000000004', 'black-stone-sculptures', 'Black Granite Stone', 'Hand-chiselled Krishna Shila and black granite murtis according to Shilpa Shastra.', 4),
('c1000000-0000-0000-0000-000000000005', 'wood-carvings', 'Sacred Wood Carvings', 'Virasana and Ananda Nilayam style idols in solid Country Teak and Rosewood.', 5)
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert Products
INSERT INTO public.products (
    id, slug, product_code, name, deity, category_id, description,
    material, height, width, depth, weight, finish, price, price_on_request,
    availability, made_to_order, customizable, featured, sort_order
) VALUES
(
    'p1000000-0000-0000-0000-000000000001',
    'traditional-lord-murugan-swaminatha-statue',
    'VAC-MRG-001',
    'Lord Murugan (Swaminatha Swami) Handcrafted Panchaloha Statue',
    'murugan',
    'c1000000-0000-0000-0000-000000000001',
    'A magnificent, divinely energized representation of Lord Murugan (Karthikeya / Subramanya) holding the sacred Vel and displaying Abhaya Mudra. Mastercrafted in traditional Swamimalai Panchaloha (Gold, Silver, Copper, Zinc, Lead alloy) using the ancient Madhuchishtavidhana (lost-wax) casting process strictly conforming to Shilpa Shastra guidelines. Features an intricately sculpted Mayil (Peacock) vahana at the base.',
    'Panchaloha (5-Metal Sacred Alloy)',
    24, 11, 8, 14.5,
    'Traditional Antique Patina & Temple Gold Polish',
    68500, FALSE,
    'in_stock', FALSE, TRUE, TRUE, 1
),
(
    'p1000000-0000-0000-0000-000000000002',
    'divine-ananda-tandava-nataraja-bronze-sculpture',
    'VAC-SHV-002',
    'Lord Nataraja (Cosmic Cosmic Dance) Lost-Wax Chola Bronze',
    'shiva',
    'c1000000-0000-0000-0000-000000000002',
    'Iconic South Indian Chola style Nataraja depicting the cosmic Ananda Tandava within the flaming Prabha-mandala. Lord Shiva balances upon the demon Apasmara, holding the Damaru (creation) and Agni (transformation). Hand-poured lost-wax cast bronze with magnificent facial expression and divine proportions.',
    'Chola Lost-Wax Cast Bronze',
    30, 24, 10, 22.0,
    'Deep Temple Bronze Patina',
    95000, FALSE,
    'in_stock', FALSE, TRUE, TRUE, 2
),
(
    'p1000000-0000-0000-0000-000000000003',
    'lord-maha-ganapathi-vinayagar-brass-statue',
    'VAC-VNY-003',
    'Maha Ganapathi (Vinayagar) with Prabhavali Handcrafted Brass Idol',
    'vinayagar',
    'c1000000-0000-0000-0000-000000000003',
    'Auspicious seated Maha Ganapathi featuring a regal arch (Prabhavali), holding the sacred Gada, Pasha, Ankusha, and the Modaka in His curved trunk (Valampuri / Idampuri posture). Ideal for home sanctums, temple altars, and auspicious inaugural ceremonies.',
    'Solid Pure Brass',
    18, 12, 9, 11.2,
    'Antique Golden Sandalwood Glow',
    32000, FALSE,
    'in_stock', FALSE, TRUE, TRUE, 3
),
(
    'p1000000-0000-0000-0000-000000000004',
    'sri-mariamman-devi-panchaloha-idol',
    'VAC-AMM-004',
    'Goddess Sri Mariamman Devi Sacred Panchaloha Idol',
    'amman',
    'c1000000-0000-0000-0000-000000000001',
    'Divine Mother Sri Mariamman seated majestically with five-headed serpent canopy (Nagakudai), holding the Trishula, Udukkai, Kapala, and sword. Masterfully detailed ornaments, kiritam, and flowing saree drapery sculpted by hereditary sthapathis.',
    'Panchaloha (5-Metal Sacred Alloy)',
    21, 12, 9, 13.0,
    'Sacred Temple Gold & Red Sindoor Accent',
    59000, FALSE,
    'in_stock', FALSE, TRUE, TRUE, 4
),
(
    'p1000000-0000-0000-0000-000000000005',
    'lord-venkateswara-perumal-black-granite-sculpture',
    'VAC-PRM-005',
    'Lord Venkateswara (Balaji Perumal) Hand-Chiseled Black Granite',
    'perumal',
    'c1000000-0000-0000-0000-000000000004',
    'Sublime depiction of Lord Srinivasa (Tirupati Balaji) hand-chiselled from dense, monolithic Krishna Shila black granite stone. Features sacred Shankha, Chakra, and Katyavalambita mudra along with exquisite stone jewellery carving.',
    'Monolithic Black Granite Stone',
    36, 18, 12, 65.0,
    'Natural Temple Oil Treated Black Finish',
    0, TRUE,
    'made_to_order', TRUE, TRUE, TRUE, 5
),
(
    'p1000000-0000-0000-0000-000000000006',
    'venugopala-krishna-with-cow-bronze-idol',
    'VAC-KRS-006',
    'Venugopala Krishna with Kamadhenu Cow Handcrafted Bronze',
    'krishna',
    'c1000000-0000-0000-0000-000000000002',
    'Enchanting Lord Krishna in Tribhanga pose playing the divine flute (Venu) alongside a loving calf and cow under the Kadamba tree. Cast using high-purity bronze with soft facial serenity and peacock feather crown (Mayil Peeli).',
    'Traditional Solid Bronze',
    20, 13, 8, 9.8,
    'Warm Honey Bronze & Antique Dark Tone',
    46500, FALSE,
    'in_stock', FALSE, TRUE, TRUE, 6
),
(
    'p1000000-0000-0000-0000-000000000007',
    'swami-ayyappan-panchaloha-sanctum-murti',
    'VAC-AYY-007',
    'Swami Ayyappan (Dharma Sastha) Panchaloha Sanctum Murti',
    'ayyappan',
    'c1000000-0000-0000-0000-000000000001',
    'Sacred Lord Ayyappan seated in Yogarudha posture with knee band (Yoga Patta) on a tiered lotus pedestal (Padma Peedam). Imbued with tranquility, spiritual depth, and flawless anatomical precision according to Sabarimala iconometry.',
    'Panchaloha (5-Metal Sacred Alloy)',
    16, 10, 8, 7.8,
    'Sacred Antique Golden Patina',
    42000, FALSE,
    'in_stock', FALSE, TRUE, TRUE, 7
),
(
    'p1000000-0000-0000-0000-000000000008',
    'veera-anjaneyar-hanuman-brass-statue',
    'VAC-HNM-008',
    'Veera Anjaneyar (Lord Hanuman) Hand-Carved Heavy Brass Idol',
    'anjaneyar',
    'c1000000-0000-0000-0000-000000000003',
    'Majestic Lord Hanuman in courageous posture with Sanjeevi mountain in hand and Gada over shoulder, tail coiled with sacred bell at the tip. Represents supreme devotion, strength, and protection for the home or temple.',
    'Heavy Pure Brass',
    22, 11, 9, 12.5,
    'Dual Tone Gold & Antique Dark Brass',
    38000, FALSE,
    'in_stock', FALSE, TRUE, TRUE, 8
)
ON CONFLICT (slug) DO NOTHING;

-- 3. Insert Product Images (4-Side mandatory views for all products)
INSERT INTO public.product_images (id, product_id, image_url, view_type, sort_order, is_primary) VALUES
-- Murugan Images
('img10000-0000-0000-0000-000000000001', 'p1000000-0000-0000-0000-000000000001', '/images/statues/murugan.jpg', 'front', 1, TRUE),
('img10000-0000-0000-0000-000000000002', 'p1000000-0000-0000-0000-000000000001', '/images/statues/murugan.jpg', 'left', 2, FALSE),
('img10000-0000-0000-0000-000000000003', 'p1000000-0000-0000-0000-000000000001', '/images/statues/murugan.jpg', 'right', 3, FALSE),
('img10000-0000-0000-0000-000000000004', 'p1000000-0000-0000-0000-000000000001', '/images/statues/murugan.jpg', 'back', 4, FALSE),
('img10000-0000-0000-0000-000000000005', 'p1000000-0000-0000-0000-000000000001', '/images/statues/murugan.jpg', 'detail', 5, FALSE),
('img10000-0000-0000-0000-000000000006', 'p1000000-0000-0000-0000-000000000001', '/images/statues/murugan.jpg', 'lifestyle', 6, FALSE),

-- Nataraja Images
('img10000-0000-0000-0000-000000000007', 'p1000000-0000-0000-0000-000000000002', '/images/statues/nataraja.jpg', 'front', 1, TRUE),
('img10000-0000-0000-0000-000000000008', 'p1000000-0000-0000-0000-000000000002', '/images/statues/nataraja.jpg', 'left', 2, FALSE),
('img10000-0000-0000-0000-000000000009', 'p1000000-0000-0000-0000-000000000002', '/images/statues/nataraja.jpg', 'right', 3, FALSE),
('img10000-0000-0000-0000-000000000010', 'p1000000-0000-0000-0000-000000000002', '/images/statues/nataraja.jpg', 'back', 4, FALSE),

-- Vinayagar Images
('img10000-0000-0000-0000-000000000011', 'p1000000-0000-0000-0000-000000000003', '/images/statues/vinayagar.jpg', 'front', 1, TRUE),
('img10000-0000-0000-0000-000000000012', 'p1000000-0000-0000-0000-000000000003', '/images/statues/vinayagar.jpg', 'left', 2, FALSE),
('img10000-0000-0000-0000-000000000013', 'p1000000-0000-0000-0000-000000000003', '/images/statues/vinayagar.jpg', 'right', 3, FALSE),
('img10000-0000-0000-0000-000000000014', 'p1000000-0000-0000-0000-000000000003', '/images/statues/vinayagar.jpg', 'back', 4, FALSE),

-- Amman Images
('img10000-0000-0000-0000-000000000015', 'p1000000-0000-0000-0000-000000000004', '/images/statues/amman.jpg', 'front', 1, TRUE),
('img10000-0000-0000-0000-000000000016', 'p1000000-0000-0000-0000-000000000004', '/images/statues/amman.jpg', 'left', 2, FALSE),
('img10000-0000-0000-0000-000000000017', 'p1000000-0000-0000-0000-000000000004', '/images/statues/amman.jpg', 'right', 3, FALSE),
('img10000-0000-0000-0000-000000000018', 'p1000000-0000-0000-0000-000000000004', '/images/statues/amman.jpg', 'back', 4, FALSE),

-- Perumal Images
('img10000-0000-0000-0000-000000000019', 'p1000000-0000-0000-0000-000000000005', '/images/statues/perumal.jpg', 'front', 1, TRUE),
('img10000-0000-0000-0000-000000000020', 'p1000000-0000-0000-0000-000000000005', '/images/statues/perumal.jpg', 'left', 2, FALSE),
('img10000-0000-0000-0000-000000000021', 'p1000000-0000-0000-0000-000000000005', '/images/statues/perumal.jpg', 'right', 3, FALSE),
('img10000-0000-0000-0000-000000000022', 'p1000000-0000-0000-0000-000000000005', '/images/statues/perumal.jpg', 'back', 4, FALSE),

-- Krishna Images
('img10000-0000-0000-0000-000000000023', 'p1000000-0000-0000-0000-000000000006', '/images/statues/krishna.jpg', 'front', 1, TRUE),
('img10000-0000-0000-0000-000000000024', 'p1000000-0000-0000-0000-000000000006', '/images/statues/krishna.jpg', 'left', 2, FALSE),
('img10000-0000-0000-0000-000000000025', 'p1000000-0000-0000-0000-000000000006', '/images/statues/krishna.jpg', 'right', 3, FALSE),
('img10000-0000-0000-0000-000000000026', 'p1000000-0000-0000-0000-000000000006', '/images/statues/krishna.jpg', 'back', 4, FALSE),

-- Ayyappan Images
('img10000-0000-0000-0000-000000000027', 'p1000000-0000-0000-0000-000000000007', '/images/statues/ayyappan.jpg', 'front', 1, TRUE),
('img10000-0000-0000-0000-000000000028', 'p1000000-0000-0000-0000-000000000007', '/images/statues/ayyappan.jpg', 'left', 2, FALSE),
('img10000-0000-0000-0000-000000000029', 'p1000000-0000-0000-0000-000000000007', '/images/statues/ayyappan.jpg', 'right', 3, FALSE),
('img10000-0000-0000-0000-000000000030', 'p1000000-0000-0000-0000-000000000007', '/images/statues/ayyappan.jpg', 'back', 4, FALSE),

-- Anjaneyar Images
('img10000-0000-0000-0000-000000000031', 'p1000000-0000-0000-0000-000000000008', '/images/statues/anjaneyar.jpg', 'front', 1, TRUE),
('img10000-0000-0000-0000-000000000032', 'p1000000-0000-0000-0000-000000000008', '/images/statues/anjaneyar.jpg', 'left', 2, FALSE),
('img10000-0000-0000-0000-000000000033', 'p1000000-0000-0000-0000-000000000008', '/images/statues/anjaneyar.jpg', 'right', 3, FALSE),
('img10000-0000-0000-0000-000000000034', 'p1000000-0000-0000-0000-000000000008', '/images/statues/anjaneyar.jpg', 'back', 4, FALSE)
ON CONFLICT (id) DO NOTHING;

-- 4. Insert Gallery Items
INSERT INTO public.gallery (id, title, description, image_url, category, deity, material, is_featured, sort_order) VALUES
('g1000000-0000-0000-0000-000000000001', 'Swamimalai Bronze Casting in Progress', 'Master artisan hand-chasing sacred jewellery details on a 3-foot Murugan bronze statue.', '/images/statues/workshop.jpg', 'workshop', 'murugan', 'Bronze', TRUE, 1),
('g1000000-0000-0000-0000-000000000002', 'Grand 6-Foot Nataraja for Sanctum', 'Custom ordered bronze Nataraja for a renowned Shiva temple sanctum mandapam.', '/images/statues/nataraja.jpg', 'temple', 'shiva', 'Bronze', TRUE, 2),
('g1000000-0000-0000-0000-000000000003', 'Hand-chiselled Krishna Shila Balaji', 'Traditional black granite Venkateswara Perumal with fine crown and chakra carvings.', '/images/statues/perumal.jpg', 'stone', 'perumal', 'Black Stone', TRUE, 3),
('g1000000-0000-0000-0000-000000000004', 'Panchaloha Sri Mariamman Utsava Murti', 'Panchaloha processional idol ready for sacred Abhishekam and temple consecration.', '/images/statues/amman.jpg', 'panchaloha', 'amman', 'Panchaloha', TRUE, 4),
('g1000000-0000-0000-0000-000000000005', 'Lost-Wax Molten Metal Pouring Ritual', 'The auspicious pouring of sacred alloy into the heated clay mould (Madhuchishtavidhana).', '/images/statues/workshop.jpg', 'workshop', 'all', 'Panchaloha', TRUE, 5),
('g1000000-0000-0000-0000-000000000006', 'Solid Brass Maha Ganapathi', 'Intricate lotus throne and prabhavali engraving on 2-foot Maha Ganapathi.', '/images/statues/vinayagar.jpg', 'bronze', 'vinayagar', 'Brass', TRUE, 6)
ON CONFLICT (id) DO NOTHING;

-- 5. Insert Initial Settings & Content
INSERT INTO public.admin_settings (id, business_name, admin_email, admin_whatsapp, business_phone, instagram_url, address)
VALUES ('s1000000-0000-0000-0000-000000000001', 'Vetri Arts & Crafts', 'contact@vetriarts.com', '+919342839218', '+919342839218', 'https://instagram.com/vetriartsncrafts', 'Swamimalai / Mahabalipuram Heritage Workshop, Tamil Nadu, India')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.homepage_content (id, hero_title, hero_subtitle, hero_badge)
VALUES ('h1000000-0000-0000-0000-000000000001', 'Sacred Art, Crafted by Hand.', 'Discover beautifully handcrafted South Indian God statues made with traditional artistry and timeless craftsmanship.', 'Traditional Shilpa Shastra Excellence')
ON CONFLICT (id) DO NOTHING;
