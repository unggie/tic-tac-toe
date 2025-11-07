# 🎮 Tic-Tac-Toe (JavaScript)

A fully functional **Tic-Tac-Toe game** built with **vanilla JavaScript**, using **factory functions** and the **module pattern (IIFE)** for clean and modular code design.  
The game allows two players to compete on a 3×3 grid, detects wins and draws, and includes a reset feature.

---

## 🧩 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Visual](#liveDemo)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
  - [Player Factory](#1-player-factory)
  - [GameBoard Module](#2-gameboard-module)
  - [GameControl Module](#3-gamecontrol-module)
- [Game Flow](#game-flow)
- [Reset Logic](#reset-logic)
- [Potential Improvements](#potential-improvements)
- [Technologies Used](#technologies-used)

---

## ⚡ Overview

This project demonstrates how to use **modular JavaScript design** to structure a small game cleanly and maintainably.  
It separates **data**, **logic**, and **DOM manipulation** into distinct, self-contained components — avoiding global variables and keeping the logic organized.

The gameplay is straightforward:
- Two players take turns placing **X** and **O** on a 3×3 grid.  
- The first player to align three marks (row, column, or diagonal) wins.  
- If all 9 cells are filled with no winner, the game declares a **draw**.  

---

## ✨ Features

✅ Modular architecture using the IIFE pattern  
✅ Two-player mode  
✅ Win and draw detection  
✅ Prevents invalid or duplicate moves  
✅ Console logging for debugging and internal game state  
✅ DOM-based UI updates  
✅ Reset functionality to restart the match  

---

## Visual
[Live Demo]( https://unggie.github.io/tic-tac-toe/)

---

## 🧱 Project Structure

```
📁 tic-tac-toe/
│
├── index.html          # Main HTML layout and containers
├── style.css           # Game board and theme styling
└── script.js           # Core game logic (this file)
```

The `script.js` file contains **three major components**:

1. **Player Factory**  
2. **GameBoard Module**  
3. **GameControl Module**

---

## ⚙️ How It Works

### 1️⃣ Player Factory

```js
const Player = (name, mark, card) => {
    return { name, mark, card };
};
```

The `Player` factory function creates and returns a player object with:
- `name`: the player's name  
- `mark`: the player’s symbol (X or O)  
- `card`: optional — used for styling or identifying player panels  

This provides an easy way to generate multiple player instances without using a class.

---

### 2️⃣ GameBoard Module

```js
const GameBoard = (() => {
    const mainDiv = document.querySelector('.main');
    const gameBoard = document.querySelector('.board-container');
    const boardContainer = document.querySelectorAll('.cell');
    let cell = [];

    const player1 = Player('Player1', 'X');
    const player2 = Player('Player2', 'O');
```
#### Responsibilities:
- **Store the board state** in the `cell` array  
- **Render the grid** by assigning marks (`X` or `O`) to HTML elements  
- **Prevent overwriting moves**  
- **Clear and recreate the board** on reset  

#### Key Methods:
| Method | Description |
|---------|--------------|
| `createBoard()` | Initializes a new 3×3 board |
| `setMark(mark, position)` | Places a mark if cell is free |
| `displayBoard()` | Logs and displays the board in the DOM |
| `clearBoard()` | Clears the internal board array |

Example:
```js
GameBoard.setMark('X', 4); // Places 'X' in the middle cell
```

---

### 3️⃣ GameControl Module

```js
const GameControl = (() => {
    const title = document.querySelector('.header');
    let count = 0;
    let gameOver = false;
```
#### Responsibilities:
- **Manage player turns**
- **Handle click events**
- **Check for win or draw conditions**
- **Reset the game state**

#### Core Logic:
| Function | Description |
|-----------|-------------|
| `turns()` | Sets up event listeners for player moves |
| `checkWinner()` | Checks the board against all 8 winning combinations |
| `reset()` | Clears the board and restarts the game |

#### Winning Combinations:
```js
const winningArray = [
  [0,1,2], [3,4,5], [6,7,8], // Rows
  [0,3,6], [1,4,7], [2,5,8], // Columns
  [0,4,8], [2,4,6]           // Diagonals
];
```

When a match is found, the header displays:  
> “Player1 (X) has won!”

---

## 🔄 Game Flow

1. The board is created with 9 cells.  
2. Players alternate turns — Player 1 uses **X**, Player 2 uses **O**.  
3. After each move:
   - The mark is placed on the board.
   - The `checkWinner()` function runs.
   - If no one wins and all 9 moves are used, the game declares a **Draw**.
4. Clicking the reset button calls `reset()` — which clears the state and DOM.

---

## ♻️ Reset Logic

```js
const reset = () => {
    title.textContent = "TIC-TAC-TOE";
    GameBoard.clearBoard();
    GameBoard.createBoard();
    gameOver = false;
    count = 0;
};
```
This:
- Resets the title  
- Clears and rebuilds the board array  
- Sets both players ready for a new round  

---

## 🧠 Potential Improvements

- Add **player name input prompts** or UI forms  
- Highlight winning cells visually  
- Add **sound effects** or animations  
- Implement a **simple AI** (minimax or random move)  
- Add **score tracking** (win/draw count per session)  
- Improve layout with responsive CSS and color palette  

Suggested cohesive color palette:
| Element | Color | Description |
|----------|--------|-------------|
| Background | `#f9fafb` | Light gray background |
| Board | `#1e293b` | Deep slate blue |
| Cells | `#334155` | Muted steel gray |
| X Mark | `#f87171` | Coral red |
| O Mark | `#38bdf8` | Cool cyan blue |
| Text | `#f8fafc` | White |

---

## 🧰 Technologies Used

- **HTML5** – structure and semantic elements  
- **CSS3** – layout and colors  
- **JavaScript (ES6)** – logic and modular design  

---

## 🏁 Summary

This Tic-Tac-Toe project is a great demonstration of:
- The **module pattern (IIFE)** for encapsulation  
- **Factory functions** for object creation  
- Clear **separation of concerns** between UI and logic  

It’s an excellent base for building more advanced JavaScript projects while keeping your code **organized, scalable, and readable**.
