/* Genera la versione HTML stampabile del contratto. */
const fs = require("fs");
const path = require("path");
global.window = {};
const ROOT = require("path").resolve(__dirname, "..");
require(require("path").join(ROOT, "assets/js/markdown.js"));
const md = fs.readFileSync(require("path").join(ROOT, "firma/01-CONTRATTO-SOCIALE-SNC.md"), "utf8");
const rendered = window.WDI.markdown.render(md);

const css = `
@page {
  size: A4;
  margin: 22mm 20mm 22mm 20mm;
  @bottom-center {
    content: "WebDev Innovations SNC · Contratto sociale · " counter(page) " / " counter(pages);
    font-family: Georgia, "Times New Roman", serif;
    font-size: 7.5pt;
    color: #777;
  }
}
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 10.4pt;
  line-height: 1.48;
  color: #111;
  background: #e8e4dc;
}
.contract {
  background: #fff;
  width: 210mm;
  min-height: 297mm;
  margin: 24px auto;
  padding: 22mm 20mm;
  box-shadow: 0 12px 40px rgba(0,0,0,.18);
}
h1, h2, h3, h4 {
  font-family: Georgia, "Times New Roman", serif;
  color: #111;
  line-height: 1.2;
  break-after: avoid;
  page-break-after: avoid;
}
h1 {
  font-size: 20pt;
  text-align: center;
  margin: 0 0 4mm;
  letter-spacing: .02em;
}
h2 {
  font-size: 12.5pt;
  margin: 7mm 0 3mm;
  padding-bottom: 1.2mm;
  border-bottom: .4pt solid #999;
}
h3 {
  font-size: 11pt;
  margin: 5mm 0 2mm;
}
p { margin: 0 0 2.6mm; text-align: justify; hyphens: auto; }
strong { font-weight: 700; }
em { font-style: italic; }
ul, ol { margin: 0 0 3mm 0; padding-left: 6mm; }
li { margin-bottom: 1.2mm; text-align: justify; }
hr { border: 0; border-top: .4pt solid #bbb; margin: 5mm 0; }
blockquote {
  margin: 4mm 0;
  padding: 2.5mm 4mm;
  border-left: 2pt solid #7a6a4f;
  background: #f6f2ea;
  color: #333;
  font-size: 9.6pt;
  break-inside: avoid;
}
blockquote p { margin-bottom: 1.5mm; }
table {
  width: 100%;
  border-collapse: collapse;
  margin: 3mm 0 4mm;
  font-size: 8.6pt;
  line-height: 1.3;
  break-inside: auto;
}
thead { display: table-header-group; }
tr { break-inside: avoid; page-break-inside: avoid; }
th, td {
  border: .4pt solid #888;
  padding: 1.4mm 1.8mm;
  vertical-align: top;
  text-align: left;
}
th { background: #eee9df; font-weight: 700; }
td:first-child, th:first-child { font-weight: 600; }
.table-wrap { overflow: visible; border: 0; background: transparent; }
.page-break {
  break-before: page;
  page-break-before: always;
  height: 0;
}
.signature {
  margin-top: 14mm;
}
.small { font-size: 9pt; }
.center { text-align: center; }
@media screen {
  body { padding: 20px 0; }
}
@media print {
  body { background: #fff; }
  .contract { width: auto; min-height: 0; margin: 0; padding: 0; box-shadow: none; }
  a { color: #111; text-decoration: none; }
}
`;

const html = `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Contratto sociale — WebDev Innovations SNC</title>
<style>${css}</style>
</head>
<body>
<div class="contract">
${rendered.html}
</div>
</body>
</html>`;

const out = require("path").join(ROOT, "firma/01-CONTRATTO-SOCIALE-SNC.html");
fs.writeFileSync(out, html, "utf8");
console.log("HTML scritto:", out, "caratteri:", html.length);
