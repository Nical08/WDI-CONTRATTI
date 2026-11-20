/* Viste 01–02 — La società oggi (SNC) e Governance e firme. */
(function () {
  "use strict";

  const W = window.WDI = window.WDI || {};
  window.WDI.views = window.WDI.views || {};
  const U = W.ui;

  function lawCard(art, title, text) {
    return '<div class="card card-flat">' +
      '<div class="row-between"><p class="card-kicker mb-0">' + U.esc(art) + '</p>' + U.status("legge") + '</div>' +
      '<h3 class="mt-1">' + U.esc(title) + '</h3>' +
      '<p class="small muted mt-1">' + text + '</p>' +
      '</div>';
  }

  function checkItem(title, text) {
    return '<div style="display:flex;gap:10px;align-items:flex-start">' +
      '<span aria-hidden="true" style="flex:0 0 auto;width:15px;height:15px;margin-top:3px;border:1px solid var(--line-strong);background:var(--surface);border-radius:2px"></span>' +
      '<div><strong>' + U.esc(title) + '</strong><p class="small muted mb-0">' + text + '</p></div>' +
      '</div>';
  }

  W.views.snc = function (ctx) {
    return `<div class="page">
      <div class="grid-2-1">
        <div>
          <span class="eyebrow">Fase 01 · SNC</span>
          <h1 class="page-title mt-2">Due persone, una ditta, una responsabilità che resta personale.</h1>
          <p class="lead mt-2">La società in nome collettivo è il contenitore di partenza: due soci, nessun capitale azionario e una responsabilità che nessun accordo interno può cancellare. Qui trovi ciò che è già deciso, ciò che è proposto e ciò che resta aperto prima della firma.</p>
          <div class="row gap-1 mt-3">
            ${U.btn("Governance e firme", "#/governance", "btn-ink", "scale")}
            ${U.btn("Leggi il contratto", "#/documenti/snc", "btn-ghost", "file")}
          </div>
        </div>
        <aside class="card card-flat" aria-label="Scheda di identità della società">
          <div class="row-between">
            <p class="card-kicker mb-0">Identità · bozza</p>
            ${U.status("definito", "SNC oggi")}
          </div>
          <div class="stack-sm mt-2">
            <div>
              <p class="tiny muted mb-0">Forma</p>
              <p><strong>Società in nome collettivo</strong><br><span class="small muted">Nessun capitale azionario, nessun capitale minimo legale</span></p>
            </div>
            <div class="divider-tight" style="margin:2px 0"></div>
            <div>
              <p class="tiny muted mb-0">Sede</p>
              <p>Ticino, Svizzera<br><span class="small muted">Comune [da definire]</span></p>
            </div>
            <div class="divider-tight" style="margin:2px 0"></div>
            <div>
              <p class="tiny muted mb-0">Scopo</p>
              <p class="small">Sviluppo software, applicazioni web, sistemi di prenotazione, servizi digitali e soluzioni tecnologiche.</p>
            </div>
            <div class="divider-tight" style="margin:2px 0"></div>
            <div>
              <p class="tiny muted mb-0">Soci</p>
              <p>Nicola Cappelli · Bryan Ciaponi</p>
            </div>
            <div class="divider-tight" style="margin:2px 0"></div>
            <div>
              <p class="tiny muted mb-0">Partecipazione</p>
              <p><strong>50% / 50%</strong> <span class="small muted">contrattuale</span></p>
            </div>
            <div class="divider-tight" style="margin:2px 0"></div>
            <div>
              <p class="tiny muted mb-0">Base legale</p>
              <p>CO 552–593</p>
            </div>
          </div>
        </aside>
      </div>

      <div class="divider"></div>

      <div class="legend-box">
        ${U.status("definito")}
        ${U.status("proposta")}
        ${U.status("aperta")}
        ${U.status("verifica")}
        <span class="tiny muted">Le etichette descrivono lo stato del testo, non la validità delle clausole.</span>
      </div>

      <div class="grid-2 mt-3">
        ${U.callout("warning", "La responsabilità non si pattuisce via",
          "<p>L'art. 568 CO dispone che i soci rispondono <strong>personalmente, illimitatamente e solidalmente</strong> delle obbligazioni sociali. Un patto interno che escluda o limiti questa responsabilità <strong>non è opponibile ai creditori</strong>: vale soltanto nei rapporti tra soci.</p>" +
          "<p>L'uscita non chiude automaticamente il passato: il socio uscente resta esposto per le obbligazioni sorte prima dell'uscita, nei limiti e nei termini dell'<strong>art. 591 CO</strong>.</p>")}
        ${U.callout("legal", "Niente azioni, niente classi A/B",
          "<p>La SNC non ha un capitale azionario diviso in azioni. La partecipazione del 50% di Nicola e quella del 50% di Bryan sono <strong>partecipazioni contrattuali</strong> agli utili, alle perdite e alle decisioni, secondo il contratto sociale.</p>" +
          "<p>Non applicare alla SNC i meccanismi della Sagl o della SA: quote sociali, azioni, categorie A/B, valore nominale, diritti di voto proporzionali al nominale. Se arriveranno, apparterranno a un'altra forma societaria e a un'altra documentazione.</p>")}
      </div>

      <section class="section">
        ${U.sectionHead("01", "Stato", "Cosa c'è e cosa manca",
          "Sette temi, sette livelli di maturità. La tabella non dice che una clausola sia valida: dice a che punto è il lavoro prima della firma.",
          '<a class="btn btn-ghost btn-sm" href="#/documenti/snc">Apri il contratto ' + U.icon("arrowUpRight") + '</a>')}
        ${U.table(
          ["Tema", "Stato", "Cosa c'è", "Cosa manca / prossimo passo"],
          [
            ["<strong>Partecipazione</strong>", U.status("definito"), "50% a Nicola e 50% a Bryan. È una partecipazione contrattuale, non una quota o un'azione.", "Riportarla nel contratto e verificare che non venga descritta come capitale azionario."],
            ["<strong>Ruoli</strong>", U.status("aperta"), "Nessun CEO, CTO o COO assegnato. Il contratto prevede un documento scritto separato per ruoli, poteri e compensi.", "Decidere se e quando assegnare ruoli; compilare l'Allegato B."],
            ["<strong>Conferimenti</strong>", U.status("aperta"), "Sono ammessi denaro, beni, lavoro e crediti. Nessun importo o valore è concordato nella demo.", "Compilare l'Allegato A con descrizione, valore e prova del conferimento."],
            ["<strong>Firme</strong>", U.status("aperta"), "Firma individuale o collettiva, soglie e doppia firma bancaria sono ancora da scegliere.", "Definire la matrice, iscriverla e allineare il mandato bancario."],
            ["<strong>Uscite</strong>", U.status("proposta"), "Continuazione con il socio superstite; valore della partecipazione e pagamento restano da definire.", "Scegliere metodo di valutazione, rate, garanzie e coordinamento con gli artt. 576, 580 e 591 CO."],
            ["<strong>Proprietà intellettuale</strong>", U.status("proposta"), "Cessione alla società delle opere create nell'attività; il preesistente va elencato e non si trasferisce da solo.", "Costruire l'inventario IP e l'allegato con licenze o cessioni."],
            ["<strong>Trasformazione</strong>", U.status("verifica"), "Intenzione di valutare la Sagl e poi la SA, senza obbligo e senza automaticità.", "Progetto, rapporto, perizia, decisione e atto pubblico secondo la LFus."]
          ],
          { note: "Definito = scelta già indicata come acquisita. Proposta = testo da discutere. Aperta / Da decidere = punto aperto. Verifica = richiede esame legale prima della firma." }
        )}
      </section>

      <section class="section">
        ${U.sectionHead("02", "Patrimonio", "Conferimenti: solo ciò che è concordato",
          "La SNC vive di ciò che i soci mettono a disposizione. La demo non inventa importi: le celle [●] sono segnaposto da compilare e sottoscrivere.",
          U.status("aperta", "Importi da definire"))}
        ${U.table(
          ["Socio", "Denaro", "Beni e strumenti", "Lavoro", "Credito", "Stato"],
          [
            ["<strong>Nicola Cappelli</strong>", "CHF [●]", "[●]", "[●]", "[●]", U.status("aperta", "Da definire")],
            ["<strong>Bryan Ciaponi</strong>", "CHF [●]", "[●]", "[●]", "[●]", U.status("aperta", "Da definire")]
          ],
          { note: "Nessun importo, valore o stima è concordato. Un conferimento esiste solo se è descritto, valutato e accettato per iscritto; il lavoro e i beni in natura richiedono un criterio di valorizzazione." }
        )}
        <div class="mt-3">
          ${U.callout("legal", "Art. 560 cpv. 2 CO — nessun versamento ulteriore automatico",
            "<p>Il socio deve eseguire il conferimento convenuto, ma non è obbligato a versamenti ulteriori oltre a quanto concordato. La società non può trasformare una necessità di cassa in un obbligo personale senza una base contrattuale scritta.</p>" +
            "<p><strong>Proposta:</strong> ogni versamento successivo richiede un accordo scritto separato che indichi importo, forma, rimborso o conversione. Un versamento non aumenta da solo la partecipazione al 50%.</p>")}
        </div>
      </section>

      <section class="section">
        ${U.sectionHead("03", "Persone", "Ruoli: volutamente non assegnati",
          "La demo non nomina un CEO, un CTO o un COO. Il contratto prevede la possibilità di definirli in futuro con un documento scritto; l'assegnazione non cambia la partecipazione.",
          U.status("aperta", "Decisione aperta"))}
        <div class="grid-2-1">
          <div>
            <div class="chip-row mb-2">
              <span class="chip"><b>CEO</b> non assegnato</span>
              <span class="chip"><b>CTO</b> non assegnato</span>
              <span class="chip"><b>COO</b> non assegnato</span>
            </div>
            <p class="body-lg">I titoli manageriali non servono a riempire un vuoto organizzativo. Servono quando esistono compiti, poteri, limiti e compensi scritti. Fino a quel momento, i soci agiscono nell'ambito delle decisioni ordinarie e delle deleghe espressamente concordate.</p>
            <p class="body-lg mt-2">Un ruolo può essere assegnato, modificato o revocato senza toccare il 50% di partecipazione. La revoca di un ruolo non è, di per sé, un'uscita dalla società. Le deleghe operative sono revocabili per iscritto e non trasferiscono la responsabilità della gestione.</p>
            <div class="mt-3">
              ${U.callout("decision", "La decisione resta aperta",
                "<p>Chi fa cosa, con quale autonomia e con quale compenso non è deciso. La demo propone di trattare ruoli, deleghe e compensi in un documento separato, sottoscritto da entrambi i soci, e di allegarlo al contratto sociale.</p>")}
            </div>
          </div>
          <aside class="card card-flat">
            <p class="card-kicker">La regola scritta</p>
            <p><strong>Documento separato.</strong> Ruoli, compiti, poteri e compensi richiedono un testo sottoscritto da entrambi (Allegato B).</p>
            <p><strong>Nessun effetto sulla partecipazione.</strong> Un titolo o una delega non crea una quota maggiore né un diritto agli utili diverso dal 50%.</p>
            <p><strong>Revoca possibile.</strong> Le deleghe sono revocabili per iscritto; la revoca non è un'uscita.</p>
            <p><strong>Nessun titolo implicito.</strong> Fino alla firma, nessun socio può presentarsi a terzi come CEO, CTO o COO.</p>
          </aside>
        </div>
      </section>

      <section class="section">
        ${U.sectionHead("04", "Prima della firma", "Le tre domande prima della firma",
          "Tre domande concrete. Se una risposta manca, il contratto non è pronto per essere firmato.")}
        <div class="grid-3">
          <article class="card card-accent">
            <p class="card-kicker">01 · Firma</p>
            <h3>Chi firma?</h3>
            <p class="small muted mt-1">La firma individuale è comoda per l'ordinario; quella collettiva protegge sugli atti che impegnano davvero la società. La scelta va scritta, iscritta e coordinata con la banca.</p>
            <div class="mt-2">${U.btn("Apri governance e firme", "#/governance", "btn-ghost btn-sm", "arrow")}</div>
          </article>
          <article class="card card-accent">
            <p class="card-kicker">02 · Decisione</p>
            <h3>Chi decide?</h3>
            <p class="small muted mt-1">Le decisioni ordinarie possono seguire una procedura snella e tracciata. Le straordinarie richiedono il consenso di entrambi. La legge lascia spazio al contratto, non alla prassi implicita.</p>
            <div class="mt-2">${U.btn("Apri governance e firme", "#/governance", "btn-ghost btn-sm", "arrow")}</div>
          </article>
          <article class="card card-accent">
            <p class="card-kicker">03 · Uscita</p>
            <h3>Cosa succede se uno esce?</h3>
            <p class="small muted mt-1">La società può continuare con il socio superstite, ma valore, pagamento e responsabilità per il passato vanno regolati prima. L'art. 591 CO non si cancella con una stretta di mano.</p>
            <div class="mt-2">${U.btn("Leggi le clausole di uscita", "#/documenti/snc", "btn-ghost btn-sm", "arrow")}</div>
          </article>
        </div>
        <div class="doc-nav">
          ${U.btn("Economia e conferimenti", "#/economia", "btn-soft", "chart")}
          ${U.btn("Simulatore diluizione", "#/simulatore", "btn-ghost", "calculator")}
          ${U.btn("Documenti SNC", "#/documenti/snc", "btn-ghost", "file")}
          ${U.btn("Torna alla panoramica", "#/", "btn-ghost", "chevronLeft")}
        </div>
      </section>
    </div>`;
  };

  W.views.governance = function (ctx) {
    return `<div class="page">
      <div class="grid-2-1">
        <div>
          <span class="eyebrow">Fase 01 · Governance</span>
          <h1 class="page-title mt-2">Governance e firme</h1>
          <p class="lead mt-2">Chi decide cosa, con quale forma e con quale firma. La SNC lascia molto spazio al contratto sociale, ma non permette di trasformare un limite interno in una protezione verso i terzi.</p>
          <div class="row gap-1 mt-3">
            ${U.btn("Accordo tra fondatori", "#/documenti/founder", "btn-ink", "file")}
            ${U.btn("Regolamento interno", "#/documenti/internal", "btn-ghost", "file")}
          </div>
        </div>
        <aside class="card card-flat" aria-label="Sintesi della governance">
          <div class="row-between">
            <p class="card-kicker mb-0">In una riga</p>
            ${U.status("proposta")}
          </div>
          <div class="stack-sm mt-2">
            <p><strong>Ordinario:</strong> procedura snella, tracciata e dentro il budget.</p>
            <p><strong>Straordinario:</strong> consenso scritto di entrambi i soci.</p>
            <p><strong>Firme:</strong> matrice da iscrivere e da allineare alla banca.</p>
            <p><strong>Stallo:</strong> percorso concordato, senza eliminare il giudice.</p>
          </div>
          <div class="divider-tight"></div>
          <p class="tiny muted mb-0">Stato: proposta di lavoro. Le soglie [●] non sono decise e nessun ruolo è assegnato.</p>
        </aside>
      </div>

      <div class="divider"></div>

      <div class="legend-box">
        ${U.status("legge")}
        ${U.status("proposta")}
        ${U.status("aperta")}
        ${U.status("verifica")}
        <span class="tiny muted">Legge = regola vigente. Proposta = testo della demo. Aperta / Da decidere = punto aperto. Verifica = esame professionale necessario.</span>
      </div>

      <section class="section">
        ${U.sectionHead("01", "Fondamento", "La regola di base",
          "Il contratto sociale è la prima fonte dei rapporti interni. Dove non arriva, supplisce la legge sulla società semplice.")}
        <div class="grid-3">
          ${lawCard("Art. 557 CO", "Rapporti interni", "Il contratto sociale regola i rapporti tra i soci. In mancanza di patto, si applicano le disposizioni sulla società semplice.")}
          ${lawCard("Art. 534 CO", "Decisioni", "Le decisioni dei soci sono prese all'unanimità, salvo che il contratto sociale disponga diversamente.")}
          ${lawCard("Art. 535 CO", "Amministrazione", "L'amministrazione spetta a tutti i soci, salvo diversa organizzazione stabilita dal contratto sociale.")}
        </div>
        <div class="mt-3">
          ${U.callout("decision", "Cosa significa per questa SNC",
            "<p>La legge non impone un consiglio di amministrazione: i soci decidono e amministrano. Il contratto può introdurre regole, soglie e deleghe, ma non può trasformare una decisione straordinaria in un atto unilaterale senza una base scritta.</p>" +
            "<p><strong>Proposta:</strong> due livelli. L'ordinario segue una procedura tracciata; lo straordinario richiede il consenso espresso di entrambi. Nessuna maggioranza automatica.</p>")}
        </div>
      </section>

      <section class="section">
        ${U.sectionHead("02", "Due livelli", "Decisioni ordinarie e straordinarie",
          "La distinzione non è burocratica: cambia chi deve essere d'accordo e quale traccia resta.")}
        <div class="split-list">
          <div>
            <div class="row-between mb-1">
              <h4 class="mb-0">Decisioni ordinarie</h4>
              ${U.status("proposta")}
            </div>
            <p class="small muted mb-2">Gestione corrente, dentro il budget e le soglie approvate. La proposta è un consenso operativo documentato, non una firma a sorpresa.</p>
            <ul>
              <li>Budget annuale, piano di liquidità e priorità operative.</li>
              <li>Spese correnti e acquisti entro la soglia [●].</li>
              <li>Assunzioni, collaborazioni e contratti di lavoro entro il budget.</li>
              <li>Contratti con clienti e fornitori entro la soglia [●].</li>
              <li>Marketing, strumenti, infrastrutture e scelte tecniche entro il budget.</li>
            </ul>
          </div>
          <div>
            <div class="row-between mb-1">
              <h4 class="mb-0">Decisioni straordinarie</h4>
              ${U.status("proposta")}
            </div>
            <p class="small muted mb-2">Materie che cambiano la società, il patrimonio o la posizione dei soci. Nessuna maggioranza automatica e nessuna decisione implicita.</p>
            <ul>
              <li>Debiti, garanzie e finanziamenti sopra la soglia [●].</li>
              <li>Investimenti o spese fuori budget sopra la soglia [●].</li>
              <li>Ingresso di nuovi soci o investitori.</li>
              <li>Cessione o licenza esclusiva di IP, domini, marchi e account strategici.</li>
              <li>Trasformazione, fusione, scissione o scioglimento.</li>
              <li>Modifica del contratto sociale, della partecipazione o delle regole di voto.</li>
              <li>Assunzione di obblighi di exit, garanzie personali o vincoli sui soci.</li>
            </ul>
          </div>
        </div>
        <div class="mt-3">
          ${U.callout("decision", "Consenso espresso, documento scritto, nessuna maggioranza automatica",
            "<p>Per le materie straordinarie la proposta è il <strong>consenso espresso di entrambi i soci</strong>, documentato per iscritto con data, contenuto, condizioni e responsabile dell'esecuzione. Una maggioranza può essere introdotta solo con una clausola scritta e nei limiti di legge; non si presume.</p>" +
            "<p>L'urgenza non elimina l'obbligo di informare e documentare, salvo il rischio immediato di un danno grave alla società. In quel caso il socio che agisce informa l'altro senza indugio e conserva le ragioni dell'urgenza.</p>")}
        </div>
      </section>

      <section class="section">
        ${U.sectionHead("03", "Rappresentanza", "Firma e rappresentanza",
          "La rappresentanza è collegata alla qualità di socio, ma il contratto può organizzarla. Le modalità di firma devono essere chiare prima dell'iscrizione e coincidere con ciò che vedono banca e terzi.",
          U.status("proposta", "Matrice di proposta"))}
        ${U.table(
          ["Atto", "Soglia", "Firma", "Approvazione"],
          [
            ["Atti di gestione ordinaria", "fino a CHF [●]", "Individuale", "Nessuna approvazione separata, entro il budget"],
            ["Contratti con clienti e fornitori", "fino a CHF [●] / oltre CHF [●]", "Individuale / collettiva a due", "Proposta: entrambi sopra la soglia"],
            ["Debiti, garanzie e finanziamenti", "oltre CHF [●]", "Collettiva a due", "Entrambi i soci, per iscritto"],
            ["Operazioni bancarie", "oltre CHF [●]", "Doppia firma", "Mandato bancario e entrambi i soci"],
            ["Cessioni di IP, domini e asset strategici", "qualsiasi valore", "Collettiva a due", "Entrambi i soci"],
            ["Trasformazione, fusione, scissione, scioglimento", "qualsiasi valore", "Firma secondo l'atto", "Entrambi i soci e formalità di legge"],
            ["Procure speciali", "per atto o area", "Firma del procuratore autorizzato", "Rilascio e revoca scritti"]
          ],
          { note: "Matrice di proposta, non ancora adottata né iscritta. Le soglie [●] non sono fissate: nessun importo è concordato nella demo." }
        )}

        <div class="grid-2 mt-3">
          <div class="card card-flat">
            <p class="card-kicker">Firma individuale</p>
            <h3>Una mano, un atto</h3>
            <p class="small muted mt-1">La firma individuale significa che un socio firma da solo. È adatta all'ordinario entro la soglia [●], ma richiede fiducia, contabilità trasparente e limiti interni chiari. Non protegge automaticamente dai terzi se il limite non è opponibile.</p>
          </div>
          <div class="card card-flat">
            <p class="card-kicker">Firma collettiva</p>
            <h3>Due mani, un impegno</h3>
            <p class="small muted mt-1">La firma collettiva richiede due firme. È più lenta, ma adatta a debiti, contratti rilevanti, cessioni di IP e atti straordinari. Va iscritta e comunicata alla banca, altrimenti resta una buona intenzione interna.</p>
          </div>
        </div>

        <div class="mt-3">
          ${U.callout("legal", "Cosa si può opporre ai terzi",
            "<p><strong>Art. 555 CO — limiti iscrivibili.</strong> Le modalità di firma e le limitazioni della rappresentanza possono essere iscritte nel Registro di commercio. L'iscrizione rende conoscibile la regola e riduce il rischio di sorprese.</p>" +
            "<p><strong>Art. 563 CO — buona fede dei terzi.</strong> Chi tratta con la società è protetto se agisce in buona fede; non deve ricostruire accordi interni o verbali che non conosce.</p>" +
            "<p><strong>Art. 564 CO — limiti interni.</strong> Un limite che resta interno non è opponibile al terzo di buona fede. La società può essere vincolata anche se il socio ha agito oltre l'istruzione ricevuta.</p>")}
        </div>

        <div class="mt-3">
          ${U.callout("warning", "Il limite interno non è uno scudo verso i terzi",
            "<p>Un budget, un'approvazione o un divieto interno vincolano i soci tra loro. Non impediscono automaticamente che la società risponda verso un terzo di buona fede. Il rimedio è interno: revoca della delega, richiesta di risarcimento, responsabilità del socio, correzione delle firme iscritte.</p>" +
            "<p><strong>Non è una polizza.</strong> Un verbale che dice \"massimo CHF [●]\" non sostituisce una limitazione iscritta, un mandato bancario coerente e una verifica professionale.</p>")}
        </div>

        <div class="grid-2 mt-3">
          <div class="card card-flat">
            <p class="card-kicker">Banca</p>
            <h3>Doppia firma</h3>
            <p class="small muted mt-1">Il mandato bancario deve indicare intestazione, firme autorizzate, doppia firma sopra CHF [●], accesso online e carte. La banca applica il mandato, non il verbale interno.</p>
          </div>
          <div class="card card-flat">
            <p class="card-kicker">Procure</p>
            <h3>Revocabili, per iscritto</h3>
            <p class="small muted mt-1">Le procure sono speciali, scritte e revocabili. Indicano ambito, durata, limiti e modalità di revoca. Non trasferiscono la qualità di socio né la responsabilità della gestione.</p>
          </div>
        </div>
      </section>

      <section class="section">
        ${U.sectionHead("04", "Procedura", "Flusso decisionale",
          "Cinque passaggi, una traccia. La forma scritta non è burocrazia: è la prova del consenso e il modo per ricostruire una scelta mesi dopo.",
          U.status("proposta", "Procedura proposta"))}
        <div class="numbered-list">
          <div class="numbered-item">
            <div>
              <h4>Proposta scritta</h4>
              <p>Chi propone mette per iscritto il fatto, l'importo, l'urgenza, le opzioni e la decisione richiesta. Una chat non basta per una materia straordinaria.</p>
            </div>
          </div>
          <div class="numbered-item">
            <div>
              <h4>Verifica dell'impatto</h4>
              <p>Legge, cassa, budget, fisco, proprietà intellettuale, clienti, banca e Registro. Si chiarisce se la materia è ordinaria o straordinaria.</p>
            </div>
          </div>
          <div class="numbered-item">
            <div>
              <h4>Confronto</h4>
              <p>I soci discutono sulla stessa proposta, non su ricordi diversi. Le posizioni, i dubbi e i punti aperti finiscono nel verbale.</p>
            </div>
          </div>
          <div class="numbered-item">
            <div>
              <h4>Decisione documentata</h4>
              <p>Data, materia, consenso, condizioni, responsabile e termine. Per le straordinarie: consenso espresso di entrambi i soci, non una maggioranza implicita.</p>
            </div>
          </div>
          <div class="numbered-item">
            <div>
              <h4>Esecuzione e registrazione</h4>
              <p>Si firma, si esegue e si archivia. Se serve, si aggiornano banca, Registro di commercio, procure e registro delle decisioni.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        ${U.sectionHead("05", "Conflitto", "Stallo: un percorso prima del giudice",
          "Una SNC a due soci non ha un meccanismo automatico per rompere la parità. Il contratto può organizzare l'escalation, ma non può eliminare la tutela giudiziaria.")}
        <div class="quote-box mb-3">Due soci, nessun terzo che decide, nessun meccanismo automatico per rompere la parità. Lo stallo non è un'ipotesi remota: è un rischio strutturale.</div>
        <div class="timeline">
          <div class="timeline-item">
            <p class="timeline-tag">Proposta · passo 01</p>
            <h4>Escalation interna</h4>
            <p>Comunicazione scritta, incontro entro [●] giorni, posizioni e opzioni messe a verbale. Nessuna decisione straordinaria nel frattempo.</p>
          </div>
          <div class="timeline-item">
            <p class="timeline-tag">Proposta · passo 02</p>
            <h4>Mediazione</h4>
            <p>Un mediatore neutro aiuta a ricostruire interessi e opzioni. Costi, riservatezza e calendario sono concordati per iscritto. La clausola di mediazione non impedisce i provvedimenti provvisori.</p>
          </div>
          <div class="timeline-item">
            <p class="timeline-tag">Proposta · passo 03</p>
            <h4>Perizia</h4>
            <p>Un esperto indipendente verifica valore, conti, proprietà intellettuale o fatti tecnici. Le parti decidono in anticipo se la perizia è vincolante o solo istruttoria.</p>
          </div>
          <div class="timeline-item">
            <p class="timeline-tag">Verifica · passo 04</p>
            <h4>Buy-sell</h4>
            <p>Un socio formula un'offerta unica di acquisto o vendita; l'altro sceglie se comprare o vendere alle stesse condizioni. Va testato sulla liquidità, sul valore e sui diritti dei terzi.</p>
          </div>
          <div class="timeline-item is-now">
            <p class="timeline-tag">Legge · rimedio</p>
            <h4>Rimedi giudiziari</h4>
            <p>Scioglimento per gravi motivi (art. 545 CO), esclusione del socio (art. 577 CO), indennità di uscita (art. 580 CO). Il giudice resta il controllo finale.</p>
          </div>
        </div>
        <div class="mt-3">
          ${U.callout("warning", "Nessuna clausola può eliminare il controllo del giudice",
            "<p>Le parti possono imporre mediazione, perizia o buy-sell, ma non possono escludere il controllo giudiziario sui gravi motivi, sull'esclusione o sulla tutela dei diritti. Le clausole di stallo vanno verificate e coordinate con il foro competente.</p>")}
        </div>
      </section>

      <section class="section">
        ${U.sectionHead("06", "Prima di firmare", "Checklist firme",
          "Cinque punti da verificare prima di mettere una firma. Le caselle sono visive e non interattive: non sono un modulo e non valgono come firma.",
          U.status("verifica", "Da completare"))}
        <div class="card">
          <div class="stack-sm">
            ${checkItem("Registro di commercio", "Ditta, sede, soci e modalità di firma. I limiti alla rappresentanza che si vogliono rendere conoscibili vanno iscritti (art. 555 CO).")}
            <div class="divider-tight"></div>
            ${checkItem("Mandato bancario", "Intestazione, firme autorizzate, doppia firma sopra CHF [●], accesso online, carte e recupero credenziali. Deve coincidere con la matrice delle firme.")}
            <div class="divider-tight"></div>
            ${checkItem("Procure", "Ambito, durata, poteri, limiti e revoca scritta. Nessuna procura implicita e nessun potere senza scadenza o controllo.")}
            <div class="divider-tight"></div>
            ${checkItem("Deleghe", "Compiti operativi, limiti di spesa e revocabilità. Una delega non modifica la partecipazione e non trasferisce la responsabilità della gestione.")}
            <div class="divider-tight"></div>
            ${checkItem("Registro decisioni", "Proposta, verbale, consensi, condizioni, esecuzione e versioni. Conservare data, autore e documento di riferimento.")}
          </div>
        </div>
        <div class="doc-nav">
          ${U.btn("Accordo tra fondatori", "#/documenti/founder", "btn-soft", "file")}
          ${U.btn("Regolamento interno", "#/documenti/internal", "btn-ghost", "file")}
          ${U.btn("Torna alla società oggi", "#/snc", "btn-ghost", "chevronLeft")}
        </div>
      </section>
    </div>`;
  };
})();
