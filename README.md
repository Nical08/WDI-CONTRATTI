# WebDev Innovations — Laboratorio societario

Demo statica di documentazione societaria per raccontare e discutere il passaggio da **SNC** a **Sagl** e poi a **SA**. Include sei documenti redatti in Markdown e un simulatore di cap table, diluizione e diritti di voto.

Il progetto non ha build, non usa dipendenze e non richiede `npm install`. È pensato per essere aperto, letto e modificato direttamente.

## Avvio

### Windows

Fare doppio click su `start.cmd`. Lo script controlla Node.js, avvia il server e apre il browser.

### Qualsiasi sistema con Node.js 22

```bash
node server.mjs
```

Aprire poi <http://localhost:4173>. Per usare un'altra porta:

```bash
PORT=4174 node server.mjs
```

Su PowerShell:

```powershell
$env:PORT=4174; node server.mjs
```

Il server stampa l'indirizzo all'avvio e tenta di aprire il browser. Per avviarlo senza apertura automatica, ad esempio in un test o su una macchina senza browser:

```bash
WDI_NO_OPEN=1 node server.mjs
```

### Apertura diretta del file

In alternativa si può aprire `index.html` con un doppio click. Il sito funziona anche da `file://` perché il front-end non usa moduli ES: tutti gli script sono caricati con normali tag `<script>`. Per un comportamento uniforme tra browser, il server locale resta il metodo consigliato.

## Struttura

```text
webdev-innovations/
├── index.html
├── server.mjs
├── start.cmd
├── README.md
├── .gitignore
└── assets/
    ├── css/
    │   ├── styles.css
    │   └── extras.css
    ├── fonts/
    │   ├── instrument-sans-latin.woff2
    │   ├── newsreader-normal-latin.woff2
    │   ├── newsreader-italic-latin.woff2
    │   └── OFL.txt
    └── js/
        ├── data.js
        ├── docs.js
        ├── doc-snc.js
        ├── doc-founder.js
        ├── doc-internal.js
        ├── doc-sagl.js
        ├── doc-sa.js
        ├── doc-investor.js
        ├── markdown.js
        ├── ui.js
        ├── simulator.js
        ├── control.js
        ├── views-*.js
        └── app.js
```

> **Nota di integrazione.** `assets/css/extras.css` deve essere incluso in `index.html` subito dopo il foglio principale:
>
> ```html
> <link rel="stylesheet" href="assets/css/extras.css">
> ```
>
> Il compito di verificare e mantenere questo collegamento è dell'integratore. Senza il tag gli stili aggiuntivi non vengono caricati.

## I sette contenuti

1. **01 · Contratto sociale SNC** — la base giuridica della società attuale: partecipazione 50/50, conferimenti, responsabilità personale, gestione, firme, uscite e continuità.
2. **02 · Accordo tra fondatori** — il patto interno accanto al contratto sociale: ruoli futuri, decisioni, proprietà intellettuale, leaver, prelazione e deadlock.
3. **03 · Regolamento interno** — il manuale operativo: matrice dei ruoli e delle approvazioni, riunioni, firme, spese, accessi, sicurezza e continuità. Ruoli e soglie sono da completare.
4. **04 · Statuto futuro Sagl** — modello progettuale per il contenitore dei primi investitori: capitale, quote, categorie A/B, voto, veto, gerenti e trasformazione.
5. **05 · Statuto futuro SA** — modello per la fase di scala: azioni, categorie, voto privilegiato nei limiti dell'art. 693 CO, board, exit e diritti degli investitori.
6. **06 · Investor Agreement** — modello di term sheet e accordo per il primo investitore: strumento, valutazione, informazioni, reserved matters, anti-dilution, liquidazione e closing; richiede verifica LSerFi.
7. **07 · Simulatore di diluizione** — strumento interattivo per cap table, aumenti di capitale, vendite secondarie, prestiti convertibili, scenari e confronto tra modelli di voto.

I contenuti 01–06 sono bozze o modelli dimostrativi. Non sono firmabili e non hanno efficacia giuridica. Il 07 è un calcolatore illustrativo, non una valutazione finanziaria.

## Come modificare

Non c'è alcun processo di build: si modificano i file e si ricarica il browser. Il server invia `Cache-Control: no-store`, quindi le modifiche sono visibili subito.

| File | Cosa contiene | Come intervenire |
| --- | --- | --- |
| `assets/js/data.js` | Fasi SNC/Sagl/SA, decisioni aperte, dati economici, clausole, glossario, fonti e metadati. | È il punto di partenza per contenuti e decisioni. Cercare `DECISIONS`, `SOURCES` e `META`. |
| `assets/js/docs.js` | Indice dei documenti: numero, titolo, sintesi, stato e nome del file. | Aggiornarlo quando si aggiunge, rinomina o rimuove un documento. |
| `assets/js/doc-*.js` | Testo di ciascun documento in Markdown, dentro stringhe JavaScript. | Modificare il Markdown. Sono supportati titoli, paragrafi, elenchi, tabelle, citazioni, callout, link, grassetto, corsivo e codice. |
| `assets/js/markdown.js` | Mini renderer Markdown senza dipendenze. | Toccare solo se serve estendere la sintassi. |
| `assets/js/ui.js` | Helper condivisi: escaping, icone, formattazione CHF e percentuali, download, toast. | Modifiche trasversali all'interfaccia. |
| `assets/js/simulator.js` | Modello del simulatore: capitale, quote, round, diluizione, voti, export CSV/JSON. | Le formule e i parametri del simulatore stanno qui. |
| `assets/js/control.js` | Calcolatore di controllo economia/voti, con modello semplificato a tre holder. | Modificare etichette e ipotesi del calcolatore. |
| `assets/js/views-*.js` | Viste e routing hash dell'interfaccia. | Ogni vista legge i dati da `data.js` e i documenti da `docs.js`/`doc-*.js`. |
| `assets/js/app.js` | Avvio dell'applicazione, navigazione e collegamento degli eventi. | Punto di ingresso lato browser. |
| `assets/css/styles.css` | Stile principale, tipografia e componenti di base. | Usare le variabili CSS esistenti. |
| `assets/css/extras.css` | Stili aggiuntivi dei componenti estesi. | Deve essere incluso in `index.html` dall'integratore. |
| `server.mjs` | Server statico locale senza dipendenze. | Porta, MIME e header di sicurezza. |
| `start.cmd` | Avvio Windows con controllo di Node.js. | Non richiede npm. |

L'ordine degli script è definito in `index.html`. Se si aggiunge un file JavaScript, inserirlo nell'ordine corretto: prima i dati e gli helper, poi le viste e infine `app.js`. Non usare `import`/`export`, per non perdere la compatibilità con l'apertura diretta da `file://`.

### Aggiornare un documento

1. Modificare il Markdown nel file `assets/js/doc-*.js` corrispondente.
2. Se cambiano titolo, sintesi o stato, aggiornare la voce in `assets/js/docs.js`.
3. Se la modifica introduce una decisione o un'informazione nuova, valutare se aggiungerla anche in `assets/js/data.js`.
4. Ricaricare la pagina e controllare la resa su desktop e mobile.

### Aggiornare il simulatore

Le ipotesi e le formule sono in `assets/js/simulator.js`; le etichette dei tipi di operazione e dei modelli di voto sono nelle costanti in testa al file. Il simulatore produce risultati percentuali, non contabili: non usarlo come sostituto di un piano finanziario o di una cap table approvata.

## Fonti e stato di verifica

**Stato di verifica: 1° ottobre 2026.** I testi normativi sono stati controllati a quella data sui testi ufficiali. La versione della demo è novembre 2026.

- [Fedlex](https://www.fedlex.admin.ch/) — piattaforma ufficiale del diritto federale svizzero.
- [Codice delle obbligazioni (CO, RS 220)](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/it)
- [Legge federale sulla fusione (LFus, RS 221.301)](https://www.fedlex.admin.ch/eli/cc/2004/320/it)
- [Legge sul diritto d'autore (LDA, RS 231.1)](https://www.fedlex.admin.ch/eli/cc/1993/1798_1798_1798/it)
- [Portale PMI della Confederazione (KMU)](https://www.kmu.admin.ch/)

Le fonti e i riferimenti visibili nell'applicazione sono raccolti nella costante `SOURCES` di `assets/js/data.js`. La legge sui servizi finanziari (LSerFi, RS 950.1) è citata come materia di verifica prima di qualsiasi raccolta di capitale; non è una fonte di dettaglio nella demo.

## Limiti

- **Non è consulenza legale, fiscale o finanziaria.** È materiale dimostrativo per discutere un progetto societario.
- **Non è firmabile.** Nessun documento della demo è un atto valido, un'offerta, un impegno o un contratto. La costituzione e la trasformazione richiedono atto pubblico e iscrizione nel Registro di commercio.
- **Verifica professionale obbligatoria.** Prima di qualsiasi firma, far controllare testi, capitale, conferimenti, aspetti fiscali e previdenziali da un professionista svizzero (notaio, avvocato, fiduciario).
- **LSerFi prima del fundraising.** La raccolta di capitale può attivare obblighi di prospetto e regole di sollecitazione. Verificare prima di contattare investitori.
- **I dati e gli importi sono esempi.** Le percentuali, le valutazioni e gli importi della demo non sono accordi e non rappresentano condizioni negoziate. In particolare, ogni numero del simulatore è un'ipotesi modificabile.
- **Nessun dato personale reale** oltre ai nomi dei fondatori indicati nel brief (Nicola Cappelli e Bryan Ciaponi). Nessun segreto, credenziale, chiave API o documento riservato è incluso.

## Aggiornare fonti e date

1. Aprire i testi consolidati su Fedlex e verificare gli articoli citati.
2. Aggiornare i riferimenti in `SOURCES` e, se necessario, i testi in `doc-*.js`.
3. Cercare nel progetto le stringhe `1° ottobre 2026` e `Novembre 2026` e allinearle in `data.js`, `README.md` e nelle altre intestazioni.
4. Aggiornare la data solo dopo la verifica effettiva, non come semplice modifica cosmetica.
5. Ricaricare l'applicazione e controllare i link esterni. Un riferimento a una legge modificata va segnalato anche nello stato del documento interessato.

## Licenze

Il codice della demo è liberamente modificabile per uso interno. Non è fornito con garanzie né con un livello di servizio.

I font locali **Instrument Sans** e **Newsreader** sono distribuiti con **SIL Open Font License 1.1**. Il testo della licenza è in `assets/fonts/OFL.txt`; la licenza è disponibile anche su [openfontlicense.org](https://openfontlicense.org/).

- Instrument Sans: [Google Fonts — ofl/instrumentsans](https://github.com/google/fonts/tree/main/ofl/instrumentsans)
- Newsreader: [Google Fonts — ofl/newsreader](https://github.com/google/fonts/tree/main/ofl/newsreader)

I file WOFF2 sono inclusi localmente e non vengono caricati da servizi esterni a runtime.
