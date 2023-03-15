/* eslint-disable @typescript-eslint/no-explicit-any */
import { Commands } from '../../types';

import { createAction } from './createAction';

jest.mock('./loadConfig', () => {
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

describe('Bin Utils createAction', () => {
  it('Action should be created and should call onSuccess after execute', async () => {
    const commander = {
      opts: () => ({
        config: '/root',
      }),
    } as any;

    const actionData = {
      foo: 'bar',
    };
    const buildAction = await createAction(commander, Commands.build, async () => actionData);

    const loadConfigMock = jest.requireMock('./loadConfig');
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
    const buildAction = await createAction(commander, Commands.build, async () => {
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
