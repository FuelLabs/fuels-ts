import { ErrorCode, FuelError } from '@fuel-ts/errors';

/**
 * Converts `some.string-value` into `SomeStringValue`.
 *
 * Examples:
 *  my-simple.test —— MySimpleTest
 *  myFile.ts —— MyFileTs
 *  my-abi.json —— MyAbiJson
 */
export const normalizeString = (str: string): string => {
  const transformations: ((s: string) => string)[] = [
    (s) => s.replace(/\s+/g, '-'), // spaces to -
    (s) => s.replace(/\./g, '-'), // dots to -
    (s) => s.replace(/_/g, '-'), // underscore to -
    (s) => s.replace(/-[a-z]/g, (match) => match.slice(-1).toUpperCase()), // delete '-' and capitalize the letter after them
    (s) => s.replace(/-/g, ''), // delete any '-' left
    (s) => s.replace(/^\d+/, ''), // removes leading digits
    (s) => s[0].toUpperCase() + s.slice(1), // capitalize first letter
  ];

  const output = transformations.reduce((s, t) => t(s), str);

  if (output === '') {
    const errMsg = `The provided string '${str}' results in an empty output after`.concat(
      ` normalization, therefore, it can't normalize string.`
    );
    throw new FuelError(ErrorCode.PARSE_FAILED, errMsg);
  }

  return output;
};
