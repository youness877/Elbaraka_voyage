/**
 * Remplace les jetons `{clé}` d'une chaîne traduite par des valeurs.
 * Exemple : interpolate(t.forms.contact.genericError, { phone: "06…" })
 */
export function interpolate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match
  );
}
