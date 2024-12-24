import { randomUUID } from '@fuel-ts/crypto';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { globSync } from 'glob';
import { cpSync, mkdirSync, rmdirSync, rmSync } from 'node:fs';
import path from 'node:path';

import { getProgramDetails, normalizeProjectName } from './utils';

/**
 * @group node
 */
describe('normalizeProjectName', () => {
  test('should normalize project name', () => {
    expect(normalizeProjectName('DsToken')).toEqual('DsToken');
    expect(normalizeProjectName('test')).toEqual('Test');
    expect(normalizeProjectName('ds-token')).toEqual('DsToken');
    expect(normalizeProjectName('ds_token')).toEqual('DsToken');
    expect(normalizeProjectName('Aaa_bbb_CCDD-EEE')).toEqual('AaaBbbCCDDEEE');
    expect(normalizeProjectName('ds token')).toEqual('DsToken');
    expect(normalizeProjectName('name.abi')).toEqual('NameAbi');
    expect(normalizeProjectName('1234name.abi')).toEqual('NameAbi');
    expect(normalizeProjectName('ERC20.abi')).toEqual('ERC20Abi');
    expect(normalizeProjectName('my-contract')).toEqual('MyContract');
    expect(normalizeProjectName('my contract')).toEqual('MyContract');
    expect(normalizeProjectName('my.contract')).toEqual('MyContract');
    expect(normalizeProjectName('still-my.contract')).toEqual('StillMyContract');
    expect(normalizeProjectName('also my.contract')).toEqual('AlsoMyContract');
  });

  test('throws if name cannot be normalized', async () => {
    await expectToThrowFuelError(
      () => normalizeProjectName(''),
      new FuelError(
        ErrorCode.PARSE_FAILED,
        `The provided string '' results in an empty output after`.concat(
          ` normalization, therefore, it can't normalize string.`
        )
      )
    );
  });
});

function getUniqueBuildOutputs(buildOutputsPath: string) {
  const uniquePath = path.join(buildOutputsPath, '../', randomUUID());

  mkdirSync(uniquePath, { recursive: true });

  cpSync(buildOutputsPath, uniquePath, { recursive: true });

  return {
    path: uniquePath,
    [Symbol.dispose]: () => {
      rmdirSync(uniquePath, { recursive: true });
    },
  };
}
/**
 * @group node
 */
describe('getProgramDetails', () => {
  const workspacePath = path.join(process.cwd(), 'packages/fuels/test/fixtures/workspace');
  const buildOutputs = {
    predicate: path.join(workspacePath, 'predicates/predicate/out/release'),
    script: path.join(workspacePath, 'scripts/script/out/release'),
    contract: path.join(workspacePath, 'contracts/bar/out/release'),
  };
  test('works with valid folder', () => {
    const result = getProgramDetails([buildOutputs.predicate]);

    expect(result).toHaveLength(1);
  });
  test('works with valid abi json file as path', () => {
    const result = getProgramDetails([
      path.join(buildOutputs.predicate, 'predicate-true-abi.json'),
    ]);

    expect(result).toHaveLength(1);
  });

  test('throws if no abi json file found', async () => {
    using predicateOutputs = getUniqueBuildOutputs(buildOutputs.predicate);
    const abiJsonFile = globSync(`${predicateOutputs.path}/*-abi.json`)[0];
    rmSync(abiJsonFile);

    await expectToThrowFuelError(
      () => getProgramDetails([predicateOutputs.path]),
      new FuelError(ErrorCode.NO_ABIS_FOUND, `No abi file found in ${predicateOutputs.path}`)
    );
  });

  test('throws when missing bytecode for predicate', async () => {
    using predicateOutputs = getUniqueBuildOutputs(buildOutputs.predicate);
    const binFile = globSync(`${predicateOutputs.path}/*.bin`)[0];
    rmSync(binFile);

    await expectToThrowFuelError(
      () => getProgramDetails([predicateOutputs.path]),
      new FuelError(
        ErrorCode.BIN_FILE_NOT_FOUND,
        `For predicates, the bytecode is required. No bytecode found for predicate at ${predicateOutputs.path}.`
      )
    );
  });

  test('throws when missing bytecode for script', async () => {
    using scriptOutputs = getUniqueBuildOutputs(buildOutputs.script);
    const binFile = globSync(`${scriptOutputs.path}/*.bin`)[0];
    rmSync(binFile);
    await expectToThrowFuelError(
      () => getProgramDetails([scriptOutputs.path]),
      new FuelError(
        ErrorCode.BIN_FILE_NOT_FOUND,
        `For scripts, the bytecode is required. No bytecode found for script at ${scriptOutputs.path}.`
      )
    );
  });

  test('logs when missing bytecode for contract', () => {
    using contractOutputs = getUniqueBuildOutputs(buildOutputs.contract);
    const binFile = globSync(`${contractOutputs.path}/*.bin`)[0];
    rmSync(binFile);

    const spy = vi.spyOn(console, 'log').mockImplementationOnce(() => {});
    const result = getProgramDetails([contractOutputs.path]);

    expect(spy).toHaveBeenCalledWith(
      `No bytecode found for contract at ${contractOutputs.path}, will not generate ContractFactory for it.`
    );

    expect(result).toHaveLength(1);
  });
});
