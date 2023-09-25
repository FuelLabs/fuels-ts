import { versions } from '@fuel-ts/versions';
import { Command } from 'commander';

import { run } from './cli';

describe.skip('cli.js', () => {
  test('should call `versions` sub-program', async () => {
    // mocking
    const name = jest.spyOn(Command.prototype, 'name');
    const version = jest.spyOn(Command.prototype, 'version');
    const command = jest.spyOn(Command.prototype, 'command');
    const description = jest.spyOn(Command.prototype, 'description');
    const parse = jest.spyOn(Command.prototype, 'parseAsync').mockImplementation();

    // executing
    jest.spyOn(process, 'exit').mockImplementation();
    await run([]);

    // validating
    expect(name).toHaveBeenCalledWith('fuels');
    expect(version).toHaveBeenCalledWith(versions.FUELS);

    const cmds = ['init', 'dev', 'flow', 'build', 'types', 'deploy', 'versions', 'typegen'];
    cmds.forEach((cmd, index) => {
      expect(command).toHaveBeenNthCalledWith(index + 1, cmd);
    });

    // All commands + 1 main description of the program
    expect(description).toHaveBeenCalledTimes(cmds.length + 1);

    expect(parse).toHaveBeenCalledTimes(1);
    expect(parse).toHaveBeenCalledWith([]);
  });
});
