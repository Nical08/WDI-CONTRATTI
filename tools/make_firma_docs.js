const fs = require("fs");
const path = require("path");
global.window = {};
const ROOT = require("path").resolve(__dirname, "..");
require(require("path").join(ROOT, "assets/js/markdown.js"));

const files = [
  { src: "00-LEGGIMI-PRIMA-DI-FIRMARE.md", title: "Prima di firmare — istruzioni" },
  { src: "00-SCHEDA-DATI-E-SCELTE.md", title: "Scheda dati e scelte" }
];
const base = require("path").join(ROOT, "firma") + require("path").sep;

const css = `
@page {
  size: A4;
  margin: 20mm 18mm 20mm 18mm;
  @bottom-center {
    content: "WebDev Innovations SNC · documento di lavoro · " counter(page) " / " counter(pages);
    font-family: Georgia, "Times New Roman", serif;
    font-size: 7.5pt;
    color: #777;
  }
}
* { box-sizing: border-box; }
body {
  margin: 0; padding: 0; background: #e8e4dc;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 10.5pt; line-height: 1.5; color: #111;
}
.doc {
  width: 210mm; min-height: 297mm; margin: 24px auto; padding: 20mm 18mm;
  background: #fff; box-shadow: 0 12px 40px rgba(0,0,0,.18);
}
h1, h2, h3 { font-family: Georgia, "Times New Roman", serif; line-height: 1.2; break-after: avoid; }
h1 { font-size: 20pt; text-align: center; margin: 0 0 5mm; }
h2 { font-size: 13pt; margin: 7mm 0 3mm; border-bottom: .4pt solid #999; padding-bottom: 1mm; }
h3 { font-size: 11pt; margin: 5mm 0 2mm; }
p { margin: 0 0 2.6mm; text-align: justify; }
ul, ol { margin: 0 0 3mm; padding-left: 6mm; }
li { margin-bottom: 1.2mm; }
hr { border: 0; border-top: .4pt solid #bbb; margin: 5mm 0; }
blockquote { margin: 4mm 0; padding: 2.5mm 4mm; border-left: 2pt solid #7a6a4f; background: #f6f2ea; font-size: 9.6pt; }
table { width: 100%; border-collapse: collapse; margin: 3mm 0 4mm; font-size: 8.6pt; line-height: 1.3; }
thead { display: table-header-group; }
tr { break-inside: avoid; }
th, td { border: .4pt solid #888; padding: 1.4mm 1.8mm; vertical-align: top; text-align: left; }
th { background: #eee9df; font-weight: 700; }
.table-wrap { overflow: visible; border: 0; background: transparent; }
.page-break { break-before: page; height: 0; }
.small { font-size: 9pt; }
@media print {
  body { background: #fff; }
  .doc { width: auto; min-height: 0; margin: 0; padding: 0; box-shadow: none; }
  a { color: #111; text-decoration: none; }
}
`;

for (const f of files) {
  const md = fs.readFileSync(base + f.src, "utf8");
  const rendered = window.WDI.markdown.render(md);
  const html = `<!DOCTYPE html><html lang="it"><head><meta charset="utf-8"><title>${f.title}</title><style>${css}</style></head><body><div class="doc">${rendered.html}</div></body></html>`;
  const out = base + f.src.replace(/\.md$/, ".html");
  fs.writeFileSync(out, html, "utf8");
  console.log("HTML:", out);
}
