import { Interface, StringCoder } from '@fuel-ts/abi-coder';
import { AbiTypeGen } from '@fuel-ts/abi-typegen';
import { runCliAction } from '@fuel-ts/abi-typegen/cli';
import { runTypegen } from '@fuel-ts/abi-typegen/runTypegen';
import {
  Wallet,
  HDWallet,
  Mnemonic,
  english,
  Language,
  Signer,
  WalletManager,
  Predicate,
  Provider,
} from '@fuel-ts/account';
import { Address } from '@fuel-ts/address';
import { ContractFactory } from '@fuel-ts/contract';
import { encrypt, decrypt } from '@fuel-ts/crypto';
import { hashMessage } from '@fuel-ts/hasher';
import { BN } from '@fuel-ts/math';
import { DEFAULT_PRECISION, DEFAULT_MIN_PRECISION } from '@fuel-ts/math/configs';
import { SparseMerkleTree, constructTree } from '@fuel-ts/merkle';
import { FunctionInvocationScope } from '@fuel-ts/program';
import { Script } from '@fuel-ts/script';
import { InputCoinCoder } from '@fuel-ts/transactions';
import { PANIC_REASONS } from '@fuel-ts/transactions/configs';
import { versions } from '@fuel-ts/versions';
import { runVersions } from '@fuel-ts/versions/cli';
// TODO: Add `launchNode` and `launchNodeAndGetWallets` here
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

/**
 * wordlists
 */
log(english, Language);
