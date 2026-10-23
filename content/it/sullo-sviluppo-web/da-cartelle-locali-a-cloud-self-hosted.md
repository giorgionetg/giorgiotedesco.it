---
slug: da-cartelle-locali-a-cloud-self-hosted
title: "Dalle cartelle locali a un cloud self-hosted: l'evoluzione dell'architettura"
description: Il passaggio da progetti raccolti in cartelle locali a uno stack self-hosted con Forgejo, Traefik, PocketBase e GarageHQ.
category: sullo-sviluppo-web
tags: ["devops", "self-hosting", "docker", "traefik", "pocketbase", "nextjs", "forgejo", "garagehq", "Tradotto da Inglese"]
translationKey: from-local-to-self-hosted-cloud
image: /ai-images/from-local-to-self-hosted-cloud.png
datePublished: "2026-03-07T09:00:00+01:00"
dateModified: "2026-03-07T09:00:00+01:00"
---

### La visione

Volevo smettere di costruire progetti concentrati in una cartella. Ho iniziato come tutti: una cartella locale con binari e codice mescolati insieme. Funziona per una settimana, poi si rompe.

Ho deciso di spostare tutto su un'infrastruttura cloud professionale e self-hosted. Niente dipendenze dal cloud pubblico, niente scuse del tipo «sul mio computer funziona». Volevo uno stack pulito, disaccoppiato e containerizzato, da poter riavviare ovunque in pochi minuti.

### Passaggio 1: Forgejo e un'unica fonte di verità

Per prima cosa ho abbandonato la cartella locale e sono passato a **Forgejo**. L'ho distribuito in container per avere il pieno controllo del flusso Git.

Ho diviso l'infrastruttura:

* **Repository Core:** logica pura e codice dell'applicazione.
* **Repository Infra:** Docker Compose, routing e orchestrazione degli ambienti.

Configurando un **registro privato di container** dentro Forgejo, ho cambiato il flusso di lavoro. Non invio più il codice direttamente ai server: creo un'immagine, la carico nel registro e la scarico in produzione. Pulito, atomico, versionato.

### Passaggio 2: routing edge con Traefik

Non perdo più tempo con configurazioni Nginx manuali. Ho scelto **Traefik** come router edge.

Traefik ascolta il socket Docker. Quando avvio un nuovo container, che sia il frontend **Next.js** o il backend **PocketBase**, lo rileva, gestisce i certificati SSL tramite Let's Encrypt e instrada il traffico. È dinamico, rapido e permette migrazioni senza interruzioni.

### Passaggio 3: mettere in sicurezza il backend (PocketBase)

PocketBase è ottimo, ma va usato nel modo giusto. Ho abbandonato il semplice montaggio delle cartelle e ho iniziato a includere gli hook Go personalizzati e le migrazioni direttamente nell'immagine Docker.

La vera prova? Spostare l'intera istanza tra repository. Disaccoppiando il volume `/pb_data` e fornendo i segreti — credenziali amministrative e chiavi di cifratura — tramite variabili d'ambiente, ho riavviato subito il sistema in un nuovo ambiente. Nessuna perdita di dati, nessun caos di configurazione.

### Passaggio 4: storage e siti statici con GarageHQ

Per gestire risorse e siti statici senza dipendere dal disco locale, ho introdotto **GarageHQ**.

È un livello di storage distribuito compatibile con S3. Con GarageHQ i miei servizi sono davvero stateless. Le risorse statiche e i siti generati vivono in bucket S3. Se un nodo si ferma, avvio i container altrove e li ricollego al cluster di storage.

### La realtà del dogfooding

Uso la mia infrastruttura per costruire la mia infrastruttura. La mia istanza Forgejo crea le immagini, le archivia e mi aiuta a distribuirle.

Quando ho attivato tutto, ha funzionato: segreti iniettati, bucket S3 montati, registro che scaricava esattamente l'immagine testata in sviluppo, byte per byte. È così che si passa da un «progetto» a una «piattaforma».

### Considerazioni finali

L'architettura conta più del codice. Disaccoppiando la logica dall'infrastruttura e facendo self-hosting dell'intera catena, da **Forgejo** a **GarageHQ**, controllo la supply chain.

È sicura, è portabile, è mia.
