/* Documenti, lettore dei documenti e fonti/metodo.
   Dipende da data.js, docs.js, doc-*.js, markdown.js e ui.js.
   Nessuna libreria esterna, nessun build. */
(function () {
  "use strict";

  const W = window.WDI = window.WDI || {};
  window.WDI.views = window.WDI.views || {};
  window.WDI.views.mount = window.WDI.views.mount || {};

  const DOC_ORDER = ["snc", "founder", "internal", "sagl", "sa", "investor"];
  const FEDLEX = "https://www.fedlex.admin.ch/eli/cc/27/317_321_377/it";
  const FEDLEX_LFUS = "https://www.fedlex.admin.ch/eli/cc/2004/320/it";

  function esc(value) {
    if (W.ui && W.ui.esc) return W.ui.esc(value);
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function meta(id) {
    return (W.DOC_META && W.DOC_META[id]) || null;
  }

  function doc(id) {
    const list = Array.isArray(W.DOCS) ? W.DOCS : [];
    for (let i = 0; i < list.length; i++) {
      if (list[i] && list[i].id === id) return list[i];
    }
    return null;
  }

  function fedlexFor(groupName) {
    return /fusione|LFus/i.test(String(groupName || "")) ? FEDLEX_LFUS : FEDLEX;
  }

  /* Il renderer produce testo già escapato. Lo riportiamo a testo semplice
     prima di inserirlo in un attributo o in un'etichetta. */
  function plainHeading(value) {
    return String(value || "")
      .replace(/&quot;/g, '"')
      .replace(/&gt;/g, ">")
      .replace(/&lt;/g, "<")
      .replace(/&amp;/g, "&");
  }

  /* Il titolo è già nell'intestazione della pagina: togliamo solo l'H1
     iniziale dal corpo markdown. Il download conserva il testo integrale. */
  function readerBody(body) {
    return String(body || "").replace(/\r\n?/g, "\n").replace(/^\s*#\s+[^\n]*(?:\n|$)/, "");
  }

  function docNavLink(id, kind) {
    const U = W.ui;
    const m = meta(id);
    if (!m) return "";
    const label = (kind === "prev" ? "Precedente" : "Successivo") + " · " + m.num + " " + m.title;
    const before = kind === "prev" ? U.icon("chevronLeft") : "";
    const after = kind === "next" ? U.icon("arrow") : "";
    return '<a class="btn btn-ghost btn-sm" href="#/documenti/' + esc(id) + '">' +
      before + "<span>" + esc(label) + "</span>" + after + "</a>";
  }

  function emptyDoc() {
    const U = W.ui;
    return '<div class="page is-doc">' +
      '<span class="eyebrow">Documenti</span>' +
      '<h1 class="page-title mt-2">Documento non trovato</h1>' +
      '<p class="lead mt-2">Il documento richiesto non è disponibile in questa versione della demo.</p>' +
      '<div class="clause-empty mt-3">Il collegamento può essere incompleto oppure il documento non è ancora stato caricato. Torna all\'indice per scegliere uno dei testi disponibili.</div>' +
      '<div class="doc-nav">' + U.btn("Torna ai documenti", "#/documenti", "btn-ghost", "chevronLeft") + "</div>" +
      "</div>";
  }

  function simulatorCard() {
    const U = W.ui;
    return '<a class="doc-card is-wide" href="#/simulatore">' +
      '<div class="doc-card-top"><span class="doc-card-num">07</span>' + U.pill("Strumento", "status-example") + "</div>" +
      "<h3>Cap table e simulatore</h3>" +
      "<p>Prova diluizione, aumento di capitale, vendita secondaria, prestito convertibile e peso dei voti. I numeri sono ipotesi di lavoro, non una cap table concordata.</p>" +
      '<div class="doc-card-foot"><span>Calcolo e scenari</span><span class="row gap-1">Apri ' + U.icon("calculator") + "</span></div>" +
      "</a>";
  }

  W.views.docs = function (ctx) {
    const U = W.ui;
    const cards = DOC_ORDER.map(function (id) { return U.docCard(id); }).join("");

    const guide = [
      {
        num: "01",
        href: "#/documenti/snc",
        title: "Contratto sociale SNC",
        text: "La base: soci, conferimenti, responsabilità personale, gestione, firme, uscite e continuità."
      },
      {
        num: "02",
        href: "#/documenti/founder",
        title: "Accordo tra fondatori",
        text: "Completa i rapporti interni senza modificare la responsabilità verso i terzi né le regole imperative."
      },
      {
        num: "03",
        href: "#/documenti/internal",
        title: "Regolamento interno",
        text: "Rende operative le decisioni: ruoli, soglie, riunioni, accessi, sicurezza e reportistica."
      },
      {
        num: "04",
        href: "#/documenti/sagl",
        title: "Statuto Sagl",
        text: "Il contenitore dei primi investitori: capitale, quote, categorie, voto, veto e aumenti."
      },
      {
        num: "05",
        href: "#/documenti/sa",
        title: "Statuto SA",
        text: "La struttura per la scala: azioni, categorie, organi, maggioranze e diritti degli investitori."
      },
      {
        num: "06",
        href: "#/documenti/investor",
        title: "Investor agreement",
        text: "Dopo la scelta della forma e della cap table: diritti, materie riservate, closing e verifica LSerFi."
      },
      {
        num: "07",
        href: "#/simulatore",
        title: "Cap table e simulatore",
        text: "Prima di negoziare: prova diluizione, voti e controllo con ipotesi dichiarate e modificabili."
      }
    ].map(function (step) {
      return '<div class="gate"><span class="gate-num">' + esc(step.num) + '</span><div><h4><a href="' + esc(step.href) + '">' + esc(step.title) + "</a></h4>" +
        '<p>' + esc(step.text) + "</p></div></div>";
    }).join("");

    const formalities = {
      snc: ["Forma scritta; sottoscrizioni dei soci", "Iscrizione al Registro di commercio", "Diritto societario, responsabilità, rappresentanza"],
      founder: ["Accordo scritto interno", "Non iscritto", "Coerenza con il contratto sociale e le norme imperative"],
      internal: ["Regolamento scritto interno", "Non iscritto", "Ruoli, deleghe, firme, protezione dei dati"],
      sagl: ["Atto pubblico", "Iscrizione al Registro di commercio", "Costituzione o trasformazione, LFus, statuto"],
      sa: ["Atto pubblico", "Iscrizione al Registro di commercio", "Trasformazione LFus, categorie, voto, organi"],
      investor: ["Accordo negoziato e sottoscritto", "Non iscritto, salvo formalità dello strumento", "LSerFi, diritti degli investitori, coordinamento statutario"]
    };

    const rows = DOC_ORDER.map(function (id) {
      const m = meta(id);
      const f = formalities[id];
      return [
        "<strong>" + esc(m.num + " · " + m.title) + '</strong><br><span class="tiny muted">' + esc(m.entity) + "</span>",
        esc(f[0]),
        esc(f[1]),
        esc(f[2])
      ];
    });
    rows.push([
      "<strong>07 · Cap table e simulatore</strong><br><span class=\"tiny muted\">Strumento di calcolo</span>",
      "Nessuna forma societaria",
      "Nessuna iscrizione",
      "Coerenza con lo statuto e la cap table"
    ]);

    return '<div class="page">' +
      '<header class="measure-wide">' +
        '<span class="eyebrow">Documenti</span>' +
        '<h1 class="page-title mt-2">Sei bozze, un simulatore, molte decisioni ancora aperte.</h1>' +
        '<p class="lead mt-2">Una raccolta di testi di lavoro per la SNC di oggi e per le forme future. Ogni documento indica cosa manca, quale formalità richiede e cosa deve ancora essere verificato.</p>' +
      "</header>" +

      '<div class="row-between mt-3">' +
        '<div class="legend-box" aria-label="Legenda degli stati">' +
          '<span class="tiny muted">Legenda</span>' +
          U.pill("Bozza", "status-draft") +
          U.pill("Modello", "status-verify") +
          U.pill("Non firmabile", "status-formal") +
        "</div>" +
        U.btn("Fonti e metodo", "#/fonti", "btn-ghost btn-sm", "book") +
      "</div>" +

      U.callout("warning", "Nessun documento è pronto per la firma",
        "<p>I testi sono bozze, modelli o strumenti di lavoro. Mancano dati, decisioni e verifiche professionali. Non usare queste pagine per firmare, iscrivere o sollecitare investimenti.</p>") +

      '<section class="section">' +
        U.sectionHead("01", "Percorso", "Da dove iniziare",
          "L'ordine segue il lavoro, non una gerarchia di importanza. Ogni passaggio presuppone che il precedente sia stato discusso e verificato.") +
        '<div class="card card-flat">' + guide + "</div>" +
      "</section>" +

      '<section class="section">' +
        U.sectionHead("02", "Documenti", "Le sei bozze e lo strumento",
          "Aprire un documento per leggerlo, scaricarlo o stamparlo. Le schede riprendono lo stato dichiarato nei metadati.") +
        '<div class="doc-grid">' + cards + simulatorCard() + "</div>" +
        '<p class="mini-note mt-2">Nessuna data di firma è indicata: le bozze non sono state sottoscritte. I campi aperti e le verifiche restano da completare.</p>' +
      "</section>" +

      '<section class="section">' +
        U.sectionHead("03", "Formalità", "Stato e formalità",
          "Che cosa è, che forma richiede e che tipo di verifica presuppone. La tabella descrive il lavoro necessario, non un adempimento già eseguito.") +
        U.table(
          ["Documento", "Forma", "Iscrizione / atto pubblico", "Verifica richiesta"],
          rows,
          { cls: "table-compact", note: "Le formalità dipendono dalla forma giuridica, dal cantone e dall'operazione concreta. Vanno confermate con un notaio o un professionista svizzero." }
        ) +
      "</section>" +
      "</div>";
  };

  W.views.doc = function (ctx) {
    const U = W.ui;
    const id = ctx && ctx.docId;
    const m = meta(id);
    const d = doc(id);

    if (!m || !d) return emptyDoc();

    const rendered = W.markdown.render(readerBody(d.body));
    const headings = rendered.headings || [];

    const toc = headings.length ? headings.map(function (h) {
      return '<a class="' + (h.level === 3 ? "is-sub" : "") + '" href="#' + esc(h.id) + '" data-toc-target="' + esc(h.id) + '">' +
        esc(plainHeading(h.text)) + "</a>";
    }).join("") : '<p class="mini-note">Indice non disponibile.</p>';

    const metaPills = (m.meta || []).map(function (item) {
      return '<span class="chip">' + esc(item) + "</span>";
    }).join("");

    const index = DOC_ORDER.indexOf(id);
    const prev = index > 0 ? DOC_ORDER[index - 1] : null;
    const next = index >= 0 && index < DOC_ORDER.length - 1 ? DOC_ORDER[index + 1] : null;
    const nav = (prev ? docNavLink(prev, "prev") : "") + (next ? docNavLink(next, "next") : "");

    return '<div class="page is-doc" id="doc-reader" data-doc-id="' + esc(id) + '">' +
      '<header class="doc-header">' +
        '<div class="eyebrow">Documento ' + esc(m.num) + " · " + esc(m.entity) + "</div>" +
        "<h1>" + esc(m.title) + "</h1>" +
        '<p class="subtitle">' + esc(m.subtitle) + "</p>" +
        '<div class="doc-meta">' + U.pill(m.statusLabel, m.statusCls) + metaPills + "</div>" +
        U.callout("warning", "Prima di firmare", "<p>" + esc(m.warning) + "</p>") +
        '<div class="doc-actions">' +
          '<button class="btn btn-ink" type="button" data-doc-action="download">' + U.icon("download") + "Scarica .md</button>" +
          '<button class="btn btn-ghost" type="button" data-doc-action="print">' + U.icon("print") + "Stampa</button>" +
          '<button class="btn btn-ghost" type="button" data-doc-action="copy">Copia link</button>' +
          U.btn("Torna ai documenti", "#/documenti", "btn-ghost", "chevronLeft") +
        "</div>" +
      "</header>" +

      '<div class="doc-layout">' +
        '<aside class="doc-toc" aria-label="Indice del documento">' +
          "<h4>Indice</h4>" +
          '<nav aria-label="Sezioni del documento">' + toc + "</nav>" +
          '<div class="toc-cta">' +
            '<strong class="small">Documento di lavoro</strong>' +
            "<p>Bozza dimostrativa. La verifica delle norme, delle clausole e delle formalità resta a carico di un professionista.</p>" +
            '<a class="tiny" href="#/fonti">Fonti e metodo</a>' +
          "</div>" +
        "</aside>" +
        '<article class="prose" style="min-width:0">' + rendered.html + "</article>" +
      "</div>" +

      '<footer class="doc-reader-foot">' +
        '<p class="noprint"><strong>Nota di verifica.</strong> Questo documento è una bozza dimostrativa. Prima di firmare, iscrivere o usare il testo in una negoziazione, farlo verificare da un professionista svizzero e completare tutti i campi aperti. <a href="#/fonti">Fonti e metodo</a></p>' +
        '<nav class="doc-nav noprint" aria-label="Documenti precedente e successivo">' + nav + "</nav>" +
      "</footer>" +
      "</div>";
  };

  W.views.mount.doc = function () {
    const U = W.ui;
    const root = document.getElementById("doc-reader");
    if (!root) return;

    const id = root.getAttribute("data-doc-id");
    const m = meta(id);
    const d = doc(id);
    if (!m || !d) return;

    const downloadBtn = root.querySelector('[data-doc-action="download"]');
    if (downloadBtn) {
      downloadBtn.addEventListener("click", function () {
        /* WDI.ui.download crea il Blob dal body raw e usa DOC_META.file. */
        U.download(m.file, d.body, "text/markdown;charset=utf-8");
        U.toast("Download avviato: " + m.file);
      });
    }

    const printBtn = root.querySelector('[data-doc-action="print"]');
    if (printBtn) {
      printBtn.addEventListener("click", function () {
        window.print();
      });
    }

    const copyBtn = root.querySelector('[data-doc-action="copy"]');
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        U.copyText(window.location.href).then(function (ok) {
          U.toast(ok ? "Link copiato negli appunti." : "Copia non riuscita. Copia il link dalla barra degli indirizzi.");
        });
      });
    }

    /* Smooth scroll senza cambiare l'hash: l'hash è usato dal router. */
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tocLinks = root.querySelectorAll(".doc-toc a[data-toc-target]");
    Array.prototype.forEach.call(tocLinks, function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const target = document.getElementById(link.getAttribute("data-toc-target"));
        if (!target) return;
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      });
    });
  };

  W.views.sources = function () {
    const U = W.ui;
    const laws = [
      {
        code: "CO · RS 220",
        name: "Codice delle obbligazioni",
        state: "Testo consolidato al 1° ottobre 2026",
        pill: "Consolidato",
        cls: "status-current",
        url: FEDLEX
      },
      {
        code: "LFus · RS 221.301",
        name: "Legge federale sulla fusione",
        state: "In vigore dal 1° gennaio 2023",
        pill: "In vigore",
        cls: "status-current",
        url: FEDLEX_LFUS
      },
      {
        code: "LDA · RS 231.1",
        name: "Legge sul diritto d'autore",
        state: "In vigore dal 1° luglio 2025",
        pill: "In vigore",
        cls: "status-current",
        url: FEDLEX
      }
    ].map(function (law) {
      return '<div class="card card-tight">' +
        '<p class="card-kicker">' + esc(law.code) + "</p>" +
        "<h3>" + esc(law.name) + "</h3>" +
        '<p class="small muted mt-1">' + esc(law.state) + "</p>" +
        '<div class="chip-row mt-2">' + U.pill(law.pill, law.cls) +
          '<a class="chip" href="' + esc(law.url) + '" target="_blank" rel="noopener">Fedlex ' + U.icon("external") + "</a>" +
        "</div></div>";
    }).join("");

    const sources = Array.isArray(W.SOURCES) ? W.SOURCES : [];
    const groups = sources.map(function (group, index) {
      const url = fedlexFor(group.group);
      const items = (group.items || []).map(function (item) {
        return '<div class="card card-tight">' + U.sourceItem(item, url) + "</div>";
      }).join("");
      return '<div class="mt-4">' +
        '<span class="section-num">Gruppo ' + String(index + 1).padStart(2, "0") + "</span>" +
        '<h3 class="section-title">' + esc(group.group) + "</h3>" +
        '<p class="small muted measure mt-1">' + esc(group.intro) + "</p>" +
        '<div class="grid-2 mt-2">' + items + "</div>" +
        "</div>";
    }).join("");

    const levels = [
      ["Norma", "Regola contenuta in una legge federale o cantonale, citata con la fonte.", "Art. 568 CO: responsabilità personale e solidale dei soci SNC."],
      ["Clausola contrattuale", "Testo che le parti possono sottoscrivere, nei limiti della legge.", "Contratto sociale, statuto, investor agreement."],
      ["Proposta organizzativa", "Scelta operativa interna, non una norma e non una clausola firmata.", "Ruoli, soglie, matrice delle approvazioni, reportistica."],
      ["Esempio", "Dato illustrativo, non concordato e non vincolante.", "Percentuali, importi e scenari del simulatore."],
      ["Formalità", "Atto, iscrizione o adempimento esterno richiesto.", "Atto pubblico, Registro di commercio, verifica professionale."]
    ].map(function (row) {
      return row.map(function (cell, index) {
        return index === 0 ? "<strong>" + esc(cell) + "</strong>" : esc(cell);
      });
    });

    const checklist = [
      ["Responsabilità SNC", "Verificare che il contratto distingua i rapporti interni dalla responsabilità personale, illimitata e solidale verso i creditori. Nessun patto interno può eliminarla."],
      ["Conferimenti", "Elencare denaro, beni, diritti, crediti e lavoro; attribuire un valore scritto; distinguere ciò che è conferito, promesso o concesso in uso."],
      ["Firme", "Allineare poteri, procure, mandati bancari e iscrizione al Registro di commercio. Le limitazioni interne non sono sempre opponibili ai terzi."],
      ["Proprietà intellettuale", "Trasferire o licenziare espressamente codice, design, marchi, domini, contenuti e account. Verificare open source, contributi dei collaboratori e diritti morali."],
      ["Uscite", "Definire preavviso, valutazione, pagamento, leaver e continuità. Rispettare i limiti di legge su recesso, esclusione e indennità."],
      ["Trasformazione LFus", "Preparare progetto, rapporto, verifica, decisione, atto pubblico e iscrizione. Salvaguardare i diritti dei soci e informare i creditori nei limiti di legge."],
      ["Statuti", "Verificare capitale, quote o azioni, categorie, voto, veto, maggioranze, organi e trasferimenti con un notaio."],
      ["Diritti degli investitori", "Coordinare informazione, materie riservate, anti-dilution, liquidazione, tag/drag, advisory board e condizioni di closing."],
      ["LSerFi", "Verificare se l'offerta richiede un prospetto o rientra in un'esenzione; documentare destinatari, sollecitazione e canali."],
      ["Tasse", "Verificare imposte sul reddito e sul patrimonio, imposta preventiva, imposte di transazione e conseguenze fiscali della trasformazione."],
      ["Previdenza", "Verificare AVS, LPP, infortuni, imposte alla fonte e trattamento dei compensi dei soci e dei collaboratori."]
    ].map(function (item) {
      return '<div class="numbered-item"><div><h4>' + esc(item[0]) + "</h4><p>" + esc(item[1]) + "</p></div></div>";
    }).join("");

    const glossary = Array.isArray(W.GLOSSARY) ? W.GLOSSARY : [];
    const glossaryItems = glossary.map(function (entry) {
      return '<div class="card card-tight">' +
        "<dt><strong>" + esc(entry.term) + "</strong></dt>" +
        '<dd class="small muted" style="margin:6px 0 0">' + esc(entry.def) + "</dd>" +
        "</div>";
    }).join("");

    return '<div class="page">' +
      '<header class="measure-wide">' +
        '<span class="eyebrow">Fonti e metodo</span>' +
        '<h1 class="page-title mt-2">Le regole sono scritte. Il resto è una scelta da documentare.</h1>' +
        '<p class="lead mt-2">Norme, clausole e proposte non stanno sullo stesso piano. Questa pagina indica da dove viene ogni affermazione, cosa resta da verificare e come si aggiorna la demo.</p>' +
        '<div class="hero-actions">' +
          U.btn("Apri i documenti", "#/documenti", "btn-ghost btn-sm", "file") +
          U.btn("Prova il simulatore", "#/simulatore", "btn-ghost btn-sm", "calculator") +
          U.btn("Biblioteca clausole", "#/clausole", "btn-ghost btn-sm", "book") +
        "</div>" +
      "</header>" +

      '<section class="section">' +
        U.sectionHead("01", "Quadro", "Stato di verifica",
          "Le date qui sotto indicano lo stato dei testi citati nella demo. Non sostituiscono la verifica puntuale di ogni articolo.") +
        '<div class="grid-3">' + laws + "</div>" +
        '<p class="mini-note mt-2">Prima di usare una norma in una clausola o in una decisione, controllare il testo ufficiale e la versione applicabile al caso concreto.</p>' +
      "</section>" +

      '<section class="section">' +
        U.sectionHead("02", "Fonti", "Le fonti, gruppo per gruppo",
          "Ogni articolo è collegato al testo ufficiale. La nota spiega perché è citato nella demo, non sostituisce la norma.") +
        groups +
      "</section>" +

      '<section class="section">' +
        U.sectionHead("03", "Metodo", "Come leggere la demo",
          "La stessa frase può cambiare livello. Una norma non diventa una clausola finché non è recepita, discussa e verificata.") +
        U.table(
          ["Livello", "Cosa significa", "Esempio"],
          levels,
          { cls: "table-compact", note: "Le proposte organizzative e gli esempi non sono vincolanti. Le clausole richiedono sottoscrizione e, dove previsto, una formalità esterna." }
        ) +
      "</section>" +

      '<section class="section">' +
        U.sectionHead("04", "Controlli", "Checklist prima della firma",
          "Undici punti da verificare prima di trasformare una bozza in un atto. Non è una checklist automatica: ogni voce richiede documenti e un parere professionale.") +
        '<div class="numbered-list">' + checklist + "</div>" +
      "</section>" +

      '<section class="section">' +
        U.sectionHead("05", "Lessico", "Glossario",
          "Le parole tecniche usate nei documenti e nel simulatore, con il significato adottato nella demo.") +
        '<dl class="grid-2 mt-0 mb-0">' + glossaryItems + "</dl>" +
      "</section>" +

      '<section class="section">' +
        U.sectionHead("06", "Limiti", "Disclaimer",
          "Il perimetro della demo è volutamente ristretto: mostrare problemi e opzioni, non fornire soluzioni pronte.") +
        U.callout("warning", "Non consulenza e non firmabile",
          "<p><strong>Questa demo non è consulenza legale, fiscale o finanziaria.</strong> Non sostituisce il parere di un professionista svizzero abilitato e non è destinata alla firma.</p>" +
          "<p>Nessun documento è pronto per la firma. Testi, importi, percentuali, dichiarazioni e formalità devono essere verificati prima di qualsiasi decisione, iscrizione, offerta o closing.</p>" +
          "<p>Le norme cambiano e i casi concreti hanno dettagli che una demo non può coprire. La responsabilità delle scelte resta dei fondatori e dei loro consulenti.</p>") +
      "</section>" +

      '<section class="section">' +
        U.sectionHead("07", "Manutenzione", "Come aggiornare la demo",
          "Il sito è statico: si modificano i file e si ricarica il browser. Non serve una build.") +
        '<div class="card card-flat"><div class="numbered-list">' +
          '<div class="numbered-item"><div><h4>Dati e fonti</h4><p>Modificare <span class="mono">data.js</span> per stati, decisioni, fonti, glossario e testi delle sezioni. Non inserire una fonte senza titolo, argomento e nota.</p></div></div>' +
          '<div class="numbered-item"><div><h4>Indice e metadati</h4><p>Modificare <span class="mono">docs.js</span> per numero, titolo, entità, sottotitolo, stato, file e avvertenza di ogni documento.</p></div></div>' +
          '<div class="numbered-item"><div><h4>Testi dei documenti</h4><p>Aggiungere o modificare un file <span class="mono">doc-*.js</span> per ogni documento. Il file deve fare <span class="mono">WDI.DOCS.push({ id, body })</span> con lo stesso id dei metadati.</p></div></div>' +
          '<div class="numbered-item"><div><h4>Simulatore</h4><p>La logica di cap table, diluizione e voto è in <span class="mono">simulator.js</span>. Preset, calcoli e persistenza locale vanno verificati dopo ogni modifica.</p></div></div>' +
          '<div class="numbered-item"><div><h4>Caricamento</h4><p>Se si aggiunge un file, includerlo in <span class="mono">index.html</span> prima delle viste. Nessun passaggio di compilazione è richiesto.</p></div></div>' +
        "</div></div>" +
        '<div class="row mt-3">' +
          U.btn("Apri i documenti", "#/documenti", "btn-ink", "file") +
          U.btn("Prova il simulatore", "#/simulatore", "btn-ghost", "calculator") +
          U.btn("Biblioteca clausole", "#/clausole", "btn-ghost", "book") +
        "</div>" +
      "</section>" +
      "</div>";
  };
})();
