import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { assertUnreachable, compressBytecode, hexlify } from '@fuel-ts/utils';
import { readFileSync } from 'fs';
import { globSync } from 'glob';

import type { AbiSpecification } from '../../parser';
import { AbiParser } from '../../parser';
import type { ProgramDetails } from '../abi-gen-types';

export const loggingConfig = {
  silent: false,
};

export function log(...args: Parameters<typeof console.log>) {
  if (!loggingConfig.silent) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}

/**
 * Converts `some.string-value` into `SomeStringValue`.
 *
 * Examples:
 *  my-simple.test —— MySimpleTest
 *  myFile.ts —— MyFileTs
 *  my-abi.json —— MyAbiJson
 */
export function normalizeProjectName(str: string): string {
  const transformations: ((s: string) => string)[] = [
    (s) => s.replace(/\s+/g, '-'), // spaces to -
    (s) => s.replace(/\./g, '-'), // dots to -
    (s) => s.replace(/_/g, '-'), // underscore to -
    (s) => s.replace(/-[a-z]/g, (match) => match.slice(-1).toUpperCase()), // delete '-' and capitalize the letter after them
    (s) => s.replace(/-/g, ''), // delete any '-' left
    (s) => s.replace(/^\d+/, ''), // removes leading digits
  ];

  const output = transformations.reduce((s, t) => t(s), str);

  if (output === '') {
    const errMsg = `The provided string '${str}' results in an empty output after`.concat(
      ` normalization, therefore, it can't normalize string.`
    );
    throw new FuelError(ErrorCode.PARSE_FAILED, errMsg);
  }

  return output[0].toUpperCase() + output.slice(1); // capitalize first letter
}

function handleMissingBinary(path: string, abi: AbiSpecification) {
  const programType = abi.programType as 'predicate' | 'script' | 'contract' | 'library';
  switch (programType) {
    case 'predicate':
      throw new FuelError(
        ErrorCode.BIN_FILE_NOT_FOUND,
        `For predicates, the bytecode is required. No bytecode found for predicate at ${path}.`
      );
    case 'script':
      throw new FuelError(
        ErrorCode.BIN_FILE_NOT_FOUND,
        `For scripts, the bytecode is required. No bytecode found for script at ${path}.`
      );
    case 'contract':
      log(`No bytecode found for contract at ${path}, will not generate ContractFactory for it.`);
      break;
    case 'library':
      // ignore;
      break;
    default:
      assertUnreachable(programType);
  }
}

export function getProgramDetails(paths: string[]) {
  const details: ProgramDetails[] = [];
  paths.forEach((path) => {
    const abiPath = path.match(/.+-abi\.json/) ? path : globSync(`${path}/*-abi.json`)[0];
    if (abiPath === undefined) {
      throw new FuelError(ErrorCode.NO_ABIS_FOUND, `No abi file found in ${path}`);
    }

    const dir = abiPath.match(/.*\//)?.[0] as string;
    const projectName = abiPath.match(/([^/])+(?=-abi\.json)/)?.[0] as string;
    const abiContentsStr = readFileSync(abiPath).toString();
    const abi = JSON.parse(abiContentsStr) as AbiSpecification;

    const [storageSlotsPath] = globSync(`${dir}/*-storage_slots.json`);
    const storageSlots = storageSlotsPath ? readFileSync(storageSlotsPath).toString() : undefined;

    const [binPath] = globSync(`${dir}/*.bin`);
    if (binPath === undefined) {
      handleMissingBinary(path, abi);
    }

    const binCompressed = binPath && compressBytecode(hexlify(readFileSync(binPath)));

    details.push({
      name: normalizeProjectName(projectName),
      abi: AbiParser.parse(JSON.parse(abiContentsStr) as AbiSpecification),
      binCompressed,
      abiContents: abiContentsStr,
      storageSlots,
    });
  });

  return details;
}
