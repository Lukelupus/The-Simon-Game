/// Variables

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


// Próxima sequencia do jogo


function nextSequence() {

userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);


  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);


  animatePress(randomChosenColour);
  playSound(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  level++;
  $("#level-title").text("Level " + level);


}


// Butões que o usuário aperta

$(".btn").on("click", function(event) {

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAwnser(userClickedPattern.length-1);


});


// Animações


function playSound(name) {

  var colourSound = new Audio("sounds/" + name + ".mp3");
  colourSound.play();


}

function animatePress(currentColour) {

  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);

}


// Game-Start


function gameStart() {


  if (started === true) {

    console.log(this.keydown);
  } else {

    nextSequence();
    started = true;
  }

}
$(document).on("keydown", gameStart);


// Checar a resposta


function checkAwnser(currentLevel) {


if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
  if (userClickedPattern.length === gamePattern.length)
    setTimeout(function() {
    nextSequence();
  }, 1000);

}
  else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Aperte qualquer tecla para recomeçar!");
    startOver();

  }

}

//Game Over

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
