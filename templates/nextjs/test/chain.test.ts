import { describe, test, expect } from 'vitest';
import toml from '@iarna/toml';
import { readFileSync } from 'fs';

describe('', () => {
  test('create-fuels checks the versions on the fuel-toolchain file', async () => {
    const fuelToolchain = readFileSync(paths.fuelToolchainPath, 'utf-8');
    const parsedFuelToolchain = toml.parse(fuelToolchain);

    const { toolchain, components } = parsedFuelToolchain;

    expect(toolchain).toEqual({ channel: 'testnet' });
    expect(components).toEqual({
      forc: '0.66.6',
      'fuel-core': '0.40.3',
    });
  });
});
