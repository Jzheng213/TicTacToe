/* eslint-env browser */

const size = 3;
const winners = [];

let currentPlayer = 0;
let move = 0;
let points1 = 0;
let points2 = 0;

let player1Selections = [];
let player2Selections = [];

function loadAnswers() {
  winners.push([1, 2, 3]);
  winners.push([4, 5, 6]);
  winners.push([7, 8, 9]);
  winners.push([1, 4, 7]);
  winners.push([2, 5, 8]);
  winners.push([3, 6, 9]);
  winners.push([1, 5, 9]);
  winners.push([3, 5, 7]);
}

function reset() {
  currentPlayer = 0;
  player1Selections = [];
  player2Selections = [];
}

function checkWinner() {
  // check if current player has a winning hand
  // only start checking when player x has size number of selections

  let win = false;
  let playerSelections = [];

  if (currentPlayer === 0) {
    playerSelections = player1Selections;
  } else {
    playerSelections = player2Selections;
  }

  if (playerSelections.length >= size) {
    for (let i = 0; i < winners.length; i += 1) {
      const sets = winners[i];
      let setFound = true;

      for (let r = 0; r < sets.length; r += 1) {
        let found = false;

        for (let s = 0; s < playerSelections.length; s += 1) {
          if (sets[r] === playerSelections[s]) {
            found = true;
            break;
          }
        }

        if (found === false) {
          setFound = false;
          break;
        }
      }

      if (setFound === true) {
        win = true;
        break;
      }
    }
  }
  return win;
}

function clickCell() {
  if (currentPlayer === 0) {
    this.innerHTML = 'X';
    player1Selections.push(parseInt(this.id, 10));
    player1Selections.sort((a, b) => a - b);
  } else {
    this.innerHTML = 'O';
    player2Selections.push(parseInt(this.id, 10));
    player2Selections.sort((a, b) => a - b);
  }

  move += 1;

  const isWin = checkWinner();

  if (isWin) {
    if (currentPlayer === 0) {
      points1 += 1;
    } else {
      points2 += 1;
    }

    document.getElementById('player1').innerHTML = points1;
    document.getElementById('player2').innerHTML = points2;

    reset();
    drawBoard();
  } else if (player2Selections.length + player1Selections.length === 9) {
    reset();
    drawBoard();
  }
  if (currentPlayer === 0) {
    currentPlayer = 1;
  } else {
    currentPlayer = 0;
  }

  this.removeEventListener('click', clickCell);
}


function drawBoard() {
  const parent = document.getElementById('game');
  let counter = 1;

  while (parent.hasChildNodes()) {
    parent.removeChild(parent.firstChild);
  }

  for (let i = 0; i < 3; i += 1) {
    const row = document.createElement('tr');

    for (let x = 0; x < size; x += 1) {
      const col = document.createElement('td');
      col.id = counter;
      col.addEventListener('click', clickCell);
      row.appendChild(col);
      counter += 1;
    }

    parent.appendChild(row);
  }

  loadAnswers();
}

document.addEventListener('DOMContentLoaded', () => { drawBoard(); });
