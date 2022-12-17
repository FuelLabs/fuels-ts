import { hooks } from '../test/shared/hooks';

import { run } from './cli';
import * as colorizeUserVersionMod from './lib/colorizeUserVersion';
import * as compareUserVersionsMod from './lib/compareUserVersions';
import * as getSupportedVersionsMod from './lib/getSupportedVersions';
import * as getUserVersionsMod from './lib/getUserVersions';

describe('cli.js', () => {
  // hooks
  beforeEach(hooks.beforeEach);
  afterEach(hooks.afterEach);

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

    const error = jest.spyOn(console, 'error').mockImplementation();
    const info = jest.spyOn(console, 'info').mockImplementation();
    const exit = jest.spyOn(process, 'exit').mockImplementation();

    jest
      .spyOn(colorizeUserVersionMod, 'colorizeUserVersion')
      .mockImplementation(({ version }) => version);

    jest.spyOn(compareUserVersionsMod, 'compareUserVersions').mockImplementation(() => ({
      userForcIsGt,
      userFuelCoreIsGt,
      userForcIsEq,
      userFuelCoreIsEq,
    }));

    jest.spyOn(getUserVersionsMod, 'getUserVersions').mockImplementation(() => ({
      userForcVersion,
      userFuelCoreVersion,
    }));

    jest.spyOn(getSupportedVersionsMod, 'getSupportedVersions').mockImplementation(() => ({
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
  test('should inform about newer versions', async () => {
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
    run();

    // validating
    expect(info).toHaveBeenCalledTimes(2);
    expect(exit).toHaveBeenCalledWith(0);
    expect(error).toHaveBeenCalledTimes(0);
  });

  test('should inform about exact versions', async () => {
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
    run();

    // validating
    expect(info).toHaveBeenCalledTimes(2);
    expect(exit).toHaveBeenCalledWith(0);
    expect(error).toHaveBeenCalledTimes(0);
  });

  test('should warn about older versions', async () => {
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
    run();

    // validating
    expect(info).toHaveBeenCalledTimes(0);
    expect(exit).toHaveBeenCalledWith(1);
    expect(error).toHaveBeenCalledTimes(3);
  });
});
