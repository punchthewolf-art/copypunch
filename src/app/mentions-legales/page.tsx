import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — CopyPunch",
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="mb-8 text-3xl font-bold">Mentions légales</h1>

          <div className="space-y-6 text-sm text-muted leading-relaxed">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                Éditeur du site
              </h2>
              <p>
                CopyPunch est édité par la SASU Pelegrinus.
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Forme juridique : SASU (Société par Actions Simplifiée Unipersonnelle)</li>
                <li>Siège social : France</li>
                <li>Email : contact@copypunch.fr</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                Hébergement
              </h2>
              <p>
                Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133,
                Walnut, CA 91789, États-Unis.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                Propriété intellectuelle
              </h2>
              <p>
                L&apos;ensemble du contenu du site CopyPunch (textes, graphismes,
                logos, icônes, images, logiciels) est la propriété exclusive de
                la SASU Pelegrinus ou de ses partenaires et est protégé par les
                lois françaises et internationales relatives à la propriété
                intellectuelle.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                Responsabilité
              </h2>
              <p>
                Les contenus générés par l&apos;intelligence artificielle de
                CopyPunch sont fournis à titre indicatif. L&apos;utilisateur reste
                seul responsable de l&apos;utilisation qu&apos;il fait des textes
                générés.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                Contact
              </h2>
              <p>
                Pour toute question, vous pouvez nous contacter à l&apos;adresse :
                contact@copypunch.fr
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
