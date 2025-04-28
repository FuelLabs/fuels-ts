import type { JsonAbi } from '@fuel-ts/abi-coder';
import type { B256Address } from '@fuel-ts/address';
import type { BN, BNInput } from '@fuel-ts/math';
import type {
  Transaction,
  Input,
  Output,
  TransactionType,
  OutputChange,
  OutputVariable,
} from '@fuel-ts/transactions';

import type { GqlSuccessStatusFragment } from '../__generated__/operations';
import type { TransactionReceiptJson } from '../provider';
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
  receipts: TransactionReceiptJson[];
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
  receipts: TransactionReceiptJson[];
  totalGas: string;
  totalFee: string;
};

export type SqueezedOutStatus = {
  type: 'SqueezedOutStatus';
  reason: string;
};

export type SerializedResolvedOutput = {
  utxoId: string;
  output:
    | { to: string; amount: string; assetId: string; type: 'ChangeOutput' }
    | { to: string; amount: string; assetId: string; type: 'CoinOutput' }
    | { contract: string; stateRoot: string; type: 'ContractCreated' }
    | { inputIndex: string; balanceRoot: string; stateRoot: string; type: 'ContractOutput' }
    | { to: string; amount: string; assetId: string; type: 'VariableOutput' };
};

// #region resolved-output-type
export type ResolvedOutput = {
  utxoId: string;
  output: OutputChange | OutputVariable;
};
// #endregion resolved-output-type

export type PreconfirmationSuccessStatus = {
  type: 'PreconfirmationSuccessStatus';
  totalFee: string;
  totalGas: string;
  resolvedOutputs?: SerializedResolvedOutput[] | null;
  preconfirmationReceipts?: TransactionReceiptJson[] | null;
  preconfirmationTransaction?: { rawPayload: string } | null;
};

export type PreconfirmationFailureStatus = {
  type: 'PreconfirmationFailureStatus';
  reason: string;
  totalFee: string;
  totalGas: string;
  resolvedOutputs?: SerializedResolvedOutput[] | null;
  preconfirmationReceipts?: TransactionReceiptJson[] | null;
  preconfirmationTransaction?: { rawPayload: string } | null;
};

export type GraphqlTransactionStatus =
  | SubmittedStatus
  | SuccessStatus
  | FailureStatus
  | SqueezedOutStatus
  | PreconfirmationSuccessStatus
  | PreconfirmationFailureStatus
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
  preconfirmationSuccess = 'preconfirmationSuccess',
  preconfirmationFailure = 'preconfirmationFailure',
}

/**
 * @hidden
 */
export type GqlTransactionStatusesNames =
  | 'FailureStatus'
  | 'SubmittedStatus'
  | 'SuccessStatus'
  | 'SqueezedOutStatus'
  | 'PreconfirmationSuccessStatus'
  | 'PreconfirmationFailureStatus';

/**
 * @hidden
 */
export enum OperationName {
  payBlockProducer = 'Pay network fee to block producer',
  contractCreated = 'Contract created',
  transfer = 'Transfer asset',
  contractCall = 'Contract call',
  receive = 'Receive asset',
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
  receipts?: TransactionResultReceipt[];
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

export interface PreConfirmationTransactionSummary {
  id: string;
  status?: TransactionStatus;
  isStatusPreConfirmationSuccess: boolean;
  isStatusPreConfirmationFailure: boolean;
  isStatusPending: boolean;
  isStatusSuccess: boolean;
  isStatusFailure: boolean;
  receipts?: TransactionResultReceipt[];
  isTypeMint?: boolean;
  isTypeCreate?: boolean;
  isTypeScript?: boolean;
  isTypeUpgrade?: boolean;
  isTypeUpload?: boolean;
  isTypeBlob?: boolean;
  errorReason?: string;
  operations?: Operation[];
  gasUsed?: BN;
  mintedAssets?: MintedAsset[];
  burnedAssets?: BurnedAsset[];
  tip?: BN;
  fee?: BN;
  type?: TransactionTypeName;
  transaction?: Transaction;
  resolvedOutputs?: ResolvedOutput[];
}

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
