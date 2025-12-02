import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Download, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng`);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`}>
      <Card className={cn('group overflow-hidden transition-all duration-300 hover:shadow-lg', className)}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            <Badge variant={product.type === 'digital' ? 'default' : 'secondary'} className="gap-1">
              {product.type === 'digital' ? (
                <>
                  <Download className="h-3 w-3" />
                  Digital
                </>
              ) : (
                <>
                  <Package className="h-3 w-3" />
                  Vật lý
                </>
              )}
            </Badge>
            {discount > 0 && (
              <Badge variant="destructive">-{discount}%</Badge>
            )}
          </div>

          {/* Quick Add Button */}
          <Button
            size="icon"
            className="absolute bottom-3 right-3 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>

        <CardContent className="p-4">
          <h3 className="mb-1 line-clamp-2 font-semibold text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
          
          <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>

          {/* Rating */}
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({product.reviews} đánh giá)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* File info for digital products */}
          {product.type === 'digital' && product.fileFormat && (
            <p className="mt-2 text-xs text-muted-foreground">
              {product.fileFormat} • {product.fileSize}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
