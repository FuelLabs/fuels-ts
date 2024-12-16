import { hexlify, randomBytes, Src14OwnedProxy, Src14OwnedProxyFactory } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

/**
 * @group node
 * @group browser
 */
describe('recipes', () => {
  it('deploy and interact with Src14OwnedProxy', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const targetAddress = hexlify(randomBytes(32));
    const configurableConstants = {
      INITIAL_TARGET: { bits: targetAddress },
      INITIAL_OWNER: { Initialized: { Address: { bits: wallet.address.toB256() } } },
    };

    const proxyFactory = new Src14OwnedProxyFactory(wallet);
    const { waitForResult: waitForProxyDeploy } = await proxyFactory.deploy({
      configurableConstants,
    });
    const { contract: proxyContract } = await waitForProxyDeploy();
    const { waitForResult: waitForProxyInit } = await proxyContract.functions
      .initialize_proxy()
      .call();
    await waitForProxyInit();
    const proxyAddress = proxyContract.id.toB256();

    const { waitForResult: waitForFirstTarget } = await proxyContract.functions
      .proxy_target()
      .call();
    const firstTarget = await waitForFirstTarget();
    expect(firstTarget.value?.bits).toEqual(targetAddress);

    const anotherProxy = new Src14OwnedProxy(proxyAddress, wallet);
    const { waitForResult: waitForAnotherTarget } = await anotherProxy.functions
      .proxy_target()
      .call();
    const anotherTarget = await waitForAnotherTarget();
    expect(anotherTarget.value?.bits).toEqual(targetAddress);
  });
});
