import { Base58 } from '@ethersproject/basex';
import { BigNumber } from '@ethersproject/bignumber';
import type { BytesLike } from '@ethersproject/bytes';
import { hexDataSlice, hexlify, concat, hexZeroPad, arrayify } from '@ethersproject/bytes';
import { computeHmac, ripemd160, sha256, SupportedAlgorithm } from '@ethersproject/sha2';
import Mnemonic from '@fuel-ts/mnemonic';
import Signer from '@fuel-ts/signer';

// "Bitcoin seed"
const HARDENED_INDEX = 0x80000000;

// 4 byte: version bytes (mainnet: 0x0488B21E public, 0x0488ADE4 private; testnet: 0x043587CF public, 0x04358394 private)
const MainnetPRV = hexlify('0x0488ade4');
const MainnetPUB = hexlify('0x0488b21e');
const TestnetPRV = hexlify('0x04358394');
const TestnetPUB = hexlify('0x043587cf');

function base58check(data: Uint8Array): string {
  return Base58.encode(concat([data, hexDataSlice(sha256(sha256(data)), 0, 4)]));
}

function getExtendedKeyPrefix(isPublic: boolean = false, testnet: boolean = false) {
  if (isPublic) {
    return testnet ? TestnetPUB : MainnetPUB;
  }
  return testnet ? TestnetPRV : MainnetPRV;
}

function isPublicExtendedKey(extendedKey: Uint8Array) {
  return [MainnetPUB, TestnetPUB].includes(hexlify(extendedKey.slice(0, 4)));
}

function isValidExtendedKey(extendedKey: Uint8Array) {
  return [MainnetPRV, TestnetPRV, MainnetPUB, TestnetPUB].includes(
    hexlify(extendedKey.slice(0, 4))
  );
}

function parsePath(path: string, depth: number = 0) {
  const components = path.split('/');

  if (components.length === 0 || (components[0] === 'm' && depth !== 0)) {
    throw new Error(`invalid path - ${path}`);
  }

  if (components[0] === 'm') {
    components.shift();
  }

  return components.map((p) =>
    ~p.indexOf(`'`) ? parseInt(p, 10) + HARDENED_INDEX : parseInt(p, 10)
  );
}

export function to4Bytes(v: number) {
  const data = new Uint8Array(4);

  for (let i = 24; i >= 0; i -= 8) {
    data[0 + (i >> 3)] = (v >> (24 - i)) & 0xff;
  }

  return data;
}

type HDWalletConfig = {
  privateKey?: BytesLike;
  publicKey?: BytesLike;
  chainCode: BytesLike;

  depth?: number;
  path?: string;
  index?: number;
  parentFingerprint?: string;
};

class HDWallet {
  depth: number = 0;
  path: string = '';
  index: number = 0;
  fingerprint: string = hexlify('0x00000000');
  parentFingerprint: string = hexlify('0x00000000');
  privateKey?: string;
  publicKey: string;
  chainCode: BytesLike;

  constructor(config: HDWalletConfig) {
    // TODO: set some asserts here

    if (config.privateKey) {
      const signer = new Signer(config.privateKey);
      this.publicKey = hexlify(signer.compressedPublicKey);
      this.privateKey = hexlify(config.privateKey);
    } else {
      if (!config.publicKey) {
        throw new Error('Public and Private Key are missing!');
      }
      this.publicKey = hexlify(config.publicKey);
    }

    this.parentFingerprint = config.parentFingerprint || this.parentFingerprint;
    this.fingerprint = hexDataSlice(ripemd160(sha256(this.publicKey)), 0, 4);
    this.depth = config.depth || this.depth;
    this.index = config.index || this.index;
    this.chainCode = config.chainCode;
  }

  static fromSeed(seed: string) {
    const masterKey = Mnemonic.masterKeysFromSeed(seed);

    return new HDWallet({
      chainCode: arrayify(masterKey.slice(32)),
      privateKey: arrayify(masterKey.slice(0, 32)),
    });
  }

  get extendedKey() {
    return this.toExtendedKey();
  }

  deriveIndex(index: number) {
    const privateKey = this.privateKey && arrayify(this.privateKey);
    const publicKey = arrayify(this.publicKey);
    const chainCode = arrayify(this.chainCode);
    const data = new Uint8Array(37);

    if (index & HARDENED_INDEX) {
      if (!privateKey) {
        throw new Error('Derive hardened requires privateKey');
      }

      // 33 bytes: 0x00 || private key
      data.set(privateKey, 1);
    } else {
      data.set(arrayify(this.publicKey));
    }

    // child number: ser32(i)
    data.set(to4Bytes(index), 33);

    const bytes = arrayify(computeHmac(SupportedAlgorithm.sha512, chainCode, data));
    const IL = bytes.slice(0, 32);
    const IR = bytes.slice(32);

    if (privateKey) {
      const N = BigNumber.from(
        '0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141'
      );
      // Child key ki is parse256(IL) + kpar (mod n).
      const ki = arrayify(hexZeroPad(hexlify(BigNumber.from(IL).add(privateKey).mod(N)), 32));

      return new HDWallet({
        privateKey: ki,
        chainCode: IR,
        index,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint,
      });
    }

    const signer = new Signer(hexlify(IL));
    const Ki = signer.addPoint(publicKey);

    return new HDWallet({
      publicKey: Ki,
      chainCode: IR,
      index,
      depth: this.depth + 1,
      parentFingerprint: this.fingerprint,
    });
  }

  derivePath(path: string) {
    const paths = parsePath(path, this.depth);

    return paths.reduce((hdwallet, index) => hdwallet.deriveIndex(index), <HDWallet>this);
  }

  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param isPublic - enable to export public extendedKey, it not required when HDWallet didn't have the privateKey.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  toExtendedKey(isPublic: boolean = false, testnet: boolean = false): string {
    if (this.depth >= 256) {
      throw new Error('Depth too large!');
    }
    const prefix = getExtendedKeyPrefix(this.privateKey == null || isPublic, testnet);
    const depth = hexlify(this.depth);
    const parentFingerprint = this.parentFingerprint;
    const index = hexZeroPad(hexlify(this.index), 4);
    // last 32 bites from the key
    const chainCode = this.chainCode;
    // first 32 bites from the key
    const key =
      this.privateKey != null && !isPublic ? concat(['0x00', this.privateKey]) : this.publicKey;
    const extendedKey = concat([prefix, depth, parentFingerprint, index, chainCode, key]);

    return base58check(extendedKey);
  }

  static fromExtendedKey(extendedKey: string) {
    const bytes = Base58.decode(extendedKey);
    const validChecksum = base58check(bytes.slice(0, 78)) === extendedKey;

    if (bytes.length !== 82 || !isValidExtendedKey(bytes)) {
      throw new Error('Invalid extended key');
    }
    if (!validChecksum) throw new Error('Invalid checksum key');

    const depth = bytes[4];
    const parentFingerprint = hexlify(bytes.slice(5, 9));
    const index = parseInt(hexlify(bytes.slice(9, 13)).substring(2), 16);
    const chainCode = hexlify(bytes.slice(13, 45));
    const key = bytes.slice(45, 78);

    if ((depth === 0 && parentFingerprint !== '0x00000000') || (depth === 0 && index !== 0)) {
      throw new Error('Invalid depth');
    }

    if (isPublicExtendedKey(bytes)) {
      if (key[0] !== 3) {
        throw new Error('Invalid public extended key');
      }

      return new HDWallet({
        publicKey: key,
        chainCode,
        index,
        depth,
        parentFingerprint,
      });
    }

    if (key[0] !== 0) {
      throw new Error('Invalid private extended key');
    }

    return new HDWallet({
      privateKey: key.slice(1),
      chainCode,
      index,
      depth,
      parentFingerprint,
    });
  }
}

export default HDWallet;
