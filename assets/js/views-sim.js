/* Vista 07 — Simulatore di cap table e diluizione. */
(function () {
  "use strict";
  const W = window.WDI = window.WDI || {};
  W.views = W.views || {};
  W.views.mount = W.views.mount || {};
  const U = W.ui;

  W.views.simulator = function () {
    return '<div class="page">' +
      '<div class="sim-intro">' +
      '<div>' +
      '<span class="eyebrow">Documento 07 · Strumento di lavoro</span>' +
      '<h1 class="page-title mt-2">Cap table e simulatore di diluizione</h1>' +
      '<p class="lead mt-2">Quattro strumenti, una sola domanda: chi possiede cosa, chi vota, e chi riceve il denaro? Costruisci un round, guarda la diluizione e distingui sempre economia e controllo.</p>' +
      '<div class="row gap-1 mt-3">' +
      U.btn("Metodologia e fonti", "#/fonti", "btn-ghost", "scale") +
      U.btn("Investor Agreement", "#/documenti/investor", "btn-ghost", "file") +
      U.btn("Controllo e voto", "#/controllo", "btn-ink", "shield") +
      "</div>" +
      "</div>" +
      '<div class="card card-dark">' +
      '<p class="card-kicker" style="color:#d99b84">Prima di iniziare</p>' +
      '<h3 style="color:#f3edde">Il simulatore non è un notaio.</h3>' +
      '<p class="small mt-2" style="color:#b9c8bd">Calcola percentuali fully diluted. Non calcola il valore nominale delle quote, l\'aggio, le imposte, gli aspetti contabili o la validità delle delibere. Ogni round va verificato con un professionista.</p>' +
      '<div class="divider-tight" style="background:rgba(255,255,255,.14)"></div>' +
      '<p class="tiny" style="color:#93a79a">I fondatori non versano nuovo denaro nei round simulati. La mancata partecipazione a un aumento può comportare diluizione, ma nessun obbligo automatico di investire.</p>' +
      "</div>" +
      "</div>" +
      '<div class="legend-box">' +
      U.status("esempio", "Dati modificabili") +
      U.status("legge", "Regole di legge") +
      U.status("verifica", "Da verificare") +
      '<span class="pill status-danger"><span class="dot"></span>Nessun dato è un accordo</span>' +
      "</div>" +
      '<div id="simulator-root"><div class="sim-empty">Caricamento del simulatore…</div></div>' +
      '<div class="callout callout-warning mt-4"><div class="callout-title">' + U.icon("alert") + "Confine del modello</div>" +
      "<p>Il simulatore ragiona in percentuali. In una Sagl o SA reale, un aumento di capitale richiede una delibera, la determinazione del valore nominale e dell'aggio, il rispetto dei diritti d'opzione e l'iscrizione. Un prestito convertibile non diventa equity finché non viene convertito con le procedure applicabili. Una vendita secondaria non porta denaro alla società.</p>" +
      "<p><strong>Non usare questo strumento come offerta, term sheet o documento di closing.</strong> Usalo per capire la struttura e preparare le domande giuste.</p></div>" +
      '<div class="doc-nav">' +
      U.btn("Torna ai documenti", "#/documenti", "btn-ghost", "chevronLeft") +
      U.btn("Vai alla biblioteca clausole", "#/clausole", "btn-ghost", "book") +
      "</div>" +
      "</div>";
  };

  W.views.mount.simulator = function () {
    if (W.sim && typeof W.sim.init === "function") {
      W.sim.init();
    }
  };
})();
