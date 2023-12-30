//board
let board;
let boardWidth = 352;
let boardHeigh = 237;
let context;

//Sarah
let sarahWidth = 80;
let sarahHeight = 150;
let sarahX = 30;
let sarahY = boardHeigh - sarahHeight;
let sarahImg;

let sarah = {
  x : sarahX,
  y : sarahY,
  width : sarahWidth,
  height : sarahHeight
}

//obstacles
let obstacleArray = [];

let obstacle1Width = 70;
let obstacle2Width = 90;
let obstacle3Width = 100;

let obstacleHeight = 70;
let obstacleX = 700;
let obstacleY = boardHeigh - obstacleHeight;

let obstacle1Img;
let obstacle2Img;
let obstacle3Img;

//physics
let velocityX = -1.5; //obstacle moving
let velocityY = 0;
let gravity = .05;

let gameOver = false;
let score = 0;



const bouton = document.getElementById('boutonSaut');


window.onload = function() {
  board = document.getElementById("board");
  board.height = boardHeigh;
  board.width = boardWidth;

  context = board.getContext("2d"); //used for drawing on the board

  //draw initial sarah
  //context.fillStyle="green";
//  context.fillRect(sarah.x, sarah.y, sarah.width, sarah.height);

  sarahImg = new Image();
  sarahImg.src = "img/muscles-course3.png";
  sarahImg.onload = function(){
    context.drawImage(sarahImg, sarah.x, sarah.y, sarah.width, sarah.height);
  }

  obstacle1Img = new Image();
  obstacle1Img.src = "img/muscles-obstacle1.png";

  obstacle2Img = new Image();
  obstacle2Img.src = "img/muscles-obstacle2.png";

  obstacle3Img = new Image();
  obstacle3Img.src = "img/muscles-obstacle3.png";

  requestAnimationFrame(update);
  setInterval(placeObstacle, 1000); //1000milliseconds = 1sec
  document.addEventListener('click', moveSarah);

}

function update(){
  requestAnimationFrame(update);

  if (gameOver) {
    return;
  }

  context.clearRect(0,0, board.width, board.height);

  //sarah
  velocityY += gravity;
  sarah.y = Math.min(sarah.y + velocityY, sarahY); //apply gravity to current sarah.y
  context.drawImage(sarahImg, sarah.x, sarah.y, sarah.width, sarah.height);

  //obstacle
  for (let i = 0; i < obstacleArray.length; i++){
    let obstacle = obstacleArray[i];
    obstacle.x += velocityX;
    context.drawImage(obstacle.img, obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    if (detectCollision(sarah, obstacle)) {
      gameOver = true;
      sarahImg.src = "img/muscles-game-over2.png";
      sarahImg.onload = function() {
        context.drawImage(sarahImg, sarah.x, sarah.y, sarah.width, sarah.height);
      }
    }

    if ((sarahY === boardHeigh - sarahHeight) && !gameOver) {
      sarahImg.src = "img/muscles-course3.png";
      sarahImg.onload = function() {
      context.drawImage(sarahImg, sarah.x, sarah.y, sarah.width, sarah.height);
  }

}
console.log(sarahY);

  }

//score
  context.fillStyle="black";
  context.font="20px lora";
  score++;
  context.fillText(score,150,20);

}

function moveSarah(e) {
  if (gameOver) {
    return;
  }
  if ((event.button === 0) && sarah.y == sarahY) {
    //jump
    velocityY = -5;
    console.log('Clic gauche de la souris détecté sur le bouton');


    sarahImg.src = "img/muscles-saut.png";
    sarahImg.onload = function() {
      context.drawImage(sarahImg, sarah.x, sarah.y, sarah.width, sarah.height);
    }
  }
}

function placeObstacle() {

  if (gameOver) {
    const messageText = document.getElementById('messageText');
messageText.innerHTML = `Dommage, c'est perdu !<br>Votre score est de <strong>${score}.</strong>`;
    const messageBox = document.getElementById('messageBox');
    messageBox.style.display = 'block';
    return;
  }
//place obstacle
  let obstacle = {
    img : null,
    x : obstacleX,
    y : obstacleY,
    width : null,
    height : obstacleHeight
  }

    let placeObstacleChance = Math.random(); //o - 0.99999...

    if (placeObstacleChance > 0.90) { //10% you get obstacle3
      obstacle.img = obstacle3Img;
      obstacle.width = obstacle3Width;
      obstacleArray.push(obstacle);
    }
    else if (placeObstacleChance > 0.70) { //30% you get obstacle2
      obstacle.img = obstacle2Img;
      obstacle.width = obstacle2Width;
      obstacleArray.push(obstacle);
    }
    else if (placeObstacleChance > 0.50){ //50% you get obstacle1
      obstacle.img = obstacle1Img;
      obstacle.width = obstacle1Width;
      obstacleArray.push(obstacle);
    }

    if (obstacleArray.length > 5) {
      obstacleArray.shift(); //remove the first element from the array so that the arraw doesn't constantly grow
    }

}

function detectCollision(a, b) {
  return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}

function recommencer() {
  // Réinitialiser les variables de jeu
  console.log('recommencer');

  gameOver = false;
  score = 0;
  sarah.y = sarahY;
  obstacleArray = [];
  obstacleX = 700;

  // Réinitialiser les vitesses
  velocityX = -1.5;
  velocityY = 0;

  // Masquer le message de fin
  const messageBox = document.getElementById('messageBox');
  messageBox.style.display = 'none';

  // Effacer le canevas
  context.clearRect(0, 0, board.width, board.height);

  // Relancer le jeu
  requestAnimationFrame(update);
}
