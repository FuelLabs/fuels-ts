/* eslint-disable global-require */
import * as cliMod from './cli';

describe('bin.ts', () => {
  test('should run cli program with proper name', async () => {
    // mocking
    const run = jest.spyOn(cliMod, 'run').mockImplementation();

    // executing
    await require('./bin');

    // validating
    const expected = { argv: process.argv, programName: 'fuels-typegen' };
    expect(run).toHaveBeenCalledTimes(1);
    expect(run.mock.calls[0][0]).toStrictEqual(expected);
  });
});
