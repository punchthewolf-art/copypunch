import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "@/components/providers/AuthProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CopyPunch — Générateur de Copywriting IA",
  description:
    "Décrivez votre produit, choisissez un format, et obtenez du copy professionnel et persuasif en quelques secondes. Pub Facebook, email marketing, LinkedIn, landing page et plus.",
  openGraph: {
    title: "CopyPunch — Générateur de Copywriting IA",
    description: "Générez du copy qui convertit. En un clic.",
    type: "website",
    url: "https://copypunch.pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "CopyPunch — Générateur de Copywriting IA",
    description: "Générez du copy qui convertit. En un clic.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
