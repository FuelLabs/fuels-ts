// #region full
import { Provider, Wallet, ZeroBytes32 } from "fuels";

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
const { waitForResult } = await script.functions.main(contract.id.toB256()).addContracts([contract]).call();

// Wait for the script to finish and get the logs
const { groupedLogs } = await waitForResult();
// groupedLogs = {
//   [ZeroBytes32]: ['Script started', 'Script finished'],
//   [contract.id.toB256()]: ['ContractA', 'ContractB'],
// }
// #endregion full
const logs = groupedLogs
console.log('Should have zeroed log', typeof logs[ZeroBytes32] !== 'undefined');
console.log('Should script logs [Script Started]', logs[ZeroBytes32].includes('Script started'));
console.log('Should script logs [Script Finished]', logs[ZeroBytes32].includes('Script finished'));

console.log('groupedLogs', groupedLogs);
