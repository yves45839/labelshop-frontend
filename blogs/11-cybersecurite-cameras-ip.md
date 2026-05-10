# Cybersécurité et Vidéosurveillance : Protéger Vos Caméras IP des Attaques  
# Cybersecurity and Video Surveillance: Protecting Your IP Cameras from Attacks

**Auteur / Author:** Yves Roland OUIYA — Label Retail  
**Date:** 3 novembre 2025  
**Catégorie / Category:** Vidéosurveillance · Cybersécurité · CCTV · Cybersecurity  

---

## 🇫🇷 Version Française

### Introduction

En 2016, le botnet Mirai a infecté des centaines de milliers de caméras IP mal sécurisées dans le monde entier et les a utilisées pour lancer des attaques DDoS d'une amplitude sans précédent, paralysant des pans entiers d'Internet. Ce n'était pas un incident isolé. Aujourd'hui encore, des millions de caméras de surveillance restent vulnérables, parfois accessibles publiquement sur internet avec leurs identifiants par défaut. La cybersécurité de vos caméras IP est une responsabilité que vous ne pouvez plus ignorer.

### Pourquoi les Caméras IP Sont-elles Vulnérables ?

**Mots de passe par défaut non modifiés**  
La grande majorité des incidents de piratage de caméras est due à un mot de passe administrateur jamais changé. Des combinaisons comme "admin/admin" ou "admin/12345" sont testées en priorité par les outils de scan automatique.

**Firmware obsolète**  
Les fabricants publient régulièrement des mises à jour de firmware qui corrigent des vulnérabilités découvertes. Une caméra dont le firmware n'est pas mis à jour reste exposée à des failles connues et documentées publiquement.

**Exposition directe à internet (IP publique)**  
Des caméras exposées directement sur internet avec leurs ports d'administration ouverts (port 80, 8080, RTSP) sont indexées par des moteurs de recherche spécialisés comme Shodan, rendant leur découverte triviale pour un attaquant.

**Protocoles non chiffrés**  
RTSP (protocole de streaming vidéo) ne chiffre pas les données par défaut. Un attaquant positionné sur le réseau peut intercepter les flux vidéo en clair.

**Intégration réseau non segmentée**  
Des caméras placées sur le même réseau que les ordinateurs de bureau permettent à un attaquant qui compromet une caméra d'accéder potentiellement à l'ensemble du réseau de l'entreprise.

### Les Bonnes Pratiques de Sécurisation

**1. Changement systématique des mots de passe**  
Dès l'installation, remplacez tous les mots de passe par défaut par des mots de passe forts (minimum 12 caractères, mélange de majuscules, minuscules, chiffres et symboles). Utilisez des mots de passe uniques pour chaque appareil.

**2. Mise à jour régulière des firmwares**  
Établissez un calendrier de vérification et de mise à jour des firmwares (au moins trimestriel). Chez Label Retail, cette opération est intégrée à nos contrats de maintenance.

**3. Segmentation réseau (VLAN)**  
Isolez vos caméras sur un VLAN dédié, séparé du réseau bureautique. Ainsi, même en cas de compromission d'une caméra, l'attaquant ne peut pas latéralement accéder aux autres systèmes.

**4. Accès à distance sécurisé (VPN)**  
N'exposez jamais vos caméras directement sur internet. Pour l'accès à distance, utilisez un VPN (Virtual Private Network) ou un serveur de relais sécurisé. Les flux vidéo sont ainsi chiffrés de bout en bout.

**5. Chiffrement des flux**  
Configurez vos caméras pour utiliser RTSPS (RTSP over TLS) ou HTTPS pour les flux vidéo. Vérifiez que votre NVR et vos logiciels de supervision supportent ces protocoles sécurisés.

**6. Désactivation des services inutiles**  
Désactivez tous les protocoles et services non utilisés sur vos caméras : Telnet, FTP, UPnP, multicast non nécessaire. Moins la surface d'attaque est grande, mieux c'est.

**7. Authentification à deux facteurs**  
Pour les accès à la plateforme de supervision, activez l'authentification à deux facteurs (2FA) afin de protéger l'accès administrateur même en cas de vol de mot de passe.

**8. Journalisation et surveillance des accès**  
Activez et consultez régulièrement les journaux d'accès de vos équipements. Des tentatives de connexion répétées en dehors des heures de travail sont un indicateur d'activité suspecte.

### Le Rôle de Label Retail dans la Sécurisation

Chez Label Retail, la cybersécurité des installations que nous déployons est une composante non négociable. Nos techniciens sont formés aux bonnes pratiques de sécurisation réseau et appliquent systématiquement une checklist de sécurisation à chaque installation. Nous pouvons également réaliser un audit de sécurité de votre installation existante et vous proposer un plan de remédiation.

### Conclusion

Une caméra de surveillance compromise peut se retourner contre vous : espionnage, sabotage de l'enregistrement lors d'une intrusion, ou utilisation comme tête de pont pour attaquer votre réseau. La sécurité physique et la cybersécurité sont indissociables. Ne les dissociez pas.

---

## 🇬🇧 English Version

### Introduction

In 2016, the Mirai botnet infected hundreds of thousands of poorly secured IP cameras worldwide and used them to launch unprecedented DDoS attacks, crippling large swaths of the internet. This was not an isolated incident. Today, millions of surveillance cameras remain vulnerable, sometimes publicly accessible online with their default credentials. The cybersecurity of your IP cameras is a responsibility you can no longer ignore.

### Why Are IP Cameras Vulnerable?

**Unchanged default passwords**: The vast majority of camera hacking incidents are due to an administrator password that was never changed. Combinations like "admin/admin" or "admin/12345" are tested first by automated scanning tools.

**Outdated firmware**: Manufacturers regularly release firmware updates that fix discovered vulnerabilities. A camera with outdated firmware remains exposed to known, publicly documented flaws.

**Direct internet exposure**: Cameras exposed directly on the internet with open administration ports (port 80, 8080, RTSP) are indexed by specialized search engines like Shodan, making their discovery trivial for an attacker.

**Unencrypted protocols**: RTSP (video streaming protocol) does not encrypt data by default. An attacker positioned on the network can intercept video streams in plaintext.

**Non-segmented network integration**: Cameras placed on the same network as office computers allow an attacker who compromises a camera to potentially access the entire corporate network.

### Security Best Practices

**1. Systematic Password Changes**: From the moment of installation, replace all default passwords with strong ones (minimum 12 characters, mix of uppercase, lowercase, numbers, and symbols). Use unique passwords for each device.

**2. Regular Firmware Updates**: Establish a schedule for checking and updating firmware (at least quarterly). At Label Retail, this is integrated into our maintenance contracts.

**3. Network Segmentation (VLAN)**: Isolate your cameras on a dedicated VLAN, separate from the office network. Even if a camera is compromised, the attacker cannot laterally access other systems.

**4. Secure Remote Access (VPN)**: Never expose your cameras directly on the internet. For remote access, use a VPN (Virtual Private Network) or a secure relay server. Video streams are thus encrypted end-to-end.

**5. Stream Encryption**: Configure your cameras to use RTSPS (RTSP over TLS) or HTTPS for video streams. Verify that your NVR and supervision software support these secure protocols.

**6. Disabling Unused Services**: Disable all unused protocols and services on your cameras: Telnet, FTP, UPnP, unnecessary multicast. The smaller the attack surface, the better.

**7. Two-Factor Authentication**: For access to the supervision platform, enable two-factor authentication (2FA) to protect administrator access even in the event of password theft.

**8. Access Logging and Monitoring**: Activate and regularly review access logs on your equipment. Repeated login attempts outside business hours are an indicator of suspicious activity.

### Label Retail's Role in Securing Installations

At Label Retail, the cybersecurity of the installations we deploy is a non-negotiable component. Our technicians are trained in network security best practices and systematically apply a security checklist to every installation. We can also conduct a security audit of your existing installation and propose a remediation plan.

### Conclusion

A compromised surveillance camera can be turned against you: espionage, recording sabotage during an intrusion, or use as a foothold to attack your network. Physical security and cybersecurity are inseparable. Do not treat them separately.

---

*Label Retail — Expertise en sécurité électronique / Electronic Security Expertise*  
*Contact : roland@label-ci.com*
