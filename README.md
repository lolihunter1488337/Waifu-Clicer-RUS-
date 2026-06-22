# WIFU Aura Farming

Self-contained HTML5 idle clicker prototype for Yandex Games.

## Run

Open `index.html` in a browser. No build step or external assets are required.

For Yandex Games deployment, add the official SDK script to `index.html` before `game.js`:

```html
<script src="/sdk.js"></script>
```

The game detects `YaGames` automatically and calls `LoadingAPI.ready()` when hosted by the platform.

## Included

- Persistent menu layer with animated live waifu card
- Game, collection, cases and settings overlays with EXIT navigation
- 100 deterministic characters with fixed IDs, names, rarities and stats
- Aura clicks, combo multiplier, idle income and three upgrade paths
- 100-aura cases, duplicate refunds and rarity reveal animation
- Local storage save data with validation and reset control
- Responsive desktop/mobile layout and reduced-motion option
