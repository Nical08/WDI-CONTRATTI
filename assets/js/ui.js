/* Helper UI condivisi. Caricare dopo data.js e prima delle viste. */
(function () {
  "use strict";
  const W = window.WDI = window.WDI || {};

  const ICONS = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    arrowUpRight: '<path d="M7 17L17 7M9 7h8v8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    chevron: '<path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    chevronLeft: '<path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    download: '<path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
    print: '<path d="M7 8V3h10v5M7 17H5a2 2 0 01-2-2v-4a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2h-2M7 14h10v7H7z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
    plus: '<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    minus: '<path d="M5 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    info: '<circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.5"/><path d="M12 11v5M12 7.8v.1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    alert: '<path d="M12 3l9 16H3L12 3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 9v4M12 16.5v.1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    scale: '<path d="M12 3v18M5 6h14M7 6l-3 7h6L7 6zM17 6l-3 7h6l-3-7z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>',
    lock: '<rect x="4.5" y="10" width="15" height="11" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 10V7a4 4 0 018 0v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 16l9 5 9-5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>',
    users: '<circle cx="9" cy="8" r="3.2" stroke="currentColor" stroke-width="1.5"/><path d="M3.5 20c.5-3.4 2.7-5.2 5.5-5.2s5 1.8 5.5 5.2M16 5.2a3 3 0 010 5.6M17.5 14.8c2.1.4 3.5 2 3.9 4.7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    file: '<path d="M6 3h8l4 4v14H6V3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M14 3v5h5M9 13h6M9 17h6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    chart: '<path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    check: '<path d="M5 12l4 4L19 6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>',
    x: '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
    spark: '<path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
    book: '<path d="M4 4h7a3 3 0 013 3v14a3 3 0 00-3-3H4V4zM20 4h-7a3 3 0 00-3 3v14a3 3 0 013-3h7V4z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
    calculator: '<rect x="5" y="2.5" width="14" height="19" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M8 6.5h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M16 15h0M8 18.5h2M12 18.5h2M16 18.5h0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    shield: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    clock: '<circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.5"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    pin: '<path d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" stroke-width="1.5"/>',
    quote: '<path d="M9 7H5v5h4c0 3-1.5 4.5-4 5M19 7h-4v5h4c0 3-1.5 4.5-4 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M3.5 6.5L12 13l8.5-6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    close: '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="16" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 3v4M16 3v4M3.5 10h17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'
  };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function icon(name, cls) {
    return '<svg class="icon-inline ' + (cls || "") + '" viewBox="0 0 24 24" fill="none" aria-hidden="true">' + (ICONS[name] || ICONS.info) + "</svg>";
  }
  function status(key, customLabel) {
    const s = (W.STATUS && W.STATUS[key]) || { label: key, cls: "status-example" };
    return '<span class="pill ' + s.cls + '"><span class="dot"></span>' + esc(customLabel || s.label) + "</span>";
  }
  function pill(label, cls) {
    return '<span class="pill ' + (cls || "status-example") + '">' + esc(label) + "</span>";
  }
  function fmtCHF(n) {
    if (!isFinite(n)) return "—";
    return new Intl.NumberFormat("it-CH", { style: "currency", currency: "CHF", maximumFractionDigits: 0 }).format(Math.round(n));
  }
  function fmtPct(fraction, digits) {
    if (!isFinite(fraction)) return "—";
    return (fraction * 100).toFixed(digits == null ? 1 : digits).replace(".", ",") + "%";
  }
  function fmtNum(n, digits) {
    return new Intl.NumberFormat("it-CH", { maximumFractionDigits: digits == null ? 0 : digits }).format(n);
  }
  function callout(kind, title, body) {
    const map = {
      legal: "callout-legal", warning: "callout-warning", verify: "callout-verify",
      decision: "callout-decision", example: "callout-example", note: "callout",
      formal: "callout-formal"
    };
    const iconMap = { legal: "scale", warning: "alert", verify: "alert", decision: "info", example: "example", note: "info", formal: "lock" };
    return '<div class="callout ' + (map[kind] || "callout") + '"><div class="callout-title">' + icon(iconMap[kind] || "info") + esc(title) + "</div>" + (body || "") + "</div>";
  }
  function sectionHead(num, kicker, title, lead, action) {
    return '<div class="section-head"><div class="measure"><span class="section-num">' + esc(num) + " · " + esc(kicker) + '</span><h2 class="section-title">' + title + "</h2>" + (lead ? '<p class="subtitle mt-1">' + lead + "</p>" : "") + "</div>" + (action || "") + "</div>";
  }
  function btn(label, href, cls, iconName) {
    const tag = href ? "a" : "button";
    const attrs = href ? ' href="' + esc(href) + '"' : ' type="button"';
    return "<" + tag + ' class="btn ' + (cls || "btn-ghost") + '"' + attrs + ">" + (iconName ? icon(iconName) : "") + esc(label) + "</" + tag + ">";
  }
  function docCard(id) {
    const m = W.DOC_META && W.DOC_META[id];
    if (!m) return "";
    return '<a class="doc-card" href="#/documenti/' + esc(id) + '">' +
      '<div class="doc-card-top"><span class="doc-card-num">' + esc(m.num) + "</span>" + '<span class="pill ' + m.statusCls + '">' + esc(m.statusLabel) + "</span></div>" +
      '<h3>' + esc(m.title) + "</h3>" +
      "<p>" + esc(m.summary) + "</p>" +
      '<div class="doc-card-foot"><span>' + esc(m.entity) + '</span><span class="row gap-1">Apri ' + icon("arrowUpRight") + "</span></div></a>";
  }
  function phaseCard(p) {
    return '<article class="phase-card ' + p.tone + '"><div class="phase-top"><span class="phase-index">' + esc(p.index) + "</span>" + status(p.id === "snc" ? "definito" : "futuro") + "</div>" +
      '<p class="phase-sub">' + esc(p.label) + "</p><h3>" + esc(p.entity) + "</h3>" +
      '<p class="small muted">' + esc(p.full) + "</p>" +
      '<div class="phase-list">' +
      '<div><span>Base legale</span><span>' + esc(p.legal) + "</span></div>" +
      '<div><span>Capitale</span><span>' + esc(p.capital) + "</span></div>" +
      '<div><span>Responsabilità</span><span>' + esc(p.liability) + "</span></div>" +
      '<div><span>Governo</span><span>' + esc(p.governance) + "</span></div>" +
      '<div><span>Decisioni</span><span>' + esc(p.decision) + "</span></div>" +
      "</div>" +
      '<div class="phase-foot"><b>' + esc(p.headline) + "</b><br>" + esc(p.body) + '<div class="mt-2">' + btn("Esplora", p.link, "btn-ghost btn-sm", "arrow") + "</div></div></article>";
  }
  function table(headers, rows, opts) {
    const o = opts || {};
    let h = '<div class="table-wrap"><table class="' + (o.cls || "") + '"><thead><tr>';
    headers.forEach((x) => {
      const label = typeof x === "string" ? x : x.label;
      const num = typeof x === "object" && x.num;
      h += '<th class="' + (num ? "num" : "") + '">' + label + "</th>";
    });
    h += "</tr></thead><tbody>";
    rows.forEach((row) => {
      h += "<tr>";
      row.forEach((cell, i) => {
        const num = typeof headers[i] === "object" && headers[i].num;
        h += '<td class="' + (num ? "num" : "") + '">' + cell + "</td>";
      });
      h += "</tr>";
    });
    h += "</tbody></table></div>";
    if (o.note) h += '<p class="mini-note mt-1">' + o.note + "</p>";
    return h;
  }
  function sourceLink(art, label) {
    return '<a href="https://www.fedlex.admin.ch/eli/cc/27/317_321_377/it" target="_blank" rel="noopener">' + esc(label || art) + "</a>";
  }
  function sourceItem(item, fedlexUrl) {
    return '<div class="source-item"><div class="row-between gap-1"><strong>' + esc(item.art) + "</strong>" + (fedlexUrl ? '<a class="tiny" href="' + esc(fedlexUrl) + '" target="_blank" rel="noopener">Fedlex ' + icon("external", "icon-inline") + "</a>" : "") + "</div><p class=\"small muted mt-1\">" + esc(item.topic) + " — " + esc(item.note) + "</p></div>";
  }
  function toast(msg) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("is-visible");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("is-visible"), 3200);
  }
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
    }
    try {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); ta.remove(); return Promise.resolve(true);
    } catch (e) { return Promise.resolve(false); }
  }
  function download(filename, text, mime) {
    const blob = new Blob([text], { type: mime || "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 400);
  }
  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  W.ui = {
    esc, icon, status, pill, fmtCHF, fmtPct, fmtNum, callout, sectionHead,
    btn, docCard, phaseCard, table, sourceLink, sourceItem, toast, copyText,
    download, scrollToId, ICONS
  };
})();
