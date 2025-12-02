import { Link } from 'react-router-dom';
import { ArrowRight, Download, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBanner from '@/assets/hero-banner.jpg';

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="DigiMart Hero Banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto px-4 py-20 md:py-32">
        <div className="max-w-2xl">
          <span className="mb-4 inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary-foreground">
            🎉 Giảm giá đến 40% cho sản phẩm Digital
          </span>
          
          <h1 className="mb-6 text-4xl font-bold leading-tight text-secondary-foreground md:text-5xl lg:text-6xl">
            Mua sắm thông minh,{' '}
            <span className="text-primary">Sáng tạo không giới hạn</span>
          </h1>
          
          <p className="mb-8 text-lg text-secondary-foreground/80 md:text-xl">
            Khám phá bộ sưu tập sản phẩm vật lý cao cấp và tài nguyên digital độc đáo. 
            Từ thiết kế đến âm thanh, từ đồ gia dụng đến công nghệ.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/products?type=digital">
              <Button size="lg" className="gap-2">
                <Download className="h-5 w-5" />
                Sản phẩm Digital
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/products?type=physical">
              <Button size="lg" variant="outline" className="gap-2 border-secondary-foreground/20 bg-secondary-foreground/10 text-secondary-foreground hover:bg-secondary-foreground/20">
                <Package className="h-5 w-5" />
                Sản phẩm Vật lý
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 flex gap-8">
            <div>
              <p className="text-3xl font-bold text-secondary-foreground">10K+</p>
              <p className="text-sm text-secondary-foreground/70">Sản phẩm</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-secondary-foreground">50K+</p>
              <p className="text-sm text-secondary-foreground/70">Khách hàng</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-secondary-foreground">99%</p>
              <p className="text-sm text-secondary-foreground/70">Hài lòng</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
