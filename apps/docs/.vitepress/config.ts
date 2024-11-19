import { defineConfig } from 'vitepress';
import { codeInContextPlugin } from './plugins/codeInContextPlugin';
import { snippetPlugin } from './plugins/snippetPlugin';
import apiLinks from '../.typedoc/api-links.json';

export default defineConfig({
  title: 'Fuels-ts',
  description: 'Fuel Typescript SDK',
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
        items: [
          {
            text: 'Creating a Fuel dApp',
            link: '/guide/creating-a-fuel-dapp/',
            collapsed: true,
            items: [
              {
                text: 'Options',
                link: '/guide/creating-a-fuel-dapp/options',
              },
              {
                text: 'Deploying a dApp to Testnet',
                link: '/guide/creating-a-fuel-dapp/deploying-a-dapp-to-testnet',
              },
              {
                text: 'Working with Predicates',
                link: '/guide/creating-a-fuel-dapp/working-with-predicates',
              },
            ],
          },
          apiLinks,
        ],
      },
    ],
  },
});
