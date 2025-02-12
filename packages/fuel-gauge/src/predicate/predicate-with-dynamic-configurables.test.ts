import { WalletUnlocked } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { PredicateWithDynamicConfigurable } from '../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Predicate with dynamic configurables', () => {
  describe('Predicate', () => {
    it('should accept existing dynamic configurables', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [funder],
      } = launched;
      const receiver = WalletUnlocked.generate({ provider });

      const predicate = new PredicateWithDynamicConfigurable({
        provider,
        data: [true, 8, 'sway', 'forc', 'fuel', 16],
      });

      // Fund predicate
      await funder.transfer(predicate.address, 1000);

      // Transfer from predicate -> receiver
      const { waitForResult } = await predicate.transfer(receiver.address, 100);
      const { isStatusSuccess } = await waitForResult();
      expect(isStatusSuccess).toBe(true);

      // Check balance
      const balance = await receiver.getBalance();
      expect(balance).toEqual(expect.toEqualBn(100));
    });

    it('should allow setting of dynamic configurables', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [funder],
      } = launched;
      const receiver = WalletUnlocked.generate({ provider });

      const predicate = new PredicateWithDynamicConfigurable({
        provider,
        configurableConstants: {
          BOOL: false,
          U8: 0,
          STR: 'STR',
          STR_2: 'STR_2',
          STR_3: 'STR_3',
          LAST_U8: 0,
        },
        data: [false, 0, 'STR', 'STR_2', 'STR_3', 0],
      });

      // Fund predicate
      await funder.transfer(predicate.address, 1000);

      // Transfer from predicate -> receiver
      const { waitForResult } = await predicate.transfer(receiver.address, 100);
      const { isStatusSuccess } = await waitForResult();
      expect(isStatusSuccess).toBe(true);

      // Check balance
      const balance = await receiver.getBalance();
      expect(balance).toEqual(expect.toEqualBn(100));
    });

    it('should fail predicate with incorrect data', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [funder],
      } = launched;
      const receiver = WalletUnlocked.generate({ provider });

      const predicate = new PredicateWithDynamicConfigurable({
        provider,
        data: [true, 8, 'sway', 'forc', 'fuel-incorrect', 16],
      });

      // Fund predicate
      await funder.transfer(predicate.address, 1000);

      // Transfer from predicate -> receiver
      await expect(() => predicate.transfer(receiver.address, 100)).rejects.toThrow(
        /PredicateVerificationFailed/
      );
    });
  });

  describe('PredicateLoader', () => {
    it('should accept existing dynamic configurables', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [deployer, funder],
      } = launched;
      const receiver = WalletUnlocked.generate({ provider });

      const loader = new PredicateWithDynamicConfigurable({
        provider,
        data: [true, 8, 'sway', 'forc', 'fuel', 16],
      });
      const { waitForResult: waitForDeploy } = await loader.deploy(deployer);
      const predicate = await waitForDeploy();

      // Fund predicate
      await funder.transfer(predicate.address, 1000);

      // Transfer from predicate -> receiver
      const { waitForResult: waitForTransfer } = await predicate.transfer(receiver.address, 100);
      const { isStatusSuccess } = await waitForTransfer();
      expect(isStatusSuccess).toBe(true);

      // Check balance
      const balance = await receiver.getBalance();
      expect(balance).toEqual(expect.toEqualBn(100));
    });

    it('should allow setting of dynamic configurables', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [deployer, funder],
      } = launched;
      const receiver = WalletUnlocked.generate({ provider });

      const loader = new PredicateWithDynamicConfigurable({
        provider,
        configurableConstants: {
          BOOL: false,
          U8: 0,
          STR: 'STR',
          STR_2: 'STR_2',
          STR_3: 'STR_3',
          LAST_U8: 0,
        },
        data: [false, 0, 'STR', 'STR_2', 'STR_3', 0],
      });
      const { waitForResult: waitForDeploy } = await loader.deploy(deployer);
      const predicate = await waitForDeploy();

      // Fund predicate
      await funder.transfer(predicate.address, 1000);

      // Transfer from predicate -> receiver
      const { waitForResult: waitForTransfer } = await predicate.transfer(receiver.address, 100);
      const { isStatusSuccess } = await waitForTransfer();
      expect(isStatusSuccess).toBe(true);

      // Check balance
      const balance = await receiver.getBalance();
      expect(balance).toEqual(expect.toEqualBn(100));
    });

    it('should fail predicate with incorrect data', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [deployer, funder],
      } = launched;
      const receiver = WalletUnlocked.generate({ provider });

      const loader = new PredicateWithDynamicConfigurable({
        provider,
        data: [true, 8, 'sway', 'forc', 'fuel-incorrect', 16],
      });
      const { waitForResult: waitForDeploy } = await loader.deploy(deployer);
      const predicate = await waitForDeploy();

      // Fund predicate
      await funder.transfer(predicate.address, 1000);

      // Transfer from predicate -> receiver
      await expect(() => predicate.transfer(receiver.address, 100)).rejects.toThrow(
        /PredicateVerificationFailed/
      );
    });
  });
});
