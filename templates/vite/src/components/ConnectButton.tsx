import { useConnectUI, useDisconnect } from "@fuels/react";
import { Button } from "./Button";
import { useActiveWallet } from "../hooks/useActiveWallet";

export const ConnectButton = () => {
  const { isPending: isLoading, isConnected } = useActiveWallet();
  const { connect } = useConnectUI();
  const { disconnect } = useDisconnect();

  const buttonText = isLoading
    ? "Loading..."
    : isConnected
    ? "Disconnect"
    : "Connect";

  const onClick = isConnected ? disconnect : connect;

  return (
    <Button className={isConnected? 'bg-red-500': 'bg-green-500'} disabled={isLoading} onClick={() => onClick()}>
      {buttonText}
    </Button>
  );
};
