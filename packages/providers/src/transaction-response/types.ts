import type { JsonAbi } from '@fuel-ts/abi-coder';
import type { BN, BNInput } from '@fuel-ts/math';
import type { Input, Output, Transaction, TransactionType } from '@fuel-ts/transactions';

import type { GqlGetTransactionWithReceiptsQuery } from '../__generated__/operations';

import type { TransactionResultReceipt } from '.';

export type GqlTransactionWithReceipts = NonNullable<
  GqlGetTransactionWithReceiptsQuery['transaction']
>;

type GraphqlTransactionStatus = GqlTransactionWithReceipts['status'];

type SuccessStatus = Extract<GraphqlTransactionStatus, { __typename: 'SuccessStatus' }>;
type FailureStatus = Extract<GraphqlTransactionStatus, { __typename: 'FailureStatus' }>;
type SubmittedStatus = Extract<GraphqlTransactionStatus, { __typename: 'SubmittedStatus' }>;
type SqueezedOutStatus = Extract<GraphqlTransactionStatus, { __typename: 'SqueezedOutStatus' }>;

export type ProgramState = SuccessStatus['programState'];
export type Reason = FailureStatus['reason'];
export type Time = SubmittedStatus['time'] | SuccessStatus['time'] | FailureStatus['time'];
export type BlockId = SuccessStatus['block']['id'] | FailureStatus['block']['id'];

export enum TransactionTypeNameEnum {
  Create = 'Create',
  Mint = 'Mint',
  Script = 'Script',
}

export enum SimplifiedTransactionStatusNameEnum {
  submitted = 'submitted',
  success = 'success',
  squeezedout = 'squeezedout',
  failure = 'failure',
}

export type GqlTransactionStatusesNames =
  | 'FailureStatus'
  | 'SubmittedStatus'
  | 'SuccessStatus'
  | 'SqueezedOutStatus';

export enum OperationName {
  payBlockProducer = 'Pay network fee to block producer',
  contractCreated = 'Contract created',
  transfer = 'Transfer asset',
  contractCall = 'Contract call',
  contractTransfer = 'Contract transfer',
  receive = 'Receive asset',
  mint = 'Mint asset',
  predicatecall = 'Predicate call',
  script = 'Script',
  sent = 'Sent asset',
  withdrawFromFuel = 'Withdraw from Fuel',
}

export type OperationCoin = {
  assetId: string;
  amount: BNInput;
};

export type OperationFunctionCall = {
  functionSignature: string;
  functionName: string;
  argumentsProvided?: Record<string, unknown>;
} & Partial<OperationCoin>;

export type Operation = {
  name?: OperationName;
  from?: OperationTransactionAddress;
  to?: OperationTransactionAddress;
  assetsSent?: Array<OperationCoin>;
  calls?: Array<OperationFunctionCall>;
};

export enum AddressType {
  contract,
  account,
}

export enum ChainName {
  ethereum = 'ethereum',
  fuel = 'fuel',
}

export type OperationTransactionAddress = {
  address: string;
  type: AddressType;
  chain?: ChainName;
};

export type InputParam = {
  inputs: Input[];
};

export type OutputParam = {
  outputs: Output[];
};

export type ReceiptParam = {
  receipts: TransactionResultReceipt[];
};

export type AbiParam = {
  abiMap?: {
    [key: string]: JsonAbi;
  };
};

export type RawPayloadParam = {
  rawPayload?: string;
};

export type InputOutputParam = InputParam & OutputParam;

export type GetOperationParams = {
  transactionType: TransactionType;
} & InputOutputParam &
  ReceiptParam &
  AbiParam &
  RawPayloadParam;

export type TransactionResult<TTransactionType = void> = {
  id: string;
  gqlStatus: GraphqlTransactionStatus;
  type: TransactionTypeNameEnum;
  blockId?: BlockId;
  time: Time;
  gasUsed: BN;
  fee: BN;
  reason?: Reason;
  programState: ProgramState;
  receipts: TransactionResultReceipt[];
  operations?: Operation[];
  status?: SimplifiedTransactionStatusNameEnum;
  transaction: Transaction<TTransactionType>;
  rawPayload: string;
};
