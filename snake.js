var lastTime = 0;
var SNACK_SPEED = 2;
let snakeBody = [
    { x: 8, y: 10 },

]
let inputDirection = { x: 0, y: 0 }
let expentionAmount = 1;
let lastInputDirection = inputDirection
let gameOver = false
let food = getFoodrandomPosition();
var gameboard = document.getElementById("game-board")

function paint(currentTime) {
    var timeSecond = (currentTime - lastTime) / 1000
    requestAnimationFrame(paint)
    if (timeSecond < 1 / SNACK_SPEED) return
    lastTime = currentTime
    if (gameOver != true) {
        update();
        draw();
    }
}
window.requestAnimationFrame(paint)

function draw() {
    drawSnake()
    drawFood()
}
function update() {
    gameboard.innerHTML = ""
    snakeMove()
    snakeEatFood()
}

function drawSnake() {
    snakeBody.forEach((segment, index) => {
        var snakeElement = document.createElement('div');
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.style.gridRowStart = segment.y
        if(index==0)
        {
            snakeElement.classList.add('head')
        }
        else{

            snakeElement.classList.add('snake');
        }
        gameboard.appendChild(snakeElement)
    });
}

function drawFood() {
    var foodElement = document.createElement('div');
    foodElement.style.gridColumnStart = food.x
    foodElement.style.gridRowStart = food.y
    foodElement.classList.add('food');
    gameboard.appendChild(foodElement)
}

function snakeMove() {
    inputDirection = getInputDirection()
    for (i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
    checkGameOver()

}

function getInputDirection() {
    window.addEventListener("keydown", e => {

        switch (e.key) {
            case 'ArrowUp':
                if (lastInputDirection.y == 1) break;
                inputDirection = { x: 0, y: -1 }
                break;
            case 'ArrowDown':
                if (lastInputDirection.y == -1) break;

                inputDirection = { x: 0, y: 1 }
                break;
            case 'ArrowLeft':
                if (lastInputDirection.x == 1) break;

                inputDirection = { x: -1, y: 0 }
                break;
            case 'ArrowRight':
                if (lastInputDirection.x == -1) break;

                inputDirection = { x: 1, y: 0 }
                break;
            default: inputDirection = { x: 0, y: 0 }

        }
    })
    return inputDirection;
}

function snakeEatFood() {
    if (isEat()) {
       food= getFoodrandomPosition()
       SNACK_SPEED++;
        expendSnake()
    }
}

function isEat() {
    return snakeBody[0].x == food.x && snakeBody[0].y == food.y
}

function expendSnake() {
    for (i = 0; i < expentionAmount; i++) {
        snakeBody.push(snakeBody[snakeBody.length - 1]);
    }
}

function getFoodrandomPosition() {
    let a, b, myCondition = true;
    while (myCondition) {
        a = Math.ceil(Math.random() * 16)
        b = Math.ceil(Math.random() * 16)
        myCondition = snakeBody.some(segment => {
            return segment.x === a && segment.y === b;
        })
    }
    return { x: a, y: b }
}

function checkGameOver() {
    if (snakeOutOfGrid() || snakeInterSection()) {
         alert("game over")
         gameOver = true;
         location.reload()
    }
}

function snakeOutOfGrid() {
    return snakeBody[0].x < 0 || snakeBody[0].x > 16 || snakeBody[0].y < 0 || snakeBody[0].y > 16
}


function snakeInterSection() {
    for (i = 1; i < snakeBody.length; i++) {
        if (snakeBody[0].x === snakeBody[i].x && snakeBody[0].y === snakeBody[i].y) {
            return true
        }
    }
}