const express = require('express');
const router = express.Router();
const venteController = require('../controllers/venteController');

// Enregistrer une vente
router.post('/magasin/:magasinId/vente', venteController.enregistrerVente);

// Faire un retour
router.post('/magasin/:magasinId/retour', venteController.faireRetour);

// Récupérer les ventes d'un magasin
router.get('/magasin/:magasinId/ventes', venteController.getVentesByMagasin);

// Récupérer une vente par ID
router.get('/:id', venteController.getVenteById);

module.exports = router; 