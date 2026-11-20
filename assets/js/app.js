/* ============================================================
   Avvio dell'applicazione: router hash, shell e comportamenti
   trasversali. Va caricato per ultimo, dopo tutte le viste.
   ============================================================ */
(function () {
  "use strict";

  const W = window.WDI = window.WDI || {};

  /* Rotte statiche. La rotta dei documenti viene costruita a parte,
     perché contiene un identificativo variabile. */
  const ROUTES = {
    "/": { key: "home", title: "Panoramica", nav: "/" },
    "/percorso": { key: "roadmap", title: "Il percorso", nav: "/percorso" },
    "/decisioni": { key: "decisions", title: "Decisioni aperte", nav: "/decisioni" },
    "/snc": { key: "snc", title: "La società oggi", nav: "/snc" },
    "/governance": { key: "governance", title: "Governance e firme", nav: "/governance" },
    "/economia": { key: "economics", title: "Economia e conferimenti", nav: "/economia" },
    "/protezione": { key: "ip", title: "Proprietà intellettuale", nav: "/protezione" },
    "/uscite": { key: "exits", title: "Uscite e conflitti", nav: "/uscite" },
    "/sagl": { key: "sagl", title: "Verso la Sagl", nav: "/sagl" },
    "/controllo": { key: "control", title: "Controllo e voto", nav: "/controllo" },
    "/investimenti": { key: "investments", title: "Investimenti e round", nav: "/investimenti" },
    "/clausole": { key: "clauses", title: "Biblioteca clausole", nav: "/clausole" },
    "/documenti": { key: "docs", title: "Documenti", nav: "/documenti" },
    "/simulatore": { key: "simulator", title: "Simulatore diluizione", nav: "/simulatore" },
    "/fonti": { key: "sources", title: "Fonti e metodo", nav: "/fonti" }
  };

  let revealObserver = null;
  let toastTimer = null;
  let shellReady = false;

  let menuBtn = null;
  let sidebar = null;
  let sidebarOverlay = null;
  let sidebarClose = null;

  // ---------- Utility ----------

  function esc(value) {
    if (W.ui && typeof W.ui.esc === "function") return W.ui.esc(value);
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function toast(message) {
    if (W.ui && typeof W.ui.toast === "function") {
      W.ui.toast(message);
      return;
    }
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.classList.remove("is-visible");
    }, 3200);
  }

  function safeDecode(value) {
    try {
      return decodeURIComponent(value);
    } catch (err) {
      return value;
    }
  }

  function prefersReducedMotion() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  function afterFrame(callback) {
    if (typeof window.requestAnimationFrame === "function") {
      window.requestAnimationFrame(callback);
    } else {
      setTimeout(callback, 0);
    }
  }

  function getView() {
    return document.getElementById("view");
  }

  /* Il cambio pagina deve partire dall'alto, senza ereditare lo
     scorrimento fluido impostato dal CSS. */
  function scrollToTop() {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    try {
      window.scrollTo(0, 0);
    } catch (err) {
      /* In ambienti sandbox lo scroll può non essere disponibile. */
    } finally {
      root.style.scrollBehavior = previous;
    }
  }

  // ---------- Router ----------

  /* Analizza il frammento. Restituisce il percorso normalizzato (senza
     barra finale), i segmenti decodificati e un eventuale sotto-ancora. */
  function parseHash(hash) {
    let raw = String(hash || "");
    if (raw.charAt(0) === "#") raw = raw.slice(1);

    let anchor = "";
    const anchorIndex = raw.indexOf("#");
    if (anchorIndex >= 0) {
      anchor = safeDecode(raw.slice(anchorIndex + 1));
      raw = raw.slice(0, anchorIndex);
    }

    const queryIndex = raw.indexOf("?");
    if (queryIndex >= 0) raw = raw.slice(0, queryIndex);

    const isRoute = raw.charAt(0) === "/";
    const parts = raw.split("/")
      .filter(function (part) { return part !== ""; })
      .map(safeDecode);

    return {
      isRoute: isRoute,
      parts: parts,
      path: "/" + parts.join("/"),
      anchor: anchor
    };
  }

  function docMeta(docId) {
    const map = W.DOC_META;
    if (!map || typeof map !== "object") return null;
    return Object.prototype.hasOwnProperty.call(map, docId) ? map[docId] : null;
  }

  /* Se l'hash è vuoto, lo normalizza a "#/" senza ricaricare la pagina.
     In caso di ambienti che bloccano history.replaceState, lascia che
     sia l'evento hashchange a completare il lavoro. */
  function resolveRoute() {
    let hash = window.location.hash;
    if (!hash || hash === "#") {
      try {
        window.history.replaceState(null, "", "#/");
        hash = "#/";
      } catch (err) {
        window.location.hash = "#/";
        return null;
      }
    }

    const parsed = parseHash(hash);
    let route;

    if (!parsed.isRoute) {
      route = { key: "notfound", title: "Pagina non trovata", nav: null };
    } else if (parsed.path === "/") {
      route = Object.assign({}, ROUTES["/"]);
    } else if (Object.prototype.hasOwnProperty.call(ROUTES, parsed.path)) {
      route = Object.assign({}, ROUTES[parsed.path]);
    } else if (parsed.parts[0] === "documenti" && parsed.parts.length > 1) {
      const docId = parsed.parts.slice(1).join("/");
      const meta = docMeta(docId);
      route = {
        key: "doc",
        title: meta && meta.title ? meta.title : "Documento non trovato",
        nav: "/documenti",
        meta: meta,
        docId: docId
      };
    } else {
      route = { key: "notfound", title: "Pagina non trovata", nav: null };
    }

    route.path = parsed.path;
    route.anchor = parsed.anchor;
    return route;
  }

  function updateNavCount() {
    const el = document.getElementById("nav-open-count");
    if (!el) return;
    const decisions = W.DECISIONS;
    if (!Array.isArray(decisions)) return;

    let count = 0;
    decisions.forEach(function (item) {
      if (item && (item.status === "aperta" || item.status === "verifica")) count++;
    });
    el.textContent = String(count);
  }

  function updateChrome(route) {
    document.title = route.title + " · WebDev Innovations";

    const breadcrumb = document.getElementById("breadcrumb");
    if (breadcrumb) {
      const label = route.key === "doc"
        ? "Documenti / " + route.title
        : route.title;
      breadcrumb.innerHTML = "<span>WebDev Innovations</span><i>/</i><strong>" + esc(label) + "</strong>";
    }

    document.body.classList.toggle("is-doc", route.key === "doc");

    const links = document.querySelectorAll("[data-nav]");
    for (let i = 0; i < links.length; i++) {
      const el = links[i];
      const active = !!route.nav && el.getAttribute("data-nav") === route.nav;
      el.classList.toggle("is-active", active);
      if (active) el.setAttribute("aria-current", "page");
      else el.removeAttribute("aria-current");
    }

    updateNavCount();
  }

  // ---------- Fallback editoriali ----------

  function notFoundPage() {
    const shown = window.location.hash || "#/";
    return '<div class="page"><div class="measure-wide">' +
      '<span class="eyebrow">404 · Percorso non riconosciuto</span>' +
      '<h1 class="page-title mt-2">Questa pagina non esiste.</h1>' +
      '<p class="lead mt-2">Il percorso <span class="mono">' + esc(shown) + '</span> non corrisponde a una sezione del laboratorio. Puoi tornare all\'inizio o consultare i documenti.</p>' +
      '<div class="row gap-1 mt-3">' +
      '<a class="btn btn-ink" href="#/">Torna alla panoramica</a>' +
      '<a class="btn btn-ghost" href="#/documenti">Apri i documenti</a>' +
      '</div>' +
      '<div class="callout callout-example mt-4">' +
      '<div class="callout-title">Nota</div>' +
      '<p>La demo non usa un server: la pagina viene scelta dal frammento dell\'indirizzo. I link della navigazione sono la via più diretta.</p>' +
      '</div>' +
      '</div></div>';
  }

  function docNotFoundPage(route) {
    return '<div class="page is-doc"><div class="measure">' +
      '<span class="eyebrow">Documenti · 404</span>' +
      '<h1 class="page-title mt-2">Documento non trovato.</h1>' +
      '<p class="lead mt-2">Non c\'è un documento con identificativo <span class="mono">' + esc(route.docId) + '</span>. L\'indice contiene le bozze disponibili.</p>' +
      '<div class="row gap-1 mt-3">' +
      '<a class="btn btn-ink" href="#/documenti">Torna ai documenti</a>' +
      '<a class="btn btn-ghost" href="#/">Panoramica</a>' +
      '</div>' +
      '</div></div>';
  }

  function missingViewPage(route) {
    return '<div class="page"><div class="measure">' +
      '<span class="eyebrow">Sezione non disponibile</span>' +
      '<h1 class="page-title mt-2">Contenuto in preparazione.</h1>' +
      '<p class="lead mt-2">La vista «' + esc(route.title) + '» non è stata caricata. Il resto del sito rimane navigabile.</p>' +
      '<div class="row gap-1 mt-3">' +
      '<a class="btn btn-ink" href="#/">Torna alla panoramica</a>' +
      '<a class="btn btn-ghost" href="#/documenti">Apri i documenti</a>' +
      '</div>' +
      '</div></div>';
  }

  // ---------- Reveal ----------

  function setupReveal(view) {
    if (revealObserver) {
      revealObserver.disconnect();
      revealObserver = null;
    }

    const nodes = view.querySelectorAll(".reveal");
    if (!nodes.length) return;

    if (prefersReducedMotion() || typeof window.IntersectionObserver !== "function") {
      for (let i = 0; i < nodes.length; i++) nodes[i].classList.add("is-visible");
      return;
    }

    let observer;
    try {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { root: null, rootMargin: "0px 0px -6% 0px", threshold: 0.08 });
    } catch (err) {
      // Se l'osservatore non è disponibile, mostra subito tutto.
      for (let i = 0; i < nodes.length; i++) nodes[i].classList.add("is-visible");
      return;
    }

    revealObserver = observer;
    for (let i = 0; i < nodes.length; i++) {
      if (!nodes[i].classList.contains("is-visible")) observer.observe(nodes[i]);
    }
  }

  // ---------- Rendering ----------

  function focusView(view) {
    if (!view) return;
    try {
      view.focus({ preventScroll: true });
    } catch (err) {
      try { view.focus(); } catch (e) { /* nessuna azione */ }
    }
  }

  function renderRoute() {
    const route = resolveRoute();
    if (!route) return;

    const view = getView();
    if (!view) return;

    if (isMenuOpen()) setMenuOpen(false);

    let html = "";
    let isFallback = false;
    const ctx = route.key === "doc" ? { docId: route.docId } : {};

    if (route.key === "notfound") {
      html = notFoundPage();
      isFallback = true;
    } else if (route.key === "doc" && !route.meta) {
      html = docNotFoundPage(route);
      isFallback = true;
    } else {
      const views = W.views || {};
      const viewFn = views[route.key];

      if (typeof viewFn !== "function") {
        console.warn("WDI app: vista non disponibile per la rotta «" + route.key + "».");
        html = missingViewPage(route);
        isFallback = true;
      } else {
        try {
          const result = viewFn.call(views, ctx);
          if (typeof result === "string" && result.trim()) {
            html = result;
          } else {
            html = missingViewPage(route);
            isFallback = true;
          }
        } catch (err) {
          console.error("WDI app: errore nel rendering della vista «" + route.key + "».", err);
          toast("Errore nel caricamento della sezione.");
          html = missingViewPage(route);
          isFallback = true;
        }
      }
    }

    view.innerHTML = html;
    scrollToTop();
    updateChrome(route);

    if (!isFallback) {
      const mountMap = W.views && W.views.mount;
      const mountFn = mountMap && mountMap[route.key];
      if (typeof mountFn === "function") {
        try {
          mountFn.call(mountMap, ctx);
        } catch (err) {
          console.error("WDI app: errore nel mount della vista «" + route.key + "».", err);
          toast("Errore nell'inizializzazione della sezione.");
        }
      }
    }

    focusView(view);
    setupReveal(view);

    // Supporto a link profondi nella forma #/documenti/id#sezione.
    if (route.anchor) {
      afterFrame(function () {
        const target = document.getElementById(route.anchor);
        if (target) scrollToTarget(target);
      });
    }
  }

  // ---------- Ancore interne ----------

  function scrollToTarget(target) {
    if (!target) return;
    if (typeof target.scrollIntoView === "function") {
      try {
        target.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start"
        });
      } catch (err) {
        target.scrollIntoView();
      }
    } else {
      window.scrollTo(0, target.offsetTop || 0);
    }
    if (target.id === "view") focusView(target);
  }

  function onHashChange() {
    const hash = window.location.hash;

    // Un'ancora semplice (#sezione) non è una rotta: se l'elemento
    // esiste, ci si limita a scorrerlo. Altrimenti decide il router.
    if (hash && hash !== "#" && hash.charAt(1) !== "/") {
      const id = safeDecode(hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (target) {
        scrollToTarget(target);
        return;
      }
    }

    renderRoute();
  }

  // ---------- Shell e menu mobile ----------

  function isMenuOpen() {
    return !!(sidebar && sidebar.classList.contains("is-open"));
  }

  function setMenuOpen(open, restoreFocus) {
    if (!sidebar) {
      if (menuBtn) menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      return;
    }

    sidebar.classList.toggle("is-open", open);
    if (sidebarOverlay) {
      sidebarOverlay.classList.toggle("is-open", open);
      sidebarOverlay.setAttribute("aria-hidden", open ? "false" : "true");
    }
    if (menuBtn) {
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Chiudi menu" : "Apri menu");
    }

    if (!open && restoreFocus && menuBtn && sidebar.contains(document.activeElement)) {
      menuBtn.focus();
    }
  }

  function initShell() {
    if (shellReady) return;
    shellReady = true;

    sidebar = document.getElementById("sidebar");
    sidebarOverlay = document.getElementById("sidebar-overlay");
    menuBtn = document.getElementById("menu-btn");
    sidebarClose = document.getElementById("sidebar-close");

    const view = getView();
    if (view && !view.hasAttribute("tabindex")) view.setAttribute("tabindex", "-1");

    if (menuBtn) {
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.addEventListener("click", function () {
        setMenuOpen(!isMenuOpen());
      });
    }

    if (sidebarClose) {
      sidebarClose.addEventListener("click", function () {
        setMenuOpen(false, true);
      });
    }

    if (sidebarOverlay) {
      sidebarOverlay.setAttribute("aria-hidden", "true");
      sidebarOverlay.addEventListener("click", function () {
        setMenuOpen(false);
      });
    }

    if (sidebar) {
      sidebar.addEventListener("click", function (event) {
        const target = event.target;
        const link = target && target.closest ? target.closest("a") : null;
        if (link) setMenuOpen(false);
      });
    }

    document.addEventListener("keydown", function (event) {
      if ((event.key === "Escape" || event.key === "Esc") && isMenuOpen()) {
        setMenuOpen(false, true);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 980 && isMenuOpen()) setMenuOpen(false);
    });

    document.addEventListener("click", onPrintClick, true);
    document.addEventListener("click", onDocumentClick);
    updateNavCount();
  }

  // La stampa è gestita in fase di cattura: alcune viste (il simulatore)
  // hanno già un proprio pulsante e non devono stampare due volte.
  function onPrintClick(event) {
    if (event.defaultPrevented) return;
    const target = event.target;
    const button = target && target.closest ? target.closest('[data-action="print"]') : null;
    if (!button) return;

    event.preventDefault();
    event.stopPropagation();
    if (typeof window.print === "function") window.print();
  }

  function copyLink(button) {
    const explicit = button.getAttribute("data-copy");
    const text = explicit || window.location.href;

    function finish(ok) {
      toast(ok ? "Link copiato." : "Copia non riuscita.");
    }

    if (W.ui && typeof W.ui.copyText === "function") {
      try {
        const result = W.ui.copyText(text);
        if (result && typeof result.then === "function") {
          result.then(finish, function () { finish(false); });
        } else {
          finish(result !== false);
        }
        return;
      } catch (err) {
        finish(false);
        return;
      }
    }

    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      try {
        navigator.clipboard.writeText(text).then(
          function () { finish(true); },
          function () { finish(false); }
        );
      } catch (err) {
        finish(false);
      }
      return;
    }

    toast("Copia non disponibile in questo browser.");
  }

  function onDocumentClick(event) {
    if (event.defaultPrevented) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const target = event.target;
    if (!target || !target.closest) return;

    const copyButton = target.closest('[data-action="copy-link"]');
    if (copyButton) {
      event.preventDefault();
      copyLink(copyButton);
      return;
    }

    const link = target.closest("a[href]");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href || href.charAt(0) !== "#") return;

    // Le rotte appartengono al router: nessun intervento.
    if (href.indexOf("#/") === 0) return;

    const linkTarget = link.getAttribute("target");
    if (linkTarget && linkTarget !== "_self") return;

    event.preventDefault();

    if (href === "#") {
      scrollToTop();
      return;
    }

    const id = safeDecode(href.slice(1));
    if (!id) {
      scrollToTop();
      return;
    }

    const element = document.getElementById(id);
    if (element) scrollToTarget(element);
  }

  // ---------- Avvio ----------

  function boot() {
    initShell();
    window.addEventListener("hashchange", onHashChange);
    renderRoute();
  }

  // Piccola API per debug e per eventuali aggiornamenti dei dati.
  if (!W.app || typeof W.app !== "object") W.app = {};
  W.app.render = renderRoute;
  W.app.refreshNavCount = updateNavCount;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
