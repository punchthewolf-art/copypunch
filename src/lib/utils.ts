export async function copyToClipboard(
  text: string,
  watermark?: string
): Promise<boolean> {
  const finalText = watermark ? `${text}\n\n---\n${watermark}` : text;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(finalText);
      return true;
    }
    const textArea = document.createElement("textarea");
    textArea.value = finalText;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const success = document.execCommand("copy");
    document.body.removeChild(textArea);
    return success;
  } catch {
    return false;
  }
}

export function getCharacterInfo(text: string, max: number) {
  const count = text.length;
  const remaining = max - count;
  const isOver = count > max;
  const isNearLimit = remaining <= 200 && remaining > 0;
  return { count, remaining, isOver, isNearLimit };
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

export function getShareUrl(
  platform: "twitter" | "linkedin",
  text: string
): string {
  const baseText = `${text.slice(0, 200)}...\n\nGenere avec CopyPunch — copypunch.fr`;
  if (platform === "twitter") {
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(baseText)}`;
  }
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://copypunch.fr")}`;
}
