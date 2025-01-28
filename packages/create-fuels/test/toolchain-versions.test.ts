import { versions } from '@fuel-ts/versions';
import toml from '@iarna/toml';
import { readFileSync } from 'fs';
import { join } from 'path';

const projectRoot = join(__dirname, '..', '..', '..');
const templateDir = join(projectRoot, 'templates');
const counterGuideDir = join(projectRoot, 'apps', 'create-fuels-counter-guide');

const toolchainPaths = [
  join(templateDir, 'vite', 'fuel-toolchain.toml'),
  join(templateDir, 'nextjs', 'fuel-toolchain.toml'),
  join(counterGuideDir, 'fuel-toolchain.toml'),
];

interface ToolchainComponents extends toml.JsonMap {
  forc: string;
  'fuel-core': string;
}

describe('versions', () => {
  it('should have versions compatible with fuel-core', () => {
    const expectedVersions = {
      FORC: versions.FORC,
      FUEL_CORE: versions.FUEL_CORE,
    };
    const expectedToolchains = toolchainPaths.map((path) => ({
      path,
      versions: expectedVersions,
    }));

    const toolchains = toolchainPaths.map((toolchainPath) => {
      const toolchainContents = readFileSync(toolchainPath, 'utf-8');
      const parsedToolchain = toml.parse(toolchainContents);
      const components = parsedToolchain.components as ToolchainComponents;

      return {
        path: toolchainPath,
        versions: {
          FORC: components.forc,
          FUEL_CORE: components['fuel-core'],
        },
      };
    });

    expect(toolchains).toStrictEqual(expectedToolchains);
  });
});
