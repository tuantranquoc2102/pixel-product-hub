export type ProductType = 'physical' | 'digital';

export type DigitalCategory = 'design' | 'audio' | 'image' | 'video' | 'template';
export type PhysicalCategory = 'electronics' | 'clothing' | 'accessories' | 'home' | 'other';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  type: ProductType;
  category: DigitalCategory | PhysicalCategory;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
  downloadUrl?: string;
  fileSize?: string;
  fileFormat?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
