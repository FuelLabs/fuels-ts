import { FUEL_NETWORK_URL, Provider, Signer, Wallet } from 'fuels';

/**
 * @group node
 * @group browser
 */
describe('Getting started', () => {
  beforeAll(() => {
    // Avoids using the actual network.
    vi.spyOn(Provider, 'create')
      .mockImplementationOnce(
        () => Provider.create(FUEL_NETWORK_URL)
      )
  })

  it('can connect to a local network', async () => {
    // #region connecting-to-the-local-node
    // #import { Provider, Wallet, Signer };

    // Create a provider.
    const LOCAL_FUEL_NETWORK = "http://127.0.0.1:4000/graphql"
    const provider = await Provider.create(LOCAL_FUEL_NETWORK);

    // Create our wallet (with a private key).
    const PRIVATE_KEY = 'a1447cd75accc6b71a976fd3401a1f6ce318d27ba660b0315ee6ac347bf39568';
    const wallet = Wallet.fromPrivateKey(PRIVATE_KEY, provider);

    // Sign a message.
    const signer = new Signer(PRIVATE_KEY);
    signer.sign(Buffer.from("Hello, world!"));
    // #endregion connecting-to-the-local-node

    expect(wallet.address).toEqual(signer.address);
  })
})