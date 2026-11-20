/* Viste 03-05 — Economia e conferimenti, proprietà intellettuale, uscite. */
(function () {
  "use strict";
  const W = window.WDI = window.WDI || {};
  W.views = W.views || {};
  const U = W.ui;

  function pageHero(o) {
    return '<header class="doc-header">' +
      '<span class="eyebrow">' + o.eyebrow + '</span>' +
      '<h1 class="page-title">' + o.title + '</h1>' +
      '<p class="lead mt-2">' + o.lead + '</p>' +
      (o.intro ? '<p class="body-lg measure mt-2">' + o.intro + '</p>' : '') +
      '<div class="doc-meta">' + o.meta + '</div>' +
      '<div class="doc-actions">' + o.actions + '</div>' +
      '</header>';
  }

  function sec(num, kicker, title, lead, body) {
    return '<section class="section">' + U.sectionHead(num, kicker, title, lead) + body + '</section>';
  }

  function miniCard(kicker, title, text) {
    return '<article class="card card-tight card-accent">' +
      '<p class="card-kicker">' + kicker + '</p>' +
      '<h3>' + title + '</h3>' +
      '<p class="small muted mt-1">' + text + '</p>' +
      '</article>';
  }

  function tableCaption(text, pills) {
    return '<div class="row-between gap-1 mb-1">' +
      '<p class="small muted">' + text + '</p>' +
      '<div class="row gap-1">' + (pills || '') + '</div>' +
      '</div>';
  }

  function docNav() {
    return '<div class="doc-nav">' +
      U.btn("Contratto SNC", "#/documenti/snc", "btn-ghost", "file") +
      U.btn("Accordo tra fondatori", "#/documenti/founder", "btn-ghost", "file") +
      U.btn("Biblioteca clausole", "#/clausole", "btn-ghost", "book") +
      '</div>';
  }

  function page(content) {
    return '<div class="page">' + content + '</div>';
  }

  /* ------------------------------------------------------------
     Economia e conferimenti
     ------------------------------------------------------------ */
  W.views.economics = function () {
    const hero = pageHero({
      eyebrow: "SNC · Economia e conferimenti",
      title: "Il 50% è una regola economica, non un assegno in bianco.",
      lead: "La partecipazione dice come si dividono utili e perdite. Non dice quanto si preleva, quanto vale il lavoro di ciascuno o cosa succede se uno dei due mette più denaro.",
      intro: "Questa pagina separa quattro cose che nella pratica vengono confuse: la partecipazione, il compenso, il rimborso e il finanziamento. La legge fissa alcune regole; il resto è una proposta contrattuale da verificare.",
      meta: U.status("legge", "Art. 558 CO") +
        U.status("proposta", "Regole interne") +
        U.status("esempio", "CHF 100'000 illustrativi"),
      actions: U.btn("Contratto SNC", "#/documenti/snc", "btn-ink", "file") +
        U.btn("Accordo tra fondatori", "#/documenti/founder", "btn-ghost", "file") +
        U.btn("Biblioteca clausole", "#/clausole", "btn-ghost", "book")
    });

    const summary = `
      <div class="grid-3 mt-3">
        ${miniCard("Utile", "Si distribuisce dopo", "Conto annuale approvato, perdite coperte e decisione scritta.")}
        ${miniCard("Cassa", "Prima la riserva", "La liquidità serve all'attività: la riserva è di [●] mesi di costi.")}
        ${miniCard("Denaro", "Versare non è comprare", "Un prestito crea un credito; la percentuale non cambia da sola.")}
      </div>`;

    const scenarioTable = U.table(
      [
        "Scenario",
        { label: "Utile / perdita", num: true },
        { label: "Quota Nicola", num: true },
        { label: "Quota Bryan", num: true },
        "Lettura"
      ],
      [
        ["Utile illustrativo", "CHF 100'000", "CHF 50'000", "CHF 50'000", "La società non distribuisce automaticamente: serve la decisione dei soci."],
        ["Perdita illustrativa", "- CHF 100'000", "- CHF 50'000", "- CHF 50'000", "La perdita riduce il patrimonio; non crea un credito verso la società."]
      ],
      {
        cls: "table-compact",
        note: "Esempio puramente illustrativo. CHF 100'000 non è un importo concordato, una previsione o un diritto acquisito. Serve solo a mostrare l'aritmetica del 50/50."
      }
    );

    const s1 = sec(
      "01",
      "Utili e perdite",
      "Il 50/50 ripartisce il risultato, non autorizza il prelievo.",
      "Il conto annuale determina l'utile o la perdita. La distribuzione è un passaggio successivo e richiede una decisione.",
      `
      <div class="grid-2">
        <article class="card">
          <p class="card-kicker">Regola</p>
          <h3>50% a ciascuno</h3>
          <p class="mt-1">L'utile e la perdita risultanti dal conto annuale sono ripartiti al 50%. È una scelta contrattuale: va scritta nel contratto sociale e richiamata nell'accordo tra fondatori.</p>
          <p class="small muted mt-2">Art. 558 CO: la legge rinvia al conto annuale e ammette una diversa ripartizione pattuita.</p>
        </article>
        <article class="card">
          <p class="card-kicker">Prima di distribuire</p>
          <h3>Quattro condizioni</h3>
          <div class="numbered-list mt-2">
            <div class="numbered-item"><div><h4>Conto annuale approvato</h4><p>I soci approvano il conto annuale e l'impiego dell'utile.</p></div></div>
            <div class="numbered-item"><div><h4>Perdite coperte</h4><p>La distribuzione non deve lasciare scoperta una perdita che l'attività non può assorbire.</p></div></div>
            <div class="numbered-item"><div><h4>Liquidità verificata</h4><p>La riserva di [●] mesi di costi operativi correnti resta disponibile.</p></div></div>
            <div class="numbered-item"><div><h4>Decisione scritta</h4><p>Importo, data, modalità di pagamento e quote di ciascun socio.</p></div></div>
          </div>
        </article>
      </div>
      <div class="mt-3">
        ${tableCaption("Aritmetica del 50/50", U.status("esempio", "Esempio, non accordo"))}
        ${scenarioTable}
      </div>
      ${U.callout("warning", "La distribuzione non è automatica",
        "<p>Approvazione del conto annuale, copertura delle perdite, rispetto della riserva di liquidità e decisione scritta. Se manca uno di questi passaggi, il 50% resta una regola di ripartizione, non un credito esigibile.</p>" +
        "<p>La società non può usare il conto annuale come una cambiale: l'utile contabile non è denaro disponibile in banca.</p>"
      )}
      `
    );

    const s2 = sec(
      "02",
      "Prelievi e riserve",
      "La cassa appartiene alla società fino alla decisione di distribuirla.",
      "Un prelievo personale non è un diritto automatico. È un'uscita di cassa che va approvata, documentata e compatibile con la liquidità.",
      `
      <div class="grid-2">
        <article class="card">
          <p class="card-kicker">Regola di cassa</p>
          <h3>Prima la riserva, poi il prelievo</h3>
          <p class="mt-1">La società mantiene una riserva di liquidità pari ad almeno <strong>[●] mesi</strong> di costi operativi correnti. Il numero è un campo da decidere, non un dato della demo.</p>
          <p>La regola si applica a ogni prelievo, anche quando l'utile è già stato approvato. La riserva non è un fondo separato: è un vincolo di gestione sulla cassa disponibile.</p>
        </article>
        <article class="card">
          <p class="card-kicker">Nessun anticipo automatico</p>
          <h3>Niente anticipi sugli utili futuri</h3>
          <p class="mt-1">Un anticipo è un credito o un prelievo? Va deciso. Senza accordo scritto e verifica della liquidità, non si anticipa.</p>
          <p>Il prelievo non modifica la partecipazione, non è un conferimento e non si compensa con il lavoro svolto. Un prelievo non autorizzato può generare un credito della società verso il socio: non è un diritto acquisito.</p>
        </article>
      </div>
      ${U.callout("decision", "Riserva [●] mesi: il numero è una decisione, non una stima della demo",
        "<p>I soci e il professionista devono fissare: mesi di costi, cosa entra nel calcolo, chi può derogare, con quale decisione e con quale maggioranza. La riserva va rivista quando cambiano i costi o il modello di ricavi.</p>" +
        "<p>La demo non sceglie il numero e non lo presenta come concordato.</p>"
      )}
      `
    );

    const compensationTable = U.table(
      ["Voce", "Natura", "Prova", "Effetto sulla partecipazione", "Trattamento"],
      [
        [
          "<strong>Compenso per ruolo o attività</strong>",
          "Costo della società per un lavoro prestato.",
          "Contratto di lavoro, mandato o decisione scritta con importo, periodicità e contributi.",
          "Nessuno: non cambia la percentuale.",
          "Riduce l'utile distribuibile; segue il regime previdenziale e fiscale del rapporto."
        ],
        [
          "<strong>Distribuzione di utili</strong>",
          "Appropriazione dell'utile netto dopo l'approvazione del conto annuale.",
          "Conto annuale approvato e decisione scritta dei soci.",
          "Nessuno: la percentuale resta quella pattuita.",
          "Non è un costo; richiede copertura delle perdite, liquidità e rispetto della riserva."
        ]
      ],
      {
        cls: "table-compact",
        note: "La tabella non assegna ruoli e non fissa importi. Allegato B e regolamento interno devono indicare chi, quanto, per quale attività e con quale periodicità."
      }
    );

    const s3 = sec(
      "03",
      "Compensi e utili",
      "Il lavoro si paga; l'utile si distribuisce. Sono due operazioni diverse.",
      "Un compenso è un costo della società. Una distribuzione è l'impiego dell'utile netto. Confonderli rende opaca la contabilità e manipola la partecipazione.",
      `
      <div class="mt-1">
        ${tableCaption("Due voci, due regimi", U.status("proposta", "Proposta di lavoro"))}
        ${compensationTable}
      </div>
      ${U.callout("legal", "Il compenso non è una quota",
        "<p>Se il ruolo cambia, il compenso può cambiare. La partecipazione no, salvo modifica scritta del contratto. Un socio che lavora più ore non acquista automaticamente più quote; un socio che lavora meno non le perde automaticamente.</p>" +
        "<p>La qualificazione non può essere scelta solo per evitare contributi o imposte: la sostanza economica e il documento devono essere coerenti. La verifica spetta a un professionista.</p>"
      )}
      ${U.callout("warning", "Nessun ruolo è assegnato in questa demo",
        "<p>I titoli e le deleghe non sono attribuiti. La demo non dice chi è responsabile di cosa. La tabella dei compensi va compilata solo dopo la definizione dei ruoli, con importo, periodicità, contributi, rimborsi e criteri di revoca.</p>"
      )}
      `
    );

    const s4 = sec(
      "04",
      "Rimborsi spese",
      "Una spesa aziendale si rimborsa; una spesa personale no.",
      "La differenza non è l'importo: è la destinazione, il giustificativo e l'approvazione.",
      `
      <div class="grid-2">
        <article class="card">
          <p class="card-kicker">Rimborsabile</p>
          <h3>Spese inerenti e documentate</h3>
          <p class="mt-1">Viaggi, vitto, alloggio, software, hardware, formazione approvata e materiali per i clienti. Ogni spesa deve avere data, importo, causale e ricevuta.</p>
          <p>L'acquisto è intestato alla società, salvo diverso accordo scritto. I beni personali messi a disposizione della società sono elencati nell'Allegato A.</p>
        </article>
        <article class="card">
          <p class="card-kicker">Non rimborsabile</p>
          <h3>Spese personali e senza prova</h3>
          <p class="mt-1">Spese private, multe, acquisti personali, costi non approvati e importi senza giustificativo. Non diventano automaticamente un credito del socio.</p>
          <p>Un rimborso non è un compenso e non è una distribuzione di utili. Non modifica la partecipazione.</p>
        </article>
      </div>
      <div class="numbered-list mt-3">
        <div class="numbered-item"><div><h4>Giustificativo</h4><p>Ricevuta o fattura con data, importo e causale. La ricevuta generica non basta per una spesa rilevante.</p></div></div>
        <div class="numbered-item"><div><h4>Approvazione</h4><p>Secondo le soglie del regolamento. Chi ha sostenuto la spesa dichiara l'eventuale conflitto di interesse.</p></div></div>
        <div class="numbered-item"><div><h4>Pagamento tracciabile</h4><p>Dal conto sociale, con riferimento alla spesa e al giustificativo.</p></div></div>
        <div class="numbered-item"><div><h4>Registrazione</h4><p>Contabilità, allegato delle spese e conservazione dei documenti per il periodo di legge.</p></div></div>
        <div class="numbered-item"><div><h4>Verifica periodica</h4><p>Almeno una volta all'anno, prima dell'approvazione del conto annuale.</p></div></div>
      </div>
      ${U.callout("warning", "Senza giustificativo non è un rimborso",
        "<p>È un prelievo contestabile. Se il socio ha anticipato denaro, il credito va documentato e approvato; non si compensa con utili, con lavoro o con una quota maggiore.</p>"
      )}
      `
    );

    const financingTable = U.table(
      ["Opzione", "Chi riceve il denaro", "Effetto sulla %", "Quando serve una delibera"],
      [
        [
          "<strong>Prestito</strong>",
          "La società. Il socio diventa creditore.",
          "Nessuno: la partecipazione resta invariata.",
          "Nessuna delibera di aumento. Serve un accordo scritto con importo, interesse, durata, rimborso e postergazione; se il contratto riserva i debiti sopra soglia, decide l'organo competente."
        ],
        [
          "<strong>Convertibile</strong>",
          "La società, come debito fino alla conversione.",
          "Nessuno prima della conversione; poi diluizione di chi non partecipa.",
          "Nessuna delibera prima della conversione. Alla conversione: delibera di aumento (Sagl/SA) o modifica contrattuale (SNC), con le formalità applicabili."
        ],
        [
          "<strong>Aumento di capitale (Sagl/SA)</strong>",
          "La società.",
          "Diluizione di chi non sottoscrive; nuovi voti secondo lo statuto.",
          "Delibera di aumento, rispetto dei diritti d'opzione e delle maggioranze. Nella SNC non c'è aumento di capitale: serve una modifica contrattuale."
        ],
        [
          "<strong>Vendita secondaria</strong>",
          "Il socio venditore, non la società.",
          "Cambia la titolarità; il capitale sociale non cambia.",
          "Nessuna delibera di aumento. Servono consenso, prelazione e approvazione secondo contratto o statuto; la società non incassa."
        ]
      ],
      {
        cls: "table-compact",
        note: "Quattro strumenti, quattro effetti. La domanda non è solo quanto denaro entra, ma chi lo riceve, cosa succede alla cap table e quale formalità serve."
      }
    );

    const s5 = sec(
      "05",
      "Finanziamenti dei soci",
      "Mettere denaro non è automaticamente comprare una percentuale.",
      "Quattro strumenti, quattro effetti. La domanda non è solo quanto, ma chi riceve il denaro, cosa cambia nella cap table e quale delibera serve.",
      `
      <div class="mt-1">
        ${tableCaption("Chi paga, chi riceve, cosa cambia", U.status("proposta", "Proposta di lavoro"))}
        ${financingTable}
      </div>
      ${U.callout("warning", "Bryan versa 500k, Nicola no",
        "<div class=\"row gap-1 mb-1\">" +
          U.status("esempio", "Scenario illustrativo") +
          U.status("aperta", "Nessun importo concordato") +
        "</div>" +
        "<p><strong>Il solo versamento non aumenta automaticamente la partecipazione di chi versa.</strong> Il denaro può essere un prestito, un convertibile, un aumento o il prezzo di una vendita secondaria: la qualificazione cambia tutto.</p>" +
        "<div class=\"stack-sm mt-2\">" +
          "<p><strong>Prestito:</strong> Bryan diventa creditore della società; la sua percentuale non cambia.</p>" +
          "<p><strong>Conversione:</strong> il credito diventa partecipazione solo con la delibera e le formalità applicabili.</p>" +
          "<p><strong>Aumento:</strong> nella Sagl e nella SA serve una delibera nel rispetto dei diritti d'opzione di Nicola; nella SNC serve una modifica scritta del contratto sociale.</p>" +
          "<p><strong>Vendita secondaria:</strong> Bryan compra da un socio, non dalla società; il denaro va al venditore.</p>" +
        "</div>" +
        "<p class=\"small muted mt-2\">Prima di versare: forma scritta, destinazione, interesse, durata, rimborso, postergazione e trattamento in caso di crisi. Nessun importo è concordato in questa demo.</p>"
      )}
      `
    );

    const writtenTable = U.table(
      ["Voce", "Cosa deve essere scritto", "Documento", "Effetto", "Stato"],
      [
        ["Conferimenti", "Tipo, valore, data, prova, titolarità, uso o trasferimento.", "Contratto sociale, Allegato A", "Patrimonio e prova", U.status("verifica", "Da completare")],
        ["Prestiti", "Creditore, importo, interesse, durata, rimborso, postergazione.", "Accordo scritto, Allegato D", "Credito, non partecipazione", U.status("aperta", "Da scrivere")],
        ["Rimborsi", "Criterio, giustificativi, approvazione, tempi e soglie.", "Regolamento interno", "Costo o credito documentato", U.status("proposta", "Proposta")],
        ["Compensi", "Ruolo, attività, importo, periodicità, contributi e revoca.", "Allegato B, contratto", "Costo, non partecipazione", U.status("aperta", "Da decidere")],
        ["Riserve", "Mesi di costi, calcolo, deroga e revisione.", "Contratto, regolamento", "Liquidità e continuità", U.status("aperta", "Da decidere")],
        ["Distribuzioni", "Conto annuale, copertura perdite, importo, data e modalità.", "Verbale dei soci", "Prelievo di utile", U.status("proposta", "Proposta")]
      ],
      {
        cls: "table-compact",
        note: "La demo non inventa importi. [●] è un campo da completare; CHF 100'000 compare solo nell'esempio della sezione 01."
      }
    );

    const s6 = sec(
      "06",
      "Cosa deve essere scritto",
      "Se non è scritto, non è una regola: è un ricordo.",
      "Sei voci coprono la maggior parte dei conflitti economici. Per ognuna: contenuto, documento, effetto e stato.",
      `
      <div class="mt-1">
        ${tableCaption("La tabella minima dell'accordo economico", U.status("verifica", "Verifica legale"))}
        ${writtenTable}
      </div>
      ${U.callout("legal", "Conferimento non è una parola generica",
        "<p>Un conferimento può essere denaro, un bene, un credito o una prestazione lavorativa. Deve avere un valore, una destinazione, una prova e un documento. Non è un prestito, non è un compenso e non è un prelievo.</p>" +
        "<p>Nella SNC il conferimento non crea quote o azioni: la partecipazione resta quella scritta nel contratto. Un conferimento in natura o in lavoro va descritto e valorizzato per iscritto; senza accordo, non si considera effettuato.</p>"
      )}
      ${U.callout("decision", "La regola dei quattro sì",
        "<p>Conto annuale approvato, perdite coperte, riserva rispettata, decisione scritta. Se manca un sì, la distribuzione non è matura. Se il denaro serve per un prestito o un aumento, è un'altra operazione e richiede un'altra delibera.</p>"
      )}
      `
    );

    return page(hero + summary + s1 + s2 + s3 + s4 + s5 + s6 + docNav());
  };

  /* ------------------------------------------------------------
     Proprietà intellettuale
     ------------------------------------------------------------ */
  W.views.ip = function () {
    const hero = pageHero({
      eyebrow: "SNC · Proprietà intellettuale",
      title: "Il valore dell'azienda è nel codice, nei dati e nelle relazioni. Deve avere un titolare.",
      lead: "Il codice, i dati, i domini e gli account sono il patrimonio operativo della società. Senza un titolare, una prova e un accesso controllato, il valore resta sulla carta.",
      intro: "Questa pagina separa quattro livelli: chi possiede, chi può usare, chi amministra e cosa succede se qualcuno esce. Il registro IP è la prima pagina della due diligence.",
      meta: U.status("legge", "LDA 2 / 16 / 17") +
        U.status("proposta", "Registro IP") +
        U.status("verifica", "Due diligence"),
      actions: U.btn("Contratto SNC", "#/documenti/snc", "btn-ink", "file") +
        U.btn("Accordo tra fondatori", "#/documenti/founder", "btn-ghost", "file") +
        U.btn("Clausole IP", "#/clausole", "btn-ghost", "book")
    });

    const summary = `
      <div class="grid-3 mt-3">
        ${miniCard("Titolarità", "Chi possiede", "La società deve essere titolare o licenziataria, con una prova scritta e un perimetro chiaro.")}
        ${miniCard("Accesso", "Chi amministra", "Account aziendali, 2FA e almeno due amministratori per i servizi critici.")}
        ${miniCard("Continuità", "Cosa resta", "Se un fondatore esce, la società non perde codice, domini, dati o clienti.")}
      </div>`;

    const ipTable = U.table(
      ["Bene", "Titolare", "Prova", "Rischio", "Stato"],
      [
        ["Codice sorgente e repository", "Società (cessione espressa)", "Contratto di cessione + repository aziendale", "Commit da account personali", U.status("verifica", "Da verificare")],
        ["Applicazioni e moduli", "Società (cessione espressa)", "Cessione + registro delle versioni", "Componenti di terzi non tracciati", U.status("verifica", "Da verificare")],
        ["Siti web e contenuti", "Società (cessione espressa)", "Cessione + contratti con i clienti", "Testi e foto di terzi senza licenza", U.status("verifica", "Da verificare")],
        ["Sistema di prenotazioni", "Società (cessione espressa)", "Cessione + documentazione tecnica", "Dipendenze e flussi condivisi", U.status("verifica", "Da verificare")],
        ["Database e dati", "Società per l'IP; privacy da definire", "Contratti, policy e registro dei trattamenti", "Ruoli privacy e dati personali", U.status("verifica", "Verifica legale")],
        ["API e integrazioni", "Società (cessione o licenza)", "Cessione + contratti API", "Limiti d'uso e licenze di terzi", U.status("verifica", "Da verificare")],
        ["Infrastruttura e configurazioni", "Società", "Contratti cloud + infrastruttura come codice", "Account personali e segreti fuori posto", U.status("aperta", "Da migrare")],
        ["Documentazione e manuali", "Società (cessione espressa)", "Cessione + repository", "Materiale preesistente non elencato", U.status("verifica", "Da verificare")],
        ["Marchi e segni distintivi", "Società (domanda da valutare)", "Ricerca di anteriorità + domanda", "Marchio non registrato o in conflitto", U.status("aperta", "Da decidere")],
        ["Domini", "Società", "Registrar + fatture", "Intestazione personale e rinnovi", U.status("aperta", "Da migrare")],
        ["Design, UI e grafica", "Società (cessione espressa)", "Cessione + file sorgenti", "Font, icone e licenze diverse", U.status("verifica", "Da verificare")],
        ["Materiali commerciali", "Società (cessione espressa)", "Cessione + archivio", "Immagini e testi senza diritti", U.status("proposta", "Proposta")],
        ["Account cloud e servizi", "Società", "Contratti + amministratori aziendali", "Recovery personale e 2FA assente", U.status("aperta", "Da migrare")]
      ],
      {
        cls: "table-compact",
        note: "Titolare: per i dati personali il termine ha un significato privacy distinto dalla titolarità IP e va verificato con la nLPD. 'Società' indica l'esito da raggiungere, non un titolo già perfezionato. La prova è il contratto, la fattura, il commit, l'iscrizione o la licenza."
      }
    );

    const s1 = sec(
      "01",
      "Registro IP",
      "Ogni bene deve avere un titolare, una prova e uno stato.",
      "Il registro non è un elenco decorativo: è la mappa di ciò che la società possiede, usa o deve ancora acquisire.",
      `
      <div class="mt-1">
        ${tableCaption("Tredici categorie da verificare", U.status("proposta", "Registro di lavoro") + U.status("verifica", "Prova da allegare"))}
        ${ipTable}
      </div>
      ${U.callout("warning", "Non basta dire 'è nostro'",
        "<p>La prova è il contratto, la fattura, il commit, l'iscrizione, la licenza o il documento di consegna. Un registro senza prove è una lista di desideri, e in due diligence si vede subito.</p>"
      )}
      `
    );

    const s2 = sec(
      "02",
      "Titolarità e cessione",
      "La società non diventa titolare per il solo fatto che il fondatore ha scritto il codice.",
      "Serve una catena di titolarità: autore, opera, diritto, trasferimento, prova.",
      `
      <div class="grid-2">
        <article class="card">
          <p class="card-kicker">Le norme chiave</p>
          <h3>LDA, artt. 2, 16 e 17</h3>
          <p class="mt-1"><strong>Art. 2.</strong> I programmi per computer sono opere protette. Il software non è un'idea libera: ha un autore e un regime.</p>
          <p><strong>Art. 16.</strong> Il diritto d'autore è trasferibile. Il trasferimento di un diritto parziale non implica gli altri; i contratti di trasferimento richiedono la forma scritta.</p>
          <p><strong>Art. 17.</strong> Il diritto esclusivo sul programma creato da un lavoratore dipendente nell'esercizio delle sue attività spetta al datore di lavoro, nei limiti del rapporto.</p>
        </article>
        <article class="card">
          <p class="card-kicker">La trappola dei fondatori</p>
          <h3>Non sono dipendenti per definizione</h3>
          <p class="mt-1">Un socio, un gerente o un amministratore non è automaticamente un lavoratore dipendente. L'art. 17 non sostituisce una cessione espressa.</p>
          <p>La società deve avere un contratto di lavoro o un atto di cessione per ogni opera, con elenco, perimetro e prova. La cessione deve coprire i diritti necessari: riproduzione, modifica, distribuzione, sublicenza e uso commerciale, nei limiti di legge.</p>
          <p>I diritti morali restano agli autori: la cessione patrimoniale non li trasferisce. Le parti devono prevedere la cooperazione necessaria per l'esercizio dei diritti patrimoniali, nei limiti di legge.</p>
        </article>
      </div>
      ${U.callout("legal", "Cessione espressa, non presunta",
        "<p>La cessione deve essere scritta e specifica. 'Tutto ciò che creo appartiene alla società' è un buon inizio, ma per la due diligence serve un elenco e una prova per i beni rilevanti.</p>" +
        "<p>I beni preesistenti vanno nell'Allegato C del contratto SNC e nell'Allegato 2 dell'Accordo tra fondatori. Se non sono elencati, non sono conferiti automaticamente: la società può usarli solo secondo la licenza o il trasferimento ivi indicati.</p>"
      )}
      <div class="numbered-list mt-3">
        <div class="numbered-item"><div><h4>Identifica l'opera e l'autore</h4><p>Persona fisica, collaboratore, fornitore o agenzia. Ogni autore è un potenziale titolare di diritti.</p></div></div>
        <div class="numbered-item"><div><h4>Distingui creazione e preesistente</h4><p>Ciò che esisteva prima della società non è conferito per il solo fatto di essere usato nel prodotto.</p></div></div>
        <div class="numbered-item"><div><h4>Scegli cessione o licenza</h4><p>La cessione trasferisce il diritto; la licenza concede l'uso. Il perimetro deve essere scritto.</p></div></div>
        <div class="numbered-item"><div><h4>Allega la prova</h4><p>Contratto, repository, file, data, fattura, atto di consegna. La prova deve essere reperibile.</p></div></div>
        <div class="numbered-item"><div><h4>Aggiorna il registro</h4><p>Ogni nuovo progetto o collaboratore può cambiare la titolarità. La verifica si ripete.</p></div></div>
      </div>
      ${U.callout("warning", "Attenzione ai collaboratori",
        "<p>Un freelance o un'agenzia non cede automaticamente il codice. Il contratto deve contenere cessione, garanzia di originalità, licenze di terzi e consegna dei materiali. Senza queste clausole, la società può avere il prodotto ma non i diritti per sfruttarlo.</p>"
      )}
      `
    );

    const s3 = sec(
      "03",
      "Open source",
      "Una licenza è un contratto: va letta prima di usare il codice.",
      "La politica open source non vieta l'open source. Serve a sapere cosa entra, con quali obblighi e con quale prova.",
      `
      <div class="grid-3">
        ${miniCard("Politica", "Chi approva", "Chi decide una nuova dipendenza, quali licenze sono ammesse, quali richiedono verifica e cosa fare in caso di dubbio.")}
        ${miniCard("Inventario", "Cosa è entrato", "Nome, versione, fonte, licenza, uso nel prodotto e obblighi di attribuzione. Un elenco aggiornato vale più di una dichiarazione.")}
        ${miniCard("Licenze", "Cosa consente", "Permissive, copyleft, proprietarie, dual licensing. La compatibilità dipende dal modo di distribuzione e dall'architettura.")}
        ${miniCard("Copyleft", "Cosa impone", "Verifica se il prodotto è distribuito o messo a disposizione in rete e se la licenza richiede il rilascio di modifiche. Non decidere da soli.")}
        ${miniCard("Attribuzione", "Cosa va conservato", "Copyright notice, testo della licenza ed elenco dei componenti. L'attribuzione non è un favore: è un obbligo.")}
        ${miniCard("Revisione", "Quando controllare", "Scansione delle dipendenze prima di ogni release, dopo gli aggiornamenti e prima di un'operazione. Registra le eccezioni approvate.")}
      </div>
      ${U.callout("legal", "Copyleft non significa 'tutto gratis'",
        "<p>L'effetto di una licenza copyleft dipende dai termini, dal modo di distribuzione e dall'uso. Mescolare componenti incompatibili può creare un obbligo di rilascio non previsto. La verifica va fatta prima di incorporare il codice, non dopo.</p>" +
        "<p>La demo non classifica le licenze come compatibili o incompatibili: una conclusione del genere richiede il caso concreto e una verifica professionale.</p>"
      )}
      ${U.callout("decision", "La regola pratica",
        "<p>Nessuna dipendenza nuova senza licenza registrata. Nessuna release senza inventario aggiornato. Nessuna eccezione senza una decisione scritta che spieghi perché è accettabile.</p>"
      )}
      `
    );

    const accountTable = U.table(
      ["Account", "Titolare", "Admin", "2FA", "Recovery", "Stato"],
      [
        ["Dominio", "Società (proposto)", "Almeno due amministratori aziendali", "Obbligatoria", "Email aziendale + codice in cassaforte", U.status("aperta", "Da migrare")],
        ["GitHub", "Società (organizzazione)", "Owner aziendali, non account personali", "Obbligatoria", "Due owner + recovery code", U.status("aperta", "Da migrare")],
        ["Cloud", "Società (account aziendale)", "Ruoli con privilegio minimo", "Obbligatoria", "Email aziendale + accesso di emergenza", U.status("verifica", "Parziale")],
        ["App Store", "Società (account sviluppatore)", "Account aziendale, ruoli separati", "Obbligatoria", "Email aziendale + recovery", U.status("proposta", "Da attivare")],
        ["Pagamenti", "Società", "Ruoli finance separati, doppia approvazione", "Obbligatoria", "Email aziendale + dispositivo", U.status("verifica", "Da verificare")],
        ["Analytics", "Società", "Admin limitati, lettura per il resto", "Obbligatoria", "Email aziendale", U.status("proposta", "Proposta")]
      ],
      {
        cls: "table-compact",
        note: "2FA = autenticazione a più fattori. Accesso di emergenza = credenziali conservate in modo sicuro, con uso registrato. Nessun account personale per attività sociali."
      }
    );

    const s4 = sec(
      "04",
      "Account e credenziali",
      "La società deve poter revocare un accesso in un'ora, non in una settimana.",
      "Il titolare dell'account è la società. L'admin è una persona, ma il controllo è aziendale.",
      `
      <div class="mt-1">
        ${tableCaption("Sei servizi critici", U.status("proposta", "Stato di lavoro"))}
        ${accountTable}
      </div>
      <div class="grid-2 mt-3">
        <article class="card">
          <p class="card-kicker">Igiene minima</p>
          <h3>Quattro regole non negoziabili</h3>
          <div class="numbered-list mt-2">
            <div class="numbered-item"><div><h4>2FA su tutto</h4><p>Posta, dominio, repository, cloud, app store, pagamenti e analytics.</p></div></div>
            <div class="numbered-item"><div><h4>Password manager aziendale</h4><p>Niente password in chat, documenti o repository. Le credenziali condivise ruotano.</p></div></div>
            <div class="numbered-item"><div><h4>Privilegio minimo (least privilege)</h4><p>Ognuno ha solo ciò che gli serve. Gli admin sono pochi e nominati.</p></div></div>
            <div class="numbered-item"><div><h4>Uscita e revoca (offboarding)</h4><p>Accessi revocati entro [●] ore, password cambiate, dispositivi recuperati.</p></div></div>
          </div>
        </article>
        <article class="card">
          <p class="card-kicker">Segregazione dei ruoli</p>
          <h3>Nessuno deve poter fare tutto da solo</h3>
          <p class="mt-1">Dominio, repository, cloud, app store e pagamenti non dovrebbero dipendere da una sola persona. Almeno due admin, due canali di recovery e un registro delle operazioni.</p>
          <p>Le credenziali di emergenza non si condividono via email. Vanno in cassaforte o in un vault con accesso tracciato. Il recupero deve essere possibile anche se una persona non è raggiungibile.</p>
        </article>
      </div>
      ${U.callout("warning", "Recovery personale = rischio di sequestro",
        "<p>Se l'email di recupero o il telefono è personale, la società può perdere l'accesso a un dominio, a un repository o a un account di pagamento. La recovery deve essere aziendale, ridondante e documentata.</p>"
      )}
      `
    );

    const s5 = sec(
      "05",
      "Continuità in caso di uscita",
      "Un'uscita non deve portare via il codice, i domini o i clienti.",
      "La revoca degli accessi è solo l'inizio. Servono migrazione, backup, prove e diritti.",
      `
      <div class="numbered-list">
        <div class="numbered-item"><div><h4>Revoca</h4><p>Accessi, sessioni, token, dispositivi ed email. Cambio delle credenziali condivise e verifica dei permessi residui.</p></div></div>
        <div class="numbered-item"><div><h4>Migrazione</h4><p>Repository, pipeline, segreti, ambienti e integrazioni. Verifica che la società possa distribuire e mantenere il prodotto senza la persona uscente.</p></div></div>
        <div class="numbered-item"><div><h4>Backup</h4><p>Copia verificata e restaurabile. Conservazione secondo la legge e la policy, con prova del ripristino.</p></div></div>
        <div class="numbered-item"><div><h4>Codice e diritti</h4><p>Conferma scritta della cessione, licenze sul preesistente e inventario delle componenti open source.</p></div></div>
        <div class="numbered-item"><div><h4>Domini e account</h4><p>Trasferimento o conferma dell'intestazione, rinnovi, contatti pubblici, app store e servizi di pagamento.</p></div></div>
      </div>
      <div class="grid-2 mt-3">
        <article class="card">
          <p class="card-kicker">Cosa resta alla società</p>
          <h3>Titolarità e licenze</h3>
          <p class="mt-1">La cessione già perfezionata non si annulla con l'uscita. La società mantiene i diritti acquisiti e le licenze concesse sul preesistente, nei limiti dell'accordo.</p>
          <p>Le clausole di riservatezza, non concorrenza e restituzione sopravvivono all'uscita.</p>
        </article>
        <article class="card">
          <p class="card-kicker">Cosa non può succedere</p>
          <h3>Nessun sequestro operativo</h3>
          <p class="mt-1">Il socio uscente non porta via codice, dati, clienti, credenziali o domini. Non cancella repository, non cambia DNS, non revoca account della società.</p>
          <p>Ogni accesso residuo è un rischio: va revocato e verificato, non solo promesso.</p>
        </article>
      </div>
      ${U.callout("legal", "La società mantiene i diritti",
        "<p>L'uscita non azzera ciò che è già stato trasferito: i diritti IP restano alla società. Se il preesistente era concesso in licenza, la licenza deve essere irrevocabile e trasferibile per la società, nei limiti di legge. La verifica legale serve prima della firma, non dopo il conflitto.</p>"
      )}
      `
    );

    const dueDiligence = U.callout("verify", "La due diligence parte da qui",
      "<p>Un investitore non guarda solo il prodotto. Chiede: chi è titolare del codice? I fondatori hanno ceduto? Le licenze sono compatibili? Gli account sono della società? Il preesistente è elencato?</p>" +
      "<p>Se la risposta è 'più o meno', il prezzo scende, l'operazione si blocca o si apre un contenzioso. Un registro IP ordinato non elimina il rischio, ma lo rende visibile e negoziabile.</p>" +
      "<p class=\"small muted\">Questa pagina è una checklist, non un parere legale. La verifica va fatta da un professionista e aggiornata a ogni progetto.</p>"
    );

    return page(hero + summary + s1 + s2 + s3 + s4 + s5 + dueDiligence + docNav());
  };

  /* ------------------------------------------------------------
     Uscite e conflitti
     ------------------------------------------------------------ */
  W.views.exits = function () {
    const hero = pageHero({
      eyebrow: "SNC · Uscite e conflitti",
      title: "Un'uscita ben scritta protegge chi resta e chi va.",
      lead: "Le cause di uscita, la qualificazione Good/Bad Leaver, la prelazione, lo stallo e la successione. Le regole si scrivono quando il rapporto funziona, non quando è già rotto.",
      intro: "Questa pagina distingue la legge dalla proposta contrattuale. Nessuna clausola può trasformare l'uscita in una confisca o eliminare i diritti che la legge riconosce.",
      meta: U.status("legge", "Artt. 580 / 825 CO") +
        U.status("proposta", "Matrice Leaver") +
        U.status("verifica", "Verifica legale"),
      actions: U.btn("Accordo tra fondatori", "#/documenti/founder", "btn-ink", "file") +
        U.btn("Contratto SNC", "#/documenti/snc", "btn-ghost", "file") +
        U.btn("Biblioteca clausole", "#/clausole", "btn-ghost", "book")
    });

    const summary = `
      <div class="grid-3 mt-3">
        ${miniCard("Prima", "Qualificare il fatto", "La causa di uscita va accertata con fatti e prove, non con etichette.")}
        ${miniCard("Poi", "Graduare le conseguenze", "Ruolo e diritti speciali possono cessare; la partecipazione non si confisca.")}
        ${miniCard("Sempre", "Scrivere la procedura", "Prezzo, pagamento, prelazione e stallo devono reggere davanti a un giudice.")}
      </div>`;

    const matrix = U.table(
      ["Causa", "Qualificazione", "Ruolo", "Diritti speciali", "Prezzo", "Note"],
      [
        ["Volontaria", U.pill("Good", "status-current"), "Cessa", "Cessano, salvo diritti maturati", "Valore reale o concordato", "Recesso con preavviso e formalità; art. 580 CO."],
        ["Concordata", U.pill("Good", "status-current"), "Cessa alla data", "Secondo l'accordo", "Prezzo concordato", "Scritto, approvazione e iscrizione se serve."],
        ["Inadempimento", U.pill("Bad", "status-danger"), "Cessa", "Cessano", "Valore reale con aggiustamento", "Esclusione giudiziale (art. 577 CO); prova e proporzionalità."],
        ["Riservatezza", U.pill("Bad", "status-danger"), "Cessa", "Cessano", "Valore reale con aggiustamento", "Violazione provata; no confisca."],
        ["Concorrenza", U.pill("Bad", "status-danger"), "Cessa", "Cessano", "Valore reale con aggiustamento", "Clausola proporzionata; art. 561 CO durante il rapporto."],
        ["Abbandono", U.pill("Bad", "status-danger"), "Cessa", "Cessano", "Valore reale con aggiustamento", "Definire abbandono e prova; no presunzioni."],
        ["Morte", U.pill("Good", "status-current"), "Cessa; eredi rappresentati", "Cessano", "Valore reale agli eredi", "Art. 545 cpv. 1 n. 2 CO; art. 576 CO; art. 788 CO."],
        ["Incapacità", U.pill("Good", "status-current"), "Cessa o sospeso", "Cessano o sospesi", "Valore reale", "Curatela, rappresentanza e continuità."],
        ["Stallo", U.pill("Neutra", "status-verify"), "Continua fino all'accordo", "Restano, salvo buy-sell", "Secondo procedura", "Nessuna qualificazione automatica; procedura di deadlock."]
      ],
      {
        cls: "table-compact",
        note: "La qualificazione è una proposta contrattuale, non una conseguenza automatica di legge. Nella SNC il socio uscente ha diritto a quanto gli spetta (art. 580 CO); nella Sagl il valore reale è il riferimento (art. 825 CO). Una clausola che azzera il valore è esposta a contestazione."
      }
    );

    const s1 = sec(
      "01",
      "Matrice delle uscite",
      "Nove scenari, una sola domanda: cosa resta a chi va e cosa resta a chi resta?",
      "La tabella è una proposta di lavoro. Non è una conseguenza automatica di legge e non sostituisce la qualificazione del caso concreto.",
      `
      <div class="legend-box">
        ${U.pill("Good Leaver", "status-current")}
        ${U.pill("Bad Leaver", "status-danger")}
        ${U.pill("Neutra", "status-verify")}
        ${U.status("proposta", "Qualificazione proposta")}
      </div>
      ${matrix}
      ${U.callout("warning", "Bad Leaver non significa zero",
        "<p>Significa perdita del ruolo, dei diritti speciali e, se previsto, un aggiustamento del prezzo. La sanzione deve essere proporzionata alla violazione, provata e motivata. La confisca è un rischio legale, non una clausola furba.</p>"
      )}
      `
    );

    const s2 = sec(
      "02",
      "Good e Bad Leaver",
      "La clausola distingue le cause, non le persone.",
      "Una buona clausola non è quella che urla di più: è quella che regge quando i fatti sono contestati.",
      `
      <div class="split-list">
        <div>
          <h4>Può</h4>
          <ul>
            <li>distinguere uscita fisiologica, concordata e violazione grave;</li>
            <li>far cessare ruolo, deleghe e poteri di firma;</li>
            <li>far cessare i diritti speciali, se previsto;</li>
            <li>prevedere un prezzo diverso, con sconto motivato;</li>
            <li>rateizzare, chiedere garanzie e compensare importi certi;</li>
            <li>imporre restituzione di materiali e revoca degli accessi.</li>
          </ul>
        </div>
        <div>
          <h4>Non può</h4>
          <ul>
            <li>confiscare la partecipazione o azzerare il valore senza base;</li>
            <li>escludere il socio senza il giudice, dove la legge lo richiede;</li>
            <li>cancellare i diritti maturati o i crediti;</li>
            <li>punire senza prova, nesso e proporzionalità;</li>
            <li>impedire in modo assoluto di lavorare;</li>
            <li>derogare a norme imperative o ai diritti dei terzi.</li>
          </ul>
        </div>
      </div>
      ${U.callout("legal", "La cornice legale",
        "<p><strong>SNC.</strong> Il socio uscente ha diritto a quanto gli spetta secondo la situazione patrimoniale al momento dell'uscita (art. 580 CO). Il contratto può definire il metodo, ma non eliminare il diritto.</p>" +
        "<p><strong>Sagl.</strong> Recesso ed esclusione seguono le regole di legge; il valore reale è il riferimento (art. 825 CO). La clausola contrattuale non può sostituirsi al giudice dove la legge lo richiede.</p>" +
        "<p><strong>SA.</strong> Non esiste un diritto generale di recesso con pagamento del valore reale come nella Sagl. Le conseguenze si costruiscono contrattualmente e con le restrizioni statutarie (artt. 685a–685c CO), rispettando i limiti di legge.</p>"
      )}
      <div class="numbered-list mt-3">
        <div class="numbered-item"><div><h4>Gravità</h4><p>La violazione è seria o è un pretesto per uscire a un prezzo più basso?</p></div></div>
        <div class="numbered-item"><div><h4>Prova</h4><p>Esiste un fatto documentato, contestabile e verificabile?</p></div></div>
        <div class="numbered-item"><div><h4>Nesso</h4><p>La conseguenza economica è collegata alla violazione o colpisce altro?</p></div></div>
        <div class="numbered-item"><div><h4>Economia</h4><p>Il prezzo resta un valore, anche ridotto, o diventa una confisca?</p></div></div>
        <div class="numbered-item"><div><h4>Difesa</h4><p>Il socio ha potuto spiegare e contestare prima della decisione?</p></div></div>
      </div>
      `
    );

    const transferTable = U.table(
      ["Forma", "Base legale", "Regola", "Cosa aggiungere"],
      [
        ["SNC", "Artt. 542 e 557 CO", "La cessione della partecipazione richiede il consenso degli altri soci; il contratto disciplina i rapporti interni.", "Prelazione, termini, prezzo, chiusura ed eccezioni familiari."],
        ["Sagl", "Artt. 785–788 CO", "Forma scritta, approvazione o gradimento, acquisto al valore reale nei casi di legge; la successione ha regole proprie.", "ROFR, approvazione, valore reale e rappresentanza degli eredi."],
        ["SA", "Artt. 685a–685c CO", "Lo statuto può limitare il trasferimento, subordinarlo ad approvazione e prevedere l'acquisto al valore reale.", "ROFR, tag/drag, gradimento e parità di trattamento."]
      ],
      {
        cls: "table-compact",
        note: "La legge non introduce un ROFR generale: la prelazione è contrattuale. La forma sociale decide quali consensi e formalità servono."
      }
    );

    const s3 = sec(
      "03",
      "Prelazione e trasferimenti",
      "Prima di vendere a un terzo, gli altri soci devono poter dire la loro.",
      "Il ROFR non è un divieto di vendita: è una procedura. Senza termini e prezzo trasparente, diventa un contenzioso.",
      `
      <div class="mt-1">
        ${tableCaption("Tre forme, tre procedure", U.status("legge", "Base legale") + U.status("proposta", "Clausola da scrivere"))}
        ${transferTable}
      </div>
      ${U.callout("legal", "Successione: art. 788 CO e art. 685b cpv. 4 CO",
        "<p>Nella Sagl, in caso di acquisto per successione, la società può offrire l'acquisto al valore reale secondo l'art. 788 CO. Nella SA, le limitazioni statutarie possono applicarsi anche all'acquisto per successione, nei limiti dell'art. 685b cpv. 4 CO.</p>" +
        "<p>Gli eredi non diventano automaticamente gestori. La rappresentanza e la valutazione vanno organizzate prima che il caso si presenti.</p>"
      )}
      <div class="numbered-list mt-3">
        <div class="numbered-item"><div><h4>Notifica scritta</h4><p>Acquirente, prezzo, condizioni, prova di finanziamento e data prevista del closing.</p></div></div>
        <div class="numbered-item"><div><h4>Verifica</h4><p>Consenso, statuto, prelazione, gradimento e diritti di terzi. Ogni condizione va soddisfatta o documentata.</p></div></div>
        <div class="numbered-item"><div><h4>Esercizio del ROFR</h4><p>Pro quota o integrale, con termini, modalità di pagamento e comunicazione al venditore.</p></div></div>
        <div class="numbered-item"><div><h4>Approvazione o rifiuto</h4><p>Se il trasferimento è rifiutato, si applica l'acquisto al valore reale o l'altra soluzione prevista dalla legge e dallo statuto.</p></div></div>
        <div class="numbered-item"><div><h4>Closing</h4><p>Pagamento, atto, iscrizione se necessaria, aggiornamento del registro delle partecipazioni e degli account.</p></div></div>
      </div>
      ${U.callout("decision", "Prezzo fittizio, clausola fragile",
        "<p>Se il prezzo dichiarato non è reale o le condizioni cambiano, la prelazione perde senso. Prevedere un obbligo di trasparenza, un termine breve e un meccanismo di verifica. Il ROFR non fissa il prezzo: lo rende verificabile.</p>"
      )}
      `
    );

    const s4 = sec(
      "04",
      "Stallo decisionale",
      "Due soci al 50% non hanno un tie-breaker. Devono averlo scritto.",
      "Lo stallo non si risolve con la buona volontà. Serve una procedura con tempi, costi e conseguenze.",
      `
      <div class="numbered-list">
        <div class="numbered-item"><div><h4>Escalation</h4><p>Confronto documentato entro [●] giorni. Posizioni, opzioni e decisioni già possibili entro il budget approvato.</p></div></div>
        <div class="numbered-item"><div><h4>Mediazione</h4><p>Mediatore indipendente, mandato, costi e riservatezza. Le iniziative straordinarie restano sospese.</p></div></div>
        <div class="numbered-item"><div><h4>Perizia</h4><p>Esperto tecnico o valutatore, quesito scritto, tempi e accesso ai documenti. La perizia non decide la volontà dei soci.</p></div></div>
        <div class="numbered-item"><div><h4>Buy-sell</h4><p>Offerta e controfferta, prezzo, pagamento, garanzie e scadenze. Il meccanismo va testato su scenari numerici prima della firma.</p></div></div>
        <div class="numbered-item"><div><h4>Scioglimento</h4><p>Ultima ratio. Liquidazione, creditori, responsabilità e continuità con clienti e collaboratori.</p></div></div>
      </div>
      ${U.callout("legal", "La cornice legale dello stallo",
        "<p><strong>SNC.</strong> Lo stallo può portare allo scioglimento per gravi motivi (art. 545 CO) o all'esclusione del socio inadempiente (art. 577 CO). Il giudice non è un tie-breaker automatico.</p>" +
        "<p><strong>Sagl.</strong> Recesso, esclusione e valore reale seguono gli artt. 821–825 CO. La procedura contrattuale deve coordinarsi con i rimedi di legge.</p>" +
        "<p><strong>SA.</strong> L'impugnazione delle delibere segue l'art. 706 CO; non esiste un rimedio generale di uscita. Il buy-sell è contrattuale.</p>"
      )}
      ${U.callout("warning", "Il buy-sell non è un gioco",
        "<p>Prezzo, chi paga, come si finanzia, cosa succede se il compratore non paga e se il valore è contestato. Un meccanismo non testato è una promessa di contenzioso.</p>"
      )}
      `
    );

    const s5 = sec(
      "05",
      "Morte e incapacità",
      "La morte non è solo un evento personale: è un evento societario.",
      "La continuità va decisa prima. Gli eredi hanno diritti economici, non un posto in gestione.",
      `
      <div class="grid-2">
        <article class="card">
          <p class="card-kicker">Cosa succede</p>
          <h3>La legge, senza patto</h3>
          <p class="mt-1">Nella SNC la morte è causa di scioglimento, salvo patto di continuazione (art. 545 cpv. 1 n. 2 CO). La continuazione tra i soci superstiti va organizzata (art. 576 CO).</p>
          <p>Nella Sagl l'acquisto per successione segue l'art. 788 CO; nella SA le restrizioni statutarie possono applicarsi nei limiti dell'art. 685b cpv. 4 CO.</p>
          <p>Gli eredi non diventano automaticamente gestori. Serve un rappresentante comune per i diritti economici e le comunicazioni.</p>
        </article>
        <article class="card">
          <p class="card-kicker">Cosa proteggere</p>
          <h3>Continuità e liquidità</h3>
          <p class="mt-1">Patto di continuazione, clausola di acquisto, valutazione indipendente, pagamento rateale e garanzie.</p>
          <p>Assicurazione sulla vita: beneficiario, premio, importo, trattamento fiscale e coordinamento con il buyout. La demo non inventa coperture.</p>
          <p>Testamento e pianificazione successoria devono essere coerenti con il contratto sociale e l'accordo tra fondatori.</p>
        </article>
      </div>
      ${U.callout("verify", "Valutazione e rappresentanza",
        "<p>La valutazione deve essere indipendente e seguire un metodo scritto. Il rappresentante comune degli eredi non è un amministratore: rappresenta i diritti economici, non assume la gestione. Le decisioni operative restano agli organi e ai soci secondo la legge e lo statuto.</p>"
      )}
      `
    );

    const protectionCards = `
      <div class="grid-2">
        <article class="card card-accent">
          <p class="card-kicker">Scheda individuale · proposta</p>
          <h3>Nicola Cappelli</h3>
          <p class="small muted mt-1">Diritti attribuiti nominativamente, separati e non trasferibili a terzi senza consenso.</p>
          <div class="stack-sm mt-2">
            <p class="small"><strong>Informazione</strong> periodica e accesso ai documenti.</p>
            <p class="small"><strong>Consultazione</strong> preventiva sulle materie riservate.</p>
            <p class="small"><strong>Veto</strong> personale dove ammesso; nella Sagl è personale e non trasferibile (art. 807 CO).</p>
            <p class="small"><strong>Rappresentanza</strong> in un organo, se concordata.</p>
            <p class="small"><strong>Anti-diluzione</strong> nei limiti di legge.</p>
            <p class="small"><strong>Uscita e successione</strong> secondo le regole scritte.</p>
          </div>
          <div class="mt-3">${U.status("proposta", "Nessun ruolo assegnato")}</div>
        </article>
        <article class="card card-accent">
          <p class="card-kicker">Scheda individuale · proposta</p>
          <h3>Bryan Ciaponi</h3>
          <p class="small muted mt-1">Contenuti equivalenti, titolarità separata. La scheda di uno non dipende dalla scheda dell'altro.</p>
          <div class="stack-sm mt-2">
            <p class="small"><strong>Informazione</strong> periodica e accesso ai documenti.</p>
            <p class="small"><strong>Consultazione</strong> preventiva sulle materie riservate.</p>
            <p class="small"><strong>Veto</strong> personale dove ammesso; nella Sagl è personale e non trasferibile (art. 807 CO).</p>
            <p class="small"><strong>Rappresentanza</strong> in un organo, se concordata.</p>
            <p class="small"><strong>Anti-diluzione</strong> nei limiti di legge.</p>
            <p class="small"><strong>Uscita e successione</strong> secondo le regole scritte.</p>
          </div>
          <div class="mt-3">${U.status("proposta", "Nessun ruolo assegnato")}</div>
        </article>
      </div>`;

    const founderTable = U.table(
      ["Scenario", "Nicola", "Bryan", "Società"],
      [
        ["Uscita di Nicola", "Cessa dal ruolo, se assegnato; perde i diritti personali. Conserva i diritti economici maturati e quanto gli spetta.", "Conserva i propri diritti e resta socio.", "Continua con Bryan; aggiorna registro, account e contratti."],
        ["Uscita di Bryan", "Conserva i propri diritti e resta socio.", "Cessa dal ruolo, se assegnato; perde i diritti personali. Conserva i diritti economici maturati e quanto gli spetta.", "Continua con Nicola; aggiorna registro, account e contratti."],
        ["Stallo", "Procedura di deadlock.", "Procedura di deadlock.", "Buy-sell o scioglimento; nessun automatismo."]
      ],
      {
        cls: "table-compact",
        note: "Tabella di proposta, non di legge. 'Perde i diritti personali' è l'effetto contrattuale proposto; i diritti economici maturati e quanto spetta per legge restano."
      }
    );

    const s6 = sec(
      "06",
      "Protezione individuale",
      "Due schede, due titolari, nessun cross-default.",
      "I diritti di protezione non sono un pacchetto unico. Se uno esce, l'altro non perde automaticamente i propri.",
      `
      ${protectionCards}
      ${U.callout("legal", "No cross-default",
        "<p>L'uscita, la sospensione o la vendita di un fondatore non fa cadere i diritti dell'altro. La clausola deve dirlo espressamente. Nella Sagl il veto è personale e non trasferibile (art. 807 CO); nella SA non esiste un veto statutario generale, quindi la protezione va costruita con statuto e patto parasociale, nei limiti di legge.</p>"
      )}
      <div class="mt-3">
        ${tableCaption("Cosa succede se uno esce", U.status("proposta", "Simulazione contrattuale"))}
        ${founderTable}
      </div>
      `
    );

    const finalCallout = U.callout("verify", "La clausola più dura non è quella che urla di più",
      "<p>Una clausola scritta bene non è quella con la penale più alta. È quella che distingue le cause, richiede prove, gradua le conseguenze, rispetta la proporzionalità e regge davanti a un giudice.</p>" +
      "<p>Prima della firma: verifica legale, test numerico e simulazione dei nove scenari di uscita. La durezza di una clausola si misura dalla sua applicabilità, non dal tono con cui è scritta.</p>"
    );

    return page(hero + summary + s1 + s2 + s3 + s4 + s5 + s6 + finalCallout + docNav());
  };
})();
