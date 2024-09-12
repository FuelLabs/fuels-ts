import { useConnectUI, useIsConnected, useWallet } from "@fuels/react";
import { useEffect, useState } from "react";

import Button from "./components/Button";
import Info from "./components/Info";
import Wallet from "./components/Wallet";
import Contract from "./components/Contract";
import Predicate from "./components/Predicate";
import Script from "./components/Script";
import { useEnvironment } from "./hooks/useEnvironment";
import { bn, WalletUnlocked } from "fuels";
import { useProvider } from "./hooks/useProvider";
import Faucet from "./components/Faucet";

function App() {
  const { connect } = useConnectUI();
  const { isConnected, refetch } = useIsConnected();
  const { isLocal } = useEnvironment();
  const { wallet } = useWallet();
  const { provider } = useProvider();

  const tabs: string[] = [
    "Wallet",
    "Contract",
    "Predicate",
    "Script",
    "Faucet",
  ];
  const [tab, setTab] = useState<string>("Wallet");

  async function localTransfer() {
    if (!wallet) return;

    const genesis = new WalletUnlocked(
      process.env.VITE_GENESIS_WALLET_PRIVATE_KEY as string,
      provider,
    );
    const tx = await genesis.transfer(wallet.address, bn(5_000_000_000));
    await tx.waitForResult();
  }

  const getTabFromUrl = () => {
    const url = new URL(window.location.href);
    return url.searchParams.get("tab");
  };

  const updateTabAndUrl = (newTab: string) => {
    const url = new URL(window.location.href);
    setTab(newTab);
    url.searchParams.set("tab", newTab);
    window.history.pushState({}, "", url);
  };

  useEffect(() => {
    const tabFromUrl = getTabFromUrl();
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <main
      data-theme="dark"
      className="flex items-center justify-center lg:pt-6 dark:text-zinc-50/90"
    >
      <div id="container" className="mx-8 mb-32 w-full max-w-7xl lg:mb-0">
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
              <Info />
              <div className="col-span-4">
                <div className="gradient-border h-full rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-950/80">
                  {!isConnected && (
                    <section className="flex h-full flex-col justify-center space-y-6 px-4 py-8 ">
                      <Button onClick={() => connect()}>Connect Wallet</Button>
                    </section>
                  )}

                  {isConnected && (
                    <section className="flex h-full flex-col justify-center space-y-6 px-4 py-8 ">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {tabs.map((tabName) => (
                          <Button
                            key={tabName}
                            className="w-full sm:flex-1"
                            color={tab === tabName ? "primary" : "inactive"}
                            onClick={() => updateTabAndUrl(tabName)}
                          >
                            {tabName}
                          </Button>
                        ))}
                      </div>

                      {tab === "Wallet" && (
                        <Wallet updateTabAndUrl={updateTabAndUrl} />
                      )}
                      {tab === "Contract" && <Contract />}
                      {tab === "Predicate" && <Predicate />}
                      {tab === "Script" && <Script />}
                      {tab === "Faucet" && <Faucet />}

                      {isLocal && (
                        <>
                          <hr className="border-zinc-700" />
                          <div>
                            <div className="flex items-center justify-between text-base md:text-[17px] dark:text-zinc-50">
                              <p className="w-2/3 px-2 py-1 mr-3 font-mono text-xs">
                                As the dApp is running locally, you can transfer
                                5 ETH to your address via the genesis wallet.
                              </p>
                              <Button onClick={localTransfer} className="w-1/3">
                                Transfer 5 ETH
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
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
