import { parse as commandLineArgs } from 'ts-command-line-args';

const DEFAULT_GLOB_PATTERN = '**/*.abi';

export interface ParsedArgs {
  files: string[];
  target: string;
  outDir?: string | undefined;
  inputDir?: string | undefined;
  flags: {
    discriminateTypes: boolean;
    alwaysGenerateOverloads: boolean;
    tsNocheck: boolean;
  };
}

export function parseArgs(): ParsedArgs {
  const rawOptions = commandLineArgs<CommandLineArgs>(
    {
      glob: {
        type: String,
        defaultOption: true,
        multiple: true,
        defaultValue: [DEFAULT_GLOB_PATTERN],
        description:
          'Pattern that will be used to find ABIs. Remember about adding quotes: typechain "**/*.json", examples: ./abis/**/*.abi, ./abis/?(Oasis.abi|OasisHelper.abi).',
      },
      target: {
        type: String,
        description:
          'typechain-target-fuels or path to your custom target. Typechain will try to load package named: @typechain/<target>, so make sure that desired package is installed.',
      },
      'out-dir': {
        type: String,
        optional: true,
        description: 'Output directory for generated files.',
      },
      'input-dir': {
        type: String,
        optional: true,
        description:
          'Directory containing ABI files. Inferred as lowest common path of all files if not specified.',
      },
      'always-generate-overloads': {
        type: Boolean,
        defaultValue: false,
        description: `Some targets won't generate unnecessary types for overloaded functions by default, this option forces to always generate them.`,
      },
      /** This is read directly from process.argv in cli.ts */
      'show-stack-traces': { type: Boolean, defaultValue: false },
      'ts-nocheck': {
        type: Boolean,
        defaultValue: false,
        description:
          'Prepend "@ts-nocheck" comment to generated files to opt-out of typechecking them in your project.',
      },
      'discriminate-types': {
        type: Boolean,
        defaultValue: false,
        description:
          'ethers-v5 target will add an artificial field `contractName` that helps discriminate between contracts',
      },
      help: { type: Boolean, defaultValue: false, alias: 'h', description: 'Prints this message.' },
    },
    {
      helpArg: 'help',
      headerContentSections: [
        {
          content: `\
          TypeChain generates TypeScript types for Ethereum contract ABIs.
          Thank you for using it!`,
        },
      ],
      footerContentSections: [
        {
          header: 'Example Usage',
          content: `\
          typechain --target ethers-v5 --out-dir app/contracts './contracts/*.json'


          You can read more about TypeChain at {underline https://github.com/dethcrypto/TypeChain}.`,
        },
      ],
    }
  );

  return {
    files: rawOptions.glob,
    outDir: rawOptions['out-dir'],
    inputDir: rawOptions['input-dir'],
    target: rawOptions.target,
    flags: {
      alwaysGenerateOverloads: rawOptions['always-generate-overloads'],
      discriminateTypes: rawOptions['discriminate-types'],
      tsNocheck: rawOptions['ts-nocheck'],
    },
  };
}

interface CommandLineArgs {
  glob: string[];
  target: string;
  'out-dir'?: string;
  'input-dir'?: string;
  'show-stack-traces': boolean;
  'always-generate-overloads': boolean;
  'discriminate-types': boolean;
  'ts-nocheck': boolean;
  help: boolean;
}
