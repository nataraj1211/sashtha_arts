import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

// Layout Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { WhatsAppFloatingButton } from './components/layout/WhatsAppFloatingButton';

// Customer Pages
import { HomePage } from './pages/HomePage';
import { GodStatuesPage } from './pages/GodStatuesPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CustomOrderPage } from './pages/CustomOrderPage';
import { TempleOrdersPage } from './pages/TempleOrdersPage';
import { GalleryPage } from './pages/GalleryPage';
import { OurCraftPage } from './pages/OurCraftPage';
import { MaterialsPage } from './pages/MaterialsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { ShippingPage } from './pages/ShippingPage';
import { CareGuidePage } from './pages/CareGuidePage';
import { WishlistPage } from './pages/WishlistPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminProductFormPage } from './pages/admin/AdminProductFormPage';
import { AdminEnquiriesPage } from './pages/admin/AdminEnquiriesPage';
import { AdminEnquiryDetailPage } from './pages/admin/AdminEnquiryDetailPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminCustomOrdersPage } from './pages/admin/AdminCustomOrdersPage';
import { AdminTempleOrdersPage } from './pages/admin/AdminTempleOrdersPage';
import { AdminGalleryPage } from './pages/admin/AdminGalleryPage';
import { AdminHomepagePage } from './pages/admin/AdminHomepagePage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <ToastProvider>
        <WishlistProvider>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            {!isAdminRoute && <Header />}

            <div className="flex-1">
              <Routes>
                {/* Public Customer Routes (Zero Login Required) */}
                <Route path="/" element={<HomePage />} />
                <Route path="/god-statues" element={<GodStatuesPage />} />
                <Route path="/collections" element={<CollectionsPage />} />
                <Route path="/product/:slug" element={<ProductDetailPage />} />
                <Route path="/custom-order" element={<CustomOrderPage />} />
                <Route path="/temple-orders" element={<TempleOrdersPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/our-craft" element={<OurCraftPage />} />
                <Route path="/materials" element={<MaterialsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/shipping" element={<ShippingPage />} />
                <Route path="/care-guide" element={<CareGuidePage />} />
                <Route path="/wishlist" element={<WishlistPage />} />

                {/* Admin Routes (Authentication & Role Guard Protected) */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/admin/products" element={<AdminProductsPage />} />
                <Route path="/admin/products/new" element={<AdminProductFormPage />} />
                <Route path="/admin/products/:id/edit" element={<AdminProductFormPage />} />
                <Route path="/admin/enquiries" element={<AdminEnquiriesPage />} />
                <Route path="/admin/enquiries/:id" element={<AdminEnquiryDetailPage />} />
                <Route path="/admin/orders" element={<AdminOrdersPage />} />
                <Route path="/admin/custom-orders" element={<AdminCustomOrdersPage />} />
                <Route path="/admin/temple-orders" element={<AdminTempleOrdersPage />} />
                <Route path="/admin/gallery" element={<AdminGalleryPage />} />
                <Route path="/admin/homepage" element={<AdminHomepagePage />} />
                <Route path="/admin/settings" element={<AdminSettingsPage />} />

                {/* Fallback 404 Route */}
                <Route path="*" element={<HomePage />} />
              </Routes>
            </div>

            {!isAdminRoute && <Footer />}
            {!isAdminRoute && <MobileBottomNav />}
            {!isAdminRoute && <WhatsAppFloatingButton />}
          </div>
        </WishlistProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
