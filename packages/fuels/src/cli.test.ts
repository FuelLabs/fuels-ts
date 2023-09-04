import { versions } from '@fuel-ts/versions';
import { Command } from 'commander';

import { run } from './cli';

describe('cli.js', () => {
  test('should call `versions` sub-program', () => {
    // mocking
    const name = vi.spyOn(Command.prototype, 'name');
    const version = vi.spyOn(Command.prototype, 'version');
    const command = vi.spyOn(Command.prototype, 'command');
    const description = vi.spyOn(Command.prototype, 'description');
    const action = vi.spyOn(Command.prototype, 'action');
    const parse = vi.spyOn(Command.prototype, 'parse').mockImplementation(() => []);

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

    expect(action).toHaveBeenCalledTimes(2);
    expect(parse).toHaveBeenCalledTimes(1);
    expect(parse).toHaveBeenCalledWith(argv);
  });
});
