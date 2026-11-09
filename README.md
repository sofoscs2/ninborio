# nimborio.com (Vue version)

The same site as `C:\projects\nimborio`, rebuilt with **Vue 3 + Vite**. Every page looks and works exactly the same, at the same addresses.

`npm run build` turns every page into a ready HTML file (with [vite-ssg](https://github.com/antfu-collective/vite-ssg)), so:
- the hosting stays the same: plain files plus the one PHP file for Facebook, no Node.js on the server;
- Google sees full pages with their titles and descriptions;
- after the first page, moving between pages happens inside the browser, without reloading.

## Run it on your computer

```bash
npm install
npm run dev
```
Open http://localhost:5173. Address options: `?phase=night` (or `dawn`, `day`, `golden`, `dusk`); for the news on the home page: `?fb=embeds` (news as Facebook's own boxes), `?fb=plugin` (Facebook Page box), `?fb=demo` (example posts).

The news section shows the latest Facebook posts in the site's own design: 3 at first, then 4 more with each "Περισσότερα νέα". On this computer there is no PHP, so it shows the example posts instead. On the live site, if Facebook can't be reached, it falls back to Facebook's own boxes for the links in `fb-posts.json`.

To see the finished site exactly as it will be uploaded:

```bash
npm run build
npm run preview
```
Then open http://localhost:8090.

## Files

| Path | What it is |
|---|---|
| `index.html` | The page frame shared by all pages (fonts, icon) |
| `src/main.js` | Starts Vue and the page router (scrolling to `#parts` of a page) |
| `src/routes.js` | The list of pages and their addresses |
| `src/pages/` | One file per page: `HomePage` (/: news, weather, EMY, fire map), `BeachPage` (/paralia/), `HistoryPage` (/istoria/), `AroundPage` (/gyro/), `AccessPage` (/prosvasi/), `StayPage`, `GalleryPage`, `NewsPage` (/enimeroseis/), `PostPage` (each archive post), `AssociationPage`, `UsefulPage` |
| `src/components/` | Parts shared by pages: top bar, footer, wave edge |
| `src/components/home/` | `HeroBay` (aerial view on the home page), `NewsFeed` + `NewsReader` (Facebook news), `FireMap`, `EmyStation`, `WeatherCard`: all on the home page |
| `src/lib/menus.js` | The one menu used in the top bar and footer of every page. Old links to parts of the home page (`/#paralia`, `/#prosvasi` …) are sent to their own pages (see `src/routes.js`) |
| `src/data/routes.json` | The 3 routes from Athens drawn on the Πρόσβαση map, with their distances and times (made by `npm run routes`, which asks OpenStreetMap and the OSRM route planner) |
| `src/data/posts.json` | The 20 posts of the old WordPress site (made by `npm run posts`) |
| `src/styles/site.css` | All styles and colours (unchanged from the plain-HTML site) |
| `public/` | Copied as-is into the site: images, PDFs, `gallery.json`, `fb-posts.json`, `api/facebook.php`, `.htaccess` |
| `public/assets/js/sky.js` | Works out the time of day before the page appears, so the hero shows the right look from the start |

## Changing content

- **Text of a page**: edit the page in `src/pages/`.
- **Routes on Πρόσβαση**: the steps and links are in `src/pages/AccessPage.vue`. To recalculate the lines on the map and the distances and times, run `npm run routes`.
- **Hide or show a part of the site**: in `src/lib/options.js`, set `SHOW_UPDATES` ("Ενημερώσεις", the archive and its 20 old posts) or `SHOW_STAY` ("Διαμονή & Φαγητό", the page and its box on the home page) to `false` (hidden, as now) or `true`, then build and upload again. While a part is hidden, its addresses and the old WordPress links to it lead to the home page.
- **Facebook posts list** (backup when PHP is off): `public/assets/data/fb-posts.json`, newest first.
- **Photo gallery**: as before, run `npm run gallery` in `C:\projects\nimborio`, then copy `assets/img/gallery/` and `assets/data/gallery.json` into `public/assets/`.
- **Archive posts**: they come from the plain-HTML site. After `npm run import-wp` there, run `npm run posts` here. Copy any new images from `assets/img/archive/` into `public/assets/img/archive/`.

## Latest Facebook posts automatically (live site)

Same as the plain-HTML site: on the hosting, copy `api/config.sample.php` to `api/config.php` and fill in `page_id`, `page_token` and `app_secret`. Then `https://nimborio.com/api/facebook.php` lists the latest posts. Never put `config.php` in this folder's `public/`.

## Upload to the hosting

1. `npm run build`
2. Upload **everything inside `dist/`** (including the hidden `.htaccess` files) into `public_html/`.
3. On the hosting, create `api/config.php` (see above). Make sure `api/cache/` can be written (permissions 755).

Needs PHP 8.0 or newer for the Facebook file. The `.htaccess` keeps the redirects from the old WordPress addresses.
