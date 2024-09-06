import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BurnerWalletConnector, defaultConnectors } from "@fuels/connectors";
import { FuelProvider } from "@fuels/react";

import App from "./App.tsx";
import "./index.css";
import { CURRENT_ENVIRONMENT, Environments, NODE_URL } from "./lib.ts";
import { Provider } from "fuels";

const queryClient = new QueryClient();

const connectors =
  CURRENT_ENVIRONMENT === Environments.LOCAL
    ? [
        new BurnerWalletConnector({
          fuelProvider: Provider.create(NODE_URL),
        }),
      ]
    : defaultConnectors({ devMode: true });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <FuelProvider
        theme="dark"
        fuelConfig={{
          connectors,
        }}
      >
        <App />
      </FuelProvider>
    </QueryClientProvider>
  </StrictMode>,
);
