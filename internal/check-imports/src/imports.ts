import * as abiCoder from '@fuel-ts/abi-coder';
import * as abiTypegen from '@fuel-ts/abi-typegen';
import * as account from '@fuel-ts/account';
import * as address from '@fuel-ts/address';
import * as crypto from '@fuel-ts/crypto';
import * as errors from '@fuel-ts/errors';
// forc-bin
// fuels-gauge
import * as math from '@fuel-ts/math';
import * as merkle from '@fuel-ts/merkle';
import * as program from '@fuel-ts/program';
import * as transactions from '@fuel-ts/transactions';
import * as utils from '@fuel-ts/utils';
import * as versions from '@fuel-ts/versions';
import * as fuels from 'fuels';

const { log } = console;

log([
  abiCoder,
  abiTypegen,
  address,
  errors,
  fuels,
  crypto,
  math,
  merkle,
  program,
  transactions,
  utils,
  versions,
  account,
]);
