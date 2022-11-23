describe('expectCleanIndex.js', () => {
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
  function mockAll(params?: { gitStatus?: string }) {
    const { gitStatus = '' } = params || {};

    const error = jest.spyOn(console, 'error').mockImplementation();
    const exit = jest.spyOn(process, 'exit').mockImplementation();
    const execSync = jest.fn(() => gitStatus || '');

    jest.mock('child_process', () => ({ execSync }));

    return { error, execSync, exit };
  }

  /*
    Tests
  */

  test('should not exit', async () => {
    // mockling
    const { execSync, error, exit } = mockAll();

    // executing
    const { expectCleanIndex } = await import('./expectCleanIndex');
    expectCleanIndex();

    // validating
    expect(execSync).toHaveBeenCalledTimes(1);
    expect(error).toHaveBeenCalledTimes(0);
    expect(exit).toHaveBeenCalledTimes(0);
  });

  test('should exit(1) for dirty index', async () => {
    // mocking
    const { execSync, error, exit } = mockAll({
      gitStatus: 'something other than empty str',
    });

    // executing
    const { expectCleanIndex } = await import('./expectCleanIndex');
    expectCleanIndex();

    expect(execSync).toHaveBeenCalledTimes(1);
    expect(error).toHaveBeenCalledTimes(1);
    expect(exit).toHaveBeenCalledWith(1);
  });
});
