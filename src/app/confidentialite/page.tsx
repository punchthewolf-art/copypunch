import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — CopyPunch",
};

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="mb-8 text-3xl font-bold">
            Politique de confidentialité
          </h1>

          <div className="space-y-6 text-sm text-muted leading-relaxed">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                1. Responsable du traitement
              </h2>
              <p>
                Le responsable du traitement des données personnelles est
                la SASU Pelegrinus, éditrice du site copypunch.fr.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                2. Données collectées
              </h2>
              <p>Nous collectons les données suivantes :</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Adresse email (lors de l&apos;inscription)</li>
                <li>Historique des générations de contenu</li>
                <li>Données de paiement (traitées par Stripe, non stockées par nous)</li>
                <li>Données de connexion (adresse IP, navigateur, horodatage)</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                3. Finalité du traitement
              </h2>
              <p>Vos données sont utilisées pour :</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Fournir et améliorer le service CopyPunch</li>
                <li>Gérer votre compte et vos abonnements</li>
                <li>Assurer le support client</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                4. Base légale
              </h2>
              <p>
                Le traitement de vos données repose sur l&apos;exécution
                du contrat (fourniture du service) et votre consentement
                (inscription).
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                5. Durée de conservation
              </h2>
              <p>
                Vos données personnelles sont conservées pendant la
                durée de votre inscription et jusqu&apos;à 12 mois après
                la suppression de votre compte.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                6. Vos droits (RGPD)
              </h2>
              <p>
                Conformément au Règlement Général sur la Protection des
                Données (RGPD), vous disposez des droits suivants :
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Droit d&apos;accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l&apos;effacement (« droit à l&apos;oubli »)</li>
                <li>Droit à la portabilité</li>
                <li>Droit d&apos;opposition</li>
                <li>Droit à la limitation du traitement</li>
              </ul>
              <p className="mt-2">
                Pour exercer ces droits, contactez-nous à : contact@copypunch.fr
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                7. Sous-traitants
              </h2>
              <p>Nous utilisons les services suivants :</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Vercel (hébergement)</li>
                <li>Supabase (base de données et authentification)</li>
                <li>Stripe (paiements)</li>
                <li>Anthropic (génération de contenu IA)</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                8. Cookies
              </h2>
              <p>
                CopyPunch utilise uniquement des cookies strictement
                nécessaires au fonctionnement du service (session
                d&apos;authentification). Aucun cookie publicitaire
                ou de tracking n&apos;est utilisé.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                9. Contact
              </h2>
              <p>
                Pour toute question relative à vos données personnelles :
                contact@copypunch.fr
              </p>
              <p className="mt-2">
                Vous pouvez également adresser une réclamation à la CNIL
                (Commission Nationale de l&apos;Informatique et des
                Libertés) : www.cnil.fr
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
