export type Service = {
  id: number;
  title: string;
  kind: string;                 // coaching | formation | dossier | ...
  description: string | null;
  price: number | string | null;
  image_url: string | null;
  is_active: boolean;

  // Champs dérivés côté front pour ne pas casser ServiceCard
  category?: string;
  icon?: string;
  popular?: boolean;
  priceTag?: string | null;
};