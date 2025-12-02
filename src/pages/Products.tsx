import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductType } from '@/types/product';
import { Filter, SortAsc } from 'lucide-react';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('featured');

  const typeFilter = searchParams.get('type') as ProductType | null;
  const categoryFilter = searchParams.get('category');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (typeFilter) {
      result = result.filter(p => p.type === typeFilter);
    }

    if (categoryFilter) {
      result = result.filter(p => p.category === categoryFilter);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.reverse();
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [typeFilter, categoryFilter, sortBy]);

  const clearFilters = () => {
    setSearchParams({});
  };

  const setTypeFilter = (type: string) => {
    if (type === 'all') {
      searchParams.delete('type');
    } else {
      searchParams.set('type', type);
    }
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  const getTitle = () => {
    if (typeFilter === 'digital') return 'Sản phẩm Digital';
    if (typeFilter === 'physical') return 'Sản phẩm Vật lý';
    if (categoryFilter) return `Danh mục: ${categoryFilter}`;
    return 'Tất cả sản phẩm';
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">{getTitle()}</h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} sản phẩm được tìm thấy
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Lọc:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={!typeFilter ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTypeFilter('all')}
            >
              Tất cả
            </Button>
            <Button
              variant={typeFilter === 'digital' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTypeFilter('digital')}
            >
              Digital
            </Button>
            <Button
              variant={typeFilter === 'physical' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTypeFilter('physical')}
            >
              Vật lý
            </Button>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <SortAsc className="h-4 w-4 text-muted-foreground" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sắp xếp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Nổi bật</SelectItem>
                <SelectItem value="newest">Mới nhất</SelectItem>
                <SelectItem value="price-low">Giá thấp đến cao</SelectItem>
                <SelectItem value="price-high">Giá cao đến thấp</SelectItem>
                <SelectItem value="rating">Đánh giá cao</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(typeFilter || categoryFilter) && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Xóa bộ lọc
            </Button>
          )}
        </div>

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} />
      </div>
    </Layout>
  );
};

export default Products;
