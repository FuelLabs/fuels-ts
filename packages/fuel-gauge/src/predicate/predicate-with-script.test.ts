import type { BigNumberish, WalletUnlocked } from 'fuels';
import { toNumber, Script, Provider, Predicate, FUEL_NETWORK_URL } from 'fuels';
import { generateTestWallet, seedTestWallet } from 'fuels/test-utils';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../../test/fixtures';
import type { Validation } from '../types/predicate';

/**
 * @group node
 */
describe('Predicate', () => {
  const { binHexlified: scriptBytes, abiContents: scriptAbi } = getFuelGaugeForcProject(
    FuelGaugeProjectsEnum.SCRIPT_MAIN_ARGS
  );

  const { binHexlified: predicateBytesStruct, abiContents: predicateAbiMainArgsStruct } =
    getFuelGaugeForcProject(FuelGaugeProjectsEnum.PREDICATE_MAIN_ARGS_STRUCT);

  describe('With script', () => {
    let wallet: WalletUnlocked;
    let receiver: WalletUnlocked;
    let provider: Provider;

    let baseAssetId: string;
    beforeAll(async () => {
      provider = await Provider.create(FUEL_NETWORK_URL);
      baseAssetId = provider.getBaseAssetId();
      wallet = await generateTestWallet(provider, [[10_000_000, baseAssetId]]);
      receiver = await generateTestWallet(provider);
    });

    it('calls a predicate and uses proceeds for a script call', async () => {
      const initialReceiverBalance = toNumber(await receiver.getBalance());
      const scriptInstance = new Script<BigNumberish[], BigNumberish>(
        scriptBytes,
        scriptAbi,
        wallet
      );

      // calling the script with the receiver account (no resources)
      const scriptInput = 1;
      scriptInstance.account = receiver;

      await expect(scriptInstance.functions.main(scriptInput).call()).rejects.toThrow(
        /not enough coins to fit the target/
      );

      // setup predicate
      const amountToPredicate = 900_000;
      const amountToReceiver = 100_000;
      const predicate = new Predicate<[Validation]>({
        bytecode: predicateBytesStruct,
        provider,
        abi: predicateAbiMainArgsStruct,
        inputData: [
          {
            has_account: true,
            total_complete: 100,
          },
        ],
      });

      await seedTestWallet(predicate, [[amountToPredicate, baseAssetId]], 3);

      // executing predicate to transfer resources to receiver
      const tx = await predicate.transfer(receiver.address, amountToReceiver, baseAssetId, {
        gasLimit: 1000,
      });

      const { isStatusSuccess } = await tx.waitForResult();
      expect(isStatusSuccess).toBeTruthy();

      const res = await scriptInstance.functions.main(scriptInput).call();
      expect(res.transactionResult.isStatusSuccess).toBeTruthy();

      const receiverFinalBalance = await receiver.getBalance();

      expect(toNumber(initialReceiverBalance)).toBe(0);
      expect(receiverFinalBalance.gt(initialReceiverBalance)).toBeTruthy();
    });
  });
});
