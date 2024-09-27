import { Command } from 'commander';

import * as cliMod from './cli';
import { Commands } from './cli/types';
import * as checkForUpdatesMod from './cli/utils/checkForAndDisplayUpdates';
import * as loggingMod from './cli/utils/logger';
import { run } from './run';

/**
 * @group node
 */
describe('cli.js', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shoud configure cli', () => {
    const program = cliMod.configureCli();

    expect(program).toBeTruthy();
    // top level props and opts
    expect(program.name()).toEqual('fuels');
    expect(program.opts()).toEqual({
      debug: false,
      silent: false,
    });

    // checks if all commands are defined
    const cmds = program.commands;
    const cmd = (name: string) => cmds.find((c) => c.name() === name);

    const init = cmd(Commands.init);
    const dev = cmd(Commands.dev);
    const node = cmd(Commands.node);
    const build = cmd(Commands.build);
    const deploy = cmd(Commands.deploy);

    expect(init).toBeTruthy();
    expect(dev).toBeTruthy();
    expect(node).toBeTruthy();
    expect(build).toBeTruthy();
    expect(deploy).toBeTruthy();

    // checking default options
    const path = process.cwd();

    expect(init?.opts()).toEqual({ path });
    expect(dev?.opts()).toEqual({ path });
    expect(node?.opts()).toEqual({ path });
    expect(build?.opts()).toEqual({ path });
    expect(deploy?.opts()).toEqual({ path });
  });

  it('preAction should configure logging', () => {
    const spy = vi.spyOn(loggingMod, 'configureLogging');

    const command = new Command();
    command.option('-D, --debug', 'Enables verbose logging', false);
    command.option('-S, --silent', 'Omit output messages', false);
    command.parse([]);

    cliMod.onPreAction(command);
    expect(spy).toBeCalledWith({
      isDebugEnabled: false,
      isLoggingEnabled: true,
    });
  });

  it('should run cli program', async () => {
    const command = new Command();

    const parseAsync = vi
      .spyOn(Command.prototype, 'parseAsync')
      .mockReturnValue(Promise.resolve(command));

    const configureCli = vi.spyOn(cliMod, 'configureCli').mockImplementation(() => new Command());
    vi.spyOn(checkForUpdatesMod, 'checkForAndDisplayUpdates').mockImplementation(() =>
      Promise.resolve()
    );

    await run([]);

    expect(configureCli).toHaveBeenCalledTimes(1);
    expect(parseAsync).toHaveBeenCalledTimes(1);
  });
});
