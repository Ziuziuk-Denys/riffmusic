// Reads the count from the public t.me page, e.g. "5 973 subscribers"
export function parseSubscribers(html: string): number {
  const match = html.match(/(\d[\d\s,. ]*?)\s*(?:subscribers|members)\b/i);
  return match ? parseInt(match[1].replace(/\D/g, ""), 10) : 0;
}
