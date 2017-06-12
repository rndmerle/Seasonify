// Note : reload Atom after editing something
//
const testFilePattern = /\/test/;
const appPrefixPattern = /^app\//;
const antiSlashesPattern = /\\/g;

module.exports = {
  aliases: {
    styles: './styles/{filename}.style',
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
  },
  globals: ['jest', 'shallow', 'console', 'expect', 'describe', 'it', 'test'],
  importDevDependencies: ({ pathToCurrentFile }) => testFilePattern.test(pathToCurrentFile),
  moduleNameFormatter({ moduleName, pathToCurrentFile }) {
    newModuleName = moduleName;
    // if (/-test/.test(pathToCurrentFile)) {
    //   moduleName `mocks/${moduleName}`;
    // }
    // back-slashes to slashes (remove the rule after importjs update)
    newModuleName = newModuleName.replace(antiSlashesPattern, '/');
    // remove app when absolute importing
    newModuleName = newModuleName.replace(appPrefixPattern, '');
    return newModuleName;
  },
};
