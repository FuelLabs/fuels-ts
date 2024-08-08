import { getRandomB256 } from '@fuel-ts/address';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { bn } from '@fuel-ts/math';
import { ReceiptType, TransactionType } from '@fuel-ts/transactions';
import { ASSET_A, ASSET_B } from '@fuel-ts/utils/test-utils';

import {
  CONTRACT_CALL_ABI,
  MOCK_INPUT_COIN,
  MOCK_INPUT_CONTRACT,
  MOCK_INPUT_MESSAGE,
  MOCK_OUTPUT_CHANGE,
  MOCK_OUTPUT_COIN,
  MOCK_OUTPUT_CONTRACT,
  MOCK_OUTPUT_CONTRACT_CREATED,
  MOCK_OUTPUT_VARIABLE,
  MOCK_RECEIPT_CALL,
  MOCK_RECEIPT_MESSAGE_OUT,
  MOCK_RECEIPT_RETURN,
  MOCK_RECEIPT_RETURN_DATA_1,
  MOCK_RECEIPT_RETURN_DATA_2,
  MOCK_RECEIPT_SCRIPT_RESULT,
  MOCK_RECEIPT_TRANSFER_OUT,
  MOCK_TRANSACTION_RAWPAYLOAD,
} from '../../../test/fixtures/transaction-summary';
import type {
  TransactionResultMessageOutReceipt,
  TransactionResultReceipt,
  TransactionResultTransferOutReceipt,
} from '../transaction-response';

import { getInputAccountAddress, getInputsCoin } from './input';
import {
  addOperation,
  getContractCallOperations,
  getContractCreatedOperations,
  getOperations,
  getPayProducerOperations,
  getReceiptsCall,
  getReceiptsMessageOut,
  getReceiptsTransferOut,
  getTransactionTypeName,
  getWithdrawFromFuelOperations,
  isType,
  isTypeBlob,
  isTypeCreate,
  isTypeMint,
  isTypeScript,
} from './operations';
import type { Operation } from './types';
import { AddressType, OperationName, TransactionTypeName, ChainName } from './types';

/**
 * @group node
 */
describe('operations', () => {
  describe('getContractCallOperations', () => {
    it('should ensure getContractCallOperations return contract call operations', () => {
      const expected: Operation = {
        name: OperationName.contractCall,
        calls: [],
        from: {
          type: AddressType.account,
          address: '0x3e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b2302',
        },
        to: {
          type: AddressType.contract,
          address: '0x0a98320d39c03337401a4e46263972a9af6ce69ec2f35a5420b1bd35784c74b1',
        },
        assetsSent: [
          {
            amount: bn(100000000),
            assetId: ZeroBytes32,
          },
        ],
      };

      const receipts = [
        MOCK_RECEIPT_CALL,
        MOCK_RECEIPT_TRANSFER_OUT,
        MOCK_RECEIPT_RETURN_DATA_1,
        MOCK_RECEIPT_RETURN_DATA_2,
        MOCK_RECEIPT_SCRIPT_RESULT,
      ];

      const operations = getContractCallOperations({
        inputs: [MOCK_INPUT_CONTRACT, MOCK_INPUT_COIN],
        outputs: [MOCK_OUTPUT_CONTRACT, MOCK_OUTPUT_VARIABLE, MOCK_OUTPUT_CHANGE],
        receipts,
        maxInputs: bn(255),
        baseAssetId: ZeroBytes32,
      });

      expect(operations.length).toEqual(1);

      expect(operations[0]).toStrictEqual(expected);
    });

    // TODO: Make getOperation tests to be e2e
    it.skip('should ensure getContractCallOperations return contract call operations with calls details', () => {
      const expected: Operation = {
        name: OperationName.contractCall,
        calls: [
          {
            functionName: 'mint_to_address',
            functionSignature: 'mint_to_address(u64,s(b256),u64)',
            argumentsProvided: {
              address: {
                value: '0xa5a77a7d97c6708b08de873528ae6879ef5e9900fbc2e3f3cb74e28917bf7038',
              },
              amount: '0x64',
              amount2: '0x64',
            },
            amount: bn('0x5f5e100'),
            assetId: ZeroBytes32,
          },
        ],
        from: {
          type: AddressType.account,
          address: '0x3e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b2302',
        },
        to: {
          type: AddressType.contract,
          address: '0x0a98320d39c03337401a4e46263972a9af6ce69ec2f35a5420b1bd35784c74b1',
        },
        assetsSent: [
          {
            amount: bn(100000000),
            assetId: ZeroBytes32,
          },
        ],
      };

      const receipts: TransactionResultReceipt[] = [
        MOCK_RECEIPT_CALL,
        {
          ...MOCK_RECEIPT_CALL,
          to: '0x0000000000000000000000000000000000000000000000000000000000000000',
        },
        MOCK_RECEIPT_TRANSFER_OUT,
        MOCK_RECEIPT_RETURN_DATA_1,
        MOCK_RECEIPT_RETURN_DATA_2,
        MOCK_RECEIPT_SCRIPT_RESULT,
      ];

      const operations = getContractCallOperations({
        inputs: [MOCK_INPUT_CONTRACT, MOCK_INPUT_COIN],
        outputs: [MOCK_OUTPUT_CONTRACT, MOCK_OUTPUT_VARIABLE, MOCK_OUTPUT_CHANGE],
        receipts,
        abiMap: {
          '0x0a98320d39c03337401a4e46263972a9af6ce69ec2f35a5420b1bd35784c74b1': CONTRACT_CALL_ABI,
        },
        rawPayload: MOCK_TRANSACTION_RAWPAYLOAD,
        maxInputs: bn(255),
        baseAssetId: ZeroBytes32,
      });

      expect(operations.length).toEqual(1);
      expect(operations[0]).toStrictEqual(expected);
    });

    it('should ensure getContractCallOperations return empty', () => {
      const operations = getContractCallOperations({
        inputs: [],
        outputs: [MOCK_OUTPUT_COIN, MOCK_OUTPUT_CHANGE],
        receipts: [MOCK_RECEIPT_RETURN, MOCK_RECEIPT_SCRIPT_RESULT],
        maxInputs: bn(255),
        baseAssetId: ZeroBytes32,
      });

      expect(operations.length).toEqual(0);
    });
  });

  describe('getPayProducerOperations', () => {
    it('should ensure getPayProducerOperations return operations from transaction Create', () => {
      const operations = getPayProducerOperations([MOCK_OUTPUT_COIN]);

      const expected: Operation = {
        assetsSent: [
          {
            amount: bn('0x1'),
            assetId: ZeroBytes32,
          },
        ],
        from: {
          address: 'Network',
          type: 1,
        },
        name: OperationName.payBlockProducer,
        to: {
          address: '0xf65d6448a273b531ee942c133bb91a6f904c7d7f3104cdaf6b9f7f50d3518871',
          type: 1,
        },
      };

      expect(operations.length).toEqual(1);

      expect(operations[0]).toStrictEqual(expected);
    });

    it('should ensure getPayProducerOperations return empty', () => {
      const res1 = getPayProducerOperations([MOCK_OUTPUT_CONTRACT_CREATED, MOCK_OUTPUT_CHANGE]);

      expect(res1.length).toEqual(0);

      const res2 = getPayProducerOperations([
        MOCK_OUTPUT_CONTRACT,
        MOCK_OUTPUT_VARIABLE,
        MOCK_OUTPUT_CHANGE,
      ]);

      expect(res2.length).toEqual(0);
    });
  });

  describe('getContractCreatedOperations', () => {
    it('should ensure getContractCreatedOperations return operations from transaction Create', () => {
      const operations = getContractCreatedOperations({
        inputs: [MOCK_INPUT_COIN, MOCK_INPUT_COIN],
        outputs: [MOCK_OUTPUT_CONTRACT_CREATED, MOCK_OUTPUT_CHANGE],
      });

      const expected: Operation = {
        from: {
          address: '0x3e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b2302',
          type: 1,
        },
        name: OperationName.contractCreated,
        to: {
          address: '0xef066899413ef8dc7c3073a50868bafb3d039d9bad8006c2635b7f0efa992553',
          type: 0,
        },
      };

      expect(operations.length).toEqual(1);
      expect(operations[0]).toStrictEqual(expected);
    });

    it('should ensure getContractCreatedOperations return empty', () => {
      const operations = getContractCreatedOperations({
        inputs: [MOCK_INPUT_CONTRACT, MOCK_INPUT_COIN],
        outputs: [MOCK_OUTPUT_CONTRACT, MOCK_OUTPUT_VARIABLE, MOCK_OUTPUT_VARIABLE],
      });

      expect(operations.length).toEqual(0);
    });
  });

  describe('getWithdrawFromFuelOperations', () => {
    it('should ensure getWithdrawFromFuelOperations return withdraw from fuel operations', () => {
      const expected: Operation = {
        assetsSent: [
          {
            amount: bn('0xf4240'),
            assetId: ZeroBytes32,
          },
        ],
        from: {
          address: '0x3e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b2302',
          type: 1,
        },
        name: OperationName.withdrawFromFuel,
        to: {
          address: '0x000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266',
          chain: ChainName.ethereum,
          type: 1,
        },
      };

      const operations = getWithdrawFromFuelOperations({
        inputs: [MOCK_INPUT_COIN],
        receipts: [MOCK_RECEIPT_MESSAGE_OUT, MOCK_RECEIPT_RETURN, MOCK_RECEIPT_SCRIPT_RESULT],
        baseAssetId: ZeroBytes32,
      });

      expect(operations.length).toEqual(1);
      expect(operations[0]).toStrictEqual(expected);
    });

    it('should ensure getWithdrawFromFuelOperations return withdraw from fuel operations [NO INPUT]', () => {
      const operations = getWithdrawFromFuelOperations({
        inputs: [],
        receipts: [MOCK_RECEIPT_MESSAGE_OUT, MOCK_RECEIPT_RETURN, MOCK_RECEIPT_SCRIPT_RESULT],
        baseAssetId: ZeroBytes32,
      });

      expect(operations.length).toEqual(0);
    });

    it('should ensure getWithdrawFromFuelOperations return empty', () => {
      const operations = getWithdrawFromFuelOperations({
        inputs: [MOCK_INPUT_CONTRACT, MOCK_INPUT_COIN],
        receipts: [
          MOCK_RECEIPT_CALL,
          MOCK_RECEIPT_TRANSFER_OUT,
          MOCK_RECEIPT_RETURN_DATA_1,
          MOCK_RECEIPT_RETURN_DATA_2,
          MOCK_RECEIPT_SCRIPT_RESULT,
        ],
        baseAssetId: ZeroBytes32,
      });

      expect(operations.length).toEqual(0);
    });
  });

  describe('getOperation', () => {
    it('should getOperations return contract call and contract transfer operations', () => {
      const expected: Operation[] = [
        {
          name: OperationName.transfer,
          from: {
            type: AddressType.contract,
            address: '0x0a98320d39c03337401a4e46263972a9af6ce69ec2f35a5420b1bd35784c74b1',
          },
          to: {
            type: AddressType.account,
            address: '0x3e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b2302',
          },
          assetsSent: [
            {
              amount: bn(100000000),
              assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
            },
          ],
        },
        {
          name: OperationName.contractCall,
          calls: [],
          from: {
            type: AddressType.account,
            address: '0x3e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b2302',
          },
          to: {
            type: AddressType.contract,
            address: '0x0a98320d39c03337401a4e46263972a9af6ce69ec2f35a5420b1bd35784c74b1',
          },
          assetsSent: [
            {
              amount: bn(100000000),
              assetId: ZeroBytes32,
            },
          ],
        },
      ];

      const operations = getOperations({
        transactionType: TransactionType.Script,
        inputs: [MOCK_INPUT_CONTRACT, MOCK_INPUT_COIN],
        outputs: [MOCK_OUTPUT_CONTRACT, MOCK_OUTPUT_VARIABLE, MOCK_OUTPUT_CHANGE],
        receipts: [
          MOCK_RECEIPT_CALL,
          MOCK_RECEIPT_TRANSFER_OUT,
          MOCK_RECEIPT_RETURN_DATA_1,
          MOCK_RECEIPT_RETURN_DATA_2,
          MOCK_RECEIPT_SCRIPT_RESULT,
        ],
        maxInputs: bn(255),
        baseAssetId: ZeroBytes32,
      });
      expect(operations.length).toEqual(2);
      expect(operations).toStrictEqual(expected);
    });

    it('should getOperations return contract call operations with no assets send if amount is zero', () => {
      const expected: Operation = {
        name: OperationName.contractCall,
        calls: [],
        from: {
          type: AddressType.account,
          address: '0x3e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b2302',
        },
        to: {
          type: AddressType.contract,
          address: '0x0a98320d39c03337401a4e46263972a9af6ce69ec2f35a5420b1bd35784c74b1',
        },
        assetsSent: [
          {
            amount: bn(100000000),
            assetId: ZeroBytes32,
          },
        ],
      };

      const receiptsCallNoAmount = [
        MOCK_RECEIPT_CALL,
        MOCK_RECEIPT_TRANSFER_OUT,
        MOCK_RECEIPT_RETURN_DATA_1,
        MOCK_RECEIPT_RETURN_DATA_2,
        MOCK_RECEIPT_SCRIPT_RESULT,
      ].map((receipt) => {
        if (receipt.type === ReceiptType.Call) {
          return { ...receipt, amount: bn(0) };
        }

        return receipt;
      });

      const operationsCallNoAmount: Operation = {
        ...expected,
        assetsSent: undefined,
      };

      const operations = getOperations({
        transactionType: TransactionType.Script,
        inputs: [MOCK_INPUT_CONTRACT, MOCK_INPUT_COIN],
        outputs: [MOCK_OUTPUT_CONTRACT, MOCK_OUTPUT_VARIABLE, MOCK_OUTPUT_CHANGE],
        receipts: receiptsCallNoAmount,
        maxInputs: bn(255),
        baseAssetId: ZeroBytes32,
      });

      expect(operations.length).toEqual(2);
      expect(operations[1]).toStrictEqual(operationsCallNoAmount); // contract call
    });

    it('should getOperations return transfer operations from coin input', () => {
      const expected: Operation = {
        assetsSent: [
          {
            amount: bn('0x1'),
            assetId: ZeroBytes32,
          },
        ],
        from: {
          address: '0x3e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b2302',
          type: 1,
        },
        name: OperationName.transfer,
        to: {
          address: '0xf65d6448a273b531ee942c133bb91a6f904c7d7f3104cdaf6b9f7f50d3518871',
          type: 1,
        },
      };

      const operations = getOperations({
        transactionType: TransactionType.Script,
        inputs: [MOCK_INPUT_COIN, MOCK_INPUT_COIN],
        outputs: [MOCK_OUTPUT_COIN, MOCK_OUTPUT_CHANGE],
        receipts: [MOCK_RECEIPT_RETURN, MOCK_RECEIPT_SCRIPT_RESULT],
        maxInputs: bn(255),
        baseAssetId: ZeroBytes32,
      });
      expect(operations.length).toEqual(1);

      expect(operations[0]).toStrictEqual(expected);
    });

    it('should getOperations return transfer operations from message input', () => {
      const sender = '0x06300e686a5511c7ba0399fc68dcbe0ca2d8f54f7e6afea73c505dd3bcacf33b';

      const expected: Operation = {
        assetsSent: [
          {
            amount: bn('0x1'),
            assetId: ZeroBytes32,
          },
        ],
        from: {
          address: sender,
          type: 1,
        },
        name: OperationName.transfer,
        to: {
          address: '0xf65d6448a273b531ee942c133bb91a6f904c7d7f3104cdaf6b9f7f50d3518871',
          type: 1,
        },
      };

      const operations = getOperations({
        transactionType: TransactionType.Script,
        inputs: [MOCK_INPUT_MESSAGE, MOCK_INPUT_MESSAGE],
        outputs: [MOCK_OUTPUT_COIN, { ...MOCK_OUTPUT_CHANGE, to: sender }],
        receipts: [MOCK_RECEIPT_RETURN, MOCK_RECEIPT_SCRIPT_RESULT],
        maxInputs: bn(255),
        baseAssetId: ZeroBytes32,
      });

      expect(operations.length).toEqual(1);
      expect(operations[0]).toStrictEqual(expected);
    });

    it('should getOperations return mint operations', () => {
      const expected: Operation = {
        assetsSent: [
          {
            amount: bn('0x1'),
            assetId: ZeroBytes32,
          },
        ],
        from: {
          address: 'Network',
          type: 1,
        },
        name: OperationName.payBlockProducer,
        to: {
          address: '0xf65d6448a273b531ee942c133bb91a6f904c7d7f3104cdaf6b9f7f50d3518871',
          type: 1,
        },
      };
      const operations = getOperations({
        transactionType: TransactionType.Mint,
        inputs: [],
        outputs: [MOCK_OUTPUT_COIN],
        receipts: [],
        maxInputs: bn(255),
        baseAssetId: ZeroBytes32,
      });

      expect(operations.length).toEqual(1);
      expect(operations[0]).toStrictEqual(expected);
    });

    it('should getOperations return contract created operations', () => {
      const expected: Operation = {
        from: {
          address: '0x3e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b2302',
          type: 1,
        },
        name: OperationName.contractCreated,
        to: {
          address: '0xef066899413ef8dc7c3073a50868bafb3d039d9bad8006c2635b7f0efa992553',
          type: 0,
        },
      };
      const operations = getOperations({
        transactionType: TransactionType.Create,
        inputs: [MOCK_INPUT_COIN, MOCK_INPUT_COIN],
        outputs: [MOCK_OUTPUT_CONTRACT_CREATED, MOCK_OUTPUT_CHANGE],
        receipts: [],
        maxInputs: bn(255),
        baseAssetId: ZeroBytes32,
      });

      expect(operations.length).toEqual(1);
      expect(operations[0]).toStrictEqual(expected);
    });

    it('should getOperations return contract created operations with input type message', () => {
      const expected: Operation = {
        from: {
          address: '0x06300e686a5511c7ba0399fc68dcbe0ca2d8f54f7e6afea73c505dd3bcacf33b',
          type: 1,
        },
        name: OperationName.contractCreated,
        to: {
          address: '0xef066899413ef8dc7c3073a50868bafb3d039d9bad8006c2635b7f0efa992553',
          type: 0,
        },
      };
      const operations = getOperations({
        transactionType: TransactionType.Create,
        inputs: [MOCK_INPUT_MESSAGE],
        outputs: [MOCK_OUTPUT_CONTRACT_CREATED, MOCK_OUTPUT_CHANGE],
        receipts: [],
        maxInputs: bn(255),
        baseAssetId: ZeroBytes32,
      });

      expect(operations.length).toEqual(1);
      expect(operations[0]).toStrictEqual(expected);
    });
  });

  describe('addOperation', () => {
    const coinInput = getInputsCoin([MOCK_INPUT_COIN, MOCK_INPUT_COIN]);

    const fromAddress = getInputAccountAddress(coinInput[0]);

    const OPERATION_CONTRACT_CALL = {
      name: OperationName.contractCall,
      from: {
        type: AddressType.account,
        address: fromAddress,
      },
      to: {
        type: AddressType.contract,
        address: '0x0000000000000000000000000000000000000001',
      },
      assetsSent: [
        {
          assetId: '0x0000000000000000000000000000000000000000',
          amount: bn(100000),
        },
      ],
      calls: [
        {
          functionSignature: 'entry_one(u64)',
          functionName: 'entry_one',
          argumentsProvided: {
            amount: bn(100000),
          },
        },
      ],
    };

    const OPERATION_TRANSFER = {
      name: OperationName.transfer,
      from: {
        type: 1,
        address: getRandomB256(),
      },
      to: {
        type: 1,
        address: getRandomB256(),
      },
      assetsSent: [
        {
          assetId: ASSET_A,
          amount: bn(100),
        },
      ],
    };

    it('should just add operation when its the first one', () => {
      const operations = addOperation([], OPERATION_CONTRACT_CALL);
      expect(operations.length).toEqual(1);
      expect(operations[0]).toStrictEqual(OPERATION_CONTRACT_CALL);
    });

    it('should not stack operations with different name / from / to', () => {
      const baseOperations = addOperation([], OPERATION_CONTRACT_CALL);
      const operationsDifName = addOperation(baseOperations, {
        ...OPERATION_CONTRACT_CALL,
        name: OperationName.contractCreated,
      });
      const operationsEmptyName = addOperation(baseOperations, {
        ...OPERATION_CONTRACT_CALL,
        name: undefined,
      });
      const operationsDifFrom = addOperation(baseOperations, {
        ...OPERATION_CONTRACT_CALL,
        from: {
          ...OPERATION_CONTRACT_CALL.from,
          address: '0x0000000000000000000000000000000000000002',
        },
      });
      const operationsEmptyFrom = addOperation(baseOperations, {
        ...OPERATION_CONTRACT_CALL,
        from: undefined,
      });
      const operationsDifTo = addOperation(baseOperations, {
        ...OPERATION_CONTRACT_CALL,
        to: {
          ...OPERATION_CONTRACT_CALL.to,
          address: '0x0000000000000000000000000000000000000002',
        },
      });
      const operationsEmptyTo = addOperation(baseOperations, {
        ...OPERATION_CONTRACT_CALL,
        to: undefined,
      });

      expect(operationsDifName.length).toEqual(2);
      expect(operationsEmptyName.length).toEqual(2);
      expect(operationsDifFrom.length).toEqual(2);
      expect(operationsEmptyFrom.length).toEqual(2);
      expect(operationsDifTo.length).toEqual(2);
      expect(operationsEmptyTo.length).toEqual(2);
    });

    it('should return prev operation if no asset is sent to add', () => {
      const baseOperations = addOperation([], OPERATION_CONTRACT_CALL);
      const operationsAddedSameAsset = addOperation(baseOperations, {
        ...OPERATION_CONTRACT_CALL,
        assetsSent: undefined,
      });

      expect(operationsAddedSameAsset.length).toEqual(1);
      expect(JSON.parse(JSON.stringify(operationsAddedSameAsset[0].assetsSent))).toEqual(
        JSON.parse(JSON.stringify(baseOperations[0].assetsSent))
      );
    });

    it('should stack when same asset is added', () => {
      const baseOperations = addOperation([], OPERATION_CONTRACT_CALL);
      const operationsAddedSameAsset = addOperation(baseOperations, OPERATION_CONTRACT_CALL);
      expect(operationsAddedSameAsset.length).toEqual(1);
      expect(operationsAddedSameAsset[0].assetsSent?.[0]?.amount.valueOf()).toEqual(
        OPERATION_CONTRACT_CALL.assetsSent[0].amount.mul(2).valueOf()
      );
      expect(operationsAddedSameAsset[0].assetsSent?.[0]?.assetId).toEqual(
        OPERATION_CONTRACT_CALL.assetsSent[0].assetId
      );
    });

    it('should stack when same asset is added together with a different asset [CONTRACT-CALL]', () => {
      const DIF_ASSET_ID = '0x0012300000000000000000000000000000000001';
      const operationTwoAssets: Operation = {
        ...OPERATION_CONTRACT_CALL,
        assetsSent: [
          {
            ...OPERATION_CONTRACT_CALL.assetsSent[0],
          },
          {
            ...OPERATION_CONTRACT_CALL.assetsSent[0],
            assetId: DIF_ASSET_ID,
          },
        ],
      };

      const baseOperations = addOperation([], OPERATION_CONTRACT_CALL);
      const operationsAddedSameAsset = addOperation(baseOperations, operationTwoAssets);
      expect(operationsAddedSameAsset.length).toEqual(1);
      expect(operationsAddedSameAsset[0].assetsSent?.[0]?.amount.valueOf()).toEqual(
        OPERATION_CONTRACT_CALL.assetsSent[0].amount.mul(2).valueOf()
      );
      expect(operationsAddedSameAsset[0].assetsSent?.[0]?.assetId).toEqual(
        OPERATION_CONTRACT_CALL.assetsSent[0].assetId
      );
      expect(operationsAddedSameAsset[0].assetsSent?.[1]?.amount.valueOf()).toEqual(
        OPERATION_CONTRACT_CALL.assetsSent[0].amount.valueOf()
      );
      expect(operationsAddedSameAsset[0].assetsSent?.[1]?.assetId).toEqual(DIF_ASSET_ID);
    });

    it('ensure operation asset transfer stacks multiple assetSents between same addresses', () => {
      const operationOne: Operation = {
        ...OPERATION_TRANSFER,
        assetsSent: [
          {
            assetId: ASSET_A,
            amount: bn(100),
          },
        ],
      };

      const operationTwo: Operation = {
        ...OPERATION_TRANSFER,
        assetsSent: [
          {
            assetId: ASSET_B,
            amount: bn(200),
          },
        ],
      };

      const baseOperations = addOperation([], operationOne);
      const stackedOperation = addOperation(baseOperations, operationTwo);

      expect(stackedOperation.length).toEqual(1);
      expect(stackedOperation[0].assetsSent?.length).toEqual(2);
      expect(stackedOperation[0].assetsSent?.[0]?.amount.valueOf()).toEqual(
        operationOne.assetsSent?.[0]?.amount.valueOf()
      );
      expect(stackedOperation[0].assetsSent?.[0]?.assetId).toEqual(
        operationOne.assetsSent?.[0].assetId
      );
      expect(stackedOperation[0].assetsSent?.[1]?.amount.valueOf()).toEqual(
        operationTwo.assetsSent?.[0]?.amount.valueOf()
      );
      expect(stackedOperation[0].assetsSent?.[1]?.assetId).toEqual(
        operationTwo.assetsSent?.[0].assetId
      );
    });

    it('ensure operation asset transfer does not stack multiple assetSents between different addresses', () => {
      const fromOne = getRandomB256();
      const fromTwo = getRandomB256();
      const toAddress2 = getRandomB256();

      const operationOne: Operation = {
        ...OPERATION_TRANSFER,
        from: {
          address: fromOne,
          type: 1,
        },
        to: {
          address: toAddress2,
          type: 1,
        },
        assetsSent: [
          {
            assetId: ASSET_A,
            amount: bn(100),
          },
        ],
      };

      const operationTwo: Operation = {
        ...OPERATION_TRANSFER,
        from: {
          address: fromTwo,
          type: 1,
        },
        to: {
          address: toAddress2,
          type: 1,
        },
        assetsSent: [
          {
            assetId: ASSET_B,
            amount: bn(200),
          },
        ],
      };

      const baseOperation = addOperation([], operationOne);
      const multipleOperations = addOperation(baseOperation, operationTwo);

      expect(multipleOperations.length).toEqual(2);
      expect(multipleOperations[0].assetsSent?.length).toEqual(1);
      expect(multipleOperations[0].assetsSent?.[0]?.amount.valueOf()).toEqual(
        operationOne.assetsSent?.[0]?.amount.valueOf()
      );
      expect(multipleOperations[0].assetsSent?.[0]?.assetId).toEqual(
        operationOne.assetsSent?.[0].assetId
      );
      expect(multipleOperations[1].assetsSent?.length).toEqual(1);
      expect(multipleOperations[1].assetsSent?.[0]?.amount.valueOf()).toEqual(
        operationTwo.assetsSent?.[0]?.amount.valueOf()
      );
      expect(multipleOperations[1].assetsSent?.[0]?.assetId).toEqual(
        operationTwo.assetsSent?.[0].assetId
      );
    });

    it('should always not stack for contract calls', () => {
      const baseOperations = addOperation([], OPERATION_CONTRACT_CALL);
      const operationsAddedSameContractCall = addOperation(baseOperations, OPERATION_CONTRACT_CALL);
      expect(operationsAddedSameContractCall.length).toEqual(1);
      expect(operationsAddedSameContractCall[0].calls?.length).toEqual(2);
    });
  });

  describe('isType', () => {
    it('should isType return by type', () => {
      expect(isType(TransactionType.Create, TransactionTypeName.Create)).toBeTruthy();
      expect(isType(TransactionType.Script, TransactionTypeName.Script)).toBeTruthy();
      expect(isType(TransactionType.Mint, TransactionTypeName.Mint)).toBeTruthy();
      expect(isType(TransactionType.Script, TransactionTypeName.Create)).toBeFalsy();
      expect(isType(TransactionType.Mint, TransactionTypeName.Script)).toBeFalsy();
      expect(isType(TransactionType.Create, TransactionTypeName.Mint)).toBeFalsy();
      expect(isType(TransactionType.Blob, TransactionTypeName.Blob)).toBeTruthy();
    });

    it('should isTypeMint return if is mint', () => {
      expect(isTypeMint(TransactionType.Mint)).toBeTruthy();
      expect(isTypeMint(TransactionType.Script)).toBeFalsy();
      expect(isTypeMint(TransactionType.Create)).toBeFalsy();
    });

    it('should isTypeCreate return if is create', () => {
      expect(isTypeCreate(TransactionType.Create)).toBeTruthy();
      expect(isTypeCreate(TransactionType.Script)).toBeFalsy();
      expect(isTypeCreate(TransactionType.Mint)).toBeFalsy();
    });

    it('should isTypeScript return if is script', () => {
      expect(isTypeScript(TransactionType.Script)).toBeTruthy();
      expect(isTypeScript(TransactionType.Mint)).toBeFalsy();
      expect(isTypeScript(TransactionType.Create)).toBeFalsy();
    });

    it('should isTypeBlob return if is Blob', () => {
      expect(isTypeBlob(TransactionType.Blob)).toBeTruthy();
      expect(isTypeBlob(TransactionType.Mint)).toBeFalsy();
      expect(isTypeBlob(TransactionType.Create)).toBeFalsy();
      expect(isTypeBlob(TransactionType.Script)).toBeFalsy();
    });
  });

  describe('getReceipts', () => {
    it('should getReceiptsCall return correct receipts', () => {
      const receipts = getReceiptsCall([
        MOCK_RECEIPT_CALL,
        MOCK_RECEIPT_TRANSFER_OUT,
        MOCK_RECEIPT_RETURN_DATA_1,
        MOCK_RECEIPT_RETURN_DATA_2,
        MOCK_RECEIPT_SCRIPT_RESULT,
        MOCK_RECEIPT_CALL,
      ]);

      expect(receipts.length).toEqual(2);

      expect(receipts).toStrictEqual([MOCK_RECEIPT_CALL, MOCK_RECEIPT_CALL]);
    });

    it('should getReceiptsTransferOut return correct receipts', () => {
      const expected: TransactionResultTransferOutReceipt = {
        amount: bn('0x5f5e100'),
        assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
        from: '0x0a98320d39c03337401a4e46263972a9af6ce69ec2f35a5420b1bd35784c74b1',
        is: bn('0x4370'),
        pc: bn('0x57dc'),
        to: '0x3e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b2302',
        type: 8,
      };

      const receipts = getReceiptsTransferOut([
        MOCK_RECEIPT_CALL,
        MOCK_RECEIPT_TRANSFER_OUT,
        MOCK_RECEIPT_RETURN_DATA_1,
        MOCK_RECEIPT_RETURN_DATA_2,
        MOCK_RECEIPT_SCRIPT_RESULT,
      ]);

      expect(receipts.length).toEqual(1);
      expect(receipts[0]).toStrictEqual(expected);
    });

    it('should getReceiptsTransferOut return empty', () => {
      const receipts = getReceiptsTransferOut([MOCK_RECEIPT_RETURN, MOCK_RECEIPT_SCRIPT_RESULT]);

      expect(receipts.length).toEqual(0);
    });

    it('should getReceiptsMessageOut return correct receipts', () => {
      const expected: TransactionResultMessageOutReceipt = {
        amount: bn('0xf4240'),
        data: Uint8Array.from([]),
        digest: '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        messageId: '0x609a3e324753376cdbb64627d7365a5e039e522c584f73a3bf5ece00509cd24f',
        nonce: '0x66c4d70c08ff30cd2d9dae0b6fd05972997579328529bb0605dd604afedfdf93',
        recipient: '0x000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266',
        sender: '0x4aec2335430f52d0314a03b244d285c675d790dfbf0bc853fd31e39548ad8b7d',
        type: 10,
      };

      const receipts = getReceiptsMessageOut([
        MOCK_RECEIPT_MESSAGE_OUT,
        MOCK_RECEIPT_RETURN,
        MOCK_RECEIPT_SCRIPT_RESULT,
      ]);

      expect(receipts.length).toEqual(1);

      expect(receipts[0]).toStrictEqual(expected);
    });

    it('should getReceiptsMessageOut return empty', () => {
      const receipts = getReceiptsMessageOut([
        MOCK_RECEIPT_CALL,
        MOCK_RECEIPT_TRANSFER_OUT,
        MOCK_RECEIPT_RETURN_DATA_1,
        MOCK_RECEIPT_RETURN_DATA_2,
        MOCK_RECEIPT_SCRIPT_RESULT,
      ]);

      expect(receipts.length).toEqual(0);
    });
  });

  it('should ensure getTransactionTypeName works as expected', () => {
    expect(getTransactionTypeName(TransactionType.Create)).toBe(TransactionTypeName.Create);
    expect(getTransactionTypeName(TransactionType.Mint)).toBe(TransactionTypeName.Mint);
    expect(getTransactionTypeName(TransactionType.Script)).toBe(TransactionTypeName.Script);
    expect(getTransactionTypeName(TransactionType.Blob)).toBe(TransactionTypeName.Blob);

    expect(() => getTransactionTypeName('' as unknown as TransactionType)).toThrowError(
      'Unsupported transaction type: '
    );
  });
});
