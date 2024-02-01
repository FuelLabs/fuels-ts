/* eslint-disable @typescript-eslint/no-explicit-any */

// Copied from React.ErrorInfo
interface ErrorInfo {
  /**
   * Captures which component contained the exception, and its ancestors.
   */
  componentStack: string;
}

export type FuelWalletError = {
  timestamp?: number;
  id?: string;
  error?: Error | ErrorEvent | { message: string; stack?: any };
  reactError?: ErrorInfo;
};
