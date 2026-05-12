// Catalogue détaillé des formations Label Retail.
//
// Chaque formation expose des chapitres et sous-points présentés
// dans le catalogue (accordéons) et sur la page détail (/formations/<slug>).
//
// Les images "cover" pointent vers des photos Unsplash libres de droits
// montrant des apprenants africains/noirs en contexte de formation
// technique. Pour utiliser vos propres photos, déposez-les dans
// /public/formations/<slug>.jpg et basculez la propriété `cover` sur
// `/formations/<slug>.jpg`.

export type FormationLevel = 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Débutant → Avancé';

export type FormationChapter = {
  title: string;
  items: (string | { title: string; items: string[] })[];
};

export type Formation = {
  slug: string;
  title: string;
  shortTitle: string;
  family: string;
  level: FormationLevel;
  duration: string;
  audience: string;
  summary: string;
  cover: string;
  coverLocal: string;
  outcomes: string[];
  chapters: FormationChapter[];
  careers?: string[];
};

export const formations: Formation[] = [
  {
    slug: 'videosurveillance',
    title: 'Formation en vidéosurveillance — du niveau débutant au niveau avancé',
    shortTitle: 'Vidéosurveillance',
    family: 'Sécurité électronique',
    level: 'Débutant → Avancé',
    duration: '5 à 10 jours',
    audience: 'Techniciens, installateurs, intégrateurs, responsables sécurité',
    summary:
      "Programme complet sur l'ensemble du cycle CCTV : étude, installation, configuration, exploitation, cybersécurité et intelligence artificielle.",
    cover:
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80',
    coverLocal: '/formations/videosurveillance.jpg',
    outcomes: [
      'Concevoir une architecture CCTV complète',
      'Installer et configurer caméras IP, NVR et DVR Hikvision',
      'Mettre en œuvre la cybersécurité et l’accès distant',
      'Exploiter les fonctions IA (LPR, reconnaissance faciale, comptage)',
    ],
    careers: [
      'Installateur CCTV',
      'Technicien sécurité électronique',
      'Administrateur vidéosurveillance',
      'Intégrateur réseau et sécurité',
      'Consultant sécurité électronique',
    ],
    chapters: [
      {
        title: '1. Introduction à la vidéosurveillance',
        items: [
          'Historique et évolution des systèmes CCTV',
          'Rôle de la vidéosurveillance dans la sécurité',
          { title: 'Types de systèmes', items: ['Analogique', 'IP', 'Sans fil'] },
          {
            title: 'Applications',
            items: ['Maisons', 'Entreprises', 'Banques', 'Magasins', 'Sites industriels'],
          },
        ],
      },
      {
        title: '2. Bases de l’électricité et du réseau',
        items: [
          { title: 'Notions d’électricité', items: ['Tension', 'Intensité', 'Puissance'] },
          'Utilisation du multimètre',
          'Alimentation des caméras',
          {
            title: 'Introduction au réseau informatique',
            items: ['Adresse IP', 'Masque réseau', 'Passerelle', 'DHCP', 'DNS'],
          },
          'Câblage réseau RJ45',
          'Normes Ethernet',
        ],
      },
      {
        title: '3. Matériel de vidéosurveillance',
        items: [
          { title: 'Caméras', items: ['Dôme', 'Bullet', 'PTZ', 'Fisheye'] },
          'DVR et NVR',
          'Disques durs de surveillance',
          'Switch réseau et switch PoE',
          { title: 'Connecteurs', items: ['BNC', 'RJ45', 'Alimentation DC'] },
          { title: 'Accessoires', items: ['Boîtes de jonction', 'Baies', 'Onduleurs'] },
        ],
      },
      {
        title: '4. Installation physique',
        items: [
          'Étude du site',
          'Choix des emplacements',
          'Hauteur et angle de pose',
          'Passage des câbles',
          'Perçage et fixation',
          { title: 'Protection contre', items: ['Eau', 'Chaleur', 'Surtension'] },
          'Installation intérieure et extérieure',
        ],
      },
      {
        title: '5. Configuration des caméras',
        items: [
          'Paramétrage IP',
          'Activation des caméras',
          'Résolution vidéo',
          { title: 'Compression', items: ['H.264', 'H.265'] },
          { title: 'Réglages image', items: ['Luminosité', 'Contraste', 'WDR', 'Vision nocturne'] },
          'Détection de mouvement',
        ],
      },
      {
        title: '6. Configuration DVR/NVR',
        items: [
          'Ajout des caméras',
          'Gestion des utilisateurs',
          'Réglages d’enregistrement',
          'Sauvegarde vidéo',
          'Recherche et lecture des vidéos',
          'Configuration horaire',
          'Alertes et notifications',
        ],
      },
      {
        title: '7. Accès à distance',
        items: [
          'Visualisation sur smartphone',
          'Applications mobiles',
          'Configuration Internet',
          'Redirection de ports',
          'Cloud P2P',
          'DDNS',
          'Sécurité des accès',
        ],
      },
      {
        title: '8. Maintenance et dépannage',
        items: [
          'Diagnostic des pannes',
          'Caméra hors ligne',
          'Problèmes d’alimentation',
          'Problèmes réseau',
          'Vérification des câbles',
          'Maintenance préventive',
          'Mise à jour firmware',
        ],
      },
      {
        title: '9. Stockage et sauvegarde',
        items: ['Calcul de capacité disque', 'RAID', 'NAS', 'Sauvegarde externe', 'Archivage vidéo'],
      },
      {
        title: '10. Cybersécurité en vidéosurveillance',
        items: [
          'Sécurisation des mots de passe',
          'Protection contre le piratage',
          'VLAN',
          'Pare-feu',
          'VPN',
          'Mise à jour sécurité',
        ],
      },
      {
        title: '11. Intelligence artificielle et fonctions avancées',
        items: [
          'Reconnaissance faciale',
          'Lecture de plaques (LPR/ANPR)',
          'Comptage de personnes',
          'Détection intrusion',
          'Analyse comportementale',
          'Intégration IA',
        ],
      },
      { title: '12. Marques et logiciels populaires', items: ['Hikvision'] },
      {
        title: '13. Réglementation et aspects juridiques',
        items: [
          'Respect de la vie privée',
          'Autorisations d’installation',
          'Conservation des images',
          'Affichage légal',
          'Protection des données',
        ],
      },
      {
        title: '14. Travaux pratiques',
        items: [
          'Installation complète d’un kit',
          'Configuration réseau réelle',
          'Simulation de panne',
          'Accès distant mobile',
        ],
      },
      {
        title: '15. Niveau professionnel avancé',
        items: ['Architecture multisites', 'Serveurs de vidéosurveillance', 'Centralisation vidéo'],
      },
    ],
  },
  {
    slug: 'alarme-anti-intrusion',
    title: 'Formation en système d’alarme anti-intrusion',
    shortTitle: 'Alarme anti-intrusion',
    family: 'Sécurité électronique',
    level: 'Débutant → Avancé',
    duration: '4 à 8 jours',
    audience: 'Installateurs, techniciens sûreté, agents de maintenance',
    summary:
      "De la centrale au télésurveilleur : détection, programmation, communication GSM/IP, intégration vidéo et domotique.",
    cover:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    coverLocal: '/formations/alarme-anti-intrusion.jpg',
    outcomes: [
      'Concevoir un plan de protection anti-intrusion',
      'Programmer une centrale et ses détecteurs',
      'Mettre en place transmission GSM/IP et télésurveillance',
      'Diagnostiquer pannes et défauts de zones',
    ],
    chapters: [
      {
        title: '1. Introduction aux systèmes d’alarme',
        items: [
          'Définition et rôle d’un système anti-intrusion',
          { title: 'Types de risques', items: ['Cambriolage', 'Intrusion', 'Vandalisme'] },
          'Fonctionnement général d’une alarme',
          { title: 'Différence entre', items: ['Alarme filaire', 'Alarme sans fil'] },
        ],
      },
      {
        title: '2. Bases d’électricité et électronique',
        items: [
          'Tension, courant, résistance',
          'Lecture de schémas électriques',
          'Utilisation du multimètre',
          'Polarité et alimentation',
          'Batteries et alimentation secourue',
          'Protection électrique',
        ],
      },
      {
        title: '3. Architecture d’un système d’alarme',
        items: [
          'Centrale d’alarme',
          'Clavier de commande',
          'Détecteurs',
          'Sirènes',
          'Modules GSM/IP',
          'Télécommandes',
          'Extensions et modules',
        ],
      },
      {
        title: '4. Étude des détecteurs',
        items: [
          {
            title: 'Détecteurs volumétriques',
            items: ['Infrarouge passif (PIR)', 'Double technologie', 'Anti-masquage'],
          },
          {
            title: 'Détecteurs périmétriques',
            items: [
              'Contact magnétique',
              'Barrière infrarouge',
              'Détecteur de choc',
              'Détecteur de bris de vitre',
            ],
          },
          {
            title: 'Détecteurs spéciaux',
            items: [
              'Détecteur fumée',
              'Détecteur gaz',
              'Détecteur inondation',
              'Détecteur vibration',
            ],
          },
        ],
      },
      {
        title: '5. Installation physique',
        items: [
          'Étude et analyse du site',
          'Plan de protection',
          'Positionnement des détecteurs',
          'Hauteur d’installation',
          'Passage des câbles',
          'Pose des équipements',
          'Protection contre sabotage',
        ],
      },
      {
        title: '6. Câblage des systèmes',
        items: [
          'Types de câbles',
          'Boucles NO/NC',
          'Résistances de fin de ligne',
          'Schémas de raccordement',
          'Distribution d’alimentation',
          'Gestion des zones',
        ],
      },
      {
        title: '7. Programmation des centrales',
        items: [
          'Paramétrage des zones',
          'Création des utilisateurs',
          'Codes d’accès',
          'Temporisation entrée/sortie',
          'Armement et désarmement',
          'Gestion des partitions',
          'Programmation horaire',
        ],
      },
      {
        title: '8. Communication et télésurveillance',
        items: [
          'Transmission GSM',
          'Transmission IP',
          'Wi-Fi et radio',
          'Notification SMS',
          'Application mobile',
          'Connexion centre de télésurveillance',
        ],
      },
      {
        title: '9. Sirènes et dispositifs d’alerte',
        items: [
          'Sirène intérieure',
          'Sirène extérieure',
          'Flash lumineux',
          'Paramétrage sonore',
          'Autoprotection',
        ],
      },
      {
        title: '10. Maintenance et dépannage',
        items: [
          'Diagnostic des pannes',
          'Défauts de zone',
          'Batterie faible',
          'Problèmes de communication',
          'Tests fonctionnels',
          'Maintenance préventive',
        ],
      },
      {
        title: '11. Sécurité et cybersécurité',
        items: [
          'Protection des accès',
          'Gestion des mots de passe',
          'Mise à jour firmware',
          'Sécurisation réseau',
          'Protection contre brouillage',
        ],
      },
      { title: '12. Marques et équipements populaires', items: ['Hikvision'] },
      {
        title: '13. Réglementation et normes',
        items: [
          'Normes de sécurité',
          'Protection des biens',
          'Confidentialité',
          'Règles d’installation',
          'Bonnes pratiques professionnelles',
        ],
      },
      {
        title: '14. Travaux pratiques',
        items: [
          'Installation d’une centrale complète',
          'Programmation réelle',
          'Test intrusion',
          'Simulation de panne',
          'Configuration GSM/IP',
          'Utilisation mobile',
        ],
      },
      {
        title: '15. Niveau professionnel avancé',
        items: [
          'Alarmes multisites',
          'Intégration vidéosurveillance',
          'Contrôle d’accès',
          'Domotique et automatisation',
          'Réseaux avancés',
          'Gestion centralisée',
        ],
      },
    ],
  },
  {
    slug: 'controle-acces',
    title: 'Formation en contrôle d’accès autonome et centralisé',
    shortTitle: 'Contrôle d’accès',
    family: 'Sûreté & identification',
    level: 'Débutant → Avancé',
    duration: '5 à 10 jours',
    audience: 'Installateurs, intégrateurs, administrateurs sécurité',
    summary:
      "Maîtrisez le contrôle d'accès en deux volets : autonome (lecteurs, badges, claviers) puis centralisé (contrôleurs réseau, logiciel, biométrie, intégrations).",
    cover:
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=80',
    coverLocal: '/formations/controle-acces.jpg',
    outcomes: [
      'Installer un contrôle d’accès autonome (RFID, biométrie, PIN)',
      'Déployer une architecture centralisée multiportes/multisites',
      'Configurer logiciels de supervision et fonctions avancées',
      'Intégrer le contrôle d’accès à la vidéo, l’alarme, l’interphonie',
    ],
    chapters: [
      {
        title: '1. Introduction au contrôle d’accès',
        items: [
          'Définition du contrôle d’accès',
          'Objectifs de sécurisation',
          {
            title: 'Différence entre',
            items: ['Contrôle d’accès autonome', 'Contrôle d’accès centralisé'],
          },
          {
            title: 'Applications',
            items: ['Bureaux', 'Résidences', 'Hôtels', 'Industries', 'Écoles'],
          },
        ],
      },
      {
        title: 'PARTIE A — Contrôle d’accès autonome',
        items: [],
      },
      {
        title: '2. Principe du contrôle d’accès autonome',
        items: [
          'Fonctionnement sans serveur',
          'Gestion locale des utilisateurs',
          'Avantages et limites',
          'Cas d’utilisation',
        ],
      },
      {
        title: '3. Équipements autonomes',
        items: [
          'Lecteurs autonomes',
          'Claviers à code',
          'Lecteurs biométriques',
          'Serrures électriques',
          'Ventouses magnétiques',
          'Boutons poussoirs',
          'Alimentations',
        ],
      },
      {
        title: '4. Technologies d’identification',
        items: ['Badge RFID', 'Carte Mifare', 'Code PIN', 'Empreinte digitale', 'NFC'],
      },
      {
        title: '5. Installation physique autonome',
        items: [
          'Étude du point d’accès',
          'Positionnement du lecteur',
          'Installation de serrure',
          'Passage des câbles',
          'Sécurisation des équipements',
        ],
      },
      {
        title: '6. Câblage et raccordement',
        items: [
          'Schémas de branchement',
          'Connexion alimentation',
          'Branchement serrure',
          'Bouton de sortie',
          'Contact de porte',
          'Relais NO/NC',
        ],
      },
      {
        title: '7. Programmation des systèmes autonomes',
        items: [
          'Ajout/suppression utilisateur',
          'Enregistrement badges',
          'Création codes PIN',
          'Paramétrage horaires',
          'Gestion administrateur',
          'Réinitialisation système',
        ],
      },
      {
        title: '8. Maintenance autonome',
        items: [
          'Diagnostic des pannes',
          'Défaut alimentation',
          'Badge non reconnu',
          'Serrure bloquée',
          'Maintenance préventive',
        ],
      },
      {
        title: 'PARTIE B — Contrôle d’accès centralisé',
        items: [],
      },
      {
        title: '9. Introduction au contrôle d’accès centralisé',
        items: [
          'Architecture centralisée',
          'Gestion multiportes',
          'Gestion multisite',
          'Communication réseau',
        ],
      },
      {
        title: '10. Équipements centralisés',
        items: [
          'Contrôleurs réseau',
          'Serveurs',
          'Logiciels de supervision',
          'Lecteurs',
          'Switch réseau',
          'Baies et onduleurs',
        ],
      },
      {
        title: '11. Réseau informatique appliqué',
        items: [
          'Adresse IP',
          'TCP/IP',
          'Configuration réseau',
          'VLAN',
          'PoE',
          'Dip',
          'RS485',
          'Wiegand',
        ],
      },
      {
        title: '12. Installation et architecture réseau',
        items: [
          'Topologie du système',
          'Connexion des contrôleurs',
          'Mise en réseau des lecteurs',
          'Communication serveur',
        ],
      },
      {
        title: '13. Logiciels de gestion centralisée',
        items: [
          'Création utilisateurs',
          'Gestion des badges',
          'Groupes d’accès',
          'Calendriers horaires',
          'Rapports et historiques',
          'Gestion des événements',
        ],
      },
      {
        title: '14. Fonctions avancées',
        items: [
          'Anti-passback',
          'Double authentification',
          'Interverrouillage',
          'Gestion visiteurs',
          'Présence et pointage',
          'Gestion multisite',
        ],
      },
      {
        title: '15. Contrôle d’accès biométrique',
        items: [
          'Enrôlement utilisateurs',
          'Reconnaissance faciale',
          'Empreinte digitale',
          'Gestion biométrique centralisée',
        ],
      },
      {
        title: '16. Intégration avec autres systèmes',
        items: [
          'Intégration vidéosurveillance',
          'Intégration alarme intrusion',
          'Interphonie IP',
          'Portails automatiques',
          'Ascenseurs sécurisés',
        ],
      },
      {
        title: '17. Cybersécurité',
        items: [
          'Gestion des mots de passe',
          'Mise à jour firmware',
          'Sauvegarde des données',
          'Sécurisation serveur',
          'VPN et accès distant',
        ],
      },
      {
        title: '18. Maintenance et dépannage avancés',
        items: [
          'Diagnostic réseau',
          'Contrôleur hors ligne',
          'Panne serveur',
          'Problèmes de synchronisation',
          'Tests de sécurité',
        ],
      },
      {
        title: '19. Travaux pratiques',
        items: [
          'Installation d’un système autonome complet',
          'Installation d’un système centralisé',
          'Configuration réseau',
          'Gestion logicielle',
          'Contrôle d’une porte réelle',
          'Simulation de panne',
        ],
      },
      { title: '20. Marques et systèmes populaires', items: ['Hikvision'] },
    ],
  },
  {
    slug: 'systeme-pointage',
    title: 'Formation en système de pointage',
    shortTitle: 'Système de pointage',
    family: 'Gestion du temps & RH',
    level: 'Débutant → Avancé',
    duration: '3 à 5 jours',
    audience: 'Techniciens, administrateurs RH, intégrateurs',
    summary:
      "Installer et exploiter une solution de pointage biométrique ou par badge, du terminal au logiciel RH/ERP en passant par le cloud.",
    cover:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
    coverLocal: '/formations/systeme-pointage.jpg',
    outcomes: [
      'Installer un terminal biométrique et son réseau',
      'Enrôler les utilisateurs (empreinte, visage, badge, PIN)',
      'Exploiter le logiciel de gestion de présence',
      'Synchroniser pointage et paie/RH/ERP',
    ],
    chapters: [
      {
        title: '1. Introduction aux systèmes de pointage',
        items: [
          'Définition du système de pointage',
          {
            title: 'Objectifs',
            items: ['Gestion de présence', 'Contrôle des horaires', 'Suivi des employés'],
          },
          {
            title: 'Types de systèmes',
            items: ['Pointage biométrique', 'Pointage par badge', 'Pointage mobile'],
          },
        ],
      },
      {
        title: '2. Bases d’électricité et réseau',
        items: [
          { title: 'Notions électriques', items: ['Tension', 'Intensité', 'Alimentation'] },
          'Utilisation du multimètre',
          { title: 'Bases réseau', items: ['Adresse IP', 'TCP/IP', 'RJ45', 'Wi-Fi'] },
          'Switch et PoE',
        ],
      },
      {
        title: '3. Architecture d’un système de pointage',
        items: [
          'Terminaux de pointage',
          'Serveur de gestion',
          'Logiciel de supervision',
          'Base de données',
          'Réseau de communication',
        ],
      },
      {
        title: '4. Technologies de pointage',
        items: [
          {
            title: 'Pointage biométrique',
            items: [
              'Empreinte digitale',
              'Reconnaissance faciale',
              'Reconnaissance palmaire',
            ],
          },
          {
            title: 'Pointage par identification',
            items: ['Badge RFID', 'Carte Mifare', 'QR Code', 'PIN/code'],
          },
          {
            title: 'Pointage mobile',
            items: ['GPS', 'Smartphone', 'Application cloud'],
          },
        ],
      },
      {
        title: '5. Installation physique',
        items: [
          'Étude du site',
          'Positionnement des terminaux',
          'Passage des câbles',
          'Installation murale',
          'Protection électrique',
        ],
      },
      {
        title: '6. Câblage et raccordement',
        items: [
          'Alimentation des équipements',
          'Connexion réseau',
          'Schémas de branchement',
          'Communication TCP/IP',
          'Wi-Fi et RS485',
        ],
      },
      {
        title: '7. Configuration des terminaux',
        items: [
          'Paramétrage IP',
          'Réglage date/heure',
          'Création administrateurs',
          'Paramètres de communication',
          'Synchronisation réseau',
        ],
      },
      {
        title: '8. Gestion des utilisateurs',
        items: [
          'Enrôlement biométrique',
          'Ajout des badges',
          'Création des employés',
          'Gestion des départements',
          'Niveaux d’accès',
        ],
      },
      {
        title: '9. Logiciels de gestion de présence',
        items: [
          'Installation logiciel',
          'Configuration serveur',
          'Gestion des horaires',
          'Pointage',
          'Rapports de présence',
          'Export Excel/PDF',
          'Calcul des heures',
        ],
      },
      {
        title: '10. Gestion avancée des temps',
        items: [
          'Retards et absences',
          'Heures supplémentaires',
          'Rotation des équipes',
          'Gestion des congés',
          'Planning du personnel',
        ],
      },
      {
        title: '11. Communication et accès distant',
        items: [
          'Synchronisation cloud',
          'Pointage distant',
          'Application mobile',
          'Accès web',
          'Notifications automatiques',
        ],
      },
      {
        title: '12. Maintenance et dépannage',
        items: [
          'Terminal hors ligne',
          'Défaut biométrique',
          'Problème réseau',
          'Sauvegarde base de données',
          'Mise à jour firmware',
          'Maintenance préventive',
        ],
      },
      {
        title: '13. Sécurité et protection des données',
        items: [
          'Sécurité biométrique',
          'Sauvegarde des données',
          'Gestion des mots de passe',
          'Protection des informations RH',
          'Cybersécurité',
        ],
      },
      {
        title: '14. Intégration avec autres systèmes',
        items: [
          'Contrôle d’accès',
          'Paie et RH',
          'ERP',
          'Vidéosurveillance',
          'Gestion multisite',
        ],
      },
      { title: '15. Marques et solutions populaires', items: ['Hikvision'] },
      {
        title: '16. Travaux pratiques',
        items: [
          'Installation d’un terminal biométrique',
          'Configuration réseau',
          'Création utilisateurs',
          'Gestion des horaires',
          'Génération de rapports',
          'Synchronisation serveur',
        ],
      },
      {
        title: '17. Niveau professionnel avancé',
        items: [
          'Architecture multisite',
          'Serveur cloud',
          'Haute disponibilité',
          'Intégration RH/ERP',
          'API et synchronisation',
          'Gestion centralisée',
        ],
      },
    ],
  },
  {
    slug: 'videophone',
    title: 'Formation en système de vidéophone IP et analogique',
    shortTitle: 'Vidéophone IP & analogique',
    family: 'Interphonie & contrôle d’accès',
    level: 'Débutant → Avancé',
    duration: '3 à 6 jours',
    audience: 'Installateurs, techniciens courants faibles',
    summary:
      "Deux volets pratiques : vidéophone analogique (platine 2 fils, moniteur) puis vidéophone IP (SIP, PoE, multisites, mobile).",
    cover:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    coverLocal: '/formations/videophone.jpg',
    outcomes: [
      'Installer un vidéophone analogique (platine, moniteur, gâche)',
      'Déployer un vidéophone IP/SIP en réseau PoE',
      'Configurer accès mobile et notifications push',
      'Intégrer le vidéophone à la vidéosurveillance et au contrôle d’accès',
    ],
    chapters: [
      {
        title: '1. Introduction aux systèmes de vidéophone',
        items: [
          'Définition du vidéophone',
          'Rôle dans la sécurité et la communication',
          { title: 'Différence entre', items: ['Vidéophone analogique', 'Vidéophone IP'] },
          {
            title: 'Applications',
            items: ['Résidences', 'Immeubles', 'Bureaux', 'Hôtels', 'Industries'],
          },
        ],
      },
      { title: 'PARTIE A — Vidéophone analogique', items: [] },
      {
        title: '2. Principe du vidéophone analogique',
        items: [
          'Fonctionnement analogique',
          'Transmission audio/vidéo',
          'Architecture du système',
          'Avantages et limites',
        ],
      },
      {
        title: '3. Équipements analogiques',
        items: [
          'Moniteur intérieur',
          'Platine de rue',
          'Caméra intégrée',
          'Alimentation',
          'Gâche électrique',
          'Bouton de sortie',
        ],
      },
      {
        title: '4. Câblage analogique',
        items: [
          'Types de câbles',
          'Schémas de raccordement',
          'Polarité',
          'Distance maximale',
          'Distribution alimentation',
        ],
      },
      {
        title: '5. Installation physique analogique',
        items: [
          'Positionnement de la platine',
          'Installation du moniteur',
          'Passage des câbles',
          'Fixation des équipements',
          'Protection extérieure',
        ],
      },
      {
        title: '6. Configuration et utilisation analogique',
        items: [
          'Réglage audio',
          'Réglage vidéo',
          'Ouverture de porte',
          'Appels internes',
          'Tests de fonctionnement',
        ],
      },
      {
        title: '7. Maintenance et dépannage analogique',
        items: [
          'Pas d’image',
          'Pas de son',
          'Parasites vidéo',
          'Défaut alimentation',
          'Vérification câblage',
        ],
      },
      { title: 'PARTIE B — Vidéophone IP', items: [] },
      {
        title: '8. Introduction au vidéophone IP',
        items: [
          'Fonctionnement réseau IP',
          'Communication numérique',
          'Architecture réseau',
          'Avantages du système IP',
        ],
      },
      {
        title: '9. Bases réseau appliquées',
        items: ['Adresse IP', 'TCP/IP', 'DHCP', 'DNS', 'PoE', 'Switch réseau', 'VLAN'],
      },
      {
        title: '10. Équipements IP',
        items: [
          'Moniteur IP',
          'Platine IP',
          'Contrôleur SIP',
          'Switch PoE',
          'Serveur',
          'Application mobile',
        ],
      },
      {
        title: '11. Installation réseau IP',
        items: [
          'Topologie réseau',
          'Connexion RJ45',
          'Configuration switch',
          'Mise en réseau des équipements',
          'Gestion PoE',
        ],
      },
      {
        title: '12. Configuration des vidéophones IP',
        items: [
          'Attribution adresse IP',
          'Activation équipements',
          'Paramétrage SIP',
          'Ajout utilisateurs',
          'Gestion appels vidéo',
          'Ouverture à distance',
        ],
      },
      {
        title: '13. Applications mobiles et accès distant',
        items: [
          'Visualisation smartphone',
          'Réponse à distance',
          'Notifications push',
          'Cloud P2P',
          'Sécurisation accès',
        ],
      },
      {
        title: '14. Intégration avec autres systèmes',
        items: [
          'Contrôle d’accès',
          'Vidéosurveillance',
          'Alarme intrusion',
          'Domotique',
          'Portails automatiques',
        ],
      },
      {
        title: '15. Cybersécurité des systèmes IP',
        items: [
          'Sécurisation réseau',
          'Mots de passe',
          'VPN',
          'Pare-feu',
          'Mise à jour firmware',
        ],
      },
      {
        title: '16. Maintenance et dépannage IP',
        items: [
          'Appareil hors ligne',
          'Défaut réseau',
          'Problèmes SIP',
          'Test connectivité',
          'Sauvegarde configuration',
        ],
      },
      {
        title: '17. Travaux pratiques',
        items: [
          'Installation vidéophone analogique',
          'Installation vidéophone IP',
          'Configuration réseau',
          'Test appel vidéo',
          'Ouverture de porte',
          'Configuration smartphone',
        ],
      },
      { title: '18. Marques et solutions populaires', items: ['Hikvision'] },
      {
        title: '19. Niveau professionnel avancé',
        items: [
          'Architecture multisite',
          'Interphonie SIP',
          'Serveurs centralisés',
          'Intégration cloud',
          'Gestion immeubles collectifs',
          'Haute disponibilité',
        ],
      },
    ],
  },
];

export function getFormationBySlug(slug: string): Formation | undefined {
  return formations.find((f) => f.slug === slug);
}
