import { useConnectUI, useIsConnected } from "@fuels/react";
import { useEffect, useState } from "react";

import Button from "./components/Button";
import Info from "./components/Info";
import Wallet from "./components/Wallet";
import Contract from "./components/Contract";
import Predicate from "./components/Predicate";
import Script from "./components/Script";
import Faucet from "./components/Faucet";
import { LocalFaucet } from "./components/LocalFaucet";

function App() {
  const { connect } = useConnectUI();
  const { isConnected, refetch } = useIsConnected();

  const tabs: string[] = [
    "wallet",
    "contract",
    "predicate",
    "script",
    "faucet",
  ];
  const [tab, setTab] = useState<string>("wallet");

  const getTabFromUrl = () => {
    const url = new URL(window.location.href);
    return url.searchParams.get("t");
  };

  const updateTabAndUrl = (newTab: string) => {
    const url = new URL(window.location.href);
    setTab(newTab);
    url.searchParams.set("t", newTab);
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
                            className="w-full sm:flex-1 capitalize"
                            color={tab === tabName ? "primary" : "inactive"}
                            onClick={() => updateTabAndUrl(tabName)}
                          >
                            {tabName}
                          </Button>
                        ))}
                      </div>

                      {tab === "wallet" && (
                        <Wallet updateTabAndUrl={updateTabAndUrl} />
                      )}
                      {tab === "contract" && <Contract />}
                      {tab === "predicate" && <Predicate />}
                      {tab === "script" && <Script />}
                      {tab === "faucet" && <Faucet />}

                      <LocalFaucet />
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
