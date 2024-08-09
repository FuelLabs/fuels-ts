import type { Account, TransactionResult } from '@fuel-ts/account';
import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { BN, bn, toHex, Interface, ContractFactory, arrayify, concat } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import {
  StorageTestContractFactory,
  StorageTestContract,
  LargeContractFactory,
  ConfigurableContractFactory,
  LargeContract,
  ConfigurableContract,
} from '../test/typegen';

import { launchTestContract } from './utils';

/**
 * @group node
 * @group browser
 */
describe('Contract Factory', () => {
  it('Creates a factory from inputs that can return call results', async () => {
    using contract = await launchTestContract({
      factory: StorageTestContractFactory,
    });
    expect(contract.interface).toBeInstanceOf(Interface);

    const { waitForResult } = await contract.functions.initialize_counter(41).call();
    const { value: valueInitial } = await waitForResult();
    expect(valueInitial.toHex()).toEqual(toHex(41));

    const { waitForResult: waitForNextResult } = await contract.functions
      .increment_counter(1)
      .call();
    const { value } = await waitForNextResult();
    expect(value.toHex()).toEqual(toHex(42));

    const { value: value2 } = await contract.functions.increment_counter(1).dryRun();
    expect(value2.toHex()).toEqual(toHex(43));
  });

  it('Creates a factory from inputs that can return transaction results', async () => {
    using contract = await launchTestContract({
      factory: StorageTestContractFactory,
    });

    expect(contract.interface).toBeInstanceOf(Interface);

    const call1 = await contract.functions.initialize_counter(100).call();
    await call1.waitForResult();

    const { waitForResult } = await contract.functions.increment_counter(1).call();
    const { transactionResult } = await waitForResult();
    expect(transactionResult).toEqual<TransactionResult>({
      blockId: expect.stringMatching(/^0x/),
      receipts: expect.arrayContaining([expect.any(Object)]),
      status: expect.any(String),
      type: expect.any(String),
      gqlTransaction: expect.any(Object),
      operations: expect.any(Array),
      isStatusFailure: expect.any(Boolean),
      isStatusPending: expect.any(Boolean),
      isStatusSuccess: expect.any(Boolean),
      isTypeCreate: expect.any(Boolean),
      isTypeMint: expect.any(Boolean),
      isTypeUpgrade: expect.any(Boolean),
      isTypeUpload: expect.any(Boolean),
      isTypeScript: expect.any(Boolean),
      isTypeBlob: expect.any(Boolean),
      logs: expect.any(Array),
      date: expect.any(Date),
      mintedAssets: expect.any(Array),
      burnedAssets: expect.any(Array),
      time: expect.any(String),
      tip: expect.any(BN),
      id: expect.any(String),
      gasUsed: expect.objectContaining({
        words: expect.arrayContaining([expect.any(Number)]),
      }),
      fee: expect.any(BN),
      transaction: expect.any(Object),
    });
    expect(transactionResult.gasUsed.toNumber()).toBeGreaterThan(0);

    const { callResult } = await contract.functions.increment_counter(1).dryRun();
    expect(callResult).toMatchObject({
      receipts: expect.arrayContaining([expect.any(Object)]),
    });
  });

  it('Creates a factory from inputs that can prepare call data', async () => {
    using contract = await launchTestContract({
      factory: StorageTestContractFactory,
    });

    const prepared = contract.functions.increment_counter(1).getCallConfig();
    expect(prepared).toEqual({
      program: expect.objectContaining({ id: contract.id }),
      func: expect.objectContaining({ name: 'increment_counter' }),
      args: [1],
      externalAbis: {},
      callParameters: undefined,
      txParameters: undefined,
      forward: undefined,
    });
  });

  it('should not override user input maxFee when calling deploy', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [wallet],
    } = launched;

    const setFee = bn(120_000);
    const factory = new ContractFactory(
      StorageTestContractFactory.bytecode,
      StorageTestContract.abi,
      wallet
    );
    const spy = vi.spyOn(factory.account as Account, 'sendTransaction');

    await factory.deploy({
      maxFee: setFee,
    });

    const transactionRequestArg = spy.mock.calls[0][0];

    expect(transactionRequestArg.maxFee?.toString()).toEqual(setFee.toString());

    vi.restoreAllMocks();
  });

  it('Creates a contract with initial storage fixed var names', async () => {
    using contract = await launchTestContract({
      factory: StorageTestContractFactory,

      storageSlots: StorageTestContract.storageSlots,
    });

    const call1 = await contract.functions.return_var1().call();
    const { value: var1 } = await call1.waitForResult();
    expect(var1.toHex()).toEqual(toHex(0));

    const call2 = await contract.functions.return_var2().call();
    const { value: var2 } = await call2.waitForResult();
    expect(var2).toEqual(20);

    const call3 = await contract.functions.return_var3().call();
    const { value: var3 } = await call3.waitForResult();
    expect(var3).toEqual(30);

    const call4 = await contract.functions.return_var4().call();
    const { value: var4 } = await call4.waitForResult();
    expect(var4).toEqual(true);

    const call5 = await contract.functions.return_var5().call();
    const { value: var5 } = await call5.waitForResult();
    expect(JSON.stringify(var5)).toEqual(
      JSON.stringify({
        v1: true,
        v2: bn(50),
      })
    );
  });

  it('Creates a contract with initial storage (dynamic key)', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [wallet],
    } = launched;

    const factory = new ContractFactory(
      StorageTestContractFactory.bytecode,
      StorageTestContract.abi,
      wallet
    );
    const b256 = '0x626f0c36909faecc316056fca8be684ab0cd06afc63247dc008bdf9e433f927a';

    const { waitForResult } = await factory.deploy({
      storageSlots: [
        { key: '0x0000000000000000000000000000000000000000000000000000000000000001', value: b256 },
      ],
    });
    const { contract } = await waitForResult();

    const { value: vB256 } = await contract.functions.return_b256().simulate();
    expect(vB256).toEqual(b256);
  });

  it('Creates a contract with initial storage. Both dynamic key and fixed vars', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [wallet],
    } = launched;

    const factory = new ContractFactory(
      StorageTestContractFactory.bytecode,
      StorageTestContract.abi,
      wallet
    );
    const b256 = '0x626f0c36909faecc316056fca8be684ab0cd06afc63247dc008bdf9e433f927a';

    const { waitForResult } = await factory.deploy({
      storageSlots: [
        ...StorageTestContract.storageSlots, // initializing from storage_slots.json
        { key: '0000000000000000000000000000000000000000000000000000000000000001', value: b256 }, // Initializing manual value
      ],
    });
    const { contract } = await waitForResult();

    const call1 = await contract.functions.return_var1().call();
    const { value: var1 } = await call1.waitForResult();
    expect(var1.toHex()).toEqual(toHex(0));

    const call2 = await contract.functions.return_var2().call();
    const { value: var2 } = await call2.waitForResult();
    expect(var2).toEqual(20);

    const call3 = await contract.functions.return_var3().call();
    const { value: var3 } = await call3.waitForResult();
    expect(var3).toEqual(30);

    const call4 = await contract.functions.return_var4().call();
    const { value: var4 } = await call4.waitForResult();
    expect(var4).toEqual(true);

    const call5 = await contract.functions.return_var5().call();
    const { value: var5 } = await call5.waitForResult();
    expect(JSON.stringify(var5)).toEqual(
      JSON.stringify({
        v1: true,
        v2: bn(50),
      })
    );

    const { value: vB256 } = await contract.functions.return_b256().simulate();
    expect(vB256).toEqual(b256);
  });

  it('should throws if calls createTransactionRequest is called when provider is not set', async () => {
    const factory = new ContractFactory(
      StorageTestContractFactory.bytecode,
      StorageTestContract.abi
    );

    await expectToThrowFuelError(
      () => factory.createTransactionRequest(),
      new FuelError(
        ErrorCode.MISSING_PROVIDER,
        'Cannot create transaction request without provider'
      )
    );
  });

  it('should not deploy large contracts via create', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [wallet],
    } = launched;

    const factory = new ContractFactory(LargeContractFactory.bytecode, LargeContract.abi, wallet);

    await expectToThrowFuelError(
      () => factory.deployContract(),
      new FuelError(
        ErrorCode.CONTRACT_SIZE_EXCEEDS_LIMIT,
        'Contract bytecode is too large. Please use `deployContractAsBlobs` instead.'
      )
    );
  });

  it('deploys large contracts via blobs [byte aligned]', async () => {
    using launched = await launchTestNode({
      providerOptions: {
        cacheUtxo: -1,
      },
    });

    const {
      wallets: [wallet],
    } = launched;
    const factory = new ContractFactory(LargeContractFactory.bytecode, LargeContract.abi, wallet);
    expect(factory.bytecode.length % 8 === 0).toBe(true);

    const deploy = await factory.deployContractAsBlobs<LargeContract>();

    const { contract } = await deploy.waitForResult();

    const call = await contract.functions.something().call();

    const { value } = await call.waitForResult();
    expect(value.toNumber()).toBe(1001);
  }, 15000);

  it('deploys large contracts via blobs [padded]', async () => {
    using launched = await launchTestNode({
      providerOptions: {
        cacheUtxo: -1,
      },
    });

    const {
      wallets: [wallet],
    } = launched;

    const bytecode = concat([arrayify(LargeContractFactory.bytecode), new Uint8Array(3)]);
    const factory = new ContractFactory(bytecode, LargeContract.abi, wallet);
    expect(factory.bytecode.length % 8 === 0).toBe(false);
    const deploy = await factory.deployContractAsBlobs<LargeContract>({ chunkSizeOverride: 0.5 });

    const { contract } = await deploy.waitForResult();
    expect(contract.id).toBeDefined();

    const call = await contract.functions.something().call();

    const { value } = await call.waitForResult();
    expect(value.toNumber()).toBe(1001);
  }, 15000);

  it('should not deploy large contracts via blobs [invalid chunk size override]', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const factory = new ContractFactory(LargeContractFactory.bytecode, LargeContract.abi, wallet);
    const chunkSizeOverride = 2;

    await expectToThrowFuelError(
      () => factory.deployContractAsBlobs<LargeContract>({ chunkSizeOverride }),
      new FuelError(
        ErrorCode.INVALID_CHUNK_SIZE_OVERRIDE,
        'Chunk size override must be between 0 and 1'
      )
    );
  });

  it('deploys a small contract via blobs', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const factory = new ContractFactory(
      ConfigurableContractFactory.bytecode,
      ConfigurableContract.abi,
      wallet
    );

    const deploy = await factory.deployContractAsBlobs();
    const { contract } = await deploy.waitForResult();

    const call = await contract.functions.echo_u8().call();
    const { value } = await call.waitForResult();
    expect(value).toBe(10);
  }, 15000);

  it('deploys a small contract via deploy entrypoint', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const deploy = await ConfigurableContractFactory.deploy(wallet);
    const { contract } = await deploy.waitForResult();

    const call = await contract.functions.echo_u8().call();
    const { value } = await call.waitForResult();
    expect(value).toBe(10);
  });

  it('deploys a large contract via deploy entrypoint', async () => {
    using launched = await launchTestNode({
      providerOptions: {
        cacheUtxo: -1,
      },
    });

    const {
      wallets: [wallet],
    } = launched;

    const deploy = await LargeContractFactory.deploy(wallet);
    const { contract } = await deploy.waitForResult();

    const call = await contract.functions.something().call();
    const { value } = await call.waitForResult();
    expect(value.toNumber()).toBe(1001);
  }, 15000);

  it('should not deploy large contract with invalid balance', async () => {
    using launched = await launchTestNode({
      providerOptions: {
        cacheUtxo: -1,
      },
      walletsConfig: {
        amountPerCoin: 0,
      },
    });

    const {
      wallets: [wallet],
    } = launched;

    const factory = new ContractFactory(LargeContractFactory.bytecode, LargeContract.abi, wallet);

    await expectToThrowFuelError(
      () => factory.deploy({ maxFee: 0 }),
      new FuelError(ErrorCode.FUNDS_TOO_LOW, 'Insufficient balance to deploy contract.')
    );
  });

  it('deploys a contract via blobs [configurables]', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const factory = new ContractFactory(
      ConfigurableContractFactory.bytecode,
      ConfigurableContract.abi,
      wallet
    );

    const deploy = await factory.deployContractAsBlobs({
      configurableConstants: {
        U8: 1,
        U16: 2,
        U32: 3,
        U64: 4,
      },
    });
    const { contract } = await deploy.waitForResult();

    const u8Call = await contract.functions.echo_u8().call();
    const u8Result = await u8Call.waitForResult();
    expect(u8Result.value).toBe(1);

    const u16Call = await contract.functions.echo_u16().call();
    const u16Result = await u16Call.waitForResult();
    expect(u16Result.value).toBe(2);

    const u32Call = await contract.functions.echo_u32().call();
    const u32Result = await u32Call.waitForResult();
    expect(u32Result.value).toBe(3);

    const u64Call = await contract.functions.echo_u64().call();
    const u64Result = await u64Call.waitForResult();
    expect(u64Result.value.toNumber()).toBe(4);
  }, 15000);

  it('deploys a contract via blobs [storage]', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const factory = new ContractFactory(
      StorageTestContractFactory.bytecode,
      StorageTestContract.abi,
      wallet
    );

    const deploy = await factory.deployContractAsBlobs({
      storageSlots: StorageTestContract.storageSlots,
    });

    const { contract } = await deploy.waitForResult();
    const call = await contract.functions.return_var5().call();
    const { value } = await call.waitForResult();
    expect(JSON.stringify(value)).toEqual(
      JSON.stringify({
        v1: true,
        v2: bn(50),
      })
    );
  });
});
