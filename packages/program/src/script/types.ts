import { AbstractProgram } from '../types';

/**
 * @hidden
 */
export abstract class AbstractScript extends AbstractProgram {
  abstract bytes: Uint8Array;
}
