import { fuelsConfig } from '../../test/fixtures/fuels.config';

import type {
  CommandEvent,
  Commands,
  DeployedContract,
  ContractDeployOptions,
  FuelsConfig,
  OptionsFunction,
  UserFuelsConfig,
} from './index';
import { createConfig } from './index';

/**
 * @group node
 */
describe('cli/index.ts', () => {
  test('should create config via cli index', () => {
    expect(createConfig(fuelsConfig)).toEqual(fuelsConfig);
  });

  test('ensure types are exported in cli index', () => {
    const types:
      | Commands
      | CommandEvent
      | DeployedContract
      | ContractDeployOptions
      | OptionsFunction
      | UserFuelsConfig
      | FuelsConfig
      | UserFuelsConfig
      | null = null;
    expect(types).not.toBeTruthy();
  });
});
