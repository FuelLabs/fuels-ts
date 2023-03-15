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
    const parse = jest.spyOn(Command.prototype, 'parseAsync').mockImplementation();

    // executing
    jest.spyOn(process, 'exit').mockImplementation();
    run([]);

    // validating
    expect(name).toHaveBeenCalledWith('fuels');
    expect(version).toHaveBeenCalledWith(versions.FUELS);

    expect(command).toHaveBeenNthCalledWith(1, 'build');
    expect(command).toHaveBeenNthCalledWith(2, 'types');
    expect(command).toHaveBeenNthCalledWith(3, 'deploy');
    expect(command).toHaveBeenNthCalledWith(4, 'run');
    expect(command).toHaveBeenNthCalledWith(5, 'versions');
    expect(description).toHaveBeenNthCalledWith(6, 'check for version incompatibilities');
    expect(command).toHaveBeenNthCalledWith(6, 'typegen');
    expect(description).toHaveBeenNthCalledWith(
      7,
      'generate typescript from contract abi json files'
    );

    expect(parse).toHaveBeenCalledTimes(1);
    expect(parse).toHaveBeenCalledWith([]);
  });
});
