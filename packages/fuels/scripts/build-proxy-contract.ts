import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";

// generate types for pre-built contracts
execSync(
  `fuels-typegen -i src/cli/commands/deploy/proxy/contract/*-abi.json -o src/cli/commands/deploy/proxy/types`,
);

// overrides 'fuels' absolute import paths with relative ones
const PROXY_PATH = `src/cli/commands/deploy/proxy/types/Src14OwnedProxy.ts`;
const FACTORY_PATH = `src/cli/commands/deploy/proxy/types/Src14OwnedProxyFactory.ts`;

const proxyContents = readFileSync(PROXY_PATH, "utf-8");
const contentsContents = readFileSync(FACTORY_PATH, "utf-8");

const relativeIndexPath = `"../../../../..";`;

writeFileSync(
  PROXY_PATH,
  proxyContents.replace(/("|')fuels("|');/g, relativeIndexPath),
);

writeFileSync(
  FACTORY_PATH,
  contentsContents.replace(/"fuels";/g, relativeIndexPath),
);
