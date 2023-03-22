// Déclaration des variables	
let round1 = 0;
let global1 = 0;
let round2 = 0;
let global2 = 90;
let activePlayer = 0;
let dice = 0;
let endGame = 0;


const btnRoll1 = document.getElementById('roll-1');
const btnHold1 = document.getElementById('hold-1');
const btnRoll2 = document.getElementById('roll-2');
const btnHold2 = document.getElementById('hold-2');


// affiche message sous le bouton NEW GAME durant la partie
function afficheMessage(message) {
  document.getElementById("message").innerHTML = message;
}


// afficher le cercle rouge indiquant le joueur actif
function showCircle(player) {
  if (player == 1) {
    document.getElementById("circle-1").className = "circle-red";
    document.getElementById("circle-2").className = "circle-white";

  }
  else if (player == 2) {
    document.getElementById("circle-1").className = "circle-white";
    document.getElementById("circle-2").className = "circle-red";

  }
  else { // au lancement du jeu il n'y a pas de joueur 1 ou 2 ==> on peut alors commencer avec le joueur 2
    document.getElementById("circle-1").className = "circle-white";
    document.getElementById("circle-2").className = "circle-white";
  }

}


// Jet du dé et affichage de la face du dé
function rollDice() {
  dice = Math.floor(Math.random() * 6) + 1;
  document.getElementById("dice").src = "img/" + dice + ".jpg";
  rollDiceIsOne(activePlayer);
}


// Si jet du dé est égal à 1
function rollDiceIsOne(player) {
  if (dice == 1 && player == 1) {
    round1 = 0;
    dice=0;
    document.getElementById("round-1").innerHTML = round1;
    btnRoll1.style.display = 'none';
    btnHold1.style.display = 'none';
    btnRoll2.style.display = 'inline-block';
    btnHold2.style.display = 'inline-block';
    activePlayer = 2;
    
    
  } else if (dice == 1 && player == 2) {
    round2 = 0;
    dice=0;
    document.getElementById("round-2").innerHTML = round2;
    btnRoll1.style.display = 'inline-block';
    btnHold1.style.display = 'inline-block';
    btnRoll2.style.display = 'none';
    btnHold2.style.display = 'none';
    activePlayer = 1;
    
  }
  round(activePlayer);
  showCircle(activePlayer);
  afficheMessage("A vous de jouer Joueur " + activePlayer);
}

// affiche le round (score temporaire) du joueur actif
function round(player) {
  if (player == 1) {
    
    document.getElementById("round-1").innerHTML = round1 + dice;
    round1 = round1 + dice;
    activePlayer = 1;
  }
  else if (player == 2) {
    document.getElementById("round-2").innerHTML = round2 + dice;
    round2 = round2 + dice;
    activePlayer=2;
  }
}

// Jet du dé 
function player(player) {
  if (player == 1) {
    activePlayer = 1;
  }
  else {
    activePlayer = 2;
  }
  showCircle(activePlayer);
  afficheMessage("A vous de jouer Joueur " + activePlayer)
  rollDice();
}


// Ajout du round (score temporaire) au score global
function hold(player) {
  if (player == 1) {
    global1 = global1 + round1;
    document.getElementById("global-1").innerHTML = global1;
    round1 = 0;
    document.getElementById("round-1").innerHTML = 0;
    btnRoll1.style.display = 'none';
    btnHold1.style.display = 'none';
    btnRoll2.style.display = 'inline-block';
    btnHold2.style.display = 'inline-block';

    if (global1 >= 100) { // Controle si le joueur 1 à gagné
      alert("Le joueur 1 a gagné !!!. \n Le score est de : " + global1 + " à " + global2);
      endGame = 1;   
      btnRoll1.style.display = 'none';
      btnHold1.style.display = 'none';
      btnRoll2.style.display = 'none';
      btnHold2.style.display = 'none';
    }
    activePlayer = 2;

  } else if (player == 2) {
    global2 = global2 + round2;
    document.getElementById("global-2").innerHTML = global2;
    round2 = 0;
    document.getElementById("round-2").innerHTML = 0;
    btnRoll1.style.display = 'inline-block';
    btnHold1.style.display = 'inline-block';
    btnRoll2.style.display = 'none';
    btnHold2.style.display = 'none';

    if (global2 >= 100) { // Controle si le joueur 2 à gagné
      alert("Le joueur 2 a gagné !!!. \n Le score est de : " + global2 + " à " + global1);
      endGame = 1;
      btnRoll1.style.display = 'none';
      btnHold1.style.display = 'none';
      btnRoll2.style.display = 'none';
      btnHold2.style.display = 'none';
    }
    activePlayer = 1;
  }

  showCircle(activePlayer);
  afficheMessage("A vous de jouer Joueur " + activePlayer)
  if (endGame == 1) {
    newGame();
  }
}


afficheMessage("Commencer une nouvelle partie en cliquant sur NEW GAME");

// lancement et reset du jeu
function newGame() {
  round1 = 0;
  global1 = 0;
  round2 = 0;
  global2 = 90;
  activePlayer = 0;// 0 = Joueur inexistant => pas de cercle rouge affichée
  dice = 0;
  endGame = 0;
  showCircle(activePlayer);
  afficheMessage("Lancer le dé d'un des deux joueurs");


  //reset de l'affichage des round, global et image sur la face 1
  document.getElementById("round-1").innerHTML = 0;
  document.getElementById("round-2").innerHTML = 0;
  document.getElementById("global-1").innerHTML = 0;
  document.getElementById("global-2").innerHTML = 90;
  document.getElementById("dice").src = "img/1.jpg";

  
  // activation de tous les boutons
  btnRoll1.style.display = 'inline-block';
  btnHold1.style.display = 'inline-block';
  btnRoll2.style.display = 'inline-block';
  btnHold2.style.display = 'inline-block';

  
  
  // écoute des boutons lancer le dé et hold pur chaque joueur
  btnRoll1.addEventListener('click', () => { player(1) });
  btnHold1.addEventListener('click', () => { hold(1) });
  btnRoll2.addEventListener('click', () => { player(2) });
  btnHold2.addEventListener('click', () => { hold(2) });


}

document.getElementById("newgame").onclick = function () { newGame() };







