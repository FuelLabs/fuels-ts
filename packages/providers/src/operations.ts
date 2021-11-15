import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
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
  DateTime: any;
  HexString: any;
  HexString256: any;
  U64: any;
};

export type Block = {
  __typename?: 'Block';
  height: Scalars['U64'];
  id: Scalars['HexString256'];
  producer: Scalars['HexString256'];
  time: Scalars['DateTime'];
  transactions: Array<Transaction>;
};

export type BlockConnection = {
  __typename?: 'BlockConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<BlockEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type BlockEdge = {
  __typename?: 'BlockEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: Block;
};

export type ChainInfo = {
  __typename?: 'ChainInfo';
  baseChainHeight: Scalars['U64'];
  latestBlock: Block;
  name: Scalars['String'];
  peerCount: Scalars['Int'];
};

export type ChangeOutput = {
  __typename?: 'ChangeOutput';
  amount: Scalars['Int'];
  color: Scalars['HexString256'];
  to: Scalars['HexString256'];
};

export type Coin = {
  __typename?: 'Coin';
  amount: Scalars['U64'];
  blockCreated: Scalars['U64'];
  color: Scalars['HexString256'];
  id: Scalars['HexString256'];
  maturity: Scalars['U64'];
  owner: Scalars['HexString256'];
  status: CoinStatus;
};

export type CoinConnection = {
  __typename?: 'CoinConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<CoinEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CoinEdge = {
  __typename?: 'CoinEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: Coin;
};

export type CoinOutput = {
  __typename?: 'CoinOutput';
  amount: Scalars['Int'];
  color: Scalars['HexString256'];
  to: Scalars['HexString256'];
};

export enum CoinStatus {
  Spent = 'SPENT',
  Unspent = 'UNSPENT'
}

export type ContractCreated = {
  __typename?: 'ContractCreated';
  contractId: Scalars['HexString256'];
};

export type ContractOutput = {
  __typename?: 'ContractOutput';
  balanceRoot: Scalars['HexString256'];
  inputIndex: Scalars['Int'];
  stateRoot: Scalars['HexString256'];
};

export type FailureStatus = {
  __typename?: 'FailureStatus';
  blockId: Scalars['HexString256'];
  reason: Scalars['String'];
  time: Scalars['DateTime'];
};

export type Input = InputCoin | InputContract;

export type InputCoin = {
  __typename?: 'InputCoin';
  amount: Scalars['Int'];
  color: Scalars['HexString256'];
  maturity: Scalars['Int'];
  owner: Scalars['HexString256'];
  predicate: Scalars['HexString'];
  predicateData: Scalars['HexString'];
  utxoId: Scalars['HexString256'];
  witnessIndex: Scalars['Int'];
};

export type InputContract = {
  __typename?: 'InputContract';
  balanceRoot: Scalars['HexString256'];
  contractId: Scalars['HexString256'];
  stateRoot: Scalars['HexString256'];
  utxoId: Scalars['HexString256'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** dry-run the transaction using a fork of current state, no changes are committed. */
  dryRun: Array<Receipt>;
  endSession: Scalars['Boolean'];
  execute: Scalars['Boolean'];
  reset: Scalars['Boolean'];
  startSession: Scalars['ID'];
  /** Submits transaction to the pool */
  submit: Scalars['HexString256'];
};


export type MutationDryRunArgs = {
  tx: Scalars['HexString'];
};


export type MutationEndSessionArgs = {
  id: Scalars['ID'];
};


export type MutationExecuteArgs = {
  id: Scalars['ID'];
  op: Scalars['String'];
};


export type MutationResetArgs = {
  id: Scalars['ID'];
};


export type MutationSubmitArgs = {
  tx: Scalars['HexString'];
};

export type Output = ChangeOutput | CoinOutput | ContractCreated | ContractOutput | VariableOutput | WithdrawalOutput;

/** Information about pagination in a connection */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  block?: Maybe<Block>;
  blocks: BlockConnection;
  chain: ChainInfo;
  coin?: Maybe<Coin>;
  coinsByOwner: CoinConnection;
  /** Returns true when the GraphQL API is serving requests. */
  health: Scalars['Boolean'];
  memory: Scalars['String'];
  register: Scalars['U64'];
  transaction?: Maybe<Transaction>;
  transactions: TransactionConnection;
  transactionsByOwner: TransactionConnection;
  version: Scalars['String'];
};


export type QueryBlockArgs = {
  height?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['HexString256']>;
};


export type QueryBlocksArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryCoinArgs = {
  id: Scalars['HexString256'];
};


export type QueryCoinsByOwnerArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  owner: Scalars['HexString256'];
};


export type QueryMemoryArgs = {
  id: Scalars['ID'];
  size: Scalars['U64'];
  start: Scalars['U64'];
};


export type QueryRegisterArgs = {
  id: Scalars['ID'];
  register: Scalars['U64'];
};


export type QueryTransactionArgs = {
  id: Scalars['HexString256'];
};


export type QueryTransactionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryTransactionsByOwnerArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  owner: Scalars['HexString256'];
};

export type Receipt = {
  __typename?: 'Receipt';
  a?: Maybe<Scalars['Int']>;
  amount?: Maybe<Scalars['Int']>;
  b?: Maybe<Scalars['Int']>;
  color?: Maybe<Scalars['HexString256']>;
  digest?: Maybe<Scalars['HexString256']>;
  gas?: Maybe<Scalars['Int']>;
  id: Scalars['HexString256'];
  is: Scalars['Int'];
  len?: Maybe<Scalars['Int']>;
  pc: Scalars['Int'];
  ptr?: Maybe<Scalars['Int']>;
  ra?: Maybe<Scalars['Int']>;
  rawPayload: Scalars['HexString'];
  rb?: Maybe<Scalars['Int']>;
  rc?: Maybe<Scalars['Int']>;
  rd?: Maybe<Scalars['Int']>;
  reason?: Maybe<Scalars['Int']>;
  receiptType: ReceiptType;
  to?: Maybe<Scalars['HexString256']>;
  toAddress?: Maybe<Scalars['HexString256']>;
  val?: Maybe<Scalars['Int']>;
};

export enum ReceiptType {
  Call = 'CALL',
  Log = 'LOG',
  LogData = 'LOG_DATA',
  Panic = 'PANIC',
  Return = 'RETURN',
  ReturnData = 'RETURN_DATA',
  Revert = 'REVERT',
  Transfer = 'TRANSFER',
  TransferOut = 'TRANSFER_OUT'
}

export type SubmittedStatus = {
  __typename?: 'SubmittedStatus';
  time: Scalars['DateTime'];
};

export type SuccessStatus = {
  __typename?: 'SuccessStatus';
  blockId: Scalars['HexString256'];
  programState: Scalars['HexString'];
  time: Scalars['DateTime'];
};

export type Transaction = {
  __typename?: 'Transaction';
  bytecodeWitnessIndex?: Maybe<Scalars['Int']>;
  gasLimit: Scalars['Int'];
  gasPrice: Scalars['Int'];
  id: Scalars['HexString256'];
  inputColors: Array<Scalars['HexString256']>;
  inputContracts: Array<Scalars['HexString256']>;
  inputs: Array<Input>;
  isScript: Scalars['Boolean'];
  maturity: Scalars['Int'];
  outputs: Array<Output>;
  /** Return the transaction bytes using canonical encoding */
  rawPayload: Scalars['HexString'];
  receipts?: Maybe<Array<Receipt>>;
  receiptsRoot?: Maybe<Scalars['HexString256']>;
  salt?: Maybe<Scalars['HexString256']>;
  script?: Maybe<Scalars['HexString']>;
  scriptData?: Maybe<Scalars['HexString']>;
  staticContracts?: Maybe<Array<Scalars['HexString256']>>;
  status?: Maybe<TransactionStatus>;
  witnesses: Array<Scalars['HexString']>;
};

export type TransactionConnection = {
  __typename?: 'TransactionConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<TransactionEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type TransactionEdge = {
  __typename?: 'TransactionEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: Transaction;
};

export type TransactionStatus = FailureStatus | SubmittedStatus | SuccessStatus;

export type VariableOutput = {
  __typename?: 'VariableOutput';
  amount: Scalars['Int'];
  color: Scalars['HexString256'];
  to: Scalars['HexString256'];
};

export type WithdrawalOutput = {
  __typename?: 'WithdrawalOutput';
  amount: Scalars['Int'];
  color: Scalars['HexString256'];
  to: Scalars['HexString256'];
};

export type GetVersionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVersionQuery = { __typename?: 'Query', version: string };

export type TransactionFragmentFragment = { __typename?: 'Transaction', id: any, rawPayload: any, status?: { __typename?: 'FailureStatus', blockId: any, time: any, reason: string, type: 'FailureStatus' } | { __typename?: 'SubmittedStatus', time: any, type: 'SubmittedStatus' } | { __typename?: 'SuccessStatus', blockId: any, time: any, programState: any, type: 'SuccessStatus' } | null | undefined };

export type GetTransactionQueryVariables = Exact<{
  transactionId: Scalars['HexString256'];
}>;


export type GetTransactionQuery = { __typename?: 'Query', transaction?: { __typename?: 'Transaction', id: any, rawPayload: any, status?: { __typename?: 'FailureStatus', blockId: any, time: any, reason: string, type: 'FailureStatus' } | { __typename?: 'SubmittedStatus', time: any, type: 'SubmittedStatus' } | { __typename?: 'SuccessStatus', blockId: any, time: any, programState: any, type: 'SuccessStatus' } | null | undefined } | null | undefined };

export type GetTransactionWithReceiptsQueryVariables = Exact<{
  transactionId: Scalars['HexString256'];
}>;


export type GetTransactionWithReceiptsQuery = { __typename?: 'Query', transaction?: { __typename?: 'Transaction', id: any, rawPayload: any, receipts?: Array<{ __typename?: 'Receipt', rawPayload: any }> | null | undefined, status?: { __typename?: 'FailureStatus', blockId: any, time: any, reason: string, type: 'FailureStatus' } | { __typename?: 'SubmittedStatus', time: any, type: 'SubmittedStatus' } | { __typename?: 'SuccessStatus', blockId: any, time: any, programState: any, type: 'SuccessStatus' } | null | undefined } | null | undefined };

export type GetTransactionsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
}>;


export type GetTransactionsQuery = { __typename?: 'Query', transactions: { __typename?: 'TransactionConnection', edges?: Array<{ __typename?: 'TransactionEdge', node: { __typename?: 'Transaction', id: any, rawPayload: any, status?: { __typename?: 'FailureStatus', blockId: any, time: any, reason: string, type: 'FailureStatus' } | { __typename?: 'SubmittedStatus', time: any, type: 'SubmittedStatus' } | { __typename?: 'SuccessStatus', blockId: any, time: any, programState: any, type: 'SuccessStatus' } | null | undefined } } | null | undefined> | null | undefined } };

export type BlockFragmentFragment = { __typename?: 'Block', id: any, height: any, producer: any, time: any, transactions: Array<{ __typename?: 'Transaction', id: any, rawPayload: any }> };

export type GetBlockQueryVariables = Exact<{
  blockId: Scalars['HexString256'];
}>;


export type GetBlockQuery = { __typename?: 'Query', block?: { __typename?: 'Block', id: any, height: any, producer: any, time: any, transactions: Array<{ __typename?: 'Transaction', id: any, rawPayload: any }> } | null | undefined };

export type GetBlocksQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
}>;


export type GetBlocksQuery = { __typename?: 'Query', blocks: { __typename?: 'BlockConnection', edges?: Array<{ __typename?: 'BlockEdge', node: { __typename?: 'Block', id: any, height: any, producer: any, time: any, transactions: Array<{ __typename?: 'Transaction', id: any, rawPayload: any }> } } | null | undefined> | null | undefined } };

export type GetCoinQueryVariables = Exact<{
  coinId: Scalars['HexString256'];
}>;


export type GetCoinQuery = { __typename?: 'Query', coin?: { __typename?: 'Coin', id: any, owner: any, amount: any, color: any, maturity: any, status: CoinStatus, blockCreated: any } | null | undefined };

export type DryRunMutationVariables = Exact<{
  encodedTransaction: Scalars['HexString'];
}>;


export type DryRunMutation = { __typename?: 'Mutation', dryRun: Array<{ __typename?: 'Receipt', rawPayload: any }> };

export type SubmitMutationVariables = Exact<{
  encodedTransaction: Scalars['HexString'];
}>;


export type SubmitMutation = { __typename?: 'Mutation', submit: any };

export type StartSessionMutationVariables = Exact<{ [key: string]: never; }>;


export type StartSessionMutation = { __typename?: 'Mutation', startSession: string };

export type EndSessionMutationVariables = Exact<{
  sessionId: Scalars['ID'];
}>;


export type EndSessionMutation = { __typename?: 'Mutation', endSession: boolean };

export type ExecuteMutationVariables = Exact<{
  sessionId: Scalars['ID'];
  op: Scalars['String'];
}>;


export type ExecuteMutation = { __typename?: 'Mutation', execute: boolean };

export type ResetMutationVariables = Exact<{
  sessionId: Scalars['ID'];
}>;


export type ResetMutation = { __typename?: 'Mutation', reset: boolean };

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
export const BlockFragmentFragmentDoc = gql`
    fragment blockFragment on Block {
  id
  height
  producer
  transactions {
    id
    rawPayload
  }
  time
}
    `;
export const GetVersionDocument = gql`
    query getVersion {
  version
}
    `;
export const GetTransactionDocument = gql`
    query getTransaction($transactionId: HexString256!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${TransactionFragmentFragmentDoc}`;
export const GetTransactionWithReceiptsDocument = gql`
    query getTransactionWithReceipts($transactionId: HexString256!) {
  transaction(id: $transactionId) {
    ...transactionFragment
    receipts {
      rawPayload
    }
  }
}
    ${TransactionFragmentFragmentDoc}`;
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
    ${TransactionFragmentFragmentDoc}`;
export const GetBlockDocument = gql`
    query getBlock($blockId: HexString256!) {
  block(id: $blockId) {
    ...blockFragment
  }
}
    ${BlockFragmentFragmentDoc}`;
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
    ${BlockFragmentFragmentDoc}`;
export const GetCoinDocument = gql`
    query getCoin($coinId: HexString256!) {
  coin(id: $coinId) {
    id
    owner
    amount
    color
    maturity
    status
    blockCreated
  }
}
    `;
export const DryRunDocument = gql`
    mutation dryRun($encodedTransaction: HexString!) {
  dryRun(tx: $encodedTransaction) {
    rawPayload
  }
}
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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getVersion(variables?: GetVersionQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetVersionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetVersionQuery>(GetVersionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getVersion');
    },
    getTransaction(variables: GetTransactionQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTransactionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTransactionQuery>(GetTransactionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTransaction');
    },
    getTransactionWithReceipts(variables: GetTransactionWithReceiptsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTransactionWithReceiptsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTransactionWithReceiptsQuery>(GetTransactionWithReceiptsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTransactionWithReceipts');
    },
    getTransactions(variables?: GetTransactionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTransactionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTransactionsQuery>(GetTransactionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTransactions');
    },
    getBlock(variables: GetBlockQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetBlockQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetBlockQuery>(GetBlockDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getBlock');
    },
    getBlocks(variables?: GetBlocksQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetBlocksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetBlocksQuery>(GetBlocksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getBlocks');
    },
    getCoin(variables: GetCoinQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCoinQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCoinQuery>(GetCoinDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCoin');
    },
    dryRun(variables: DryRunMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DryRunMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DryRunMutation>(DryRunDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'dryRun');
    },
    submit(variables: SubmitMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SubmitMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SubmitMutation>(SubmitDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'submit');
    },
    startSession(variables?: StartSessionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<StartSessionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<StartSessionMutation>(StartSessionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'startSession');
    },
    endSession(variables: EndSessionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EndSessionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<EndSessionMutation>(EndSessionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'endSession');
    },
    execute(variables: ExecuteMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ExecuteMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ExecuteMutation>(ExecuteDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'execute');
    },
    reset(variables: ResetMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ResetMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ResetMutation>(ResetDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'reset');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;