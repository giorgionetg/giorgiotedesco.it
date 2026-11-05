# Servizi suggeriti negli articoli

La sidebar resta un componente condiviso tra i post inglesi e italiani. Ogni articolo può scegliere i servizi e il loro ordine aggiungendo al frontmatter:

```yaml
recommendedServices: [websites, visura-ai]
```

Gli identificativi disponibili sono `websites`, `visura-ai` e `ai-sitter`. Se il campo manca o contiene soltanto identificativi sconosciuti, la sidebar mostra tutti e tre i servizi nell'ordine globale. `recommendedServices: []` mostra invece una sidebar con altri articoli della stessa lingua. L'interfaccia usa la lingua dell'articolo; le pagine di destinazione dei servizi sono attualmente in italiano.

I collegamenti tra articoli si scelgono nel frontmatter con percorsi relativi alla radice del blog della stessa lingua, senza `/blog/` o `/it/blog/`:

```yaml
recommendedServices: []
relatedPosts: [sullo-sviluppo-web/un-agente-e-una-macchina-a-stati, sul-web-marketing/una-scomoda-verita]
```

Se mancano collegamenti espliciti, la sidebar completa le due posizioni con post della stessa categoria e con tag condivisi; poi usa i più recenti. Non mostra mai l'articolo corrente.

Al 5 novembre 2026 tutti i 22 articoli pubblicati hanno una scelta esplicita. Le coppie tradotte usano gli stessi servizi. Siti web è suggerito negli articoli sul sito e sull'infrastruttura web; Visura AI nell'articolo sulla piattaforma web e in quello sul problema commerciale emerso dopo aver esaminato 8.000 siti; AI Sitter nella storia del sito rimasto incompleto nonostante molti agenti. I 12 articoli senza un nesso con l'offerta attuale collegano due altre letture, scelte per argomento e in alcuni casi reciproche.

## Misurazione

Un clic su una card della sidebar genera l'evento Umami `blog_service_click` con `article` (percorso del post), `locale`, `service` e `selection` (`article` oppure `default`). L'evento parte solo in produzione e solo con il consenso alle statistiche. Se lo script Umami non è ancora pronto, il clic resta temporaneamente nella sessione della scheda e viene inviato al caricamento successivo. Alla revoca del consenso, gli eventi in attesa vengono eliminati.

Questa implementazione misura i clic, non le richieste o gli acquisti attribuiti al blog. La consegna degli eventi a Umami e i report reali richiedono una verifica dopo la pubblicazione.
