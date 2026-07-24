export type Service = {
  id: string;
  category: 'coaching' | 'formation' | 'ebook' | 'produit';
  title: string;
  description: string;
  price: string;
  priceTag?: string;
  icon: string;
  popular?: boolean;
};

export const mockServices: Service[] = [
  {
    id: "s1",
    category: "coaching",
    title: "Coaching Dossier Béton",
    description: "Revue complète de ton dossier de candidature par un expert.",
    price: "25 000 FCFA",
    icon: "briefcase",
    popular: true
  },
  {
    id: "s2",
    category: "formation",
    title: "Réussir son entretien de bourse",
    description: "Formation vidéo + simulation d'entretien en visio.",
    price: "15 000 FCFA",
    icon: "video"
  },
  {
    id: "s3",
    category: "ebook",
    title: "Guide Ultime des Bourses",
    description: "Plus de 100 opportunités détaillées pour l'année 2026.",
    price: "5 000 FCFA",
    priceTag: "Promo",
    icon: "book"
  },
  {
    id: "s4",
    category: "produit",
    title: "Pack Modèles CV & Lettres",
    description: "10 templates premium pour te démarquer.",
    price: "3 000 FCFA",
    icon: "document"
  }
];

export function getServiceById(id: string): Service | undefined {
  return mockServices.find((s) => s.id === id);
}
