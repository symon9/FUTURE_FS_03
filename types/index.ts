export interface Product {
  id: string;
  name: string;
  price: number;
  slug: string;
  images: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  imageSrc?: string;
}
