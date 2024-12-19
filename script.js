let boxes = document.querySelectorAll(".game-button");
let restartBtn = document.querySelector("#restart-btn");
let newGameBtn = document.querySelector("#new-game-btn");
let messageContainer = document.querySelector(".message-container");
let gameMessage = document.querySelector("#game-message");

let count = 0; // to track if the game is a draw
let turnO = true; // playerX, playerO

// Create an Audio object for the clicking sound
const clickSound = new Audio("sound.mp3");

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Play the click sound
        clickSound.play();

        // Mark the box based on the current turn
        if (turnO) {
            box.innerText = "🍎";
            turnO = false;
        } else {
            box.innerText = "🍒";
            turnO = true;
        }

        // Disable the box after it's clicked
        box.disabled = true;
        count++;

        // Check for a winner or a draw
        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    gameMessage.innerText = `Game was a Draw🤝`;
    messageContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    gameMessage.innerText = `Congrats🏆, winner is ${winner}`;
    messageContainer.classList.remove("hide");
    disableBoxes();
};

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    messageContainer.classList.add("hide");
};

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};

newGameBtn.addEventListener("click", resetGame);
restartBtn.addEventListener("click", resetGame);
