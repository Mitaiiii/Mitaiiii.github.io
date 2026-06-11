# GitHub Pages deployment

This is a static portfolio site. The entry file is `index.html`.

## First-time setup

1. Create a public repository on GitHub.
   - For a personal GitHub Pages site, name it `<your-github-username>.github.io`.
   - For a project site, any repository name is fine.

2. In this folder, connect the local project to that repository:

```powershell
git remote add origin https://github.com/<your-github-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

3. On GitHub, open the repository settings:
   - Settings
   - Pages
   - Build and deployment
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/root`

4. Wait a few minutes, then open:
   - `https://<your-github-username>.github.io/` for a personal site
   - `https://<your-github-username>.github.io/<repo-name>/` for a project site

GitHub says Pages looks for an `index.html` entry file and static files can be published directly from a repository branch.
