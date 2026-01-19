# Audit Architecture — QuickDesk API

## Vue d’ensemble (schéma)

Request -> index.js -> routes -> controllers -> services -> (store actuel)

## Problèmes structurels

P0

- Secret JWT hardcodé dans index.js
- Dépendance au root (services/middlewares importent ../../index)
- Routes non protégées (comment / list tickets)
- Erreurs incohérentes (string/JSON, parfois 200)

P1

- Routes incohérentes (ticket vs tickets)
- Service layer dépendante du serveur
- Store “global” non isolé

P2

- config.js et app.js inutilisés / non alignés

## Endroits “dangereux”

- index.js (config + state + routes + exports)
- middleware auth (secret via root)
- service deleteTicket (mutation référence)
