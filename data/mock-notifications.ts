export type AppNotification = {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  type: "info" | "success" | "alert";
  isRead: boolean;
};

export const mockNotifications: AppNotification[] = [
  {
    id: "n1",
    title: "Nouvelle bourse disponible !",
    message: "La bourse Eiffel Excellence de niveau Master vient d'ouvrir ses candidatures.",
    timeAgo: "Il y a 10 min",
    type: "success",
    isRead: false,
  },
  {
    id: "n2",
    title: "Rappel de clôture ⚠️",
    message: "Plus que 3 jours pour postuler à la bourse Vanier de niveau Doctorat.",
    timeAgo: "Il y a 2 heures",
    type: "alert",
    isRead: false,
  },
  {
    id: "n3",
    title: "Commentaire sur ton post",
    message: "Aminata Sy a répondu à ton post dans l'onglet Communauté.",
    timeAgo: "Il y a 5 heures",
    type: "info",
    isRead: false,
  },
  {
    id: "n4",
    title: "Profil vérifié",
    message: "Félicitations, les informations de ton profil ont été validées.",
    timeAgo: "Il y a 1 jour",
    type: "success",
    isRead: false,
  },
];
