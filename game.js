var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// note when user press any key to start the game

$(document).keypress(function (){
    if(started===false){
        nextSequence();
        started=true;
    }
});
  
// keep track whenever of whick key clicked

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress($(this));
    check(userClickedPattern.length-1);
});

// check whether the keys pressed by user is align with the input

function check(len){
    if(gamePattern[len]===userClickedPattern[len]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        playAgain();
    }
}

// input for next level

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level "+level);
    var randomNum = Math.floor(Math.random()*4);
    var randomColor = buttonColors[randomNum];
    gamePattern.push(randomColor);
    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

// plays sound

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

// for animation

function animatePress(obj){
    obj.addClass("pressed");
    setTimeout(() => {
        obj.removeClass("pressed");
    }, 100);
}

// when game ends

function playAgain(){
    level=0;
    gamePattern = [];
    started = false;
}