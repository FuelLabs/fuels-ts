import { ImportMock } from 'ts-mock-imports';

import * as cliMod from './cli';

describe('bin.js', () => {
  test('should run cli program with proper name', async () => {
    const run = ImportMock.mockFunction(cliMod, 'run');

    const expected = { programName: 'fuels-versions' };
    await import('./bin');
    expect(run.callCount).toEqual(1);
    expect(run.firstCall.firstArg).toStrictEqual(expected);
  });
});
