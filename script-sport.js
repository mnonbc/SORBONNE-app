const questions = [
  {
    question: "1/ Pour aller à l’école ou voir des amis, combien de jours dans la semaine te déplaces-tu à vélo, à trottinette (non-électrique), en skate ou en roller\u00A0?",
    options: ["Jamais", "1 fois par semaine", "Entre 2 et 4 fois par semaine", "Plus de 4 fois par semaine"]
  },
  {
    question: "2/ En moyenne, par jour, combien de temps te prennent tes trajets à pied, à vélo, en trottinette (non-électrique), en skate ou en roller\u00A0?",
    options: ["Moins de 5 min par jour", "Entre 5 et 15 min par jour", "Entre 15 et 25 min par jour", "Plus de 25 min par jour"]
  },
  {
    question: "3/ Quand tu es à l’école, tu as cours d’EPS en moyenne\u00A0:",
    options: ["Je n’ai pas de cours d’EPS car je suis dispensé", "2h par semaine", "3h par semaine", "4h par semaine ou plus"]
  },
  {
    question: "4/ Quand je suis à l’école, pendant les récréations et la pause déjeuner, il t’arrive de jouer à des jeux de ballon, au ping-pong ou de danser\u00A0:",
    options: ["Jamais", "1 jour par semaine", "Entre 2 et 4 jours par semaine", "5 jour ou plus par semaine"]
  },
  {
    question: "5/ Quand tu joues à des jeux de ballon, au ping-pong ou quand tu danses, combien de temps en moyenne cela te prend par jour\u00A0?",
    options: ["Je ne joue pas", "Entre 5 et 30min par jour", "Entre 30 et 50min par jour", "1h par jour ou plus"]
  },
  {
    question: "6/ Combien de jours dans la semaine pratiques-tu un ou plusieurs sports en club\u00A0?",
    options: ["Je n’en pratique pas", "1 jour par semaine", "Entre 2 et 3 jour par semaine", "4 jour ou plus par semaine"]
  },
  {
    question: "7/ Au total par semaine, le temps cumulé de cette ou ces activités sportives s’élève à\u00A0:",
    options: ["30min par semaine ou moins", "Entre 1h et 3h par semaine", "Entre 3h et 6h par semaine", "7h ou plus"]
  },
  {
    question: "8/ Pendant ton temps de loisir, combien de temps par semaine pratiques-tu une activité physique d’intensité modérée ou élevée (danse, vélo, piscine, VTT, course à pied, …)\u00A0?",
    options: ["Je n’en fais pas", "Entre 30min et 2h par semaine", "Entre 2h et 5h par semaine", "6h par semaine ou plus"]
  },
  {
    question: "9/ Pendant la semaine, en moyenne par jour, combien de temps passes-tu devant les écrans\u00A0? ",
    options: ["Plus de 3h par jour", "3h par jour", "2h par jour", "Moins d’1h par jour"]
  },
  {
    question: "10/ Pendant le week-end, en moyenne par jour, combien de temps passes-tu devant les écrans\u00A0?",
    options: ["Plus de 3h par jour", "3h par jour", "2h par jour", "Moins d’1h par jour"]
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
    input.classList.add('option-input'); // Ajoutez une classe aux options

    const label = document.createElement('label');
    label.setAttribute('for', `option_${index}`);
    label.textContent = option;

    const wrapper = document.createElement('div');
    wrapper.classList.add('option-wrapper');
    wrapper.appendChild(input);
    wrapper.appendChild(label);

    form.appendChild(wrapper);

    // Ajoutez un écouteur d'événements pour chaque option
    input.addEventListener('change', () => {
      clearOptionStyles();
      if (input.checked) {
                  label.style.backgroundColor = '#CCACDA';
                  label.style.border = '2px solid #CCACDA'; // Changez la couleur de la bordure ici
              } else {
                  label.style.backgroundColor = '#FFF';
                  label.style.border = '2px solid #FFF'; // Changez la couleur de la bordure ici
              }
    });
  });

  validerBtn.style.display = 'block';

  if (currentQuestion === questions.length - 1) {
    validerBtn.textContent = 'Voir Résultat';
  } else {
    validerBtn.textContent = 'Valider';
  }
}

function clearOptionStyles() {
  const labels = document.querySelectorAll('.option-wrapper label');
  labels.forEach((label) => {
    label.style.backgroundColor = '#FFF'; // Fond noir par défaut
  });
}



function suivant() {
  const options = document.querySelectorAll('input[type="radio"]:checked');
  if (options.length > 0) {
    answers.push(options[0].value);
  } else {
    answers.push(null);
  }

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
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

  const optionsCount = questions[0].options.length; // Utilisation de la longueur des options de la première question pour uniformiser

  const optionsTally = new Array(optionsCount).fill(0);

  answers.forEach((answer) => {
    const answerIndex = questions[currentQuestion].options.indexOf(answer);
    optionsTally[answerIndex]++;
  });

  const maxIndex = optionsTally.indexOf(Math.max(...optionsTally));

  let resultHTML = '<h1>Résultat Final :</h1>';

  if (maxIndex === 0) {
    resultHTML += "<p>T'es un gros flemmard qu'est-ce que tu veux ...</p>";
  } else if (maxIndex === 1) {
    resultHTML += "<p>T'es dans la moyenne basse, bouge toi un peu...</p>";
  } else if (maxIndex === 2) {
    resultHTML += "<p>T'es dans la moyenne haute, ça va.</p>";
  } else if (maxIndex === 3) {
    resultHTML += "<p>Bravo champion, t'es un vrai costaud !</p>";
  } else {
    resultHTML += "<p>Erreur dans les réponses.</p>";
  }

  resultatContainer.innerHTML = resultHTML;
  resultatContainer.style.display = 'block';
}

afficherQuestion();
