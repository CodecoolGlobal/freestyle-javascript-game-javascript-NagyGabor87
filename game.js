initGame();

function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)

}
let ball = null;
ball = document.getElementById("ball")
ball.style.left = '500px';
ball.style.top = '400px';
let startX = (Math.random() - 0.5) * 5;
let startY = (Math.random() - 0.5) * 5;


function moveBall(startX, startY){
    ball.style.left = parseInt((ball.style.left)) + startY + "px";
    ball.style.top = parseInt((ball.style.top)) + startX + "px";
}
setInterval(moveBall(), 100)