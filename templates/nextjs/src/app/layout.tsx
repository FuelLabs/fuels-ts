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
} from "@fuels/connectors";
import { NODE_URL } from "@/lib";
import { ActiveWalletProvider } from "@/hooks/useActiveWallet";

const queryClient = new QueryClient();

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isMounted, setIsMounted] = useState(false);
  const providerToUse = useMemo(() => Provider.create(NODE_URL), [NODE_URL]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <html lang="en" className="bg-black text-white">
      <body>
        <React.StrictMode>
          <QueryClientProvider client={queryClient}>
            <FuelProvider
              fuelConfig={{
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
