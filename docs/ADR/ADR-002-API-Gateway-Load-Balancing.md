# ADR-002 — API Gateway avec Load Balancing

## Statut
Accepté

## Contexte
L'architecture microservices nécessite un point d'entrée unique pour coordonner les requêtes et gérer la distribution de charge entre instances multiples.

## Décision
Implémenter un API Gateway basé sur Express avec http-proxy-middleware pour le routage et un load balancer round-robin pour le service Panier.

## Raisons
- Point d'entrée unique simplifie l'intégration client
- Load balancing améliore la disponibilité et les performances
- Centralisation de la sécurité et du monitoring
- Facilité d'ajout de nouvelles fonctionnalités (cache, compression)

## Conséquences
- Single point of failure pour l'API Gateway
- Overhead de latence compensé par les optimisations
- Complexité de configuration et maintenance
- Nécessité de monitoring spécifique 