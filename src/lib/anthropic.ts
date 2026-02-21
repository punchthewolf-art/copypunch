import Anthropic from "@anthropic-ai/sdk";
import { getEnv } from "./env";

export function getAnthropicClient(): Anthropic | null {
  const key = getEnv("COPYPUNCH_ANTHROPIC_API_KEY");
  if (!key) return null;
  return new Anthropic({ apiKey: key });
}
