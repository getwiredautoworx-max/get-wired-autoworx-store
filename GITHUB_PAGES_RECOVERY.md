# GitHub Pages recovery — 2026-09-30

The repository is public and the store has a root `index.html`. The GitHub Actions connector can push code but cannot create the Pages site itself because the connected GitHub integration lacks the repository Pages/Administration permission required to create a Pages site.

## Owner action required
Open:
https://github.com/getwiredautoworx-max/get-wired-autoworx-store/settings/pages

Under **Build and deployment**:
1. Set **Source** to **Deploy from a branch**.
2. Select branch **main**.
3. Select folder **/(root)**.
4. Click **Save**.

GitHub documents that repository admins/maintainers can configure the Pages publishing source, and branch publishing does not require the Actions integration to create the site. The repository already contains the root `index.html`, which redirects to `store.html`.

## Custom domain
A root `CNAME` file containing `getwiredautoworx.co.za` has been committed in preparation for the production custom domain.

After the Pages site is created, GitHub may require the custom domain/DNS to be confirmed in Pages settings. Do not spend Cloudflare, Netlify or Replit credits.

## Expected result
Once Pages is created, the existing Pages Actions workflow can also be retried because the previous failure occurred at site creation (`Get Pages site: Not Found` / `Create Pages site: Resource not accessible by integration`). This is a configuration/permission blocker, not a storefront-code blocker.
