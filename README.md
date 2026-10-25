# Ashley Aloft (personal flight schedule and logbook)

Offline crew schedule and pairing viewer for a phone. Calendar view, tap a day for the full pairing: report and release, legs, aircraft, crew, hotels, phone numbers, booking locators.

**Leg tile layout (1.9.2).** In Family view a flight tile shows the departure code on the left, an arrow in the centre and the arrival code on the right, with each airport's name directly under its own code (long names wrap inside their column). An airport without a name shows the code only. Simulator and event tiles are unchanged. Since 1.13.0 Full view uses the same tile as Family view, with place names under each code when known. Since 1.12.1 the centre arrow is a drawn route line with a dot and arrowhead, and the arrival time block is right aligned under the arrival code.

**Full flight log and new aircraft (1.10.0).** The flight log file can now carry `"replace": true`. When it does, importing it replaces the whole stored log instead of merging, so a rebuilt log fully overwrites an older one (legs that share a departure time are all kept). New fleet filters: BE1900 (green) and Light aircraft (purple: Cessna 150, 152, 172, Piper PA34, PA28). Aircraft types in the file are `757-200`, `767-200`, `767-300`, `BE1900`, `C150`, `C152`, `C172`, `PA34`, `PA28`. Flights that start and end at the same airport count in flights and hours but draw no arc.

**Logbook history on the calendar (1.11.0).** Past flights from the logbook are rebuilt as pairings, one yearly file per year (`cjt-schedule-history-YYYY.json`, normal schedule format, private repo only). They are grouped from the logbook times: a new duty starts after a rest of 10 hours or more, and a pairing ends when the aircraft returns to where it started and then waits 6 hours or more (or 4 days passes, or a flight does not continue from the previous landing). Each pairing carries `"historic": true` and each leg `"log": true`. The logbook has no report or release times, so those boxes and the duty-time chip are hidden and each duty runs from first departure to last landing. Crew names appear on the pairing and duty (Family view hides them). Roles are inferred: your own role from PIC or SIC time, the other pilot as the opposite role, and third or fourth pilots as relief (RP). Simulator sessions are one pairing each. Tracking links are not shown for logbook flights. Tap the month name at the top of the calendar to jump to any month and year.

**Name (1.11.0).** The app is now called Ashley Aloft. On Android the installed app name and the splash caption only change after the app is removed and installed again from the browser.

**Pilots tab (1.12.0).** A third tab lists everyone you have flown with, A to Z by surname, with a search box that ignores word order, accents and punctuation. Tap a name for flights together, flight time, first and last flown, days together, simulator sessions, their role on your flights, the airports you shared most, and every pairing newest first. Tap a pairing to open it; Back returns to the pilot. Names come from the crew on each logbook leg (`crew` on the leg) and from VMO duty crew. The tab is hidden in Family view. Simulator partners can be stored as "Last First", so the same person is matched by sorted words and the most common spelling is shown.

## Privacy

This repository holds the app only. It contains no schedule data. Your pairings live in your phone's browser storage (IndexedDB) and are never uploaded.

GitHub Pages sites are public, so never commit schedule files, crew names, hotel numbers or screenshots here. The `.gitignore` blocks `*.json` as a safety net.

## Files

- `index.html` is the whole app (single file, no external libraries or fonts)
- `sw.js` is the service worker that keeps the app available offline
- `manifest.webmanifest` and `icons/` make it installable on Android

## Deploy on GitHub Pages

1. Create a new repository (suggested name: `cjt-schedule`).
2. Upload everything in this folder to the repository root (keep the `icons` folder).
3. Settings > Pages > Build and deployment > Source: Deploy from a branch, branch `main`, folder `/ (root)`, then Save.
4. After a minute the site is live at `https://<your-username>.github.io/<repo-name>/`.

## Install on Android

1. Open the site URL in Chrome while online and leave it for a few seconds.
2. Chrome menu > Install app (or Add to Home screen).
3. Open it from the home screen. Settings (gear) shows "Offline use: Ready" once it is cached.
4. Test it once with airplane mode on before you rely on it.

## Sync from a private GitHub repository

The app repo is public and holds no schedule data. Your monthly JSON files live in a second, **private** repository, and the app pulls them with a read-only token.

**One-time setup**
1. Create a private repository named `cjt-schedule-data` (same owner as this repo).
2. Upload each month's JSON file to its top level, for example `2026-10.json`. Any file ending in `.json` is read. Other files are ignored.
3. On GitHub create a **fine-grained personal access token**: profile photo, Settings, Developer settings, Personal access tokens, Fine-grained tokens, Generate new token.
   - Resource owner: the account or organization that owns `cjt-schedule-data`. If it is an organization, the organization may need to allow fine-grained tokens or approve this one.
   - Repository access: **Only select repositories**, then `cjt-schedule-data`.
   - Permissions: Repository permissions, **Contents: Read-only**. Nothing else.
   - Expiration: the longest offered. Set a reminder to make a new one before it runs out.
   - Menu names can differ slightly from this list, so follow what GitHub shows.
4. Copy the token (GitHub shows it once). In the app open Settings, Sync from GitHub, check the repository name, paste the token, tap **Save token and sync**.
5. Repeat step 4 on each device (phone, iPad, family devices). Make one token per person so any one can be revoked on its own.

**Every month**: add the new JSON file to the private repo. The app syncs when it opens, and **Sync now** in Settings does it on demand. Changed pairings are merged and flagged as revised, the same as a manual import.

**Good to know**
- The token is kept only on the device and is never written into backup files.
- Anyone holding a token can read everything in the data repository.
- If a device is lost, delete that token on GitHub. The app then shows a message that GitHub rejected it.
- Without a connection the app simply uses the schedule already stored on the device.
- Manual import still works as a fallback.

## Family view

A simpler read-only view for family devices. It shows report and release times, flight numbers, routes, aircraft registration and type, positioning legs, layover city and hotel name, office days and "Simulator training". It hides crew names, pairing IDs, locators, hotel phones, tags, SIM device numbers, and the import, backup and delete tools.

- Switch a device: Settings, View, Family. On Android Chrome you can also open the app with `?view=family` added to the address.
- On iPhone or iPad, a Home Screen app has its own storage, so set the view inside the installed app (Settings, View, Family).
- Each flight leg has **Track on FlightAware** and **Track on Flightradar24** buttons using the CJT call sign (for example W8 377 becomes CJT377). They need a connection. From 1.15.1 the Flightradar24 button reads "(live flights only)", since it only shows a flight while it is in the air. FlightAware shows the most recent flight for that number, which is fine for family. The link formats are unverified, so report any that fail.
- Family view hides data on screen only. The JSON on that device still contains the full schedule.

### Compact pairings (1.16.0)

Pairings were made shorter so a trip does not run for several screens.

- A trip summary line at the top of each pairing, for example "6-day trip · Home Fri Nov 6". The "Home" part is green when the trip ends back at the home base.
- A green "Home" label on the final arrival that returns to base.
- Family view drops the UTC (Zulu) time line and the duty Report and Release boxes, and shows each flight on one tighter row: code, time and city on the left, arrow, code, time and city on the right. An arrival on a later day shows the date next to the arrival time.
- Full view keeps the Zulu times and the Report and Release boxes, but no longer repeats the date on a time when it is the same day as the duty.
- A small "Updated N hours ago" note in the header shows when the app last synced.

## Active-part highlight (NOW)

When you open a pairing that is in progress, the app scrolls to the active part (a flight, ground time, or a layover) and outlines it. From 1.16.0 the outline is amber (not blue, so it stands out from the rest of the app) and it flashes a few times when the pairing opens to catch the eye. The flash respects the device "reduce motion" setting.

## Calendar icons

Each calendar day shows small icons in the order things happen that day: a climbing yellow aircraft for flying, a level pink aircraft for positioning (deadhead), a pink car for ground transport, an orange monitor for office days, a purple motion simulator for sim days, and a blue moon for layover days with no flying or office work. Up to three icons show on iPad, two on a phone. On a phone, a plain office day shows one large centred icon instead of the OFFICE label.

The icons are the owner's own artwork (`icons/duty-*.png`), each tinted to match its category colour. They are cached for offline use like the rest of the app.

## Install on iPhone or iPad

1. Open the app address in **Safari** (not another browser).
2. Tap **Share**, then **Add to Home Screen**.
3. Open it from the new icon.

Safari can clear the stored data of a website that has not been opened for about 7 days. An app added to the Home Screen is treated more kindly, but keep a backup file (Settings, Backup) as insurance. There is no Install button on iOS, that is normal.

**App icon (1.14.1).** The app icon and the splash screen are now the Freight Dog artwork. A phone or iPad keeps showing the old icon for an app that is already installed, because the operating system saves the icon when the app is installed. To see the new icon, remove the app from the Home Screen and add it again. The browser tab icon updates on its own.

## Screens and themes

- Phone: one column, pairing opens full screen (Android back button closes it).
- iPad portrait: wider column with larger day cells, pairing opens as a centered panel.
- iPad landscape and desktop (900 px wide or more): calendar on the left, pairing details on the right. Tapping a day updates the right side without leaving the month.
- Fits any iPad screen (1.13.1): on tablets the calendar, the legend and the tab bar always share the screen, in portrait and landscape, on small and large iPads alike. Week rows shrink to fit (5 or 6 weeks), and the day icons scale down with them, so nothing is hidden behind the tab bar. The list of pairings for the month sits below and scrolls.
- Desktop and iPad landscape layout (1.14.0): at 900 px wide or more the Schedule, Globe and Pilots tabs sit in a slim vertical rail on the left edge instead of a bar along the bottom, so the calendar gets the full height. The calendar takes most of the width (about two thirds on a large monitor) and the pairing details stay on the right. Day cells show more when they have the room: the report and release times for the day, the route flown (airport codes, or place names in Family view) and the hours on office days. On a narrower laptop screen the cell shows just the times. Phones and iPad portrait keep the bottom tab bar and the simpler cells.
- No Remove pairing button (1.14.2): pairings can no longer be deleted from the pairing screen, so nobody can remove one by mistake, including family. A changed pairing is replaced when the corrected month file is synced (same pairing id and overlapping dates). Removals now come through the remove list (see below).
- Remove list (1.15.0): a schedule file can carry a top-level "removed" object, for example `"removed": {"pairings": ["6722@2026-10-21T05:59:00Z"], "days": ["2026-11-09"]}`. When the file is synced or imported, those pairings (and their photos) and days are deleted on every device. Each device remembers the removals, so an older file cannot bring them back. Taking an entry out of the list does not restore it. To clear the remembered removals, import the month file with Replace all in Settings, or use Delete all data. Sync and import messages show "N removed". A malformed "removed" object is rejected with a clear message.
- Keyboard shortcuts (1.14.0, desktop): Left and Right arrows (or Page Up and Page Down) change the month, T jumps to today, 1, 2 and 3 switch between Schedule, Globe and Pilots, and Esc closes the open details panel or dialog. The shortcuts are ignored while you are typing in a box.
- Theme: Auto (follows the device, default), Day or Night. Use the sun/moon button at the top or Settings.

## Monthly routine

1. Send the month view and each pairing screenshot to Claude. Scroll each pairing top to bottom with a little overlap so no layover is missed.
2. Claude returns a JSON file. Download it to your phone.
3. In the app: Settings > Choose JSON file. Merge adds new pairings and flags any that changed since the last import.
4. Optional: open a pairing and use Add screenshots to keep the original VMO images with it.
5. Settings > Export backup file now and then, in case the phone is lost or the browser data is cleared.

## Updating the app

Replace the files in the repository. Phones pick up the new version the next time the app is opened with a connection, and it applies on the following launch. Change `VERSION` in `sw.js` whenever you change any app file, or phones keep the old copy.

## Data file format (version 1)

`format: "cjt-schedule"`, `version: 1`, `pairings[]` (each with `duties[]`, each with `legs[]` and an optional `rest`), and `days[]` for office and other non-flying days (optional `start`/`end` as HH:MM base time; office days default to 09:00 to 17:00). Sim events may carry `briefingMin` and `debriefMin`. Times are stored as UTC with the IANA time zone and abbreviation VMO displayed.

Phone numbers (`hotel.phone`, `transport.phone`) must include the country code, for example `+1 859-371-4400` or `+44 1509 670575`, so tap-to-call works from anywhere. As a safety net the app adds +1 to a bare 10 digit North American number.

## Splash screen and refresh button (1.6.0)
- On a cold launch the Freight Dog artwork zooms in for about two seconds and settles at about 80 percent of the screen height, leaving a clear black margin (it waits until the image is ready, so slow phones do not skip ahead), then the schedule appears. It plays once per launch, skips itself if the device has reduce motion turned on, and works offline (`icons/splash-v2.webp` is cached).
- The refresh button sits at the centre of the top bar. When online it clears the app's cached files, reloads the newest app from the internet, and also pulls the latest schedule from the data repo if sync is set up. Offline, it changes nothing and says so. Your saved schedule and settings are never touched.

## Globe and flight log (1.7.0)
- A bottom tab bar switches between Schedule and Globe on every device, including Family view.
- The Globe is a rotating 3D-style globe with great circle tracks that bow toward the nearer pole, coloured by fleet (yellow 757-200, pink 767-200, blue 767-300). Drag to turn, pinch to zoom, tap an airport for its flights and hours. On a phone, filters (year and fleet) sit behind the sliders button.
- Flight log data is NOT in this public app. Put a `cjt-logbook` JSON file in the private data repository. The app syncs it like the monthly schedule files, or you can import it by hand in Settings. Importing the same flights again adds nothing.

### cjt-logbook format
```
{ "format": "cjt-logbook", "version": 1,
  "airports": { "CYHM": ["Hamilton Intl", 43.1713, -79.9294, "CA", "Hamilton"] },
  "legs": [ ["2020-12-07T22:17", "CYHM", "CYQM", "767-300", 2.0] ] }
```
Each leg is [departure in UTC, from, to, aircraft type, block hours]. Every airport used must have coordinates in `airports` (from this file or an earlier one). No crew names or registrations are stored.

Day mode uses a separate set of day icons (`icons/duty-*-day.png`, transparent background so they sit cleanly on the light calendar). Night mode keeps the dark set. The switch follows the theme button, with no reload.

## Now marker (1.8.0)
When a pairing is in progress, the part happening right now (a leg, ground time, the layover, or on duty between legs) gets an outline and a NOW badge with the time left, for example "NOW · LAYOVER · EGNX · report in 22h 20m". Tapping the pairing row, the in-progress card, or today's calendar cell centres that part on screen. Tapping any other day still scrolls to that day. The badge refreshes every 30 seconds while the pairing is open.

## Place names in Family view (1.9.0)
Family view shows plain place names next to airport codes: city names in the route lines, "Cincinnati, Kentucky to East Midlands, England" under each leg, and "Layover in East Midlands, England (EGNX)". Full view is unchanged. Names come from an optional `"stations": { "KCVG": "Cincinnati, Kentucky" }` object in the monthly JSON. The app remembers every name it has seen, so a later month also names airports from earlier ones. Airports without a name keep showing the code. Format: city and province or state for Canada and the US, city and England, Scotland, Wales or Northern Ireland for the UK, city and country elsewhere.

After any app update, the first sync reads every data file again (the app forgets which file versions it has already seen), so a file saved by an older version is never skipped.
