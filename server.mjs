#!/usr/bin/env node
/**
 * WebDev Innovations — Laboratorio societario
 * Server HTTP statico minimale, senza dipendenze esterne.
 *
 * Uso:
 *   node server.mjs
 *   PORT=4174 node server.mjs
 *
 * Il server ascolta solo su localhost, serve i file della cartella dello
 * script e blocca qualsiasi tentativo di uscire dalla root.
 */

import http from "node:http";
import path from "node:path";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { pipeline } from "node:stream/promises";

// La root è la cartella che contiene questo file, non la directory corrente.
const ROOT = path.dirname(fileURLToPath(import.meta.url));

// Porta da ambiente, con fallback sicuro su 4173.
const portaAmbiente = Number.parseInt(process.env.PORT ?? "", 10);
const PORTA =
  Number.isInteger(portaAmbiente) && portaAmbiente > 0 && portaAmbiente <= 65535
    ? portaAmbiente
    : 4173;

const HOST = "127.0.0.1";
const INDIRIZZO = `http://localhost:${PORTA}`;

// Tipi MIME necessari alla demo. Per estensioni sconosciute si usa
// application/octet-stream, che il browser scarica senza interpretare.
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".md": "text/markdown; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon"
};

/** Header comuni a ogni risposta, comprese le pagine di errore. */
function applicaHeaderBase(res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
}

/** Pagina di errore minimale, coerente con i colori della demo. */
function paginaErrore(codice, titolo, messaggio) {
  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${codice} — ${titolo} · WebDev Innovations</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body {
    margin: 0; min-height: 100vh; display: grid; place-items: center;
    padding: 24px; background: #f3efe6; color: #18312b;
    font-family: "Instrument Sans", "Segoe UI", system-ui, sans-serif;
  }
  main {
    width: min(560px, 100%); padding: 40px; border: 1px solid #d9d2c3;
    border-radius: 18px; background: #fffdf8;
    box-shadow: 0 20px 60px rgba(24, 49, 43, 0.08);
  }
  .brand {
    margin: 0; font-size: 12px; letter-spacing: 0.12em;
    text-transform: uppercase; color: #6b7a72;
  }
  .code {
    margin: 24px 0 4px; font-family: "Newsreader", Georgia, serif;
    font-size: 64px; line-height: 1; color: #123831;
  }
  h1 { margin: 0 0 12px; font-size: 28px; line-height: 1.2; }
  p { margin: 0 0 24px; color: #4c5c54; line-height: 1.6; }
  a {
    display: inline-block; padding: 10px 16px; border-radius: 999px;
    background: #123831; color: #f3efe6; text-decoration: none;
    font-weight: 600; font-size: 14px;
  }
  a:hover { background: #1c4a40; }
</style>
</head>
<body>
<main>
  <p class="brand">WebDev Innovations · Laboratorio societario</p>
  <p class="code">${codice}</p>
  <h1>${titolo}</h1>
  <p>${messaggio}</p>
  <a href="/">Torna alla panoramica</a>
</main>
</body>
</html>`;
}

/** Invia una risposta HTML, rispettando le richieste HEAD. */
function inviaHtml(res, stato, html, metodo) {
  applicaHeaderBase(res);
  const corpo = Buffer.from(html, "utf8");
  res.writeHead(stato, {
    "Content-Type": "text/html; charset=utf-8",
    "Content-Length": corpo.length
  });
  res.end(metodo === "HEAD" ? undefined : corpo);
}

/** Restituisce il Content-Type dedotto dall'estensione. */
function tipoContenuto(percorso) {
  return MIME[path.extname(percorso).toLowerCase()] || "application/octet-stream";
}

/**
 * Individua il file da servire. Se il percorso è una directory, usa
 * index.html al suo interno. Restituisce null se non esiste un file valido.
 */
async function risolviFile(percorso) {
  let info;
  try {
    info = await stat(percorso);
  } catch (errore) {
    if (errore.code === "ENOENT" || errore.code === "ENOTDIR") return null;
    throw errore;
  }

  if (info.isDirectory()) {
    const index = path.join(percorso, "index.html");
    let infoIndex;
    try {
      infoIndex = await stat(index);
    } catch (errore) {
      if (errore.code === "ENOENT" || errore.code === "ENOTDIR") return null;
      throw errore;
    }
    return infoIndex.isFile() ? { file: index, info: infoIndex } : null;
  }

  return info.isFile() ? { file: percorso, info } : null;
}

/** Gestisce una singola richiesta HTTP. */
async function gestisciRichiesta(req, res) {
  const metodo = req.method || "GET";

  if (metodo !== "GET" && metodo !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return inviaHtml(
      res,
      405,
      paginaErrore(405, "Metodo non consentito", "Questo server serve file statici e accetta solo richieste GET e HEAD."),
      metodo
    );
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url || "/", "http://localhost").pathname);
  } catch {
    return inviaHtml(
      res,
      400,
      paginaErrore(400, "Richiesta non valida", "L'indirizzo richiesto non è valido o contiene una codifica non supportata."),
      metodo
    );
  }

  // I byte nulli non sono validi nei percorsi e possono confondere le API fs.
  if (pathname.includes("\0")) {
    return inviaHtml(
      res,
      400,
      paginaErrore(400, "Richiesta non valida", "Il percorso richiesto contiene caratteri non ammessi."),
      metodo
    );
  }

  // Difesa dal path traversal: si risolve il percorso e si verifica che
  // rimanga dentro ROOT, confrontando il percorso relativo.
  const percorsoAssoluto = path.resolve(ROOT, `.${pathname}`);
  const percorsoRelativo = path.relative(ROOT, percorsoAssoluto);
  if (percorsoRelativo.startsWith("..") || path.isAbsolute(percorsoRelativo)) {
    return inviaHtml(
      res,
      403,
      paginaErrore(403, "Accesso non consentito", "Il percorso richiesto esce dalla cartella servita dal server."),
      metodo
    );
  }

  let trovato;
  try {
    trovato = await risolviFile(percorsoAssoluto);
  } catch (errore) {
    console.error("Errore di lettura:", errore);
    return inviaHtml(
      res,
      500,
      paginaErrore(500, "Errore interno", "Il server non è riuscito a leggere il file richiesto. Riprova tra poco."),
      metodo
    );
  }

  if (!trovato) {
    return inviaHtml(
      res,
      404,
      paginaErrore(404, "Pagina non trovata", "Il file richiesto non esiste o non è più disponibile. Controlla l'indirizzo oppure torna alla panoramica."),
      metodo
    );
  }

  applicaHeaderBase(res);
  res.writeHead(200, {
    "Content-Type": tipoContenuto(trovato.file),
    "Content-Length": trovato.info.size
  });

  if (metodo === "HEAD") {
    res.end();
    return;
  }

  try {
    await pipeline(createReadStream(trovato.file), res);
  } catch (errore) {
    // Se l'invio è già iniziato non si può più cambiare la risposta:
    // si chiude la connessione. Altrimenti si lascia gestire l'errore
    // al chiamante tramite il catch esterno.
    if (res.headersSent) {
      res.destroy();
    } else {
      throw errore;
    }
  }
}

/**
 * Prova ad aprire il browser con il comando nativo della piattaforma.
 * Qualsiasi errore viene ignorato: il server resta comunque utilizzabile.
 */
function apriBrowser(url) {
  if (process.env.WDI_NO_OPEN === "1") return;

  const opzioni = { detached: true, stdio: "ignore", windowsHide: true };
  let comando;
  let argomenti;

  if (process.platform === "win32") {
    // "start" è un comando interno di cmd.exe; la prima stringa vuota è il titolo.
    comando = "cmd.exe";
    argomenti = ["/c", "start", "", url];
  } else if (process.platform === "darwin") {
    comando = "open";
    argomenti = [url];
  } else {
    comando = "xdg-open";
    argomenti = [url];
  }

  try {
    const processo = spawn(comando, argomenti, opzioni);
    processo.on("error", () => {
      // Browser o comando non disponibile: nessun problema per il server.
    });
    processo.unref();
  } catch {
    // Anche un errore sincrono non deve impedire l'avvio del server.
  }
}

const server = http.createServer((req, res) => {
  gestisciRichiesta(req, res).catch((errore) => {
    console.error("Errore nella richiesta:", errore);
    if (!res.headersSent) {
      inviaHtml(
        res,
        500,
        paginaErrore(500, "Errore interno", "Il server non è riuscito a completare la richiesta. Riprova tra poco."),
        req.method
      );
    } else {
      res.destroy();
    }
  });
});

server.on("error", (errore) => {
  if (errore.code === "EADDRINUSE") {
    console.error("");
    console.error(`  Errore: la porta ${PORTA} è già in uso.`);
    console.error("  Chiudi l'altra istanza oppure scegli una porta diversa:");
    console.error(`    PowerShell:   $env:PORT=4174; node server.mjs`);
    console.error(`    macOS/Linux:  PORT=4174 node server.mjs`);
    console.error("");
    process.exit(1);
  }

  console.error("Errore del server:", errore);
  process.exit(1);
});

server.listen(PORTA, HOST, () => {
  console.log("");
  console.log("  WebDev Innovations — Laboratorio societario");
  console.log(`  Server statico pronto: ${INDIRIZZO}`);
  console.log(`  Cartella servita: ${ROOT}`);
  console.log("  Premi Ctrl+C per fermare il server.");
  console.log("");
  apriBrowser(`${INDIRIZZO}/`);
});

// Chiusura ordinata quando il processo viene interrotto.
for (const segnale of ["SIGINT", "SIGTERM"]) {
  process.on(segnale, () => {
    server.close(() => process.exit(0));
    // Se qualche connessione resta aperta, non bloccare l'uscita a lungo.
    setTimeout(() => process.exit(0), 500).unref();
  });
}
