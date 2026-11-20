/* Indice dei documenti. I contenuti sono in file separati, uno per documento. */
(function () {
  "use strict";
  window.WDI = window.WDI || {};
  window.WDI.DOCS = [];

  window.WDI.DOC_META = {
    snc: {
      id: "snc", num: "01", title: "Contratto sociale",
      entity: "WebDev Innovations SNC",
      subtitle: "La base giuridica della società attuale",
      summary: "Partecipazione 50/50, conferimenti, responsabilità personale, gestione, firme, uscite e continuità. Il documento che deve essere iscritto e aggiornato.",
      statusLabel: "Bozza di lavoro", statusCls: "status-draft",
      file: "01-contratto-sociale-snc.md",
      meta: ["Situazione attuale", "Forma scritta", "Iscrizione al Registro di commercio"],
      warning: "Bozza dimostrativa. Non firmare senza verifica di un professionista svizzero e senza aver completato i campi [●]."
    },
    founder: {
      id: "founder", num: "02", title: "Accordo tra fondatori",
      entity: "Nicola Cappelli · Bryan Ciaponi",
      subtitle: "Il patto che sta accanto al contratto sociale",
      summary: "Ruoli futuri, decisioni, finanziamenti, proprietà intellettuale, leaver, prelazione, deadlock e protezione individuale dei due fondatori.",
      statusLabel: "Bozza di lavoro", statusCls: "status-draft",
      file: "02-accordo-tra-fondatori.md",
      meta: ["Accordo interno", "Non iscritto", "Complementare alla SNC"],
      warning: "Bozza dimostrativa. L'accordo non può modificare la responsabilità verso i terzi né sostituire le regole societarie imperative."
    },
    internal: {
      id: "internal", num: "03", title: "Regolamento interno",
      entity: "WebDev Innovations SNC",
      subtitle: "Il manuale operativo da completare",
      summary: "Matrice dei ruoli e delle approvazioni, riunioni, firme, spese, accessi, sicurezza, reportistica e continuità. Ruoli lasciati volutamente vuoti.",
      statusLabel: "Modello da completare", statusCls: "status-verify",
      file: "03-regolamento-interno.md",
      meta: ["Documento interno", "Ruoli da definire", "Aggiornabile"],
      warning: "Modello dimostrativo. Le tabelle dei ruoli e delle soglie sono vuote: devono essere compilate e sottoscritte dai fondatori."
    },
    sagl: {
      id: "sagl", num: "04", title: "Statuto futuro Sagl",
      entity: "WebDev Innovations Sagl",
      subtitle: "Il contenitore dei primi investitori",
      summary: "Capitale minimo, quote, categorie progettuali A/B, voto, veto, gerenti, aumenti di capitale, trasferimenti e trasformazione in SA.",
      statusLabel: "Modello progettuale", statusCls: "status-verify",
      file: "04-statuto-sagl.md",
      meta: ["Non valido", "Non firmabile", "Atto pubblico richiesto"],
      warning: "Modello progettuale. Non è uno statuto valido né firmabile: la costituzione o trasformazione richiede atto pubblico e iscrizione."
    },
    sa: {
      id: "sa", num: "05", title: "Statuto futuro SA",
      entity: "WebDev Innovations SA",
      subtitle: "La struttura per la scala e gli investitori istituzionali",
      summary: "Azioni, categorie, voto privilegiato nei limiti dell'art. 693, maggioranze inderogabili, board, trasferimenti, exit e diritti degli investitori.",
      statusLabel: "Modello progettuale", statusCls: "status-verify",
      file: "05-statuto-sa.md",
      meta: ["Non valido", "Non firmabile", "Atto pubblico richiesto"],
      warning: "Modello progettuale. Non è uno statuto valido né firmabile. La trasformazione segue la LFus e richiede decisioni, atto pubblico e iscrizione."
    },
    investor: {
      id: "investor", num: "06", title: "Investor Agreement",
      entity: "WebDev Innovations · futura Sagl/SA",
      subtitle: "Term sheet e accordo per il primo investitore",
      summary: "Strumento, valutazione, diritti di informazione, reserved matters, anti-dilution, liquidazione, tag/drag, advisory board e condizioni di closing.",
      statusLabel: "Modello negoziale", statusCls: "status-verify",
      file: "06-investor-agreement.md",
      meta: ["Modello", "Da negoziare", "Verifica LSerFi"],
      warning: "Modello dimostrativo. Non è un'offerta né un impegno a investire. Ogni round richiede verifica legale, fiscale e regolamentare."
    }
  };
})();
