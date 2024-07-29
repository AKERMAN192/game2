










const gameContainer = document.querySelector('.game-container');
const player = document.querySelector('.player');
let playerX = gameContainer.offsetWidth / 2 - player.offsetWidth / 2;
let playerY = gameContainer.offsetHeight - player.offsetHeight;

const obstacleWidth = 50;
const obstacleHeight = 50;
const obstaclesContainer = document.querySelector('.obstacles-container');

const gameWidth = window.innerWidth - 400;
const gameHeight = window.innerHeight;

let currentLevel = 1;
let obstacleSpeed;
let obstacleInterval;
let obstacleCount;
let remainingObstacles;
let totalObstaclesPassed = 0;

let startTime;
let elapsedTime = 0;

function goToHomePage() {
    window.location.href = 'index.html';
}

function startLevel() {
    switch (currentLevel) {
        case 1:
            obstacleSpeed = 5;
            obstacleCount = 30;
            obstacleInterval = 1000;
            break;
        case 2:
            obstacleSpeed = 8;
            obstacleCount = 45;
            obstacleInterval = 950;
            break;
        case 3:
            obstacleSpeed = 10;
            obstacleCount = 60;
            obstacleInterval = 900;
            break;
        case 4:
            obstacleSpeed = 14;
            obstacleCount = 75;
            obstacleInterval = 850;
            break;
        case 5:
            obstacleSpeed = 19;
            obstacleCount = 80;
            obstacleInterval = 800;
            break;
        case 6:
            obstacleSpeed = 24;
            obstacleCount = 95;
            obstacleInterval = 750;
            break;
        case 7:
            obstacleSpeed = 27;
            obstacleCount = 105;
            obstacleInterval = 700;
            break;
        case 8:
            obstacleSpeed = 31;
            obstacleCount = 120;
            obstacleInterval = 650;
            break;
        case 9:
            obstacleSpeed = 34;
            obstacleCount = 135;
            obstacleInterval = 600;
            break;
        case 10:
            obstacleSpeed = 36;
            obstacleCount = 150;
            obstacleInterval = 550;
            break;
    }


    remainingObstacles = obstacleCount;

    let delay = 0;
    for (let i = 0; i < obstacleCount; i += 4) {
        setTimeout(() => {
            for (let j = 0; j < 3; j++) {
                createObstacle();
            }
        }, delay);
        delay += obstacleInterval;
    }

    setInterval(createObstacle, obstacleInterval);
    moveObstacles();
}

function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = `${Math.random() * (gameWidth - obstacleWidth)}px`;
    obstacle.style.top = `-${obstacleHeight}px`;
    obstacle.style.width = `${obstacleWidth}px`;
    obstacle.style.height = `${obstacleHeight}px`;
    obstaclesContainer.appendChild(obstacle);
}

function moveObstacles() {
    const obstacleElements = document.querySelectorAll('.obstacle');
    obstacleElements.forEach(obstacle => {
        obstacle.style.top = `${parseInt(obstacle.style.top) + obstacleSpeed}px`;
        if (parseInt(obstacle.style.top) > gameHeight) {
            obstaclesContainer.removeChild(obstacle);
            remainingObstacles--;
            totalObstaclesPassed++;

            if (remainingObstacles === 0) {
                if (currentLevel === 10) {
                    alert(`Congratulations! You completed all levels in ${elapsedTime / 1000} seconds.`);
                    goToHomePage();
                } else {
                    currentLevel++;
                    startLevel();
                }
            }
        }
        if (isColliding(player, obstacle)) {
            alert('Game Over!');
            goToHomePage();
        }
    });
    requestAnimationFrame(moveObstacles);
}

function isColliding(a, b) {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();

    return !(
        aRect.bottom < bRect.top ||
        aRect.top > bRect.bottom ||
        aRect.right < bRect.left ||
        aRect.left > bRect.right
    );
}

function startTimer() {
    startTime = new Date().getTime();
    updateTimer();
}

function updateTimer() {
    const currentTime = new Date().getTime();
    elapsedTime = currentTime - startTime;
    const seconds = Math.floor(elapsedTime / 1000);
    const milliseconds = elapsedTime % 1000;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `Time: ${seconds}.${milliseconds.toString().padStart(3, '0')}`;
    requestAnimationFrame(updateTimer);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft') {
        playerX = Math.max(0, playerX - 50);
        player.classList.remove('player-right');
    } else if (event.code === 'ArrowRight') {
        playerX = Math.min(gameWidth - player.offsetWidth, playerX + 50);
        player.classList.add('player-right');
    } else if (event.code === 'ArrowUp') {
        playerY = Math.max(0, playerY - 50);
    } else if (event.code === 'ArrowDown') {
        playerY = Math.min(gameHeight - player.offsetHeight, playerY + 50);
    }
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;
});

startLevel();
startTimer();