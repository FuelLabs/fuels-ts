import type { CoinQuantityLike, ExcludeResourcesOption, Resource } from 'fuels';
import { Predicate, ScriptTransactionRequest, bn, isCoin, Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { PredicateAssertNumber, PredicateAssertValue } from '../../test/typegen';

import { fundPredicate } from './utils/predicate';

// todo failing

/**
 * @group node
 * @group browser
 */
describe(
  'Predicate',
  () => {
    const UTXOS_AMOUNT = 0.01;

    describe('Populate Predicate Witness', () => {
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

      it('should properly populate predicate data and remove placeholder witness [CASE 1]', async () => {
        using launched = await launchTestNode();
        const {
          provider,
          wallets: [wallet],
        } = launched;

        const quantity: CoinQuantityLike[] = [[500, provider.getBaseAssetId()]];

        const predicateAssertNumber = new Predicate<[number]>({
          abi: PredicateAssertNumber.abi,
          bytecode: PredicateAssertNumber.bytecode,
          provider,
          data: [11],
        });

        await fundPredicate(wallet, predicateAssertNumber, 500_000);

        let transactionRequest = new ScriptTransactionRequest();
        const receiver = Wallet.generate({ provider });
        transactionRequest.addCoinOutput(receiver.address, 100, provider.getBaseAssetId());

        const predicateAssertNumberWrongResources = await provider.getResourcesToSpend(
          predicateAssertNumber.address,
          quantity
        );

        transactionRequest.addResources(predicateAssertNumberWrongResources); // will add a placeholder witness

        // The request carries 1 placeholder witnesses that was added for the predicate resources
        expect(transactionRequest.witnesses.length).toBe(1);

        // populating predicates inputs with predicate data and removing placeholder witness added for Predicate
        transactionRequest =
          predicateAssertNumber.populateTransactionPredicateData(transactionRequest);
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
        using launched = await launchTestNode();
        const {
          provider,
          wallets: [fundingWallet, wallet1],
        } = launched;

        const quantity: CoinQuantityLike[] = [[500, provider.getBaseAssetId()]];

        const receiver = Wallet.generate({ provider });

        let transactionRequest = new ScriptTransactionRequest({ gasLimit: 2000, maxFee: bn(0) });
        transactionRequest.addCoinOutput(receiver.address, 100, provider.getBaseAssetId());

        const predicateAssertNumber = new Predicate<[number]>({
          abi: PredicateAssertNumber.abi,
          bytecode: PredicateAssertNumber.bytecode,
          provider,
          data: [11],
        });

        await fundPredicate(fundingWallet, predicateAssertNumber, 500_000);

        const resources1 = await wallet1.getResourcesToSpend(quantity);
        const predicateAssertNumberWrongResources = await provider.getResourcesToSpend(
          predicateAssertNumber.address,
          quantity
        );

        transactionRequest.addResources([
          ...predicateAssertNumberWrongResources, // witnessIndex 0 but will add placeholder witness
          ...resources1, // witnessIndex will be 1 and will need to be ajusted to 0
        ]);

        // The request carries 2 placeholder witnesses, 1 added for the predicate resources
        expect(transactionRequest.witnesses.length).toBe(2);

        // populating predicates inputs with predicate data and removing placeholder witness added for Predicate
        transactionRequest =
          predicateAssertNumber.populateTransactionPredicateData(transactionRequest);
        transactionRequest = await provider.estimatePredicates(transactionRequest);

        transactionRequest.gasLimit = bn(100_000);
        transactionRequest.maxFee = bn(120_000);
        // The predicate resource witness placeholder was removed
        expect(transactionRequest.witnesses.length).toBe(1);

        transactionRequest =
          await wallet1.populateTransactionWitnessesSignature(transactionRequest);

        const tx = await provider.sendTransaction(transactionRequest);

        const { isStatusSuccess } = await tx.waitForResult();

        expect(isStatusSuccess).toBeTruthy();
      });

      it('should properly populate predicate data and remove placeholder witness [CASE 3]', async () => {
        using launched = await launchTestNode({
          walletsConfig: {
            count: 3,
          },
        });
        const {
          provider,
          wallets: [fundingWallet, wallet1, wallet2],
        } = launched;

        const quantity: CoinQuantityLike[] = [[500, provider.getBaseAssetId()]];

        const predicateAssertNumber = new Predicate<[number]>({
          abi: PredicateAssertNumber.abi,
          bytecode: PredicateAssertNumber.bytecode,
          provider,
          data: [11],
        });

        await fundPredicate(fundingWallet, predicateAssertNumber, 500_000, UTXOS_AMOUNT);

        const receiver = Wallet.generate({ provider });

        let transactionRequest = new ScriptTransactionRequest({ gasLimit: 2000, maxFee: bn(0) });
        transactionRequest.addCoinOutput(receiver.address, 100, provider.getBaseAssetId());

        const resources1 = await wallet1.getResourcesToSpend(quantity);
        const resources2 = await wallet2.getResourcesToSpend(quantity);

        const predicateAssertNumberWrongResources1 = await provider.getResourcesToSpend(
          predicateAssertNumber.address,
          quantity
        );
        const predicateAssertNumberWrongResources2 = await provider.getResourcesToSpend(
          predicateAssertNumber.address,
          quantity,
          cacheResources(predicateAssertNumberWrongResources1)
        );

        transactionRequest.addResources([
          ...resources1, // witnessIndex 0
          ...predicateAssertNumberWrongResources1, // witnessIndex 1 and will add placeholder witness
          ...resources2, // witnessIndex 2
          ...predicateAssertNumberWrongResources2, // witnessIndex 1 since we already added resources from the same owner
        ]);

        // The request carries 3 placeholder witnesses, one was added for the predicate resources
        expect(transactionRequest.witnesses.length).toBe(3);

        // populating predicates inputs with predicate data and removing placeholder witness added for Predicate
        transactionRequest =
          predicateAssertNumber.populateTransactionPredicateData(transactionRequest);
        transactionRequest = await provider.estimatePredicates(transactionRequest);

        transactionRequest.gasLimit = bn(160_000);
        transactionRequest.maxFee = bn(180_000);

        // The predicate resource witness placeholder was removed
        expect(transactionRequest.witnesses.length).toBe(2);

        // populating the transaction witnesses with the wallet signatures
        transactionRequest =
          await wallet1.populateTransactionWitnessesSignature(transactionRequest);
        transactionRequest =
          await wallet2.populateTransactionWitnessesSignature(transactionRequest);

        const tx = await provider.sendTransaction(transactionRequest);

        const { isStatusSuccess } = await tx.waitForResult();

        expect(isStatusSuccess).toBeTruthy();
      });

      it('should properly populate predicate data and remove placeholder witness [CASE 4]', async () => {
        using launched = await launchTestNode({
          walletsConfig: {
            count: 4,
          },
        });
        const {
          provider,
          wallets: [fundingWallet, wallet1, wallet2, wallet3],
        } = launched;

        const quantity: CoinQuantityLike[] = [[500, provider.getBaseAssetId()]];

        let transactionRequest = new ScriptTransactionRequest({ gasLimit: 3000, maxFee: bn(0) });

        const resources1 = await wallet1.getResourcesToSpend(quantity);
        const resources2 = await wallet2.getResourcesToSpend(quantity);
        const resources3 = await wallet3.getResourcesToSpend(quantity);

        const predicateAssertNumber = new Predicate<[number]>({
          abi: PredicateAssertNumber.abi,
          bytecode: PredicateAssertNumber.bytecode,
          provider,
          data: [11],
        });

        await fundPredicate(fundingWallet, predicateAssertNumber, 500_000, UTXOS_AMOUNT);

        const predicateAssertValue = new Predicate<[boolean]>({
          abi: PredicateAssertValue.abi,
          bytecode: PredicateAssertValue.bytecode,
          provider,
          data: [true],
        });

        await fundPredicate(fundingWallet, predicateAssertValue, 500_000, UTXOS_AMOUNT);

        // predicate resources fetched as non predicate resources
        const predicateAssertNumberWrongResources = await provider.getResourcesToSpend(
          predicateAssertNumber.address,
          quantity
        );

        // predicate resources fetched as predicate resources
        const predicateAssertNumberResources = await predicateAssertNumber.getResourcesToSpend(
          quantity,
          cacheResources(predicateAssertNumberWrongResources)
        );

        // predicate resources fetched as non predicate resources
        const predicateAssertValueWrongResources = await provider.getResourcesToSpend(
          predicateAssertValue.address,
          quantity
        );

        const receiver = Wallet.generate({ provider });

        transactionRequest.addCoinOutput(receiver.address, 100, provider.getBaseAssetId());

        transactionRequest.addResources([
          ...predicateAssertNumberWrongResources, // witnessIndex 0 but will generate a placeholder witness
          ...resources1, // witnessIndex 1
          ...predicateAssertValueWrongResources, // witnessIndex 2 and will generate a placeholder witness,
          ...resources2, // witnessIndex 3
          ...predicateAssertNumberResources, // witnessIndex 0 because these predicate resources were properly fetched
          ...resources3, // witnessIndex 4
        ]);

        // The request carries 5 placeholder witnesses, resources from 2 predicates were added as normal resources
        expect(transactionRequest.witnesses.length).toBe(5);

        // populating predicates inputs with predicate data and removing placeholder witness added for Predicate
        transactionRequest =
          predicateAssertNumber.populateTransactionPredicateData(transactionRequest);
        transactionRequest =
          predicateAssertValue.populateTransactionPredicateData(transactionRequest);
        transactionRequest = await provider.estimatePredicates(transactionRequest);

        transactionRequest.gasLimit = bn(250_000);
        transactionRequest.maxFee = bn(270_000);

        // The predicate resource witness placeholder was removed
        expect(transactionRequest.witnesses.length).toBe(3);

        transactionRequest =
          await wallet1.populateTransactionWitnessesSignature(transactionRequest);
        transactionRequest =
          await wallet2.populateTransactionWitnessesSignature(transactionRequest);
        transactionRequest =
          await wallet3.populateTransactionWitnessesSignature(transactionRequest);

        const tx = await provider.sendTransaction(transactionRequest);

        const { isStatusSuccess } = await tx.waitForResult();

        expect(isStatusSuccess).toBeTruthy();
      });

      it('should properly populate predicate data and remove placeholder witness [CASE 5]', async () => {
        using launched = await launchTestNode({
          walletsConfig: {
            count: 3,
          },
        });
        const {
          provider,
          wallets: [fundingWallet, wallet1, wallet2],
        } = launched;

        const quantity: CoinQuantityLike[] = [[500, provider.getBaseAssetId()]];

        let transactionRequest = new ScriptTransactionRequest({ gasLimit: 2000, maxFee: bn(0) });

        const predicateAssertNumber = new Predicate<[number]>({
          abi: PredicateAssertNumber.abi,
          bytecode: PredicateAssertNumber.bytecode,
          provider,
          data: [11],
        });

        await fundPredicate(fundingWallet, predicateAssertNumber, 500_000, UTXOS_AMOUNT);

        const predicateAssertValue = new Predicate<[boolean]>({
          abi: PredicateAssertValue.abi,
          bytecode: PredicateAssertValue.bytecode,
          provider,
          data: [true],
        });

        await fundPredicate(fundingWallet, predicateAssertValue, 500_000, UTXOS_AMOUNT);

        const resources1 = await wallet1.getResourcesToSpend(quantity);
        const resources2 = await wallet2.getResourcesToSpend(quantity);

        const predicateAssertNumberWrongResources = await provider.getResourcesToSpend(
          predicateAssertNumber.address,
          quantity
        );
        const predicateAssertNumberResources = await predicateAssertNumber.getResourcesToSpend(
          quantity,
          cacheResources(predicateAssertNumberWrongResources)
        );

        const receiver = Wallet.generate({ provider });

        transactionRequest.addCoinOutput(receiver.address, 100, provider.getBaseAssetId());

        transactionRequest.addResources([
          ...resources1, // witnessIndex 0
          ...resources2, // witnessIndex 1
          ...predicateAssertNumberResources, // witnessIndex 0 and no placeholder witness
          ...predicateAssertNumberWrongResources, // witnessIndex 0 and no placeholder wit since it has resources from same owner
        ]);

        // The request carries 2 placeholder witnesses, none was added for the predicate resources
        expect(transactionRequest.witnesses.length).toBe(2);

        // populating predicates inputs with predicate data
        transactionRequest =
          predicateAssertNumber.populateTransactionPredicateData(transactionRequest);
        transactionRequest = await provider.estimatePredicates(transactionRequest);

        const { gasLimit, maxFee } = await provider.estimateTxGasAndFee({ transactionRequest });

        transactionRequest.gasLimit = gasLimit;
        transactionRequest.maxFee = maxFee;

        // The witnesses amount should remain the same
        expect(transactionRequest.witnesses.length).toBe(2);

        transactionRequest =
          await wallet1.populateTransactionWitnessesSignature(transactionRequest);
        transactionRequest =
          await wallet2.populateTransactionWitnessesSignature(transactionRequest);

        const tx = await provider.sendTransaction(transactionRequest);

        const { isStatusSuccess } = await tx.waitForResult();

        expect(isStatusSuccess).toBeTruthy();
      });

      it('should properly populate predicate data and remove placeholder witness [CASE 6]', async () => {
        using launched = await launchTestNode({
          walletsConfig: {
            count: 4,
          },
        });
        const {
          provider,
          wallets: [fundingWallet, wallet1, wallet2, wallet3],
        } = launched;

        const quantity: CoinQuantityLike[] = [[500, provider.getBaseAssetId()]];

        let transactionRequest = new ScriptTransactionRequest({ gasLimit: 2000, maxFee: bn(0) });

        const resources1 = await wallet1.getResourcesToSpend(quantity);
        const resources2 = await wallet2.getResourcesToSpend(quantity);
        const resources3 = await wallet3.getResourcesToSpend(quantity);

        const predicateAssertNumber = new Predicate<[number]>({
          abi: PredicateAssertNumber.abi,
          bytecode: PredicateAssertNumber.bytecode,
          provider,
          data: [11],
        });

        await fundPredicate(fundingWallet, predicateAssertNumber, 500_000, UTXOS_AMOUNT);

        const predicateAssertNumberWrongResources = await provider.getResourcesToSpend(
          predicateAssertNumber.address,
          quantity
        );
        const predicateAssertNumberResources = await predicateAssertNumber.getResourcesToSpend(
          quantity,
          cacheResources(predicateAssertNumberWrongResources)
        );

        const predicateAssertValue = new Predicate<[boolean]>({
          abi: PredicateAssertValue.abi,
          bytecode: PredicateAssertValue.bytecode,
          provider,
          data: [true],
        });

        await fundPredicate(fundingWallet, predicateAssertValue, 500_000, UTXOS_AMOUNT);

        const predicateAssertValueWrongResources = await provider.getResourcesToSpend(
          predicateAssertValue.address,
          quantity
        );

        const receiver = Wallet.generate({ provider });

        transactionRequest.addCoinOutput(receiver.address, 100, provider.getBaseAssetId());

        transactionRequest.addResources([
          ...resources1, // witnessIndex 0
          ...resources2, // witnessIndex 1
          ...predicateAssertNumberResources, // witnessIndex 0 and no placeholder witness
          ...predicateAssertValueWrongResources, // witnessIndex 2 and will add a placeholder witness
          ...predicateAssertNumberWrongResources, // witnessIndex 0 because resources from same owner were already added
          ...resources3, // witnessIndex 3
        ]);

        // The request carries 4 placeholder witnesses, one was added for the predicateAssertValue wrong resources
        expect(transactionRequest.witnesses.length).toBe(4);

        // populating predicates inputs with predicate data
        transactionRequest =
          predicateAssertNumber.populateTransactionPredicateData(transactionRequest);
        transactionRequest =
          predicateAssertValue.populateTransactionPredicateData(transactionRequest);

        transactionRequest = await provider.estimatePredicates(transactionRequest);

        const { gasLimit, maxFee } = await provider.estimateTxGasAndFee({ transactionRequest });

        transactionRequest.gasLimit = gasLimit;
        transactionRequest.maxFee = maxFee;

        // The witnesses amount should be update to 2
        expect(transactionRequest.witnesses.length).toBe(3);

        transactionRequest =
          await wallet1.populateTransactionWitnessesSignature(transactionRequest);
        transactionRequest =
          await wallet2.populateTransactionWitnessesSignature(transactionRequest);
        transactionRequest =
          await wallet3.populateTransactionWitnessesSignature(transactionRequest);

        const tx = await provider.sendTransaction(transactionRequest);

        const { isStatusSuccess } = await tx.waitForResult();

        expect(isStatusSuccess).toBeTruthy();
      });
    });
  },
  { timeout: 100000 }
);
