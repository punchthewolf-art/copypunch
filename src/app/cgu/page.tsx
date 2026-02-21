import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation — CopyPunch",
};

export default function CGUPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="mb-8 text-3xl font-bold">
            Conditions Générales d&apos;Utilisation
          </h1>

          <div className="space-y-6 text-sm text-muted leading-relaxed">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                1. Objet
              </h2>
              <p>
                Les présentes Conditions Générales d&apos;Utilisation (CGU)
                régissent l&apos;utilisation du service CopyPunch, accessible à
                l&apos;adresse copypunch.fr, édité par la SASU Pelegrinus.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                2. Acceptation des CGU
              </h2>
              <p>
                L&apos;utilisation du service implique l&apos;acceptation
                pleine et entière des présentes CGU. Si vous n&apos;acceptez
                pas ces conditions, vous ne devez pas utiliser le service.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                3. Description du service
              </h2>
              <p>
                CopyPunch est un outil de génération de textes marketing
                (copywriting) utilisant l&apos;intelligence artificielle.
                Le service permet de générer du contenu textuel à partir
                de descriptions fournies par l&apos;utilisateur.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                4. Inscription et compte
              </h2>
              <p>
                L&apos;accès à certaines fonctionnalités nécessite la
                création d&apos;un compte. L&apos;utilisateur s&apos;engage
                à fournir des informations exactes et à maintenir la
                confidentialité de ses identifiants.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                5. Tarifs et paiement
              </h2>
              <p>
                CopyPunch propose un plan gratuit et des plans payants.
                Les prix sont indiqués en euros TTC. Les abonnements
                sont renouvelés automatiquement et peuvent être annulés
                à tout moment.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                6. Propriété du contenu généré
              </h2>
              <p>
                Les textes générés par CopyPunch appartiennent à
                l&apos;utilisateur qui les a créés. L&apos;utilisateur
                est libre de les utiliser à des fins commerciales ou
                personnelles.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                7. Limitation de responsabilité
              </h2>
              <p>
                CopyPunch ne garantit pas l&apos;exactitude, la
                pertinence ou l&apos;exhaustivité des contenus générés.
                L&apos;utilisateur reste seul responsable de
                l&apos;utilisation des textes produits.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                8. Modification des CGU
              </h2>
              <p>
                La SASU Pelegrinus se réserve le droit de modifier les
                présentes CGU à tout moment. Les utilisateurs seront
                informés de toute modification substantielle.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                9. Contact
              </h2>
              <p>
                Pour toute question relative aux CGU : contact@copypunch.fr
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
