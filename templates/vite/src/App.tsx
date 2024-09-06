import {
  useConnectUI,
  useIsConnected,
  useBalance,
  useDisconnect,
  useWallet,
} from "@fuels/react";

import Button from "./components/button";
import { useEffect, useState } from "react";
import {
  CURRENT_ENVIRONMENT,
  Environments,
  NODE_URL,
  TESTNET_CONTRACT_ID,
} from "./lib";

import { TestContract } from "./sway-api";
import contractIds from "./sway-api/contract-ids.json";

function App() {
  const { connect } = useConnectUI();
  const { isConnected, refetch: refetchConnected } = useIsConnected();
  const { disconnect } = useDisconnect();
  const { wallet } = useWallet();
  const address = wallet?.address.toB256() || "";
  const { balance, refetch: refetchBalance } = useBalance({ address });

  const [contract, setContract] = useState<TestContract>();
  const [counter, setCounter] = useState<number>();

  const contractId =
    CURRENT_ENVIRONMENT === Environments.LOCAL
      ? contractIds.testContract
      : TESTNET_CONTRACT_ID;

  useEffect(() => {
    refetchConnected();
  }, [refetchConnected]);

  useEffect(() => {
    const interval = setInterval(() => refetchBalance(), 1000);
    return () => clearInterval(interval);
  }, [refetchBalance]);

  async function getCount() {
    if (!wallet || !contract) return;

    try {
      const { value } = await contract.functions.get_count().get();
      console.log("val", value);
      setCounter(value.toNumber());
      console.log("counter", counter);
    } catch (error) {
      console.error(error);
    }
  }

  async function incrementCounter() {
    if (!wallet || !contract) return;

    try {
      const call = await contract.functions.increment_counter(1).call();
      const { waitForResult } = call;
      const result = await waitForResult();
      console.log("result", result);
      setCounter(result.value.toNumber());
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (wallet) {
      console.log("wallet", wallet.provider);
      const testContract = new TestContract(contractId, wallet);
      setContract(testContract);
      console.log("contract", contract?.id, contract?.account?.provider.url);
      (async () => {
        await getCount();
      })();
    }
  }, [wallet]);

  const faucetUrl = `https://faucet-testnet.fuel.network/?address=${address}&autoClose&redirectUrl=${window.location.href}`;

  return (
    <main
      data-theme="dark"
      className="flex items-center justify-center lg:h-screen dark:text-zinc-50/90"
    >
      <div id="container" className="mx-8 mb-32 w-full max-w-5xl lg:mb-0">
        <nav
          id="nav"
          className="flex items-center justify-center py-6 lg:pb-10 lg:pt-0"
        >
          <a href="https://fuel.network/" target="_blank" rel="noreferrer">
            <img src="./logo_white.png" alt="Fuel Logo" className="w-[124px]" />
          </a>
        </nav>

        <div className="gradient-border rounded-2xl">
          <div className="grain rounded-2xl p-1.5 drop-shadow-xl">
            <div
              id="grid"
              className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-12"
            >
              <div
                id="text"
                className="col-span-3 px-4 py-8 sm:px-8 sm:py-8 md:px-10 md:py-12"
              >
                <h1 className="pb-1 pt-6 text-3xl font-medium">
                  Welcome to Fuel
                </h1>
                <p>
                  This Vite + React template was bootstrapped with the{" "}
                  <a
                    href="https://docs.fuel.network/docs/fuels-ts/fuels-cli/#getting-started"
                    target="_blank"
                    className="text-green-500/80 transition-colors hover:text-green-500"
                    rel="noreferrer"
                  >
                    Fuels CLI
                  </a>
                </p>
                <p className="pt-8">
                  You are currently connected to:{" "}
                  <span className="font-mono">{NODE_URL}</span>
                </p>
                <p className="pt-4">Get started by editing:</p>
                <ul className="list-inside list-disc font-mono">
                  <li>sway-programs/contract/main.sw</li>
                  <li>src/App.tsx</li>
                </ul>
                <a
                  href="https://docs.fuel.network/docs"
                  target="_blank"
                  className="inline-block pt-8 text-green-500/80 transition-colors hover:text-green-500"
                  rel="noreferrer"
                >
                  Check out the Fuel Docs
                </a>
              </div>

              <div className="col-span-4">
                <div className="gradient-border h-full rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-950/80">
                  {!isConnected && (
                    <section className="flex h-full flex-col items-center justify-center px-4 py-8 sm:px-8 sm:py-8 md:px-10 md:py-12">
                      <Button onClick={() => connect()}>Connect Wallet</Button>
                    </section>
                  )}

                  {isConnected && (
                    <section className="flex h-full flex-col justify-center space-y-6 px-4 py-8 sm:px-8 sm:py-8 md:px-10 md:py-12">
                      <div>
                        <h3 className="mb-1 text-sm font-medium md:mb-0 dark:text-zinc-300/70">
                          Address
                        </h3>
                        <div className="flex items-center justify-between text-base md:text-[17px] dark:text-zinc-50">
                          <input
                            type="text"
                            value={address || ""}
                            className="w-2/3 bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
                            disabled
                          />
                          <Button
                            onClick={() => disconnect()}
                            className="w-1/3"
                          >
                            Disconnect
                          </Button>
                        </div>
                      </div>
                      <div>
                        <h3 className="mb-1 text-sm font-medium md:mb-0 dark:text-zinc-300/70">
                          Balance
                        </h3>
                        <div className="flex items-center justify-between text-base md:text-[17px] dark:text-zinc-50">
                          <input
                            type="text"
                            value={balance ? `${balance?.format()} ETH` : ""}
                            className="w-2/3 bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
                            disabled
                          />
                          <Button
                            onClick={() => window.open(faucetUrl, "_blank")}
                            className="w-1/3"
                          >
                            Faucet
                          </Button>
                        </div>
                      </div>
                      <div>
                        <h3 className="mb-1 text-sm font-medium md:mb-0 dark:text-zinc-300/70">
                          Counter
                        </h3>
                        <div className="flex items-center justify-between text-base md:text-[17px] dark:text-zinc-50">
                          <input
                            type="text"
                            value={counter}
                            className="w-2/3 bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
                            disabled
                          />
                          <Button onClick={incrementCounter} className="w-1/3">
                            Increment
                          </Button>
                        </div>
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
