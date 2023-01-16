

const Game = (() => {
    const Gameboard = (() => {
        let gameboard = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];
    
        const getGameboard = () => {
            return gameboard;
        }
        const setCell = (x, y, symbol) => gameboard[x][y] = symbol;
        const resetBoard = () => gameboard = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']]; 
        return {getGameboard, setCell, resetBoard}
    })();
    
    const playerFactory = (name, symbol, turn) => {
    
        const _name = name;
        const getName = () => {
            return _name;
        }
        const _symbol = symbol;
        const getSymbol = () => {
            return _symbol;
        }
        const _turn = turn;
        const getTurn = () => {
            return _turn;
        }
        const setTurn = () => {
            _turn = !_turn;
        }
        return {getName, getSymbol, getTurn, setTurn};
    }
    
    const displayController = (() => {
        const squares = document.querySelectorAll('.square');
        
    });
    
        const p1 = playerFactory('Player one', 'X');
        const p2 = playerFactory('Player two', 'O');
});






