// eslint-disable-next-line @typescript-eslint/no-var-requires
const jestBaseConfig = require('./jest.base.config');

module.exports = {
  extends: '@istanbuljs/nyc-config-typescript',
  all: true,
  include: ['packages/**/*.ts', 'apps/docs-snippets'],
  exclude: [...jestBaseConfig.modulePathIgnorePatterns,],
  reporters: jestBaseConfig.coverageReporters,
  'report-dir': jestBaseConfig.coverageDirectory,
  'temp-directory': `${jestBaseConfig.coverageDirectory}/.nyc_output`,
};
