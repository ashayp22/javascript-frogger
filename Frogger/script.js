// DO SOUND, CROCODILE/SNAKE
//KEEP PUSHES IN INITIALIZE ONLY
//DO SNAKE
//cars and logs
var car = new Image();
car.src = "resources/car1.png"; //need this to simply load the image into the browsers memory
var car2 = new Image();
car2.src = "resources/car2.png";
var car3 = new Image();
car3.src = "resources/car3.png";
var car4 = new Image();
car4.src = "resources/car4.png";

var log = new Image();
log.src = "resources/log.png";
var log2 = new Image();
log2.src = "resources/log2.png";

//animals
var frog = new Image();
frog.src = "resources/frog.png";
var frog2 = new Image();
frog2.src = "resources/Frog2.png";
var frog3 = new Image();
frog3.src = "resources/Frog3.png";
var frog4 = new Image();
frog4.src = "resources/Frog4.png";



var snake = new Image();
snake.src = "resources/snake.png";

var crocO = new Image();
crocO.src = "resources/FroggerOpen2.png";
var crocC = new Image();
crocC.src = "resources/FroggerClose2.png";

var cat = new Image();
cat.src = "resources/cat1.png";
var cat2 = new Image();
cat2.src = "resources/Cat2.png";
var cat3 = new Image();
cat3.src = "resources/cat3.png";
var cat4 = new Image();
cat4.src = "resources/cat4.png";

var penguin = new Image();
penguin.src = "resources/penguin.png";
var penguin2 = new Image();
penguin2.src = "resources/penguin2.png";
var penguin3 = new Image();
penguin3.src = "resources/penguin3.png";
var penguin4 = new Image();
penguin4.src = "resources/penguin4.png";



//other

var heart = new Image();
heart.src = "resources/heart.png";

var lilypad = new Image();
lilypad.src = "resources/lilypad.png";

var skull = new Image();
skull.src = "resources/skull.png";

var star = new Image();
star.src = "resources/star.png";

var clock = new Image();
clock.src = "resources/clock.png";


var carsRight = []; //for all cars moving right
var carsLeft = []; //for all cars moving left
var carsWidth = [70, 70, 50, 50, 70, 70, 70, 50, 70, 70, 50, 70, 50, 50, 120, 120, 50, 120, 50, 120]; //width of cars


var logsRight = []; //for all logs moving right
var logsLeft = []; //for all logs moving left
var logsWidth = [100, 100, 200, 200, 50, 50, 100, 100,75, 75]; //width of logs
var homePos = [50, 170, 290, 410, 530]; //x position of the frog's homes
var homePos2 = []; //will also contain the position of the frog's homes
var heartPos = [120, 150, 180, 210, 240, 270, 300]; //x position of the hearts in the scorebox

var rcarBound = 6;
var lcarBound = 4;

var lives = 7; //lives player has
var score = 0; //score
var highScore = 0; //highScore
var level = 1; //level player is on
var round = 0; //round player is on
//1 level = 5 rounds
var a; //for animation
var gameover = false; //if the player lost
var carSpeed = 0.5; //how much the car moves each frame
var logSpeed = 1; //same as above
//used for knowing where the frog died
var dfrogl;
var dfrogt;
//for a timer
var seconds = 0;
var time;
//if a heart should be drawn
var drawHeart;
//heart's x and y
var heartX;
var heartY;
//same as above but with a star and clock
var drawStar;
var starX;
var starY;

var drawClock;
var clockX;
var clockY;


var boolean = false; //for pause/continue buttons so player can't abuse them

var enter = true; //so player can't press enter more than once

var timerLength = 120; //time player has each round (60 seconds)

//for crocodile timer
var crocCount = 1;
var crocTimer;
var crocOn = false;

//for snake moving

var snakeL = 650;
var snakeT = 505;
var snakeSpeed = 1.5;
var drawSnake = false;

//array of all four frogs and amount of frogs playing
var frogArray = [];
var frogNum = 0;

var theme = 1; //theme of game


//draws game board
function drawBackground() {
    drawGrass();
    drawWater();
    drawRoad();
    drawHome();
    display();

}

function drawGrass() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.fillStyle= "#13691d";
    ctx.fillRect(0,0,650,850);
}

function drawRoad() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.fillStyle= "#605f5f";
    ctx.fillRect(0,550,window.innerWidth,250);
    drawDashed();
}
function drawWater() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.fillStyle= "#a5c5ff";
    ctx.fillRect(0,150,window.innerWidth,350);
}
function drawHome() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.fillStyle= "#3bdb13";
    ctx.fillRect(0,150,window.innerWidth,25);
    ctx.fillRect(0,175,50,75);
    ctx.fillRect(120,175,50,75);
    ctx.fillRect(240,175,50,75);
    ctx.fillRect(360,175,50,75);
    ctx.fillRect(480,175,50,75);
    ctx.fillRect(600,175,50,75);
}

function drawDashed() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "#FFFFFF";
    ctx.setLineDash([10, 20]);
    ctx.moveTo(0, 750);
    ctx.lineTo(650, 750);
    ctx.moveTo(0, 700);
    ctx.lineTo(650, 700);
    ctx.moveTo(0, 650);
    ctx.lineTo(650, 650);
    ctx.moveTo(0, 600);
    ctx.lineTo(650, 600);
    ctx.stroke();
}

//sets game theme
function setTheme(x) {
    theme = x;
}



//initialize functions onload



function initialize(x) {
    drawBackground();
    initializeLogs(); //same with logs
    initializeCars(); //same with cars
    drawFrogHome(); //draws the frog home

}

function initializeFrog(x) {
    frogNum = x;
    enter = false;
    document.getElementById("type").style.visibility = "hidden";
    document.getElementById("type2").style.visibility = "hidden";
    var ctx = document.getElementById("canvas").getContext("2d");
    // frog = createImage("resources/frog.png", "frog", 300,805);
    // frog2 = createImage("resources/Frog2.png", "frog2", 300,805);
    // frog3 = createImage("resources/Frog3.png", "frog3", 300,805);
    // frog4 = createImage("resources/Frog4.png", "frog4", 300,805);
    if(theme === 1) {
        frogArray.push(createImage("resources/frog.png", "frog", 300, 805));
        frogArray.push(createImage("resources/Frog2.png", "frog2", 300, 805));
        frogArray.push(createImage("resources/Frog3.png", "frog3", 300, 805));
        frogArray.push(createImage("resources/Frog4.png", "frog4", 300, 805));
    } else if(theme === 2) {
        frogArray.push(createImage("resources/cat1.png", "frog5", 300, 805));
        frogArray.push(createImage("resources/Cat2.png", "frog6", 300, 805));
        frogArray.push(createImage("resources/cat3.png", "frog7", 300, 805));
        frogArray.push(createImage("resources/cat4.png", "frog8", 300, 805));
    } else if(theme === 3) {
        frogArray.push(createImage("resources/penguin.png", "frog9", 300, 805));
        frogArray.push(createImage("resources/penguin2.png", "frog10", 300, 805));
        frogArray.push(createImage("resources/penguin3.png", "frog11", 300, 805));
        frogArray.push(createImage("resources/penguin4.png", "frog12", 300, 805));
    }



    for(var i = 0; i < frogNum; i++) {
        ctx.drawImage(frogArray[i], frogArray[i].left, frogArray[i].top, 40, 40);
    }

}

function initializeLogs() {
    var ctx = document.getElementById("canvas").getContext("2d");
    logsRight.push(createImage("resources/log.png", "log1", 100,450));
    logsRight.push(createImage("resources/log.png", "log1", 420,450));

    logsRight.push(createImage("resources/log2.png", "log2", 0,350));
    logsRight.push(createImage("resources/log2.png", "log2", 457,350));

    logsRight.push(createImage("resources/log.png", "log3", 190,250));
    logsRight.push(createImage("resources/log.png", "log3", 5,250));


    logsLeft.push(createImage("resources/log.png", "log1", 10,400));
    logsLeft.push(createImage("resources/log.png", "log1", 320,400));

    logsLeft.push(createImage("resources/log.png", "log2", 55,300));
    logsLeft.push(createImage("resources/log.png", "log2", 435,300));

    for (var j = 0;j < logsRight.length;j++) {
        ctx.drawImage(logsRight[j],logsRight[j].left, logsRight[j].top,logsWidth[j],50);
    }

    for (var n = 0;n < logsLeft.length;n++) {
        ctx.drawImage(logsLeft[n],logsLeft[n].left, logsLeft[n].top,logsWidth[n+6],50);
    }
}

function initializeCars() {
    var ctx = document.getElementById("canvas").getContext("2d");
    //on initialize
    carsRight.push(createImage("resources/car2.png", "car1", 100,750));
    carsRight.push(createImage("resources/car2.png", "car2", 300,750));
    carsRight.push(createImage("resources/car4.png", "car4", 235,650));
    carsRight.push(createImage("resources/car4.png", "car5", 50,650));
    carsRight.push(createImage("resources/car2.png", "car7", 467,550));
    carsRight.push(createImage("resources/car2.png", "car8", 247,550));
    //second group
    carsRight.push(createImage("resources/car2.png", "car3", 650,750));
    carsRight.push(createImage("resources/car4.png", "car6", 500,650));
    carsRight.push(createImage("resources/car2.png", "car9", 0,550));
    //third group
    carsRight.push(createImage("resources/car2.png", "car3", 200,750));
    carsRight.push(createImage("resources/car4.png", "car6", 100,650));
    carsRight.push(createImage("resources/car2.png", "car9", 500,550));

    //on initialize
    carsLeft.push(createImage("resources/car1.png", "car1", 590,700));
    carsLeft.push(createImage("resources/car1.png", "car2", 100,700));
    carsLeft.push(createImage("resources/car3.png", "car3", 250,600));
    carsLeft.push(createImage("resources/car3.png", "car4", 750,600));
    //second group
    carsLeft.push(createImage("resources/car1.png", "car1", 300,700));
    carsLeft.push(createImage("resources/car3.png", "car3", 0,600));
    //third group
    carsLeft.push(createImage("resources/car1.png", "car1", 400,700));
    carsLeft.push(createImage("resources/car3.png", "car3", 400,600));

    for (var i = 0;i < rcarBound;i++){

        ctx.drawImage(carsRight[i],carsRight[i].left, carsRight[i].top,carsWidth[i],50);
    }

    for (var z = 0;z < lcarBound;z++){
        ctx.drawImage(carsLeft[z],carsLeft[z].left, carsLeft[z].top,carsWidth[z+12],50);
    }

}




var createImage = function(src, title,x,y) {
    var img   = new Image();
    img.src   = src;
    img.alt   = title;
    img.title = title;
    img.left = x;
    img.top = y;
    return img;
};



$(document).keydown(function(event){
    var keycode = event.keyCode ? event.keyCode : event.which;
    if(gameover === false && boolean === false) {
        //player 1
        if(keycode === 87) //w
        {
            frogArray[0].top -= 50;
            score += 10;

        }
        if(keycode === 65) //a
        {
            frogArray[0].left -= 50;
        }
        if(keycode === 68) //d
        {
            frogArray[0].left += 50;
        }
        if(keycode === 83) //s
        {
            frogArray[0].top += 50;
        }

        //player 2

        if(keycode === 38) //up
        {
            frogArray[1].top -= 50;
            score += 10;

        }
        if(keycode === 37) //left
        {
            frogArray[1].left -= 50;
        }
        if(keycode === 39) //right
        {
            frogArray[1].left += 50;
        }
        if(keycode === 40) //down
        {
            frogArray[1].top += 50;
        }

        //player 3

        if(keycode === 84) //t
        {
            frogArray[2].top -= 50;
            score += 10;

        }
        if(keycode === 70) //f
        {
            frogArray[2].left -= 50;
        }
        if(keycode === 72) //h
        {
            frogArray[2].left += 50;
        }
        if(keycode === 71) //g
        {
            frogArray[2].top += 50;
        }

        //player 4
        if(keycode === 73) //i
        {
            frogArray[3].top -= 50;
            score += 10;

        }
        if(keycode === 74) //j
        {
            frogArray[3].left -= 50;
        }
        if(keycode === 76) //l
        {
            frogArray[3].left += 50;
        }
        if(keycode === 75) //k
        {
            frogArray[3].top += 50;
        }




        if(keycode === 13) { //enter
            startGame();
        }

    }

    if(keycode === 82) //r if the player wants to restart the game
    {
        reset();
    }
    if(keycode === 27) //tab if the player wants to restart all
    {
        resetAll();
    }

    if(keycode === 80) { //p for pause
        pauseGame();
    }

    if(keycode === 9) { //tab for help
       help();
    }

    if(keycode === 67) { //c for controls
        controls();
    }

});

function controls() {
    alert("Press enter key to start after choosing amount of players, restarting or restarting all, Press r key to restart, Press esc key to restart all, Press p key to pause/continue, Press tab key for help");
}


//display score box
function display() {
    drawHeader(); //FROGGER
    drawScoreBox();
    drawLives(); //hearts
    drawTimer(); //60 second timer
}

//game timer
function drawTimer() {
    var ctx = document.getElementById("canvas").getContext("2d");
    //time text
    ctx.fillStyle = "#fafff3";
    ctx.font = "20px Arial";
    ctx.textAlign='left';
    ctx.fillText("Time:", 440,130);

    ctx.fillStyle = "#b90eff";
    ctx.fillRect(520, 105, timerLength, 30);

}


//timer for drawing time
function gameTimer(time)
{
    timerLength -= 1;
    if(timerLength === 0) {
        clearInterval(time);
        lives = 0;
        heartPos.splice(heartPos.length-1, 1);
        score -= 50;
        gameover = true;
        //so the skull can be drawn in the correct place
        dfrogl = frog.left;
        dfrogt = frog.top;
        for(var i = 0; i < frogNum; i++) {
            resetFrog(i);
        }
    }
}




function drawScoreBox() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.fillStyle = "#fafff3";
    ctx.font = "30px Arial";
    ctx.textAlign='left';
    ctx.fillText("Level: " + level,400,100);


    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score,10,130);
    ctx.fillText("HighScore: " + highScore,200,130);

}

function drawHeader() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.fillStyle = "#fafff3";
    ctx.font = "50px Arial";
    ctx.textAlign='center';
    ctx.fillText("FROGGER",325,50);
}

function drawLives() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.fillStyle = "#fafff3";
    ctx.font = "30px Arial";
    ctx.textAlign='left';
    ctx.fillText("Lives: " ,10,100);
    drawHearts();
}

//display hearts in score box
function drawHearts() {
    var ctx = document.getElementById("canvas").getContext("2d");
    for(var i = 0; i < heartPos.length; i++) {
        ctx.drawImage(heart, heartPos[i], 75, 30, 30);
    }
}



function animate() {
    a=requestAnimationFrame(animate);
    drawBackground(); //draws background
    checkWin(); //checks if player won
    //draws cars
    drawCarRight();
    drawCarLeft();
    //draws logs
    drawLogRight();
    drawLogLeft();
    //move the frog
    moveFrog();
    //draw the homes
    drawFrogHome();
    //call collision function
    collide();
    //if an extra heart or point is to be drawn
    if(drawHeart === true) {
        drawHearts2();
    }
    if(drawStar === true) {
        drawStars();
    }
    if(drawClock === true) {
        drawClocks();
    }
    if(drawSnake === true) {
        drawSnakes();
    }
}

//draws snake moving across grass
function drawSnakes() {
    var ctx = document.getElementById("canvas").getContext("2d");
    snakeL -= snakeSpeed;
    ctx.drawImage(snake, snakeL, 505, 80, 40);
    if(snakeL <= -80) {
        drawSnake = false;
        snakeL = 650;
        snakeT = 505;
    }
}


//display skull after frog dies
function drawSkull() {
    var ctx = document.getElementById("canvas").getContext("2d");
    stopAnimation();
    ctx.drawImage(skull, dfrogl, dfrogt, 40, 40);
    seconds = 0;
    var timer = setInterval(function(){startTime(timer)},250);
}

//timer for drawSkull()
function startTime(timer)
{
    if(seconds === 3) {
        if(lives !== 0) {
            gameover = false;
        }
        clearInterval(timer);
        animate();
    } else {
        seconds += 1;
    }



}

function stopAnimation() {
    cancelAnimationFrame(a);
}

//collision with frog and cars/logs
function collide() {
    checkWaterLeft();
    checkWaterRight();
    checkCarRight();
    checkCarLeft();
    if(drawHeart === true) {
        heartCollide();
    }
    if(drawStar === true) {
        starCollide();
    }
    if(drawClock === true) {
        clockCollide();
    }
    if(drawSnake === true) {
        snakeCollide();
    }
}





//frog functions
function moveFrog() {
    var ctx = document.getElementById("canvas").getContext("2d");
    if(gameover === true && lives !== 0) {
        drawSkull();
    } else {
        for(var i = 0; i < frogNum; i++) {
            ctx.drawImage(frogArray[i], frogArray[i].left, frogArray[i].top, 40, 40);
            outOfBounds();
        }
    }
    for(var j = 0; j < frogNum; j++) {
        if(frogArray[j].top === 505) {
            drawSnake = true;
        }
    }


}
//draws home
function drawFrogHome() {
    var ctx = document.getElementById("canvas").getContext("2d");

    for(var j = 0; j < 5; j++) {
        ctx.drawImage(lilypad, 70 +(120 * j), 210, 30, 30);
    }

    for(var q = 0; q < homePos2.length; q++) {
        if(theme === 1) {
            ctx.drawImage(frog, homePos2[q] + 5, 195, 60, 60);
        } else if(theme === 2) {
            ctx.drawImage(cat, homePos2[q] + 5, 195, 60, 60);
        } else {
            ctx.drawImage(penguin, homePos2[q] + 5, 195, 60, 60);
        }
    }



}

//checks if frog is out of bounds
function outOfBounds() {
    for(var i = 0; i < frogNum; i++) {
        if (frogArray[i].left <= -50 || frogArray[i].left >= 650 || frogArray[i].top >= 850) {
            deadFrog(i);
        }
    }
}

//car functions

function drawCarRight() {
    for (var i = 0;i < rcarBound;i++){
        var ctx = document.getElementById("canvas").getContext("2d");
        carsRight[i].left += carSpeed;
        if(carsRight[i].left >= 700) {
            carsRight[i].left = -50;
        }
        ctx.drawImage(carsRight[i],carsRight[i].left, carsRight[i].top,carsWidth[i],50);
    }
}

function drawCarLeft() {
    for (var i = 0;i < lcarBound;i++){
        var ctx = document.getElementById("canvas").getContext("2d");
        carsLeft[i].left -= carSpeed;
        if(carsLeft[i].left <= -50) {
            carsLeft[i].left = 650;
        }
        ctx.drawImage(carsLeft[i],carsLeft[i].left, carsLeft[i].top,carsWidth[i+12],50);
    }
}


function checkCarRight() {
    for(var j = 0; j < frogNum; j++) {
        for(var i = 0; i < rcarBound; i++) {
            if (frogArray[j].left < carsRight[i].left + carsWidth[i] && frogArray[j].left + 40 > carsRight[i].left && frogArray[j].top < carsRight[i].top + 50 && frogArray[j].top + 40 > carsRight[i].top) {
                deadFrog(j);
            }
        }
    }
}

function checkCarLeft() {
    for(var j = 0; j < frogNum; j++) {
        for(var i = 0; i < lcarBound; i++) {
            if (frogArray[j].left < carsLeft[i].left + carsWidth[i + 12] && frogArray[j].left + 40 > carsLeft[i].left && frogArray[j].top < carsLeft[i].top + 50 && frogArray[j].top + 40 > carsLeft[i].top) {
                deadFrog(j);
            }
        }
    }
}

//log functions

function drawLogRight() {
    for (var i = 0;i < logsRight.length;i++){
        var ctx = document.getElementById("canvas").getContext("2d");
        logsRight[i].left += logSpeed;
        if(logsRight[i].left >= 700) {
            logsRight[i].left = -50;
        }
        ctx.drawImage(logsRight[i],logsRight[i].left, logsRight[i].top,logsWidth[i],50);
    }
}


function drawLogLeft() {
    for (var i = 0;i < logsLeft.length;i++){
        var ctx = document.getElementById("canvas").getContext("2d");
        logsLeft[i].left -= logSpeed;
        if(logsLeft[i].left <= -50) {
            logsLeft[i].left = 650;
        }
        ctx.drawImage(logsLeft[i],logsLeft[i].left, logsLeft[i].top,logsWidth[i+6],50);
    }
}

function checkWaterRight() {
    for(var i = 0; i < frogNum; i++) { //loop through every frog playing
        if (frogArray[i].top <= 455 && frogArray[i].top >= 255 && ((frogArray[i].top - 5) / 50) % 2 !== 0) { //to make sure frog is in correct lane and is in the water
            var boolean = false;
            for (var j = 0; j < logsRight.length; j++) { //for every log moving right
                //collision with every frog and every frog
                if (frogArray[i].left < logsRight[j].left + logsWidth[j] && frogArray[i].left + 40 > logsRight[j].left && frogArray[i].top < logsRight[j].top + 50 && frogArray[i].top + 40 > logsRight[j].top) {
                    if (crocOn === true) { //if the croccodiles are already introduced and their mouthes are open
                        if (j === 2 || j === 3) { //make sures the logs in this part of the for loop are the two croccodiles
                            //checks if frog isn't in croccodile mouth
                            if (!(frogArray[i].left < logsRight[j].left + logsWidth[j] && frogArray[i].left + 40 > logsRight[j].left + 160 && frogArray[i].top < logsRight[j].top + 50 && frogArray[i].top + 40 > logsRight[j].top)) {
                                boolean = true; //frog is safe
                            }
                        } else { //if the croccodiles mouth is open but the logs aren't the croccodiles
                            boolean = true;
                        }
                    } else { //the croccodiles mouth isn't open but the frog is on a log
                        boolean = true;
                    }
                }

            }
            if (boolean === true) {
                frogArray[i].left += logSpeed;
            } else {
                deadFrog(i);
            }
        }
    }
}

function checkWaterLeft() {
    for(var i = 0; i < frogNum; i++) { //loop through every frog playing
        if (frogArray[i].top <= 455 && frogArray[i].top >= 255 && ((frogArray[i].top - 5) / 50) % 2 === 0) { //to make sure frog is in correct lane and is in the water
            var boolean = false;
            for (var j = 0; j < logsLeft.length; j++) {
                if (frogArray[i].left < logsLeft[j].left + logsWidth[j + 6] && frogArray[i].left + 40 > logsLeft[j].left && frogArray[i].top < logsLeft[j].top + 50 && frogArray[i].top + 40 > logsLeft[j].top) {
                    boolean = true;

                }

            }
            if (boolean === true) {
                frogArray[i].left -= logSpeed;
            } else {
                deadFrog(i);
            }
        }
    }
}

//when frog dies
function deadFrog(x) {
    lives -= 1;
    heartPos.splice(heartPos.length-1, 1);
    score -= 50;
    gameover = true;
    dfrogl = frogArray[x].left;
    dfrogt = frogArray[x].top;
    resetFrog(x);
    var rand = getRandomInt(1, 10);
    if(rand === 7) {
        drawHeart = true;
        heartX = getRandomInt(0, 620); //picks random x within range
        heartY = (50*(getRandomInt(0, 4))) + 560; //picks random y within range
    }
    var rand2 = getRandomInt(1, 10);
    if(rand2 === 3) {
        drawStar = true;
        starX = getRandomInt(0, 620);
        starY = (50*(getRandomInt(0, 4))) + 560;
    }
    var rand3 = getRandomInt(1, 10);
    if(rand3 === 9) {
        drawClock = true;
        clockX = getRandomInt(0, 620);
        clockY = (50*(getRandomInt(0, 4))) + 560;
    }
}

function getRandomInt(min, max) { //return random int
    return Math.floor(Math.random() * (max - min)) + min;
}

//draws the extra hearts
function drawHearts2() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.drawImage(heart, heartX, heartY, 30, 30);
}

//collision for extra hearts
function heartCollide() {
    for(var i = 0; i < frogNum; i++) { //loop through every frog playing
        if (frogArray[i].left < heartX + 30 && frogArray[i].left + 40 > heartX && frogArray[i].top < heartY + 30 && frogArray[i].top + 40 > heartY) {
            drawHeart = false;
            heartPos.push(120 + (heartPos.length * 30));
            lives += 1;
        }
    }
}

//same with extra stars
function drawStars() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.drawImage(star, starX, starY, 30, 30);
}

//collision with extra stars
function starCollide() {
    for(var i = 0; i < frogNum; i++) { //loop through every frog playing
        if (frogArray[i].left < starX + 30 && frogArray[i].left + 40 > starX && frogArray[i].top < starY + 30 && frogArray[i].top + 40 > starY) {
            drawStar = false;
            score += 200;
        }
    }
}

//same with extra stars
function drawClocks() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.drawImage(clock, clockX, clockY, 30, 30);
}

//collision with extra stars
function clockCollide() {
    for(var i = 0; i < frogNum; i++) { //loop through every frog playing
        if (frogArray[i].left < clockX + 30 && frogArray[i].left + 40 > clockX && frogArray[i].top < clockY + 30 && frogArray[i].top + 40 > clockY) {
            drawClock = false;
            timerLength += 20;
        }
    }
}

function snakeCollide() {
    for(var i = 0; i < frogNum; i++) { //loop through every frog playing
        if (frogArray[i].left < snakeL + 80 && frogArray[i].left + 40 > snakeL && frogArray[i].top < snakeT + 40 && frogArray[i].top + 40 > snakeT) {
            deadFrog(i);
        }
    }
}


function resetFrog(x) { //resets left and top values of frog, but doesn't redraw it
    frogArray[x].left = 300;
    frogArray[x].top = 805;
    if(lives === 0) {
        stopAnimation();
        var ctx = document.getElementById("canvas").getContext("2d");
        ctx.fillStyle = "#fff95b";
        ctx.font = "30px Arial";
        ctx.fillText("GAMEOVER", 235,525);
        gameover = true;
    }
}

//checks if player won
function checkWin() {
    for(var i = 0; i < frogNum; i++) { //loop through every frog playing
        for (var b = 0; b <= homePos.length; b++) { //loop through every home available
            if (frogArray[i].left < homePos[b] && frogArray[i].left + 40 > homePos[b] - 50 && frogArray[i].top <= 205) { //in between homes
                deadFrog(i);
            } else if (frogArray[i].left < homePos2[b] + 70 && frogArray[i].left + 40 > homePos2[b] && frogArray[i].top <= 205) { //in homes already taken
                deadFrog(i);
            } else if (frogArray[i].left < homePos[b] + 70 && frogArray[i].left + 40 > homePos[b] && frogArray[i].top <= 205) {
                homePos2.push(homePos[b]);
                drawFrogHome();
                homePos.splice(b, 1);
                score += 100;
                round += 1;
                resetFrog(i);
                if (round === 5) {
                    clearInterval(time);
                    NextLevel();
                }
            }
        }
    }
}

//move onto the next level
function NextLevel() {
    //increases speed, time or amount of cars and logs drawn
    round = 0;
    level += 1;
    homePos = [50, 170, 290, 410, 530];
    homePos2 = [];
    logSpeed += 0.5;
    carSpeed += 0.5;
    lcarBound += 1;
    rcarBound += 1;
    timerLength = 120;
    snakeSpeed += 0.5;
    if(lcarBound > 8) { //once all 8 cars are out it stops increasing
        lcarBound = 8;
    }
    if(rcarBound > 12) { //same as above
        rcarBound = 12;
    }
    if(logSpeed >= 4 && carSpeed >= 4) { //once both speeds hit 5 it stops increasing, and the timer decreases
        timerLength -= 0.75*carSpeed;
    }
    if(level === 3) { //when croccodiles get introduced
        logsRight.splice(2, 2, createImage("resources/FroggerClose2.png", "crocC1", 0,350), createImage("resources/FroggerClose2.png", "crocC2", 457,350));
        crocTimer = setInterval(function(){crocTimers()},7000);
    }


    time = setInterval(function(){gameTimer(time)},1000);
}


function crocTimers() {
    crocCount += 1;
    //every seven seconds, the croccodile will keep its mouth either open or closed
    if(crocCount%2 === 0) {
        logsRight.splice(2, 2, createImage("resources/FroggerOpen2.png", "crocC1", 0,350), createImage("resources/FroggerOpen2.png", "crocC2", 457,350));
        crocOn = true;

    } else {
        logsRight.splice(2, 2, createImage("resources/FroggerClose2.png", "crocC1", 0,350), createImage("resources/FroggerClose2.png", "crocC2", 457,350));
        crocOn = false;
    }
}




//when player clicks r, resets game
function reset() {
    stopAnimation();
    if(score > highScore) {
        highScore = score;
    }

    for(var i = 0; i < frogNum; i++) {
        resetFrog(i);
    }
    homePos = [50, 170, 290, 410, 530];
    homePos2 = [];
    heartPos = [120, 150, 180, 210, 240, 270, 300];
    clearInterval(time);

    if(level >= 3 ) {
        logsRight.splice(2, 2, createImage("resources/log2.png", "log2", 0, 350), createImage("resources/log2.png", "log2", 457, 350));
    }
    //resets all variables
    lives = 7;
    score = 0;
    level = 1;
    round = 0;
    gameover = false;
    carSpeed = 0.5;
    logSpeed = 1;
    timerLength = 120;

    dfrogl = "";
    dfrogt = "";

    seconds = 0;
    drawHeart = false;
    heartX = "";
    heartY = "";

    drawStar = false;
    starX = "";
    starY = "";

    drawClock = false;
    clockX = "";
    clockY = "";

    rcarBound = 6;
    lcarBound = 4;
    enter = false;

    boolean = false;


    crocCount = 1;
    crocOn = false;

    snakeL = 650;
    snakeT = 505;
    snakeSpeed = 1.5;
    drawSnake = false;


}

function resetAll() {
    reset();
    logsRight = [];
    logsLeft = [];
    carsLeft = [];
    carsRight = [];
    carsWidth = [70, 70, 50, 50, 70, 70, 70, 50, 70, 70, 50, 70, 50, 50, 120, 120, 50, 120, 50, 120]; //width of cars
    logsWidth = [100, 100, 200, 200, 50, 50, 100, 100,75, 75]; //width of logs
    frogArray = [];
    frogNum = 0;
    //allows the player to choose theme again and number of players
    enter = true;
    document.getElementById("type").style.visibility = "visible";
    document.getElementById("type2").style.visibility = "visible";
    initialize(); //so the canvas looks like when it was loaded

}

//button or keypress functions

function startGame() {
    if(enter === false) {
        enter = true; //so player can't press enter more than once
        animate();
        time = setInterval(function () { //sets timer for 60 seconds
            gameTimer(time)
        }, 500);
        //audioPlay(1);
    }
}


function pauseGame() {
    if(boolean === false) { //on pause
        stopAnimation();
        boolean = true;
        clearInterval(time);
    } else if(boolean === true) { //game continues
        animate();
        time = setInterval(function(){gameTimer(time)},500);
        boolean = false;
    }
}


function help() {
    alert("Controls: W, T, I, and Up Arrow is up. S, G, K, and Down Arrow is down. A, F, J and Left Arrow is left. And D, H, L and Right Arrow is right. The goal of the game is to get the frog into its five homes at the top of the screen. Avoid the cars, snakes and crocodiles, while using the logs as transportation. Also, hearts, stars and clocks all act as power ups. To get to the highest round possible, join together with up to 3 people to play together. Remember there is a timer!");
}
