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
