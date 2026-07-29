export type LrTimeModule = {
  slug: string;
  title: string;
  description: string;
  /** Détails rédigés pour la page /lr-time/fonctionnalites/[slug] */
  details: string[];
  benefits: string[];
};

export const LR_TIME_MODULES: LrTimeModule[] = [
  {
    slug: 'pointage',
    title: 'Pointage Hikvision',
    description:
      'Terminaux Hikvision (biométrie visage, empreinte, carte RFID) intégrés via Hik Device Gateway. Ingestion temps réel par webhook + rattrapage automatique en cas de coupure réseau.',
    details: [
      "LR Time s'appuie sur les terminaux de pointage Hikvision — reconnaissance faciale, empreinte digitale ou carte RFID — déjà éprouvés sur des centaines de sites en Côte d'Ivoire. Chaque pointage est transmis en temps réel à la plateforme via la Hik Device Gateway.",
      "En cas de coupure internet, fréquente sur certains sites, les pointages restent stockés sur le terminal puis sont rattrapés automatiquement dès le retour du réseau. Aucun pointage n'est perdu, aucune ressaisie manuelle n'est nécessaire.",
      "Le module s'adapte aux organisations multi-sites : chaque terminal est rattaché à un site et à une organisation, avec une isolation stricte des données entre entités.",
    ],
    benefits: [
      'Biométrie visage, empreinte ou carte RFID au choix',
      'Ingestion temps réel par webhook',
      'Rattrapage automatique après coupure réseau',
      'Multi-sites et multi-organisations',
    ],
  },
  {
    slug: 'plannings',
    title: 'Plannings & shifts',
    description:
      "Plannings hebdomadaires, périodes datées, work shifts (heures de travail, pauses, marges de retard et de départ anticipé, heures supplémentaires). Affectation par employé ou par département, avec règles weekend flexible.",
    details: [
      "Définissez des shifts précis : heures de travail, pauses, marges de tolérance pour les retards et départs anticipés, seuils d'heures supplémentaires. Chaque règle est paramétrable par votre équipe RH sans intervention technique.",
      "Les plannings s'affectent par employé ou par département entier, en hebdomadaire ou sur des périodes datées (chantiers, saisons, rotations). Les règles de weekend flexible couvrent les organisations qui travaillent le samedi ou en continu.",
      "Les écarts entre planning et pointages réels remontent automatiquement dans les rapports de présence, prêts pour le service paie.",
    ],
    benefits: [
      'Shifts paramétrables (pauses, marges, heures sup)',
      'Affectation par employé ou par département',
      'Périodes datées et weekend flexible',
      'Écarts planifié/réel calculés automatiquement',
    ],
  },
  {
    slug: 'conges',
    title: 'Congés & absences',
    description:
      "Demandes de congés (payés, maladie, sans solde, spéciaux) avec workflow de validation manager : approbation, rejet motivé, annulation. Soldes et statuts traçables.",
    details: [
      "Vos collaborateurs déposent leurs demandes de congés — payés, maladie, sans solde ou spéciaux — et le manager les approuve, les rejette avec motif ou les annule, le tout tracé dans la plateforme.",
      "Les soldes de congés se mettent à jour automatiquement et restent consultables par les RH à tout moment. Fini les demandes papier qui se perdent entre deux bureaux.",
      "Les absences validées alimentent directement les rapports de présence : plus de double saisie entre le suivi des congés et la préparation de la paie.",
    ],
    benefits: [
      'Workflow de validation manager complet',
      'Types de congés configurables',
      'Soldes calculés automatiquement',
      'Intégration directe aux rapports de présence',
    ],
  },
  {
    slug: 'rapports',
    title: 'Rapports & corrections',
    description:
      "Rapports de présence agrégés par jour, semaine ou mois, exportables en CSV/Excel pour intégration manuelle dans Sage, Odoo ou Excel paie. Corrections de pointage avec piste d'audit complète.",
    details: [
      "Les rapports de présence agrègent pointages, plannings et absences par jour, semaine ou mois, par employé, par département ou par site. Exports CSV et Excel prêts pour Sage, Odoo ou votre fichier de paie.",
      "Un oubli de badge ? Les corrections de pointage se font dans l'interface, avec une piste d'audit complète : qui a corrigé quoi, quand et pourquoi. La donnée reste fiable et opposable.",
      "Les managers accèdent uniquement aux données de leur périmètre grâce au contrôle d'accès par rôle (RBAC).",
    ],
    benefits: [
      'Agrégats jour / semaine / mois',
      'Exports CSV et Excel pour la paie',
      "Corrections tracées avec piste d'audit",
      'Accès par rôle (RBAC)',
    ],
  },
  {
    slug: 'employes',
    title: 'Employés & organisation',
    description:
      "Annuaire employés multi-sites, départements hiérarchiques, organisations, groupes d'accès. Données biométriques (visage, empreinte, carte) chiffrées au repos par Fernet. Invitations utilisateurs internes par email.",
    details: [
      "L'annuaire centralise vos employés sur tous vos sites, organisés en départements hiérarchiques et en groupes d'accès. Chaque fiche regroupe identité, terminal de pointage, planning et historique.",
      "Les données biométriques (gabarits visage, empreintes, numéros de carte) sont chiffrées au repos avec Fernet : la conformité et la confidentialité sont intégrées dès la conception.",
      "Les utilisateurs internes (RH, managers) sont invités par email avec des droits limités à leur périmètre, dans une architecture multi-tenant strictement isolée.",
    ],
    benefits: [
      'Annuaire multi-sites et départements hiérarchiques',
      'Biométrie chiffrée au repos (Fernet)',
      'Invitations par email avec droits par rôle',
      'Isolation multi-tenant stricte',
    ],
  },
  {
    slug: 'terminaux',
    title: 'Terminaux & accès',
    description:
      "Onboarding et supervision centralisés des terminaux Hikvision via la gateway : synchronisation, redémarrage à distance, lecture de carte, configuration des lecteurs et webhooks. Multi-tenant strictement isolé.",
    details: [
      "Chaque terminal Hikvision est enrôlé et supervisé depuis la plateforme : état de connexion, synchronisation des employés, configuration des lecteurs et des webhooks, sans déplacement sur site.",
      "Le redémarrage à distance et la lecture de carte en direct simplifient le support : la plupart des incidents se résolvent depuis Abidjan, sans immobiliser vos équipes.",
      "L'architecture multi-tenant garantit qu'un terminal, un employé ou un pointage n'est jamais visible en dehors de son organisation.",
    ],
    benefits: [
      'Supervision centralisée des terminaux',
      'Redémarrage et diagnostic à distance',
      'Synchronisation automatique des employés',
      'Isolation stricte par organisation',
    ],
  },
];

export function getLrTimeModule(slug: string): LrTimeModule | undefined {
  return LR_TIME_MODULES.find((m) => m.slug === slug);
}
