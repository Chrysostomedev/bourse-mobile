export type Post = {
  id: string;
  authorName: string;
  authorAvatarUri?: string;
  isVerified: boolean;
  timeAgo: string;
  content: string;
  imageUri?: any;
  videoUri?: any;
  likeCount: number;
  commentCount: number;
  comments?: Comment[];
};

export type Comment = {
  id: string;
  authorName: string;
  content: string;
  timeAgo: string;
  likeCount: number;
};
export const mockPosts: Post[] = [
  {
    id: "p1",
    authorName: "Kader Touré",
    isVerified: false,
    timeAgo: "Il y a 2 heures",
    content:
      "Bonjour à tous 👋🏾. Je prépare actuellement mon dossier pour une bourse d'études au Canada. Est-ce que certains d'entre vous ont déjà obtenu une lettre d'acceptation avant de déposer leur candidature ? Merci pour vos conseils 🙏🏾",
    videoUri: require("@/assets/videos/demo-ivoiredestock.mp4"),
    likeCount: 18,
    commentCount: 4,
    comments: [
      {
        id: "c1",
        authorName: "Aminata Sy",
        content:
          "Oui, certaines universités demandent une admission préalable. Vérifie les conditions de la bourse.",
        timeAgo: "1h",
        likeCount: 6,
      },
      {
        id: "c2",
        authorName: "Jean Kouassi",
        content:
          "Dans mon cas j'avais reçu une admission conditionnelle avant de déposer mon dossier.",
        timeAgo: "45 min",
        likeCount: 3,
      },
      {
        id: "c3",
        authorName: "Mariam Diallo",
        content:
          "Le plus simple est de consulter directement le site officiel du programme.",
        timeAgo: "20 min",
        likeCount: 2,
      },
      {
        id: "c4",
        authorName: "Kader Touré",
        content: "Merci beaucoup pour vos retours 🙌",
        timeAgo: "10 min",
        likeCount: 1,
      },
    ],
  },

  {
    id: "p2",
    authorName: "Campus France",
    isVerified: true,
    timeAgo: "Il y a 4 heures",
    content:
      "📢 Les candidatures pour plusieurs programmes de mobilité internationale sont ouvertes. Pensez à préparer vos relevés de notes, lettres de recommandation et certificats de langue afin d'éviter toute mauvaise surprise.",
    imageUri: require("@/assets/img/bourse (5).jpg"),
    likeCount: 154,
    commentCount: 18,
  },

  {
    id: "p3",
    authorName: "Sarah Koné",
    isVerified: false,
    timeAgo: "Hier",
    content:
      "Je viens enfin de recevoir une réponse positive 🎉. Après plusieurs mois de préparation, je suis admise dans une université en Belgique avec une bourse partielle. Merci à toute la communauté pour les conseils ! ❤️",
    likeCount: 327,
    commentCount: 42,
  },

  {
    id: "p4",
    authorName: "Bourse Pour Tous",
    isVerified: true,
    timeAgo: "Hier",
    content:
      "💡 Astuce du jour : une lettre de motivation efficace doit être personnalisée. Évitez les modèles copiés-collés et mettez en avant votre projet académique et professionnel.",
    imageUri: require("@/assets/img/bourse (4).jpg"),
    likeCount: 96,
    commentCount: 14,
  },

  {
    id: "p5",
    authorName: "Fatou Ndiaye",
    isVerified: false,
    timeAgo: "Il y a 2 jours",
    content:
      "Qui parmi vous a déjà passé un entretien de sélection pour une bourse ? Quels types de questions reviennent le plus souvent ? 🤔",
    imageUri: require("@/assets/img/bourse (3).jpg"),
    likeCount: 73,
    commentCount: 21,
  },

  {
    id: "p6",
    authorName: "Agence Universitaire",
    isVerified: true,
    timeAgo: "Il y a 3 jours",
    content:
      "🌍 Plusieurs opportunités de financement sont actuellement disponibles pour des Masters en Europe, en Asie et en Amérique du Nord. Consultez régulièrement les dates limites afin de ne manquer aucune opportunité.",
    imageUri: require("@/assets/img/bourse (2).jpg"),
    likeCount: 205,
    commentCount: 28,
  },

  {
    id: "p7",
    authorName: "Mohamed Traoré",
    isVerified: false,
    timeAgo: "Cette semaine",
    content:
      "Après deux refus l'année dernière, je viens d'obtenir ma première bourse d'études 🇩🇪. Ne baissez jamais les bras, améliorez vos dossiers et continuez à postuler. Ça finit par payer 💜",
    imageUri: require("@/assets/img/bourse (1).jpg"),
    likeCount: 411,
    commentCount: 63,
  },
];
export function getPostById(id: string): Post | undefined {
  return mockPosts.find(p => p.id === id);
}
