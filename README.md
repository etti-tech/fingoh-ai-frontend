# B2B Exhibitions Web App Demo (ExpoFlow)

Modern, responsive Next.js (App Router) + Tailwind CSS demo for B2B exhibitions.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Implemented pages

- `/` Landing page
- `/exhibitor-dashboard` Exhibitor dashboard demo
- `/visitor-experience` Visitor discovery + meeting request demo
- `/admin-dashboard` Organizer/admin dashboard demo
- `/pricing` SaaS pricing tiers
- `/contact` Demo request form (CRM handler placeholder)
- `/login` Fake role-based login navigation

## Project structure

```text
src/
  app/
    admin-dashboard/
    contact/
    exhibitor-dashboard/
    login/
    pricing/
    visitor-experience/
    globals.css
    layout.tsx
    page.tsx
  components/
    booth-grid.tsx
    contact-form.tsx
    footer.tsx
    leads-table.tsx
    navbar.tsx
    theme-toggle.tsx
    visitor-directory.tsx
  data/
    mock-data.ts
```

## Quality checks

```bash
npm run lint
npm run build
```
