import { versions } from '@fuel-ts/versions';
import { Command } from 'commander';

import { run } from './cli';

describe('cli.js', () => {
  test('should call `versions` sub-program', async () => {
    // mocking
    const name = jest.spyOn(Command.prototype, 'name');
    const version = jest.spyOn(Command.prototype, 'version');
    const command = jest.spyOn(Command.prototype, 'command');
    const description = jest.spyOn(Command.prototype, 'description');
    const parse = jest.spyOn(Command.prototype, 'parse').mockImplementation();

    // executing
    const argv = ['a', 'b', 'c'];
    run(argv);

    // validating
    expect(name).toHaveBeenCalledWith('fuels');
    expect(version).toHaveBeenCalledWith(versions.FUELS);

    expect(command).toHaveBeenNthCalledWith(1, 'versions');
    expect(description).toHaveBeenNthCalledWith(1, 'check for version incompatibilities');

    expect(command).toHaveBeenNthCalledWith(2, 'typegen');
    expect(description).toHaveBeenNthCalledWith(
      2,
      'generate typescript from contract abi json files'
    );

    expect(command).toHaveBeenNthCalledWith(3, 'contracts');
    expect(description).toHaveBeenNthCalledWith(
      3,
      'utility to build, deploy and generate types for Sway Contracts'
    );

    expect(parse).toHaveBeenCalledTimes(1);
    expect(parse).toHaveBeenCalledWith(argv);
  });
});
