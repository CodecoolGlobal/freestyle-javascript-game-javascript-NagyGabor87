initGame();

function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)

}
const ball = document.getElementById("ball");
ball.style.left = '500px';
ball.style.bottom = '200px';
const randomStartingVectors = [[-1,-4], [-2,-3], [-3,-3], [-4,-1], [-5,-1], [0, -3], [1, -4], [2, -3], [3, -3], [4, -1], [5, -1]];
let startVector = randomStartingVectors[Math.floor(Math.random()*randomStartingVectors.length)];
let ballStartingSpeedMultiplier= 0.5;
let ballObject = {
    X: startVector[0]*ballStartingSpeedMultiplier,
    Y: startVector[1]*ballStartingSpeedMultiplier
}

function moveBall(){
    ball.style.left = parseInt((ball.style.left)) + ballObject.X + "px";
    ball.style.bottom = parseInt((ball.style.bottom)) + ballObject.Y + "px";
}
setInterval(() => {moveBall()}, 10);