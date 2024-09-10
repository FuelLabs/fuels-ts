import { bn } from '@fuel-ts/math';
import { InputType } from '@fuel-ts/transactions';

import { BlobTransactionRequest } from './blob-transaction-request';
import { CreateTransactionRequest } from './create-transaction-request';
import { ScriptTransactionRequest } from './script-transaction-request';
import { isTransactionTypeBlob, isTransactionTypeCreate, isTransactionTypeScript } from './utils';

/**
 * @group node
 * @group browser
 */
describe('isTransactionTypeScript', () => {
  it('should return true if the request is a script transaction', () => {
    const request = new ScriptTransactionRequest();
    expect(isTransactionTypeScript(request)).toBe(true);
  });

  it('should return false if the request is not a script transaction', () => {
    const request = new CreateTransactionRequest({});
    expect(isTransactionTypeScript(request)).toBe(false);
  });
});

describe('isTransactionTypeCreate', () => {
  it('should return true if the request is a create transaction', () => {
    const request = new CreateTransactionRequest({});
    expect(isTransactionTypeCreate(request)).toBe(true);
  });

  it('should return false if the request is not a create transaction', () => {
    const request = new ScriptTransactionRequest();
    expect(isTransactionTypeCreate(request)).toBe(false);
  });
});

describe('isTransactionTypeBlob', () => {
  it('should return true if the request is a blob transaction', () => {
    const request = new BlobTransactionRequest({ blobId: '0x' });
    expect(isTransactionTypeBlob(request)).toBe(true);
  });

  it('should return false if the request is not a blob transaction', () => {
    const request = new ScriptTransactionRequest();
    expect(isTransactionTypeCreate(request)).toBe(false);
  });
});

describe('transactionRequestify', () => {
  it('from method should return a cloned script transaction request', () => {
    const baseRequest = new ScriptTransactionRequest();
    const newRequest = ScriptTransactionRequest.from(baseRequest);
    newRequest.inputs.push({
      amount: bn(1),
      id: '0x',
      owner: '0x',
      txPointer: '0x',
      witnessIndex: 0,
      type: InputType.Coin,
      assetId: '0x',
    });
    baseRequest.inputs.push({
      amount: bn(10),
      id: '0x123',
      owner: '0x456',
      txPointer: '0x789',
      witnessIndex: 1,
      type: InputType.Coin,
      assetId: '0xabc',
    });
    expect(newRequest).to.not.equal(baseRequest);
    expect(newRequest.inputs).to.not.equal(baseRequest.inputs);
    expect(newRequest.inputs).toHaveLength(1);
    expect(baseRequest.inputs).toHaveLength(1);
  });

  it('from method should return a cloned create transaction request', () => {
    const baseRequest = new CreateTransactionRequest({});
    const newRequest = CreateTransactionRequest.from(baseRequest);
    newRequest.inputs.push({
      amount: bn(1),
      id: '0x',
      owner: '0x',
      txPointer: '0x',
      witnessIndex: 0,
      type: InputType.Coin,
      assetId: '0x',
    });
    baseRequest.inputs.push({
      amount: bn(10),
      id: '0x123',
      owner: '0x456',
      txPointer: '0x789',
      witnessIndex: 1,
      type: InputType.Coin,
      assetId: '0xabc',
    });

    expect(newRequest).to.not.equal(baseRequest);
    expect(newRequest.inputs).to.not.equal(baseRequest.inputs);
    expect(newRequest.inputs).toHaveLength(1);
    expect(baseRequest.inputs).toHaveLength(1);
  });

  it('from method should return a cloned blob transaction request', () => {
    const baseRequest = new BlobTransactionRequest({ blobId: '0x' });
    const newRequest = BlobTransactionRequest.from(baseRequest);
    newRequest.inputs.push({
      amount: bn(1),
      id: '0x',
      owner: '0x',
      txPointer: '0x',
      witnessIndex: 0,
      type: InputType.Coin,
      assetId: '0x',
    });
    baseRequest.inputs.push({
      amount: bn(10),
      id: '0x123',
      owner: '0x456',
      txPointer: '0x789',
      witnessIndex: 1,
      type: InputType.Coin,
      assetId: '0xabc',
    });

    expect(newRequest).to.not.equal(baseRequest);
    expect(newRequest.inputs).to.not.equal(baseRequest.inputs);
    expect(newRequest.inputs).toHaveLength(1);
    expect(baseRequest.inputs).toHaveLength(1);
  });
});
