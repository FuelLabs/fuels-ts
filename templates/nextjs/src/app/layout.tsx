"use client";

import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import { FuelProvider } from "@fuels/react";
import React, { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FuelConfig } from "fuels";
import { defaultConnectors } from "@fuels/connectors";
import { ENABLE_FUEL_DEV_CONNECTOR } from "@/lib";
import { ActiveWalletProvider } from "@/hooks/useActiveWallet";

const queryClient = new QueryClient();

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [fuelConfig, setFuelConfig] = useState<FuelConfig>({});

  useEffect(() => {
    setFuelConfig({
      connectors: defaultConnectors({
        devMode: ENABLE_FUEL_DEV_CONNECTOR,
      }),
    });
  }, []);

  return (
    <html lang="en" className="bg-black text-white">
      <body>
        <React.StrictMode>
          <QueryClientProvider client={queryClient}>
            <FuelProvider fuelConfig={fuelConfig}>
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
