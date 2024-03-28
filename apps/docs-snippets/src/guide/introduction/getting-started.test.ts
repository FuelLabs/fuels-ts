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
    // #import { Provider, Wallet, Signer, FUEL_NETWORK_URL };

    /**
     * Create a provider, with our predefined constant.
     * 
     * Default:
     * FUEL_NETWORK_URL="http://127.0.0.1:4000/graphql"
     * 
     * You can override this by setting the environment variable.
     * (uncomment below to connect to the testnet)
     */
    // process.env.FUEL_NETWORK_URL="https://beta-5.fuel.network/graphql"
    const localProvider = await Provider.create(FUEL_NETWORK_URL);

    // Create our wallet (with a private key).
    const PRIVATE_KEY = 'a1447cd75accc6b71a976fd3401a1f6ce318d27ba660b0315ee6ac347bf39568';
    const wallet = Wallet.fromPrivateKey(PRIVATE_KEY, localProvider);

    // Sign a message.
    const signer = new Signer(PRIVATE_KEY);
    signer.sign(Buffer.from("Hello, world!"));
    // #endregion connecting-to-the-local-node

    expect(wallet.address).toEqual(signer.address);
  })
})