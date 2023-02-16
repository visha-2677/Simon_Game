var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var toggle = false;
var level = 0;
$(".start-btn").click(function () {
    if (!toggle) {
        $("#level-title").text("Level " + level);
        nextSequence();
        toggle = true;
    }
    $(".click-hide-show").hide();
});
$(".btn").click(function () {
    // nextSequence();
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // last check index
    checkAnswer(userClickedPattern.length-1);
})
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("succses");

        if (userClickedPattern.length === gamePattern.length) {

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over,click start");
      $(".click-hide-show").show();
        startOver();
    }
}
function nextSequence() {
    // empy userclicjedPattern because user can enter new pattern
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomeNum = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomeNum];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function startOver(){
    level=0;
    gamePattern=[];
    toggle=false;
}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {
        $("." + currentColour).removeClass("pressed");
    }, 200);
}

