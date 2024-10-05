import { readFileSync } from "fs";
import { join } from "path";

import ourLoaderScriptSplit from "./bytecodeSplit.json";
import theirBytecode from "./rust-sway-program-bytecode.json";

const ourBytecode = readFileSync(
  join(
    process.cwd(),
    "packages/fuel-gauge/test/fixtures/forc-projects/script-dummy/out/release/script-dummy.bin",
  ),
);
if (theirBytecode.bytecode.length !== ourBytecode.length) {
  console.log("Bytecode length mismatch");
}

theirBytecode.bytecode.forEach((val, index) => {
  if (val !== ourBytecode[index]) {
    console.log("Bytecode mismatch at index", index);
  }
});

// got it by logging the bytecode from the loader in this test
// https://github.com/FuelLabs/fuels-rs/pull/1520/files#diff-30eaac2edf91b19d549cda2a09824d852ccfb48f7cdae20030a050e39c8eecc7R420
const rustLoaderScript = [
  26, 64, 48, 0, 80, 65, 0, 56, 26, 68, 80, 0, 186, 73, 0, 0, 50, 64, 4, 129,
  80, 65, 0, 32, 93, 73, 0, 0, 80, 65, 0, 8, 147, 72, 0, 0, 32, 76, 84, 128, 40,
  77, 4, 128, 32, 69, 19, 0, 82, 69, 16, 4, 74, 68, 0, 0, 143, 154, 50, 207, 5,
  209, 208, 155, 116, 238, 233, 43, 203, 134, 147, 24, 191, 71, 226, 122, 156,
  66, 157, 246, 79, 199, 45, 215, 94, 57, 100, 66, 0, 0, 0, 0, 0, 0, 0, 96, 0,
  0, 0, 0, 0, 0, 35, 40, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17,
  17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 255,
  255, 255, 255, 255, 255, 0, 4, 255, 255, 255, 255, 255, 255, 0, 3, 21, 6, 230,
  244, 76, 29, 98, 145, 200, 153, 81, 162, 76, 108, 162, 140, 124, 94, 225, 206,
  207, 95, 142, 172, 0, 0, 0, 0, 0, 0, 6, 32, 0, 0, 0, 0, 0, 0, 6, 0,
];

ourLoaderScriptSplit.instructionBytes.forEach((val, index) => {
  if (val !== rustLoaderScript[index]) {
    console.log("Bytecode mismatch at index", index);
  }
});

const noInstructions = rustLoaderScript.slice(
  ourLoaderScriptSplit.instructionBytes.length,
);

ourLoaderScriptSplit.blobBytes.forEach((val, index) => {
  if (val !== noInstructions[index]) {
    console.log("blob bytecode mismatch at ", index);
  }
});

const noBlob = noInstructions.slice(ourLoaderScriptSplit.blobBytes.length);

ourLoaderScriptSplit.dataSectionLenBytes.forEach((val, index) => {
  if (val !== noBlob[index]) {
    console.log("data section mismatch at ", index);
  }
});

const noDataSectionLen = noBlob.slice(
  ourLoaderScriptSplit.dataSectionLenBytes.length,
);

ourLoaderScriptSplit.dataSection.forEach((val, index) => {
  if (val !== noDataSectionLen[index]) {
    console.log("data section mismatch at ", index);
  }
});
