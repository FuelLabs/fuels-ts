import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import fs from 'fs';
import type { Contract, WalletUnlocked } from 'fuels';
import {
  ScriptResultDecoderError,
  SendMessageRevertError,
  RequireRevertError,
  AssertFailedRevertError,
  TransferToAddressRevertError,
  bn,
  ContractFactory,
  Provider,
  BaseAssetId,
} from 'fuels';
import path from 'path';

import FactoryAbi from '../fixtures/forc-projects/revert-error/out/debug/revert-error-abi.json';

let contractInstance: Contract;
let wallet: WalletUnlocked;

describe('Revert Error Testing', () => {
  beforeAll(async () => {
    const provider = await Provider.connect('http://127.0.0.1:4000/graphql');
    wallet = await generateTestWallet(provider, [[1_000, BaseAssetId]]);

    const bytecode = fs.readFileSync(
      path.join(__dirname, '../fixtures/forc-projects/revert-error/out/debug/revert-error.bin')
    );
    const factory = new ContractFactory(bytecode, FactoryAbi, wallet);
    contractInstance = await factory.deployContract();
  });

  it('can pass required checks [valid]', async () => {
    const INPUT_PRICE = bn(10);
    const INPUT_TOKEN_ID = bn(100);

    const { logs } = await contractInstance.functions
      .validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE)
      .call();

    expect(
      logs.map((d) => ({ token_id: d.token_id?.toString(), price: d.price?.toString() }))
    ).toEqual([
      {
        token_id: INPUT_TOKEN_ID.toString(),
        price: INPUT_PRICE.toString(),
      },
    ]);
  });

  it('can throw RequireRevertError [invalid price]', async () => {
    const INPUT_PRICE = bn(0);
    const INPUT_TOKEN_ID = bn(100);

    await expect(
      contractInstance.functions.validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE).call()
    ).rejects.toThrow(RequireRevertError);
  });

  it('can throw RequireRevertError [invalid token id]', async () => {
    const INPUT_PRICE = bn(10);
    const INPUT_TOKEN_ID = bn(55);

    await expect(
      contractInstance.functions.validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE).call()
    ).rejects.toThrow(RequireRevertError);
  });

  it('can throw AssertFailedRevertError', async () => {
    const INPUT_PRICE = bn(100);
    const INPUT_TOKEN_ID = bn(100);

    await expect(
      contractInstance.functions.validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE).call()
    ).rejects.toThrow(AssertFailedRevertError);
  });

  /**
   * TODO: fix this
   * we could not get this sway function to revert
   */
  it.skip('can throw SendMessageRevertError', async () => {
    await expect(contractInstance.functions.failed_message().call()).rejects.toThrow(
      SendMessageRevertError
    );
  });

  /**
   * TODO: fix this
   * we could not get this sway function to revert
   * according to sway docs: this should revert if amount = 0
   * https://fuellabs.github.io/sway/master/reference/documentation/operations/asset/transfer/address.html
   */
  it.skip('can throw TransferToAddressRevertError', async () => {
    await expect(contractInstance.functions.failed_transfer_revert().call()).rejects.toThrow(
      TransferToAddressRevertError
    );
  });

  it('can throw ScriptResultDecoderError', async () => {
    await expect(contractInstance.functions.failed_transfer().call()).rejects.toThrow(
      ScriptResultDecoderError
    );
  });
});
