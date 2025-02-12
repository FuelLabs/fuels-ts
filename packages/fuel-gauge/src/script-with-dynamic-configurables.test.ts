import { getBytecodeConfigurableOffset, getBytecodeDataOffset } from '@fuel-ts/account';
import { arrayify, hexlify } from '@fuel-ts/utils';
import { log } from 'console';
import { writeFileSync } from 'fs';
import { BigNumberCoder } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import {
  ScriptWithDynamicConfigurables,
  ScriptWithDynamicConfigurablesLoader,
} from '../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Script with dynamic configurables', () => {
  describe('Script', () => {
    it('should accept existing dynamic configurables', async () => {
      using launched = await launchTestNode();
      const {
        wallets: [deployer],
      } = launched;

      const script = new ScriptWithDynamicConfigurables(deployer);

      const { waitForResult } = await script.functions
        .main(true, 8, 'sway', 'forc', 'fuel', 16)
        .call();
      const { value } = await waitForResult();

      expect(value).toBe(true);
    });

    it('should allow setting of dynamic configurables', async () => {
      using launched = await launchTestNode();
      const {
        wallets: [deployer],
      } = launched;

      const script = new ScriptWithDynamicConfigurables(deployer);

      script.setConfigurableConstants({
        BOOL: false,
        U8: 0,
        STR: 'STR',
        STR_2: 'STR_2',
        STR_3: 'STR_3',
        LAST_U8: 0,
      });

      const { waitForResult } = await script.functions
        .main(false, 0, 'STR', 'STR_2', 'STR_3', 0)
        .call();
      const { value } = await waitForResult();

      expect(value).toBe(true);
    });

    it('should return false for script with incorrect data', async () => {
      using launched = await launchTestNode();
      const {
        wallets: [deployer],
      } = launched;

      const script = new ScriptWithDynamicConfigurables(deployer);

      const { waitForResult } = await script.functions
        .main(true, 8, 'sway', 'forc', 'fuel-incorrect', 16)
        .call();

      const { value } = await waitForResult();

      expect(value).toBe(false);
    });
  });

  describe('PredicateLoader', () => {
    it('should accept existing dynamic configurables', async () => {
      using launched = await launchTestNode();
      const {
        wallets: [deployer],
      } = launched;

      const scriptLoader = new ScriptWithDynamicConfigurables(deployer);
      const { waitForResult: waitForDeploy } = await scriptLoader.deploy(deployer);
      const script = await waitForDeploy();

      const { waitForResult } = await script.functions
        .main(true, 8, 'sway', 'forc', 'fuel', 16)
        .call();
      const { value } = await waitForResult();

      expect(value).toBe(true);
    });

    it('should allow setting of dynamic configurables', async () => {
      using launched = await launchTestNode();
      const {
        wallets: [deployer],
      } = launched;

      const script = new ScriptWithDynamicConfigurables(deployer);
      const { waitForResult: waitForDeploy } = await script.deploy(deployer);
      const loader = await waitForDeploy();

      loader.setConfigurableConstants({
        BOOL: false,
        U8: 0,
        STR: 'STR',
        STR_2: 'STR_2',
        STR_3: 'STR_3',
        LAST_U8: 0,
      });

      const { waitForResult } = await script.functions
        .main(false, 0, 'STR', 'STR_2', 'STR_3', 0)
        .call();
      const { value } = await waitForResult();

      expect(value).toBe(true);
    });

    it('should return false for script with incorrect data', async () => {
      using launched = await launchTestNode();
      const {
        wallets: [deployer],
      } = launched;

      const scriptLoader = new ScriptWithDynamicConfigurables(deployer);
      const { waitForResult: waitForDeploy } = await scriptLoader.deploy(deployer);
      const script = await waitForDeploy();

      const { waitForResult } = await script.functions
        .main(true, 8, 'sway', 'forc', 'fuel-incorrect', 16)
        .call();

      const { value } = await waitForResult();

      expect(value).toBe(false);
    });
  });
});
