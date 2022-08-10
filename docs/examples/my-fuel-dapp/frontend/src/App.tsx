import React, { useEffect, useState } from "react";
import { Wallet } from "fuels";
import "./App.css";
// Import the contract factory from the generated folder
// from the typechain command
import { ContractsAbi__factory } from "./contracts";

// Se the Wallet Secret used on the chainConfig.json
// this enables us to have a account with initial balance
const WALLET_SECRET =
  "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
// The address of the contract deployed to our local node
// the contract id is output right after the forc deploy command
const CONTRACT_ID =
  "0xa326e3472fd4abc417ba43e369f59ea44f8325d42ba6cf71ec4b58123fd8668a";
// Create a Wallet from given secretKey in this case
// The one we configured at the chainConfig.json
const wallet = new Wallet(WALLET_SECRET);
// Connects out Contract instance to the deployed contract
// address using the given wallet.
const contract = ContractsAbi__factory.connect(CONTRACT_ID, wallet);

function App() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    async function main() {
      // Executes the counter function to query the current contract state
      // the `.get()` is read-only, because of this it don't expand coins.
      const { value } = await contract.functions.counter().get();
      setCounter(Number(value));
    }
    main();
  }, []);

  async function increment() {
    // Creates a transactions to call the increment function passing the amount
    // we want to increment, because it creates a TX and updates the contract state
    // this requires the wallet to have enough coins to cover the costs and also
    // to sign the Transaction
    const { value } = await contract.functions.increment(1).call();
    setCounter(Number(value));
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Counter: {counter}</p>
        <button onClick={increment}>Increment</button>
      </header>
    </div>
  );
}

export default App;
