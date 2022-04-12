// Constants

const COLUMNS_NUM = 7;
const ROWS_NUM = 6;
const connect4Container = document.getElementById('connect-four-container');
const turnText = document.getElementById('turn-text');

const gameState = {
	player1Name: null,
	player2Name: null,
	turn: 'Red',
};

let board = [
	// [0, 0, 0, 0, 0, 0, 0],
	// [0, 0, 0, 0, 0, 0, 0],
	// [0, 0, 0, 0, 0, 0, 0],
	// [0, 0, 0, 0, 0, 0, 0],
	// [0, 0, 0, 0, 0, 0, 0],
	// ['Red', 0, 0, 0, 0, 0, 0],
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

	if (singleOrMultiGame == 1) {
		// Computer game
	} else if (singleOrMultiGame == 2) {
		// Multi ( Two ) player game
		let player1 = prompt('Enter Player 1 Name:');
		let player2 = prompt('Enter Player 2 Name:');

		console.log(gameState);
		// order red, yellow
		let randomNumber = Math.round(Math.random());
		gameState.player1Name = randomNumber == 0 ? player1 : player2;
		gameState.player2Name = randomNumber == 0 ? player2 : player1;

		alert(`The first player to play as RED ${gameState.player1Name}`);
		renderInfo();
	}
	makeGrid();
	renderGrid();
}

function renderInfo() {
	// player1 => RED
	// player2 => Yellow
	turnText.innerText = `${gameState.turn} Turn ( ${
		gameState.turn == 'Red' ? gameState.player1Name : gameState.player2Name
	} )`;
}

function putCoin(columnNum) {
	// columnNum => 0 - 6
	for (let index = ROWS_NUM - 1; index >= 0; index--) {
		// index => 5 - 0 ( 7 )
		if (board[index][columnNum] == 0) {
			board[index][columnNum] = gameState.turn;
			console.log('Put Coin');

			// Changing the turn for each player
			if (gameState.turn == 'Red') {
				gameState.turn = 'Yellow';
			} else if (gameState.turn == 'Yellow') {
				gameState.turn = 'Red';
			}

			renderInfo();
			renderGrid();
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

			element.addEventListener('click', function (event) {
				console.log('columnId:', element.dataset.columnId);
				putCoin(element.dataset.columnId);
			});

			connect4Container.append(element);
		}
	}
}

startGame();
