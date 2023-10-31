import { TestNodeLauncher } from '@fuel-ts/test-utils';
import {
  ScriptResultDecoderError,
  SendMessageRevertError,
  RequireRevertError,
  AssertFailedRevertError,
  TransferToAddressRevertError,
  bn,
} from 'fuels';

import { getProgramDir } from './utils';

const contractDir = getProgramDir('revert-error');

/**
 * @group node
 */
describe('Revert Error Testing', () => {
  beforeAll(async (ctx) => {
    await TestNodeLauncher.prepareCache(ctx.tasks.length);

    return () => TestNodeLauncher.killCachedNodes();
  });

  it('can pass required checks [valid]', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [contractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;

    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT_PRICE = bn(10);
    const INPUT_TOKEN_ID = bn(100);

    const { logs } = await contractInstance.functions
      .validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE)
      .txParams({ gasPrice })
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
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [contractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;

    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT_PRICE = bn(0);
    const INPUT_TOKEN_ID = bn(100);

    await expect(
      contractInstance.functions
        .validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE)
        .txParams({ gasPrice })
        .call()
    ).rejects.toThrow(RequireRevertError);
  });

  it('can throw RequireRevertError [invalid token id]', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [contractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;

    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT_PRICE = bn(10);
    const INPUT_TOKEN_ID = bn(55);

    await expect(
      contractInstance.functions
        .validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE)
        .txParams({ gasPrice })
        .call()
    ).rejects.toThrow(RequireRevertError);
  });

  it('can throw AssertFailedRevertError', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [contractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;

    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT_PRICE = bn(100);
    const INPUT_TOKEN_ID = bn(100);

    await expect(
      contractInstance.functions
        .validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE)
        .txParams({ gasPrice })
        .call()
    ).rejects.toThrow(AssertFailedRevertError);
  });

  /**
   * TODO: fix this
   * we could not get this sway function to revert
   */
  it.skip('can throw SendMessageRevertError', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [contractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;

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
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [contractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;

    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    await expect(
      contractInstance.functions.failed_transfer_revert().txParams({ gasPrice }).call()
    ).rejects.toThrow(TransferToAddressRevertError);
  });

  it('can throw ScriptResultDecoderError', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [contractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;

    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    await expect(
      contractInstance.functions.failed_transfer().txParams({ gasPrice }).call()
    ).rejects.toThrow(ScriptResultDecoderError);
  });
});
