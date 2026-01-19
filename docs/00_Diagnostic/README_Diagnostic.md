# README Diagnostic — QuickDesk API (interne)

## 1) Objectif client

- Client : Café Vortex (PME, Toulouse)
- Objectif : stabiliser + rendre maintenable une mini API helpdesk
- Contraintes : pas de nouvelles features, pas de changement de stack, livraison rapide

## 2) Utilisateurs & usage

- Utilisateurs : staff (admin / user)
- Usage principal : créer / lister / mettre à jour des tickets, commenter

## 3) Fonctionnalités observées (factuelles)

- Auth : login email + password → token JWT
- Tickets : create, list, get, update, delete
- Comments : add, list
- Debug : seed / debug/all

## 4) Éléments critiques vs secondaires

### Critiques (priorité immédiate)

- Sécurité de l’authentification (secrets, routes non protégées)
- Cohérence du contrat API (routes, statuts HTTP)
- Stabilité de l’état applicatif (tickets/comments/users en mémoire globale)

### Secondaires (hors urgence)

- Structuration des logs
- Qualité du README
- Formatage et renommages non bloquants

## 5) Hypothèses & inconnues

- Persistance : en mémoire (volontaire), pas de DB
- Contrainte : refactor sans changer le comportement
- Hypothèse clé : le stockage en mémoire est volontaire et assumé pour ce projet


## 6) Critères de mission réussie

* Un développeur tiers peut comprendre et reprendre le projet en moins de 30 minutes
* Les endpoints sensibles sont correctement protégés

* Aucune dépendance circulaire persistante
* Le projet reste exécutable sans régression fonctionnelle
