import * as promptsMod from 'prompts';

import { promptForPackageManager } from './promptForPackageManager';

vi.mock('prompts', async () => {
  const mod = await vi.importActual('prompts');
  return {
    __esModule: true,
    ...mod,
  };
});

const mockPrompts = (params: { results: unknown[] }) => {
  promptsMod.default.inject(params.results);
  const prompts = vi.spyOn(promptsMod, 'default');
  const exit = vi.spyOn(process, 'exit').mockReturnValue({} as never);

  return {
    prompts,
    exit,
  };
};

const responses = ['pnpm', 'npm'];

/**
 * @group node
 */
describe('promptForPackageManager', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should prompt the user to select a package manger', async () => {
    // Arrange
    const { prompts } = mockPrompts({ results: [0] });

    // Act
    await promptForPackageManager();

    // Assert
    expect(prompts).toBeCalledWith(
      expect.objectContaining({
        type: 'select',
        message: expect.stringContaining(`Select a package manager`),
        choices: [
          { title: 'pnpm', value: 'pnpm' },
          { title: 'npm', value: 'npm' },
        ],
      }),
      expect.any(Object)
    );
  });

  it.each(responses)('should handle "%s" response', async (response) => {
    // Arrange
    const { prompts, exit } = mockPrompts({ results: [response] });

    // Act
    const result = await promptForPackageManager();

    // Assert
    expect(result).toBe(response);
    expect(prompts).toBeCalledTimes(1);
    expect(exit).not.toBeCalled();
  });

  it('should exit the process when user cancels the prompt', async () => {
    // Arrange
    const { prompts, exit } = mockPrompts({ results: [new Error()] });

    // Act
    const result = await promptForPackageManager();

    // Assert
    const expectedExitCode = 0;
    expect(exit).toBeCalledWith(expectedExitCode);
    expect(result).toBeUndefined();
    expect(prompts).toBeCalledTimes(1);
  });
});
