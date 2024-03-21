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
  ignoreDeadLinks: true,
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
          {
            text: 'Quickstart',
            link: '/quickstart',
          },
          {
            text: 'Glossary',
            link: '/glossary',
          }
        ],
      },
      {
        text: 'Basics',
        link: '/guide/basics/',
        items: [
          {
            text: 'Providers',
            link: '/guide/providers/',
            collapsed: true,
            items: [
              {
                text: 'Connection',
                link: '/guide/providers/connection',
              },
              {
                text: 'Connecting to Testnet',
                link: '/guide/providers/connecting-to-testnet',
              },
              {
                text: 'Querying the chain',
                link: '/guide/providers/querying-the-chain',
              },
              {
                text: 'Retrying calls',
                link: '/guide/providers/retrying-calls',
              },
            ],
          },
          {
            text: 'Wallets',
            link: '/guide/wallets/',
            collapsed: true,
            items: [
              {
                text: 'Access',
                link: '/guide/wallets/access',
              },
              {
                text: 'Private Keys',
                link: '/guide/wallets/private-keys',
              },
              {
                text: 'Mnemonic Wallet',
                link: '/guide/wallets/mnemonic-wallet',
              },
              {
                text: 'Encrypting and Decrypting JSON Wallets',
                link: '/guide/wallets/encrypting-and-decrypting-json-wallets',
              },
              {
                text: 'Checking Balances and Coins',
                link: '/guide/wallets/checking-balances-and-coins',
              },
              {
                text: 'Signing',
                link: '/guide/wallets/signing',
              },
              {
                text: 'Test Wallets',
                link: '/guide/wallets/test-wallets',
              },
            ],
          },
          {
            text: 'ABI',
            link: '/guide/abi/',
            collapsed: true,
            items: [
              {
                text: 'Generating Types',
                link: '/guide/abi/generating-types',
              },
              {
                text: 'Using Generated Types',
                link: '/guide/abi/using-generated-types',
              },
            ],
          },
        ]
      },
      apiLinks,
    ],
  },
});
