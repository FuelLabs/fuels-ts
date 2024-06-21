import { setupProgram } from './setupProgram';

/**
 * @group node
 */
describe('setupProgram', () => {
  test('setupProgram takes in args properly', () => {
    const program = setupProgram();
    program.parse(['', '', 'test-project-name', '--pnpm', '--npm']);
    expect(program.args[0]).toBe('test-project-name');
    expect(program.opts().pnpm).toBe(true);
    expect(program.opts().npm).toBe(true);
    expect(program.opts().bun).toBe(undefined);
  });

  test('setupProgram - no args', () => {
    const program = setupProgram();
    program.parse([]);
    expect(program.opts().pnpm).toBe(undefined);
    expect(program.opts().npm).toBe(undefined);
    expect(program.opts().bun).toBe(undefined);
  });
});
