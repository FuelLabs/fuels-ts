import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BurnerWalletConnector, defaultConnectors } from "@fuels/connectors";
import { FuelProvider } from "@fuels/react";
import { Provider } from "fuels";

import { useEnvironment } from "./hooks/useEnvironment";
import App from "./App.tsx";
import "./index.css";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { isLocal: isLocalEnvironment, providerUrl } = useEnvironment();

const queryClient = new QueryClient();

const connectors = isLocalEnvironment
  ? [new BurnerWalletConnector({ fuelProvider: Provider.create(providerUrl) })]
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
