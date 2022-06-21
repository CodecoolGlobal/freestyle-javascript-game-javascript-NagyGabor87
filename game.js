initGame();

function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)

}
const ball = document.getElementById("ball");
ball.style.left = '500px';
ball.style.bottom = '200px';
const randomStartingVectors = [[-1,-4], [-2,-3], [-3,-3], [-4,-1], [-5,-1], [0, -3], [1, -4], [2, -3], [3, -3], [4, -1], [5, -1]];
let startX, startY;
let startVector = randomStartingVectors[Math.floor(Math.random()*randomStartingVectors.length)];
let ballStartingSpeedMultiplier= 0.5;
let ballObject = {
    X: startVector[0]*ballStartingSpeedMultiplier,
    Y: startVector[1]*ballStartingSpeedMultiplier
}

let reverseX = true;
let reverseY = true;

let maxX = 975;
let minX = 0;
let maxY = 575;
let minY = 0;

let speed = 5;

function moveBall(){
    if (reverseX) {
        ball.style.left = parseInt(ball.style.left) + (ballObject.X * speed) + "px";
    } else {
        ball.style.left = parseInt(ball.style.left) - (ballObject.X * speed) + "px";
    }
    if (parseInt(ball.style.left) > maxX || parseInt(ball.style.left) < minX) {
        reverseX = !reverseX;
    }
    if (reverseY) {
        ball.style.bottom = parseInt(ball.style.bottom) + (ballObject.Y * speed) + "px";
    } else {
        ball.style.bottom = parseInt(ball.style.bottom) - (ballObject.Y * speed) + "px";
    }
    if (parseInt(ball.style.bottom) > maxY) {
        reverseY = !reverseY;
    } else if (parseInt(ball.style.bottom) < minY) {
        reverseY = !reverseY;
        console.log("hello")
    }
}
setInterval(() => {moveBall()}, 10);