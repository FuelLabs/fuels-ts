import { generateTestWallet } from '@fuel-ts/account/test-utils';
import { ASSET_A } from '@fuel-ts/utils/test-utils';
import { readFileSync } from 'fs';
import { Script, Provider, FUEL_NETWORK_URL } from 'fuels';
import type { Interface, WalletUnlocked, JsonAbi, BytesLike, Contract } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';
import { join } from 'path';

import { FuelGaugeProjectsEnum } from '../test/fixtures';
import {
  AuthTestingContractAbi__factory,
  AdvancedLoggingAbi__factory,
  AdvancedLoggingOtherContractAbi__factory,
  BytecodeSwayLibAbi__factory,
  CallTestContractAbi__factory,
  ConfigurableContractAbi__factory,
  CoverageContractAbi__factory,
  PayableAnnotationAbi__factory,
  BytesAbi__factory,
  CollisionInFnNamesAbi__factory,
  OptionsAbi__factory,
  StdLibStringAbi__factory,
  StorageTestContractAbi__factory,
  RawSliceAbi__factory,
  MultiTokenContractAbi__factory,
  VectorTypesContractAbi__factory,
  VectorsAbi__factory,
} from '../test/typegen/contracts';
import advancedLoggingBytecode from '../test/typegen/contracts/AdvancedLoggingAbi.hex';
import advancedLoggingOtherContractBytecode from '../test/typegen/contracts/AdvancedLoggingOtherContractAbi.hex';
import authTestingBytecode from '../test/typegen/contracts/AuthTestingContractAbi.hex';
import bytecodeSwayLibBytecode from '../test/typegen/contracts/BytecodeSwayLibAbi.hex';
import bytesBytecode from '../test/typegen/contracts/BytesAbi.hex';
import callTestBytecode from '../test/typegen/contracts/CallTestContractAbi.hex';
import collisionInFnNamesBytecode from '../test/typegen/contracts/CollisionInFnNamesAbi.hex';
import configurableContractBytecode from '../test/typegen/contracts/ConfigurableContractAbi.hex';
import coverageContractBytecode from '../test/typegen/contracts/CoverageContractAbi.hex';
import multiTokenContractBytecode from '../test/typegen/contracts/MultiTokenContractAbi.hex';
import optionsBytecode from '../test/typegen/contracts/OptionsAbi.hex';
import payableAnnotationBytecode from '../test/typegen/contracts/PayableAnnotationAbi.hex';
import rawSliceBytecode from '../test/typegen/contracts/RawSliceAbi.hex';
import stdLibStringBytecode from '../test/typegen/contracts/StdLibStringAbi.hex';
import storageTestContractBytecode from '../test/typegen/contracts/StorageTestContractAbi.hex';
import vectorTypesContractBytecode from '../test/typegen/contracts/VectorTypesContractAbi.hex';
import vectorsBytecode from '../test/typegen/contracts/VectorsAbi.hex';

let walletInstance: WalletUnlocked;
export const createWallet = async () => {
  if (walletInstance) {
    return walletInstance;
  }
  const provider = await Provider.create(FUEL_NETWORK_URL);
  const baseAssetId = provider.getBaseAssetId();
  walletInstance = await generateTestWallet(provider, [
    [500_000_000, baseAssetId],
    [500_000_000, ASSET_A],
  ]);
  return walletInstance;
};

export type SetupConfig = {
  contractBytecode: BytesLike;
  abi: JsonAbi | Interface;
  cache?: boolean;
};

const getFullPath = <T>(contractName: string, next: (fullPath: string) => T) =>
  next(
    join(__dirname, `../test/fixtures/forc-projects/${contractName}/out/release/${contractName}`)
  );

export const getScript = <TInput extends unknown[], TOutput>(
  scriptName: string,
  wallet: WalletUnlocked
): Script<TInput, TOutput> =>
  getFullPath(
    scriptName,
    (fullPath: string) =>
      new Script(
        readFileSync(`${fullPath}.bin`),
        JSON.parse(readFileSync(`${fullPath}-abi.json`, 'utf8')),
        wallet
      )
  );

export const getProgramDir = (name: string) =>
  join(__dirname, `../test/fixtures/forc-projects/${name}`);

export interface DisposableContract extends Contract {
  [Symbol.dispose]: () => Promise<void>;
}

export async function setupContract(type: FuelGaugeProjectsEnum): Promise<DisposableContract> {
  let deployer;
  let bytecode: string;

  switch (type) {
    case FuelGaugeProjectsEnum.ADVANCED_LOGGING:
      deployer = AdvancedLoggingAbi__factory;
      bytecode = advancedLoggingBytecode;
      break;

    case FuelGaugeProjectsEnum.AUTH_TESTING_CONTRACT:
      deployer = AuthTestingContractAbi__factory;
      bytecode = authTestingBytecode;
      break;

    case FuelGaugeProjectsEnum.ADVANCED_LOGGING_OTHER_CONTRACT:
      deployer = AdvancedLoggingOtherContractAbi__factory;
      bytecode = advancedLoggingOtherContractBytecode;
      break;

    case FuelGaugeProjectsEnum.BYTES:
      deployer = BytesAbi__factory;
      bytecode = bytesBytecode;
      break;

    case FuelGaugeProjectsEnum.BYTECODE_SWAY_LIB:
      deployer = BytecodeSwayLibAbi__factory;
      bytecode = bytecodeSwayLibBytecode;
      break;

    case FuelGaugeProjectsEnum.CALL_TEST_CONTRACT:
      deployer = CallTestContractAbi__factory;
      bytecode = callTestBytecode;
      break;

    case FuelGaugeProjectsEnum.COLLISION_IN_FN_NAMES:
      deployer = CollisionInFnNamesAbi__factory;
      bytecode = collisionInFnNamesBytecode;
      break;

    case FuelGaugeProjectsEnum.CONFIGURABLE_CONTRACT:
      deployer = ConfigurableContractAbi__factory;
      bytecode = configurableContractBytecode;
      break;

    case FuelGaugeProjectsEnum.COVERAGE_CONTRACT:
      deployer = CoverageContractAbi__factory;
      bytecode = coverageContractBytecode;
      break;

    case FuelGaugeProjectsEnum.MULTI_TOKEN_CONTRACT:
      deployer = MultiTokenContractAbi__factory;
      bytecode = multiTokenContractBytecode;
      break;

    case FuelGaugeProjectsEnum.OPTIONS:
      deployer = OptionsAbi__factory;
      bytecode = optionsBytecode;
      break;

    case FuelGaugeProjectsEnum.PAYABLE_ANNOTATION:
      deployer = PayableAnnotationAbi__factory;
      bytecode = payableAnnotationBytecode;
      break;

    case FuelGaugeProjectsEnum.RAW_SLICE:
      deployer = RawSliceAbi__factory;
      bytecode = rawSliceBytecode;
      break;

    case FuelGaugeProjectsEnum.STD_LIB_STRING:
      deployer = StdLibStringAbi__factory;
      bytecode = stdLibStringBytecode;
      break;

    case FuelGaugeProjectsEnum.STORAGE_TEST_CONTRACT:
      deployer = StorageTestContractAbi__factory;
      bytecode = storageTestContractBytecode;
      break;

    case FuelGaugeProjectsEnum.VECTORS:
      deployer = VectorsAbi__factory;
      bytecode = vectorsBytecode;
      break;

    case FuelGaugeProjectsEnum.VECTOR_TYPES_CONTRACT:
      deployer = VectorTypesContractAbi__factory;
      bytecode = vectorTypesContractBytecode;
      break;

    default:
      throw new Error('Invalid contract type');
  }

  const {
    contracts: [contract],
    cleanup,
  } = await launchTestNode({
    contractsConfigs: [
      {
        deployer,
        bytecode,
      },
    ],
  });
  return Object.assign(contract, { [Symbol.dispose]: () => Promise.resolve(cleanup()) });
}
