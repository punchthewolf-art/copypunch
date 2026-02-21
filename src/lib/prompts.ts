import type { ContentTypeId } from "@/types";

export const SYSTEM_PROMPT = `Tu es un copywriter francais de renommee mondiale, expert en redaction publicitaire et marketing digital. Tu as travaille pour les plus grandes agences (Publicis, Havas, BETC). Tu maitrises parfaitement les techniques de copywriting : AIDA, PAS, storytelling, power words, urgence, preuve sociale.

Regles absolues :
- Le francais doit etre IMPECCABLE, naturel et idiomatique — JAMAIS une traduction de l'anglais
- Utilise des tournures percutantes, des mots puissants, et un rythme qui accroche
- Chaque texte doit pousser a l'action avec un CTA clair et convaincant
- Adapte le registre au ton demande
- Formate le resultat en markdown propre
- N'ajoute AUCUN commentaire, explication ou meta-texte — uniquement le copy demande`;

export const CONTENT_TYPE_INSTRUCTIONS: Record<ContentTypeId, string> = {
  "facebook-instagram-ad":
    "Redige une publicite Facebook/Instagram. Format court (max 150 mots). Accroche forte en premiere ligne qui arrete le scroll. Emojis strategiques (pas trop). Benefice client clair. CTA direct en fin de texte. Structure : Hook → Probleme/Desir → Solution → CTA.",
  "email-marketing":
    "Redige un email marketing complet. Structure :\n- **Objet :** (ligne d'objet percutante, max 50 caracteres)\n- **Preheader :** (complement de l'objet, max 90 caracteres)\n- **Corps :** hook d'ouverture personnel, contenu de valeur, et CTA final sous forme de bouton textuel [TEXTE DU BOUTON].",
  "landing-hero":
    "Redige le contenu d'une section hero de landing page. Inclus :\n- **Titre (H1) :** percutant, max 10 mots\n- **Sous-titre :** une phrase qui developpe la proposition de valeur\n- **Paragraphe :** 2-3 phrases qui renforcent la confiance\n- **CTA :** texte du bouton principal",
  "linkedin-post":
    "Redige un post LinkedIn professionnel. Hook puissant en premiere ligne (pattern interrupt). Corps structure avec sauts de ligne pour la lisibilite. Storytelling ou insight actionnable. 3-5 hashtags pertinents a la fin. Max 1300 caracteres.",
  "fiche-produit":
    "Redige une fiche produit e-commerce. Structure :\n- **Titre produit :** accrocheur\n- **Accroche :** une phrase qui cree le desir\n- **Description :** 2-3 paragraphes axe benefices (pas juste features)\n- **Points cles :** liste a puces (5 max)\n- **CTA :** phrase de conversion",
  "tweet-thread":
    "Redige un tweet ou thread Twitter. Si tweet unique : max 280 caracteres, percutant et viral. Si thread : 3-5 tweets numerotes (1/, 2/, etc.), le premier doit etre un hook irresistible. Hashtags optionnels.",
  "script-youtube":
    "Redige un script video YouTube. Structure :\n- **[0:00-0:05] HOOK :** question ou affirmation choc\n- **[0:05-0:30] INTRO :** contexte et promesse\n- **[0:30+] TRANSITION :** phrase d'accroche vers le contenu principal\n- Indique les timecodes. Ton conversationnel et energique.",
  "bio-instagram-tiktok":
    "Redige une bio Instagram/TikTok. Max 150 caracteres. Emojis strategiques. Proposition de valeur ultra-claire. Personnalite visible. CTA si possible (lien, DM, etc.). Propose 3 variantes.",
  "slogan-tagline":
    "Propose 5 slogans/taglines. Courts (max 8 mots chacun), memorables, rythmes. Jeux de mots bienvenus si pertinents. Un par ligne, numerotes. Varie les approches : benefice, emotion, defi, aspiration, humour.",
  "google-ads":
    "Redige une annonce Google Ads responsive. Format strict :\n- **Titre 1 :** (max 30 caracteres)\n- **Titre 2 :** (max 30 caracteres)\n- **Titre 3 :** (max 30 caracteres)\n- **Description 1 :** (max 90 caracteres)\n- **Description 2 :** (max 90 caracteres)\n\nRespecte STRICTEMENT les limites de caracteres. Inclus des power words et un CTA.",
};

export function buildUserPrompt(
  contentType: ContentTypeId,
  description: string,
  tone: string,
  cta?: string
): string {
  let prompt = `Redige un contenu de type : **${contentType}**\n\n`;
  prompt += `**Produit/Service :** ${description}\n\n`;
  prompt += `**Ton souhaite :** ${tone}\n\n`;
  if (cta) prompt += `**Appel a l'action souhaite :** ${cta}\n\n`;
  prompt += `**Instructions specifiques :**\n${CONTENT_TYPE_INSTRUCTIONS[contentType]}`;
  return prompt;
}
