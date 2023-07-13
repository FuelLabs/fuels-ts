import { AbiCoder, StringCoder } from '@fuel-ts/abi-coder';
import { AbiTypeGen } from '@fuel-ts/abi-typegen';
import { runCliAction } from '@fuel-ts/abi-typegen/cli';
import { runTypegen } from '@fuel-ts/abi-typegen/runTypegen';
import { Address } from '@fuel-ts/address';
import { NativeAssetId } from '@fuel-ts/address/configs';
import { ContractFactory } from '@fuel-ts/contract';
import { hashTransaction, hashMessage } from '@fuel-ts/hasher';
import { HDWallet } from '@fuel-ts/hdwallet';
import { AbstractPredicate } from '@fuel-ts/interfaces';
import { encrypt, decrypt } from '@fuel-ts/keystore';
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
import { GAS_PRICE_FACTOR } from '@fuel-ts/transactions/configs';
import { versions } from '@fuel-ts/versions';
import { runVersions } from '@fuel-ts/versions/cli';
import { Wallet } from '@fuel-ts/wallet';
import { WalletManager } from '@fuel-ts/wallet-manager';
import { FUEL_NETWORK_URL } from '@fuel-ts/wallet/configs';
import { generateTestWallet, seedTestWallet } from '@fuel-ts/wallet/test-utils';
import { english, Language } from '@fuel-ts/wordlists';
import { ScriptRequest } from 'fuels';

const { log } = console;

/**
 * abi-coder
 */
log(AbiCoder);
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
log(NativeAssetId);
log(Address.fromPublicKey('asdfasdf'));

/**
 * contract
 */
log(ContractFactory);

/**
 * fuels (reading class re-exported by umbrella)
 */
log(ScriptRequest);

/**
 * hasher
 */
log(hashTransaction);
log(hashMessage);
log(GAS_PRICE_FACTOR);

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
 * testcases
 */

/**
 * transactions
 */
log(InputCoinCoder);

/**
 * versions
 */
log(runVersions);
log(versions);
// log(getSupportedVersions); // nop
// log(getUserVersions); // nop
// log(compareUserVersions); // nop
// log(colorizeUserVersion); // nop

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
