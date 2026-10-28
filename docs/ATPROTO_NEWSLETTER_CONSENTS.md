# Preferenze e roadmap PocketBase

## Funzionamento attuale

Il sito statico usa il login AT Protocol nel browser e invia le preferenze direttamente a `newsletter_subscribers` su PocketBase. Il primo invio crea un record con email, handle, DID, versione del testo e i due consensi; gli invii successivi usano l'ID restituito per aggiornare quel record, anche in caso di revoca con entrambi i valori `false`. La conferma appare solo dopo aver verificato la risposta PocketBase. Un errore di rete può verificarsi dopo la scrittura: non significa necessariamente che l'invio sia fallito.

La creazione è pubblica e PocketBase non verifica il DID o l'email dichiarati: chiunque può creare record attribuiti ad altri. La ricerca pubblica richiede l'email come parametro; chiunque conosca un indirizzo può leggere i campi del relativo record e modificarlo inviando lo stesso indirizzo. La cancellazione resta riservata ai superuser. Il browser recupera il record tramite l'email e usa il suo ID per l'aggiornamento, anche da un altro dispositivo; non usa più una copia locale delle scelte.

Il 28 ottobre 2026, su richiesta dell'utente, sono stati eliminati i sette record presenti. Sono state attivate la ricerca per email e la modifica pubblica con email corrispondente, insieme a un indice univoco sul campo email. Creazione, ricerca, modifica, revoca e rifiuto di un duplicato sono stati verificati con un record tecnico e indirizzo `.invalid`; il record tecnico è stato poi eliminato. La collection è risultata vuota. L'indice è sul valore email come memorizzato: non è stata verificata l'unicità tra varianti maiuscole/minuscole. Le modifiche al frontend sono nel worktree e non sono pubblicate.

La rimozione account dal sito non è ancora disponibile. La pagina privacy è provvisoria. Non è stato effettuato un invio reale durante lo sviluppo o verificata la consegna di eventuali email.

## Roadmap da realizzare nel progetto PocketBase

1. Verificare l'identità AT Protocol con una soluzione server-side verificata, inclusi risoluzione sicura DID, controllo della firma, audience, scadenza e protezione da replay. Le preferenze non vanno inviate al provider AT Protocol.
2. Collegare il DID verificato a un utente PocketBase e usare regole per consentire lettura, modifica e cancellazione solo dei propri dati. Preservare gli usi esistenti della collection e impedire attribuzioni anonime fraudolente.
3. Definire e testare la migrazione dei vecchi record: per decisione dell'utente le vecchie scelte verranno mostrate selezionate, ma il loro DID non è una prova verificata. Gestire duplicati, ordinamento e aggiornamenti concorrenti.
4. Consentire il recupero delle preferenze da altri dispositivi, l'aggiornamento e la revoca effettiva; assicurare che newsletter e campagne rispettino la scelta corrente e non inviino notifiche duplicate.
5. Implementare la rimozione completa dei dati e del collegamento al sito, con conferma irreversibile, senza eliminare l'account AT Protocol presso il provider.
6. Verificare backup, compatibilità degli hook e regole, prove su dati sintetici e test end-to-end autorizzati prima dell'attivazione. Completare la pagina privacy.

### Collegamento a `users`

Verifica dalla dashboard del 28 ottobre 2026: la collection `users` è di tipo auth, richiede l'email, ha un indice univoco sull'email e contiene già un record. Non associare un DID a un account esistente soltanto sulla base dell'email fornita dal browser: una prova firmata del DID non certifica l'indirizzo email. Il collegamento richiede una verifica attendibile anche dell'email oppure un flusso di collegamento esplicito a un account PocketBase già autenticato. Non sovrascrivere o collegare l'utente esistente automaticamente. La verifica del DID, la gestione degli account e le regole per proprietario devono essere testate insieme prima di sostituire le regole pubbliche.

## Stato operativo annotato il 28 ottobre 2026

La collection live aveva i quattro campi AT Protocol aggiunti via dashboard e creazione pubblica; lettura, aggiornamento ed eliminazione erano riservati ai superuser. Prima delle modifiche era stato creato il backup `before-atproto-consents-20261028.zip`. L'hook `notifications.pb.js` era stato modificato per non inviare notifiche newsletter quando la versione del consenso è presente e `consent_newsletter` è falso; una copia precedente era stata conservata sul server in `/home/saas/pocketbase/backups/notifications-before-atproto-20261028.js`. Questi dettagli descrivono uno stato storico e vanno verificati prima di intervenire nuovamente.
