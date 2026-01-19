# Audit Lisibilité Code — QuickDesk API

## Nommage

- ticket_service.js vs commentsService.js (styles différents)
- routes tickets.routes.js vs ticket.routes.js (incohérent)

## Duplication

- utils/date.js et utils/time.js font la même chose

## Cohérence réponses

- erreurs en string vs JSON
- erreurs en 200 (comment ticket not found)
