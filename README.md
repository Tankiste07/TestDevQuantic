# Ilôts de Fraîcheur – Application Data-Centric

## Objectif du test

Ce projet est un exercice **data-centric** visant à :  
- Organiser et présenter des informations issues de données hétérogènes.  
- Proposer une interface utilisateur simple, claire et agréable (**UX/UI**).  
- Récupérer et exploiter des données ouvertes via des **API Open Data de la Ville de Paris**.  

L’application permet à l’utilisateur de trouver facilement des **endroits frais à Paris** selon ses besoins :  
- Espaces verts  
- Équipements et activités    

---

## Consignes respectées

-  Mise en place d’**un ensemble de filtres** appliqués à 1 ou plusieurs datasets.  
- **Tableau des résultats** affichant les informations sélectionnées.  
- Possibilité de consulter **au moins 2 datasets différents**.  
-  Charte graphique respectée :  
  - Police des titres : **Nexa**  
  - Couleur principale : `#5f259f`  
-  Code structuré, lisible, simple et stable.  
-  Application exécutable en local (HTML, CSS, JS).  

---

## Fonctionnalités

- Sélection d’une **catégorie** (espaces verts, activités).  
- Filtrage par **arrondissement** 
- Affichage d’une **liste de résultats** (nom, type, adresse, arrondissement).  
- Message clair si **aucun résultat** n’est trouvé.  
- Bouton pour **relancer une recherche** avec les mêmes critères.  

---

## Jeux de données utilisés

Les données proviennent de l’**Open Data de la Ville de Paris** :  
- [Espaces verts frais](https://parisdata.opendatasoft.com/explore/dataset/ilots-de-fraicheur-espaces-verts-frais)  
- [Équipements et activités](https://parisdata.opendatasoft.com/explore/dataset/ilots-de-fraicheur-equipements-activites)   

---

## Technologies utilisées

- **Frontend** : HTML, CSS, JavaScript (Vanilla)  
- **API** : `fetch()` pour récupérer les données JSON depuis Opendata Paris  
- **UI** : Formulaire de filtres + tableau dynamique  

---

## Installation et exécution

1. **Cloner le projet**  
   ```bash
   git clone https://github.com/mon-projet/ilots-de-fraicheur.git
   cd ilots-de-fraicheur
   ```
