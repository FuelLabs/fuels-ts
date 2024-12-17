import { AbstractProgram } from '@fuel-ts/program';

/**
 * @hidden
 */
export abstract class AbstractScript extends AbstractProgram {
  abstract bytes: Uint8Array;
}
