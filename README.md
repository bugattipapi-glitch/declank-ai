# Replicant Repair / declank.ai

Tucson AI help for small businesses: content cleanup, team training, automations and websites. This repository contains the approved design preview, including the Pueblo Revival repair shop, two-state replicant, persistent Tucson cactus neon with amber edge bulbs and project portfolio.

## Local preview

From the repository directory:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory public
```

Open http://127.0.0.1:4173.

## Structure

- `public/index.html`: page copy and accessible markup
- `public/styles.css`: responsive layout and visual design
- `public/app.js`: pixel scene, sign behavior, copy diagnostic and demo intake
- `public/assets/`: images, gameplay captures, the wordmark font and `share.png` (the link-preview image)
- `public/favicon.svg`: browser tab icon
- `vercel.json`: static deployment configuration, with `public` as the output directory

There is no package installation or build step. Import this repository into Vercel using the Other preset. Git integration can deploy changes from the production branch and create previews for other branches.

## Preview status

The intake form is a demo. It sends and stores nothing. A submission destination must be connected before launch. Search indexing is disabled in the preview. The custom domain is not connected by this project configuration.

## Asset notes

The repair shop and replicant are original concept artwork. Veyrakk gameplay and the portfolio projects belong to Jason Benson. Portfolio screenshots were captured from the supplied project URLs. The wordmark uses Phil Steinschneider's Blade Runner Movie Font recreation; its capital R is a complete movie-logo glyph, so the normal lowercase r letterform is intentionally used. Font source and terms: https://props.steinschneider.com/blade_runner/BRFont.htm . Body and display fonts are loaded from Google Fonts.

## Cactus animation

The sign uses a 78 × 236 pixel master with three aligned lighting states. The housing, pole and silhouette never move. Green tubes or selected amber bulbs briefly dim at random intervals. Reduced motion keeps the lights steady. The mobile sign is 124.8 pixels wide, 20% smaller than the 156 pixel concept, and sits behind the shop.

## Positioning

The page leads with AI slop as the hook, then widens to AI adoption across the business ("a personal trainer for your AI"). The free offer has two entry points on one intake form: a Slop Check for content and an AI Checkup for how work gets done. On phones the hero copy comes first and the shop scene sits beneath it; before/after cards and workbench projects scroll sideways.

Placeholders to confirm before launch: the AI Game Plan price, the two-business-day reply time, and the `og:image` address (currently the vercel.app URL).
