import { runVersions } from './cli';
import * as colorizeUserVersionMod from './lib/colorizeUserVersion';
import * as compareSystemVersionsMod from './lib/compareSystemVersions';
import * as getBuiltinVersionsMod from './lib/getBuiltinVersions';
import * as getSystemVersionsMod from './lib/getSystemVersions';

describe('cli.js', () => {
  // hooks
  beforeEach(jest.clearAllMocks);
  afterEach(jest.restoreAllMocks);

  /*
    Test (mocking) utility
  */
  function mockAllDeps(params: {
    systemForcIsGt: boolean;
    systemForcIsEq: boolean;
    systemFuelCoreIsGt: boolean;
    systemFuelCoreIsEq: boolean;
    systemForcVersion: string;
    systemFuelCoreVersion: string;
  }) {
    const {
      systemForcVersion,
      systemFuelCoreVersion,
      systemFuelCoreIsGt,
      systemFuelCoreIsEq,
      systemForcIsGt,
      systemForcIsEq,
    } = params;

    const error = jest.spyOn(console, 'error').mockImplementation();
    const info = jest.spyOn(console, 'info').mockImplementation();
    const exit = jest.spyOn(process, 'exit').mockImplementation();

    jest
      .spyOn(colorizeUserVersionMod, 'colorizeUserVersion')
      .mockImplementation(({ version }) => version);

    jest.spyOn(compareSystemVersionsMod, 'compareSystemVersions').mockImplementation(() => ({
      systemForcIsGt,
      systemFuelCoreIsGt,
      systemForcIsEq,
      systemFuelCoreIsEq,
    }));

    jest.spyOn(getSystemVersionsMod, 'getSystemVersions').mockImplementation(() => ({
      systemForcVersion,
      systemFuelCoreVersion,
    }));

    jest.spyOn(getBuiltinVersionsMod, 'getBuiltinVersions').mockImplementation(() => ({
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
      systemForcIsGt: true,
      systemForcIsEq: false,
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
      systemForcVersion: '1.0.0',
      systemFuelCoreVersion: '1.0.0',
      systemFuelCoreIsGt: false,
      systemFuelCoreIsEq: true,
      systemForcIsGt: false,
      systemForcIsEq: true,
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
      systemForcVersion: '0.0.1',
      systemFuelCoreVersion: '0.0.1',
      systemFuelCoreIsGt: false,
      systemFuelCoreIsEq: false,
      systemForcIsGt: false,
      systemForcIsEq: false,
    });

    // executing
    runVersions();

    // validating
    expect(info).toHaveBeenCalledTimes(0);
    expect(exit).toHaveBeenCalledWith(1);
    expect(error).toHaveBeenCalledTimes(3);
  });
});
