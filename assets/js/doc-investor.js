/* Documento 06 — Modello di Investor Agreement */
(function () {
  "use strict";
  window.WDI = window.WDI || {};
  window.WDI.DOCS.push({
    id: "investor",
    body: String.raw`
# Investor Agreement
## Modello per il primo investitore

> [!WARNING]
> **Modello dimostrativo — non è un'offerta e non è firmabile.** Questo documento non costituisce un'offerta di investimento, un impegno a investire o una consulenza legale, fiscale o finanziaria. Ogni round richiede verifica legale, fiscale e regolamentare, inclusa la valutazione degli obblighi della legge sui servizi finanziari (LSerFi).

**Società:** WebDev Innovations (forma da definire: Sagl o SA)  
**Fondatori:** Nicola Cappelli e Bryan Ciaponi  
**Versione:** demo 1.0 · novembre 2026  
**Stato:** modello negoziale

---

## Premesse

1. La Società intende raccogliere capitale per sviluppare prodotto, team e presenza commerciale.
2. L'Investitore intende sottoscrivere o acquistare una partecipazione alle condizioni del presente Accordo.
3. Le parti distinguono quattro strumenti diversi: aumento di capitale, vendita secondaria, prestito alla società e prestito convertibile. Il presente modello consente di selezionare lo strumento, ma non li confonde.
4. I Fondatori non sono obbligati a investire nuovo denaro per mantenere la propria partecipazione. La mancata partecipazione a un aumento può comportare una diluizione economica secondo le regole applicabili.
5. Le condizioni economiche e i diritti devono essere compatibili con la forma societaria scelta e con le norme imperative.

---

## Art. 1 — Definizioni

- **Società**: WebDev Innovations Sagl o WebDev Innovations SA, secondo la forma giuridica in vigore al closing.
- **Investitore**: [●].
- **Fondatori**: Nicola Cappelli e Bryan Ciaponi.
- **Investimento**: l'importo versato dall'Investitore secondo l'articolo 3.
- **Closing**: la data in cui l'Investimento è eseguito e le condizioni sospensive sono adempiute.
- **Pre-money**: il valore della Società prima dell'Investimento, al netto di cassa e debito secondo la definizione dell'Allegato 1.
- **Post-money**: il valore della Società dopo l'Investimento, calcolato come pre-money più l'importo dell'aumento di capitale.
- **Quota/azione**: la partecipazione emessa o trasferita all'Investitore.
- **Fully diluted**: tutte le quote/azioni esistenti e quelle riservate a piani di incentivazione, convertibili e opzioni, secondo l'Allegato 2.
- **Materie riservate**: le decisioni elencate nell'Allegato 3.
- **Exit**: vendita del controllo, fusione, cessione di tutti o della maggior parte degli asset, IPO o liquidazione.

## Art. 2 — Strumento dell'Investimento

Selezionare **una** opzione:

- [ ] **A. Aumento di capitale**: la Società emette nuove quote/azioni; l'importo entra nella Società; tutti i soci precedenti sono diluiti.
- [ ] **B. Vendita secondaria**: l'Investitore acquista quote/azioni esistenti da [Fondatori / tutti i soci]; il prezzo va ai venditori, non alla Società.
- [ ] **C. Prestito alla Società**: l'Investitore presta denaro; la Società resta debitrice; la partecipazione non cambia.
- [ ] **D. Prestito convertibile**: l'Investitore presta denaro; la conversione in partecipazioni avviene alle condizioni dell'articolo 4 e dell'Allegato 4.

> [!WARNING]
> **Non confondere i flussi.** Nell'aumento di capitale il denaro entra nella Società. Nella vendita secondaria il denaro va ai soci venditori. Nel prestito il denaro entra nella Società ma come debito. Nel convertibile il denaro entra come debito fino alla conversione.

## Art. 3 — Importo, valutazione e partecipazione

1. Importo dell'Investimento: **CHF [●]**.
2. Pre-money: **CHF [●]**. Post-money: **CHF [●]**.
3. Partecipazione richiesta: **[●]%** post-money, fully diluted.
4. Numero di investitori del round: **[●]**.
5. Se l'Investimento è un aumento di capitale:
   - il prezzo di emissione è determinato in base al post-money;
   - la Società emette nuove quote/azioni per l'importo nominale necessario e l'eventuale aggio va nella riserva da capitale;
   - la partecipazione dell'Investitore è calcolata sul fully diluted post-money.
6. Se l'Investimento è una vendita secondaria:
   - il prezzo è pagato ai venditori;
   - la Società non riceve liquidità e non emette nuove partecipazioni;
   - la partecipazione dell'Investitore è acquistata dalle quote/azioni esistenti.
7. Se l'Investimento è un prestito:
   - la Società riceve l'importo come debito;
   - la partecipazione non cambia;
   - interesse, durata, rimborso e subordinazione sono indicati nell'Allegato 4.
8. Se l'Investimento è un prestito convertibile:
   - la Società riceve l'importo come debito;
   - la conversione avviene al closing di un aumento qualificato o alla scadenza, secondo l'Allegato 4;
   - la conversione richiede una delibera di aumento e le formalità applicabili.
9. Le parti allegano una cap table pre e post closing, firmata, che prevale sulle stime indicative.

### 3.1 Formula di base per l'aumento di capitale

**Post-money = pre-money + importo dell'aumento**  
**Quota dell'Investitore = importo dell'aumento ÷ post-money**

Esempio puramente illustrativo: pre-money CHF 9'000'000, aumento CHF 1'000'000, post-money CHF 10'000'000, quota 10%. Il denaro entra nella Società; i Fondatori non vendono e non versano nuovo denaro.

### 3.2 Formula di base per la vendita secondaria

**Quota acquistata = importo pagato ÷ valore economico concordato**  
Il denaro va ai venditori. La Società non riceve nulla.

### 3.3 Formula di base per il convertibile

**Valore di conversione = min(cap, pre-money del round qualificato × (1 − sconto))**  
**Quota stimata = importo convertito ÷ (valore di conversione + importo convertito)**

La formula è indicativa. La conversione effettiva dipende dalla cap table fully diluted, dalla delibera di aumento e dalle condizioni dell'Allegato 4.

## Art. 4 — Prestito convertibile (se applicabile)

1. Importo: CHF [●].
2. Interesse: [●]% annuo, maturato [giornalmente / annualmente], pagabile [in contanti / in quote].
3. Scadenza: [●].
4. Cap di conversione: CHF [●] (opzionale).
5. Sconto: [●]% sul prezzo del round qualificato.
6. Round qualificato: aumento di capitale di almeno CHF [●] con investitori terzi.
7. Conversione: alla chiusura del round qualificato, o alla scadenza, o su richiesta dell'Investitore secondo le condizioni.
8. La conversione richiede la delibera di aumento, la determinazione del prezzo e l'iscrizione. Nella Sagl non si presume un capitale condizionale analogo a quello della SA: la struttura va verificata con il notaio.
9. In caso di Exit prima della conversione, il prestito è rimborsato secondo l'ordine di priorità concordato, salvo diverso accordo.
10. Il prestito può essere postergato o trattato come capitale proprio sostitutivo in caso di difficoltà finanziarie. La qualificazione va verificata.

## Art. 5 — Condizioni sospensive del closing

1. Approvazione della Società e degli organi competenti.
2. Delibera di aumento di capitale, se applicabile, con atto pubblico e iscrizione.
3. Cap table aggiornata e firmata.
4. Due diligence soddisfacente su proprietà intellettuale, contratti, dati, lavoro e contenziosi.
5. Cessione o licenza di tutto il codice e dei materiali necessari alla Società.
6. Conferma che domini, account cloud, repository e app store sono aziendali.
7. Sottoscrizione degli accordi di riservatezza, non concorrenza e proprietà intellettuale.
8. Nomina degli organi e accettazione delle cariche.
9. Nessun evento che possa avere un effetto sostanziale negativo.
10. Verifica degli obblighi LSerFi e, se applicabile, preparazione del prospetto o delle informazioni richieste.

## Art. 6 — Destinazione dell'Investimento

1. Prodotto e sviluppo: [●]%.
2. Team e assunzioni: [●]%.
3. Marketing e vendite: [●]%.
4. Infrastruttura e sicurezza: [●]%.
5. Riserva di liquidità: [●]%.
6. L'Investitore non acquisisce un diritto di veto sulla singola spesa, salvo le materie riservate.
7. La Società fornisce un budget e un piano di liquidità coerenti con l'uso dei fondi.

## Art. 7 — Diritti di informazione

1. Report mensile entro [●] giorni dalla fine del mese: cassa, incassi, costi, fatturato, pipeline, clienti, prodotto, rischi.
2. Report trimestrale: budget vs actual, marginalità, concentrazione clienti, proprietà intellettuale, sicurezza.
3. Report annuale: conto annuale, budget, cap table, registro IP, assicurazioni.
4. Accesso ragionevole a libri e documenti, con preavviso e nel rispetto della riservatezza.
5. Informazioni su eventi rilevanti: contenziosi, incidenti di sicurezza, perdita di clienti chiave, violazioni, offerte di exit.
6. Gli obblighi contrattuali si aggiungono ai diritti di legge. Nella Sagl si applica l'art. 802 CO; nella SA l'art. 697 CO.
7. Le informazioni riservate sono coperte dall'articolo 15.

## Art. 8 — Governance e Investor Advisory Board

1. Composizione del consiglio/gerenza: [●]. L'Investitore [ha / non ha] diritto a [un seggio / un osservatore].
2. Se la Società ha categorie di azioni o quote, l'Investitore può avere diritto a un rappresentante di categoria secondo lo statuto e, per la SA, l'art. 709 CO.
3. L'**Investor Advisory Board** è un organo consultivo, senza poteri di gestione o rappresentanza. Formula pareri, condivide contatti e competenze, analizza opportunità.
4. I membri dell'Advisory Board sono nominati secondo il charter dell'Allegato 5, non sono organi sociali e non possono vincolare la Società.
5. Le decisioni restano in capo agli organi di legge. I pareri non vincolano il consiglio o i gerenti.

## Art. 9 — Materie riservate e diritti di consultazione

1. Le materie dell'**Allegato 3** richiedono [informazione preventiva / consultazione / consenso contrattuale], secondo la forma societaria.
2. Nella Sagl, un veto può essere previsto nello statuto ai sensi dell'art. 807 CO. È personale e non trasferibile.
3. Nella SA non esiste un veto statutario generale. Le tutele sono costruite con lo statuto, le maggioranze qualificate e il patto parasociale.
4. Le maggioranze dell'art. 704 CO e i compiti inderogabili del consiglio non possono essere eliminati o svuotati.
5. Il consenso contrattuale dell'Investitore non sostituisce la delibera dell'assemblea. La violazione del patto può dare luogo a rimedi contrattuali, non a una delibera valida.

## Art. 10 — Anti-dilution

1. In caso di emissione di nuove quote/azioni a un prezzo inferiore a quello dell'Investitore, la Società [emette / l'Investitore ha diritto di sottoscrivere] quote/azioni aggiuntive secondo la formula dell'Allegato 6.
2. Formula di riferimento, broad-based weighted average:

**CP2 = CP1 × (A + B) ÷ (A + C)**

Dove CP1 è il prezzo precedente, CP2 il prezzo rettificato, A le quote/azioni fully diluted prima dell'emissione, B le quote/azioni che sarebbero state emesse al prezzo CP1 per l'importo raccolto, C le quote/azioni effettivamente emesse.
3. Sono escluse dal calcolo le emissioni per piani di incentivazione approvati, le conversioni di strumenti esistenti e le operazioni straordinarie approvate.
4. L'attuazione richiede una delibera di aumento, il rispetto dei diritti d'opzione e delle maggioranze. Nella SA, la limitazione o soppressione del diritto d'opzione richiede gravi motivi e la maggioranza qualificata (artt. 652b e 704 CO). Nella Sagl si applicano per analogia le regole sull'aumento (art. 781 CO).
5. L'anti-dilution non è una garanzia di valore e non impedisce la diluizione se l'Investitore non partecipa.

## Art. 11 — Preferenza di liquidazione

1. In caso di Exit o liquidazione, l'Investitore ha diritto a [1x / [●]x] del proprio investimento, [non partecipante / partecipante con cap [●]x].
2. La preferenza è pagata dopo i creditori sociali e secondo l'ordine previsto dallo statuto.
3. Se il ricavato non è sufficiente, la preferenza può assorbire tutto il ricavato. I Fondatori devono comprenderne l'effetto.
4. La preferenza può essere strutturata con quote/azioni privilegiate. Nella SA si applicano gli artt. 654 e 656 CO; nella Sagl l'art. 799 CO richiama le regole sulle quote privilegiate.
5. La preferenza non è un debito e non dà diritto a interessi o a un pagamento garantito.
6. Le parti definiscono cosa costituisce Exit e come si calcola il ricavato netto.

## Art. 12 — Pro-rata, ROFR, tag-along e drag-along

1. **Pro-rata**: l'Investitore può sottoscrivere la propria quota delle nuove emissioni, nei limiti e con le esclusioni dell'Allegato 3.
2. **ROFR**: prima di cedere a un terzo, il socio offre agli altri e/o alla Società, secondo la procedura dell'Allegato 4.
3. **Tag-along**: se un Fondatore vende il controllo, l'Investitore può vendere pro quota alle stesse condizioni.
4. **Drag-along**: se una maggioranza qualificata approva un'Exit, gli altri soci possono essere obbligati a vendere alle stesse condizioni, con le tutele dell'Allegato 4.
5. Il drag-along non può violare norme imperative, diritti di categoria o restrizioni statutarie. Le procure e i poteri devono essere redatti con cura.
6. Le clausole devono essere coordinate con le regole di approvazione della Società e con il libro delle quote/azioni.

## Art. 13 — Protezione dei fondatori

1. I diritti dei Fondatori sono attribuiti separatamente e non dipendono l'uno dall'altro.
2. L'uscita, la sospensione o la vendita di un Fondatore non fa cadere automaticamente i diritti dell'altro.
3. I Fondatori mantengono i diritti previsti dallo statuto e dal patto parasociale, incluse le materie riservate, l'informazione e l'eventuale rappresentanza.
4. Le clausole di vesting, leaver e non concorrenza sono definite nell'accordo tra fondatori e devono essere compatibili con la legge e con i diritti degli investitori.
5. Nessun Fondatore è obbligato a investire nuovo denaro. La mancata partecipazione può comportare diluizione.
6. Gli investitori non acquisiscono il diritto di gestire direttamente la Società. La gestione resta agli organi di legge.

## Art. 14 — Proprietà intellettuale, dati e compliance

1. La Società deve essere titolare o licenziataria di tutto il codice, i marchi, i domini, i database, i contenuti e i materiali necessari all'attività.
2. I Fondatori e i collaboratori cedono i diritti secondo gli accordi applicabili. I beni preesistenti sono elencati e licenziati.
3. L'uso di open source è documentato e conforme alle licenze.
4. I dati personali sono trattati secondo la nLPD e i contratti con i clienti.
5. La Società mantiene misure di sicurezza adeguate, backup, gestione degli accessi e procedure di incident response.
6. La Società rispetta le autorizzazioni settoriali e gli obblighi fiscali e sociali.

## Art. 15 — Riservatezza e comunicazioni

1. Le parti trattano come riservate le informazioni ricevute in relazione all'Investimento.
2. La riservatezza vale per [●] anni e non copre le informazioni pubbliche, quelle ricevute legittimamente da terzi e quelle richieste per legge.
3. La Società può comunicare l'Investimento e l'identità dell'Investitore solo con il consenso scritto, salvo obblighi di legge.
4. Le parti non rilasciano dichiarazioni pubbliche che possano incidere sulla reputazione dell'altra senza confronto preventivo.

## Art. 16 — Dichiarazioni e garanzie

1. La Società e i Fondatori dichiarano che le informazioni fornite sono complete e corrette, nei limiti delle loro conoscenze.
2. La Società dichiara di essere costituita validamente, di avere il potere di concludere l'Accordo e di non essere in stato di insolvenza.
3. La Società dichiara di essere titolare o licenziataria dei beni necessari, di non avere contenziosi rilevanti non divulgati e di rispettare gli obblighi fiscali, sociali e di protezione dei dati.
4. Le dichiarazioni sono soggette a limiti di importo, tempo e conoscenza, da negoziare.
5. L'Investitore dichiara di avere le competenze e la capacità di sostenere il rischio dell'investimento e di rispettare le regole applicabili.

## Art. 17 — Durata, recesso e rimedi

1. L'Accordo entra in vigore al closing e dura fino all'Exit o alla sua risoluzione.
2. Le clausole di riservatezza, non concorrenza, proprietà intellettuale, indennizzo e soluzione delle controversie sopravvivono.
3. In caso di inadempimento, la parte non inadempiente può chiedere l'esecuzione, il risarcimento e gli altri rimedi di legge.
4. Le parti possono prevedere rimedi specifici per la violazione delle materie riservate, nei limiti di legge.
5. La risoluzione non pregiudica i diritti maturati e le obbligazioni già assunte.

## Art. 18 — Soluzione delle controversie

1. L'Accordo è regolato dal diritto svizzero.
2. Le parti tentano una mediazione prima dell'azione giudiziaria, senza limitare i provvedimenti provvisori.
3. È competente il foro ordinario della sede della Società, salvo diverso accordo scritto o norma imperativa.
4. Le parti possono concordare una clausola arbitrale, con verifica della compatibilità con i diritti dei terzi e con le procedure societarie.

## Art. 19 — Disposizioni finali

1. L'Accordo, i suoi allegati e gli altri documenti di closing costituiscono l'intesa tra le parti.
2. Le modifiche richiedono la forma scritta e la firma delle parti.
3. Se una disposizione è invalida, le altre restano valide.
4. L'Accordo è redatto in italiano in [●] esemplari.
5. Gli allegati fanno parte integrante dell'Accordo.

---

## Allegato 1 — Term sheet

| Voce | Valore | Note |
|---|---|---|
| Strumento | [aumento / secondaria / prestito / convertibile] | [●] |
| Importo | CHF [●] | [●] |
| Pre-money | CHF [●] | definizione al netto di cassa e debito |
| Post-money | CHF [●] | [●] |
| Quota | [●]% | fully diluted |
| Numero investitori | [●] | [●] |
| Prezzo per quota/azione | CHF [●] | [●] |
| Liquidation preference | [1x / ●] | [●] |
| Anti-dilution | [weighted average / full ratchet] | [●] |
| Board | [seggio / osservatore / nessuno] | [●] |
| Advisory Board | [sì / no] | [●] |
| Closing | [●] | condizioni sospensive |

## Allegato 2 — Cap table fully diluted

| Socio / strumento | Quote/azioni | Nominale | % economia | % voti | Note |
|---|---:|---:|---:|---:|---|
| Nicola Cappelli | [●] | [●] | [●]% | [●]% | [●] |
| Bryan Ciaponi | [●] | [●] | [●]% | [●]% | [●] |
| Investitore | [●] | [●] | [●]% | [●]% | [●] |
| Pool incentivazione | [●] | [●] | [●]% | [●]% | [●] |
| **Totale** | **[●]** | **CHF [●]** | **100%** | **100%** | — |

> [!NOTE]
> La cap table deve essere firmata e aggiornata a ogni closing. Le percentuali di voto possono differire da quelle economiche. Usare il simulatore della demo per verificare più round.

## Allegato 3 — Materie riservate e diritti dell'Investitore

| Materia | Soglia | Diritto | Note |
|---|---:|---|---|
| Nuove quote/azioni o convertibili | qualsiasi | pro-rata / consenso contrattuale | [●] |
| Debiti o garanzie | CHF [●] | consenso contrattuale | [●] |
| Budget annuale | qualsiasi | informazione / consultazione | [●] |
| Cessione IP strategica | qualsiasi | consenso contrattuale | [●] |
| Cambio di controllo / Exit | qualsiasi | tag / drag / informazione | [●] |
| Operazioni con parti correlate | CHF [●] | informazione / consenso | [●] |
| Modifica dei diritti di categoria | qualsiasi | consenso di categoria | [●] |
| Nomina del board | — | [seggio / osservatore] | [●] |
| Distribuzioni straordinarie | CHF [●] | consenso contrattuale | [●] |

> [!LEGAL]
> Nella Sagl un veto può essere statutario ex art. 807 CO; nella SA è prevalentemente contrattuale. Le maggioranze dell'art. 704 CO e i compiti del consiglio non possono essere eliminati. Il consenso dell'Investitore non sostituisce la delibera sociale.

## Allegato 4 — Prestito e conversione

| Voce | Valore | Note |
|---|---|---|
| Importo | CHF [●] | [●] |
| Interesse | [●]% | [●] |
| Scadenza | [●] | [●] |
| Cap | CHF [●] | [●] |
| Sconto | [●]% | [●] |
| Round qualificato | CHF [●] | [●] |
| Rimborso | [●] | [●] |
| Subordinazione | [sì / no / da verificare] | [●] |
| Garanzie | [●] | [●] |

## Allegato 5 — Charter dell'Investor Advisory Board

1. **Composizione:** [●] membri, nominati dalla Società.
2. **Durata:** [●], rinnovabile.
3. **Compiti:** consigliare la direzione, condividere contatti, supportare la strategia, fornire competenze, analizzare opportunità di mercato.
4. **Limiti:** nessun potere di gestione o rappresentanza; nessuna istruzione vincolante; nessun accesso a informazioni riservate oltre il necessario.
5. **Riunioni:** [●] volte all'anno, con verbale sintetico.
6. **Conflitti:** obbligo di dichiarare i conflitti e astenersi.
7. **Riservatezza:** accordo separato per ogni membro.
8. **Compenso:** [●], se previsto.

## Allegato 6 — Formula anti-dilution

**Broad-based weighted average:**

**CP2 = CP1 × (A + B) ÷ (A + C)**

- CP1: prezzo per quota/azione dell'Investitore.
- CP2: prezzo rettificato.
- A: quote/azioni fully diluted prima della nuova emissione.
- B: quote/azioni che sarebbero emesse al prezzo CP1 per l'importo raccolto.
- C: quote/azioni effettivamente emesse.

**Esempio illustrativo:** CP1 CHF 100, A 10'000, nuovo importo CHF 100'000, prezzo nuovo CHF 50 (C = 2'000). B = 100'000 ÷ 100 = 1'000. CP2 = 100 × (10'000 + 1'000) ÷ (10'000 + 2'000) = 91,67. La formula è indicativa e richiede verifica.

---

## Note legali e di metodo

> [!LEGAL]
> **Limiti da verificare.** Nella Sagl il veto è personale e non trasferibile (art. 807 CO). Nella SA non esiste un veto statutario generale; le tutele sono contrattuali e statutarie. Le maggioranze dell'art. 704 CO sono inderogabili. Il diritto d'opzione della SA è disciplinato dall'art. 652b CO; nella Sagl l'art. 781 CO richiama le regole sull'aumento. Le clausole di drag-along e tag-along sono contrattuali. La preferenza di liquidazione richiede una struttura statutaria compatibile. La raccolta di capitale può attivare obblighi LSerFi: verificare prima di contattare gli investitori.

> [!WARNING]
> **Non è un'offerta.** Questo modello non è diretto a nessun investitore specifico e non costituisce sollecitazione. Prima di qualsiasi offerta, le parti devono verificare la forma societaria, la cap table, la documentazione di due diligence, gli obblighi di prospetto e le conseguenze fiscali.

---

## Sottoscrizioni

Luogo e data: [●]

**Per la Società:** ______________________________  
Nome e funzione: [●]

**Investitore:** ______________________________  
Nome: [●]

**Fondatori, per quanto di competenza:**  
Nicola Cappelli: ______________________________  
Bryan Ciaponi: ______________________________

> [!FORMAL]
> Il closing di un aumento di capitale richiede le delibere e le formalità applicabili, inclusi l'atto pubblico e l'iscrizione. La vendita secondaria richiede le approvazioni statutarie. Il prestito convertibile richiede una struttura compatibile con la forma societaria e la delibera di aumento al momento della conversione.
`
  });
})();
