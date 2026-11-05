# Creare un record sul PDS

Per creare un singolo record, prepara un file JSON con il campo `$type` e passa il suo percorso al comando:

```bash
yarn pds:create percorso/record.json
```

Lo script chiede una **app password AT Protocol**, accede al PDS del DID `did:plc:27g2oqb2vz6k2mkezsx4a2sx`, crea un record con il JSON indicato e mostra l'AT-URI restituito. Richiede `curl` e `jq`. Non conserva password o token nei file del progetto.

Il comando crea sempre un nuovo record: non aggiorna record esistenti e non modifica il frontmatter. Se la risposta viene persa, verifica sul PDS prima di riprovare. Per collegare un documento Standard.site al blog, copia il suo AT-URI nel campo `atUri` del frontmatter e pubblica il sito; Next.js genera il relativo link di verifica nell'HTML.

La pubblicazione del sito è `at://did:plc:27g2oqb2vz6k2mkezsx4a2sx/site.standard.publication/3mywkviwovv25`. La sessione OAuth di Sequoia precedentemente autorizzata è indipendente da questo script e può essere revocata nelle impostazioni del provider.
