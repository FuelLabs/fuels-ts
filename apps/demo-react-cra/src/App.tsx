import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ZeroBytes32, encrypt, decrypt, bn } from "fuels";
import * as asm from "@fuels/vm-asm";

function App() {
  const { log } = console;

  log("Hello Fuels", ZeroBytes32, encrypt, decrypt);
  log("Hello ASM", asm);
  log("Hello BN", bn(1000));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
