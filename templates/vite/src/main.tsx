import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { defaultConnectors } from "@fuels/connectors";
import { FuelProvider } from "@fuels/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { FuelConnector, Network, Provider } from "fuels";

import App from "./App.tsx";
import { chainId, providerUrl } from "./lib.tsx";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const queryClient = new QueryClient();

const connectors: FuelConnector[] = defaultConnectors({
  devMode: true,
  fuelProvider: Provider.create(providerUrl),
});

const networks: Network[] = [{ url: providerUrl, chainId }];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <FuelProvider
        theme="dark"
        fuelConfig={{ connectors }}
        uiConfig={{ suggestBridge: false }}
        networks={networks}
      >
        <App />
        <ToastContainer theme="dark" />
      </FuelProvider>
    </QueryClientProvider>
  </StrictMode>,
);
