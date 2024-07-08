const popUp = document.getElementById("pop-up");
const defaultDiceImg = 'images/dice-0.png';
const closeButton = document.getElementById("close-pop-up");

let rollCount = 0;

/*
---------------------------------------
Define Player Object
---------------------------------------
*/

function Player(name) {
  this.roundScore = 0;
  this.gameScore = 0;
}

// New object - Player constructor
const user = new Player("User");
const computer = new Player("Computer");


// Initial states
popUp.style.display = "none";

/*
---------------------------------------
my function - random dice roll
---------------------------------------
*/
function rollDice() {
  if (rollCount < 3) {
    const firstRandomNum = Math.floor(Math.random() * 6) + 1;
    const secondRandomNum = Math.floor(Math.random() * 6) + 1;
    const thirdRandomNum = Math.floor(Math.random() * 6) + 1;
    const fourthRandomNum = Math.floor(Math.random() * 6) + 1;

    const firstDiceImg = 'images/dice-' + firstRandomNum + '.png';
    const secondDiceImg = 'images/dice-' + secondRandomNum + '.png';
    const thirdDiceImg = 'images/dice-' + thirdRandomNum + '.png';
    const fourthDiceImg = 'images/dice-' + fourthRandomNum + '.png';

    $('#dice1 img').attr('src', firstDiceImg).attr('alt', 'Dice ' + firstRandomNum);
    $('#dice2 img').attr('src', secondDiceImg).attr('alt', 'Dice ' + secondRandomNum);
    $('#dice3 img').attr('src', thirdDiceImg).attr('alt', 'Dice ' + thirdRandomNum);
    $('#dice4 img').attr('src', fourthDiceImg).attr('alt', 'Dice ' + fourthRandomNum);

    // double the score User + Comp
    const rollSumUser = firstRandomNum + secondRandomNum;
    const rollSumComp = thirdRandomNum + fourthRandomNum;

    // Check if user's dice combination is [1, 6], [6, 1] or [1, 1]
    if (
      (firstRandomNum === 1 && secondRandomNum === 6) ||
      (firstRandomNum === 6 && secondRandomNum === 1) ||
      (firstRandomNum === 1 && secondRandomNum === 1)
    ) {
      user.roundScore = 0;
    } else if (firstRandomNum === secondRandomNum) {
      user.roundScore = rollSumUser * 2;
    } else {
      user.roundScore = rollSumUser;
    }

    // Check if computer's dice combination is [1, 6], [6, 1] or [1, 1]
    if (
      (thirdRandomNum === 1 && fourthRandomNum === 6) ||
      (thirdRandomNum === 6 && fourthRandomNum === 1) ||
      (thirdRandomNum === 1 && fourthRandomNum === 1)
    ) {
      computer.roundScore = 0;
    } else if (thirdRandomNum === fourthRandomNum) {
      computer.roundScore = rollSumComp * 2;
    } else {
      computer.roundScore = rollSumComp;
    }

    // render the score User + Comp
    $('#player-score').text(user.roundScore);
    $('#comp-score').text(computer.roundScore);

    // render the game score User + Comp
    user.gameScore += user.roundScore;
    computer.gameScore += computer.roundScore;

    $('#player-game-score').text(user.gameScore);
    $('#comp-game-score').text(computer.gameScore);

    rollCount++;

    // Third roll check
    if (rollCount === 3) {
      $('#player-game-score').text(user.gameScore);
      $('#comp-game-score').text(computer.gameScore);
      if (user.gameScore === computer.gameScore) {
        popUp.style.display = "block";
        $('.popup-text').text('DRAW');
      } else if (user.gameScore > computer.gameScore) {
        popUp.style.display = "block";
        $('.popup-text').text('You won!');
      } else {
        popUp.style.display = "block";
        $('.popup-text').text('Computer won!');
      }
      user.roundScore = 0;
      computer.roundScore = 0;
      user.gameScore = 0;
      computer.gameScore = 0;
      rollCount = 0;
    }
  }
}

$('#roll-dice').on('click', rollDice);

/*
---------------------------------------
New game start on click
---------------------------------------
*/

$('#new-game').on('click', function () {

  $('#dice1 img').attr('src', defaultDiceImg).attr('alt', 'Dice-0');
  $('#dice2 img').attr('src', defaultDiceImg).attr('alt', 'Dice-0');
  $('#dice3 img').attr('src', defaultDiceImg).attr('alt', 'Dice-0');
  $('#dice4 img').attr('src', defaultDiceImg).attr('alt', 'Dice-0');
  rollCount = 0;
  user.roundScore = 0;
  computer.roundScore = 0;
  user.gameScore = 0;
  computer.gameScore = 0;
  rollSumUser = 0;
  rollSumComp = 0;
  $('#player-game-score').text(user.gameScore);
  $('#comp-game-score').text(computer.gameScore);
  $('#player-score').text(rollSumUser);
  $('#comp-score').text(rollSumComp);
});

// Pop up
closeButton.addEventListener('click', function () {
  popUp.style.display = "none";
});



