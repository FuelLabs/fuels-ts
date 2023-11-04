import { Command } from 'commander';

import * as cliMod from './cli';
import { Commands } from './cli/types';
import * as loggingMod from './cli/utils/logger';

/**
 * @group node
 */
describe('cli.js', () => {
  test('should call `versions` sub-program', () => {
    const { configureCli, run, onPreAction } = cliMod;

    beforeEach(() => {
      vi.resetAllMocks();
    });
    afterAll(() => {
      vi.resetAllMocks();
    });

    it('shoud configure cli', () => {
      const program = configureCli();

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
      const build = cmd(Commands.build);
      const deploy = cmd(Commands.deploy);
      const forc = cmd('forc');
      const core = cmd('core');

      expect(init).toBeTruthy();
      expect(dev).toBeTruthy();
      expect(build).toBeTruthy();
      expect(deploy).toBeTruthy();
      expect(forc).toBeTruthy();
      expect(core).toBeTruthy();

      // checking default options
      const path = process.cwd();

      expect(init?.opts()).toEqual({ path });
      expect(dev?.opts()).toEqual({ path });
      expect(build?.opts()).toEqual({ path });
      expect(deploy?.opts()).toEqual({ path });
      expect(forc?.opts()).toEqual({});
      expect(core?.opts()).toEqual({});
    });

    it('preAction should configure logging', () => {
      const spy = vi.spyOn(loggingMod, 'configureLogging');

      const command = new Command();
      command.option('-D, --debug', 'Enables verbose logging', false);
      command.option('-S, --silent', 'Omit output messages', false);
      command.parse([]);

      onPreAction(command);
      expect(spy).toBeCalledWith({
        isDebugEnabled: false,
        isLoggingEnabled: true,
      });
    });

    it('should run cli program', async () => {
      const command = new Command();
      const parseAsync = vi.spyOn(command, 'parseAsync');
      const $configureCli = vi.spyOn(cliMod, 'configureCli').mockReturnValue(command);

      await run([]);

      expect($configureCli).toHaveBeenCalledTimes(1);
      expect(parseAsync).toHaveBeenCalledTimes(1);
    });
  });
});
