// #region full
import { Provider, Wallet } from "fuels";

import { WALLET_PVT_KEY, LOCAL_NETWORK_URL } from "../../../env";
import { LogSimpleFactory, ScriptLogWithContract } from "../../../typegend";

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// Create a contract instance
const { waitForResult: waitForDeploy } = await LogSimpleFactory.deploy(wallet);
const {contract} = await waitForDeploy();

// Create a script instance
const script = new ScriptLogWithContract(wallet);

// Call the script
const { waitForResult } = await script.functions.main(contract.id.toB256()).call();

// Wait for the script to finish and get the logs
const { groupedLogs } = await waitForResult();
// groupedLogs = [
//   {
//     contractId: '0x0000000000000000000000000000000000000000000000000000000000000000',
//     logs: ['Script started', 'Script finished'],
//   },
// ]
// #endregion full

console.log('groupedLogs', groupedLogs);
