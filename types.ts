
export interface Service {
  id: string;
  title: string;
  description: string;
  benefit: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  text: string;
  avatar: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  label: string;
}
