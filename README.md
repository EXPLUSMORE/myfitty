# myfitty

Trainingslog als installierbare Web-App (PWA) — Krafttraining, Laufen und Mobility
mit Schwerpunkt Schulter-Reha. Läuft komplett im Browser, ohne Server und ohne Konto.
Alle Daten bleiben auf dem Gerät.

**Live:** https://myfitty.explusmore.com

## Was drin ist

| Datei | Zweck |
|---|---|
| `index.html` | Die komplette App: Oberfläche, Logik, Daten, Piktogramme — eine Datei |
| `manifest.json` | Macht die App installierbar (Name, Icon, Vollbild) |
| `sw.js` | Service Worker: hält die App offline lauffähig, Version wird beim Deploy gestempelt |
| `.github/workflows/deploy.yml` | Baut und veröffentlicht bei jedem Push, setzt die Version automatisch |
| `icon-*.png` | App-Icons (192, 512, maskierbar) |
| `CNAME` | Eigene Domain für GitHub Pages |
| `.nojekyll` | Verhindert, dass GitHub die Dateien durch Jekyll schickt |
| `robots.txt` | Hält Suchmaschinen draußen |

## Einrichtung bei GitHub Pages

1. Repository anlegen (z. B. `myfitty`), diese Dateien hochladen.
2. **Settings → Pages → Source:** `Deploy from a branch`, Branch `main`, Ordner `/ (root)`.
3. **Settings → Pages → Custom domain:** `myfitty.explusmore.com` eintragen.
4. DNS beim Domain-Anbieter von `explusmore.com`:

   | Typ | Name | Wert |
   |---|---|---|
   | CNAME | `myfitty` | `explusmore.github.io` |

5. Nach ein paar Minuten in den Pages-Einstellungen **Enforce HTTPS** aktivieren.
   Das Zertifikat kommt automatisch von GitHub.

## Auf dem Handy installieren

Adresse in Chrome öffnen → Menü **⋮ → App installieren**.
Danach liegt sie als Icon auf dem Startbildschirm, startet im Vollbild und
funktioniert auch ohne Empfang.

## Neue Version veröffentlichen

**Nur committen und pushen. Sonst nichts.**

Der Workflow unter `.github/workflows/deploy.yml` läuft bei jedem Push auf `main`,
ersetzt den Platzhalter `__BUILD__` in `sw.js` und `index.html` durch
`Datum-Commit-Kürzel` und veröffentlicht das Ergebnis auf GitHub Pages.
Weil der Cache-Name den Versionsstempel enthält, wird der alte Cache automatisch
verworfen — kein Hochzählen von Hand.

Auf den Geräten erscheint dann ein Balken **„Neue Version verfügbar"** mit
Laden-Knopf. Die App prüft beim Start, stündlich und bei jedem Zurückholen aus
dem Hintergrund. Trainingsdaten bleiben dabei unangetastet.

Die laufende Version steht in der App unter **Mehr** ganz unten. Öffnet man die
Dateien ungestempelt (lokal, ohne Deploy), zeigt sie `lokal` an.

### Einmalige Umstellung in den Repo-Einstellungen

**Settings → Pages → Source: `GitHub Actions`** (nicht mehr „Deploy from a branch").
Custom Domain bleibt wie gehabt.

## Daten

Gespeichert wird im `localStorage` des Browsers, getrennt nach Profil.
Da die Daten an der Adresse hängen, überstehen sie Updates problemlos.
In der App unter **Mehr → Datensicherung**: Backup-Code, Datei-Export und
optional automatische Sicherung in eine Datei.

## Lizenz

Privates Projekt, keine Weiterverbreitung vorgesehen.
