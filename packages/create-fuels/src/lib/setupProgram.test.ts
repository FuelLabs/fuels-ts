import { setupProgram } from './setupProgram';

/**
 * @group node
 */
describe('setupProgram', () => {
  test('setupProgram takes in args properly', () => {
    const program = setupProgram();
    program.parse([
      '',
      '',
      'test-project-name',
      '--template',
      'nextjs',
      '--pnpm',
      '--npm',
      '--bun',
    ]);
    expect(program.args[0]).toBe('test-project-name');
    expect(program.opts().pnpm).toBe(true);
    expect(program.opts().npm).toBe(true);
    expect(program.opts().bun).toBe(true);
    expect(program.opts().install).toBe(true);
    expect(program.opts().template).toBe('nextjs');
  });

  test('setupProgram - no args', () => {
    const program = setupProgram();
    program.parse([]);
    expect(program.opts().pnpm).toBe(undefined);
    expect(program.opts().npm).toBe(undefined);
    expect(program.opts().bun).toBe(undefined);
    expect(program.opts().install).toBe(true);
  });

  test('setupProgram - `--no-install`', () => {
    const program = setupProgram();
    program.parse(['', '', 'test-project-name', '--no-install']);
    expect(program.opts().install).toBe(false);
  });
});
