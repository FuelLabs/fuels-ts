import { defineConfig } from 'vitepress';
import { codeInContextPlugin } from './plugins/codeInContextPlugin';
import { snippetPlugin } from './plugins/snippetPlugin';
import apiLinks from '../.typedoc/api-links.json';

export default defineConfig({
  title: 'Fuels-ts',
  description: 'Fuel Labs Typescript SDK',
  base: '/fuels-ts/',
  srcDir: 'src',
  outDir: 'dist',
  lang: 'en-US',
  appearance: 'dark',
  markdown: {
    config: (md) => {
      md.use(snippetPlugin);
      md.use(codeInContextPlugin);
      md.block.ruler.disable('snippet');
    },
  },
  head: [
    ['link', { rel: 'icon', href: '/fuels-ts/favicon.ico', type: 'image/png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://fuellabs.github.io/fuels-ts/' }],
  ],
  themeConfig: {
    logo: 'fuel-logo.png',
    nav: [
      {
        text: 'Home',
        link: '/',
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/FuelLabs/fuels-ts' },
      { icon: 'twitter', link: 'https://twitter.com/fuel_network' },
      { icon: 'discord', link: 'https://discord.com/invite/xfpK4Pe' },
    ],
    editLink: {
      pattern: 'https://github.com/fuellabs/fuels-ts/edit/master/apps/docs/src/:path',
      text: 'Edit this page on GitHub',
    },
    sidebar: [
      {
        text: 'Introduction',
        link: '/',
        items: [
          {
            text: 'Getting Started',
            link: '/getting-started',
          },
          // New page
          // {
          //   text: 'Creating a Fuel dApp',
          //   link: '/creating-a-fuel-dapp', // need to add
          // }
        ],
      },
      {
        text: 'Basics',
        link: '/basics/', // need to add
        items: [
          {
            text: 'Providers',
            link: '/basics/providers/',
            collapsed: true,
            items: [
              {
                text: 'Connection',
                link: '/basics/providers/connection',
              },
              {
                text: 'Connecting to Testnet',
                link: '/basics/providers/connecting-to-testnet',
              },
              {
                text: 'Querying the Chain',
                link: '/basics/providers/querying-the-chain',
                collapsed: true,
                items: [
                  {
                    text: 'Messages',
                    link: '/basics/providers/messages/',
                    collapsed: true,
                    // These could probably be consolidated to the same page (/basics/providers/messages/)
                    items: [
                      {
                        text: 'Getting a Message Proof',
                        link: '/basics/providers/messages/getting-a-message-proof',
                      },
                      {
                        text: 'Getting All Resources',
                        link: '/basics/providers/messages/getting-all-resources',
                      },
                      {
                        text: 'Getting Messages',
                        link: '/basics/providers/messages/getting-messages',
                      },
                    ],
                  },
                ]
              },
              {
                text: 'Retrying calls',
                link: '/basics/providers/retrying-calls',
              },
            ],
          },
          // {
          //   text: 'GraphQL',
          //   link: '/guide/graphql/', // need to add
          //   collapsed: true,
          //   items: [
          //     {
          //       text: 'Schema',
          //       link: '/guide/graphql/schema', // need to add
          //     },
          //     {
          //       text: 'Playground',
          //       link: '/guide/graphql/playground', // need to add
          //     },
          //     {
          //       text: 'Custom Queries',
          //       link: '/guide/graphql/custom-queries', // need to add
          //     },
          //     {
          //       text: 'Subscriptions',
          //       link: '/guide/graphql/subscriptions', // need to add
          //     }
          //   ],
          // },
          {
            text: 'Wallets',
            link: '/basics/wallets/',
            collapsed: true,
            items: [
              // Deprecated?
              // {
              //   text: 'Access',
              //   link: '/basics/wallets/access',
              // },
              {
                text: 'Private Keys',
                link: '/basics/wallets/private-keys',
              },
              {
                text: 'Mnemonic Wallet',
                link: '/basics/wallets/mnemonic-wallet',
              },
              {
                text: 'Encrypting and Decrypting JSON Wallets',
                link: '/basics/wallets/encrypting-and-decrypting-json-wallets',
              },
              {
                text: 'Checking Balances',
                link: '/basics/wallets/checking-balances-and-coins',
              },
              {
                text: 'Wallet Manager',
                link: '/basics/wallets/wallet-manager/',
                collapsed: true,
                items: [
                  {
                    text: 'Getting Started With Wallet Manager',
                    link: '/basics/wallets/wallet-manager/getting-started-with-wallet-manager',
                  },
                  {
                    text: 'Locking And Unlocking Wallet Manager',
                    link: '/basics/wallets/wallet-manager/locking-and-unlocking-wallet-manager',
                  },
                ],
              },
              // New page
              // {
              //   text: 'Locking & Unlocking',
              //   link: '/basics/wallets/locking-and-unlocking',
              // },
              {
                text: 'Signing', // change to "Signing Transactions"
                link: '/basics/wallets/signing',
              },
              // New page
              // {
              //   text: 'External Connectors',
              //   link: '/basics/wallets/external-connectors',
              // },
              {
                text: 'Test Wallets',
                link: '/basics/wallets/test-wallets',
              },
            ],
          },
          {
            text: 'ABI',
            link: '/basics/abi/',
            collapsed: true,
            items: [
              // New page
              // {
              //   text: 'The JSON ABI file',
              //   link: '/guide/abi-typegen/the-json-abi-file',
              // },
              {
                text: 'Generating Types',
                link: '/basics/abi/generating-types',
              },
              {
                text: 'Using Generated Types',
                link: '/basics/abi/using-generated-types',
              },
            ],
          },
        ]
      },
      {
        text: 'Essentials',
        link: '/essentials/',
        items: [
          {
            text: 'Contracts',
            link: '/essentials/contracts/',
            collapsed: true,
            items: [
              // New page?
              // {
              //   text: 'Instantiating a Contract',
              //   link: '/essentials/contracts/instantiating-a-contract',
              // },
              {
                text: 'Calling Contract Functions',
                link: '/essentials/contracts/calling-contract-functions/',
                collapsed: true,
                items: [
                  {
                    text: 'Methods',
                    link: '/essentials/contracts/calling-contract-functions/methods',
                  },
                  {
                    text: 'Transaction Parameters',
                    link: '/essentials/contracts/calling-contract-functions/transaction-parameters',
                  },
                  {
                    text: 'Call Parameters',
                    link: '/essentials/contracts/calling-contract-functions/call-parameters',
                  },
                  {
                    text: 'Cost Estimation',
                    link: '/essentials/contracts/calling-contract-functions/cost-estimation',
                  },
                  {
                    text: 'Dependency Estimation',
                    link: '/essentials/contracts/calling-contract-functions/transaction-dependency-estimation',
                  },
                  {
                    text: 'Variable Outputs',
                    link: '/essentials/contracts/calling-contract-functions/variable-outputs',
                  },
                  // New page
                  // {
                  //   text: 'Transaction response',
                  //   link: '/essentials/contracts/transaction-response',
                  // },
                  {
                    text: 'Logs',
                    link: '/essentials/contracts/calling-contract-functions/logs',
                  },
                ]
              },
              {
                text: 'Inter-contract Calls',
                link: '/essentials/contracts/inter-contract-calls',
              },
              {
                text: 'Multi-contract calls',
                link: '/essentials/contracts/multi-contract-calls',
              },
              {
                text: 'Using different Wallets', // Using different Wallets
                link: '/essentials/contracts/calls-with-different-wallets',
              },
              {
                text: 'Deploying Contracts',
                link: '/essentials/contracts/deploying-contracts',
                collapsed: true,
                items: [
                  {
                    text: 'Storage Slots',
                    link: '/essentials/contracts/deploying-contracts/storage-slots',
                  },
                  {
                    text: 'Configurable Constants',
                    link: '/essentials/contracts/deploying-contracts/configurable-constants',
                  },
                  {
                    text: 'Understanding the FuelVM Binary File',
                    link: '/essentials/contracts/deploying-contracts/understanding-the-fuelvm-binary-file',
                  },
                ]
              },
              // Removed in Notion?
              // {
              //   text: 'Managing Deployed Contracts',
              //   link: '/essentials/contracts/managing-deployed-contracts',
              // },
              // {
              //   text: 'Add Transfer',
              //   link: '/essentials/contracts/add-transfer',
              // },
              // {
              //   text: 'Contract Balance',
              //   link: '/essentials/contracts/contract-balance',
              // },
            ],
          },
          {
            text: 'Scripts',
            link: '/essentials/scripts/',
            collapsed: true,
            items: [
              {
                text: 'Instantiating A Script',
                link: '/essentials/scripts/instantiating-a-script',
              },
              {
                text: 'Configurable Constants',
                link: '/essentials/scripts/script-with-configurable-constants',
              },
              // New page? Running scripts
              // New page?  Custom script Call

              // Not in Notion
              // {
              //   text: 'Calling A Script',
              //   link: '/essentials/scripts/calling-a-script',
              // },
              // {
              //   text: 'Preparing A Script',
              //   link: '/essentials/scripts/preparing-a-script',
              // },
            ],
          },
          {
            text: 'Predicates',
            link: '/essentials/predicates/',
            collapsed: true,
            items: [
              // {
              //   text: 'Instantiating A Predicate',
              //   link: '/guide/predicates/instantiating-a-predicate',
              // },
              {
                text: 'Send And Spend Funds From Predicates',
                link: '/essentials/predicates/send-and-spend-funds-from-predicates',
              },
              {
                text: 'Predicate With Configurable Constants',
                link: '/essentials/predicates/predicate-with-configurable-constants',
              },
              // Not in Notion
              {
                text: 'Predicate with More Complex Args',
                link: '/essentials/predicates/predicate-with-more-complex-args',
              },
            ],
          },
          {
            text: 'Cookbook',
            link: '/essentials/cookbook/', // change dir
            collapsed: true,
            items: [
              {
                text: 'Transferring Assets',
                link: '/essentials/cookbook/transferring-assets',
              },
              {
                text: 'Deposit And Withdraw',
                link: '/essentials/cookbook/deposit-and-withdraw',
              },
              {
                text: 'Wallet SDK and React Hooks',
                link: '/essentials/cookbook/wallet-sdk-and-react-hooks',
              },

              // Deprecated?
              // {
              //   text: 'Custom Transactions',
              //   link: '/guide/cookbook/custom-transactions',
              // },
              // {
              //   text: 'Custom Transactions from Contract Calls',
              //   link: '/guide/cookbook/custom-transactions-from-contract-calls',
              // },
            ],
          },
        ],

      },
      {
        text: 'Extras',
        link: '/extras/', // new dir required
        items: [
          {
            text: 'Types',
            link: '/extras/types/',
            collapsed: true,
            items: [
              {
                text: 'Address',
                link: '/extras/types/address',
              },
              {
                text: 'Arrays',
                link: '/extras/types/arrays',
              },
              {
                text: 'Asset Id',
                link: '/extras/types/asset-id',
              },
              {
                text: 'Bech32',
                link: '/extras/types/bech32',
              },
  
              {
                text: 'Bits256',
                link: '/extras/types/bits256',
              },
              {
                text: 'Bits512',
                link: '/extras/types/bits512',
              },
              {
                text: 'Bytes',
                link: '/extras/types/bytes',
              },
              {
                text: 'Bytes32',
                link: '/extras/types/bytes32',
              },
              {
                text: 'Enums',
                link: '/extras/types/enums',
              },
              {
                text: 'Evm Address',
                link: '/extras/types/evm-address',
              },
              {
                text: 'Native Parameters',
                link: '/extras/types/native-parameters',
              },
              {
                text: 'Numbers',
                link: '/extras/types/numbers',
              },
              {
                text: 'Options',
                link: '/extras/types/options',
              },
              {
                text: 'Raw Slice',
                link: '/extras/types/raw-slice',
              },
              {
                text: 'Std String',
                link: '/extras/types/std-string',
              },
              {
                text: 'String',
                link: '/extras/types/string',
              },
              {
                text: 'Structs',
                link: '/extras/types/structs',
              },
              {
                text: 'Tuples',
                link: '/extras/types/tuples',
              },
              {
                text: 'Vectors',
                link: '/extras/types/vectors',
              },
            ],
          },
          // {
          //   text: 'Errors',
          //   link: '/guide/errors/',
          //   collapsed: true,
          //   items: [
          //     {
          //       text: 'Error Codes',
          //       link: '/guide/errors/error-codes',
          //     },
          //     {
          //       text: 'Revert Errors',
          //       link: '/guide/errors/revert-errors',
          //     },
          //   ],
          // },
          {
            text: 'Utilities',
            link: '/extras/utilities/',
            collapsed: true,
            items: [
              // New page
              // {
              //   text: 'Big Number conversions',
              //   link: '/guide/utilities/big-number-conversions',
              // },
              {
                text: 'Date time conversion',
                link: '/extras/utilities/date-time-conversion',
              },
              {
                text: 'Address conversion',
                link: '/extras/utilities/address-conversion',
              }
            ]
          }
        ]
      },
      {
        text: 'Tooling',
        link: '/tooling/',  // new dir required
        items: [
          {
            text: 'Testing',
            link: '/guide/testing/',
            collapsed: true,
            items: [
              {
                text: 'Testing in TS',
                link: '/guide/testing/testing-in-ts',
              },
              {
                text: 'Setting Up a Custom Chain',
                link: '/guide/testing/setting-up-a-custom-chain',
              },
              {
                text: 'Tweaking the Blockchain',
                link: '/guide/testing/tweaking-the-blockchain',
              },
            ],
          },
          {
            text: 'Testing',
            link: '/guide/testing/',
            collapsed: true,
            items: [
              {
                text: 'Launching nodes',
                link: '/guide/testing/launching-nodes',
              },
              {
                text: 'Launching test nodes',
                link: '/guide/testing/launching-test-nodes',
              },
              {
                text: 'Generate test wallets',
                link: '/guide/testing/generate-test-wallets',
              },
              {
                text: 'Test Utilities',
                link: '/guide/testing/test-utilities',
              }
            ]
          },
          {
            text: 'CLI',
            link: '/guide/cli/',
            collapsed: true,
            // Review required
            items: [
              {
                text: 'create fuels',
                link: '/guide/quickstart/', //placeholder
                collapsed: true,
              },
              {
                text: 'fuels',
                link: '/guide/quickstart/', //placeholder
                collapsed: true,
              },
              // {
              //   text: 'Commands',
              //   link: '/guide/cli/commands',
              // },
              // {
              //   text: 'Config File',
              //   link: '/guide/cli/config-file',
              // },
              // {
              //   text: 'Built-in Binaries',
              //   link: '/guide/cli/built-in-binaries',
              // },
            ],
          },
        ]
      },
      apiLinks,
    ],
  },
});
