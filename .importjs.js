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
};
