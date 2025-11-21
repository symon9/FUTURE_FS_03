import { Category } from "@/types";

export interface CategoryWithMedia extends Category {
  videoSrc: string;
}

export const mainCategories: CategoryWithMedia[] = [
  {
    id: "cat-1",
    name: "Ready to Wear",
    slug: "ready-to-wear",
    imageSrc: "https://drive.google.com/uc?id=1jdhtIcQsaQ7FXUa0QGpQ4bmElV_MpwV6",
    videoSrc: "/ready-to-wear.mp4",
  },
  {
    id: "cat-2",
    name: "Shoes",
    slug: "shoes",
    imageSrc: "https://drive.google.com/uc?id=1UkV6Xx0goLOqAHhEAa_dLYQ0_UJsLjRP",
    videoSrc: "/shoes.mp4",
  },
  {
    id: "cat-3",
    name: "Bags",
    slug: "bags",
    imageSrc: "https://drive.google.com/uc?id=1pJz8YnNk8OQRk3q2Hk3I9ILtkGQtCLoX",
    videoSrc: "/bags.mp4",
  },
  {
    id: "cat-4",
    name: "Accessories",
    slug: "accessories",
    imageSrc: "https://drive.google.com/uc?id=1QQfBdUiFex9iF3m7Ip8ceEDEh613CVmz",
    videoSrc: "/accessories.mp4",
  },
];
