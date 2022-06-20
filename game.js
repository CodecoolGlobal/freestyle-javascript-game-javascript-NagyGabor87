initGame();

function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)

}
const ball = document.querySelector("#ball");
console.dir(ball)
function moveBall(){
    ball.style.left = parseInt(ball.style.left) + 40 + "px";
    console.log(ball);
}
setInterval(moveBall, 1000)