import { toHex, ContractFactory, ZeroBytes32 } from 'fuels';
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

    const { storageSlots } = StorageTestContractFactory;

    // #region contract-deployment-storage-slots
    // #context import storageSlots from '../your-sway-project/out/debug/your-sway-project-storage_slots.json';

    const factory = new ContractFactory(
      StorageTestContractFactory.bytecode,
      StorageTestContract.abi,
      wallet
    );
    const deploy = await factory.deploy({
      storageSlots,
    });

    const { contract } = await deploy.waitForResult();
    // #endregion contract-deployment-storage-slots

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
    // #region contract-deployment-storage-slots-inline
    const { waitForResult } = await factory.deploy({
      storageSlots: [
        {
          key: '02dac99c283f16bc91b74f6942db7f012699a2ad51272b15207b9cc14a70dbae',
          value: '0000000000000001000000000000000000000000000000000000000000000000',
        },
        {
          key: '6294951dcb0a9111a517be5cf4785670ff4e166fb5ab9c33b17e6881b48e964f',
          value: '0000000000000001000000000000003200000000000000000000000000000000',
        },
        {
          key: 'b48b753af346966d0d169c0b2e3234611f65d5cfdb57c7b6e7cd6ca93707bee0',
          value: '000000000000001e000000000000000000000000000000000000000000000000',
        },
        {
          key: 'de9090cb50e71c2588c773487d1da7066d0c719849a7e58dc8b6397a25c567c0',
          value: '0000000000000014000000000000000000000000000000000000000000000000',
        },
        {
          key: 'f383b0ce51358be57daa3b725fe44acdb2d880604e367199080b4379c41bb6ed',
          value: '000000000000000a000000000000000000000000000000000000000000000000',
        },
      ],
    });
    const { contract } = await waitForResult();
    // #endregion contract-deployment-storage-slots-inline
    const call1 = await contract.functions.initialize_counter(1300).call();
    const { value: initializeResult } = await call1.waitForResult();
    expect(initializeResult.toHex()).toEqual(toHex(1300));

    const call2 = await contract.functions.increment_counter(37).call();
    const { value: incrementResult } = await call2.waitForResult();
    expect(incrementResult.toHex()).toEqual(toHex(1337));

    const { value: count } = await contract.functions.counter().simulate();
    expect(count.toHex()).toEqual(toHex(1337));
  });

  it('should automatically load storage slots', async () => {
    const { storageSlots } = StorageTestContractFactory;
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
    const { storageSlots } = StorageTestContractFactory;
    const expectedStorageSlots = storageSlots.map(({ key }) => ({
      key: `0x${key}`,
      value: ZeroBytes32,
    }));

    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    // via constructor
    const storageContractFactory = new StorageTestContractFactory(wallet);
    const deployConstructor = await storageContractFactory.deploy({
      storageSlots: expectedStorageSlots,
    });
    const { transactionResult: transactionResultConstructor } =
      await deployConstructor.waitForResult();
    expect(transactionResultConstructor.transaction.storageSlots).toEqual(expectedStorageSlots);

    // via static deploy
    const deployStatically = await StorageTestContractFactory.deploy(wallet, {
      storageSlots: expectedStorageSlots,
    });
    const { transactionResult: transactionResultStatically } =
      await deployStatically.waitForResult();
    expect(transactionResultStatically.transaction.storageSlots).toEqual(expectedStorageSlots);
  });
});
