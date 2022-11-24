import type { Bech32Address, BigNumberish, Bytes, CoinQuantity, WalletLocked } from 'fuels';
import {
  Predicate,
  bn,
  Provider,
  hashMessage,
  NativeAssetId,
  Address,
  arrayify,
  hexlify,
  randomBytes,
  getRandomB256,
  ZeroBytes32,
  addressify,
  Contract,
  Wallet,
  WalletUnlocked,
  Signer,
  TestUtils,
} from 'fuels';

import abiJSON from '../test-projects/call-test-contract/out/debug/call-test-abi.json';
import predicateTriple from '../test-projects/predicate-triple-sig';
import testPredicateTrue from '../test-projects/predicate-true';

const PUBLIC_KEY =
  '0x2f34bc0df4db0ec391792cedb05768832b49b1aa3a2dd8c30054d1af00f67d00b74b7acbbf3087c8e0b1a4c343db50aa471d21f278ff5ce09f07795d541fb47e';
const ADDRESS_B256 = '0xf1e92c42b90934aa6372e30bc568a326f6e66a1a0288595e6e3fbd392a4f3e6e';
const ADDRESS_BECH32: Bech32Address =
  'fuel1785jcs4epy625cmjuv9u269rymmwv6s6q2y9jhnw877nj2j08ehqce3rxf';
const ADDRESS_BYTES = new Uint8Array([
  241, 233, 44, 66, 185, 9, 52, 170, 99, 114, 227, 11, 197, 104, 163, 38, 246, 230, 106, 26, 2, 136,
  89, 94, 110, 63, 189, 57, 42, 79, 62, 110,
]);

test('it has an Address class using bech32Address', () => {
  // #region typedoc:Address-bech32
  // #context import { Address } from 'fuels';

  const address = new Address(ADDRESS_BECH32);

  expect(address.toB256()).toEqual(ADDRESS_B256);
  expect(address.toBytes()).toEqual(ADDRESS_BYTES);
  // Hex string values are equivalent to B256
  expect(address.toHexString()).toEqual(ADDRESS_B256);
  // #endregion
});

test('it has an Address class using public key', async () => {
  // #region typedoc:Address-publicKey
  const address = Address.fromPublicKey(PUBLIC_KEY);

  expect(address.toAddress()).toEqual(ADDRESS_BECH32);
  expect(address.toB256()).toEqual(ADDRESS_B256);
  // #endregion
});

test('it has an Address class using b256Address', async () => {
  // #region typedoc:Address-b256
  // #context import { Address } from 'fuels';
  const address = Address.fromB256(ADDRESS_B256);

  expect(address.toAddress()).toEqual(ADDRESS_BECH32);
  expect(address.toB256()).toEqual(ADDRESS_B256);
  // #endregion
});

test('it has Address tools', async () => {
  // #region typedoc:Address-utils
  // you can make a random address - useful for testing
  const address = Address.fromRandom();

  // you can it has a new Address from an ambiguous source that may be a Bech32 or B256 address
  const addressCloneFromBech = Address.fromString(address.toString());
  const addressCloneFromB256 = Address.fromString(address.toB256());

  // you can verify equality using the helper functions
  expect(address.equals(addressCloneFromBech)).toBeTruthy();
  expect(addressCloneFromBech.toString()).toEqual(addressCloneFromB256.toString());
  // #endregion
});

test('it has Bytes tools', async () => {
  // #region typedoc:byte32
  // #context import { ZeroBytes32, randomBytes } from 'fuels';

  const random32Bytes: Bytes = randomBytes(32);
  const random32BytesString: string = hexlify(random32Bytes);
  const zeroed32Bytes: string = ZeroBytes32;

  // a byte32 array can be safely passed into arrayify more than once without mangling
  expect(arrayify(random32Bytes)).toEqual(arrayify(random32BytesString));

  // a byte32 string can be safely passed into hexlify more than once without mangling
  expect(zeroed32Bytes).toEqual(hexlify(zeroed32Bytes));
  // #endregion
});

test('it has b256 tools', async () => {
  // #region typedoc:b256
  // #context import { arrayify, hexlify, randomBytes, getRandomB256 } from 'fuels';

  // here are some useful ways to generate random b256 values
  const randomB256Bytes: Bytes = randomBytes(32);
  const randomB256: string = getRandomB256();

  // a [u8; 32] (Uint8Array) b256 can be converted to hex string
  const hexedB256: string = hexlify(randomB256Bytes);

  // a string b256 can be converted to Uint8Array
  expect(arrayify(randomB256Bytes)).toEqual(arrayify(hexedB256));

  // a string b256 can be safely passed into hexlify without mangling
  expect(randomB256).toEqual(hexlify(randomB256));
  // #endregion
});

test('it has conversion tools', async () => {
  // #region typedoc:conversion
  // #context import { arrayify, hexlify, randomBytes, Address, addressify, Contract, Wallet, WalletLocked } from 'fuels';

  const assetId: string = ZeroBytes32;
  const randomB256Bytes: Bytes = randomBytes(32);
  const hexedB256: string = hexlify(randomB256Bytes);
  const address = Address.fromB256(hexedB256);
  const arrayB256: Uint8Array = arrayify(randomB256Bytes);
  const walletLike: WalletLocked = Wallet.fromAddress(address);
  const contractLike: Contract = new Contract(address, abiJSON);

  expect(address.equals(addressify(walletLike) as Address)).toBeTruthy();
  expect(address.equals(contractLike.id as Address)).toBeTruthy();
  expect(address.toBytes()).toEqual(arrayB256);
  expect(address.toB256()).toEqual(hexedB256);
  expect(arrayify(address.toB256())).toEqual(arrayB256);

  // it's bytes all the way down
  expect(arrayify(assetId)).toEqual(arrayify(Address.fromB256(assetId).toB256()));
  // #endregion
});

test('it can work with wallets', async () => {
  // #region typedoc:wallets
  // #context import { Wallet, WalletLocked, WalletUnlocked } from 'fuels';

  // use the `generate` helper to make an Unlocked Wallet
  const myWallet: WalletUnlocked = Wallet.generate();

  // or use an Address to create a wallet
  const someWallet: WalletLocked = Wallet.fromAddress(myWallet.address);
  // #endregion

  const PRIVATE_KEY = myWallet.privateKey;

  // #region typedoc:wallet-locked-to-unlocked
  const lockedWallet: WalletLocked = Wallet.fromAddress(myWallet.address);
  // #region typedoc:wallet-from-private-key
  // unlock an existing wallet
  let unlockedWallet: WalletUnlocked = lockedWallet.unlock(PRIVATE_KEY);
  // or directly from a private key
  unlockedWallet = Wallet.fromPrivateKey(PRIVATE_KEY);
  // #endregion
  // #endregion

  // #region typedoc:wallet-unlocked-to-locked
  const newlyLockedWallet = unlockedWallet.lock();
  // #endregion

  // #region typedoc:wallet-check-balance
  // #context import { Wallet, WalletUnlocked, BigNumberish} from 'fuels';
  const balance: BigNumberish = await myWallet.getBalance(NativeAssetId);
  // #endregion

  // #region typedoc:wallet-check-balances
  // #context import { Wallet, WalletUnlocked, CoinQuantity} from 'fuels';
  const balances: CoinQuantity[] = await myWallet.getBalances();
  // #endregion

  expect(newlyLockedWallet.address).toEqual(someWallet.address);
  expect(balance).toBeTruthy();
  expect(balances.length).toEqual(0);
});

it('it can work sign messages with wallets', async () => {
  // #region typedoc:wallet-message-signing
  // #context import { WalletUnlocked, hashMessage, Signer} from 'fuels';
  const wallet = WalletUnlocked.generate();
  const message = 'doc-test-message';
  const signedMessage = await wallet.signMessage(message);
  const hashedMessage = hashMessage(message);
  const recoveredAddress = Signer.recoverAddress(hashedMessage, signedMessage);

  expect(wallet.privateKey).toBeTruthy();
  expect(wallet.publicKey).toBeTruthy();
  expect(wallet.address).toEqual(recoveredAddress);
  // #endregion
});

it('can create wallets', async () => {
  // #region typedoc:wallet-setup
  // #context import { Provider, TestUtils, bn } from 'fuels';
  const provider = new Provider('http://127.0.0.1:4000/graphql');
  const assetIdA = '0x0101010101010101010101010101010101010101010101010101010101010101';
  const assetIdB = '0x0202020202020202020202020202020202020202020202020202020202020202';

  // single asset
  const walletA = await TestUtils.generateTestWallet(provider, [[42, NativeAssetId]]);

  // multiple assets
  const walletB = await TestUtils.generateTestWallet(provider, [
    // [Amount, AssetId]
    [100, assetIdA],
    [200, assetIdB],
    [30, NativeAssetId],
  ]);

  // this wallet has no assets
  const walletC = await TestUtils.generateTestWallet(provider);

  // retrieve balances of wallets
  const walletABalances = await walletA.getBalances();
  const walletBBalances = await walletB.getBalances();
  const walletCBalances = await walletC.getBalances();

  // validate balances
  expect(walletABalances).toEqual([{ assetId: NativeAssetId, amount: bn(42) }]);
  expect(walletBBalances).toEqual([
    { assetId: NativeAssetId, amount: bn(30) },
    { assetId: assetIdA, amount: bn(100) },
    { assetId: assetIdB, amount: bn(200) },
  ]);
  expect(walletCBalances).toEqual([]);
  // #endregion
});

it('can connect to testnet', async () => {
  // #region typedoc:provider-testnet
  // #context import { Provider, WalletUnlocked } from 'fuels';
  const provider = new Provider('node-beta-2.fuel.network');
  // Setup a private key
  const PRIVATE_KEY = 'a1447cd75accc6b71a976fd3401a1f6ce318d27ba660b0315ee6ac347bf39568';

  // Create the wallet, passing provider
  const wallet: WalletUnlocked = Wallet.fromPrivateKey(PRIVATE_KEY, provider);

  // #region typedoc:signer-address
  const signer = new Signer(PRIVATE_KEY);
  // validate address
  expect(wallet.address).toEqual(signer.address);
  // #endregion
  // #endregion
});

it('can connect to a local provider', async () => {
  // #region typedoc:provider-local
  // #context import { Provider, WalletUnlocked } from 'fuels';
  const localProvider = new Provider('http://127.0.0.1:4000/graphql');
  // Setup a private key
  const PRIVATE_KEY = 'a1447cd75accc6b71a976fd3401a1f6ce318d27ba660b0315ee6ac347bf39568';

  // Create the wallet, passing provider
  const wallet: WalletUnlocked = Wallet.fromPrivateKey(PRIVATE_KEY, localProvider);

  const signer = new Signer(PRIVATE_KEY);
  // validate address
  expect(wallet.address).toEqual(signer.address);
  // #endregion
});

it('can query address with wallets', async () => {
  // #region typedoc:wallet-query
  // #context import { Provider, TestUtils } from 'fuels';
  const provider = new Provider('http://127.0.0.1:4000/graphql');
  const assetIdA = '0x0101010101010101010101010101010101010101010101010101010101010101';

  const wallet = await TestUtils.generateTestWallet(provider, [
    [42, NativeAssetId],
    [100, assetIdA],
  ]);

  // get single coin
  const coin = await wallet.getCoins(NativeAssetId);

  // get all coins
  const coins = await wallet.getCoins();

  expect(coin.length).toEqual(1);
  expect(coin).toEqual([
    expect.objectContaining({
      assetId: NativeAssetId,
      amount: bn(42),
    }),
  ]);
  expect(coins).toEqual([
    expect.objectContaining({
      assetId: NativeAssetId,
      amount: bn(42),
    }),
    expect.objectContaining({
      assetId: assetIdA,
      amount: bn(100),
    }),
  ]);
  // #endregion

  // #region typedoc:wallet-get-balances
  const walletBalances = await wallet.getBalances();
  expect(walletBalances).toEqual([
    { assetId: NativeAssetId, amount: bn(42) },
    { assetId: assetIdA, amount: bn(100) },
  ]);
  // #endregion

  // #region typedoc:wallet-get-spendable-resources
  const spendableResources = await wallet.getResourcesToSpend([
    { amount: 32, assetId: NativeAssetId, max: 42 },
    { amount: 50, assetId: assetIdA },
  ]);
  expect(spendableResources[0].amount).toEqual(bn(42));
  expect(spendableResources[1].amount).toEqual(bn(100));
  // #endregion
});

it('can create a predicate', async () => {
  // #region typedoc:predicate-basic
  // #context import { Predicate, arrayify } from 'fuels';
  const predicate = new Predicate(testPredicateTrue);

  expect(predicate.address).toBeTruthy();
  expect(predicate.bytes).toEqual(arrayify(testPredicateTrue));
  // #endregion
});

it.skip('can create a predicate and use', async () => {
  // #region typedoc:Predicate-triple-wallets
  // #context import { Provider, Wallet, TestUtils } from 'fuels';
  const provider = new Provider('http://127.0.0.1:4000/graphql');
  // Setup a private key
  const PRIVATE_KEY_1 = '0x862512a2363db2b3a375c0d4bbbd27172180d89f23f2e259bac850ab02619301';
  const PRIVATE_KEY_2 = '0x37fa81c84ccd547c30c176b118d5cb892bdb113e8e80141f266519422ef9eefd';
  const PRIVATE_KEY_3 = '0x976e5c3fa620092c718d852ca703b6da9e3075b9f2ecb8ed42d9f746bf26aafb';

  // Create the wallets, passing provider
  const wallet1: WalletUnlocked = Wallet.fromPrivateKey(PRIVATE_KEY_1, provider);
  const wallet2: WalletUnlocked = Wallet.fromPrivateKey(PRIVATE_KEY_2, provider);
  const wallet3: WalletUnlocked = Wallet.fromPrivateKey(PRIVATE_KEY_3, provider);

  const receiver = Wallet.generate({ provider });
  // #endregion

  // #region typedoc:Predicate-triple-seed
  // #context import { Provider, Wallet, TestUtils } from 'fuels';
  await TestUtils.seedWallet(wallet1, [{ assetId: NativeAssetId, amount: bn(100_000) }]);
  await TestUtils.seedWallet(wallet2, [{ assetId: NativeAssetId, amount: bn(20_000) }]);
  await TestUtils.seedWallet(wallet3, [{ assetId: NativeAssetId, amount: bn(30_000) }]);
  // #endregion

  // #region typedoc:Predicate-triple
  // #context import { Predicate, NativeAssetId } from 'fuels';
  const AbiInputs = [
    {
      type: '[b512; 3]',
      components: [
        {
          name: '__array_element',
          type: 'b512',
        },
      ],
      typeParameters: null,
    },
  ];
  const predicate = new Predicate(predicateTriple, AbiInputs);
  const amountToPredicate = 1000;
  const assetId = NativeAssetId;
  const initialPredicateBalance = await provider.getBalance(predicate.address, assetId);
  // #endregion

  // #region typedoc:Predicate-triple-transfer
  const response = await wallet1.transfer(predicate.address, amountToPredicate, assetId);
  await response.wait();
  const predicateBalance = await provider.getBalance(predicate.address, assetId);

  // assert that predicate address now has the expected amount to predicate
  expect(bn(predicateBalance)).toEqual(initialPredicateBalance.add(amountToPredicate));
  // #endregion

  // #region typedoc:Predicate-triple-submit
  await wallet1.submitPredicate(predicate.address, 200);
  const updatedPredicateBalance = await provider.getBalance(predicate.address, assetId);

  // assert that predicate address now has the updated expected amount to predicate
  expect(bn(updatedPredicateBalance)).toEqual(
    initialPredicateBalance.add(amountToPredicate).add(200)
  );
  // #endregion

  // #region typedoc:Predicate-triple-sign
  const dataToSign = '0x0000000000000000000000000000000000000000000000000000000000000000';
  const signature1 = await wallet1.signMessage(dataToSign);
  const signature2 = await wallet2.signMessage(dataToSign);
  const signature3 = await wallet3.signMessage(dataToSign);

  const signatures = [signature1, signature2, signature3];
  // #endregion

  // #region typedoc:Predicate-triple-spend
  await provider.submitSpendPredicate(predicate, updatedPredicateBalance, receiver.address, [
    signatures,
  ]);

  // check balances
  const finalPredicateBalance = await provider.getBalance(predicate.address, assetId);
  const receiverBalance = await provider.getBalance(receiver.address, assetId);

  // assert that predicate address now has a zero balance
  expect(bn(finalPredicateBalance)).toEqual(bn(0));
  // assert that predicate funds now belong to the receiver
  expect(bn(receiverBalance)).toEqual(bn(updatedPredicateBalance));
  // #endregion
});
