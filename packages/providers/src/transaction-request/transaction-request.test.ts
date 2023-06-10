import { NativeAssetId } from '@fuel-ts/address/configs';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import { toNumber } from '@fuel-ts/math';

import {
  ScriptTransactionRequest,
  transactionRequestify,
  TransactionType,
} from './transaction-request';
import type { TransactionRequestLike } from './transaction-request';
import * as utilsMod from './utils';

describe('TransactionRequest', () => {
  describe('transactionRequestify', () => {
    it('should keep data from input in transaction request created', () => {
      const script = Uint8Array.from([1, 2, 3, 4]);
      const scriptData = Uint8Array.from([5, 6]);
      const txRequestLike: TransactionRequestLike = {
        type: TransactionType.Script,
        script,
        scriptData,
        bytesOffset: 1000,
        gasPrice: 1,
        gasLimit: 10000,
        maturity: 1,
        inputs: [],
        outputs: [],
        witnesses: [],
      };
      const txRequest = transactionRequestify(txRequestLike);

      if (txRequest.type === TransactionType.Script) {
        expect(txRequest.script).toEqual(txRequestLike.script);
        expect(txRequest.scriptData).toEqual(txRequestLike.scriptData);
        expect(txRequest.bytesOffset).toEqual(txRequestLike.bytesOffset);
      }

      expect(txRequest.type).toEqual(txRequestLike.type);
      expect(toNumber(txRequest.gasPrice)).toEqual(txRequestLike.gasPrice);
      expect(toNumber(txRequest.gasLimit)).toEqual(txRequestLike.gasLimit);
      expect(txRequest.maturity).toEqual(txRequestLike.maturity);
      expect(txRequest.inputs).toEqual(txRequestLike.inputs);
      expect(txRequest.outputs).toEqual(txRequestLike.outputs);
      expect(txRequest.witnesses).toEqual(txRequestLike.witnesses);
    });

    it('should throw error if invalid transaction type', () => {
      const txRequestLike = {
        type: 5,
        gasPrice: 1,
      };

      expect(() => transactionRequestify(txRequestLike)).toThrow('Unknown transaction type: 5');
    });
  });

  describe('ScriptTransactionRequest', () => {
    afterEach(jest.restoreAllMocks);

    it('should properly setup contract transfer script request', () => {
      const script = Uint8Array.from([1, 2, 3, 4]);
      const scriptData = Uint8Array.from([4, 5, 6, 7]);

      const contractId = '0x1234567890123456789012345678901234567890';

      const amount = 1000;
      const assetId = NativeAssetId;
      const contractAddress = {
        toB256: () => contractId,
      } as unknown as AbstractAddress;

      const addContract = jest
        .spyOn(ScriptTransactionRequest.prototype, 'addContract')
        .mockImplementation();

      const setupScriptForTransferToContract = jest
        .spyOn(utilsMod, 'setupScriptForTransferToContract')
        .mockReturnValue(script);

      const setupScriptDataForTransferToContract = jest
        .spyOn(utilsMod, 'setupScriptDataForTransferToContract')
        .mockReturnValue(scriptData);

      const request = new ScriptTransactionRequest();

      request.setupContractTransferRequest(contractAddress, amount, assetId);

      expect(request.script).toStrictEqual(script);
      expect(request.scriptData).toStrictEqual(scriptData);

      expect(addContract).toHaveBeenCalledWith(contractAddress);

      expect(setupScriptForTransferToContract).toHaveBeenCalled();

      expect(setupScriptDataForTransferToContract).toHaveBeenCalledWith(
        contractId,
        amount,
        assetId
      );
    });
  });
});
