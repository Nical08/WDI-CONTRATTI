/* Calcolatore di controllo: economia vs voti (modello semplificato a 3 holder). */
(function () {
  "use strict";
  const W = window.WDI = window.WDI || {};
  const U = W.ui;

  const MODEL_LABEL = {
    proportional: "Proporzionale al capitale",
    dual10: "Una quota/azione = un voto (nominale 10:1)",
    capped: "Tetto statutario ai voti"
  };

  function html() {
    return '<div class="card card-accent" id="control-calculator">' +
      '<div class="grid-2">' +
      '<div>' +
      '<p class="card-kicker">Progettista di controllo</p>' +
      '<h3>Quanto pesa il 20% economico?</h3>' +
      '<p class="small muted mt-1">Modello semplificato: due fondatori con la stessa quota e un solo investitore. Serve a capire il meccanismo, non a determinare la cap table reale.</p>' +
      '<div class="divider-tight"></div>' +
      '<div class="range-field"><label for="ctrl-econ" class="small">Economia dei fondatori</label><input type="number" id="ctrl-econ" min="5" max="60" step="1" value="20" aria-label="Percentuale economica dei fondatori"><input type="range" id="ctrl-range" min="5" max="60" step="1" value="20" aria-label="Percentuale economica dei fondatori"></div>' +
      '<div class="input-row mt-2">' +
      '<div class="field"><label for="ctrl-model">Modello di voto</label><select id="ctrl-model">' +
      Object.keys(MODEL_LABEL).map((k) => '<option value="' + k + '"' + (k === "dual10" ? " selected" : "") + ">" + MODEL_LABEL[k] + "</option>").join("") +
      "</select></div>" +
      '<div class="field" id="ctrl-cap-field"><label for="ctrl-cap">Tetto per holder (%)</label><input type="number" id="ctrl-cap" min="1" max="99" step="1" value="12"></div>' +
      "</div>" +
      '<p class="mini-note mt-2" id="ctrl-model-note"></p>' +
      "</div>" +
      '<div class="vote-result" id="ctrl-result"></div>' +
      "</div>" +
      '<div class="divider"></div>' +
      '<div class="grid-2">' +
      '<div><h4 class="small">Con 20% di economia</h4><div id="ctrl-table"></div></div>' +
      '<div><h4 class="small">Cosa non dice questo numero</h4><ul class="small muted" style="padding-left:16px;line-height:1.6">' +
      "<li>Il 60% dei voti non basta per le materie che richiedono i due terzi (art. 704 CO nella SA).</li>" +
      "<li>Il controllo del consiglio, dei veto e delle materie riservate è un livello separato.</li>" +
      "<li>Un tetto ai voti basso può essere rifiutato dagli investitori o contestato se squilibrato.</li>" +
      "<li>La struttura deve essere prevista nello statuto e verificata da un notaio.</li>" +
      "</ul></div>" +
      "</div>" +
      '<div class="mt-3">' + U.btn("Apri il simulatore completo", "#/simulatore", "btn-ink", "arrow") + "</div>" +
      "</div>";
  }

  function renderResult(r) {
    const badge = r.atLeast60
      ? '<span class="pill status-current"><span class="dot"></span>≥ 60% voti</span>'
      : '<span class="pill status-open"><span class="dot"></span>< 60% voti</span>';
    const bar = (label, value, cls) => '<div class="vote-bar-row"><span>' + label + '</span><div class="vote-track"><div class="vote-fill ' + cls + '" style="width:' + (value * 100).toFixed(2) + '%"></div></div><span class="vote-pct">' + (value * 100).toFixed(1).replace(".", ",") + "%</span></div>";
    const founder = (r.founderVotes * 100).toFixed(1).replace(".", ",");
    const investor = (r.investorVotes * 100).toFixed(1).replace(".", ",");
    const capNote = r.model === "capped" ? " · tetto " + r.capPct + "%" : "";
    return '<div class="row-between"><div><p class="card-kicker">Risultato</p><div class="metric-value" style="font-size:2.6rem">' + founder + '%</div><p class="small muted">voti dei fondatori</p></div>' + badge + "</div>" +
      '<div class="mt-2">' + bar("Economia", r.founderEcon, "accent") + bar("Voti", r.founderVotes, "") + "</div>" +
      '<p class="mini-note mt-2">Investitori: ' + investor + '% dei voti. Modello: ' + MODEL_LABEL[r.model] + capNote + '.</p>';
  }

  function findCapFor60(econ) {
    for (let cap = 1; cap <= 99; cap++) {
      const r = W.sim.controlScenario(econ, "capped", cap);
      if (!r.atLeast60) return cap - 1;
    }
    return 99;
  }

  function renderTable() {
    const cases = [
      { label: "Proporzionale", r: W.sim.controlScenario(20, "proportional", 25) },
      { label: "Nominale 10:1", r: W.sim.controlScenario(20, "dual10", 25) },
      { label: "Tetto 10%", r: W.sim.controlScenario(20, "capped", 10) },
      { label: "Tetto 12%", r: W.sim.controlScenario(20, "capped", 12) },
      { label: "Tetto 25%", r: W.sim.controlScenario(20, "capped", 25) }
    ];
    let h = '<div class="table-wrap"><table class="table-compact"><thead><tr><th>Modello</th><th class="num">Voti fondatori</th><th>Esito</th></tr></thead><tbody>';
    cases.forEach((c) => {
      h += "<tr><td>" + c.label + '</td><td class="num">' + (c.r.founderVotes * 100).toFixed(1).replace(".", ",") + "%</td><td>" + (c.r.atLeast60 ? '<span class="pill status-current">≥60%</span>' : '<span class="pill status-open"><60%</span>') + "</td></tr>";
    });
    h += "</tbody></table></div>";
    return h;
  }

  function calc() {
    const econ = Math.max(5, Math.min(60, parseFloat(document.getElementById("ctrl-econ").value) || 20));
    const model = document.getElementById("ctrl-model").value;
    const cap = Math.max(1, Math.min(99, parseFloat(document.getElementById("ctrl-cap").value) || 12));
    const r = W.sim.controlScenario(econ, model, cap);
    document.getElementById("ctrl-result").innerHTML = renderResult(r);
    document.getElementById("ctrl-range").value = econ;
    document.getElementById("ctrl-econ").value = econ;
    document.getElementById("ctrl-cap-field").style.display = model === "capped" ? "" : "none";
    const note = document.getElementById("ctrl-model-note");
    if (model === "proportional") {
      note.textContent = "Il voto segue il capitale: con il 20% di economia si ha il 20% dei voti. Per superare il 60% serve un altro strumento.";
    } else if (model === "dual10") {
      note.textContent = "Le quote/azioni dei fondatori hanno nominale 1/10 e ogni quota/azione vale un voto. Con il 20% di economia si arriva al 71,4% dei voti. Limite: rapporto 10:1 (art. 806 cpv. 2 CO; art. 693 cpv. 2 CO).";
    } else {
      const maxCap = findCapFor60(econ);
      note.textContent = "Il tetto limita i voti di ogni holder. Con il " + econ + "% di economia dei fondatori, il tetto massimo per raggiungere il 60% è circa " + maxCap + "% per holder. È una scelta visibile e potenzialmente conflittuale con gli investitori.";
    }
    document.getElementById("ctrl-table").innerHTML = renderTable();
  }

  function init() {
    const host = document.getElementById("control-root");
    if (!host) return;
    host.innerHTML = html();
    const econ = document.getElementById("ctrl-econ");
    const range = document.getElementById("ctrl-range");
    const model = document.getElementById("ctrl-model");
    const cap = document.getElementById("ctrl-cap");
    econ.addEventListener("input", calc);
    range.addEventListener("input", calc);
    model.addEventListener("change", calc);
    cap.addEventListener("input", calc);
    calc();
  }

  W.control = { init };
})();
