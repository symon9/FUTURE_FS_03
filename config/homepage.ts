/**
 * @file homepage.ts
 * @description This file contains the configuration data for the homepage sections.
 * It's the single source of truth for content like the horizontal gallery scenes.
 */

interface Scene {
  id: string;
  text: string;
  imageSrc: string;
  imageAlt: string;
  layout: "text-left" | "text-right";
}

export const galleryScenes: Scene[] = [
  {
    id: "scene-1",
    text: "Spring Summer Lookbook 2024",
    imageSrc: "https://drive.google.com/uc?id=1FFC3uvx4jQd-D1EDpQ853kGiaHe5l-XY",
    imageAlt: "A model showcasing the Spring Summer collection",
    layout: "text-left",
  },
  {
    id: "scene-2",
    text: "Fall Winter Lookbook 2024",
    imageSrc: "https://drive.google.com/uc?id=18l0NZ84fu-foUHlvuPFugH3aX44QOqtU",
    imageAlt: "A model showcasing the Fall Winter collection",
    layout: "text-left",
  },
  {
    id: "scene-3",
    text: "Exclusive Runway Archive",
    imageSrc: "https://drive.google.com/uc?id=1aVqwJdLVqyr1zzCApqfHMycmBFD93hod",
    imageAlt: "A high-fashion archival runway moment",
    layout: "text-left",
  },
];
