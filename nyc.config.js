// eslint-disable-next-line @typescript-eslint/no-var-requires
const jestBaseConfig = require('./jest.base.config');

module.exports = {
  extends: '@istanbuljs/nyc-config-typescript',
  all: true,
  include: ['packages/**/*.ts', 'apps/docs-snippets'],
  exclude: [...jestBaseConfig.modulePathIgnorePatterns,],
  reporters: ['lcov', 'text', 'text-summary'],
  'report-dir': jestBaseConfig.coverageDirectory,
  'temp-directory': './.nyc_output',
};
