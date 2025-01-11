'use strict'


function game(){

	function gameOver(lose){
		document.getElementById('over').style.display = 'block';
		let text = 'Ничья';
		if(lose) text = 'Вы проиграли боту';

		document.getElementById('over-text').innerText = text;
	}

	function findPlace(newGround,turn){
		let freeCells = newGround.filter(e => e !=='X' && e !=='O');
		if(isWin(player,newGround)) return -1;
		if(isWin(ai,newGround)) return 1;
		if(freeCells.length === 0) return 0;

		let findedIndex;
		let solve = 2;
		if(turn === ai) solve = -2;

		for(let i = 0; i < freeCells.length;i++){
			let recGround = new Array(newGround.length);
			for (let j = 0; j < newGround.length;j++) recGround[j] = newGround[j];
			recGround[freeCells[i]] = turn;

			let newTurn = player;
			if(turn === player) newTurn = ai;

			let choice = findPlace(recGround, newTurn);
			
			if(turn === ai){
				if(choice > solve){
					solve = choice;
					findedIndex = freeCells[i];
				}
			} else if(choice < solve) solve = choice;
		}

		placeIndex = findedIndex;
		return solve;
	}

	function isWin(player,ground){
		  if(
		(ground[0] === player && ground[1] === player && ground[2] === player) ||
		(ground[3] === player && ground[4] === player && ground[5] === player) ||
		(ground[6] === player && ground[7] === player && ground[8] === player) ||
		(ground[0] === player && ground[3] === player && ground[6] === player) ||
		(ground[1] === player && ground[4] === player && ground[7] === player) ||
		(ground[2] === player && ground[5] === player && ground[8] === player) ||
		(ground[0] === player && ground[4] === player && ground[8] === player) ||
		(ground[2] === player && ground[4] === player && ground[6] === player)
			) {
		return true;
      } else {
		return false;
      }
	}

	function aiPlace(){
		findPlace(ground,ai);
		ground[placeIndex] = ai;
		cells[placeIndex].innerText = ai;
		cells[placeIndex].style.color = colors[ai];
		let freeCells = ground.filter(e => e !=='X' && e !=='O');
		if(freeCells.length === 0){
			gameOver(false);
			return;
		}
		if(isWin(ai, ground)){
			gameOver(true);
			return;
		}
		playerTurn = true;
	}

	function playerPlace(event){
		if(!playerTurn ||
			ground[event.target.gameIndex] === player ||
			ground[event.target.gameIndex] === ai) return;
		
		event.target.innerText = player;
		event.target.style.color = colors[player];
		ground[event.target.gameIndex] = player;
		playerTurn = false;
		aiPlace();
	}

	const cells = document.getElementsByTagName('td');
	let ground = [0,1,2,3,4,5,6,7,8];

	for(let i = 0; i < cells.length;i++){	
		cells[i].gameIndex = i;
		cells[i].addEventListener('click', playerPlace);
	}

	if(!playerTurn) aiPlace();
}


const colors = {'X':'red','O':'blue'};
var playerTurn = false;
var placeIndex;
var player = 'O';
var ai = 'X';

const choice = document.getElementById('choice');
const buttons = document.getElementsByTagName('button');
document.getElementById('go-button').addEventListener('click', ()=>{
	location.reload();
});

buttons[0].addEventListener('click', ()=>{
	playerTurn = true;
	player = 'X';
	ai = 'O';
	choice.style.display = 'none';
	game();
});

buttons[1].addEventListener('click', ()=>{
	choice.style.display = 'none';
	game();
});
