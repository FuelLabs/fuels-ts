import * as promptsMod from 'prompts';

import { promptForProjectPath } from './promptForProjectPath';

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

/**
 * @group node
 */
describe('promptForProjectPath', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should prompt the user to select a project name', async () => {
    // Arrange
    const { prompts } = mockPrompts({ results: [true] });

    // Act
    await promptForProjectPath();

    // Assert
    expect(prompts).toBeCalledWith(
      expect.objectContaining({
        type: 'text',
        message: expect.stringContaining(`What is the name of your project?`),
      }),
      expect.any(Object)
    );
  });

  it('should return the user response', async () => {
    // Arrange
    const { prompts, exit } = mockPrompts({ results: ['user-project-name'] });

    // Act
    const result = await promptForProjectPath();

    // Assert
    expect(result).toBe('user-project-name');
    expect(prompts).toBeCalledTimes(1);
    expect(exit).not.toBeCalled();
  });

  it('should exit the process when user cancels the prompt', async () => {
    // Arrange
    const { prompts, exit } = mockPrompts({ results: [new Error()] });

    // Act
    const result = await promptForProjectPath();

    // Assert
    const expectedExitCode = 0;
    expect(exit).toBeCalledWith(expectedExitCode);
    expect(result).toBeUndefined();
    expect(prompts).toBeCalledTimes(1);
  });
});
