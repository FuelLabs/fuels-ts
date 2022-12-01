import { Command } from 'commander';

describe('cli.js', () => {
  test('should call `versions` sub-program w/ args', async () => {
    // mocking
    const runVersions = jest.fn();
    jest.mock('@fuel-ts/versions', () => ({
      runVersions,
      versions: { FUELS: '1.0.0' },
    }));

    jest.spyOn(Command.prototype, 'command');

    // executing
    const { run } = await import('./cli');

    const args = process.argv.slice(0).concat('versions');
    run(args); // <- using args here

    // validating
    expect(runVersions).toHaveBeenCalledTimes(1);
  });

  test('should call `versions` sub-program w/o args', async () => {
    // mocking
    const runVersions = jest.fn();
    jest.mock('@fuel-ts/versions', () => ({
      runVersions,
      versions: { FUELS: '1.0.0' },
    }));

    jest.spyOn(Command.prototype, 'command');

    process.argv.push('versions');

    // executing
    const { run } = await import('./cli');
    run(); // <- no args this time

    // restoring modified argv
    process.argv.splice(-1, 1);

    // validating
    expect(runVersions).toHaveBeenCalledTimes(1);
  });
});
