module.exports = function solveSudoku(matrix) {
    //backtracking algorithm from 
    //https://www.geeksforgeeks.org/backtracking-set-7-suduku/

    let row;
    let col;

    findUnassignedLocation(matrix);

    if (row === -1) return matrix; //solved

    for (let suggest = 1; suggest < 10; suggest++) {

        //if suggest is possible
        if (isPossible(matrix, row, col, suggest)) {

            //make suggest 
            matrix[row][col] = suggest;

            //if suggest will lead to solution
            if (solveSudoku(matrix))
                return matrix;

            //else trying another suggest
            else matrix[row][col] = 0;
        }

        if (suggest === 9) return;
    }

    return matrix;

    function findUnassignedLocation(matrix) {

        for (let i = 0; i < 9; i++) {

            for (let j = 0; j < 9; j++) {

                if (matrix[i][j] === 0) {

                    row = i;
                    col = j;
                    return;
                }
            }
        }
        row = -1;

    }

    function isPossible(matrix, row, col, num) {

        return isPossibleRow(matrix, row, num) 
        		&& isPossibleCol(matrix, col, num) 
        		&& isPossibleSect(matrix, row, col, num);
    }

    function isPossibleRow(matrix, row, num) {

        for (let j = 0; j < 9; j++) {

            if (matrix[row][j] === num) return false;

        }

        return true;
    }

    function isPossibleCol(matrix, col, num) {

        for (let i = 0; i < 9; i++) {

            if (matrix[i][col] === num) return false;

        }

        return true;
    }

    function isPossibleSect(matrix, row, col, num) {

        for (let i = Math.floor(row / 3) * 3, lastRowIndex = i + 3; i < lastRowIndex; i++) {

            for (let j = Math.floor(col / 3) * 3, lastColIndex = j + 3; j < lastColIndex; j++) {

                if (matrix[i][j] === num) return false;
            }
        }

        return true;
    }
}
