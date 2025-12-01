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
