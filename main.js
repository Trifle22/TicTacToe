let game = document.querySelector('.game');
let queue = document.querySelector('.queue')
let restart = document.querySelector('.restart');

let win_x = document.querySelector('.win-x');
let win_0 = document.querySelector('.win-0');

let win_draw = document.querySelector('.win-draw');
let cells = document.querySelectorAll('.cell');

let player = 'x';
let paused = false;
let data = [];
let win = {x: 0, '0': 0, draw: 0};

let stepCount = 0;
let winIndex = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [1,4,7],
  [0,3,6],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];

for (let i = 0; i < cells.length; i++) {
  addEvent(cells[i]);
}

restart.addEventListener('click', gameRestart);


function addEvent(cell) {
  cell.addEventListener('click', step);

  function step() {
    if (!cell.innerHTML && !paused) {
      cell.innerHTML = player;

      let id = cell.getAttribute('data-id');
      data[id] = player;
      stepCount++;
      if (checkWin()) {
        queue.innerHTML = 'Выиграл: ' + player;
        win[player]++;
        stepCount = 0;
        paused = true;
      } else {
        changePlayer();
      }
      if (stepCount >= 9) {
        win.draw++;
        stepCount = 0;
        queue.innerHTML = 'Ничья';
      }
      updateResults();
    }
  }
}

function checkWin() {
  for (let i = 0; i < winIndex.length; i++) {
    let id = winIndex[i];
    let check = data[id[0]] && data[id[0]] == data[id[1]] &&
    data[id[1]] == data[id[2]];

    if (check) {
      return true;
    }
  }
  return false;
}

function changePlayer() {
  if (player === 'x') {
    player = '0';
  } else {
    player = 'x';
  }
  queue.innerHTML = 'Ходит: ' + player;
}

function clear() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = '';
  }
}

function gameRestart() {
  clear();
  changePlayer();
  data = [];
  paused = false;
}

function updateResults() {
  win_x.innerHTML = win.x;
  win_0.innerHTML = win['0'];
  win_draw.innerHTML = win.draw;
}
