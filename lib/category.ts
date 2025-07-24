export const CATEGORY_HIERARCHY: Record<string, string[]> = {
  'Vid\u00e9o analogique': ['Cam\u00e9ras PTZ', 'Cam\u00e9ras fixes', 'DVR'],
  'Vid\u00e9o IP': [
    'Cam\u00e9ras PTZ',
    'Cam\u00e9ras fixes',
    'NVR',
    'Switches PoE',
    'Stockage IP SAN/NAS',
  ],
  'Hybride/HCVR': ['DVR Hybride'],
  "Contr\u00f4le d\u2019acc\u00e8s & Interphonie": [
    'Interphonie vid\u00e9o',
    'Door station',
    'Indoor station',
    'Contr\u00f4leurs & lecteurs',
  ],
  'Alarme intrusion': [
    'Centrales',
    'D\u00e9tecteurs / contacts / sir\u00e8nes',
    'P\u00e9riph\u00e9riques',
  ],
  'Affichage & mur d\u2019images': ['Moniteurs', 'D\u00e9coders / contr\u00f4leurs'],
  'Autres sp\u00e9cialisations': [
    'Mobile / Bodycam',
    'Traffic / radar',
    'Thermique',
  ],
  'Accessoires g\u00e9n\u00e9raux': [
    'C\u00e2bles & connectique',
    'Disques durs',
    'Supports & bo\u00eetiers',
  ],
};

export const MAIN_CATEGORIES = [
  'Vid\u00e9o analogique',
  'Vid\u00e9o IP',
  'Hybride/HCVR',
  "Contr\u00f4le d\u2019acc\u00e8s & Interphonie",
  'Alarme intrusion',
  'Affichage & mur d\u2019images',
  'Autres sp\u00e9cialisations',
  'Accessoires g\u00e9n\u00e9raux',
  'Non class\u00e9',
];

export function mapCategory(raw?: string): string {
  if (!raw) return 'Non class\u00e9';
  const normalized = raw.toLowerCase();
  for (const [main, subs] of Object.entries(CATEGORY_HIERARCHY)) {
    if (normalized.includes(main.toLowerCase())) {
      return main;
    }
    if (subs.some((sub) => normalized.includes(sub.toLowerCase()))) {
      return main;
    }
  }
  return 'Non class\u00e9';
}
