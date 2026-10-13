// Andrey.bot: keyword intents from content/bot.ts. Short Latin keywords (≤3 chars) must match a
// whole word, so "hi" doesn't fire on "this" and "now" doesn't fire on "know". Russian keywords are
// stems ("ищ" → "ищу") and match as substrings.

import { botCopy, botIntents } from "@/content/bot";

function matches(text: string, keyword: string) {
  if (keyword.length > 3 || !/^[a-z]+$/.test(keyword)) return text.includes(keyword);
  return new RegExp(`(^|[^\\p{L}])${keyword}($|[^\\p{L}])`, "u").test(text);
}

export function botAnswer(question: string): string {
  const t = question.toLowerCase();
  const intent = botIntents.find((i) => i.keywords.some((k) => matches(t, k)));
  return intent?.answer ?? botCopy.fallback;
}
