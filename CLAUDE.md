# Bacheca Scherma — CLAUDE.md

## Project Overview

**Bacheca Scherma** is a Progressive Web App (PWA) for managing notifications and registrations within Italian fencing (scherma) clubs. Mobile-first, Italian-language, multi-society app.

## Tech Stack

- **Frontend:** React 18, React Router v6, TanStack React Query, Tailwind CSS
- **Backend/DB:** Firebase Firestore, Firebase Authentication, Firebase Cloud Functions (europe-west1)
- **Forms:** react-hook-form
- **PWA:** Service Worker, Web Push Notifications (FCM)
- **Language:** JavaScript/JSX (no TypeScript)

## Directory Structure

```
App_bacheca_scherma/
├── files react/          # React source files (components, pages, hooks, functions)
│   ├── index.js          # React entry point (also registers service worker)
│   ├── App.js            # Root component with routing
│   ├── useAuth.js        # Auth context and hook (core auth logic)
│   ├── getSocietaId.js   # Legge societaId dal sottodominio (es. brianzascherma.bachecascherma.it → 'brianzascherma')
│   ├── usePushNotification.js
│   ├── BannerInstalla.js # PWA install banner (shown on /login, browser only)
│   ├── LandingPage.js    # Pagina informativa su bachecascherma.it (dominio root)
│   ├── LayoutAdmin.js    # Layout pannello admin
│   ├── AdminIscritti.js  # Pagina iscritti (con ultima visita)
│   ├── admin.js          # Cloud Functions — operazioni admin
│   ├── notifiche.js      # Cloud Functions — push FCM (onAvvisoCreato, inviaNotifica)
│   ├── auth.js           # Cloud Functions — trigger ciclo vita utenti/iscrizioni
│   └── [page components] # Login, Bacheca, Admin pages, etc.
└── altri file/           # Assets and config
    ├── index.html        # HTML shell
    ├── manifest.json     # PWA manifest
    ├── firestore.rules   # Firestore security rules
    └── icons/            # PWA icons (72–512px)
```

## Route Structure

```
/login                          → Login
/registrazione                  → Registration
/iscriviti/:societaId           → Subscribe to a club
/stato-iscrizione/:societaId    → Registration status
/completa-profilo               → Complete profile (post-Google signup)
/:societaId/                    → User bulletin board (Bacheca)
/:societaId/avviso/:id          → Single notification
/:societaId/profilo             → User profile
/:societaId/aggiungi-figlio     → Add dependent child
/:societaId/admin/              → Admin dashboard
/:societaId/admin/iscritti      → Manage registrations
/:societaId/admin/avvisi        → View notifications
/:societaId/admin/avvisi/nuovo  → Create notification
/:societaId/admin/rinnovo       → Annual renewal
/:societaId/admin/categorie     → Category distribution
```

> `/scegli-societa` è stato rimosso. L'architettura è mono-società per sottodominio.
> Il dominio root `bachecascherma.it` mostra `LandingPage.js` (pagina informativa).

## Firestore Collections

| Collection | Purpose |
|---|---|
| `utenti` | Global user profiles |
| `societa` | Club info |
| `societa/{id}/iscrizioni` | Registrations per club |
| `societa/{id}/avvisi` | Notifications/announcements |
| `societa/{id}/relazioni` | Parent–child links |
| `societa/{id}/notificheAdmin` | Admin alerts |
| `configCategorie` | FIS age category definitions (2025–2026 season) |
| `configPrivacy` | Privacy policy versions (GDPR) |
| `consensiPrivacy` | Immutable consent log |
| `mail` | Email queue (Firestore extension) |

## User Roles

- **atleta** — regular fencer member
- **genitore** — parent (can manage children/dependents via `relazioni`)
- **admin** — club administrator (full access to admin section)

## Cloud Functions (in `files react/`)

| File | Funzioni esportate |
|---|---|
| `admin.js` | `approvaIscrizione`, `rifiutaIscrizione`, `sospendiIscrizione`, `riattivaIscrizione`, `apriRinnovo`, `confermaRinnovi`, `chiudiRinnovo`, `getIscritti`, `eliminaIscritto`, `collegaUtentePreRegistrato`, `cercaPreRegistrato`, `modificaIscritto` |
| `notifiche.js` | `onAvvisoCreato` (Firestore trigger), `inviaNotifica` (callable) |
| `auth.js` | `onUtenteCreato`, `onIscrizioneCreata`, `onRelazioneCreta`, `onIscrizioneAggiornata`, `aggiornaFcmToken`, `rimuoviFcmToken` |

Deploy delle functions:
```bash
cp ~/Documents/App_bacheca_scherma/files\ react/admin.js ~/bacheca-scherma/functions/admin.js
cp ~/Documents/App_bacheca_scherma/files\ react/notifiche.js ~/bacheca-scherma/functions/notifiche.js
cp ~/Documents/App_bacheca_scherma/files\ react/auth.js ~/bacheca-scherma/functions/auth.js
firebase deploy --only functions:nomeFunzione
```

## statoAccount — valori e flusso

| Valore | Significato |
|---|---|
| `pre_registrato` | Minore aggiunto dal genitore, non ancora registrato. Invisibile all'admin. |
| `in_attesa` | Utente registrato autonomamente, in attesa di approvazione admin. |
| `attesa_admin` | Minore che ha completato la registrazione — `collegaUtentePreRegistrato` ha collegato il profilo. |
| `attivo` | Iscrizione approvata dall'admin. |
| `da_rinnovare` | Rinnovo annuale aperto, iscrizione non ancora confermata. |
| `sospeso` | Sospeso dall'admin. |
| `decaduto` | Rinnovo non effettuato entro la scadenza. |

## Key Firebase Files Not in Repo

The following are expected but not committed:
- `lib/firebase.js` — Firebase SDK initialization (imported as `'../../lib/firebase'`)
- `.env` / environment variables — Firebase project credentials
- `package.json` — dependencies and scripts
- `firebase.json` — Firebase Hosting/Functions deployment config

## Common Patterns

### Auth check
```js
const { user, isAdmin, isAttivo } = useAuth();
```

### Firestore query with React Query
```js
const { data } = useQuery(['key'], () => getDocs(collection(db, 'societa', societaId, 'avvisi')));
```

### Push notification token
Stored as `fcmTokens[]` array on the user's `utenti/{uid}` document.

## PWA Notes

- Service worker is registered only in production (`process.env.NODE_ENV === 'production'`)
- Custom `--vh` CSS variable set at runtime to handle mobile browser chrome
- `viewport-fit=cover` and `safe-area-inset-*` are used throughout for notch/home-indicator support
- App theme color: `#0179C0` (scherma-blue), dark: `#00244F` (scherma-navy)

### Banner installazione (`BannerInstalla.js`)

Mostrato nella pagina `/login`, sopra il form. Non appare se l'app è già installata come PWA.

- **Android**: intercetta `beforeinstallprompt`, mostra pulsante "Installa"
- **iOS Safari**: guida in 2 passi (tasto Condividi → "Aggiungi a schermata Home")
- **iOS altro browser**: invita ad aprire la pagina in Safari
- Dismissibile con la X; stato salvato in `localStorage` (`pwa_install_dismissed`)

Deploy: `Login.js` + `BannerInstalla.js` → build hosting.

## FIS Age Categories (2025–2026)

Categories are calculated from birth year and stored as `categoriaCalcolata` on the iscrizione document. Seeded via `seed-categorie.js`. Special categories (`paralimpico`, `integrata`, `non_vedenti`) have no birth year constraint.

## Flusso pre-registrazione minorenni

1. Genitore → `/:societaId/aggiungi-figlio` → crea `utenti/{uid}` con `preRegistrato: true` + `iscrizioni/{uid}` con `statoAccount: 'pre_registrato'` + `relazioni`
2. `onRelazioneCreta` skippa se `statoAccount === 'pre_registrato'` (non notifica l'admin)
3. Minore → `/registrazione` → vede blocco età → clicca "Sono già stato pre-registrato" → si registra
4. `useAuth.registraConEmail` chiama `cercaPreRegistrato` (autenticato) → trova il profilo → `collegaUtentePreRegistrato` copia iscrizione da vecchio UID a nuovo UID con `statoAccount: 'attesa_admin'`
5. Admin vede l'iscrizione in "Attesa approvazione" e approva

## Architettura mono-società per sottodominio

Ogni club ha il proprio sottodominio: `nomeclube.bachecascherma.it`.
`getSocietaId()` estrae il societaId dall'hostname (`hostname.split('.')[0]`).
- In sviluppo (`localhost`) restituisce `'brianzascherma'` come fallback.
- Su `bachecascherma.it` / `www.bachecascherma.it` restituisce `null` → mostra `LandingPage`.

Deploy hosting: Firebase Hosting con custom domain per ogni sottodominio.
Dominio attivo: `brianzascherma.bachecascherma.it` (DNS su Aruba, record A + TXT per verifica).
Dopo aggiunta nuovo sottodominio: aggiungerlo anche in **Firebase Auth → Authorized domains**.

## iscrizioni — campi notevoli

| Campo | Tipo | Note |
|---|---|---|
| `statoAccount` | string | Vedi tabella statoAccount |
| `ruoli` | array | `['atleta']`, `['genitore']`, `['admin']`, o combinazioni |
| `categoriaCalcolata` | string | Calcolata da data di nascita |
| `preferenzeNotifiche` | object | `{proprie: {...}, perFigli: {...}}` |
| `ultimaVisita` | Timestamp | Aggiornata ad ogni apertura della Bacheca |

## Admin

- Il tab **Admin** (ingranaggio) appare nella bottom nav di `LayoutUtente` solo se `ruoli.includes('admin') && statoAccount === 'attivo'`.
- L'elenco iscritti mostra **ultima visita** per ogni utente (campo `ultimaVisita` sull'iscrizione).
- Per revocare i refresh token di tutti gli utenti: `node functions/revoca-token.js` (richiede `GOOGLE_APPLICATION_CREDENTIALS`).

## PWA — note iOS

- Su **iOS 26+** Safari ha spostato il pulsante Condividi dentro i 3 puntini (···) in basso a destra. `BannerInstalla.js` rispecchia questo flusso.
- `useAuth.js` ha un timeout di 6s su `onAuthStateChanged` per gestire il caso in cui iOS PWA non lo triggeri (IndexedDB bloccata, sessione stale).
- `LayoutUtente.js` usa `snap.metadata.fromCache` per evitare redirect a `/iscriviti/` basati su dati dalla cache locale.
- `Iscrizione.js` ha un guard al mount: se l'utente ha già un'iscrizione, reindirizza senza mostrare il form.

## Firestore rules — note

- `consensiPrivacy`: `allow read` include `resource == null` per permettere lettura di documenti non esistenti (necessario per il check di esistenza prima della creazione).
- `iscrizioni` update: campi consentiti all'utente: `preferenzeNotifiche`, `aggiornatoAt`, `ultimaVisita`.

## Development Notes

- All UI text is in Italian
- `societaId` è sempre un route param, derivato dal sottodominio tramite `getSocietaId()`
- Admin pages are protected client-side and by Firestore rules
- Firestore security rules are in `altri file/firestore.rules` — keep them in sync with any schema changes
- No test suite is currently set up
