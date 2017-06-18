/* @flow */
export function trimmed(subject: any) {
  if (typeof subject === 'string') {
    return subject.trim();
  } else if (typeof subject === 'object' && 'map' in subject) {
    return subject.map(item => (typeof item === 'string' ? item.trim() : item));
  } else if (typeof subject === 'object') {
    return Object.keys(subject).reduce((newObj, key) => {
      newObj[key] = typeof subject[key] === 'string' // eslint-disable-line no-param-reassign
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
