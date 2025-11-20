export interface Product {
  id: string;
  name: string;
  price: number;
  slug: string;
  category: string;
  images: string[];
  description: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  imageSrc?: string;
}
