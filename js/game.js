const playButton = document.getElementById('play-button');
const menu = document.getElementById('menu');
const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const highscoreDisplay = document.getElementById('highscore');
const congratulations = document.getElementById('congratulations');
const finalScoreDisplay = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

let score = 0;
let highscore = 0;
let time = 20;
let gameInterval;

playButton.addEventListener('click', startGame);
restartButton.addEventListener('click', resetGame);

function startGame() {
    menu.style.display = 'none';
    game.style.display = 'block';
    score = 0;
    time = 20;
    updateScore();
    updateTime();
    updateHighscore();
    gameInterval = setInterval(updateGame, 1000);
    generateSnowflakes();
}

function updateGame() {
    time--;
    updateTime();
    if (time <= 0) {
        endGame();
    }
}

function generateSnowflakes() {
    const snowflakeInterval = setInterval(() => {
        if (time <= 0) {
            clearInterval(snowflakeInterval);
            return;
        }
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = Math.random() * 90 + 'vw';
        snowflake.style.animationDuration = (Math.random() * 2 + 3) + 's'; // Время падения

        snowflake.addEventListener('click', () => {
            snowflake.classList.add('clicked');
            score++;
            updateScore();
            setTimeout(() => {
                snowflake.remove();
            }, 500);
        });

        game.appendChild(snowflake);

        setTimeout(() => {
            if (!snowflake.classList.contains('clicked')) {
                snowflake.remove();
            }
        }, (Math.random() * 2 + 3) * 1000); // Убрать снежинку после окончания анимации
    }, 500);
}

function updateScore() {
    scoreDisplay.textContent = `Бали: ${score}`;
}

function updateTime() {
    timeDisplay.textContent = `Час: ${time}`;
}

function updateHighscore() {
    highscoreDisplay.textContent = `Рекорд: ${highscore}`;
}

function endGame() {
    clearInterval(gameInterval);
    congratulations.style.display = 'block';
    finalScoreDisplay.textContent = `Балів: ${score}`;
    if (score > highscore) {
        highscore = score;
        updateHighscore();
    }
    const snowflakes = document.querySelectorAll('.snowflake');
    snowflakes.forEach(snowflake => snowflake.remove());
}

function resetGame() {
    congratulations.style.display = 'none';
    game.style.display = 'none';
    menu.style.display = 'flex';
}
