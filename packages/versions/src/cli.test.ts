import { eitherOr, runVersions } from './cli';
import * as colorizeUserVersionMod from './lib/colorizeUserVersion';
import * as compareSystemVersionsMod from './lib/compareSystemVersions';
import * as getBuiltinVersionsMod from './lib/getBuiltinVersions';
import * as getSystemVersionsMod from './lib/getSystemVersions';

/**
 * @group node
 */
describe('cli.js', () => {
  // hooks
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  /*
    Test (mocking) utility
  */
  function mockAllDeps(params: {
    systemForcIsGt: boolean;
    systemForcIsEq: boolean;
    systemForcIsLt: boolean;
    systemFuelCoreIsGt: boolean;
    systemFuelCoreIsEq: boolean;
    systemFuelCoreIsLt: boolean;
    systemForcVersion: string;
    systemFuelCoreVersion: string;
    systemVersionsError: Error | null;
  }) {
    const {
      systemForcVersion,
      systemFuelCoreVersion,
      systemFuelCoreIsGt,
      systemFuelCoreIsEq,
      systemFuelCoreIsLt,
      systemForcIsGt,
      systemForcIsEq,
      systemForcIsLt,
      systemVersionsError,
    } = params;

    const error = vi.spyOn(console, 'error').mockImplementation(() => []);
    const info = vi.spyOn(console, 'info').mockImplementation(() => []);
    const exit = vi.spyOn(process, 'exit').mockImplementation(vi.fn());

    vi.spyOn(colorizeUserVersionMod, 'colorizeUserVersion').mockImplementation(
      ({ version }) => version
    );

    vi.spyOn(compareSystemVersionsMod, 'compareSystemVersions').mockImplementation(() => ({
      systemForcIsGt,
      systemFuelCoreIsGt,
      systemForcIsEq,
      systemFuelCoreIsEq,
      systemForcIsLt,
      systemFuelCoreIsLt,
    }));

    vi.spyOn(getSystemVersionsMod, 'getSystemVersions').mockImplementation(() => ({
      error: systemVersionsError,
      systemForcVersion,
      systemFuelCoreVersion,
      systemForcPath: 'forc',
      systemFuelCorePath: 'fuel-core',
    }));

    vi.spyOn(getBuiltinVersionsMod, 'getBuiltinVersions').mockImplementation(() => ({
      FORC: '1.0.0',
      FUEL_CORE: '1.0.0',
      FUELS: '1.0.0',
    }));

    return {
      error,
      info,
      exit,
    };
  }

  /*
    Tests
  */
  test('should inform about newer versions', () => {
    // mocks
    const { error, info, exit } = mockAllDeps({
      systemForcVersion: '1.1.1',
      systemFuelCoreVersion: '1.1.1',
      systemFuelCoreIsGt: true,
      systemFuelCoreIsEq: false,
      systemFuelCoreIsLt: false,
      systemForcIsGt: true,
      systemForcIsEq: false,
      systemForcIsLt: false,
      systemVersionsError: null,
    });

    // executing
    runVersions();

    // validating
    expect(info).toHaveBeenCalledTimes(3);
    expect(exit).toHaveBeenCalledWith(0);
    expect(error).toHaveBeenCalledTimes(0);
  });

  test('should inform about exact versions', () => {
    // mocks
    const { error, info, exit } = mockAllDeps({
      systemForcVersion: '1.0.0',
      systemFuelCoreVersion: '1.0.0',
      systemFuelCoreIsGt: false,
      systemFuelCoreIsEq: true,
      systemFuelCoreIsLt: false,
      systemForcIsGt: false,
      systemForcIsEq: true,
      systemForcIsLt: false,
      systemVersionsError: null,
    });

    // executing
    runVersions();

    // validating
    expect(info).toHaveBeenCalledTimes(3);
    expect(exit).toHaveBeenCalledWith(0);
    expect(error).toHaveBeenCalledTimes(0);
  });

  test('should warn about older versions', () => {
    // mocks
    const { error, info, exit } = mockAllDeps({
      systemForcVersion: '0.0.1',
      systemFuelCoreVersion: '0.0.1',
      systemFuelCoreIsGt: false,
      systemFuelCoreIsEq: false,
      systemFuelCoreIsLt: true,
      systemForcIsGt: false,
      systemForcIsEq: false,
      systemForcIsLt: true,
      systemVersionsError: null,
    });

    // executing
    runVersions();

    // validating
    expect(info).toHaveBeenCalledTimes(1);
    expect(exit).toHaveBeenCalledWith(1);
    expect(error).toHaveBeenCalledTimes(3);
  });

  test('should warn about fuelup exception', () => {
    // mocks
    const systemVersionsError = new Error('fuelup exception');

    const { error, info, exit } = mockAllDeps({
      systemForcVersion: '0.0.1',
      systemFuelCoreVersion: '0.0.1',
      systemFuelCoreIsGt: false,
      systemFuelCoreIsEq: false,
      systemFuelCoreIsLt: false,
      systemForcIsGt: false,
      systemForcIsEq: false,
      systemForcIsLt: false,
      systemVersionsError,
    });

    // executing
    runVersions();

    // validating
    expect(info).toHaveBeenCalledTimes(1);
    expect(exit).toHaveBeenCalledWith(1);
    expect(error).toHaveBeenCalledTimes(4);

    expect(error.mock.calls[1][0]).toMatch(/make sure you/i);
    expect(error.mock.calls[2][0]).toMatch(/>> Error: /i);
    expect(error.mock.calls[2][1]).toMatch(/fuelup exception/i);
    expect(error.mock.calls[3][0]).toMatch(/fuellabs\/fuelup/);
  });

  it('should use fallback values', () => {
    expect(eitherOr('a', 'b')).toEqual('a');
    expect(eitherOr(null, 'b')).toEqual('b');
  });

  test('should notify about newer npm version', () => {
    // mocks
    const { info } = mockAllDeps({
      systemForcVersion: '1.1.1',
      systemFuelCoreVersion: '1.1.1',
      systemFuelCoreIsGt: true,
      systemFuelCoreIsEq: false,
      systemFuelCoreIsLt: false,
      systemForcIsGt: true,
      systemForcIsEq: false,
      systemForcIsLt: false,
      systemVersionsError: null,
    });

    // executing
    runVersions();

    expect(info).toHaveBeenCalledWith(
      '\nThere is a newer version of fuels available: 1.0.1. Your version is: 1.0.0'
    );
  });

  test('should log proper message when npm version is the same as the latest', () => {
    // mocks
    const { info } = mockAllDeps({
      systemForcVersion: '1.1.1',
      systemFuelCoreVersion: '1.1.1',
      systemFuelCoreIsGt: false,
      systemFuelCoreIsEq: true,
      systemFuelCoreIsLt: false,
      systemForcIsGt: false,
      systemForcIsEq: true,
      systemForcIsLt: false,
      systemVersionsError: null,
    });

    // executing
    runVersions();

    expect(info).toHaveBeenCalledWith('\nYour fuels version is up to date: 1.1.1');
  });
});
