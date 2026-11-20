/* ============================================================
   Dati editoriali della demo.
   Nessun dato qui è un accordo vincolante: sono ipotesi di lavoro.
   ============================================================ */
(function () {
  "use strict";

  const STATUS = {
    legge:     { label: "Legge",           cls: "status-law",      desc: "Regola prevista dal diritto svizzero." },
    definito:  { label: "Definito",        cls: "status-current",  desc: "Scelta già indicata come acquisita nel progetto." },
    proposta:  { label: "Proposta",        cls: "status-draft",    desc: "Testo proposto nella demo, da discutere e sottoscrivere." },
    aperta:    { label: "Da decidere",     cls: "status-open",     desc: "Punto ancora aperto tra i fondatori." },
    verifica:  { label: "Verifica legale", cls: "status-verify",   desc: "Richiede esame di un professionista prima della firma." },
    esempio:   { label: "Esempio",         cls: "status-example",  desc: "Dato puramente illustrativo, non concordato." },
    formale:   { label: "Atto / Registro", cls: "status-formal",   desc: "Richiede atto pubblico, iscrizione o formalità esterna." },
    futuro:    { label: "Futuro",          cls: "status-future",   desc: "Meccanismo previsto per una fase successiva." }
  };

  const META = {
    project: "WebDev Innovations — Laboratorio societario",
    version: "Demo 1.0",
    date: "Novembre 2026",
    legalState: "Testi svizzeri consolidati al 1° ottobre 2026",
    founders: ["Nicola Cappelli", "Bryan Ciaponi"],
    currentEntity: "WebDev Innovations SNC",
    seat: "Ticino, Svizzera",
    purpose: "Sviluppo software, applicazioni web, sistemi di prenotazione, servizi digitali e soluzioni tecnologiche.",
    disclaimer: "Questa è una demo di documentazione societaria. Non è consulenza legale, fiscale o finanziaria e non è destinata alla firma. Ogni documento deve essere verificato da un professionista svizzero specializzato in diritto societario."
  };

  const PHASES = [
    {
      id: "snc",
      index: "01",
      label: "Fase attuale",
      entity: "SNC",
      full: "Società in nome collettivo",
      status: "status-current",
      tone: "is-current",
      legal: "CO 552–593",
      capital: "Nessun capitale minimo legale",
      liability: "Illimitata e solidale dei soci",
      governance: "Soci; contratto sociale; eventuali gerenti",
      decision: "Unanimità, salvo diversa regola contrattuale",
      headline: "Due persone, una ditta, responsabilità personale.",
      body: "La SNC è la forma di partenza. Non ha azioni né quote di capitale: la partecipazione del 50% è un accordo contrattuale. La responsabilità verso i creditori resta personale e illimitata e nessun patto interno può escluderla.",
      gate: "Prima di firmare: ruoli, firme, conferimenti e regole di uscita.",
      link: "#/snc"
    },
    {
      id: "sagl",
      index: "02",
      label: "Fase di crescita",
      entity: "Sagl",
      full: "Società a garanzia limitata",
      status: "status-future",
      tone: "is-next",
      legal: "CO 772–827",
      capital: "Minimo CHF 20'000, interamente liberato",
      liability: "Limitata al patrimonio sociale",
      governance: "Assemblea dei soci; gerenti",
      decision: "Maggioranza assoluta, salvo statuto; veto art. 807",
      headline: "Capitale, quote e regole scritte per crescere.",
      body: "La Sagl introduce quote sociali, capitale e responsabilità limitata. È il contenitore naturale per i primi investitori. Il voto può essere proporzionale al nominale, una quota = un voto (con rapporto nominale massimo 10:1) oppure limitato da un tetto statutario.",
      gate: "Trasformazione LFus: progetto, rapporto, unanimità, atto pubblico.",
      link: "#/sagl"
    },
    {
      id: "sa",
      index: "03",
      label: "Fase di scala",
      entity: "SA",
      full: "Società anonima",
      status: "status-future",
      tone: "is-later",
      legal: "CO 620–762",
      capital: "Minimo CHF 100'000; almeno 20% per azione e CHF 50'000 liberati",
      liability: "Limitata al patrimonio sociale",
      governance: "Assemblea generale; consiglio d'amministrazione",
      decision: "Maggioranza dei voti; 2/3 + nominale per materie art. 704",
      headline: "Azioni, categorie e governance per investitori istituzionali.",
      body: "La SA è la forma più adatta a round successivi e investitori istituzionali. Le azioni possono avere categorie e privilegi, ma i limiti dell'art. 693 e le maggioranze inderogabili dell'art. 704 non si possono aggirare con un accordo tra soci.",
      gate: "Trasformazione LFus e statuto che preservi i diritti: non è automatico.",
      link: "#/controllo"
    }
  ];

  const STATS = [
    { value: "2", label: "Fondatori", note: "Nicola e Bryan" },
    { value: "50 / 50", label: "Partecipazione SNC", note: "Da scrivere espressamente" },
    { value: "CHF 20'000", label: "Capitale minimo Sagl", note: "Interamente liberato" },
    { value: "7", label: "Documenti", note: "Sei bozze + simulatore" }
  ];

  const DECISIONS = [
    { id: "d01", area: "Persone", title: "Ruoli e responsabilità", detail: "Chi fa cosa, con quale autonomia e con quali deleghe. Nessun titolo manageriale è assegnato nella demo.", owner: "Nicola + Bryan", when: "Prima del regolamento interno", status: "aperta" },
    { id: "d02", area: "Persone", title: "Compensi collegati ai ruoli", detail: "Distinguere il compenso per il lavoro dalla partecipazione agli utili. Definire importi, periodicità e contributi sociali.", owner: "Nicola + Bryan", when: "Prima del primo prelievo", status: "aperta" },
    { id: "d03", area: "Capitale", title: "Conferimenti iniziali", detail: "Denaro, beni, strumenti, lavoro o crediti. Nessun importo è inventato nella demo.", owner: "Nicola + Bryan", when: "Allegato A al contratto SNC", status: "aperta" },
    { id: "d04", area: "Capitale", title: "Prestiti dei soci alla società", detail: "Importo, interesse, durata, rimborso, eventuale postergazione. Un prestito non cambia automaticamente la partecipazione.", owner: "Nicola + Bryan", when: "Prima di ogni versamento", status: "aperta" },
    { id: "d05", area: "Capitale", title: "Ripartizione utili e perdite 50/50", detail: "La partecipazione economica desiderata è 50% ciascuno. Va scritta nel contratto e distinta dai compensi.", owner: "Nicola + Bryan", when: "Contratto sociale", status: "definito" },
    { id: "d06", area: "Governance", title: "Procedura per le decisioni ordinarie", detail: "Chi decide, come si documenta il consenso, cosa succede in caso di disaccordo.", owner: "Nicola + Bryan", when: "Contratto + regolamento", status: "aperta" },
    { id: "d07", area: "Governance", title: "Decisioni straordinarie all'unanimità", detail: "Debiti rilevanti, investimenti, nuovi soci, modifiche, trasformazione, scioglimento.", owner: "Nicola + Bryan", when: "Contratto sociale", status: "proposta" },
    { id: "d08", area: "Governance", title: "Firma individuale o collettiva", detail: "Quali atti richiedono una firma, quali due, come iscriverle al Registro di commercio.", owner: "Nicola + Bryan", when: "Prima dell'iscrizione", status: "aperta" },
    { id: "d09", area: "Governance", title: "Soglie per acquisti e impegni", detail: "Limiti interni per acquisti, contratti, investimenti e operazioni bancarie. Da allineare ai mandati bancari.", owner: "Nicola + Bryan", when: "Regolamento interno", status: "aperta" },
    { id: "d10", area: "Governance", title: "Gestione dei conti bancari", detail: "Intestazione, firme autorizzate, doppia firma, accesso online, carta di credito aziendale.", owner: "Nicola + Bryan", when: "Apertura conto", status: "aperta" },
    { id: "d11", area: "Economia", title: "Prelievi personali e riserva di liquidità", detail: "Regola per i prelievi, cuscinetto minimo di cassa, distribuzione solo dopo approvazione del conto annuale.", owner: "Nicola + Bryan", when: "Regolamento interno", status: "aperta" },
    { id: "d12", area: "Proprietà intellettuale", title: "Codice e materiali preesistenti", detail: "Elencare ciò che Nicola e Bryan hanno creato prima della società e decidere se conferirlo, licenziarlo o tenerlo fuori.", owner: "Nicola + Bryan", when: "Allegato IP", status: "aperta" },
    { id: "d13", area: "Proprietà intellettuale", title: "Licenze open source e componenti di terzi", detail: "Politica di approvazione, inventario, compatibilità delle licenze, obblighi di attribuzione.", owner: "Nicola + Bryan", when: "Regolamento interno", status: "proposta" },
    { id: "d14", area: "Proprietà intellettuale", title: "Titolarità di domini, account e cloud", detail: "Domini, GitHub, cloud, app store, payment provider e password manager devono essere della società, non personali.", owner: "Nicola + Bryan", when: "Prima del primo cliente", status: "proposta" },
    { id: "d15", area: "Uscite", title: "Valutazione della partecipazione in caso di uscita", detail: "Metodo, sconti, pagamento rateale, garanzie. Senza una regola, decide il giudice (art. 580 CO).", owner: "Nicola + Bryan", when: "Accordo fondatori", status: "aperta" },
    { id: "d16", area: "Uscite", title: "Good Leaver / Bad Leaver", detail: "Differenziare uscita fisiologica e violazioni gravi senza trasformare la clausola in una confisca.", owner: "Nicola + Bryan", when: "Accordo fondatori", status: "proposta" },
    { id: "d17", area: "Uscite", title: "Non concorrenza dopo l'uscita", detail: "Durata, territorio, attività vietate, eventuale indennità. Deve essere proporzionata per essere valida.", owner: "Nicola + Bryan", when: "Accordo fondatori", status: "aperta" },
    { id: "d18", area: "Uscite", title: "Morte, incapacità e successione", detail: "Continuità dell'impresa, acquisto della partecipazione dagli eredi, assicurazione, esclusione degli eredi dalla gestione.", owner: "Nicola + Bryan", when: "Accordo fondatori", status: "aperta" },
    { id: "d19", area: "Uscite", title: "Deadlock tra due soci", detail: "Escalation, mediazione, perizia, buy-sell o scioglimento. La SNC a due soci è particolarmente esposta.", owner: "Nicola + Bryan", when: "Contratto + accordo", status: "proposta" },
    { id: "d20", area: "Sagl", title: "Timing della trasformazione", detail: "La trasformazione non è automatica. Serve una decisione dei soci e una procedura LFus completa.", owner: "Nicola + Bryan", when: "Quando il progetto è pronto", status: "futuro" },
    { id: "d21", area: "Sagl", title: "Capitale e valore nominale delle quote", detail: "Il capitale minimo è CHF 20'000, ma l'importo effettivo e il nominale sono scelte di progetto.", owner: "Nicola + Bryan", when: "Progetto di trasformazione", status: "aperta" },
    { id: "d22", area: "Sagl", title: "Categorie A/B e diritti di voto", detail: "Le etichette A/B non sono categorie legali automatiche. Il voto deve rispettare gli artt. 806 e 807 CO.", owner: "Nicola + Bryan", when: "Statuto Sagl", status: "verifica" },
    { id: "d23", area: "Sagl", title: "Diritti di veto dei fondatori", detail: "Il veto della Sagl è personale e non trasferibile (art. 807). Va costruito separatamente per Nicola e Bryan.", owner: "Nicola + Bryan", when: "Statuto Sagl", status: "proposta" },
    { id: "d24", area: "Investitori", title: "Strumento del primo round", detail: "Aumento di capitale, vendita secondaria, prestito o convertibile: quattro cose diverse, con effetti diversi.", owner: "Nicola + Bryan", when: "Term sheet", status: "aperta" },
    { id: "d25", area: "Investitori", title: "Valutazione e importo del primo round", detail: "CHF 1'000'000 per il 10% è solo un esempio della demo, non un'offerta né un accordo.", owner: "Nicola + Bryan", when: "Negoziazione", status: "esempio" },
    { id: "d26", area: "Investitori", title: "Investor Advisory Board", detail: "Organo consultivo, senza poteri di gestione o rappresentanza. Un charter scritto ne definisce il ruolo.", owner: "Nicola + Bryan", when: "Primo investitore", status: "proposta" },
    { id: "d27", area: "Investitori", title: "Obblighi di prospetto e sollecitazione", detail: "La raccolta presso investitori può attivare regole della LSerFi. Da verificare prima di contattare il mercato.", owner: "Consulente", when: "Prima del fundraising", status: "verifica" },
    { id: "d28", area: "Formalità", title: "Verifica legale e fiscale complessiva", detail: "Responsabilità SNC, trasformazione, statuti, diritti degli investitori e conseguenze fiscali.", owner: "Professionista esterno", when: "Prima di ogni firma", status: "verifica" }
  ];

  const CLAUSES = [
    {
      id: "c01", name: "Founder Protection Clause", stage: "tutte", status: "proposta",
      docs: "Accordo fondatori; statuto Sagl; statuto SA",
      purpose: "Proteggere i diritti contrattuali e societari dei due fondatori, separatamente, anche quando la loro quota economica scende.",
      how: "Combina diritti individuali (informazione, veto, board seat, anti-dilution), regole di leaver e divieto di cross-default. Ogni fondatore ha i propri diritti: l'uscita di uno non fa cadere quelli dell'altro.",
      benefits: ["Continuità anche dopo round diluitivi", "Regole chiare in caso di uscita", "Riduce il rischio di blocco reciproco"],
      risks: ["Può essere percepita come squilibrio dagli investitori", "Troppi veti possono paralizzare la società", "In SA non esiste un veto statutario generale"],
      limits: "Non può derogare a norme imperative, alle maggioranze dell'art. 704 CO né ai doveri degli organi. Nella Sagl il veto è personale e non trasferibile (art. 807 CO). Nella SA va costruito contrattualmente e con lo statuto, senza superare i limiti di legge.",
      note: "Inserire una clausola di sopravvivenza e una regola espressa sul destino dei diritti del fondatore uscente."
    },
    {
      id: "c02", name: "Founder Consent Rights", stage: "tutte", status: "verifica",
      docs: "Accordo fondatori; statuto; patto parasociale",
      purpose: "Attribuire a ciascun fondatore il diritto di essere consultato o di consentire su materie che incidono sulla sua posizione.",
      how: "Elenco tassativo di materie (emissioni, vendita del controllo, indebitamento oltre soglia, modifica dei diritti di categoria, cambi di business). Procedura scritta, termini e conseguenze.",
      benefits: ["Protezione della minoranza", "Allinea le decisioni importanti", "Rende espliciti i confini del mandato"],
      risks: ["Rischio di stallo", "Un veto contrattuale non vincola la società come un veto statutario", "Possibile conflitto con il dovere degli amministratori"],
      limits: "Nella Sagl può essere strutturato come veto statutario ex art. 807 CO, non trasferibile. Nella SA è principalmente contrattuale (patto parasociale), salvo diverse maggioranze statutarie. Le decisioni riservate all'assemblea e le maggioranze legali restano ferme.",
      note: "Meglio un numero limitato di materie davvero strategiche che un elenco enciclopedico."
    },
    {
      id: "c03", name: "Reserved Matters", stage: "tutte", status: "proposta",
      docs: "Regolamento interno; statuto; investor agreement",
      purpose: "Definire quali decisioni non possono essere prese dalla gestione ordinaria senza un livello superiore di approvazione.",
      how: "Matrice materia / organo / soglia / maggioranza / informativa. Esempi: bilancio, budget, debito sopra soglia, acquisizioni, cessioni, nuovi soci, IP strategica, trasformazione.",
      benefits: ["Chiarezza operativa", "Controllo dei rischi", "Base per le deleghe"],
      risks: ["Se troppo dettagliata, rallenta l'operatività", "Sovrapposizione con le competenze legali degli organi", "Soglie non aggiornate"],
      limits: "Nella SNC è materia contrattuale. Nella Sagl e nella SA le competenze inderogabili degli organi e le maggioranze legali non possono essere svuotate. Le riserve devono essere compatibili con i doveri di diligenza e fedeltà.",
      note: "Rivedere le soglie ogni anno e dopo ogni round."
    },
    {
      id: "c04", name: "Right of First Refusal (ROFR)", stage: "tutte", status: "proposta",
      docs: "Contratto SNC; statuto Sagl; statuto SA; investor agreement",
      purpose: "Dare agli altri soci o alla società la priorità nell'acquisto di una partecipazione che un socio intende vendere a un terzo.",
      how: "Notifica con prezzo e condizioni, periodo di esercizio, acquisto pro quota, chiusura. Se non esercitato, il terzo acquirente deve essere approvato secondo le regole societarie.",
      benefits: ["Evita ingressi indesiderati", "Mantiene la compagine stabile", "Prezzo e condizioni trasparenti"],
      risks: ["Ritarda la liquidità del venditore", "Contenzioso sulla valutazione", "Può scoraggiare acquirenti terzi"],
      limits: "SNC: il trasferimento della partecipazione richiede il consenso degli altri soci (art. 542 CO richiamato dall'art. 557). Sagl: cessione scritta e approvazione dell'assemblea, salvo deroga statutaria (artt. 785–786). SA: limitazioni statutarie e approvazione (artt. 685a–685c). Successioni e divisioni ereditarie hanno regole proprie (art. 788 CO; art. 685b cpv. 4 CO).",
      note: "Prevedere eccezioni per trasferimenti a veicoli di pianificazione familiare, con controllo e gradimento."
    },
    {
      id: "c05", name: "Tag Along", stage: "sagl", status: "proposta",
      docs: "Accordo fondatori; investor agreement; patto parasociale",
      purpose: "Permettere ai soci di minoranza di vendere insieme al fondatore o all'investitore che cede il controllo, alle stesse condizioni.",
      how: "Se un socio vende una quota rilevante, gli altri possono aderire alla vendita pro quota, allo stesso prezzo e con le stesse garanzie.",
      benefits: ["Protezione della minoranza", "Evita vendite separate a condizioni peggiori", "Allinea gli incentivi all'uscita"],
      risks: ["Può ridurre la libertà del venditore", "Le garanzie e le responsabilità devono essere ripartite", "Possibili conflitti con il drag-along"],
      limits: "Non esiste un tag-along legale generale nella SNC, nella Sagl o nella SA. È un diritto contrattuale. Non può obbligare l'acquirente ad acquistare se non accetta la cessione; va coordinato con le restrizioni statutarie.",
      note: "Definire cosa accade se l'acquirente vuole comprare solo una parte o impone garanzie diverse."
    },
    {
      id: "c06", name: "Drag Along", stage: "sagl", status: "verifica",
      docs: "Accordo fondatori; statuto; investor agreement",
      purpose: "Consentire la vendita del 100% della società quando una maggioranza qualificata la approva, trascinando anche i soci contrari.",
      how: "Soglie di attivazione, prezzo minimo, condizioni di vendita, obbligo di voto e di cessione, procure, ripartizione del ricavato e delle garanzie.",
      benefits: ["Rende possibile un'exit", "Evita il blocco di un socio", "Interessa gli investitori"],
      risks: ["Forte impatto sui soci di minoranza", "Possibile abuso se non vi sono tutele", "Applicazione complessa in presenza di diritti speciali"],
      limits: "Non è un diritto legale generale. È contrattuale. Non può violare norme imperative, diritti di categoria, vincoli successori o restrizioni statutarie. Le procure e i poteri devono essere redatti con cura. Nella SNC la cessione richiede il consenso dei soci, salvo regole pattizie compatibili.",
      note: "Subordinare il drag a un prezzo minimo, a un acquirente indipendente e a una ripartizione non discriminatoria."
    },
    {
      id: "c07", name: "Anti-Dilution", stage: "sagl", status: "verifica",
      docs: "Investor agreement; statuto; delibere di aumento",
      purpose: "Proteggere l'investitore da emissioni future a un prezzo inferiore, mediante un aggiustamento della sua posizione.",
      how: "Formula full ratchet o broad-based weighted average, con esclusioni (piano stock option, conversioni, operazioni straordinarie) e meccanismi di emissione compensativa.",
      benefits: ["Riduce il rischio di down round", "Strumento negoziale noto", "Allinea le aspettative"],
      risks: ["Può penalizzare i fondatori", "Complessità di calcolo", "Può rendere difficili i round successivi"],
      limits: "È un diritto contrattuale. L'attuazione richiede una delibera di aumento di capitale, il rispetto dei diritti d'opzione e delle maggioranze. Nella SA l'esclusione o limitazione del diritto d'opzione richiede gravi motivi e la maggioranza qualificata (artt. 652b e 704 CO). Nella Sagl si applicano per analogia le regole sull'aumento (art. 781 CO).",
      note: "Preferire formule weighted average e un cap; verificare l'impatto sulla cap table prima della firma."
    },
    {
      id: "c08", name: "Good Leaver / Bad Leaver", stage: "tutte", status: "proposta",
      docs: "Accordo fondatori; statuto; regolamento",
      purpose: "Distinguere l'uscita fisiologica o concordata dall'uscita per violazioni gravi e graduare le conseguenze economiche.",
      how: "Definizioni tassative, periodo di vesting, prezzo di uscita, bad leaver discount, perdita dei ruoli e dei diritti speciali, pagamento rateale, garanzie.",
      benefits: ["Maggiore prevedibilità", "Protegge la società da comportamenti opportunisti", "Evita negoziati ex post"],
      risks: ["Definizioni troppo ampie", "Sanzioni sproporzionate", "Contenzioso sulla qualificazione"],
      limits: "Non può trasformarsi in una confisca della partecipazione. Nella SNC il socio uscente ha diritto a quanto gli spetta (art. 580 CO); nella Sagl il valore reale è il riferimento (art. 825 CO). Le clausole vanno dosate e verificate.",
      note: "Separare sempre perdita del ruolo, perdita dei diritti speciali e prezzo della partecipazione."
    },
    {
      id: "c09", name: "Deadlock Resolution", stage: "tutte", status: "proposta",
      docs: "Contratto SNC; accordo fondatori; statuto; patto parasociale",
      purpose: "Dare una via d'uscita quando i soci non riescono a decidere e la società rischia la paralisi.",
      how: "Escalation strutturata: confronto documentato, mediazione, perizia tecnica, buy-sell (shotgun), acquisto a valore determinato, scioglimento controllato.",
      benefits: ["Evita la paralisi", "Riduce il ricorso immediato al giudice", "Processo prevedibile"],
      risks: ["Meccanismi troppo aggressivi", "Valutazioni contestabili", "Costi e tempi"],
      limits: "La SNC a due soci può essere sciolta per gravi motivi (art. 545 CO) ed escludere un socio (art. 577 CO). La Sagl e la SA hanno rimedi propri (artt. 821–825 CO; artt. 706 e seguenti CO). Le clausole contrattuali non eliminano il controllo del giudice.",
      note: "Il buy-sell va testato su scenari numerici prima di essere sottoscritto."
    },
    {
      id: "c10", name: "Intellectual Property Protection", stage: "tutte", status: "proposta",
      docs: "Contratto SNC; accordo fondatori; regolamento; investor agreement",
      purpose: "Assicurare che codice, applicazioni, dati, marchi, domini e account appartengano alla società e restino operativi.",
      how: "Inventario, cessione dei diritti, licenze per il preesistente, politica open source, gestione credenziali, continuità in caso di uscita, aggiornamento dei titolari.",
      benefits: ["Protegge il valore dell'azienda", "Riduce il rischio in due diligence", "Continuità operativa"],
      risks: ["Cessioni incomplete", "Componenti open source incompatibili", "Account personali"],
      limits: "Il diritto d'autore è trasferibile (art. 16 LDA); per i programmi creati da lavoratori dipendenti vale l'art. 17 LDA. I fondatori non sono automaticamente dipendenti: serve una cessione espressa. I diritti morali e le licenze di terzi richiedono attenzione.",
      note: "Allegare un registro IP e un registro degli account con ruoli e recovery."
    },
    {
      id: "c11", name: "Change of Control", stage: "sagl", status: "verifica",
      docs: "Investor agreement; accordo fondatori; statuto",
      purpose: "Regolare cosa succede quando cambia il controllo della società: vendita, fusione, ingresso di un socio di controllo.",
      how: "Definizione di controllo, diritti di informazione e consultazione, accelerazioni, tag/drag, rinnovo del board, uscita dei fondatori.",
      benefits: ["Protezione degli investitori", "Allineamento in caso di exit", "Riduce sorprese"],
      risks: ["Definizioni troppo ampie", "Effetti fiscali e giuslavoristici", "Conflitto tra categorie"],
      limits: "È materia contrattuale. Le operazioni straordinarie seguono le maggioranze e le formalità di legge (p. es. art. 704 CO per la SA; LFus per fusioni e trasformazioni). I diritti di categoria non possono essere cancellati senza il necessario consenso.",
      note: "Coordinare con il drag-along e con le regole di leaver."
    },
    {
      id: "c12", name: "Founder Succession", stage: "tutte", status: "aperta",
      docs: "Contratto SNC; accordo fondatori; statuto; testamento",
      purpose: "Garantire la continuità dell'impresa in caso di morte o incapacità di un fondatore, senza che gli eredi diventino automaticamente gestori.",
      how: "Continuazione con il socio superstite, acquisto della partecipazione, valutazione, pagamento rateale, assicurazione sulla vita, regole di rappresentanza degli eredi.",
      benefits: ["Continuità per clienti e dipendenti", "Protezione della famiglia", "Evita l'automatica paralisi"],
      risks: ["Aspettative degli eredi", "Valutazioni e liquidità", "Conflitti tra famiglia e società"],
      limits: "SNC: la morte scioglie la società, salvo patto di continuazione (art. 545 cpv. 1 n. 2 CO); la continuazione tra i soci superstiti è possibile (art. 576 CO). Sagl: l'acquirente per successione subentra nei diritti e obblighi, ma il voto richiede il riconoscimento; la società può offrire l'acquisto al valore reale (art. 788 CO). SA: regole analoghe per le azioni nominative (art. 685b cpv. 4 CO).",
      note: "Coordinare contratto, statuto e pianificazione successoria personale."
    },
    {
      id: "c13", name: "Confidentiality", stage: "tutte", status: "proposta",
      docs: "Tutti i documenti",
      purpose: "Proteggere informazioni tecniche, commerciali, finanziarie e dati dei clienti.",
      how: "Definizione ampia, eccezioni, durata, restituzione, obblighi di segnalazione, misure tecniche, regole per i consulenti.",
      benefits: ["Tutela del vantaggio competitivo", "Base per la due diligence", "Chiarezza con collaboratori"],
      risks: ["Definizione troppo ampia", "Durata eccessiva", "Difficoltà di prova"],
      limits: "La riservatezza è un obbligo contrattuale e, per i soci della Sagl, anche un dovere legale (art. 803 CO). Non può impedire segnalazioni protette o adempimenti di legge. Le informazioni già pubbliche e quelle sviluppate autonomamente restano fuori.",
      note: "Prevedere un termine anche dopo l'uscita e regole specifiche per i dati personali."
    },
    {
      id: "c14", name: "Non-Compete", stage: "tutte", status: "verifica",
      docs: "Contratto SNC; accordo fondatori; contratti di lavoro",
      purpose: "Evitare che un fondatore sfrutti know-how, clienti o relazioni della società per un'attività concorrente.",
      how: "Divieto durante il rapporto; divieto post-uscita limitato nel tempo, nello spazio e nell'oggetto; eventuale indennità; regole per partecipazioni di minoranza.",
      benefits: ["Protezione del know-how", "Stabilità delle relazioni", "Chiarezza per gli investitori"],
      risks: ["Clausola troppo ampia e quindi invalida", "Costo dell'indennità", "Difficoltà di monitoraggio"],
      limits: "Nella SNC il divieto di concorrenza dei soci è legale durante il rapporto (art. 561 CO). Dopo l'uscita serve una clausola contrattuale proporzionata. Per i rapporti di lavoro si applica l'art. 340 CO e seguenti, con limiti di validità. Non si può impedire in modo assoluto di lavorare.",
      note: "Meglio una clausola mirata su clienti, prodotti e mercati realmente rilevanti."
    },
    {
      id: "c15", name: "Investor Information Rights", stage: "sagl", status: "proposta",
      docs: "Investor agreement; statuto; regolamento",
      purpose: "Dare agli investitori informazioni periodiche e verificabili senza trasformarli in gestori.",
      how: "Report mensile/trimestrale, budget, scostamenti, cap table, indicatori, accesso a documenti, finestre di consultazione, riservatezza.",
      benefits: ["Fiducia degli investitori", "Migliore governance", "Prepara i round successivi"],
      risks: ["Carico amministrativo", "Rischio di fuga di informazioni", "Aspettative di controllo"],
      limits: "Sagl: ogni socio può chiedere ragguagli ai gerenti (art. 802 CO). SA: diritto di informazione in assemblea e, per il 10% del capitale o dei voti nelle società non quotate, richiesta scritta (art. 697 CO). I diritti contrattuali possono aggiungere reportistica, ma non eliminano i limiti di legge.",
      note: "Standardizzare un pacchetto di report e distinguere informazioni riservate e informazioni di routine."
    },
    {
      id: "c16", name: "Voluntary Dilution", stage: "sagl", status: "proposta",
      docs: "Accordo fondatori; investor agreement; statuto",
      purpose: "Permettere ai fondatori di scegliere se partecipare o no a un aumento di capitale, senza obblighi personali di versamento.",
      how: "Diritto di sottoscrizione pro quota, termine, rinuncia scritta, diluizione accettata. Nessuna penale automatica per chi non partecipa, salvo diverso accordo.",
      benefits: ["Nessun obbligo finanziario personale", "Crescita senza pressione", "Regole chiare per i round"],
      risks: ["Perdita di peso economico", "Perdita di maggioranze", "Possibile indebolimento dei diritti speciali"],
      limits: "Sagl e SA: l'aumento segue le regole di legge e statuto; il diritto d'opzione può essere limitato solo nei casi ammessi. La mancata sottoscrizione diluisce, ma non cancella automaticamente i diritti personali già validamente attribuiti.",
      note: "Mettere per iscritto che nessun fondatore è obbligato a investire denaro ulteriore."
    },
    {
      id: "c17", name: "Founder Voting Independence", stage: "tutte", status: "proposta",
      docs: "Accordo fondatori; statuto Sagl; statuto SA",
      purpose: "Evitare che l'uscita, la vendita o la perdita dei requisiti di un fondatore facciano cadere automaticamente i diritti dell'altro.",
      how: "Diritti attribuiti nominativamente e separatamente; nessuna clausola di cross-default; sopravvivenza; regole di successione; divieto di cessione dei diritti personali.",
      benefits: ["Stabilità personale", "Protezione della minoranza", "Maggiore chiarezza in caso di crisi"],
      risks: ["Complessità redazionale", "Possibile squilibrio se un fondatore esce", "Interazione con i diritti di categoria"],
      limits: "Nella Sagl il veto ex art. 807 CO è personale e non trasferibile. Nella SA non esiste un veto statutario generale: servono statuto e patto parasociale. Le maggioranze legali restano intangibili.",
      note: "Redigere due schede separate, una per Nicola e una per Bryan, con diritti identici ma indipendenti."
    },
    {
      id: "c18", name: "Liquidation Preference", stage: "sagl", status: "verifica",
      docs: "Investor agreement; statuto Sagl/SA",
      purpose: "Stabilire l'ordine di pagamento del ricavato in caso di vendita o liquidazione.",
      how: "Preferenza 1x non partecipante, eventuale participating con cap, seniority, definizione di liquidazione presunta, trattamento dei crediti dei soci.",
      benefits: ["Protezione del capitale investito", "Allineamento in caso di exit", "Strumento standard di mercato"],
      risks: ["Riduce il ricavato dei fondatori", "Complessità in caso di vendita parziale", "Possibili tensioni con i creditori"],
      limits: "Nella SA i privilegi di liquidazione possono essere previsti dallo statuto per categorie di azioni (artt. 654 e 656 CO). Nella Sagl si applicano per analogia le regole sulle quote privilegiate (art. 799 CO). Le preferenze multiple e le clausole partecipanti richiedono verifica di proporzionalità e di compatibilità con la protezione del capitale.",
      note: "La preferenza non è un debito: non dà diritto a essere pagati prima dei creditori sociali."
    },
    {
      id: "c19", name: "Pro-Rata / Preemptive Rights", stage: "sagl", status: "proposta",
      docs: "Investor agreement; statuto; delibere di aumento",
      purpose: "Consentire agli investitori di mantenere la propria percentuale nei round successivi.",
      how: "Diritto di sottoscrivere pro quota le nuove quote/azioni, termine di esercizio, over-allotment, esclusioni, coordinamento con i fondatori.",
      benefits: ["Protezione dalla diluizione", "Incentivo a investire nei round successivi", "Trasparenza"],
      risks: ["Rallenta i closing", "Complessità se molti investitori", "Possibile conflitto con nuovi investitori"],
      limits: "Nella SA il diritto d'opzione è legale (art. 652b CO) e può essere limitato o soppresso solo per gravi motivi e con la maggioranza qualificata. Nella Sagl l'art. 781 CO richiama per analogia le regole della SA sull'aumento. Le clausole contrattuali devono coordinarsi con le delibere.",
      note: "Distinguere il diritto legale d'opzione dal diritto contrattuale di mantenere la percentuale."
    },
    {
      id: "c20", name: "Founder Vesting", stage: "sagl", status: "verifica",
      docs: "Accordo fondatori; statuto; patto parasociale",
      purpose: "Legare una parte della partecipazione dei fondatori alla permanenza e al contributo effettivo.",
      how: "Vesting a tranche (p. es. 4 anni con cliff), acquisto da parte della società o di un veicolo, prezzo nominale o di mercato, accelerazioni.",
      benefits: ["Protegge investitori e soci", "Allinea gli incentivi", "Riduce il rischio di founder che esce presto"],
      risks: ["Impatto su motivazione e rapporti", "Complessità fiscale e legale", "Possibile conflitto con la SNC"],
      limits: "Nella SNC non ci sono azioni da vestire: si può lavorare su uscita e prezzo. Nella Sagl e nella SA il vesting va costruito con diritti di acquisto e restrizioni statutarie, rispettando i limiti su recesso, esclusione e valore reale. La tassazione dei fondatori va verificata.",
      note: "Non introdurre vesting retroattivo senza una valutazione fiscale e legale."
    }
  ];

  const SOURCES = [
    {
      group: "Codice delle obbligazioni (CO, RS 220)",
      intro: "Stato consolidato verificato: 1° ottobre 2026. I link puntano al testo ufficiale Fedlex.",
      items: [
        { art: "Artt. 552–593", topic: "Società in nome collettivo", note: "Costituzione, responsabilità, rappresentanza, scioglimento, uscita." },
        { art: "Art. 557", topic: "Rapporti dei soci", note: "Il contratto sociale è la prima fonte dei rapporti interni." },
        { art: "Art. 561", topic: "Divieto di concorrenza del socio SNC", note: "Divieto legale durante il rapporto." },
        { art: "Art. 568", topic: "Responsabilità personale e solidale", note: "Nessun patto interno è opponibile ai terzi." },
        { art: "Artt. 576, 577, 580", topic: "Continuazione, esclusione, indennità di uscita", note: "Base per le clausole di leaver e successione." },
        { art: "Artt. 772–827", topic: "Società a garanzia limitata", note: "Capitale, quote, organi, aumento, recesso, esclusione." },
        { art: "Artt. 773–774", topic: "Capitale e valore nominale", note: "Minimo CHF 20'000 interamente liberato." },
        { art: "Artt. 781–782", topic: "Aumento e riduzione del capitale", note: "Rinvio alle regole della SA; forma e iscrizione." },
        { art: "Artt. 785–788", topic: "Cessione, approvazione, successione", note: "Forma scritta, gradimento, acquisto al valore reale." },
        { art: "Artt. 806–807", topic: "Voto e veto nella Sagl", note: "Proporzionale, una quota = un voto, tetto; veto personale non trasferibile." },
        { art: "Artt. 620–762", topic: "Società anonima", note: "Capitale, azioni, organi, maggioranze." },
        { art: "Art. 622", topic: "Azioni e valore nominale", note: "Azioni nominative o al portatore; nominale superiore a zero." },
        { art: "Artt. 632–633", topic: "Liberazione del capitale", note: "20% per azione e almeno CHF 50'000 alla costituzione." },
        { art: "Artt. 652b, 653", topic: "Diritto d'opzione e capitale condizionale", note: "Limiti e maggioranze per escludere l'opzione." },
        { art: "Artt. 685a–685c", topic: "Restrizioni al trasferimento", note: "Approvazione, rifiuto, valore reale." },
        { art: "Artt. 692–693", topic: "Voto e voto privilegiato", note: "Proporzionale, una azione = un voto, rapporto nominale massimo 10:1." },
        { art: "Art. 697", topic: "Diritto di informazione", note: "Assemblea e soglia del 10% nelle società non quotate." },
        { art: "Art. 704", topic: "Maggioranze qualificate", note: "2/3 dei voti e maggioranza del nominale per le materie elencate." },
        { art: "Art. 709", topic: "Categorie e rappresentanza in consiglio", note: "Almeno un rappresentante per categoria." },
        { art: "Artt. 716a, 727a", topic: "Compiti del consiglio e revisione", note: "Compiti inderogabili; opting-out con limiti." }
      ]
    },
    {
      group: "Legge federale sulla fusione (LFus, RS 221.301)",
      intro: "La trasformazione SNC → Sagl → SA segue la LFus, non un semplice accordo tra soci.",
      items: [
        { art: "Art. 53", topic: "Principio", note: "La forma cambia senza modificare i rapporti giuridici." },
        { art: "Art. 54", topic: "Trasformazioni ammesse", note: "La SNC può trasformarsi in una società di capitali." },
        { art: "Art. 56", topic: "Tutela dei diritti dei soci", note: "Quote e diritti speciali devono essere salvaguardati o indennizzati." },
        { art: "Art. 61", topic: "Rapporto di trasformazione", note: "Spiega e giustifica la trasformazione." },
        { art: "Art. 62", topic: "Verifica", note: "Perito revisore abilitato; possibili deroghe PMI." },
        { art: "Art. 64", topic: "Decisione", note: "SNC: tutti i soci, salvo statuto con 3/4." },
        { art: "Art. 65", topic: "Atto pubblico", note: "La decisione di trasformazione richiede atto pubblico." },
        { art: "Art. 67", topic: "Validità", note: "La trasformazione è efficace con l'iscrizione al Registro di commercio." }
      ]
    },
    {
      group: "Legge sul diritto d'autore (LDA, RS 231.1)",
      intro: "Per il software e i materiali creativi la titolarità non si presume: va trasferita espressamente.",
      items: [
        { art: "Art. 2", topic: "Opere protette", note: "I programmi per computer sono opere." },
        { art: "Art. 16", topic: "Trasferimento", note: "Il diritto d'autore è trasferibile; il trasferimento di un diritto non implica gli altri." },
        { art: "Art. 17", topic: "Programmi creati da lavoratori", note: "Il diritto esclusivo spetta al datore di lavoro, nei limiti del rapporto." }
      ]
    },
    {
      group: "Altre fonti e riferimenti",
      intro: "Fonti istituzionali e strumenti di verifica. Non sostituiscono un parere professionale.",
      items: [
        { art: "Portale PMI", topic: "Confederazione", note: "https://www.kmu.admin.ch/ — guide su forme giuridiche e trasformazione." },
        { art: "Fedlex", topic: "Testi ufficiali", note: "https://www.fedlex.admin.ch/ — CO, LFus, LDA." },
        { art: "Registro di commercio", topic: "Formalità cantonali", note: "Iscrizioni, firme, atto pubblico e documenti richiesti." },
        { art: "LSerFi (RS 950.1)", topic: "Offerta di investimenti", note: "Verificare obblighi di prospetto e regole di sollecitazione prima del fundraising." },
        { art: "nLPD (RS 235.1)", topic: "Protezione dei dati", note: "Ruoli, sicurezza, conservazione e contratti con i fornitori." }
      ]
    }
  ];

  const GLOSSARY = [
    { term: "SNC", def: "Società in nome collettivo: due o più persone fisiche esercitano un'attività in forma commerciale; i soci rispondono personalmente e solidalmente." },
    { term: "Sagl", def: "Società a garanzia limitata: società di capitali con quote sociali, capitale minimo CHF 20'000 interamente liberato e responsabilità limitata al patrimonio sociale." },
    { term: "SA", def: "Società anonima: società di capitali con azioni, capitale minimo CHF 100'000 e organi obbligatori (assemblea generale e consiglio d'amministrazione)." },
    { term: "Quota", def: "Nella Sagl, la partecipazione del socio al capitale sociale. Non è un'azione e non è automaticamente un titolo trasferibile." },
    { term: "Azione", def: "Nella SA, la partecipazione al capitale sociale. Può essere nominativa o, nei limiti di legge, al portatore; può appartenere a categorie diverse." },
    { term: "Voto privilegiato", def: "Meccanismo che attribuisce a determinate quote o azioni un peso di voto maggiore. Nella SA è limitato dall'art. 693; nella Sagl dall'art. 806." },
    { term: "Veto", def: "Diritto di bloccare una decisione. Nella Sagl è previsto dall'art. 807 ed è personale e non trasferibile. Nella SA non esiste un veto statutario generale." },
    { term: "Diluizione", def: "Riduzione della percentuale di un socio a seguito dell'emissione di nuove quote o azioni. Non è una perdita automatica del valore assoluto." },
    { term: "Vendita secondaria", def: "Il compratore paga il prezzo al socio venditore, non alla società. La società non riceve liquidità e non emette nuove partecipazioni." },
    { term: "Prestito convertibile", def: "Finanziamento che nasce come debito e può trasformarsi in partecipazioni al verificarsi di condizioni definite. Richiede una delibera di aumento e le formalità applicabili." },
    { term: "Good / Bad Leaver", def: "Categorie contrattuali per distinguere un'uscita fisiologica da un'uscita per violazioni gravi e graduare le conseguenze." },
    { term: "Deadlock", def: "Stallo decisionale tra soci o organi. Può essere gestito con escalation, mediazione, buy-sell o rimedi giudiziari." }
  ];

  const INSTRUMENTS = [
    {
      id: "primary",
      name: "Aumento di capitale",
      short: "Nuove quote o azioni emesse dalla società.",
      money: "Il denaro entra nella società.",
      equity: "Sì: nascono nuove partecipazioni e tutti i soci precedenti sono diluiti.",
      vote: "I nuovi voti entrano nella cap table secondo lo statuto.",
      use: "Crescita, assunzioni, prodotto, espansione.",
      caution: "Richiede delibera, formalità e rispetto dei diritti d'opzione."
    },
    {
      id: "secondary",
      name: "Vendita secondaria",
      short: "Un socio vende una partecipazione esistente a un investitore.",
      money: "Il denaro va al socio venditore, non alla società.",
      equity: "Sì, cambia la titolarità; la società non emette nuove partecipazioni.",
      vote: "I voti passano al compratore nella misura della partecipazione acquistata.",
      use: "Liquidità per i fondatori, ingresso di un nuovo socio.",
      caution: "Serve l'approvazione ove prevista; attenzione a non confondere il prezzo con un finanziamento."
    },
    {
      id: "loan",
      name: "Prestito alla società",
      short: "Il socio o un terzo presta denaro alla società.",
      money: "Il denaro entra nella società, ma come debito.",
      equity: "No: la partecipazione non cambia.",
      vote: "Nessun voto aggiuntivo per il solo fatto di prestare denaro.",
      use: "Cassa ponte, fabbisogno temporaneo, acquisto di attrezzature.",
      caution: "Interessi, durata, rimborso e possibile postergazione vanno documentati."
    },
    {
      id: "convertible",
      name: "Prestito convertibile",
      short: "Prestito che potrà convertirsi in partecipazioni a condizioni definite.",
      money: "Il denaro entra nella società come debito fino alla conversione.",
      equity: "Solo alla conversione, con una delibera di aumento e le formalità applicabili.",
      vote: "Nessun voto prima della conversione.",
      use: "Round ponte rapido, con rinvio della valutazione.",
      caution: "Cap, sconto, scadenza e condizioni di conversione devono essere chiari."
    }
  ];

  window.WDI = window.WDI || {};
  window.WDI.STATUS = STATUS;
  window.WDI.META = META;
  window.WDI.PHASES = PHASES;
  window.WDI.STATS = STATS;
  window.WDI.DECISIONS = DECISIONS;
  window.WDI.CLAUSES = CLAUSES;
  window.WDI.SOURCES = SOURCES;
  window.WDI.GLOSSARY = GLOSSARY;
  window.WDI.INSTRUMENTS = INSTRUMENTS;
})();
