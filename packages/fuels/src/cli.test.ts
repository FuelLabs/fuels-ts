import { versions } from '@fuel-ts/versions';
import { Command } from 'commander';

describe('cli.js', () => {
  test('should call `versions` sub-program', async () => {
    // mocking
    const name = jest.spyOn(Command.prototype, 'name');
    const version = jest.spyOn(Command.prototype, 'version');
    const command = jest.spyOn(Command.prototype, 'command');
    const description = jest.spyOn(Command.prototype, 'description');
    const action = jest.spyOn(Command.prototype, 'action');
    const parse = jest.spyOn(Command.prototype, 'parse').mockImplementation();

    jest.mock('@fuel-ts/versions', () => ({
      versions: { FUELS: versions.FUELS },
    }));

    // executing
    const { run } = await import('./cli');
    run([]); // simulates argv array

    // validating
    expect(name).toHaveBeenCalledWith('fuels');
    expect(version).toHaveBeenCalledWith(versions.FUELS);
    expect(command).toHaveBeenCalledWith('versions');
    expect(description).toHaveBeenCalledWith('checks for version incompatibilities');
    expect(action).toHaveBeenCalled();
    expect(parse).toHaveBeenCalled();
  });
});
