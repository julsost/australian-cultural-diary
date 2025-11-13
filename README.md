# Australian Cultural Diary — Juliet Sostena

**Single-page React + Vite app** designed for Juliet to showcase 10 cultural diary entries.  
Theme: subtle Australian cues (gumleaf/wattle, eucalyptus green, coastal blue, sand).

## What's included
- React + Vite app with Tailwind CSS
- `content/entries.json` — 10 example diary entries
- `public/images/` — placeholder image filenames (replace with your photos)
- Client-side anonymous comments stored in `localStorage`
- Simple edit mode: load the app with `?edit=true` to edit entries inline
- Instructions to build & deploy to **GitHub Pages**

---

## Quick start (local)
1. Install dependencies:
```bash
npm install
```
2. Run dev server:
```bash
npm run dev
```
3. Open `http://localhost:5173` (or the address printed by Vite).

---

## How to edit entries (easy)
Entries live in `content/entries.json` (an array of 10 objects). To edit:
1. Open `content/entries.json` and change titles, description, reflection, or image filenames.
2. Add image files to `public/images/` (use the same filenames as in the JSON).
3. Preview locally with `npm run dev`.
4. Alternatively use the **Edit mode** in the browser: add `?edit=true` to the URL to open inline editors. The page will update the content in-browser and provide instructions to copy your changes back into `content/entries.json` to commit to GitHub.

**Important:** Edit mode updates content only in the browser and `localStorage`. To make permanent changes in your repo, copy edits back into `content/entries.json` and commit.

---

## Commenting
- Each entry has a lightweight anonymous comment panel (e.g. "Anon #123").
- Comments are stored in the browser's `localStorage` (per browser/device).
- To add server-side persistence, you can wire comments to GitHub Issues or a simple backend — see the bottom of this README for recommended links and short notes.

---

## Deploy to GitHub Pages
1. Create a repo on GitHub and push this project.
2. Build: `npm run build`
3. Option A (recommended): In repo settings → Pages, set source to `gh-pages` branch or `docs/` folder.
   - To use `docs/`: copy contents of `dist/` to `docs/` and commit.
4. Or use `gh-pages` package / action — many guides online. The site will be available at `https://<username>.github.io/<repo>/`.

---

## File structure (important files)
```
australian-cultural-diary-juliet-sostena/
├─ public/
│  └─ images/ (place your jpg/png files here)
├─ content/
│  └─ entries.json
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ components/
│  └─ styles.css
├─ index.html
├─ package.json
├─ tailwind.config.cjs
└─ README.md
```

---

## Notes for the teacher / grader
- Each entry includes a clearly labeled **Reflection** section (1–3 paragraphs) — the graded material.
- Accessibility: semantic HTML, keyboard navigable controls, responsive layout.
- If you want comments synced across devices, see **Optional: GitHub Issues** below.

---

## Optional: swap comments to GitHub Issues
- Use GitHub Issues API to create a backend: when a user posts a comment, call a server that authenticates using a GitHub App token and creates an issue or comment linked to the entry `id`.
- For classroom use, a lightweight server (Node/Express + Octokit) or GitHub Actions can be used. This README intentionally keeps details short — ask me and I can provide a minimal example.

---

Have fun! Replace images in `public/images/` with your photos and edit `content/entries.json` to make it yours. 🎨
