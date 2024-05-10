import * as promptsMod from 'prompts';

import { promptForProgramsToInclude } from './promptForProgramsToInclude';

vi.mock('prompts', async () => {
  const mod = await vi.importActual('prompts');
  return {
    __esModule: true,
    ...mod,
  };
});

const mockPrompts = (params: { results: unknown[] } = { results: [] }) => {
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
describe('promptForProgramsToInclude', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should prompt the user to include Sway programs', async () => {
    // Arrange
    const { prompts } = mockPrompts({
      results: [[]],
    });

    // Act
    await promptForProgramsToInclude({ forceDisablePrompts: false });

    // Assert
    expect(prompts).toBeCalledWith(
      expect.objectContaining({
        type: 'multiselect',
        message: expect.stringContaining(`Which Sway programs do you want?`),
        choices: [
          { title: 'Contract', value: 'contract', selected: true },
          { title: 'Predicate', value: 'predicate', selected: true },
          { title: 'Script', value: 'script', selected: true },
        ],
      }),
      expect.any(Object)
    );
  });

  it('should handle all user responses', async () => {
    // Arrange
    const { prompts, exit } = mockPrompts({
      results: [['contract', 'predicate', 'script']],
    });

    // Act
    const result = await promptForProgramsToInclude({ forceDisablePrompts: false });

    // Assert
    expect(result).toStrictEqual({
      contract: true,
      predicate: true,
      script: true,
    });
    expect(prompts).toBeCalledTimes(1);
    expect(exit).not.toBeCalled();
  });

  it('should handle no selected programs', async () => {
    // Arrange
    const { prompts, exit } = mockPrompts({
      results: [[]],
    });

    // Act
    const result = await promptForProgramsToInclude({ forceDisablePrompts: false });

    // Assert
    expect(result).toStrictEqual({
      contract: false,
      predicate: false,
      script: false,
    });
    expect(prompts).toBeCalledTimes(1);
    expect(exit).not.toBeCalled();
  });

  it('should return the default programs when prompts are disabled', async () => {
    // Arrange
    const { prompts } = mockPrompts();

    // Act
    const result = await promptForProgramsToInclude({ forceDisablePrompts: true });

    // Assert
    expect(result).toStrictEqual({
      contract: false,
      predicate: false,
      script: false,
    });
    expect(prompts).not.toBeCalled();
  });
});
