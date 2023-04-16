/* eslint-disable @typescript-eslint/triple-slash-reference */

/**
 * Referencing secondary entry-points
 */
/// <reference path="./cli.ts" />
/// <reference path="./runTypegen.ts" />

export * from './AbiTypeGen';

export * from './types/interfaces/IFile';
export * from './types/interfaces/IFunction';
export * from './types/interfaces/IRawAbi';
export * from './types/interfaces/IRawAbiFunction';
export * from './types/interfaces/IRawAbiType';
export * from './types/interfaces/IRawAbiLoggedTypes';
