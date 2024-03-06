import { generateTestWallet, seedTestWallet } from '@fuel-ts/account/test-utils';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { ASSET_A, ASSET_B } from '@fuel-ts/utils/test-utils';
import type {
  TransactionRequestLike,
  TransactionResponse,
  TransactionType,
  JsonAbi,
  ScriptTransactionRequest,
  ReceiptScriptResult,
} from 'fuels';
import {
  BN,
  getRandomB256,
  bn,
  multiply,
  toHex,
  toNumber,
  Provider,
  Contract,
  transactionRequestify,
  FunctionInvocationResult,
  Wallet,
  ContractFactory,
  ZeroBytes32,
  BaseAssetId,
  FUEL_NETWORK_URL,
  Predicate,
  ReceiptType,
} from 'fuels';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';

import { createSetupConfig } from './utils';

const { binHexlified: predicateBytecode } = getFuelGaugeForcProject(
  FuelGaugeProjectsEnum.PREDICATE_TRUE
);

const { binHexlified: contractBytecode, abiContents: abi } = getFuelGaugeForcProject(
  FuelGaugeProjectsEnum.CALL_TEST_CONTRACT
);

const setupContract = createSetupConfig({
  contractBytecode,
  abi,
});

const jsonFragment: JsonAbi = {
  configurables: [],
  loggedTypes: [],
  types: [
    {
      typeId: 0,
      type: '()',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 1,
      type: 'u64',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 2,
      type: 'struct MyStruct',
      components: [
        {
          type: 0,
          name: 'arg_one',
          typeArguments: null,
        },
        {
          type: 1,
          name: 'arg_two',
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
  ],
  functions: [
    {
      name: 'entry_one',
      inputs: [
        {
          name: 'arg',
          type: 1,
          typeArguments: null,
        },
      ],
      output: {
        name: '',
        type: 0,
        typeArguments: null,
      },
      attributes: [],
    },
  ],
};

const complexFragment: JsonAbi = {
  configurables: [],
  loggedTypes: [],
  types: [
    {
      typeId: 0,
      type: '()',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 1,
      type: 'str[20]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 2,
      type: 'b256',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 3,
      type: '(_, _)',
      components: [
        {
          name: '__tuple_element',
          type: 1,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 2,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
  ],
  functions: [
    {
      name: 'tuple_function',
      inputs: [
        {
          name: 'person',
          type: 2,
          typeArguments: null,
        },
      ],
      output: {
        name: '',
        type: 0,
        typeArguments: null,
      },
      attributes: [],
    },
  ],
};

const txPointer = '0x00000000000000000000000000000000';

const AltToken = '0x0101010101010101010101010101010101010101010101010101010101010101';

/**
 * @group node
 */
describe('Contract', () => {
  let gasPrice: BN;
  beforeAll(async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    ({ minGasPrice: gasPrice } = provider.getGasConfig());
  });

  it('generates function methods on a simple contract', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const spy = vi.spyOn(provider, 'sendTransaction');
    const wallet = await generateTestWallet(provider, [[1_000, BaseAssetId]]);
    const contract = new Contract(ZeroBytes32, jsonFragment, wallet);
    const fragment = contract.interface.getFunction('entry_one');
    const interfaceSpy = vi.spyOn(fragment, 'encodeArguments');

    try {
      await contract.functions.entry_one(42);
    } catch {
      // The call will fail, but it doesn't matter
    }

    expect(spy).toHaveBeenCalled();
    expect(interfaceSpy).toHaveBeenCalled();
  });

  it('generates function methods on a complex contract', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const spy = vi.spyOn(provider, 'sendTransaction');
    const wallet = await generateTestWallet(provider, [[1_000, BaseAssetId]]);
    const contract = new Contract(ZeroBytes32, complexFragment, wallet);
    const fragment = contract.interface.getFunction('tuple_function');
    const interfaceSpy = vi.spyOn(fragment, 'encodeArguments');

    try {
      await contract.functions.tuple_function({
        address: '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b',
        name: 'foo',
      });
    } catch {
      // The call will fail, but it doesn't matter
    }

    expect(spy).toHaveBeenCalled();
    expect(interfaceSpy).toHaveBeenCalled();
  });

  it('assigns a provider if passed', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const contract = new Contract(getRandomB256(), jsonFragment, provider);

    expect(contract.provider).toEqual(provider);
  });

  it('should fail to execute call if gasLimit is too low', async () => {
    const contract = await setupContract();

    let failed;
    try {
      await contract.functions
        .foo(1336)
        .txParams({
          gasPrice,
          gasLimit: 1,
        })
        .call();
    } catch (e) {
      failed = true;
    }

    expect(failed).toEqual(true);
  });

  it('adds multiple contracts on invocation', async () => {
    const contract = await setupContract();
    const otherContract = await setupContract({
      cache: false,
    });

    const scope = contract.functions.call_external_foo(1336, otherContract.id.toB256());

    const { value: results } = await scope.call();

    expect(results.toHex()).toEqual(toHex(1338));
  });

  it('adds multiple contracts on multicalls', async () => {
    const contract = await setupContract();
    const otherContract = await setupContract({
      cache: false,
    });
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

    const { value: results } = await scope.call();
    expect(JSON.stringify(results)).toEqual(JSON.stringify([bn(1337), bn(1338)]));
  });

  it('submits multiple calls', async () => {
    const contract = await setupContract();
    const { value: results } = await contract
      .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
      .call();
    expect(JSON.stringify(results)).toEqual(JSON.stringify([bn(1337), bn(1337)]));
  });

  it('submits multiple calls, six calls', async () => {
    const contract = await setupContract();

    const { value: results } = await contract
      .multiCall([
        contract.functions.foo(1336),
        contract.functions.foo(1336),
        contract.functions.foo(1336),
        contract.functions.foo(1336),

        contract.functions.foo(1336),
        contract.functions.foo(1336),
      ])
      .call();
    expect(JSON.stringify(results)).toEqual(
      JSON.stringify([bn(1337), bn(1337), bn(1337), bn(1337), bn(1337), bn(1337)])
    );
  });

  it('submits multiple calls, eight calls', async () => {
    const contract = await setupContract();

    const { value: results } = await contract
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
    const contract = await setupContract();

    let failed;
    try {
      await contract
        .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
        .txParams({
          gasLimit: 1,
          gasPrice,
        })
        .call();
    } catch (e) {
      failed = true;
    }

    expect(failed).toEqual(true);
  });

  it('adds multiple contracts on multicalls', async () => {
    const contract = await setupContract();
    const otherContract = await setupContract({ cache: false });

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

    const { value: results } = await scope.call();
    expect(JSON.stringify(results)).toEqual(JSON.stringify([bn(1337)]));
  });

  it('dryRuns multiple calls', async () => {
    const contract = await setupContract();

    const { value: results } = await contract
      .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
      .dryRun();
    expect(JSON.stringify(results)).toEqual(JSON.stringify([bn(1337), bn(1337)]));
  });

  it('simulates multiple calls', async () => {
    const contract = await setupContract();

    const { value, callResult, gasUsed } = await contract
      .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
      .simulate();
    expect(JSON.stringify(value)).toEqual(JSON.stringify([bn(1337), bn(1337)]));
    expect(toNumber(gasUsed)).toBeGreaterThan(0);
    expect(callResult.receipts).toEqual(expect.arrayContaining([expect.any(Object)]));
  });

  it('Returns gasUsed and transactionId', async () => {
    const contract = await setupContract();

    const { transactionId, gasUsed } = await contract
      .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
      .call();
    expect(transactionId).toBeTruthy();
    expect(toNumber(gasUsed)).toBeGreaterThan(0);
  });

  it('Single call with forwarding a alt token', async () => {
    const contract = await setupContract();
    const { value } = await contract.functions
      .return_context_amount()
      .callParams({
        forward: [200, AltToken],
        gasLimit: 1000000,
      })
      .txParams({
        gasPrice: 1,
        gasLimit: 3000000,
      })
      .call<BN>();
    expect(value.toHex()).toEqual(toHex(200));
  });

  it('MultiCall with multiple forwarding', async () => {
    const contract = await setupContract();

    const { value } = await contract
      .multiCall([
        contract.functions.return_context_amount().callParams({
          forward: [100, BaseAssetId],
        }),
        contract.functions.return_context_amount().callParams({
          forward: [200, AltToken],
        }),
        contract.functions.return_context_asset().callParams({
          forward: [0, AltToken],
        }),
      ])
      .txParams({
        gasPrice: 1,
        gasLimit: 5000000,
      })
      .call<[BN, BN, BN]>();
    expect(JSON.stringify(value)).toEqual(JSON.stringify([bn(100), bn(200), AltToken]));
  });

  it('Check if gas per call is lower than transaction', async () => {
    const contract = await setupContract();

    await expect(
      contract
        .multiCall([
          contract.functions.return_context_amount().callParams({
            forward: [100, BaseAssetId],
            gasLimit: 100,
          }),
          contract.functions.return_context_amount().callParams({
            forward: [200, AltToken],
            gasLimit: 200,
          }),
        ])
        .txParams({
          gasPrice: 1,
          gasLimit: 100,
        })
        .call<[BN, BN, BN]>()
    ).rejects.toThrowError(
      "Transaction's gasLimit must be equal to or greater than the combined forwarded gas of all calls."
    );
  });

  it('can forward gas to multicall calls', async () => {
    const contract = await setupContract();

    const { value } = await contract
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
        gasPrice: 1,
        gasLimit: 4_000_000,
      })
      .call<[BN, BN]>();

    const minThreshold = 0.019;

    expect(value[0].toNumber()).toBeGreaterThanOrEqual(500_000 * minThreshold);
    expect(value[0].toNumber()).toBeLessThanOrEqual(3999800);

    expect(value[1].toNumber()).toBeGreaterThanOrEqual(1_000_000 * minThreshold);
    expect(value[1].toNumber()).toBeLessThanOrEqual(4_000_000);
  });

  it('Get transaction cost', async () => {
    const contract = await setupContract();

    const invocationScope = contract.multiCall([
      contract.functions.return_context_amount().callParams({
        forward: [100, BaseAssetId],
      }),
      contract.functions.return_context_amount().callParams({
        forward: [200, AltToken],
      }),
    ]);
    const transactionCost = await invocationScope.getTransactionCost();

    expect(toNumber(transactionCost.gasPrice)).toBe(gasPrice.toNumber());
    expect(toNumber(transactionCost.minFee)).toBeGreaterThanOrEqual(0);
    expect(toNumber(transactionCost.gasUsed)).toBeGreaterThan(300);

    const { value } = await invocationScope
      .txParams({
        gasPrice: transactionCost.gasPrice,
        gasLimit: transactionCost.gasUsed,
      })
      .call<[string, string]>();

    expect(JSON.stringify(value)).toEqual(JSON.stringify([bn(100), bn(200)]));
  });

  it('Get transaction cost with minGasPrice ', async () => {
    const contract = await setupContract();
    const { minGasPrice } = contract.provider.getGasConfig();
    const invocationScope = contract
      .multiCall([
        contract.functions.return_context_amount().callParams({
          forward: [100, BaseAssetId],
        }),
        contract.functions.return_context_amount().callParams({
          forward: [200, AltToken],
        }),
      ])
      .txParams({
        gasPrice: minGasPrice,
      });
    // Get transaction cost using gasPrice from
    // invocation scope
    const transactionCost = await invocationScope.getTransactionCost();

    expect(toNumber(transactionCost.gasPrice)).toBe(minGasPrice.toNumber());
    expect(toNumber(transactionCost.minFee)).toBeGreaterThanOrEqual(1);
    expect(toNumber(transactionCost.gasUsed)).toBeGreaterThan(300);

    // Test that gasUsed is correctly calculated
    // and can be used as gasLimit
    const { value } = await invocationScope
      .txParams({
        gasPrice: transactionCost.gasPrice,
        gasLimit: transactionCost.gasUsed,
      })
      .call<[string, string]>();

    expect(JSON.stringify(value)).toEqual(JSON.stringify([bn(100), bn(200)]));
  });

  it('Fail before submit if gasLimit is lower than gasUsed', async () => {
    const contract = await setupContract();

    const invocationScope = contract.functions.return_context_amount().callParams({
      forward: [100, BaseAssetId],
    });
    const { gasUsed } = await invocationScope.getTransactionCost();

    const gasLimit = multiply(gasUsed, 0.5);
    await expect(
      invocationScope
        .txParams({
          gasPrice,
          gasLimit,
        })
        .call<BN>()
    ).rejects.toThrowError(new RegExp(`Gas limit '${gasLimit}' is lower than the required: `));
  });

  it('calls array functions', async () => {
    const contract = await setupContract();

    const { value: arrayBoolean } = await contract.functions
      .take_array_boolean([true, false, false])
      .call();

    expect(arrayBoolean).toEqual(true);

    const { value: arrayNumber } = await contract.functions.take_array_number([1, 2, 3]).call();

    expect(arrayNumber.toHex()).toEqual(toHex(1));

    const { value: arrayReturnShuffle } = await contract.functions
      .take_array_string_shuffle(['abc', 'efg', 'hij'])
      .call();

    expect(arrayReturnShuffle).toEqual(['hij', 'abc', 'efg']);

    const { value: arrayReturnSingle } = await contract.functions
      .take_array_string_return_single(['abc', 'efg', 'hij'])
      .call();

    expect(arrayReturnSingle).toEqual(['abc']);

    const { value: arrayReturnSingleElement } = await contract.functions
      .take_array_string_return_single_element(['abc', 'efg', 'hij'])
      .call();

    expect(arrayReturnSingleElement).toEqual('abc');
  });

  it('calls enum functions', async () => {
    const contract = await setupContract();

    const { value: enumB256ReturnValue } = await contract.functions
      .take_b256_enum({
        Value: '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b',
      })
      .call();

    expect(enumB256ReturnValue).toEqual(
      '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );

    const { value: enumB256ReturnData } = await contract.functions
      .take_b256_enum({
        Data: '0x1111111111111111111111111111111111111111111111111111111111111111',
      })
      .call();

    expect(enumB256ReturnData).toEqual(
      '0x1111111111111111111111111111111111111111111111111111111111111111'
    );

    const { value: enumBoolReturnValue } = await contract.functions
      .take_bool_enum({
        Value: true,
      })
      .call();

    expect(enumBoolReturnValue).toEqual(true);

    const { value: enumBoolReturnData } = await contract.functions
      .take_bool_enum({
        Data: false,
      })
      .call();

    expect(enumBoolReturnData).toEqual(false);

    const { value: enumStrReturnValue } = await contract.functions
      .take_string_enum({
        Value: 'abc',
      })
      .call();

    expect(enumStrReturnValue).toEqual('abc');

    const { value: enumStrReturnData } = await contract.functions
      .take_string_enum({
        Data: 'efg',
      })
      .call();

    expect(enumStrReturnData).toEqual('efg');
  });

  it('dryRun and get should not validate the signature', async () => {
    const contract = await setupContract();
    const { value } = await contract
      .multiCall([
        contract.functions.return_context_amount().callParams({
          forward: [100, BaseAssetId],
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
    const contract = await setupContract();

    const num = 1337;
    const struct = { a: true, b: 1337 };
    const invocationScopes = [contract.functions.foo(num), contract.functions.boo(struct)];
    const multiCallScope = contract.multiCall(invocationScopes).txParams({
      gasPrice,
      gasLimit: 20_000,
    });
    await multiCallScope.fundWithRequiredCoins();

    const transactionRequest = await multiCallScope.getTransactionRequest();

    const txRequest = JSON.stringify(transactionRequest);
    const txRequestParsed = JSON.parse(txRequest);

    const transactionRequestParsed = transactionRequestify(txRequestParsed);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const response = await contract.account!.sendTransaction(transactionRequestParsed);
    const {
      value: [resultA, resultB],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } = await FunctionInvocationResult.build<any>(invocationScopes, response, true, contract);

    expect(resultA.toHex()).toEqual(bn(num).add(1).toHex());
    expect(resultB.a).toEqual(!struct.a);
    expect(resultB.b.toHex()).toEqual(bn(struct.b).add(1).toHex());
  });

  it('Parse create TX to JSON and parse back to create TX', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = Wallet.generate({
      provider,
    });
    await seedTestWallet(wallet, [
      {
        amount: bn(1_000_000),
        assetId: BaseAssetId,
      },
    ]);
    const contract = new ContractFactory(contractBytecode, abi, wallet);
    const { transactionRequest } = contract.createTransactionRequest({ gasPrice });

    const txRequest = JSON.stringify(transactionRequest);
    const txRequestParsed = JSON.parse(txRequest);

    const transactionRequestParsed = transactionRequestify(txRequestParsed);

    const { requiredQuantities, maxFee } =
      await provider.getTransactionCost(transactionRequestParsed);

    // Fund tx
    await wallet.fund(transactionRequestParsed, requiredQuantities, maxFee);

    // Send tx
    const response = await wallet.sendTransaction(transactionRequestParsed);
    const result = await response.waitForResult();
    expect(result.status).toBe('success');
  });

  it('Provide a custom provider and public wallet to the contract instance', async () => {
    const contract = await setupContract();
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const externalWallet = Wallet.generate({
      provider,
    });
    await seedTestWallet(externalWallet, [
      {
        amount: bn(1_000_000),
        assetId: BaseAssetId,
      },
    ]);

    // Create a custom provider to emulate a external signer
    // like Wallet Extension or a Hardware wallet
    let signedTransaction;
    class ProviderCustom extends Provider {
      // eslint-disable-next-line @typescript-eslint/require-await
      static async connect(url: string) {
        const newProvider = new ProviderCustom(url);
        return newProvider;
      }

      async sendTransaction(
        transactionRequestLike: TransactionRequestLike
      ): Promise<TransactionResponse> {
        const transactionRequest = transactionRequestify(transactionRequestLike);
        // Simulate a external request of signature
        const hashedTransaction = transactionRequest.getTransactionId(this.getChainId());
        signedTransaction = await externalWallet.signTransaction(hashedTransaction);
        transactionRequest.updateWitnessByOwner(externalWallet.address, signedTransaction);
        return super.sendTransaction(transactionRequestLike);
      }
    }

    // Set custom provider to contract instance
    const customProvider = await ProviderCustom.connect(FUEL_NETWORK_URL);
    contract.account = Wallet.fromAddress(externalWallet.address, customProvider);
    contract.provider = customProvider;

    const num = 1337;
    const struct = { a: true, b: 1337 };
    const invocationScopes = [contract.functions.foo(num), contract.functions.boo(struct)];
    const multiCallScope = contract
      .multiCall(invocationScopes)
      .txParams({ gasPrice, gasLimit: 20_000 });

    const transactionRequest = await multiCallScope.getTransactionRequest();

    const txRequest = JSON.stringify(transactionRequest);
    const txRequestParsed = JSON.parse(txRequest);

    const transactionRequestParsed = transactionRequestify(
      txRequestParsed
    ) as ScriptTransactionRequest;

    const { gasUsed, minFee, requiredQuantities } =
      await contract.provider.getTransactionCost(transactionRequestParsed);

    transactionRequestParsed.gasLimit = gasUsed;

    await contract.account.fund(transactionRequestParsed, requiredQuantities, minFee);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const response = await contract.account!.sendTransaction(transactionRequestParsed);
    const {
      value: [resultA, resultB],
      transactionResult,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } = await FunctionInvocationResult.build<any, TransactionType.Script>(
      invocationScopes,
      response,
      true,
      contract
    );

    expect(transactionResult.transaction.witnesses.length).toEqual(1);
    expect(transactionResult.transaction.witnesses[0].data).toEqual(signedTransaction);
    expect(resultA.toHex()).toEqual(bn(num).add(1).toHex());
    expect(resultB.a).toEqual(!struct.a);
    expect(resultB.b.toHex()).toEqual(bn(struct.b).add(1).toHex());
  });

  it('should ensure multicall does not allow multiple calls that return heap types', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = Wallet.generate({
      provider,
    });
    await seedTestWallet(wallet, [
      {
        amount: bn(500_000),
        assetId: BaseAssetId,
      },
    ]);
    const factory = new ContractFactory(contractBytecode, abi, wallet);

    const contract = await factory.deployContract({ gasPrice });

    const vector = [5, 4, 3, 2, 1];

    const calls = [
      contract.functions.return_context_amount(),
      contract.functions.return_vector(vector), // returns heap type Vec
      contract.functions.return_bytes(), // returns heap type Bytes
    ];

    await expectToThrowFuelError(
      () => contract.multiCall(calls).call(),
      new FuelError(
        ErrorCode.INVALID_MULTICALL,
        'A multicall can have only one call that returns a heap type.'
      )
    );
  });

  it('should ensure multicall only allows calls that return a heap type on last position', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = Wallet.generate({
      provider,
    });
    await seedTestWallet(wallet, [
      {
        amount: bn(500_000),
        assetId: BaseAssetId,
      },
    ]);
    const factory = new ContractFactory(contractBytecode, abi, wallet);

    const contract = await factory.deployContract({ gasPrice });

    const calls = [
      contract.functions.return_bytes(), // returns heap type Bytes
      contract.functions.return_context_amount(),
    ];

    await expectToThrowFuelError(
      () => contract.multiCall(calls).call(),
      new FuelError(
        ErrorCode.INVALID_MULTICALL,
        'In a multicall, the contract call returning a heap type must be the last call.'
      )
    );
  });

  it('Read only call', async () => {
    const contract = await setupContract();
    const { value } = await contract.functions.echo_b256(contract.id.toB256()).simulate();
    expect(value).toEqual(contract.id.toB256());
  });

  /**
   * NOTE: The following E2E tests are related to the `Account` class method `transferToContract`.
   * A deployed contract is required for their execution, which is why they are
   * currently placed inside the `fuel-gauge` package. It might make sense
   * to move them to another test suite when addressing https://github.com/FuelLabs/fuels-ts/issues/1043.
   */
  it('should tranfer asset to a deployed contract just fine (NATIVE ASSET)', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = await generateTestWallet(provider, [[10_000_000_000, BaseAssetId]]);

    const contract = await setupContract();

    const initialBalance = new BN(await contract.getBalance(BaseAssetId)).toNumber();

    const u64Amount = bn(5_000_000_000);
    const amountToContract = u64Amount;

    const tx = await wallet.transferToContract(contract.id, amountToContract, BaseAssetId, {
      gasPrice,
      gasLimit: 10_000,
    });

    await tx.waitForResult();

    const finalBalance = new BN(await contract.getBalance(BaseAssetId)).toNumber();

    expect(finalBalance).toBe(initialBalance + amountToContract.toNumber());
  });

  it('should ensure gas price and gas limit are validated when transfering to contract', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = await generateTestWallet(provider, [[1000, BaseAssetId]]);

    const contract = await setupContract();

    const amountToContract = 100;

    await expect(async () => {
      const result = await wallet.transferToContract(
        contract.id.toB256(),
        amountToContract,
        BaseAssetId,
        {
          gasLimit: 1,
        }
      );
      await result.wait();
    }).rejects.toThrowError(/Gas limit '1' is lower than the required: ./);

    await expect(async () => {
      const result = await wallet.transferToContract(
        contract.id.toB256(),
        amountToContract,
        BaseAssetId,
        {
          gasPrice: 0,
        }
      );
      await result.wait();
    }).rejects.toThrowError(/Gas price '0' is lower than the required: ./);
  });

  it('should tranfer asset to a deployed contract just fine (NOT NATIVE ASSET)', async () => {
    const asset = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = await generateTestWallet(provider, [
      [500_000, BaseAssetId],
      [200, asset],
    ]);

    const contract = await setupContract();

    const initialBalance = new BN(await contract.getBalance(asset)).toNumber();

    const amountToContract = 100;

    const tx = await wallet.transferToContract(contract.id.toB256(), amountToContract, asset, {
      gasPrice,
      gasLimit: 10_000,
    });

    await tx.waitForResult();

    const finalBalance = new BN(await contract.getBalance(asset)).toNumber();

    expect(finalBalance).toBe(initialBalance + amountToContract);
  });

  it('should tranfer asset to a deployed contract just fine (FROM PREDICATE)', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = await generateTestWallet(provider, [[1_000_000, BaseAssetId]]);

    const contract = await setupContract();

    const initialBalance = new BN(await contract.getBalance(BaseAssetId)).toNumber();

    const amountToContract = 200;
    const amountToPredicate = 500_000;

    const predicate = new Predicate(predicateBytecode, provider);

    const tx1 = await wallet.transfer(predicate.address, amountToPredicate, BaseAssetId, {
      gasPrice,
      gasLimit: 10_000,
    });

    await tx1.waitForResult();

    const tx2 = await predicate.transferToContract(contract.id, amountToContract, BaseAssetId, {
      gasPrice,
      gasLimit: 10_000,
    });

    await tx2.waitForResult();

    const finalBalance = new BN(await contract.getBalance(BaseAssetId)).toNumber();

    expect(finalBalance).toBe(initialBalance + amountToContract);
  });

  it('should ensure ScriptResultDecoderError works for dryRun and simulate calls', async () => {
    const contract = await setupContract();

    const invocationScope = contract.functions.return_context_amount().callParams({
      forward: [100, BaseAssetId],
    });

    vi.spyOn(contract.provider, 'call').mockImplementation(async () =>
      Promise.resolve({ receipts: [] })
    );

    await expect(invocationScope.dryRun<BN>()).rejects.toThrowError(
      `The script call result does not contain a 'scriptResultReceipt'.`
    );

    const scriptResultReceipt: ReceiptScriptResult = {
      type: ReceiptType.ScriptResult,
      result: bn(1),
      gasUsed: bn(2),
    };

    vi.spyOn(contract.provider, 'call').mockImplementation(async () =>
      Promise.resolve({ receipts: [scriptResultReceipt] })
    );

    await expect(invocationScope.simulate<BN>()).rejects.toThrowError(
      `The script call result does not contain a 'returnReceipt'.`
    );

    vi.restoreAllMocks();
  });

  it('should ensure assets can be transfered to wallets (SINGLE TRANSFER)', async () => {
    const { binHexlified, abiContents } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.CALL_TEST_CONTRACT
    );

    const provider = await Provider.create(FUEL_NETWORK_URL);

    const wallet = await generateTestWallet(provider, [[5_000, BaseAssetId]]);

    const factory = new ContractFactory(binHexlified, abiContents, wallet);

    const contract = await factory.deployContract();

    const receiver = Wallet.generate({ provider });
    const amountToTransfer = 300;

    await contract.functions
      .sum(40, 50)
      .addTransfer(receiver.address, amountToTransfer, BaseAssetId)
      .call();

    const finalBalance = await receiver.getBalance();

    expect(finalBalance.toNumber()).toBe(amountToTransfer);
  });

  it('should ensure assets can be transfered to wallets (MULTI TRANSFER)', async () => {
    const { binHexlified, abiContents } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.CALL_TEST_CONTRACT
    );

    const provider = await Provider.create(FUEL_NETWORK_URL);

    const wallet = await generateTestWallet(provider, [
      [5_000, BaseAssetId],
      [5_000, ASSET_A],
      [5_000, ASSET_B],
    ]);

    const factory = new ContractFactory(binHexlified, abiContents, wallet);

    const contract = await factory.deployContract();

    const receiver1 = Wallet.generate({ provider });
    const receiver2 = Wallet.generate({ provider });
    const receiver3 = Wallet.generate({ provider });

    const amountToTransfer1 = 989;
    const amountToTransfer2 = 699;
    const amountToTransfer3 = 122;

    await contract.functions
      .sum(40, 50)
      .addTransfer(receiver1.address, amountToTransfer1, BaseAssetId)
      .addTransfer(receiver2.address, amountToTransfer2, ASSET_A)
      .addTransfer(receiver3.address, amountToTransfer3, ASSET_B)
      .call();

    const finalBalance1 = await receiver1.getBalance(BaseAssetId);
    const finalBalance2 = await receiver2.getBalance(ASSET_A);
    const finalBalance3 = await receiver3.getBalance(ASSET_B);

    expect(finalBalance1.toNumber()).toBe(amountToTransfer1);
    expect(finalBalance2.toNumber()).toBe(amountToTransfer2);
    expect(finalBalance3.toNumber()).toBe(amountToTransfer3);
  });

  it('should throw when trying to transfer a zero or negative amount to a contract', async () => {
    const { binHexlified, abiContents } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.CALL_TEST_CONTRACT
    );

    const provider = await Provider.create(FUEL_NETWORK_URL);

    const wallet = await generateTestWallet(provider, [
      [5_000, BaseAssetId],
      [5_000, ASSET_A],
      [5_000, ASSET_B],
    ]);

    const factory = new ContractFactory(binHexlified, abiContents, wallet);

    const contract = await factory.deployContract();

    await expectToThrowFuelError(
      async () => {
        await wallet.transferToContract(contract.id, 0, BaseAssetId);
      },
      new FuelError(ErrorCode.INVALID_TRANSFER_AMOUNT, 'Transfer amount must be a positive number.')
    );

    await expectToThrowFuelError(
      async () => {
        await wallet.transferToContract(contract.id, -1, BaseAssetId);
      },
      new FuelError(ErrorCode.INVALID_TRANSFER_AMOUNT, 'Transfer amount must be a positive number.')
    );
  });
});
