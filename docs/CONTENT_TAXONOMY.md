# Blog content taxonomy

Blog Markdown files live in `content/` for English and `content/it/` for Italian. Category directories are localized, and the frontmatter `category` should use the same localized slug.

| English category | Italian category | Use |
| --- | --- | --- |
| `on-web-marketing` | `sul-web-marketing` | Web marketing and commercial work |
| `on-web-development` | `sullo-sviluppo-web` | General web development |
| `on-web-development` | `sul-3d` | Dedicated 3D and Gaussian Splatting articles |
| `on-cryptocurrencies` | `sulle-criptovalute` | Cryptocurrency articles |
| `in-general` | `in-generale` | General topics |
| no category | no category | Leave `category` out of frontmatter; the Italian `tanti-auguri` post is an example |

An English category folder rename from `on-webmarketing` to `on-web-marketing` and the Italian category moves changed some article paths. The previous routes are listed in `legacyPostRoutes` in `src/app/lib/markdown/posts.ts`. The catch-all article pages generate static forwarding pages for these old paths, while canonical metadata, language alternates and the sitemap use the new routes.

## Static hosting behavior

The site uses Next.js `output: 'export'` and deploys to GitHub Pages. GitHub Pages does not provide HTTP 301 redirects from this application. Legacy paths therefore resolve to static HTML pages with a meta refresh and a visible link to the canonical article. These are browser-side/static forwards, not server-side 301 responses.

When moving or renaming a post:

1. Move the Markdown file into its localized category directory.
2. Set or update the localized `category` frontmatter value; omit it for uncategorized posts.
3. If the public path changes, add an old-to-new entry in `legacyPostRoutes`.
4. Keep `translationKey` unchanged for translated articles.
5. Confirm that generated article links and the sitemap point to the canonical route.
