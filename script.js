// Player factory function
const Player = (name, mark) => {
    return {name, mark,}
}

// GameBoard module
const GameBoard = (() => {
    // Capture DoM elements.
    const mainDiv = document.querySelector('.main');
    const gameBoard = document.querySelector('.board-container');
    const boardContainer = document.querySelectorAll('.cell');

    // create array to hold positions
    let cell = [];

    // create objects
    let playerOneName = `Steve`;
    let playerTwoName = `Gift`;     
        
    const player1 = Player(playerOneName, 'X');
    const player2 = Player(playerTwoName, 'O');

    // create game board
    const createBoard = () => {
        // create divs and push the to the gridContainer
        for (let i = 0; i < 9; i++) {
            boardContainer[i].textContent = " "; 
            cell.push(`${i}`);
        }
    }

    // set mark in specific position
    const setMark = (mark, position) => {
        if (cell[position] === 'X' || cell[position] === 'O') {
            console.log("Space occupied!");
            return false;
        } else {
            cell.splice(position, 1, mark);
            boardContainer[position].textContent = mark;
            return true;
        }
    }

    // display cells in terminal
    const displayBoard = function(){
        boardContainer.forEach((element) => {
            gameBoard.append(element);
        })
        console.log(`
            ${cell[0]}  | ${cell[1]}  |  ${cell[2]}
            _____________
            ${cell[3]}  | ${cell[4]}  |  ${cell[5]}
            _____________
            ${cell[6]}  | ${cell[7]}  |  ${cell[8]}
        `);
    }
    // Clear game board
    const clearBoard = () => cell.length = 0;

    return {mainDiv, gameBoard, boardContainer, cell, player1, player2, createBoard, setMark, displayBoard, clearBoard,}
})();

const GameControl = (() => {
    const title = document.querySelector('.header');
    // create and initialize count and gameOver
    let count = 0;
    let gameOver = false;

    // Winning array combinations
    const winningArray = [
        // Row winning combinations
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Column winning combinations
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonal winning combinations
        [0, 4, 8],
        [2, 4, 6]
    ]

    if (gameOver) {
        console.log("Game Over!!!");
        return;
    }

    // check the if there is a winner
    const checkWinner = () => {
        winningArray.forEach((combination) => {
            const [a, b, c] = combination;
            if (GameBoard.cell[a] !== " " && GameBoard.cell[a] === GameBoard.cell[b] && GameBoard.cell[a] === GameBoard.cell[c]) {
                const winner = GameBoard.cell[a] === GameBoard.player1.mark ? GameBoard.player1 :GameBoard.player2;
                title.textContent = `${winner.name} (${winner.mark})has won!`;
                console.log(`${winner.name}(${winner.mark})has won the game!`);
                gameOver = true
                return true; 
            }
        })
        return false;
    }

    // check for turns
    const turns = () => {
        GameBoard.mainDiv.addEventListener('click', (event) => {            
            switch(event.target.classList.value) {
                case "cell":
                    if (gameOver) return console.log("Game Over!!!");

                    const position = event.target.dataset.position;
                    const currentPlayer = (count % 2 === 0) ? GameBoard.player1: GameBoard.player2;
        
                    if (position == null) return;
        
                    if (position < 0 || position > 8 || !GameBoard.setMark(currentPlayer.mark, position)) {
                        console.log("Invalid move, try again.");
                        return;
                    }
                    GameBoard.displayBoard();
                    if (checkWinner()) {
                        GameBoard.gameBoard.removeEventListener('click');
                        gameOver = true;
                        return;
                    }
                    if (count == 8) {
                        title.textContent = "Draw!";
                        gameOver = true;
                        return;
                    }
                    count++;
                    break;

                case "reset":
                    console.log("Game reset");
                    reset();
                    break;

                default:
                    break;
            }
        })

    }
    const reset = () => {
        title.textContent = "TIC-TAC-TOE";
        GameBoard.clearBoard();
        GameBoard.createBoard();
        gameOver = false;
        count = 0;
    }
    return {turns, reset}
})();

GameBoard.createBoard();
GameControl.turns();
