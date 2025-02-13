import type { DocumentNode, OperationDefinitionNode } from 'graphql';

import type { OperationsNames } from '../provider';

const BLOCK_SENSITIVE_OPERATIONS: OperationsNames[] = [
  'submit',
  'statusChange',
  'getCoinsToSpend',
  'submitAndAwaitStatus',
];

export const isBlockSensitiveOperation = (operationName: OperationsNames): boolean =>
  BLOCK_SENSITIVE_OPERATIONS.includes(operationName);

export const extractOperationDefinition = (operation: DocumentNode) =>
  operation.definitions.find((x) => x.kind === 'OperationDefinition') as OperationDefinitionNode;

export const extractBlockHeight = (response: { extensions?: unknown }): number | undefined => {
  const { extensions } = response;
  return (extensions as { current_fuel_block_height: number })?.current_fuel_block_height;
};
