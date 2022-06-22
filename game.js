
const ball = document.getElementById("ball");
ball.style.left = '500px';
ball.style.bottom = '200px';
let startVector = (Math.random()*(2*Math.PI))  // Starting vector in radian
let ballObject = {
    X: (Math.cos(startVector)),
    Y: (Math.sin(startVector))
}

let reverseX = true;
let reverseY = true;

let maxX = 975;
let minX = 0;
let maxY = 575;
let minY = 0;

let speed = 10;
let lives = 3;

const barSegmentAngles = {
    "bar-far-left": 0.3,
    "bar-left": 0.2,
    "bar-close-left": 0.1,
    "bar-center": 0,
    "bar-close-right": -0.1,
    "bar-right": -0.2,
    "bar-far-right": -0.3
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
    if (reverseX) {
        ball.style.left = Math.round(parseInt(ball.style.left) + (ballObject.X * speed)) + "px";
    } else {
        ball.style.left = Math.round(parseInt(ball.style.left) - (ballObject.X * speed)) + "px";
    }
    if (parseInt(ball.style.left) > maxX || parseInt(ball.style.left) < minX) {
        reverseX = !reverseX;
    }
    if (reverseY) {
        ball.style.bottom = Math.round(parseInt(ball.style.bottom) + (ballObject.Y * speed)) + "px";
    } else {
        ball.style.bottom = Math.round(parseInt(ball.style.bottom) - (ballObject.Y * speed)) + "px";
    }
    if (parseInt(ball.style.bottom) > maxY) {
        reverseY = !reverseY;
    } else if (parseInt(ball.style.bottom) < minY) {
        // reverseY = !reverseY;
        // console.log("placeholder for lose condition")
        // const ball = document.getElementById("ball");
        ball.style.left = "500px";
        ball.style.bottom = "200px";

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
    if (isBallOverBar()){
        let idOFHitBarSegment = findClosestBarElement();
        let multiplier = barSegmentAngles[idOFHitBarSegment]
        let angleX;
        let angleY;

        // Filter out too shallow angles
        if (Math.acos(ballObject.X) >= 1.3) {
            angleX = Math.acos(ballObject.X) + multiplier;
        } else {
            angleX = Math.acos(ballObject.X);
        }
        if (Math.asin(ballObject.Y) >= 1.3) {
            angleY = Math.asin(ballObject.Y) + multiplier;
        } else {
            angleY = Math.asin(ballObject.Y);
        }

        ballObject.X = Math.cos(Number(angleX));
        ballObject.Y = Math.sin(Number(angleY));
        reverseY = !reverseY;
    }}

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
        (parseInt(ball.style.bottom) >= 10 && parseInt(ball.style.bottom) < 20);
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
            reverseY = !reverseY;
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