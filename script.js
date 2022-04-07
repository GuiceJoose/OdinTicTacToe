
const gameController = (() => {

    const _squares = document.querySelectorAll('[data-square]');
    const _board = document.querySelector('#gameboard');
    const _gameoverMessage = document.querySelector('.gameover-message');
    const _gameoverScreen = document.querySelector('.overlay');
    const _resetButton = document.querySelector('.reset-button');

    let xTurn = true;
    const winConditions = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [6,4,2]
    ]
    
    const checkWin = (currentPlayer) => {
        return winConditions.some(set => {
            return set.every(index => {
                return _squares[index].classList.contains(currentPlayer); 
            })
        })
    }

    const checkDraw = () => {
        return [..._squares].every(square => {
            return square.classList.contains('x') || square.classList.contains('o');
        })
    }

    const gameOver = (draw, win, currentPlayer) => {
        if (draw) {
            _gameoverMessage.textContent = 'It\'s a draw!'
            _gameoverScreen.classList.add('gameover');
        }
        if (win) {
            _gameoverMessage.textContent = `${currentPlayer} wins!`;
            _gameoverScreen.classList.add('gameover');
        }
    }

    const reset = () => {
        for (square of _squares) {
            square.classList.remove('x');
            square.classList.remove('o');
        }
        xTurn = true;
        _board.classList.remove('x');
        _board.classList.remove('o');
        _gameoverScreen.classList.remove('gameover');
        startGame();
    }
    
    const swapturn = () => {
        xTurn = !xTurn;
        _board.classList.remove('x');
        _board.classList.remove('o');
        if (xTurn) {
            _board.classList.add('x');
        }
        if (!xTurn) {
            _board.classList.add('o');
        }
    }

    const handleClick = (e) => {
        const currentPlayer = xTurn ? 'x' : 'o';
        e.target.classList.add(currentPlayer)
        gameOver(checkDraw(), checkWin(currentPlayer), currentPlayer);
        swapturn();
    }

    const startGame = () => {
    _squares.forEach((square) => square.addEventListener('click', handleClick, {once:true}));
    _resetButton.addEventListener('click', reset);
    _board.classList.add('x');
    }

    return {
        startGame
    }

})()

gameController.startGame();

const Player = (() => {

})()