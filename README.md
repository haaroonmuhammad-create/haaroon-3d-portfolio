# Haaroon Muhammad — 3D Product & Prototype Design Portfolio

## V3 interactive build

This version includes a fully interactive standalone `preview.html` plus the production Next.js source.

### Standalone preview
Open `preview.html` directly in a browser. It is self-contained and does not need npm or a local server for the portfolio content.

Working interactions in the standalone preview:
- Navigation jumps to the requested section.
- `Explore My Work` opens the work section.
- `Resume` and `Download Resume` download the included resume.
- Every project cover/card opens project-specific details: context, role, design story, workflow, focus tags and learning.
- Every project detail modal includes a downloadable STL.
- Project gallery filters work.
- Union Software and ShivPrema certificate buttons open the respective certificate.
- Every credential card opens the original certificate at full size.
- Union Software and ShivPrema credential modals include PDF downloads.
- Email, LinkedIn, phone and WhatsApp actions are live links.
- Modals close using the X button, outside click, or Escape.

### Full Next.js site
The Next.js version contains the interactive React Three Fiber STL model viewer in addition to the same portfolio content.

Run locally:
```bash
npm install
npm run dev
```
Then open `http://localhost:3000`.

Production test:
```bash
npm run build
```

### Important
The Pocket Organizer was described as company-order internship work. Keep its public STL download enabled only if you have permission to distribute that file.
