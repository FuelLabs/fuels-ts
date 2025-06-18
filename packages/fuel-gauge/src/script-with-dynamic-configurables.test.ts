import { launchTestNode } from 'fuels/test-utils';

import { ScriptWithDynamicConfigurables } from '../test/typegen';

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

    it('should allow getting of dynamic configurables [initial configurables]', async () => {
      const expectedConfigurables = {
        BOOL: true,
        U8: 8,
        STR: 'sway',
        STR_2: 'forc',
        STR_3: 'fuel',
        LAST_U8: 16,
      };
      using launched = await launchTestNode();
      const {
        wallets: [deployer],
      } = launched;
      const script = new ScriptWithDynamicConfigurables(deployer);

      const actualConfigurables = script.getConfigurables();

      expect(actualConfigurables).toEqual(expectedConfigurables);
    });

    it('should allow getting of dynamic configurables [updated configurables]', async () => {
      const expectedConfigurables = {
        BOOL: false,
        U8: 0,
        STR: 'STR3123123123123123123123',
        STR_2: 'STR_2123123123123123123',
        STR_3: 'STR_3123123123123123123123',
        LAST_U8: 0,
      };
      using launched = await launchTestNode();
      const {
        wallets: [deployer],
      } = launched;
      const script = new ScriptWithDynamicConfigurables(deployer);
      script.setConfigurableConstants(expectedConfigurables);

      const actualConfigurables = script.getConfigurables();

      expect(actualConfigurables).toEqual(expectedConfigurables);
    });
  });

  describe('ScriptLoader', () => {
    it('should accept existing dynamic configurables', async () => {
      using launched = await launchTestNode();
      const {
        wallets: [deployer],
      } = launched;

      const script = new ScriptWithDynamicConfigurables(deployer);
      const loader = await script.deploy(deployer).then(({ waitForResult }) => waitForResult());

      const { waitForResult } = await loader.functions
        .main(true, 8, 'sway', 'forc', 'fuel', 16)
        .call();
      const { value } = await waitForResult();

      expect(value).toBe(true);
    });

    // TODO: this requires changes on the compiler to allow.
    it.todo('should allow setting of dynamic configurables', async () => {
      using launched = await launchTestNode();
      const {
        wallets: [deployer],
      } = launched;

      const script = new ScriptWithDynamicConfigurables(deployer);
      const loader = await script.deploy(deployer).then(({ waitForResult }) => waitForResult());

      loader.setConfigurableConstants({
        BOOL: false,
        U8: 0,
        STR: 'STR',
        STR_2: 'STR_2',
        STR_3: 'STR_3',
        LAST_U8: 0,
      });

      const { waitForResult } = await loader.functions
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
      const loader = await script.deploy(deployer).then(({ waitForResult }) => waitForResult());

      const { waitForResult } = await loader.functions
        .main(true, 8, 'sway', 'forc', 'fuel-incorrect', 16)
        .call();

      const { value } = await waitForResult();

      expect(value).toBe(false);
    });

    it('should allow getting of dynamic configurables [initial configurables]', async () => {
      const expectedInitialConfigurables = {
        BOOL: true,
        U8: 8,
        STR: 'sway',
        STR_2: 'forc',
        STR_3: 'fuel',
        LAST_U8: 16,
      };
      using launched = await launchTestNode();
      const {
        wallets: [deployer],
      } = launched;
      const script = new ScriptWithDynamicConfigurables(deployer);
      const loader = await script.deploy(deployer).then(({ waitForResult }) => waitForResult());

      const actualInitialConfigurables = loader.getConfigurables();

      expect(actualInitialConfigurables).toEqual(expectedInitialConfigurables);
    });

    it('should allow getting of dynamic configurables [updated configurables]', async () => {
      const expectedConfigurables = {
        BOOL: false,
        U8: 0,
        STR: 'STR3123123123123123123123',
        STR_2: 'STR_2123123123123123123',
        STR_3: 'STR_3123123123123123123123',
        LAST_U8: 0,
      };
      using launched = await launchTestNode();
      const {
        wallets: [deployer],
      } = launched;
      const script = new ScriptWithDynamicConfigurables(deployer);
      script.setConfigurableConstants(expectedConfigurables);
      const loader = await script.deploy(deployer).then(({ waitForResult }) => waitForResult());

      const actualConfigurables = loader.getConfigurables();

      expect(actualConfigurables).toEqual(expectedConfigurables);
    });
  });
});
