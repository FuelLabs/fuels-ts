import { Interface, StringCoder } from '@fuel-ts/abi-coder';
import { AbiTypeGen } from '@fuel-ts/abi-typegen';
import { runCliAction } from '@fuel-ts/abi-typegen/cli';
import { runTypegen } from '@fuel-ts/abi-typegen/runTypegen';
import { Address } from '@fuel-ts/address';
import { BaseAssetId } from '@fuel-ts/address/configs';
import { ContractFactory } from '@fuel-ts/contract';
import { encrypt, decrypt } from '@fuel-ts/crypto';
import { hashMessage } from '@fuel-ts/hasher';
import { AbstractPredicate } from '@fuel-ts/interfaces';
import { BN } from '@fuel-ts/math';
import { DEFAULT_PRECISION, DEFAULT_MIN_PRECISION } from '@fuel-ts/math/configs';
import { SparseMerkleTree, constructTree } from '@fuel-ts/merkle';
import { Mnemonic } from '@fuel-ts/mnemonic';
import { Predicate } from '@fuel-ts/predicate';
import { FunctionInvocationScope } from '@fuel-ts/program';
import { PANIC_REASONS } from '@fuel-ts/program/configs';
import { Provider } from '@fuel-ts/providers';
import { Script } from '@fuel-ts/script';
import { Signer } from '@fuel-ts/signer';
import { InputCoinCoder } from '@fuel-ts/transactions';
import { versions } from '@fuel-ts/versions';
import { runVersions } from '@fuel-ts/versions/cli';
import { Wallet, HDWallet } from '@fuel-ts/wallet';
import { FUEL_NETWORK_URL } from '@fuel-ts/wallet/configs';
// TODO: Add `launchNode` and `launchNodeAndGetWallets` here
import { generateTestWallet, seedTestWallet } from '@fuel-ts/wallet/test-utils';
import { WalletManager } from '@fuel-ts/wallet-manager';
import { english, Language } from '@fuel-ts/wordlists';
import type { DeployContractOptions, FuelsConfig, UserFuelsConfig } from 'fuels';
import {
  ScriptRequest,
  chunkAndPadBytes,
  normalizeString,
  concatBytes,
  concat,
  arrayify,
  hexlify,
  createConfig,
} from 'fuels';

const { log } = console;

/**
 * abi-coder
 */
log(Interface);
log(StringCoder);
log(new StringCoder(8));

/**
 * abi-typegen
 */
log(AbiTypeGen);
log(runTypegen);
log(runCliAction);
// log(assembleContracts); // nop;

/**
 * address
 */
log(Address);
log(BaseAssetId);
log(Address.fromPublicKey('asdfasdf'));

/**
 * contract
 */
log(ContractFactory);

/**
 * fuels
 */
// class re-exported by umbrella
log(ScriptRequest);

// CLI stuff
export const x: UserFuelsConfig | undefined = undefined;
export const y: FuelsConfig | undefined = undefined;
export const z: DeployContractOptions | undefined = undefined;
log(createConfig);

/**
 * hasher
 */
log(hashMessage);

/**
 * hdwallet
 */
log(HDWallet);

/**
 * interfaces
 */
log(AbstractPredicate);

/**
 * keystore
 */
log(encrypt, decrypt);

/**
 * math
 */
log(BN, DEFAULT_PRECISION);
log(DEFAULT_MIN_PRECISION);

/**
 * merkle
 */
log(SparseMerkleTree, constructTree);

/**
 * mnemonic
 */
log(Mnemonic);

/**
 * predicate
 */
log(Predicate);

/**
 * program
 */
log(FunctionInvocationScope);
log(PANIC_REASONS);

/**
 * providers
 */
log(Provider);

/**
 * script
 */
log(Script);

/**
 * signer
 */
log(Signer);

/**
 * transactions
 */
log(InputCoinCoder);

/**
 * utils
 */
log(chunkAndPadBytes);
log(normalizeString);
log(concatBytes);
log(concat);
log(arrayify);
log(hexlify);

/**
 * versions
 */
log(runVersions);
log(versions);

/**
 * wallet-manager
 */
log(WalletManager);

/**
 * wallet
 */
log(Wallet);
log(generateTestWallet);
log(seedTestWallet);
log(FUEL_NETWORK_URL);

/**
 * wordlists
 */
log(english, Language);
