# 360° Bilder Setup Anleitung

## 📁 Ordnerstruktur erstellen

Erstellen Sie diese Ordnerstruktur in Ihrem Projekt:

```
jewelry-website/
└── images/
    └── 360/
        ├── ring/
        │   ├── frame_000.jpg
        │   ├── frame_001.jpg
        │   ├── frame_002.jpg
        │   └── ... (bis frame_035.jpg)
        ├── necklace/
        │   ├── frame_000.jpg
        │   ├── frame_001.jpg
        │   └── ... (bis frame_035.jpg)
        └── bracelet/
            ├── frame_000.jpg
            ├── frame_001.jpg
            └── ... (bis frame_035.jpg)
```

## 🎯 Aktueller Status

**Der Viewer funktioniert JETZT schon!**

Momentan wird automatisch `images/img_1.jpg` verwendet, wenn keine 360° Bilder gefunden werden.

### Was passiert:

1. **Versuch 1**: Sucht nach `images/360/ring/frame_000.jpg` bis `frame_035.jpg`
2. **Versuch 2**: Wenn nicht gefunden → verwendet `images/img_1.jpg`
3. **Versuch 3**: Wenn auch das fehlt → generiert Placeholder

## ✅ Testen Sie JETZT

1. Öffnen Sie `index.html` im Browser
2. Scrollen Sie zu "Neue Kollektion"
3. Klicken Sie auf ein Featured Item
4. Der 360° Viewer öffnet sich mit `img_1.jpg`

## 📸 Echte 360° Bilder hinzufügen

### Schritt 1: Ordner erstellen

```bash
mkdir images\360
mkdir images\360\ring
mkdir images\360\necklace
mkdir images\360\bracelet
```

### Schritt 2: Bilder umbenennen

Wenn Sie bereits 36 Produktfotos haben:

**Windows (PowerShell):**
```powershell
# Alle Bilder in einem Ordner umbenennen
$i = 0
Get-ChildItem *.jpg | ForEach-Object {
    Rename-Item $_ -NewName ("frame_{0:D3}.jpg" -f $i)
    $i++
}
```

**Manuell:**
```
Ihre Bilder:    →    Umbenannt zu:
ring_1.jpg      →    frame_000.jpg
ring_2.jpg      →    frame_001.jpg
ring_3.jpg      →    frame_002.jpg
...
ring_36.jpg     →    frame_035.jpg
```

### Schritt 3: Bilder in Ordner kopieren

```
images/360/ring/frame_000.jpg        ← Bild von vorne (0°)
images/360/ring/frame_009.jpg        ← Bild von rechts (90°)
images/360/ring/frame_018.jpg        ← Bild von hinten (180°)
images/360/ring/frame_027.jpg        ← Bild von links (270°)
images/360/ring/frame_035.jpg        ← Fast wieder vorne (350°)
```

## 🔢 Anzahl der Frames ändern

Wenn Sie weniger als 36 Bilder haben (z.B. nur 12):

### In `js/360-viewer.js` Zeile 13 ändern:

```javascript
// Von:
this.totalFrames = 36;

// Zu (für 12 Bilder):
this.totalFrames = 12;
```

Dann benötigen Sie nur:
```
frame_000.jpg bis frame_011.jpg (12 Bilder)
```

## 📌 Verschiedene Bilder für verschiedene Produkte

Momentan verwendet der Viewer:

| Produkt          | Bild-Pfad                      |
|------------------|--------------------------------|
| Diamant Solitär  | `images/360/ring/frame_XXX.jpg` |
| Perlen Collier   | `images/360/necklace/frame_XXX.jpg` |
| Smaragd Armreif  | `images/360/bracelet/frame_XXX.jpg` |

### Fallback in `js/360-viewer.js` Zeile 237-241 anpassen:

```javascript
const imagePaths = {
    ring: 'images/img_1.jpg',           // Fallback für Ring
    necklace: 'images/necklace.jpg',    // Fallback für Kette
    bracelet: 'images/bracelet.jpg'     // Fallback für Armband
};
```

## 🎨 Bild-Empfehlungen

### Format:
- **Dateityp**: JPG oder PNG
- **Größe**: 1000x1000px (optimal für Web)
- **Hintergrund**: Transparent (PNG) oder Weiß (JPG)
- **Dateiname**: `frame_000.jpg` bis `frame_035.jpg`

### Qualität:
- **Komprimierung**: 80-90% (Balance zwischen Qualität und Größe)
- **Konsistente Beleuchtung**: Alle Bilder gleich beleuchtet
- **Zentriert**: Produkt in der Mitte

## 🔧 Bildoptimierung (Optional)

### Online Tools:
- [TinyJPG](https://tinyjpg.com/) - Komprimiert alle Bilder auf einmal
- [Squoosh](https://squoosh.app/) - Google's Bildoptimierer

### Batch-Optimierung:
```bash
# Mit ImageMagick (wenn installiert)
magick mogrify -resize 1000x1000 -quality 85 *.jpg
```

## 🐛 Fehlersuche

### Problem: "Bilder laden nicht"

**Lösung 1**: Prüfen Sie den Pfad
```
✅ Richtig: images/360/ring/frame_000.jpg
❌ Falsch:  image/360/ring/frame_000.jpg
❌ Falsch:  images/360/rings/frame_000.jpg
```

**Lösung 2**: Öffnen Sie die Browser-Konsole (F12)
- Suchen Sie nach Fehlermeldungen
- Prüfen Sie ob Bilder geladen werden

### Problem: "Nur Placeholder sichtbar"

**Ursache**: Keine echten Bilder gefunden

**Lösung**:
1. Prüfen Sie ob `images/360/` Ordner existiert
2. Prüfen Sie Dateinamen: `frame_000.jpg` (nicht `frame_0.jpg`)
3. Falls gewollt, ist Placeholder auch OK für Demo

## 📝 Beispiel-Setup

Für einen schnellen Test mit nur 3 Bildern:

```javascript
// In js/360-viewer.js Zeile 13:
this.totalFrames = 3;
```

Dann erstellen Sie:
```
images/360/ring/frame_000.jpg   (Vorderansicht)
images/360/ring/frame_001.jpg   (Seitenansicht)
images/360/ring/frame_002.jpg   (Rückansicht)
```

Der Viewer dreht dann zwischen diesen 3 Bildern!

## 🎬 Fertig!

Sobald die Bilder im richtigen Ordner sind, lädt der Viewer sie automatisch.

**Keine Code-Änderungen nötig!**

---

## 💡 Tipps

1. **Weniger Frames für schnelleres Laden**: 12-18 Frames sind oft ausreichend
2. **WebP Format**: Noch kleinere Dateien (Browser-Support prüfen)
3. **Lazy Loading**: Bilder werden nur geladen wenn Viewer geöffnet wird
4. **Mobile**: Viewer funktioniert auch auf Touch-Geräten

## 🆘 Hilfe

Bei Problemen:
1. Öffnen Sie Browser-Konsole (F12)
2. Schauen Sie nach Fehlermeldungen
3. Prüfen Sie ob Bilder korrekt benannt sind
4. Testen Sie zuerst mit 1-3 Bildern