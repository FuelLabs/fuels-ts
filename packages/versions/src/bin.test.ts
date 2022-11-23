describe('bin.js', () => {
  test('should run cli program with proper name', async () => {
    // mocking
    const run = jest.fn();
    jest.mock('./cli', () => ({ run }));

    // executing
    const expected = { programName: 'fuels-versions' };
    await import('./bin');

    // validating
    expect(run).toHaveBeenCalledTimes(1);
    expect(run.mock.calls[0][0]).toStrictEqual(expected);
  });
});
