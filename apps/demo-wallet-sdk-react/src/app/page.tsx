// #region wallet-sdk-react-ui

"use client";

import {
  useAccount,
  useBalance,
  useConnect,
  useConnectors,
  useDisconnect,
  useIsConnected,
} from "@fuels/react";
import { useState } from "react";

export default function Home() {
  const [connector, setConnector] = useState("");
  const { connectors } = useConnectors();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected } = useIsConnected();
  const { account } = useAccount();
  const { balance } = useBalance({
    address: account as string,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: 10,
        maxWidth: 300,
      }}
    >
      <select
        onChange={(e) => {
          setConnector(e.target.value);
        }}
      >
        <option value="">Select a connector</option>
        {connectors.map((c) => (
          <option key={c.name} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
      <button disabled={!connector} onClick={() => connect(connector)}>
        Connect to {connector}
      </button>
      <button disabled={!connector} onClick={() => disconnect()}>
        Disconnect from {connector}
      </button>
      <p>{isConnected ? "Connected" : ""}</p>
      {account && <p>Account: {account}</p>}
      {balance && <p>Balance: {balance.toString()}</p>}
    </div>
  );
}
// #endregion wallet-sdk-react-ui
