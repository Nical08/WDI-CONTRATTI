# CONTEXT HANDOFF — WebDev Innovations
**Per il prossimo OpenCode.** Leggi questo file per intero prima di modificare qualsiasi cosa.

**Data:** 20 novembre 2026  
**Utente:** Nicola Cappelli (uno dei due fondatori). Parla italiano, vuole risultati concreti, non teoria.  
**Obiettivo finale chiarito dall'utente:** avere il **contratto sociale della WebDev Innovations SNC in versione pulita, da far verificare e firmare con Bryan Ciaponi**. La demo del sito è un contorno, non il deliverable principale. L'utente aveva fretta e stava per spegnere il PC.

---

## 1. Percorso del progetto

```
C:\Users\jzl561\.cache\opencode\webdev-innovations
```

Questo è un sito statico + una cartella `firma/` con il contratto. Non è un repo git.

File di orientamento già presenti:
- `HANDOFF.md` — handoff breve.
- `CONTEXT-HANDOFF.md` — questo file, più completo.
- `README.md` — istruzioni della demo.
- `firma/` — **contenuto da firmare**.
- `tools/` — script per rigenerare PDF/DOCX.

---

## 2. Cosa è già stato prodotto

### 2.1 Contratto SNC (deliverable principale)

Percorso: `firma/`

| File | Contenuto |
|---|---|
| `01-CONTRATTO-SOCIALE-SNC.md` | Sorgente Markdown, 25 articoli + allegati A–G |
| `01-CONTRATTO-SOCIALE-SNC.pdf` | **16 pagine A4**, impaginato, con footer e numeri di pagina |
| `01-CONTRATTO-SOCIALE-SNC.docx` | Versione Word modificabile, ~52 KB, tabelle e footer |
| `01-CONTRATTO-SOCIALE-SNC.html` | Anteprima HTML stampabile |
| `00-LEGGIMI-PRIMA-DI-FIRMARE.md/.pdf` | Istruzioni operative (4 pagine) |
| `00-SCHEDA-DATI-E-SCELTE.md/.pdf` | Dati e scelte da completare (4 pagine) |

**ZIP già creati:**
- `C:\Users\jzl561\Downloads\WebDev-Innovations-Contratto-SNC.zip` — contratto + istruzioni + scheda + HANDOFF.
- `C:\Users\jzl561\Downloads\WebDev-Innovations-Demo-Completa.zip` — sito + contratto + tools.
- Copie dirette:
  - `C:\Users\jzl561\Downloads\WebDev-Contratto-SNC.pdf`
  - `C:\Users\jzl561\Downloads\WebDev-Contratto-SNC.docx`
  - `C:\Users\jzl561\Downloads\WebDev-Prima-di-firmare.pdf`

**Scelte già inserite nel contratto (modificabili):**
- SNC, sede Ticino, Comune `[●]`.
- Nicola 50% / Bryan 50%.
- Nessun ruolo manageriale assegnato; nessun CEO/CTO/COO.
- Conferimento della propria opera; denaro/beni solo se nell'Allegato B.
- Nessun obbligo di versamenti ulteriori.
- Decisioni ordinarie di comune accordo; straordinarie all'unanimità.
- **Firma sociale collettiva a due**, con procure per l'ordinaria amministrazione nell'Allegato F.
- Riserva di liquidità di 3 mesi, salvo diverso accordo.
- Uscita: preavviso 6 mesi a fine esercizio; continuazione con il socio superstite; pagamento entro 120 giorni, salvo rateizzazione.
- Non concorrenza post-uscita **opzionale** (Allegato F.5: 12 mesi, Svizzera, software/web/prenotazioni).
- Trasformazione futura in Sagl/SA: **intenzione, non obbligo**, decisione all'unanimità, procedura LFus, atto pubblico, iscrizione.
- Proprietà intellettuale: la Società è titolare di ciò che nasce nell'attività; il preesistente è in Allegato C, con licenza gratuita, non esclusiva, irrevocabile e trasferibile (anche in caso di trasformazione/cessione d'azienda), salvo diversa indicazione.
- Allegati: A dati soci, B conferimenti, C IP preesistente, D finanziamenti, E valutazione/pagamento, F firme/soglie/opzione NC, G ruoli (vuoto).

### 2.2 Demo del sito

Percorso: `C:\Users\jzl561\.cache\opencode\webdev-innovations`

- `index.html` + `assets/` (CSS, JS, font locali).
- Nessuna build, nessun npm, nessun modulo ES: si apre anche da `file://`.
- Avvio: doppio click `start.cmd` oppure `node server.mjs` → `http://localhost:4173`.
- Il server statico è in `server.mjs`, senza dipendenze.
- Topbar: pulsante **Contratto PDF** che scarica `firma/01-CONTRATTO-SOCIALE-SNC.pdf`.
- Sidebar: link **Contratto in versione pulita**.
- Rotte testate con Edge headless e tutte funzionanti:
  `#/`, `#/percorso`, `#/decisioni`, `#/snc`, `#/governance`, `#/economia`, `#/protezione`, `#/uscite`, `#/sagl`, `#/controllo`, `#/investimenti`, `#/clausole`, `#/documenti`, `#/documenti/snc`, `#/simulatore`, `#/fonti`.
- Nessun errore JS rilevato in console headless.
- Il simulatore funziona: aumento di capitale, vendita secondaria, prestito, convertibile, cap table, voti vs economia, preset, CSV/JSON, localStorage.
- Screenshot QA: home, SNC, controllo, simulatore. Layout desktop buono. Phase rail sistemata. Cap table resa full-width.

**Attenzione:** il Doc 01 dentro la demo (sito) è ancora la versione "demo" con avvertenze "non firmare". La versione pulita è solo in `firma/`. Non confonderle. Il sito serve a spiegare; il contratto da firmare è il PDF/DOCX in `firma/`.

---

## 3. Cosa manca / prossimi passi

### 3.1 Priorità assoluta: far firmare il contratto

1. L'utente deve compilare `firma/00-SCHEDA-DATI-E-SCELTE.md`.
2. Deve riportare i dati nel contratto, soprattutto:
   - Allegato A: dati soci, Comune sede;
   - Allegato B: conferimenti;
   - Allegato C: codice/IP preesistente (se manca, non viene licenziato);
   - Allegato D: prestiti;
   - Allegato F: procure, soglie, opzione non concorrenza;
   - Allegato G: ruoli (vuoto alla firma).
3. **Revisione legale obbligatoria** da parte di un avvocato/notaio svizzero. Punti da chiedere:
   - responsabilità personale, illimitata e solidale della SNC;
   - validità/opponibilità della firma collettiva e delle procure;
   - non concorrenza post-uscita;
   - proprietà intellettuale e licenze;
   - conseguenze fiscali, sociali, previdenziali;
   - iscrizione e futura trasformazione LFus.
4. Verificare con l'Ufficio del registro di commercio del Cantone Ticino:
   - formulari;
   - firme autenticate;
   - documenti d'identità;
   - eventuale attestazione di sede/domicilio.
5. Firmare due originali e iscrivere la SNC.

### 3.2 Prossimo documento consigliato

Creare una versione pulita e firmabile dell'**Accordo tra fondatori** (il Doc 02 della demo esiste già come bozza, ma non è stato esportato in PDF/DOCX). Serve per:
- leaver Good/Bad;
- ROFR;
- deadlock;
- ruoli e compensi futuri;
- protezione individuale dei fondatori;
- successione.

La bozza demo è in `assets/js/doc-founder.js`; il testo è già ampio e coerente. Per esportarla:
- estrarre il body Markdown;
- togliere il warning "demo";
- creare `firma/02-ACCORDO-FONDATORI.md`;
- generare PDF/DOCX con gli stessi script (`tools/`).

### 3.3 Demo: rifiniture opzionali

- Sostituire nel sito il Doc 01 demo con un banner "La versione firmabile è in `firma/`" (il topbar già lo fa).
- Aggiornare il Doc 01 demo per evitare che sembri firmabile.
- QA mobile/print finale.
- Nessun blocco funzionale noto.

---

## 4. Contesto legale e fonti

La demo e il contratto sono basati sul diritto svizzero. Testi verificati su Fedlex, consolidamento **1 ottobre 2026**:

- **CO (RS 220)**: artt. 552–593 SNC; 772–827 Sagl; 620–762 SA.
- Articoli chiave verificati:
  - SNC: 552, 557, 558, 560, 561, 563, 564, 568, 569, 576, 577, 580, 591.
  - Sagl: 772–774, 781, 785–788, 806, 807, 808, 814, 818, 822–825.
  - SA: 620, 622, 632, 652b, 653, 685a–685c, 692, 693, 697, 704, 709, 716a, 727a.
- **LFus (RS 221.301)**: artt. 53–67; in particolare 54 (SNC → società di capitali), 56 (tutela diritti), 61–63 (rapporto/verifica/consultazione), 64 (unanimità SNC), 65 (atto pubblico), 67 (iscrizione).
- **LDA (RS 231.1)**: artt. 2, 16, 17 (software, trasferimento, diritti del datore di lavoro).
- Altre: nLPD (RS 235.1), LSerFi (RS 950.1) per il fundraising.

**Regole di accuratezza:**
- Non applicare meccanismi della Sagl/SA alla SNC.
- La SNC non ha azioni né quote di capitale; il 50% è contrattuale.
- La responsabilità personale e solidale non si può escludere verso i terzi (art. 568 cpv. 2 CO).
- La trasformazione non è automatica: LFus, progetto, rapporto, decisione, atto pubblico, iscrizione.
- Art. 693 CO: voto privilegiato solo con azioni a nominale ridotto, nominative, interamente liberate, rapporto max 10:1. Le maggioranze art. 704 restano inderogabili.
- Art. 806 CO (Sagl): voto proporzionale, una quota = un voto con nominale minimo 1/10 del massimo, o tetto statutario.
- Art. 807 CO (Sagl): veto personale, non trasferibile; introduzione successiva all'unanimità.
- Nella SA non esiste un veto statutario generale: è contrattuale.
- Il 60% dei voti con il 20% di economia è possibile solo con una struttura statutaria e negoziale; non è automatico. La demo mostra 71,4% con nominale 10:1 e 62,5% con tetto 12% (modello semplificato).

---

## 5. Architettura tecnica

### File principali

```
index.html
assets/css/styles.css        design system
assets/css/extras.css        classi accessorie/stampa
assets/js/data.js            dati editoriali, decisioni, clausole, fonti
assets/js/docs.js            indice documenti + metadati
assets/js/doc-snc.js         Doc 01 demo
assets/js/doc-founder.js     Doc 02 demo
assets/js/doc-internal.js    Doc 03 demo
assets/js/doc-sagl.js        Doc 04 demo
assets/js/doc-sa.js          Doc 05 demo
assets/js/doc-investor.js    Doc 06 demo
assets/js/markdown.js        parser Markdown custom
assets/js/ui.js              helper UI condivisi
assets/js/simulator.js       motore cap table/diluizione/voti
assets/js/control.js         calcolatore controllo 20%/60%
assets/js/views-core.js      home, percorso, decisioni
assets/js/views-snc.js       snc, governance
assets/js/views-economy.js   economia, IP, uscite
assets/js/views-sagl.js      Sagl, controllo
assets/js/views-invest.js    investimenti, clausole
assets/js/views-tools.js     documenti, lettore, fonti
assets/js/views-sim.js       pagina simulatore
assets/js/app.js             router/hash, shell, mount
server.mjs                   server statico Node
start.cmd                    avvio Windows
tools/                       rigenerazione contratto PDF/DOCX
firma/                       contratto pulito
```

### Stack
- HTML/CSS/JS classici, nessun framework, nessun build.
- Font locali: Instrument Sans + Newsreader (OFL) in `assets/fonts/`.
- Node 22 per server e script di build.
- Edge 157 per generazione PDF (`--headless --print-to-pdf`).
- Python 3.10 + `python-docx` per DOCX. `python-docx` è stato installato in `%TEMP%\pydeps`; può sparire al riavvio.

### Rigenerare il contratto
```powershell
cd C:\Users\jzl561\.cache\opencode\webdev-innovations
node tools/make_contract_html.js
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="firma\01-CONTRATTO-SOCIALE-SNC.pdf" "file:///C:/Users/jzl561/.cache/opencode/webdev-innovations/firma/01-CONTRATTO-SOCIALE-SNC.html"
$env:PYTHONPATH="$env:TEMP\pydeps"; python tools/make_contract_docx.py
```
Oppure `tools\build-contract.cmd` (non testato a fondo).

### Avviare la demo
```powershell
cd C:\Users\jzl561\.cache\opencode\webdev-innovations
node server.mjs
# http://localhost:4173
```
Il server potrebbe essere ancora in background sulla porta 4173. Se la porta è occupata, usare `PORT=4174`.

---

## 6. Cosa NON fare

- Non presentare il contratto come consulenza legale o come "pronto senza verifica".
- Non inventare importi, conferimenti, ruoli o dati personali.
- Non assegnare CEO/CTO/COO a Nicola o Bryan: i ruoli non sono decisi.
- Non applicare alla SNC le categorie A/B, il voto privilegiato o il veto della Sagl.
- Non dire che la trasformazione è automatica o che mantiene automaticamente ogni diritto.
- Non usare la demo come se fosse già una Sagl/SA.
- Non sovrascrivere `firma/01-CONTRATTO-SOCIALE-SNC.md` senza rigenerare PDF/DOCX.
- Non perdere la distinzione tra aumento di capitale, vendita secondaria, prestito e convertibile.

---

## 7. Stato emotivo / aspettative dell'utente

L'utente ha detto: *"io voglio il contratto lo sai? così che io e bryan firmiamo"*. Era frustrato perché la demo sembrava prendere il sopravvento. Il contratto è ora pronto in PDF/DOCX. Il prossimo agente deve:

1. Riconoscere subito che il contratto è il deliverable principale.
2. Non ripartire dalla demo o da nuove idee progettuali.
3. Chiedere solo i dati mancanti (o guidare la compilazione della scheda).
4. Ricordare la revisione legale svizzera prima della firma.
5. Essere conciso e operativo.

---

## 8. File da leggere per primi

1. `firma/01-CONTRATTO-SOCIALE-SNC.md`
2. `firma/00-SCHEDA-DATI-E-SCELTE.md`
3. `firma/00-LEGGIMI-PRIMA-DI-FIRMARE.md`
4. `HANDOFF.md`
5. `README.md`

Se devi modificare la demo: `assets/js/data.js`, `assets/js/app.js`, `assets/css/styles.css`.
Se devi rigenerare il contratto: `tools/`.

---

**Ultimo aggiornamento:** 20 novembre 2026, subito prima dello spegnimento del PC.  
**Prossima azione consigliata:** aprire la scheda dati, compilarla con Nicola e Bryan, riportare i dati negli allegati, prenotare la revisione legale e stampare il PDF per la firma.
