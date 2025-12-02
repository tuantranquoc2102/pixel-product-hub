import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { 
  ShoppingCart, 
  Star, 
  Download, 
  Package, 
  Check, 
  ArrowLeft,
  Heart,
  Share2,
  Shield,
  Truck,
  RefreshCcw
} from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const { addItem } = useCart();

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold">Không tìm thấy sản phẩm</h1>
          <Link to="/products">
            <Button>Quay lại danh sách sản phẩm</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng`);
  };

  const relatedProducts = products
    .filter(p => p.type === product.type && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link 
          to="/products" 
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại danh sách sản phẩm
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl bg-card">
              <img 
                src={product.image} 
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {discount > 0 && (
              <Badge variant="destructive" className="absolute left-4 top-4 text-lg">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Details */}
          <div>
            <Badge variant={product.type === 'digital' ? 'default' : 'secondary'} className="mb-4 gap-1">
              {product.type === 'digital' ? (
                <>
                  <Download className="h-3 w-3" />
                  Sản phẩm Digital
                </>
              ) : (
                <>
                  <Package className="h-3 w-3" />
                  Sản phẩm Vật lý
                </>
              )}
            </Badge>

            <h1 className="mb-4 text-3xl font-bold text-foreground">{product.name}</h1>

            {/* Rating */}
            <div className="mb-4 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-border'}`}
                  />
                ))}
              </div>
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews} đánh giá)</span>
            </div>

            {/* Price */}
            <div className="mb-6 flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <Separator className="my-6" />

            {/* Description */}
            <p className="mb-6 text-muted-foreground">{product.description}</p>

            {/* Digital Product Info */}
            {product.type === 'digital' && (
              <Card className="mb-6">
                <CardContent className="grid grid-cols-2 gap-4 p-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Định dạng</p>
                    <p className="font-medium">{product.fileFormat}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Dung lượng</p>
                    <p className="font-medium">{product.fileSize}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Stock Status */}
            <div className="mb-6 flex items-center gap-2">
              {product.inStock ? (
                <>
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="font-medium text-green-500">Còn hàng</span>
                </>
              ) : (
                <span className="font-medium text-destructive">Hết hàng</span>
              )}
            </div>

            {/* Actions */}
            <div className="mb-8 flex gap-3">
              <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5" />
                Thêm vào giỏ hàng
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-lg bg-card p-3">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">Thanh toán an toàn</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-card p-3">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm">Giao hàng nhanh</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-card p-3">
                <RefreshCcw className="h-5 w-5 text-primary" />
                <span className="text-sm">Hoàn tiền 30 ngày</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-8 text-2xl font-bold text-foreground">Sản phẩm liên quan</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
