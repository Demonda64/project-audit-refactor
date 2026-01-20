# AUDIT — QuickDesk API (v1)

## 0. Contexte & objectif client

Client : Café Vortex (PME, Toulouse)
Besoin : stabiliser et rendre maintenable une mini API helpdesk.
Contrainte : ne pas ajouter de features, ne pas changer la stack, livrer vite.

## 1. Résumé exécutif (1 paragraphe)

Le projet fonctionne mais présente des risques élevés de maintenance et de sécurité : configuration et secrets en dur, architecture incohérente (routes au singulier/pluriel), dépendances au fichier racine, absence de validation et gestion d’erreurs non standard. Un refactor progressif est nécessaire pour isoler les responsabilités (routes/controllers/services/config), supprimer les dépendances circulaires et mettre en place des standards qualité (lint/format) sans changer le comportement fonctionnel.

## 2. Observations — Problèmes identifiés (P0/P1/P2)

> P0 = risque sécurité / crash / incohérence majeure
> P1 = dette forte / maintenabilité / évolutivité
> P2 = propreté / conventions / ergonomie dev

### P0 — Critiques

- P0.1 Secret JWT en dur dans `index.js` (fuite + impossible à gérer proprement)
- P0.2 Dépendance circulaire et couplage fort : services/middlewares importent `../../index`
- P0.3 Routes partiellement non protégées (ex : POST comment sans auth)
- P0.4 Réponses d’erreurs incohérentes (string vs JSON, parfois 200 sur erreur)
- P0.5 “DB” hybride et état global (risque comportement non déterministe)

### P1 — Importants

- P1.1 Architecture incohérente : `tickets` vs `ticket` (singulier/pluriel), chemins non REST
- P1.2 Service layer non isolée : logique métier dépendante de variables globales
- P1.3 Duplication utilitaires temps/date (`utils/date.js` et `utils/time.js`)
- P1.4 Gestion des IDs fragile (collisions possibles)
- P1.5 Absence de validation d’input (priorité/statut/site acceptent n’importe quoi)

### P2 — Améliorations

- P2.1 Fichier `src/app.js` inutile / non utilisé
- P2.2 Pas de structure standard de config (env, port)
- P2.3 Logs non structurés (console.log partout)
- P2.4 README minimal, pas de doc API claire, pas d’exemples d’appels

## 3. Risques côté client (langage non-tech)

- Risque de sécurité : un accès non autorisé pourrait modifier des tickets.
- Risque de maintenance : si un dev reprend, il mettra du temps à comprendre, donc coût.
- Risque d’instabilité : certaines modifications casseront facilement le comportement.

## 4. Décisions de refactor (sans changer le comportement)

### D1 — Extraire la configuration

- Déplacer `PORT` et `JWT_SECRET` vers `src/config/*` + `.env` (ou `.env.example`)
- Interdire secrets en dur

### D2 — Supprimer la dépendance au root `index.js`

- Introduire un “store” simple (ex : `src/data/store.js`) exportant `tickets/comments/users`
- Les services importent le store, pas le serveur

### D3 — Normaliser les routes

- Garder un seul prefix `/tickets`
- Commentaires en sous-ressource : `/tickets/:id/comments`
- Assurer auth cohérente

### D4 — Standardiser les erreurs & réponses

- Format JSON unique `{ error: { code, message } }`
- Statuts HTTP corrects (404, 401, 403, 400)

### D5 — Validation minimale

- Validation manuelle simple (sans lib) pour garder le scope
- Enum : status, priority, site

## 5. Plan d’exécution (macro)

1) Mettre des tests de “non-régression” minimal (smoke via curl) ou script
2) Refactor config + store
3) Refactor routes vers REST propre
4) Harmoniser erreurs + validation
5) Ajouter qualité (ESLint/Prettier) + README

## 6. Hors périmètre (pour éviter le scope creep)

- Pas de DB (Postgres/Mongo) dans ce projet
- Pas de refonte auth avancée (refresh tokens, etc.)
- Pas d’UI

EOF
