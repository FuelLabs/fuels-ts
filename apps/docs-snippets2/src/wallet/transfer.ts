import { fuels, NETWORK_URL } from 'fuels/api';

const { wallet, provider } = await fuels(NETWORK_URL);

const { waitForResult } = await wallet('0x..').transfer('0x..', 10, provider.getBaseAssetId());

const { gasUsed } = await waitForResult();

console.log({ gasUsed });
