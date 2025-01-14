import type { MeasureResponse } from './types';

/**
 * Function to measure the execution time (in seconds) of an asynchronous operation.
 *
 * @param operation - The asynchronous function (Promise) that will be executed and measured.
 * @returns An object containing the `response` of the operation and the `duration` in seconds.
 */
export async function measure<T>(operation: () => Promise<T>): Promise<MeasureResponse<T>> {
  // Should we run in try/catch?
  // let response: T;
  // try {
  //   response = await operation();
  // } catch (err) {
  //   const endTime = Date.now();
  //   console.error(err);
  //   throw err;
  // } finally {
  //   const duration = (Date.now() - startTime) / 1000;
  //   return { response, duration };
  // }

  const start = Date.now();
  const response = await operation();
  const end = Date.now();

  return {
    response,
    duration: (end - start) / 1000,
  };
}

/**
 * Converts an array of objects into a CSV formatted string.
 *
 * @param headers - A tuple containing the headers for the CSV columns.
 * @param data - An array of objects where each object represents a row of data.
 * @returns A string representing the CSV formatted data.
 */
export const toCsv = (headers: [string, string], data: Record<string, unknown>[]) => {
  let valuesAsStrings = data.map((r) => Object.values(r).map((value) => String(value)));
  valuesAsStrings = [headers, ...valuesAsStrings];
  return valuesAsStrings.map((row) => row.join(',')).join('\n');
};
