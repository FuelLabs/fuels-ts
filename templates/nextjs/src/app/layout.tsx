"use client";

import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import { FuelProvider } from "@fuels/react";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "fuels";
import {
  BakoSafeConnector,
  BurnerWalletConnector,
  FuelWalletConnector,
  FuelWalletDevelopmentConnector,
  FueletWalletConnector,
  WalletConnectConnector,
  SolanaConnector,
} from "@fuels/connectors";
import { NODE_URL } from "@/lib";
import { ActiveWalletProvider } from "@/hooks/useActiveWallet";

/**
 * react-query is a peer dependency of @fuels/react, so we set it up here.
 * See https://docs.fuel.network/docs/wallet/dev/getting-started/#installation-1
 */
const queryClient = new QueryClient();

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isMounted, setIsMounted] = useState(false);

  /**
   * Create a Provider instance.
   * We memoize it to avoid creating a new instance on every render.
   */
  const providerToUse = useMemo(() => Provider.create(NODE_URL), [NODE_URL]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only render the component if the page has been mounted.
  if (!isMounted) return null;

  return (
    <html lang="en" className="bg-black text-white">
      <head>
        <link rel="icon" href="/fuel.ico" />
        <title>Fuel dApp</title>
      </head>
      <body>
        <React.StrictMode>
          <QueryClientProvider client={queryClient}>
            <FuelProvider
              fuelConfig={{
                /**
                 * The list of wallet connectors.
                 * You can add or remove connectors from here based on your needs.
                 * See https://wallet.fuel.network/docs/dev/connectors/
                 */
                connectors: [
                  new FuelWalletConnector(),
                  new BurnerWalletConnector({
                    fuelProvider: providerToUse,
                  }),
                  new WalletConnectConnector({
                    fuelProvider: providerToUse,
                  }),
                  new BakoSafeConnector(),
                  new FueletWalletConnector(),
                  new FuelWalletDevelopmentConnector(),
                  new SolanaConnector({
                    fuelProvider: providerToUse,
                  }),
                ],
              }}
            >
              <ActiveWalletProvider>
                <Layout>{children}</Layout>
              </ActiveWalletProvider>
            </FuelProvider>
          </QueryClientProvider>
        </React.StrictMode>
      </body>
    </html>
  );
}
