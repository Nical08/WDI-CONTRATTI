# HANDOFF — WebDev Innovations
**Data:** 20 novembre 2026  
**Obiettivo dell'utente:** avere il **contratto sociale SNC** in versione pulita, da far verificare e firmare con Bryan; in più la demo del sito è già costruita.

---

## 1. Cosa è pronto

### Contratto da firmare
Cartella: `firma/`

| File | Stato |
|---|---|
| `01-CONTRATTO-SOCIALE-SNC.md` | Testo completo, 25 articoli + allegati A–G |
| `01-CONTRATTO-SOCIALE-SNC.pdf` | **16 pagine A4**, impaginato, con numeri di pagina |
| `01-CONTRATTO-SOCIALE-SNC.docx` | Modificabile in Word, 52 KB, tabelle e footer |
| `00-LEGGIMI-PRIMA-DI-FIRMARE.md/.pdf` | Istruzioni operative, 4 pagine |
| `00-SCHEDA-DATI-E-SCELTE.md/.pdf` | Dati e scelte da completare, 4 pagine |

**Scelte già inserite nel contratto (modificabili prima della firma):**
- partecipazione 50% Nicola / 50% Bryan;
- nessun ruolo manageriale assegnato (nessun CEO/CTO/COO);
- decisioni ordinarie di comune accordo; straordinarie all'unanimità;
- firma sociale **collettiva a due**, con procure per l'ordinaria amministrazione nell'Allegato F;
- conferimento della propria opera; conferimenti in denaro/beni solo se indicati nell'Allegato B;
- nessun obbligo di versamenti ulteriori;
- riserva di liquidità di 3 mesi, salvo diverso accordo;
- uscita con preavviso di 6 mesi a fine esercizio; continuazione con il socio superstite; pagamento entro 120 giorni, salvo rateizzazione;
- non concorrenza post-uscita **opzionale** (Allegato F.5, 12 mesi, Svizzera);
- trasformazione futura in Sagl/SA come intenzione, non obbligo, con procedura LFus.

### Demo del sito
Cartella: `C:\Users\jzl561\.cache\opencode\webdev-innovations`

- `index.html` + `assets/` (CSS, JS, font locali).
- Nessuna build, nessuna dipendenza npm. Avvio: doppio click su `start.cmd` oppure `node server.mjs` → http://localhost:4173.
- Tutte le rotte testate con Edge headless: home, percorso, decisioni, SNC, governance, economia, IP, uscite, Sagl, controllo, investimenti, clausole, documenti, lettore documenti, simulatore, fonti.
- Il simulatore funziona: aumento di capitale, secondaria, prestito, convertibile, cap table, voti vs economia, preset, CSV/JSON, localStorage.
- Topbar: pulsante **Contratto PDF** che scarica `firma/01-CONTRATTO-SOCIALE-SNC.pdf`.
- La demo contiene le 6 bozze (Doc 01–06) e il simulatore (Doc 07), ma **la versione pulita da firmare è nella cartella `firma/`**, non nel testo demo del sito.

### ZIP
- `WebDev-Innovations-Contratto-SNC.zip` — solo fascicolo contratto/istruzioni/scheda.
- `WebDev-Innovations-Demo-Completa.zip` — sito + contratto.
- Copie in `C:\Users\jzl561\Downloads\` (se la copia è riuscita).

---

## 2. Cosa deve ancora fare l'utente (o un altro agent)

### Prima della firma
1. Compilare `firma/00-SCHEDA-DATI-E-SCELTE.md`.
2. Riportare i dati nel contratto:
   - **Allegato A**: dati dei soci, Comune della sede;
   - **Allegato B**: conferimenti (denaro, beni, lavoro);
   - **Allegato C**: proprietà intellettuale preesistente (codice, marchi, domini, account);
   - **Allegato D**: eventuali prestiti dei soci;
   - **Allegato F**: procure, soglie bancarie, soglie straordinarie, opzione non concorrenza;
   - **Allegato G**: ruoli (vuoto alla firma).
3. Far verificare il testo da un **avvocato/notaio svizzero** specializzato in diritto societario. Punti da chiedere esplicitamente:
   - responsabilità personale, illimitata e solidale della SNC;
   - validità/opponibilità della firma collettiva e delle procure;
   - clausola di non concorrenza post-uscita;
   - proprietà intellettuale e licenze;
   - conseguenze fiscali, sociali e previdenziali;
   - procedura di iscrizione e, in futuro, trasformazione LFus.
4. Verificare presso l'**Ufficio del registro di commercio del Cantone Ticino**:
   - formulari richiesti;
   - firme autenticate;
   - documenti d'identità;
   - eventuale attestazione del domicilio/sede.
5. Firmare due originali e iscrivere la SNC.

### Dopo la firma
- Conto bancario a nome della SNC, doppia firma.
- Contabilità, assicurazioni, previdenza.
- Registro IP/account, password manager, 2FA.
- Verbali e registro decisioni.
- Eventuale **Accordo tra fondatori** in versione pulita: la demo ha il Doc 02, ma non è ancora stato esportato in PDF/DOCX. È il prossimo documento consigliato se vogliono regolare leaver, ROFR, deadlock e ruoli in modo più dettagliato.

---

## 3. Come riprendere il lavoro

### Modificare il contratto
Il file sorgente è `firma/01-CONTRATTO-SOCIALE-SNC.md`. Dopo le modifiche:

```powershell
node tools/make_contract_html.js
# PDF (Edge):
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="firma\01-CONTRATTO-SOCIALE-SNC.pdf" "file:///C:/Users/jzl561/.cache/opencode/webdev-innovations/firma/01-CONTRATTO-SOCIALE-SNC.html"
# DOCX:
python -m pip install --target "$env:TEMP\pydeps" python-docx
$env:PYTHONPATH="$env:TEMP\pydeps"; python tools/make_contract_docx.py
```

Se `tools/` non fosse presente, i documenti PDF/DOCX già generati sono validi; per rigenerarli basta ricreare gli script o usare Word/Google Docs dal Markdown.

### Modificare la demo
- Contenuti e decisioni: `assets/js/data.js`.
- Documenti demo: `assets/js/doc-*.js`.
- Simulatore: `assets/js/simulator.js`.
- Stili: `assets/css/styles.css` + `assets/css/extras.css`.
- Router: `assets/js/app.js`.
- Avvio: `start.cmd`.

### Test rapido demo
```powershell
node server.mjs
# poi aprire http://localhost:4173
```
Tutte le rotte sono state testate; nessun errore JS rilevato in console headless.

---

## 4. Punti aperti / rischi

1. **Responsabilità SNC**: il contratto non può limitarla verso i creditori. È il rischio principale; da spiegare bene a Nicola e Bryan.
2. **Allegato C**: se resta vuoto e usano codice preesistente, quel codice non è conferito né licenziato. Da compilare.
3. **Firma collettiva**: è prudente ma può rallentare. Le procure dell'Allegato F sono lo strumento per l'ordinario.
4. **Non concorrenza**: l'opzione è nel contratto, ma va verificata e proporzionata; senza sottoscrizione non si applica.
5. **Trasformazione**: non è automatica; richiede LFus, atto pubblico, iscrizione. Non usare il sito come se fosse già una Sagl.
6. **Ruoli**: non assegnati. Se vogliono CEO/CTO, serve un documento separato con poteri e compensi.
7. **Demo**: il testo del Doc 01 nel sito è ancora la versione "demo" con avvertenze; la versione pulita è in `firma/`. Non confonderle.
8. **Consulenza**: nessun documento è consulenza legale. La revisione professionale è obbligatoria prima della firma.

---

## 5. Contesto tecnico

- Windows, Node 22, Edge 157.
- Python 3.10 con `python-docx`, `pypdf`, `pymupdf` installati in `%TEMP%\pydeps` durante la sessione (possono sparire al riavvio).
- Font locali: Instrument Sans + Newsreader (OFL) in `assets/fonts/`.
- Nessun database, nessuna API, nessun dato personale oltre ai nomi dei fondatori.
- Il server statico è in `server.mjs`, senza dipendenze.

---

**Prossima azione consigliata:** aprire `firma/00-SCHEDA-DATI-E-SCELTE.md`, compilarla con Bryan, riportare i dati nel contratto e prenotare la revisione legale. Il PDF è già impaginato e stampabile.
