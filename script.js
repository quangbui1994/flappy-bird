const game = document.querySelector('#game');
const pipe = document.querySelector('#pipe');
const topPipe = document.querySelector('#top-pipe');
const bottomPipe = document.querySelector('#bottom-pipe');
const bird = document.querySelector('#bird');
const gameScreen = document.querySelector('#game-screen');
const score = document.querySelector('#score');

let isJumping;
let gameover;
let gamestart;
let start;
let count;
let random = 150;

startState();

function startState() {
    count = 0;
    isJumping = false;
    gameover = false;
    gamestart = false;

    bird.style.top = '50%';
    bird.style.left = '50%';
    pipe.style.left = '100%';
    pipe.style.removeProperty('animation-play-state');
    pipe.classList.remove('animate');
    gameScreen.style.opacity = 1;
    gameScreen.style.backgroundImage = "url('./img/start.png')";
    gameScreen.style.width = '184px';
    gameScreen.style.height = '267px';
    getScore(count);
}

document.addEventListener('click', () => {
    if (!gamestart && !gameover) {
        start = setInterval(() => {
            const birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue('top'));
            const leftPipe = parseInt(window.getComputedStyle(pipe).getPropertyValue('left')); 
            if (!isJumping && !gameover) {
                bird.style.top = (birdTop + 2) + 'px';
            }
            if (birdTop < 0 || birdTop > 388) {
                stopGame();
            }
            if (leftPipe > 75 && leftPipe < 161 && (birdTop < random || birdTop + 24 > random + 120)) {
                stopGame();
            };
        }, 10);

        gamestart = true;
        pipe.classList.add('animate');
        gameScreen.style.opacity = 0;
    } else if (gameover) {
        startState();
    } else {
        fly();
    };
});

pipe.addEventListener('animationiteration', () => {
    random = Math.random() * 200 + 80;
    topPipe.style.height = random + 'px';
    bottomPipe.style.top = random + 120 + 'px';
    count++;
    getScore(count);
});

function stopGame() {
    gameover = true;
    gamestart = false;
    bird.style.top = 388 + 'px';
    pipe.style.animationPlayState = 'paused';
    gameScreen.style.opacity = 1;
    gameScreen.style.backgroundImage = "url('./img/gameover.png')"; 
    gameScreen.style.width = '192px';
    gameScreen.style.height = '42px';
    clearInterval(start);
};

function fly() {
    let jumpCount = 0;
    let jump = setInterval(() => {
        let birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue('top'));
        if (jumpCount < 20) {
            jumpCount++;
            bird.style.top = (birdTop - 4) + 'px';
        }
    }, 10);
    if (jumpCount == 20) {
        clearInterval(jump);
        isJumping = false;
        jumpCount = 0;
    };
};

function getScore(count) {
    score.querySelectorAll('*').forEach(n => n.remove());
    let char = String(count).split('');
    char.forEach(el => {
        let scoreElement = document.createElement('div');
        scoreElement.setAttribute('class', 'scoreEl');
        scoreElement.style.backgroundImage = `url('./img/${el}.png')`;
        score.appendChild(scoreElement);
    });
};