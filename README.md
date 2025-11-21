# ÉLÉGANCE - Luxus Schmuck Website

Eine elegante, minimalistische Website für Schmuckprodukte mit dunklem Design-Theme, inspiriert von hochwertigem Creative Studio Design.

## Features

### Design & Ästhetik
- 🎨 Dunkles, minimalistisches Design mit goldenen Akzenten
- ✨ Smooth Scrolling und flüssige Animationen
- 🎭 Parallax-Effekte im Hero-Bereich
- 💫 Hover-Animationen für interaktive Elemente
- 📱 Vollständig responsive für alle Geräte
- 🖱️ Custom Cursor-Effekt (Desktop)

### Technische Features
- 🚀 Keine Build-Tools erforderlich - Pure HTML, CSS, JavaScript
- ⚡ Optimierte Performance mit Intersection Observer
- 🎯 Lazy Loading für Bilder
- 📐 CSS Grid & Flexbox Layout
- 🎬 Framer-Motion-ähnliche Animationen in CSS
- 🔍 SEO-freundliche semantische HTML-Struktur

### Sektionen
1. **Navigation** - Fixed Header mit Smooth-Scroll-Links
2. **Hero** - Eindrucksvoller Vollbild-Bereich mit animiertem Text
3. **Featured Collection** - Neue Kollektion Showcase
4. **Product Gallery** - Grid-basierte Produktdarstellung
5. **About** - Firmengeschichte und Werte
6. **Contact** - Kontaktformular und Informationen
7. **Footer** - Navigation und rechtliche Links

## Installation & Verwendung

### Lokale Entwicklung

1. **Projekt öffnen:**
   ```bash
   cd jewelry-website
   ```

2. **Mit lokalem Server starten:**

   **Option 1 - Python:**
   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Option 2 - Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```

   **Option 3 - PHP:**
   ```bash
   php -S localhost:8000
   ```

   **Option 4 - VS Code:**
   - Installieren Sie die "Live Server" Extension
   - Rechtsklick auf `index.html` → "Open with Live Server"

3. **Im Browser öffnen:**
   ```
   http://localhost:8000
   ```

## Anpassung

### Farben ändern

Bearbeiten Sie die CSS-Variablen in `css/style.css`:

```css
:root {
    --primary-bg: #000000;        /* Haupthintergrund */
    --secondary-bg: #0a0a0a;      /* Sekundärer Hintergrund */
    --accent-bg: #1a1a1a;         /* Akzent-Hintergrund */
    --primary-text: #ffffff;       /* Haupttext */
    --secondary-text: #a0a0a0;    /* Sekundärtext */
    --accent-color: #d4af37;      /* Gold-Akzent */
    --accent-hover: #f0c952;      /* Gold-Hover */
}
```

### Eigene Bilder hinzufügen

1. Fügen Sie Ihre Bilder in den Ordner `images/` ein
2. Ersetzen Sie die `.image-placeholder` divs mit `<img>` Tags:

```html
<!-- Vorher: -->
<div class="image-placeholder" style="background: ...">
    <span class="placeholder-text">Produkt</span>
</div>

<!-- Nachher: -->
<img src="images/ihr-produkt.jpg" alt="Produktbeschreibung">
```

### Texte anpassen

Alle Texte können direkt in der `index.html` bearbeitet werden:
- Firmenname: Suchen Sie nach "ÉLÉGANCE"
- Produktnamen: In den `.gallery-item` und `.featured-item` Elementen
- Kontaktinformationen: In der `.contact-info` Sektion

### Navigation anpassen

Bearbeiten Sie die Navigation in `index.html`:

```html
<ul class="nav-menu" id="navMenu">
    <li><a href="#ihre-sektion" class="nav-link">Ihr Link</a></li>
    <!-- Weitere Links... -->
</ul>
```

### Produkte hinzufügen

Fügen Sie neue Produkte im `.gallery-grid` Bereich hinzu:

```html
<div class="gallery-item" data-category="ihre-kategorie">
    <div class="gallery-image">
        <img src="images/ihr-produkt.jpg" alt="Produktname">
    </div>
    <div class="gallery-info">
        <h4>Produktname</h4>
        <p class="price">€ 1.234</p>
    </div>
</div>
```

## JavaScript Features

### Smooth Scrolling
Automatisches Smooth-Scrolling für alle Anchor-Links (`#`)

### Scroll Animations
Elemente werden beim Scrollen animiert mittels Intersection Observer

### Mobile Menu
Vollständig funktionierendes mobiles Burger-Menü

### Form Handling
Das Kontaktformular hat eine Demo-Implementierung. Für echte Funktion:

```javascript
// In js/script.js, ersetzen Sie:
setTimeout(() => {
    // Demo-Code
}, 1500);

// Mit:
fetch('/api/contact', {
    method: 'POST',
    body: formData
})
.then(response => response.json())
.then(data => {
    // Handle success
});
```

## Deployment

### GitHub Pages

1. Repository auf GitHub erstellen
2. Dateien hochladen
3. Settings → Pages → Source: main branch
4. Ihre Website ist live unter: `https://ihr-username.github.io/repo-name/`

### Netlify

1. Ordner auf Netlify ziehen und ablegen
2. Automatisches Deployment
3. Fertig!

### Vercel

```bash
npm i -g vercel
vercel
```

### Traditional Hosting

1. Alle Dateien per FTP auf Ihren Webserver hochladen
2. Fertig! Keine weitere Konfiguration nötig.

## Browser-Kompatibilität

- ✅ Chrome (neueste Version)
- ✅ Firefox (neueste Version)
- ✅ Safari (neueste Version)
- ✅ Edge (neueste Version)
- ⚠️ IE11 (eingeschränkte Unterstützung, einige Animationen funktionieren nicht)

## Performance-Optimierungen

- Lazy Loading für Bilder
- Debounced Scroll Events
- CSS-Animationen statt JavaScript (Hardware-beschleunigt)
- Intersection Observer statt Scroll-Listener
- Minimale externe Dependencies

## Dateistruktur

```
jewelry-website/
├── index.html          # Haupt-HTML-Datei
├── css/
│   └── style.css      # Alle Styles
├── js/
│   └── script.js      # Alle Interaktionen
├── images/            # Ihre Produktbilder
├── assets/            # Zusätzliche Assets
└── README.md          # Diese Datei
```

## Weitere Verbesserungen

### E-Commerce-Funktionalität
- Warenkorb-System implementieren
- Zahlungsintegration (Stripe, PayPal)
- Produktdetail-Seiten
- Filterung nach Kategorien

### CMS-Integration
- WordPress
- Shopify
- Contentful
- Strapi

### Backend
- Kontaktformular mit PHP/Node.js
- Newsletter-Anmeldung
- Produktverwaltung
- Bestellsystem

## Support & Anpassungen

Für weitere Anpassungen oder Fragen:
- Bearbeiten Sie die CSS-Dateien für visuelle Änderungen
- Bearbeiten Sie JavaScript für Funktionalität
- HTML für Struktur und Inhalte

## Lizenz

Frei verwendbar für persönliche und kommerzielle Projekte.

---

**Viel Erfolg mit Ihrer Schmuck-Website! ✨**