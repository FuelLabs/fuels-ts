import { compressBytecode, hexlify } from '@fuel-ts/utils';
import { globSync, readFileSync } from 'fs';

import { AbiParser, type Abi } from '../../parser';
import type { AbiSpecification } from '../../parser/abi-parser';

export interface ProgramDetails {
  name: string;
  binCompressed: string;
  abi: Abi;
  abiContents: string;
  storageSlots?: string;
}

/**
 * Converts `some.string-value` into `SomeStringValue`.
 *
 * Examples:
 *  my-simple.test —— MySimpleTest
 *  myFile.ts —— MyFileTs
 *  my-abi.json —— MyAbiJson
 */
function normalizeProjectName(str: string): string {
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
    // throw new FuelError(ErrorCode.PARSE_FAILED, errMsg);
    throw new Error(errMsg);
  }

  return output;
}

export function getProgramDetails(buildDirs: string[]) {
  const details: ProgramDetails[] = [];
  buildDirs.forEach((dir) => {
    const [binPath] = globSync(`${dir}/*.bin`);
    const [storageSlotsPath] = globSync(`${dir}/*-storage_slots.json`);
    const projectName = binPath.match(/([^/])+(?=\.bin)/)?.[0] as string;
    const abiContents = readFileSync(`${dir}/${projectName}-abi.json`).toString();
    const storageSlots = storageSlotsPath ? readFileSync(storageSlotsPath).toString() : undefined;
    const binCompressed = compressBytecode(hexlify(readFileSync(binPath)));

    details.push({
      name: normalizeProjectName(projectName),
      abi: AbiParser.parse(JSON.parse(abiContents) as AbiSpecification),
      binCompressed,
      abiContents,
      storageSlots,
    });
  });

  return details;
}