// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages only serves static files, so that build writes every page to
// disk instead of rendering it per request. It is opted in by setting
// GH_PAGES_BASE (the path the site is served from: "/" for a custom domain or
// user.github.io/repo, "/repo/" otherwise). Lovable's own publish build leaves
// it unset and keeps server rendering.
const pagesBase = process.env.GH_PAGES_BASE;
const staticBuild = pagesBase !== undefined;

const STATIC_PAGES = [
  { path: "/" },
  { path: "/cash" },
  { path: "/aa0c78289ddb8ffba9ab2aa5e82a2841" },
];

export default defineConfig({
  ...(staticBuild ? { vite: { base: pagesBase } } : {}),
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(staticBuild
      ? {
          spa: { enabled: true, maskPath: "/" },
          pages: STATIC_PAGES,
          prerender: { enabled: true, autoStaticPathsDiscovery: false },
        }
      : {}),
  },
});
