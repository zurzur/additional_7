module.exports = function solveSudoku(matrix) {
let solved = [[],[],[],[],[],[],[],[],[]];
let changed = true;
let steps = 0;

addSuggestions();
solve(solved);



output();

return solved;



function solve(input){
	
	while (changed) {
		changed = false;
		steps ++;
		for (let i = 0; i<9; i++) {
			for (let j = 0; j < 9; j++) {
				if (solved[i][j][1].length === 1) {addSolution(i,j,solved[i][j][1][0]);}
				//isHiddenSingle(i,j);
				updateSuggestions(i,j,solved[i][j][0]);
			}
		}
		for (let i = 0; i<9; i++) {
			for (let j = 0; j < 9; j++) {
				//if (solved[i][j][1].length === 1) {addSolution(i,j,solved[i][j][1][0]);}
				isHiddenSingle(i,j);
				//updateSuggestions(i,j,solved[i][j][0]);
			}
		}
	}

}

function addSuggestions (){
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (matrix[i][j]) {
				solved[i][j] = [matrix[i][j], [], 'solved'];
			} else solved[i][j] = [matrix[i][j], [1,2,3,4,5,6,7,8,9], 'unsolved'];
		}
	}
}

function addSolution(i, j, num){
	solved[i][j] = [num, [], 'solved'];
	changed = true;
	updateSuggestions(i, j, num)
}

function updateSuggestions(row, col, num){
	updateSuggestionsRow(row, num);
	updateSuggestionsCol(col, num);
	updateSuggestionsSection(row, col, num);
}

function updateSuggestionsRow(row, num){
	for (let j = 0; j < 9; j++) {
		if (solved[row][j][1].length > 1 && solved[row][j][1].indexOf(num) > -1) {
			solved[row][j][1].splice(solved[row][j][1].indexOf(num), 1);
			changed = true;
		}
	}
}

function updateSuggestionsCol(col, num){
	for (let i = 0; i < 9; i++) {
		if (solved[i][col][1].length > 1 && solved[i][col][1].indexOf(num) > -1) {
			solved[i][col][1].splice(solved[i][col][1].indexOf(num), 1);
			changed = true;
		}
	}
}

function updateSuggestionsSection(row, col, num){
	let sectionFirstRowIndex = (row/3|0)*3;
	let sectionLastRowIndex = sectionFirstRowIndex + 3;
	let sectionFirstColumnIndex = (col/3|0)*3;
	let sectionLastColumnIndex = sectionFirstColumnIndex + 3;

	for (let i = sectionFirstRowIndex; i < sectionLastRowIndex; i++) {
		for (let j = sectionFirstColumnIndex; j < sectionLastColumnIndex; j++) {
			if (solved[i][j][1].length > 1 && solved[i][j][1].indexOf(num) > -1) {
				solved[i][j][1].splice(solved[i][j][1].indexOf(num), 1);
				changed = true;
			}
		}
	}
}

function isSingle(){}

function isHiddenSingle(row,col){
	isHiddenSingleRow(row,col);
	isHiddenSingleCol(row,col);
	isHiddenSingleSection(row,col);
}

function isHiddenSingleRow(row,col){
	let count;
	for (let a = 0, length = solved[row][col][1].length; a < length; a++){
		count = 0;
		for (let x = 0; x<9; x++) {
			if (solved[row][x][1].indexOf(solved[row][col][1][a]) > -1) count++;
		}
		if (count === 1) {
			addSolution(row, col, solved[row][col][1][a]);
			updateSuggestions(row, col, solved[row][col][0]);
			break;
		}
	}
}

function isHiddenSingleCol(row,col){
	let count;
	for (let a = 0, length = solved[row][col][1].length; a < length; a++){
		count = 0;
		for (let x = 0; x<9; x++) {
			if (solved[x][col][1].indexOf(solved[row][col][1][a]) > -1) count++;
		}
		if (count === 1) {
			addSolution(row, col, solved[row][col][1][a]);
			updateSuggestions(row, col, solved[row][col][0]);
			break;
		}
	}
}

function isHiddenSingleSection(row,col){
	let sectionFirstRowIndex = (row/3|0)*3;
	let sectionLastRowIndex = sectionFirstRowIndex + 3;
	let sectionFirstColumnIndex = (col/3|0)*3;
	let sectionLastColumnIndex = sectionFirstColumnIndex + 3;
	let count;
	for (let a = 0, length = solved[row][col][1].length; a < length; a++) {
		count = 0;
		for (let i = sectionFirstRowIndex; i < sectionLastRowIndex; i++) {
			for (let j = sectionFirstColumnIndex; j < sectionLastColumnIndex; j++) {
				if (solved[i][j][1].includes(solved[row][col][1][a])) count++;
			}
		}
		if (count === 1) {
			addSolution(row, col, solved[row][col][1][a]);
			updateSuggestions(row, col, solved[row][col][0]);
			break;
		}
	}

}

function isSolved(){
	for ( let i = 0; i < 9; i++){
		for (let j = 0; j < 9; j++){
			if (solved[i][j][2] === 'unsolved') return false;			
		}
	}	
	return true;
}

function isError(){
	for ( let i = 0; i < 9; i++){
		for (let j = 0; j < 9; j++){
			if (solved[i][j][2] === 'unsolved' && solved[i][j][1].length === 0) return true;			
		}
	}	
	return false;	
}





function output() {
	for ( let i = 0; i < 9; i++){
		for (let j = 0; j < 9; j++){
			solved[i][j] = solved[i][j][0];			
		}
	}
}


}

