import { fuelsConfig } from '../../../../test/fixtures/fuels.config';
import { mockLogger } from '../../../../test/utils/mockLogger';
import { BuildMode } from '../../config/forcUtils';

import * as buildSwayProgramMod from './buildSwayProgram';
import { buildSwayPrograms } from './buildSwayPrograms';

/**
 * @group node
 */
describe('buildSwayPrograms', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockLogger();
  });

  function mockBuildSwayProgram() {
    const buildSwayProgram = vi
      .spyOn(buildSwayProgramMod, 'buildSwayProgram')
      .mockReturnValue(Promise.resolve());

    return {
      buildSwayProgram,
    };
  }

  test('building Sway programs using workspace', async () => {
    const { buildSwayProgram } = mockBuildSwayProgram();

    const config = {
      ...structuredClone(fuelsConfig),
      workspace: '/any/workspace/path',
    };

    await buildSwayPrograms(config, BuildMode.DEBUG);

    expect(buildSwayProgram).toHaveBeenCalledTimes(1);
    expect(buildSwayProgram).toHaveBeenCalledWith(config, config.workspace, BuildMode.DEBUG);
  });

  test('building Sway programs using individual configs', async () => {
    const { buildSwayProgram } = mockBuildSwayProgram();

    await buildSwayPrograms(fuelsConfig, BuildMode.RELEASE);

    expect(buildSwayProgram).toHaveBeenCalledTimes(4);

    expect(buildSwayProgram).toHaveBeenCalledWith(
      fuelsConfig,
      fuelsConfig.contracts[0],
      BuildMode.RELEASE
    );

    expect(buildSwayProgram).toHaveBeenCalledWith(
      fuelsConfig,
      fuelsConfig.contracts[1],
      BuildMode.RELEASE
    );

    expect(buildSwayProgram).toHaveBeenCalledWith(
      fuelsConfig,
      fuelsConfig.scripts[0],
      BuildMode.RELEASE
    );

    expect(buildSwayProgram).toHaveBeenCalledWith(
      fuelsConfig,
      fuelsConfig.predicates[0],
      BuildMode.RELEASE
    );
  });
});
