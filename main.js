// Constants
const COLUMNS_NUM = 7;
const ROWS_NUM = 6;
const connect4Container = document.getElementById('connect-four-container');
const turnText = document.getElementById('turn-text');

const gameState = {
	player1Name: null,
	player2Name: null,
	turn: 'Red',
	isSingle: null
};

let winner = null;

let board = [
	// [0, "Red", "Red", "Red", "Red", 0, 'Red'], 	0
	// [0, 0, 0, 0, 0, 0, 0],   					1
	// [0, 0, 0, 0, 0, 0, 0],   					2
	// [0, 0, 0, 0, 0, 0, 0],   					3
	// [0, 0, 0, 0, 0, 0, 0],   					4
	// ['Red', 'Yellow', 0, 0, 0, 0, 0],			5
];

function makeGrid() {
	board = [];
	for (let i = 0; i < ROWS_NUM; i++) {
		board.push([0, 0, 0, 0, 0, 0, 0]);
	}
}

function startGame() {
	const singleOrMultiGame = prompt(
		`Single Player Game OR Two Player Game?
        1 => single
        2 => multi\n`
	);

	winner = null;
	if (singleOrMultiGame == 1) {
		gameState.isSingle = true;

		let player1 = prompt('Enter Player 1 Name:');

		gameState.player1Name = player1;
		gameState.player2Name = 'Computer';
		gameState.turn = 'Red';

		alert(`The first player to play as RED ${gameState.player1Name}`);

	} else if (singleOrMultiGame == 2) {
		gameState.isSingle = false;

		// Multi ( Two ) player game
		let player1 = prompt('Enter Player 1 Name:');
		let player2 = prompt('Enter Player 2 Name:');

		// order red, yellow
		let randomNumber = Math.round(Math.random());
		gameState.player1Name = randomNumber == 0 ? player1 : player2;
		gameState.player2Name = randomNumber == 0 ? player2 : player1;
		gameState.turn = 'Red';

		alert(`The first player to play as RED ${gameState.player1Name}`);
	}
	renderInfo();
	makeGrid();
	renderGrid();
}

function ColumnIsEmpty(columnIndex) {
	for (let index = 0; index < board.length; index++) {
		const coin = board[index][columnIndex];
		if (coin == 0) {
			return true;
		}
	}

	return false;
}

function renderInfo() {
	// player1 => RED
	// player2 => Yellow
	if (winner == null) {
		turnText.innerText = `${gameState.turn} Turn ( ${
			gameState.turn == 'Red' ? gameState.player1Name : gameState.player2Name
		} )`;
	} else {
		turnText.innerText = `The Winner is ${winner}`;
	}
}

function putCoin(columnNum) {
	// columnNum => 0 - 6
	for (let index = ROWS_NUM - 1; index >= 0; index--) {
		// index => 5 - 0 ( 7 )
		if (board[index][columnNum] == 0) {
			board[index][columnNum] = gameState.turn;

			// Changing the turn for each player
			if (gameState.turn == 'Red') {
				gameState.turn = 'Yellow';
			} else if (gameState.turn == 'Yellow') {
				gameState.turn = 'Red';
			}

			checkWinner();

			renderGrid();

			renderInfo();
			console.log(`The Winner is: ${winner}`);
			break;
		}
	}
}

function renderGrid() {
	connect4Container.innerHTML = '';
	for (let row_count = 0; row_count < ROWS_NUM; row_count++) {
		for (let column_count = 0; column_count < COLUMNS_NUM; column_count++) {
			let element = document.createElement('div');
			element.classList.add('cell');

			if (board[row_count][column_count] == 'Red') {
				element.classList.add('color-red');
			} else if (board[row_count][column_count] == 'Yellow') {
				element.classList.add('color-yellow');
			}

			// attribute data-column-id
			element.dataset.columnId = column_count;

			if (winner == null) {
				element.addEventListener('click', function (event) {
					// Mutli or Single
					putCoin(element.dataset.columnId);

					// Computer Turn
					if (gameState.isSingle && gameState.turn == 'Yellow') {
						let randomColumn;
						
						// Infinite Loop
						while (true) {
							randomColumn = Math.round(Math.random() * COLUMNS_NUM); // 0 -> 1 * 7 = 7
							if (ColumnIsEmpty(randomColumn)) {
								break;
							}
						}

						// put coin for the computer
						putCoin(randomColumn);
					}
				});
			}

			connect4Container.append(element);
		}
	}
}

function checkWinner() {
	if (winner == null) {
		checkHorizontal();
	}

	if (winner == null) {
		checkVertical();
	}

	if (winner == null) { 
		checkDiagonal();
	}
}

function checkHorizontal() {

	// for loop on coin array
	for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
		// for loop on coins that inside the row array
		for (let coinIndex = 0; coinIndex < board[rowIndex].length; coinIndex++) {
			const coin = board[rowIndex][coinIndex];

			// if the coin is not chosen before
			if (coin == 0) {
				continue;
			}

			// if the coin is chosen by a player before
			if (coin == 'Yellow' || coin == 'Red') {
				let counter = 0;
				for (let horizontalCoinIndex = coinIndex; horizontalCoinIndex <= coinIndex + 1 + 3; horizontalCoinIndex++) {
					const horizontalCoin = board[rowIndex][horizontalCoinIndex];
					console.log('Counter:', counter);
					console.log(horizontalCoin, rowIndex, coinIndex);

					if (counter == 4) {
						winner = coin
						break;
					}
					
					// 'red', 'yellow'
					if (horizontalCoin == coin) {
						counter++;
					} else {
						break;
					}
				}
			}
			if (winner != null) {
				break;
			}
		}
	}
}

function checkVertical() {
	// for loop on coin array
	for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
		// for loop on coins that inside the row array
		for (let coinIndex = 0; coinIndex < board[rowIndex].length; coinIndex++) {
			const coin = board[rowIndex][coinIndex];

			// if the coin is not chosen before
			if (coin == 0) {
				continue;
			}

			// if the coin is chosen by a player before
			if (coin == 'Yellow' || coin == 'Red') {
				if (rowIndex <= 2) {
					let counter = 0;
					for (
						let verticalCoinIndex = rowIndex + 1;
						verticalCoinIndex <= rowIndex + 1 + 3;
						verticalCoinIndex++
					) {
						const verticalCoin = board[verticalCoinIndex][coinIndex];
						console.log('verticalCoin:', verticalCoin);
						
						if (counter == 4) {
							winner = coin
							break;
						}

						// 'red', 'yellow'
						if (verticalCoin == coin) {
							counter++;
						} else {
							break;
						}
					}
				}
			}
			if (winner != null) {
				break;
			}
		}
	}
}

function checkDiagonal() {
	// for loop on coin array
	for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
		// for loop on coins that inside the row array
		for (let coinIndex = 0; coinIndex < board[rowIndex].length; coinIndex++) {
			const coin = board[rowIndex][coinIndex];
			if (coin == 0) {
				continue;
			}

			// if the coin is chosen by a player before
			if (coin == 'Yellow' || coin == 'Red') {
				// vector 1:
				// subtract ( minus ) column by 1
				// subtract ( minus ) row by 1

				let counterRow = rowIndex;
				let counterColumn = coinIndex;
				let counter = 0;

				while (counter < 4) {
					let diagonalCoin;
					if (counterRow != -1 && counterColumn != -1) {
						console.log(counterRow, counterColumn);
						diagonalCoin = board[counterRow][counterColumn];
					}

					if (diagonalCoin == coin) {
						winner = coin;
					} else {
						winner = null;
						break;
					}

					counterRow--;
					counterColumn--;
					counter++;
				}

				if (winner != null) {
					break;
				}

				// vector 2:
				// plus column by 1
				// subtract ( minus ) row by 1

				counterRow = rowIndex;
				counterColumn = coinIndex;
				counter = 0;
				while (counter < 4) {
					let diagonalCoin;
					if (counterRow != -1 && counterColumn != -1) {
						console.log(counterRow, counterColumn);
						diagonalCoin = board[counterRow][counterColumn];
					}

					if (diagonalCoin == coin) {
						winner = coin;
					} else {
						winner = null;
						break;
					}

					counterRow--;
					counterColumn++;
					counter++;
				}

				if (winner != null) {
					break;
				}
			}

			if (winner != null) {
				break;
			}
		}
	}

}

startGame();
