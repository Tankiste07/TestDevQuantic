/* const express = require('express');
const app = express();
const port = 4000;

function fetchData() {
  const arrondissement = document.getElementById('arrondissement').value;
  const freeOrPaid = document.getElementById('free-or-paid').value;
  const category = document.getElementById('category').value;

if (category === "cacher1") {
  app.get('/espaces-verts', (req, res) => {
    fetch("https://parisdata.opendatasoft.com//api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-espaces-verts-frais/records?limit=100&offset=0&timezone=UTC&lang=fr&sort=-record_timestamp")
      .then(res => res.json())
      .then(data => {
        const arrondissements = data.results
          .filter(item => item.arrondissement === arrondissement)
          .slice(0, 4)
          .map(item => item.arrondissement);
        res.send(arrondissements);
      });
    // Fetch data for espaces verts
  });
} else if (category === "cacher2") {
  app.get('/activites', (req, res) => {
    fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-equipements-activites/records?limit=20")
      .then(res => res.json())
      .then(data => {
        const arrondissements = data.results
          .filter(item => item.arrondissement === arrondissement)
          .slice(0, 4)
          .map(item => item.arrondissement);
        res.send(arrondissements);
      });
    });
  }
}

app.get('/espaces-verts', (req, res) => {
    fetch("https://parisdata.opendatasoft.com//api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-espaces-verts-frais/records?limit=100&offset=0&timezone=UTC&lang=fr&sort=-record_timestamp")
    .then(res => res.json())
  .then(data => {
    const arrondissements75010 = data.results
      .filter(item => item.arrondissement === "75010") // garde seulement ceux du 75010
      .slice(0, 4) // limite aux 4 premiers
      .map(item => item.arrondissement); // extrait juste la valeur de l'arrondissement

    res.send(arrondissements75010);
    // Exemple : ["75004", "75011", "75012", ...]
  })
  .catch(err => {
    console.error(err);
    res.status(500).send('Internal Server Error');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});*/
