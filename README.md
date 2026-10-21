# CJT Schedule

Offline crew schedule and pairing viewer for a phone. Calendar view, tap a day for the full pairing: report and release, legs, aircraft, crew, hotels, phone numbers, booking locators.

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
- Each flight leg has **Track on FlightAware** and **Track on Flightradar24** buttons using the CJT call sign (for example W8 377 becomes CJT377). They need a connection. The link formats are unverified, so report any that fail.
- Family view hides data on screen only. The JSON on that device still contains the full schedule.

## Install on iPhone or iPad

1. Open the app address in **Safari** (not another browser).
2. Tap **Share**, then **Add to Home Screen**.
3. Open it from the new icon.

Safari can clear the stored data of a website that has not been opened for about 7 days. An app added to the Home Screen is treated more kindly, but keep a backup file (Settings, Backup) as insurance. There is no Install button on iOS, that is normal.

## Screens and themes

- Phone: one column, pairing opens full screen (Android back button closes it).
- iPad portrait: wider column with larger day cells, pairing opens as a centered panel.
- iPad landscape and desktop (900 px wide or more): calendar on the left, pairing details on the right. Tapping a day updates the right side without leaving the month.
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
