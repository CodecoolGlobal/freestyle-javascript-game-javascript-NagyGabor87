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
let ballObject = {
    X: startX,
    Y: startY   
}

function moveBall(){
    ball.style.left = parseInt((ball.style.left)) + ballObject.X + "px";
    ball.style.bottom = parseInt((ball.style.bottom)) + ballObject.Y + "px";
}
setInterval(() => {moveBall()}, 100);