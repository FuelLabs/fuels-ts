import DefaultTheme from 'vitepress/theme';
// @ts-ignore
import LogoComponent from './components/LogoComponent.vue';
import './styles/custom.css';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('LogoComponent', LogoComponent);
  },
};
