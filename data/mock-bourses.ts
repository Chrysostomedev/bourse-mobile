/**
 * Données factices pour développer les écrans "Bourses" sans back-end.
 * À remplacer plus tard par un appel réel dans services/bourses.ts
 * (ex: getBourses(), getBourseById(id)) qui retourne la même forme.
 */

export type Bourse = {
  id: string;
  title: string;
  organism: string;
  countryFlag: string;
  countryName: string;
  level: string; // niveau d'étude requis
  type: string; // type de bourse (excellence, mobilité, recherche...)
  fields: string[]; // filières concernées
  applicationStart: string; // ISO date — début de la période de candidature
  applicationEnd: string; // ISO date — fin de la période (= "deadline")
  conditions: string;
  advantages: string[];
  objective: string;
  additionalInfo?: string;
  link?: string;
  imageUri?: string;
};

export const mockBourses: Bourse[] = [
  {
    id: "1",
    title: "Bourse d'excellence Vanier",
    organism: "Gouvernement du Canada",
    countryFlag: "🇨🇦",
    countryName: "Canada",
    level: "Doctorat",
    type: "Excellence académique",
    fields: ["Sciences", "Ingénierie", "Sciences sociales"],
    applicationStart: "2026-08-01",
    applicationEnd: "2026-11-03",
    conditions:
      "Être inscrit ou admissible à un programme de doctorat dans une université canadienne désignée. Excellent dossier académique et potentiel de recherche démontré.",
    advantages: [
      "50 000 CAD par an pendant 3 ans",
      "Couverture des frais de scolarité",
      "Accès à un réseau de chercheurs internationaux",
    ],
    objective:
      "Attirer et retenir des doctorants de calibre mondial dans les universités canadiennes.",
    additionalInfo:
      "Le dossier doit être déposé via l'université d'accueil, pas directement auprès du gouvernement.",
    link: "https://vanier.gc.ca",
  },
  {
    id: "2",
    title: "Bourse Eiffel Excellence",
    organism: "Ministère de l'Europe et des Affaires étrangères",
    countryFlag: "🇫🇷",
    countryName: "France",
    level: "Master",
    type: "Mobilité internationale",
    fields: ["Droit", "Économie", "Sciences politiques"],
    applicationStart: "2026-09-15",
    applicationEnd: "2026-12-10",
    conditions:
      "Avoir moins de 30 ans, être ressortissant d'un pays hors France, être proposé par un établissement français partenaire.",
    advantages: [
      "1 181 € par mois pour un Master",
      "Prise en charge de la couverture sociale",
      "Un aller-retour international",
    ],
    objective:
      "Former les futurs décideurs étrangers dans les établissements d'enseignement supérieur français.",
    link: "https://www.campusfrance.org/fr/eiffel",
  },
  {
    id: "3",
    title: "Chevening Scholarship",
    organism: "Foreign, Commonwealth & Development Office",
    countryFlag: "🇬🇧",
    countryName: "Royaume-Uni",
    level: "Master",
    type: "Leadership",
    fields: ["Toutes filières"],
    applicationStart: "2026-08-03",
    applicationEnd: "2026-11-05",
    conditions:
      "Minimum 2 ans d'expérience professionnelle, diplôme de licence, revenir dans son pays d'origine après les études.",
    advantages: [
      "Frais de scolarité couverts",
      "Allocation mensuelle de subsistance",
      "Billets d'avion aller-retour",
    ],
    objective:
      "Développer un réseau mondial de leaders formés au Royaume-Uni.",
    additionalInfo: "Candidature 100 % en ligne, essais rédigés en anglais.",
    link: "https://www.chevening.org",
  },
  {
    id: "4",
    title: "DAAD EPOS",
    organism: "Office allemand d'échanges universitaires",
    countryFlag: "🇩🇪",
    countryName: "Allemagne",
    level: "Master",
    type: "Coopération au développement",
    fields: ["Ingénierie", "Agronomie", "Sciences de l'environnement"],
    applicationStart: "2026-07-20",
    applicationEnd: "2026-10-31",
    conditions:
      "Diplôme de premier cycle avec mention, moins de 6 ans d'expérience professionnelle après le diplôme.",
    advantages: [
      "934 € par mois",
      "Assurance santé et voyage",
      "Cours d'allemand pris en charge",
    ],
    objective:
      "Former des cadres qualifiés destinés à contribuer au développement de leur pays d'origine.",
    link: "https://www.daad.de",
  },
];

export function getBourseById(id: string): Bourse | undefined {
  return mockBourses.find((bourse) => bourse.id === id);
}