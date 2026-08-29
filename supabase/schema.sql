-- ====================================================================
-- SASHTHA ARTS & CRAFTS — PRODUCTION DATABASE SCHEMA
-- PostgreSQL / Supabase
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    product_code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    deity TEXT NOT NULL, -- e.g. murugan, vinayagar, amman, shiva, perumal, krishna, ayyappan, anjaneyar
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    description TEXT,
    material TEXT NOT NULL, -- panchaloha, bronze, brass, stone, wood, etc.
    height NUMERIC NOT NULL, -- in inches
    width NUMERIC, -- in inches
    depth NUMERIC, -- in inches
    weight NUMERIC, -- in kg
    finish TEXT DEFAULT 'Antique Patina', -- Antique Patina, Polished Gold, Temple Black, Natural Matte, etc.
    price NUMERIC,
    price_on_request BOOLEAN DEFAULT FALSE,
    availability TEXT DEFAULT 'in_stock', -- in_stock, made_to_order, out_of_stock
    made_to_order BOOLEAN DEFAULT FALSE,
    customizable BOOLEAN DEFAULT TRUE,
    featured BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PRODUCT IMAGES TABLE (Critical 4-Side Views)
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    storage_path TEXT,
    view_type TEXT NOT NULL CHECK (view_type IN ('front', 'left', 'right', 'back', 'detail', 'lifestyle')),
    sort_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    category TEXT DEFAULT 'all', -- all, murugan, vinayagar, amman, shiva, perumal, bronze, panchaloha, stone, wood, temple, workshop
    deity TEXT,
    material TEXT,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id TEXT UNIQUE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_whatsapp TEXT,
    customer_email TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Quote Sent', 'Confirmed', 'In Crafting', 'Ready', 'Dispatched', 'Completed', 'Cancelled')),
    email_notified BOOLEAN DEFAULT FALSE,
    whatsapp_notified BOOLEAN DEFAULT FALSE,
    email_error TEXT,
    whatsapp_error TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id TEXT UNIQUE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    quantity INTEGER DEFAULT 1,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_whatsapp TEXT,
    customer_email TEXT,
    delivery_location TEXT NOT NULL,
    preferred_size TEXT,
    preferred_material TEXT,
    preferred_finish TEXT,
    special_requirements TEXT,
    reference_image_url TEXT,
    estimated_total NUMERIC,
    price_on_request BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'Received' CHECK (status IN ('Received', 'Contacted', 'Quote Sent', 'Confirmed', 'In Crafting', 'Quality Check', 'Ready', 'Dispatched', 'Delivered', 'Completed', 'Cancelled')),
    email_notified BOOLEAN DEFAULT FALSE,
    whatsapp_notified BOOLEAN DEFAULT FALSE,
    email_error TEXT,
    whatsapp_error TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CUSTOM ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.custom_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id TEXT UNIQUE NOT NULL,
    deity TEXT NOT NULL,
    material TEXT NOT NULL,
    height TEXT,
    width TEXT,
    depth TEXT,
    pose TEXT,
    reference_images TEXT[] DEFAULT ARRAY[]::TEXT[],
    requirements TEXT,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_whatsapp TEXT,
    customer_email TEXT,
    delivery_location TEXT,
    status TEXT DEFAULT 'Received' CHECK (status IN ('Received', 'Contacted', 'Quote Sent', 'Confirmed', 'In Crafting', 'Quality Check', 'Ready', 'Dispatched', 'Delivered', 'Completed', 'Cancelled')),
    email_notified BOOLEAN DEFAULT FALSE,
    whatsapp_notified BOOLEAN DEFAULT FALSE,
    email_error TEXT,
    whatsapp_error TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TEMPLE ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.temple_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id TEXT UNIQUE NOT NULL,
    organization_name TEXT NOT NULL,
    location TEXT NOT NULL,
    deity TEXT NOT NULL,
    project_type TEXT NOT NULL, -- temple_idols, large_sculptures, temple_pillars, temple_doors, vimana_sculptures, restoration, bulk_orders
    required_height TEXT,
    material TEXT,
    quantity TEXT,
    reference_images TEXT[] DEFAULT ARRAY[]::TEXT[],
    expected_timeline TEXT,
    contact_person TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    requirements TEXT,
    status TEXT DEFAULT 'Received' CHECK (status IN ('Received', 'Contacted', 'Quote Sent', 'Confirmed', 'In Crafting', 'Quality Check', 'Ready', 'Dispatched', 'Delivered', 'Completed', 'Cancelled')),
    email_notified BOOLEAN DEFAULT FALSE,
    whatsapp_notified BOOLEAN DEFAULT FALSE,
    email_error TEXT,
    whatsapp_error TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ORDER STATUS HISTORY AUDIT LOG
CREATE TABLE IF NOT EXISTS public.order_status_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL,
    order_type TEXT NOT NULL CHECK (order_type IN ('enquiry', 'order', 'custom', 'temple')),
    previous_status TEXT,
    new_status TEXT NOT NULL,
    changed_by TEXT DEFAULT 'Admin',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. HOMEPAGE CONTENT CMS TABLE
CREATE TABLE IF NOT EXISTS public.homepage_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hero_title TEXT DEFAULT 'Sacred Art, Crafted by Hand.',
    hero_subtitle TEXT DEFAULT 'Discover beautifully handcrafted South Indian God statues made with traditional artistry and timeless craftsmanship.',
    hero_image_url TEXT,
    hero_badge TEXT DEFAULT 'Traditional Shilpa Shastra Excellence',
    cta_banner_title TEXT DEFAULT 'Envisioning a Sacred Statue for Your Sanctum or Temple?',
    cta_banner_subtitle TEXT DEFAULT 'Speak directly with our master sthapathis to sculpt your custom Panchaloha, bronze, or granite deity according to Agama Shastra standards.',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. ADMIN SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.admin_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_name TEXT DEFAULT 'Sashtha Arts & Crafts',
    admin_email TEXT DEFAULT 'admin@sashthaarts.com',
    admin_whatsapp TEXT DEFAULT '+919342839218',
    business_phone TEXT DEFAULT '+919342839218',
    instagram_url TEXT DEFAULT 'https://instagram.com/sashthaartsncrafts',
    whatsapp_url TEXT DEFAULT 'https://wa.me/919342839218',
    address TEXT DEFAULT 'Swamimalai / Mahabalipuram Heritage Workshop, Tamil Nadu, India',
    email_notifications_enabled BOOLEAN DEFAULT TRUE,
    whatsapp_notifications_enabled BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- INDEXES FOR FAST QUERYING
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_deity ON public.products(deity);
CREATE INDEX IF NOT EXISTS idx_products_material ON public.products(material);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON public.product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_product_images_view_type ON public.product_images(view_type);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_custom_orders_status ON public.custom_orders(status);
CREATE INDEX IF NOT EXISTS idx_temple_orders_status ON public.temple_orders(status);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON public.gallery(category);

-- ====================================================================
-- AUTO-UPDATE UPDATED_AT TRIGGER
-- ====================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS tr_products_updated_at ON public.products;
CREATE TRIGGER tr_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS tr_enquiries_updated_at ON public.enquiries;
CREATE TRIGGER tr_enquiries_updated_at BEFORE UPDATE ON public.enquiries FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS tr_orders_updated_at ON public.orders;
CREATE TRIGGER tr_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS tr_custom_orders_updated_at ON public.custom_orders;
CREATE TRIGGER tr_custom_orders_updated_at BEFORE UPDATE ON public.custom_orders FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS tr_temple_orders_updated_at ON public.temple_orders;
CREATE TRIGGER tr_temple_orders_updated_at BEFORE UPDATE ON public.temple_orders FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.temple_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Access for catalog and public content
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public Read Product Images" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public Read Homepage Content" ON public.homepage_content FOR SELECT USING (true);
CREATE POLICY "Public Read Admin Public Settings" ON public.admin_settings FOR SELECT USING (true);

-- 2. Public Insert Access for Customer Orders & Enquiries (NO LOGIN REQUIRED)
CREATE POLICY "Public Insert Enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Custom Orders" ON public.custom_orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Temple Orders" ON public.temple_orders FOR INSERT WITH CHECK (true);

-- 3. Authenticated Admin Full Access
CREATE POLICY "Admin All Categories" ON public.categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Products" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Product Images" ON public.product_images FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Gallery" ON public.gallery FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Enquiries" ON public.enquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Orders" ON public.orders FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Custom Orders" ON public.custom_orders FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Temple Orders" ON public.temple_orders FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Order History" ON public.order_status_history FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Homepage Content" ON public.homepage_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Settings" ON public.admin_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
