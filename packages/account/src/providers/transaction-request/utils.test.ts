import { BlobTransactionRequest } from './blob-transaction-request';
import { CreateTransactionRequest } from './create-transaction-request';
import { ScriptTransactionRequest } from './script-transaction-request';
import { isTransactionTypeCreate, isTransactionTypeScript } from './utils';

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
    expect(isTransactionTypeCreate(request)).toBe(true);
  });

  it('should return false if the request is not a blob transaction', () => {
    const request = new ScriptTransactionRequest();
    expect(isTransactionTypeCreate(request)).toBe(false);
  });
});
