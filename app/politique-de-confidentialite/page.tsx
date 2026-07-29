import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Politique de confidentialité',
  description:
    'Comment Label Retail collecte, utilise et protège vos données personnelles sur labelretail.ci : formulaires, compte client, mesure d\'audience.',
  path: '/politique-de-confidentialite',
});

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPage eyebrow="Vos données" title="Politique de confidentialité">
      <section>
        <h2>Quelles données collectons-nous ?</h2>
        <p>Nous collectons uniquement les données nécessaires à nos services :</p>
        <ul>
          <li>
            <strong>Formulaire de contact</strong> : nom, email, téléphone et le contenu de votre
            message, pour répondre à votre demande de devis, de démo ou de support.
          </li>
          <li>
            <strong>Compte client</strong> : email et informations de profil, pour gérer vos
            commandes et votre panier.
          </li>
          <li>
            <strong>Mesure d'audience</strong> : statistiques de navigation anonymisées via Google
            Analytics, pour améliorer le site.
          </li>
        </ul>
      </section>
      <section>
        <h2>Comment sont-elles utilisées ?</h2>
        <p>
          Vos données servent exclusivement à traiter vos demandes, exécuter vos commandes et
          améliorer nos services. Elles ne sont ni vendues ni louées à des tiers. Elles peuvent être
          partagées avec nos prestataires techniques (hébergement, analytics) dans la stricte mesure
          nécessaire au fonctionnement du site.
        </p>
      </section>
      <section>
        <h2>Combien de temps sont-elles conservées ?</h2>
        <p>
          Les demandes de contact sont conservées le temps du traitement commercial, puis archivées.
          Les données de compte sont conservées tant que le compte est actif.
        </p>
      </section>
      <section>
        <h2>Vos droits</h2>
        <p>
          Conformément à la loi ivoirienne n° 2013-450 relative à la protection des données à
          caractère personnel, vous disposez d'un droit d'accès, de rectification et de suppression
          de vos données. Pour l'exercer, écrivez-nous à{' '}
          <a href="mailto:info@label-ci.com" className="text-[var(--lr-orange-600)] underline">info@label-ci.com</a>.
        </p>
      </section>
      <section>
        <h2>Cookies</h2>
        <p>
          Le site utilise des cookies techniques (session, panier) indispensables à son
          fonctionnement, ainsi que des cookies de mesure d'audience Google Analytics. Vous pouvez
          configurer votre navigateur pour les refuser.
        </p>
      </section>
    </LegalPage>
  );
}
