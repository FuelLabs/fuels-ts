import DefaultTheme from 'vitepress/theme';
import { defineComponent } from 'vue';
// @ts-ignore
import LogoComponent from './components/LogoComponent.vue';
import './styles/custom.css';

export default defineComponent({
  ...DefaultTheme,
  enhanceApp({ app }: { app: any }) {
    app.component('LogoComponent', LogoComponent);
  },
});
