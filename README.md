# Kandi IT Services — Local preview & deployment

This small site is a static HTML/CSS/JS project. Preview locally or deploy to GitHub Pages or Netlify.

Local preview

```bash
# from project root
python -m http.server 8000
# then open http://localhost:8000
```

Deploy to GitHub Pages (manual)

1. Create a repository on GitHub and push this project (or use the GitHub CLI):

```bash
git init
git add .
git commit -m "Initial site"
# create repo on GitHub and push (replace <user>/<repo>)
gh repo create <user>/<repo> --public --source=. --remote=origin --push
```

2. In the repository settings, enable GitHub Pages from the `main` branch (or create a `gh-pages` branch).

Deploy to Netlify (quick)

- Drag & drop the project folder into the Netlify Sites dashboard, or use the Netlify CLI:

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

If you'd like, I can create a Git repo here and generate the necessary GitHub Pages branch commands for you — tell me the GitHub repo name (or I can leave instructions).