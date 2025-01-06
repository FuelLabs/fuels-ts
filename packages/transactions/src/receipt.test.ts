import { BigNumberCoder } from '@fuel-ts/abi-coder';
import { getRandomB256 } from '@fuel-ts/address';
import { sha256 } from '@fuel-ts/hasher';
import type { AssetId } from '@fuel-ts/interfaces';
import { bn } from '@fuel-ts/math';
import { arrayify, concat } from '@fuel-ts/utils';

import { ByteArrayCoder } from './coders/byte-array';
import { getMintedAssetId, createAssetId, getMessageId } from './receipt';

describe('getMintedAssetId', () => {
  it('should returns expected hashed asset ID', () => {
    const contractId = getRandomB256();
    const subId = getRandomB256();

    const contractIdBytes = arrayify(contractId);
    const subIdBytes = arrayify(subId);

    const expected = sha256(concat([contractIdBytes, subIdBytes]));
    const actual = getMintedAssetId(contractId, subId);

    expect(expected).toBe(actual);
  });
});

describe('createAssetId', () => {
  it('returns should returns expected wrapped AssetID type', () => {
    const contractId = getRandomB256();
    const subId = getRandomB256();

    const contractIdBytes = arrayify(contractId);
    const subIdBytes = arrayify(subId);

    const expected: AssetId = { bits: sha256(concat([contractIdBytes, subIdBytes])) };
    const actual = createAssetId(contractId, subId);

    expect(expected).toStrictEqual(actual);
  });
});

describe('getMessageId', () => {
  it('should returns expected hash (W DATA)', () => {
    const sender = getRandomB256();
    const recipient = getRandomB256();
    const nonce = getRandomB256();
    const amount = bn(100);
    const data = arrayify(getRandomB256());

    const parts: Uint8Array[] = [];

    parts.push(new ByteArrayCoder(32).encode(sender));
    parts.push(new ByteArrayCoder(32).encode(recipient));
    parts.push(new ByteArrayCoder(32).encode(nonce));
    parts.push(new BigNumberCoder('u64').encode(amount));
    parts.push(data);

    const expected = sha256(concat(parts));
    const actual = getMessageId({ sender, recipient, nonce, amount, data });

    expect(expected).toStrictEqual(actual);
  });

  it('should returns expected hash (W/O DATA)', () => {
    const sender = getRandomB256();
    const recipient = getRandomB256();
    const nonce = getRandomB256();
    const amount = bn(100);
    const data = arrayify('0x');

    const parts: Uint8Array[] = [];

    parts.push(new ByteArrayCoder(32).encode(sender));
    parts.push(new ByteArrayCoder(32).encode(recipient));
    parts.push(new ByteArrayCoder(32).encode(nonce));
    parts.push(new BigNumberCoder('u64').encode(amount));
    parts.push(data);

    const expected = sha256(concat(parts));
    const actual = getMessageId({ sender, recipient, nonce, amount, data });

    expect(expected).toStrictEqual(actual);
  });
});
