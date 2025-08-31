function choixPersonnage(chaine) {
    var a = document.getElementById("space-green");
    var b = document.getElementById("activity");
    var fop = document.getElementById("free-or-paid");
    if (chaine === "cacher1") {
        a.style.display = "block";
        b.style.display = "none";
        if (fop) fop.style.display = "none";
    } else if (chaine === "cacher2") {
        a.style.display = "none";
        b.style.display = "block";
        if (fop) fop.style.display = "block";
    } else {
        a.style.display = "none";
        b.style.display = "none";
        if (fop) fop.style.display = "none";
    }
}

function fetchData() {
    const category = document.getElementById('category').value;
    let arrondissement = "";
    if (category === "cacher1") {
        arrondissement = document.getElementById('arrondissement-green').value;
    } else if (category === "cacher2") {
        arrondissement = document.getElementById('arrondissement-activity').value;
    }

    // Validation simple
    if (!category) {
        alert("Veuillez choisir une catégorie.");
        document.getElementById('category').focus();
        return;
    }
    if (!arrondissement) {
        alert("Veuillez choisir un arrondissement.");
        if (category === "cacher1") {
            document.getElementById('arrondissement-green').focus();
        } else {
            document.getElementById('arrondissement-activity').focus();
        }
        return;
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = "<p>Chargement...</p>";

    if (category === "cacher1") {
        fetch("https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-espaces-verts-frais/records?limit=100&offset=0&timezone=UTC&lang=fr&sort=-record_timestamp")
            .then(res => res.json())
            .then(data => {
                console.log(data.results); // Ajoute ceci pour voir la structure dans la console
                const arrondissements = data.results
                    .filter(item => item.arrondissement === arrondissement)
                    .slice(0, 4)
                    .map(item => `<li>${item.nom_site || "Nom inconnu"} (${item.arrondissement})</li>`);

                if (arrondissements.length === 0) {
                    resultsDiv.innerHTML = "<p>Aucun résultat trouvé.</p>";
                } else {
                    resultsDiv.innerHTML = `<ul>${arrondissements.join("")}</ul>`;
                }
            })
            .catch(error => {
                resultsDiv.innerHTML = `<p> Erreur : ${error.message}</p>`;
            });

    } else if (category === "cacher2") {
        fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-equipements-activites/records?limit=20")
            .then(res => res.json())
            .then(data => {
                console.log(data.results); // Ajoute ceci pour voir la structure dans la console
                const arrondissements = data.results
                    .filter(item => item.arrondissement === arrondissement)
                    .slice(0, 4)
                    .map(item => `<li>${item.nom_equipement || "Équipement inconnu"} (${item.arrondissement})</li>`);

                if (arrondissements.length === 0) {
                    resultsDiv.innerHTML = "<p>Aucun résultat trouvé.</p>";
                } else {
                    resultsDiv.innerHTML = `<ul>${arrondissements.join("")}</ul>`;
                }
            })
            .catch(error => {
                resultsDiv.innerHTML = `<p> Erreur : ${error.message}</p>`;
            });
    }
}

