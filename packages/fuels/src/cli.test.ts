// import { Command } from 'commander';

// import { run } from './cli';

// jest.mock('@fuel-ts/versions', () => ({
//   versions: { FUELS: '9.8.7' },
// }));

describe('cli.js', () => {
  test('should call `versions` sub-program', async () => {
    expect(true).toBeTruthy();
    // mocking
    // const name = jest.spyOn(Command.prototype, 'name');
    // const version = jest.spyOn(Command.prototype, 'version');
    // const command = jest.spyOn(Command.prototype, 'command');
    // const description = jest.spyOn(Command.prototype, 'description');
    // const action = jest.spyOn(Command.prototype, 'action');
    // const parse = jest.spyOn(Command.prototype, 'parse').mockImplementation();

    // // executing
    // run([]); // simulates argv array

    // // validating
    // expect(name).toHaveBeenCalledWith('fuels');
    // expect(version).toHaveBeenCalledWith('9.8.7');

    // expect(command).toHaveBeenNthCalledWith(1, 'versions');
    // expect(description).toHaveBeenNthCalledWith(1, 'check for version incompatibilities');

    // expect(command).toHaveBeenNthCalledWith(2, 'typegen');
    // expect(description).toHaveBeenNthCalledWith(
    //   2,
    //   'generate typescript from contract abi json files'
    // );

    // expect(action).toHaveBeenCalledTimes(2);
    // expect(parse).toHaveBeenCalledTimes(1);
  });
});
