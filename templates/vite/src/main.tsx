import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { defaultConnectors } from "@fuels/connectors";
import { FuelProvider } from "@fuels/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { FuelConnector, Provider } from "fuels";

import App from "./App.tsx";
import { providerUrl } from "./lib.tsx";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const queryClient = new QueryClient();

const connectors: FuelConnector[] = defaultConnectors({
  devMode: true,
  fuelProvider: new Provider(providerUrl),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <FuelProvider
        theme="dark"
        fuelConfig={{ connectors }}
        uiConfig={{ suggestBridge: false }}
      >
        <App />
        <ToastContainer theme="dark" />
      </FuelProvider>
    </QueryClientProvider>
  </StrictMode>,
);
