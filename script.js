'use strict';
// Selecting elements
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const diceImg = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Current score and total score
let currentScore, activePlayer, totalScore, playing;
// fucntions
const initial = function () {
  currentScore = 0;
  activePlayer = 0;
  totalScore = [0, 0];
  playing = true;
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  diceImg.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
// Initial State
initial();

// Roll dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate random roll
    const randomDice = Math.trunc(Math.random() * 6) + 1;
    diceImg.src = `dice-${randomDice}.png`;
    // display dice roll
    diceImg.classList.remove('hidden');
    // check if dice is 1, if not?
    if (randomDice !== 1) {
      // add dice rool to current score of active player
      currentScore += randomDice;
      // display new score
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold score
btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to the total score
    document.getElementById(`score--${activePlayer}`).textContent = totalScore[
      activePlayer
    ] += currentScore;
    // check if total score of active player is 100
    if (totalScore[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      // swtich player
      switchPlayer();
    }
  }
});

// New Game || reset game
btnNew.addEventListener('click', initial);
