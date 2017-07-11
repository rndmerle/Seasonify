const HEAVY = 'App|Root|Allocine|apiFixtures';

module.exports = {
  preset: 'react-native',
  modulePaths: ['<rootDir>/app/'],
  setupFiles: ['./jest.setup.js'],
  testMatch: process.env.CI ? ['**/?(*.)(spec|test).js'] : [`**/!(${HEAVY}).test.js`],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transformIgnorePatterns: ['/node_modules/(?!native-base)/'],
  collectCoverageFrom: [
    'app/**/*.{js}',
    '!app/**/*.test.js',
    '!app/**/*.style.js',
    '!app/**/index.js',
    process.env.CI ? '' : `!**/(${HEAVY}).js`,
    '!app/Config/**',
    '!app/Navigation/**',
    '!app/Themes/**',
    '!app/Libs/Logging.js',
    '!app/Libs/Rehydration.js',
    '!app/Libs/until.js',
    '!app/HOC/withLog.js',
  ],
  collectCoverage: true,
  coverageReporters: process.env.CI ? ['text', 'lcov'] : ['lcov'],
  // coverageThreshold: {
  //   global: {
  //     statements: 1,
  //     branches: 1,
  //     functions: 1,
  //     lines: 1,
  //   },
  // },
};
