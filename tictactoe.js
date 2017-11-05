var numberOfPlayers = 2;
var currentPlayer = 0;
var move = 0;
var points1 = 0;
var points2 = 0;
var size = 3;

function drawBoard()
{
	var parent = document.getElementById("game");
	var counter = 1;

	while (parent.hasChildNodes()){
		parent.removeChild(parent.firstChild);
	}

	for (var i = 0; i < 3; i ++){
		var row = document.createElement("tr");

		for(var x = 0; x < size; x++){
			var col = document.createElement("td");
			col.id = counter;
			// col.innerHTML = counter;

			var handler = function(e){
				if(currentPlayer == 0){
					this.innerHTML = "X";
					player1Selections.push(parseInt(this.id));
					player1Selections.sort(function(a,b){ return a - b});
				}
			 	
			 	else {
					this.innerHTML = "O";
					player2Selections.push(parseInt(this.id));
					player2Selections.sort(function(a, b){ return a - b});
				}

				move++;

				var isWin = checkWinner();

				if (isWin){
					if(currentPlayer == 0){
						points1++;
					}else{
						points2++;
					}

					document.getElementById("player1").innerHTML = points1;
					document.getElementById("player2").innerHTML = points2;

					reset();
					drawBoard();
				}

				else if (player2Selections.length + player1Selections.length == 9) {
					reset();
					drawBoard();
				}
				{
					if(currentPlayer == 0){
						currentPlayer = 1;
					} else {
						currentPlayer = 0;
					}

					this.removeEventListener('click', arguments.callee);
				}
			};

			col.addEventListener('click', handler);
			row.appendChild(col);
			counter++;
		}

		parent.appendChild(row);
	}

	loadAnswers();
}

var winners = new Array();
function loadAnswers(){
	winners.push([1, 2, 3]);
	winners.push([4, 5, 6]);
	winners.push([7, 8, 9]);
	winners.push([1, 4, 7]);
	winners.push([2, 5, 8]);
	winners.push([3, 6, 9]);
	winners.push([1, 5, 9]);
	winners.push([3, 5, 7]);
}

var player1Selections = new Array();
var player2Selections = new Array();

function checkWinner(){
	//check if current player has a winning hand
	//only start checking when player x has size number of selections

	var win = false;
	var playerSelections = new Array();

	if (currentPlayer == 0){
		playerSelections = player1Selections;
	}else{
		playerSelections = player2Selections;
	}

	if (playerSelections.length >= size){

		for(i = 0; i < winners.length; i++){
			var sets = winners[i];
			var setFound = true;
		
			for(r = 0; r < sets.length; r++){
				var found = false;

				for(s = 0; s < playerSelections.length; s++){
					if(sets[r] == playerSelections[s]){
						found = true;
						break;
					}
				}
			
				if (found == false){
					setFound = false;
					break;
				}			
			}

			if (setFound == true){
				win = true;
				break;
			}
		}

	}
	return win;
}

function reset(){
	currentPlayer = 0;
	player1Selections = new Array();
	player2Selections = new Array();	
}

// drawBoard();
document.addEventListener('DOMContentLoaded', function(){drawBoard();});