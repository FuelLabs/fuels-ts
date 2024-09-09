// vite.config.ts
import { defineConfig, loadEnv } from "file:///Users/dhaiwat/code/fuels-ts/node_modules/.pnpm/vite@5.4.2_@types+node@22.5.0_terser@5.31.6/node_modules/vite/dist/node/index.js";
import react from "file:///Users/dhaiwat/code/fuels-ts/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.0_@swc+helpers@0.5.12_vite@5.4.2_@types+node@22.5.0_terser@5.31.6_/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { TanStackRouterVite } from "file:///Users/dhaiwat/code/fuels-ts/node_modules/.pnpm/@tanstack+router-plugin@1.48.6_vite@5.4.2_@types+node@22.5.0_terser@5.31.6_/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env": env
    },
    plugins: [TanStackRouterVite(), react()]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZGhhaXdhdC9jb2RlL2Z1ZWxzLXRzL3RlbXBsYXRlcy92aXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvZGhhaXdhdC9jb2RlL2Z1ZWxzLXRzL3RlbXBsYXRlcy92aXRlL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9kaGFpd2F0L2NvZGUvZnVlbHMtdHMvdGVtcGxhdGVzL3ZpdGUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xuaW1wb3J0IHsgVGFuU3RhY2tSb3V0ZXJWaXRlIH0gZnJvbSAnQHRhbnN0YWNrL3JvdXRlci1wbHVnaW4vdml0ZSc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpO1xuICByZXR1cm4ge1xuICAgIGRlZmluZToge1xuICAgICAgJ3Byb2Nlc3MuZW52JzogZW52LFxuICAgIH0sXG4gICAgcGx1Z2luczogW1RhblN0YWNrUm91dGVyVml0ZSgpLCByZWFjdCgpXSxcbiAgfTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtVCxTQUFTLGNBQWMsZUFBZTtBQUN6VixPQUFPLFdBQVc7QUFDbEIsU0FBUywwQkFBMEI7QUFHbkMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBQzNDLFNBQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxNQUNOLGVBQWU7QUFBQSxJQUNqQjtBQUFBLElBQ0EsU0FBUyxDQUFDLG1CQUFtQixHQUFHLE1BQU0sQ0FBQztBQUFBLEVBQ3pDO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
