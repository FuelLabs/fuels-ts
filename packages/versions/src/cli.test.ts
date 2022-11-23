import { bold } from 'chalk';

describe('cli.js', () => {
  /*
    Hooks
  */
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  /*
    Test (mocking) utility
  */
  function mockAll(params: {
    forcVersion: string;
    fuelCoreVersion: string;
    shouldThrow?: boolean;
  }) {
    const { forcVersion, fuelCoreVersion, shouldThrow } = params;

    const error = jest.spyOn(console, 'error').mockImplementation();
    const info = jest.spyOn(console, 'info').mockImplementation();
    const exit = jest.spyOn(process, 'exit').mockImplementation();

    const execSync = jest.fn();
    execSync.mockReturnValueOnce(forcVersion);
    execSync.mockReturnValueOnce(fuelCoreVersion);

    const execSyncThrow = jest.fn(() => {
      throw new Error();
    });

    jest.mock('child_process', () => ({ execSync: shouldThrow ? execSyncThrow : execSync }));

    const versionsDefault = {
      FORC: '1.0.0',
      FUEL_CORE: '1.0.0',
      FUELS: '1.0.0',
    };

    jest.mock('./index', () => ({ versions: versionsDefault }));

    return {
      error,
      info,
      exit,
      execSync,
    };
  }

  /*
    Tests
  */
  test('should show forc warnings', async () => {
    // mocks
    const { execSync, error, info, exit } = mockAll({
      forcVersion: '0.0.1', // not ok
      fuelCoreVersion: '1.0.0', // ok
    });

    // executing
    const { run } = await import('./cli');
    run({ programName: 'versions-test' });

    // validating
    expect(execSync).toHaveBeenCalledTimes(2);
    expect(error).toHaveBeenCalledTimes(3);
    expect(info).toHaveBeenCalledTimes(0);
    expect(exit).toHaveBeenCalledWith(1);

    const [args0, args1, args2] = error.mock.calls.map((c) => c[0]);

    expect(args0).toContain(`Supported ${bold('Forc')} version`);
    expect(args1).toContain(`You're using ${bold('Forc')}`);
    expect(args2).toContain(`You can install/update`);
    expect(args2).toContain(`https://github.com/fuellabs/fuelup`);
  });

  test('should show fuel-core warnings', async () => {
    // mocks
    const { execSync, error, info, exit } = mockAll({
      forcVersion: '1.0.0', // ok
      fuelCoreVersion: '0.0.2', // not ok
    });

    // executing
    const { run } = await import('./cli');
    run({ programName: 'versions-test' });

    // validating
    expect(execSync).toHaveBeenCalledTimes(2);
    expect(error).toHaveBeenCalledTimes(3);
    expect(info).toHaveBeenCalledTimes(0);
    expect(exit).toHaveBeenCalledWith(1);

    const [args0, args1, args2] = error.mock.calls.map((c) => c[0]);

    expect(args0).toContain(`Supported ${bold('fuel-core')} version`);
    expect(args1).toContain(`You're using ${bold('fuel-core')}`);
    expect(args2).toContain(`You can install/update`);
    expect(args2).toContain(`https://github.com/fuellabs/fuelup`);
  });

  test('should show success message', async () => {
    // mocks
    const { execSync, error, info, exit } = mockAll({
      forcVersion: '1.0.0', // ok
      fuelCoreVersion: '1.0.0', // ok
    });

    // executing
    const { run } = await import('./cli');
    run({ programName: 'versions-test' });

    // validating
    expect(execSync).toHaveBeenCalledTimes(2);
    expect(error).toHaveBeenCalledTimes(0);
    expect(info).toHaveBeenCalledTimes(3);
    expect(exit).toHaveBeenCalledWith(0);

    const [args0, args1, args2] = info.mock.calls.map((call) => call[0]);

    expect(args0).toContain(`You have all the right versions! ⚡`);
    expect(args1).toContain(` ${bold('Forc')}: `);
    expect(args2).toContain(` ${bold('fuel-core')}: `);
  });

  test('should throw on error', async () => {
    // mocks
    const { error } = mockAll({
      forcVersion: '1.0.0', // ok
      fuelCoreVersion: '1.0.0', // ok
      shouldThrow: true, // will cause friction
    });

    // executing and validating
    const { run } = await import('./cli');

    expect(() => {
      run({ programName: 'versions-test' });
    }).toThrow();

    expect(error).toHaveBeenCalledTimes(2);

    const [args0, args1] = error.mock.calls.map((call) => call[0]);

    expect(args0).toContain(`Make sure you have Forc and fuel-core installed.`);
    expect(args1).toBeTruthy();
  });
});
