# ADR-001 — Migration vers Architecture Microservices

## Statut
Accepté

## Contexte
Le système multi-magasins (Lab 2) atteint ses limites en termes de scalabilité et maintenabilité. Il faut évoluer vers une architecture plus flexible pour supporter la croissance et faciliter les évolutions futures.

## Décision
Adopter une architecture microservices avec API Gateway centralisé. Chaque domaine métier (Produits, Ventes, Stock, Panier, Commandes) devient un service indépendant avec sa propre base de données PostgreSQL.

## Raisons
- Permet une scalabilité horizontale indépendante par service
- Facilite le développement et déploiement indépendants
- Améliore la résilience par isolation des pannes
- Simplifie la maintenance et les évolutions futures

## Conséquences
- Complexité accrue de la communication inter-services
- Nécessité d'un API Gateway pour la coordination
- Gestion distribuée des données et de la cohérence
- Overhead de latence compensé par les optimisations 