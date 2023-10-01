import chalk from 'chalk';
import { existsSync, readFileSync } from 'fs';

import { clean, fuelsConfig, runInit } from './utils/runCommands';

describe('init', () => {
  beforeEach(clean);
  afterAll(clean);

  it('should run `init` command', async () => {
    await runInit();
    expect(existsSync(fuelsConfig)).toBeTruthy();
    const fuelsContents = readFileSync(fuelsConfig, 'utf-8');
    expect(fuelsContents).toMatch(`workspace: 'project',`);
    expect(fuelsContents).toMatch(`output: 'generated',`);
  });

  it('should run `init` command and throw for existent config file', async () => {
    const write = jest.spyOn(process.stderr, 'write').mockImplementation();
    const exit = jest.spyOn(process, 'exit').mockImplementation();

    await runInit();
    await runInit(); // second time will trigger error

    const writeArgs = chalk.reset(write.mock.calls[0][0]);

    expect(write).toHaveBeenCalledTimes(1);
    expect(writeArgs).toMatch(/Config file exists, aborting./);
    expect(exit).toHaveBeenNthCalledWith(1, 1);
  });
});
