# MedicAId

**Assistente sanitario AI su WhatsApp, integrato con il Fascicolo Sanitario Elettronico.**

---

## Problema

Gestire la salute propria e dei propri cari è complicato: farmaci da ricordare, appuntamenti da non perdere, ricette in scadenza, referti da seguire. Per caregiver, pazienti anziani e cronici, il carico cognitivo è enorme — e il sistema sanitario non aiuta.

---

## Soluzione

MedicAId porta il Fascicolo Sanitario Elettronico (FSE) direttamente su **WhatsApp**, l'app che tutti già usano. Nessuna nuova app da installare, nessuna interfaccia da imparare: basta scrivere un messaggio in linguaggio naturale.

Il chatbot risponde in italiano, gestisce la salute dell'utente e dei suoi familiari, e agisce come un assistente personale sempre disponibile.

---

## Funzionalità principali

- **Promemoria farmaci** — ricorda automaticamente le medicine da assumere e permette di posticipare ("ricordamelo tra un'ora")
- **Gestione appuntamenti** — panoramica settimanale/mensile, ricerca del primo slot libero con un medico specifico
- **Scadenza ricette** — avvisi proattivi quando una ricetta sta per scadere
- **Referti e documenti** — notifica la disponibilità di nuovi referti, con invio del PDF su richiesta
- **Modalità Caregiver** — accesso sicuro ai dati di familiari (genitori anziani, figli), con ruoli verificati tramite numero di telefono

---

## Architettura tecnica

| Layer | Tecnologia |
|---|---|
| Chatbot | WhatsApp Business API (Meta) |
| Backend | Django + Celery + Redis |
| AI | OpenAI GPT + Google Gemini (via datapizza-ai) |
| Infrastruttura | Docker, Cloudflare Tunnel |
| Sicurezza | Role-based access via FSE (Lista Numeri Sicuri) |

Il flusso è interamente **asincrono**: i messaggi in arrivo su WhatsApp vengono accodati tramite Celery e processati dai worker AI senza bloccare il webhook. Cloudflare Tunnel espone il servizio pubblicamente senza configurazioni firewall.

---

## Sicurezza e privacy

L'accesso ai dati sanitari è regolato dal numero di telefono chiamante, verificato contro la lista dei numeri abilitati nel FSE. Ogni ruolo (proprietario, figlio, caregiver) ha permessi distinti: chi non è autorizzato non vede nulla. Il rifiuto è gentile ma irrevocabile.

---

## Contesto

Prototipo sviluppato come pitch per un hackathon nel settore healthtech. L'obiettivo è dimostrare che la barriera di accesso al digitale sanitario può essere abbattuta partendo da uno strumento familiare come WhatsApp, senza richiedere competenze tecniche all'utente finale.

---

## Stack

`Python` · `Django` · `Celery` · `Redis` · `Docker` · `OpenAI API` · `Gemini API` · `WhatsApp Business API` · `Cloudflare Tunnel`
