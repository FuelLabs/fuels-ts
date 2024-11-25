/* eslint-disable max-classes-per-file */
import type { AbstractAddress } from '@fuel-ts/interfaces';

/**
 * @hidden
 */
export class ChangeOutputCollisionError extends Error {
  override name = 'ChangeOutputCollisionError';
  override message =
    'A ChangeOutput with the same "assetId" already exists for a different "to" address';
}

/**
 * @hidden
 */
export class NoWitnessAtIndexError extends Error {
  override name = 'NoWitnessAtIndexError';
  constructor(public readonly index: number) {
    super();
    this.message = `Witness at index "${index}" was not found`;
  }
}

/**
 * @hidden
 */
export class NoWitnessByOwnerError extends Error {
  override name = 'NoWitnessByOwnerError';
  constructor(public readonly owner: AbstractAddress) {
    super();
    this.message = `A witness for the given owner "${owner}" was not found`;
  }
}
