initGame();

function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)

}
let ball = null;
ball = document.getElementById("ball")
ball.style.left = '500px';
ball.style.bottom = '200px';
let startY = (Math.random() - 0.5) * 5;
let startX = (Math.random() - 0.5) * 5;


function moveBall(X, Y){
    ball.style.left = parseInt((ball.style.left)) + X + "px";
    ball.style.bottom = parseInt((ball.style.bottom)) + Y + "px";
}
setInterval(moveBall(), 100);