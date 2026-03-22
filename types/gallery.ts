export const GalleryCategory = {
  CORPORATE: 'CORPORATE',
  WEDDING: 'WEDDING',
  BIRTHDAY: 'BIRTHDAY',
  CONCERT: 'CONCERT',
  PRIVATE: 'PRIVATE',
  GALA: 'GALA',
  BEHIND_SCENES: 'BEHIND_SCENES',
} as const;

export type GalleryCategory = (typeof GalleryCategory)[keyof typeof GalleryCategory];

export interface GalleryItem {
  id: number;
  filename: string;
  altText: string;
  caption: string | null;
  category: GalleryCategory;
  featured: boolean;
  sortOrder: number;
  width: number | null;
  height: number | null;
  blurDataUrl: string | null;
  createdAt: Date;
  eventId: number | null;
}
