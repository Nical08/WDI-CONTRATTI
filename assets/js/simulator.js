/* ============================================================
   Simulatore di cap table, diluizione e diritti di voto.
   Nessuna dipendenza esterna. Calcoli percentuali, non contabili.
   ============================================================ */
(function () {
  "use strict";

  const W = window.WDI = window.WDI || {};
  const STORAGE_KEY = "wdi-sim-v1";

  const TYPE_LABEL = {
    primary: "Aumento di capitale",
    secondary: "Vendita secondaria",
    loan: "Prestito alla società",
    convertible: "Prestito convertibile"
  };
  const METHOD_LABEL = {
    valuation: "Da valutazione",
    pct: "Da percentuale"
  };
  const VOTE_LABEL = {
    proportional: "Proporzionale al capitale",
    dual10: "Una quota/azione = un voto (nominale 10:1)",
    capped: "Tetto statutario ai voti"
  };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function uid(prefix) { return prefix + Math.random().toString(36).slice(2, 7); }
  function num(v, fallback) {
    if (typeof v === "number") return isFinite(v) ? v : (fallback || 0);
    const s = String(v == null ? "" : v).replace(/'/g, "").replace(/\s/g, "").replace(",", ".");
    const n = parseFloat(s);
    return isFinite(n) ? n : (fallback || 0);
  }
  function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }
  function sum(a) { return a.reduce((s, x) => s + x, 0); }
  function fmtCHF(n) {
    if (!isFinite(n)) return "—";
    return new Intl.NumberFormat("it-CH", { style: "currency", currency: "CHF", maximumFractionDigits: 0 }).format(Math.round(n));
  }
  function fmtPct(fraction, digits) {
    if (!isFinite(fraction)) return "—";
    const d = digits == null ? 1 : digits;
    return (fraction * 100).toFixed(d).replace(".", ",") + "%";
  }
  function fmtNum(n, digits) {
    const d = digits == null ? 0 : digits;
    return new Intl.NumberFormat("it-CH", { maximumFractionDigits: d }).format(n);
  }
  function cloneHolders(hs) { return hs.map((h) => Object.assign({}, h)); }

  function defaultState() {
    return {
      entity: "sagl",
      votingModel: "proportional",
      voteCap: 25,
      secondarySeller: "founders",
      founders: [
        { id: "f1", name: "Nicola Cappelli", pct: 50 },
        { id: "f2", name: "Bryan Ciaponi", pct: 50 }
      ],
      rounds: [
        {
          id: "r1", name: "Round 1 — Seed", type: "primary", method: "valuation",
          preMoney: 9000000, amount: 1000000, requestedPct: 10, investors: 1,
          interest: 0, years: 0, cap: 0, discount: 0, nextValuation: 0
        }
      ]
    };
  }

  function normalizeState(raw) {
    const s = defaultState();
    if (!raw || typeof raw !== "object") return s;
    s.entity = raw.entity === "sa" ? "sa" : "sagl";
    s.votingModel = ["proportional", "dual10", "capped"].includes(raw.votingModel) ? raw.votingModel : "proportional";
    s.voteCap = num(raw.voteCap, 25);
    s.secondarySeller = raw.secondarySeller === "all" ? "all" : "founders";
    if (Array.isArray(raw.founders) && raw.founders.length) {
      s.founders = raw.founders.slice(0, 8).map((f, i) => ({
        id: f.id || uid("f"),
        name: String(f.name || ("Fondatore " + (i + 1))).slice(0, 80),
        pct: num(f.pct, 0)
      }));
    }
    if (Array.isArray(raw.rounds)) {
      s.rounds = raw.rounds.slice(0, 12).map((r, i) => ({
        id: r.id || uid("r"),
        name: String(r.name || ("Round " + (i + 1))).slice(0, 80),
        type: ["primary", "secondary", "loan", "convertible"].includes(r.type) ? r.type : "primary",
        method: r.method === "pct" ? "pct" : "valuation",
        preMoney: num(r.preMoney, 0),
        amount: num(r.amount, 0),
        requestedPct: num(r.requestedPct, 0),
        investors: Math.max(1, Math.min(30, Math.round(num(r.investors, 1)))),
        interest: num(r.interest, 0),
        years: num(r.years, 0),
        cap: num(r.cap, 0),
        discount: num(r.discount, 0),
        nextValuation: num(r.nextValuation, 0)
      }));
    }
    return s;
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      return normalizeState(JSON.parse(raw));
    } catch (e) { return defaultState(); }
  }
  function saveState(s) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch (e) { /* ignore */ }
  }

  // ---------- Voting ----------
  function applyVoteCap(units, capFraction) {
    if (!(capFraction > 0 && capFraction < 1)) return units.slice();
    // Tetto espresso in % del totale dei diritti di voto emessi (prima del tetto).
    // Scelta conservativa e trasparente: il denominatore non si restringe per effetto del tetto.
    const ceiling = capFraction * sum(units);
    return units.map((u) => Math.min(u, ceiling));
  }

  function voting(holders, model, capPct) {
    let units = holders.map((h) => {
      if (model === "dual10") return h.economic / (h.kind === "founder" ? 0.1 : 1);
      return h.economic;
    });
    if (model === "capped") units = applyVoteCap(units, num(capPct, 25) / 100);
    const total = sum(units);
    return units.map((u) => total > 0 ? u / total : 0);
  }

  function controlScenario(founderEconPct, model, capPct) {
    const e = clamp(num(founderEconPct, 20) / 100, 0.001, 0.999);
    const holders = [
      { kind: "founder", economic: e / 2 },
      { kind: "founder", economic: e / 2 },
      { kind: "investor", economic: 1 - e }
    ];
    const v = voting(holders, model, capPct);
    return {
      founderVotes: v[0] + v[1],
      investorVotes: v[2],
      founderEcon: e,
      investorEcon: 1 - e,
      atLeast60: (v[0] + v[1]) >= 0.6,
      model, capPct
    };
  }

  // ---------- Core computation ----------
  function compute(state) {
    const errors = [];
    const warnings = [];
    const entity = state.entity === "sa" ? "sa" : "sagl";
    const model = state.votingModel;
    const foundersIn = state.founders.slice();
    const totalPct = sum(foundersIn.map((f) => num(f.pct, 0)));
    if (foundersIn.length === 0) errors.push("Inserisci almeno un socio iniziale.");
    if (totalPct <= 0) errors.push("La somma delle partecipazioni iniziali deve essere maggiore di zero.");
    if (Math.abs(totalPct - 100) > 0.05) {
      warnings.push("Le partecipazioni iniziali sommano " + fmtNum(totalPct, 2) + "%. Il calcolo le normalizza a 100%.");
    }

    let holders = foundersIn.map((f, i) => ({
      id: f.id || ("f" + i),
      groupId: f.id || ("f" + i),
      groupName: f.name || ("Fondatore " + (i + 1)),
      name: f.name || ("Fondatore " + (i + 1)),
      kind: "founder",
      economic: totalPct > 0 ? num(f.pct, 0) / totalPct : 0,
      voteFactor: model === "dual10" ? 0.1 : 1,
      roundName: "Iniziale",
      note: ""
    }));

    const initialHolders = cloneHolders(holders);
    const stages = [{ label: "Iniziale", holders: initialHolders, companyCash: 0, debt: 0, type: "initial" }];
    const roundsOut = [];
    let companyCash = 0;
    let founderCash = 0;
    let debt = 0;
    let lastPost = null;
    let lastPre = null;
    let totalInterest = 0;

    state.rounds.forEach((r, idx) => {
      const before = cloneHolders(holders);
      const rec = {
        id: r.id, index: idx + 1, name: r.name || ("Round " + (idx + 1)),
        type: r.type, method: r.method, amount: num(r.amount, 0),
        preMoney: null, postMoney: null, investorPct: null,
        investors: Math.max(1, Math.round(num(r.investors, 1))),
        companyCashDelta: 0, founderCashDelta: 0, debtDelta: 0, interest: 0,
        conversionEstimate: null, notes: [], requestedPct: num(r.requestedPct, 0)
      };

      if (r.type === "primary") {
        if (rec.amount <= 0) errors.push("Round " + rec.index + ": l'importo dell'aumento deve essere positivo.");
        let post = 0, pre = 0, pct = 0;
        if (r.method === "pct") {
          const requested = clamp(num(r.requestedPct, 0) / 100, 0.0001, 0.9999);
          if (!(num(r.requestedPct, 0) > 0 && num(r.requestedPct, 0) < 100)) {
            errors.push("Round " + rec.index + ": la percentuale richiesta deve essere tra 0 e 100.");
          }
          post = rec.amount > 0 ? rec.amount / requested : 0;
          pre = post - rec.amount;
          pct = requested;
          if (pre < 0) errors.push("Round " + rec.index + ": la valutazione pre-money risulta negativa.");
        } else {
          pre = num(r.preMoney, 0);
          if (pre <= 0) errors.push("Round " + rec.index + ": la valutazione pre-money deve essere positiva.");
          post = pre + rec.amount;
          pct = post > 0 ? rec.amount / post : 0;
          if (rec.requestedPct > 0 && Math.abs(rec.requestedPct / 100 - pct) > 0.002) {
            rec.notes.push("La quota richiesta (" + fmtPct(rec.requestedPct / 100) + ") non coincide con quella implicita (" + fmtPct(pct) + "). Il calcolo usa la valutazione e l'importo.");
            warnings.push("Round " + rec.index + ": quota richiesta e quota implicita non coincidono. Verifica pre-money e importo.");
          }
        }
        if (pct >= 1) errors.push("Round " + rec.index + ": l'investitore non può ottenere il 100% con un aumento di capitale.");
        rec.preMoney = pre; rec.postMoney = post; rec.investorPct = pct;
        holders.forEach((h) => { h.economic *= (1 - pct); });
        const n = rec.investors;
        for (let k = 0; k < n; k++) {
          holders.push({
            id: r.id + "-i" + k, groupId: "round-" + r.id,
            groupName: "Investitori " + rec.name + (n > 1 ? " (" + n + ")" : ""),
            name: "Investitore " + rec.name + (n > 1 ? " " + (k + 1) : ""),
            kind: "investor", economic: pct / n, voteFactor: model === "dual10" ? 1 : 1,
            roundName: rec.name, note: "Nuove quote/azioni"
          });
        }
        companyCash += rec.amount;
        rec.companyCashDelta = rec.amount;
        lastPost = post; lastPre = pre;
        rec.notes.unshift("Il denaro entra nella società. I soci precedenti sono diluiti pro quota.");
      }

      if (r.type === "secondary") {
        if (rec.amount <= 0) errors.push("Round " + rec.index + ": il prezzo della vendita secondaria deve essere positivo.");
        let equityValue = 0, pct = 0;
        if (r.method === "pct") {
          const requested = clamp(num(r.requestedPct, 0) / 100, 0.0001, 0.9999);
          if (!(num(r.requestedPct, 0) > 0 && num(r.requestedPct, 0) < 100)) {
            errors.push("Round " + rec.index + ": la percentuale acquistata deve essere tra 0 e 100.");
          }
          pct = requested;
          equityValue = pct > 0 ? rec.amount / pct : 0;
        } else {
          equityValue = num(r.preMoney, 0);
          if (equityValue <= 0) errors.push("Round " + rec.index + ": il valore dell'equity deve essere positivo.");
          pct = equityValue > 0 ? rec.amount / equityValue : 0;
        }
        if (pct >= 1) errors.push("Round " + rec.index + ": la vendita secondaria non può riguardare il 100% della società.");
        rec.preMoney = equityValue; rec.postMoney = equityValue; rec.investorPct = pct;
        const sellers = state.secondarySeller === "founders" ? holders.filter((h) => h.kind === "founder") : holders.slice();
        const sellerTotal = sum(sellers.map((h) => h.economic));
        const founderSellerShare = sellerTotal > 0
          ? sum(sellers.filter((h) => h.kind === "founder").map((h) => h.economic)) / sellerTotal
          : 0;
        if (sellerTotal <= 0) errors.push("Round " + rec.index + ": non ci sono soci venditori.");
        sellers.forEach((s) => {
          const sold = sellerTotal > 0 ? pct * (s.economic / sellerTotal) : 0;
          const target = holders.find((h) => h.id === s.id);
          if (target) target.economic -= sold;
        });
        const n = rec.investors;
        for (let k = 0; k < n; k++) {
          holders.push({
            id: r.id + "-i" + k, groupId: "round-" + r.id,
            groupName: "Investitori " + rec.name + (n > 1 ? " (" + n + ")" : ""),
            name: "Investitore " + rec.name + (n > 1 ? " " + (k + 1) : ""),
            kind: "investor", economic: pct / n, voteFactor: 1,
            roundName: rec.name, note: "Quote/azioni esistenti"
          });
        }
        founderCash += rec.amount * founderSellerShare;
        rec.founderCashDelta = rec.amount * founderSellerShare;
        lastPost = equityValue; lastPre = equityValue;
        rec.notes.unshift("Il denaro va ai soci venditori, non alla società. La società non riceve liquidità e non emette nuove partecipazioni.");
        if (state.secondarySeller === "founders") {
          rec.notes.push("Se il venditore è un fondatore con quote privilegiate, il trasferimento può trasferire anche i voti. Lo statuto dovrebbe prevedere conversione in categoria ordinaria o gradimento.");
        }
      }

      if (r.type === "loan") {
        if (rec.amount <= 0) errors.push("Round " + rec.index + ": l'importo del prestito deve essere positivo.");
        const rate = num(r.interest, 0) / 100;
        const years = num(r.years, 0);
        rec.interest = rec.amount * rate * years;
        totalInterest += rec.interest;
        companyCash += rec.amount;
        debt += rec.amount;
        rec.companyCashDelta = rec.amount;
        rec.debtDelta = rec.amount;
        rec.notes.unshift("Il denaro entra nella società come debito. La partecipazione economica non cambia.");
        rec.notes.push("Interesse semplice stimato: " + fmtCHF(rec.interest) + " su " + fmtNum(years, 1) + " anni. La qualificazione e l'eventuale postergazione vanno verificate.");
      }

      if (r.type === "convertible") {
        if (rec.amount <= 0) errors.push("Round " + rec.index + ": l'importo del convertibile deve essere positivo.");
        const rate = num(r.interest, 0) / 100;
        const years = num(r.years, 0);
        rec.interest = rec.amount * rate * years;
        totalInterest += rec.interest;
        companyCash += rec.amount;
        debt += rec.amount;
        rec.companyCashDelta = rec.amount;
        rec.debtDelta = rec.amount;
        const nextV = num(r.nextValuation, 0);
        const cap = num(r.cap, 0);
        const discount = clamp(num(r.discount, 0) / 100, 0, 0.9);
        if (nextV > 0) {
          const convVal = Math.min(cap > 0 ? cap : Infinity, nextV * (1 - discount));
          if (convVal > 0) rec.conversionEstimate = rec.amount / (convVal + rec.amount);
        }
        rec.notes.unshift("Il denaro entra come debito. La cap table non cambia finché non avviene la conversione.");
        rec.notes.push("La conversione richiede una delibera di aumento e le formalità applicabili. La stima è separata e non modifica la cap table.");
      }

      const after = cloneHolders(holders);
      rec.before = before;
      rec.after = after;
      rec.companyCashAfter = companyCash;
      rec.debtAfter = debt;
      rec.founderCashAfter = founderCash;
      rec.lastPost = lastPost;
      rec.lastPre = lastPre;
      roundsOut.push(rec);
      stages.push({ label: rec.name, holders: after, companyCash, debt, type: rec.type, noEquity: r.type === "loan" || r.type === "convertible" });
    });

    const votes = voting(holders, model, state.voteCap);
    const holdersWithVotes = holders.map((h, i) => Object.assign({}, h, { votes: votes[i] }));
    const founderHolders = holdersWithVotes.filter((h) => h.kind === "founder");
    const investorHolders = holdersWithVotes.filter((h) => h.kind === "investor");
    const founderEcon = sum(founderHolders.map((h) => h.economic));
    const investorEcon = sum(investorHolders.map((h) => h.economic));
    const founderVotes = sum(founderHolders.map((h) => h.votes));
    const investorVotes = sum(investorHolders.map((h) => h.votes));

    const groups = [];
    const groupMap = new Map();
    holdersWithVotes.forEach((h) => {
      const key = h.groupId || h.id;
      if (!groupMap.has(key)) {
        groupMap.set(key, {
          key, name: h.groupName || h.name, kind: h.kind,
          economic: 0, votes: 0, count: 0, roundName: h.roundName,
          note: h.note, holderNames: []
        });
      }
      const g = groupMap.get(key);
      g.economic += h.economic;
      g.votes += h.votes;
      g.count++;
      g.holderNames.push(h.name);
    });
    groupMap.forEach((g) => groups.push(g));

    return {
      state, entity, model, errors, warnings,
      holders: holdersWithVotes, groups,
      founderEcon, investorEcon, founderVotes, investorVotes,
      companyCash, founderCash, debt, totalInterest,
      lastPost, lastPre, rounds: roundsOut, stages,
      atLeast60: founderVotes >= 0.6,
      voteCap: num(state.voteCap, 25)
    };
  }

  // ---------- Render helpers ----------
  function pillForType(type) {
    const cls = type === "primary" ? "status-current" : type === "secondary" ? "status-draft" : type === "loan" ? "status-verify" : "status-future";
    return '<span class="pill ' + cls + '">' + TYPE_LABEL[type] + "</span>";
  }
  function errorBlock(res) {
    if (!res.errors.length && !res.warnings.length) return "";
    let h = "";
    if (res.errors.length) {
      h += '<div class="callout callout-warning"><div class="callout-title">Controlla i dati</div>' +
        '<ul style="padding-left:16px;margin:0">' + res.errors.map((e) => "<li>" + esc(e) + "</li>").join("") + "</ul></div>";
    }
    if (res.warnings.length) {
      h += '<div class="callout callout-verify mt-2"><div class="callout-title">Avvertenze</div>' +
        '<ul style="padding-left:16px;margin:0">' + res.warnings.map((e) => "<li>" + esc(e) + "</li>").join("") + "</ul></div>";
    }
    return h;
  }

  function metric(label, valueHtml, sub, tone) {
    return '<div class="metric ' + (tone || "") + '">' +
      '<div class="metric-label">' + label + "</div>" +
      '<div class="metric-value">' + valueHtml + "</div>" +
      (sub ? '<div class="metric-sub">' + sub + "</div>" : "") +
      "</div>";
  }

  function renderMetrics(res) {
    const entityLabel = res.entity === "sa" ? "SA" : "Sagl";
    const founderBreak = res.holders.filter((h) => h.kind === "founder")
      .map((h) => esc(h.name.split(" ")[0] || h.name) + " " + fmtPct(h.economic, 1)).join(" · ");
    return '<div class="metrics">' +
      metric("Ultima post-money", res.lastPost ? fmtCHF(res.lastPost) : "—", res.lastPost ? "Prima: " + fmtCHF(res.lastPre || 0) : "Nessun round priced", "") +
      metric("Versato nella società", fmtCHF(res.companyCash), res.debt > 0 ? "Di cui debito " + fmtCHF(res.debt) : "Aumenti di capitale e prestiti", "is-dark") +
      metric("Fondatori · economia", fmtPct(res.founderEcon, 1), founderBreak || "Nessun fondatore", "is-accent") +
      metric("Fondatori · voti", fmtPct(res.founderVotes, 1), esc(entityLabel) + " · " + (res.atLeast60 ? "≥ 60%" : "< 60%"), "") +
      "</div>";
  }

  function renderCapTable(res) {
    const rows = res.groups.slice().sort((a, b) => {
      if (a.kind !== b.kind) return a.kind === "founder" ? -1 : 1;
      return 0;
    });
    let html = '<div class="table-wrap"><table><thead><tr>' +
      '<th>Socio / gruppo</th><th>Tipo</th><th class="num">Economia</th><th class="num">Voti</th><th>Note</th>' +
      "</tr></thead><tbody>";
    rows.forEach((g) => {
      const note = g.kind === "founder"
        ? (res.model === "dual10" ? "Quote/azioni a nominale 1/10" : "Partecipazione iniziale")
        : (g.count > 1 ? g.count + " investitori; quote uguali" : "Investitore") + (res.model === "capped" ? " · tetto per holder" : "");
      html += "<tr><td><strong>" + esc(g.name) + "</strong></td>" +
        '<td>' + (g.kind === "founder" ? "Fondatore" : "Investitore") + "</td>" +
        '<td class="num">' + fmtPct(g.economic, 2) + "</td>" +
        '<td class="num">' + fmtPct(g.votes, 2) + "</td>" +
        '<td class="muted">' + esc(note) + "</td></tr>";
    });
    html += '<tr class="row-total"><td>Totale</td><td></td><td class="num">' + fmtPct(res.founderEcon + res.investorEcon, 2) +
      '</td><td class="num">' + fmtPct(1, 2) + '</td><td class="muted">100% economico / 100% voti</td></tr>';
    html += "</tbody></table></div>";
    html += '<p class="mini-note mt-1">La tabella aggrega gli investitori dello stesso round. Il tetto ai voti, se attivo, è applicato a ogni singolo holder prima dell\'aggregazione. Le percentuali sono fully diluted e non tengono conto di nominale, aggio, opzioni o piani di incentivazione.</p>';
    return html;
  }

  function renderOwnershipChart(res) {
    const stages = res.stages;
    const W = 660, rowH = 34, top = 10, left = 110, barW = 470, h = stages.length * rowH + top + 30;
    let svg = '<svg class="chart-svg" viewBox="0 0 ' + W + " " + h + '" role="img" aria-label="Evoluzione della proprietà economica">';
    stages.forEach((st, i) => {
      const y = top + i * rowH;
      const founder = sum(st.holders.filter((x) => x.kind === "founder").map((x) => x.economic));
      const investor = Math.max(0, 1 - founder);
      const fw = founder * barW, iw = investor * barW;
      svg += '<text class="chart-label" x="0" y="' + (y + 16) + '">' + esc(st.label.length > 22 ? st.label.slice(0, 22) + "…" : st.label) + "</text>";
      svg += '<rect x="' + left + '" y="' + y + '" width="' + barW + '" height="18" fill="#efe9dc" />';
      if (fw > 0) svg += '<rect x="' + left + '" y="' + y + '" width="' + fw + '" height="18" fill="#123b31" />';
      if (iw > 0) svg += '<rect x="' + (left + fw) + '" y="' + y + '" width="' + iw + '" height="18" fill="#3d5d78" />';
      if (founder > 0.12) svg += '<text x="' + (left + 6) + '" y="' + (y + 13) + '" font-size="9" fill="#f3efe6">' + fmtPct(founder, 1) + "</text>";
      if (investor > 0.12) svg += '<text x="' + (left + fw + 6) + '" y="' + (y + 13) + '" font-size="9" fill="#fff">' + fmtPct(investor, 1) + "</text>";
      if (st.type === "loan" || st.type === "convertible") {
        svg += '<text class="chart-axis" x="' + (left + barW - 4) + '" y="' + (y + 29) + '" text-anchor="end">debito, nessuna variazione</text>';
      }
    });
    svg += "</svg>";
    svg += '<div class="chart-legend"><span><i class="legend-dot" style="background:#123b31"></i>Fondatori</span><span><i class="legend-dot" style="background:#3d5d78"></i>Investitori</span></div>';
    return svg;
  }

  function renderVoteChart(res) {
    const rows = [
      { label: "Fondatori", econ: res.founderEcon, votes: res.founderVotes, cls: "accent" },
      { label: "Investitori", econ: res.investorEcon, votes: res.investorVotes, cls: "" }
    ];
    let html = '<div class="vote-result">';
    rows.forEach((r) => {
      html += '<div class="vote-bar-row"><span>' + r.label + "</span><div class=\"vote-track\"><div class=\"vote-fill " + (r.cls || "investors") + '" style="width:' + (r.econ * 100).toFixed(3) + '%"></div></div><span class="vote-pct">' + fmtPct(r.econ, 1) + "</span></div>";
      html += '<div class="vote-bar-row"><span class="muted" style="font-size:9.5px;letter-spacing:.08em;text-transform:uppercase">Voti</span><div class="vote-track"><div class="vote-fill ' + (r.cls || "investors") + '" style="width:' + (r.votes * 100).toFixed(3) + '%"></div></div><span class="vote-pct">' + fmtPct(r.votes, 1) + "</span></div>";
    });
    html += "</div>";
    html += '<div class="chart-legend"><span><i class="legend-dot" style="background:#bc4b2f"></i>Fondatori: economia e voti</span><span><i class="legend-dot" style="background:#3d5d78"></i>Investitori: economia e voti</span></div>';
    return html;
  }

  function renderRoundDetail(res) {
    if (!res.rounds.length) return '<div class="sim-empty">Nessun round. Aggiungi un investimento, un prestito o una vendita secondaria per vedere la diluizione.</div>';
    let html = "";
    res.rounds.forEach((r) => {
      html += '<details class="clause" style="margin-bottom:8px"' + (r.index === res.rounds.length ? " open" : "") + ">";
      html += "<summary style=\"grid-template-columns:28px minmax(0,1fr) 160px 24px\">" +
        '<span class="clause-num">R' + r.index + "</span>" +
        '<span class="clause-title">' + esc(r.name) + "</span>" +
        '<span class="clause-docs">' + pillForType(r.type) + "</span>" +
        '<svg class="clause-chevron" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        "</summary>";
      html += '<div class="clause-body" style="padding-left:17px">';
      html += '<div class="grid-3 mt-2">';
      if (r.type === "primary" || r.type === "secondary") {
        html += '<div class="kpi"><b>' + fmtCHF(r.preMoney || 0) + "</b><span>Pre-money / equity</span></div>";
        html += '<div class="kpi"><b>' + fmtCHF(r.postMoney || 0) + "</b><span>Post-money</span></div>";
        html += '<div class="kpi"><b>' + fmtPct(r.investorPct || 0, 2) + "</b><span>Quota investitore</span></div>";
      } else if (r.type === "loan") {
        html += '<div class="kpi"><b>' + fmtCHF(r.amount) + "</b><span>Prestito</span></div>";
        html += '<div class="kpi"><b>' + fmtCHF(r.interest) + "</b><span>Interessi stimati</span></div>";
        html += '<div class="kpi"><b>0%</b><span>Diluizione</span></div>';
      } else {
        html += '<div class="kpi"><b>' + fmtCHF(r.amount) + "</b><span>Convertibile</span></div>";
        html += '<div class="kpi"><b>' + fmtCHF(r.interest) + "</b><span>Interessi stimati</span></div>";
        html += '<div class="kpi"><b>' + (r.conversionEstimate ? fmtPct(r.conversionEstimate, 2) : "—") + "</b><span>Stima conversione</span></div>";
      }
      html += "</div>";
      html += '<div class="table-wrap mt-2"><table class="table-compact"><thead><tr><th>Fondatore</th><th class="num">Prima</th><th class="num">Dopo</th><th class="num">Δ</th><th>Tipo</th></tr></thead><tbody>';
      r.before.filter((h) => h.kind === "founder").forEach((b) => {
        const a = r.after.find((h) => h.id === b.id) || b;
        const delta = a.economic - b.economic;
        const kind = r.type === "secondary" ? "Vendita" : r.type === "primary" ? "Diluizione" : "Nessuna";
        html += "<tr><td>" + esc(b.name) + '</td><td class="num">' + fmtPct(b.economic, 2) + '</td><td class="num">' + fmtPct(a.economic, 2) + '</td><td class="num">' + (delta < -0.00005 ? "−" : delta > 0.00005 ? "+" : "") + fmtPct(Math.abs(delta), 2) + "</td><td>" + kind + "</td></tr>";
      });
      html += "</tbody></table></div>";
      if (r.type === "primary" || r.type === "secondary") {
        const afterFounder = sum(r.after.filter((h) => h.kind === "founder").map((h) => h.economic));
        const beforeFounder = sum(r.before.filter((h) => h.kind === "founder").map((h) => h.economic));
        html += '<div class="vote-result mt-2">';
        html += '<div class="vote-bar-row"><span>Fondatori prima</span><div class="vote-track"><div class="vote-fill accent" style="width:' + (beforeFounder * 100).toFixed(2) + '%"></div></div><span class="vote-pct">' + fmtPct(beforeFounder, 1) + "</span></div>";
        html += '<div class="vote-bar-row"><span>Fondatori dopo</span><div class="vote-track"><div class="vote-fill accent" style="width:' + (afterFounder * 100).toFixed(2) + '%"></div></div><span class="vote-pct">' + fmtPct(afterFounder, 1) + "</span></div>";
        html += "</div>";
      }
      html += '<div class="instrument-note"><strong>Effetto:</strong> ' + r.notes.map(esc).join(" ") + "</div>";
      html += "</div></details>";
    });
    return html;
  }

  function renderResults(res) {
    let html = "";
    html += errorBlock(res);
    html += '<div class="sim-block">' + renderMetrics(res) + "</div>";
    html += '<div class="sim-block"><div class="sim-block-head"><div><h3>Cap table finale</h3><p>Economia e voti sono grandezze distinte.</p></div><span class="pill ' + (res.atLeast60 ? "status-current" : "status-open") + '">' + (res.atLeast60 ? "≥ 60% voti" : "< 60% voti") + "</span></div>" + renderCapTable(res) + "</div>";
    html += '<div class="grid-2">';
    html += '<div class="sim-block"><div class="sim-block-head"><div><h3>Voti vs economia</h3><p>Modello: ' + esc(VOTE_LABEL[res.model]) + "</p></div></div>" + renderVoteChart(res) +
      '<div class="callout callout-legal mt-2" style="font-size:11.5px"><div class="callout-title">Limite legale</div><p>' +
      (res.entity === "sagl"
        ? "Sagl: art. 806 CO. Il voto può essere proporzionale al nominale, una quota = un voto (nominale minimo 1/10 del massimo) o limitato da un tetto statutario. Il veto è disciplinato dall'art. 807 CO."
        : "SA: artt. 692–693 CO. Il voto privilegiato richiede azioni a nominale ridotto, nominative e interamente liberate, con rapporto massimo 10:1. Le maggioranze dell'art. 704 restano inderogabili.") +
      "</p></div></div>";
    html += '<div class="chart-box"><h3>Evoluzione della proprietà economica</h3>' + renderOwnershipChart(res) + "</div>";
    html += "</div>";
    html += '<div class="sim-block"><div class="sim-block-head"><div><h3>Dettaglio dei round</h3><p>Prima e dopo ogni operazione, con l\'effetto sulle quote dei fondatori.</p></div></div>' + renderRoundDetail(res) + "</div>";
    html += '<div class="sim-block"><div class="sim-block-head"><div><h3>Assunzioni del modello</h3></div></div>' +
      '<ul style="padding-left:16px;font-size:12px;line-height:1.6;color:var(--muted)">' +
      "<li>Le percentuali sono fully diluted e rappresentano solo l'economia e il voto; non calcolano il valore nominale delle quote/azioni, l'aggio, le riserve, le imposte o gli effetti contabili.</li>" +
      "<li>Nell'aumento di capitale il denaro entra nella società e tutti i soci precedenti sono diluiti pro quota. Nella vendita secondaria il denaro va ai venditori.</li>" +
      "<li>Il prestito e il convertibile non modificano la cap table prima della conversione. La conversione del convertibile è una stima separata e richiede una delibera di aumento.</li>" +
      "<li>I fondatori non versano nuovo denaro nei round simulati. La mancata partecipazione a un aumento può comportare diluizione.</li>" +
      "<li>Il modello «nominale 10:1» assume che le quote/azioni dei fondatori abbiano nominale 1/10 rispetto a quelle degli investitori e che le quote privilegiate si convertano in categoria ordinaria in caso di vendita a terzi. È un'assunzione da recepire nello statuto.</li>" +
      "<li>Il tetto ai voti è applicato a ogni singolo holder e richiede una previsione statutaria compatibile con gli artt. 806 e 692 CO.</li>" +
      "<li>Nessun calcolo è un parere legale o fiscale. Verificare con un professionista prima di qualsiasi delibera o firma.</li>" +
      "</ul></div>";
    return html;
  }

  // ---------- Input rendering ----------
  function field(label, inputHtml, hint, error) {
    return '<div class="field' + (error ? " has-error" : "") + '"><label>' + label + "</label>" + inputHtml + (hint ? '<span class="hint">' + hint + "</span>" : "") + (error ? '<span class="field-error">' + error + "</span>" : "") + "</div>";
  }
  function inputNumber(value, attrs) {
    return '<input type="number" inputmode="decimal" value="' + esc(value == null ? "" : value) + '" ' + (attrs || "") + ">";
  }
  function inputText(value, attrs) {
    return '<input type="text" value="' + esc(value == null ? "" : value) + '" ' + (attrs || "") + ">";
  }
  function select(value, options, attrs) {
    return "<select " + (attrs || "") + ">" + options.map((o) => '<option value="' + esc(o.value) + '"' + (String(o.value) === String(value) ? " selected" : "") + ">" + esc(o.label) + "</option>").join("") + "</select>";
  }

  function renderFounders(state) {
    const total = sum(state.founders.map((f) => num(f.pct, 0)));
    return '<div class="sim-panel"><div class="sim-panel-head"><h3>Soci iniziali</h3><span class="small">Somma: <b id="founder-total">' + fmtNum(total, 2) + "%</b></span></div>" +
      state.founders.map((f) => (
        '<div class="founder-row">' +
        inputText(f.name, 'data-sim="founder" data-id="' + esc(f.id) + '" data-field="name" aria-label="Nome socio"') +
        inputNumber(f.pct, 'step="0.1" min="0" max="100" data-sim="founder" data-id="' + esc(f.id) + '" data-field="pct" aria-label="Percentuale"') +
        '<button class="icon-btn" data-action="sim-remove-founder" data-id="' + esc(f.id) + '" title="Rimuovi socio" aria-label="Rimuovi socio"><svg viewBox="0 0 24 24" fill="none"><path d="M6 12h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>' +
        "</div>"
      )).join("") +
      '<button class="btn btn-ghost btn-sm btn-block mt-1" data-action="sim-add-founder">+ Aggiungi socio iniziale</button>' +
      '<p class="mini-note mt-1">La SNC non ha azioni: qui le percentuali sono solo economiche. Se la somma non è 100, il modello normalizza e segnala l\'avvertenza.</p></div>';
  }

  function roundFields(r, state) {
    let h = "";
    h += field("Nome del round", inputText(r.name, 'data-sim="round" data-id="' + esc(r.id) + '" data-field="name"'));
    h += field("Strumento", select(r.type, [
      { value: "primary", label: "Aumento di capitale" },
      { value: "secondary", label: "Vendita secondaria" },
      { value: "loan", label: "Prestito alla società" },
      { value: "convertible", label: "Prestito convertibile" }
    ], 'data-sim="round" data-id="' + esc(r.id) + '" data-field="type" data-structural="1"'));

    if (r.type === "primary" || r.type === "secondary") {
      h += field("Metodo di calcolo", select(r.method, [
        { value: "valuation", label: r.type === "primary" ? "Da pre-money + importo" : "Da valore equity + importo" },
        { value: "pct", label: "Da percentuale + importo" }
      ], 'data-sim="round" data-id="' + esc(r.id) + '" data-field="method" data-structural="1"'));
      if (r.method === "valuation") {
        h += '<div class="input-row">' +
          field(r.type === "primary" ? "Pre-money (CHF)" : "Valore equity 100% (CHF)", inputNumber(r.preMoney, 'step="1000" min="0" data-sim="round" data-id="' + esc(r.id) + '" data-field="preMoney"')) +
          field("Importo (CHF)", inputNumber(r.amount, 'step="1000" min="0" data-sim="round" data-id="' + esc(r.id) + '" data-field="amount"')) +
          "</div>";
        h += field("Quota richiesta % (verifica)", inputNumber(r.requestedPct, 'step="0.1" min="0" max="100" data-sim="round" data-id="' + esc(r.id) + '" data-field="requestedPct"'), "Solo controllo: il calcolo usa valutazione e importo.");
      } else {
        h += '<div class="input-row">' +
          field("Percentuale investitore", inputNumber(r.requestedPct, 'step="0.1" min="0" max="100" data-sim="round" data-id="' + esc(r.id) + '" data-field="requestedPct"')) +
          field("Importo (CHF)", inputNumber(r.amount, 'step="1000" min="0" data-sim="round" data-id="' + esc(r.id) + '" data-field="amount"')) +
          "</div>";
      }
      h += field("Numero di investitori", inputNumber(r.investors, 'step="1" min="1" max="30" data-sim="round" data-id="' + esc(r.id) + '" data-field="investors"'), "Le quote del round sono divise in parti uguali.");
      if (r.type === "secondary") {
        h += field("Venditori", select(state.secondarySeller, [
          { value: "founders", label: "Solo fondatori, pro quota" },
          { value: "all", label: "Tutti i soci, pro quota" }
        ], 'data-sim="global" data-field="secondarySeller" data-structural="1"'));
      }
    }

    if (r.type === "loan") {
      h += '<div class="input-row">' +
        field("Importo (CHF)", inputNumber(r.amount, 'step="1000" min="0" data-sim="round" data-id="' + esc(r.id) + '" data-field="amount"')) +
        field("Interesse annuo %", inputNumber(r.interest, 'step="0.1" min="0" data-sim="round" data-id="' + esc(r.id) + '" data-field="interest"')) +
        "</div>";
      h += field("Durata (anni)", inputNumber(r.years, 'step="0.5" min="0" data-sim="round" data-id="' + esc(r.id) + '" data-field="years"'));
    }

    if (r.type === "convertible") {
      h += '<div class="input-row">' +
        field("Importo (CHF)", inputNumber(r.amount, 'step="1000" min="0" data-sim="round" data-id="' + esc(r.id) + '" data-field="amount"')) +
        field("Interesse annuo %", inputNumber(r.interest, 'step="0.1" min="0" data-sim="round" data-id="' + esc(r.id) + '" data-field="interest"')) +
        "</div>";
      h += '<div class="input-row">' +
        field("Cap (CHF)", inputNumber(r.cap, 'step="100000" min="0" data-sim="round" data-id="' + esc(r.id) + '" data-field="cap"'), "0 = nessun cap") +
        field("Sconto %", inputNumber(r.discount, 'step="1" min="0" max="90" data-sim="round" data-id="' + esc(r.id) + '" data-field="discount"')) +
        "</div>";
      h += '<div class="input-row">' +
        field("Durata (anni)", inputNumber(r.years, 'step="0.5" min="0" data-sim="round" data-id="' + esc(r.id) + '" data-field="years"')) +
        field("Pre-money prossimo round (stima)", inputNumber(r.nextValuation, 'step="100000" min="0" data-sim="round" data-id="' + esc(r.id) + '" data-field="nextValuation"'), "Solo per la stima di conversione") +
        "</div>";
    }

    if (r.type === "secondary") {
      h += '<p class="mini-note mt-1">Il prezzo è pagato ai venditori. La società non riceve liquidità.</p>';
    }
    return h;
  }

  function renderRounds(state) {
    let h = '<div class="sim-panel"><div class="sim-panel-head"><h3>Round e strumenti</h3><span class="small">' + state.rounds.length + " round</span></div>";
    if (!state.rounds.length) {
      h += '<div class="sim-empty" style="padding:16px">Nessun round. Aggiungi il primo investimento.</div>';
    }
    state.rounds.forEach((r, idx) => {
      h += '<div class="round-card"><div class="round-head"><span class="round-index">Round ' + (idx + 1) + " · " + TYPE_LABEL[r.type] + "</span>" +
        '<button class="round-remove" data-action="sim-remove-round" data-id="' + esc(r.id) + '" title="Rimuovi round" aria-label="Rimuovi round"><svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button></div>' +
        '<div class="round-fields">' + roundFields(r, state) + "</div></div>";
    });
    h += '<button class="add-round" data-action="sim-add-round"><svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg> Aggiungi round</button>';
    h += "</div>";
    return h;
  }

  function renderGlobals(state) {
    return '<div class="sim-panel"><div class="sim-panel-head"><h3>Voti e diritti</h3><span class="small">' + (state.entity === "sa" ? "SA" : "Sagl") + "</span></div>" +
      field("Forma societaria", select(state.entity, [
        { value: "sagl", label: "Sagl — quote sociali" },
        { value: "sa", label: "SA — azioni" }
      ], 'data-sim="global" data-field="entity" data-structural="1"')) +
      field("Modello di voto", select(state.votingModel, [
        { value: "proportional", label: "Proporzionale al capitale" },
        { value: "dual10", label: "Una quota/azione = un voto (nominale 10:1)" },
        { value: "capped", label: "Tetto statutario ai voti" }
      ], 'data-sim="global" data-field="votingModel" data-structural="1"')) +
      (state.votingModel === "capped"
        ? field("Tetto per holder (%)", inputNumber(state.voteCap, 'step="1" min="1" max="99" data-sim="global" data-field="voteCap"'), "Applicato a ogni singolo socio/investitore, poi rinormalizzato.")
        : "") +
      '<p class="mini-note mt-1">' +
      (state.votingModel === "dual10"
        ? "Il modello assume quote/azioni dei fondatori con nominale 1/10 rispetto agli investitori. Nella Sagl: art. 806 cpv. 2; nella SA: art. 693 cpv. 2. Il rapporto massimo è 10:1."
        : state.votingModel === "capped"
          ? "Il tetto è una previsione statutaria ammessa, ma deve rispettare la parità di trattamento e non svuotare il diritto di voto. Nella SA: art. 692 cpv. 2; nella Sagl: art. 806 cpv. 1."
          : "Il voto segue il capitale. Per distinguere controllo ed economia serve una scelta statutaria diversa.") +
      "</p></div>";
  }

  function renderSide(state) {
    return '<div class="sim-side">' +
      '<div class="sim-panel"><div class="sim-panel-head"><h3>Scenario</h3><span class="small">Demo</span></div>' +
      '<div class="sim-presets">' +
      '<button data-action="sim-preset" data-preset="base">Base 50/50</button>' +
      '<button data-action="sim-preset" data-preset="seed">Seed 1M / 10%</button>' +
      '<button data-action="sim-preset" data-preset="two">Due round</button>' +
      '<button data-action="sim-preset" data-preset="control">Controllo 20% / 60%</button>' +
      '<button data-action="sim-preset" data-preset="secondary">Secondaria</button>' +
      '<button data-action="sim-preset" data-preset="loan">Prestito 500k</button>' +
      '<button data-action="sim-preset" data-preset="convertible">Convertibile</button>' +
      "</div>" +
      '<p class="mini-note mt-1">I preset sono esempi, non dati concordati. Modifica i campi per costruire il tuo scenario.</p></div>' +
      renderFounders(state) +
      renderRounds(state) +
      renderGlobals(state) +
      '<div class="sim-side-actions">' +
      '<button class="btn btn-ghost btn-sm" data-action="sim-download-csv"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg> Scarica CSV</button>' +
      '<button class="btn btn-ghost btn-sm" data-action="sim-download-json"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg> Scarica JSON</button>' +
      '<button class="btn btn-ghost btn-sm" data-action="sim-load-json"><svg viewBox="0 0 24 24" fill="none"><path d="M12 21V9m0 0l-4 4m4-4l4 4M5 3h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg> Carica scenario</button>' +
      '<button class="btn btn-ghost btn-sm" data-action="sim-reset"><svg viewBox="0 0 24 24" fill="none"><path d="M4 4v6h6M4 10a8 8 0 1114 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg> Reimposta</button>' +
      '<button class="btn btn-ghost btn-sm" data-action="print"><svg viewBox="0 0 24 24" fill="none"><path d="M7 8V3h10v5M7 17H5a2 2 0 01-2-2v-4a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2h-2M7 14h10v7H7z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg> Stampa</button>' +
      '<input type="file" id="sim-file" accept="application/json" hidden>' +
      "</div></div>";
  }

  function renderSimulator(state) {
    const res = compute(state);
    return '<div class="sim-shell" id="simulator-root-inner">' +
      renderSide(state) +
      '<div class="sim-main" id="sim-results">' + renderResults(res) + "</div>" +
      "</div>";
  }

  // ---------- Presets ----------
  function preset(name, current) {
    const s = defaultState();
    s.founders = [
      { id: "f1", name: "Nicola Cappelli", pct: 50 },
      { id: "f2", name: "Bryan Ciaponi", pct: 50 }
    ];
    if (name === "base") {
      s.rounds = [];
      s.votingModel = "proportional";
    }
    if (name === "seed") {
      s.rounds = [{ id: "r1", name: "Seed", type: "primary", method: "valuation", preMoney: 9000000, amount: 1000000, requestedPct: 10, investors: 1, interest: 0, years: 0, cap: 0, discount: 0, nextValuation: 0 }];
    }
    if (name === "two") {
      s.rounds = [
        { id: "r1", name: "Seed", type: "primary", method: "valuation", preMoney: 9000000, amount: 1000000, requestedPct: 10, investors: 1, interest: 0, years: 0, cap: 0, discount: 0, nextValuation: 0 },
        { id: "r2", name: "Round 2", type: "primary", method: "pct", preMoney: 0, amount: 1000000, requestedPct: 10, investors: 1, interest: 0, years: 0, cap: 0, discount: 0, nextValuation: 0 }
      ];
    }
    if (name === "control") {
      s.founders = [
        { id: "f1", name: "Nicola Cappelli", pct: 10 },
        { id: "f2", name: "Bryan Ciaponi", pct: 10 }
      ];
      s.rounds = [{ id: "r1", name: "Investitori 80%", type: "primary", method: "pct", preMoney: 0, amount: 8000000, requestedPct: 80, investors: 1, interest: 0, years: 0, cap: 0, discount: 0, nextValuation: 0 }];
      s.votingModel = "dual10";
    }
    if (name === "secondary") {
      s.rounds = [{ id: "r1", name: "Secondaria 20%", type: "secondary", method: "pct", preMoney: 0, amount: 2000000, requestedPct: 20, investors: 1, interest: 0, years: 0, cap: 0, discount: 0, nextValuation: 0 }];
      s.secondarySeller = "founders";
    }
    if (name === "loan") {
      s.rounds = [{ id: "r1", name: "Prestito socio", type: "loan", method: "valuation", preMoney: 0, amount: 500000, requestedPct: 0, investors: 1, interest: 2, years: 3, cap: 0, discount: 0, nextValuation: 0 }];
    }
    if (name === "convertible") {
      s.rounds = [{ id: "r1", name: "Convertibile 500k", type: "convertible", method: "valuation", preMoney: 0, amount: 500000, requestedPct: 0, investors: 1, interest: 2, years: 2, cap: 8000000, discount: 20, nextValuation: 10000000 }];
    }
    if (name === "control") s.votingModel = "dual10";
    return s;
  }

  // ---------- Download ----------
  function downloadText(filename, text, mime) {
    const blob = new Blob([text], { type: mime || "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 500);
  }
  function csvEscape(v) {
    const s = String(v == null ? "" : v);
    return '"' + s.replace(/"/g, '""') + '"';
  }
  function buildCSV(res) {
    const rows = [];
    rows.push(["WebDev Innovations — simulatore di diluizione"]);
    rows.push(["Nota", "Calcoli percentuali illustrativi. Non è consulenza legale, fiscale o contabile."]);
    rows.push([]);
    rows.push(["Scenario", "Forma", res.entity === "sa" ? "SA" : "Sagl"]);
    rows.push(["Scenario", "Modello di voto", VOTE_LABEL[res.model]]);
    rows.push(["Scenario", "Capitale versato nella società", Math.round(res.companyCash)]);
    rows.push(["Scenario", "Debito", Math.round(res.debt)]);
    rows.push(["Scenario", "Cassa fondatori da vendite", Math.round(res.founderCash)]);
    rows.push(["Scenario", "Ultima post-money", Math.round(res.lastPost || 0)]);
    rows.push(["Scenario", "Fondatori economia", (res.founderEcon * 100).toFixed(4)]);
    rows.push(["Scenario", "Fondatori voti", (res.founderVotes * 100).toFixed(4)]);
    rows.push([]);
    rows.push(["Cap table", "Socio / gruppo", "Tipo", "Economia %", "Voti %", "Note"]);
    res.groups.forEach((g) => {
      rows.push(["Cap table", g.name, g.kind === "founder" ? "Fondatore" : "Investitore", (g.economic * 100).toFixed(4), (g.votes * 100).toFixed(4), g.kind === "founder" ? "Partecipazione iniziale" : (g.count + " investitori")]);
    });
    rows.push([]);
    rows.push(["Round", "#", "Nome", "Strumento", "Importo", "Pre-money", "Post-money", "Quota investitore %", "Cassa società", "Cassa fondatori", "Debito"]);
    res.rounds.forEach((r) => {
      rows.push(["Round", r.index, r.name, TYPE_LABEL[r.type], Math.round(r.amount), Math.round(r.preMoney || 0), Math.round(r.postMoney || 0), r.investorPct != null ? (r.investorPct * 100).toFixed(4) : "", Math.round(r.companyCashDelta), Math.round(r.founderCashDelta), Math.round(r.debtDelta)]);
    });
    rows.push([]);
    rows.push(["Avvertenze"]); res.warnings.forEach((w) => rows.push([w]));
    rows.push(["Errori"]); res.errors.forEach((e) => rows.push([e]));
    return "\uFEFF" + rows.map((r) => r.map(csvEscape).join(";")).join("\r\n");
  }

  // ---------- Init & events ----------
  let state = null;
  let root = null;

  function rerender() {
    if (!root) return;
    root.innerHTML = renderSimulator(state);
    saveState(state);
  }
  function refreshResults() {
    const host = document.getElementById("sim-results");
    if (!host) return;
    const res = compute(state);
    host.innerHTML = renderResults(res);
    const total = sum(state.founders.map((f) => num(f.pct, 0)));
    const totalEl = document.getElementById("founder-total");
    if (totalEl) {
      totalEl.textContent = fmtNum(total, 2) + "%";
      totalEl.style.color = Math.abs(total - 100) > 0.05 ? "var(--danger)" : "";
    }
    saveState(state);
  }

  function toast(msg) {
    if (W.ui && W.ui.toast) W.ui.toast(msg);
  }

  function onInput(e) {
    const t = e.target;
    if (!t.dataset || !t.dataset.sim) return;
    const kind = t.dataset.sim;
    const fieldName = t.dataset.field;
    const id = t.dataset.id;
    if (kind === "global") {
      if (fieldName === "secondarySeller" || fieldName === "entity" || fieldName === "votingModel") {
        state[fieldName] = t.value;
        rerender();
        return;
      }
      if (fieldName === "voteCap") {
        state.voteCap = num(t.value, 25);
        refreshResults();
        return;
      }
    }
    if (kind === "founder") {
      const f = state.founders.find((x) => x.id === id);
      if (!f) return;
      if (fieldName === "name") f.name = t.value.slice(0, 80);
      if (fieldName === "pct") f.pct = num(t.value, 0);
      refreshResults();
      return;
    }
    if (kind === "round") {
      const r = state.rounds.find((x) => x.id === id);
      if (!r) return;
      if (fieldName === "type" || fieldName === "method") {
        r[fieldName] = t.value;
        rerender();
        return;
      }
      if (["name"].includes(fieldName)) r[fieldName] = t.value.slice(0, 80);
      else {
        r[fieldName] = num(t.value, 0);
        if (fieldName === "investors") r[fieldName] = Math.max(1, Math.round(r[fieldName]));
      }
      refreshResults();
    }
  }

  function onClick(e) {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const action = btn.dataset.action;
    if (action === "sim-add-founder") {
      state.founders.push({ id: uid("f"), name: "Nuovo socio", pct: 0 });
      rerender();
    }
    if (action === "sim-remove-founder") {
      if (state.founders.length <= 1) { toast("Deve restare almeno un socio iniziale."); return; }
      state.founders = state.founders.filter((f) => f.id !== btn.dataset.id);
      rerender();
    }
    if (action === "sim-add-round") {
      state.rounds.push({
        id: uid("r"), name: "Round " + (state.rounds.length + 1), type: "primary", method: "valuation",
        preMoney: 1000000, amount: 100000, requestedPct: 0, investors: 1,
        interest: 0, years: 0, cap: 0, discount: 0, nextValuation: 0
      });
      rerender();
    }
    if (action === "sim-remove-round") {
      state.rounds = state.rounds.filter((r) => r.id !== btn.dataset.id);
      rerender();
    }
    if (action === "sim-preset") {
      state = preset(btn.dataset.preset, state);
      rerender();
      toast("Preset caricato. I dati sono esempi, non accordi.");
    }
    if (action === "sim-reset") {
      if (confirm("Reimpostare il simulatore allo scenario demo iniziale?")) {
        state = defaultState();
        rerender();
        toast("Simulatore reimpostato.");
      }
    }
    if (action === "sim-download-csv") {
      const res = compute(state);
      downloadText("webdev-cap-table.csv", buildCSV(res), "text/csv;charset=utf-8");
      toast("CSV scaricato.");
    }
    if (action === "sim-download-json") {
      downloadText("webdev-scenario.json", JSON.stringify(state, null, 2), "application/json;charset=utf-8");
      toast("Scenario JSON scaricato.");
    }
    if (action === "sim-load-json") {
      const file = document.getElementById("sim-file");
      if (file) file.click();
    }
    if (action === "print") window.print();
  }

  function onFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        state = normalizeState(JSON.parse(String(reader.result)));
        rerender();
        toast("Scenario caricato.");
      } catch (err) {
        toast("File JSON non valido.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function init() {
    const host = document.getElementById("simulator-root");
    if (!host) return;
    root = host;
    state = loadState();
    root.innerHTML = renderSimulator(state);
    root.addEventListener("input", onInput);
    root.addEventListener("change", onInput);
    root.addEventListener("click", onClick);
    root.addEventListener("change", (e) => { if (e.target && e.target.id === "sim-file") onFile(e); });
  }

  // Expose
  W.sim = {
    init, compute, voting, controlScenario,
    defaultState, preset, formatCHF: fmtCHF, formatPct: fmtPct,
    VOTE_LABEL, TYPE_LABEL
  };
})();
