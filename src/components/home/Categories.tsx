import { Link } from 'react-router-dom';
import { 
  Palette, 
  Music, 
  Image, 
  Code, 
  Headphones, 
  Watch, 
  Shirt, 
  Home 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
  { 
    icon: Palette, 
    label: 'Thiết kế', 
    href: '/products?category=design',
    color: 'bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-400'
  },
  { 
    icon: Music, 
    label: 'Âm thanh', 
    href: '/products?category=audio',
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400'
  },
  { 
    icon: Image, 
    label: 'Hình ảnh', 
    href: '/products?category=image',
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
  },
  { 
    icon: Code, 
    label: 'Template', 
    href: '/products?category=template',
    color: 'bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400'
  },
  { 
    icon: Headphones, 
    label: 'Điện tử', 
    href: '/products?category=electronics',
    color: 'bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400'
  },
  { 
    icon: Watch, 
    label: 'Phụ kiện', 
    href: '/products?category=accessories',
    color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400'
  },
  { 
    icon: Shirt, 
    label: 'Thời trang', 
    href: '/products?category=clothing',
    color: 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400'
  },
  { 
    icon: Home, 
    label: 'Gia dụng', 
    href: '/products?category=home',
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
  },
];

const Categories = () => {
  return (
    <section className="bg-card py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-foreground">Danh mục sản phẩm</h2>
          <p className="text-muted-foreground">Khám phá theo nhu cầu của bạn</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((category) => (
            <Link key={category.label} to={category.href}>
              <Card className="group cursor-pointer transition-all duration-300 hover:shadow-md">
                <CardContent className="flex flex-col items-center p-4">
                  <div className={`mb-3 rounded-xl p-3 transition-transform duration-300 group-hover:scale-110 ${category.color}`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <span className="text-center text-sm font-medium text-foreground">
                    {category.label}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
