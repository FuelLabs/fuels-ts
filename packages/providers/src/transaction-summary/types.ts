import type { JsonAbi } from '@fuel-ts/abi-coder';
import type { B256Address } from '@fuel-ts/interfaces';
import type { BN, BNInput } from '@fuel-ts/math';
import type { Input, Output, Transaction, TransactionType } from '@fuel-ts/transactions';

import type { GqlGetTransactionQuery } from '../__generated__/operations';
import type { TransactionResultReceipt } from '../transaction-response';

export type GqlTransaction = NonNullable<GqlGetTransactionQuery['transaction']>;

export type GraphqlTransactionStatus = GqlTransaction['status'];

export type SuccessStatus = Extract<GraphqlTransactionStatus, { __typename: 'SuccessStatus' }>;
export type FailureStatus = Extract<GraphqlTransactionStatus, { __typename: 'FailureStatus' }>;
export type SubmittedStatus = Extract<GraphqlTransactionStatus, { __typename: 'SubmittedStatus' }>;
export type SqueezedOutStatus = Extract<
  GraphqlTransactionStatus,
  { __typename: 'SqueezedOutStatus' }
>;

export type Reason = FailureStatus['reason'];
export type ProgramState = SuccessStatus['programState'];
export type Time = SubmittedStatus['time'] | SuccessStatus['time'] | FailureStatus['time'];
export type BlockId = SuccessStatus['block']['id'] | FailureStatus['block']['id'];

/**
 * @hidden
 */
export enum TransactionTypeName {
  Create = 'Create',
  Mint = 'Mint',
  Script = 'Script',
}

/**
 * @hidden
 */
export enum TransactionStatus {
  submitted = 'submitted',
  success = 'success',
  squeezedout = 'squeezedout',
  failure = 'failure',
}

/**
 * @hidden
 */
export type GqlTransactionStatusesNames =
  | 'FailureStatus'
  | 'SubmittedStatus'
  | 'SuccessStatus'
  | 'SqueezedOutStatus';

/**
 * @hidden
 */
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

/**
 * @hidden
 */
export enum AddressType {
  contract,
  account,
}

/**
 * @hidden
 */
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

export type AbiMap = Record<string, JsonAbi>;

export type RawPayloadParam = {
  rawPayload?: string;
};

export type InputOutputParam = InputParam & OutputParam;

export interface GetTransferOperationsParams extends InputOutputParam {
  receipts: TransactionResultReceipt[];
}

export type GetOperationParams = {
  transactionType: TransactionType;
  abiMap?: AbiMap;
  maxInputs: BN;
} & InputOutputParam &
  ReceiptParam &
  RawPayloadParam;

export interface MintedAsset {
  subId: B256Address;
  contractId: B256Address;
  assetId: B256Address;
  amount: BN;
}

export type BurnedAsset = MintedAsset;

export type TransactionSummary<TTransactionType = void> = {
  id?: string;
  time?: string;
  operations: Operation[];
  gasUsed: BN;
  fee: BN;
  type: TransactionTypeName;
  blockId?: BlockId;
  status?: TransactionStatus;
  isTypeMint: boolean;
  isTypeCreate: boolean;
  isTypeScript: boolean;
  isStatusPending: boolean;
  isStatusSuccess: boolean;
  isStatusFailure: boolean;
  mintedAssets: MintedAsset[];
  burnedAssets: BurnedAsset[];
  date?: Date;
  receipts: TransactionResultReceipt[];
  transaction: Transaction<TTransactionType>;
};
