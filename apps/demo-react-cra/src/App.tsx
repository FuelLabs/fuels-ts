import React from "react";
import logo from "./logo.svg";
import "./App.css";
import * as asm from "@fuels/vm-asm";
import { BaseAssetId, encrypt, decrypt } from "fuels";
import * as asm from "@fuels/vm-asm";

function App() {
  const { log } = console;

  log("Hello Fuels", BaseAssetId, encrypt, decrypt);
  log("Hello ASM", asm);

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
