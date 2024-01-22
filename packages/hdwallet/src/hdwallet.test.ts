import HDWallet from './hdwallet';
import HDWalletSpec from './hdwallet-spec';

/**
 * @group node
 * @group browser
 */
describe('HDWallet', () => {
  test("Should throw error on invalid extended key's", () => {
    expect(() =>
      HDWallet.fromExtendedKey(
        'xpub661MyMwAqRbcEYS8w7XLSVeEsBXy79zSzH1J8vCdxAZningWLdN3zgtU6LBpB85b3D2yc8sfvZU521AAwdZafEz7mnzBBsz4wKY5fTtTQBm'
      )
    ).toThrow('Invalid public extended key');
    expect(() =>
      HDWallet.fromExtendedKey(
        'xprv9s21ZrQH143K24Mfq5zL5MhWK9hUhhGbd45hLXo2Pq2oqzMMo63oStZzFGTQQD3dC4H2D5GBj7vWvSQaaBv5cxi9gafk7NF3pnBju6dwKvH'
      )
    ).toThrow('Invalid private extended key');
    expect(() =>
      HDWallet.fromExtendedKey(
        'xpub661MyMwAqRbcEYS8w7XLSVeEsBXy79zSzH1J8vCdxAZningWLdN3zgtU6Txnt3siSujt9RCVYsx4qHZGc62TG4McvMGcAUjeuwZdduYEvFn'
      )
    ).toThrow('Invalid public extended key');
    expect(() =>
      HDWallet.fromExtendedKey(
        'xprv9s21ZrQH143K24Mfq5zL5MhWK9hUhhGbd45hLXo2Pq2oqzMMo63oStZzFGpWnsj83BHtEy5Zt8CcDr1UiRXuWCmTQLxEK9vbz5gPstX92JQ'
      )
    ).toThrow('Invalid private extended key');
    expect(() =>
      HDWallet.fromExtendedKey(
        'xpub661MyMwAqRbcEYS8w7XLSVeEsBXy79zSzH1J8vCdxAZningWLdN3zgtU6N8ZMMXctdiCjxTNq964yKkwrkBJJwpzZS4HS2fxvyYUA4q2Xe4'
      )
    ).toThrow('Invalid public extended key');
    expect(() =>
      HDWallet.fromExtendedKey(
        'xprv9s21ZrQH143K24Mfq5zL5MhWK9hUhhGbd45hLXo2Pq2oqzMMo63oStZzFAzHGBP2UuGCqWLTAPLcMtD9y5gkZ6Eq3Rjuahrv17fEQ3Qen6J'
      )
    ).toThrow('Invalid private extended key');
    expect(() =>
      HDWallet.fromExtendedKey(
        'xprv9s2SPatNQ9Vc6GTbVMFPFo7jsaZySyzk7L8n2uqKXJen3KUmvQNTuLh3fhZMBoG3G4ZW1N2kZuHEPY53qmbZzCHshoQnNf4GvELZfqTUrcv'
      )
    ).toThrow('Inconsistency detected: Depth is zero but fingerprint/index is non-zero.');
    expect(() =>
      HDWallet.fromExtendedKey(
        'xpub661no6RGEX3uJkY4bNnPcw4URcQTrSibUZ4NqJEw5eBkv7ovTwgiT91XX27VbEXGENhYRCf7hyEbWrR3FewATdCEebj6znwMfQkhRYHRLpJ'
      )
    ).toThrow('Inconsistency detected: Depth is zero but fingerprint/index is non-zero.');
    expect(() =>
      HDWallet.fromExtendedKey(
        'xprv9s21ZrQH4r4TsiLvyLXqM9P7k1K3EYhA1kkD6xuquB5i39AU8KF42acDyL3qsDbU9NmZn6MsGSUYZEsuoePmjzsB3eFKSUEh3Gu1N3cqVUN'
      )
    ).toThrow('Inconsistency detected: Depth is zero but fingerprint/index is non-zero.');
    expect(() =>
      HDWallet.fromExtendedKey(
        'xpub661MyMwAuDcm6CRQ5N4qiHKrJ39Xe1R1NyfouMKTTWcguwVcfrZJaNvhpebzGerh7gucBvzEQWRugZDuDXjNDRmXzSZe4c7mnTK97pTvGS8'
      )
    ).toThrow('Inconsistency detected: Depth is zero but fingerprint/index is non-zero.');
    expect(() =>
      HDWallet.fromExtendedKey(
        'DMwo58pR1QLEFihHiXPVykYB6fJmsTeHvyTp7hRThAtCX8CvYzgPcn8XnmdfHGMQzT7ayAmfo4z3gY5KfbrZWZ6St24UVf2Qgo6oujFktLHdHY4'
      )
    ).toThrow('Provided key is not a valid extended key.');
    expect(() =>
      HDWallet.fromExtendedKey(
        'DMwo58pR1QLEFihHiXPVykYB6fJmsTeHvyTp7hRThAtCX8CvYzgPcn8XnmdfHPmHJiEDXkTiJTVV9rHEBUem2mwVbbNfvT2MTcAqj3nesx8uBf9'
      )
    ).toThrow('Provided key is not a valid extended key.');
    expect(() =>
      HDWallet.fromExtendedKey(
        'xprv9s21ZrQH143K24Mfq5zL5MhWK9hUhhGbd45hLXo2Pq2oqzMMo63oStZzF93Y5wvzdUayhgkkFoicQZcP3y52uPPxFnfoLZB21Teqt1VvEHx'
      )
    ).toThrowError();
    expect(() =>
      HDWallet.fromExtendedKey(
        'xprv9s21ZrQH143K24Mfq5zL5MhWK9hUhhGbd45hLXo2Pq2oqzMMo63oStZzFAzHGBP2UuGCqWLTAPLcMtD5SDKr24z3aiUvKr9bJpdrcLg1y3G'
      )
    ).toThrowError();
    expect(() =>
      HDWallet.fromExtendedKey(
        'xpub661MyMwAqRbcEYS8w7XLSVeEsBXy79zSzH1J8vCdxAZningWLdN3zgtU6Q5JXayek4PRsn35jii4veMimro1xefsM58PgBMrvdYre8QyULY'
      )
    ).toThrow('Invalid public extended key');
  });

  describe('Derive from seed key', () => {
    const spec = HDWalletSpec.bip32AccountsFromSeed;
    const hdwallet = HDWallet.fromSeed(spec.seed);

    spec.accounts.forEach((account) => {
      test(`Derive path ${account.path} should match public and private keys`, () => {
        const childWallet = hdwallet.derivePath(account.path);
        expect(childWallet.publicKey).toBe(account.publicKey);
        expect(childWallet.privateKey).toBe(account.privateKey);
      });
    });
  });

  describe('Extended Keys from Seed', () => {
    const specs = HDWalletSpec.extendedKeysFromSeed;

    specs.forEach((spec) => {
      const hdwallet = HDWallet.fromSeed(spec.seed);
      spec.extendedKeys.forEach((extendedkey) => {
        test(`Derive path ${extendedkey.path} should match public and private keys`, () => {
          const childWallet = hdwallet.derivePath(extendedkey.path);
          expect(childWallet.toExtendedKey(true)).toBe(extendedkey.xpub);
          expect(childWallet.extendedKey).toBe(extendedkey.xprv);
        });
      });
    });
  });

  describe('Extended Keys from Extended Public Key', () => {
    const specs = HDWalletSpec.extendedKeysFromXPUB;

    specs.forEach((spec) => {
      const hdwallet = HDWallet.fromExtendedKey(spec.bip32_xpub);
      spec.accounts.forEach((account) => {
        test(`Derive path ${account.path} should match public keys and xpub`, () => {
          const childWallet = hdwallet.derivePath(account.path);
          expect(childWallet.publicKey).toBe(account.publicKey);
          expect(childWallet.extendedKey).toBe(account.xpub);
        });
      });
    });
  });
});
