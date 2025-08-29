function choixPersonnage(chaine) {
    var a = document.getElementById("space-green");
    var b = document.getElementById("activity");
    var fop = document.getElementById("free-or-paid");
    switch (chaine) {
        case "cacher1":
            a.style.display = "block";
            b.style.display = "none";
            if (fop) fop.style.display = "none";
            break;
        case "cacher2":
            a.style.display = "none";
            b.style.display = "block";
            if (fop) fop.style.display = "block";
            break;
        default:
            a.style.display = "none";
            b.style.display = "none";
            if (fop) fop.style.display = "none";
    }
}