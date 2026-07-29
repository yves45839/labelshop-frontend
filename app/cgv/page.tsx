import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Conditions générales de vente',
  description:
    'Conditions générales de vente de Label Retail : commandes, prix, livraison en Côte d\'Ivoire, garanties et maintenance du matériel de sécurité électronique.',
  path: '/cgv',
});

export default function CgvPage() {
  return (
    <LegalPage eyebrow="Conditions commerciales" title="Conditions générales de vente">
      <section>
        <h2>Champ d'application</h2>
        <p>
          Les présentes conditions s'appliquent à toute commande de matériel, de prestation
          d'installation, d'abonnement logiciel (LR Time) ou de formation passée auprès de Label
          Retail, en Côte d'Ivoire.
        </p>
      </section>
      <section>
        <h2>Prix et devis</h2>
        <p>
          Les prix affichés sur le site sont indicatifs, exprimés en francs CFA (XOF) et hors taxes
          sauf mention contraire. Seul un devis écrit, valable 30 jours, engage Label Retail. Les
          prestations d'installation font systématiquement l'objet d'un devis après visite
          technique.
        </p>
      </section>
      <section>
        <h2>Commande et paiement</h2>
        <p>
          La commande est ferme à la validation du devis et au versement de l'acompte convenu. Le
          solde est exigible à la livraison ou à la mise en service, selon les termes du devis.
        </p>
      </section>
      <section>
        <h2>Livraison</h2>
        <p>
          Les livraisons s'effectuent à Abidjan sous 24 à 72 heures selon la disponibilité, et
          partout en Côte d'Ivoire par transporteur suivi. Les délais annoncés sont indicatifs ; un
          retard ne peut donner lieu à annulation qu'au-delà de 30 jours.
        </p>
      </section>
      <section>
        <h2>Garanties et maintenance</h2>
        <p>
          Le matériel neuf bénéficie de la garantie constructeur. Les installations réalisées par
          Label Retail sont garanties contre tout défaut de mise en œuvre pendant 12 mois. Des
          contrats de maintenance préventive et corrective sont proposés à l'issue de la garantie.
        </p>
      </section>
      <section>
        <h2>Litiges</h2>
        <p>
          En cas de désaccord, les parties recherchent d'abord une solution amiable. À défaut, les
          tribunaux d'Abidjan sont seuls compétents, le droit ivoirien étant applicable.
        </p>
      </section>
    </LegalPage>
  );
}
