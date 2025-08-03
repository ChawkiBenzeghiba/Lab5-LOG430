const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models/database');
const stockRoutes = require('./routes/stockRoutes');
const { initialiserStock } = require('./init-data');

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/stock', stockRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'service-stock', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Start server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données établie.');
    
    await sequelize.sync();
    console.log('Modèles synchronisés avec la base de données.');
    
    // Initialiser le stock avec les produits par défaut
    await initialiserStockParDefaut();
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Service Stock démarré sur le port ${PORT}`);
    });
  } catch (error) {
    console.error('Erreur lors du démarrage:', error);
    process.exit(1);
  }
};

// Fonction pour initialiser le stock par défaut
async function initialiserStockParDefaut() {
  try {
    // Données des produits par défaut avec leurs quantités
    const produitsParDefaut = [
      { produitId: 1, quantiteStock: 25 },
      { produitId: 2, quantiteStock: 30 },
      { produitId: 3, quantiteStock: 15 },
      { produitId: 4, quantiteStock: 20 },
      { produitId: 5, quantiteStock: 40 },
      { produitId: 6, quantiteStock: 50 },
      { produitId: 7, quantiteStock: 100 },
      { produitId: 8, quantiteStock: 75 },
      { produitId: 9, quantiteStock: 60 },
      { produitId: 10, quantiteStock: 45 }
    ];

    const produitsAvecQuantites = produitsParDefaut.map(item => ({
      produit: { id: item.produitId, nom: `Produit ${item.produitId}` },
      quantiteStock: item.quantiteStock
    }));

    await initialiserStock(produitsAvecQuantites);
    console.log('Stock initialisé avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du stock par défaut:', error);
  }
}

startServer(); 