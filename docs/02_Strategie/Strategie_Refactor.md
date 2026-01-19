# Stratégie Refactor — QuickDesk API

## Objectif

Réduire risques P0/P1 sans changer le comportement fonctionnel.

## Ce que je change

- D1 Config/secrets externalisés
- D2 Store isolé (tickets/comments/users hors index.js)
- D3 Routes normalisées (/tickets + /tickets/:id/comments)
- D4 Erreurs standardisées (JSON + codes HTTP)
- D5 Validation minimale (enums)

## Ce que je ne change pas

- Pas de DB
- Pas de nouvelle auth avancée
- Pas d’UI
- Pas de nouvelles fonctionnalités

## Ordre d’exécution

1) Smoke tests (non régression)
2) D1
3) D2
4) D3
5) D4/D5
6) Qualité + docs
