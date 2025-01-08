import { ErrorCode, FuelError } from '@fuel-ts/errors';
import {
  BN,
  getRandomB256,
  bn,
  multiply,
  toHex,
  toNumber,
  Contract,
  transactionRequestify,
  Wallet,
  ContractFactory,
  PolicyType,
  buildFunctionResult,
  ReceiptType,
} from 'fuels';
import type {
  ContractTransferParams,
  ReceiptMessageOut,
  ReceiptTransfer,
  ScriptTransactionRequest,
  TransferParams,
} from 'fuels';
import {
  expectToThrowFuelError,
  ASSET_A,
  ASSET_B,
  launchTestNode,
  TestAssetId,
} from 'fuels/test-utils';

import {
  CallTestContract,
  CallTestContractFactory,
  SmoContractFactory,
  StorageTestContract,
  StorageTestContractFactory,
  VoidFactory,
} from '../test/typegen/contracts';
import { PredicateTrue } from '../test/typegen/predicates/PredicateTrue';

import { launchTestContract } from './utils';

const contractsConfigs = [CallTestContractFactory, CallTestContractFactory];

const txPointer = '0x00000000000000000000000000000000';

const AltToken = '0x0101010101010101010101010101010101010101010101010101010101010101';

function setupTestContract() {
  return launchTestContract(CallTestContractFactory);
}

/**
 * @group node
 * @group browser
 */
describe('Contract', () => {
  it('assigns a provider if passed', async () => {
    using launched = await launchTestNode();
    const { provider } = launched;

    const contract = new Contract(getRandomB256(), CallTestContract.abi, provider);

    expect(contract.provider).toEqual(provider);
  });

  it('should executes a contract call just fine', async () => {
    using contract = await setupTestContract();

    const numberToSend = 1336;

    const { waitForResult } = await contract.functions.foo(numberToSend).call();

    const { value, transactionResult } = await waitForResult();

    expect(value.toNumber()).toEqual(numberToSend + 1);
    expect(transactionResult.isStatusSuccess).toBeTruthy();
  });

  it('should fail to execute call if gasLimit is too low', async () => {
    using contract = await setupTestContract();

    let failed;
    try {
      await contract.functions
        .foo(1336)
        .txParams({
          gasLimit: 1,
        })
        .call();
    } catch (e) {
      failed = true;
    }

    expect(failed).toEqual(true);
  });

  it('adds multiple contracts on invocation', async () => {
    using launched = await launchTestNode({
      contractsConfigs,
    });

    const {
      contracts: [contract, otherContract],
    } = launched;

    const scope = contract.functions.call_external_foo(1336, otherContract.id.toB256());
    const { waitForResult } = await scope.call();
    const { value } = await waitForResult();

    expect(value.toHex()).toEqual(toHex(1338));
  });

  it('adds multiple contracts on multicalls', async () => {
    using launched = await launchTestNode({
      contractsConfigs,
    });

    const {
      contracts: [contract, otherContract],
    } = launched;

    const calls = [
      contract.functions.foo(1336),
      contract.functions.call_external_foo(1336, otherContract.id.toB256()),
    ];

    const scope = contract.multiCall(calls).addContracts([otherContract]);

    const transactionRequest = await scope.getTransactionRequest();

    expect(transactionRequest.getContractInputs()).toEqual([
      { contractId: contract.id.toB256(), type: 1, txPointer },
      { contractId: otherContract.id.toB256(), type: 1, txPointer },
    ]);

    expect(transactionRequest.getContractOutputs()).toEqual([
      { type: 1, inputIndex: 0 },
      { type: 1, inputIndex: 1 },
    ]);

    const { waitForResult } = await scope.call();
    const { value: results } = await waitForResult();
    expect(JSON.stringify(results)).toEqual(JSON.stringify([bn(1337), bn(1338)]));
  });

  it('submits multiple calls', async () => {
    using contract = await setupTestContract();

    const { waitForResult } = await contract
      .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
      .call();

    const { value: results } = await waitForResult();

    expect(JSON.stringify(results)).toEqual(JSON.stringify([bn(1337), bn(1337)]));
  });

  it('submits multiple calls, six calls', async () => {
    using contract = await setupTestContract();

    const { waitForResult } = await contract
      .multiCall([
        contract.functions.foo(1336),
        contract.functions.foo(1336),
        contract.functions.foo(1336),
        contract.functions.foo(1336),

        contract.functions.foo(1336),
        contract.functions.foo(1336),
      ])
      .call();

    const { value: results } = await waitForResult();

    expect(JSON.stringify(results)).toEqual(
      JSON.stringify([bn(1337), bn(1337), bn(1337), bn(1337), bn(1337), bn(1337)])
    );
  });

  it('submits multiple calls, eight calls', async () => {
    using contract = await setupTestContract();

    const { waitForResult } = await contract
      .multiCall([
        contract.functions.foo(1336),
        contract.functions.foo(1336),
        contract.functions.foo(1336),
        contract.functions.foo(1336),
        contract.functions.foo(1336),
        contract.functions.foo(1336),
        contract.functions.foo(1336),
        contract.functions.foo(1336),
      ])
      .call();
    const { value: results } = await waitForResult();
    expect(JSON.stringify(results)).toEqual(
      JSON.stringify([
        bn(1337),
        bn(1337),
        bn(1337),
        bn(1337),
        bn(1337),
        bn(1337),
        bn(1337),
        bn(1337),
      ])
    );
  });

  it('should fail to execute multiple calls if gasLimit is too low', async () => {
    using contract = await setupTestContract();

    let failed;
    try {
      await contract
        .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
        .txParams({
          gasLimit: 1,
        })
        .call();
    } catch (e) {
      failed = true;
    }

    expect(failed).toEqual(true);
  });

  it('adds multiple contracts on multicalls', async () => {
    using launched = await launchTestNode({
      contractsConfigs,
    });

    const {
      contracts: [contract, otherContract],
    } = launched;

    const scope = contract.multiCall([contract.functions.foo(1336)]).addContracts([otherContract]);

    const transactionRequest = await scope.getTransactionRequest();

    expect(transactionRequest.getContractInputs()).toEqual([
      { contractId: contract.id.toB256(), type: 1, txPointer },
      { contractId: otherContract.id.toB256(), type: 1, txPointer },
    ]);

    expect(transactionRequest.getContractOutputs()).toEqual([
      { type: 1, inputIndex: 0 },
      { type: 1, inputIndex: 1 },
    ]);

    const { waitForResult } = await scope.call();
    const { value: results } = await waitForResult();
    expect(JSON.stringify(results)).toEqual(JSON.stringify([bn(1337)]));
  });

  it('dryRuns multiple calls', async () => {
    using contract = await setupTestContract();

    const { value: results } = await contract
      .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
      .dryRun();
    expect(JSON.stringify(results)).toEqual(JSON.stringify([bn(1337), bn(1337)]));
  });

  it('simulates multiple calls', async () => {
    using contract = await setupTestContract();

    const { value, callResult, gasUsed } = await contract
      .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
      .simulate();
    expect(JSON.stringify(value)).toEqual(JSON.stringify([bn(1337), bn(1337)]));
    expect(toNumber(gasUsed)).toBeGreaterThan(0);
    expect(callResult.receipts).toEqual(expect.arrayContaining([expect.any(Object)]));
  });

  it('Returns gasUsed and transactionId', async () => {
    using contract = await setupTestContract();

    const { waitForResult } = await contract
      .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
      .call();

    const { transactionId, gasUsed } = await waitForResult();
    expect(transactionId).toBeTruthy();
    expect(toNumber(gasUsed)).toBeGreaterThan(0);
  });

  it('Single call with forwarding a alt token', async () => {
    using contract = await setupTestContract();

    const { waitForResult } = await contract.functions
      .return_context_amount()
      .callParams({
        forward: [200, AltToken],
        gasLimit: 1000000,
      })
      .txParams({
        gasLimit: 3000000,
      })
      .call<BN>();

    const { value } = await waitForResult();
    expect(value.toHex()).toEqual(toHex(200));
  });

  it('MultiCall with multiple forwarding', async () => {
    using contract = await setupTestContract();

    const { waitForResult } = await contract
      .multiCall([
        contract.functions.return_context_amount().callParams({
          forward: [100, await contract.provider.getBaseAssetId()],
        }),
        contract.functions.return_context_amount().callParams({
          forward: [200, AltToken],
        }),
        contract.functions.return_context_asset().callParams({
          forward: [0, AltToken],
        }),
      ])
      .txParams({
        gasLimit: 5000000,
      })
      .call<[BN, BN, BN]>();

    const { value } = await waitForResult();

    expect(JSON.stringify(value)).toEqual(JSON.stringify([bn(100), bn(200), AltToken]));
  });

  it('Check if gas per call is lower than transaction', async () => {
    using contract = await setupTestContract();

    await expect(
      contract
        .multiCall([
          contract.functions.return_context_amount().callParams({
            forward: [100, await contract.provider.getBaseAssetId()],
            gasLimit: 100,
          }),
          contract.functions.return_context_amount().callParams({
            forward: [200, AltToken],
            gasLimit: 200,
          }),
        ])
        .txParams({
          gasLimit: 100,
        })
        .call<[BN, BN, BN]>()
    ).rejects.toThrowError(
      "Transaction's gasLimit must be equal to or greater than the combined forwarded gas of all calls."
    );
  });

  it('can forward gas to multicall calls', async () => {
    using contract = await setupTestContract();

    const { waitForResult } = await contract
      .multiCall([
        contract.functions.return_context_gas().callParams({
          // Forward only 500_000 gas
          gasLimit: 500_000,
        }),
        contract.functions.return_context_gas().callParams({
          // Forward all gas
          gasLimit: 0,
        }),
      ])
      .txParams({
        gasLimit: 4_000_000,
      })
      .call<[BN, BN]>();

    const { value } = await waitForResult();
    const minThreshold = 0.019;

    expect(value[0].toNumber()).toBeGreaterThanOrEqual(500_000 * minThreshold);
    expect(value[0].toNumber()).toBeLessThanOrEqual(3999800);

    expect(value[1].toNumber()).toBeGreaterThanOrEqual(1_000_000 * minThreshold);
    expect(value[1].toNumber()).toBeLessThanOrEqual(4_000_000);
  });

  it('Get transaction cost', async () => {
    using contract = await setupTestContract();

    const invocationScope = contract.multiCall([
      contract.functions.return_context_amount().callParams({
        forward: [100, await contract.provider.getBaseAssetId()],
      }),
      contract.functions.return_context_amount().callParams({
        forward: [200, AltToken],
      }),
    ]);
    const transactionCost = await invocationScope.getTransactionCost();

    expect(toNumber(transactionCost.minFee)).toBeGreaterThanOrEqual(0);
    expect(toNumber(transactionCost.gasUsed)).toBeGreaterThan(300);

    const { waitForResult } = await invocationScope
      .txParams({
        gasLimit: transactionCost.gasUsed,
      })
      .call<[string, string]>();

    const { value } = await waitForResult();
    expect(JSON.stringify(value)).toEqual(JSON.stringify([bn(100), bn(200)]));
  });

  it('Fail before submit if gasLimit is lower than gasUsed', async () => {
    using contract = await setupTestContract();

    const invocationScope = contract.functions.return_context_amount().callParams({
      forward: [100, await contract.provider.getBaseAssetId()],
    });
    const { gasUsed } = await invocationScope.getTransactionCost();

    const gasLimit = multiply(gasUsed, 0.5);
    await expect(
      invocationScope
        .txParams({
          gasLimit,
        })
        .call<BN>()
    ).rejects.toThrowError(new RegExp(`Gas limit '${gasLimit}' is lower than the required: `));
  });

  it('calls array functions', async () => {
    using contract = await setupTestContract();

    const call1 = await contract.functions.take_array_boolean([true, false, false]).call();
    const { value: arrayBoolean } = await call1.waitForResult();

    expect(arrayBoolean).toEqual(true);

    const call2 = await contract.functions.take_array_number([1, 2, 3]).call();
    const { value: arrayNumber } = await call2.waitForResult();

    expect(arrayNumber.toHex()).toEqual(toHex(1));

    const call3 = await contract.functions.take_array_string_shuffle(['abc', 'efg', 'hij']).call();
    const { value: arrayReturnShuffle } = await call3.waitForResult();

    expect(arrayReturnShuffle).toEqual(['hij', 'abc', 'efg']);

    const call4 = await contract.functions
      .take_array_string_return_single(['abc', 'efg', 'hij'])
      .call();

    const { value: arrayReturnSingle } = await call4.waitForResult();

    expect(arrayReturnSingle).toEqual(['abc']);

    const call5 = await contract.functions
      .take_array_string_return_single_element(['abc', 'efg', 'hij'])
      .call();

    const { value: arrayReturnSingleElement } = await call5.waitForResult();

    expect(arrayReturnSingleElement).toEqual('abc');
  });

  it('calls enum functions', async () => {
    using contract = await setupTestContract();

    const call1 = await contract.functions
      .take_b256_enum({
        Value: '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b',
      })
      .call();

    const { value: enumB256ReturnValue } = await call1.waitForResult();

    expect(enumB256ReturnValue).toEqual(
      '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );

    const call2 = await contract.functions
      .take_b256_enum({
        Data: '0x1111111111111111111111111111111111111111111111111111111111111111',
      })
      .call();

    const { value: enumB256ReturnData } = await call2.waitForResult();

    expect(enumB256ReturnData).toEqual(
      '0x1111111111111111111111111111111111111111111111111111111111111111'
    );

    const call3 = await contract.functions
      .take_bool_enum({
        Value: true,
      })
      .call();

    const { value: enumBoolReturnValue } = await call3.waitForResult();

    expect(enumBoolReturnValue).toEqual(true);

    const call4 = await contract.functions
      .take_bool_enum({
        Data: false,
      })
      .call();

    const { value: enumBoolReturnData } = await call4.waitForResult();

    expect(enumBoolReturnData).toEqual(false);

    const call5 = await contract.functions
      .take_string_enum({
        Value: 'abc',
      })
      .call();

    const { value: enumStrReturnValue } = await call5.waitForResult();

    expect(enumStrReturnValue).toEqual('abc');

    const call6 = await contract.functions
      .take_string_enum({
        Data: 'efg',
      })
      .call();

    const { value: enumStrReturnData } = await call6.waitForResult();

    expect(enumStrReturnData).toEqual('efg');
  });

  it('dryRun and get should not validate the signature', async () => {
    using contract = await setupTestContract();
    const { value } = await contract
      .multiCall([
        contract.functions.return_context_amount().callParams({
          forward: [100, await contract.provider.getBaseAssetId()],
        }),
        contract.functions.return_context_amount().callParams({
          forward: [200, AltToken],
        }),
      ])
      .txParams({ gasLimit: 10_000 })
      .dryRun();
    expect(JSON.stringify(value)).toEqual(JSON.stringify([bn(100), bn(200)]));
  });

  it('Parse TX to JSON and parse back to TX', async () => {
    using contract = await setupTestContract();

    const num = 1337;
    const struct = { a: true, b: 1337 };
    const invocationScopes = [contract.functions.foo(num), contract.functions.boo(struct)];
    const multiCallScope = contract.multiCall(invocationScopes);
    const transactionRequest = await multiCallScope.autoCost();

    const txRequest = JSON.stringify(transactionRequest);
    const txRequestParsed = JSON.parse(txRequest);

    const transactionRequestParsed = transactionRequestify(txRequestParsed);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const response = await contract.account!.sendTransaction(transactionRequestParsed);
    const {
      value: [resultA, resultB],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } = await buildFunctionResult<any>({
      funcScope: invocationScopes,
      transactionResponse: response,
      isMultiCall: true,
      program: contract,
    });

    expect(resultA.toHex()).toEqual(bn(num).add(1).toHex());
    expect(resultB.a).toEqual(!struct.a);
    expect(resultB.b.toHex()).toEqual(bn(struct.b).add(1).toHex());
  });

  it('Parse create TX to JSON and parse back to create TX', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [wallet],
    } = launched;

    const contract = new ContractFactory(
      StorageTestContractFactory.bytecode,
      StorageTestContract.abi,
      wallet
    );
    const { transactionRequest } = contract.createTransactionRequest();

    const txRequest = JSON.stringify(transactionRequest);
    const txRequestParsed = JSON.parse(txRequest);

    const transactionRequestParsed = transactionRequestify(
      txRequestParsed
    ) as ScriptTransactionRequest;

    const txCost = await wallet.getTransactionCost(transactionRequestParsed);

    transactionRequestParsed.gasLimit = txCost.gasUsed;
    transactionRequestParsed.maxFee = txCost.maxFee;

    // Fund tx
    await wallet.fund(transactionRequestParsed, txCost);

    // Send tx
    const response = await wallet.sendTransaction(transactionRequestParsed);
    const result = await response.waitForResult();
    expect(result.status).toBe('success');
  });

  it('should ensure multicall allows multiple heap types', async () => {
    using contract = await setupTestContract();

    const vector = [5, 4, 3, 2, 1];

    const { waitForResult } = await contract
      .multiCall([
        contract.functions.return_context_amount(),
        contract.functions.return_vector(vector), // returns heap type Vec
        contract.functions.return_bytes(),
      ])
      .call();

    const { value } = await waitForResult();

    expect(JSON.stringify(value)).toBe(JSON.stringify([bn(0), vector, new Uint8Array()]));
  });

  it('Read only call', async () => {
    using contract = await setupTestContract();
    const { value } = await contract.functions.echo_b256(contract.id.toB256()).simulate();
    expect(value).toEqual(contract.id.toB256());
  });

  /**
   * NOTE: The following E2E tests are related to the `Account` class method `transferToContract`.
   * A deployed contract is required for their execution, which is why they are
   * currently placed inside the `fuel-gauge` package. It might make sense
   * to move them to another test suite when addressing https://github.com/FuelLabs/fuels-ts/issues/1043.
   */
  it('should transfer asset to a deployed contract just fine (NATIVE ASSET)', async () => {
    using launched = await launchTestNode({
      contractsConfigs,
    });
    const {
      provider,
      wallets: [wallet],
      contracts: [contract],
    } = launched;

    const initialBalance = new BN(
      await contract.getBalance(await provider.getBaseAssetId())
    ).toNumber();

    const u64Amount = bn(10_000);
    const amountToContract = u64Amount;

    const tx = await wallet.transferToContract(
      contract.id,
      amountToContract,
      await provider.getBaseAssetId()
    );

    await tx.waitForResult();

    const finalBalance = new BN(
      await contract.getBalance(await provider.getBaseAssetId())
    ).toNumber();

    expect(finalBalance).toBe(initialBalance + amountToContract.toNumber());
  });

  it('should transfer asset to a deployed contract just fine (NON-NATIVE ASSET)', async () => {
    using launched = await launchTestNode({
      contractsConfigs,
    });
    const {
      provider,
      wallets: [wallet],
      contracts: [contract],
    } = launched;

    const initialBalance = new BN(
      await contract.getBalance(await provider.getBaseAssetId())
    ).toNumber();
    const amountToContract = bn(10_000);
    const assetId = TestAssetId.A.value;

    const tx = await wallet.transferToContract(contract.id, amountToContract, assetId);

    await tx.waitForResult();

    const finalBalance = new BN(await contract.getBalance(assetId)).toNumber();
    expect(finalBalance).toBe(initialBalance + amountToContract.toNumber());
  });

  it('should transferToContract with a large amount of assets', async () => {
    using launched = await launchTestNode({
      contractsConfigs,
      walletsConfig: {
        amountPerCoin: 2 ** 62,
      },
    });
    const {
      provider,
      wallets: [wallet],
      contracts: [contract],
    } = launched;

    const initialBalance = new BN(
      await contract.getBalance(await provider.getBaseAssetId())
    ).toNumber();
    const amountToContract = bn(2).pow(62); // Very big number

    const tx = await wallet.transferToContract(
      contract.id,
      amountToContract,
      await provider.getBaseAssetId()
    );

    await tx.waitForResult();

    const finalBalance = new BN(
      await contract.getBalance(await provider.getBaseAssetId())
    ).toString();
    expect(finalBalance).toBe(amountToContract.add(initialBalance).toString());
  });

  it('should batch transfer with a large amount of assets', async () => {
    using launched = await launchTestNode({
      contractsConfigs,
      walletsConfig: {
        amountPerCoin: 2 ** 62,
      },
    });
    const {
      provider,
      wallets: [wallet],
      contracts: [contract],
    } = launched;

    const baseAssetId = await provider.getBaseAssetId();
    const contractTransferParams: ContractTransferParams[] = [
      {
        contractId: contract.id,
        amount: bn(2).pow(50),
        assetId: baseAssetId,
      },
      {
        contractId: contract.id,
        amount: bn(2).pow(10),
        assetId: baseAssetId,
      },
    ];

    const tx = await wallet.batchTransferToContracts(contractTransferParams);

    const { receipts } = await tx.waitForResult();

    const transferReceipts = receipts.filter(
      ({ type }) => type === ReceiptType.Transfer
    ) as ReceiptTransfer[];

    expect(transferReceipts.length).toBe(contractTransferParams.length);

    contractTransferParams.forEach(({ amount, contractId, assetId = baseAssetId }) => {
      const foundReceipt = transferReceipts.find(
        (r) =>
          r.amount.eq(amount) &&
          r.to.toLowerCase() === contractId.toString().toLowerCase() &&
          r.assetId === assetId
      );

      expect(foundReceipt).toBeDefined();
    });
  });

  it('should transfer assets to deployed contracts just fine', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        { factory: StorageTestContractFactory },
        { factory: VoidFactory },
        { factory: SmoContractFactory },
      ],
    });
    const {
      provider,
      wallets: [wallet],
      contracts: [storageContract, voidContract, smoContract],
    } = launched;

    const baseAssetId = await provider.getBaseAssetId();
    const assetA = TestAssetId.A.value;
    const assetB = TestAssetId.B.value;

    const storageId = storageContract.id.toB256();
    const voidId = voidContract.id.toB256();
    const smoId = smoContract.id.toB256();

    const contractTransferParams: ContractTransferParams[] = [
      {
        contractId: storageId,
        amount: 999,
        assetId: baseAssetId,
      },
      {
        contractId: storageId,
        amount: 550,
        assetId: assetA,
      },
      {
        contractId: voidId,
        amount: 200,
        assetId: baseAssetId,
      },
      {
        contractId: voidId,
        amount: 133,
        assetId: assetB,
      },
      {
        contractId: smoId,
        amount: 800,
        assetId: assetA,
      },
      {
        contractId: voidId,
        amount: 166,
        assetId: assetB,
      },
      {
        contractId: storageId,
        amount: 2278,
        assetId: assetB,
      },
    ];

    const submit = await wallet.batchTransferToContracts(contractTransferParams);

    const { receipts } = await submit.waitForResult();

    const transferReceipts = receipts.filter(
      ({ type }) => type === ReceiptType.Transfer
    ) as ReceiptTransfer[];

    expect(transferReceipts.length).toBe(contractTransferParams.length);

    contractTransferParams.forEach(({ amount, contractId, assetId = baseAssetId }) => {
      const foundReceipt = transferReceipts.find(
        (r) => r.amount.eq(amount) && r.to === contractId && r.assetId === assetId
      );

      expect(foundReceipt).toBeDefined();
    });
  });

  it('should set "gasLimit" and "maxFee" when transferring amounts to contract just fine', async () => {
    using launched = await launchTestNode({
      contractsConfigs,
    });
    const {
      provider,
      wallets: [wallet],
      contracts: [contract],
    } = launched;

    const amountToContract = 5_000;

    const gasLimit = 80_000;
    const maxFee = 70_000;

    const tx = await wallet.transferToContract(
      contract.id,
      amountToContract,
      await provider.getBaseAssetId(),
      {
        gasLimit,
        maxFee,
      }
    );

    const { transaction } = await tx.waitForResult();

    const { scriptGasLimit, policies } = transaction;
    const maxFeePolicy = policies?.find((policy) => policy.type === PolicyType.MaxFee);

    expect(scriptGasLimit?.toNumber()).toBe(gasLimit);
    expect(bn(maxFeePolicy?.data).toNumber()).toBe(maxFee);
  });

  it('should ensure gas price and gas limit are validated when transfering to contract', async () => {
    using launched = await launchTestNode({
      contractsConfigs,
    });
    const {
      wallets: [wallet],
      contracts: [contract],
    } = launched;

    const amountToContract = 100;

    await expect(async () => {
      const result = await wallet.transferToContract(
        contract.id.toB256(),
        amountToContract,
        await contract.provider.getBaseAssetId(),
        {
          gasLimit: 1,
        }
      );
      await result.wait();
    }).rejects.toThrowError(/Gas limit '1' is lower than the required: ./);
  });

  it('should tranfer asset to a deployed contract just fine (NOT NATIVE ASSET)', async () => {
    const asset = '0x0101010101010101010101010101010101010101010101010101010101010101';

    using launched = await launchTestNode({
      contractsConfigs,
    });
    const {
      wallets: [wallet],
      contracts: [contract],
    } = launched;

    const initialBalance = new BN(await contract.getBalance(asset)).toNumber();

    const amountToContract = 100;

    const tx = await wallet.transferToContract(contract.id.toB256(), amountToContract, asset);

    await tx.waitForResult();

    const finalBalance = new BN(await contract.getBalance(asset)).toNumber();

    expect(finalBalance).toBe(initialBalance + amountToContract);
  });

  it('should tranfer asset to a deployed contract just fine (FROM PREDICATE)', async () => {
    using launched = await launchTestNode({
      contractsConfigs,
    });
    const {
      provider,
      wallets: [wallet],
      contracts: [contract],
    } = launched;

    const initialBalance = new BN(
      await contract.getBalance(await contract.provider.getBaseAssetId())
    ).toNumber();

    const amountToContract = 200;
    const amountToPredicate = 500_000;

    const predicate = new PredicateTrue({ provider });

    const tx1 = await wallet.transfer(
      predicate.address,
      amountToPredicate,
      await provider.getBaseAssetId()
    );

    await tx1.waitForResult();

    const tx2 = await predicate.transferToContract(
      contract.id,
      amountToContract,
      await provider.getBaseAssetId()
    );

    await tx2.waitForResult();

    const finalBalance = new BN(
      await contract.getBalance(await provider.getBaseAssetId())
    ).toNumber();

    expect(finalBalance).toBe(initialBalance + amountToContract);
  });

  it('should ensure TX revert error can be extracted for dryRun and simulate calls', async () => {
    using contract = await setupTestContract();
    const scope = contract.functions.assert_u8(10, 11);

    await expect(scope.dryRun()).rejects.toThrowError(
      `The transaction reverted because an "assert" statement failed to evaluate to true.`
    );

    await expect(scope.simulate<BN>()).rejects.toThrowError(
      `The transaction reverted because an "assert" statement failed to evaluate to true.`
    );
  });

  it('should ensure assets can be transfered to wallets (SINGLE TRANSFER)', async () => {
    using contract = await setupTestContract();
    const { provider } = contract;

    const receiver = Wallet.generate({ provider });
    const amountToTransfer = 300;

    const call = await contract.functions
      .sum(40, 50)
      .addTransfer({
        destination: receiver.address,
        amount: amountToTransfer,
        assetId: await provider.getBaseAssetId(),
      })
      .call();

    await call.waitForResult();

    const finalBalance = await receiver.getBalance();

    expect(finalBalance.toNumber()).toBe(amountToTransfer);
  });

  it('should ensure assets can be transfered to wallets (MULTI TRANSFER)', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [wallet],
    } = launched;

    const factory = new ContractFactory(
      CallTestContractFactory.bytecode,
      CallTestContract.abi,
      wallet
    );

    const { waitForResult } = await factory.deploy();
    const { contract } = await waitForResult();

    const receiver1 = Wallet.generate({ provider });
    const receiver2 = Wallet.generate({ provider });
    const receiver3 = Wallet.generate({ provider });

    const amountToTransfer1 = 989;
    const amountToTransfer2 = 699;
    const amountToTransfer3 = 122;

    const transferParams: TransferParams[] = [
      {
        destination: receiver1.address,
        amount: amountToTransfer1,
        assetId: await provider.getBaseAssetId(),
      },
      { destination: receiver2.address, amount: amountToTransfer2, assetId: ASSET_A },
      { destination: receiver3.address, amount: amountToTransfer3, assetId: ASSET_B },
    ];

    const call = await contract.functions.sum(40, 50).addBatchTransfer(transferParams).call();
    await call.waitForResult();

    const finalBalance1 = await receiver1.getBalance(await provider.getBaseAssetId());
    const finalBalance2 = await receiver2.getBalance(ASSET_A);
    const finalBalance3 = await receiver3.getBalance(ASSET_B);

    expect(finalBalance1.toNumber()).toBe(amountToTransfer1);
    expect(finalBalance2.toNumber()).toBe(amountToTransfer2);
    expect(finalBalance3.toNumber()).toBe(amountToTransfer3);
  });

  it('should throw when trying to transfer a zero or negative amount to a contract', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [wallet],
    } = launched;

    const factory = new ContractFactory(
      CallTestContractFactory.bytecode,
      CallTestContract.abi,
      wallet
    );

    const { waitForResult } = await factory.deploy();

    const { contract } = await waitForResult();

    await expectToThrowFuelError(
      async () => {
        await wallet.transferToContract(contract.id, 0, await provider.getBaseAssetId());
      },
      new FuelError(ErrorCode.INVALID_TRANSFER_AMOUNT, 'Transfer amount must be a positive number.')
    );

    await expectToThrowFuelError(
      async () => {
        await wallet.transferToContract(contract.id, -1, await provider.getBaseAssetId());
      },
      new FuelError(ErrorCode.INVALID_TRANSFER_AMOUNT, 'Transfer amount must be a positive number.')
    );
  });

  it('should throw when using "simulate" with an unfunded wallet', async () => {
    using contract = await setupTestContract();

    contract.account = Wallet.generate({ provider: contract.provider });

    await expectToThrowFuelError(
      async () =>
        contract.functions
          .return_context_amount()
          .callParams({
            forward: [100, await contract.provider.getBaseAssetId()],
          })
          .simulate(),
      new FuelError(
        ErrorCode.NOT_ENOUGH_FUNDS,
        `The account(s) sending the transaction don't have enough funds to cover the transaction.`
      )
    );
  });

  it('should throw when using "simulate" without a wallet', async () => {
    using contract = await setupTestContract();

    contract.account = null;
    await expect(
      contract.functions
        .return_context_amount()
        .callParams({
          forward: [100, await contract.provider.getBaseAssetId()],
        })
        .simulate()
    ).rejects.toThrowError('Wallet is required!');
  });

  it('should throw when using "simulate" with a locked wallet', async () => {
    using contract = await setupTestContract();

    contract.account = Wallet.fromAddress(getRandomB256());

    await expect(
      contract.functions
        .return_context_amount()
        .callParams({
          forward: [100, await contract.provider.getBaseAssetId()],
        })
        .simulate()
    ).rejects.toThrowError('An unlocked wallet is required to simulate a contract call.');
  });

  it('should use "dryRun" with an unfunded wallet just fine', async () => {
    using contract = await setupTestContract();

    contract.account = Wallet.generate({ provider: contract.provider });

    await expect(
      contract.functions
        .return_context_amount()
        .callParams({
          forward: [100, await contract.provider.getBaseAssetId()],
        })
        .dryRun()
    ).resolves.not.toThrow();
  });

  it('should ensure "get" does not spend any funds', async () => {
    using contract = await setupTestContract();

    const balance = await contract.account?.getBalance();

    expect(balance?.toNumber()).toBeGreaterThan(0);

    const { value } = await contract.functions.sum(10, 5).get();

    const lateBalance = await contract.account?.getBalance();

    expect(value.toNumber()).toBe(15);
    expect(balance?.toNumber()).toBe(lateBalance?.toNumber());
  });

  it('should ensure "get" can be used to execute a contract call without a wallet', async () => {
    using contract = await setupTestContract();

    // contract with no account set
    const contractToCall = new Contract(contract.id, contract.interface, contract.provider);

    const { value } = await contractToCall.functions.sum(10, 5).get();

    expect(contractToCall.account).toBeNull();
    expect(value.toNumber()).toBe(15);
  });

  it('should ensure "get" can be used to execute a contract call with an unfunded wallet', async () => {
    using contract = await setupTestContract();

    const unfundedWallet = Wallet.generate({ provider: contract.provider });

    contract.account = unfundedWallet;

    const balance = await contract.account.getBalance();
    expect(balance.toNumber()).toBe(0);

    const { value } = await contract.functions.sum(10, 20).get();

    expect(contract.account).toBeDefined();
    expect(value.toNumber()).toBe(30);
  });

  it('should ensure "get" does not modify the blockchain state', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [wallet],
    } = launched;

    const factory = new ContractFactory(
      StorageTestContractFactory.bytecode,
      StorageTestContract.abi,
      wallet
    );

    const { waitForResult } = await factory.deploy();
    const { contract: storageContract } = await waitForResult();

    const initialCounterValue = 20;

    // Using get for a write method won't work
    await storageContract.functions.initialize_counter(initialCounterValue).get();

    // Counter was not initialized since get only dry-runs a TX
    let { value } = await storageContract.functions.counter().get();

    expect(value.toNumber()).toBe(0);

    // Actually changing the contract state
    const call = await storageContract.functions.initialize_counter(initialCounterValue).call();
    await call.waitForResult();

    // Validating that the contract state was modified
    ({ value } = await storageContract.functions.counter().get());

    expect(value.toNumber()).toBe(initialCounterValue);
  });

  it('should ensure "maxFee" and "gasLimit" can be set for a contract call', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: StorageTestContractFactory,
        },
      ],
    });
    const {
      contracts: [storageContract],
    } = launched;

    const gasLimit = 200_000;
    const maxFee = 100_000;

    const { waitForResult } = await storageContract.functions
      .counter()
      .txParams({
        gasLimit,
        maxFee,
      })
      .call();

    const {
      transactionResult: { transaction },
    } = await waitForResult();

    const maxFeePolicy = transaction.policies?.find((policy) => policy.type === PolicyType.MaxFee);
    const scriptGasLimit = transaction.scriptGasLimit;

    expect(scriptGasLimit?.toNumber()).toBe(gasLimit);
    expect(bn(maxFeePolicy?.data).toNumber()).toBe(maxFee);
  });

  it('should ensure "maxFee" and "gasLimit" can be set on a multicall', async () => {
    using contract = await setupTestContract();

    const gasLimit = 500_000;
    const maxFee = 250_000;

    const { waitForResult } = await contract
      .multiCall([
        contract.functions.foo(1336),
        contract.functions.foo(1336),
        contract.functions.foo(1336),
        contract.functions.foo(1336),
        contract.functions.foo(1336),
        contract.functions.foo(1336),
        contract.functions.foo(1336),
        contract.functions.foo(1336),
      ])
      .txParams({ gasLimit, maxFee })
      .call();

    const {
      transactionResult: { transaction },
    } = await waitForResult();

    const { scriptGasLimit, policies } = transaction;

    const maxFeePolicy = policies?.find((policy) => policy.type === PolicyType.MaxFee);

    expect(scriptGasLimit?.toNumber()).toBe(gasLimit);
    expect(bn(maxFeePolicy?.data).toNumber()).toBe(maxFee);
  });

  it('can call SMO contract', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: SmoContractFactory,
        },
      ],
    });

    const {
      provider,
      wallets: [recipient],
      contracts: [contract],
    } = launched;

    const data = [1, 2, 3, 4, 5, 6, 7, 8];
    const baseAssetId = await provider.getBaseAssetId();

    const { waitForResult } = await contract
      .multiCall([
        contract.functions
          .send_typed_message_u8(recipient.address.toB256(), 10, 1)
          .callParams({ forward: [1, baseAssetId] }),
        contract.functions
          .send_typed_message_bool(recipient.address.toB256(), true, 1)
          .callParams({ forward: [1, baseAssetId] }),
        contract.functions
          .send_typed_message_bytes(recipient.address.toB256(), data, 1)
          .callParams({ forward: [1, baseAssetId] }),
      ])
      .call();

    const {
      transactionResult: { receipts },
    } = await waitForResult();

    const messageOutReceipts = receipts.filter(
      ({ type }) => ReceiptType.MessageOut === type
    ) as ReceiptMessageOut[];

    expect(messageOutReceipts.length).toBe(3);

    messageOutReceipts.forEach((receipt) => {
      expect(receipt.recipient).toBe(recipient.address.toB256());
    });
  });
});
