# Audit Risque Freelance — QuickDesk API

## Est-ce maintenable à TJM 600–800 ?

Non, en l’état : trop de couplage, sécurité fragile, refactor risqué sans garde-fous.

## Risques client (non-tech)

- Sécurité : des actions critiques sont accessibles sans auth
- Reprise : un nouveau dev mettra trop de temps à comprendre
- Régression : état global + dépendances circulaires = bugs difficiles

## Ce qui doit être sécurisé en priorité

1) Secrets/config
2) Suppression dépendance au root
3) Normalisation routes + protection
