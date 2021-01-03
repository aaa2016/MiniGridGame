// GLOBAL SETTINGS

// Board size
var boardCols = 45;
var boardRows = 15;

// Player starting position in middle of board
var startCol = Math.floor(boardCols / 2);
var startRow = Math.floor(boardRows / 2);

// Symbols - TODO: Add more elaborate sprites?
var emptySymbol = "&nbsp"; // Space character
var playerSymbol = "I";
var targetSymbol = "O";

// Scoring - TODO: Add target score to win?
var score = 0;

// Key bindings - TODO: Add WASD or ,AOE support?
var UP = 38;
var DOWN = 40;
var LEFT = 39;
var RIGHT = 37;

// Object location at a given point in time
var currentPos = []; 
var targetPos = [];

////////////////////////////////////////////

// Create new game (runs from HTML button)

function newGame() {
	
	// Reset score
	score = 0;
	
	// Create board
	document.getElementById("game-board").innerHTML = "";
	createGameBoard(boardCols, boardRows);
	document.getElementById("message-area").innerHTML = "New game! Score: "+score;

	// Draw player at starting position
	currentPos = [startRow,startCol];	
	document.getElementById(currentPos).innerHTML = playerSymbol;
	
	// Draw target
	drawTarget();
	
}

////////////////////////////////////////////

// Creates game board at table, each cell has id in format "0,0"

function createGameBoard(cols, rows) {
	
	var gameBoard = document.getElementById("game-board");
	var table = document.createElement('TABLE');
  	var tableBody = document.createElement('TBODY');
  	table.appendChild(tableBody);
  	var cellDiv = document.createElement('DIV');

	// Create rows
  	for (var i = 0; i < rows; i++) {
    	var tr = document.createElement('TR');
    	tableBody.appendChild(tr);

		// Create columns
    	for (var j = 0; j < cols; j++) {
      		var td = document.createElement('TD');
      		var cellDiv = document.createElement('DIV');
      		var button = document.createElement('BUTTON');
      		
      		// Populate cell with symbol and set id to "row,col"
      		cellDiv.innerHTML = emptySymbol;
      		cellDiv.setAttribute("id", i+","+j);
      		td.appendChild(cellDiv);
			tr.appendChild(td);
    	};
  	};
  	
  	gameBoard.appendChild(table);
	
};

////////////////////////////////////////////

// Detect key presses - from <body> tag

function doMove(event) {

	// Depending on which key was pressed, move player accordingly
	switch(event.keyCode) {
		case UP:
			movePlayer([-1,0]);
			break;
		case DOWN:
			movePlayer([1,0]);
			break;
		case LEFT:
			movePlayer([0,1]);
			break;
		case RIGHT:
			movePlayer([0,-1]);
			break;
		default:
	}
	
}

////////////////////////////////////////////

// Move player - direction in format [rows_to_move,cols_to_move]

function movePlayer(direction) {

	// Remove player from previous location
	document.getElementById(currentPos).innerHTML = emptySymbol;
	
	// Based on how the player is moved, update position 
	// Collision detection - check that row does not exceed board bounds
	if (parseInt(currentPos[0]) + direction[0]>=0 && 
		parseInt(currentPos[0]) + direction[0]<boardRows) {
		currentPos[0] = parseInt(currentPos[0]) + direction[0];
	}
	// Collision detection - check that column does not exceed board bounds
	if (parseInt(currentPos[1]) + direction[1]>=0 && 
		parseInt(currentPos[1]) + direction[1]<boardCols) {
		currentPos[1] = parseInt(currentPos[1]) + direction[1];
	}
	
	// Draw player in new location
	document.getElementById(currentPos).innerHTML = playerSymbol;
	
	// Check if player reaches target
	updateScore();

}

////////////////////////////////////////////

// Draw a target

function drawTarget() {

	// Find random position for target
	targetPos[0] = Math.floor((Math.random() * (boardRows - 1)) + 1);
	targetPos[1] = Math.floor((Math.random() * (boardCols - 1)) + 1);
	
	// If target is drawn where player is, draw again
	if (targetPos[0] == currentPos[0] && targetPos[1] == currentPos[1]) {
		drawTarget();
	}

	// Draw target in location
	document.getElementById(targetPos).innerHTML = targetSymbol;

}

////////////////////////////////////////////

// Update score

function updateScore() {

	// Check if player position matches target position
	if (targetPos[0] == currentPos[0] && targetPos[1] == currentPos[1]) {
	
		// Increment score
		score++;
		document.getElementById("message-area").innerHTML = "Score: "+score;
		
		// Draw new target
		drawTarget();
		
	}

}

////////////////////////////////////////////