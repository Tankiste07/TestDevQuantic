let offset = 50;

// Fonction qui gère l'affichage dynamique du formulaire selon la catégorie choisie
function handleCategoryChange(chaine) {
    // Récupération des éléments du DOM
    var a = document.getElementById("space-green");      // Section espaces verts
    var b = document.getElementById("activity");         // Section activités
    var fop = document.getElementById("free-or-paid");   // Section activités payantes ou non

    // Affichage/masquage selon la sélection
    if (chaine === "cacher1") { // Espaces verts
        a.style.display = "block";
        b.style.display = "none";
        if (fop) fop.style.display = "none";
    } else if (chaine === "cacher2") { // Activités
        a.style.display = "none";
        b.style.display = "block";
        if (fop) fop.style.display = "block";
    } else { // Rien sélectionné
        a.style.display = "none";
        b.style.display = "none";
        if (fop) fop.style.display = "none";
    }
}

// Fonction principale appelée lors du clic sur "Recherche"
function fetchData() {
    // Récupère la catégorie sélectionnée
    const category = document.getElementById('category').value;
    let arrondissement = "";

    // Récupère l'arrondissement selon la catégorie
    if (category === "cacher1") {
        arrondissement = document.getElementById('arrondissement-green').value;
    } else if (category === "cacher2") {
        arrondissement = document.getElementById('arrondissement-activity').value;
    }

    // Validation
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

    if (category === "cacher1") {
    fetch(`https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-espaces-verts-frais/records?limit=50&offset=${offset}`)
        .then(res => res.json())
        .then(data => {
            console.log("Espaces verts API results:", data.results);

            const arrondissements = data.results
                .filter(item => item.arrondissement === arrondissement)
                .map(item => `
                    <li>
                        <strong class="nom-nexa">${item.nom || "Nom inconnu"}</strong><br>
                        Activité : ${item.type || "Type inconnu"}<br>
                        Adresse : ${item.adresse || "Adresse inconnue"}<br>
                        Arrondissement : ${item.arrondissement || "Inconnu"}<br>
                    </li>
                `);

            if (arrondissements.length === 0) {
                resultsDiv.innerHTML = `
                    <p>Aucun résultat trouvé.</p>
                    <button id="retryBtn" type="button">Réessayer</button>
                `;

                // Boutton en cas de résultat nul permet de relancer la recherche
                document.getElementById("retryBtn").addEventListener("click", () => {
                    fetchAgain();
                });
            } else {
                resultsDiv.innerHTML = `<ul>${arrondissements.join("")}</ul>`;
            }
        })
        .catch(error => {
            resultsDiv.innerHTML = `<p> Erreur : ${error.message}</p>`;
        });

    } else if (category === "cacher2") {
        const freeOrPaid = document.getElementById("free-or-paid-select").value;

        fetch(`https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-equipements-activites/records?limit=50&offset=${offset}`)
            .then(res => res.json())
            .then(data => {
                // Affiche dans la console les 50 résultats reçus de l'API
                console.log("Activités API results:", data.results);

                const arrondissements = data.results
                    .filter(item =>
                        item.arrondissement === arrondissement &&
                        (
                            freeOrPaid === "both" ||
                            (freeOrPaid === "yes" && item.payant === "Oui") ||
                            (freeOrPaid === "no" && item.payant === "Non")
                        )
                    )
                    .map(item => `
                        <li>
                            <strong class="nom-nexa">${item.nom || item.nom_equipement || "Équipement inconnu"}</strong><br>
                            Activité : ${item.type || "Type inconnu"}<br>
                            Adresse : ${item.adresse || "Adresse inconnue"}<br>
                            Arrondissement : ${item.arrondissement || "Inconnu"}<br>    
                            Payant : ${item.payant || "Inconnu"}
                            <br>
                        </li>
                    `);

                if (arrondissements.length === 0) {
                    resultsDiv.innerHTML = `
                        <p>Aucun résultat trouvé.</p>
                        <button id="retryBtn" type="button">Réessayer</button>
                    `;

                    // Boutton en cas de résultat nul permet de relancer la recherche
                    document.getElementById("retryBtn").addEventListener("click", () => {
                        fetchAgain();
                    });
                } else {
                    resultsDiv.innerHTML = `<ul>${arrondissements.join("")}</ul>`;
                }
            })
            .catch(error => {
                resultsDiv.innerHTML = `<p> Erreur : ${error.message}</p>`;
            });
    }
}

// Relance la recherche en allant plus loins dans les résultats

function fetchAgain() {
    offset += 50; // On augmente l'offset à chaque nouvelle tentative
    console.log("Nouvelle tentative avec offset =", offset);
    fetchData();
}

// Initialisation dynamique du champ date pour empêcher de choisir une date passée
const today = new Date().toISOString().split("T")[0];
const startInput = document.getElementById("start");
startInput.min = today;   // Date minimale = aujourd'hui
startInput.value = today; // Valeur par défaut
