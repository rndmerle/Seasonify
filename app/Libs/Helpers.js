/* @flow */
import type { SortingValue } from 'Types';

export function trimmed(subject: any) {
  if (typeof subject === 'string') {
    return subject.trim();
  } else if (typeof subject === 'object' && 'map' in subject) {
    return subject.map(item => (typeof item === 'string' ? item.trim() : item));
  } else if (typeof subject === 'object') {
    return Object.keys(subject).reduce((newObj, key) => {
      newObj[key] =
        typeof subject[key] === 'string' // eslint-disable-line no-param-reassign
          ? subject[key].trim()
          : subject[key];
      return newObj;
    }, {});
  }
  return subject;
}

export function collecToArray(collection: Object): Array<Object> {
  return Object.keys(collection).map(key => ({
    id: key,
    ...collection[key],
  }));
}

export function getContrastingTextColor(hex: string) {
  /*
    From this W3C document: http://www.webmasterworld.com/r.cgi?f=88&d=9769&url=http://www.w3.org/TR/AERT#color-contrast
    Color brightness is determined by the following formula:
    ((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000
    */

  function hexToR(h) {
    return parseInt(cutHex(h).substring(0, 2), 16);
  }
  function hexToG(h) {
    return parseInt(cutHex(h).substring(2, 4), 16);
  }
  function hexToB(h) {
    return parseInt(cutHex(h).substring(4, 6), 16);
  }
  function cutHex(h) {
    return h.charAt(0) === '#' ? h.substring(1, 7) : h;
  }

  const threshold = 130; /* about half of 256. Lower threshold equals more dark text on dark background  */

  const hRed = hexToR(hex);
  const hGreen = hexToG(hex);
  const hBlue = hexToB(hex);

  const cBrightness = (hRed * 299 + hGreen * 587 + hBlue * 114) / 1000;
  if (cBrightness > threshold) {
    return '#000000';
  }
  return '#ffffff';
}

export function sortAlpha(sorting: SortingValue, a: string, b: string): number {
  if (sorting === 'DESC') return b.localeCompare(a);
  return a.localeCompare(b);
}
