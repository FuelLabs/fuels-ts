import type { GraphQLClient } from 'graphql-request';
import type * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';

export type Maybe<T> = T | null;
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
  /**
   * Implement the DateTime<Utc> scalar
   *
   * The input/output is a string in RFC3339 format.
   */
  DateTime: string;
  HexString: string;
  HexString256: string;
  U64: string;
};

export type GqlBlock = {
  __typename: 'Block';
  height: Scalars['U64'];
  id: Scalars['HexString256'];
  producer: Scalars['HexString256'];
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
  amount: Scalars['Int'];
  color: Scalars['HexString256'];
  to: Scalars['HexString256'];
};

export type GqlCoin = {
  __typename: 'Coin';
  amount: Scalars['U64'];
  blockCreated: Scalars['U64'];
  color: Scalars['HexString256'];
  id: Scalars['HexString256'];
  maturity: Scalars['U64'];
  owner: Scalars['HexString256'];
  status: GqlCoinStatus;
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
  /** color of the coins */
  color?: Maybe<Scalars['HexString256']>;
  /** address of the owner */
  owner: Scalars['HexString256'];
};

export type GqlCoinOutput = {
  __typename: 'CoinOutput';
  amount: Scalars['Int'];
  color: Scalars['HexString256'];
  to: Scalars['HexString256'];
};

export enum GqlCoinStatus {
  Spent = 'SPENT',
  Unspent = 'UNSPENT',
}

export type GqlContractCreated = {
  __typename: 'ContractCreated';
  contractId: Scalars['HexString256'];
};

export type GqlContractOutput = {
  __typename: 'ContractOutput';
  balanceRoot: Scalars['HexString256'];
  inputIndex: Scalars['Int'];
  stateRoot: Scalars['HexString256'];
};

export type GqlFailureStatus = {
  __typename: 'FailureStatus';
  blockId: Scalars['HexString256'];
  reason: Scalars['String'];
  time: Scalars['DateTime'];
};

export type GqlInput = GqlInputCoin | GqlInputContract;

export type GqlInputCoin = {
  __typename: 'InputCoin';
  amount: Scalars['Int'];
  color: Scalars['HexString256'];
  maturity: Scalars['Int'];
  owner: Scalars['HexString256'];
  predicate: Scalars['HexString'];
  predicateData: Scalars['HexString'];
  utxoId: Scalars['HexString256'];
  witnessIndex: Scalars['Int'];
};

export type GqlInputContract = {
  __typename: 'InputContract';
  balanceRoot: Scalars['HexString256'];
  contractId: Scalars['HexString256'];
  stateRoot: Scalars['HexString256'];
  utxoId: Scalars['HexString256'];
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
  submit: Scalars['HexString256'];
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

export type GqlQuery = {
  __typename: 'Query';
  block?: Maybe<GqlBlock>;
  blocks: GqlBlockConnection;
  chain: GqlChainInfo;
  coin?: Maybe<GqlCoin>;
  coins: GqlCoinConnection;
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
  height?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['HexString256']>;
};

export type GqlQueryBlocksArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type GqlQueryCoinArgs = {
  id: Scalars['HexString256'];
};

export type GqlQueryCoinsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  filter: GqlCoinFilterInput;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
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
  id: Scalars['HexString256'];
};

export type GqlQueryTransactionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type GqlQueryTransactionsByOwnerArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  owner: Scalars['HexString256'];
};

export type GqlReceipt = {
  __typename: 'Receipt';
  a?: Maybe<Scalars['U64']>;
  amount?: Maybe<Scalars['U64']>;
  b?: Maybe<Scalars['U64']>;
  color?: Maybe<Scalars['HexString256']>;
  data?: Maybe<Scalars['HexString']>;
  digest?: Maybe<Scalars['HexString256']>;
  gas?: Maybe<Scalars['U64']>;
  gasUsed?: Maybe<Scalars['U64']>;
  id?: Maybe<Scalars['HexString256']>;
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
  to?: Maybe<Scalars['HexString256']>;
  toAddress?: Maybe<Scalars['HexString256']>;
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

export type GqlSubmittedStatus = {
  __typename: 'SubmittedStatus';
  time: Scalars['DateTime'];
};

export type GqlSuccessStatus = {
  __typename: 'SuccessStatus';
  blockId: Scalars['HexString256'];
  programState: Scalars['HexString'];
  time: Scalars['DateTime'];
};

export type GqlTransaction = {
  __typename: 'Transaction';
  bytecodeWitnessIndex?: Maybe<Scalars['Int']>;
  gasLimit: Scalars['Int'];
  gasPrice: Scalars['Int'];
  id: Scalars['HexString256'];
  inputColors: Array<Scalars['HexString256']>;
  inputContracts: Array<Scalars['HexString256']>;
  inputs: Array<GqlInput>;
  isScript: Scalars['Boolean'];
  maturity: Scalars['Int'];
  outputs: Array<GqlOutput>;
  /** Return the transaction bytes using canonical encoding */
  rawPayload: Scalars['HexString'];
  receipts?: Maybe<Array<GqlReceipt>>;
  receiptsRoot?: Maybe<Scalars['HexString256']>;
  salt?: Maybe<Scalars['HexString256']>;
  script?: Maybe<Scalars['HexString']>;
  scriptData?: Maybe<Scalars['HexString']>;
  staticContracts?: Maybe<Array<Scalars['HexString256']>>;
  status?: Maybe<GqlTransactionStatus>;
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
  amount: Scalars['Int'];
  color: Scalars['HexString256'];
  to: Scalars['HexString256'];
};

export type GqlWithdrawalOutput = {
  __typename: 'WithdrawalOutput';
  amount: Scalars['Int'];
  color: Scalars['HexString256'];
  to: Scalars['HexString256'];
};

export type GqlTransactionFragmentFragment = {
  __typename: 'Transaction';
  id: string;
  rawPayload: string;
  status?:
    | {
        __typename: 'FailureStatus';
        blockId: string;
        time: string;
        reason: string;
        type: 'FailureStatus';
      }
    | { __typename: 'SubmittedStatus'; time: string; type: 'SubmittedStatus' }
    | {
        __typename: 'SuccessStatus';
        blockId: string;
        time: string;
        programState: string;
        type: 'SuccessStatus';
      }
    | null
    | undefined;
};

export type GqlReceiptFragmentFragment = {
  __typename: 'Receipt';
  id?: string | null | undefined;
  data?: string | null | undefined;
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
  id: string;
  owner: string;
  amount: string;
  color: string;
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
  transactionId: Scalars['HexString256'];
}>;

export type GqlGetTransactionQuery = {
  __typename: 'Query';
  transaction?:
    | {
        __typename: 'Transaction';
        id: string;
        rawPayload: string;
        status?:
          | {
              __typename: 'FailureStatus';
              blockId: string;
              time: string;
              reason: string;
              type: 'FailureStatus';
            }
          | { __typename: 'SubmittedStatus'; time: string; type: 'SubmittedStatus' }
          | {
              __typename: 'SuccessStatus';
              blockId: string;
              time: string;
              programState: string;
              type: 'SuccessStatus';
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type GqlGetTransactionWithReceiptsQueryVariables = Exact<{
  transactionId: Scalars['HexString256'];
}>;

export type GqlGetTransactionWithReceiptsQuery = {
  __typename: 'Query';
  transaction?:
    | {
        __typename: 'Transaction';
        id: string;
        rawPayload: string;
        receipts?:
          | Array<{
              __typename: 'Receipt';
              id?: string | null | undefined;
              data?: string | null | undefined;
              rawPayload: string;
            }>
          | null
          | undefined;
        status?:
          | {
              __typename: 'FailureStatus';
              blockId: string;
              time: string;
              reason: string;
              type: 'FailureStatus';
            }
          | { __typename: 'SubmittedStatus'; time: string; type: 'SubmittedStatus' }
          | {
              __typename: 'SuccessStatus';
              blockId: string;
              time: string;
              programState: string;
              type: 'SuccessStatus';
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type GqlGetTransactionsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
}>;

export type GqlGetTransactionsQuery = {
  __typename: 'Query';
  transactions: {
    __typename: 'TransactionConnection';
    edges?:
      | Array<
          | {
              __typename: 'TransactionEdge';
              node: {
                __typename: 'Transaction';
                id: string;
                rawPayload: string;
                status?:
                  | {
                      __typename: 'FailureStatus';
                      blockId: string;
                      time: string;
                      reason: string;
                      type: 'FailureStatus';
                    }
                  | { __typename: 'SubmittedStatus'; time: string; type: 'SubmittedStatus' }
                  | {
                      __typename: 'SuccessStatus';
                      blockId: string;
                      time: string;
                      programState: string;
                      type: 'SuccessStatus';
                    }
                  | null
                  | undefined;
              };
            }
          | null
          | undefined
        >
      | null
      | undefined;
  };
};

export type GqlGetTransactionsByOwnerQueryVariables = Exact<{
  owner: Scalars['HexString256'];
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
}>;

export type GqlGetTransactionsByOwnerQuery = {
  __typename: 'Query';
  transactionsByOwner: {
    __typename: 'TransactionConnection';
    edges?:
      | Array<
          | {
              __typename: 'TransactionEdge';
              node: {
                __typename: 'Transaction';
                id: string;
                rawPayload: string;
                status?:
                  | {
                      __typename: 'FailureStatus';
                      blockId: string;
                      time: string;
                      reason: string;
                      type: 'FailureStatus';
                    }
                  | { __typename: 'SubmittedStatus'; time: string; type: 'SubmittedStatus' }
                  | {
                      __typename: 'SuccessStatus';
                      blockId: string;
                      time: string;
                      programState: string;
                      type: 'SuccessStatus';
                    }
                  | null
                  | undefined;
              };
            }
          | null
          | undefined
        >
      | null
      | undefined;
  };
};

export type GqlGetBlockQueryVariables = Exact<{
  blockId?: Maybe<Scalars['HexString256']>;
  blockHeight?: Maybe<Scalars['Int']>;
}>;

export type GqlGetBlockQuery = {
  __typename: 'Query';
  block?:
    | {
        __typename: 'Block';
        id: string;
        height: string;
        producer: string;
        time: string;
        transactions: Array<{ __typename: 'Transaction'; id: string }>;
      }
    | null
    | undefined;
};

export type GqlGetBlockWithTransactionsQueryVariables = Exact<{
  blockId?: Maybe<Scalars['HexString256']>;
  blockHeight?: Maybe<Scalars['Int']>;
}>;

export type GqlGetBlockWithTransactionsQuery = {
  __typename: 'Query';
  block?:
    | {
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
                blockId: string;
                time: string;
                reason: string;
                type: 'FailureStatus';
              }
            | { __typename: 'SubmittedStatus'; time: string; type: 'SubmittedStatus' }
            | {
                __typename: 'SuccessStatus';
                blockId: string;
                time: string;
                programState: string;
                type: 'SuccessStatus';
              }
            | null
            | undefined;
        }>;
      }
    | null
    | undefined;
};

export type GqlGetBlocksQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
}>;

export type GqlGetBlocksQuery = {
  __typename: 'Query';
  blocks: {
    __typename: 'BlockConnection';
    edges?:
      | Array<
          | {
              __typename: 'BlockEdge';
              node: {
                __typename: 'Block';
                id: string;
                height: string;
                producer: string;
                time: string;
                transactions: Array<{ __typename: 'Transaction'; id: string }>;
              };
            }
          | null
          | undefined
        >
      | null
      | undefined;
  };
};

export type GqlGetCoinQueryVariables = Exact<{
  coinId: Scalars['HexString256'];
}>;

export type GqlGetCoinQuery = {
  __typename: 'Query';
  coin?:
    | {
        __typename: 'Coin';
        id: string;
        owner: string;
        amount: string;
        color: string;
        maturity: string;
        status: GqlCoinStatus;
        blockCreated: string;
      }
    | null
    | undefined;
};

export type GqlGetCoinsQueryVariables = Exact<{
  filter: GqlCoinFilterInput;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
}>;

export type GqlGetCoinsQuery = {
  __typename: 'Query';
  coins: {
    __typename: 'CoinConnection';
    edges?:
      | Array<
          | {
              __typename: 'CoinEdge';
              node: {
                __typename: 'Coin';
                id: string;
                owner: string;
                amount: string;
                color: string;
                maturity: string;
                status: GqlCoinStatus;
                blockCreated: string;
              };
            }
          | null
          | undefined
        >
      | null
      | undefined;
  };
};

export type GqlDryRunMutationVariables = Exact<{
  encodedTransaction: Scalars['HexString'];
}>;

export type GqlDryRunMutation = {
  __typename: 'Mutation';
  dryRun: Array<{
    __typename: 'Receipt';
    id?: string | null | undefined;
    data?: string | null | undefined;
    rawPayload: string;
  }>;
};

export type GqlSubmitMutationVariables = Exact<{
  encodedTransaction: Scalars['HexString'];
}>;

export type GqlSubmitMutation = { __typename: 'Mutation'; submit: string };

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
        blockId
        time
        programState
      }
      ... on FailureStatus {
        blockId
        time
        reason
      }
    }
  }
`;
export const ReceiptFragmentFragmentDoc = gql`
  fragment receiptFragment on Receipt {
    id
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
    id
    owner
    amount
    color
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
  query getTransaction($transactionId: HexString256!) {
    transaction(id: $transactionId) {
      ...transactionFragment
    }
  }
  ${TransactionFragmentFragmentDoc}
`;
export const GetTransactionWithReceiptsDocument = gql`
  query getTransactionWithReceipts($transactionId: HexString256!) {
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
    $owner: HexString256!
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
  query getBlock($blockId: HexString256, $blockHeight: Int) {
    block(id: $blockId, height: $blockHeight) {
      ...blockFragment
    }
  }
  ${BlockFragmentFragmentDoc}
`;
export const GetBlockWithTransactionsDocument = gql`
  query getBlockWithTransactions($blockId: HexString256, $blockHeight: Int) {
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
  query getCoin($coinId: HexString256!) {
    coin(id: $coinId) {
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
    submit(tx: $encodedTransaction)
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

/**
 *
 */
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
