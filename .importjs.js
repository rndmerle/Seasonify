const testFilePattern = /\/test/;

module.exports = {
  aliases: {
    styles: './styles/{filename}.style',
    toto: './toto',
  },
  environments: ({ pathToCurrentFile }) => {
    if (testFilePattern.test(pathToCurrentFile)) {
      return ['jest', 'node'];
    }
    return ['node'];
  },
  useRelativePaths: true,
  declarationKeyword: 'import',
  namedExports: {
    // 'react-redux': ['connect'],
  },
  importDevDependencies: ({ pathToCurrentFile }) =>
    testFilePattern.test(pathToCurrentFile),
  moduleNameFormatter({ moduleName, pathToCurrentFile }) {
    // if (/-test/.test(pathToCurrentFile)) {
    //   return `mocks/${moduleName}`;
    // }
    return moduleName.replace(/\\/g, '/'); // back-slashes to slashes (remove the rule after importjs update)
    // return moduleName;
  },
};
