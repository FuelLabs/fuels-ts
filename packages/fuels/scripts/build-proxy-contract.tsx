import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";

// build contract
execSync(
  `fuels-forc build --release -p src/cli/commands/deploy/proxy/contract`,
);

// generate types for it
execSync(
  `fuels-typegen -i src/cli/commands/deploy/proxy/contract/out/release/*-abi.json -o src/cli/commands/deploy/proxy/types`,
);

// overrides 'fuels' absolute import paths with relative ones
const PROXY_PATH = `src/cli/commands/deploy/proxy/types/Src14OwnedProxy.ts`;
const FACTORY_PATH = `src/cli/commands/deploy/proxy/types/Src14OwnedProxyFactory.ts`;

const proxyContents = readFileSync(PROXY_PATH, "utf-8");
const contentsContents = readFileSync(FACTORY_PATH, "utf-8");

writeFileSync(
  PROXY_PATH,
  proxyContents.replace(/("|')fuels("|');/g, `"../../../../..";`),
);
writeFileSync(
  FACTORY_PATH,
  contentsContents.replace(/"fuels";/g, `"../../../../..";`),
);
