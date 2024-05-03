import * as promptsMod from 'prompts';

import { promptFuelUpInstall } from './promptFuelUpInstall';

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
describe('promptFuelUpInstall', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should prompt the user to install fuelup', async () => {
    // Arrange
    const { prompts } = mockPrompts({ results: [true] });

    // Act
    await promptFuelUpInstall();

    // Assert
    expect(prompts).toBeCalledWith(
      expect.objectContaining({
        type: 'confirm',
        message: expect.stringContaining(`It seems you don't have 'fuelup' installed`),
      }),
      expect.any(Object)
    );
  });

  it('should return the user response', async () => {
    // Arrange
    const { prompts, exit } = mockPrompts({ results: [true] });

    // Act
    const result = await promptFuelUpInstall();

    // Assert
    expect(result).toBe(true);
    expect(prompts).toBeCalledTimes(1);
    expect(exit).not.toBeCalled();
  });

  it('should return the user response when user chooses not to install fuelup', async () => {
    // Arrange
    const { prompts, exit } = mockPrompts({ results: [false] });

    // Act
    const result = await promptFuelUpInstall();

    // Assert
    expect(result).toBe(false);
    expect(prompts).toBeCalledTimes(1);
    expect(exit).not.toBeCalled();
  });

  it('should exit the process when user cancels the prompt', async () => {
    // Arrange
    const { prompts, exit } = mockPrompts({ results: [new Error()] });

    // Act
    const result = await promptFuelUpInstall();

    // Assert
    const expectedExitCode = 0;
    expect(exit).toBeCalledWith(expectedExitCode);
    expect(result).toBeUndefined();
    expect(prompts).toBeCalledTimes(1);
  });
});
