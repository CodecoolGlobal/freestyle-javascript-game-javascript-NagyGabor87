
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
let score = 0;
let speed = 4;
let lives = 3;
let time = 0;

let clingSound = new Audio('cling.wav')

const barSegmentAngles = {
    "bar-far-left": 1,
    "bar-left": 0.78,
    "bar-close-left": 0.4,
    "bar-center": 0,
    "bar-close-right": -0.4,
    "bar-right": -0.78,
    "bar-far-right": -1
}

let timers = [
    setInterval(() => {moveBall()}, 10),
    setInterval(()=> {checkBlockCollision()}, 10),
    setInterval(checkWinCondition, 10),
    setInterval(displayHeader, 10),
    setInterval(() => {time++}, 1000),
    setInterval(()=>{speed += 0.05}, 1000),]


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
        if (lives === 0) {
            let message = document.getElementById("end-message");
            message.innerText = "You've lost!!!";
            clearAllTimers();
            let livesCounter = document.getElementById("lives");
            livesCounter.innerText = `Lives: 0`;
        }
    }   
    ball.style.bottom = Math.round(parseInt(ball.style.bottom) + (ballObject.Y * speed)) + "px";
    if (ballObject.timeOutAllowsBarHit) {
        if (isElementOverBar(ball)){
            let idOFHitBarSegment = findClosestBarElement();
            let barAngle = barSegmentAngles[idOFHitBarSegment];
            let angle;
            angle = (Math.acos(ballObject.X) + barAngle);
            ballObject.Y = Math.sin(Number(angle));
            ballObject.X = Math.cos(Number(angle));
            if (ballObject.Y < 0){
                ballObject.Y *= -1
            }
            ballObject.timeOutAllowsBarHit = false;
            setTimeout(()=>{
                ballObject.timeOutAllowsBarHit = true;
                console.log("timer timed out")
            }, 1000);
        }
    }
}


let boardWidth = 1000
let boardHeight = 600
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

function isElementOverBar(element){
    return (parseInt(element.style.left) + 25 >= parseInt(bar.style.left) && parseInt(element.style.left) < parseInt(bar.style.left) + barWidth) &&
        (parseInt(element.style.bottom) >= 10 && parseInt(element.style.bottom) < 15);
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
        let blockId = block.getAttribute("id");
        if ((ballCenterX >= blockX - radiusBall && ballCenterX <= blockX + blockWidth + radiusBall) &&
            (ballCenterY >= blockY - radiusBall && ballCenterY <= blockY + blockHeight + radiusBall) && (!blockHidden)) {
            let blockLives = Number(block.dataset.lives);
            ballObject.Y *= -1;
            clingSound.play()
            if (blockLives === 1) {
                block.setAttribute("style", "visibility: hidden");
                checkSpecialBlocks(blockId, blockHeight, blockWidth, blockX, blockY, block);
            } else {
                setTimeout(function (){
                    block.dataset.lives = String(blockLives - 1);
                }, 50)
            }
            score += 20
        }
    }
}


function checkSpecialBlocks(blockId, blockHeight, blockWidth, blockX, blockY, block) {
    switch (blockId) {
        case "wider-paddle":
            let drop = document.createElement("div");
            drop.classList.add("buff");
            drop.dataset.type = "widePaddle";
            let pixelsOnTheSide;
            pixelsOnTheSide = (parseInt(window.innerWidth)-boardWidth)/2
            drop.style.left = ((blockX + (blockX + blockWidth)) / 2) - pixelsOnTheSide - 20 + "px"; // 20px is half the buff size
            drop.style.bottom = ((blockY + (blockY + blockHeight)) / 2) + boardHeight/6 + "px";
            // let board = document.getElementById("board")
            block.appendChild(drop);
            setInterval(() => {
                drop.style.bottom = parseInt(drop.style.bottom) - 2 + "px";
                checkDropElement(block, drop);
            }, 10)




            break;
    }
}


function checkDropElement(block, drop) {
    if (parseInt(drop.style.bottom) <= 0) {
        drop.remove();
    } else if (isElementOverBar(drop)) {
        drop.remove();
        widerPaddle();
    }
}


function widerPaddle() {
    bar.style.width = "300px";
    barWidth = 300;
    setTimeout(() => {
        bar.style.width = "150px";
        barWidth = 150;
    }, 5000)
}

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
        clearAllTimers();
    }
}


function displayHeader() {
    let livesCounter = document.getElementById("lives");
    let timeCounter = document.getElementById("time");
    let scoreCounter = document.getElementById("block-score")
    livesCounter.innerText = `Lives: ${lives}`;
    timeCounter.innerText = `Time: ${time}`;
    scoreCounter.innerText = `Score: ${score}`;
}

function clearAllTimers() {
    for (let i = 1; i < timers.length; i++) {
        clearInterval(i);
    }
}

