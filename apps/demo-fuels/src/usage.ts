
import { Wallet } from 'fuels';

import { Sample } from './Sample';
import { SampleFactory } from './SampleFactory';

const PVT_KEY = "asdfasdf";

const wallet = Wallet.fromPrivateKey(PVT_KEY);

// Deploy
const { waitForResult } = await SampleFactory.deploy(wallet);
const { contract: deployedContract } = await waitForResult();

// Instantiate
const contractInstance = new Sample(deployedContract.id, wallet);


expect(contractInstance.id).toEqual(deployedContract.id);
