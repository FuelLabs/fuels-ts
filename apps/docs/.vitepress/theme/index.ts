import DefaultTheme from 'vitepress/theme';
import { defineComponent } from 'vue';
// @ts-ignore
import LogoComponent from './components/LogoComponent.vue';
import './styles/custom.css';
import { EnhanceAppContext } from 'vitepress';

export default defineComponent({
  ...DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('LogoComponent', LogoComponent);
  },
});
