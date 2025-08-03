# Lab5-LOG430 – Architecture Microservices avec API Gateway

## 1. Brève description de l'application

Ce projet présente la transformation d'une architecture monolithique en architecture microservices moderne.  
Il implémente :  
- la migration vers microservices avec API Gateway,  
- le load balancing entre instances de services,  
- l'observabilité avec Prometheus et Grafana,  
- la comparaison de performance avec l'architecture monolithique.  

L'architecture utilise **Node.js/Express** pour les microservices, **PostgreSQL** pour la persistance, et s'exécute en **conteneurs Docker** avec **Docker Compose**.

---

## 2. Instructions d'exécution

### 2.1 Cloner le dépôt
```bash
git clone https://github.com/ChawkiBenzeghiba/Lab5-LOG430.git
cd Lab5-LOG430
```

### 2.2 Lancer l'architecture microservices
```bash
cd microservices
docker-compose up --build
```

### 2.3 Accès aux services
Une fois les conteneurs démarrés :
- Frontend : `http://localhost:8080`
- API Gateway : `http://localhost:3000`
- Prometheus : `http://localhost:9090`
- Grafana : `http://localhost:3009` (admin/admin)

### 2.4 Instructions pour l'API
- Produits : `GET http://localhost:3000/api/produits`
- Stock : `GET http://localhost:3000/api/stock/stock-central`
- Panier : `GET http://localhost:3000/api/panier/client/:id`
- Commandes : `GET http://localhost:3000/api/commandes/client/:id`

---

## 3. Structure du projet
```plaintext
.
├── src/                           # Architecture monolithique (ancienne)
├── frontend/                      # Frontend monolithique (ancien)
├── microservices/                 # Architecture microservices (nouvelle)
│   ├── api-gateway/              # API Gateway principal
│   ├── service-produits/         # Service gestion produits
│   ├── service-clients/          # Service gestion clients
│   ├── service-stock/            # Service gestion stock
│   ├── service-panier/           # Service gestion paniers (2 instances)
│   ├── service-commandes/        # Service gestion commandes
│   ├── service-ventes/           # Service gestion ventes
│   ├── frontend-client/          # Interface utilisateur
│   ├── docker-compose.yml        # Orchestration des services
│   ├── prometheus.yml            # Configuration monitoring
│   └── grafana/                  # Dashboards et datasources
├── ARC42_DOCUMENTATION.md        # Documentation technique complète
├── COMPARISON_TABLE.md           # Tableau comparatif des performances
└── README.md                     # Documentation du laboratoire
```

## 4. Architecture des microservices

| Service | Port | Description |
|---------|------|-------------|
| API Gateway | 3000 | Point d'entrée unique |
| Produits | 3001 | Gestion du catalogue |
| Ventes | 3002 | Gestion des ventes |
| Stock | 3003 | Gestion des inventaires |
| Clients | 3005 | Gestion des utilisateurs |
| Panier (Instance 1) | 3006 | Gestion des paniers |
| Commandes | 3007 | Gestion des commandes |
| Panier (Instance 2) | 3008 | Load balancing |
| Grafana | 3009 | Observabilité |
| Frontend | 8080 | Interface utilisateur |
| Prometheus | 9090 | Monitoring |

## 5. Choix techniques

- **Langage** : JavaScript (Node.js)
- **Framework** : Express
- **ORM** : Sequelize
- **Base de données** : PostgreSQL (une par service)
- **Conteneurisation** : Docker & Docker Compose
- **API Gateway** : Express avec http-proxy-middleware
- **Load Balancing** : Round-robin entre instances
- **Monitoring** : Prometheus & Grafana
- **Sécurité** : CORS, Helmet

---

## 6. Tests

### 6.1 Tests de performance
```bash
# Test de la nouvelle architecture
./test-final-performance.sh

# Test du load balancing
./test-load-balancing.sh

# Test de l'exposition via Gateway
./test-gateway-exposure.sh
```

### 6.2 Résultats de performance
| Architecture | Temps Moyen | Amélioration |
|--------------|-------------|--------------|
| Monolithique | ~42ms | Référence |
| Microservices Direct | ~38ms | -10% |
| Microservices via Gateway | ~36ms | -14% |

---


## 8. Documentation

- [Documentation Arc42](ARC42_DOCUMENTATION.md) : Architecture technique complète
- [Load Balancing](microservices/LOAD_BALANCING.md) : Documentation du load balancing
- [Swagger](microservices/api-gateway/swagger.json) : Documentation API
- [Postman Collection](microservices/LOG430_Lab5_API_Gateway.postman_collection.json) : Tests API