import { FUEL_NETWORK_URL, Provider } from 'fuels';

/**
 * @group node
 */
test('getMessageByNonce', async () => {
  // #region getMessageByNonce
  // #context import { FUEL_NETWORK_URL, Provider } from 'fuels';
  const provider = await Provider.create(FUEL_NETWORK_URL);

  const nonce = '0x0101010101010101010101010101010101010101010101010101010101010101';
  const message = await provider.getMessageByNonce(nonce);

  expect(message).toBeDefined();
  expect(message?.nonce).toEqual(nonce);
  // #endregion getMessageByNonce
});
