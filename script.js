


//function vérifierNombre() {
  // Récupérer la valeur entrée par l'utilisateur
//  var nombre = parseInt(document.getElementById("numberInput").value);

  // Vérifier si le nombre est inférieur à 0
//  if (nombre < 0) {
//    window.location.href = "accueil.html"; // Redirection vers la première page
//  } else {
//    window.location.href = "saut-bon.html"; // Redirection vers la deuxième page
//  }
//}

var debutCalcul;
var finCalcul;
var tempsTotal = 0;
var compteur = 0;
var timer;
console.log("coucou");

/*function calculerTemps() {
    if (compteur === 0) {
        debutCalcul = Date.now();
        timer = setInterval(updateTime, 10);
        document.getElementById('boutonCalcul').innerText = 'Arrêter le calcul';
        compteur++;
    } else if (compteur === 1) {
        finCalcul = Date.now();
        clearInterval(timer);
        tempsTotal += (finCalcul - debutCalcul);
        document.getElementById('temps').innerText = 'Temps total calculé : ' + (tempsTotal / 1000).toFixed(2) + ' secondes';
        document.getElementById('boutonCalcul').innerText = 'Calculer le temps';
        compteur++;
        document.getElementById('inputNumber').value = (tempsTotal / 1000).toFixed(2);
    } else {
        clearInterval(timer);
        document.getElementById('inputNumber').value = '';
        tempsTotal = 0;
        document.getElementById('temps').innerText = '';
        document.getElementById('boutonCalcul').innerText = 'Calculer le temps';
        compteur = 0;
    }
}

function updateTime() {
    finCalcul = Date.now();
    document.getElementById('temps').innerText = 'Temps écoulé : ' + ((finCalcul - debutCalcul) / 1000).toFixed(2) + ' secondes';
}
*/

function calculer() {
    var t = parseFloat(document.getElementById('inputNumber').value);
    var h;

    if (!isNaN(t)) {
        h = 0.5 * 9.81 * Math.pow((t/2), 2);

        // Afficher le résultat
        document.getElementById('resultat').innerText = "Bravo, tu as sauté " + h.toFixed(2) + "m !";

        // Récupérer le record actuel depuis localStorage (s'il existe)
         var record = parseFloat(localStorage.getItem('record')) || 0;

         // Mettre à jour le record si nécessaire
         if (h > record) {
             localStorage.setItem('record', h);
             document.getElementById('record').innerText = "Nouveau record : " + h.toFixed(2) + "m.";
         } else {
             document.getElementById('record').innerText = "Record actuel : " + record.toFixed(2) + "m.";
         }
     } else {
         document.getElementById('resultat').innerText = "Veuillez entrer un chiffre valide.";
     }
}


$(function(){ //début

  $("#menu").click(function(){
  $("#panneau1").toggleClass('animation');
  $("#panneau2").toggleClass('animation');
  $("#panneau3").toggleClass('animation');
  $("#menu-texte").toggleClass('animation');
  $("#close").toggleClass('animation');

  $(this).toggleClass('fade');

  });


});
