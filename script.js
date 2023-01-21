

const Game = (() => {

    // Global variables
    let isPlayerOneTurn = true;
    let winner = '';
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
    
    // Reset/Init the game
    const initGame = () => {
        GameLogic.resetBothPlayer();
        isPlayerOneTurn = true;
        winner = '';
        Gameboard.resetBoard();
    }
    
    /**
     * Returns the gameboard object and accessing methods
     */
    const Gameboard = (() => {
        let gameboard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        let moveNb = 0;
        const addMove = () => {
            moveNb += 1;
            console.log(`Number of moves ${moveNb}`);
            return moveNb;
        }
        const getGameboard = () => {
            return gameboard;
        }
        const setCell = (x,symbol) =>{
            const htmlPosId = gameboard[x];
            gameboard[x] = symbol;
            console.log(gameboard);
            return htmlPosId;
        }; 
        const resetBoard = () => {
            gameboard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            moveNb = 0; 
        }
        return {getGameboard, setCell, resetBoard, addMove};
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
        let _movesPlayed = [];
        const getMovesPlayed = () => _movesPlayed; // Just for debug
     
        const resetMoves = () => {
            _movesPlayed = [];
        }
        const addMove = (squareNb) => {
            _movesPlayed.push(squareNb);
        }
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
        return {getName, getSymbol, addMove, getMovesPlayed, setIsWinner, resetMoves};
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
                    
            })
            // Checks if th board is full and no winner
            if(Gameboard.addMove() === 9) {
                winner = 'It\'s a draw...';
            }
        }
        
        const playMove = (pick, player) => {
            // Add the move to the player's movelist
            player.addMove(Gameboard.getGameboard()[pick]);
            // Change the gameboard cell with player's symbol
            Gameboard.setCell(pick, player.getSymbol());
        } 

        // Send a playing status string to displayController
        const getPlayingStatus = () => {
            if(winner !== '') {
                if(winner === 'It\'s a draw...') return winner;
                return (`${winner} wins`)
            } else {
                return isPlayerOneTurn ? `${p1.getName()}'s turn` : `${p2.getName()}'s turn`; 
            }
        }

        const playTurn = (pick) => { // Pick will be the square id
            // Checking if there is no winner yet and setting who's playing
            if(winner !== '') return;
            const player = isPlayerOneTurn ? p1 : p2;
            // If pick has not been played yet :
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

        const resetBothPlayer = () => {
            p1.resetMoves();
            p2.resetMoves();
        }

        return {playTurn, getPlayingStatus, resetBothPlayer};
    }) (); 
    
    
    const displayController = (() => {
        const resetBtn = document.querySelector('.reset'); 
        const playingStatus = document.querySelector('.playing-status');
        const squares = document.querySelectorAll('.square');
        
        const changePlayingStatus = (str, target) => {
            target.innerHTML = str;
        }

        
        changePlayingStatus(GameLogic.getPlayingStatus(), playingStatus);
        // Add the click events to trigger a move on click
        const addClickEvents = () => {
            
            // Clic on a square
            squares.forEach(square => {

                square.addEventListener('click', () => {
                    if(winner === '') {
                        
                        GameLogic.playTurn(Number(square.getAttribute('id')));
                        square.classList.add('animateMarker');
                        changePlayingStatus(GameLogic.getPlayingStatus(), playingStatus);
                        printBoard(square);
                        if(winner !== '') {
                            if(winner === 'It\'s a draw...') {
                                playingStatus.classList.add('draw');
                            }
                            else {
                                playingStatus.classList.add('winner');
                            }
                            changePlayingStatus(GameLogic.getPlayingStatus(), playingStatus);
                        }
                    }
                });
            })


            
            resetBtn.addEventListener('click', () => {
                playingStatus.classList.remove('winner');
                playingStatus.classList.remove('draw');
                squares.forEach(square => {
                    square.classList.remove('animateMarker')
                })
                initGame();
                squares.forEach(square => printBoard(square))
                changePlayingStatus(GameLogic.getPlayingStatus(), playingStatus);
            });
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

    return {displayController, initGame};
})();


Game.initGame()

Game.displayController.addClickEvents();
