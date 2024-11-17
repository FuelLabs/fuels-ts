import { FuelError } from '@fuel-ts/errors';

import type { AbiLoggedType } from '../../parser';
import type { AbiCoderLog } from '../abi-coder-types';
import type { AbiEncoding } from '../encoding/encoding';

export class LogRepository {
  /**
   * Log factory
   *
   * @param loggedType - The JSON ABI logged type
   * @param encoding - The encoding schema
   * @returns The log for coding related operations
   */
  private static make = (loggedType: AbiLoggedType, encoding: AbiEncoding): AbiCoderLog => ({
    logId: loggedType.logId,
    value: encoding.getCoder(loggedType),
  });

  /**
   * Internal member fields
   */
  private _logs: Record<string, AbiCoderLog> = {};

  /**
   * @param loggedTypes - The JSON ABI logged types
   * @param encoding - The encoding schema
   */
  public constructor(loggedTypes: AbiLoggedType[], encoding: AbiEncoding) {
    this._logs = Object.fromEntries(
      loggedTypes.map((log) => [log.logId, LogRepository.make(log, encoding)])
    );
  }

  /**
   * Get all the log coders
   */
  public get logs(): Record<string, AbiCoderLog> {
    return this._logs;
  }

  /**
   * Find log type by ID
   *
   * @param name - The configurable name
   * @returns The configurable
   *
   * @throws If the configurable is not found
   */
  public findById(logId: string): AbiCoderLog {
    const log = this._logs[logId];

    if (log === undefined) {
      throw new FuelError(
        FuelError.CODES.LOG_TYPE_NOT_FOUND,
        `The log with the logId "${logId}" could not be found.`
      );
    }
    return log;
  }
}
