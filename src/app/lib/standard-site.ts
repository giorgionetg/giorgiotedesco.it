export function standardDocumentUri(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  return /^at:\/\/did:[a-z0-9]+:[A-Za-z0-9._:%-]+\/site\.standard\.document\/[234567abcdefghij][234567abcdefghijklmnopqrstuvwxyz]{12}$/.test(value) ? value : undefined;
}
