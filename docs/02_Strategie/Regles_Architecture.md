# Règles d’Architecture (simples)

1 fichier = 1 responsabilité
Routes = définition endpoints uniquement
Controllers = HTTP + mapping requête/réponse
Services = logique métier (pure autant que possible)
Store = état central (temporaire en mémoire)
Config = lecture env / constants
Aucun service/middleware n’importe le serveur (index/app)
