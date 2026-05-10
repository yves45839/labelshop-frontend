# Stockage Vidéo : NVR, DVR ou Cloud ? Comment Faire le Bon Choix  
# Video Storage: NVR, DVR, or Cloud? How to Make the Right Choice

**Auteur / Author:** Yves Roland OUIYA — Label Retail  
**Date:** 17 février 2026  
**Catégorie / Category:** Vidéosurveillance · CCTV · Stockage / Storage  

---

## 🇫🇷 Version Française

### Introduction

La caméra est l'œil de votre système de surveillance, mais l'enregistreur en est la mémoire. Un système sans stockage fiable n'est d'aucune utilité lors d'un incident. Comprendre les différentes options de stockage vidéo — DVR, NVR et cloud — est essentiel pour concevoir un système performant et pérenne.

### DVR : L'Enregistreur Vidéo Numérique (Analogique)

Le DVR (Digital Video Recorder) est l'enregistreur associé aux caméras analogiques. Il reçoit les signaux vidéo analogiques via les câbles coaxiaux, les numérise et les enregistre sur un disque dur interne.

**Caractéristiques :**
- Compatible uniquement avec les caméras analogiques (et analogiques HD : TVI, CVI, AHD)
- Nombre de canaux fixe (4, 8, 16, 32 voies)
- Disques durs internes (généralement 1 à 8 To par disque, plusieurs disques possibles)
- Résolution d'enregistrement limitée par la technologie analogique
- Accès à distance via IP (la plupart des DVR modernes ont une interface réseau)

**Quand choisir le DVR ?** Uniquement pour les installations utilisant des caméras analogiques existantes et pour lesquelles la migration IP n'est pas à l'ordre du jour.

### NVR : L'Enregistreur Vidéo Réseau (IP)

Le NVR (Network Video Recorder) est conçu pour les systèmes de caméras IP. Il reçoit les flux vidéo compressés (H.264, H.265) directement sur le réseau et les enregistre sur ses disques durs.

**Caractéristiques :**
- Compatible avec les caméras IP de n'importe quelle marque (si ONVIF)
- Nombre de canaux extensible (selon le modèle et la licence)
- Disques durs internes (jusqu'à 8 baies dans les NVR professionnels) ou stockage réseau (NAS, SAN)
- Supporte toutes les résolutions IP (jusqu'à 32 MP et au-delà)
- Fonctions IA intégrées sur les NVR modernes (détection d'événements, recherche intelligente)
- Switch PoE intégré sur certains modèles (alimente directement les caméras)

**Calcul de la capacité de stockage nécessaire**

La formule de base est :
```
Capacité (To) = Débit (Mbps) × Nombre de caméras × Durée de rétention (heures) × 3600 / (8 × 1 024³)
```

Exemple : 16 caméras à 4 MP en H.265 (~2 Mbps chacune), 30 jours de rétention :
= 2 × 16 × 720 × 3600 / (8 × 1 073 741 824) ≈ **8,6 To**

Le H.265 (HEVC) réduit d'environ 50% le volume de stockage par rapport au H.264, ce qui en fait le codec recommandé pour toute nouvelle installation.

### Le Stockage Cloud

Les flux vidéo ou les enregistrements (continus ou sur événements) sont transmis et stockés sur des serveurs distants chez un prestataire cloud.

**Avantages :**
- Pas d'équipement local à gérer
- Accessibilité depuis n'importe où
- Redondance géographique (les données sont dupliquées sur plusieurs datacenters)
- Scalabilité immédiate
- Pas de risque de vol physique de l'enregistreur

**Inconvénients :**
- Coût récurrent (abonnement mensuel ou annuel)
- Dépendance totale à la connectivité internet
- Questions de confidentialité et de souveraineté des données
- Bande passante montante importante nécessaire (problème en Afrique où les connexions asymétriques sont courantes)

**Quand choisir le cloud ?** Pour les petites installations avec peu de caméras, les sites sans technicien local, ou comme solution de backup pour les enregistrements critiques.

### L'Architecture Hybride : Le Meilleur des Deux Mondes

La solution la plus pragmatique pour la majorité des installations professionnelles est l'architecture hybride :

- **Enregistrement local (NVR)** : les flux sont enregistrés en continu sur le NVR pour une disponibilité immédiate et sans dépendance internet
- **Archivage cloud sélectif** : seuls les événements détectés (mouvement, alarme) sont envoyés dans le cloud pour un archivage longue durée et une redondance géographique
- **Accès à distance sécurisé** : consultation des flux et des enregistrements via une plateforme cloud, sans exposer le NVR directement sur internet

### Dimensionnement et Recommandations Label Retail

Pour tout projet, nous réalisons un calcul précis de la capacité de stockage nécessaire en fonction de :
- Nombre et résolution des caméras
- Durée de rétention réglementaire (en France : 1 mois maximum pour les ERP, variable ailleurs)
- Mode d'enregistrement (continu, sur mouvement, sur alarme)
- Codec utilisé (H.264 vs H.265+)
- Redondance souhaitée (RAID 1, RAID 5, RAID 6)

Nous recommandons systématiquement le RAID 5 minimum pour les installations professionnelles afin de garantir la continuité d'enregistrement en cas de panne d'un disque.

### Conclusion

Le bon choix de stockage est aussi important que le choix des caméras. Un enregistrement de mauvaise qualité ou perdu lors d'une panne disque peut compromettre une enquête entière. Faites confiance aux experts Label Retail pour dimensionner et configurer un système de stockage fiable et adapté à vos besoins.

---

## 🇬🇧 English Version

### Introduction

The camera is the eye of your surveillance system, but the recorder is its memory. A system without reliable storage is useless in the event of an incident. Understanding the different video storage options — DVR, NVR, and cloud — is essential for designing a high-performing and lasting system.

### DVR: Digital Video Recorder (Analog)

The DVR is the recorder associated with analog cameras. It receives analog video signals via coaxial cables, digitizes them, and records them on an internal hard drive.

**Characteristics:** compatible only with analog cameras (and HD analog: TVI, CVI, AHD), fixed number of channels (4, 8, 16, 32), internal hard drives (generally 1 to 8 TB per drive, multiple drives possible), recording resolution limited by analog technology, remote access via IP (most modern DVRs have a network interface).

**When to choose DVR?** Only for installations using existing analog cameras where IP migration is not planned.

### NVR: Network Video Recorder (IP)

The NVR is designed for IP camera systems. It receives compressed video streams (H.264, H.265) directly over the network and records them on its hard drives.

**Characteristics:** compatible with IP cameras from any brand (if ONVIF compliant), extensible number of channels (depending on model and license), internal hard drives (up to 8 bays in professional NVRs) or network storage (NAS, SAN), supports all IP resolutions (up to 32 MP and beyond), integrated AI functions on modern NVRs, built-in PoE switch on some models.

H.265 (HEVC) reduces storage volume by approximately 50% compared to H.264, making it the recommended codec for any new installation.

### Cloud Storage

Video streams or recordings (continuous or event-based) are transmitted and stored on remote servers at a cloud provider.

**Advantages:** no local equipment to manage, accessibility from anywhere, geographic redundancy, immediate scalability, no risk of physical recorder theft.

**Disadvantages:** recurring cost (monthly or annual subscription), total dependence on internet connectivity, data privacy and sovereignty questions, significant upstream bandwidth required (a challenge in Africa where asymmetric connections are common).

### Hybrid Architecture: The Best of Both Worlds

The most pragmatic solution for most professional installations is the hybrid architecture: continuous local recording on the NVR for immediate availability without internet dependency, plus selective cloud archiving of detected events only, plus secure remote access via a cloud platform without exposing the NVR directly to the internet.

### Conclusion

The right choice of storage is as important as the choice of cameras. Poor quality recording or data lost due to disk failure can compromise an entire investigation. Trust the Label Retail experts to size and configure a reliable storage system tailored to your needs.

---

*Label Retail — Expertise en sécurité électronique / Electronic Security Expertise*  
*Contact : roland@label-ci.com*
