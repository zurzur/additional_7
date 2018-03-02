module.exports = function solveSudoku(matrix) {

    let solved = matrix;
    let solvedNumbers = 0;
    let steps = 0;


addSuggestions();
while (solvedNumbers<81 && steps<1000){
	updateSuggestions();
	steps++;
}
output();
return solved;



function addSuggestions() {

	for ( let i = 0; i < 9; i++){
		for (let j = 0; j < 9; j++){
			if (solved[i][j]) {
				solved[i][j] = [solved[i][j], []];
				solvedNumbers++;
			} else solved[i][j] = [solved[i][j], [1,2,3,4,5,6,7,8,9]];
		}
	}
}

function updateSuggestionsRow(row, number) {
	for (let j = 0; j < 9; j++){
		if (solved[row][j][1].length > 1 && solved[row][j][1].indexOf(number) > -1) {
			solved[row][j][1].splice(solved[row][j][1].indexOf(number), 1);
		}
	}
}

function updateSuggestionsColumn(column, number) {
	for (let i = 0; i < 9; i++){
		if (solved[i][column][1].length > 1 && solved[i][column][1].indexOf(number) > -1) {
			solved[i][column][1].splice(solved[i][column][1].indexOf(number), 1);
		}
	}	
}

function updateSuggestionsSection(row, column, number) {
	let sectionFirstRowIndex = row/3|0;
	let sectionLastRowIndex = sectionFirstRowIndex + 3;
	let sectionFirstColumnIndex = column/3|0;
	let sectionLastColumnIndex = sectionFirstColumnIndex + 3;
	let checked = 0;
	let checkedRow;
	let checkedColumn;
	for (let i = sectionFirstRowIndex; i < sectionLastRowIndex; i++) {
		for (let j = sectionFirstColumnIndex; j < sectionLastColumnIndex; j++) {
			if(solved[i][j][0]){
					for (let a = sectionFirstRowIndex; a < sectionLastRowIndex; a++) {
						for (let b = sectionFirstColumnIndex; b < sectionLastColumnIndex; b++) {
							solved[a][b][1].splice(solved[a][b][1].indexOf(solved[i][j][0]), 1);
						}
					}
			}
		}
	}
	for (sectionFirstRowIndex; sectionFirstRowIndex < sectionLastRowIndex; sectionFirstRowIndex++) {
		for (sectionFirstColumnIndex; sectionFirstColumnIndex < sectionLastColumnIndex; sectionFirstColumnIndex++) {
			if(solved[sectionFirstRowIndex][sectionFirstColumnIndex][1].indexOf(number) > -1){
				checked++;
				checkedRow = sectionFirstRowIndex;
				checkedColumn = sectionFirstColumnIndex;
			}
		}
	}





	if (checked === 1) {
		solved[checkedRow][checkedColumn][0] = number;
		solved[checkedRow][checkedColumn][1] = [];
		updateSuggestionsRow(checkedRow, solved[checkedRow][checkedColumn][0]);
		updateSuggestionsColumn(checkedColumn, solved[checkedRow][checkedColumn][0]);

	}



}

function updateSuggestions() {
	if (solvedNumbers < 81) solvedNumbers = 0;
	for ( let i = 0; i < 9; i++){
		for (let j = 0; j < 9; j++){
			if (solved[i][j][1].length == 1) solved[i][j][0] =  solved[i][j][1][0];

			if (solved[i][j][0]) {
				solved[i][j][1] = [];
				solvedNumbers++;
				updateSuggestionsColumn(j, solved[i][j][0]);
				updateSuggestionsRow(i, solved[i][j][0]);
				

			} 
		}
	}	
	for ( let i = 0; i < 9; i++){
		for (let j = 0; j < 9; j++){
			if (solved[i][j][1].length == 1) solved[i][j][0] =  solved[i][j][1][0];
			if (solved[i][j][0]) {
				solved[i][j][1] = [];
				updateSuggestionsSection(i, j, solved[i][j][0]);

			} 
		}
	}	
}

function output() {
	for ( let i = 0; i < 9; i++){
		for (let j = 0; j < 9; j++){
			solved[i][j] = solved[i][j][0];			
		}
	}
}




}
