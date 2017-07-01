// Note : reload Atom after editing something
//
const testFilePattern = /\/test/;
const appPrefixPattern = /^app\//;
const antiSlashesPattern = /\\/g;

module.exports = {
  aliases: {
    styles: './{filename}.style',
  },
  environments: ({ pathToCurrentFile }) => {
    if (testFilePattern.test(pathToCurrentFile)) {
      return ['jest', 'node'];
    }
    return ['node'];
  },
  useRelativePaths: false,
  declarationKeyword: 'import',
  namedExports: {
    'redux-saga/effects': [
      'call',
      'spawn',
      'put',
      'select',
      'fork',
      'all',
      'take',
      'takeLatest',
      'takeEvery',
      'race',
    ],
    'redux-saga-test-plan': ['expectSaga'],
    reselect: ['createSelector'],
  },
  logLevel: 'info', // debug
  importDevDependencies: true,
  globals: ['jest', 'shallow', 'console', 'expect', 'describe', 'it', 'test'],
  moduleNameFormatter({ moduleName, pathToCurrentFile }) {
    newModuleName = moduleName;
    // if (/-test/.test(pathToCurrentFile)) {
    //   moduleName `mocks/${moduleName}`;
    // }
    /* remove app when absolute importing */
    newModuleName = newModuleName.replace(appPrefixPattern, '');
    return newModuleName;
  },
};
