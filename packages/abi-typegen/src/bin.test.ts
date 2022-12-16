import * as cliMod from './cli';

describe('bin.ts', () => {
  test('should run cli program with proper name', async () => {
    const run = jest.spyOn(cliMod, 'run').mockImplementation();

    await import('./bin');

    const expected = { argv: process.argv, programName: 'fuels-typegen' };
    expect(run).toHaveBeenCalledTimes(1);
    expect(run.mock.calls[0][0]).toStrictEqual(expected);
  });
});
