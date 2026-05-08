# Proposition de refonte — Page d'accueil Label Retail

**Auteur :** Yves (roland@label-ci.com)
**Date :** 8 mai 2026
**Fichier ciblé :** `components/HomePageClient.tsx`

---

## 1. Diagnostic de la page actuelle

La home actuelle est propre et performante, mais elle ne raconte qu'une seule histoire : *Label Retail = revendeur Hikvision*. Trois problèmes en découlent :

1. **Offre invisible.** LR Time (votre SaaS de gestion temps & présence) n'apparaît nulle part. Pourtant c'est un actif différenciant, propriétaire et récurrent (revenu d'abonnement vs vente one-shot).
2. **Activité formation absente.** Les formations Hikvision, LR Time, certifiantes et sur-mesure ne sont pas proposées comme un pôle de revenu/légitimité, alors qu'elles renforcent fortement la position d'« intégrateur expert » que vous occupez sur le marché ivoirien.
3. **Mélange produits / services.** Le bloc "Services" affiche en réalité des catégories produits (Vidéosurveillance AI, Contrôle d'accès, Portails…). Le visiteur B2B ne sait pas distinguer *ce qu'il achète* de *ce qu'il fait livrer / former*.

Le résultat : un visiteur DSI ou DRH qui arrive sur la page repart avec l'idée « ils vendent des caméras », alors que vous êtes en réalité un **intégrateur 4 pôles** (Produits — Services & Intégration — LR Time — Formations).

---

## 2. Architecture proposée

Nouvelle home pensée comme un entonnoir B2B en 8 sections, mobile-first, pensée SEO et lisibilité.

| # | Section | Objectif | Audience visée |
|---|---------|----------|----------------|
| 1 | Hero recadré | Annoncer les 4 pôles d'expertise, pas seulement Hikvision | Tous |
| 2 | Bandeau de réassurance | Chiffres clés + logos clients/partenaires | Décideurs |
| 3 | Les 4 pôles d'expertise | Produits / Services / **LR Time** / **Formations** | Tous |
| 4 | Spotlight LR Time | Mettre en scène le SaaS comme produit phare | DRH, dirigeants |
| 5 | Catalogue produits phares | Cards produits (existant, conservé) | Acheteurs |
| 6 | Catalogue formations | Sessions à venir + 4 familles de formations | RH, formation |
| 7 | Pourquoi Label Retail | Pillars repositionnés sur l'expertise locale | Tous |
| 8 | CTA double | Devis projet **+** Démo LR Time | Conversion |

---

## 3. Détail section par section

### Section 1 — Hero recadré

**Texte proposé :**

> **Sécurité électronique, gestion du temps et formations certifiantes — sous un seul toit en Côte d'Ivoire.**
>
> Label Retail conçoit, déploie et forme. De la caméra Hikvision installée sur votre site à la solution **LR Time** qui pilote vos pointages, jusqu'aux sessions certifiantes pour vos équipes : un partenaire local, quatre expertises.

**3 boutons** (au lieu de 2 actuels) :
- `Explorer les solutions` → /products
- `Découvrir LR Time` → /lr-time *(nouvelle page à créer)*
- `Voir les formations` → /formations *(nouvelle page à créer)*

**Visuel :** garder le carrousel actuel mais ajouter 2 visuels (interface LR Time + scène de formation en salle).

### Section 2 — Bandeau de réassurance

Un strip horizontal sobre avec 4 chiffres. Exemple (à remplacer par vos vrais chiffres) :

- **+12 ans** d'expertise Hikvision en Côte d'Ivoire
- **350+** sites sécurisés
- **40+** entreprises sur LR Time
- **600+** professionnels formés

Ce bloc transforme la promesse en preuve. Il est aussi excellent pour le SEO local (mots-clés : Côte d'Ivoire, intégrateur, certifié).

### Section 3 — Les 4 pôles d'expertise

Quatre cards égales, en grille 2x2 sur mobile et 4 colonnes sur desktop. Pour chacune : icône, titre, 2 lignes de description, lien.

| Pôle | Tagline courte | CTA |
|------|----------------|-----|
| **Produits** | Caméras, alarmes, contrôle d'accès Hikvision et solutions périphériques. | Voir le catalogue |
| **Services & Intégration** | Étude, câblage, déploiement, supervision 24/7. | Demander un devis |
| **LR Time** | Notre SaaS de pointage et gestion du temps, pensé pour le marché africain. | Lancer une démo |
| **Formations** | Techniques Hikvision, utilisateurs LR Time, certifiantes, sur-mesure. | Voir les sessions |

C'est **la section pivot** de la nouvelle home : elle dit en 4 lignes ce que vous faites.

### Section 4 — Spotlight LR Time

Une section dédiée, fond contrasté (dégradé ambre→ardoise par exemple) avec :

- **Capture d'écran** ou mockup du dashboard LR Time (côté gauche desktop, en haut mobile).
- **3 bénéfices clés** côté droit :
  - Pointage biométrique, badge ou mobile, en temps réel.
  - Calculs d'heures, congés et exports paie automatisés.
  - Hébergé localement, conforme à la réglementation ivoirienne.
- **Bouton :** `Demander une démo gratuite`.
- **Tag de prix indicatif** ou « à partir de X FCFA / utilisateur / mois » (très efficace en B2B SaaS).

Cette section seule peut justifier la refonte : elle transforme LR Time d'« option cachée » en produit phare.

### Section 5 — Catalogue produits phares

**Conserver** la section actuelle (cards produits aléatoires depuis l'API). Elle fonctionne bien. Petit ajustement : remplacer le texte générique « Fiche détaillée, options d'installation… » par des badges utiles (en stock / sur commande / catégorie).

### Section 6 — Catalogue formations

Section nouvelle. Deux niveaux d'information :

**a) 4 familles de formations** (cards horizontales, 1 par ligne sur mobile, 2x2 sur desktop) :
1. **Techniques Hikvision** — installation, configuration, maintenance.
2. **Utilisateurs LR Time** — managers, RH, utilisateurs finaux.
3. **Certifiantes & habilitations** — courants faibles, sécurité électronique.
4. **Sur-mesure entreprises** — programmes adaptés à vos équipes.

**b) Prochaines sessions ouvertes** (3 lignes max, dynamique) :

> 📅 *15 juin — Configuration HikCentral Pro — 3 jours — Plateau, Abidjan*
> 📅 *22 juin — LR Time pour managers — 1 jour — En ligne*
> 📅 *5 juillet — Habilitation B1V/H1V — 2 jours — Marcory*

CTA : `S'inscrire à une session` → /formations

### Section 7 — Pourquoi Label Retail (pillars repositionnés)

Garder le format 3 cards mais réécrire pour appuyer le **positionnement intégrateur 4 pôles** :

| Avant | Après proposé |
|-------|---------------|
| Innovation sur-mesure | **Un seul interlocuteur, quatre expertises** — fini les sous-traitants empilés : matériel, intégration, logiciel et formation chez nous. |
| Déploiement sans friction | **Ancrage local, support local** — équipes basées à Abidjan, intervention sous 48h, support en français. |
| Monitoring 24/7 | **Continuité par la formation** — vos équipes deviennent autonomes : moins de dépendance, moins de coût total. |

### Section 8 — CTA double

Au lieu d'un seul gros CTA générique, deux entrées claires côte à côte :

- **Vous avez un projet sécurité / réseau ?** → `Demander un devis`
- **Vous voulez tester LR Time ?** → `Réserver une démo`

Les deux mènent à `/contact` mais avec un paramètre `?sujet=devis|demo` pour pré-remplir le formulaire et tracer le canal d'acquisition.

---

## 4. Charte visuelle — recommandations

- **Conserver** la palette actuelle (ambre 600 + ardoise) : elle est cohérente, sobre, B2B.
- **Ajouter** une couleur secondaire pour LR Time uniquement (ex. bleu indigo) afin que le SaaS ait une identité visuelle distincte des produits Hikvision (ambre). Cela aide le visiteur à comprendre que c'est *votre* produit.
- **Typographie :** garder.
- **Animations :** garder le `framer-motion` actuel mais limiter à 2 sections (hero + spotlight LR Time) pour rester rapide.

---

## 5. Impact SEO et lisibilité mobile

- **Nouveaux mots-clés** captés : `gestion temps présence Côte d'Ivoire`, `logiciel pointage Abidjan`, `formation Hikvision Côte d'Ivoire`, `formation sécurité électronique`.
- **Maillage interne** renforcé : la home pointe désormais vers 3 pages clés (`/lr-time`, `/formations`, `/products`) au lieu d'une seule.
- **Mobile :** chaque section reste en 1 colonne empilée, hauteur maîtrisée (pas de bloc > 2 écrans).
- **Performance :** les nouvelles sections sont du HTML/CSS pur, aucune dépendance JS supplémentaire.

---

## 6. Plan d'implémentation suggéré

Si la proposition vous convient, voici l'ordre que je recommande :

1. **Refonte de `HomePageClient.tsx`** avec la nouvelle structure (1 fichier modifié, sections 1, 2, 3, 4, 6, 7, 8 réécrites, section 5 conservée).
2. **Création de la page `/lr-time`** (page produit dédiée au SaaS).
3. **Création de la page `/formations`** (catalogue + sessions à venir).
4. **Mise à jour de la `Navbar.tsx`** pour ajouter les liens "LR Time" et "Formations".
5. **Mise à jour du sitemap** (`app/sitemap.xml/route.ts`).
6. **Ajout de visuels** : screenshot LR Time (à fournir) + photo de session formation (à fournir).

Étapes 1 + 4 livrables en une session si vous validez la copie. Étapes 2, 3, 6 nécessitent un retour de votre côté (visuels + chiffres réels + descriptifs LR Time).

---

## 7. Questions ouvertes pour vous

Avant de coder, trois choses à arbitrer :

1. **Chiffres clés** — quelles valeurs réelles pour les 4 stats du bandeau de réassurance ?
2. **LR Time** — avez-vous une capture d'écran à utiliser, ou je propose un mockup générique ?
3. **Sessions de formations** — la liste doit-elle être éditable en BDD (route API) ou en dur dans le code pour démarrer ?

---

*Si vous validez cette structure (même partiellement), je commence l'implémentation directe sur `HomePageClient.tsx`.*
