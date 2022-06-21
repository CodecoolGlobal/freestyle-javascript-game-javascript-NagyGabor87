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

let reverseX = true;
let reverseY = true;

let maxX = 975;
let minX = 0;
let maxY = 575;
let minY = 0;

let speed = 2;

let barFarLeft = document.getElementById("bar-far-left");
let barLeft = document.getElementById("bar-left");
let barCloseLeft = document.getElementById("bar-close-left-left");
let barCenter = document.getElementById("bar-center");
let barCloseRight = document.getElementById("bar-close-right");
let barRight = document.getElementById("bar-right");
let barFarRight = document.getElementById("bar-far-right");


function findClosestBarElement() {
    let ballCenter = ((ball.getBoundingClientRect().x + ball.getBoundingClientRect().width) + ball.getBoundingClientRect().x) / 2
    let smallestDistance = Infinity;
    let closestElement;
    for (let barElement of Array.from(bar.children)) {
        let elementLeftCorner = barElement.getBoundingClientRect().x;
        let elementRightCorner = barElement.getBoundingClientRect().x + barElement.getBoundingClientRect().width;
        let elementCenter = (elementLeftCorner + elementRightCorner) / 2
        let currentDistance = Math.abs(ballCenter - elementCenter);

        if (currentDistance < smallestDistance) {
            closestElement = barElement;
            smallestDistance = currentDistance;
        }
    };
    return closestElement;
}


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
    if (isBallOverBar()){
        reverseY = !reverseY;
        let barSegments = [1,2,3,4,4,4,5,6,7]
        findClosestBarElement();
        for (let i=0; i<9;i++) {
            if ((parseInt(ball.style.left) + 25 >= parseInt(bar.style.left) + barWidth * (barSegments[i] - 1) / 9 && parseInt(ball.style.left) < parseInt(bar.style.left) + barWidth * barSegments[i] / 9)) {

            }}}}
setInterval(() => {moveBall()}, 10);

let boardWidth = 1000
let barWidth = 150
let bar = document.getElementById("bar-container");
onmousemove = function(e){
    if (e.clientX > (parseInt(window.innerWidth)-boardWidth)/2 && e.clientX < (parseInt(window.innerWidth)-boardWidth)/2+boardWidth-barWidth) {
        bar.style.left = e.clientX - (parseInt(window.innerWidth)- boardWidth)/2  + "px";
    } else if (e.clientX <= (parseInt(window.innerWidth)-boardWidth)/2) {
        bar.style.left = 5 + "px";
    } else {
        bar.style.left = boardWidth - barWidth - 5 + "px";
    }
}
bar.addEventListener("mousemove", onmousemove)

function isBallOverBar(){
    if ((parseInt(ball.style.left)+ 25 >= parseInt(bar.style.left) && parseInt(ball.style.left) < parseInt(bar.style.left) + barWidth) && 
        (parseInt(ball.style.bottom) >= 10 && parseInt(ball.style.bottom) < 20)){
        // console.log("true")
        return true;
    } else {
        // console.log("false")
        return false;
    }
}

// function findCenterOfElement(element) {
//     let position = element.getBoundingClientRect()
//     let leftCorner = position.x;
//     let rightCorner = position.x + position.width;
//     return (leftCorner + rightCorner) / 2;
// }



