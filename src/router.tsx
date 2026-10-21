import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Static hosts (GitHub Pages) serve a page as <folder>/index.html, so the
    // canonical URL keeps its trailing slash and the build-time render of
    // "/cash/" is served directly instead of being redirected.
    trailingSlashOption: "always",
  });

  return router;
};
