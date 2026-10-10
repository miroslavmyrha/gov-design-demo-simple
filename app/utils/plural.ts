/**
 * Czech has three plural forms: 1 chyba, 2-4 chyby, 5 and more chyb.
 * Returns the index of the form in a message written as "one | few | many".
 *
 * vue-i18n also calls the rule for messages that merely contain a "|" and for messages with
 * fewer forms, so the index never points past the forms the message has.
 */
export function czechPlural(count: number, forms = 3): number {
  const form = count === 1 ? 0 : count >= 2 && count <= 4 ? 1 : 2
  return Math.min(form, Math.max(forms - 1, 0))
}
