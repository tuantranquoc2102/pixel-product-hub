import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import Categories from '@/components/home/Categories';
import Features from '@/components/home/Features';
import ProductGrid from '@/components/products/ProductGrid';
import { getFeaturedProducts, getDigitalProducts, getPhysicalProducts } from '@/data/products';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const digitalProducts = getDigitalProducts().slice(0, 4);
  const physicalProducts = getPhysicalProducts().slice(0, 4);

  return (
    <Layout>
      <Hero />
      <Features />
      <Categories />
      
      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <ProductGrid 
          products={featuredProducts} 
          title="Sản phẩm nổi bật"
          subtitle="Những sản phẩm được yêu thích nhất"
        />
      </section>

      {/* Digital Products */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <ProductGrid 
            products={digitalProducts} 
            title="Sản phẩm Digital"
            subtitle="Tài nguyên sáng tạo chất lượng cao"
          />
        </div>
      </section>

      {/* Physical Products */}
      <section className="container mx-auto px-4 py-16">
        <ProductGrid 
          products={physicalProducts} 
          title="Sản phẩm Vật lý"
          subtitle="Hàng hóa cao cấp, giao hàng tận nơi"
        />
      </section>
    </Layout>
  );
};

export default Index;
