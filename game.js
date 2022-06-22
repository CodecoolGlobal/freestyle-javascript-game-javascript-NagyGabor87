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
    "bar-far-left": 0.5235987756,
    "bar-left": 0.3490658504,
    "bar-close-left": 0.1745329252,
    "bar-center": 0,
    "bar-close-right": -0.1745329252,
    "bar-right": -0.3490658504,
    "bar-far-right": -0.5235987756
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
    console.log(Math.atan(ballObject.Y/ballObject.X)*180/Math.PI)
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
            let idOFHitBarSegment = findClosestBarElement();
            console.log(idOFHitBarSegment);
            let multiplier = barSegmentAngles[idOFHitBarSegment];
            let angle;
            angle = Math.atan(ballObject.Y/ballObject.X) + multiplier;
            console.log("old angle:       " + Math.atan(ballObject.Y/ballObject.X));
            console.log("old in ˚         " + Math.atan(ballObject.Y/ballObject.X)*180/Math.PI);
            console.log("Angle changed by:" + multiplier);
            console.log("angle change in ˚" + multiplier*180/Math.PI);
            console.log("new angle:       " + angle);
            console.log("new angle in ˚         " + angle*180/Math.PI);
            console.log("ball-Y:    " + ballObject.Y);
            console.log("ball-X:    " + ballObject.X);
            console.log("ball-new-Y:" + Math.sin(Number(angle)));
            console.log("ball-new-X:" + Math.cos(Number(angle)));
            // debugger

            ballObject.Y = Math.sin(Number(angle));
            ballObject.X = Math.cos(Number(angle));
            ballObject.Y *= -1;
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

