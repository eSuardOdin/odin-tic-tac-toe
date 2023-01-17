

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
    let isPlayerOneTurn = true;


    const Gameboard = (() => {
        let gameboard = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    
        const getGameboard = () => {
            return gameboard;
        }
        const setCell = (x, y, symbol) =>{
            const htmlPosId = gameboard[x][y];
            gameboard[x][y] = symbol;
            return htmlPosId;
        }; 
        const resetBoard = () => gameboard = [1, 2, 3, 4, 5, 6, 7, 8, 9]; 
        return {getGameboard, setCell, resetBoard}
    })();
    
    
    
    /**
     * 
     * @param {*} name Name of player (optionnal)
     * @param {*} symbol Symbol printed on board
     * @returns 
     */
    const playerFactory = (name, symbol) => {
        let _isWinner = false;
        // Check if win (maybe not legitimate to be there)

        const checkIfWin = () => {
            winningCombinations.forEach(combination => {
                if (_movesPlayed.indexOf(combination[0]) !== -1 &&
                    _movesPlayed.indexOf(combination[1]) !== -1 &&
                    _movesPlayed.indexOf(combination[2]) !== -1) 
                    {
                        _isWinner = true;
                        console.log(`${p1.name} wins !`);
                        return;
                }

            });
            console.log(`${p1.name} not winning yet`);
        }

        
        // An array of moves the player did
        const _movesPlayed = [];
        const getMovesPlayed = () => _movesPlayed; // Just for debug
        // If the player 
        const addMove = (squareNb) => _movesPlayed.push(squareNb);
        const _name = name;
        const getName = () => {
            return _name;
        }
        const _symbol = symbol;
        const getSymbol = () => {
            return _symbol;
        }
        return {getName, getSymbol, addMove, getMovesPlayed, checkIfWin};
    }

    /**
     * For visual display of the game
     */
    const displayController = (() => {
        
        // const gameContainer = document.querySelector('.game-container');
        // // On Game.Reset (?) or new game
        // const createBoard = () => {
        //     let html = '';
        //     Gameboard.getGameboard().forEach(el => {
        //         console.log(el);
        //         html += `<span id="${el}" class="square"></span>`;
        //     });
        //     gameContainer.insertAdjacentHTML("beforeend", html);
        // }
        // createBoard();




        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.addEventListener('click', (e) => {
                if(Gameboard.getGameboard().indexOf(Number(square.getAttribute('id'))) !== -1 && square.innerHTML === '') {
                    square.innerHTML = isPlayerOneTurn ? p1.getSymbol() : p2.getSymbol();
                    if(isPlayerOneTurn) {
                        square.innerHTML = p1.getSymbol();
                        p1.addMove(Number(square.getAttribute('id')));
                        p1.checkIfWin();
                    } else {
                        square.innerHTML = p2.getSymbol();
                        p2.addMove(Number(square.getAttribute('id')));
                        p2.checkIfWin();
                    }
                    console.log(p1.getMovesPlayed());
                    console.log(p2.getMovesPlayed());
                    isPlayerOneTurn = ! isPlayerOneTurn;

                }
            });
        })

        // Print the board
        const printBoard = () => {
            for(let i = 1; i <= getGameboard().length; i++) {

            }
        };
        
    });
    
    // Changes the choosed square in the array location specified
    // and changes the player turn
    // const playerMove = (x,y) => {
    //     if(isPlayerOneTurn) {
            
    //         Gameboard.setCell(x, y, p1.getSymbol())
    //     } else {
    //         Gameboard.setCell(x, y, p2.getSymbol())
    //     }
    //     isPlayerOneTurn = !isPlayerOneTurn;
    //     return {playerMove}
    // };
    const p1 = playerFactory('Player one', 'X');
    const p2 = playerFactory('Player two', 'O');

    
    
    


    return {winningCombinations, displayController};
})();


// console.log(Game.winningCombinations);
// Game.playerMove(2,2);
// Game.playerMove(1,1);


Game.displayController();
