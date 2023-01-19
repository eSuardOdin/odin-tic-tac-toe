

const Game = (() => {

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
    let isPlayerOneTurn = true;
    let winner = '';
    
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
            if(Gameboard.getGameboard()[pick] === pick) { 
                
                playMove(pick, player);
                checkWinner(player);
                isPlayerOneTurn = ! isPlayerOneTurn;
            }

        };

        return {playTurn};
    }) (); 
    
    

    const displayController = (() => {

        const squares = document.querySelectorAll('.square');

        // Add the click events to trigger a move on click
        const addClickEvents = () => {
            console.log('In addClickEvents');
            squares.forEach(square => {

                square.addEventListener('click', () => {
                    if(winner === '') {
                        GameLogic.playTurn(Number(square.getAttribute('id')));
                        printBoard(square);
                        console.log(`Clicked on id ${square.getAttribute('id')}`);
                    }
                });
            })
        };

        const printBoard = (square) => {
            square.innerHTML = Gameboard.getGameboard()[Number(square.getAttribute('id'))];
        }

        return {addClickEvents};
    }) ();




    // O--------------------O
    // |                    |
    // |   DEBUG PLAYING    |
    // |                    |
    // O--------------------O
    const fakeGame = () => {
        GameLogic.playTurn(Number(prompt('Enter a number')));
        console.log(Gameboard.getGameboard());
    }
    const playLoop = () => {
        while(winner === '') fakeGame();
    }
    return {playLoop, displayController};
})();

Game.displayController.addClickEvents();

// console.log(Game.winningCombinations);
// Game.playerMove(2,2);
// Game.playerMove(1,1);


// Game.displayController();









    
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



    /**
     * For visual display of the game
     */
//     const displayController = (() => {
    


//         const printMark = (el, player) => {
//             el.innerHtml = player.getSymbol();
//         }


//         const squares = document.querySelectorAll('.square');
//         squares.forEach(square => {
//             square.addEventListener('click', (e) => {
//                 GameLogic.playTurn(square);
//             });
//         })

//         // Print the board
//         const printBoard = () => {
//             for(let i = 1; i <= getGameboard().length; i++) {

//             }
//         };
        
//     });
    
//     // Changes the choosed square in the array location specified
//     // and changes the player turn
//     // const playerMove = (x,y) => {
//     //     if(isPlayerOneTurn) {
            
//     //         Gameboard.setCell(x, y, p1.getSymbol())
//     //     } else {
//     //         Gameboard.setCell(x, y, p2.getSymbol())
//     //     }
//     //     isPlayerOneTurn = !isPlayerOneTurn;
//     //     return {playerMove}
//     // };
//     const p1 = playerFactory('Player one', 'X');
//     const p2 = playerFactory('Player two', 'O');

    
    
    


//     return {winningCombinations, displayController};