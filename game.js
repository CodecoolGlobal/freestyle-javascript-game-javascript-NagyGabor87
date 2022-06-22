
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
let lives = 3;

const barSegmentAngles = {
    "bar-far-left": 1,
    "bar-left": 0.78,
    "bar-close-left": 0.4,
    "bar-center": 0,
    "bar-close-right": -0.4,
    "bar-right": -0.78,
    "bar-far-right": -1
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
    if (parseInt(ball.style.left) > maxX || parseInt(ball.style.left) < minX) {
        ballObject.X *= -1;
    }
    ball.style.left = Math.round(parseInt(ball.style.left) + (ballObject.X * speed)) + "px";
    if (parseInt(ball.style.bottom) > maxY) {
        ballObject.Y *= -1;
    } else if (parseInt(ball.style.bottom) < minY) {
        ball.style.left = "500px";
        ball.style.bottom = "200px";
        ballObject.Y *= -1;
        console.log(lives);
        lives--;
        if (lives < 1) {
            let message = document.getElementById("end-message");
            message.innerText = "You've lost!!!";
            clearInterval(1);
            clearInterval(2);
            clearInterval(3);
        }
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

setInterval(() => {moveBall()}, 10);  // id = 1

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

function checkBlockCollision() {
    let ballCenterX = ((ball.getBoundingClientRect().x + ball.getBoundingClientRect().width) + ball.getBoundingClientRect().x) / 2
    let ballCenterY = ((ball.getBoundingClientRect().y + ball.getBoundingClientRect().height) + ball.getBoundingClientRect().y) / 2
    const radiusBall = 12.5
    let blocksAll = document.querySelectorAll(".block");
    for (let block of blocksAll) {
        let blockHeight = block.getBoundingClientRect().height
        let blockWidth = block.getBoundingClientRect().width
        let blockX = block.getBoundingClientRect().x
        let blockY = block.getBoundingClientRect().y
        let blockHidden = block.style.visibility;
        if ((ballCenterX >= blockX - radiusBall && ballCenterX <= blockX + blockWidth + radiusBall) &&
            (ballCenterY >= blockY - radiusBall && ballCenterY <= blockY + blockHeight + radiusBall) && (!blockHidden)) {
            ballObject.Y *= -1;
            block.setAttribute("style", "visibility: hidden");
        }
    }
}

setInterval(()=> {checkBlockCollision()}, 10)  // id 2

function checkWinCondition() {
    let blocksAll = document.querySelectorAll(".block");
    let remainingBlocks = 0;
    for (let block of blocksAll) {
        if (block.style.visibility !== "hidden") {
            remainingBlocks++;
        }
    }
    let message = document.getElementById("end-message");
    if (!remainingBlocks) {
        message.innerText = "You've won!!";
        clearInterval(1);
        clearInterval(2);
        clearInterval(3);
    }
}

setInterval(checkWinCondition, 10)  // id 3