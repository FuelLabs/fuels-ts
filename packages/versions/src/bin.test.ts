import * as cliMod from './cli';

describe('bin.js', () => {
  test('should run cli program', async () => {
    // mocking
    const run = jest.spyOn(cliMod, 'run').mockImplementation();

    // executing
    await import('./bin');

    // validating
    expect(run).toHaveBeenCalledTimes(1);
    expect(run.mock.calls[0]).toBeTruthy();
    expect(run.mock.calls[0]?.length).toBeGreaterThanOrEqual(0);
  });
});
