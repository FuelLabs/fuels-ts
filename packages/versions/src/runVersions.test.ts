import type { IColorizeUserVersion } from './utils/colorizeUserVersion';

describe('runVersions.js', () => {
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

    jest.mock('./utils/colorizeUserVersion', () => ({
      colorizeUserVersion: ({ version }: IColorizeUserVersion) => version,
    }));

    jest.mock('./utils/compareUserVersions', () => ({
      compareUserVersions: () => ({
        userForcIsGt,
        userFuelCoreIsGt,
        userForcIsEq,
        userFuelCoreIsEq,
      }),
    }));

    jest.mock('./utils/getUserVersions', () => ({
      getUserVersions: () => ({
        userForcVersion,
        userFuelCoreVersion,
      }),
    }));

    const versionsDefault = {
      FORC: '1.0.0',
      FUEL_CORE: '1.0.0',
      FUELS: '1.0.0',
    };

    jest.mock('./versions', () => ({ versions: versionsDefault }));

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
    const { runVersions } = await import('./runVersions');
    runVersions();

    // validating
    expect(info).toHaveBeenCalledTimes(3);
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
    const { runVersions } = await import('./runVersions');
    runVersions();

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
    const { runVersions } = await import('./runVersions');
    runVersions();

    // validating
    expect(info).toHaveBeenCalledTimes(0);
    expect(exit).toHaveBeenCalledWith(1);
    expect(error).toHaveBeenCalledTimes(3);
  });
});
