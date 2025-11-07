// Player factory function
const Player = (name, mark) => {
    return {name, mark,}
}

// GameBoard module
const GameBoard = (() => {
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
            cell.push(`${i}`);
        }
    }

    // set mark in specific position
    const setMark = (mark, position) => {
        if (cell[position] === 'X' || cell[position] === 'O') {
            gameTitle = "Space occupied";
            console.log("Space occupied!");
            return false;
        } else {
            cell.splice(position, 1, mark)
            return true;
        }
    }
    // display cells in terminal
    const displayBoard = function(){
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

    return {cell, player1, player2, createBoard, setMark, displayBoard, clearBoard,}
})();

const GameControl = (() => {
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
                console.log(`${winner.name}(${winner.mark})has won the game!`);
                gameOver = true 
            }
        })
    }

    // check for turns
    const turns = () => {

        if (gameOver) return console.log("Game Over!!!");

        const currentPlayer = (count % 2 === 0) ? GameBoard.player1: GameBoard.player2;
        const position = prompt(`${currentPlayer.name} ${currentPlayer.mark} enter position (0-8)`);

        if (position < 0 || position > 8 || !GameBoard.setMark(currentPlayer.mark, position)) {
            console.log("Invalid move, try again.");
            return turns();
        }

        GameBoard.displayBoard();
        checkWinner();

        if (count >= 9) gameOver = true;
        count++;
        turns()
    }
    const reset = () => {
        GameBoard.clearBoard();
        GameBoard.createBoard();
        gameOver = false;
        count = 0;
        turns();
    }
    return {turns, reset,}
})();

GameBoard.createBoard();
GameControl.turns();
