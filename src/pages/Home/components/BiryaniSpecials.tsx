import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Utensils, ArrowRight } from 'lucide-react';
import ProductCard from '../../../components/ProductCard';
import QuickViewModal from '../../../components/QuickViewModal';
import { supabase } from '@/integrations/supabase/client';

const BiryaniSpecials = () => {
  const navigate = useNavigate();
  const [biryaniProducts, setBiryaniProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  useEffect(() => {
    fetchBiryaniProducts();
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [autoScroll, setAutoScroll] = useState(true);
  const [lastManualAction, setLastManualAction] = useState(0);

  useEffect(() => {
    if (biryaniProducts.length > itemsPerView && autoScroll) {
      const interval = setInterval(() => {
        if (Date.now() - lastManualAction < 10000) return;

        setCurrentIndex(prev => {
          const maxIndex = biryaniProducts.length - itemsPerView;
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [biryaniProducts, itemsPerView, autoScroll, lastManualAction]);

  const handleResize = () => {
    if (window.innerWidth < 640) setItemsPerView(1.2);
    else if (window.innerWidth < 1024) setItemsPerView(2.5);
    else setItemsPerView(4);
  };

  const fetchBiryaniProducts = async () => {
    try {
      // First try to find 'Biryani' category
      let { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .ilike('name', 'biryani')
        .single();

      // Fallback if 'biryani' not found, maybe just fetch some main course
      if (categoryError || !categoryData) {
        const { data: mainCourseData } = await supabase
          .from('categories')
          .select('id')
          .ilike('name', '%main course%')
          .single();
        categoryData = mainCourseData;
      }

      if (!categoryData) {
        setLoading(false);
        return;
      }

      const result = await supabase
        .from('products')
        .select('*')
        .eq('category_id', categoryData.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(12);

      if (result.error) throw result.error;

      setBiryaniProducts(result.data || []);
    } catch (error) {
      console.error('Error fetching Biryani products:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    if (currentIndex < biryaniProducts.length - itemsPerView) {
      setCurrentIndex(currentIndex + 1);
      setLastManualAction(Date.now());
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setLastManualAction(Date.now());
    }
  };

  const canGoNext = currentIndex < biryaniProducts.length - Math.floor(itemsPerView);
  const canGoPrev = currentIndex > 0;

  const handleQuickView = (product: any) => {
    setQuickViewProduct({
      ...product,
      image: product.images?.[0] || '/placeholder.svg',
      slug: product.sku || product.id
    });
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const handleViewDetail = (product: any) => {
    const slug = product.sku || product.id;
    navigate(`/menu/${slug}`);
  };

  return (
    <section className="py-12 md:py-16 bg-background relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 relative z-10">

        <div className="flex flex-col items-center justify-center text-center mb-8 gap-4 border-b border-border pb-4 relative">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-primary mb-2 block font-medium">AUTHENTIC FLAVORS</span>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-foreground uppercase font-instrument font-normal tracking-wide">
              SIGNATURE BIRYANIS
            </h2>
          </div>

          {!loading && biryaniProducts.length > itemsPerView && (
            <div className="flex items-center space-x-4 mt-4 md:absolute md:right-0 md:bottom-6 md:mt-0">
              <button
                onClick={prevSlide}
                disabled={!canGoPrev}
                className={`w-12 h-12 flex items-center justify-center border border-border transition-all duration-300 rounded-full ${canGoPrev
                  ? 'bg-transparent text-foreground hover:bg-primary hover:text-white hover:border-primary'
                  : 'bg-transparent text-muted-foreground cursor-not-allowed'
                  }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                disabled={!canGoNext}
                className={`w-12 h-12 flex items-center justify-center border border-border transition-all duration-300 rounded-full ${canGoNext
                  ? 'bg-transparent text-foreground hover:bg-primary hover:text-white hover:border-primary'
                  : 'bg-transparent text-muted-foreground cursor-not-allowed'
                  }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-muted/20 aspect-[4/5] w-full mb-4"></div>
                  <div className="h-4 bg-muted/20 w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted/20 w-1/2"></div>
                </div>
              ))}
            </div>
          ) : biryaniProducts.length > 0 ? (
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                }}
              >
                {biryaniProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 px-2 md:px-4"
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                    <ProductCard
                      product={{
                        ...product,
                        image: product.images?.[0] || '/placeholder.svg',
                        slug: product.sku || product.id
                      }}
                      onQuickView={(product) => handleQuickView(product)}
                      onViewDetail={() => handleViewDetail(product)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 border border-border p-8">
              <Utensils className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-instrument font-normal text-foreground mb-2">No biryani available</h3>
              <p className="text-muted-foreground font-light">Authentic biryanis are being prepared.</p>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/menu?category=Biryani')}
            className="group inline-flex items-center gap-3 bg-primary text-white px-10 py-4 text-xs font-instrument font-normal uppercase tracking-[0.2em] hover:bg-primary/90 transition-all duration-300"
          >
            View All Biryanis <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {isQuickViewOpen && quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={isQuickViewOpen}
          onClose={closeQuickView}
        />
      )}
    </section>
  );
};

export default BiryaniSpecials;