/* ============================================================
   Mini renderer Markdown, senza dipendenze.
   Supporta: titoli, paragrafi, liste, tabelle, citazioni,
   callout, link, grassetto, corsivo, codice, righe, page break.
   ============================================================ */
(function () {
  "use strict";

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function slugify(s) {
    return s
      .toLowerCase()
      .replace(/<[^>]+>/g, "")
      .replace(/&[a-z]+;/g, "")
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 70) || "sezione";
  }

  function inline(text) {
    let s = escapeHtml(text);
    const tokens = [];
    const stash = (html) => {
      const key = "\u0000T" + tokens.length + "\u0000";
      tokens.push(html);
      return key;
    };

    s = s.replace(/`([^`]+)`/g, (_, code) => stash("<code>" + code + "</code>"));
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
      const safe = /^(https?:\/\/|#|mailto:)/i.test(href) ? href : "#";
      const ext = /^https?:\/\//i.test(safe) ? ' target="_blank" rel="noopener"' : "";
      return stash('<a href="' + escapeHtml(safe) + '"' + ext + ">" + label + "</a>");
    });
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/__([^_]+)__/g, "<strong>$1</strong>");
    s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
    s = s.replace(/(^|[^_])_([^_\n]+)_/g, "$1<em>$2</em>");
    s = s.replace(/~~([^~]+)~~/g, "<del>$1</del>");
    s = s.replace(/\u0000T(\d+)\u0000/g, (_, i) => tokens[Number(i)]);
    return s;
  }

  const CALLOUT = {
    WARNING: { label: "Attenzione", cls: "callout-warning", icon: "alert" },
    LEGAL: { label: "Nota legale", cls: "callout-legal", icon: "scale" },
    NOTE: { label: "Nota", cls: "callout", icon: "info" },
    EXAMPLE: { label: "Esempio illustrativo", cls: "callout-example", icon: "example" },
    FORMAL: { label: "Formalità", cls: "callout-formal", icon: "stamp" },
    DECISION: { label: "Da decidere", cls: "callout-decision", icon: "decision" }
  };

  const ICONS = {
    alert: '<path d="M12 3l9 16H3L12 3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 9v4M12 16.5v.1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    scale: '<path d="M12 3v18M5 6h14M7 6l-3 7h6L7 6zM17 6l-3 7h6l-3-7z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>',
    info: '<circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.5"/><path d="M12 11v5M12 7.8v.1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    example: '<path d="M4 5h16v14H4z" stroke="currentColor" stroke-width="1.4"/><path d="M8 9h8M8 13h5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    stamp: '<path d="M6 20h12M8 20v-4h8v4M9 16v-3a3 3 0 013-3h0a3 3 0 013 3v3M10 10V7a2 2 0 114 0v3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>',
    decision: '<path d="M6 4h12v16H6z" stroke="currentColor" stroke-width="1.4"/><path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>'
  };

  function icon(name) {
    return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' + (ICONS[name] || ICONS.info) + "</svg>";
  }

  function isBlockStart(lines, i) {
    const l = lines[i];
    if (!l.trim()) return true;
    if (/^#{1,6}\s/.test(l)) return true;
    if (/^>\s?/.test(l)) return true;
    if (/^```/.test(l)) return true;
    if (/^([-*_])\1{2,}\s*$/.test(l.trim())) return true;
    if (/^\s*[-+]\s+/.test(l)) return true;
    if (/^\s*\d+[.)]\s+/.test(l)) return true;
    if (l.includes("|") && i + 1 < lines.length && /^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(lines[i + 1])) return true;
    if (l.trim() === "<!-- pagebreak -->") return true;
    return false;
  }

  function splitRow(line) {
    let s = line.trim();
    if (s.startsWith("|")) s = s.slice(1);
    if (s.endsWith("|")) s = s.slice(0, -1);
    const cells = [];
    let cur = "";
    let inCode = false;
    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (ch === "`") inCode = !inCode;
      if (ch === "|" && !inCode) {
        cells.push(cur.trim());
        cur = "";
      } else {
        cur += ch;
      }
    }
    cells.push(cur.trim());
    return cells;
  }

  function renderTable(lines, start) {
    const header = splitRow(lines[start]);
    const align = splitRow(lines[start + 1]).map((c) => {
      const l = c.startsWith(":");
      const r = c.endsWith(":");
      if (l && r) return "center";
      if (r) return "right";
      if (l) return "left";
      return null;
    });
    let i = start + 2;
    const rows = [];
    while (i < lines.length && lines[i].includes("|") && lines[i].trim()) {
      rows.push(splitRow(lines[i]));
      i++;
    }
    let html = '<div class="table-wrap"><table><thead><tr>';
    header.forEach((cell, idx) => {
      const a = align[idx] ? ' style="text-align:' + align[idx] + '"' : "";
      html += "<th" + a + ">" + inline(cell) + "</th>";
    });
    html += "</tr></thead><tbody>";
    rows.forEach((row) => {
      html += "<tr>";
      header.forEach((_, idx) => {
        const a = align[idx] ? ' style="text-align:' + align[idx] + '"' : "";
        html += "<td" + a + ">" + inline(row[idx] || "") + "</td>";
      });
      html += "</tr>";
    });
    html += "</tbody></table></div>";
    return { html, next: i };
  }

  function renderList(lines, start) {
    const firstIndent = lines[start].match(/^\s*/)[0].length;
    const ordered = /^\s*\d+[.)]\s+/.test(lines[start]);
    const tag = ordered ? "ol" : "ul";
    let html = "<" + tag + ">";
    let i = start;
    while (i < lines.length) {
      const line = lines[i];
      if (!line.trim()) break;
      const m = line.match(/^(\s*)([-+]|\d+[.)])\s+(.*)$/);
      if (!m) break;
      const indent = m[1].length;
      if (indent < firstIndent) break;
      if (indent > firstIndent) {
        // Nested list: parse recursively and append inside the previous item.
        const nested = renderList(lines, i);
        html = html.replace(/<\/li>$/, "") + nested.html + "</li>";
        i = nested.next;
        continue;
      }
      html += "<li>" + inline(m[3]) + "</li>";
      i++;
    }
    html += "</" + tag + ">";
    return { html, next: i };
  }

  function renderBlocks(lines, headings, opts) {
    let html = "";
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (!line.trim()) { i++; continue; }

      if (line.trim() === "<!-- pagebreak -->") {
        html += '<div class="page-break"></div>';
        i++;
        continue;
      }

      const h = line.match(/^(#{1,4})\s+(.*)$/);
      if (h) {
        const level = h[1].length;
        const raw = h[2].replace(/\s+#+\s*$/, "").trim();
        const text = inline(raw).replace(/<[^>]+>/g, "");
        const id = "sec-" + slugify(text || raw) + "-" + headings.length;
        if (level === 2 || level === 3) headings.push({ level, text, id });
        html += "<h" + level + ' id="' + id + '">' + inline(raw) + "</h" + level + ">";
        i++;
        continue;
      }

      if (line.includes("|") && i + 1 < lines.length && /^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(lines[i + 1])) {
        const t = renderTable(lines, i);
        html += t.html;
        i = t.next;
        continue;
      }

      if (/^\s*[-+]\s+/.test(line) || /^\s*\d+[.)]\s+/.test(line)) {
        const l = renderList(lines, i);
        html += l.html;
        i = l.next;
        continue;
      }

      if (/^>\s?/.test(line)) {
        const q = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) {
          q.push(lines[i].replace(/^>\s?/, ""));
          i++;
        }
        let first = q[0] || "";
        const cm = first.match(/^\[!([A-Z]+)\]\s*(.*)$/);
        if (cm && CALLOUT[cm[1]]) {
          const c = CALLOUT[cm[1]];
          q.shift();
          if (cm[2]) q.unshift(cm[2]);
          const innerHeadings = [];
          const inner = renderBlocks(q, innerHeadings, opts);
          html += '<div class="callout ' + c.cls + '"><div class="callout-title">' + icon(c.icon) + c.label + "</div>" + inner + "</div>";
        } else {
          const innerHeadings = [];
          const inner = renderBlocks(q, innerHeadings, opts);
          html += "<blockquote>" + inner + "</blockquote>";
        }
        continue;
      }

      if (/^```/.test(line)) {
        const code = [];
        i++;
        while (i < lines.length && !/^```/.test(lines[i])) { code.push(lines[i]); i++; }
        i++;
        html += "<pre><code>" + escapeHtml(code.join("\n")) + "</code></pre>";
        continue;
      }

      if (/^([-*_])\1{2,}\s*$/.test(line.trim())) {
        html += "<hr>";
        i++;
        continue;
      }

      // Paragraph
      const p = [];
      while (i < lines.length && lines[i].trim() && !isBlockStart(lines, i)) {
        p.push(lines[i]);
        i++;
      }
      // Hard breaks: two trailing spaces.
      const parts = p.map((l) => inline(l.replace(/\s+$/, "")) + (/  $/.test(l) ? "<br>" : ""));
      html += "<p>" + parts.join(" ") + "</p>";
    }
    return html;
  }

  function render(md) {
    const normalized = String(md || "").replace(/\r\n?/g, "\n");
    const lines = normalized.split("\n");
    const headings = [];
    const html = renderBlocks(lines, headings, {});
    return { html, headings };
  }

  function wordCount(md) {
    return String(md || "")
      .replace(/[#>*_`|\[\]()]/g, " ")
      .split(/\s+/)
      .filter(Boolean).length;
  }

  window.WDI = window.WDI || {};
  window.WDI.markdown = { render, inline, escapeHtml, wordCount };
})();
