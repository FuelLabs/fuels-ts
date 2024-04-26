import type { GqlDryRunFailureStatus } from '@fuel-ts/account/dist/providers/__generated__/operations';
import { generateTestWallet } from '@fuel-ts/account/test-utils';
import type {
  CallResult,
  EstimateTxDependenciesReturns,
  TransactionResultReceipt,
  WalletUnlocked,
} from 'fuels';
import { ContractFactory, FUEL_NETWORK_URL, Provider, Wallet, bn } from 'fuels';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';

/**
 * @group node
 */
describe('dry-run-multiple-txs', () => {
  const { abiContents, binHexlified } = getFuelGaugeForcProject(
    FuelGaugeProjectsEnum.TOKEN_CONTRACT
  );
  const { abiContents: abiRevert, binHexlified: binRevert } = getFuelGaugeForcProject(
    FuelGaugeProjectsEnum.REVERT_ERROR
  );
  const { abiContents: abiMultiToken, binHexlified: binMultiToken } = getFuelGaugeForcProject(
    FuelGaugeProjectsEnum.MULTI_TOKEN_CONTRACT
  );
  const { abiContents: abiLog, binHexlified: binLog } = getFuelGaugeForcProject(
    FuelGaugeProjectsEnum.ADVANCED_LOGGING
  );
  const { abiContents: abiLogOther, binHexlified: binLogOther } = getFuelGaugeForcProject(
    FuelGaugeProjectsEnum.ADVANCED_LOGGING_OTHER_CONTRACT
  );

  let provider: Provider;
  let wallet: WalletUnlocked;
  let baseAssetId: string;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    baseAssetId = provider.getBaseAssetId();
    wallet = await generateTestWallet(provider, [[1_000_000, baseAssetId]]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const deployContracts = async () => {
    const revertFactory = new ContractFactory(binRevert, abiRevert, wallet);

    const revertContract = await revertFactory.deployContract({
      maxFee: 15000,
    });

    const multiTokenFactory = new ContractFactory(binMultiToken, abiMultiToken, wallet);

    const multiTokenContract = await multiTokenFactory.deployContract({
      maxFee: 15000,
    });

    const logFactory = new ContractFactory(binLog, abiLog, wallet);

    const logContract = await logFactory.deployContract({
      maxFee: 15000,
    });
    const logOtherFactory = new ContractFactory(binLogOther, abiLogOther, wallet);

    const logOtherContract = await logOtherFactory.deployContract({
      maxFee: 15000,
    });

    return { revertContract, multiTokenContract, logContract, logOtherContract };
  };

  it('should properly dry-run multiple TXs requests', async () => {
    const revertFactory = new ContractFactory(binRevert, abiRevert, wallet);

    const revertContract = await revertFactory.deployContract({
      maxFee: 15000,
    });

    const resources = await wallet.getResourcesToSpend([[500_000, baseAssetId]]);

    const request1 = await revertContract.functions
      .validate_inputs(10, 0)
      .txParams({
        gasLimit: 5000,
        maxFee: 1126,
      })
      .getTransactionRequest();

    const request2 = await revertContract.functions
      .validate_inputs(0, 1)
      .txParams({
        gasLimit: 5000,
        maxFee: 1126,
      })
      .getTransactionRequest();

    const request3 = await revertContract.functions
      .validate_inputs(0, 100)
      .txParams({
        gasLimit: 5000,
        maxFee: 1126,
      })
      .getTransactionRequest();

    request1.addResources(resources);
    request2.addResources(resources);
    request3.addResources(resources);

    request1.maxFee = bn(1380);
    request1.gasLimit = bn(26775);
    request2.maxFee = bn(1380);
    request2.gasLimit = bn(26825);
    request3.maxFee = bn(1380);
    request3.gasLimit = bn(26825);

    const dryRunSpy = vi.spyOn(provider.operations, 'dryRun');

    const estimatedRequests = await provider.dryRunMultipleTransactions(
      [request1, request2, request3],
      { estimateTxDependencies: false }
    );

    expect(dryRunSpy).toHaveBeenCalledTimes(1);

    expect(estimatedRequests[0]).toStrictEqual<CallResult>({
      receipts: expect.any(Array<TransactionResultReceipt>),
      dryrunStatus: {
        reason: expect.any(String),
        programState: {
          data: expect.any(String),
          returnType: 'REVERT',
        },
      } as GqlDryRunFailureStatus,
    });

    expect(estimatedRequests[1]).toStrictEqual<CallResult>({
      receipts: expect.any(Array<TransactionResultReceipt>),
      dryrunStatus: {
        reason: expect.any(String),
        programState: {
          data: expect.any(String),
          returnType: 'REVERT',
        },
      } as GqlDryRunFailureStatus,
    });

    expect(estimatedRequests[2]).toStrictEqual<CallResult>({
      receipts: expect.any(Array<TransactionResultReceipt>),
      dryrunStatus: {
        reason: expect.any(String),
        programState: {
          data: expect.any(String),
          returnType: 'REVERT',
        },
      } as GqlDryRunFailureStatus,
    });
  });

  it('should properly estimate multiple TXs requests', async () => {
    // preparing test data
    const { revertContract, multiTokenContract, logContract, logOtherContract } =
      await deployContracts();

    // subId defined on multi-token contract
    const subId = '0x4a778acfad1abc155a009dc976d2cf0db6197d3d360194d74b1fb92b96986b00';
    const resources = await wallet.getResourcesToSpend([[500_000, baseAssetId]]);

    // creating receives to be used by the request 2 and 3
    const addresses = [
      { bits: Wallet.generate({ provider }).address.toB256() },
      { bits: Wallet.generate({ provider }).address.toB256() },
      { bits: Wallet.generate({ provider }).address.toB256() },
    ];

    // request 1
    const factory = new ContractFactory(binHexlified, abiContents, wallet);
    const { transactionRequest: request1 } = factory.createTransactionRequest({
      maxFee: 15000,
    });

    // request 2
    const request2 = await multiTokenContract.functions
      .mint_to_addresses(addresses, subId, 1000)
      .txParams({
        gasLimit: 60000,
        maxFee: 1862,
        variableOutputs: 0,
      })
      .getTransactionRequest();

    // request 3
    const request3 = await multiTokenContract.functions
      .mint_to_addresses(addresses, subId, 2000)
      .txParams({
        gasLimit: 60000,
        maxFee: 1862,
        variableOutputs: 1,
      })
      .getTransactionRequest();

    // request 4
    const request4 = await revertContract.functions
      .failed_transfer_revert()
      .txParams({
        gasLimit: 60000,
        maxFee: 1862,
        variableOutputs: 1,
      })
      .getTransactionRequest();

    // request 5
    const request5 = await logContract.functions
      .test_log_from_other_contract(10, logOtherContract.id.toB256())
      .txParams({
        gasLimit: 60000,
        maxFee: 1862,
      })
      .getTransactionRequest();

    /**
     * Adding same resources to all request (it only works because we estimate
     * requests using the dry run flag utxo_validation: false)
     */

    const cost1 = await wallet.provider.getTransactionCost(request2);
    const cost2 = await wallet.provider.getTransactionCost(request3);
    const cost3 = await wallet.provider.getTransactionCost(request4);
    const cost4 = await wallet.provider.getTransactionCost(request5);

    request2.gasLimit = cost1.gasUsed;
    request2.maxFee = cost1.maxFee;

    request3.gasLimit = cost2.gasUsed;
    request3.maxFee = cost2.maxFee;

    request4.maxFee = cost3.maxFee;
    request4.gasLimit = cost3.gasUsed;

    request5.maxFee = cost4.maxFee;
    request5.gasLimit = cost4.gasUsed;

    request1.addResources(resources);
    request2.addResources(resources);
    request3.addResources(resources);
    request4.addResources(resources);
    request5.addResources(resources);
    const dryRunSpy = vi.spyOn(provider.operations, 'dryRun');

    const estimatedRequests = await provider.dryRunMultipleTransactions(
      [request1, request2, request3, request4, request5],
      { estimateTxDependencies: true }
    );

    expect(dryRunSpy).toHaveBeenCalledTimes(4);
    expect(estimatedRequests.length).toBe(5);

    // request 1 for create transaction request, we do not dry run
    expect(estimatedRequests[0]).toStrictEqual<EstimateTxDependenciesReturns>({
      receipts: [],
      missingContractIds: [],
      outputVariables: 0,
      dryrunStatus: undefined,
    });

    // request 2 we dry run it 4 times to add the 3 output variables
    expect(estimatedRequests[1]).toStrictEqual<EstimateTxDependenciesReturns>({
      receipts: expect.any(Array<TransactionResultReceipt>),
      missingContractIds: [],
      outputVariables: 3,
      dryrunStatus: { programState: expect.any(Object) },
    });

    // request 3 we dry run it 3 times to add the 2 output variables (1 was already present)
    expect(estimatedRequests[2]).toStrictEqual<EstimateTxDependenciesReturns>({
      receipts: expect.any(Array<TransactionResultReceipt>),
      missingContractIds: [],
      outputVariables: 2,
      dryrunStatus: { programState: expect.any(Object) },
    });

    // request 4 we dry run it 1 time because it has reveted
    expect(estimatedRequests[3]).toStrictEqual<EstimateTxDependenciesReturns>({
      receipts: expect.any(Array<TransactionResultReceipt>),
      missingContractIds: [],
      outputVariables: 0,
      dryrunStatus: { reason: 'TransferZeroCoins', programState: expect.any(Object) },
    });

    // request 5 we dry run it 2 times because to add the missing output contract
    expect(estimatedRequests[4]).toStrictEqual<EstimateTxDependenciesReturns>({
      receipts: expect.any(Array<TransactionResultReceipt>),
      missingContractIds: [logOtherContract.id.toB256()],
      outputVariables: 0,
      dryrunStatus: { programState: expect.any(Object) },
    });
  });
});
