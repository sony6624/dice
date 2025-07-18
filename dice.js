let currentPlayer = 1;

const rollBtn = document.querySelector('#roll-btn');
const holdBtn = document.querySelector('#hold-btn');
const resetBtn = document.querySelector('#reset-btn');
const newGameBtn = document.querySelector('#newgame-btn');

let gameActive = true;

rollBtn.addEventListener('click', () => {
    if (!gameActive) return;
    const diceImg = document.querySelector('#dice-img');
    // Animate dice roll
    diceImg.style.transition = 'transform 0.3s';
    diceImg.style.transform = 'rotate(360deg) scale(1.2)';
    setTimeout(() => {
        let number = Math.floor(Math.random() * 6) + 1;
        let imgSrc = "./" + number + '.png';
        diceImg.setAttribute('src', imgSrc);
        diceImg.style.transform = 'rotate(0deg) scale(1)';

        if (number === 1) {
            setCurrentScore(0);
            switchPlayer();
        } else {
            addCurrentScore(number);
        }
    }, 200);
});

holdBtn.addEventListener('click', () => {
    if (!gameActive) return;
    let scoreId = '#score-player' + currentPlayer;
    const score = document.querySelector(scoreId);
    let currentPlayerId = '#current-player' + currentPlayer;
    const currentPlayerScore = document.querySelector(currentPlayerId);
    score.textContent = parseInt(score.textContent) + parseInt(currentPlayerScore.textContent);
    currentPlayerScore.textContent = 0;
    if (parseInt(score.textContent) >= 100) {
        const message = document.querySelector('#message');
        message.textContent = `Player ${currentPlayer} Won !!!`;
        message.style.background = 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)';
        message.style.color = '#222';
        gameActive = false;
    } else {
        switchPlayer();
    }
});


function setCurrentScore(val) {
    let currentPlayerId = '#current-player' + currentPlayer;
    document.querySelector(currentPlayerId).textContent = val;
}

function addCurrentScore(val) {
    let currentPlayerId = '#current-player' + currentPlayer;
    const currentPlayerScore = document.querySelector(currentPlayerId);
    currentPlayerScore.textContent = parseInt(currentPlayerScore.textContent) + val;
}

function switchPlayer() {
    setCurrentScore(0);
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updateActivePlayerUI();
    const message = document.querySelector('#message');
    message.textContent = `Player ${currentPlayer}'s turn!`;
}

function updateActivePlayerUI() {
    document.getElementById('player1').classList.toggle('active', currentPlayer === 1);
    document.getElementById('player2').classList.toggle('active', currentPlayer === 2);
}

function resetScores() {
    document.querySelector('#score-player1').textContent = 0;
    document.querySelector('#current-player1').textContent = 0;
    document.querySelector('#score-player2').textContent = 0;
    document.querySelector('#current-player2').textContent = 0;
}

function resetGame() {
    resetScores();
    currentPlayer = 1;
    gameActive = true;
    updateActivePlayerUI();
    const message = document.querySelector('#message');
    message.textContent = "Player 1's turn!";
    message.style.background = 'rgba(255,255,255,0.5)';
    message.style.color = '#333';
    document.querySelector('#dice-img').setAttribute('src', '1.png');
}

resetBtn.addEventListener('click', () => {
    resetGame();
});

newGameBtn.addEventListener('click', () => {
    resetGame();
});

// Initialize UI
resetGame();