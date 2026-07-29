const normalizeCategory = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export const CATEGORY_HIERARCHY: Record<string, string[]> = {
  Accessoires: ['Accessoires', 'Kits & accessoires', 'Périphériques'],
  'Accessoires generaux': [
    'Accessoires divers',
    'Alimentation & UPS',
    'Cables & connectique',
    'Supports & boitiers',
  ],
  'Affichage & mur d’images': [
    'Moniteurs / video-wall / LED',
    'Decoders / controleurs mur',
  ],
  'Alarme intrusion': [
    'AX PRO & peripheriques',
    'Centrales',
    'Detecteurs / contacts / sirenes',
    'Peripheriques',
  ],
  'Controle d’acces': [
    'Badges & cartes',
    'Controleurs & modules',
    'Portillons & tourniquets',
    'Serrures & ventouses',
    'Temps de presence',
    'Terminaux autonomes',
  ],
  Enregistreurs: ['DVR analogiques', 'NVR IP'],
  Interphonie: ['Moniteurs interieurs', 'Platines de rue & doorbells'],
  'Reseau & transmission': [
    'Cables reseau',
    'Cables & transmission',
    'Equipements reseau',
    'Switches PoE',
  ],
  Stockage: ['Disques durs', 'Serveurs de stockage'],
  'Trafic / Parking': ['Gestion d’acces vehicules', 'Reconnaissance de plaques'],
  'Videosurveillance IP': ['Cameras IP', 'Cameras PTZ', 'Kits video'],
  'Videosurveillance analogique': ['Cameras analogiques', 'DVR analogiques'],
  'Videosurveillance specialisee': ['Cameras panoramiques', 'Cameras thermiques'],
};

export const MAIN_CATEGORIES = [
  'Accessoires',
  'Accessoires generaux',
  'Affichage & mur d’images',
  'Alarme intrusion',
  'Controle d’acces',
  'Enregistreurs',
  'Interphonie',
  'Reseau & transmission',
  'Stockage',
  'Trafic / Parking',
  'Videosurveillance IP',
  'Videosurveillance analogique',
  'Videosurveillance specialisee',
  'Non classé',
];

/** Intro éditoriale FR unique par catégorie (pages /products/categories/[slug]). */
export const CATEGORY_INTROS: Record<string, string> = {
  Accessoires:
    "Kits, périphériques et accessoires indispensables pour compléter votre installation de sécurité électronique. Chaque référence est vérifiée par nos techniciens pour garantir sa compatibilité avec votre matériel existant.",
  'Accessoires generaux':
    "Alimentations, onduleurs, câbles, connectique, supports et boîtiers : les fondations discrètes d'une installation fiable. Du matériel sélectionné pour durer sous le climat ivoirien.",
  'Affichage & mur d’images':
    "Moniteurs professionnels, murs d'images LED et décodeurs pour vos salles de supervision. Des solutions d'affichage adaptées aux PC de sécurité, commissariats et centres de contrôle à Abidjan.",
  'Alarme intrusion':
    "Centrales AX PRO, détecteurs, contacts et sirènes Hikvision pour protéger vos locaux contre l'intrusion. Installation et télésurveillance assurées par nos équipes partout en Côte d'Ivoire.",
  'Controle d’acces':
    "Badges, terminaux biométriques, portillons, serrures et ventouses électromagnétiques : maîtrisez qui entre et qui sort de vos bâtiments. Solutions de pointage et temps de présence incluses.",
  Enregistreurs:
    "Enregistreurs NVR IP et DVR analogiques pour stocker et relire vos flux de vidéosurveillance. Dimensionnement du stockage et configuration réseau réalisés par nos techniciens certifiés.",
  Interphonie:
    "Visiophones, platines de rue et moniteurs intérieurs pour sécuriser l'accueil de vos résidences et bureaux. Compatible avec les écosystèmes Hikvision existants.",
  'Reseau & transmission':
    "Switches PoE, câbles réseau et équipements de transmission pour relier vos caméras et terminaux. L'infrastructure réseau qui fait tenir votre système de sécurité au quotidien.",
  Stockage:
    "Disques durs spécialisés vidéosurveillance et serveurs de stockage pour conserver vos enregistrements en toute fiabilité, avec les capacités adaptées à votre durée de rétention.",
  'Trafic / Parking':
    "Barrières, gestion d'accès véhicules et reconnaissance de plaques d'immatriculation pour vos parkings et sites logistiques en Côte d'Ivoire.",
  'Videosurveillance IP':
    "Caméras IP fixes, PTZ et kits vidéo Hikvision : l'image haute définition et l'intelligence embarquée pour surveiller vos sites à distance depuis votre téléphone.",
  'Videosurveillance analogique':
    "Caméras analogiques HD et DVR : la solution économique et robuste pour moderniser une installation coaxiale existante sans tout recâbler.",
  'Videosurveillance specialisee':
    "Caméras panoramiques et thermiques pour les besoins avancés : périmètres sensibles, détection d'intrusion nocturne, sites industriels et zones à risque.",
};

export function mapCategory(raw?: string): string {
  if (!raw) return 'Non classé';
  const normalized = normalizeCategory(raw);
  for (const [main, subs] of Object.entries(CATEGORY_HIERARCHY)) {
    const normalizedMain = normalizeCategory(main);
    if (normalized.includes(normalizedMain)) {
      return main;
    }
    if (subs.some((sub) => normalized.includes(normalizeCategory(sub)))) {
      return main;
    }
  }
  return 'Non classé';
}

type ProductCategoryFields = {
  categ_id?: string;
  category_main?: string;
  category_sub?: string;
  category_type?: string;
};

export function mapProductCategory(product?: ProductCategoryFields): string {
  if (!product) return 'Non classé';
  const raw =
    product.category_main ||
    product.category_sub ||
    product.category_type ||
    product.categ_id;

  return mapCategory(raw);
}
