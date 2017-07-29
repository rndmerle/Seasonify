/* @flow */
export default function isEmpty(obj: any): boolean {
  if (obj == null) return true;
  if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0;
  // istanbul ignore next
  // eslint-disable-next-line no-prototype-builtins, no-restricted-syntax
  for (const key in obj) if (obj.hasOwnProperty(key)) return false;
  return true;
}
