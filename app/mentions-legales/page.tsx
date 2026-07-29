import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Mentions légales',
  description:
    'Mentions légales du site labelretail.ci, édité par Label Retail, intégrateur de sécurité électronique à Abidjan, Côte d\'Ivoire.',
  path: '/mentions-legales',
});

export default function MentionsLegalesPage() {
  return (
    <LegalPage eyebrow="Informations légales" title="Mentions légales">
      <section>
        <h2>Éditeur du site</h2>
        <p>
          Le site labelretail.ci est édité par <strong>Label Retail</strong>, société de droit
          ivoirien spécialisée en sécurité électronique, télécommunications et gestion du temps,
          dont le siège est situé à Abidjan, Côte d'Ivoire.
        </p>
        <ul>
          <li>Email : info@label-ci.com</li>
          <li>Téléphone : +225 07 888 999 65 · Fixe : +225 27 21 58 56 77</li>
        </ul>
      </section>
      <section>
        <h2>Directeur de la publication</h2>
        <p>Le directeur de la publication est le représentant légal de Label Retail.</p>
      </section>
      <section>
        <h2>Hébergement</h2>
        <p>
          Le site est hébergé sur une infrastructure cloud. Le backend applicatif est opéré par
          Label Retail.
        </p>
      </section>
      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus du site (textes, images, logos, articles) est la propriété de
          Label Retail ou de ses partenaires, sauf mention contraire. Toute reproduction sans
          autorisation écrite préalable est interdite. Les marques citées (notamment Hikvision)
          appartiennent à leurs propriétaires respectifs.
        </p>
      </section>
      <section>
        <h2>Responsabilité</h2>
        <p>
          Les informations publiées sur ce site sont fournies à titre indicatif. Les prix affichés
          sont indicatifs et peuvent évoluer ; seul un devis écrit engage Label Retail. Malgré le
          soin apporté à leur mise à jour, des erreurs peuvent subsister : n'hésitez pas à nous les
          signaler.
        </p>
      </section>
    </LegalPage>
  );
}
