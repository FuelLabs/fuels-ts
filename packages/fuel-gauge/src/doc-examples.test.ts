import type { BigNumberish, Bytes, WalletLocked } from 'fuels';
import {
  bn,
  hashMessage,
  Address,
  arrayify,
  hexlify,
  randomBytes,
  getRandomB256,
  addressify,
  Contract,
  Wallet,
  WalletUnlocked,
  Signer,
  ZeroBytes32,
  Predicate,
} from 'fuels';
import { TestAssetId, launchTestNode } from 'fuels/test-utils';

import { PredicateTrue } from '../test/typegen';
import { CallTestContract } from '../test/typegen/contracts';
import { PredicateTripleSig } from '../test/typegen/predicates/PredicateTripleSig';

const PUBLIC_KEY =
  '0x2f34bc0df4db0ec391792cedb05768832b49b1aa3a2dd8c30054d1af00f67d00b74b7acbbf3087c8e0b1a4c343db50aa471d21f278ff5ce09f07795d541fb47e';

const ADDRESS_B256 = '0xf1e92c42b90934aa6372e30bc568a326f6e66a1a0288595e6e3fbd392a4f3e6e';

const ADDRESS_BYTES = new Uint8Array([
  241, 233, 44, 66, 185, 9, 52, 170, 99, 114, 227, 11, 197, 104, 163, 38, 246, 230, 106, 26, 2, 136,
  89, 94, 110, 63, 189, 57, 42, 79, 62, 110,
]);

/**
 * @group node
 * @group browser
 */
describe('Doc Examples', () => {
  test('it has an Address class using b256Address', () => {
    const address = new Address(ADDRESS_B256);

    expect(address.toB256()).toEqual(ADDRESS_B256);
    expect(address.toBytes()).toEqual(ADDRESS_BYTES);
    expect(address.toHexString()).toEqual(ADDRESS_B256);
  });

  test('it has an Address class using public key', () => {
    const address = Address.fromPublicKey(PUBLIC_KEY);

    expect(address.toAddress()).toEqual(ADDRESS_B256);
    expect(address.toB256()).toEqual(ADDRESS_B256);
  });

  test('it has an Address class using b256Address', () => {
    const address = Address.fromB256(ADDRESS_B256);

    expect(address.toAddress()).toEqual(ADDRESS_B256);
    expect(address.toB256()).toEqual(ADDRESS_B256);
  });

  test('it has Address tools', () => {
    // you can make a random address - useful for testing
    const address = Address.fromRandom();

    // you can it has a new Address from an ambiguous source that may be a B256 address
    const addressCloneFromB256 = Address.fromString(address.toB256());

    // if you aren't sure where the address comes from, use fromDynamicInput
    const dataFromInput: string =
      '0xf1e92c42b90934aa6372e30bc568a326f6e66a1a0288595e6e3fbd392a4f3e6e';
    // if the input string can't be resolved this will throw an error
    const someAddress = Address.fromDynamicInput(dataFromInput);

    // you can verify equality using the helper functions
    expect(address.equals(addressCloneFromB256)).toBeTruthy();
    expect(someAddress).toBeTruthy();
  });

  test('it has Bytes tools', () => {
    const random32Bytes: Bytes = randomBytes(32);
    const random32BytesString: string = hexlify(random32Bytes);
    const zeroed32Bytes: string = ZeroBytes32;

    expect(arrayify(random32Bytes)).toEqual(arrayify(random32BytesString));

    expect(zeroed32Bytes).toEqual(hexlify(zeroed32Bytes));
  });

  test('it has b256 tools', () => {
    const randomB256Bytes: Bytes = randomBytes(32);
    const randomB256: string = getRandomB256();

    const hexedB256: string = hexlify(randomB256Bytes);

    expect(arrayify(randomB256Bytes)).toEqual(arrayify(hexedB256));

    expect(randomB256).toEqual(hexlify(randomB256));
  });

  test('it has conversion tools', async () => {
    using node = await launchTestNode();

    const { provider } = node;
    const assetId: string = ZeroBytes32;
    const randomB256Bytes: Bytes = randomBytes(32);
    const hexedB256: string = hexlify(randomB256Bytes);
    const address = Address.fromB256(hexedB256);
    const arrayB256: Uint8Array = arrayify(randomB256Bytes);
    const walletLike: WalletLocked = Wallet.fromAddress(address, provider);
    const contractLike: Contract = new Contract(address, CallTestContract.abi, provider);

    expect(address.equals(addressify(walletLike) as Address)).toBeTruthy();
    expect(address.equals(contractLike.id as Address)).toBeTruthy();
    expect(address.toBytes()).toEqual(arrayB256);
    expect(address.toB256()).toEqual(hexedB256);
    expect(arrayify(address.toB256())).toEqual(arrayB256);

    expect(arrayify(assetId)).toEqual(arrayify(Address.fromB256(assetId).toB256()));
  });

  test('it can work with wallets', async () => {
    using node = await launchTestNode();

    const { provider } = node;
    // use the `generate` helper to make an Unlocked Wallet
    const myWallet: WalletUnlocked = Wallet.generate({
      provider,
    });

    // or use an Address to create a wallet
    const someWallet: WalletLocked = Wallet.fromAddress(myWallet.address, provider);

    const PRIVATE_KEY = myWallet.privateKey;

    const lockedWallet: WalletLocked = Wallet.fromAddress(myWallet.address, provider);

    // unlock an existing wallet
    let unlockedWallet: WalletUnlocked = lockedWallet.unlock(PRIVATE_KEY);
    // or directly from a private key
    unlockedWallet = Wallet.fromPrivateKey(PRIVATE_KEY, provider);

    const newlyLockedWallet = unlockedWallet.lock();
    const balance: BigNumberish = await myWallet.getBalance(provider.getBaseAssetId());
    const { balances } = await myWallet.getBalances();

    expect(newlyLockedWallet.address).toEqual(someWallet.address);
    expect(balance).toBeTruthy();
    expect(balances.length).toEqual(0);
  });

  it('it can be created without a provider', async () => {
    // You can create a wallet, without a provider
    let unlockedWallet: WalletUnlocked = Wallet.generate();
    unlockedWallet = Wallet.fromPrivateKey(unlockedWallet.privateKey);

    // All non-provider dependent methods are available
    unlockedWallet.lock();

    // All provider dependent methods will throw
    await expect(() => unlockedWallet.getCoins()).rejects.toThrow(/Provider not set/);
  });

  it('it can work sign messages with wallets', async () => {
    using launched = await launchTestNode();
    const { provider } = launched;

    const wallet = WalletUnlocked.generate({
      provider,
    });
    const message = 'doc-test-message';

    const signedMessage = await wallet.signMessage(message);
    const hashedMessage = hashMessage(message);
    const recoveredAddress = Signer.recoverAddress(hashedMessage, signedMessage);

    expect(wallet.privateKey).toBeTruthy();
    expect(wallet.publicKey).toBeTruthy();
    expect(wallet.address).toEqual(recoveredAddress);
  });

  it('can create wallets', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [fundingWallet],
    } = launched;

    const baseAssetId = provider.getBaseAssetId();

    const walletA = Wallet.generate({ provider });
    const walletB = Wallet.generate({ provider });

    const submitted = await fundingWallet.batchTransfer([
      { amount: 100, destination: walletA.address, assetId: baseAssetId },
      { amount: 100, destination: walletB.address, assetId: baseAssetId },
      { amount: 100, destination: walletB.address, assetId: TestAssetId.B.value },
      { amount: 100, destination: walletB.address, assetId: TestAssetId.A.value },
    ]);

    await submitted.waitForResult();

    // this wallet has no assets
    const walletC = Wallet.generate({ provider });

    // retrieve balances of wallets
    const { balances: walletABalances } = await walletA.getBalances();
    const { balances: walletBBalances } = await walletB.getBalances();
    const { balances: walletCBalances } = await walletC.getBalances();

    // validate balances
    expect(walletABalances).toEqual([{ assetId: provider.getBaseAssetId(), amount: bn(100) }]);
    expect(walletBBalances).toEqual([
      { assetId: TestAssetId.A.value, amount: bn(100) },
      { assetId: TestAssetId.B.value, amount: bn(100) },
      { assetId: provider.getBaseAssetId(), amount: bn(100) },
    ]);
    expect(walletCBalances).toEqual([]);
  });

  it('can connect to testnet', async () => {
    using launched = await launchTestNode();
    const { provider } = launched;
    const PRIVATE_KEY = 'a1447cd75accc6b71a976fd3401a1f6ce318d27ba660b0315ee6ac347bf39568';
    const wallet = Wallet.fromPrivateKey(PRIVATE_KEY, provider);

    const signer = new Signer(PRIVATE_KEY);

    expect(wallet.address).toEqual(signer.address);
  });

  it('can connect to a local provider', async () => {
    using launched = await launchTestNode();
    const { provider } = launched;
    const PRIVATE_KEY = 'a1447cd75accc6b71a976fd3401a1f6ce318d27ba660b0315ee6ac347bf39568';
    const wallet: WalletUnlocked = Wallet.fromPrivateKey(PRIVATE_KEY, provider);
    const signer = new Signer(PRIVATE_KEY);

    expect(wallet.address).toEqual(signer.address);
  });

  it('can create a predicate', async () => {
    using launched = await launchTestNode();
    const { provider } = launched;
    const predicate = new Predicate({
      bytecode: PredicateTrue.bytecode,
      abi: PredicateTrue.abi,
      provider,
    });

    expect(predicate.address).toBeTruthy();
    expect(predicate.bytes).toEqual(arrayify(PredicateTrue.bytecode));
  });

  it('can create a predicate and use', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [fundingWallet],
    } = launched;

    // Setup a private key
    const PRIVATE_KEY_1 = '0x862512a2363db2b3a375c0d4bbbd27172180d89f23f2e259bac850ab02619301';
    const PRIVATE_KEY_2 = '0x37fa81c84ccd547c30c176b118d5cb892bdb113e8e80141f266519422ef9eefd';
    const PRIVATE_KEY_3 = '0x976e5c3fa620092c718d852ca703b6da9e3075b9f2ecb8ed42d9f746bf26aafb';

    // Create the wallets, passing provider
    const wallet1: WalletUnlocked = Wallet.fromPrivateKey(PRIVATE_KEY_1, provider);
    const wallet2: WalletUnlocked = Wallet.fromPrivateKey(PRIVATE_KEY_2, provider);
    const wallet3: WalletUnlocked = Wallet.fromPrivateKey(PRIVATE_KEY_3, provider);

    const submitted = await fundingWallet.batchTransfer([
      {
        amount: 1_000_000,
        destination: wallet1.address,
      },
      {
        amount: 2_000_000,
        destination: wallet2.address,
      },
      {
        amount: 300_000,
        destination: wallet3.address,
      },
    ]);

    await submitted.waitForResult();

    const receiver = Wallet.generate({ provider });

    const dataToSign = '0x0000000000000000000000000000000000000000000000000000000000000000';
    const signature1 = await wallet1.signMessage(dataToSign);
    const signature2 = await wallet2.signMessage(dataToSign);
    const signature3 = await wallet3.signMessage(dataToSign);
    const predicate = new PredicateTripleSig({
      provider,
      data: [[signature1, signature2, signature3]],
    });

    const amountToPredicate = 600_000;
    const amountToReceiver = 100;

    const response = await wallet1.transfer(
      predicate.address,
      amountToPredicate,
      provider.getBaseAssetId(),
      {
        gasLimit: 10_000,
      }
    );

    await response.waitForResult();

    const depositOnPredicate = await wallet1.transfer(
      predicate.address,
      1000,
      provider.getBaseAssetId(),
      {
        gasLimit: 10_000,
      }
    );
    // Wait for Transaction to succeed
    await depositOnPredicate.waitForResult();

    const tx = await predicate.transfer(
      receiver.address,
      amountToReceiver,
      provider.getBaseAssetId(),
      {
        gasLimit: 10_000,
      }
    );
    const { isStatusSuccess } = await tx.waitForResult();

    // check balance
    const receiverBalance = await receiver.getBalance();

    // assert that predicate funds now belong to the receiver
    expect(bn(receiverBalance).gte(bn(amountToReceiver))).toBeTruthy();
    expect(isStatusSuccess).toBeTruthy();
  });
});
