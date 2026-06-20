# 🍽️ EssTracker PWA

Eine Progressive Web App zum Tracken von Mahlzeiten, Wohlbefinden und Gewicht – optimiert für iPhone.

## 📱 Features

- **Dashboard** – Übersicht mit heutigen Mahlzeiten, Gewicht & Wochenstatistiken
- **Mahlzeit erfassen** – Hunger, Sättigung, Stimmung, Genuss, Gesundheit, Portionsgefühl
- **Mahlzeiten-Liste** – Nach Tagen gruppiert, auf-/zuklappbar
- **Gewicht** – Eintragen & Verlauf anzeigen
- **Analyse** – Übersicht, Muster, Zeitvergleiche
- **Daten Export/Import** – JSON-Backup auf deinem Gerät
- **Vollständig offline** – alle Daten bleiben auf deinem iPhone (localStorage)

## 🚀 Auf GitHub Pages hosten (Schritt für Schritt)

### 1. Repository erstellen
1. Gehe zu [github.com](https://github.com) → **New repository**
2. Name: `esstracker` (oder beliebig)
3. Sichtbarkeit: **Public** (für GitHub Pages kostenlos nötig)
4. ✅ "Add a README file" – NICHT anklicken
5. → **Create repository**

### 2. Dateien hochladen
1. Klicke im Repository auf **"Add file" → "Upload files"**
2. Lade diese Dateien hoch:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`
3. → **Commit changes**

### 3. GitHub Pages aktivieren
1. Repository → **Settings** → **Pages** (linke Seitenleiste)
2. Source: **"Deploy from a branch"**
3. Branch: **main** / **/ (root)**
4. → **Save**
5. Nach 1–2 Minuten ist die App unter `https://DEIN-USERNAME.github.io/esstracker/` erreichbar

### 4. Zum iPhone Homebildschirm hinzufügen
1. Öffne Safari auf dem iPhone (kein Chrome!)
2. Gehe zur URL: `https://DEIN-USERNAME.github.io/esstracker/`
3. Tippe auf das **Teilen-Symbol** (Quadrat mit Pfeil nach oben)
4. Wähle **„Zum Home-Bildschirm"**
5. Name bestätigen → **Hinzufügen**
6. Die App startet jetzt wie eine native App, ohne Browser-Leiste! 🎉

## ℹ️ Hinweise

- **Alle Daten** werden lokal im Browser gespeichert (localStorage) – kein Server, keine Cloud
- **Export** unter „Mehr" → Exportieren, um ein Backup zu erstellen
- Die App funktioniert **vollständig offline** dank Service Worker
- Icons: Eigene Icons (192×192 und 512×512 PNG) für bessere Homescreen-Darstellung empfohlen

## 🎨 Icons erstellen (optional)

Falls du eigene Icons möchtest:
1. Erstelle ein quadratisches Bild (z.B. mit Canva)
2. Exportiere als PNG in 192×192 und 512×512 Pixel
3. Benenne sie `icon-192.png` und `icon-512.png`
4. Lade sie ins Repository hoch
