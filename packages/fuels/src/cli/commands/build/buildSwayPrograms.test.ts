import { fuelsConfig } from '../../../../test/fixtures/fuels.config';
import { mockLogger } from '../../../../test/utils/mockLogger';

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

  test('building Sway programs using workspace', async () => {
    const buildSwayProgramSpy = vi
      .spyOn(buildSwayProgramMod, 'buildSwayProgram')
      .mockReturnValue(Promise.resolve());

    const config = {
      ...structuredClone(fuelsConfig),
      workspace: '/any/workspace/path',
    };

    await buildSwayPrograms(config);

    expect(buildSwayProgramSpy).toHaveBeenCalledTimes(1);
    expect(buildSwayProgramSpy).toHaveBeenCalledWith(config, config.workspace);
  });

  test('building Sway programs using individual configs', async () => {
    const buildSwayProgramSpy = vi
      .spyOn(buildSwayProgramMod, 'buildSwayProgram')
      .mockReturnValue(Promise.resolve());

    await buildSwayPrograms(fuelsConfig);

    expect(buildSwayProgramSpy).toHaveBeenCalledTimes(4);
    expect(buildSwayProgramSpy).toHaveBeenCalledWith(fuelsConfig, fuelsConfig.contracts[0]);
    expect(buildSwayProgramSpy).toHaveBeenCalledWith(fuelsConfig, fuelsConfig.contracts[1]);
    expect(buildSwayProgramSpy).toHaveBeenCalledWith(fuelsConfig, fuelsConfig.scripts[0]);
    expect(buildSwayProgramSpy).toHaveBeenCalledWith(fuelsConfig, fuelsConfig.predicates[0]);
  });
});
