const size = 100;
const board = document.querySelector(`#game`);
const zombi = document.createElement(`div`);
let score = 0;
let zombiTimer;

zombi.classList.add(`zombi`);
zombi.addEventListener(`click`, hit);
board.appendChild(zombi);

function getRamdomWithLimit(limit) {
    let ramdom = Math.random();
    if (limit * ramdom + size > limit) {
        ramdom = getRamdomWithLimit(limit);
    }
    return ramdom;
}

function updatePosition() {
    let randX = getRamdomWithLimit(board.clientWidth);
    let randY = getRamdomWithLimit(board.clientHeight);
    zombi.style = 'top: ' + randY * 100 + '%; left: ' + randX * 100 + '%;';

    zombiTimer = setTimeout(() => {
        canHit = false;
        zombi.classList.add('disappear');

        setTimeout(() => {
            zombi.classList.remove('disappear');
            update();
        }, 300);
    }, 1000);
}

function hit() {
    if (canHit) {
        canHit = false;
        score++;
        zombi.classList.add('hit');
        clearTimeout(zombiTimer);
        setTimeout(() => {
            zombi.classList.remove('hit');
            update();
        }, 400);
    }
}

function update() {
    canHit = true;
    updatePosition();
    document.querySelector('#status').innerHTML = 'score' + score;
}

update();