import { toHex, ContractFactory, ZeroBytes32, sha256, toUtf8Bytes } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { StorageTestContract, StorageTestContractFactory } from '../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('StorageTestContract', () => {
  it('can increment counter', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const { storageSlots } = StorageTestContract;

    const factory = new ContractFactory(
      StorageTestContractFactory.bytecode,
      StorageTestContract.abi,
      wallet
    );
    const deploy = await factory.deploy({
      storageSlots,
    });

    const { contract } = await deploy.waitForResult();

    // Call contract
    const call1 = await contract.functions.initialize_counter(1300).call();

    // Wait for result
    const { value: initializeResult } = await call1.waitForResult();

    expect(initializeResult.toHex()).toEqual(toHex(1300));

    const call2 = await contract.functions.increment_counter(37).call();
    const { value: incrementResult } = await call2.waitForResult();

    expect(incrementResult.toHex()).toEqual(toHex(1337));

    const { value: count } = await contract.functions.counter().simulate();
    expect(count.toHex()).toEqual(toHex(1337));
  });

  it('can increment counter - using custom inline storage slots', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const factory = new ContractFactory(
      StorageTestContractFactory.bytecode,
      StorageTestContract.abi,
      wallet
    );
    const { waitForResult } = await factory.deploy({
      storageSlots: [
        {
          key: '3e5eb95bfc5be1820967de31598c83046528bbae6b32889a32280c0f6c7d6f6b',
          value: '0000000000000001000000000000000000000000000000000000000000000000',
        },
        {
          key: '6bbf486e1de9ef8d49591b0cf28f039788533d1c77db4e286826fa59c5d4c791',
          value: '0000000000000001000000000000003200000000000000000000000000000000',
        },
        {
          key: '886069bfc0d409103249e2ce318ba4e6f7a7050ce2ebc556b736589640039acd',
          value: '000000000000001e000000000000000000000000000000000000000000000000',
        },
        {
          key: 'c9e2ea9650411ce8e1b477da60c2d32e0e1bc80d15dc7dc9ee88739c3f0be9c1',
          value: '0000000000000014000000000000000000000000000000000000000000000000',
        },
        {
          key: 'eab1cac98d4dcd7a47252252e1f7856ebb268343d36ef8d352b2077690a8e580',
          value: '000000000000000a000000000000000000000000000000000000000000000000',
        },
      ],
    });
    const { contract } = await waitForResult();

    const call1 = await contract.functions.initialize_counter(1300).call();
    const { value: initializeResult } = await call1.waitForResult();
    expect(initializeResult.toHex()).toEqual(toHex(1300));

    const call2 = await contract.functions.increment_counter(37).call();
    const { value: incrementResult } = await call2.waitForResult();
    expect(incrementResult.toHex()).toEqual(toHex(1337));

    const { value: count } = await contract.functions.counter().simulate();
    expect(count.toHex()).toEqual(toHex(1337));
  });

  it('should allow reading storage slots [with overridden storage slots]', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const expectedValues = {
      var1: 100, // U64
      var2: 1000, // U32
      var3: 10000, // U16
      var4: false, // Boolean
      var5: {
        v1: false,
        v2: 50000,
      },
    };

    const storageKey = (key: string) =>
      sha256(new Uint8Array([0, ...toUtf8Bytes(key)])).replace(/^0x/, '');

    const storageSlots = [
      {
        key: storageKey('storage.var1'),
        // u64 100
        value: '0000000000000064000000000000000000000000000000000000000000000000',
      },
      {
        key: storageKey('storage.var2'),
        // u32 1000
        value: '00000000000003e8000000000000000000000000000000000000000000000000',
      },
      {
        key: storageKey('storage.var3'),
        // u16 10000
        value: '0000000000002710000000000000000000000000000000000000000000000000',
      },
      {
        key: storageKey('storage.var4'),
        // bool false
        value: '0000000000000000000000000000000000000000000000000000000000000000',
      },
      {
        key: storageKey('storage.var5'),
        // struct { v1: bool [false], v2: u64 [50000] }
        value: '0000000000000000000000000000c35000000000000000000000000000000000',
      },
    ];

    const factory = new StorageTestContractFactory(wallet);
    const { waitForResult: waitForDeploy } = await factory.deploy({ storageSlots });
    const { contract } = await waitForDeploy();

    const { waitForResult } = await contract
      .multiCall([
        contract.functions.return_var1(),
        contract.functions.return_var2(),
        contract.functions.return_var3(),
        contract.functions.return_var4(),
        contract.functions.return_var5(),
      ])
      .call();

    const {
      value: [var1, var2, var3, var4, var5],
    } = await waitForResult();

    expect(var1).toEqualBn(expectedValues.var1);
    expect(var2).toEqualBn(expectedValues.var2);
    expect(var3).toEqualBn(expectedValues.var3);
    expect(var4).toStrictEqual(expectedValues.var4);
    expect(var5).toStrictEqual({
      v1: expectedValues.var5.v1,
      v2: expect.toEqualBn(expectedValues.var5.v2),
    });

    // Ensure that the storage slots are aligned with Sway
    const swayStorageSlotKeys = StorageTestContract.storageSlots.map(({ key }) => key).sort();
    const customStorageSlotKeys = storageSlots.map(({ key }) => key).sort();
    expect(swayStorageSlotKeys).toEqual(customStorageSlotKeys);
  });

  it('should automatically load storage slots', async () => {
    const { storageSlots } = StorageTestContract;
    const expectedStorageSlots = storageSlots.map(({ key, value }) => ({
      key: `0x${key}`,
      value: `0x${value}`,
    }));

    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    // via constructor
    const storageContractFactory = new StorageTestContractFactory(wallet);
    const deployConstructor = await storageContractFactory.deploy();
    const { transactionResult: transactionResultConstructor } =
      await deployConstructor.waitForResult();
    expect(transactionResultConstructor.transaction.storageSlots).toEqual(expectedStorageSlots);

    // via static deploy
    const deployStatically = await StorageTestContractFactory.deploy(wallet);
    const { transactionResult: transactionResultStatically } =
      await deployStatically.waitForResult();
    expect(transactionResultStatically.transaction.storageSlots).toEqual(expectedStorageSlots);
  });

  it('should allow for overriding storage slots', async () => {
    const { storageSlots } = StorageTestContract;

    expect(storageSlots.length).toBeGreaterThan(2);
    const modifiedStorageSlots = storageSlots.slice(1).map(({ key }) => ({
      key: `0x${key}`,
      value: ZeroBytes32,
    }));
    const expectedStorageSlots = [
      { key: `0x${storageSlots[0].key}`, value: `0x${storageSlots[0].value}` },
      ...modifiedStorageSlots,
    ];

    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    // via constructor
    const storageContractFactory = new StorageTestContractFactory(wallet);
    const deployConstructor = await storageContractFactory.deploy({
      storageSlots: modifiedStorageSlots,
    });
    const { transactionResult: transactionResultConstructor } =
      await deployConstructor.waitForResult();
    expect(transactionResultConstructor.transaction.storageSlots).toEqual(expectedStorageSlots);

    // via static deploy
    const deployStatically = await StorageTestContractFactory.deploy(wallet, {
      storageSlots: modifiedStorageSlots,
    });
    const { transactionResult: transactionResultStatically } =
      await deployStatically.waitForResult();
    expect(transactionResultStatically.transaction.storageSlots).toEqual(expectedStorageSlots);

    // via deployAsBlobTx
    const deployBlob = await storageContractFactory.deployAsBlobTx({
      storageSlots: modifiedStorageSlots,
    });

    const { transactionResult: txResultBlob } = await deployBlob.waitForResult();
    expect(txResultBlob.transaction.storageSlots).toEqual(expectedStorageSlots);

    // via deployAsCreateTx
    const deployCreate = await storageContractFactory.deployAsBlobTx({
      storageSlots: modifiedStorageSlots,
    });

    const { transactionResult: txResultCreate } = await deployCreate.waitForResult();
    expect(txResultCreate.transaction.storageSlots).toEqual(expectedStorageSlots);
  });

  test('automatically loads storage slots when using deployAsCreateTx', async () => {
    const { storageSlots } = StorageTestContract;
    const expectedStorageSlots = storageSlots.map(({ key, value }) => ({
      key: `0x${key}`,
      value: `0x${value}`,
    }));

    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    // via constructor
    const storageContractFactory = new StorageTestContractFactory(wallet);
    const deployConstructor = await storageContractFactory.deployAsCreateTx();
    const { transactionResult: transactionResultConstructor } =
      await deployConstructor.waitForResult();
    expect(transactionResultConstructor.transaction.storageSlots).toEqual(expectedStorageSlots);
  });

  test('automatically loads storage slots when using deployAsBlobTx', async () => {
    const { storageSlots } = StorageTestContract;
    const expectedStorageSlots = storageSlots.map(({ key, value }) => ({
      key: `0x${key}`,
      value: `0x${value}`,
    }));

    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    // via constructor
    const storageContractFactory = new StorageTestContractFactory(wallet);
    const deployConstructor = await storageContractFactory.deployAsBlobTx();
    const { transactionResult: transactionResultConstructor } =
      await deployConstructor.waitForResult();
    expect(transactionResultConstructor.transaction.storageSlots).toEqual(expectedStorageSlots);
  });
});
