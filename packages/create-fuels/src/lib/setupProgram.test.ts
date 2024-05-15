import { setupProgram } from './setupProgram';

/**
 * @group node
 */
describe('setupProgram', () => {
  test('setupProgram takes in args properly', () => {
    const program = setupProgram();
    program.parse(['', '', 'test-project-name', '-c', '-p', '-s', '--pnpm', '--npm']);
    expect(program.args[0]).toBe('test-project-name');
    expect(program.opts().contract).toBe(true);
    expect(program.opts().predicate).toBe(true);
    expect(program.opts().script).toBe(true);
    expect(program.opts().pnpm).toBe(true);
    expect(program.opts().npm).toBe(true);
  });

  test('setupProgram takes in combined args properly', () => {
    const program = setupProgram();
    program.parse(['', '', '-cps']);
    expect(program.opts().contract).toBe(true);
    expect(program.opts().predicate).toBe(true);
    expect(program.opts().script).toBe(true);
  });

  test('setupProgram - no args', () => {
    const program = setupProgram();
    program.parse([]);
    expect(program.opts().contract).toBe(undefined);
    expect(program.opts().predicate).toBe(undefined);
    expect(program.opts().script).toBe(undefined);
  });
});
