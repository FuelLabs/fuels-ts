import { SearchPlugin } from 'vitepress-plugin-search';

export default {
  plugins: [
    SearchPlugin({
      tokenize: 'full',
      previewLength: 20,
      buttonLabel: 'Search',
      placeholder: 'Search docs',
    }),
  ],
};
