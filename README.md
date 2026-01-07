# 🎌 Anime Characters Explorer

Applicazione web moderna per esplorare e scoprire i personaggi dei tre anime più popolari: **Dragon Ball**, **One Piece** e **Naruto**.

## 📋 Descrizione del Progetto

Anime Characters Explorer è una Single Page Application (SPA) sviluppata con Angular 13 che permette di:
- Visualizzare personaggi da tre diverse serie anime
- Filtrare e cercare personaggi per nome, serie e affiliazione
- Navigare tra pagine dedicate a ciascun anime
- Esplorare dettagli completi di ogni personaggio
- Interfaccia completamente responsive (desktop, tablet, mobile)

## 🚀 Tecnologie Utilizzate

- **Framework**: Angular 13.3
- **UI Components**: Angular Material 13
- **Styling**: SCSS con variabili CSS custom
- **HTTP Client**: RxJS per chiamate API asincrone
- **Routing**: Angular Router con lazy loading
- **API**: 
  - Dragon Ball API (https://dragonball-api.com)
  - Jikan API per One Piece e Naruto (https://jikan.moe)

## 📁 Struttura del Progetto

```
src/
├── app/
│   ├── components/
│   │   ├── header/              # Navbar con menu hamburger
│   │   ├── footer/              # Footer informativo
│   │   ├── character-list/      # Lista personaggi con tabella
│   │   ├── character-card/      # Card singolo personaggio
│   │   ├── character-detail/    # Dettaglio completo personaggio
│   │   └── search-filter/       # Filtri di ricerca
│   ├── models/
│   │   └── character.model.ts   # Modello dati personaggio
│   ├── services/
│   │   └── anime-api.service.ts # Servizio API centralized
│   ├── app-routing.module.ts    # Configurazione routes
│   └── app.module.ts            # Modulo principale
├── assets/
│   └── hero.jpg                 # Immagine banner hero
└── styles.scss                  # Stili globali e theme
```

## 🎨 Caratteristiche Principali

### 1. Design Responsive
- **Mobile First**: Layout ottimizzato per dispositivi mobili
- **Menu Hamburger**: Navigazione slide-in su tablet/mobile
- **Breakpoint**: 900px, 768px, 600px, 400px
- **Tabella Adattiva**: Si trasforma in card layout su mobile

### 2. Sistema di Routing
- `/` - Homepage con mix di personaggi
- `/dragon-ball` - Personaggi Dragon Ball
- `/one-piece` - Personaggi One Piece
- `/naruto` - Personaggi Naruto
- `/characters/:id` - Dettaglio personaggio

### 3. Filtri Intelligenti
- **Ricerca per nome**: Filtraggio real-time
- **Filtro serie**: Seleziona anime specifico
- **Filtro affiliazione**: Dinamico basato sulla serie selezionata
  - Homepage: tutte le affiliazioni
  - Pagina specifica: solo affiliazioni di quell'anime

### 4. Paginazione
- Items per pagina: 10, 20, 50, 100
- Default: 10 items
- Navigazione first/last page
- Responsive su mobile

### 5. Theme Personalizzato
- **Colori**:
  - Primary: #f8f9fa (light gray)
  - Secondary: #2c3e50 (dark blue-gray)
  - Accent: #ff6b35 (orange)
- **Variabili CSS**: Sistema di design tokens
- **Dark UI**: Navbar e footer scuri, contenuto chiaro

## 🔧 Installazione e Avvio

### Prerequisiti
- Node.js 14+ 
- npm 6+

### Setup

1. **Clona il repository**
   ```bash
   git clone <repository-url>
   cd anime-app
   ```

2. **Installa le dipendenze**
   ```bash
   npm install
   ```

3. **Avvia il server di sviluppo**
   ```bash
   npm start
   ```
   Naviga su `http://localhost:4200/`

4. **Build per produzione**
   ```bash
   npm run build
   ```
   I file compilati saranno in `dist/`

## 📱 Design Responsive

### Desktop (>900px)
- Navbar orizzontale con tutti i link visibili
- Tabella a 5 colonne
- Layout a griglia per dettagli

### Tablet (768px-900px)
- Menu hamburger
- Tabella compatta
- Footer a colonne

### Mobile (<768px)
- Menu slide-in da destra
- Tabella trasformata in card verticali
- Footer a colonna singola centrato
- Font size ridotti progressivamente

## 🎯 Funzionalità Implementate

✅ Chiamate API multiple con forkJoin
✅ Gestione stato con RxJS Observables
✅ Routing con parametri dinamici
✅ Filtri reattivi con FormBuilder
✅ Paginazione client-side con Material Paginator
✅ Lazy loading delle immagini
✅ Error handling e loading states
✅ Responsive design completo
✅ Accessibilità keyboard navigation
✅ SEO-friendly routing

## 🌐 API Integration

### Dragon Ball API
- Endpoint: `/api/characters?limit=100`
- Dati: ki, maxKi, race, gender, affiliation, transformations

### Jikan API (MyAnimeList)
- One Piece: `/anime/21/characters`
- Naruto: `/anime/20/characters`
- Dati: name, image, role

### Data Normalization
Tutti i dati sono normalizzati in un modello `Character` unificato con proprietà comuni e specifiche per serie.

## 👨‍💻 Sviluppato con

- **Angular CLI**: v13.3.11
- **TypeScript**: v4.6.2
- **RxJS**: v7.5.0
- **Angular Material**: v13.3.9

## 📝 Note

- Nessun database backend richiesto
- Tutte le API sono pubbliche e gratuite
- Dati aggiornati in tempo reale dalle API

## 🔜 Possibili Miglioramenti Futuri

- [ ] Aggiungere più anime
- [ ] Implementare preferiti/watchlist
- [ ] Sistema di confronto personaggi
- [ ] Dark/Light mode toggle
- [ ] Statistiche e grafici
- [ ] PWA support con service worker

---

**Progetto sviluppato per scopo educativo** © 2026
