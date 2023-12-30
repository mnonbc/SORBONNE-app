const questions = [
  {
    question: "1/ En moyenne par jour, je réalise des activités physiques d’intensité modérée à soutenue (marche, vélo, faire du sport, des jeux extérieurs…) tout au long de la semaine\u00A0:",
    options: ["Moins de 30 minutes par jour", "Entre 30 et 60 minutes par jour", "Plus de 60 minutes par jour"]
  },
  {
    question: "2/ Je consacre du temps dans la semaine pour faire des activités d’endurance d’intensité soutenue et de renforcement musculaire (sauts à la corde, jeux de poursuite, pompes, squats…)\u00A0:",
    options: ["Jamais", "1 fois par semaine", "2 fois par semaine", "3 fois ou plus par semaine"]
  },
  // Ajoutez d'autres questions ici
];


let currentQuestion = 0;
let answers = [];

function afficherQuestion() {
  const questionText = document.getElementById('question-text');
  const form = document.getElementById('question-form');
  const validerBtn = document.getElementById('valider');

  questionText.textContent = questions[currentQuestion].question;
  form.innerHTML = '';

  questions[currentQuestion].options.forEach((option, index) => {
    const input = document.createElement('input');
    input.type = 'radio';
    input.id = `option_${index}`;
    input.name = 'question';
    input.value = option;

    const label = document.createElement('label');
    label.setAttribute('for', `option_${index}`);
    label.textContent = option;

    const br = document.createElement('br');

    form.appendChild(input);
    form.appendChild(label);
    form.appendChild(br);
  });

  validerBtn.style.display = 'block';

  if (currentQuestion === questions.length - 1) {
    validerBtn.textContent = 'Voir Résultat';
  } else {
    validerBtn.textContent = 'Valider';
  }
}

function suivant() {
  const options = document.querySelectorAll('input[type="radio"]:checked');
  if (options.length > 0) {
    answers.push(options[0].value);
  } else {
    answers.push(null);
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    afficherQuestion();
  } else {
    afficherResultat();
  }
}

function afficherResultat() {
  const questionContainer = document.getElementById('question-container');
  const resultat = document.getElementById('resultat');
  const resultatContainer = document.querySelector('.resultat-container');

  questionContainer.style.display = 'none';
  resultat.style.display = 'block';

  let resultHTML = '<h1>Résultat Final :</h1>';

  const reponsesSuccessives = answers.join(',');
  if (reponsesSuccessives === 'Moins de 30 minutes par jour,Jamais') {
    resultHTML += "<p>T'es un gros flemmard qu'est-ce que tu veux ...</p>";
  } else if (reponsesSuccessives === 'Entre 30 et 60 minutes par jour,1 fois par semaine') {
    resultHTML += "<p>T'es dans la moyenne basse, bouge toi un peu...</p>";
  } else if (reponsesSuccessives === 'Entre 30 et 60 minutes par jour,2 fois par semaine') {
    resultHTML += "<p>T'es dans la moyenne haute, ça va.</p>";
  } else if (reponsesSuccessives === 'Plus de 60 minutes par jour,3 fois ou plus par semaine') {
    resultHTML += "<p>Bravo champion, t'es un vrai costaud !</p>";
  } else {
    questions.forEach((question, index) => {
      resultHTML += "<p>erreur</p>";

    //  resultHTML += `<li>${question.question}: ${answers[index]}</li>`;
    });
  }


  resultatContainer.innerHTML = resultHTML; // Insérer le contenu dans la div resultatContainer
  resultatContainer.style.display = 'block'; // Assurer que la div est affichée
}

afficherQuestion();
