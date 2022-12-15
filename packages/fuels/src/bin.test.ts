/* eslint-disable global-require */
describe('bin.js', () => {
  test('should run cli program just fine', async () => {
    // mocking
    const run = jest.fn();
    jest.mock('./cli', () => ({ run }));

    // executing
    await require('./bin');

    // validating
    expect(run).toHaveBeenCalledTimes(1);
    expect(run).toHaveBeenCalledWith(process.argv);
  });
});
