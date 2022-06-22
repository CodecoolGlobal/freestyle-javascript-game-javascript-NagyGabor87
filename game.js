initGame();

function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)

}
const ball = document.getElementById("ball");
ball.style.left = '500px';
ball.style.bottom = '200px';
let startVector = (Math.random()*(Math.PI-1)+0.5)  // Starting vector in radian, can not be horizontal
console.log(startVector)
let ballObject = {
    X: (Math.cos(startVector)),
    Y: (Math.sin(startVector)),
    timeOutAllowsBarHit: true,
}


let maxX = 975;
let minX = 0;
let maxY = 575;
let minY = 0;

let speed = 4;

const barSegmentAngles = {
    "bar-far-left": 0.8,
    "bar-left": 0.45,
    "bar-close-left": 0.2,
    "bar-center": 0,
    "bar-close-right": -0.2,
    "bar-right": -0.45,
    "bar-far-right": -0.8
}


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
    }
    return closestElement.getAttribute("id");
}


function moveBall(){
    console.log(Math.acos(ballObject.X)*180/Math.PI)
    if (parseInt(ball.style.left) > maxX || parseInt(ball.style.left) < minX) {
        ballObject.X *= -1;
    }
    ball.style.left = Math.round(parseInt(ball.style.left) + (ballObject.X * speed)) + "px";
    if (parseInt(ball.style.bottom) > maxY) {
        ballObject.Y *= -1;
    } else if (parseInt(ball.style.bottom) < minY) {
        ballObject.Y *= -1;
        console.log("placeholder for lose condition");
    }   
    ball.style.bottom = Math.round(parseInt(ball.style.bottom) + (ballObject.Y * speed)) + "px";
    if (ballObject.timeOutAllowsBarHit) {
        if (isBallOverBar()){
            console.log("BAR HIT!")
            let idOFHitBarSegment = findClosestBarElement();
            console.log(idOFHitBarSegment);
            let barAngle = barSegmentAngles[idOFHitBarSegment];
            let angle;
            console.log(barAngle);
            angle = (Math.acos(ballObject.X) + barAngle);
            ballObject.Y = Math.sin(Number(angle));
            ballObject.X = Math.cos(Number(angle));
            ballObject.timeOutAllowsBarHit = false;
            setTimeout(()=>{
                ballObject.timeOutAllowsBarHit = true;
                console.log("timer timed out")
            }, 1000);
        }
    }
}

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
    return (parseInt(ball.style.left) + 25 >= parseInt(bar.style.left) && parseInt(ball.style.left) < parseInt(bar.style.left) + barWidth) &&
        (parseInt(ball.style.bottom) >= 10 && parseInt(ball.style.bottom) < 15);
}

