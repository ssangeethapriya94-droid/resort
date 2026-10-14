# Sai Ranga Shores Beach Home: website

React (Vite) front-end + a tiny dependency-free Node back-end. Five pages: Home, Stay, Experiences, Gallery, Contact.
Design: "Tropical Serenity" (Deep Ocean Teal `#02485D`, Sand Beige `#F2EAD8`, Sunset Terracotta `#D87C51`, Sky Blue `#7DC3E2`, Warm Grey `#A1B0B6`, Ivory `#FEFEFF`; Playfair Display + Poppins + Caveat handwriting).

```
client/   React app (Vite)       -> npm run dev / npm run build
server/   Node API + file server -> node index.js  (no npm install needed)
photos-originals/   drop new original photos here, then `npm run images`
```

## 1. Run it on your computer

```bash
# Terminal 1: front-end
cd client
npm install
npm run dev            # http://localhost:5173

# Terminal 2: back-end (contact form)
cd server
node index.js          # http://localhost:4000   (needs Node 18+, nothing to install)
```
The Vite dev server forwards `/api/*` to port 4000 automatically.

## 2. Production build

```bash
cd client && npm run build      # creates client/dist
cd ../server && node index.js   # serves the site AND the API on one port
```
Enquiries from the contact form are saved to `server/data/enquiries.json`
(set `NOTIFY_WEBHOOK_URL` in `server/.env` to also push each one to Zapier / Make / Slack / Google Sheets).

## 3. Change content (no code edits needed)

Everything editable lives in **`client/src/data/site.js`**:
phone numbers, WhatsApp number, e-mail, address, map link, rooms and prices, amenities, experiences, gallery photos and categories.

* **Prices:** set `price: 3500` on a room to show "From ₹3,500 / night". `null` shows "Rates on request".
* **More rooms:** copy the room object in `ROOMS`; the Stay page lists every room.
* **Email / Instagram / Facebook:** fill the empty fields; the icons and contact row appear automatically.

## 4. Replace or add photos

1. Put the original JPGs in `photos-originals/` (file name = image name, e.g. `sunrise-sea.jpg`).
2. `cd client && npm install && npm run images` (add `WARM=beach-pano,waves` to warm up grey photos).
   This creates 640/1280/1920 px WebP files in `client/public/img` and updates `src/data/imageMeta.js`.
3. Use the name in `site.js` (e.g. `{ name: 'sunrise-sea', alt: '...', cat: 'Sunrise & Sunset' }`).

## 5. Hero slow-motion video

Files: `client/public/video/hero.mp4` (desktop) and `hero-mobile.mp4` (phones). The still photo shows first;
the video fades in when ready. Visitors with "reduce motion" or data-saver on only get the still photo.

Make a new one from your own clips (needs ffmpeg):
```bash
# 4x slow motion, 16:9 crop, smooth in-between frames, no sound
ffmpeg -i clip.mp4 -an -vf "crop=iw:iw*9/16,scale=1920:1080,setpts=4.0*PTS,minterpolate=fps=30:mi_mode=mci" -c:v libx264 -crf 24 -pix_fmt yuv420p -movflags +faststart hero.mp4
# phone version
ffmpeg -i hero.mp4 -vf scale=854:-2 -crf 28 -c:v libx264 -pix_fmt yuv420p -movflags +faststart hero-mobile.mp4
```
Tip: a golden-hour clip of the sea shot with a steady phone (10 to 20 seconds) will look far better than boat clips. Keep each file under about 6 MB.

## 6. Booking and contact: how it works

* **Booking bar** (Home): validates dates, then opens WhatsApp with arrival, departure and guests pre-filled. No server needed.
* **Contact form:** validated in the browser *and* on the server, spam honeypot, rate limit (5 per 10 min per visitor). If the server is unreachable the visitor is shown a WhatsApp link instead of a fake "sent" message.
* There is no payment or live availability calendar. That would be the next phase (database + admin page).

## 7. Deploy

**Option A: one Node host** (Render, Railway, a VPS): run `npm run build` then `node server/index.js`. Serves site + API.

**Option B: static front-end + API elsewhere:** upload `client/dist` to Netlify / Vercel / Cloudflare Pages
(`public/_redirects` already handles page refresh on /stay, /gallery...), deploy `server/` on a Node host, and build the client with
`VITE_API_URL=https://your-api-host npm run build`. Set `ALLOWED_ORIGIN=https://your-site` in the server's environment.

## 8. Still to confirm with the client

| Item | Where |
|---|---|
| Which WhatsApp number receives bookings (currently Sankar 97896 88048) | `SITE.whatsapp` |
| Exact address and Google Maps pin (currently "Beachfront, near Pondicherry" and a Maps *search* link) | `SITE.addressLine`, `SITE.mapsUrl` |
| E-mail address | `SITE.email` |
| Real logo (the wave mark in `components/Logo.jsx` is a placeholder) | `components/Logo.jsx` |
| Whether WiFi and parking are available | `AMENITIES`, `FACILITIES` |
| Rooms, capacity and rates | `ROOMS` |
| Permission to show people in photos (two photos with visible people and a car number plate were left out on purpose) | `GALLERY` |

## Accessibility and performance notes
Skip link, keyboard lightbox (Esc / arrows), labelled form fields with error messages, `prefers-reduced-motion` respected,
lazy-loaded responsive WebP images, video only loaded when allowed.
