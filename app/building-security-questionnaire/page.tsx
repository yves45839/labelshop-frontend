import type { Metadata } from 'next';
import BuildingSecurityQuestionnaire from '@/components/BuildingSecurityQuestionnaire';

export const metadata: Metadata = {
  title: 'Audit sécurité bâtiment',
  description:
    'Remplissez notre questionnaire pour obtenir une recommandation personnalisée de solutions de sûreté pour vos bâtiments.',
  alternates: {
    canonical: '/building-security-questionnaire',
  },
};

export default function BuildingSecurityQuestionnairePage() {
  return <BuildingSecurityQuestionnaire />;
}
