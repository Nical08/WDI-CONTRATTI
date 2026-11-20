/* ============================================================
   Viste core — panoramica, percorso, registro decisioni.
   Frammenti HTML puri; il montaggio avviene in app.js.
   ============================================================ */
(function () {
  "use strict";

  window.WDI = window.WDI || {};
  window.WDI.views = window.WDI.views || {};
  window.WDI.views.mount = window.WDI.views.mount || {};

  const W = window.WDI;
  const U = W.ui;

  /* ---------- piccoli compositori locali ---------- */

  function architectureRow(num, name, note, capital, liability, current) {
    return `<div class="architecture-row${current ? " is-current" : ""}">` +
      `<span class="arch-num">${U.esc(num)}</span>` +
      `<span class="arch-name"><b>${U.esc(name)}</b><small>${U.esc(note)}</small></span>` +
      `<span class="arch-meta"><b>${U.esc(capital)}</b><br>${U.esc(liability)}</span>` +
      `</div>`;
  }

  function factCard(kicker, title, body, note) {
    return `<article class="card card-tight">` +
      `<p class="card-kicker">${U.esc(kicker)}</p>` +
      `<h3>${U.esc(title)}</h3>` +
      `<p class="small muted mt-1">${body}</p>` +
      (note ? `<p class="tiny muted mt-1">${note}</p>` : "") +
      `</article>`;
  }

  function numberedItem(title, body) {
    return `<div class="numbered-item"><div>` +
      `<h4>${U.esc(title)}</h4>` +
      `<p>${body}</p>` +
      `</div></div>`;
  }

  function optionCard(kicker, title, statusKey, statusLabel, body) {
    return `<article class="card card-tight card-hover">` +
      `<p class="card-kicker">${U.esc(kicker)}</p>` +
      `<div class="row-between gap-1 mt-2"><h3>${U.esc(title)}</h3>${U.status(statusKey, statusLabel)}</div>` +
      `<p class="small muted mt-1">${body}</p>` +
      `</article>`;
  }

  function gateItem(num, title, statusKey, statusLabel, body) {
    return `<div class="gate">` +
      `<div class="gate-num">${U.esc(num)}</div>` +
      `<div>` +
      `<div class="row-between gap-1"><h4>${U.esc(title)}</h4>${U.status(statusKey, statusLabel)}</div>` +
      `<p>${body}</p>` +
      `</div></div>`;
  }

  function timelineItem(tone, tag, title, statusKey, statusLabel, body) {
    return `<div class="timeline-item ${tone}">` +
      `<div class="timeline-tag">${U.esc(tag)}</div>` +
      `<div class="row-between gap-1"><h4>${U.esc(title)}</h4>${U.status(statusKey, statusLabel)}</div>` +
      `<p>${body}</p>` +
      `</div>`;
  }

  /* ============================================================
     1. Panoramica
     ============================================================ */

  W.views.home = function () {
    const stats = (W.STATS || []).map((s) =>
      `<div class="stat"><b>${U.esc(s.value)}</b><span>${U.esc(s.label)}</span>` +
      (s.note ? `<small>${U.esc(s.note)}</small>` : "") +
      `</div>`
    ).join("");

    const facts = [
      factCard(
        "Partecipazione",
        "50/50",
        "La parità economica è l'intesa di progetto. Non è ancora una clausola firmata: va scritta nel contratto e distinta dai compensi per il lavoro.",
        "La SNC non ha quote o azioni: la partecipazione è contrattuale."
      ),
      factCard(
        "Sede",
        "Ticino",
        "La società ha sede in Ticino. Il Comune e l'indirizzo esatto devono essere indicati nel contratto e iscritti nel Registro di commercio.",
        "La sede può cambiare, con le formalità del caso."
      ),
      factCard(
        "Scopo",
        "Software e servizi",
        "Sviluppo software, applicazioni web, sistemi di prenotazione e servizi digitali. Lo scopo va coordinato con l'attività reale e con le autorizzazioni necessarie.",
        "Nessuna attività regolata senza l'approvazione richiesta."
      ),
      factCard(
        "Documenti",
        "7",
        "Sei bozze di documenti e un simulatore. Sono strumenti di lavoro, non documenti firmabili.",
        "01–06 più lo strumento 07."
      )
    ].join("");

    const toDecide = [
      numberedItem(
        "Ruoli e autonomia",
        "Chi fa cosa, con quali deleghe e quali limiti di spesa. Nessun titolo manageriale è assegnato nella demo. Ruoli e compensi restano separati dalla partecipazione."
      ),
      numberedItem(
        "Conferimenti",
        "Denaro, beni, strumenti, lavoro o crediti: l'Allegato A deve dire cosa entra, con quale valore e quando. La demo non inventa importi."
      ),
      numberedItem(
        "Firme e banca",
        "Firma individuale o collettiva, soglie, doppia firma e mandati bancari. Le limitazioni interne valgono verso i terzi solo nei limiti dell'iscrizione e della legge."
      ),
      numberedItem(
        "Uscite e continuità",
        "Valutazione, good/bad leaver, prelazione, deadlock, morte e incapacità. Senza una regola scritta, il valore e la continuazione finiscono nelle mani del giudice o della legge."
      )
    ].join("");

    const possibilities = [
      optionCard(
        "Fase 2",
        "Sagl come contenitore",
        "futuro",
        "Futuro",
        "Capitale minimo CHF 20'000 interamente liberato, quote sociali e responsabilità limitata. È la forma da valutare per i primi investitori, se il progetto e i conti sono ordinati."
      ),
      optionCard(
        "Controllo",
        "Voto differenziato",
        "verifica",
        "Da progettare",
        "Un voto diverso dal capitale è possibile entro i limiti di legge: rapporto massimo 10:1 nella SA, regole statutarie nella Sagl. Non produce da solo il 60% dei voti e va verificato."
      ),
      optionCard(
        "Capitale",
        "Primi investitori",
        "futuro",
        "Futuro",
        "Aumento di capitale, vendita secondaria o prestito convertibile producono effetti diversi su cassa, diluizione e voto. Nessun importo o valutazione è deciso nella demo."
      ),
      optionCard(
        "Fase 3",
        "SA per la scala",
        "futuro",
        "Futuro",
        "Capitale minimo CHF 100'000, azioni e categorie, consiglio d'amministrazione e maggioranze qualificate. Ha senso se servono davvero strumenti per investitori istituzionali."
      )
    ].join("");

    const docIds = ["snc", "founder", "internal", "sagl", "sa", "investor"];
    const docCards = docIds.map((id) => U.docCard(id)).join("");

    const simulatorCard = `<a class="doc-card" href="#/simulatore" style="grid-column: 1 / -1; min-height: 0; border-top: 2px solid var(--terracotta)">` +
      `<div class="doc-card-top"><span class="doc-card-num">07</span>${U.pill("Strumento interattivo", "status-draft")}</div>` +
      `<h3>Simulatore di diluizione</h3>` +
      `<p class="measure">Costruisci una cap table illustrativa, aggiungi round e osserva come cambiano economia, voti e ricavato. Il modello non calcola nominale, imposte, contabilità o validità delle delibere.</p>` +
      `<div class="doc-card-foot"><span>Nessun dato viene salvato</span><span class="row gap-1">Apri lo strumento ${U.icon("arrowUpRight")}</span></div>` +
      `</a>`;

    return `<div class="page">` +

      `<section class="hero" style="padding: 0 0 clamp(30px, 4vw, 48px)">` +
      `<div class="hero-inner">` +
      `<div class="hero-copy">` +
      `<span class="eyebrow">Demo di struttura societaria · Novembre 2026</span>` +
      `<h1 class="display">Una società pronta a crescere, senza confondere proprietà e controllo.</h1>` +
      `<p class="lead">La SNC è il punto di partenza. La Sagl è il contenitore della crescita. La SA è un'ipotesi di scala. Tre passaggi, non tre scorciatoie: ogni forma cambia responsabilità, capitale, voto e formalità.</p>` +
      `<div class="hero-actions">` +
      U.btn("Il percorso in tre fasi", "#/percorso", "btn-ink", "arrow") +
      U.btn("Simulatore di diluizione", "#/simulatore", "btn-ghost", "calculator") +
      U.btn("Documenti", "#/documenti", "btn-ghost", "file") +
      `</div>` +
      `<p class="hero-note">${U.icon("lock")} Materiale dimostrativo. Non è consulenza legale, fiscale o finanziaria e non è destinato alla firma.</p>` +
      `</div>` +
      `<div class="hero-art">` +
      `<div class="architecture">` +
      `<div class="architecture-head"><span>Architettura di riferimento</span><span class="tiny muted">Demo</span></div>` +
      architectureRow("01", "SNC", "Società in nome collettivo", "Nessun capitale minimo", "Responsabilità illimitata", true) +
      architectureRow("02", "Sagl", "Fase 2 · crescita", U.fmtCHF(20000), "Responsabilità limitata", false) +
      architectureRow("03", "SA", "Fase 3 · scala", U.fmtCHF(100000), "Responsabilità limitata", false) +
      `<div class="architecture-foot"><span>Proprietà e controllo</span><span><b>Due livelli distinti</b></span></div>` +
      `</div>` +
      `</div>` +
      `</div>` +
      `</section>` +

      `<div class="stat-strip">${stats}</div>` +

      `<section class="section">` +
      `<div class="principle">` +
      `<div class="principle-label">Principio guida</div>` +
      `<blockquote>La proprietà si scrive nelle quote. Il controllo si costruisce con lo statuto, i patti e le maggioranze. La crescita si finanzia senza confondere le due cose.</blockquote>` +
      `</div>` +
      `</section>` +

      `<section class="section">` +
      U.sectionHead(
        "01", "Stato condiviso", "Cosa è già chiaro",
        "Le basi su cui la demo costruisce il resto. Sono punti di partenza, non clausole già firmate.",
        U.btn("Apri il registro", "#/decisioni", "btn-ghost", "arrow")
      ) +
      `<div class="grid-4">${facts}</div>` +
      `</section>` +

      `<section class="section">` +
      U.sectionHead(
        "02", "Punti aperti", "Cosa va ancora deciso",
        "Quattro famiglie di scelte che precedono qualsiasi trasformazione. Ognuna ha un referente, un momento e uno stato nel registro.",
        U.btn("Tutte le decisioni", "#/decisioni", "btn-ghost", "arrow")
      ) +
      `<div class="grid-2">` +
      `<div class="card"><div class="numbered-list">${toDecide}</div></div>` +
      `<div class="stack">` +
      U.callout(
        "decision", "Nessun ruolo assegnato",
        "<p>La demo non nomina CEO, CTO o altri titoli. Nicola e Bryan sono i due soci; firme e ruoli operativi saranno definiti in un documento separato, con deleghe e limiti scritti.</p>"
      ) +
      U.callout(
        "warning", "Prima di firmare",
        "<p>Contratto sociale, accordo fondatori e regolamento devono raccontare la stessa cosa. Una clausola interna non può eliminare la responsabilità personale e solidale verso i creditori della SNC.</p>"
      ) +
      `</div>` +
      `</div>` +
      `</section>` +

      `<section class="section">` +
      U.sectionHead(
        "03", "Spazio di progetto", "Cosa è possibile",
        "Le opzioni che la demo esplora senza darle per decise. Ogni passaggio richiede una scelta, una verifica e le formalità applicabili.",
        U.btn("Il percorso", "#/percorso", "btn-ghost", "arrow")
      ) +
      `<div class="grid-2">${possibilities}</div>` +
      `</section>` +

      `<section class="section">` +
      U.sectionHead(
        "04", "Confini", "Cosa non è automatico",
        "Tre punti che una struttura societaria non risolve da sola. Vanno progettati, documentati e verificati prima della firma.",
        U.btn("Fonti e metodo", "#/fonti", "btn-ghost", "scale")
      ) +
      `<div class="grid-3">` +
      U.callout(
        "legal", "La trasformazione segue la LFus",
        "<p>Non basta una modifica del contratto: servono progetto, rapporto, verifica, decisione, atto pubblico e iscrizione. La società continua, ma forma, statuto e partecipazioni cambiano.</p>"
      ) +
      U.callout(
        "warning", "Il 60% dei voti non è garantito",
        "<p>Il 50/50 economico non attribuisce una maggioranza. Un tetto o un voto privilegiato vanno costruiti e devono rispettare i limiti di legge; per le materie dell'art. 704 servono i due terzi dei voti e la maggioranza del nominale.</p>"
      ) +
      U.callout(
        "verify", "I diritti speciali non si trasferiscono da soli",
        "<p>Veto, informazioni, board e protezioni non passano automaticamente da una forma all'altra. Nella Sagl il veto è personale e non trasferibile; nella SA non esiste un veto statutario generale.</p>"
      ) +
      `</div>` +
      `</section>` +

      `<section class="section">` +
      U.sectionHead(
        "05", "Documenti", "Le bozze di lavoro",
        "Sei documenti per il lavoro societario e un simulatore per capire la diluizione. Ogni documento ha un confine dichiarato: non è firmabile senza verifica.",
        U.btn("Apri l'indice", "#/documenti", "btn-ghost", "file")
      ) +
      `<div class="doc-grid">${docCards}${simulatorCard}</div>` +
      `<div class="row gap-1 mt-3">` +
      U.btn("Registro delle decisioni", "#/decisioni", "btn-soft", "arrow") +
      U.btn("Fonti e metodo", "#/fonti", "btn-ghost", "scale") +
      `</div>` +
      `</section>` +

      U.callout(
        "warning", "Demo, non consulenza legale",
        `<p>${U.esc(W.META.disclaimer)}</p>` +
        `<p>I documenti sono bozze di lavoro e i dati sono ipotesi della demo. Nessuna pagina, nessun importo e nessuna clausola possono essere usati come offerta, verbale o parere professionale.</p>`
      ) +

      `</div>`;
  };

  /* ============================================================
     2. Percorso
     ============================================================ */

  W.views.roadmap = function () {
    const phases = (W.PHASES || []).map((p) => U.phaseCard(p)).join("");

    const gates = [
      gateItem(
        "01", "Patto fondatori", "aperta", "Da fare",
        "Ruoli, conferimenti, uscite, deadlock, proprietà intellettuale e protezione individuale. Va chiuso prima di cambiare forma: la trasformazione non ripara un accordo mancante."
      ),
      gateItem(
        "02", "Contabilità e pulizia IP", "aperta", "Da fare",
        "Conti separati, codice, domini, repository, cloud e account intestati alla società. Materiali preesistenti e componenti open source vanno inventariati e documentati."
      ),
      gateItem(
        "03", "Decisione di trasformazione", "verifica", "Da verificare",
        "I soci decidono secondo la LFus. Nella SNC serve l'unanimità, salvo una regola del contratto sociale che ammetta i tre quarti. Non è una conseguenza automatica della crescita."
      ),
      gateItem(
        "04", "Progetto e rapporto LFus", "verifica", "Da verificare",
        "Il progetto descrive forma, statuto, partecipazioni ed effetti. Il rapporto spiega e giustifica la trasformazione (art. 61). La verifica spetta a un revisore abilitato, con le possibili deroghe PMI (art. 62)."
      ),
      gateItem(
        "05", "Atto pubblico e iscrizione", "verifica", "Da verificare",
        "La decisione richiede atto pubblico (art. 65) ed è efficace con l'iscrizione al Registro di commercio (art. 67). Finché manca l'iscrizione, la nuova forma non è operativa."
      ),
      gateItem(
        "06", "Adattamento degli statuti", "verifica", "Da verificare",
        "Statuto Sagl con quote, voto, veto e gerenti; poi statuto SA con azioni, categorie, consiglio e maggioranze. I diritti dei soci vanno salvaguardati o indennizzati (art. 56 LFus)."
      )
    ].join("");

    const comparison = U.table(
      ["Dimensione", "SNC", "Sagl", "SA"],
      [
        [
          "<strong>Responsabilità</strong>",
          "Personale, illimitata e solidale dei soci. Nessun patto interno la esclude verso i terzi.",
          "Limitata al patrimonio sociale.",
          "Limitata al patrimonio sociale."
        ],
        [
          "<strong>Capitale</strong>",
          "Nessun capitale minimo legale.",
          "Minimo CHF 20'000, interamente liberato.",
          "Minimo CHF 100'000; 20% per azione e almeno CHF 50'000 liberati."
        ],
        [
          "<strong>Partecipazioni</strong>",
          "Partecipazione contrattuale; non ci sono quote né azioni.",
          "Quote sociali con valore nominale.",
          "Azioni, anche di categorie diverse."
        ],
        [
          "<strong>Voto</strong>",
          "Regole del contratto sociale; di regola unanimità.",
          "Proporzionale, una quota = un voto o tetto statutario; veto personale ex art. 807.",
          "Proporzionale, con voto privilegiato nei limiti dell'art. 693; nessun veto statutario generale."
        ],
        [
          "<strong>Organi</strong>",
          "Soci; eventuali gerenti.",
          "Assemblea dei soci; gerenti.",
          "Assemblea generale; consiglio d'amministrazione."
        ],
        [
          "<strong>Maggioranze</strong>",
          "Unanimità, salvo diversa regola contrattuale.",
          "Maggioranza assoluta, salvo statuto; materie riservate.",
          "Maggioranza dei voti; due terzi più maggioranza del nominale per le materie dell'art. 704."
        ],
        [
          "<strong>Informazione</strong>",
          "Consultazione dei libri e dei documenti secondo legge e contratto.",
          "Ogni socio può chiedere ragguagli ai gerenti (art. 802).",
          "Assemblea e, per il 10% del capitale o dei voti, richiesta scritta (art. 697)."
        ],
        [
          "<strong>Trasferimenti</strong>",
          "Consenso degli altri soci (art. 542 richiamato dall'art. 557).",
          "Forma scritta e approvazione dell'assemblea, salvo statuto (artt. 785–786).",
          "Restrizioni statutarie e approvazione (artt. 685a–685c)."
        ]
      ],
      { cls: "table-compact", note: "Sintesi della demo. Le norme sono richiamate in forma abbreviata: fanno fede il testo consolidato e il parere di un professionista." }
    ).replace('<table class="table-compact">', '<table class="table-compact" style="min-width: 760px">');

    const timeline = [
      timelineItem(
        "is-done", "Oggi",
        "Impostazione condivisa", "definito", "Fatto nella demo",
        "Partecipazione 50/50, sede in Ticino, scopo tecnologico e sette documenti di lavoro. È un punto di partenza condiviso, non un contratto firmato."
      ),
      timelineItem(
        "is-now", "Prossimi 12 mesi",
        "Basi SNC complete e verificabili", "aperta", "Da fare",
        "Completare contratto, accordo fondatori, regolamento, conferimenti, ruoli, firme, proprietà intellettuale e conti. Decidere se e quando la Sagl è utile, con una verifica legale e fiscale."
      ),
      timelineItem(
        "is-now", "Fase investitori",
        "Sagl operativa e primo round", "verifica", "Da verificare",
        "Progettare statuto Sagl, categorie, voto e investor agreement. Ogni contatto con investitori va preparato nel rispetto della LSerFi e senza offerte improvvisate."
      ),
      timelineItem(
        "", "Scala",
        "Valutazione della SA", "verifica", "Da verificare",
        "Valutare la SA solo se servono azioni, categorie e una governance adatta a investitori istituzionali. La trasformazione resta un progetto separato, non un passaggio automatico."
      )
    ].join("");

    const checks = [
      numberedItem(
        "La decisione",
        "Verificare la maggioranza applicabile, il verbale e la firma. La delibera dei soci non è ancora l'atto pubblico."
      ),
      numberedItem(
        "I diritti",
        "Quote, diritti speciali e posizioni dei soci: salvaguardare o indennizzare, non rimandare alla firma successiva."
      ),
      numberedItem(
        "Le formalità",
        "Progetto, rapporto, verifica, atto pubblico e iscrizione. L'efficacia arriva con l'iscrizione nel Registro di commercio."
      ),
      numberedItem(
        "Gli effetti collaterali",
        "Fisco, contabilità, previdenza, creditori e contratti in corso. Da valutare prima della decisione, non dopo."
      )
    ].join("");

    const references = ["LFus 53–67", "LFus art. 56", "LFus art. 64", "LFus art. 65", "LFus art. 67"]
      .map((r) => `<span class="chip">${U.esc(r)}</span>`)
      .join("");

    return `<div class="page">` +

      `<header class="mb-3">` +
      `<span class="eyebrow">Percorso societario · demo novembre 2026</span>` +
      `<h1 class="page-title mt-2">Da SNC a SA, un passaggio alla volta.</h1>` +
      `<p class="lead measure-wide mt-2">La forma giuridica non cambia con una firma sola. Ogni passaggio ha presupposti, documenti e formalità. Questa pagina separa le tre fasi, le porte che le collegano e ciò che resta da verificare.</p>` +
      `<div class="row gap-1 mt-3">` +
      U.btn("Documenti", "#/documenti", "btn-ghost", "file") +
      U.btn("Registro decisioni", "#/decisioni", "btn-ink", "arrow") +
      U.btn("Fonti e metodo", "#/fonti", "btn-ghost", "scale") +
      `</div>` +
      `</header>` +

      `<section class="section">` +
      U.sectionHead(
        "01", "Le tre fasi", "Dove siamo e dove possiamo arrivare",
        "La SNC è la fase attuale. Sagl e SA restano ipotesi di lavoro: non sono automatiche e non hanno una data fissata.",
        U.btn("Leggi come cambia la struttura", "#/decisioni", "btn-ghost", "arrow")
      ) +
      `<div class="phase-grid">${phases}</div>` +
      `<p class="mini-note mt-2">Le fasi 2 e 3 sono modelli di lavoro. Nessuna trasformazione è stata decisa, deliberata o iscritta.</p>` +
      `</section>` +

      `<section class="section">` +
      U.sectionHead(
        "02", "Sequenza", "Le porte di passaggio",
        "Sei controlli che rendono il percorso verificabile. Saltarne uno non accorcia la strada: sposta il problema più avanti.",
        U.btn("Apri il registro", "#/decisioni", "btn-ghost", "arrow")
      ) +
      `<div>${gates}</div>` +
      `</section>` +

      `<section class="section">` +
      U.sectionHead(
        "03", "Confronto", "Cosa cambia davvero",
        "Non cambia solo il nome. Cambiano responsabilità, capitale, partecipazioni, voto, organi e formalità.",
        U.btn("Simulatore", "#/simulatore", "btn-ghost", "calculator")
      ) +
      comparison +
      `</section>` +

      `<section class="section">` +
      U.sectionHead(
        "04", "Orizzonti", "Una timeline senza date inventate",
        "Quattro orizzonti di lavoro, non un calendario contrattuale. Le scadenze reali dipendono dalle decisioni, dalle verifiche e dalle formalità.",
        U.btn("Tutte le decisioni", "#/decisioni", "btn-ghost", "arrow")
      ) +
      `<div class="timeline">${timeline}</div>` +
      `<p class="mini-note mt-3">Nessuna data è una scadenza legale o un impegno tra i soci. La sequenza indica priorità, non mesi.</p>` +
      `</section>` +

      `<section class="section">` +
      U.sectionHead(
        "05", "Confine", "Non è un interruttore",
        "La trasformazione non si esaurisce in una delibera. È un procedimento con effetti giuridici, contabili e fiscali distinti.",
        U.btn("Vai alle fonti", "#/fonti", "btn-ghost", "scale")
      ) +
      `<div class="grid-2">` +
      `<div>` +
      U.callout(
        "legal", "La LFus disciplina il passaggio",
        "<p>La trasformazione non crea una società nuova: conserva i rapporti giuridici (art. 53), ma richiede un progetto e un rapporto (art. 61), una verifica (art. 62), una decisione dei soci (art. 64), un atto pubblico (art. 65) e l'iscrizione al Registro di commercio (art. 67).</p>" +
        "<p>L'art. 56 impone di salvaguardare o indennizzare i diritti dei soci. Le conseguenze fiscali, contabili e previdenziali sono un capitolo separato, da esaminare prima della firma.</p>"
      ) +
      `<div class="chip-row mt-2">${references}</div>` +
      `<p class="mini-note mt-2">Testi svizzeri consolidati al 1° ottobre 2026. La qualificazione concreta richiede un professionista.</p>` +
      `</div>` +
      `<div class="card">` +
      `<p class="card-kicker">Quattro controlli</p>` +
      `<h3>Prima di parlare di atto pubblico</h3>` +
      `<div class="numbered-list mt-2">${checks}</div>` +
      `</div>` +
      `</div>` +
      `</section>` +

      `<div class="doc-nav">` +
      U.btn("Torna alla panoramica", "#/", "btn-ghost", "chevronLeft") +
      U.btn("Registro decisioni", "#/decisioni", "btn-ghost", "arrow") +
      U.btn("Documenti", "#/documenti", "btn-ghost", "file") +
      `</div>` +
      `<div class="mt-3">` +
      U.callout(
        "warning", "Demo, non consulenza legale",
        "<p>La sequenza, le soglie e i riferimenti sono materiale illustrativo. Non sono un progetto di trasformazione né consulenza legale, fiscale o finanziaria. Ogni passo va verificato con un professionista.</p>"
      ) +
      `</div>` +

      `</div>`;
  };

  /* ============================================================
     3. Registro decisioni
     ============================================================ */

  W.views.decisions = function () {
    const decisions = W.DECISIONS || [];
    const total = decisions.length;

    const areaList = [];
    decisions.forEach((d) => {
      if (areaList.indexOf(d.area) === -1) areaList.push(d.area);
    });

    const counts = {};
    decisions.forEach((d) => {
      counts[d.status] = (counts[d.status] || 0) + 1;
    });

    const summaryOrder = ["definito", "proposta", "aperta", "verifica", "esempio", "futuro"];
    const summary = summaryOrder.map((key) => {
      const meta = (W.STATUS && W.STATUS[key]) || { label: key };
      return `<div class="kpi"><b>${counts[key] || 0}</b><span>${U.esc(meta.label)}</span></div>`;
    }).join("");

    const statusFilters = [
      { key: "all", label: "Tutte" },
      { key: "aperta", label: "Da decidere" },
      { key: "verifica", label: "Verifica legale" },
      { key: "proposta", label: "Proposte" },
      { key: "definito", label: "Definite" },
      { key: "esempio", label: "Esempi" },
      { key: "futuro", label: "Futuro" }
    ].map((f) =>
      `<button type="button" class="filter-btn${f.key === "all" ? " is-active" : ""}" ` +
      `data-decision-status="${U.esc(f.key)}" aria-pressed="${f.key === "all" ? "true" : "false"}">${U.esc(f.label)}</button>`
    ).join("");

    const areaFilters = `<button type="button" class="filter-btn is-active" data-decision-area="all" aria-pressed="true">Tutte le aree</button>` +
      areaList.map((area) =>
        `<button type="button" class="filter-btn" data-decision-area="${U.esc(area)}" aria-pressed="false">${U.esc(area)}</button>`
      ).join("");

    const rows = decisions.map((d) => {
      const statusLabel = (W.STATUS && W.STATUS[d.status] && W.STATUS[d.status].label) || d.status;
      return `<tr data-status="${U.esc(d.status)}" data-area="${U.esc(d.area)}">` +
        `<td class="ledger-area">${U.esc(d.area)}</td>` +
        `<td><strong>${U.esc(d.title)}</strong><br><span class="small muted">${U.esc(d.detail)}</span></td>` +
        `<td>${U.esc(d.owner)}</td>` +
        `<td>${U.esc(d.when)}</td>` +
        `<td>${U.status(d.status, statusLabel)}</td>` +
        `</tr>`;
    }).join("");

    const docs = [
      { label: "01 · Contratto sociale", href: "#/documenti/snc" },
      { label: "02 · Accordo tra fondatori", href: "#/documenti/founder" },
      { label: "03 · Regolamento interno", href: "#/documenti/internal" },
      { label: "04 · Statuto Sagl", href: "#/documenti/sagl" },
      { label: "06 · Investor Agreement", href: "#/documenti/investor" }
    ].map((d) => U.btn(d.label, d.href, "btn-soft btn-sm", "file")).join("");

    return `<div class="page">` +

      `<header class="mb-3">` +
      `<span class="eyebrow">Registro di lavoro · demo novembre 2026</span>` +
      `<h1 class="page-title mt-2">Decisioni aperte, una per riga.</h1>` +
      `<p class="lead measure-wide mt-2">${total} voci e ${areaList.length} aree. Il registro mostra cosa è deciso, cosa è solo proposto e cosa richiede una verifica prima della firma. Non assegna ruoli e non sostituisce un verbale.</p>` +
      `<div class="row gap-1 mt-3">` +
      U.btn("Panoramica", "#/", "btn-ghost", "chevronLeft") +
      U.btn("Il percorso", "#/percorso", "btn-ghost", "arrow") +
      U.btn("Documenti", "#/documenti", "btn-ghost", "file") +
      `</div>` +
      `</header>` +

      `<div id="decisions-registry">` +

      `<section class="section" style="padding-top: 0">` +
      U.sectionHead(
        "01", "Sintesi", "Lo stato del registro",
        "Conteggi calcolati sulle voci della demo. Non sono percentuali di avanzamento: una voce definita non è una firma, una proposta non è un'approvazione.",
        U.btn("Fonti e metodo", "#/fonti", "btn-ghost", "scale")
      ) +
      `<div class="kpi-grid">${summary}</div>` +
      `<p class="mini-note mt-2">Totale: ${total} voci. Lo stato <strong>Futuro</strong> indica un meccanismo di fase successiva; <strong>Esempio</strong> indica un dato illustrativo, non concordato.</p>` +
      `<div class="mt-3">` +
      U.callout(
        "decision", "Perché un registro",
        "<p>Un registro non decide e non sostituisce un verbale. Serve a rendere visibili le domande, il referente, il momento in cui vanno chiuse e il livello di verifica richiesto.</p>" +
        "<p>Gli stati sono di lavoro: <strong>Definito</strong> non significa firmato, <strong>Proposta</strong> non significa approvato, <strong>Verifica legale</strong> non significa parere ricevuto.</p>"
      ) +
      `</div>` +
      `</section>` +

      `<section class="section">` +
      U.sectionHead(
        "02", "Registro", "Filtra per stato e per area",
        "I filtri agiscono sulle righe visibili. Il conteggio in alto a destra indica quante voci sono mostrate sul totale.",
        ""
      ) +

      `<div class="filter-bar">` +
      `<div><p class="card-kicker">Stato</p><div class="filters" role="group" aria-label="Filtra per stato">${statusFilters}</div></div>` +
      `<p class="ledger-count" id="decision-count" aria-live="polite">Mostrate ${total} di ${total}</p>` +
      `</div>` +
      `<div class="filter-bar"><div><p class="card-kicker">Area</p><div class="filters" role="group" aria-label="Filtra per area">${areaFilters}</div></div></div>` +

      `<div class="table-wrap">` +
      `<table class="table-compact" style="min-width: 800px" aria-label="Registro delle decisioni">` +
      `<thead><tr><th>Area</th><th>Decisione e dettaglio</th><th>Owner</th><th>Timing</th><th>Stato</th></tr></thead>` +
      `<tbody id="decision-rows">${rows}</tbody>` +
      `</table>` +
      `</div>` +
      `<div class="clause-empty mt-2" id="decision-empty" hidden>Nessuna decisione corrisponde ai filtri selezionati.</div>` +
      `</section>` +

      `<section class="section">` +
      U.sectionHead(
        "03", "Riferimenti", "Dove vengono queste voci",
        "Le decisioni nascono dai documenti di lavoro. Aprire la bozza giusta evita di discutere due volte lo stesso punto.",
        U.btn("Tutti i documenti", "#/documenti", "btn-ghost", "arrow")
      ) +
      `<div class="grid-2" style="align-items: start">` +
      `<div class="card">` +
      `<p class="card-kicker">Documenti collegati</p>` +
      `<h3>Dal registro al testo</h3>` +
      `<p class="small muted mt-1">Contratto, accordo fondatori, regolamento, statuto Sagl e investor agreement contengono le clausole da allineare alle decisioni.</p>` +
      `<div class="row gap-1 mt-2">${docs}</div>` +
      `<div class="mt-2">${U.btn("Simulatore di diluizione", "#/simulatore", "btn-ghost btn-sm", "calculator")}</div>` +
      `</div>` +
      U.callout(
        "verify", "Cambiare stato non è una formalità",
        "<p>Una voce passa a <strong>Definito</strong> solo con una decisione documentata e sottoscritta. Una voce <strong>Verifica legale</strong> richiede un parere o un riscontro professionale. Nessuna riga di questa demo è firmata.</p>"
      ) +
      `</div>` +
      `</section>` +

      `</div>` +

      U.callout(
        "warning", "Demo, non consulenza legale",
        `<p>${U.esc(W.META.disclaimer)}</p>` +
        `<p>Il registro è uno strumento illustrativo: non è un ordine del giorno, un verbale o un impegno tra i soci.</p>`
      ) +

      `</div>`;
  };

  /* ============================================================
     Montaggio del registro: filtri, conteggio, stato vuoto.
     ============================================================ */

  W.views.mount.decisions = function () {
    const root = document.getElementById("decisions-registry");
    if (!root) return;

    if (root.getAttribute("data-filters-bound") === "true") return;
    root.setAttribute("data-filters-bound", "true");

    const rows = Array.prototype.slice.call(root.querySelectorAll("tbody tr[data-status]"));
    const countEl = document.getElementById("decision-count");
    const emptyEl = document.getElementById("decision-empty");
    const statusButtons = Array.prototype.slice.call(root.querySelectorAll("[data-decision-status]"));
    const areaButtons = Array.prototype.slice.call(root.querySelectorAll("[data-decision-area]"));

    let activeStatus = "all";
    let activeArea = "all";

    function setActive(buttons, attribute, value) {
      buttons.forEach(function (button) {
        const isActive = button.getAttribute(attribute) === value;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
    }

    function applyFilters() {
      let shown = 0;

      rows.forEach(function (row) {
        const statusMatch = activeStatus === "all" || row.getAttribute("data-status") === activeStatus;
        const areaMatch = activeArea === "all" || row.getAttribute("data-area") === activeArea;
        const visible = statusMatch && areaMatch;
        row.hidden = !visible;
        if (visible) shown += 1;
      });

      if (countEl) countEl.textContent = "Mostrate " + shown + " di " + rows.length;
      if (emptyEl) emptyEl.hidden = shown !== 0;

      setActive(statusButtons, "data-decision-status", activeStatus);
      setActive(areaButtons, "data-decision-area", activeArea);
    }

    statusButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        activeStatus = button.getAttribute("data-decision-status") || "all";
        applyFilters();
      });
    });

    areaButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        activeArea = button.getAttribute("data-decision-area") || "all";
        applyFilters();
      });
    });

    applyFilters();
  };
})();
