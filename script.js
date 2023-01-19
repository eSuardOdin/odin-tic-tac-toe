

const Game = (() => {

    let isPlayerOneTurn;
    let winner;
    const initGame = () => {
        isPlayerOneTurn = true;
        winner = '';
        Gameboard.resetBoard();
        console.log({
            isPlayerOneTurn,
            winner,
            gameboard: Gameboard.getGameboard()
        });
    }
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ];
    
    
    /**
     * Returns the gameboard object and accessing methods
     */
    const Gameboard = (() => {
        let gameboard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    
        const getGameboard = () => {
            return gameboard;
        }
        const setCell = (x,symbol) =>{
            const htmlPosId = gameboard[x];
            gameboard[x] = symbol;
            console.log(gameboard);
            return htmlPosId;
        }; 
        const resetBoard = () => gameboard = [0, 1, 2, 3, 4, 5, 6, 7, 8]; 
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
        
        // An array of moves the player did
        const _movesPlayed = [];
        const getMovesPlayed = () => _movesPlayed; // Just for debug
     
        
        const addMove = (squareNb) => _movesPlayed.push(squareNb);
        const _name = name;
        const getName = () => {
            return _name;
        }
        const _symbol = symbol;
        const getSymbol = () => {
            return _symbol;
        }
        const setIsWinner = () => {
            _isWinner = !_isWinner;
        }
        return {getName, getSymbol, addMove, getMovesPlayed, setIsWinner};
    }
    

    /**
     * Return the GameLogic used to play the game with no visuals
     */
    const GameLogic =(() => {

        // Init the 2 players
        const p1 = playerFactory('Player One', 'X');
        const p2 = playerFactory('Player Two', 'O');


        /**
         * Checks winning combinations against a player's moves played, set the winner if matching
         * @param {*} player Player object who's moves are checked if matching with any winning combination
         */
        const checkWinner = (player) => {
            winningCombinations.forEach(combination => 
                {
                    if (player.getMovesPlayed().indexOf(combination[0]) !== -1 &&
                    player.getMovesPlayed().indexOf(combination[1]) !== -1 &&
                    player.getMovesPlayed().indexOf(combination[2]) !== -1) 
                    {
                        player.setIsWinner();
                        // Set Game.winner to the player name
                        winner = player.getName();
                        console.log(`${player.getName()} wins !`);
                        return;
                    }

            });
        }
        
        const playMove = (pick, player) => {
            // Add the move to the player's movelist
            player.addMove(Gameboard.getGameboard()[pick]);
            // Change the gameboard cell with player's symbol
            Gameboard.setCell(pick, player.getSymbol());
        } 


        const playTurn = (pick) => { // Pick will be the square id
            // Checking if there is no winner yet and setting who's playing
            if(winner !== '') return;
            const player = isPlayerOneTurn ? p1 : p2;
            // If pick is not yet played :
            //      - the player picks it
            //      - checking if it makes him win
            //      - changing turn
            if(Gameboard.getGameboard()[pick] === pick) { // if the gameboard value is the picked nb 
                                                          // (else it's already played)
                playMove(pick, player);
                checkWinner(player);
                isPlayerOneTurn = !isPlayerOneTurn;
            }

        };

        return {playTurn, p1: p1.getName(), p2: p2.getName()};
    }) (); 
    
    
    // Need to put it in a loop
    // For now it's my game controller
    const displayController = (() => {
        const resetBtn = document.querySelector('.reset'); 
        const playingStatus = document.querySelector('.playing-status');
        const squares = document.querySelectorAll('.square');
        const changePlayingStatus = (str, target) => {
            target.innerHTML = str;
        }

        let player = isPlayerOneTurn ? GameLogic.p2 : GameLogic.p1;
        changePlayingStatus(`${player}'s turn`, playingStatus);
        // Add the click events to trigger a move on click
        const addClickEvents = () => {
            squares.forEach(square => {

                square.addEventListener('click', () => {
                    if(winner === '') {
                        player = isPlayerOneTurn ? GameLogic.p2 : GameLogic.p1 // Need to find a better way
                        changePlayingStatus(`${player}'s turn`, playingStatus);
                        GameLogic.playTurn(Number(square.getAttribute('id')));
                        printBoard(square);
                        console.log(`Clicked on id ${square.getAttribute('id')}`);
                        if(winner !== '') {
                            playingStatus.classList.add('winner');
                            changePlayingStatus(`${winner} wins`, playingStatus);
                        }
                    }
                });
            })
        };


        
        const removeClickEvents = () => {
            squares.forEach(square => {
                square.removeEventListener('click');
            })
        };

        const printBoard = (square) => {
            const cell = Gameboard.getGameboard()[Number(square.getAttribute('id'))];
            square.innerHTML = (cell === 'X' || cell === 'O') ? cell : '';
        }

        return {addClickEvents};
    }) ();




    // O--------------------O
    // |                    |
    // |   DEBUG PLAYING    |
    // |                    |
    // O--------------------O
    // const fakeGame = () => {
    //     GameLogic.playTurn(Number(prompt('Enter a number')));
    //     console.log(Gameboard.getGameboard());
    // }
    // const playLoop = () => {
    //     while(winner === '') fakeGame();
    // }
    return {displayController, initGame};
})();


Game.initGame()

Game.displayController.addClickEvents();
