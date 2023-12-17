import * as abiCoder from '@fuel-ts/abi-coder';
import * as abiTypegen from '@fuel-ts/abi-typegen';
import * as address from '@fuel-ts/address';
import * as contract from '@fuel-ts/contract';
import * as crypto from '@fuel-ts/crypto';
import * as errors from '@fuel-ts/errors';
// forc-bin
// fuels-gauge
import * as hasher from '@fuel-ts/hasher';
import * as hdwallet from '@fuel-ts/hdwallet';
import * as interfaces from '@fuel-ts/interfaces';
import * as math from '@fuel-ts/math';
import * as merkle from '@fuel-ts/merkle';
import * as mnemonic from '@fuel-ts/mnemonic';
import * as predicate from '@fuel-ts/predicate';
import * as program from '@fuel-ts/program';
import * as providers from '@fuel-ts/providers';
import * as script from '@fuel-ts/script';
import * as signer from '@fuel-ts/signer';
import * as transactions from '@fuel-ts/transactions';
import * as utils from '@fuel-ts/utils';
import * as versions from '@fuel-ts/versions';
import * as wallet from '@fuel-ts/wallet';
import * as walletManager from '@fuel-ts/wallet-manager';
import * as wordlists from '@fuel-ts/wordlists';
import * as fuels from 'fuels';

const { log } = console;

log([
  abiCoder,
  abiTypegen,
  address,
  contract,
  errors,
  fuels,
  hasher,
  hdwallet,
  interfaces,
  crypto,
  math,
  merkle,
  mnemonic,
  predicate,
  program,
  providers,
  script,
  signer,
  transactions,
  utils,
  versions,
  wallet,
  walletManager,
  wordlists,
]);
