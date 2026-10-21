<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- The static GitHub Pages build is opted in only by the `GH_PAGES_BASE` env var
  (`vite.config.ts`); Lovable's own publish build leaves it unset so the site
  keeps server rendering. Keep that split — a static build must not become the
  default, and `dist/client/index.html` must be copied to `404.html` when
  publishing to Pages, because Pages cannot route unknown URLs.

