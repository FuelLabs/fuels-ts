/* eslint-disable @typescript-eslint/no-explicit-any */
import { Commands } from '../types';

import { withConfig } from './withConfig';

jest.mock('../config/loadConfig', () => {
  const config = {
    basePath: '/root',
    contracts: ['/root/foo', '/root/bar'],
    output: '/root/otuput',
    onSuccess: jest.fn(),
    onFailure: jest.fn(),
  };
  return {
    loadConfig: jest.fn().mockResolvedValue(config),
  };
});

describe('Bin Utils withConfig', () => {
  it('Action should be created and should call onSuccess after execute', async () => {
    const commander = {
      opts: () => ({
        config: '/root',
      }),
    } as any;

    const actionData = {
      foo: 'bar',
    };
    // eslint-disable-next-line @typescript-eslint/require-await
    const buildAction = withConfig(commander, Commands.build, async () => actionData);

    const loadConfigMock = jest.requireMock('../config/loadConfig');
    const configMock = await loadConfigMock.loadConfig();
    await buildAction();
    expect(configMock.onSuccess).toHaveBeenCalledWith(
      {
        type: Commands.build,
        data: actionData,
      },
      configMock
    );
  });

  it('Action should be created and should call onFailure when throw error', async () => {
    const commander = {
      opts: () => ({
        config: '/root',
      }),
    } as any;

    const error = new Error('Failure test');
    const buildAction = await withConfig(commander, Commands.build, () => {
      throw error;
    });

    const loadConfigMock = jest.requireMock('./loadConfig');
    const configMock = await loadConfigMock.loadConfig();
    try {
      await buildAction();
    } catch {
      expect(configMock.onFailure).toHaveBeenCalledWith(error, configMock);
    }
  });
});
