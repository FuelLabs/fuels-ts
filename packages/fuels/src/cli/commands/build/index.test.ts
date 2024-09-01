import { fuelsConfig } from '../../../../test/fixtures/fuels.config';
import { mockLogger } from '../../../../test/utils/mockLogger';

import { build } from '.';
import * as buildSwayProgramsMod from './buildSwayPrograms';
import * as generateTypesMod from './generateTypes';

/**
 * @group node
 */
describe('build', () => {
  const mockAll = () => {
    const { log } = mockLogger();

    const onBuild = vi.fn();

    const buildSwayPrograms = vi
      .spyOn(buildSwayProgramsMod, 'buildSwayPrograms')
      .mockResolvedValue();
    const generateTypes = vi.spyOn(generateTypesMod, 'generateTypes').mockResolvedValue();

    return {
      onBuild,
      log,
      buildSwayPrograms,
      generateTypes,
    };
  };

  test('should build sway programs and generate types', async () => {
    const { log, buildSwayPrograms, generateTypes } = mockAll();

    await build(fuelsConfig);

    expect(log).toHaveBeenCalledWith('Building..');
    expect(buildSwayPrograms).toHaveBeenCalled();
    expect(generateTypes).toHaveBeenCalled();
  });

  test('should call onBuild callback', async () => {
    const { onBuild } = mockAll();
    const config = { ...fuelsConfig, onBuild };

    await build(config);

    expect(onBuild).toHaveBeenCalledWith(config);
  });
});
