import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useActiveWallet } from "../hooks/useActiveWallet";
import { useFaucet } from "../hooks/useFaucet";
import { bn } from "fuels";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { CURRENT_ENVIRONMENT, Environments, TESTNET_FAUCET_LINK } from "../lib";
import { useNavigate } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/faucet")({
  component: Index,
});

function Index() {
  // Get the faucet wallet instance from the useFaucet hook
  const { faucetWallet } = useFaucet();

  const { wallet, refreshWalletBalance, walletBalance } = useActiveWallet();

  const navigate = useNavigate();
  const previousBalanceRef = useRef(walletBalance);

  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [amountToSend, setAmountToSend] = useState<string>("5");

  useEffect(() => {
    if (wallet) {
      setReceiverAddress(wallet.address.toB256());
    }
  }, [wallet]);

  useEffect(() => {
    const interval = setInterval(async () => {
      await refreshWalletBalance?.();
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (
      previousBalanceRef.current &&
      walletBalance &&
      walletBalance.gt(previousBalanceRef.current)
    ) {
      toast.success("Funds received! Navigating back to home page.");
      navigate({ to: "/" });
    }
    previousBalanceRef.current = walletBalance;
  }, [walletBalance, navigate]);

  const sendFunds = async () => {
    if (!faucetWallet) {
      return toast.error("Faucet wallet not found.");
    }

    if (!receiverAddress) {
      return toast.error("Receiver address not set");
    }

    if (!amountToSend) {
      return toast.error("Amount cannot be empty");
    }

    // Transfer the specified amount of ETH to the receiver address
    const tx = await faucetWallet.transfer(
      receiverAddress,
      bn.parseUnits(amountToSend.toString()),
    );
    await tx.waitForResult();

    await refreshWalletBalance?.();
  };

  return (
    <>
      {CURRENT_ENVIRONMENT === Environments.LOCAL && (
        <>
          <h3 className="text-2xl font-semibold">Local Faucet</h3>

          <div className="flex gap-4 items-center">
            <label htmlFor="receiver-address-input" className="text-gray-400">
              Receiving address:
            </label>
            <Input
              className="w-full"
              value={receiverAddress}
              onChange={(e) => setReceiverAddress(e.target.value)}
              placeholder="0x..."
              id="receiver-address-input"
            />
          </div>

          <div className="flex gap-4 items-center">
            <label htmlFor="amount-input" className="text-gray-400">
              Amount (ETH):
            </label>
            <Input
              className="w-full"
              value={amountToSend}
              onChange={(e) => setAmountToSend(e.target.value)}
              placeholder="5"
              type="number"
              id="amount-input"
            />
          </div>

          <Button onClick={sendFunds}>Send Funds</Button>
        </>
      )}

      {CURRENT_ENVIRONMENT === Environments.TESTNET && (
        <>
          <iframe
            src={
              wallet
                ? `${TESTNET_FAUCET_LINK}?address=${wallet.address.toB256()}`
                : TESTNET_FAUCET_LINK
            }
            title="faucet"
            className="w-full h-screen overflow-scroll"
          />
        </>
      )}
    </>
  );
}
