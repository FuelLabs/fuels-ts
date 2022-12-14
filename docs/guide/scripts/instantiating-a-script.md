---
title: "Instantiating a script"
parent: "Scripts"
grand_parent: "Guide"
nav_order: 1
---

# Instantiating a script

Similar to contracts and predicates, once you've written a script in Sway and compiled it with `forc build` (read [here](https://fuellabs.github.io/sway/master/introduction/overview.html) for more on how to work with Sway), you'll get the script binary. Using the binary, you can instantiate a `script` as shown in the code snippet below:

```typescript
import { Script, AbiCoder, arrayify } from "fuels";
import { join } from "path";
import { readFileSync } from "fs";

// Import the script ABI
import scriptAbi from "./path/to/abi-file.json";

// Load the script binary
const scriptBin = readFileSync(join(__dirname, "./path/to/bin-file.bin"));

const abiCoder = new AbiCoder();

const script = new Script(
  scriptBin,
  (args) => {
    const encoded = abiCoder.encode(scriptAbi[0].inputs, [args]);
    return arrayify(encoded);
  },
  (scriptResult) => {
    const decoded = abiCoder.decode(
      scriptAbi[0].outputs,
      scriptResult.returnReceipt.data
    );
    return decoded[0];
  }
);
```

###### [see code in context](https://github.com/FuelLabs/fuels-ts/blob/master/packages/script/src/script.test.ts#L110-L127)

---

In the [next section](./calling-a-script.md), we show how to call a script.
