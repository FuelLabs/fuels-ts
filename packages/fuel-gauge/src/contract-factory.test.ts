import type { Account, TransactionResult } from '@fuel-ts/account';
import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { BN, bn, toHex, Interface, Provider, ContractFactory, FUEL_NETWORK_URL } from 'fuels';
import { generateTestWallet, expectToThrowFuelError } from 'fuels/test-utils';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';

/**
 * @group node
 */
describe('Contract Factory', () => {
  let baseAssetId: string;

  const {
    binHexlified: byteCode,
    abiContents: abi,
    storageSlots,
  } = getFuelGaugeForcProject(FuelGaugeProjectsEnum.STORAGE_TEST_CONTRACT);

  const createContractFactory = async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    baseAssetId = provider.getBaseAssetId();
    const wallet = await generateTestWallet(provider, [[5_000_000, baseAssetId]]);

    // send byteCode and ABI to ContractFactory to load
    const factory = new ContractFactory(byteCode, abi, wallet);
    return factory;
  };

  it('Creates a factory from inputs that can return call results', async () => {
    const factory = await createContractFactory();

    const { waitForResult } = await factory.deployContract();
    const { contract } = await waitForResult();

    expect(contract.interface).toBeInstanceOf(Interface);

    const call1 = await contract.functions.initialize_counter(41).call();
    const { value: valueInitial } = await call1.waitForResult();
    expect(valueInitial.toHex()).toEqual(toHex(41));

    const call2 = await contract.functions.increment_counter(1).call();
    const { value } = await call2.waitForResult();
    expect(value.toHex()).toEqual(toHex(42));

    const { value: value2 } = await contract.functions.increment_counter(1).dryRun();
    expect(value2.toHex()).toEqual(toHex(43));
  });

  it('Creates a factory from inputs that can return transaction results', async () => {
    const factory = await createContractFactory();

    const callDeploy = await factory.deployContract();
    const { contract } = await callDeploy.waitForResult();

    expect(contract.interface).toBeInstanceOf(Interface);

    await contract.functions.initialize_counter(100).call();

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
    const factory = await createContractFactory();

    const { waitForResult } = await factory.deployContract();
    const { contract } = await waitForResult();

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

  it('should not override user input maxFee when calling deployContract', async () => {
    const factory = await createContractFactory();
    const setFee = bn(120_000);

    const spy = vi.spyOn(factory.account as Account, 'sendTransaction');

    await factory.deployContract({
      maxFee: setFee,
    });

    const transactionRequestArg = spy.mock.calls[0][0];

    expect(transactionRequestArg.maxFee?.toString()).toEqual(setFee.toString());

    vi.restoreAllMocks();
  });

  it('Creates a contract with initial storage fixed var names', async () => {
    const factory = await createContractFactory();
    const { waitForResult } = await factory.deployContract({
      storageSlots,
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
  });

  it('Creates a contract with initial storage (dynamic key)', async () => {
    const factory = await createContractFactory();
    const b256 = '0x626f0c36909faecc316056fca8be684ab0cd06afc63247dc008bdf9e433f927a';

    const { waitForResult } = await factory.deployContract({
      storageSlots: [
        { key: '0x0000000000000000000000000000000000000000000000000000000000000001', value: b256 },
      ],
    });
    const { contract } = await waitForResult();

    const { value: vB256 } = await contract.functions.return_b256().simulate();
    expect(vB256).toEqual(b256);
  });

  it('Creates a contract with initial storage. Both dynamic key and fixed vars', async () => {
    const factory = await createContractFactory();
    const b256 = '0x626f0c36909faecc316056fca8be684ab0cd06afc63247dc008bdf9e433f927a';

    const { waitForResult } = await factory.deployContract({
      storageSlots: [
        ...storageSlots, // initializing from storage_slots.json
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
    const factory = new ContractFactory(byteCode, abi);

    await expectToThrowFuelError(
      () => factory.createTransactionRequest(),
      new FuelError(
        ErrorCode.MISSING_PROVIDER,
        'Cannot create transaction request without provider'
      )
    );
  });
});
