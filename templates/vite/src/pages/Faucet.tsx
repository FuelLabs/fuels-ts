import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useActiveWallet } from "../hooks/useActiveWallet";
import { useFaucet } from "../hooks/useFaucet";
import { bn } from "fuels";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { CURRENT_ENVIRONMENT, TESTNET_FAUCET_LINK } from "../lib";
import LaunchIcon from "@mui/icons-material/Launch";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
const isLocal = CURRENT_ENVIRONMENT === "local";

export default function Faucet() {
  const { faucetWallet } = useFaucet();
  const { wallet, refetchBalance, walletBalance } = useActiveWallet();
  const navigate = useNavigate();

  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [amountToSend, setAmountToSend] = useState<string>("5");
  const previousBalanceRef = useRef(walletBalance);

  useEffect(() => {
    if (wallet) {
      setReceiverAddress(wallet.address.toB256());
    }
  }, [wallet]);
  useEffect(() => {
    const interval = setInterval(async () => {
      await refetchBalance?.();
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
      navigate("/");
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

    try {
      const tx = await faucetWallet.transfer(
        receiverAddress,
        bn.parseUnits(amountToSend.toString())
      );
      const { id } = await tx.waitForResult();
      await refetchBalance?.();
    } catch (error) {
      toast.error("Transaction failed");
    }
  };

  return (
    <>
      {isLocal ? (
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
      ) : (
        <iframe
          src={`${TESTNET_FAUCET_LINK}?address=${receiverAddress}`}
          width="100%"
          height="700px"
          allowFullScreen
        />
      )}
    </>
  );
}
