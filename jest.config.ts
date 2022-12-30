import type { Config } from '@jest/types';

/**
 * Every package has their own `jest.config.js` config file, with
 * their individual settings. This file is a macro one, containing
 * mainly the `projects` property, for telling jest where our
 * projects are; and also global `coverage` settings — the latter,
 * pertaining to the coverage sum for all projects.
 */
const config: Config.InitialOptions = {
  projects: ['<rootDir>/packages/*/jest.config.ts'],
  coverageThreshold: {
    global: {
      branches: 55.56,
      functions: 68.89,
      lines: 79.61,
      statements: 79.52,
    },
  },
};

export default config;
