"use client";

import { FuelProvider } from "@fuels/react";
import React, { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { Provider } from "fuels";
import { defaultConnectors } from "@fuels/connectors";

import { providerUrl } from "../lib";

import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";

const queryClient = new QueryClient();

const connectors = defaultConnectors({
  devMode: true,
  burnerWalletConfig: { fuelProvider: Provider.create(providerUrl) },
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only render the component if the page has been mounted.
  if (!isMounted) return null;

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>Fuel dApp</title>
      </head>
      <body>
        <React.StrictMode>
          <QueryClientProvider client={queryClient}>
            <FuelProvider theme="dark" fuelConfig={{ connectors }}>
              <ToastContainer theme="dark" />
              <>{children}</>
            </FuelProvider>
          </QueryClientProvider>
        </React.StrictMode>
      </body>
    </html>
  );
}
