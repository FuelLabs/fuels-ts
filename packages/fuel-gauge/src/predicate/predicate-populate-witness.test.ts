import type { CoinQuantityLike, ExcludeResourcesOption, Resource, WalletUnlocked } from 'fuels';
import {
  Provider,
  Predicate,
  FUEL_NETWORK_URL,
  ScriptTransactionRequest,
  Wallet,
  bn,
  isCoin,
} from 'fuels';
import { seedTestWallet } from 'fuels/test-utils';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../../test/fixtures';

/**
 * @group node
 */
describe('Predicate', () => {
  const assertNumberArtifacts = getFuelGaugeForcProject(
    FuelGaugeProjectsEnum.PREDICATE_ASSERT_NUMBER
  );
  const assertValueArtifacts = getFuelGaugeForcProject(
    FuelGaugeProjectsEnum.PREDICATE_ASSERT_VALUE
  );

  describe('Populate Predicate Witness', () => {
    const UTXOS_AMOUNT = 12;

    let provider: Provider;
    let receiver: WalletUnlocked;
    let baseAssetId: string;
    let predicate1: Predicate<[number]>;
    let predicate2: Predicate<[boolean]>;

    let wallet1: WalletUnlocked;
    let wallet2: WalletUnlocked;
    let wallet3: WalletUnlocked;

    const cacheResources = (resources: Array<Resource>) =>
      resources.reduce(
        (cache, resource) => {
          if (isCoin(resource)) {
            cache.utxos.push(resource.id);
          } else {
            cache.messages.push(resource.nonce);
          }
          return cache;
        },
        {
          utxos: [],
          messages: [],
        } as Required<ExcludeResourcesOption>
      );

    let quantity: CoinQuantityLike[];
    beforeAll(async () => {
      provider = await Provider.create(FUEL_NETWORK_URL, { cacheUtxo: 1000 });
      baseAssetId = provider.getBaseAssetId();
      quantity = [[500, baseAssetId]];
      wallet1 = Wallet.generate({ provider });
      wallet2 = Wallet.generate({ provider });
      wallet3 = Wallet.generate({ provider });
      receiver = Wallet.generate({ provider });
      predicate1 = new Predicate<[number]>({
        bytecode: assertNumberArtifacts.binHexlified,
        provider,
        abi: assertNumberArtifacts.abiContents,
        inputData: [11],
      });

      predicate2 = new Predicate<[boolean]>({
        bytecode: assertValueArtifacts.binHexlified,
        abi: assertValueArtifacts.abiContents,
        provider,
        inputData: [true],
      });

      await seedTestWallet(
        [wallet1, wallet2, wallet3, predicate1, predicate2],
        [[500_000_000, baseAssetId]],
        UTXOS_AMOUNT
      );
    });

    it('should properly populate predicate data and remove placeholder witness [CASE 1]', async () => {
      let transactionRequest = new ScriptTransactionRequest();
      transactionRequest.addCoinOutput(receiver.address, 100, baseAssetId);

      const predicate1WrongResources = await provider.getResourcesToSpend(
        predicate1.address,
        quantity
      );

      transactionRequest.addResources(predicate1WrongResources); // will add a placeholder witness

      // The request carries 1 placeholder witnesses that was added for the predicate resources
      expect(transactionRequest.witnesses.length).toBe(1);

      // populating predicates inputs with predicate data and removing placeholder witness added for Predicate
      transactionRequest = predicate1.populateTransactionPredicateData(transactionRequest);
      transactionRequest = await provider.estimatePredicates(transactionRequest);

      // The predicate resource witness placeholder was removed
      expect(transactionRequest.witnesses.length).toBe(0);

      transactionRequest.gasLimit = bn(100_000);
      transactionRequest.maxFee = bn(120_000);

      const tx = await provider.sendTransaction(transactionRequest);

      const { isStatusSuccess } = await tx.waitForResult();

      expect(isStatusSuccess).toBeTruthy();
    });

    it('should properly populate predicate data and remove placeholder witness [CASE 2]', async () => {
      let transactionRequest = new ScriptTransactionRequest({ gasLimit: 2000, maxFee: bn(0) });
      transactionRequest.addCoinOutput(receiver.address, 100, baseAssetId);

      const resources1 = await wallet1.getResourcesToSpend(quantity);
      const predicate1WrongResources = await provider.getResourcesToSpend(
        predicate1.address,
        quantity
      );

      transactionRequest.addResources([
        ...predicate1WrongResources, // witnessIndex 0 but will add placeholder witness
        ...resources1, // witnessIndex will be 1 and will need to be ajusted to 0
      ]);

      // The request carries 2 placeholder witnesses, 1 added for the predicate resources
      expect(transactionRequest.witnesses.length).toBe(2);

      // populating predicates inputs with predicate data and removing placeholder witness added for Predicate
      transactionRequest = predicate1.populateTransactionPredicateData(transactionRequest);
      transactionRequest = await provider.estimatePredicates(transactionRequest);

      transactionRequest.gasLimit = bn(100_000);
      transactionRequest.maxFee = bn(120_000);
      // The predicate resource witness placeholder was removed
      expect(transactionRequest.witnesses.length).toBe(1);

      transactionRequest = await wallet1.populateTransactionWitnessesSignature(transactionRequest);

      const tx = await provider.sendTransaction(transactionRequest);

      const { isStatusSuccess } = await tx.waitForResult();

      expect(isStatusSuccess).toBeTruthy();
    });

    it('should properly populate predicate data and remove placeholder witness [CASE 3]', async () => {
      let transactionRequest = new ScriptTransactionRequest({ gasLimit: 2000, maxFee: bn(0) });
      transactionRequest.addCoinOutput(receiver.address, 100, baseAssetId);

      const resources1 = await wallet1.getResourcesToSpend(quantity);
      const resources2 = await wallet2.getResourcesToSpend(quantity);

      const predicate1WrongResources1 = await provider.getResourcesToSpend(
        predicate1.address,
        quantity
      );
      const predicate1WrongResources2 = await provider.getResourcesToSpend(
        predicate1.address,
        quantity,
        cacheResources(predicate1WrongResources1)
      );

      transactionRequest.addResources([
        ...resources1, // witnessIndex 0
        ...predicate1WrongResources1, // witnessIndex 1 and will add placeholder witness
        ...resources2, // witnessIndex 2
        ...predicate1WrongResources2, // witnessIndex 1 since we already added resources from the same owner
      ]);

      // The request carries 3 placeholder witnesses, one was added for the predicate resources
      expect(transactionRequest.witnesses.length).toBe(3);

      // populating predicates inputs with predicate data and removing placeholder witness added for Predicate
      transactionRequest = predicate1.populateTransactionPredicateData(transactionRequest);
      transactionRequest = await provider.estimatePredicates(transactionRequest);

      transactionRequest.gasLimit = bn(160_000);
      transactionRequest.maxFee = bn(180_000);

      // The predicate resource witness placeholder was removed
      expect(transactionRequest.witnesses.length).toBe(2);

      // populating the transaction witnesses with the wallet signatures
      transactionRequest = await wallet1.populateTransactionWitnessesSignature(transactionRequest);
      transactionRequest = await wallet2.populateTransactionWitnessesSignature(transactionRequest);

      const tx = await provider.sendTransaction(transactionRequest);

      const { isStatusSuccess } = await tx.waitForResult();

      expect(isStatusSuccess).toBeTruthy();
    });

    it('should properly populate predicate data and remove placeholder witness [CASE 4]', async () => {
      let transactionRequest = new ScriptTransactionRequest({ gasLimit: 3000, maxFee: bn(0) });

      const resources1 = await wallet1.getResourcesToSpend(quantity);
      const resources2 = await wallet2.getResourcesToSpend(quantity);
      const resources3 = await wallet3.getResourcesToSpend(quantity);

      // predicate resources fetched as non predicate resources
      const predicate1WrongResources = await provider.getResourcesToSpend(
        predicate1.address,
        quantity
      );

      // predicate resources fetched as predicate resources
      const predicate1Resources = await predicate1.getResourcesToSpend(
        quantity,
        cacheResources(predicate1WrongResources)
      );

      // predicate resources fetched as non predicate resources
      const predicate2WrongResources = await provider.getResourcesToSpend(
        predicate2.address,
        quantity
      );

      transactionRequest.addCoinOutput(receiver.address, 100, baseAssetId);

      transactionRequest.addResources([
        ...predicate1WrongResources, // witnessIndex 0 but will generate a placeholder witness
        ...resources1, // witnessIndex 1
        ...predicate2WrongResources, // witnessIndex 2 and will generate a placeholder witness,
        ...resources2, // witnessIndex 3
        ...predicate1Resources, // witnessIndex 0 because these predicate resources were properly fetched
        ...resources3, // witnessIndex 4
      ]);

      // The request carries 5 placeholder witnesses, resources from 2 predicates were added as normal resources
      expect(transactionRequest.witnesses.length).toBe(5);

      // populating predicates inputs with predicate data and removing placeholder witness added for Predicate
      transactionRequest = predicate1.populateTransactionPredicateData(transactionRequest);
      transactionRequest = predicate2.populateTransactionPredicateData(transactionRequest);
      transactionRequest = await provider.estimatePredicates(transactionRequest);

      transactionRequest.gasLimit = bn(250_000);
      transactionRequest.maxFee = bn(270_000);

      // The predicate resource witness placeholder was removed
      expect(transactionRequest.witnesses.length).toBe(3);

      transactionRequest = await wallet1.populateTransactionWitnessesSignature(transactionRequest);
      transactionRequest = await wallet2.populateTransactionWitnessesSignature(transactionRequest);
      transactionRequest = await wallet3.populateTransactionWitnessesSignature(transactionRequest);

      const tx = await provider.sendTransaction(transactionRequest);

      const { isStatusSuccess } = await tx.waitForResult();

      expect(isStatusSuccess).toBeTruthy();
    });

    it('should properly populate predicate data and remove placeholder witness [CASE 5]', async () => {
      let transactionRequest = new ScriptTransactionRequest({ gasLimit: 2000, maxFee: bn(0) });

      const resources1 = await wallet1.getResourcesToSpend(quantity);
      const resources2 = await wallet2.getResourcesToSpend(quantity);

      const predicate1WrongResources = await provider.getResourcesToSpend(
        predicate1.address,
        quantity
      );
      const predicate1Resources = await predicate1.getResourcesToSpend(
        quantity,
        cacheResources(predicate1WrongResources)
      );

      transactionRequest.addCoinOutput(receiver.address, 100, baseAssetId);

      transactionRequest.addResources([
        ...resources1, // witnessIndex 0
        ...resources2, // witnessIndex 1
        ...predicate1Resources, // witnessIndex 0 and no placeholder witness
        ...predicate1WrongResources, // witnessIndex 0 and no placeholder wit since it has resources from same owner
      ]);

      // The request carries 2 placeholder witnesses, none was added for the predicate resources
      expect(transactionRequest.witnesses.length).toBe(2);

      // populating predicates inputs with predicate data
      transactionRequest = predicate1.populateTransactionPredicateData(transactionRequest);
      transactionRequest = await provider.estimatePredicates(transactionRequest);

      const { gasLimit, maxFee } = await provider.estimateTxGasAndFee({ transactionRequest });

      transactionRequest.gasLimit = gasLimit;
      transactionRequest.maxFee = maxFee;

      // The witnesses amount should remain the same
      expect(transactionRequest.witnesses.length).toBe(2);

      transactionRequest = await wallet1.populateTransactionWitnessesSignature(transactionRequest);
      transactionRequest = await wallet2.populateTransactionWitnessesSignature(transactionRequest);

      const tx = await provider.sendTransaction(transactionRequest);

      const { isStatusSuccess } = await tx.waitForResult();

      expect(isStatusSuccess).toBeTruthy();
    });

    it('should properly populate predicate data and remove placeholder witness [CASE 6]', async () => {
      let transactionRequest = new ScriptTransactionRequest({ gasLimit: 2000, maxFee: bn(0) });

      const resources1 = await wallet1.getResourcesToSpend(quantity);
      const resources2 = await wallet2.getResourcesToSpend(quantity);
      const resources3 = await wallet3.getResourcesToSpend(quantity);

      const predicate1WrongResources = await provider.getResourcesToSpend(
        predicate1.address,
        quantity
      );
      const predicate1Resources = await predicate1.getResourcesToSpend(
        quantity,
        cacheResources(predicate1WrongResources)
      );

      const predicate2WrongResources = await provider.getResourcesToSpend(
        predicate2.address,
        quantity
      );

      transactionRequest.addCoinOutput(receiver.address, 100, baseAssetId);

      transactionRequest.addResources([
        ...resources1, // witnessIndex 0
        ...resources2, // witnessIndex 1
        ...predicate1Resources, // witnessIndex 0 and no placeholder witness
        ...predicate2WrongResources, // witnessIndex 2 and will add a placeholder witness
        ...predicate1WrongResources, // witnessIndex 0 because resources from same owner were already added
        ...resources3, // witnessIndex 3
      ]);

      // The request carries 4 placeholder witnesses, one was added for the predicate2 wrong resources
      expect(transactionRequest.witnesses.length).toBe(4);

      // populating predicates inputs with predicate data
      transactionRequest = predicate1.populateTransactionPredicateData(transactionRequest);
      transactionRequest = predicate2.populateTransactionPredicateData(transactionRequest);

      transactionRequest = await provider.estimatePredicates(transactionRequest);

      const { gasLimit, maxFee } = await provider.estimateTxGasAndFee({ transactionRequest });

      transactionRequest.gasLimit = gasLimit;
      transactionRequest.maxFee = maxFee;

      // The witnesses amount should be update to 2
      expect(transactionRequest.witnesses.length).toBe(3);

      transactionRequest = await wallet1.populateTransactionWitnessesSignature(transactionRequest);
      transactionRequest = await wallet2.populateTransactionWitnessesSignature(transactionRequest);
      transactionRequest = await wallet3.populateTransactionWitnessesSignature(transactionRequest);

      const tx = await provider.sendTransaction(transactionRequest);

      const { isStatusSuccess } = await tx.waitForResult();

      expect(isStatusSuccess).toBeTruthy();
    });
  });
});
