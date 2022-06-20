initGame();

function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)

}
let ball = null;
ball = document.getElementById("ball")
ball.style.left = '0px';
ball.style.top = '0px';

function moveBall(){
    ball.style.left = parseInt((ball.style.left)) + 5 + "px";
}
setInterval(moveBall, 100)