// backend/server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Chemin du fichier JSON
const dataPath = path.join(__dirname, 'patrimoine.json');

// Récupérer les données du patrimoine
app.get('/api/patrimoine', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la lecture des données' });
    }
    res.json(JSON.parse(data));
  });
});

// Mettre à jour les données du patrimoine
app.post('/api/patrimoine', (req, res) => {
  const newData = JSON.stringify(req.body, null, 2);
  fs.writeFile(dataPath, newData, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la mise à jour des données' });
    }
    res.json({ message: 'Données mises à jour avec succès' });
  });
});

app.listen(port, () => {
  console.log(`Serveur backend en écoute sur le port ${port}`);
});






