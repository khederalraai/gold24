# 🖼️ Bilder Einfügen - Komplette Anleitung

## Schnellstart

1. **Bilder hinzufügen:**
   - Kopieren Sie Ihre Produktbilder in den Ordner `jewelry-website/images/`
   - Empfohlene Formate: JPG, PNG, WebP
   - Empfohlene Größe: 800x1000px für Produkte, 1200x800px für Banner

2. **Im HTML ersetzen:**
   - Suchen Sie nach `<div class="image-placeholder"`
   - Ersetzen Sie es mit `<img src="images/ihr-bild.jpg" alt="Beschreibung">`

## Bildliste - Was Sie brauchen:

### Produkt-Galerie (6 Bilder)
```
images/
├── ring_1.jpg          → Verlobungsring Klassik
├── kette_1.jpg         → Diamant Collier
├── armband_1.jpg       → Tennis Armband
├── ohrringe_1.jpg      → Saphir Ohrstecker
├── ring_2.jpg          → Ewigkeitsring
└── kette_2.jpg         → Perlenkette Deluxe
```

### Featured Collection (3 Bilder)
```
images/
├── featured_1.jpg      → Diamant Solitär
├── featured_2.jpg      → Perlen Collier
└── featured_3.jpg      → Smaragd Armreif
```

### Andere Bereiche
```
images/
└── handwerkskunst.jpg  → About Section Bild
```

## Bereits eingefügte Bilder:

✅ **img_1.jpg** → Verlobungsring Klassik (Zeile 110)
✅ **handwerkskunst.jpg** → About Section (Zeile 360)

## Detaillierte Anleitungen:

### 1. Produkt-Galerie Bild ändern

**Finden Sie diese Zeile (z.B. Zeile 148):**
```html
<div class="image-placeholder" style="background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);">
    <span class="placeholder-text">Kette 1</span>
</div>
```

**Ersetzen durch:**
```html
<img src="images/kette_1.jpg" alt="Diamant Collier">
```

### 2. Featured Items Bild ändern

**Finden Sie (z.B. Zeile 70):**
```html
<div class="image-placeholder" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
    <span class="placeholder-text">Diamant Ring</span>
</div>
```

**Ersetzen durch:**
```html
<img src="images/featured_1.jpg" alt="Diamant Solitär Ring">
```

## Alle Stellen zum Ersetzen:

### Produktgalerie (`id="produkte"`)
| Zeile | Aktuell | Ersetzen mit |
|-------|---------|--------------|
| 110 | ✅ DONE | `img_1.jpg` |
| 148 | Placeholder | `images/kette_1.jpg` |
| 185 | Placeholder | `images/armband_1.jpg` |
| 222 | Placeholder | `images/ohrringe_1.jpg` |
| 259 | Placeholder | `images/ring_2.jpg` |
| 296 | Placeholder | `images/kette_2.jpg` |

### Featured Collection (`id="kollektionen"`)
| Zeile | Aktuell | Ersetzen mit |
|-------|---------|--------------|
| ~70 | Placeholder | `images/featured_1.jpg` |
| ~79 | Placeholder | `images/featured_2.jpg` |
| ~88 | Placeholder | `images/featured_3.jpg` |

### About Section
| Zeile | Aktuell | Ersetzen mit |
|-------|---------|--------------|
| 360 | ✅ DONE | `handwerkskunst.jpg` |

## Bildoptimierung - Tipps:

### Optimale Bildgrößen:
- **Produktbilder:** 800 x 1000 px (4:5 Ratio)
- **Featured Items:** 1200 x 1200 px (Quadratisch) oder 1200 x 1400 px
- **About Bild:** 1200 x 800 px (3:2 Ratio)
- **Hero Background:** 1920 x 1080 px (Optional)

### Dateigröße:
- Ziel: < 200 KB pro Bild
- Komprimierung: https://tinypng.com/ oder https://squoosh.app/

### Formate:
- **JPG:** Für Fotos (beste Wahl für Schmuck)
- **PNG:** Für Logos oder transparente Hintergründe
- **WebP:** Moderne Browser (kleinere Dateien)

## Beispiel - Komplette Ersetzung:

```html
<!-- ALT: -->
<div class="gallery-image">
    <div class="image-placeholder" style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);">
        <span class="placeholder-text">Ring 1</span>
    </div>
</div>

<!-- NEU: -->
<div class="gallery-image">
    <img src="images/ring_1.jpg" alt="Verlobungsring Klassik - 18K Weißgold mit 1.5 Karat Diamant">
</div>
```

## Alt-Text Best Practices:

Gute Alt-Texte für SEO und Barrierefreiheit:

```html
<!-- ✅ GUT -->
<img src="images/ring_1.jpg" alt="Verlobungsring aus 18K Weißgold mit 1.5 Karat Diamant">

<!-- ❌ SCHLECHT -->
<img src="images/ring_1.jpg" alt="Ring">
<img src="images/ring_1.jpg" alt="img_1">
```

## Automatisches Ersetzen (Suchen & Ersetzen):

### Mit VS Code:
1. Drücken Sie `Ctrl + H` (Suchen & Ersetzen)
2. Aktivieren Sie Regex (.*-Symbol)

**Beispiel für Ring 2:**
- **Suchen:** `<div class="image-placeholder"[^>]*>\s*<span class="placeholder-text">Ring 2</span>\s*</div>`
- **Ersetzen:** `<img src="images/ring_2.jpg" alt="Ewigkeitsring">`

## Bilder testen:

Wenn Sie noch keine Bilder haben, können Sie Platzhalter verwenden:

```html
<!-- Temporärer Platzhalter von unsplash.com -->
<img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800" alt="Temporäres Produktbild">
```

## Häufige Fehler:

### ❌ Fehler 1: Falscher Pfad
```html
<img src="img_1.jpg" alt="Ring">  <!-- Fehlt "images/" -->
```

### ✅ Richtig:
```html
<img src="images/img_1.jpg" alt="Ring">
```

### ❌ Fehler 2: Kein Alt-Text
```html
<img src="images/ring.jpg">  <!-- Fehlt alt="" -->
```

### ✅ Richtig:
```html
<img src="images/ring.jpg" alt="Verlobungsring Klassik">
```

## Checkliste:

- [ ] Alle Bilder in `/images/` Ordner kopiert
- [ ] Produktgalerie: 6 Bilder (✅ 1/6 fertig)
- [ ] Featured Collection: 3 Bilder
- [ ] About Section: 1 Bild (✅ Fertig)
- [ ] Alt-Texte hinzugefügt
- [ ] Bilder optimiert (< 200 KB)
- [ ] Website getestet im Browser

## Nächste Schritte:

1. Fügen Sie Ihre Bilder in `jewelry-website/images/` ein
2. Öffnen Sie `index.html`
3. Suchen Sie nach "image-placeholder"
4. Ersetzen Sie wie oben beschrieben
5. Speichern und im Browser testen

---

**Fragen?** Sagen Sie mir einfach welche Bilder Sie haben, und ich passe die HTML-Datei automatisch an!