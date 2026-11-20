/* Viste — Verso la Sagl e controllo/voto. */
(function () {
  "use strict";

  const W = window.WDI = window.WDI || {};
  W.views = W.views || {};
  W.views.mount = W.views.mount || {};
  const U = W.ui;

  function card(kicker, title, body, cls) {
    return '<article class="card ' + (cls || "") + '">' +
      (kicker ? '<p class="card-kicker">' + kicker + "</p>" : "") +
      "<h3>" + title + "</h3>" +
      '<div class="mt-2">' + body + "</div>" +
      "</article>";
  }

  function list(items) {
    return '<ul class="small" style="padding-left:16px;line-height:1.65">' +
      items.map(function (item) { return "<li>" + item + "</li>"; }).join("") +
      "</ul>";
  }

  W.views.sagl = function (ctx) {
    return `
    <div class="page">
      <header class="doc-header">
        <span class="eyebrow">Fase 2 · Società a garanzia limitata</span>
        <h1 class="page-title mt-2">Verso la Sagl</h1>
        <p class="lead mt-3 measure-wide">Da due soci a una società di capitali: si cambia forma, non si cancella la storia.</p>
        <p class="body-lg measure mt-2">La Sagl porta capitale, quote e responsabilità limitata. Non è una SNC con un'altra etichetta: cambiano il patrimonio, i diritti dei soci e il modo di decidere. La trasformazione segue la LFus e richiede una decisione consapevole, un atto pubblico e un'iscrizione.</p>
        <div class="row gap-1 mt-3">
          ${U.btn("Controllo e voto", "#/controllo", "btn-ink", "shield")}
          ${U.btn("Simulatore", "#/simulatore", "btn-ghost", "chart")}
          ${U.btn("Statuto Sagl", "#/documenti/sagl", "btn-ghost", "file")}
          ${U.btn("Statuto SA", "#/documenti/sa", "btn-ghost", "file")}
        </div>
        <div class="doc-meta">
          ${U.status("legge", "Artt. 772–827 CO")}
          ${U.status("formale", "LFus 53–67")}
          ${U.status("esempio", "Modello, non consulenza")}
        </div>
      </header>

      <section class="section" id="sagl-perche">
        ${U.sectionHead("01", "La forma", "Perché la Sagl", "Non è una promozione automatica: è un cambio di contenitore, con regole nuove.")}
        <div class="grid-2-1">
          <div class="stack">
            <p class="body-lg">La Sagl è una società di capitali a carattere personale. Il capitale appartiene alla società; i soci partecipano tramite quote. La responsabilità verso i creditori è, di principio, limitata al patrimonio sociale (art. 794 CO), salvo le eccezioni di legge.</p>
            <p class="body-lg">Rispetto alla SNC cambiano tre cose: il capitale diventa una grandezza giuridica, la partecipazione diventa una quota, le decisioni passano a un'assemblea e a gerenti. La storia dell'impresa resta; la sua architettura no.</p>
            ${U.callout("legal", "La base legale", `<p>La Sagl è disciplinata dagli <strong>artt. 772–827 CO</strong>. La trasformazione da SNC segue la <strong>LFus</strong> (artt. 53–67) e non si esaurisce in una delibera informale.</p>`)}
          </div>
          <div class="grid-2">
            ${card("Capitale", "CHF 20'000, interamente liberato", `<p class="small">È il minimo legale. Il capitale è una cifra di bilancio, non il valore dell'impresa (artt. 773–774 CO).</p>`)}
            ${card("Responsabilità", "Limitata al patrimonio sociale", `<p class="small">Di principio i soci non rispondono con il proprio patrimonio per i debiti sociali (art. 794 CO). Le eccezioni di legge restano.</p>`)}
            ${card("Partecipazione", "Quote, non azioni", `<p class="small">Ogni quota ha un valore nominale superiore a zero ed è iscritta nel libro delle quote con il suo titolare (art. 790 CO).</p>`)}
            ${card("Governo", "Assemblea e gerenti", `<p class="small">L'assemblea è l'organo supremo; i gerenti amministrano e rappresentano. La revisione segue regole proprie (artt. 804–818 CO).</p>`)}
          </div>
        </div>
        <div class="mt-3">
          ${U.callout("warning", "La Sagl non è una SNC con più carta", `<p>Nella SNC la partecipazione è un accordo e la responsabilità è personale. Nella Sagl la partecipazione è una quota, il capitale è sociale e la responsabilità è limitata. Un patto interno non trasforma una SNC in una Sagl: serve la LFus.</p>`)}
        </div>
      </section>

      <section class="section" id="sagl-trasformazione">
        ${U.sectionHead("02", "Il passaggio", "Cosa serve per trasformare", "Progetto, rapporto, verifica, consultazione, decisione, atto pubblico, iscrizione. In quest'ordine, non in un altro.")}
        <div class="grid-2-1">
          <div>
            <p class="body-lg">La trasformazione non è automatica. È un procedimento della LFus, con documenti e formalità. Le PMI possono rinunciare ad alcuni passaggi, ma solo con il consenso di tutti i soci e alle condizioni di legge.</p>
            <div class="numbered-list mt-3">
              <div class="numbered-item"><div><h4>Progetto di trasformazione</h4><p>L'organo dirigente redige il progetto in forma scritta. Contiene ditta, sede e forma prima e dopo, nuovo statuto, numero, tipo e valore delle quote, diritti dei soci (artt. 59–60 LFus).</p></div></div>
              <div class="numbered-item"><div><h4>Rapporto di trasformazione</h4><p>Spiega e giustifica l'operazione sotto il profilo economico e giuridico: scopo, nuovo statuto, rapporto di scambio, diritti e obblighi (art. 61 LFus). Le PMI possono rinunciarvi con il consenso di tutti i soci.</p></div></div>
              <div class="numbered-item"><div><h4>Verifica</h4><p>Un perito revisore abilitato verifica progetto, rapporto e bilancio. Le PMI possono rinunciare alla verifica con il consenso di tutti i soci (art. 62 LFus).</p></div></div>
              <div class="numbered-item"><div><h4>Consultazione</h4><p>Prima della decisione, i soci possono consultare progetto, rapporto, relazione di revisione, conti degli ultimi tre esercizi e, se del caso, il conto intermedio. Le PMI possono rinunciarvi con il consenso di tutti i soci (art. 63 LFus).</p></div></div>
              <div class="numbered-item"><div><h4>Decisione dei soci</h4><p>Di regola serve l'approvazione di tutti i soci. Il contratto sociale può prevedere la maggioranza dei tre quarti (art. 64 cpv. 2 LFus). Non è una decisione del solo gerente.</p></div></div>
              <div class="numbered-item"><div><h4>Atto pubblico</h4><p>La decisione di trasformazione richiede l'atto pubblico (art. 65 LFus).</p></div></div>
              <div class="numbered-item"><div><h4>Iscrizione</h4><p>La trasformazione diventa efficace con l'iscrizione nel Registro di commercio (artt. 66–67 LFus).</p></div></div>
              <div class="numbered-item"><div><h4>Tutela dei diritti</h4><p>Le quote e i diritti societari vanno salvaguardati. Per i diritti speciali servono diritti equivalenti o un'indennità adeguata (art. 56 LFus).</p></div></div>
            </div>
          </div>
          <div class="stack">
            ${U.callout("warning", "Non è automatica", `<p>Una clausola del contratto SNC non basta. Non basta nemmeno una delibera informale o un accordo tra i due soci. Servono il progetto, la decisione nelle forme di legge, l'atto pubblico e l'iscrizione. La trasformazione produce effetti con l'iscrizione (art. 67 LFus).</p>`)}
            ${U.callout("legal", "La storia resta, i diritti vanno ricostruiti", `<p>Con la trasformazione la società cambia forma senza liquidazione (art. 53 LFus). I rapporti giuridici proseguono. Ma le quote e i diritti dei soci devono essere salvaguardati; per i diritti speciali servono diritti equivalenti o un'indennità adeguata (art. 56 LFus).</p>`)}
            <div class="card card-dark">
              <p class="card-kicker" style="color:#d99b84">Checkpoint</p>
              <h3>Prima di convocare l'assemblea</h3>
              <div class="mt-2">
                ${list([
                  "Il progetto è scritto e contiene il nuovo statuto?",
                  "Il rapporto spiega il rapporto di scambio e i diritti?",
                  "La verifica o la deroga PMI è documentata?",
                  "La consultazione è stata garantita o rinunciata?",
                  "La decisione è stata presa con la maggioranza corretta?",
                  "Atto pubblico e iscrizione sono pianificati?"
                ])}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section" id="sagl-capitale">
        ${U.sectionHead("03", "Il capitale", "Capitale e quote", "Una cifra legale, un valore nominale, un registro. Tre cose da non confondere.")}
        <div class="grid-2-1">
          <div class="stack">
            <p class="body-lg">Il capitale è una cifra di bilancio. Le quote sono la partecipazione. Il libro delle quote è il registro dei soci. Nessuno dei tre coincide con la valutazione dell'impresa.</p>
            <p class="body-lg">La versione base non prevede versamenti suppletivi né prestazioni accessorie. Non inserirli per imitazione: cambiano il rischio personale e il valore della quota.</p>
          </div>
          <div>
            ${U.callout("example", "Capitale non è valutazione", `<p>CHF 20'000 è il minimo legale. Non è il prezzo della società, non è la valutazione e non è la somma che gli investitori pagano. Una quota da CHF 1 di nominale può essere emessa a un prezzo superiore; la differenza è aggio. La valutazione è una scelta negoziale.</p>`)}
          </div>
        </div>
        <div class="mt-3">
          ${U.table(["Voce", "Regola", "Base"], [
            ["<strong>Capitale minimo</strong>", "CHF 20'000, interamente liberato.", "artt. 773–774 CO"],
            ["<strong>Valore nominale</strong>", "Ogni quota ha un valore nominale superiore a zero. Può essere emessa sopra il nominale; l'aggio non è capitale.", "artt. 773–774 CO"],
            ["<strong>Liberazione</strong>", "Il capitale deve essere interamente liberato. Non basta promettere il versamento.", "art. 774 CO"],
            ["<strong>Libro delle quote</strong>", "Soci, numero, valore nominale e categorie delle quote. Ogni socio può consultarlo.", "art. 790 CO"],
            ["<strong>Conferimenti</strong>", "Ogni socio deve conferire il prezzo di emissione; i conferimenti non si restituiscono.", "art. 793 CO"],
            ["<strong>Versamenti suppletivi</strong>", "Non previsti nella versione base. Se introdotti, richiedono base statutaria, limiti di legge e consenso dei soci interessati. L'importo per quota non può superare il doppio del nominale.", "artt. 795–797 CO"],
            ["<strong>Prestazioni accessorie</strong>", "Non previste nella versione base. Se introdotte, devono essere utili allo scopo sociale e richiedono il consenso dei soci interessati.", "artt. 796–797 CO"]
          ], { note: "Il capitale è una cifra legale; la valutazione è un'altra cosa. I conferimenti in natura e le compensazioni richiedono verifiche ulteriori." })}
        </div>
      </section>

      <section class="section" id="sagl-categorie">
        ${U.sectionHead("04", "Le categorie", "Categorie A/B: un'etichetta, non un diritto", "La legge non conosce una categoria Founder e una Investor. Conosce quote, statuto e diritti definiti.")}
        ${U.callout("warning", "A e B non sono categorie legali automatiche", `<p>La Sagl può creare quote privilegiate (art. 799 CO) e un voto differenziato (art. 806 CO). Ma le etichette A/B non producono da sole diritti, preferenze o veti. Se le usate, lo statuto deve dire cosa significa ciascuna categoria, per quali diritti e con quali limiti.</p>`)}
        <div class="grid-2-1 mt-3">
          <div class="stack">
            <p class="body-lg">La distinzione utile non è tra persone, ma tra diritti: chi ha preferenza sugli utili, chi ha più voti, chi ha un veto, chi può trasferire. Un nome può aiutare a comunicare; non può sostituire una clausola.</p>
            <p class="body-lg">Le quote privilegiate e il voto differenziato sono possibilità legali, non una struttura pronta. Vanno scelte, negoziate, scritte nello statuto e verificate.</p>
          </div>
          <div>
            ${U.callout("legal", "Due leve diverse", `<p>L'<strong>art. 799 CO</strong> riguarda i privilegi economici delle quote. L'<strong>art. 806 CO</strong> riguarda il voto. Sono leve distinte: una preferenza sugli utili non aumenta i voti, e un voto maggiore non crea da solo una preferenza economica.</p>`)}
          </div>
        </div>
        <div class="mt-3">
          <p class="card-kicker">Founder / Investor · diritti da definire</p>
          ${U.table(["Diritto", "Founder (A)", "Investor (B)", "Dove si scrive"], [
            ["<strong>Nominale e numero</strong>", "CHF [●] per quota; n. [●]", "CHF [●] per quota; n. [●]", "Statuto / progetto"],
            ["<strong>Utili e avanzo</strong>", "Quota [●]; eventuale preferenza [●]", "Quota [●]; eventuale preferenza ex art. 799", "Statuto"],
            ["<strong>Voto</strong>", "Proporzionale, per numero di quote o tetto [●]", "Proporzionale, per numero di quote o tetto [●]", "Statuto, art. 806 CO"],
            ["<strong>Veto</strong>", "Solo se personale e attribuito a un socio; materie [●]", "Non automatico; eventuale veto [●]", "Statuto, art. 807 CO"],
            ["<strong>Trasferimento</strong>", "Gradimento, prelazione, conversione [●]", "Gradimento, prelazione [●]", "Statuto, artt. 785–788 CO"],
            ["<strong>Informazione</strong>", "Diritto di ragguaglio ai gerenti (art. 802 CO)", "Reportistica aggiuntiva [●]", "Legge + accordo"]
          ], { note: "Le colonne sono simmetriche di proposito: nessun diritto è implicito nel nome. Le etichette A/B sono di progetto; i diritti restano quelli scritti nello statuto." })}
        </div>
      </section>

      <section class="section" id="sagl-voto">
        ${U.sectionHead("05", "Il potere", "Voto e veto", "Il voto si conta. Il veto si esercita. Non sono la stessa cosa.")}
        <div class="grid-2">
          ${card("Art. 806 CO", "Voto", list([
            "Di regola il voto è proporzionale al valore nominale delle quote (cpv. 1).",
            "Lo statuto può adottare una quota = un voto, senza riguardo al nominale (cpv. 2).",
            "In quel caso, la quota con nominale più basso deve valere almeno un decimo della più alta: rapporto massimo 10:1.",
            "Lo statuto può limitare il numero di voti dei possessori di più quote (tetto).",
            "Il criterio per numero di quote non vale per la nomina della revisione, la designazione di periti e la decisione sull'azione di responsabilità (cpv. 3)."
          ]), "card-accent")}
          ${card("Art. 807 CO", "Veto", list([
            "Lo statuto può attribuire a singoli soci un veto contro determinate deliberazioni.",
            "Le materie vanno elencate: un veto generico non basta.",
            "È personale e non trasferibile (cpv. 3).",
            "L'introduzione successiva richiede il consenso di tutti i soci (cpv. 2)."
          ]))}
        </div>
        <div class="mt-3">
          ${U.callout("warning", "Il veto non si vende", `<p>Non si cede a un terzo, non si trasferisce con la quota, non si esercita per procura generale. Se il fondatore esce, il veto non segue la quota. Un veto negoziato in un patto parasociale è un'altra cosa: non è un veto statutario.</p>`)}
        </div>
      </section>

      <section class="section" id="sagl-organi">
        ${U.sectionHead("06", "Gli organi", "Chi decide, chi amministra, chi controlla", "La Sagl non è una SA in miniatura: ha gerenti, non un consiglio d'amministrazione.")}
        <div class="grid-3">
          ${card("Artt. 804–808 CO", "Assemblea", list([
            "È l'organo supremo della società (art. 804).",
            "È convocata almeno 20 giorni prima, salvo i casi di legge (art. 805).",
            "Delibera a maggioranza assoluta dei voti rappresentati, salvo legge o statuto (art. 808)."
          ]))}
          ${card("Artt. 809–815 CO", "Gerenti", list([
            "Uno o più gerenti, persone fisiche, nominati dall'assemblea (art. 809).",
            "Amministrano e rappresentano. Almeno uno deve essere autorizzato a rappresentare ed essere domiciliato in Svizzera (art. 814).",
            "Sono revocabili in ogni tempo (art. 815)."
          ]))}
          ${card("Artt. 818, 727a CO", "Revisione", list([
            "Si applica per analogia la disciplina della SA (art. 818).",
            "La rinuncia alla revisione limitata è possibile solo se sussistono i presupposti dell'art. 727a: un numero medio annuo di posti a tempo pieno non superiore a 10, il consenso di tutti i soci e la notifica al Registro.",
            "La rinuncia non elimina la contabilità e la verifica della solvibilità."
          ]))}
        </div>
        <p class="mini-note mt-2">Nella Sagl l'organo di gestione è il gerente o i gerenti. Il linguaggio della SA (consiglio, board) non si trasferisce automaticamente.</p>
      </section>

      <section class="section" id="sagl-esempio">
        ${U.sectionHead("07", "L'esempio", "La matematica del 10:1", "Un esempio per capire, non una struttura da copiare.")}
        <div class="row gap-1 mb-2">
          ${U.status("esempio", "Esempio, non struttura iniziale")}
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Categoria</th>
                <th class="num">Quote</th>
                <th class="num">Nominale</th>
                <th class="num">Capitale</th>
                <th class="num">Quota capitale</th>
                <th class="num">Voti</th>
                <th class="num">Quota voti</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>A — Founder</strong></td>
                <td class="num">20'000</td>
                <td class="num">CHF 1</td>
                <td class="num">CHF 20'000</td>
                <td class="num">20%</td>
                <td class="num">20'000</td>
                <td class="num">71,4%</td>
              </tr>
              <tr>
                <td><strong>B — Investor</strong></td>
                <td class="num">8'000</td>
                <td class="num">CHF 10</td>
                <td class="num">CHF 80'000</td>
                <td class="num">80%</td>
                <td class="num">8'000</td>
                <td class="num">28,6%</td>
              </tr>
              <tr class="row-total">
                <td>Totale</td>
                <td class="num">28'000</td>
                <td class="num">—</td>
                <td class="num">CHF 100'000</td>
                <td class="num">100%</td>
                <td class="num">28'000</td>
                <td class="num">100%</td>
              </tr>
            </tbody>
          </table>
          <div class="table-note">Esempio illustrativo. Non è la struttura iniziale della Sagl e non è un diritto acquisito.</div>
        </div>
        <div class="grid-2 mt-3">
          <div class="stack">
            <p class="body-lg">20'000 quote A da CHF 1 valgono CHF 20'000, cioè il 20% del capitale. 8'000 quote B da CHF 10 valgono CHF 80'000, cioè l'80%. Con una quota = un voto, A esprime 20'000 voti su 28'000 (71,4%) e B 8'000 su 28'000 (28,6%).</p>
            ${U.callout("example", "Perché i numeri tornano", `<p>Il rapporto tra il nominale più alto (CHF 10) e quello più basso (CHF 1) è esattamente 10:1. Le quote A sono interamente liberate. Lo statuto deve adottare espressamente il criterio una quota = un voto: senza quella clausola, il voto segue il nominale e il 20% economico resta 20% di voti.</p>`)}
          </div>
          <div class="stack">
            ${U.callout("verify", "Cosa serve perché la struttura regga", `<ul style="padding-left:16px;margin:0"><li>Previsione statutaria espressa del criterio una quota = un voto.</li><li>Rapporto nominale massimo 10:1.</li><li>Capitale interamente liberato e quote iscritte nel libro delle quote.</li><li>Approvazione dello statuto e accettazione degli investitori.</li><li>Verifica notarile e iscrizione nelle forme di legge.</li></ul>`)}
            ${U.callout("warning", "Cosa non dimostra", `<p>Non dimostra che il 60% sia garantito, che gli investitori accettino la struttura o che le maggioranze di legge siano superate. È un esempio aritmetico, non una raccomandazione.</p>`)}
          </div>
        </div>
      </section>

      <section class="section" id="sagl-errori">
        ${U.sectionHead("08", "I rischi", "Errori da evitare", "Quattro confusioni che costano tempo, denaro o diritti.")}
        <div class="grid-2">
          ${card("Errore 01", "Applicare alla SNC le regole della Sagl", `<p class="small">La SNC non ha capitale sociale, quote o responsabilità limitata. Un patto interno non crea una Sagl: la trasformazione segue la LFus.</p>`, "card-flat")}
          ${card("Errore 02", "Credere che la trasformazione preservi tutto automaticamente", `<p class="small">L'art. 56 LFus impone di salvaguardare quote e diritti societari. Per i diritti speciali servono diritti equivalenti o un'indennità adeguata. La nuova struttura va scritta nello statuto.</p>`, "card-flat")}
          ${card("Errore 03", "Confondere capitale e valutazione", `<p class="small">CHF 20'000 è il minimo legale. Il valore dell'impresa è un'altra cosa. Il prezzo di emissione può superare il nominale; la differenza è aggio.</p>`, "card-flat")}
          ${card("Errore 04", "Dimenticare atto pubblico e registro", `<p class="small">Senza atto pubblico (art. 65 LFus) e iscrizione (artt. 66–67 LFus) la trasformazione non è efficace. La firma tra soci non basta.</p>`, "card-flat")}
        </div>
        <div class="mt-3">
          ${U.callout("verify", "Prima della firma", `<p>Verificare con un professionista: capitale e conferimenti, statuto e categorie, diritti di voto e veto, maggioranze, formalità LFus, effetti fiscali e contabili. Questa pagina è materiale illustrativo, non consulenza legale.</p>`)}
        </div>
      </section>

      <div class="doc-nav">
        ${U.btn("Controllo e voto", "#/controllo", "btn-ink", "shield")}
        ${U.btn("Simulatore", "#/simulatore", "btn-ghost", "chart")}
        ${U.btn("Statuto Sagl", "#/documenti/sagl", "btn-ghost", "file")}
        ${U.btn("Statuto SA", "#/documenti/sa", "btn-ghost", "file")}
      </div>
    </div>`.trim();
  };

  W.views.control = function () {
    return `
    <div class="page">
      <header class="doc-header">
        <span class="eyebrow">Governance · Fase 2/3</span>
        <h1 class="page-title mt-2">Controllo e voto</h1>
        <p class="lead mt-3 measure-wide">Il 20% economico può valere il 60% dei voti? Dipende da come è scritto lo statuto.</p>
        <p class="body-lg measure mt-2">La domanda non è solo quanto possiedo. È quale decisione, in quale organo, con quale maggioranza. Economia, voti e veto/consiglio sono tre livelli distinti: questa pagina li separa e mostra dove il numero smette di spiegare il controllo.</p>
        <div class="row gap-1 mt-3">
          ${U.btn("Simulatore", "#/simulatore", "btn-ink", "chart")}
          ${U.btn("Investimenti", "#/investimenti", "btn-ghost", "layers")}
          ${U.btn("Statuto Sagl", "#/documenti/sagl", "btn-ghost", "file")}
          ${U.btn("Statuto SA", "#/documenti/sa", "btn-ghost", "file")}
        </div>
        <div class="doc-meta">
          ${U.status("legge", "Possibilità legale")}
          ${U.pill("Scelta negoziale", "status-draft")}
          ${U.status("verifica", "Verifica necessaria")}
        </div>
      </header>

      <section class="section" id="controllo-livelli">
        ${U.sectionHead("01", "I tre livelli", "Economia, voti, veto/consiglio", "Non sono la stessa cosa e non si sommano.")}
        <div class="grid-3">
          ${card("01 · Economia", "Quanto vale la partecipazione", `<p class="small">Utili, avanzo di liquidazione, prezzo in caso di vendita. Dipende dal capitale e dai diritti patrimoniali.</p>`)}
          ${card("02 · Voti", "Chi decide in assemblea", `<p class="small">Dipende dal criterio statutario e dalle maggioranze applicabili. Il voto può essere proporzionale, per numero di quote o limitato da un tetto.</p>`)}
          ${card("03 · Veto e consiglio", "Chi blocca o influenza", `<p class="small">Veto statutario nella Sagl, materie riservate, seggio in consiglio. Un seggio non è un veto; un veto non è un voto.</p>`)}
        </div>
        <div class="mt-3">
          ${U.callout("legal", "La domanda giusta", `<p>Non <strong>quanto possiedo</strong>, ma <strong>quale decisione, in quale organo, con quale maggioranza</strong>. Il 20% economico non è il 20% dei voti. E il 60% dei voti non è il 60% del controllo: contano anche materie, veto e composizione degli organi.</p>`)}
        </div>
      </section>

      <section class="section" id="controllo-calcolatore">
        ${U.sectionHead("02", "Il calcolatore", "Quanto pesa il 20%?", "Muovi l'economia e cambia il modello di voto. Il risultato mostra il divario, non una raccomandazione.")}
        <div id="control-root"></div>
        <p class="mini-note mt-2">Modello semplificato a tre holder: due fondatori con la stessa quota e un investitore. Non è una cap table reale e non calcola nominale, aggio, imposte o diritti di categoria.</p>
        ${U.callout("note", "Il 60% è un obiettivo, non una soglia di legge", `<p>La soglia del 60% serve a confrontare i modelli nella demo. Le maggioranze legali sono quelle applicabili alla singola materia. Nella SA, per le materie dell'art. 704 CO servono almeno due terzi dei voti rappresentati e la maggioranza assoluta dei valori nominali rappresentati.</p>`)}
      </section>

      <section class="section" id="controllo-matematica">
        ${U.sectionHead("03", "La formula", "La matematica del 10:1", "Perché il 20% economico può diventare il 71,4% dei voti.")}
        <div class="grid-2">
          <div class="stack">
            <p class="body-lg">Con il criterio una quota = un voto, il voto non segue il capitale: segue il numero di quote. Se le quote dei fondatori hanno nominale 1 e quelle degli investitori nominale 10, ogni quota vale un voto, ma la quota da 10 pesa dieci volte di più nell'economia.</p>
            <p class="body-lg">Quando lo statuto adotta il criterio una quota = un voto, il rapporto massimo tra il nominale più alto e quello più basso è 10:1. Non è un rapporto tra voti: è un vincolo sul nominale. Serve a evitare che il voto si stacchi completamente dal capitale di rischio.</p>
            ${U.callout("warning", "Il 10:1 non è automatico", `<p>È un limite massimo, non un diritto acquisito. A parità di capitale, un rapporto inferiore riduce il vantaggio di voto. Con il voto proporzionale al nominale, il 20% economico resta 20% di voti.</p>`)}
          </div>
          <div class="card card-dark">
            <p class="card-kicker" style="color:#d99b84">Formula dell'esempio</p>
            <h3>Due quote, due misure</h3>
            <div class="instrument-note" style="background:rgba(255,255,255,.06);border-left-color:#d99b84;color:#dce6df">
              <p class="mono" style="color:#f3edde">quota voti A = nA / (nA + nB)</p>
              <p class="mono" style="color:#f3edde">quota capitale A = (nA × 1) / (nA × 1 + nB × 10)</p>
            </div>
            <p class="small mt-2" style="color:#b9c8bd">Con 20'000 quote A e 8'000 quote B: 20'000 / 28'000 = 71,4% dei voti; 20'000 / 100'000 = 20% del capitale.</p>
          </div>
        </div>
        <div class="table-wrap mt-3">
          <table>
            <thead>
              <tr>
                <th>Categoria</th>
                <th class="num">Quote</th>
                <th class="num">Nominale</th>
                <th class="num">Capitale</th>
                <th class="num">Economia</th>
                <th class="num">Voti</th>
                <th class="num">Quota voti</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>A — Founder</strong></td>
                <td class="num">20'000</td>
                <td class="num">CHF 1</td>
                <td class="num">CHF 20'000</td>
                <td class="num">20,0%</td>
                <td class="num">20'000</td>
                <td class="num">71,4%</td>
              </tr>
              <tr>
                <td><strong>B — Investor</strong></td>
                <td class="num">8'000</td>
                <td class="num">CHF 10</td>
                <td class="num">CHF 80'000</td>
                <td class="num">80,0%</td>
                <td class="num">8'000</td>
                <td class="num">28,6%</td>
              </tr>
              <tr class="row-total">
                <td>Totale</td>
                <td class="num">28'000</td>
                <td class="num">—</td>
                <td class="num">CHF 100'000</td>
                <td class="num">100%</td>
                <td class="num">28'000</td>
                <td class="num">100%</td>
              </tr>
            </tbody>
          </table>
          <div class="table-note">Esempio illustrativo. Non è la struttura iniziale della Sagl o della SA e non è un diritto acquisito.</div>
        </div>
        <div class="grid-2 mt-3">
          <div>
            ${U.callout("legal", "Le condizioni", `<ul style="padding-left:16px;margin:0"><li><strong>Sagl — art. 806 cpv. 2 CO:</strong> lo statuto deve adottare una quota = un voto; le quote a nominale ridotto devono valere almeno un decimo di quelle a nominale più alto; il capitale deve essere interamente liberato e le quote vanno iscritte nel libro delle quote.</li><li><strong>SA — art. 693 cpv. 2 CO:</strong> azioni a nominale ridotto, nominative e interamente liberate; rapporto massimo 10:1.</li><li><strong>Previsione espressa:</strong> il criterio non si desume da un patto o da una tabella.</li><li><strong>Eccezioni:</strong> il criterio per numero di quote/azioni non vale per revisione, periti e azione di responsabilità (art. 806 cpv. 3; art. 693 cpv. 3).</li></ul>`)}
          </div>
          <div>
            ${U.callout("warning", "Cosa non dice", `<p>Non dice che il 60% sia garantito, che gli investitori accettino la struttura o che le maggioranze di legge siano superate. Il 10:1 è un limite massimo per il voto per numero di quote/azioni; il 71,4% vale solo con questo numero di quote e questo nominale.</p>`)}
          </div>
        </div>
      </section>

      <section class="section" id="controllo-tetto">
        ${U.sectionHead("04", "Il tetto", "Il tetto ai voti", "Funziona aritmeticamente, ma è visibile, negoziabile e può essere rifiutato.")}
        <div class="stack">
          <p class="body-lg">Un tetto statutario limita i voti di ogni holder. Nel modello della demo, con due fondatori al 10% ciascuno e un investitore all'80%, un tetto del 12% porta i fondatori al 62,5%; un tetto del 25% li lascia al 44,4%.</p>
        </div>
        <div class="mt-3">
          ${U.table(["Tetto per holder", { label: "Voti investitore", num: true }, { label: "Voti fondatori", num: true }, "Obiettivo 60%?"], [
            ["Nessuno", "80,0%", "20,0%", "No"],
            ["10%", "10,0%", "66,7%", "Sì"],
            ["12%", "12,0%", "62,5%", "Sì"],
            ["25%", "25,0%", "44,4%", "No"]
          ], { note: "Esempio semplificato: due fondatori uguali, un solo investitore, tetto applicato a ogni holder e denominatore non ristretto. Con più holder o un tetto diverso i risultati cambiano." })}
        </div>
        <div class="grid-2 mt-3">
          <div>
            ${U.callout("example", "Perché il 25% non basta", `<p>Con un tetto del 12%, l'investitore scende da 80 a 12 unità di voto. I fondatori hanno 10 + 10 = 20 unità. Totale 32. Voti fondatori: 20 / 32 = 62,5%.</p><p>Con un tetto del 25%, l'investitore ha 25 unità e i fondatori 20. Totale 45. Voti fondatori: 20 / 45 = 44,4%.</p>`)}
          </div>
          <div>
            ${U.callout("warning", "Il tetto è una scelta visibile", `<p>Non è un trucco: chi legge lo statuto lo vede e può rifiutarlo. Deve essere previsto nello statuto, applicato in modo uniforme e non può eliminare il diritto di voto. Un tetto molto basso può rendere il round poco attraente o essere contestato.</p>`)}
          </div>
        </div>
        ${U.callout("note", "Il limite aritmetico", `<p>In questo modello, con il 20% di economia, il tetto massimo che lascia ai fondatori almeno il 60% è circa 13% per holder (60,6%); con 14% scendono sotto. Il 12% è un esempio, non una soglia legale.</p>`)}
      </section>

      <section class="section" id="controllo-limiti">
        ${U.sectionHead("05", "I limiti", "Cosa non si può fare", "Sei scorciatoie che non reggono davanti a uno statuto o a una delibera.")}
        ${U.table(["Scorciatoia", "Perché non regge", "Cosa fare invece"], [
          ["<strong>Superare il rapporto 10:1 nel modello una quota = un voto</strong>", "L'art. 806 cpv. 2 CO (Sagl) e l'art. 693 cpv. 2 CO (SA) fissano un limite per il voto per numero di quote/azioni. Un nominale 20:1 non si corregge con un patto se si adotta quel criterio.", "Ridurre il nominale privilegiato, aumentare quello ordinario o accettare il voto proporzionale."],
          ["<strong>Ignorare le maggioranze dell'art. 704</strong>", "Nella SA le materie elencate richiedono almeno due terzi dei voti rappresentati e la maggioranza del nominale. Un accordo al 60% non le supera.", "Verificare la materia, costruire la maggioranza e negoziare prima della delibera."],
          ["<strong>Eliminare il diritto di voto</strong>", "Le limitazioni devono essere statutarie, uniformi e non possono privare il socio del voto in modo assoluto. Un tetto non è un azzeramento.", "Usare tetto, quote privilegiate, veto o materie riservate, nei limiti di legge."],
          ["<strong>Usare un veto SA inesistente</strong>", "Nella SA non c'è un veto statutario generale come l'art. 807 della Sagl. Un patto parasociale non vincola la società.", "Costruire statuto, maggioranze qualificate e patto parasociale; verificarne l'efficacia."],
          ["<strong>Confondere patto e statuto</strong>", "Il patto vincola chi lo firma; lo statuto è la regola della società, iscritta e opponibile nei limiti di legge. Non sono intercambiabili.", "Mettere nello statuto i diritti societari; usare il patto per obblighi personali e di voto."],
          ["<strong>Pensare che il 60% basti per il 2/3</strong>", "60% è meno di 66,7%. Nella SA serve anche la maggioranza del nominale. La soglia del 60% è un obiettivo della demo, non una regola.", "Calcolare la maggioranza sulla singola materia e sommare i due requisiti."]
        ], { note: "Le maggioranze dell'art. 704 riguardano la SA. Nella Sagl si applicano le maggioranze di legge e di statuto: il principio è lo stesso, un patto non sostituisce la delibera." })}
        <div class="mt-3">
          ${U.callout("legal", "Statuto e patto, due piani", `<p>Lo statuto è la regola della società. Un patto parasociale vincola i soci che lo firmano, ma non sostituisce la delibera dell'assemblea né crea un veto statutario. Le due cose vanno coordinate, non confuse.</p>`)}
        </div>
      </section>

      <section class="section" id="controllo-confronto">
        ${U.sectionHead("06", "Il confronto", "SNC, Sagl, SA", "La stessa parola non ha lo stesso significato nelle tre forme.")}
        ${U.table(["Aspetto", "SNC", "Sagl", "SA"], [
          ["<strong>Voto</strong>", "Non ci sono quote: il contratto sociale regola la partecipazione e le decisioni.", "Proporzionale al nominale (art. 806 cpv. 1); una quota = un voto con nominale max 10:1 (cpv. 2); tetto possibile.", "Proporzionale al nominale (art. 692); azioni a voto privilegiato nei limiti dell'art. 693; tetto possibile."],
          ["<strong>Veto</strong>", "Non c'è un veto tipizzato: contano le regole di voto del contratto (di regola unanimità).", "Veto personale e non trasferibile, solo se previsto dallo statuto (art. 807).", "Non esiste un veto statutario generale; servono statuto, maggioranze qualificate e patto parasociale."],
          ["<strong>Maggioranze</strong>", "Di regola unanimità; il contratto può prevedere altro nei limiti di legge.", "Maggioranza assoluta dei voti rappresentati, salvo legge o statuto (art. 808).", "Maggioranza dei voti (art. 703); due terzi dei voti e maggioranza del nominale per le materie dell'art. 704."],
          ["<strong>Organi</strong>", "Soci; eventuali gerenti.", "Assemblea; gerenti; revisione (artt. 804–818).", "Assemblea generale; consiglio d'amministrazione; revisione."],
          ["<strong>Trasferimenti</strong>", "Consenso degli altri soci, salvo diversa regola contrattuale.", "Forma scritta e approvazione dell'assemblea, salvo deroga statutaria (artt. 785–786).", "Restrizioni statutarie e approvazione; valore reale (artt. 685a–685c)."],
          ["<strong>Informazioni</strong>", "Secondo contratto e obblighi di rendiconto.", "Ogni socio può chiedere ragguagli ai gerenti (art. 802).", "In assemblea; richiesta scritta per il 10% del capitale o dei voti (art. 697)."]
        ], { note: "Sintesi. Non sostituisce i testi di legge né lo statuto. Le maggioranze e i diritti vanno verificati sulla singola delibera." })}
      </section>

      <section class="section" id="controllo-protezione">
        ${U.sectionHead("07", "Le persone", "Protezione individuale", "Due schede, due titolari, nessun cross-default.")}
        <div class="stack">
          <p class="body-lg">I diritti personali non si sommano e non si compensano. Se un fondatore esce, l'altro non perde automaticamente i propri. Questa è una scelta da scrivere, non un effetto naturale.</p>
        </div>
        <div class="grid-2 mt-3">
          ${card("Scheda individuale · titolare", "Nicola Cappelli", list([
            "Informazione e consultazione sulle materie riservate.",
            "Veto nella Sagl per le materie elencate nello statuto (art. 807).",
            "Eventuale seggio o observer, se previsto.",
            "Diritti economici e regole di uscita sulla propria quota.",
            "Nessuna decadenza automatica se l'altro fondatore esce."
          ]))}
          ${card("Scheda individuale · titolare", "Bryan Ciaponi", list([
            "Informazione e consultazione sulle materie riservate.",
            "Veto nella Sagl per le materie elencate nello statuto (art. 807).",
            "Eventuale seggio o observer, se previsto.",
            "Diritti economici e regole di uscita sulla propria quota.",
            "Nessuna decadenza automatica se l'altro fondatore esce."
          ]))}
        </div>
        <p class="mini-note mt-2">Le schede sono identiche nella struttura e separate nell'esercizio. Non assegnano ruoli operativi; descrivono diritti da scrivere nello statuto e, per la SA, nel patto parasociale.</p>
        <div class="grid-2 mt-3">
          <div>
            ${U.callout("warning", "No cross-default", `<p>La violazione o l'uscita di un fondatore non è automaticamente una violazione dell'altro. Le due schede non si condizionano. Se Nicola esce, Bryan mantiene i propri diritti: è il risultato che la scheda separata deve garantire. Se Bryan esce, vale il contrario.</p>`)}
          </div>
          <div>
            ${U.callout("legal", "Il veto non segue la quota", `<p>Nella Sagl il veto è personale e non trasferibile (art. 807 cpv. 3). Non passa automaticamente all'acquirente della quota e non si cede a un terzo. Nella SA non esiste un veto statutario generale: servono statuto e patto parasociale, con i limiti delle maggioranze di legge.</p>`)}
          </div>
        </div>
      </section>

      <section class="section" id="controllo-consiglio">
        ${U.sectionHead("08", "Il consiglio", "Il consiglio non è un premio", "Un seggio dà voce e responsabilità. Non dà il controllo automatico.")}
        <div class="grid-2">
          ${card("Cosa dà", "Voce e responsabilità", list([
            "Partecipazione alle sedute e accesso alle informazioni.",
            "Voto collegiale sulle decisioni del consiglio.",
            "Rappresentanza della propria categoria in consiglio, se prevista (art. 709 CO).",
            "Doveri di diligenza e fedeltà; responsabilità."
          ]), "card-accent")}
          ${card("Cosa non dà", "Nessun controllo automatico", list([
            "Nessun controllo automatico della società.",
            "Nessun veto sulle delibere dell'assemblea.",
            "Nessun potere personale di gestione: il consiglio delibera come organo.",
            "Nessuna immunità: i compiti inderogabili restano (art. 716a)."
          ]))}
        </div>
        <div class="mt-3">
          ${U.callout("legal", "Un organo, non un titolo", `<p>L'art. 709 CO prevede che, se esistono categorie di azioni, ogni categoria elegga almeno un rappresentante in consiglio. L'art. 716a CO elenca i compiti inderogabili del consiglio: alta direzione, organizzazione, contabilità, alta vigilanza, relazione sulla gestione e avviso in caso di eccedenza di debiti. Un seggio non trasferisce questi compiti a un singolo.</p>`)}
        </div>
        <p class="mini-note mt-2">Nella Sagl l'organo è il gerente o i gerenti; il consiglio d'amministrazione è un organo della SA. Il tema del seggio in consiglio riguarda soprattutto la fase SA.</p>
      </section>

      <section class="section" id="controllo-checklist">
        ${U.sectionHead("09", "La verifica", "Cinque domande prima di firmare", "Se una risposta manca, la struttura non è ancora pronta.")}
        <div class="card card-flat">
          <h3 class="mb-2">Le risposte da mettere per iscritto</h3>
          <div class="numbered-list">
            <div class="numbered-item"><div><h4>La materia è nell'elenco giusto?</h4><p>Una clausola su una materia non elencata non produce l'effetto sperato.</p></div></div>
            <div class="numbered-item"><div><h4>La maggioranza è quella di legge o solo quella del patto?</h4><p>Le maggioranze legali restano ferme. Il patto non sostituisce la delibera.</p></div></div>
            <div class="numbered-item"><div><h4>Il veto è statutario o contrattuale?</h4><p>Nella Sagl il veto è personale e non trasferibile. Nella SA è principalmente contrattuale.</p></div></div>
            <div class="numbered-item"><div><h4>Il seggio è in consiglio o è solo observer?</h4><p>Un observer non vota. Un membro del consiglio ha doveri e responsabilità.</p></div></div>
            <div class="numbered-item"><div><h4>Il patto è coordinato con lo statuto?</h4><p>Statuto, patto e delibere devono dire la stessa cosa. Le contraddizioni si pagano in stallo o contenzioso.</p></div></div>
          </div>
        </div>
      </section>

      <div class="doc-nav">
        ${U.btn("Simulatore", "#/simulatore", "btn-ink", "chart")}
        ${U.btn("Investimenti e round", "#/investimenti", "btn-ghost", "layers")}
        ${U.btn("Statuto Sagl", "#/documenti/sagl", "btn-ghost", "file")}
        ${U.btn("Statuto SA", "#/documenti/sa", "btn-ghost", "file")}
      </div>
      <div class="callout callout-warning mt-4">
        <div class="callout-title">${U.icon("alert")}Nessuna promessa del 60%</div>
        <p>Questa pagina distingue ciò che la legge permette, ciò che le parti scelgono e ciò che va verificato. Il 60% non è una soglia legale: è un obiettivo illustrativo. Una struttura di controllo si giudica sulla singola materia: chi decide, in quale organo, con quale maggioranza, con quale veto e con quale informazione.</p>
      </div>
    </div>`.trim();
  };

  W.views.mount.control = function () {
    if (window.WDI.control) window.WDI.control.init();
  };
})();
