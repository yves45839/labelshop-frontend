/** Pages locales SEO : /solutions/[slug] — contenu FR unique ciblant les recherches ivoiriennes. */

export type Solution = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  /** Catégorie produit associée (nom exact de MAIN_CATEGORIES) */
  productCategory?: string;
  /** Slug de formation associée */
  formationSlug?: string;
  /** Catégorie d'articles de blog associée */
  blogCategory?: string;
};

export const SOLUTIONS: Solution[] = [
  {
    slug: 'videosurveillance-abidjan',
    title: 'Vidéosurveillance à Abidjan',
    metaTitle: "Vidéosurveillance à Abidjan — installation caméras Hikvision",
    metaDescription:
      "Installation de caméras de vidéosurveillance Hikvision à Abidjan : étude, pose, configuration mobile et maintenance par les techniciens certifiés Label Retail.",
    eyebrow: 'Solution · Vidéosurveillance',
    intro:
      "Commerces de Cocody, entrepôts de Yopougon, résidences de Bingerville ou sièges du Plateau : Label Retail installe et maintient des systèmes de vidéosurveillance Hikvision dans toute l'agglomération d'Abidjan, avec un accès en direct depuis votre téléphone.",
    sections: [
      {
        heading: 'Une installation dimensionnée pour votre site',
        paragraphs: [
          "Chaque projet démarre par une visite technique : nombre de caméras, angles morts, éclairage nocturne, câblage réseau ou coaxial existant, capacité de stockage. Nos techniciens certifiés Hikvision préconisent la configuration exacte — caméras IP fixes, dômes PTZ ou caméras thermiques pour les périmètres sensibles — sans survendre de matériel inutile.",
          "Nous travaillons aussi bien en création complète qu'en modernisation d'une installation analogique existante, en réutilisant le câblage coaxial quand c'est pertinent pour maîtriser le budget.",
        ],
      },
      {
        heading: 'Pilotage depuis votre téléphone, où que vous soyez',
        paragraphs: [
          "Vos caméras sont accessibles en direct et en relecture depuis l'application mobile, avec des alertes en cas de détection de mouvement ou d'intrusion. Les enregistrements sont conservés sur NVR local, dimensionné selon votre durée de rétention souhaitée.",
          "Après l'installation, notre support reste joignable à Abidjan pour la maintenance préventive, les mises à jour firmware et les extensions du système.",
        ],
      },
    ],
    productCategory: 'Videosurveillance IP',
    formationSlug: 'videosurveillance',
    blogCategory: 'Vidéosurveillance',
  },
  {
    slug: 'controle-acces-cote-divoire',
    title: "Contrôle d'accès en Côte d'Ivoire",
    metaTitle: "Contrôle d'accès en Côte d'Ivoire — badges, biométrie, tourniquets",
    metaDescription:
      "Solutions de contrôle d'accès en Côte d'Ivoire : badges RFID, biométrie faciale, serrures électromagnétiques et tourniquets, installés et maintenus par Label Retail.",
    eyebrow: "Solution · Contrôle d'accès",
    intro:
      "Maîtrisez qui entre et qui sort de vos bâtiments : Label Retail déploie des systèmes de contrôle d'accès Hikvision — badges RFID, biométrie faciale, empreinte digitale — pour les entreprises, banques, écoles et résidences de Côte d'Ivoire.",
    sections: [
      {
        heading: 'Du badge simple au site multi-zones',
        paragraphs: [
          "Selon la sensibilité de vos locaux, nous combinons lecteurs de badges MIFARE, terminaux biométriques, serrures et ventouses électromagnétiques, portillons et tourniquets. Les droits d'accès se gèrent par personne, par groupe et par plage horaire, avec un historique complet des passages.",
          "Pour les sites exigeants — salles serveurs, agences bancaires, zones de stock — le contrôle d'accès se couple à la vidéosurveillance : chaque passage est associé à une image, et les tentatives refusées déclenchent une alerte.",
        ],
      },
      {
        heading: 'Pointage et temps de présence intégrés',
        paragraphs: [
          "Les mêmes terminaux servent au pointage du personnel : les entrées et sorties alimentent LR Time, notre logiciel de gestion du temps, pour produire les rapports de présence et préparer la paie sans ressaisie.",
          "Nos équipes assurent l'installation, le paramétrage des droits et la formation de vos administrateurs, puis la maintenance sur site ou à distance.",
        ],
      },
    ],
    productCategory: 'Controle d’acces',
    formationSlug: 'controle-acces',
    blogCategory: "Contrôle d'accès",
  },
  {
    slug: 'alarme-anti-intrusion-abidjan',
    title: 'Alarme anti-intrusion à Abidjan',
    metaTitle: "Alarme anti-intrusion à Abidjan — AX PRO Hikvision",
    metaDescription:
      "Installation d'alarmes anti-intrusion AX PRO Hikvision à Abidjan : détecteurs, sirènes, centrales sans fil et alertes mobiles, par Label Retail.",
    eyebrow: 'Solution · Alarme intrusion',
    intro:
      "Protégez vos locaux la nuit et les week-ends : Label Retail installe des systèmes d'alarme anti-intrusion Hikvision AX PRO — centrales sans fil, détecteurs de mouvement, contacts d'ouverture et sirènes — pour les commerces, bureaux et domiciles d'Abidjan.",
    sections: [
      {
        heading: 'Une protection adaptée à vos locaux',
        paragraphs: [
          "L'étude de site identifie les points d'entrée à couvrir : portes, fenêtres, zones de passage, périmètre extérieur. La gamme AX PRO, sans fil, s'installe rapidement sans gros travaux, y compris dans des locaux déjà aménagés.",
          "Détecteurs volumétriques immunisés aux animaux, contacts magnétiques, détecteurs de bris de glace, sirènes intérieures et extérieures : chaque configuration est dimensionnée selon le risque réel, pas selon un catalogue.",
        ],
      },
      {
        heading: 'Alertes en temps réel sur votre téléphone',
        paragraphs: [
          "En cas de déclenchement, vous recevez une notification immédiate sur votre téléphone, avec levée de doute vidéo si le système est couplé à vos caméras. L'armement et le désarmement se font à distance, par zone ou par bâtiment.",
          "Label Retail assure la maintenance du système, le remplacement des batteries et l'accompagnement de vos équipes pour éviter les fausses alertes.",
        ],
      },
    ],
    productCategory: 'Alarme intrusion',
    formationSlug: 'alarme-anti-intrusion',
    blogCategory: "Détection d'intrusion",
  },
  {
    slug: 'pointage-biometrique-cote-divoire',
    title: "Pointage biométrique en Côte d'Ivoire",
    metaTitle: "Pointage biométrique en Côte d'Ivoire — terminaux + logiciel LR Time",
    metaDescription:
      "Terminaux de pointage biométrique Hikvision et logiciel LR Time : suivez la présence de vos équipes en Côte d'Ivoire, avec rapports pour la paie.",
    eyebrow: 'Solution · Gestion du temps',
    intro:
      "Remplacez les cahiers de présence et les tableurs : Label Retail équipe les entreprises ivoiriennes de terminaux de pointage biométrique Hikvision pilotés par LR Time, notre logiciel de gestion du temps conçu à Abidjan.",
    sections: [
      {
        heading: 'Un pointage fiable, même sans internet stable',
        paragraphs: [
          "Reconnaissance faciale, empreinte digitale ou carte RFID : chaque collaborateur pointe en une seconde sur un terminal Hikvision. Les pointages sont transmis en temps réel à LR Time et, en cas de coupure internet, rattrapés automatiquement dès le retour du réseau.",
          "La biométrie élimine le pointage par complaisance (un collègue qui badge pour un autre) et fiabilise les données de présence qui servent à la paie.",
        ],
      },
      {
        heading: 'Des rapports prêts pour la paie',
        paragraphs: [
          "Plannings, retards, heures supplémentaires, congés et absences : LR Time consolide tout et produit des rapports par jour, semaine ou mois, exportables en Excel pour Sage, Odoo ou votre fichier de paie.",
          "Nos équipes installent les terminaux, paramètrent vos règles RH et forment vos managers. Le tout est hébergé en SaaS multi-tenant, avec les données biométriques chiffrées.",
        ],
      },
    ],
    productCategory: 'Controle d’acces',
    formationSlug: 'systeme-pointage',
    blogCategory: 'Solutions intégrées',
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}
