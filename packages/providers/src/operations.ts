import type { GraphQLClient } from 'graphql-request';
import type * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Address: string;
  AssetId: string;
  BlockId: string;
  Bytes32: string;
  ContractId: string;
  /**
   * Implement the DateTime<Utc> scalar
   *
   * The input/output is a string in RFC3339 format.
   */
  DateTime: string;
  HexString: string;
  Salt: string;
  TransactionId: string;
  U64: string;
  UtxoId: string;
};

export type GqlBlock = {
  __typename: 'Block';
  height: Scalars['U64'];
  id: Scalars['BlockId'];
  producer: Scalars['Address'];
  time: Scalars['DateTime'];
  transactions: Array<GqlTransaction>;
};

export type GqlBlockConnection = {
  __typename: 'BlockConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GqlBlockEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
};

/** An edge in a connection. */
export type GqlBlockEdge = {
  __typename: 'BlockEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: GqlBlock;
};

export type GqlChainInfo = {
  __typename: 'ChainInfo';
  baseChainHeight: Scalars['U64'];
  latestBlock: GqlBlock;
  name: Scalars['String'];
  peerCount: Scalars['Int'];
};

export type GqlChangeOutput = {
  __typename: 'ChangeOutput';
  amount: Scalars['U64'];
  assetId: Scalars['AssetId'];
  to: Scalars['Address'];
};

export type GqlCoin = {
  __typename: 'Coin';
  amount: Scalars['U64'];
  assetId: Scalars['AssetId'];
  blockCreated: Scalars['U64'];
  maturity: Scalars['U64'];
  owner: Scalars['Address'];
  status: GqlCoinStatus;
  utxoId: Scalars['UtxoId'];
};

export type GqlCoinConnection = {
  __typename: 'CoinConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GqlCoinEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
};

/** An edge in a connection. */
export type GqlCoinEdge = {
  __typename: 'CoinEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: GqlCoin;
};

export type GqlCoinFilterInput = {
  /** asset ID of the coins */
  assetId?: InputMaybe<Scalars['AssetId']>;
  /** address of the owner */
  owner: Scalars['Address'];
};

export type GqlCoinOutput = {
  __typename: 'CoinOutput';
  amount: Scalars['U64'];
  assetId: Scalars['AssetId'];
  to: Scalars['Address'];
};

export enum GqlCoinStatus {
  Spent = 'SPENT',
  Unspent = 'UNSPENT',
}

export type GqlContract = {
  __typename: 'Contract';
  bytecode: Scalars['HexString'];
  id: Scalars['ContractId'];
};

export type GqlContractCreated = {
  __typename: 'ContractCreated';
  contract: GqlContract;
  stateRoot: Scalars['Bytes32'];
};

export type GqlContractOutput = {
  __typename: 'ContractOutput';
  balanceRoot: Scalars['Bytes32'];
  inputIndex: Scalars['Int'];
  stateRoot: Scalars['Bytes32'];
};

export type GqlFailureStatus = {
  __typename: 'FailureStatus';
  block: GqlBlock;
  programState?: Maybe<GqlProgramState>;
  reason: Scalars['String'];
  time: Scalars['DateTime'];
};

export type GqlInput = GqlInputCoin | GqlInputContract;

export type GqlInputCoin = {
  __typename: 'InputCoin';
  amount: Scalars['U64'];
  assetId: Scalars['AssetId'];
  maturity: Scalars['U64'];
  owner: Scalars['Address'];
  predicate: Scalars['HexString'];
  predicateData: Scalars['HexString'];
  utxoId: Scalars['UtxoId'];
  witnessIndex: Scalars['Int'];
};

export type GqlInputContract = {
  __typename: 'InputContract';
  balanceRoot: Scalars['Bytes32'];
  contract: GqlContract;
  stateRoot: Scalars['Bytes32'];
  utxoId: Scalars['UtxoId'];
};

export type GqlMutation = {
  __typename: 'Mutation';
  /** dry-run the transaction using a fork of current state, no changes are committed. */
  dryRun: Array<GqlReceipt>;
  endSession: Scalars['Boolean'];
  execute: Scalars['Boolean'];
  reset: Scalars['Boolean'];
  startSession: Scalars['ID'];
  /** Submits transaction to the pool */
  submit: GqlTransaction;
};

export type GqlMutationDryRunArgs = {
  tx: Scalars['HexString'];
};

export type GqlMutationEndSessionArgs = {
  id: Scalars['ID'];
};

export type GqlMutationExecuteArgs = {
  id: Scalars['ID'];
  op: Scalars['String'];
};

export type GqlMutationResetArgs = {
  id: Scalars['ID'];
};

export type GqlMutationSubmitArgs = {
  tx: Scalars['HexString'];
};

export type GqlOutput =
  | GqlChangeOutput
  | GqlCoinOutput
  | GqlContractCreated
  | GqlContractOutput
  | GqlVariableOutput
  | GqlWithdrawalOutput;

/** Information about pagination in a connection */
export type GqlPageInfo = {
  __typename: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type GqlProgramState = {
  __typename: 'ProgramState';
  data: Scalars['HexString'];
  returnType: GqlReturnType;
};

export type GqlQuery = {
  __typename: 'Query';
  block?: Maybe<GqlBlock>;
  blocks: GqlBlockConnection;
  chain: GqlChainInfo;
  coin?: Maybe<GqlCoin>;
  coins: GqlCoinConnection;
  coinsToSpend: Array<GqlCoin>;
  contract?: Maybe<GqlContract>;
  /** Returns true when the GraphQL API is serving requests. */
  health: Scalars['Boolean'];
  memory: Scalars['String'];
  register: Scalars['U64'];
  transaction?: Maybe<GqlTransaction>;
  transactions: GqlTransactionConnection;
  transactionsByOwner: GqlTransactionConnection;
  version: Scalars['String'];
};

export type GqlQueryBlockArgs = {
  height?: InputMaybe<Scalars['U64']>;
  id?: InputMaybe<Scalars['BlockId']>;
};

export type GqlQueryBlocksArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type GqlQueryCoinArgs = {
  utxoId: Scalars['UtxoId'];
};

export type GqlQueryCoinsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter: GqlCoinFilterInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type GqlQueryCoinsToSpendArgs = {
  maxInputs?: InputMaybe<Scalars['Int']>;
  owner: Scalars['Address'];
  spendQuery: Array<GqlSpendQueryElementInput>;
};

export type GqlQueryContractArgs = {
  id: Scalars['ContractId'];
};

export type GqlQueryMemoryArgs = {
  id: Scalars['ID'];
  size: Scalars['U64'];
  start: Scalars['U64'];
};

export type GqlQueryRegisterArgs = {
  id: Scalars['ID'];
  register: Scalars['U64'];
};

export type GqlQueryTransactionArgs = {
  id: Scalars['TransactionId'];
};

export type GqlQueryTransactionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type GqlQueryTransactionsByOwnerArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  owner: Scalars['Address'];
};

export type GqlReceipt = {
  __typename: 'Receipt';
  a?: Maybe<Scalars['U64']>;
  amount?: Maybe<Scalars['U64']>;
  assetId?: Maybe<Scalars['AssetId']>;
  b?: Maybe<Scalars['U64']>;
  contract?: Maybe<GqlContract>;
  data?: Maybe<Scalars['HexString']>;
  digest?: Maybe<Scalars['Bytes32']>;
  gas?: Maybe<Scalars['U64']>;
  gasUsed?: Maybe<Scalars['U64']>;
  is?: Maybe<Scalars['U64']>;
  len?: Maybe<Scalars['U64']>;
  pc?: Maybe<Scalars['U64']>;
  ptr?: Maybe<Scalars['U64']>;
  ra?: Maybe<Scalars['U64']>;
  rawPayload: Scalars['HexString'];
  rb?: Maybe<Scalars['U64']>;
  rc?: Maybe<Scalars['U64']>;
  rd?: Maybe<Scalars['U64']>;
  reason?: Maybe<Scalars['U64']>;
  receiptType: GqlReceiptType;
  result?: Maybe<Scalars['U64']>;
  to?: Maybe<GqlContract>;
  toAddress?: Maybe<Scalars['Address']>;
  val?: Maybe<Scalars['U64']>;
};

export enum GqlReceiptType {
  Call = 'CALL',
  Log = 'LOG',
  LogData = 'LOG_DATA',
  Panic = 'PANIC',
  Return = 'RETURN',
  ReturnData = 'RETURN_DATA',
  Revert = 'REVERT',
  ScriptResult = 'SCRIPT_RESULT',
  Transfer = 'TRANSFER',
  TransferOut = 'TRANSFER_OUT',
}

export enum GqlReturnType {
  Return = 'RETURN',
  ReturnData = 'RETURN_DATA',
  Revert = 'REVERT',
}

export type GqlSpendQueryElementInput = {
  /** address of the owner */
  amount: Scalars['U64'];
  /** asset ID of the coins */
  assetId: Scalars['AssetId'];
};

export type GqlSubmittedStatus = {
  __typename: 'SubmittedStatus';
  time: Scalars['DateTime'];
};

export type GqlSuccessStatus = {
  __typename: 'SuccessStatus';
  block: GqlBlock;
  programState: GqlProgramState;
  time: Scalars['DateTime'];
};

export type GqlTransaction = {
  __typename: 'Transaction';
  bytePrice: Scalars['U64'];
  bytecodeWitnessIndex?: Maybe<Scalars['Int']>;
  gasLimit: Scalars['U64'];
  gasPrice: Scalars['U64'];
  id: Scalars['TransactionId'];
  inputAssetIds: Array<Scalars['AssetId']>;
  inputContracts: Array<GqlContract>;
  inputs: Array<GqlInput>;
  isScript: Scalars['Boolean'];
  maturity: Scalars['U64'];
  outputs: Array<GqlOutput>;
  /** Return the transaction bytes using canonical encoding */
  rawPayload: Scalars['HexString'];
  receipts?: Maybe<Array<GqlReceipt>>;
  receiptsRoot?: Maybe<Scalars['Bytes32']>;
  salt?: Maybe<Scalars['Salt']>;
  script?: Maybe<Scalars['HexString']>;
  scriptData?: Maybe<Scalars['HexString']>;
  staticContracts?: Maybe<Array<GqlContract>>;
  status?: Maybe<GqlTransactionStatus>;
  storageSlots?: Maybe<Array<Scalars['HexString']>>;
  witnesses: Array<Scalars['HexString']>;
};

export type GqlTransactionConnection = {
  __typename: 'TransactionConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GqlTransactionEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
};

/** An edge in a connection. */
export type GqlTransactionEdge = {
  __typename: 'TransactionEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: GqlTransaction;
};

export type GqlTransactionStatus = GqlFailureStatus | GqlSubmittedStatus | GqlSuccessStatus;

export type GqlVariableOutput = {
  __typename: 'VariableOutput';
  amount: Scalars['U64'];
  assetId: Scalars['AssetId'];
  to: Scalars['Address'];
};

export type GqlWithdrawalOutput = {
  __typename: 'WithdrawalOutput';
  amount: Scalars['U64'];
  assetId: Scalars['AssetId'];
  to: Scalars['Address'];
};

export type GqlTransactionFragmentFragment = {
  __typename: 'Transaction';
  id: string;
  rawPayload: string;
  status?:
    | {
        __typename: 'FailureStatus';
        time: string;
        reason: string;
        type: 'FailureStatus';
        block: { __typename: 'Block'; id: string };
      }
    | { __typename: 'SubmittedStatus'; time: string; type: 'SubmittedStatus' }
    | {
        __typename: 'SuccessStatus';
        time: string;
        type: 'SuccessStatus';
        block: { __typename: 'Block'; id: string };
        programState: { __typename: 'ProgramState'; returnType: GqlReturnType; data: string };
      }
    | null;
};

export type GqlReceiptFragmentFragment = {
  __typename: 'Receipt';
  data?: string | null;
  rawPayload: string;
};

export type GqlBlockFragmentFragment = {
  __typename: 'Block';
  id: string;
  height: string;
  producer: string;
  time: string;
  transactions: Array<{ __typename: 'Transaction'; id: string }>;
};

export type GqlCoinFragmentFragment = {
  __typename: 'Coin';
  utxoId: string;
  owner: string;
  amount: string;
  assetId: string;
  maturity: string;
  status: GqlCoinStatus;
  blockCreated: string;
};

export type GqlGetVersionQueryVariables = Exact<{ [key: string]: never }>;

export type GqlGetVersionQuery = { __typename: 'Query'; version: string };

export type GqlGetChainQueryVariables = Exact<{ [key: string]: never }>;

export type GqlGetChainQuery = {
  __typename: 'Query';
  chain: {
    __typename: 'ChainInfo';
    name: string;
    baseChainHeight: string;
    peerCount: number;
    latestBlock: {
      __typename: 'Block';
      id: string;
      height: string;
      producer: string;
      time: string;
      transactions: Array<{ __typename: 'Transaction'; id: string }>;
    };
  };
};

export type GqlGetTransactionQueryVariables = Exact<{
  transactionId: Scalars['TransactionId'];
}>;

export type GqlGetTransactionQuery = {
  __typename: 'Query';
  transaction?: {
    __typename: 'Transaction';
    id: string;
    rawPayload: string;
    status?:
      | {
          __typename: 'FailureStatus';
          time: string;
          reason: string;
          type: 'FailureStatus';
          block: { __typename: 'Block'; id: string };
        }
      | { __typename: 'SubmittedStatus'; time: string; type: 'SubmittedStatus' }
      | {
          __typename: 'SuccessStatus';
          time: string;
          type: 'SuccessStatus';
          block: { __typename: 'Block'; id: string };
          programState: { __typename: 'ProgramState'; returnType: GqlReturnType; data: string };
        }
      | null;
  } | null;
};

export type GqlGetTransactionWithReceiptsQueryVariables = Exact<{
  transactionId: Scalars['TransactionId'];
}>;

export type GqlGetTransactionWithReceiptsQuery = {
  __typename: 'Query';
  transaction?: {
    __typename: 'Transaction';
    id: string;
    rawPayload: string;
    receipts?: Array<{ __typename: 'Receipt'; data?: string | null; rawPayload: string }> | null;
    status?:
      | {
          __typename: 'FailureStatus';
          time: string;
          reason: string;
          type: 'FailureStatus';
          block: { __typename: 'Block'; id: string };
        }
      | { __typename: 'SubmittedStatus'; time: string; type: 'SubmittedStatus' }
      | {
          __typename: 'SuccessStatus';
          time: string;
          type: 'SuccessStatus';
          block: { __typename: 'Block'; id: string };
          programState: { __typename: 'ProgramState'; returnType: GqlReturnType; data: string };
        }
      | null;
  } | null;
};

export type GqlGetTransactionsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}>;

export type GqlGetTransactionsQuery = {
  __typename: 'Query';
  transactions: {
    __typename: 'TransactionConnection';
    edges?: Array<{
      __typename: 'TransactionEdge';
      node: {
        __typename: 'Transaction';
        id: string;
        rawPayload: string;
        status?:
          | {
              __typename: 'FailureStatus';
              time: string;
              reason: string;
              type: 'FailureStatus';
              block: { __typename: 'Block'; id: string };
            }
          | { __typename: 'SubmittedStatus'; time: string; type: 'SubmittedStatus' }
          | {
              __typename: 'SuccessStatus';
              time: string;
              type: 'SuccessStatus';
              block: { __typename: 'Block'; id: string };
              programState: { __typename: 'ProgramState'; returnType: GqlReturnType; data: string };
            }
          | null;
      };
    } | null> | null;
  };
};

export type GqlGetTransactionsByOwnerQueryVariables = Exact<{
  owner: Scalars['Address'];
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}>;

export type GqlGetTransactionsByOwnerQuery = {
  __typename: 'Query';
  transactionsByOwner: {
    __typename: 'TransactionConnection';
    edges?: Array<{
      __typename: 'TransactionEdge';
      node: {
        __typename: 'Transaction';
        id: string;
        rawPayload: string;
        status?:
          | {
              __typename: 'FailureStatus';
              time: string;
              reason: string;
              type: 'FailureStatus';
              block: { __typename: 'Block'; id: string };
            }
          | { __typename: 'SubmittedStatus'; time: string; type: 'SubmittedStatus' }
          | {
              __typename: 'SuccessStatus';
              time: string;
              type: 'SuccessStatus';
              block: { __typename: 'Block'; id: string };
              programState: { __typename: 'ProgramState'; returnType: GqlReturnType; data: string };
            }
          | null;
      };
    } | null> | null;
  };
};

export type GqlGetBlockQueryVariables = Exact<{
  blockId?: InputMaybe<Scalars['BlockId']>;
  blockHeight?: InputMaybe<Scalars['U64']>;
}>;

export type GqlGetBlockQuery = {
  __typename: 'Query';
  block?: {
    __typename: 'Block';
    id: string;
    height: string;
    producer: string;
    time: string;
    transactions: Array<{ __typename: 'Transaction'; id: string }>;
  } | null;
};

export type GqlGetBlockWithTransactionsQueryVariables = Exact<{
  blockId?: InputMaybe<Scalars['BlockId']>;
  blockHeight?: InputMaybe<Scalars['U64']>;
}>;

export type GqlGetBlockWithTransactionsQuery = {
  __typename: 'Query';
  block?: {
    __typename: 'Block';
    id: string;
    height: string;
    producer: string;
    time: string;
    transactions: Array<{
      __typename: 'Transaction';
      id: string;
      rawPayload: string;
      status?:
        | {
            __typename: 'FailureStatus';
            time: string;
            reason: string;
            type: 'FailureStatus';
            block: { __typename: 'Block'; id: string };
          }
        | { __typename: 'SubmittedStatus'; time: string; type: 'SubmittedStatus' }
        | {
            __typename: 'SuccessStatus';
            time: string;
            type: 'SuccessStatus';
            block: { __typename: 'Block'; id: string };
            programState: { __typename: 'ProgramState'; returnType: GqlReturnType; data: string };
          }
        | null;
    }>;
  } | null;
};

export type GqlGetBlocksQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}>;

export type GqlGetBlocksQuery = {
  __typename: 'Query';
  blocks: {
    __typename: 'BlockConnection';
    edges?: Array<{
      __typename: 'BlockEdge';
      node: {
        __typename: 'Block';
        id: string;
        height: string;
        producer: string;
        time: string;
        transactions: Array<{ __typename: 'Transaction'; id: string }>;
      };
    } | null> | null;
  };
};

export type GqlGetCoinQueryVariables = Exact<{
  coinId: Scalars['UtxoId'];
}>;

export type GqlGetCoinQuery = {
  __typename: 'Query';
  coin?: {
    __typename: 'Coin';
    utxoId: string;
    owner: string;
    amount: string;
    assetId: string;
    maturity: string;
    status: GqlCoinStatus;
    blockCreated: string;
  } | null;
};

export type GqlGetCoinsQueryVariables = Exact<{
  filter: GqlCoinFilterInput;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}>;

export type GqlGetCoinsQuery = {
  __typename: 'Query';
  coins: {
    __typename: 'CoinConnection';
    edges?: Array<{
      __typename: 'CoinEdge';
      node: {
        __typename: 'Coin';
        utxoId: string;
        owner: string;
        amount: string;
        assetId: string;
        maturity: string;
        status: GqlCoinStatus;
        blockCreated: string;
      };
    } | null> | null;
  };
};

export type GqlGetCoinsToSpendQueryVariables = Exact<{
  owner: Scalars['Address'];
  spendQuery: Array<GqlSpendQueryElementInput> | GqlSpendQueryElementInput;
  maxInputs?: InputMaybe<Scalars['Int']>;
}>;

export type GqlGetCoinsToSpendQuery = {
  __typename: 'Query';
  coinsToSpend: Array<{
    __typename: 'Coin';
    utxoId: string;
    owner: string;
    amount: string;
    assetId: string;
    maturity: string;
    status: GqlCoinStatus;
    blockCreated: string;
  }>;
};

export type GqlDryRunMutationVariables = Exact<{
  encodedTransaction: Scalars['HexString'];
}>;

export type GqlDryRunMutation = {
  __typename: 'Mutation';
  dryRun: Array<{ __typename: 'Receipt'; data?: string | null; rawPayload: string }>;
};

export type GqlSubmitMutationVariables = Exact<{
  encodedTransaction: Scalars['HexString'];
}>;

export type GqlSubmitMutation = {
  __typename: 'Mutation';
  submit: { __typename: 'Transaction'; id: string };
};

export type GqlStartSessionMutationVariables = Exact<{ [key: string]: never }>;

export type GqlStartSessionMutation = { __typename: 'Mutation'; startSession: string };

export type GqlEndSessionMutationVariables = Exact<{
  sessionId: Scalars['ID'];
}>;

export type GqlEndSessionMutation = { __typename: 'Mutation'; endSession: boolean };

export type GqlExecuteMutationVariables = Exact<{
  sessionId: Scalars['ID'];
  op: Scalars['String'];
}>;

export type GqlExecuteMutation = { __typename: 'Mutation'; execute: boolean };

export type GqlResetMutationVariables = Exact<{
  sessionId: Scalars['ID'];
}>;

export type GqlResetMutation = { __typename: 'Mutation'; reset: boolean };

export const TransactionFragmentFragmentDoc = gql`
  fragment transactionFragment on Transaction {
    id
    rawPayload
    status {
      type: __typename
      ... on SubmittedStatus {
        time
      }
      ... on SuccessStatus {
        block {
          id
        }
        time
        programState {
          returnType
          data
        }
      }
      ... on FailureStatus {
        block {
          id
        }
        time
        reason
      }
    }
  }
`;
export const ReceiptFragmentFragmentDoc = gql`
  fragment receiptFragment on Receipt {
    data
    rawPayload
  }
`;
export const BlockFragmentFragmentDoc = gql`
  fragment blockFragment on Block {
    id
    height
    producer
    transactions {
      id
    }
    time
  }
`;
export const CoinFragmentFragmentDoc = gql`
  fragment coinFragment on Coin {
    utxoId
    owner
    amount
    assetId
    maturity
    status
    blockCreated
  }
`;
export const GetVersionDocument = gql`
  query getVersion {
    version
  }
`;
export const GetChainDocument = gql`
  query getChain {
    chain {
      name
      latestBlock {
        ...blockFragment
      }
      baseChainHeight
      peerCount
    }
  }
  ${BlockFragmentFragmentDoc}
`;
export const GetTransactionDocument = gql`
  query getTransaction($transactionId: TransactionId!) {
    transaction(id: $transactionId) {
      ...transactionFragment
    }
  }
  ${TransactionFragmentFragmentDoc}
`;
export const GetTransactionWithReceiptsDocument = gql`
  query getTransactionWithReceipts($transactionId: TransactionId!) {
    transaction(id: $transactionId) {
      ...transactionFragment
      receipts {
        ...receiptFragment
      }
    }
  }
  ${TransactionFragmentFragmentDoc}
  ${ReceiptFragmentFragmentDoc}
`;
export const GetTransactionsDocument = gql`
  query getTransactions($after: String, $before: String, $first: Int, $last: Int) {
    transactions(after: $after, before: $before, first: $first, last: $last) {
      edges {
        node {
          ...transactionFragment
        }
      }
    }
  }
  ${TransactionFragmentFragmentDoc}
`;
export const GetTransactionsByOwnerDocument = gql`
  query getTransactionsByOwner(
    $owner: Address!
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    transactionsByOwner(owner: $owner, after: $after, before: $before, first: $first, last: $last) {
      edges {
        node {
          ...transactionFragment
        }
      }
    }
  }
  ${TransactionFragmentFragmentDoc}
`;
export const GetBlockDocument = gql`
  query getBlock($blockId: BlockId, $blockHeight: U64) {
    block(id: $blockId, height: $blockHeight) {
      ...blockFragment
    }
  }
  ${BlockFragmentFragmentDoc}
`;
export const GetBlockWithTransactionsDocument = gql`
  query getBlockWithTransactions($blockId: BlockId, $blockHeight: U64) {
    block(id: $blockId, height: $blockHeight) {
      ...blockFragment
      transactions {
        ...transactionFragment
      }
    }
  }
  ${BlockFragmentFragmentDoc}
  ${TransactionFragmentFragmentDoc}
`;
export const GetBlocksDocument = gql`
  query getBlocks($after: String, $before: String, $first: Int, $last: Int) {
    blocks(after: $after, before: $before, first: $first, last: $last) {
      edges {
        node {
          ...blockFragment
        }
      }
    }
  }
  ${BlockFragmentFragmentDoc}
`;
export const GetCoinDocument = gql`
  query getCoin($coinId: UtxoId!) {
    coin(utxoId: $coinId) {
      ...coinFragment
    }
  }
  ${CoinFragmentFragmentDoc}
`;
export const GetCoinsDocument = gql`
  query getCoins(
    $filter: CoinFilterInput!
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    coins(filter: $filter, after: $after, before: $before, first: $first, last: $last) {
      edges {
        node {
          ...coinFragment
        }
      }
    }
  }
  ${CoinFragmentFragmentDoc}
`;
export const GetCoinsToSpendDocument = gql`
  query getCoinsToSpend(
    $owner: Address!
    $spendQuery: [SpendQueryElementInput!]!
    $maxInputs: Int
  ) {
    coinsToSpend(owner: $owner, spendQuery: $spendQuery, maxInputs: $maxInputs) {
      ...coinFragment
    }
  }
  ${CoinFragmentFragmentDoc}
`;
export const DryRunDocument = gql`
  mutation dryRun($encodedTransaction: HexString!) {
    dryRun(tx: $encodedTransaction) {
      ...receiptFragment
    }
  }
  ${ReceiptFragmentFragmentDoc}
`;
export const SubmitDocument = gql`
  mutation submit($encodedTransaction: HexString!) {
    submit(tx: $encodedTransaction) {
      id
    }
  }
`;
export const StartSessionDocument = gql`
  mutation startSession {
    startSession
  }
`;
export const EndSessionDocument = gql`
  mutation endSession($sessionId: ID!) {
    endSession(id: $sessionId)
  }
`;
export const ExecuteDocument = gql`
  mutation execute($sessionId: ID!, $op: String!) {
    execute(id: $sessionId, op: $op)
  }
`;
export const ResetDocument = gql`
  mutation reset($sessionId: ID!) {
    reset(id: $sessionId)
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getVersion(
      variables?: GqlGetVersionQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GqlGetVersionQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GqlGetVersionQuery>(GetVersionDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getVersion'
      );
    },
    getChain(
      variables?: GqlGetChainQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GqlGetChainQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GqlGetChainQuery>(GetChainDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getChain'
      );
    },
    getTransaction(
      variables: GqlGetTransactionQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GqlGetTransactionQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GqlGetTransactionQuery>(GetTransactionDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getTransaction'
      );
    },
    getTransactionWithReceipts(
      variables: GqlGetTransactionWithReceiptsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GqlGetTransactionWithReceiptsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GqlGetTransactionWithReceiptsQuery>(
            GetTransactionWithReceiptsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'getTransactionWithReceipts'
      );
    },
    getTransactions(
      variables?: GqlGetTransactionsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GqlGetTransactionsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GqlGetTransactionsQuery>(GetTransactionsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getTransactions'
      );
    },
    getTransactionsByOwner(
      variables: GqlGetTransactionsByOwnerQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GqlGetTransactionsByOwnerQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GqlGetTransactionsByOwnerQuery>(
            GetTransactionsByOwnerDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'getTransactionsByOwner'
      );
    },
    getBlock(
      variables?: GqlGetBlockQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GqlGetBlockQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GqlGetBlockQuery>(GetBlockDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getBlock'
      );
    },
    getBlockWithTransactions(
      variables?: GqlGetBlockWithTransactionsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GqlGetBlockWithTransactionsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GqlGetBlockWithTransactionsQuery>(
            GetBlockWithTransactionsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'getBlockWithTransactions'
      );
    },
    getBlocks(
      variables?: GqlGetBlocksQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GqlGetBlocksQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GqlGetBlocksQuery>(GetBlocksDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getBlocks'
      );
    },
    getCoin(
      variables: GqlGetCoinQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GqlGetCoinQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GqlGetCoinQuery>(GetCoinDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getCoin'
      );
    },
    getCoins(
      variables: GqlGetCoinsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GqlGetCoinsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GqlGetCoinsQuery>(GetCoinsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getCoins'
      );
    },
    getCoinsToSpend(
      variables: GqlGetCoinsToSpendQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GqlGetCoinsToSpendQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GqlGetCoinsToSpendQuery>(GetCoinsToSpendDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getCoinsToSpend'
      );
    },
    dryRun(
      variables: GqlDryRunMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GqlDryRunMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GqlDryRunMutation>(DryRunDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'dryRun'
      );
    },
    submit(
      variables: GqlSubmitMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GqlSubmitMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GqlSubmitMutation>(SubmitDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'submit'
      );
    },
    startSession(
      variables?: GqlStartSessionMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GqlStartSessionMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GqlStartSessionMutation>(StartSessionDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'startSession'
      );
    },
    endSession(
      variables: GqlEndSessionMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GqlEndSessionMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GqlEndSessionMutation>(EndSessionDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'endSession'
      );
    },
    execute(
      variables: GqlExecuteMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GqlExecuteMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GqlExecuteMutation>(ExecuteDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'execute'
      );
    },
    reset(
      variables: GqlResetMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GqlResetMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GqlResetMutation>(ResetDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'reset'
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
