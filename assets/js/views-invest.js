/* Viste — Investimenti e round; biblioteca clausole.
   Dipende da data.js e ui.js. Nessuna libreria, nessun build. */
(function () {
  "use strict";

  const W = window.WDI = window.WDI || {};
  W.views = W.views || {};
  W.views.mount = W.views.mount || {};
  const U = W.ui;

  const STAGE_LABEL = {
    tutte: "Tutte le forme",
    snc: "SNC",
    sagl: "Sagl",
    sa: "SA"
  };

  const RESOLUTION = {
    primary: "Nella Sagl/SA: delibera dei soci e formalità di aumento; nella SA atto pubblico e iscrizione. Verificare il diritto d'opzione (art. 652b CO; art. 781 CO per la Sagl).",
    secondary: "Nessuna delibera di aumento. Servono le approvazioni previste da statuto o contratto; nella SA verificare gli artt. 685a–685c CO.",
    loan: "Nessuna delibera societaria per il solo prestito. Servono le competenze interne e, se previsto, l'approvazione per indebitamento sopra soglia.",
    convertible: "Alla conversione serve la delibera di aumento e le formalità applicabili; la struttura va verificata con il notaio."
  };

  /* ---------- Investimenti: componenti ---------- */

  function instrumentCard(ins, index) {
    const num = String(index + 1).padStart(2, "0");
    const resolution = RESOLUTION[ins.id] || "Verificare le formalità applicabili.";
    return `<article class="card card-accent">
      <p class="card-kicker">Strumento ${U.esc(num)}</p>
      <h3 class="mt-1">${U.esc(ins.name)}</h3>
      <p class="small muted mt-1">${U.esc(ins.short)}</p>
      <div class="phase-list mt-2">
        <div><span>Chi incassa</span><span>${U.esc(ins.money)}</span></div>
        <div><span>Cap table</span><span>${U.esc(ins.equity)}</span></div>
        <div><span>Voti</span><span>${U.esc(ins.vote)}</span></div>
        <div><span>Delibera</span><span>${U.esc(resolution)}</span></div>
        <div><span>Rischio tipico</span><span>${U.esc(ins.caution)}</span></div>
      </div>
      <p class="mini-note mt-2"><strong>A cosa serve:</strong> ${U.esc(ins.use)}</p>
    </article>`;
  }

  function exampleOne() {
    return `<article class="card card-accent mb-2">
      <div class="row-between gap-1">
        <div>
          <p class="card-kicker">Esempio 1 · Primo round</p>
          <h3>CHF 1'000'000 per il 10% post-money</h3>
        </div>
        ${U.status("esempio")}
      </div>
      <div class="grid-3 mt-2">
        <div class="kpi"><b>CHF 9'000'000</b><span>Pre-money</span></div>
        <div class="kpi"><b>CHF 1'000'000</b><span>Aumento di capitale</span></div>
        <div class="kpi"><b>CHF 10'000'000</b><span>Post-money</span></div>
      </div>
      <div class="chip-row mt-2">
        <span class="chip"><b>Quota</b> 10% post-money</span>
        <span class="chip"><b>Denaro</b> alla società</span>
        <span class="chip"><b>Fondatori</b> non vendono, non versano</span>
      </div>
      ${U.table(
        ["Socio", { label: "Prima", num: true }, { label: "Dopo", num: true }, { label: "Denaro versato", num: true }, "Cosa cambia"],
        [
          ["<strong>Nicola Cappelli</strong>", "50,0%", "45,0%", "CHF 0", "Non vende; non versa"],
          ["<strong>Bryan Ciaponi</strong>", "50,0%", "45,0%", "CHF 0", "Non vende; non versa"],
          ["Investitore", "—", "10,0%", "CHF 1'000'000", "Nuove quote/azioni; il denaro entra in società"],
          ["<strong>Totale</strong>", "<strong>100,0%</strong>", "<strong>100,0%</strong>", "<strong>CHF 1'000'000</strong>", "Il denaro entra in società"]
        ],
        { cls: "table-compact", note: "Esempio illustrativo, non un'offerta. Percentuali semplificate e fully diluted: non includono pool di incentivazione, convertibili o valore nominale." }
      )}
      <div class="instrument-note"><strong>Calcolo.</strong> Post-money = 9'000'000 + 1'000'000 = 10'000'000. Quota = 1'000'000 / 10'000'000 = 10%. I fondatori non vendono quote e non versano nuovo denaro: la loro percentuale scende per effetto dell'emissione.</div>
    </article>`;
  }

  function exampleTwo() {
    return `<article class="card card-accent mb-2">
      <div class="row-between gap-1">
        <div>
          <p class="card-kicker">Esempio 2 · Secondo investitore</p>
          <h3>Un altro 10% post-money, dopo il primo round</h3>
        </div>
        ${U.status("esempio")}
      </div>
      <div class="grid-3 mt-2">
        <div class="kpi"><b>CHF 9'000'000</b><span>Pre-money del round</span></div>
        <div class="kpi"><b>CHF 1'000'000</b><span>Importo</span></div>
        <div class="kpi"><b>CHF 10'000'000</b><span>Post-money</span></div>
      </div>
      ${U.table(
        ["Socio", { label: "Dopo il round 1", num: true }, { label: "Dopo il round 2", num: true }, { label: "Variazione (punti)", num: true }, "Cosa succede"],
        [
          ["<strong>Nicola Cappelli</strong>", "45,0%", "40,5%", "-4,5", "Diluito del 10% relativo"],
          ["<strong>Bryan Ciaponi</strong>", "45,0%", "40,5%", "-4,5", "Diluito del 10% relativo"],
          ["Investitore 1", "10,0%", "9,0%", "-1,0", "Non vende; scende per il nuovo denominatore"],
          ["Investitore 2", "—", "10,0%", "+10,0", "Nuove quote/azioni; CHF 1'000'000 in società"],
          ["<strong>Totale</strong>", "<strong>100,0%</strong>", "<strong>100,0%</strong>", "<strong>0,0</strong>", "Nessuna vendita"]
        ],
        { cls: "table-compact", note: "Esempio illustrativo. Ogni quota precedente è moltiplicata per 0,9: 45% × 0,9 = 40,5%; 10% × 0,9 = 9%. L'investitore 1 possiede le stesse quote/azioni di prima." }
      )}
      <div class="instrument-note"><strong>Perché l'investitore 1 scende.</strong> Non ha venduto nulla: il numero totale di quote/azioni cresce per l'emissione del round 2. La sua percentuale passa dal 10% al 9%, una diluizione relativa del 10%. Per mantenere il 10% deve sottoscrivere la sua parte dell'aumento, se il diritto di sottoscrizione esiste e viene esercitato.</div>
      <div class="mt-2">${U.callout("verify", "Attenzione alla valutazione",
        "<p>L'esempio tiene fermi importo e quota per isolare la diluizione. Non dimostra che il prezzo per quota/azione sia salito: un pre-money di CHF 9'000'000 dopo un post-money di CHF 10'000'000 può implicare un prezzo unitario inferiore. Verificare anti-dilution, diritto d'opzione e cap table fully diluted.</p>")}</div>
    </article>`;
  }

  function exampleThree() {
    return `<article class="card card-accent">
      <div class="row-between gap-1">
        <div>
          <p class="card-kicker">Esempio 3 · Formula generale</p>
          <h3>Ogni round successivo si calcola allo stesso modo</h3>
        </div>
        ${U.status("esempio", "Esempio parametrico")}
      </div>
      <div class="grid-4 mt-2">
        <div class="card card-tight"><p class="card-kicker">Post-money</p><p class="mono mt-1">post = pre + I</p></div>
        <div class="card card-tight"><p class="card-kicker">Quota</p><p class="mono mt-1">q = I / post</p></div>
        <div class="card card-tight"><p class="card-kicker">Diluizione</p><p class="mono mt-1">x_i' = x_i × (1 - q)</p></div>
        <div class="card card-tight"><p class="card-kicker">Prezzo per punto</p><p class="mono mt-1">post / 100</p></div>
      </div>
      <ul class="small muted mt-2" style="padding-left:18px;line-height:1.7">
        <li><strong>I</strong>: importo dell'aumento di capitale.</li>
        <li><strong>pre</strong>: pre-money, cioè il valore dell'equity prima dell'aumento.</li>
        <li><strong>post</strong>: post-money, cioè pre-money più importo.</li>
        <li><strong>q</strong>: quota del nuovo investitore sul post-money.</li>
        <li><strong>x_i</strong>: quota del socio i prima del round; <strong>x_i'</strong> la quota dopo, se non partecipa.</li>
      </ul>
      <div class="instrument-note"><strong>Esempio parametrico.</strong> pre = CHF 12'000'000; I = CHF 3'000'000; post = CHF 15'000'000; q = 3'000'000 / 15'000'000 = 20%; prezzo per punto percentuale = CHF 150'000.</div>
      ${U.table(
        ["Socio", { label: "Prima", num: true }, { label: "Dopo", num: true }, { label: "Variazione (punti)", num: true }],
        [
          ["Socio A", "40,0%", "32,0%", "-8,0"],
          ["Socio B", "40,0%", "32,0%", "-8,0"],
          ["Investitore esistente", "20,0%", "16,0%", "-4,0"],
          ["Nuovo investitore", "—", "20,0%", "+20,0"],
          ["<strong>Totale</strong>", "<strong>100,0%</strong>", "<strong>100,0%</strong>", "<strong>0,0</strong>"]
        ],
        { cls: "table-compact", note: "Esempio parametrico con soci astratti, non un terzo round della serie. La formula assume che nessun socio precedente partecipi; chi partecipa pro-rata mantiene una quota maggiore. Non include pool di incentivazione, convertibili o valore nominale." }
      )}
      <p class="mini-note mt-2">Per più round consecutivi senza partecipazione: <span class="mono">x_finale = x_iniziale × (1 - q1) × (1 - q2) × ...</span>. Il prezzo per punto percentuale è un valore implicito: non è il prezzo della singola quota o azione, che dipende dal numero di quote/azioni e dal nominale.</p>
    </article>`;
  }

  function flowTable() {
    return U.table(
      ["Strumento", "Chi paga", "Chi riceve", "Cassa della società", "Cap table"],
      [
        ["<strong>Aumento di capitale</strong>", "Investitore", "Società", "Sì: entra capitale", "Nuove quote/azioni; tutti i soci precedenti sono diluiti"],
        ["<strong>Vendita secondaria</strong>", "Investitore", "Socio venditore", "No: il prezzo va al venditore", "Nessuna nuova partecipazione; cambia il titolare"],
        ["<strong>Prestito</strong>", "Socio o terzo", "Società", "Sì, ma è debito", "Nessuna variazione; il debito va rimborsato"],
        ["<strong>Convertibile</strong>", "Investitore", "Società", "Sì, come debito fino alla conversione", "Nessuna variazione fino alla conversione; poi nuove quote/azioni"]
      ],
      { cls: "table-compact", note: "La tabella descrive il flusso, non la convenienza o la validità dell'operazione. La domanda operativa è una sola: l'importo entra nel conto della società o in quello di un socio?" }
    );
  }

  function protectionCards() {
    return `<div class="grid-2">
      <article class="card card-accent">
        <div class="row-between gap-1">
          <p class="card-kicker mb-0">Clausola c07</p>
          ${U.status("verifica")}
        </div>
        <h3 class="mt-1">Anti-dilution</h3>
        <p class="small muted mt-1">Protegge l'investitore da emissioni future a un prezzo per quota/azione inferiore.</p>
        <div class="stack-sm mt-2">
          <div><p class="tiny muted mb-0">A cosa serve</p><p class="small">Correggere la posizione dell'investitore con un aggiustamento di prezzo o un'emissione compensativa.</p></div>
          <div><p class="tiny muted mb-0">Come si scrive</p><p class="small">Full ratchet o broad-based weighted average, con esclusioni per piani di incentivazione, conversioni e operazioni approvate; eventuale cap.</p></div>
          <div><p class="tiny muted mb-0">Cosa non fa</p><p class="small">Non impedisce la diluizione se l'investitore non partecipa e non garantisce un exit o un rendimento.</p></div>
          <div><p class="tiny muted mb-0">Dove si attua</p><p class="small">Investor agreement e delibera di aumento. SA: artt. 652b e 704 CO. Sagl: art. 781 CO.</p></div>
        </div>
        <p class="mini-note mt-2">La formula va testata sulla cap table fully diluted. Non è un diritto legale generale.</p>
      </article>
      <article class="card card-accent">
        <div class="row-between gap-1">
          <p class="card-kicker mb-0">Clausola c18</p>
          ${U.status("verifica")}
        </div>
        <h3 class="mt-1">Liquidation preference</h3>
        <p class="small muted mt-1">Stabilisce l'ordine di pagamento del ricavato in caso di vendita o liquidazione.</p>
        <div class="stack-sm mt-2">
          <div><p class="tiny muted mb-0">A cosa serve</p><p class="small">Definire se e in che misura l'investitore recupera il capitale prima della ripartizione residuale.</p></div>
          <div><p class="tiny muted mb-0">Come si scrive</p><p class="small">Preferenza 1x non partecipante o partecipante con cap, seniority, definizione di exit e di ricavato netto.</p></div>
          <div><p class="tiny muted mb-0">Cosa non fa</p><p class="small">Non è un debito e non dà diritto a essere pagati prima dei creditori sociali; non garantisce un importo.</p></div>
          <div><p class="tiny muted mb-0">Dove si attua</p><p class="small">Statuto con quote/azioni privilegiate. SA: artt. 654 e 656 CO. Sagl: art. 799 CO.</p></div>
        </div>
        <p class="mini-note mt-2">Può ridurre il ricavato dei fondatori. Va coordinata con la cap table e con le regole di exit.</p>
      </article>
    </div>`;
  }

  function rightsTable() {
    const law = U.pill("Legge", "status-law");
    const contract = U.pill("Contratto", "status-draft");
    const both = law + contract;
    return U.table(
      ["Diritto", "Cosa dà", "Fonte", "Limite"],
      [
        ["<strong>Informazione</strong>", "Ragguagli sulla gestione e accesso ai documenti nei limiti di legge.", law, "Sagl art. 802; SA art. 697. Segreto d'affari e tempistiche."],
        ["<strong>Report</strong>", "Report periodici su cassa, ricavi, budget e cap table.", contract, "Frequenza e contenuto da scrivere; si aggiungono ai diritti di legge."],
        ["<strong>Voto</strong>", "Partecipazione all'assemblea e voto secondo statuto.", law, "Può differire dalla quota economica; artt. 692–693 CO (SA), 806 CO (Sagl)."],
        ["<strong>Pro-rata</strong>", "Sottoscrivere la propria parte delle nuove emissioni.", both, "SA art. 652b; Sagl art. 781. Over-allotment solo se scritto. Non automatico in SNC."],
        ["<strong>Veto (dove ammesso)</strong>", "Bloccare o condizionare materie riservate.", both, "Sagl art. 807, personale e non trasferibile. SA: no veto statutario generale; patto parasociale."],
        ["<strong>Tag / drag</strong>", "Vendere insieme al controllo o essere trascinati in un'exit.", contract, "Nessun diritto legale generale; richiede soglie, prezzo e tutele."],
        ["<strong>Board seat / observer</strong>", "Seggio o osservatore nell'organo di gestione.", both, "SA: art. 709 per le categorie. Sagl: statuto e gerenza. Osservatore solo contrattuale."],
        ["<strong>Advisory board</strong>", "Pareri e rete, senza poteri di gestione.", contract, "Non è un organo societario; nessun potere di rappresentanza."]
      ],
      { cls: "table-compact", note: "Legge = previsto dalla legge o dallo statuto sociale. Contratto = previsto in un accordo tra le parti. Un patto tra soci non sostituisce la delibera dell'assemblea." }
    );
  }

  function advisoryCard() {
    return `<article class="card card-dark mt-2">
      <div class="row-between gap-1">
        <div>
          <p class="card-kicker" style="color:#d99b84">Governance consultiva</p>
          <h3 style="color:#f3edde">Investor Advisory Board</h3>
        </div>
        ${U.pill("Consultivo", "status-future")}
      </div>
      <p class="small mt-2" style="color:#b9c8bd">Un gruppo di consiglieri, non un organo societario. Formula pareri e porta competenze, senza gestire e senza rappresentare la società.</p>
      <div class="grid-2 mt-2">
        <div>
          <h4 style="color:#f3edde">Cosa può fare</h4>
          <ul class="small" style="color:#c7d4ca;padding-left:16px;line-height:1.6;margin-top:6px">
            <li>Formulare pareri non vincolanti su strategia, prodotto e mercato.</li>
            <li>Condividere contatti, esperienze e competenze.</li>
            <li>Analizzare opportunità e rischi con la direzione.</li>
            <li>Facilitare relazioni con investitori e partner, senza impegnare la società.</li>
          </ul>
        </div>
        <div>
          <h4 style="color:#f3edde">Cosa non può fare</h4>
          <ul class="small" style="color:#c7d4ca;padding-left:16px;line-height:1.6;margin-top:6px">
            <li>Gestire la società o impartire istruzioni vincolanti.</li>
            <li>Rappresentare la società verso terzi.</li>
            <li>Sostituirsi all'assemblea, ai gerenti o al consiglio.</li>
            <li>Creare diritti sociali o un diritto di veto.</li>
          </ul>
        </div>
      </div>
      <div class="divider-tight" style="background:rgba(255,255,255,.14)"></div>
      <p class="tiny" style="color:#93a79a">Il charter definisce composizione, durata, compiti, riunioni, conflitti, riservatezza e compenso. Non è un organo societario e non richiede iscrizione. Le decisioni restano agli organi di legge.</p>
      <div class="mt-2">${U.btn("Charter nell'Investor Agreement", "#/documenti/investor", "btn-soft btn-sm", "file")}</div>
    </article>`;
  }

  /* ---------- Investimenti: vista ---------- */

  function investments() {
    const instruments = Array.isArray(W.INSTRUMENTS) ? W.INSTRUMENTS : [];
    const instrumentCards = instruments.map(instrumentCard).join("");

    return `<div class="page">
      <header class="doc-header">
        <div class="measure-wide">
          <span class="eyebrow">Investimenti e round · Fase di crescita</span>
          <h1>Raccogliere capitale non significa vendere il controllo. Significa scegliere lo strumento giusto.</h1>
          <p class="lead mt-2">Quattro strumenti, un solo criterio: capire chi riceve il denaro, chi viene diluito e chi mantiene il controllo. Gli esempi sono illustrativi e non sono un'offerta.</p>
          <div class="doc-meta">
            ${U.pill("Esempi illustrativi", "status-example")}
            ${U.pill("Sagl / SA", "status-future")}
            ${U.pill("Verifica legale", "status-verify")}
          </div>
          <div class="doc-actions">
            ${U.btn("Simula la diluizione", "#/simulatore", "btn-ink", "calculator")}
            ${U.btn("Investor Agreement", "#/documenti/investor", "btn-ghost", "file")}
            ${U.btn("Controllo e voto", "#/controllo", "btn-ghost", "chart")}
          </div>
          <p class="mini-note mt-2">Materiale dimostrativo. Non è consulenza legale, fiscale o finanziaria. Ogni round richiede verifica professionale e, dove applicabile, obblighi LSerFi.</p>
        </div>
      </header>

      <section class="section">
        ${U.sectionHead("01", "Strumenti", "Quattro modi di far entrare capitale",
          "Non sono quattro nomi per la stessa operazione. Cambiano il flusso di cassa, la cap table, i voti e le formalità. La scheda descrive il meccanismo, non autorizza l'operazione.")}
        <div class="grid-2">${instrumentCards}</div>
        <p class="mini-note mt-2">La SNC non ha quote o azioni come la Sagl o la SA. Le schede descrivono la fase di crescita: nella SNC l'ingresso di un socio e le modifiche del contratto seguono il contratto sociale e il consenso richiesto.</p>
      </section>

      <section class="section">
        ${U.sectionHead("02", "Esempi", "Tre esempi, nessuna offerta",
          "Il primo mostra un aumento di capitale; il secondo la diluizione di chi non partecipa; il terzo la formula per i round successivi. I numeri sono illustrativi e non definiscono una valutazione.",
          U.status("esempio", "Numeri illustrativi"))}
        ${exampleOne()}
        ${exampleTwo()}
        ${exampleThree()}
      </section>

      <section class="section">
        ${U.sectionHead("03", "Fondatori", "Chi partecipa e chi resta fuori",
          "La legge non impone un versamento ulteriore. La mancata partecipazione ha un effetto economico, non una sanzione automatica. Le regole cambiano con la forma societaria.")}
        ${U.callout("warning", "I fondatori non sono obbligati a investire",
          "<p>Nessuna regola della Sagl o della SA impone a Nicola e Bryan di versare nuovo denaro in un aumento di capitale. Se non partecipano, la loro percentuale scende perché aumentano le quote/azioni in circolazione. Non c'è una penale automatica, salvo un obbligo contrattuale specifico.</p>" +
          "<p>Il diritto di sottoscrizione pro quota va coordinato con la legge e con lo statuto: nella SA art. 652b CO; nella Sagl art. 781 CO richiama per analogia le regole sull'aumento. Nella SNC non ci sono azioni: l'ingresso di un nuovo socio e la modifica del contratto seguono il contratto sociale e il consenso richiesto.</p>")}
        <div class="split-list mt-2">
          <div>
            <h4>Cosa comporta la mancata partecipazione</h4>
            <ul>
              <li>Riduzione della percentuale economica.</li>
              <li>Possibile riduzione del peso di voto, se il voto segue il capitale.</li>
              <li>Necessità di aggiornare la cap table e i patti.</li>
              <li>Possibile indebolimento dei diritti speciali, solo secondo le regole applicabili.</li>
            </ul>
          </div>
          <div>
            <h4>Cosa non comporta automaticamente</h4>
            <ul>
              <li>Nessun pagamento o penale.</li>
              <li>Nessuna perdita delle quote/azioni già possedute.</li>
              <li>Nessuna esclusione dalla società.</li>
              <li>Nessun obbligo di vendere a un terzo.</li>
            </ul>
          </div>
        </div>
        <p class="mini-note mt-2">Salvo obblighi contrattuali diversi, da verificare. La diluizione riduce la percentuale, non necessariamente il valore assoluto: il valore dipende dalla valutazione e dal futuro della società.</p>
      </section>

      <section class="section">
        ${U.sectionHead("04", "Flussi", "Il denaro va alla società o ai soci?",
          "La prima domanda non è quanto vale la società, ma dove finisce l'assegno. Se il denaro va a un socio, non è un aumento di capitale e la società non incassa.")}
        ${flowTable()}
        <div class="mt-2">${U.callout("note", "Vendita secondaria e aumento non sono la stessa cosa",
          "<p>Nella vendita secondaria il compratore paga il socio venditore: la società non riceve liquidità e non emette nuove partecipazioni. Nell'aumento di capitale la società emette nuove quote/azioni e riceve il denaro. Il prezzo per punto percentuale può sembrare simile, ma l'effetto su cassa e cap table è diverso.</p>")}</div>
      </section>

      <section class="section">
        ${U.sectionHead("05", "Protezioni", "Anti-dilution e preferenza di liquidazione",
          "Due clausole che gli investitori chiedono spesso. Non sono garanzie di rendimento e non sostituiscono la due diligence. Vanno scritte nell'investor agreement e attuate con lo statuto e le delibere.",
          U.status("verifica", "Da negoziare"))}
        ${protectionCards()}
        <p class="mini-note mt-2">Nessuna delle due clausole garantisce un prezzo, un exit o un rendimento. Proteggono solo negli scenari e nei limiti scritti. Rimandi: <a href="#/clausole">c07 e c18 nella biblioteca clausole</a>; <a href="#/documenti/investor">Investor Agreement</a>.</p>
      </section>

      <section class="section">
        ${U.sectionHead("06", "Diritti", "Cosa può chiedere un investitore",
          "Un diritto legale si esercita nei limiti della legge; un diritto contrattuale vale tra chi firma. La tabella distingue i due livelli e indica dove il diritto può essere limitato.")}
        ${rightsTable()}
        ${advisoryCard()}
        <p class="mini-note mt-2">Il diritto di informazione non è un diritto di gestione. Il veto, dove ammesso, non sostituisce la delibera dell'assemblea.</p>
      </section>

      <section class="section">
        ${U.sectionHead("07", "Prossimi passi", "Dai principi ai numeri",
          "Tre strumenti per passare dalla lettura ai calcoli. Nessuno produce un documento firmabile: servono a preparare le domande e a verificare le ipotesi.")}
        <div class="grid-3">
          <article class="card card-flat">
            <p class="card-kicker">Simulatore</p>
            <h3>Prova i numeri</h3>
            <p class="small muted mt-1">Un aumento, una vendita secondaria, un prestito o un convertibile. La cap table cambia in modo diverso.</p>
            <div class="mt-2">${U.btn("Apri il simulatore", "#/simulatore", "btn-ghost btn-sm", "calculator")}</div>
          </article>
          <article class="card card-flat">
            <p class="card-kicker">Documento 06</p>
            <h3>Investor Agreement</h3>
            <p class="small muted mt-1">Term sheet, diritti, materie riservate, anti-dilution, preferenza di liquidazione e closing.</p>
            <div class="mt-2">${U.btn("Apri il modello", "#/documenti/investor", "btn-ghost btn-sm", "file")}</div>
          </article>
          <article class="card card-flat">
            <p class="card-kicker">Controllo</p>
            <h3>Economia e voti</h3>
            <p class="small muted mt-1">Non sono la stessa cosa. Verifica quanto pesa una quota economica nel modello di voto.</p>
            <div class="mt-2">${U.btn("Apri controllo e voto", "#/controllo", "btn-ghost btn-sm", "chart")}</div>
          </article>
        </div>
        <div class="mt-2">${U.callout("verify", "Prima di contattare il mercato",
          "<p>La raccolta presso investitori può attivare obblighi della LSerFi, inclusi prospetto ed esenzioni, e richiede di documentare destinatari, canali e sollecitazione. Verificare prima di inviare un term sheet o contattare il mercato.</p>")}</div>
        <p class="mini-note mt-2">Materiale dimostrativo. Non è un'offerta, un impegno a investire o una consulenza legale, fiscale o finanziaria.</p>
      </section>
    </div>`;
  }

  /* ---------- Clausole: componenti ---------- */

  function clauseCard(c) {
    const benefits = (c.benefits || []).map(function (item) {
      return "<li>" + U.esc(item) + "</li>";
    }).join("");
    const risks = (c.risks || []).map(function (item) {
      return "<li>" + U.esc(item) + "</li>";
    }).join("");
    const status = U.status(c.status);
    const stageLabel = STAGE_LABEL[c.stage] || c.stage;

    return `<details class="clause" data-id="${U.esc(c.id)}" data-stage="${U.esc(c.stage)}">
      <summary>
        <span class="clause-num">${U.esc(String(c.id || "").toUpperCase())}</span>
        <span class="clause-title">${U.esc(c.name)}</span>
        <span class="clause-docs">${status}<span style="display:block;margin-top:4px">${U.esc(c.docs)}</span></span>
        <svg class="clause-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </summary>
      <div class="clause-body">
        <div class="clause-field mt-2">
          <h5>Scopo</h5>
          <p>${U.esc(c.purpose)}</p>
        </div>
        <div class="clause-field mt-2">
          <h5>Come funziona</h5>
          <p>${U.esc(c.how)}</p>
        </div>
        <div class="clause-grid">
          <div class="clause-field">
            <h5>Benefici</h5>
            <ul class="benefits">${benefits}</ul>
          </div>
          <div class="clause-field">
            <h5>Rischi</h5>
            <ul class="risks">${risks}</ul>
          </div>
        </div>
        <div class="clause-grid">
          <div class="clause-field">
            <h5>Documenti</h5>
            <p>${U.esc(c.docs)}</p>
          </div>
          <div class="clause-field">
            <h5>Limiti di legge</h5>
            <p>${U.esc(c.limits)}</p>
          </div>
        </div>
        <div class="clause-field mt-2">
          <h5>Nota</h5>
          <p>${U.esc(c.note)}</p>
        </div>
        <div class="clause-foot">
          <span class="label">Stage</span><span class="chip"><b>${U.esc(stageLabel)}</b></span>
          <span class="label">Stato</span>${status}
        </div>
      </div>
    </details>`;
  }

  function clauseCountForStage(clauses, stage) {
    if (stage === "tutte") return clauses.length;
    return clauses.filter(function (c) {
      return c.stage === "tutte" || c.stage === stage;
    }).length;
  }

  /* ---------- Clausole: vista ---------- */

  function clauses() {
    const list = Array.isArray(W.CLAUSES)
      ? W.CLAUSES.slice().sort(function (a, b) { return String(a.id).localeCompare(String(b.id)); })
      : [];

    const stageDefs = [
      { key: "tutte", label: "Tutte" },
      { key: "snc", label: "SNC" },
      { key: "sagl", label: "Sagl" },
      { key: "sa", label: "SA" }
    ];

    const stageButtons = stageDefs.map(function (s) {
      const count = clauseCountForStage(list, s.key);
      const active = s.key === "tutte";
      return `<button class="filter-btn${active ? " is-active" : ""}" type="button" data-clause-stage="${U.esc(s.key)}" aria-pressed="${active ? "true" : "false"}">${U.esc(s.label)} <span class="tiny" style="opacity:.7">${count}</span></button>`;
    }).join("");

    const cards = list.map(clauseCard).join("");
    const total = list.length;
    const countLabel = total === 1 ? "1 clausola" : total + " clausole";
    const fallback = '<div class="clause-empty">Nessuna clausola disponibile in questa versione.</div>';

    return `<div class="page">
      <div id="clause-library">
        <header class="doc-header">
          <div class="measure-wide">
            <span class="eyebrow">Strumenti · Biblioteca</span>
            <h1>Diciassette clausole, ma non tutte stanno bene ovunque.</h1>
            <p class="lead mt-2">La biblioteca della demo contiene venti schede. Il titolo è un monito, non un inventario: nessuna clausola è neutra e nessuna vale ovunque. La matrice è una cassetta degli attrezzi, non un contratto da incollare.</p>
            <div class="doc-meta">
              ${U.pill(total + " schede · c01–c20", "status-example")}
              ${U.pill("Legge / proposta / verifica", "status-verify")}
              ${U.pill("Non firmabile", "status-formal")}
            </div>
            <div class="doc-actions">
              ${U.btn("Accordo tra fondatori", "#/documenti/founder", "btn-ink", "file")}
              ${U.btn("Investor Agreement", "#/documenti/investor", "btn-ghost", "file")}
              ${U.btn("Investimenti e round", "#/investimenti", "btn-ghost", "chart")}
            </div>
            <p class="mini-note mt-2">La matrice è una cassetta degli attrezzi. Una scheda non entra in un contratto finché non è scelta, adattata e verificata.</p>
          </div>
        </header>

        <section class="section">
          ${U.sectionHead("01", "Legenda", "Leggere una scheda prima di usarla",
            "Lo stato descrive il testo, non la validità. Lo stage descrive il contesto di progetto, non un'autorizzazione automatica.")}
          ${U.callout("warning", "Non tutte le clausole stanno nella SNC",
            "<p>La SNC non ha quote o azioni né una struttura di organi come la Sagl o la SA. Le clausole su aumento di capitale, anti-dilution, preferenza di liquidazione, voto privilegiato e consiglio di amministrazione presuppongono una società di capitali. Nella SNC vanno riscritte o non si applicano.</p>" +
            "<p>Anche una scheda marcata <strong>tutte</strong> è una clausola da adattare: lo stage indica il contesto di progetto, non una validità automatica.</p>")}
          <div class="card card-flat mt-2">
            <div class="row-between gap-2">
              <div class="legend-box" aria-label="Legenda degli stati">
                ${U.status("legge")}
                ${U.status("proposta")}
                ${U.status("verifica")}
                ${U.status("esempio")}
                ${U.status("futuro")}
                ${U.status("aperta", "Da decidere")}
              </div>
              <span class="tiny muted">La legenda descrive il testo, non la validità.</span>
            </div>
            <p class="mini-note mt-1">Legge: regola vigente. Proposta: testo da negoziare. Verifica: richiede un professionista. Esempio: dato illustrativo. Futuro: meccanismo di una fase successiva. Da decidere: punto aperto.</p>
            <div class="chip-row mt-2">
              <span class="chip"><b>Tutte</b> clausola trasversale, da adattare</span>
              <span class="chip"><b>Sagl</b> scritta per la fase Sagl; non automatica in SNC o SA</span>
            </div>
          </div>
          <div class="mt-2">${U.callout("decision", "La matrice è una cassetta degli attrezzi",
            "<p>Non inserire tutte le venti schede in un contratto. Scegliere poche clausole, adattarle alla forma societaria e verificare chi può azionarle. Un testo più lungo non è un testo più sicuro: ogni veto e ogni consenso ha un costo di stallo.</p>")}</div>
        </section>

        <section class="section">
          ${U.sectionHead("02", "Schede", "Filtra, leggi, scegli",
            "Filtra per forma societaria e cerca per nome, scopo o documento. Il contatore indica quante schede restano visibili.")}
          <div class="card card-tight mb-2">
            <div class="row-between gap-2">
              <div class="search-box" style="flex:1 1 280px;max-width:440px">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="1.6"/><path d="M16 16l4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
                <input type="search" id="clause-search" placeholder="Cerca per nome, scopo o documento" aria-label="Cerca nelle clausole" aria-controls="clause-list" autocomplete="off" spellcheck="false">
              </div>
              <div class="filters" id="clause-stage-filters" role="group" aria-label="Filtra per forma societaria">
                ${stageButtons}
              </div>
            </div>
            <div class="row-between mt-1">
              <p class="mini-note mb-0">I conteggi includono le clausole trasversali. Stage <b>tutte</b> non significa valida ovunque: significa da adattare.</p>
              <div class="row gap-1">
                <span class="ledger-count" id="clause-count" aria-live="polite">${countLabel}</span>
                <button class="btn btn-ghost btn-sm" type="button" data-clause-reset>Azzera</button>
              </div>
            </div>
          </div>
          <div class="clause-empty" id="clause-empty" role="status" hidden>Nessuna clausola corrisponde ai filtri. Cambia forma societaria o cancella il testo di ricerca.</div>
          <div id="clause-list">${cards || fallback}</div>
          <p class="mini-note mt-2">Le clausole sono schede di lavoro. Non sono testi da firmare e non sostituiscono la verifica di un professionista svizzero.</p>
        </section>

        <section class="section">
          ${U.sectionHead("03", "Selezione", "La clausola giusta non è quella che copre tutto",
            "Quattro criteri per scartare le clausole che non stanno nella forma societaria o che costano più di quanto proteggono.")}
          ${U.callout("decision", "Come scegliere",
            "<p>Quattro criteri, non una ricetta. Servono a scegliere poche clausole davvero utili e a lasciare fuori quelle che bloccano la società senza proteggere nessuno.</p>" +
            "<ol style=\"padding-left:18px;margin:8px 0 0;line-height:1.6\">" +
            "<li><strong>Forma societaria.</strong> La clausola deve stare nello strumento giusto: contratto SNC, statuto Sagl/SA o patto parasociale. Copiare una clausola SA in una SNC non la rende valida.</li>" +
            "<li><strong>Enforceability.</strong> Chiedersi chi può azionarla e davanti a chi. Un patto tra soci vincola i firmatari; non sempre la società o i terzi. Verificare forma, rimedi e legge applicabile.</li>" +
            "<li><strong>Interessi degli investitori.</strong> La protezione deve essere proporzionata al rischio e al ruolo. Informazione e pro-rata sono spesso più utili di un veto ampio; il veto serve dove il diritto lo consente.</li>" +
            "<li><strong>Costo di stallo.</strong> Ogni consenso, veto o deadlock ha un costo in tempo e potere. Poche materie, soglie chiare, escalation e termini scritti.</li>" +
            "</ol>" +
            "<div class=\"row gap-1 mt-2\">" +
            U.btn("Accordo tra fondatori", "#/documenti/founder", "btn-ghost btn-sm", "file") +
            U.btn("Investor Agreement", "#/documenti/investor", "btn-ghost btn-sm", "file") +
            "</div>")}
          <p class="mini-note mt-2">Nessuna scheda è un parere legale. La scelta finale va documentata e verificata.</p>
          <div class="doc-nav">
            ${U.btn("Torna agli investimenti", "#/investimenti", "btn-ghost", "chevronLeft")}
            ${U.btn("Accordo tra fondatori", "#/documenti/founder", "btn-ghost", "file")}
            ${U.btn("Investor Agreement", "#/documenti/investor", "btn-ghost", "file")}
          </div>
        </section>
      </div>
    </div>`;
  }

  /* ---------- Clausole: mount ---------- */

  function mountClauses() {
    const root = document.getElementById("clause-library");
    if (!root || root.getAttribute("data-clauses-mounted") === "1") return;
    root.setAttribute("data-clauses-mounted", "1");

    const allClauses = Array.isArray(W.CLAUSES) ? W.CLAUSES.slice() : [];
    const byId = {};
    allClauses.forEach(function (c) { byId[c.id] = c; });

    function normalize(value) {
      return String(value == null ? "" : value)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    }

    function stageMatches(stage, filter) {
      if (filter === "tutte") return true;
      return stage === "tutte" || stage === filter;
    }

    function clauseWord(n) {
      return n === 1 ? "clausola" : "clausole";
    }

    function apply() {
      const search = root.querySelector("#clause-search");
      const filters = root.querySelector("#clause-stage-filters");
      const count = root.querySelector("#clause-count");
      const empty = root.querySelector("#clause-empty");
      const list = root.querySelector("#clause-list");
      if (!list) return;

      const active = filters ? filters.querySelector(".filter-btn.is-active") : null;
      const stage = active ? active.getAttribute("data-clause-stage") : "tutte";
      const terms = normalize(search ? search.value : "").split(/\s+/).filter(Boolean);
      let visible = 0;

      const items = list.querySelectorAll("details.clause");
      Array.prototype.forEach.call(items, function (item) {
        const clause = byId[item.getAttribute("data-id")];
        if (!clause) {
          item.hidden = true;
          return;
        }
        const haystack = normalize([clause.id, clause.name, clause.purpose, clause.docs].join(" "));
        const stageOk = stageMatches(clause.stage, stage);
        const textOk = terms.every(function (term) { return haystack.indexOf(term) !== -1; });
        const show = stageOk && textOk;
        item.hidden = !show;
        if (show) visible++;
      });

      const total = allClauses.length || items.length;
      if (count) {
        count.textContent = visible === total
          ? visible + " " + clauseWord(visible)
          : visible + " di " + total + " " + clauseWord(total);
      }
      if (empty) empty.hidden = visible !== 0;
    }

    function setStage(stage) {
      const filters = root.querySelector("#clause-stage-filters");
      if (!filters) return;
      const buttons = filters.querySelectorAll(".filter-btn");
      Array.prototype.forEach.call(buttons, function (button) {
        const active = button.getAttribute("data-clause-stage") === stage;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });
      apply();
    }

    root.addEventListener("click", function (event) {
      const target = event.target;
      if (!target || !target.closest) return;

      const stageBtn = target.closest("[data-clause-stage]");
      if (stageBtn && root.contains(stageBtn)) {
        setStage(stageBtn.getAttribute("data-clause-stage"));
        return;
      }

      const resetBtn = target.closest("[data-clause-reset]");
      if (resetBtn && root.contains(resetBtn)) {
        const search = root.querySelector("#clause-search");
        if (search) search.value = "";
        setStage("tutte");
        if (search) search.focus();
      }
    });

    root.addEventListener("input", function (event) {
      if (event.target && event.target.id === "clause-search") apply();
    });

    root.addEventListener("keydown", function (event) {
      if (event.target && event.target.id === "clause-search" && (event.key === "Escape" || event.key === "Esc")) {
        if (event.target.value) {
          event.target.value = "";
          apply();
        }
      }
    });

    apply();
  }

  W.views.investments = investments;
  W.views.clauses = clauses;
  W.views.mount.clauses = mountClauses;
})();
