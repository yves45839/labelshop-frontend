'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createBlog } from '@/lib/blogs';
import { getCurrentUser, isAdminEmail } from '@/lib/user';

/* ─────────────────────────────────────────────────────────────
   Données des 20 articles — Label Retail / Yves Roland OUIYA
   ───────────────────────────────────────────────────────────── */
const ARTICLES = [
  {
    title: 'Vidéosurveillance IP : Pourquoi passer de l\'analogique au numérique ?',
    author_name: 'Yves Roland OUIYA',
    category: 'Vidéosurveillance',
    language: 'FR/EN (Bilingue)',
    published_date: '2025-01-15',
    content: `# Vidéosurveillance IP : Pourquoi passer de l'analogique au numérique ?

**Auteur :** Yves Roland OUIYA — Label Retail | **Date :** 15 janvier 2025

---

## 🇫🇷 Version Française

La vidéosurveillance est aujourd'hui un pilier incontournable de toute stratégie de sécurité. Pourtant, de nombreuses entreprises continuent de s'appuyer sur des systèmes analogiques vieillissants. Chez Label Retail, nous accompagnons nos clients dans leur transition vers des solutions IP modernes.

### Les limites du système analogique

- **Résolution faible** : au mieux 700 TVL contre 2 à 12 MP pour les caméras IP
- **Infrastructure rigide** : câble coaxial dédié par caméra
- **Pas d'intelligence embarquée** : image brute sans analyse
- **Maintenance coûteuse** : câbles BNC se dégradent avec le temps

### Les avantages de la vidéosurveillance IP

**Qualité d'image supérieure** : de 2 MP à 12 MP et au-delà pour identifier visages et plaques.

**Flexibilité d'installation** : un câble Cat6 alimente ET transmet via PoE.

**Intelligence artificielle** : détection de mouvement avancée, reconnaissance faciale, comptage de personnes.

**Accès à distance** : consultation des flux depuis un smartphone, partout dans le monde.

**Scalabilité** : ajouter une caméra = brancher un appareil sur le réseau.

### Notre approche chez Label Retail

Nous réalisons un audit préalable de votre installation, évaluons votre infrastructure réseau et proposons une migration progressive qui préserve votre investissement initial.

---

## 🇬🇧 English Version

IP video surveillance is the modern standard for any serious security setup. At Label Retail, we guide clients through the transition from analog to IP-based solutions. Key benefits: superior image quality (2–12 MP vs 0.4 MP analog), PoE cabling simplicity, built-in AI analytics, remote smartphone access, and effortless scalability. We conduct a free preliminary audit of your existing installation and design a step-by-step migration plan.

---

*Label Retail — Expertise en sécurité électronique | roland@label-ci.com*`,
  },
  {
    title: 'Mifare vs RFID Classique : Quelle Technologie de Contrôle d\'Accès Choisir ?',
    author_name: 'Yves Roland OUIYA',
    category: 'Contrôle d\'accès',
    language: 'FR/EN (Bilingue)',
    published_date: '2025-02-10',
    content: `# Mifare vs RFID Classique : Quelle Technologie Choisir ?

**Auteur :** Yves Roland OUIYA — Label Retail | **Date :** 10 février 2025

---

## 🇫🇷 Version Française

Le RFID classique (125 kHz — EM4100, HID Prox) transmet un identifiant en clair, sans chiffrement. Un attaquant peut cloner un badge en quelques secondes à distance. C'est une technologie dépassée pour tout usage sécurisé sérieux.

### La technologie Mifare (13,56 MHz)

| Variante | Sécurité | Usage |
|----------|---------|-------|
| Mifare Classic 1K/4K | Moyenne (CRYPTO1) | Résidentiel, transport |
| Mifare Plus | Élevée (AES-128) | Entreprises, hôpitaux |
| Mifare DESFire EV3 | Très élevée (AES-128) | Gouvernement, sites sensibles |

**Avantages Mifare :** chiffrement des échanges, authentification mutuelle, mémoire embarquée (droits, historique, biométrie), multi-applicatif.

### Notre recommandation

Pour les **sites résidentiels** : 125 kHz + code PIN si budget contraint.
Pour les **entreprises et sites sensibles** : Mifare DESFire EV3 ou Mifare Plus X systématiquement.

---

## 🇬🇧 English Version

Classic RFID (125 kHz) transmits a fixed identifier in plaintext — an attacker can clone a badge in seconds. Mifare technology (13.56 MHz) provides AES-128 encryption, mutual authentication, and onboard memory. For any serious security application, Mifare DESFire EV3 is the standard we recommend at Label Retail.

---

*Label Retail — Expertise en sécurité électronique | roland@label-ci.com*`,
  },
  {
    title: 'Les Fondamentaux de la Détection d\'Intrusion : Protéger Votre Espace',
    author_name: 'Yves Roland OUIYA',
    category: 'Détection d\'intrusion',
    language: 'FR/EN (Bilingue)',
    published_date: '2025-03-05',
    content: `# Les Fondamentaux de la Détection d'Intrusion

**Auteur :** Yves Roland OUIYA — Label Retail | **Date :** 5 mars 2025

---

## 🇫🇷 Version Française

Un système de détection d'intrusion bien conçu constitue la première ligne de défense active de votre bâtiment.

### Composants clés

**Centrale d'alarme** : le cerveau du système. Reçoit les signaux, analyse les événements, déclenche les actions.

**Les détecteurs**
- **PIR** : détecte les variations de chaleur — adapté aux intérieurs tempérés
- **Double technologie (PIR + micro-ondes)** : réduit drastiquement les fausses alarmes
- **Détecteur d'ouverture** : pour portes et fenêtres
- **Bris de glace** : fréquences sonores du verre brisé
- **Barrière infrarouge** : protection périmétrique extérieure

**Dispositifs d'alarme** : sirènes intérieure/extérieure, flash lumineux.

**Transmetteur** : GSM + IP pour la redondance — garantit l'alerte même en cas de sabotage de ligne.

### Bonnes pratiques

- Défense en profondeur (périmètre → façade → intérieur)
- Zonage pour activation partielle
- Immunité animaux sur les détecteurs
- Contrats de maintenance annuels

---

## 🇬🇧 English Version

A well-designed intrusion detection system is your building's first active line of defense. At Label Retail, we apply defense-in-depth principles: perimeter barriers, facade detection, and interior volume coverage — all managed by a communicating control panel with GSM/IP redundancy.

---

*Label Retail — Expertise en sécurité électronique | roland@label-ci.com*`,
  },
  {
    title: 'Sécurité Incendie : Normes, Équipements et Bonnes Pratiques d\'Installation',
    author_name: 'Yves Roland OUIYA',
    category: 'Sécurité incendie',
    language: 'FR/EN (Bilingue)',
    published_date: '2025-04-12',
    content: `# Sécurité Incendie : Normes, Équipements et Bonnes Pratiques

**Auteur :** Yves Roland OUIYA — Label Retail | **Date :** 12 avril 2025

---

## 🇫🇷 Version Française

La grande majorité des drames liés au feu pourraient être évités grâce à une détection précoce.

### Types de détecteurs

| Type | Principe | Application |
|------|---------|-------------|
| Optique fumée | Diffusion lumineuse | Bureaux, logements |
| Thermique | Seuil température | Cuisines, parkings |
| Linéaire | Faisceau IR | Entrepôts, halls |
| Aspiration (ASD) | Prélèvement d'air | Salles serveurs, musées |

### Systèmes adressables vs conventionnels

**Conventionnel** : identifie la zone mais pas le détecteur précis.
**Adressable** : chaque détecteur a une adresse unique — localisation précise pour intervention rapide.

### Réglementation

Normes EN 54 et NF A2P. Vérifications annuelles obligatoires par organisme agréé. Label Retail propose des contrats de maintenance préventive et corrective.

---

## 🇬🇧 English Version

Fire safety systems range from simple residential smoke detectors to sophisticated addressable systems for large buildings. At Label Retail, we design fire detection installations compliant with EN 54 standards, from optical and heat detectors to aspirating smoke detection (ASD) for data centers and high-value assets.

---

*Label Retail — Expertise en sécurité électronique | roland@label-ci.com*`,
  },
  {
    title: 'Visiophonie Multiappartement : Guide de Choix pour Promoteurs et Syndics',
    author_name: 'Yves Roland OUIYA',
    category: 'Visiophonie',
    language: 'FR/EN (Bilingue)',
    published_date: '2025-05-08',
    content: `# Visiophonie Multiappartement : Guide de Choix

**Auteur :** Yves Roland OUIYA — Label Retail | **Date :** 8 mai 2025

---

## 🇫🇷 Version Française

Dans un immeuble résidentiel, le système de visiophonie constitue la première interface entre les résidents et le monde extérieur.

### Types de systèmes

- **Analogique traditionnel** : câble dédié par appartement — adapté aux petites résidences
- **Bus 2 fils** : un seul câble pour tous les appartements — jusqu'à 100 logements
- **IP** : réseau informatique — flexible, smartphone, gestion centralisée
- **Hybride** : portier IP + moniteurs bus 2 fils

### Critères de choix

Pour moins de 10 logements : bus 2 fils suffisant.
Pour 10 à 50 logements : bus 2 fils ou IP selon budget.
Pour plus de 50 logements : IP recommandé pour gestion centralisée.

### Fonctionnalités clés

Vidéo HD ≥ 720p, ouverture smartphone, mémoire visiteurs, multi-entrées, intercall, PoE, résistance IP65 minimum en conditions tropicales.

### Marques installées par Label Retail

Aiphone, Comelit, 2N, BPT, DoorBird, Dahua, Hikvision.

---

## 🇬🇧 English Version

Video door entry systems range from simple two-wire bus setups for small buildings to fully IP-based systems with smartphone access for large residential complexes. Label Retail designs and installs systems from leading brands (Aiphone, Comelit, 2N) suited to Côte d'Ivoire's tropical climate (IP65 minimum).

---

*Label Retail — Expertise en sécurité électronique | roland@label-ci.com*`,
  },
  {
    title: 'L\'Intelligence Artificielle Révolutionne la Vidéosurveillance',
    author_name: 'Yves Roland OUIYA',
    category: 'Vidéosurveillance',
    language: 'FR/EN (Bilingue)',
    published_date: '2025-06-20',
    content: `# L'Intelligence Artificielle Révolutionne la Vidéosurveillance

**Auteur :** Yves Roland OUIYA — Label Retail | **Date :** 20 juin 2025

---

## 🇫🇷 Version Française

Les caméras "intelligentes" ne se contentent plus d'enregistrer — elles comprennent, analysent et alertent en temps réel.

### Fonctions IA disponibles

- **Détection et classification d'objets** : personne, véhicule, animal, objet abandonné
- **Reconnaissance faciale** : identification en temps réel sur base de données
- **Analyse comportementale** : bagarre, chute, intrusion dans zone définie, traîne suspecte
- **Comptage de personnes et flux** : gestion des espaces commerciaux et événements
- **ANPR/LAPI** : lecture automatique de plaques d'immatriculation
- **Détection PPE/masque** : vérification du port d'équipements de protection

### Edge AI vs Cloud AI

**Edge AI** (recommandé) : traitement en local dans la caméra — latence quasi nulle, pas de dépendance internet.
**Cloud AI** : puissance illimitée mais latence et coûts de bande passante.

### Solutions déployées par Label Retail

Hikvision DeepinView, Dahua WizSense/WizMind, Milestone XProtect, Axis ACAP.

---

## 🇬🇧 English Version

AI-powered cameras reduce false alarms by 60–80% and dramatically improve incident response time. Label Retail deploys edge AI solutions from Hikvision, Dahua, and Axis that process video locally — no internet dependency, instant alerts, full privacy compliance.

---

*Label Retail — Expertise en sécurité électronique | roland@label-ci.com*`,
  },
  {
    title: 'Caméra Analogique vs IP : Le Guide Comparatif Complet 2025',
    author_name: 'Yves Roland OUIYA',
    category: 'Vidéosurveillance',
    language: 'FR/EN (Bilingue)',
    published_date: '2025-07-14',
    content: `# Caméra Analogique vs IP : Guide Comparatif Complet 2025

**Auteur :** Yves Roland OUIYA — Label Retail | **Date :** 14 juillet 2025

---

## 🇫🇷 Version Française

### Tableau comparatif

| Critère | Analogique | HD Analogique (TVI/CVI) | IP |
|---------|-----------|------------------------|-----|
| Résolution | ≤ 0,4 MP | 2 à 8 MP | 2 à 32 MP |
| Câble | Coaxial | Coaxial | Cat5e/Cat6 |
| Alimentation | Séparée | Séparée | PoE |
| Intelligence | Aucune | Limitée | IA complète |
| Scalabilité | Faible | Moyenne | Très haute |

### Quand garder l'analogique ?

Uniquement si budget très contraint + câblage coaxial en bon état + faible enjeu sécuritaire.

### Notre recommandation

- **Nouvelle installation** : 100% IP, minimum 4 MP, PoE + NVR
- **Rénovation avec câblage intact** : HD Analogique TVI en transition
- **Rénovation avec câblage dégradé** : migration directe vers IP

---

## 🇬🇧 English Version

The resolution gap between analog (0.4 MP) and modern IP cameras (4–12 MP common) is decisive for post-incident investigations. Label Retail recommends 100% IP for new installations and HD analog (TVI/AHD) as a transition path for renovations with intact coaxial cabling.

---

*Label Retail — Expertise en sécurité électronique | roland@label-ci.com*`,
  },
  {
    title: 'Contrôle d\'Accès Biométrique : Empreintes, Iris et Reconnaissance Faciale',
    author_name: 'Yves Roland OUIYA',
    category: 'Contrôle d\'accès',
    language: 'FR/EN (Bilingue)',
    published_date: '2025-08-06',
    content: `# Contrôle d'Accès Biométrique : Empreintes, Iris et Reconnaissance Faciale

**Auteur :** Yves Roland OUIYA — Label Retail | **Date :** 6 août 2025

---

## 🇫🇷 Version Française

La biométrie est intrinsèquement liée à la personne — on ne peut pas l'oublier, et elle est extrêmement difficile à reproduire.

### Les trois modalités biométriques

**Empreinte digitale** : technologie mature, coût accessible, vitesse < 1s. Limite : sensibilité à l'humidité.

**Iris** : très haute précision (FAR < 0,0001%), non invasif, résistant aux faux. Coût élevé.

**Reconnaissance faciale** : sans contact, rapide (< 0,5s), peut fonctionner à distance. Nécessite bon éclairage.

### Indicateurs de performance

- **FAR** (False Acceptance Rate) : probabilité d'accepter un imposteur — plus bas = meilleur
- **FRR** (False Rejection Rate) : probabilité de refuser un utilisateur légitime
- **EER** : point d'équilibre FAR = FRR — critère de comparaison objectif

### Authentification multifacteur

Pour les zones sensibles : Biométrie + Badge Mifare + Code PIN. Label Retail déploie ZKTeco, Suprema, Hikvision MinMoe, HID Global.

---

## 🇬🇧 English Version

Biometric access control combines what you are (fingerprint, iris, face) with what you have (Mifare badge) and what you know (PIN) for maximum security. Label Retail installs biometric terminals from ZKTeco, Suprema, HID Global, and Hikvision, fully compliant with Côte d'Ivoire data protection regulations.

---

*Label Retail — Expertise en sécurité électronique | roland@label-ci.com*`,
  },
  {
    title: 'Intégration des Systèmes de Sécurité : Vers une Plateforme Unifiée',
    author_name: 'Yves Roland OUIYA',
    category: 'Solutions intégrées',
    language: 'FR/EN (Bilingue)',
    published_date: '2025-09-18',
    content: `# Intégration des Systèmes de Sécurité : Vers une Plateforme Unifiée

**Auteur :** Yves Roland OUIYA — Label Retail | **Date :** 18 septembre 2025

---

## 🇫🇷 Version Française

La fragmentation sécurité (alarme, CCTV, contrôle d'accès, incendie — chacun en silo) est coûteuse, inefficace et source de failles. L'intégration est la réponse.

### Pourquoi intégrer ?

- Réduction des angles morts opérationnels — réponse automatique en quelques secondes
- Réduction des fausses alarmes par croisement multi-capteurs
- Interface unique PSIM pour les opérateurs
- Automatisation : alarme incendie → fermeture portes coupe-feu + ascenseurs + notification secours

### Architectures d'intégration

- **Natif (même écosystème)** : simple mais vendor lock-in
- **API/SDK** : flexible, sur mesure
- **Protocoles ouverts** : ONVIF (caméras), OSDP (accès), BACnet (bâtiment) — Label Retail privilégie cette approche
- **PSIM** : Genetec Security Center, Milestone XProtect

### Bâtiment intelligent

Sécurité + GTB = économies d'énergie (extinction éclairage/clim des zones vides détectées par le contrôle d'accès).

---

## 🇬🇧 English Version

Security integration transforms reactive systems into proactive ones. Label Retail designs open-architecture PSIM platforms using ONVIF, OSDP, and BACnet protocols — protecting client investment and ensuring vendor independence.

---

*Label Retail — Expertise en sécurité électronique | roland@label-ci.com*`,
  },
  {
    title: 'Les Capteurs de Détection Nouvelle Génération : PIR, Micro-Ondes, Infrarouge',
    author_name: 'Yves Roland OUIYA',
    category: 'Détection d\'intrusion',
    language: 'FR/EN (Bilingue)',
    published_date: '2025-10-09',
    content: `# Les Capteurs de Détection Nouvelle Génération

**Auteur :** Yves Roland OUIYA — Label Retail | **Date :** 9 octobre 2025

---

## 🇫🇷 Version Française

### Tableau récapitulatif

| Technologie | Intérieur | Extérieur | T° extrême | Fausses alarmes | Coût |
|-------------|-----------|-----------|-----------|-----------------|------|
| PIR | ✅ | ⚠️ | ❌ | Moyen | Faible |
| Micro-ondes | ✅ | ⚠️ | ✅ | Élevé seul | Moyen |
| Double techno | ✅ | ✅ | ✅ | Faible | Moyen |
| Barrière IR | ⚠️ | ✅ | ✅ | Très faible | Élevé |
| IA embarquée | ✅ | ✅ | ✅ | Très faible | Élevé |

**PIR** : détecte la chaleur — économique, bureaux et habitations.
**Micro-ondes** : effet Doppler — entrepôts, ateliers industriels.
**Double technologie** : PIR + micro-ondes — standard professionnel recommandé.
**Barrière IR** : émetteur/récepteur — périmètre extérieur, haute sécurité.
**IA embarquée** : distingue personne / animal — nouvelle génération.

---

## 🇬🇧 English Version

Choosing the right sensor is critical. Dual-technology detectors (PIR + microwave) are the professional standard, dramatically reducing false alarms. For outdoor perimeters, active infrared barriers provide precise, weather-resistant detection. Next-generation AI sensors learn environment patterns for continuous improvement.

---

*Label Retail — Expertise en sécurité électronique | roland@label-ci.com*`,
  },
  {
    title: 'Cybersécurité et Vidéosurveillance : Protéger Vos Caméras IP des Attaques',
    author_name: 'Yves Roland OUIYA',
    category: 'Vidéosurveillance',
    language: 'FR/EN (Bilingue)',
    published_date: '2025-11-03',
    content: `# Cybersécurité et Vidéosurveillance : Protéger Vos Caméras IP

**Auteur :** Yves Roland OUIYA — Label Retail | **Date :** 3 novembre 2025

---

## 🇫🇷 Version Française

En 2016, le botnet Mirai a utilisé des milliers de caméras mal sécurisées pour paralyser des pans entiers d'Internet. Aujourd'hui, des millions de caméras restent vulnérables.

### Les 8 bonnes pratiques indispensables

1. **Changer tous les mots de passe par défaut** (minimum 12 caractères)
2. **Mettre à jour les firmwares** régulièrement (calendrier trimestriel)
3. **Segmenter le réseau** : VLAN dédié aux caméras
4. **Accès à distance via VPN** uniquement — jamais exposition directe Internet
5. **Chiffrement des flux** : RTSPS ou HTTPS
6. **Désactiver les services inutiles** : Telnet, FTP, UPnP
7. **Activer la 2FA** sur la plateforme de supervision
8. **Journaliser et surveiller** les tentatives d'accès anormales

Chez Label Retail, la sécurisation réseau est une checklist non négociable à chaque installation.

---

## 🇬🇧 English Version

A compromised camera can be turned against you — used for espionage, recording sabotage, or as a network entry point. At Label Retail, cybersecurity hardening (VLAN segmentation, VPN-only remote access, encrypted streams, firmware updates) is systematically applied to every IP camera installation.

---

*Label Retail — Expertise en sécurité électronique | roland@label-ci.com*`,
  },
  {
    title: 'Bilan 2025 : Les Grandes Tendances de la Sécurité Électronique',
    author_name: 'Yves Roland OUIYA',
    category: 'Tendances',
    language: 'FR/EN (Bilingue)',
    published_date: '2025-12-15',
    content: `# Bilan 2025 : Les Grandes Tendances de la Sécurité Électronique

**Auteur :** Yves Roland OUIYA — Label Retail | **Date :** 15 décembre 2025

---

## 🇫🇷 Version Française

2025 aura été une année charnière pour la sécurité électronique.

### 1. L'IA passe du laboratoire au terrain

L'IA embarquée est devenue le standard professionnel. Solutions AIaaS pour retrofitter des caméras existantes.

### 2. La convergence physique-cyber s'accélère

Les RSSI sont désormais impliqués dans les décisions d'achat de systèmes de sécurité physique. Critères cybersécurité intégrés aux appels d'offres.

### 3. Les accès sans contact se généralisent

BLE et NFC dépassent les badges HF classiques. La "mobile credential" s'impose dans les grandes entreprises.

### 4. Le stockage vidéo hybride s'impose

Local + cloud sélectif = la solution pragmatique adoptée par la majorité des grands déploiements.

### 5. Le marché africain en forte croissance

Croissance à deux chiffres en Côte d'Ivoire, portée par les grands projets immobiliers et industriels.

### Notre vision 2026

Déploiement de premières plateformes PSIM intégrées pour grands comptes industriels et immobiliers en Côte d'Ivoire.

---

## 🇬🇧 English Version

2025 marked AI's definitive transition from lab to field, accelerated physical-cyber security convergence, mainstream contactless access, and double-digit market growth in Côte d'Ivoire. Label Retail enters 2026 with strengthened partnerships and its first PSIM deployments.

---

*Label Retail — Expertise en sécurité électronique | roland@label-ci.com*`,
  },
  {
    title: 'Visiophone vs Interphone Audio : Lequel Choisir pour Votre Immeuble ?',
    author_name: 'Yves Roland OUIYA',
    category: 'Visiophonie',
    language: 'FR/EN (Bilingue)',
    published_date: '2026-01-22',
    content: `# Visiophone vs Interphone Audio : Lequel Choisir ?

**Auteur :** Yves Roland OUIYA — Label Retail | **Date :** 22 janvier 2026

---

## 🇫🇷 Version Française

### Tableau comparatif

| Critère | Interphone Audio | Visiophone |
|---------|-----------------|-----------|
| Identification visiteur | Voix uniquement | Voix + Vidéo HD |
| Vision nocturne | ❌ | ✅ |
| Accès smartphone | ❌ | ✅ |
| Mémoire des visites | ❌ | ✅ |
| Détection mouvement | ❌ | ✅ |
| Niveau de sécurité | Bas | Élevé |
| Coût installation | Faible | Moyen (+30-60%) |

### Le visiophone connecté (IP)

Recevez l'appel du visiteur sur votre smartphone où que vous soyez dans le monde. Ouvrez la porte pour un livreur même absent du domicile.

### Notre recommandation

Label Retail recommande systématiquement le visiophone pour toute nouvelle installation. L'écart budgétaire reste souvent inférieur à 500 000 FCFA pour une résidence de 10 appartements.

---

## 🇬🇧 English Version

The audio intercom belongs to the past. Video door entry systems provide visitor identification, night vision, smartphone remote access, and visit memory — at a cost premium that has narrowed significantly. Label Retail recommends video door entry for all new installations.

---

*Label Retail — Expertise en sécurité électronique | roland@label-ci.com*`,
  },
  {
    title: 'Stockage Vidéo : NVR, DVR ou Cloud ? Comment Faire le Bon Choix',
    author_name: 'Yves Roland OUIYA',
    category: 'Vidéosurveillance',
    language: 'FR/EN (Bilingue)',
    published_date: '2026-02-17',
    content: `# Stockage Vidéo : NVR, DVR ou Cloud ?

**Auteur :** Yves Roland OUIYA — Label Retail | **Date :** 17 février 2026

---

## 🇫🇷 Version Française

**DVR** : pour caméras analogiques uniquement. Infrastructure coaxiale requise.

**NVR** : standard pour les systèmes IP. Supporte ONVIF, toutes résolutions, IA intégrée, RAID.

**Cloud** : pas d'équipement local, redondance géographique, mais coûts récurrents et dépendance internet.

**Hybride (recommandé)** : enregistrement local continu sur NVR + archivage sélectif cloud des événements.

### Calcul de stockage

**Formule :** Débit (Mbps) × Nb caméras × Durée (heures) × 3600 / (8 × 1 073 741 824)

Exemple : 16 caméras 4 MP H.265 (≈2 Mbps), 30 jours = **8,6 To**

Le H.265 réduit de ~50% le stockage par rapport au H.264.

### RAID minimum recommandé

RAID 5 pour toute installation professionnelle — continuité d'enregistrement en cas de panne disque.

---

## 🇬🇧 English Version

Label Retail recommends hybrid storage architecture: continuous local recording on NVR (RAID 5 minimum) + selective cloud archiving of detected events. This eliminates cloud dependency while adding geographic redundancy for critical footage.

---

*Label Retail — Expertise en sécurité électronique | roland@label-ci.com*`,
  },
  {
    title: 'Contrôle d\'Accès sans Contact : NFC, BLE et QR Code face aux Badges Traditionnels',
    author_name: 'Yves Roland OUIYA',
    category: 'Contrôle d\'accès',
    language: 'FR/EN (Bilingue)',
    published_date: '2026-03-10',
    content: `# Contrôle d'Accès sans Contact : NFC, BLE et QR Code

**Auteur :** Yves Roland OUIYA — Label Retail | **Date :** 10 mars 2026

---

## 🇫🇷 Version Française

### Tableau comparatif

| Technologie | Portée | Sécurité | Confort | Coût | Maturité |
|-------------|--------|---------|---------|------|---------|
| Badge Mifare | < 10 cm | Élevée | Bon | Faible | Mature |
| NFC smartphone | < 10 cm | Élevée | Très bon | Moyen | Mature |
| BLE hands-free | 1-15 m | Moyenne | Excellent | Moyen | Mature |
| QR code dynamique | Variable | Moyenne | Très bon | Faible | Mature |
| UWB | 1-30 m | Très élevée | Excellent | Élevé | Émergent |

**NFC** : votre smartphone devient votre badge. Révocation instantanée, credential envoyé à distance.

**BLE** : "hands-free access" — ouverture sans sortir le téléphone de la poche. Idéal parkings, entrepôts.

**QR code dynamique** : pour visiteurs temporaires — validité horaire précise, aucun équipement physique.

**UWB** : précision centimétrique — élimine les relay attacks. Disponible sur iPhone récents.

### Notre recommandation

Approche hybride : Mifare pour le personnel permanent + QR code pour visiteurs + NFC/BLE pour sites à fort trafic.

---

## 🇬🇧 English Version

Label Retail adopts a hybrid multi-technology approach: Mifare badges for permanent staff, dynamic QR codes for visitors, and NFC/BLE mobile credentials for high-traffic enterprise environments — offering flexibility, security, and convenience across all user categories.

---

*Label Retail — Expertise en sécurité électronique | roland@label-ci.com*`,
  },
  {
    title: 'Détection Incendie Intelligente : Aspiration de Fumée et Systèmes Adressables',
    author_name: 'Yves Roland OUIYA',
    category: 'Sécurité incendie',
    language: 'FR/EN (Bilingue)',
    published_date: '2026-03-28',
    content: `# Détection Incendie Intelligente : Aspiration et Systèmes Adressables

**Auteur :** Yves Roland OUIYA — Label Retail | **Date :** 28 mars 2026

---

## 🇫🇷 Version Française

### Aspiration de fumée (ASD) — L'état de l'art

Contrairement aux détecteurs ponctuels qui attendent la fumée, les systèmes ASD prélèvent activement l'air via des tubes perforés et l'analysent avec un laser ultra-sensible (1000× plus sensible qu'un détecteur classique).

**Applications idéales :** salles serveurs, datacenters, musées, archives, entrepôts à plafonds très hauts, espaces techniques inaccessibles.

**Marques :** VESDA (Xtralis), Wagner TITANUS, Hochiki, Siemens.

### 4 niveaux d'alerte ASD

1. **Alerte (Action)** : particules infimes — investigation recommandée
2. **Avertissement** : concentration croissante — notification maintenance
3. **Alarme feu 1** : évacuation déclenchée
4. **Alarme feu 2** : extinction automatique activée

### Systèmes adressables : la précision au service de l'intervention

Chaque détecteur a une adresse unique → localisation précise : *"Détecteur #247 — Salle 3B, 2e étage"*.

Maintenance prédictive : le système signale un détecteur dont la sensibilité dérive avant tout incident.

---

## 🇬🇧 English Version

Aspirating Smoke Detection (ASD) can detect a fire in a data center before smoke is visible to the naked eye. Combined with addressable systems (unique address per detector), response teams are guided precisely to the alarm source. Label Retail designs ASD installations compliant with EN 54 standards.

---

*Label Retail — Expertise en sécurité électronique | roland@label-ci.com*`,
  },
  {
    title: 'Les Caméras Thermiques : Applications en Sécurité Industrielle et Périmétrique',
    author_name: 'Yves Roland OUIYA',
    category: 'Vidéosurveillance',
    language: 'FR/EN (Bilingue)',
    published_date: '2026-04-14',
    content: `# Les Caméras Thermiques : Sécurité Industrielle et Périmétrique

**Auteur :** Yves Roland OUIYA — Label Retail | **Date :** 14 avril 2026

---

## 🇫🇷 Version Française

Les caméras thermiques captent le rayonnement infrarouge émis par les corps selon leur température — invisibles à l'œil nu, mais détectables à plusieurs centaines de mètres.

### Avantages uniques

- **Totalement indépendantes de la lumière** : fonctionnent dans l'obscurité totale, brouillard, fumée
- **Portée très longue** : silhouette humaine à plusieurs centaines de mètres
- **Immunité au camouflage** : la chaleur corporelle trahit toujours l'intrus
- **Réduction des fausses alarmes** : insensibles aux variations lumineuses et ombres
- **Détection précoce d'incendie** : point chaud détecté avant toute flamme visible

### Applications

Surveillance périmétrique (usines, raffineries, aéroports), infrastructures critiques (lignes HT, pipelines), détection préventive d'incendie industriel, sites portuaires et aéroportuaires.

### Systèmes combinés thermique + optique

La caméra thermique détecte → la PTZ optique HD se repositionne pour identification et preuve.

**Marques déployées :** FLIR, Axis Q19, Hikvision DS-2TD, Dahua, Bosch.

---

## 🇬🇧 English Version

Thermal cameras detect human intrusion regardless of lighting, camouflage, or weather — making them ideal for perimeter security and industrial fire prevention. Label Retail deploys FLIR, Axis, Hikvision, and Dahua thermal solutions, calculated using Johnson criteria for detection, recognition, and identification ranges.

---

*Label Retail — Expertise en sécurité électronique | roland@label-ci.com*`,
  },
  {
    title: 'RFID et IoT : La Convergence qui Transforme la Gestion des Accès',
    author_name: 'Yves Roland OUIYA',
    category: 'IoT',
    language: 'FR/EN (Bilingue)',
    published_date: '2026-04-29',
    content: `# RFID et IoT : La Convergence qui Transforme la Gestion des Accès

**Auteur :** Yves Roland OUIYA — Label Retail | **Date :** 29 avril 2026

---

## 🇫🇷 Version Française

RFID + IoT = des écosystèmes sécurisés où chaque objet, chaque personne et chaque événement est tracé, géré et analysé en temps réel.

### Cas d'usage concrets

**Gestion intelligente des actifs** : tags RFID + lecteurs IoT aux entrées → localisation temps réel de chaque équipement, alertes si sortie de zone, inventaires automatiques.

**Hôpital connecté** : bracelets RFID patients + lecteurs IoT salles → alerte immédiate si sortie non autorisée, contrôle d'accès granulaire du personnel soignant.

**Site industriel sécurisé** : badge RFID + capteurs IoT gaz → en cas de détection de gaz, les travailleurs dans la zone sont alertés par vibration du badge, les accès sont verrouillés automatiquement.

### Protocoles IoT sécurité

| Protocole | Portée | Consommation | Usage |
|-----------|--------|-------------|-------|
| BLE | 10-50 m | Très faible | Badges, capteurs |
| Zigbee | 10-75 m | Très faible | Détecteurs |
| LoRaWAN | 1-15 km | Minimale | Capteurs longue distance |
| 4G/5G | > 10 km | Moyenne | Caméras mobiles |

### Sécurité IoT

VLAN dédié + authentification forte + TLS 1.3 + mises à jour firmware centralisées.

---

## 🇬🇧 English Version

The RFID-IoT convergence transforms security from reactive to proactive and intelligent. Label Retail offers RFID asset management solutions integrated with access control systems, providing unified visibility of security and equipment traceability across your organization.

---

*Label Retail — Expertise en sécurité électronique | roland@label-ci.com*`,
  },
  {
    title: '5G et Sécurité Électronique : Nouvelles Opportunités pour les Systèmes Connectés',
    author_name: 'Yves Roland OUIYA',
    category: 'Tendances',
    language: 'FR/EN (Bilingue)',
    published_date: '2026-05-06',
    content: `# 5G et Sécurité Électronique : Nouvelles Opportunités

**Auteur :** Yves Roland OUIYA — Label Retail | **Date :** 6 mai 2026

---

## 🇫🇷 Version Française

La 5G apporte trois révolutions pour la sécurité électronique :

**eMBB** : débits jusqu'à 10 Gbps — transmission de flux 4K et 8K en temps réel depuis des caméras mobiles.

**URLLC** : latence < 1 ms — contrôle d'accès et systèmes d'alarme en temps réel sans latence perceptible.

**mMTC** : jusqu'à 1 million d'appareils/km² — déploiements IoT massifs pour la sécurité périmétrique.

### Applications concrètes

- **Caméras 5G nomades** : déploiement en minutes sur événements, chantiers, zones de crise — flux 4K sans câble
- **Drones de surveillance** : patrouille autonome avec transmission temps réel vers centre de commandement
- **Lecteurs d'accès 5G** : gestion de sites isolés (barrages, terminaux portuaires) sans réseau local
- **Réseau 5G privé** : infrastructure dédiée pour industrie — confidentialité maximale, QoS garantie

### Côte d'Ivoire

Couverture 5G concentrée dans les grandes villes en 2026. Label Retail intègre déjà 4G/5G pour caméras mobiles et sites isolés.

---

## 🇬🇧 English Version

5G transforms mobile security deployment: cameras can be placed anywhere in minutes, transmitting 4K streams without cabling. Private 5G networks offer maximum data sovereignty for industrial sites. Label Retail is positioning now to support clients through the 5G transition as coverage expands across Côte d'Ivoire.

---

*Label Retail — Expertise en sécurité électronique | roland@label-ci.com*`,
  },
  {
    title: 'Label Retail : Notre Approche Globale de la Sécurité Électronique en Côte d\'Ivoire',
    author_name: 'Yves Roland OUIYA',
    category: 'Label Retail',
    language: 'FR/EN (Bilingue)',
    published_date: '2026-05-10',
    content: `# Label Retail : Notre Approche Globale de la Sécurité Électronique

**Auteur :** Yves Roland OUIYA — Label Retail | **Date :** 10 mai 2026

---

## 🇫🇷 Version Française

Chez Label Retail, nous n'avons jamais cru aux solutions "catalogue" appliquées uniformément. Chaque site est unique.

### Notre approche en 5 étapes

1. **Audit sécurité** : analyse des locaux, flux, risques et contraintes opérationnelles
2. **Conception** : architecture globale — positionnement caméras, zonage accès, sectorisation alarme
3. **Chiffrage transparent** : devis détaillé sans surprise en cours de chantier
4. **Installation professionnelle** : checklist de sécurisation à chaque installation
5. **Maintenance** : contrats préventifs et correctifs, hotline technique

### Secteurs servis

Immobilier résidentiel, industrie et logistique, commerce et retail, hôtellerie, banque et finance, institutions gouvernementales, événementiel.

### Partenariats technologiques

Partenaire officiel Hikvision, Dahua, Axis, Bosch, HID Global, ZKTeco, Honeywell, Siemens.

### Notre engagement

"La sécurité électronique ne se résume pas à installer des caméras. C'est une discipline qui demande de comprendre les risques, de maîtriser les technologies et d'être présent dans la durée. Chaque installation que nous réalisons est signée — et nous en sommes fiers."

— Yves Roland OUIYA, Fondateur

---

**Contact :** roland@label-ci.com | labelshop.ci | Abidjan, Côte d'Ivoire

---

## 🇬🇧 English Version

Label Retail delivers tailored electronic security solutions across Côte d'Ivoire — from residential video door entry to large-scale industrial PSIM platforms. Our five-step approach (audit → design → transparent pricing → professional installation → maintenance) ensures lasting performance and full regulatory compliance for every client.

*Your security is our priority. Your trust is our reward.*

---

*Label Retail — Expertise en sécurité électronique | roland@label-ci.com*`,
  },
];

/* ─── Composant principal ─── */
type Status = 'idle' | 'loading' | 'success' | 'error';
interface ArticleStatus { status: Status; message?: string }

export default function ImportBlogsPage() {
  const [statuses, setStatuses] = useState<ArticleStatus[]>(
    ARTICLES.map(() => ({ status: 'idle' }))
  );
  const [importing, setImporting] = useState(false);
  const [done, setDone]           = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) { window.location.href = '/accounts/login'; return; }
    if (!isAdminEmail(user.email)) { window.location.href = '/'; }
  }, []);

  const importOne = async (idx: number): Promise<boolean> => {
    setStatuses((prev) => {
      const next = [...prev];
      next[idx] = { status: 'loading' };
      return next;
    });
    try {
      const art = ARTICLES[idx];
      const form = new FormData();
      form.append('title', art.title);
      form.append('content', art.content);
      form.append('author_name', art.author_name);
      form.append('category', art.category);
      form.append('language', art.language);
      form.append('published_date', art.published_date);
      await createBlog(form);
      setStatuses((prev) => {
        const next = [...prev];
        next[idx] = { status: 'success', message: 'Importé ✓' };
        return next;
      });
      return true;
    } catch (err: any) {
      setStatuses((prev) => {
        const next = [...prev];
        next[idx] = { status: 'error', message: err?.response?.data?.detail || 'Erreur' };
        return next;
      });
      return false;
    }
  };

  const importAll = async () => {
    setImporting(true);
    for (let i = 0; i < ARTICLES.length; i++) {
      if (statuses[i].status !== 'success') {
        await importOne(i);
        // Petite pause pour ne pas saturer l'API
        await new Promise((r) => setTimeout(r, 300));
      }
    }
    setImporting(false);
    setDone(true);
  };

  const successCount = statuses.filter((s) => s.status === 'success').length;
  const errorCount   = statuses.filter((s) => s.status === 'error').length;

  return (
    <div className="bg-[var(--lr-steel-50)] min-h-screen">
      {/* En-tête */}
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="lr-eyebrow text-[var(--lr-orange-400)]">Console admin · Import</span>
            <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight mt-1">
              Importer les 20 articles
            </h1>
            <p className="mt-1 text-white/60 text-sm">
              Auteur : Yves Roland OUIYA · Label Retail · Jan 2025 → Mai 2026
            </p>
          </div>
          <Link href="/blogs" className="lr-mono text-xs text-white/60 hover:text-white transition-colors">
            ← Retour au blog
          </Link>
        </div>
      </header>

      <main className="lr-container py-10 max-w-4xl">
        {/* Compteurs */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="bg-white border border-[var(--lr-border)] px-5 py-3 flex items-center gap-3">
            <span className="font-display text-2xl font-bold text-[var(--lr-navy-900)]">{ARTICLES.length}</span>
            <span className="lr-mono text-xs text-[var(--lr-steel-500)] uppercase">articles total</span>
          </div>
          <div className="bg-white border border-green-300 px-5 py-3 flex items-center gap-3">
            <span className="font-display text-2xl font-bold text-green-700">{successCount}</span>
            <span className="lr-mono text-xs text-green-600 uppercase">importés</span>
          </div>
          {errorCount > 0 && (
            <div className="bg-white border border-red-300 px-5 py-3 flex items-center gap-3">
              <span className="font-display text-2xl font-bold text-red-700">{errorCount}</span>
              <span className="lr-mono text-xs text-red-600 uppercase">erreurs</span>
            </div>
          )}
        </div>

        {/* Bouton d'import global */}
        {!done && (
          <div className="mb-6 flex flex-wrap gap-3 items-center">
            <button
              onClick={importAll}
              disabled={importing}
              className="lr-btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {importing ? `// Import en cours… (${successCount}/${ARTICLES.length})` : '↑ Importer tous les articles'}
            </button>
            <span className="lr-mono text-xs text-[var(--lr-steel-400)]">
              Ou importez article par article avec le bouton ↑ à droite de chaque ligne
            </span>
          </div>
        )}

        {done && (
          <div className="mb-6 bg-green-50 border border-green-300 px-5 py-4 flex items-center justify-between">
            <span className="text-green-800 font-semibold">
              ✓ Import terminé — {successCount} article{successCount > 1 ? 's' : ''} importé{successCount > 1 ? 's' : ''}{errorCount > 0 ? `, ${errorCount} erreur(s)` : ''}
            </span>
            <Link href="/blogs" className="lr-btn-secondary text-sm">Voir le blog →</Link>
          </div>
        )}

        {/* Liste des articles */}
        <div className="grid gap-px bg-[var(--lr-border)] border border-[var(--lr-border)]">
          {ARTICLES.map((art, idx) => {
            const st = statuses[idx];
            return (
              <div
                key={idx}
                className="bg-white p-4 flex items-center gap-4 hover:bg-[var(--lr-steel-50)] transition-colors"
              >
                {/* Numéro */}
                <span className="lr-mono text-xs text-[var(--lr-steel-400)] flex-shrink-0 w-8 text-right">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                {/* Infos article */}
                <div className="flex-1 min-w-0">
                  <p className="font-display text-sm font-semibold text-[var(--lr-navy-900)] truncate">{art.title}</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                    <span className="lr-mono text-[10px] text-[var(--lr-steel-400)]">📅 {art.published_date}</span>
                    <span className="lr-mono text-[10px] text-[var(--lr-orange-600)]">{art.category}</span>
                    <span className="lr-mono text-[10px] text-[var(--lr-steel-400)]">🌐 {art.language}</span>
                  </div>
                </div>

                {/* Statut */}
                <div className="flex-shrink-0 flex items-center gap-2">
                  {st.status === 'idle' && (
                    <button
                      onClick={() => importOne(idx)}
                      className="lr-mono text-[10px] uppercase tracking-widest text-[var(--lr-navy-700)] hover:text-[var(--lr-orange-600)] border-b border-[var(--lr-navy-700)] pb-0.5"
                    >
                      ↑ Importer
                    </button>
                  )}
                  {st.status === 'loading' && (
                    <span className="lr-mono text-[10px] text-[var(--lr-steel-400)] animate-pulse">// Import…</span>
                  )}
                  {st.status === 'success' && (
                    <span className="lr-mono text-[10px] text-green-700 font-semibold">✓ Importé</span>
                  )}
                  {st.status === 'error' && (
                    <div className="flex items-center gap-2">
                      <span className="lr-mono text-[10px] text-red-600" title={st.message}>✕ Erreur</span>
                      <button
                        onClick={() => importOne(idx)}
                        className="lr-mono text-[10px] uppercase tracking-widest text-[var(--lr-navy-700)] hover:text-[var(--lr-orange-600)] border-b border-[var(--lr-navy-700)] pb-0.5"
                      >
                        ↻ Réessayer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
