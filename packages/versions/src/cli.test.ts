describe('cli.js', () => {
  test('should call `runVersions` just fine', async () => {
    // mocking
    const runVersions = jest.fn();
    jest.mock('./runVersions', () => ({ runVersions }));

    // executing
    const { run } = await import('./cli');
    run({ programName: 'fuels-versions:test' });

    // validating
    expect(runVersions).toHaveBeenCalledTimes(1);
  });
});
