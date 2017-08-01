// Note : reload Atom after editing something
//
const testFilePattern = /\/test/;
const antiSlashesPattern = /\\/g;

function removeAppPrefix(module) {
  return module.replace(/^(app|src)\//, '');
}

function getBaseDir(path) {
  let basePath = path.replace(/\\/g, '/');
  basePath = basePath.replace(/^\.?\/?/, '');
  return basePath.replace(/\/[^\/]*$/, '');
}

function inSameFolder(path, baseDir) {
  path = path.replace(/^\.\//, '');
  console.log('inSameFolder');
  console.log('path', path);
  console.log('baseDir', baseDir);
  return path.startsWith(baseDir);
}

function removeAbsolutePath(path, baseDir) {
  path = path.replace(/^\.\//, '');
  console.log('removeAbsolutePath');
  console.log('path', path);
  console.log('baseDir', baseDir);
  return path.replace(`${baseDir}/`, './');
}

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
  // importStatementFormatter({ importStatement }) {
  // return importStatement.replace(/;$/, '');
  // },
  //
  moduleNameFormatter({ pathToCurrentFile, pathToImportedModule, moduleName }) {
    let newModuleName = moduleName;

    // Base beavior is to import with absolute pathes. But if the module is in the same directory or in a child folder, transform to a relative import
    const baseDir = getBaseDir(pathToCurrentFile);
    console.log('baseDir', baseDir);
    if (inSameFolder(pathToImportedModule, baseDir)) {
      newModuleName = removeAbsolutePath(newModuleName, baseDir);
    }

    // /* remove 'app/' or 'src/' when absolute importing */
    newModuleName = removeAppPrefix(newModuleName);

    // if (/-test/.test(pathToCurrentFile)) {
    //   moduleName `mocks/${moduleName}`;
    // }

    return newModuleName;
  },
};
