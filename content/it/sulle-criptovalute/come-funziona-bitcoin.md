---
slug: come-funziona-bitcoin
title: Come funziona Bitcoin
description: Una breve introduzione al funzionamento di Bitcoin e delle altre criptovalute.
category: sulle-criptovalute
tags: ["bitcoin", "ethereum", "xrp", "erc20", "defi", "Tradotto da Inglese"]
translationKey: how-bitcoin-works
datePublished: "2020-09-05T09:00:00+08:00"
dateModified: "2020-10-22T09:00:00+08:00"
---

### In breve

Quasi tutte le criptovalute funzionano in modo simile. Si basano su una [rete **peer-to-peer** (P2P)](https://www.giorgiotedesco.com/the-blog/on-cryptocurrencies/what-is-a-p2p-network). Qui vediamo alcuni aspetti del loro funzionamento:

- **Il peer**, l'unità centrale (il software) che elabora le azioni da compiere.
- **Chiave pubblica e chiave privata**: come vengono generate e quanto è difficile ricavare l'una dall'altra.
- **Il protocollo Proof of Work**, il processo alla base della creazione dei blocchi.
- **La struttura del blocco**, probabilmente la parte più semplice da capire.

Alla fine avrai le basi per orientarti. Ogni sezione offre solo una panoramica di Bitcoin e delle criptovalute; nei prossimi mesi approfondirò ciascun argomento.

### **Il peer**, l'unità che elabora le azioni

Il software **Bitcoin Core** funziona come un **peer** in una rete composta da migliaia di nodi (è da qui che deriva l'idea di decentralizzazione). I compiti principali di un peer sono:

- conservare una copia identica di tutti i blocchi della blockchain;
- mantenersi sincronizzato con la rete.

Bitcoin Core può essere usato anche come:

- **Wallet**: esistono molti software più leggeri e facili da usare per gestire un portafoglio.
- **Miner**: oggi il mining di Bitcoin è svolto soprattutto da grandi aziende. Per un utente comune il costo energetico non è trascurabile. È in questa modalità che entra in gioco il protocollo Proof of Work.

Per ora non conosci ancora:

- la **chiave pubblica**, che vedremo nella prossima sezione;
- la **chiave privata**. È importante sapere che il peer non salva chiavi private: a questo livello, il peer è agnostico.

### **Chiave pubblica e chiave privata**: come si generano e quanto è difficile ricavare l'una dall'altra

L'**indirizzo**, o **chiave pubblica**, è il codice da condividere con amici e attività commerciali per ricevere pagamenti. **Attenzione: se condividi il tuo indirizzo principale, gli altri possono vedere quanti bitcoin possiedi.** È quindi importante considerare la **privacy**. La riservatezza dei pagamenti in Bitcoin viene spesso fraintesa: le transazioni non sono private. Se invio bitcoin al tuo indirizzo principale e tu lo hai reso pubblico, posso consultare i pagamenti associati a quell'indirizzo.

Se sai come usarlo, l'indirizzo pubblico condivisibile funziona in modo simile al tuo **IBAN** o al codice **SWIFT**.

#### Che cos'è la chiave privata e come si genera quella pubblica?

La **chiave segreta** è un grande numero casuale (2^256, cioè un numero di 256 bit, composto da circa 70 cifre decimali). È legata a una curva ellittica (y² = x³ + 7, detta Secp256k1; in modo semplificato, la chiave pubblica deriva da quella privata). Se una sequenza usa cifre da 0 a 9 e lettere da A a F, è scritta in **esadecimale**; rappresenta un numero **binario**.

Ricavare la **chiave pubblica** da quella privata è semplice. Fare il percorso inverso, cioè calcolare la **chiave privata** a partire da quella pubblica, è considerato impraticabile. Le due chiavi sono strettamente collegate: dalla privata si genera rapidamente la pubblica, mentre invertire il processo richiederebbe tempi enormi anche a un supercomputer.

### **Il mining**: il protocollo Proof of Work e la creazione dei blocchi

Il processo segue alcuni passaggi e regole:

- Un solo nodo può aggiungere il blocco successivo. Il miner cerca un numero che risolva un problema numerico; anche gli altri miner provano combinazioni casuali. In questo breve esempio, `72051185846664238833589` è il numero da trovare: [un esempio semplice](https://bitcoin.stackexchange.com/questions/8031/what-are-bitcoin-miners-really-solving).
- Quando il blocco viene condiviso sulla rete P2P, il processo di mining riparte in un ciclo.

Ogni blockchain parte da un blocco genesi. In Bitcoin viene prodotto circa un blocco ogni 10–11 minuti. Nel frattempo le transazioni entrano in una coda, in attesa di essere incluse. Il ritmo è determinato dal **processo di mining**.

Dopo il primo blocco viene generato un nuovo problema, che i miner affrontano per tentativi: i loro computer provano milioni di numeri casuali, un po' come in una lotteria. Quando un miner trova la soluzione, può proporre il blocco alla rete.

### **La struttura del blocco**: come un pacchetto informatico

Un blocco Bitcoin è simile a un pacchetto di rete, per esempio TCP/IP: contiene un'intestazione e un corpo con le transazioni. La blockchain non conosce l'identità di chi genera un wallet. Finché non effettui una transazione, la rete non registra la tua attività. Nei blocchi vengono salvate le transazioni inviate dai wallet: in sostanza, il valore trasferito da una chiave pubblica mittente a una chiave pubblica destinataria. Tutto qui.
