import type { AbiSpecification } from '@fuel-ts/abi';
import type { B256Address } from '@fuel-ts/interfaces';
import type { BN, BNInput } from '@fuel-ts/math';
import type { Input, Output, Transaction, TransactionType } from '@fuel-ts/transactions';

import type { GqlReceiptFragment, GqlSuccessStatusFragment } from '../__generated__/operations';
import type { TransactionResultReceipt } from '../transaction-response';

export type SubmittedStatus = {
  type: 'SubmittedStatus';
  time: string;
};

export type SuccessStatus = {
  type: 'SuccessStatus';
  time: string;
  programState?: GqlSuccessStatusFragment['programState'];
  block?: {
    id: string;
  };
  receipts: GqlReceiptFragment[];
  totalGas: string;
  totalFee: string;
};

export type FailureStatus = {
  type: 'FailureStatus';
  time: string;
  reason: string;
  block?: {
    id: string;
  };
  receipts: GqlReceiptFragment[];
  totalGas: string;
  totalFee: string;
};

export type SqueezedOutStatus = {
  type: 'SqueezedOutStatus';
  reason: string;
};

export type GraphqlTransactionStatus =
  | SubmittedStatus
  | SuccessStatus
  | FailureStatus
  | SqueezedOutStatus
  | null;

export type GqlTransaction = {
  id: string;
  rawPayload: string;
  status?: GraphqlTransactionStatus;
};

export type Reason = FailureStatus['reason'];
export type ProgramState = SuccessStatus['programState'];
export type Time = SubmittedStatus['time'] | SuccessStatus['time'] | FailureStatus['time'];
export type BlockId = string;

/**
 * @hidden
 */
export enum TransactionTypeName {
  Create = 'Create',
  Mint = 'Mint',
  Script = 'Script',
  Upgrade = 'Upgrade',
  Upload = 'Upload',
  Blob = 'Blob',
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
  receive = 'Receive asset',
  /**
   * @deprecated This value was added by mistake and has never been used.
   * It will be removed in future versions.
   */
  mint = 'Mint asset',
  /**
   * @deprecated This value was added by mistake and has never been used.
   * It will be removed in future versions.
   */
  predicatecall = 'Predicate call',
  /**
   * @deprecated This value was added by mistake and has never been used.
   * It will be removed in future versions.
   */
  script = 'Script',
  /**
   * @deprecated This value was added by mistake and has never been used.
   * It will be removed in future versions.
   */
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

export type AbiMap = Record<string, AbiSpecification>;

export type RawPayloadParam = {
  rawPayload?: string;
};

export type InputOutputParam = InputParam & OutputParam;

export interface GetTransferOperationsParams extends InputOutputParam {
  receipts: TransactionResultReceipt[];
  baseAssetId: string;
}

export type GetOperationParams = {
  transactionType: TransactionType;
  abiMap?: AbiMap;
  maxInputs: BN;
  baseAssetId: string;
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
  id: string;
  time?: string;
  operations: Operation[];
  gasUsed: BN;
  tip: BN;
  fee: BN;
  type: TransactionTypeName;
  blockId?: BlockId;
  status?: TransactionStatus;
  isTypeMint: boolean;
  isTypeCreate: boolean;
  isTypeScript: boolean;
  isTypeUpgrade: boolean;
  isTypeUpload: boolean;
  isTypeBlob: boolean;
  isStatusPending: boolean;
  isStatusSuccess: boolean;
  isStatusFailure: boolean;
  mintedAssets: MintedAsset[];
  burnedAssets: BurnedAsset[];
  date?: Date;
  receipts: TransactionResultReceipt[];
  transaction: Transaction<TTransactionType>;
};
