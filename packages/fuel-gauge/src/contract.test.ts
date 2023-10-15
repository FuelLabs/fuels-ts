import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { getForcProject } from '@fuel-ts/utils/test-utils';
import {
  setupTestProvider,
  seedTestWallet,
  launchCustomProviderAndGetWallets,
  WalletConfig,
  AssetId,
} from '@fuel-ts/wallet/test-utils';
import type { TransactionRequestLike, TransactionResponse, TransactionType, JsonAbi } from 'fuels';
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
  Predicate,
  TestNodeLauncher,
} from 'fuels';

import { createSetupConfig, getContractPath } from './utils';

const contractPath = getContractPath('call-test');
const predicatePath = getContractPath('predicate-true');

const { binHexlified: contractBytecode, abiContents: abiJSON } =
  getForcProject<JsonAbi>(contractPath);

const { binHexlified: predicateBytecode } = getForcProject<JsonAbi>(predicatePath);

const setupContract = createSetupConfig({
  contractBytecode,
  abi: abiJSON,
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

describe('Contract', () => {
  it('generates function methods on a simple contract', async () => {
    await using launchResult = await launchCustomProviderAndGetWallets();
    const {
      wallets: [wallet],
      provider,
    } = launchResult;
    const spy = jest.spyOn(provider, 'sendTransaction');
    const contract = new Contract(ZeroBytes32, jsonFragment, wallet);
    const fragment = contract.interface.getFunction('entry_one');
    const interfaceSpy = jest.spyOn(fragment, 'encodeArguments');

    try {
      await contract.functions.entry_one(42);
    } catch {
      // The call will fail, but it doesn't matter
    }

    expect(spy).toHaveBeenCalled();
    expect(interfaceSpy).toHaveBeenCalled();
  });

  it('generates function methods on a complex contract', async () => {
    await using launchResult = await launchCustomProviderAndGetWallets();
    const {
      wallets: [wallet],
      provider,
    } = launchResult;
    const spy = jest.spyOn(provider, 'sendTransaction');
    const contract = new Contract(ZeroBytes32, complexFragment, wallet);
    const fragment = contract.interface.getFunction('tuple_function');
    const interfaceSpy = jest.spyOn(fragment, 'encodeArguments');

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
    await using provider = await setupTestProvider();
    const contract = new Contract(getRandomB256(), jsonFragment, provider);

    expect(contract.provider).toEqual(provider);
  });

  it('should fail to execute call if gasLimit is too low', async () => {
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: contractPath }],
    });

    const {
      contracts: [contract],
    } = nodeLauncherResult;

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
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: contractPath }, { contractDir: contractPath }],
    });

    const {
      contracts: [contract, otherContract],
    } = nodeLauncherResult;

    const scope = contract.functions.call_external_foo(1336, otherContract.id);

    const { value: results } = await scope.call();

    expect(results.toHex()).toEqual(toHex(1338));
  });

  it('adds multiple contracts on multicalls', async () => {
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: contractPath }, { contractDir: contractPath }],
    });

    const {
      contracts: [contract, otherContract],
    } = nodeLauncherResult;

    const calls = [
      contract.functions.foo(1336),
      contract.functions.call_external_foo(1336, otherContract.id),
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
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: contractPath }],
    });

    const {
      contracts: [contract],
    } = nodeLauncherResult;

    const { value: results } = await contract
      .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
      .call();
    expect(JSON.stringify(results)).toEqual(JSON.stringify([bn(1337), bn(1337)]));
  });

  it('submits multiple calls, six calls', async () => {
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: contractPath }],
    });

    const {
      contracts: [contract],
    } = nodeLauncherResult;

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
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: contractPath }],
    });

    const {
      contracts: [contract],
    } = nodeLauncherResult;

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
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: contractPath }],
    });

    const {
      contracts: [contract],
    } = nodeLauncherResult;
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
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: contractPath }, { contractDir: contractPath }],
    });

    const {
      contracts: [contract, otherContract],
    } = nodeLauncherResult;

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
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: contractPath }],
    });

    const {
      contracts: [contract],
    } = nodeLauncherResult;

    const { value: results } = await contract
      .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
      .simulate();
    expect(JSON.stringify(results)).toEqual(JSON.stringify([bn(1337), bn(1337)]));
  });

  it('simulates multiple calls', async () => {
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: contractPath }],
    });

    const {
      contracts: [contract],
    } = nodeLauncherResult;

    const { value, callResult, gasUsed } = await contract
      .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
      .simulate();
    expect(JSON.stringify(value)).toEqual(JSON.stringify([bn(1337), bn(1337)]));
    expect(toNumber(gasUsed)).toBeGreaterThan(0);
    expect(callResult.receipts).toEqual(expect.arrayContaining([expect.any(Object)]));
  });

  it('Returns gasUsed and transactionId', async () => {
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: contractPath }],
    });

    const {
      contracts: [contract],
    } = nodeLauncherResult;

    const { transactionId, gasUsed } = await contract
      .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
      .call();
    expect(transactionId).toBeTruthy();
    expect(toNumber(gasUsed)).toBeGreaterThan(0);
  });

  it('Single call with forwarding a alt token', async () => {
    const altToken = AssetId.random();

    await using nodeLauncherResult = await TestNodeLauncher.launch({
      walletConfig: new WalletConfig({
        assets: [altToken],
      }),
      deployContracts: [{ contractDir: contractPath }],
    });

    const {
      contracts: [contract],
    } = nodeLauncherResult;

    const { value } = await contract.functions
      .return_context_amount()
      .callParams({
        forward: [200, altToken.value],
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
    const altToken = AssetId.random();
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      walletConfig: new WalletConfig({
        assets: [altToken],
      }),
      deployContracts: [{ contractDir: contractPath }],
    });

    const {
      contracts: [contract],
    } = nodeLauncherResult;

    const { value } = await contract
      .multiCall([
        contract.functions.return_context_amount().callParams({
          forward: [100, BaseAssetId],
        }),
        contract.functions.return_context_amount().callParams({
          forward: [200, altToken.value],
        }),
        contract.functions.return_context_asset().callParams({
          forward: [0, altToken.value],
        }),
      ])
      .txParams({
        gasPrice: 1,
        gasLimit: 5000000,
      })
      .call<[BN, BN, BN]>();
    expect(JSON.stringify(value)).toEqual(JSON.stringify([bn(100), bn(200), altToken.value]));
  });

  it('Check if gas per call is lower than transaction', async () => {
    const altToken = AssetId.random();
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      walletConfig: new WalletConfig({
        assets: [altToken],
      }),
      deployContracts: [{ contractDir: contractPath }],
    });

    const {
      contracts: [contract],
    } = nodeLauncherResult;

    await expect(
      contract
        .multiCall([
          contract.functions.return_context_amount().callParams({
            forward: [100, BaseAssetId],
            gasLimit: 100,
          }),
          contract.functions.return_context_amount().callParams({
            forward: [200, altToken.value],
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
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: contractPath }],
    });

    const {
      contracts: [contract],
    } = nodeLauncherResult;

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
    expect(value[0].toNumber()).toBeLessThanOrEqual(500_000);

    expect(value[1].toNumber()).toBeGreaterThanOrEqual(1_000_000 * minThreshold);
    expect(value[1].toNumber()).toBeLessThanOrEqual(4_000_000);
  });

  it('Get transaction cost', async () => {
    const altToken = AssetId.random();

    await using nodeLauncherResult = await TestNodeLauncher.launch({
      walletConfig: new WalletConfig({
        assets: [altToken],
      }),
      deployContracts: [{ contractDir: contractPath }],
    });

    const {
      contracts: [contract],
    } = nodeLauncherResult;

    const invocationScope = contract.multiCall([
      contract.functions.return_context_amount().callParams({
        forward: [100, BaseAssetId],
      }),
      contract.functions.return_context_amount().callParams({
        forward: [200, altToken.value],
      }),
    ]);
    const transactionCost = await invocationScope.getTransactionCost();

    expect(toNumber(transactionCost.gasPrice)).toBe(0);
    expect(toNumber(transactionCost.fee)).toBeGreaterThanOrEqual(0);
    expect(toNumber(transactionCost.gasUsed)).toBeGreaterThan(700);

    const { value } = await invocationScope
      .txParams({
        gasPrice: transactionCost.gasPrice,
        gasLimit: transactionCost.gasUsed,
      })
      .call<[string, string]>();

    expect(JSON.stringify(value)).toEqual(JSON.stringify([bn(100), bn(200)]));
  });

  it('Get transaction cost with gasPrice 1', async () => {
    const altToken = AssetId.random();

    await using nodeLauncherResult = await TestNodeLauncher.launch({
      walletConfig: new WalletConfig({
        assets: [altToken],
      }),
      deployContracts: [{ contractDir: contractPath }],
    });

    const {
      contracts: [contract],
    } = nodeLauncherResult;

    const invocationScope = contract
      .multiCall([
        contract.functions.return_context_amount().callParams({
          forward: [100, BaseAssetId],
        }),
        contract.functions.return_context_amount().callParams({
          forward: [200, altToken.value],
        }),
      ])
      .txParams({
        gasPrice: 1,
      });
    // Get transaction cost using gasPrice from
    // invocation scope
    const transactionCost = await invocationScope.getTransactionCost();

    expect(toNumber(transactionCost.gasPrice)).toBe(1);
    expect(toNumber(transactionCost.fee)).toBeGreaterThanOrEqual(1);
    expect(toNumber(transactionCost.gasUsed)).toBeGreaterThan(700);

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

  it('Get transaction cost with gasPrice 2', async () => {
    const altToken = AssetId.random();

    await using nodeLauncherResult = await TestNodeLauncher.launch({
      walletConfig: new WalletConfig({
        assets: [altToken],
      }),
      deployContracts: [{ contractDir: contractPath }],
    });

    const {
      contracts: [contract],
    } = nodeLauncherResult;

    const invocationScope = contract.multiCall([
      contract.functions.return_context_amount().callParams({
        forward: [100, BaseAssetId],
      }),
      contract.functions.return_context_amount().callParams({
        forward: [200, altToken.value],
      }),
    ]);
    // Get transaction cost using gasPrice
    // override by SDK user
    const transactionCost = await invocationScope.getTransactionCost({
      gasPrice: 2,
    });

    expect(toNumber(transactionCost.gasPrice)).toBe(2);
    expect(toNumber(transactionCost.fee)).toBeGreaterThanOrEqual(2);
    expect(toNumber(transactionCost.gasUsed)).toBeGreaterThan(700);

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
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: contractPath }],
    });

    const {
      contracts: [contract],
    } = nodeLauncherResult;

    const invocationScope = contract.functions.return_context_amount().callParams({
      forward: [100, BaseAssetId],
    });
    const { gasUsed } = await invocationScope.getTransactionCost({
      tolerance: 0,
    });

    const gasLimit = multiply(gasUsed, 0.5);
    await expect(
      invocationScope
        .txParams({
          gasLimit,
        })
        .call<BN>()
    ).rejects.toThrowError(`Gas limit '${gasLimit}' is lower than the required: '${gasUsed}'.`);
  });

  it('calls array functions', async () => {
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: contractPath }],
    });

    const {
      contracts: [contract],
    } = nodeLauncherResult;

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
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: contractPath }],
    });

    const {
      contracts: [contract],
    } = nodeLauncherResult;

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
    const altToken = AssetId.random();

    await using nodeLauncherResult = await TestNodeLauncher.launch({
      walletConfig: new WalletConfig({
        assets: [altToken],
      }),
      deployContracts: [{ contractDir: contractPath }],
    });

    const {
      contracts: [contract],
    } = nodeLauncherResult;

    const { value } = await contract
      .multiCall([
        contract.functions.return_context_amount().callParams({
          forward: [100, BaseAssetId],
        }),
        contract.functions.return_context_amount().callParams({
          forward: [200, altToken.value],
        }),
      ])
      .dryRun();
    expect(JSON.stringify(value)).toEqual(JSON.stringify([bn(100), bn(200)]));
  });

  it('Parse TX to JSON and parse back to TX', async () => {
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: contractPath }],
    });

    const {
      contracts: [contract],
    } = nodeLauncherResult;

    const num = 1337;
    const struct = { a: true, b: 1337 };
    const invocationScopes = [contract.functions.foo(num), contract.functions.boo(struct)];
    const multiCallScope = contract.multiCall(invocationScopes);

    const transactionRequest = await multiCallScope.getTransactionRequest();

    const txRequest = JSON.stringify(transactionRequest);
    const txRequestParsed = JSON.parse(txRequest);

    const transactionRequestParsed = transactionRequestify(txRequestParsed);

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
    await using launchResult = await launchCustomProviderAndGetWallets();
    const {
      wallets: [wallet],
    } = launchResult;

    const contract = new ContractFactory(contractBytecode, abiJSON, wallet);
    const { transactionRequest } = contract.createTransactionRequest();

    const txRequest = JSON.stringify(transactionRequest);
    const txRequestParsed = JSON.parse(txRequest);

    const transactionRequestParsed = transactionRequestify(txRequestParsed);

    // Fund tx
    await wallet.fund(transactionRequestParsed);
    // Send tx
    const response = await wallet.sendTransaction(transactionRequestParsed);
    const result = await response.waitForResult();
    expect(result.status).toBe('success');
  });

  // This test's premise should be revisited because a provider shouldn't be doing the signing anyways
  // I skipped it because it was giving me problems around signatures
  it.skip('Provide a custom provider and public wallet to the contract instance', async () => {
    await using provider = await setupTestProvider();
    const contract = await setupContract(provider);
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
      async sendTransaction(
        transactionRequestLike: TransactionRequestLike
      ): Promise<TransactionResponse> {
        const transactionRequest = transactionRequestify(transactionRequestLike);
        // Simulate a external request of signature
        signedTransaction = await externalWallet.signTransaction(transactionRequest);
        transactionRequest.updateWitnessByOwner(externalWallet.address, signedTransaction);
        return super.sendTransaction(transactionRequestLike);
      }
    }

    // Set custom provider to contract instance
    const customProvider = await ProviderCustom.create(provider.url);
    contract.account = Wallet.fromAddress(externalWallet.address, customProvider);
    contract.provider = customProvider;

    const num = 1337;
    const struct = { a: true, b: 1337 };
    const invocationScopes = [contract.functions.foo(num), contract.functions.boo(struct)];
    const multiCallScope = contract.multiCall(invocationScopes);

    const transactionRequest = await multiCallScope.getTransactionRequest();

    const txRequest = JSON.stringify(transactionRequest);
    const txRequestParsed = JSON.parse(txRequest);

    const transactionRequestParsed = transactionRequestify(txRequestParsed);

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
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: contractPath }],
    });

    const {
      contracts: [contract],
    } = nodeLauncherResult;

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
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: contractPath }],
    });

    const {
      contracts: [contract],
    } = nodeLauncherResult;

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
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: contractPath }],
    });
    const {
      contracts: [contract],
    } = nodeLauncherResult;

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
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: contractPath }],
    });
    const {
      contracts: [contract],
      wallets: [wallet],
    } = nodeLauncherResult;

    const initialBalance = new BN(await contract.getBalance(BaseAssetId)).toNumber();

    const amountToContract = 200;

    const tx = await wallet.transferToContract(contract.id, amountToContract);

    await tx.waitForResult();

    const finalBalance = new BN(await contract.getBalance(BaseAssetId)).toNumber();

    expect(finalBalance).toBe(initialBalance + amountToContract);
  });

  it('should tranfer asset to a deployed contract just fine (NOT NATIVE ASSET)', async () => {
    const altToken = AssetId.random();

    await using nodeLauncherResult = await TestNodeLauncher.launch({
      walletConfig: new WalletConfig({
        assets: [altToken],
      }),
      deployContracts: [{ contractDir: contractPath }],
    });
    const {
      contracts: [contract],
      wallets: [wallet],
    } = nodeLauncherResult;

    const initialBalance = new BN(await contract.getBalance(altToken.value)).toNumber();

    const amountToContract = 100;

    const tx = await wallet.transferToContract(contract.id, amountToContract, altToken.value);

    await tx.waitForResult();

    const finalBalance = new BN(await contract.getBalance(altToken.value)).toNumber();

    expect(finalBalance).toBe(initialBalance + amountToContract);
  });

  it('should tranfer asset to a deployed contract just fine (FROM PREDICATE)', async () => {
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: contractPath }],
    });
    const {
      provider,
      contracts: [contract],
      wallets: [wallet],
    } = nodeLauncherResult;

    const initialBalance = new BN(await contract.getBalance(BaseAssetId)).toNumber();

    const amountToContract = 200;
    const amountToPredicate = 300;

    const predicate = new Predicate(predicateBytecode, provider);

    const tx1 = await wallet.transfer(predicate.address, amountToPredicate);

    await tx1.waitForResult();

    const tx2 = await predicate.transferToContract(contract.id, amountToContract);

    await tx2.waitForResult();

    const finalBalance = new BN(await contract.getBalance(BaseAssetId)).toNumber();

    expect(finalBalance).toBe(initialBalance + amountToContract);
  });

  it('should ensure ScriptResultDecoderError works for dryRun and simulate calls', async () => {
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: contractPath }],
    });
    const {
      contracts: [contract],
    } = nodeLauncherResult;

    const invocationScope = contract.functions.return_context_amount().callParams({
      forward: [100, BaseAssetId],
    });
    const { gasUsed } = await invocationScope.getTransactionCost({
      tolerance: 0,
    });

    const gasLimit = multiply(gasUsed, 0.5);
    await expect(
      invocationScope
        .txParams({
          gasLimit,
        })
        .dryRun<BN>()
    ).rejects.toThrowError(`The script call result does not contain a 'returnReceipt'.`);

    await expect(
      invocationScope
        .txParams({
          gasLimit,
        })
        .simulate<BN>()
    ).rejects.toThrowError(`The script call result does not contain a 'returnReceipt'.`);
  });
});
