function vérifierNombre() {
  // Récupérer la valeur entrée par l'utilisateur
  var nombre = parseInt(document.getElementById("numberInput").value);

  // Vérifier si le nombre est inférieur à 0
  if (nombre < 0) {
    window.location.href = "accueil.html"; // Redirection vers la première page
  } else {
    window.location.href = "saut-bon.html"; // Redirection vers la deuxième page
  }
}
