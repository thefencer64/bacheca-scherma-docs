# Bacheca Scherma — Documentazione

---

## Indice

1. [Guida utente](#1-guida-utente)
   - [1.1 Installazione](#11-installazione)
   - [1.2 Registrazione](#12-registrazione)
   - [1.3 Iscrizione a una società](#13-iscrizione-a-una-società)
   - [1.4 Bacheca avvisi](#14-bacheca-avvisi)
   - [1.5 Notifiche push](#15-notifiche-push)
   - [1.6 Profilo](#16-profilo)
   - [1.7 Aggiungere un figlio minorenne](#17-aggiungere-un-figlio-minorenne)
   - [1.8 Registrazione di un minorenne](#18-registrazione-di-un-minorenne)
2. [Guida amministratore](#2-guida-amministratore)
   - [2.1 Accesso all'area admin](#21-accesso-allarea-admin)
   - [2.2 Dashboard](#22-dashboard)
   - [2.3 Gestione iscritti](#23-gestione-iscritti)
   - [2.4 Pubblicare un avviso](#24-pubblicare-un-avviso)
   - [2.5 Archivio avvisi](#25-archivio-avvisi)
   - [2.6 Rinnovo annuale](#26-rinnovo-annuale)

---

## 1. Guida utente

### 1.1 Installazione

Bacheca Scherma è una **Progressive Web App (PWA)**: si installa direttamente dal browser, senza passare dall'App Store o dal Play Store.

#### Android (Chrome, Edge, Samsung Internet)

1. Apri `bachecascherma.it` nel browser.
2. Comparirà in automatico un banner in cima alla pagina con il pulsante **Installa**.
3. Tocca **Installa** e conferma.
4. L'app apparirà nella schermata home come qualsiasi altra applicazione.

#### iPhone / iPad (Safari)

1. Apri `bachecascherma.it` in **Safari** (non in Chrome o altri browser).
2. Comparirà un banner con le istruzioni in cima alla pagina.
3. Tocca l'icona **Condividi** nella barra in basso di Safari.
4. Scorri e seleziona **"Aggiungi a schermata Home"**.
5. Conferma con **Aggiungi**.

> **Nota:** Su iPhone il banner di installazione appare solo se si usa Safari. Con altri browser (Chrome, Firefox) non è possibile installare la PWA.

Il banner di installazione non viene mostrato se l'app è già installata. Può essere chiuso toccando la **X** in alto a destra; in quel caso non verrà mostrato di nuovo.

---

### 1.2 Registrazione

1. Apri l'app e tocca **Registrati** nella pagina di accesso.
2. Compila i dati personali:
   - Nome e cognome
   - Data di nascita
   - Numero di telefono (opzionale)
   - Email
   - Password (minimo 8 caratteri)
3. Tocca **Avanti**.
4. Leggi l'informativa sulla privacy, spunta il consenso e tocca **Crea account**.

In alternativa è possibile registrarsi con **Google** toccando il pulsante apposito nella pagina di accesso.

> **Nota:** La registrazione crea l'account personale. Per ricevere gli avvisi di una società è necessario anche **iscriversi** a quella società (vedi sezione 1.3).

> **Minorenni:** I minorenni non possono registrarsi autonomamente. Devono essere prima aggiunti da un genitore già iscritto (vedi sezione 1.7), e successivamente completare la registrazione tramite l'apposito percorso (vedi sezione 1.8).

---

### 1.3 Iscrizione a una società

Dopo la registrazione (o all'accesso successivo) viene mostrata la schermata **Scegli la tua società**.

1. Tocca la società a cui vuoi iscriverti.
2. Scegli il tuo ruolo:
   - **Tiratore/Tiratrice** — per ricevere gli avvisi relativi alla propria categoria agonistica.
   - **Genitore** — per seguire gli avvisi relativi ai propri figli.
   - È possibile attivare entrambi i ruoli se si gareggia e si ha anche un figlio nel club.
3. Se hai scelto il ruolo di Tiratore/Tiratrice, nella schermata successiva puoi configurare le **preferenze di notifica**:
   - Ricevere avvisi per tutte le categorie, oppure solo per la propria.
   - La categoria viene calcolata automaticamente dalla data di nascita.
4. Leggi e accetta la privacy policy della società.
5. Tocca **Completa iscrizione**.

L'iscrizione viene inviata all'amministratore per l'approvazione. Fino all'approvazione verrà mostrata la schermata **"In attesa di approvazione"**.

Riceverai una notifica quando l'iscrizione sarà attivata.

---

### 1.4 Bacheca avvisi

Una volta approvata l'iscrizione, la schermata principale mostra gli avvisi della società in ordine cronologico inverso (dal più recente).

- Gli avvisi **In evidenza** (pinnati dall'admin) appaiono sempre in cima.
- Ogni avviso mostra titolo, anteprima del testo, categoria di destinazione e data.
- Se la bacheca contiene avvisi di categorie diverse, in cima appare una **barra di filtri** per visualizzare solo gli avvisi di una categoria specifica.
- Tocca un avviso per leggere il testo completo ed eventuali link allegati.

Vengono mostrati solo gli avvisi pertinenti al proprio profilo (categoria calcolata + categorie dei figli).

---

### 1.5 Notifiche push

Al primo accesso alla bacheca l'app chiede il **permesso per le notifiche push**.

- Se concesso, riceverai una notifica sul telefono ogni volta che l'admin pubblica un avviso destinato alla tua categoria.
- Il permesso può essere revocato in qualsiasi momento dalle impostazioni del browser o del sistema operativo.

> **iOS:** Le notifiche push richiedono che l'app sia installata come PWA (vedi sezione 1.1) e che il dispositivo utilizzi iOS 16.4 o superiore.

---

### 1.6 Profilo

La scheda **Profilo** (icona in basso a destra) mostra:

- Nome, cognome, email e data di nascita.
- Il ruolo e la categoria calcolata nell'ambito della società.
- La lista dei figli aggiunti (se si è genitore), con il rispettivo stato iscrizione.
- Il link alla **Privacy Policy** della società.
- Il pulsante **Cambia società** per passare a un'altra società a cui si è iscritti.
- Il pulsante **Esci dall'account**.

---

### 1.7 Aggiungere un figlio minorenne

Questa funzione è disponibile solo per gli utenti con ruolo **Genitore** e iscrizione **attiva**.

1. Dalla scheda Profilo, tocca **Aggiungi** nella sezione "I tuoi figli".
2. Inserisci i dati del figlio: nome, cognome, data di nascita ed eventuale email futura.
3. Tocca **Avanti**.
4. Leggi l'informativa sulla privacy, spunta il consenso in qualità di genitore/tutore e tocca **Conferma**.

Il figlio viene pre-registrato nel sistema. L'account non è ancora attivo: il figlio dovrà completare autonomamente la registrazione (vedi sezione 1.8) quando sarà pronto.

> **Nota:** I figli pre-registrati non sono visibili all'amministratore finché non completano la registrazione.

---

### 1.8 Registrazione di un minorenne

Se un genitore ti ha già pre-registrato:

1. Apri l'app e tocca **Registrati**.
2. Inserisci i tuoi dati (nome, cognome, data di nascita, email, password).
3. Poiché sei minorenne, comparirà un messaggio di blocco. Tocca il pulsante **"Sei già stato pre-registrato da un genitore? Continua →"**.
4. La registrazione si completa automaticamente collegando il nuovo account al profilo creato dal genitore.
5. L'iscrizione passerà in stato **"Attesa approvazione"**: l'admin dovrà approvarla per attivare l'account.

---

## 2. Guida amministratore

### 2.1 Accesso all'area admin

L'area amministrativa è accessibile solo agli utenti con ruolo **admin** per la propria società.

Dopo l'accesso, nella barra di navigazione in basso comparirà la voce **Admin** (oltre ad Avvisi e Profilo). Toccarla per accedere alla Dashboard.

---

### 2.2 Dashboard

La dashboard mostra una panoramica in tempo reale della società:

| Riquadro | Descrizione |
|---|---|
| **Iscritti attivi** | Numero di iscrizioni con stato "Attivo" |
| **In attesa** | Iscrizioni da approvare (tocca per aprire la lista) |
| **Avvisi pubblicati** | Totale avvisi nella bacheca |
| **Notifiche non lette** | Notifiche di sistema non ancora lette (tocca per segnarle tutte come lette) |

**Azioni rapide:**

- **Pubblica avviso** — accesso diretto al form di creazione avviso.
- **Gestisci iscritti** — accesso alla lista iscritti, con badge rosso se ci sono richieste pendenti.
- **Rinnovo annuale** — avvia la procedura di rinnovo delle iscrizioni.

---

### 2.3 Gestione iscritti

La pagina **Iscritti** mostra tutti gli iscritti alla società con nome, cognome, ruolo, categoria e stato.

#### Filtri

In cima alla pagina sono disponibili i filtri per stato:

- **Tutti** — mostra tutti gli iscritti visibili.
- **In attesa** — iscrizioni che richiedono approvazione (`in_attesa` e `attesa_admin`).
- **Attivi** — iscrizioni approvate e operative.
- **Da rinnovare / Decaduti / Sospesi** — altri stati.

> I minorenni pre-registrati dal genitore (stato `pre_registrato`) non compaiono nell'elenco finché non completano la registrazione.

#### Azioni disponibili per ogni iscritto

| Azione | Quando è disponibile |
|---|---|
| **Approva** | Stato `in_attesa` o `attesa_admin` |
| **Rifiuta** | Stato `in_attesa` o `attesa_admin` — richiede un motivo opzionale |
| **Sospendi** | Stato `attivo` |
| **Riattiva** | Stato `sospeso` |
| **Modifica** | Sempre disponibile — permette di cambiare ruoli, categoria, anno iscrizione |
| **Elimina** | Sempre disponibile — rimuove l'iscritto da Firestore e dall'autenticazione |

> **Attenzione:** L'eliminazione è irreversibile. Rimuove il documento utente, l'iscrizione e l'account di autenticazione Firebase.

---

### 2.4 Pubblicare un avviso

Dal menu **Avvisi → Nuovo avviso** (o dalla Dashboard → Pubblica avviso):

1. **Titolo** — obbligatorio.
2. **Testo** — obbligatorio, corpo completo dell'avviso.
3. **Destinatari** — seleziona una o più categorie FIS. Se non si seleziona nulla, l'avviso viene recapitato a **tutti gli iscritti attivi**.
4. **Link allegati** (opzionale) — aggiungi uno o più link con URL ed etichetta descrittiva.
5. **Opzioni:**
   - **Pubblica subito** — se disattivato, l'avviso viene salvato come bozza (non visibile agli utenti).
   - **In evidenza** — l'avviso compare sempre in cima alla bacheca, sopra tutti gli altri.
6. Tocca **Pubblica avviso**.

Al momento della pubblicazione viene inviata automaticamente una **notifica push** a tutti gli iscritti destinatari che hanno concesso il permesso.

#### Categorie FIS disponibili

| ID | Etichetta |
|---|---|
| `minions` | Minions |
| `bambini` | Bambine/Maschietti |
| `giovanissimi` | Giovanissimi |
| `ragazzi` | Ragazze/Ragazzi |
| `allievi` | Allieve/Allievi |
| `cadetti` | Cadetti |
| `giovani` | Giovani |
| `assoluti` | Assoluti |
| `master_0` | Master Cat.0 (over 24) |
| `master_1` | Master Cat.1 (over 40) |
| `master_2` | Master Cat.2 (over 50) |
| `master_3` | Master Cat.3 (over 60) |
| `master_4` | Master Cat.4 (over 70) |
| `paralimpico` | Paralimpico |
| `integrata` | Scherma Integrata |
| `non_vedenti` | Non Vedenti |

---

### 2.5 Archivio avvisi

La pagina **Avvisi** dell'area admin mostra tutti gli avvisi pubblicati, compresi quelli salvati come bozza. È possibile consultare il testo completo e verificare a quali categorie erano destinati.

---

### 2.6 Rinnovo annuale

La procedura di rinnovo permette di aggiornare l'anno schermistico per tutti gli iscritti attivi.

1. Vai su **Admin → Rinnovo annuale**.
2. Verifica o modifica il **nuovo anno** nel formato `AAAA-AAAA` (es. `2026-2027`).
3. Imposta eventualmente una **data di scadenza** entro cui gli iscritti devono confermare il rinnovo.
4. Tutti gli iscritti attivi vengono pre-selezionati. Deseleziona quelli da escludere.
5. Tocca **Apri rinnovo**.

Gli iscritti inclusi passano allo stato `da_rinnovare`. Ricevono una comunicazione e devono confermare il rinnovo dall'app. Chi non rinnova entro la scadenza passa allo stato `decaduto`.

Per **chiudere** il rinnovo e confermare tutti quelli che hanno risposto, usa il pulsante **Conferma rinnovi** / **Chiudi rinnovo**.

---

*Bacheca Scherma — stagione 2025–2026*
