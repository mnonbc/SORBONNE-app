//page 2
// Sélection de l'élément du ressort
const ressort = document.getElementById('ressort2');
const boutonSaut = document.getElementById('boutonSaut');

// Sélection de l'élément de l'image
const imageRessort = document.querySelector('.ressort-img2');

// Ajout d'un gestionnaire d'événement pour le clic sur le ressort
boutonSaut.addEventListener('click', () => {
  // Obtention de la hauteur actuelle du ressort
  const currentHeight = ressort.clientHeight;

  // Définition des états pour l'animation du ressort
  const expandedHeight = currentHeight * 1.3; // Augmenter la hauteur
  const contractedHeight = currentHeight * 0.5; // Diminuer la hauteur

  // Application des états d'animation en alternance
  imageRessort.style.transform = `scaleY(${expandedHeight / currentHeight})`; // Appliquer la transformation de l'échelle

  setTimeout(() => {
    imageRessort.style.transform = `scaleY(${contractedHeight / currentHeight})`; // Réduire l'échelle après un délai
  }, 200); // Délai de 300ms

  setTimeout(() => {
    imageRessort.style.transform = `scaleY(${expandedHeight / currentHeight})`; // Retour à l'échelle initiale après un autre délai
  }, 700); // Délai de 600ms

   setTimeout(() => {
     imageRessort.style.transform = "scaleY(1)"; // Retour à la taille initiale après un autre délai
   }, 900); // Délai de 900ms
});
