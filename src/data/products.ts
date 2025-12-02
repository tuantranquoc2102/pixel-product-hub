import { Product } from '@/types/product';

export const products: Product[] = [
  // Digital Products
  {
    id: 'd1',
    name: 'Premium UI Kit Collection',
    description: 'Bộ sưu tập 500+ thành phần UI chuyên nghiệp cho Figma và Sketch. Hoàn hảo cho dự án web và mobile.',
    price: 299000,
    originalPrice: 499000,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600',
    type: 'digital',
    category: 'design',
    rating: 4.9,
    reviews: 234,
    inStock: true,
    featured: true,
    fileSize: '2.5 GB',
    fileFormat: 'Figma, Sketch, XD'
  },
  {
    id: 'd2',
    name: 'Cinematic Sound Effects Pack',
    description: 'Hơn 1000 hiệu ứng âm thanh chất lượng cao cho phim, game và video. WAV 24-bit.',
    price: 199000,
    originalPrice: 349000,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600',
    type: 'digital',
    category: 'audio',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    featured: true,
    fileSize: '4.2 GB',
    fileFormat: 'WAV, MP3'
  },
  {
    id: 'd3',
    name: 'Stock Photo Bundle - Nature',
    description: 'Bộ 200 ảnh thiên nhiên độ phân giải cao, không cần ghi nguồn. Sử dụng thương mại.',
    price: 149000,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600',
    type: 'digital',
    category: 'image',
    rating: 4.7,
    reviews: 89,
    inStock: true,
    fileSize: '3.8 GB',
    fileFormat: 'JPG, RAW'
  },
  {
    id: 'd4',
    name: 'React Dashboard Template',
    description: 'Template dashboard React hiện đại với TypeScript, 50+ trang, responsive hoàn hảo.',
    price: 399000,
    originalPrice: 599000,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
    type: 'digital',
    category: 'template',
    rating: 4.9,
    reviews: 312,
    inStock: true,
    featured: true,
    fileSize: '150 MB',
    fileFormat: 'React, TypeScript'
  },
  {
    id: 'd5',
    name: 'Lo-Fi Music Collection',
    description: '50 bản nhạc Lo-Fi không bản quyền, hoàn hảo cho video YouTube và podcast.',
    price: 249000,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600',
    type: 'digital',
    category: 'audio',
    rating: 4.6,
    reviews: 78,
    inStock: true,
    fileSize: '1.2 GB',
    fileFormat: 'MP3, WAV'
  },
  {
    id: 'd6',
    name: 'Icon Pack - Business',
    description: 'Bộ 2000+ icon doanh nghiệp với nhiều style: line, solid, duotone. SVG & PNG.',
    price: 99000,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600',
    type: 'digital',
    category: 'design',
    rating: 4.8,
    reviews: 445,
    inStock: true,
    fileSize: '500 MB',
    fileFormat: 'SVG, PNG, AI'
  },
  // Physical Products
  {
    id: 'p1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Tai nghe không dây cao cấp với chống ồn chủ động, pin 40 giờ, âm thanh Hi-Fi.',
    price: 1299000,
    originalPrice: 1799000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    type: 'physical',
    category: 'electronics',
    rating: 4.7,
    reviews: 567,
    inStock: true,
    featured: true
  },
  {
    id: 'p2',
    name: 'Minimalist Leather Watch',
    description: 'Đồng hồ da thật phong cách tối giản, mặt kính Sapphire, chống nước 5ATM.',
    price: 899000,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600',
    type: 'physical',
    category: 'accessories',
    rating: 4.8,
    reviews: 234,
    inStock: true
  },
  {
    id: 'p3',
    name: 'Ergonomic Office Chair',
    description: 'Ghế văn phòng công thái học với tựa lưng điều chỉnh, đệm memory foam cao cấp.',
    price: 2499000,
    originalPrice: 3299000,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600',
    type: 'physical',
    category: 'home',
    rating: 4.6,
    reviews: 189,
    inStock: true,
    featured: true
  },
  {
    id: 'p4',
    name: 'Premium Cotton T-Shirt',
    description: 'Áo thun cotton 100% cao cấp, mềm mịn, thoáng khí. Nhiều màu sắc.',
    price: 299000,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
    type: 'physical',
    category: 'clothing',
    rating: 4.5,
    reviews: 892,
    inStock: true
  },
  {
    id: 'p5',
    name: 'Smart LED Desk Lamp',
    description: 'Đèn bàn LED thông minh với điều khiển cảm ứng, 5 chế độ sáng, sạc không dây.',
    price: 599000,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600',
    type: 'physical',
    category: 'electronics',
    rating: 4.7,
    reviews: 156,
    inStock: true
  },
  {
    id: 'p6',
    name: 'Canvas Laptop Backpack',
    description: 'Ba lô canvas chống nước, ngăn laptop 15.6", nhiều ngăn tiện lợi.',
    price: 449000,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
    type: 'physical',
    category: 'accessories',
    rating: 4.6,
    reviews: 423,
    inStock: true
  }
];

export const getFeaturedProducts = () => products.filter(p => p.featured);
export const getDigitalProducts = () => products.filter(p => p.type === 'digital');
export const getPhysicalProducts = () => products.filter(p => p.type === 'physical');
export const getProductById = (id: string) => products.find(p => p.id === id);
