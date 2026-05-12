# Plan de sprints — Section LR Time (solution complète)

**Périmètre :** transformer la page unique `app/lr-time/page.tsx` (vitrine) en une **section produit exhaustive** : hub vitrine + fiche technique + FAQ + centre de support + guide d'utilisation + manuel utilisateur + changelog + statut + ressources.

**Stack en place :** Next.js 15 (App Router) / React 19 / Tailwind 4 / Framer Motion / TypeScript. Tokens CSS LR Time déjà déclarés (`--lr-navy-*`, `--lr-orange-*`, `--lr-steel-*`, `lr-blueprint-dark`, `lr-stripe`, `lr-btn-primary`, etc.).

**Charte produit :** style **LR Time** (bleu marine `#243C8C` + orange chaud `#E86B30`, ton professionnel, mise en forme épurée). L'éditeur/expéditeur reste **Label Retail**.

**Langues cibles :** **français** (par défaut) + **anglais** (i18n côté `/en/lr-time/...`). L'anglais peut être livré en sprint 6.

**Hypothèses ressources :**
- 1 dev frontend à temps plein (diviser les durées sinon).
- **1 rédacteur / content designer à temps plein sur 4 semaines** (sprints 0 → 4) pour produire FAQ, manuel, guides et copy marketing. Track de rédaction explicité en §4-bis.
- 1 référent produit / SAV côté Label Retail (~3 h/semaine) pour valider le contenu, fournir captures et trancher les arbitrages techniques.
- Backend LR Time (`app.lr-time.ci`) expose au minimum : endpoint `/status`, endpoint `/support/tickets` (POST), endpoint `/changelog` (GET). Si indisponible : on stub via fichiers JSON statiques (voir Sprint 0).

**Durée totale estimée :** **8 sprints de 1 semaine** (~8 semaines). Les sprints 1 à 5 sont bloquants pour livrer la « solution complète » ; les sprints 6 à 8 sont du polish, de l'i18n et de l'observabilité.

---

## 0. Architecture — phase actuelle et phase ultérieure

> **Décision produit :** en **Phase 1** (ce plan), **tout** vit sur `labelretail.ci`. **Aucun lien sortant** vers une éventuelle app LR Time hébergée ailleurs n'est exposé au visiteur. La vitrine, la documentation et le support sont **autonomes** sur Label Retail.
>
> Les CTA d'accès au SaaS (« Se connecter », « Essai gratuit ») sont **différés en Phase 2**, à activer quand le produit décidera de pointer publiquement vers son URL d'app. La structure du code est prête (variable d'env, composant) mais **n'est pas branchée** dans cette phase.

### Phase 1 — ce que ce plan livre (périmètre actif)

| Bloc | Hébergement | Contenu |
|------|-------------|---------|
| Hub vitrine `/lr-time` | `labelretail.ci` | Présentation produit, KPIs, modules cliquables vers les pages détaillées |
| Pages module `/lr-time/fonctionnalites/<slug>` | `labelretail.ci` | 6 pages module alignées sur §1-bis |
| Fiche technique `/lr-time/fiche-technique` | `labelretail.ci` | Specs, prérequis, sécurité, périphériques compatibles + PDF téléchargeable |
| Tarifs `/lr-time/tarifs` | `labelretail.ci` | Paliers + simulateur ; CTA = `/contact?sujet=devis` (interne) |
| FAQ `/lr-time/faq` + `/lr-time/faq/<slug>` | `labelretail.ci` | 40 questions cherchables |
| Support `/lr-time/support` + `/nouveau-ticket` + `/sla` + `/urgence` | `labelretail.ci` | Ticket envoyé par email à `support@label-ci.com` |
| Manuel `/lr-time/manuel` (11 chapitres) | `labelretail.ci` | Documentation utilisateur exhaustive |
| Guides `/lr-time/guide/<persona>` (4) | `labelretail.ci` | Pas-à-pas par persona |
| Changelog `/lr-time/changelog` | `labelretail.ci` | Liste de versions, alimentée manuellement |
| Statut `/lr-time/statut` | `labelretail.ci` | Affichage statique en Phase 1 (JSON édité par ops) ; sondage auto en Phase 2 |
| Ressources `/lr-time/ressources` | `labelretail.ci` | Vidéos, modèles, kit onboarding |

**Tous les CTA actifs en Phase 1** restent **internes** : `/contact?sujet=demo`, `/contact?sujet=devis`, `/lr-time/support/nouveau-ticket`, et navigation vers les sous-pages du hub.

### Phase 2 — différée (à activer plus tard, hors périmètre du plan actuel)

À déclencher quand l'équipe produit voudra basculer le SaaS en accès public et exposer son URL :

- Réintroduire les CTA externes « Essai gratuit » et « Se connecter » dans le hero du hub et dans la CTA finale.
- Activer le composant `<ExternalAppLink>` (codé mais pas utilisé en Phase 1).
- Brancher la page statut sur les vrais endpoints `/health/` et `/ready/` du backend (proxy SSR Next).
- Insérer dans le manuel/guides les pas-à-pas qui réfèrent à des écrans précis de l'app, avec liens deep cliquables.
- Décider la stratégie SEO multi-domaine (canonical, hreflang, indexation).

**Aucune fonctionnalité de Phase 2 ne doit fuiter visuellement en Phase 1** : pas de bouton « bientôt disponible », pas de placeholder « connectez-vous », pas de mention de l'URL de l'app dans la copy publique.

### Documentation et support **en autonomie totale** sur Label Retail

Pendant toute la Phase 1, le visiteur trouve sur `labelretail.ci/lr-time` :

- **Comment fonctionne le produit** (manuel, guides) — décrits en termes de **fonctionnalités et de workflows**, pas en termes d'URL d'app. Exemple à retenir : « Pour valider une demande de congé, le manager ouvre la liste des demandes et clique sur Approuver », **pas** « Allez sur app.lr-time.ci/leave-requests ».
- **Comment se faire aider** : FAQ + ticket (email) + numéro d'urgence + SLA.
- **Quand le produit évolue** : changelog éditorial.
- **Si un problème global se pose** : page statut (manuelle en Phase 1).

Le compte démo LR Time reste utilisé en interne pour produire les **captures d'écran** du manuel, mais ces captures sont stockées dans `public/lr-time/screenshots/` et **servies depuis Label Retail**. Aucun visiteur ne quitte le domaine.

---

## 1. État actuel — diagnostic

### Ce qui existe
- **Une seule route** `/lr-time` (fichier `app/lr-time/page.tsx`, 185 lignes).
- 5 sections : Hero, Bénéfices (3 cartes), Modules (6 cartes), Tarification indicative, CTA final.
- 2 CTA externes : `/contact?sujet=demo` et `/contact?sujet=devis`.
- Référence visuelle à `app.lr-time.ci` dans le mockup home (`HomePageClient.tsx`).
- Lien dans la `Navbar` (entry « LR TIME ») et dans `sitemap.xml`.

### Ce qui manque pour une « solution complète et fonctionnelle »
| Manque | Impact business | Sprint cible |
|--------|----------------|--------------|
| Détail des fonctionnalités par module (1 page par module) | Le prospect ne peut pas approfondir → fuit en démo non qualifiée | S1 |
| Fiche technique (specs, prérequis, périphériques compatibles, sécurité, hébergement) | L'IT du client demande ces infos avant achat | S2 |
| Grille tarifaire claire + simulateur | Manque de transparence → friction commerciale | S2 |
| FAQ structurée et cherchable | Saturation du support sur questions répétitives | S3 |
| Centre de support (ticket, contact, SLA, urgences) | Aucun canal SAV outillé | S3 |
| Guide d'utilisation par persona (admin RH, manager, employé, paie) | Onboarding client lent, dépendance aux formations | S4 |
| Manuel utilisateur exhaustif avec sommaire + recherche | Pas de doc de référence, perte de connaissance | S4 |
| Changelog versionné | Les clients ne voient pas la valeur ajoutée des MAJ | S5 |
| Page de statut (uptime, incidents) | Pas de transparence opérationnelle | S5 |
| Espace ressources (vidéos, modèles, kits onboarding) | Marketing produit pauvre | S5 |
| i18n FR/EN | Marché export | S6 |
| SEO produit, JSON-LD `SoftwareApplication`, OG dédié | Acquisition organique faible | S7 |
| Tests E2E + accessibilité + perf | Qualité release | S8 |

---

## 1-bis. Source de vérité — fonctionnalités réellement disponibles dans LR Time

> **Règle absolue :** tout contenu marketing, FAQ, manuel, guide ou changelog doit décrire **uniquement** ce qui est réellement implémenté dans le backend (`hikvision-django-integration`). Les fonctionnalités planifiées ou en cours sont marquées explicitement « roadmap ».

### Inventaire validé (audit du 2026-05-09)

| Module marketing | Backend Django | Endpoints front utilisés | État |
|------------------|----------------|--------------------------|------|
| **Pointage Hikvision** | `events.AttendanceEvent`, `hik_gateway.{Gateway, Device, RawEvent, AttendanceLog, DeviceCursor, DeviceReaderConfig}` ; webhook `/hik/events` ; mgmt `hik_catchup_acs_events` | `/api/hikgateway/events/`, `/api/hikgateway/acs-events/`, `/api/hikgateway/catchup-acs-events/`, `/api/hikgateway/read-card/`, `/api/hikgateway/register-webhooks/` | ✅ Réel |
| **Plannings & shifts** | `employees.{Planning, PlanningDailySlot, WorkShift, PlanningPeriod, PlanningEntry, PlanningAssignment}` (overtime_minutes, late_allowable_minutes, early_leave_allowable_minutes, flexible_weekend, effective_for_overtime/holiday) | `/api/plannings/`, `/api/planning-assignments/`, `/api/work-shifts/` | ✅ Réel |
| **Congés & absences** | `employees.LeaveRequest` (types : paid/sick/unpaid/special ; statuts : pending/approved/rejected/cancelled) | `/api/leave-requests/` | ✅ Réel |
| **Rapports & corrections** | `hik_gateway.{AttendanceLog, AttendanceCorrection, AttendanceCorrectionLog}` | `/api/hikgateway/reports/attendance/` (daily/weekly/monthly), `/api/hikgateway/attendance-corrections/` + `/logs/` | ✅ Réel — exports CSV/Excel manuels, **pas de connecteur Sage/Odoo direct** |
| **Employés & organisation** | `employees.{Employee, EmployeeAttribute, EmployeeCard, EmployeeFingerprint, EmployeeFace, Department, Organization, OrganizationMembership, OrganizationInvitation, AccessGroup}` ; `biometric_encryption.py` (Fernet) | `/api/employees/` (+ `/:id/`, search), `/api/access-groups/`, invitations | ✅ Réel — **biométrie chiffrée Fernet** au repos |
| **Terminaux & accès** | `devices.{Device, DeviceOrganizationBinding, DeviceOnboardingJob}`, `hik_gateway.{Gateway, Device, DeviceReaderConfig}` | `/api/devices/`, `/api/devices/:id/reboot/`, `/api/devices/:id/config-page/`, `/api/devices/onboard/`, `/api/device-onboarding-jobs/`, `/api/hikgateway/devices/`, `/api/hikgateway/sync-devices/` | ✅ Réel |

### Plateforme transverse (à mentionner dans la fiche technique, pas comme module métier)

| Capacité | Backend | Endpoints | État |
|----------|---------|-----------|------|
| Multi-tenant isolation | `tenants.{Tenant, TenantMembership, TenantRole}` | `/api/tenants/` | ✅ |
| Authentification JWT | `djangorestframework-simplejwt` | `/api/auth/token/`, `/api/auth/refresh/` | ✅ |
| RBAC organisation | `OrganizationRole` (org_admin/operator/viewer), `OrganizationCustomRole`, `OrganizationCustomRoleAssignment` | inclus dans `/api/employees/` membership flow | ✅ |
| GDPR (export/delete/DPA/consent) | `tenants.ConsentLog` + endpoints dédiés | export & delete tenant data | ✅ |
| Audit log | `audit.AuditEvent` | trace transverse | ✅ |
| Facturation Stripe | `billing.{Plan, Customer, Subscription, Invoice, Payment, UsageRecord}` (trial, metered, feature flags JSON) | `/api/billing/checkout/...`, `/portal/`, `/webhook/`, `/plans/`, `/subscriptions/`, `/invoices/` | ⚠️ Webhooks Stripe partiels (cf. `STATUS.md` du backend) |
| Healthchecks | `/health/`, `/ready/` | — | ✅ |
| Pages légales | `/legal/tos/`, `/legal/privacy/` | — | ✅ |

### Roadmap (à mentionner explicitement comme « à venir »)

- **Application mobile collaborateur** (consultation pointage, demande de congé, validation manager) — pas de code backend dédié à ce jour, à mentionner « roadmap 2026 ».
- **Connecteurs paie directs Sage / Odoo** — aujourd'hui exports CSV/Excel uniquement. À mentionner « à l'étude ».
- **Celery + Beat pour catchup ACS automatisé** — aujourd'hui le catchup s'appelle manuellement. Bloquant production côté backend (cf. `STATUS.md`).
- **Résilience gateway** (`resilient_gateway_call`) à câbler — code mort actuellement.
- **Tests d'isolation multi-tenant** + **tests Stripe** non encore couverts.

### Ce qu'on **ne dit pas** (interdits de wording)

- ❌ « Application mobile géolocalisée » — aucune base de code, ne pas annoncer comme livré.
- ❌ « Connecteur Sage » / « Connecteur Odoo » — pas de code, exports CSV uniquement.
- ❌ « Hébergé localement en Côte d'Ivoire » — à valider avec ops avant d'écrire ; sinon écrire « hébergement européen RGPD-compliant » qui est défendable.
- ❌ « Règles de primes paramétrables par convention collective » — le backend gère les marges (`overtime_minutes`, `late_allowable_minutes`) au niveau du `WorkShift` mais pas de moteur de règles par convention.
- ❌ « Pointage par QR code / par téléphone » — non implémenté.

---

## 2. Arborescence cible

```
app/
└── lr-time/
    ├── page.tsx                              # Hub vitrine (refonte)
    ├── layout.tsx                            # Layout commun (header produit + sous-nav)
    ├── fonctionnalites/
    │   ├── page.tsx                          # Liste des modules (refonte du bloc actuel)
    │   ├── pointage/page.tsx                 # 1 page par module (6 modules), slugs alignés sur le backend
    │   ├── plannings/page.tsx                # Planning, PlanningDailySlot, WorkShift, PlanningPeriod, PlanningEntry, PlanningAssignment
    │   ├── conges/page.tsx                   # LeaveRequest (paid/sick/unpaid/special, workflow approval)
    │   ├── rapports/page.tsx                 # /api/hikgateway/reports/attendance/ + AttendanceCorrection + logs
    │   ├── employes/page.tsx                 # Employee + Department + Organization + AccessGroup + biométrie chiffrée Fernet
    │   └── terminaux/page.tsx                # Devices Hikvision + DeviceOnboardingJob + sync/reboot/read-card
    ├── fiche-technique/
    │   └── page.tsx                          # Specs, prérequis, périphériques, sécurité
    ├── tarifs/
    │   └── page.tsx                          # Paliers + simulateur + FAQ tarifs
    ├── faq/
    │   ├── page.tsx                          # FAQ globale (par catégorie + recherche)
    │   └── [slug]/page.tsx                   # Réponse longue dédiée (SEO)
    ├── support/
    │   ├── page.tsx                          # Centre de support (entrée)
    │   ├── nouveau-ticket/page.tsx           # Formulaire ticket
    │   ├── urgence/page.tsx                  # Procédure urgence + numéros
    │   └── sla/page.tsx                      # Engagements de service
    ├── guide/
    │   ├── page.tsx                          # Hub guides (par persona)
    │   ├── admin-rh/page.tsx                 # Parcours administrateur RH
    │   ├── manager/page.tsx                  # Parcours manager d'équipe
    │   ├── employe/page.tsx                  # Parcours employé / utilisateur final
    │   └── paie/page.tsx                     # Parcours service paie
    ├── manuel/
    │   ├── page.tsx                          # Sommaire manuel
    │   ├── [...slug]/page.tsx                # Pages MDX (1 par chapitre)
    │   └── _content/                         # ≠ route, dossier MDX (chargé via fs)
    ├── changelog/
    │   └── page.tsx                          # Versions, dates, notes
    ├── statut/
    │   └── page.tsx                          # Disponibilité, incidents
    └── ressources/
        ├── page.tsx                          # Hub ressources (vidéos, fichiers)
        └── [slug]/page.tsx                   # Ressource individuelle
```

**Conventions :**
- Chaque page a son `metadata` dédié (`title`, `description`, `alternates.canonical`, `openGraph`).
- Chaque page de doc longue (manuel, guide, FAQ détaillée) ajoute le JSON-LD `BreadcrumbList` et selon le cas `Article`, `FAQPage` ou `HowTo`.
- Les routes `/lr-time/manuel/...` et `/lr-time/changelog` sont **statiquement générées** (`generateStaticParams`) pour la performance et le SEO.

---

## 3. Composants à produire (réutilisables)

| Composant | Sprint | Rôle |
|-----------|--------|------|
| `<LrTimeSubnav />` | S0 | Sous-navigation collante propre à la section (hub / fonctionnalités / fiche tech / tarifs / FAQ / support / guide / manuel) |
| `<LrTimeBreadcrumb />` | S0 | Fil d'Ariane (avec JSON-LD) |
| `<ModuleCard />` | S1 | Carte module utilisée dans hub + page fonctionnalités |
| `<FeaturePageLayout />` | S1 | Gabarit page module (hero compact + bénéfices + démo + CTA) |
| `<SpecTable />` | S2 | Tableau de specs (clé/valeur, groupes, badges) |
| `<DeviceCompatibilityCard />` | S2 | Carte périphérique compatible (badge, photo, refs) |
| `<PricingTier />` | S2 | Carte palier tarifaire |
| `<PricingSimulator />` | S2 | Simulateur (nb users, modules, périphériques) — `useReducer` côté client |
| `<FaqAccordion />` | S3 | Accordéon accessible (`role="button"`, ARIA) |
| `<FaqSearch />` | S3 | Recherche locale (Fuse.js) sur titres + tags |
| `<SupportTicketForm />` | S3 | Formulaire validé (Zod) + upload pièces jointes |
| `<StatusBadge />` | S3+S5 | « Opérationnel », « Dégradé », « Incident » |
| `<DocLayout />` | S4 | Layout 3 colonnes : sommaire / contenu / TOC ancre |
| `<DocSidebar />` | S4 | Sommaire collant (sections du manuel) |
| `<DocSearch />` | S4 | Recherche dans le manuel (Fuse.js sur titres + headings) |
| `<StepsList />` | S4 | Pas-à-pas numéroté (utilisé dans guide + manuel) |
| `<Callout />` | S4 | Encarts info / attention / astuce |
| `<KeyboardShortcut />` | S4 | Affichage clavier `<kbd>` propre |
| `<ChangelogEntry />` | S5 | Bloc version (date, badge type, liste de changements) |
| `<UptimeChart />` | S5 | Mini-graphe 90 jours (D3 ou SVG inline) |
| `<ResourceCard />` | S5 | Carte ressource (vidéo, PDF, modèle Excel) |
| `<LangSwitcher />` | S6 | FR/EN |

Tous ces composants vivent dans `components/lr-time/` (créer le sous-dossier en sprint 0).

---

## 4. Modèle de données / contenus

Pour rester maître du contenu sans dépendre d'un CMS dans un premier temps, le contenu est versionné dans le repo :

```
content/
└── lr-time/
    ├── faq.json                    # [{id, slug, category, question, answer_html, tags}]
    ├── changelog.json              # [{version, date, type, items}]
    ├── pricing.json                # paliers + règles simulateur
    ├── specs.json                  # specs techniques + périphériques
    ├── status.json                 # fallback si endpoint indispo
    ├── manuel/
    │   ├── 00-introduction.mdx
    │   ├── 01-premiere-connexion.mdx
    │   ├── 02-administration.mdx
    │   ├── 03-pointage-hikvision.mdx
    │   ├── 04-plannings-et-shifts.mdx
    │   ├── 05-conges-et-absences.mdx
    │   ├── 06-rapports-et-corrections.mdx
    │   ├── 07-employes-et-organisation.mdx
    │   ├── 08-terminaux-et-acces.mdx
    │   ├── 09-administration-securite.mdx
    │   └── 10-api-integrations.mdx
    └── guide/
        ├── admin-rh.mdx
        ├── manager.mdx
        ├── employe.mdx
        └── paie.mdx
```

**Choix techniques :**
- **MDX** pour manuel + guide (composants React intégrables : `<Callout>`, `<StepsList>`, `<Screenshot>`).
- **JSON** pour FAQ, changelog, pricing, specs (faciles à éditer côté Label Retail sans connaître React).
- Schéma Zod par fichier pour valider à la build (lever une erreur TS/lint si le JSON dérive).

---

## 4-bis. Track parallèle — Content design (rédaction du contenu)

La rédaction finale du contenu (FAQ, chapitres du manuel, guides persona, copy marketing) est **incluse dans le plan** comme un track parallèle au track dev. Ce track est mené par 1 rédacteur / content designer en collaboration avec le référent produit Label Retail. Il démarre en **Sprint 0** (parce que rédiger un manuel prend plus de temps que coder son layout) et se termine au **Sprint 4** (livraison synchrone avec les pages dev).

### Phase C0 — Cadrage (en parallèle du Sprint 0, 1 semaine)
- **Audit de l'existant** : interviews du SAV Label Retail (top 30 questions clients), lecture des tickets historiques, recensement des emails-types envoyés.
- **Définition des personas** : admin RH, manager d'équipe, employé, gestionnaire paie. Pour chaque persona : objectifs, niveau de maturité numérique, irritants connus, canaux préférés.
- **Style guide éditorial LR Time** : ton (professionnel, direct, pas de jargon SaaS gratuit), tutoiement vs vouvoiement (recommandation : **vouvoiement**, plus aligné B2B Côte d'Ivoire), terminologie (« pointage » vs « badgeage », « collaborateur » vs « salarié », etc.), longueur cible (titre ≤ 60 c., réponse FAQ 60-150 mots, chapitre manuel 800-1500 mots).
- **Plan détaillé** :
  - 40 questions FAQ avec catégorie, slug, mots-clés cibles SEO.
  - 11 titres + sous-titres des chapitres du manuel.
  - 4 plans de guides persona (objectifs, étapes, captures à prendre).
- **Livrable** : `content/lr-time/_editorial/style-guide.md` + `content/lr-time/_editorial/plan-redactionnel.md` validés par le référent produit.

### Phase C1 — Rédaction modules + tarifs + fiche tech (Sprints 1-2, 2 semaines)
- **6 fiches module alignées §1-bis** (Pointage Hikvision, Plannings & shifts, Congés, Rapports & corrections, Employés & organisation, Terminaux & accès), 1 page chacune, ~300 mots + 3-5 bénéfices + 2 cas d'usage. Chaque bénéfice doit être rattaché à une entité Django existante.
- Copy hub LR Time (hero, KPIs, micro-copy CTA).
- Argumentaire tarifs (description par palier, FAQ tarifs) **basé sur le modèle `billing.Plan`** : `device_quota`, `event_quota_per_month`, `has_priority_support`, `has_advanced_analytics`, `trial_period_days`, `is_metered` ; ne pas inventer d'autres limites.
- Spécifications fiche technique (rédaction non-jargonneuse) : prérequis, sécurité (JWT, RBAC, biométrie chiffrée Fernet, GDPR, audit log), périphériques Hikvision compatibles via Hik Device Gateway.
- **Livrable** : `content/lr-time/modules.json`, `content/lr-time/pricing.json`, `content/lr-time/specs.json` remplis et validés contre `§1-bis`.

### Phase C2 — Rédaction FAQ + support (Sprint 3, 1 semaine)
- **40 entrées FAQ** rédigées, catégorisées et taguées **strictement alignées sur §1-bis** :
  - **Pointage Hikvision (8)** : refus terminal, oubli de pointage (correction via `AttendanceCorrection` + log d'audit), modes biométrie visage / empreinte / carte RFID, comportement en cas de coupure réseau (catchup automatique), webhook vs catchup, lecture de carte, multi-lecteur, événements ACS bruts.
  - **Plannings & shifts (6)** : créer un work shift, gérer une pause, marges de retard (`late_allowable_minutes`) et de départ anticipé, weekend flexible, affecter un planning à un département vs un employé, périodes datées vs hebdomadaires.
  - **Congés & absences (8)** : poser un congé (paid/sick/unpaid/special), workflow validation manager, motif de rejet, annulation, états (pending/approved/rejected/cancelled), justificatifs (champ `metadata`), comportement sur jour férié.
  - **Rapports & corrections (6)** : agrégation daily/weekly/monthly, exports CSV/Excel (pas de connecteur Sage/Odoo aujourd'hui), corriger un pointage manuellement, traçabilité (`AttendanceCorrectionLog`), filtre par département/employé, fuseau horaire.
  - **Employés & organisation (5)** : annuaire, départements hiérarchiques, organisations multi-sites, biométrie chiffrée Fernet, invitations utilisateurs internes (rôles `org_admin`/`operator`/`viewer`).
  - **Terminaux & accès (4)** : onboarding terminal Hikvision, sync, redémarrage à distance, lecture de carte, configuration des lecteurs.
  - **Sécurité & RGPD (3)** : qui voit quoi (RBAC), export données personnelles, durée de rétention, audit log.
- Procédure d'urgence (script court à imprimer pour le client).
- Tableau SLA (description par palier + procédure d'escalade).
- Email-types accusé de réception ticket (charte LR Time, signataire Label Retail).
- **Livrable** : `content/lr-time/faq.json`, `content/lr-time/support/sla.md`, `content/lr-time/support/urgence.md`, templates email.

### Phase C3 — Rédaction guides persona + manuel (Sprint 4, 1 semaine)
- **4 guides persona** (admin RH, manager, employé, paie), 1500-2500 mots chacun, structurés selon le gabarit imposé (objectifs / pré-requis / pas-à-pas / cas particuliers / aller plus loin).
- **11 chapitres du manuel** (frontmatter + contenu MDX, captures intégrées).
- **30+ captures d'écran** annotées (flèches, encarts) prises depuis le compte démo LR Time.
- Index de mots-clés (`alias`) injectés dans la recherche manuel pour améliorer la pertinence.
- **Livrable** : tous les fichiers `content/lr-time/manuel/*.mdx` et `content/lr-time/guide/*.mdx` finalisés.

### Phase C4 — Rédaction changelog initial + ressources (Sprint 5, en différé d'1 semaine)
- Reconstitution du changelog historique (10 dernières versions) à partir des notes de release internes.
- Rédaction des fiches ressources (vidéo de prise en main : script + sous-titres FR ; modèles Excel d'import : descriptifs + colonnes).
- Affiche pointage à imprimer (texte + maquette à passer au designer).
- **Livrable** : `content/lr-time/changelog.json` rempli, `content/lr-time/ressources/*.md`.

### Phase C5 — Traduction EN (Sprint 6, 1 semaine — optionnelle)
- Traduction professionnelle FR → EN de l'ensemble du contenu (~25 000 mots).
- Adaptation locale (terminologie marché export Afrique de l'Ouest anglophone).
- **Livrable** : `content/lr-time/en/*` miroir complet.

### Charge totale rédaction
| Phase | Durée | Volume estimé |
|-------|-------|---------------|
| C0 cadrage | 1 sem | Plans + style guide |
| C1 modules/tarifs/specs | 2 sem | ~5 000 mots |
| C2 FAQ + support | 1 sem | ~6 000 mots |
| C3 guides + manuel | 1 sem | ~14 000 mots + 30 captures |
| C4 changelog + ressources | 0,5 sem | ~2 000 mots |
| C5 traduction EN | 1 sem | ~25 000 mots |
| **Total FR** | **5,5 sem** | **~27 000 mots + 30 captures** |
| **Total avec EN** | **6,5 sem** | **~52 000 mots** |

### Critères d'acceptation track contenu
- Chaque texte est **relu** par 1 personne autre que le rédacteur (référent produit).
- Aucun texte ne dépasse les longueurs cibles définies en C0.
- Les captures sont **anonymisées** (pas de données client réelles) et toutes dans le même style (résolution, encarts, flèches).
- Le style guide est respecté à 100 % (vérification par grep automatique sur termes interdits/préférés).
- Tout chapitre/FAQ est validé par un test utilisateur léger : 1 personne du persona cible lit le contenu et confirme qu'elle saurait agir.

### Risques track contenu
- **Disponibilité du SAV Label Retail** pour les interviews C0 → bloque tout. Caler les interviews dès la 1ʳᵉ semaine.
- **Pas de compte démo peuplé** → captures impossibles. Repli sur maquettes Figma ou screenshots remasterisés.
- **Sous-estimation du volume** : 27 000 mots en 4,5 semaines = ~1 200 mots/jour. Tenable pour un rédacteur expérimenté ; sinon prévoir 2 rédacteurs en sprint 4.
- **Validation lente** côté référent produit → définir un SLA de relecture (48 h max par lot).

---

## 5. Sprint 0 — Fondations section produit (1 semaine)

**Objectif :** poser le socle technique pour que tous les sprints suivants n'aient plus à toucher l'infra.

### Livrables
1. **Layout `app/lr-time/layout.tsx`**
   - En-tête produit (logo LR Time + tagline + bouton « Démo »).
   - `<LrTimeSubnav />` collante avec ancres vers les sous-sections principales.
   - `<LrTimeBreadcrumb />`.
   - Slot `{children}` avec largeur `lr-container`.
2. **Création de l'arborescence vide** : générer toutes les routes listées en §2 avec un `page.tsx` minimal renvoyant un placeholder `« Section en construction — sprint X »`. Cela débloque les liens internes à venir et permet de valider le maillage.
3. **Composants foundation** : `LrTimeSubnav`, `LrTimeBreadcrumb`, `Callout`, `StepsList`, `KeyboardShortcut` — purs, sans contenu. Le composant `ExternalAppLink` (lien sortant vers le SaaS) est **codé mais non utilisé en Phase 1** : il reste en réserve dans `components/lr-time/` pour activation future, sans aucun import dans les pages livrées.
4. **Tokens CSS additionnels** dans `app/globals.css` :
   - `--lr-doc-content-max-w: 72ch`
   - `--lr-doc-toc-w: 220px`
   - `--lr-doc-sidebar-w: 260px`
   - Styles `prose` LR Time (override de Tailwind typography si nécessaire).
5. **Pipeline contenu** : helper `lib/lr-time/content.ts` qui charge les MDX/JSON depuis `content/lr-time/` au build (`fs/promises`) avec validation Zod. Installer `zod`, `gray-matter`, `next-mdx-remote/rsc`, `fuse.js`.
6. **Sitemap** : étendre `app/sitemap.xml/route.ts` pour inclure dynamiquement toutes les routes LR Time générées.
7. **Mise à jour de la `Navbar`** : transformer l'entry simple « LR TIME » en méga-menu (4 colonnes : Produit / Documentation / Support / Ressources) avec liens vers les principales sous-pages.
8. **Documentation interne** : `components/lr-time/README.md` qui explique la structure et les conventions.

### Critères d'acceptation
- `npm run lint` et `npm run build` passent.
- Toutes les routes listées en §2 répondent en 200 avec un placeholder identifiable.
- La sous-nav LR Time est collante et garde l'item actif (test manuel).
- Le sitemap contient toutes les nouvelles URLs.

### Dépendances / risques
- Ajout de dépendances (`zod`, `next-mdx-remote`, `fuse.js`, `gray-matter`) → impact bundle. Mitigation : `next-mdx-remote/rsc` reste server-only ; `fuse.js` est ~10 KB gzip, chargé seulement côté pages avec recherche.

---

## 6. Sprint 1 — Hub LR Time + pages module (1 semaine)

**Objectif :** la page racine devient un **hub** qui guide le visiteur vers la bonne sous-section, et chaque module a sa page dédiée vendable.

### Livrables
1. **Refonte `app/lr-time/page.tsx`** (hub) :
   - Hero conservé mais resserré (~30 % plus court). **Deux CTA internes uniquement** (Phase 1) :
     - « Demander une démo » → `/contact?sujet=demo` (lead qualifié, traité par l'équipe Label Retail).
     - « Recevoir un devis » → `/contact?sujet=devis`.
   - **Aucun lien externe** vers une app LR Time tierce dans les pages livrées (cf. §0).
   - **Bandeau confiance** (logos 4–6 clients + KPIs : « 40+ entreprises », « 99,8 % uptime », « < 4 h délai support »).
   - Grille des 6 modules (cards) menant vers `/lr-time/fonctionnalites/<slug>` (interne).
   - Sections « Tarifs en un clin d'œil », « Vous avez une question ? » (3 questions extraites de la FAQ + lien), « Documentation » (cartes vers manuel + guide + fiche technique), « Support » (carte vers `/lr-time/support`).
   - JSON-LD `SoftwareApplication` (champ `applicationSuite` non renseigné en Phase 1, à activer en Phase 2).
2. **Page `/lr-time/fonctionnalites`** : grille complète des 6 modules avec mini-démos (capture animée GIF/MP4 ou Lottie) et liens.
3. **6 pages module** alignées sur le backend (cf. §1-bis) : `pointage`, `plannings`, `conges`, `rapports`, `employes`, `terminaux`. Construites sur le gabarit `<FeaturePageLayout>` :
   - Hero compact (titre, accroche, capture).
   - Liste de bénéfices (3–5 puces) **rédigés à partir des modèles Django réels**, pas d'invention marketing.
   - Cas d'usage concrets (2–3 mini-stories) qui mentionnent les entités réelles (`WorkShift`, `LeaveRequest`, `AttendanceCorrection`…).
   - Specs courtes en lien avec la fiche technique.
   - CTA croisés vers `/lr-time/guide/<persona>` (le guide associé) + `/lr-time/manuel/<chapitre>`.
   - Si une fonctionnalité est en roadmap, encart `<Callout type="info">` explicite, jamais en argument de vente principal.
4. **Données contenu** : `content/lr-time/modules.json` (6 entrées) consommé par la page hub et les pages module.

### Critères d'acceptation
- Chaque page module a une URL canonique propre, une `metadata` complète (title 50–60 ch., description 140–160 ch.).
- Le hub mène à toutes les sections (manuel / guide / FAQ / support / tarifs / fiche technique) en ≤ 1 clic.
- Lighthouse SEO ≥ 95 sur le hub et 1 page module.
- Aucun lien mort (test via `next-sitemap` ou script `lychee`).

---

## 7. Sprint 2 — Fiche technique + Tarifs (1 semaine)

**Objectif :** donner à l'IT et à l'acheteur tout ce qu'il faut pour décider sans rendez-vous.

### Livrables
1. **Page `/lr-time/fiche-technique`** :
   - Bloc « Architecture » (SaaS, multi-tenant, hébergement Côte d'Ivoire / OVH FR fallback, schéma simple SVG).
   - Bloc « Prérequis client » (navigateurs, OS supportés, ports réseau, débit minimum, mode dégradé hors-ligne).
   - Bloc « Sécurité & conformité » (chiffrement TLS 1.3, mots de passe hashés, RBAC, audit log, sauvegardes, durées de rétention).
   - Bloc « Périphériques de pointage compatibles » (cartes ZKTeco, Suprema, Hikvision avec photos, refs, modes RFID/biométrie/QR).
   - Bloc « API & intégrations » (Sage, Odoo, Excel, Webhooks, REST, OAuth2 — lien vers `/lr-time/manuel/api-integrations`).
   - Bloc « Limites & quotas » (taille max d'équipe, fréquence de pointage, limites d'export).
   - Bouton « Télécharger la fiche technique (PDF) » → fichier statique généré (voir §11 Sprint 7).
2. **Page `/lr-time/tarifs`** :
   - 3 paliers (Essentiel / Professionnel / Entreprise) avec features incluses, limites, support associé.
   - **Simulateur interactif** `<PricingSimulator />` : sliders (utilisateurs actifs, sites, modules optionnels, périphériques) → estimation temps réel + bouton « Recevoir un devis exact » qui pré-remplit `/contact?sujet=devis&users=...&plan=...`.
   - FAQ tarifs (4–6 questions courtes, lien vers FAQ globale).
   - Comparatif visuel (tableau plein avec colonnes par palier).
3. **Schémas / données** :
   - `content/lr-time/specs.json` (validé Zod).
   - `content/lr-time/pricing.json` (paliers + règles simulateur).
4. **Composants** : `<SpecTable>`, `<DeviceCompatibilityCard>`, `<PricingTier>`, `<PricingSimulator>`.

### Critères d'acceptation
- Le simulateur recalcule à chaque changement sans appel réseau.
- L'export PDF de la fiche technique est < 1 Mo, A4, navigable.
- Tableau comparatif accessible au clavier (rôle table, en-têtes corrects).

---

## 8. Sprint 3 — FAQ + Centre de support (1 semaine)

**Objectif :** offrir un canal de réponse asynchrone et un canal de support outillé pour les clients existants.

### Livrables
1. **FAQ globale `/lr-time/faq`** :
   - Recherche en haut (Fuse.js, tolère typos, debounce 200 ms).
   - Filtres par catégorie (Pointage / Plannings / Congés / Paie / Tarifs / Sécurité / Mobile).
   - Liste d'accordéons groupés. Cible : **40 questions** au lancement.
   - Chaque question a un slug → `/lr-time/faq/<slug>` (page longue avec JSON-LD `FAQPage`).
   - Encart « Pas trouvé ? » → CTA `/lr-time/support/nouveau-ticket`.
2. **Centre de support `/lr-time/support`** :
   - 3 colonnes : **Self-service** (lien FAQ + manuel), **Ouvrir un ticket**, **Urgence** (numéros, horaires, escalade).
   - Encart `<StatusBadge>` (lecture de `/lr-time/statut` — sera vraiment dynamique en sprint 5).
3. **Formulaire ticket `/lr-time/support/nouveau-ticket`** :
   - Champs : type d'incident (bug / question / demande / urgence), priorité (info/standard/bloquant), module concerné (select), description (textarea), pièces jointes (max 3 × 5 Mo, types `png|jpg|pdf|csv|xlsx`), email pro (validé), nom de société (auto-rempli si user logged-in à terme).
   - Validation Zod côté client + côté serveur (route `app/api/lr-time/support/route.ts` POST).
   - Envoi email à `support@label-ci.com` (transporteur Resend ou Nodemailer SMTP — dépend du backend) + accusé de réception au demandeur (charte LR Time, signataire Label Retail).
   - Anti-spam : honeypot + rate-limit IP (Upstash ou simple `Map` côté Edge).
4. **Page SLA `/lr-time/support/sla`** :
   - Tableau « Priorité × délai de prise en charge × délai de résolution » par palier tarifaire.
   - Procédure d'escalade.
5. **Page urgence `/lr-time/support/urgence`** :
   - Numéros (mobile + WhatsApp), horaires.
   - Avertissement : usage strictement réservé aux blocages opérationnels.
6. **Données** : `content/lr-time/faq.json` (40 entrées) avec schéma Zod.
7. **Contenu rédigé** (livré par le track contenu C2, voir §4-bis) :
   - 40 questions/réponses FAQ catégorisées et taguées.
   - Texte complet des pages SLA et Urgence.
   - Emails-types accusé ticket / clôture ticket (charte LR Time, signataire Label Retail).

### Critères d'acceptation
- Recherche FAQ retourne en < 100 ms sur 40 entrées.
- Soumission ticket → email reçu en < 30 s + page de confirmation avec ID ticket.
- Page FAQ détaillée a un schéma JSON-LD `FAQPage` valide (Google Rich Results test).
- Aucune fuite d'email côté DOM (le `mailto:` du formulaire support est obfusqué).
- **Aucune entrée FAQ en lorem ipsum** : les 40 questions sont rédigées et relues.
- **Toute entrée FAQ cite un endpoint ou une entité Django existants** (cf. §1-bis), aucune ne décrit une feature non livrée.

### Dépendances / risques
- **Email transactionnel** : décider Resend / Mailgun / SMTP Label Retail. Si non décidé en début de sprint, livrer un stub qui log le payload et un TODO pour brancher le provider.
- Conformité : prévoir mention RGPD/loi ivoirienne sur la conservation des tickets (ajout en pied de formulaire).

---

## 9. Sprint 4 — Guide d'utilisation + Manuel utilisateur (1 semaine)

**Objectif :** documenter l'application de bout en bout pour autonomiser les clients et préparer l'export.

### Livrables
1. **Hub guides `/lr-time/guide`** : 4 cartes persona (admin RH, manager, employé, paie) avec durée estimée (« 12 min de lecture »).
2. **4 guides MDX** (un par persona), structure imposée :
   - **Objectifs** (3–5 puces : « à la fin vous saurez… »)
   - **Pré-requis** (compte LR Time fourni par Label Retail, modules activés sur l'abonnement) — **sans nommer d'URL d'app**.
   - **Pas-à-pas** (`<StepsList>` numéroté, captures annotées, raccourcis clavier). Les étapes parlent en termes d'**actions et d'écrans** : « Ouvrez la liste des employés », « Cliquez sur Approuver dans le détail de la demande de congé », etc. **Aucun lien sortant** vers le SaaS, **aucune URL absolue**. Les captures suffisent à reconnaître l'écran.
   - **Cas particuliers** (`<Callout type="warning">`)
   - **Aller plus loin** (liens vers chapitres du manuel, tous internes Label Retail)
3. **Hub manuel `/lr-time/manuel`** :
   - Sommaire des 11 chapitres + barre de recherche (Fuse.js sur titres + headings extraits MDX).
   - `<DocLayout>` : sidebar gauche (sommaire), contenu central, TOC droit (ancres H2/H3).
4. **11 chapitres MDX** alignés sur §1-bis (`00-introduction` → `10-api-integrations`, dont `03-pointage-hikvision`, `04-plannings-et-shifts`, `05-conges-et-absences`, `06-rapports-et-corrections`, `07-employes-et-organisation`, `08-terminaux-et-acces`, `09-administration-securite`). Pour chaque chapitre :
   - Frontmatter (`title`, `slug`, `order`, `updatedAt`, `readingTime`).
   - Génération auto du TOC.
   - Boutons « Précédent / Suivant ».
   - Lien « Suggérer une amélioration » → ouvre `/lr-time/support/nouveau-ticket?type=doc&page=<slug>`.
5. **Recherche manuel** `/lr-time/manuel?q=...` : index pré-calculé au build (`scripts/build-doc-index.ts`), fichier JSON chargé côté client.
6. **Composants** : `<DocLayout>`, `<DocSidebar>`, `<DocSearch>`, version finalisée de `<StepsList>`, `<Callout>`, `<KeyboardShortcut>`, `<Screenshot>` (avec lazy + caption + zoom).
7. **Contenu rédigé** (livré par le track contenu C3, voir §4-bis) :
   - 4 guides persona finalisés (admin RH, manager, employé, paie), 1 500-2 500 mots chacun.
   - 11 chapitres MDX du manuel finalisés (~14 000 mots au total).
   - 30+ captures d'écran annotées et anonymisées.
   - Index de mots-clés (`alias`) pour la recherche.

### Critères d'acceptation
- Naviguer du chapitre 1 au 10 en n'utilisant que le clavier (Tab + Enter) fonctionne.
- La recherche manuel retourne un résultat pertinent en < 200 ms sur 100+ headings.
- Lighthouse Best Practices ≥ 95 sur 2 chapitres tirés au hasard.
- Le contenu MDX peut être édité par un non-dev (test : modifier un chapitre, rebuild, vérifier que la modif apparaît).
- **Contenu finalisé** : aucun chapitre marqué « TODO » ou « En rédaction » au moment de la livraison sprint.
- Test utilisateur léger : 1 personne par persona lit son guide et confirme qu'elle saurait agir dans LR Time.

### Dépendances / risques
- **Captures d'écran** : besoin d'un compte démo LR Time peuplé. Si indispo : utiliser maquettes Figma exportées en PNG.

---

## 10. Sprint 5 — Changelog + Statut + Ressources (1 semaine)

**Objectif :** transparence opérationnelle et marketing produit continu.

### Livrables
1. **Changelog `/lr-time/changelog`** :
   - Liste antichronologique de versions (Semver).
   - Chaque version : date, type d'item (`feature`, `improvement`, `fix`, `security`), description courte.
   - Filtre par type, lien d'ancre par version (`#v2-3-0`).
   - JSON-LD `Article` par version (optionnel mais utile pour Google Discover).
   - Source : `content/lr-time/changelog.json`.
2. **Statut `/lr-time/statut`** (vit sur `labelretail.ci`, **100 % autonome** en Phase 1) :
   - Composant `<StatusBadge>` global (vert/orange/rouge) en haut.
   - 4–6 sous-services : API, Pointage temps réel, Exports rapports, Web dashboard, Webhooks Hikvision, Stripe (facturation).
   - Mini-graphe « 90 derniers jours » par service.
   - Section « Incidents en cours » (titre, démarrage, mises à jour) + « Incidents récents » (10 derniers).
   - **Source en Phase 1** : `content/lr-time/status.json`, fichier édité manuellement par ops dans le repo Label Retail (1 commit = 1 update statut + 1 incident). Le contenu décrit l'état des services LR Time tel que connu côté ops, sans appel réseau vers une app distante.
   - **Phase 2 (différée)** : route Next `app/api/lr-time/status/route.ts` qui ferait un fetch SSR vers `/health/` et `/ready/` du backend pour rafraîchir automatiquement, avec ISR 60 s. Code prévu dans la structure mais désactivé en Phase 1.
   - Page accessible sans JS (HTML statique).
3. **Ressources `/lr-time/ressources`** :
   - Grille de cartes : vidéo de prise en main, modèles Excel d'import salariés, kit de communication interne (PDF), affiche pointage à imprimer (PDF), checklist d'onboarding.
   - Filtre par type (vidéo / fichier / lien).
4. **Bouton « S'abonner aux mises à jour »** sur changelog + statut → réutilise le formulaire newsletter (champ email + case à cocher « Notifier des nouveautés produit » / « Notifier des incidents »).

### Critères d'acceptation
- Page statut affiche un état même si l'API distante est down (fallback testé en coupant le réseau).
- Changelog accessible sans JS (HTML statique).
- Ressources : tout lien externe a `rel="noopener noreferrer"` et un attribut `download` quand pertinent.
- Aucune entrée changelog n'invente une feature : chaque ligne doit être traçable à un commit/PR du backend ou du frontend.

### Dépendances / risques
- Endpoint `/health/` et `/ready/` existent côté backend (vérifié §1-bis), mais pas d'endpoint d'historique d'incidents → la liste « 90 derniers jours » est alimentée par `content/lr-time/status.json` édité manuellement par ops.

---

## 11. Sprint 6 — Internationalisation FR/EN (1 semaine)

**Objectif :** rendre toute la section disponible en anglais.

### Livrables
1. **Stratégie i18n** : `next-intl` (recommandé pour App Router) ou `next-i18next`. Décision en début de sprint.
2. **Routes dupliquées** : `/en/lr-time/...` miroir de `/lr-time/...` (alternates `hreflang`).
3. **Traduction des UI strings** : extraire toutes les chaînes en `messages/fr.json` + `messages/en.json`.
4. **Traduction du contenu** : MDX et JSON dupliqués sous `content/lr-time/en/...`. Si la traduction EN n'est pas prête, fallback FR + bandeau « Translation in progress ».
5. **`<LangSwitcher>`** dans la sous-nav LR Time.
6. **SEO multilingue** : `metadata.alternates.languages = { 'fr-FR': ..., 'en-US': ... }`, sitemap multilingue.

### Critères d'acceptation
- 100 % des chaînes UI sont externalisées (aucune chaîne en dur dans les composants `lr-time/`).
- Switch FR↔EN conserve la page courante et l'ancre.
- Les balises `hreflang` sont validées par Google Search Console.

---

## 12. Sprint 7 — SEO produit + Polish marketing (1 semaine)

**Objectif :** maximiser l'acquisition organique et soigner les détails marketing.

### Livrables
1. **JSON-LD complet** : `SoftwareApplication` sur le hub, `Product` + `Offer` sur tarifs, `FAQPage` sur FAQ, `BreadcrumbList` sur toutes les pages internes, `HowTo` sur guides.
2. **Open Graph dédié LR Time** : génération dynamique d'images OG (`@vercel/og` ou `next/og`) avec titre + tagline + couleurs LR Time.
3. **Génération PDF de la fiche technique** : script `scripts/build-fiche-technique.ts` (Playwright print) → `public/lr-time/fiche-technique.pdf`.
4. **Page mentions LR Time** : un bloc « Mentions LR Time dans la presse / partenaires / clients » (logos + extraits courts respectant ≤ 15 mots cités).
5. **A/B test (optionnel)** : variante CTA hub (« Demander une démo » vs « Essayer 14 jours » — cohérent avec `Plan.trial_period_days`).
6. **Maillage interne** : audit des liens entre pages LR Time (chaque page doit avoir au moins 2 liens sortants vers une autre page LR Time pertinente).

### Critères d'acceptation
- Lighthouse SEO ≥ 95 sur 5 pages tirées au hasard (hub, fonctionnalité, fiche tech, manuel, FAQ détaillée).
- Validation Rich Results Test sans erreur sur FAQ et HowTo.
- PDF fiche technique téléchargeable et imprimable proprement.

---

## 13. Sprint 8 — QA, accessibilité, perf, tests E2E (1 semaine)

**Objectif :** prêt-pour-production.

### Livrables
1. **Tests E2E Playwright** (parcours critiques) :
   - Parcours « visiteur curieux » : home → hub LR Time → fonctionnalité → tarifs → simulateur → contact.
   - Parcours « DSI prudent » : hub → fiche technique → téléchargement PDF → FAQ sécurité.
   - Parcours « client existant » : support → ouvrir ticket → confirmation.
   - Parcours « admin RH » : guide admin-rh → manuel chapitre 7 (employés) → FAQ.
2. **Accessibilité** :
   - Audit axe-core sur 10 pages.
   - Lecteur d'écran (NVDA + VoiceOver) sur 3 pages clés (hub, formulaire ticket, manuel).
   - Contrastes WCAG AA sur tous les couples couleur LR Time.
   - `prefers-reduced-motion` respecté pour les animations Framer Motion (vérifier `useReducedMotion`).
3. **Performance** :
   - LCP < 2,5 s mobile 4G sur hub, fiche technique, manuel.
   - CLS < 0,1.
   - Bundle < 200 KB JS initial sur hub.
   - Audit Webpack Bundle Analyzer.
4. **Cross-browser** : Chrome, Safari, Firefox, Edge desktop + Safari iOS + Chrome Android.
5. **Documentation interne mise à jour** : `components/lr-time/README.md` + ajout d'une section « LR Time » dans `AGENTS.md` (conventions de contenu, comment ajouter une question FAQ, comment publier une version au changelog).
6. **Audit final §1-bis** : cross-checker chaque page produite contre l'inventaire backend ; supprimer toute mention de feature qui n'est pas implémentée.
7. **Checklist de release** : fichier `.github/PULL_REQUEST_TEMPLATE_lr_time.md` avec items à cocher (lint, tests E2E, captures avant/après, lien Lighthouse, validation §1-bis).

### Critères d'acceptation
- 100 % des tests E2E passent en CI.
- Aucun violation axe-core de niveau « serious » ou « critical ».
- Lighthouse Perf ≥ 85, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 95 sur 5 pages.

---

## 14. Vue d'ensemble — récapitulatif (deux tracks parallèles, **100 % sur `labelretail.ci`**)

| Sprint | Track DEV | Track CONTENU |
|--------|-----------|---------------|
| 0 | Fondations : layout + sous-nav + arborescence vide | **C0** Cadrage : interviews SAV, personas, style guide, plan rédactionnel, validation §1-bis |
| 1 | Hub LR Time + 6 pages module (slugs §1-bis) | **C1.1** Copy hub + 6 fiches module alignées backend |
| 2 | Fiche tech + simulateur tarifaire | **C1.2** Specs réelles + argumentaire tarifs basé sur `billing.Plan` |
| 3 | FAQ recherchable + ticket + SLA + urgence | **C2** Rédaction des 40 FAQ + SLA + emails support |
| 4 | 4 guides persona + manuel 11 chapitres (slugs §1-bis) | **C3** Rédaction des 4 guides + 11 chapitres + 30 captures |
| 5 | Changelog + Statut + Ressources | **C4** Reconstitution changelog + fiches ressources |
| 6 | i18n FR/EN (lib + routes + alternates) | **C5** Traduction EN (~25 000 mots) — optionnelle |
| 7 | SEO + OG + PDF fiche technique | Relecture finale, mots-clés SEO ajustés |
| 8 | QA / a11y / perf / E2E + audit §1-bis | Test utilisateur léger sur 3-4 contenus phares |

**Total dev : ~8 semaines.** **Total contenu : ~5,5 semaines (FR seul) ou ~6,5 semaines (FR + EN).**

**Path critique minimum** : Sprint 0 + 1 + 3 + 4 = 4 semaines pour disposer du hub + FAQ + support + guide + manuel.

---

## 15. Décisions à prendre AVANT le sprint 0

| Décision | Options | Recommandation |
|----------|---------|----------------|
| **Format docs longues** | MDX / Markdown brut / CMS headless | **MDX** — composants React intégrables, versionné Git |
| **Recherche** | Fuse.js (local) / Algolia DocSearch / MeiliSearch self-hosted | **Fuse.js** — gratuit, suffisant pour < 500 entrées, bundle léger |
| **Email transactionnel** | Resend / Mailgun / SMTP Label Retail | À trancher — préférence Resend (DX, free tier 3 000/mois) |
| **i18n** | `next-intl` / `next-i18next` / sans lib | **`next-intl`** — natif App Router |
| **PDF fiche technique** | Playwright print / `@react-pdf/renderer` / outil graphique externe | **Playwright print** — réutilise le HTML de la page, zéro double-source |
| **Endpoint statut** | `/health/` + `/ready/` du backend / Better Stack / page statique | `/health/` + `/ready/` (existent §1-bis) + JSON manuel pour l'historique |
| **Compte démo LR Time** | Compte de test peuplé / maquettes Figma | Compte de test — captures plus crédibles |
| **URL canonique de l'app** *(Phase 2)* | `app.lr-time.ci` / `lr-time.ci` / autre | Différée. Aucun lien externe vers le SaaS en Phase 1 (cf. §0). |
| **Routes publiques signup/login** *(Phase 2)* | `/signup` + `/login` accessibles / portail unique / signup fermé (lead-only) | Différée. Phase 1 : seul canal d'entrée = `/contact?sujet=demo`. |
| **Partage de session cross-domain** *(Phase 2)* | Aucun / SSO Label Retail → LR Time | Différée. Phase 1 : pas de cross-domain du tout. |

---

## 16. Ce que ce plan ne couvre pas (volontairement)

- Backend LR Time lui-même (`hikvision-django-integration`) : périmètre équipe produit/Django.
- Déploiement / infra (CDN, DNS, SSL) : périmètre ops.
- Migration éventuelle vers shadcn/ui : préconisée par `SPRINTS_FRONTEND.md` mais non bloquante ici. Si shadcn/ui est introduit avant sprint 1, refactoriser les composants `<Accordion>`, `<Dialog>`, `<Tabs>` vers les primitives shadcn/ui pour éviter le double maintien.

> **Note :** la rédaction du contenu (FAQ, chapitres manuel, guides, copy marketing, captures) **est incluse** comme track parallèle au track dev. Voir §4-bis.
> **Note :** §1-bis (source de vérité backend) est l'**étalon** : aucune copy ne doit le contredire.

---

## 17. Risques & dépendances transverses

| Risque | Sprint impacté | Mitigation |
|--------|----------------|-----------|
| Contenu (FAQ, manuel, captures) pas fourni à temps | S3, S4 | Démarrer la collecte en S0 ; livrer la structure même si le contenu est partiel ; bandeau « En cours de rédaction » |
| Endpoint backend support/status indisponible | S3, S5 | Stub local + TODO branchement ; un fallback JSON garantit le rendu |
| Choix technique i18n change en cours de route | S6 | Externaliser toutes les strings dès S1 dans `messages/fr.json` même si la lib n'est pas encore là |
| PDF fiche technique trop lourd | S7 | Limiter les images à WebP < 100 KB chacune ; pagination 8 pages max |
| Charge réseau Côte d'Ivoire variable | S8 | Tester perf avec throttling 3G fast ; mettre les images en `loading="lazy"` et `<Image priority>` uniquement sur le hero |
| Confusion marque LR Time vs Label Retail dans la doc | Tous | Suivre la règle : visuel + style = LR Time, signataire / mentions légales = Label Retail. Vérifier au QA chaque page |
| **Décalage contenu / backend réel** (pages qui annoncent des features non livrées) | S1 → S5 | §1-bis est la source de vérité. À chaque sprint, audit croisé : pour chaque bénéfice rédigé, citer l'entité Django ou l'endpoint correspondant. Si rien à citer → soit retirer, soit étiqueter « roadmap » |
| Évolution backend pendant le projet (nouveaux endpoints, renommages) | Tous | Re-checker §1-bis en début de chaque sprint contre l'état réel du repo `hikvision-django-integration`. Mettre à jour le tableau si écart. |
| Webhooks Stripe partiels côté backend (cf. STATUS.md) | S5 | Ne pas annoncer de fonctionnalités de facturation avancée (TVA auto, dunning, coupons) tant que les handlers ne sont pas livrés |
| **Désynchronisation libellés app ↔ doc Label Retail** (UI évolue, manuel reste figé) | S4 | Aligner manuel et guides sur des **fonctionnalités** plutôt que sur des libellés UI précis quand c'est possible. En S8 audit final visuel des captures. *(Phase 2 ajoutera : ping des URLs critiques en CI.)* |
| Captures d'écran obsolètes (l'UI de l'app évolue plus vite que la doc) | S4 | Marquer chaque capture avec une date dans le frontmatter MDX. Process trimestriel : audit visuel, regénération des captures les plus consultées (top 10 du manuel via analytics). |
| **Visiteur cherche à se connecter en Phase 1** alors qu'aucun bouton n'existe | S1 | Ajouter une **note discrète dans la page support** : « Pour accéder à votre compte LR Time, contactez votre référent Label Retail » + email/téléphone. Ne pas exposer l'URL de l'app. |

---

## 18. Pour démarrer concrètement — questions restantes à valider

1. **Provider email transactionnel** : Resend ? Mailgun ? SMTP Label Retail existant ?
2. **Compte démo LR Time** : qui me l'ouvre, et avec quel jeu de données peuplé pour les captures du manuel ?
3. **Anglais en sprint 6 ou en backlog ?** Si le marché ivoirien suffit court terme, le sprint 6 peut être reporté.
4. **Roadmap mobile** : confirmer la cible 2026 et les features (consultation pointage, demande de congé, validation manager) avant de l'annoncer publiquement.
5. **Connecteurs paie Sage/Odoo** : tranchée à inscrire — restent en exports CSV ou un connecteur entre dans le backlog officiel ?
6. **Hébergement** : Côte d'Ivoire local, OVH FR, AWS Paris ? Le wording fiche technique dépend de la réponse.
7. **Captures d'écran vs maquettes Figma** : on attend les captures du compte démo, ou on commence avec les maquettes Figma quitte à remplacer plus tard ?
8. **Déclencheur de bascule en Phase 2** : à quel signal active-t-on les CTA externes vers le SaaS et la sonde statut auto ? (lancement public officiel ? première dizaine de clients ? jamais ?) — utile pour savoir s'il faut prévoir un sprint Phase 2 dans la roadmap année.

Une fois ces 8 points tranchés, le sprint 0 peut démarrer.
