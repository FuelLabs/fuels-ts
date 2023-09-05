import { runVersions } from './cli';
import * as colorizeUserVersionMod from './lib/colorizeUserVersion';
import * as compareUserVersionsMod from './lib/compareUserVersions';
import * as getSupportedVersionsMod from './lib/getSupportedVersions';
import * as getUserVersionsMod from './lib/getUserVersions';

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
    userForcIsGt: boolean;
    userForcIsEq: boolean;
    userFuelCoreIsGt: boolean;
    userFuelCoreIsEq: boolean;
    userForcVersion: string;
    userFuelCoreVersion: string;
  }) {
    const {
      userForcVersion,
      userFuelCoreVersion,
      userFuelCoreIsGt,
      userFuelCoreIsEq,
      userForcIsGt,
      userForcIsEq,
    } = params;

    const error = vi.spyOn(console, 'error').mockImplementation(() => []);
    const info = vi.spyOn(console, 'info').mockImplementation(() => []);
    const exit = vi.spyOn(process, 'exit').mockImplementation(() => []);

    vi.spyOn(colorizeUserVersionMod, 'colorizeUserVersion').mockImplementation(
      ({ version }) => version
    );

    vi.spyOn(compareUserVersionsMod, 'compareUserVersions').mockImplementation(() => ({
      userForcIsGt,
      userFuelCoreIsGt,
      userForcIsEq,
      userFuelCoreIsEq,
    }));

    vi.spyOn(getUserVersionsMod, 'getUserVersions').mockImplementation(() => ({
      userForcVersion,
      userFuelCoreVersion,
    }));

    vi.spyOn(getSupportedVersionsMod, 'getSupportedVersions').mockImplementation(() => ({
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
      userForcVersion: '1.1.1',
      userFuelCoreVersion: '1.1.1',
      userFuelCoreIsGt: true,
      userFuelCoreIsEq: false,
      userForcIsGt: true,
      userForcIsEq: false,
    });

    // executing
    runVersions();

    // validating
    expect(info).toHaveBeenCalledTimes(2);
    expect(exit).toHaveBeenCalledWith(0);
    expect(error).toHaveBeenCalledTimes(0);
  });

  test('should inform about exact versions', () => {
    // mocks
    const { error, info, exit } = mockAllDeps({
      userForcVersion: '1.0.0',
      userFuelCoreVersion: '1.0.0',
      userFuelCoreIsGt: false,
      userFuelCoreIsEq: true,
      userForcIsGt: false,
      userForcIsEq: true,
    });

    // executing
    runVersions();

    // validating
    expect(info).toHaveBeenCalledTimes(2);
    expect(exit).toHaveBeenCalledWith(0);
    expect(error).toHaveBeenCalledTimes(0);
  });

  test('should warn about older versions', () => {
    // mocks
    const { error, info, exit } = mockAllDeps({
      userForcVersion: '0.0.1',
      userFuelCoreVersion: '0.0.1',
      userFuelCoreIsGt: false,
      userFuelCoreIsEq: false,
      userForcIsGt: false,
      userForcIsEq: false,
    });

    // executing
    runVersions();

    // validating
    expect(info).toHaveBeenCalledTimes(0);
    expect(exit).toHaveBeenCalledWith(1);
    expect(error).toHaveBeenCalledTimes(3);
  });
});
