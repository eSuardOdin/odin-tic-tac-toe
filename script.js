

const Game = (() => {

    const winningCombinations = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,5,9],
        [3,5,7],
        [1,4,7],
        [2,5,8],
        [3,6,9]
    ];
    console.log('Hello');
    let playerOneTurn = true;


    const Gameboard = (() => {
        let gameboard = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];
    
        const getGameboard = () => {
            return gameboard;
        }
        const setCell = (x, y, symbol) =>{
            const htmlPosId = gameboard[x][y];
            gameboard[x][y] = symbol;
            return htmlPosId;
        }; 
        const resetBoard = () => gameboard = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']]; 
        return {getGameboard, setCell, resetBoard}
    })();
    
    const playerFactory = (name, symbol) => {
        
        const _name = name;
        const getName = () => {
            return _name;
        }
        const _symbol = symbol;
        const getSymbol = () => {
            return _symbol;
        }
        return {getName, getSymbol};
    }
    

    /**
     * For visual display of the game
     */
    const displayController = (() => {
        
        console.log('in display controller');
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.addEventListener('click', () => console.log('clicked'));
        })
        return {playerMove}
    });
    
    // Changes the choosed square in the array location specified
    // and changes the player turn
    const playerMove = (x,y) => {
        if(playerOneTurn) {
            console.log(Gameboard.setCell(x, y, p1.getSymbol()));
            Gameboard.setCell(x, y, p1.getSymbol())
        } else {
            Gameboard.setCell(x, y, p2.getSymbol())
        }
        playerOneTurn = !playerOneTurn;
        console.log(Gameboard.getGameboard()); // ------ console.log to del ----------
    };
    const p1 = playerFactory('Player one', 'X');
    const p2 = playerFactory('Player two', 'O');

    
    
    const checkIfWin = () => { // To do

    }


    return {playerMove, winningCombinations, displayController};
})();


console.log(Game.winningCombinations);
Game.playerMove(2,2);
Game.playerMove(1,1);


Game.displayController();
