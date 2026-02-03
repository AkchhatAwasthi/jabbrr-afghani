import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ScrollToTop from '@/components/ScrollToTop';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { PageLoader } from '@/components/LoadingSpinner';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Index from '@/pages/Index';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Auth from '@/pages/Auth';
import Profile from '@/pages/Profile';
import Contact from '@/pages/Contact';
import About from '@/pages/About';
import NotFound from '@/pages/NotFound';
import UserOrderDetail from '@/pages/OrderDetail';
import AdminLayout from '@/pages/admin/AdminLayout';
import Dashboard from '@/pages/admin/Dashboard';
import AdminProducts from '@/pages/admin/Products';
import ProductForm from '@/pages/admin/ProductForm';
import Categories from '@/pages/admin/Categories';
import CategoryForm from '@/pages/admin/CategoryForm';
import Orders from '@/pages/admin/Orders';
import OrderDetail from '@/pages/admin/OrderDetail';
import Customers from '@/pages/admin/Customers';
import Coupons from '@/pages/admin/Coupons';
import CouponForm from '@/pages/admin/CouponForm';
import CouponAssignment from '@/pages/admin/CouponAssignment';
import BestSellers from '@/pages/admin/BestSellers';
import Analytics from '@/pages/admin/Analytics';
import Settings from '@/pages/admin/Settings';
import InstagramPosts from '@/pages/admin/InstagramPosts';
import Testimonials from '@/pages/admin/Testimonials';

// Kitchen Pages
import KitchenLayout from '@/pages/kitchen/KitchenLayout';
import KitchenDashboard from '@/pages/kitchen/Dashboard';
import KitchenOrders from '@/pages/kitchen/Orders';
import KitchenOrderDetail from '@/pages/kitchen/OrderDetail';

// Protected Route Component
function ProtectedRoute({
  children,
  requireAdmin = false,
  requireKitchen = false
}: {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireKitchen?: boolean;
}) {
  const { user, isAdmin, isKitchen, loading } = useAuth();

  if (loading) {
    return <PageLoader text="Authenticating..." />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (requireKitchen && !isKitchen) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

const AppContent = () => {
  const { user, loading, isKitchen } = useAuth();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isKitchenRoute = location.pathname.startsWith('/kitchen');

  if (loading) {
    return <PageLoader text="Loading Jabbrr Afghani..." />;
  }

  return (
    <ErrorBoundary>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <ScrollToTop />
          <Header isAdminRoute={isAdminRoute} isKitchenRoute={isKitchenRoute} />
          <Routes>
            {/* Public routes - Jabbrr Afghani Structure */}
            <Route path="/" element={<Index />} />
            {/* Renamed /products to /menu */}
            <Route path="/menu" element={<Products />} />
            {/* Renamed /product/:slug to /menu/:slug */}
            <Route path="/menu/:slug" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />

            {/* Legacy redirect for old links if needed, or just let them 404. 
                I'll keep them as redirects for safety during transition if needed, 
                but user asked to replace. I'll stick to strictly the new paths. */}
            <Route path="/products" element={<Navigate to="/menu" replace />} />

            {/* Auth routes */}
            <Route
              path="/auth"
              element={user ? <Navigate to={isKitchen ? "/kitchen" : "/"} replace /> : <Auth />}
            />

            {/* Checkout route - accessible to both guests and authenticated users */}
            <Route path="/checkout" element={<Checkout />} />

            {/* Protected routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-detail/:id"
              element={
                <ProtectedRoute>
                  <UserOrderDetail />
                </ProtectedRoute>
              }
            />

            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/add" element={<ProductForm />} />
              <Route path="products/edit/:id" element={<ProductForm isEdit={true} />} />
              <Route path="categories" element={<Categories />} />
              <Route path="categories/add" element={<CategoryForm />} />
              <Route path="categories/edit/:id" element={<CategoryForm isEdit={true} />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:id" element={<OrderDetail />} />
              <Route path="customers" element={<Customers />} />
              <Route path="coupons" element={<Coupons />} />
              <Route path="coupons/add" element={<CouponForm />} />
              <Route path="coupons/edit/:id" element={<CouponForm isEdit={true} />} />
              <Route path="coupons/assign" element={<CouponAssignment />} />
              <Route path="bestsellers" element={<BestSellers />} />
              <Route path="instagram-posts" element={<InstagramPosts />} />
              <Route path="testimonials" element={<Testimonials />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Kitchen Routes */}
            <Route
              path="/kitchen"
              element={
                <ProtectedRoute requireKitchen>
                  <KitchenLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<KitchenDashboard />} />
              <Route path="orders" element={<KitchenOrders />} />
              <Route path="orders/:id" element={<KitchenOrderDetail />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer isAdminRoute={isAdminRoute} isKitchenRoute={isKitchenRoute} />
          <CartSidebar isAdminRoute={isAdminRoute} isKitchenRoute={isKitchenRoute} />
          <FloatingWhatsApp />
          <Toaster />
          <Sonner />
        </div>
      </TooltipProvider>
    </ErrorBoundary>
  );
};

export default function App() {
  return <AppContent />;
}