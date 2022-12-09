describe('cli.js', () => {
  test('should call `versions` sub-program', async () => {
    // mocking
    const runVersions = jest.fn();

    jest.mock('@fuel-ts/versions', () => ({
      runVersions,
      versions: { FUELS: '1.0.0' },
    }));

    // executing
    const { run } = await import('./cli');
    run([]); // simulates argv array

    // validating
    expect(runVersions).toHaveBeenCalledTimes(1);
  });
});
