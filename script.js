const playerFactory = (name, symbol) => {

    const returnMove = (x, y) => {
        return [x, y];
    }


    return {name, symbol, returnMove};
}



const gameboard = (function(x, y, playerNameOne, playerNameTwo) {
    
    // Board creation
    const board = Array();
    for(let j = 0; j < x; j++) {
        const newLine = [];
        for(let i = 0; i < y; i++) {
            const newSquare = '';
            newLine.push(newSquare);
        }
        board.push(newLine);
    }
    

    console.log(board);
    const playerOne = playerFactory(playerNameOne, 'X');
    const playerTwo = playerFactory(playerNameTwo, 'O');



    return {x, y, playerOne, playerTwo};
}) (3, 5, 'Erwann', 'Computer');

console.log(gameboard);




const game = (board) => {
    const makeMove = (player, x, y) => {
        const coord = player.returnMove(x, y);
        board.board[x,y] = player.symbol;
        console.log(board);
    }
}


game.makeMove(game.board.playerOne, 2, 3);