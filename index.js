/* Game variables */
let buttonColors = ["red", "blue", "green", "yellow"];
let sounds = {
  "red": new Audio("sounds/red.mp3"),
  "blue": new Audio("sounds/blue.mp3"),
  "green": new Audio("sounds/green.mp3"),
  "yellow": new Audio("sounds/yellow.mp3"),
  "wrong": new Audio("sounds/wrong.mp3"),
}
let gamePattern = [];
let userPattern = [];
let gameStarted = false;
let level = 0;

// Display a 'flash' animation to user and play the sound
let flashButton = (color) => {
  let button = $("#" + color);
  button.fadeOut(100).fadeIn(100);
}

let playSound = (color) => {
  let sound = sounds[color];
  sound.play();
}

let animateButton = (color) => {
  flashButton(color);
  playSound(color);
}

let animateUserPress = (color) => {
  $("#" + color).addClass("pressed");
  setTimeout((button) => {
    $("#" + color).removeClass("pressed");
  }, 100);
}

// Button click listener
$(".btn").click(function() {
  let userChosenColor = $(this).attr("id");
  userPattern.push(userChosenColor);

  animateUserPress(userChosenColor);
  playSound(userChosenColor);

  checkAnswer(userPattern.length - 1);
})

// Generates a random number between 0 and 3, to be used to index buttonColors
let nextSequence = () => {
  let num = Math.floor(Math.random() * 4);
  let chosenColor = buttonColors[num];
  gamePattern.push(chosenColor);
  animateButton(chosenColor);

  // Game logic
  level++;
  updateTitle();
  userPattern = [];
}

let updateTitle = () => {
  $("h1").text("Level " + level);
}

let checkAnswer = (index) => {
  if (userPattern[index] == gamePattern[index]) {
    handleCorrectPress();
  } else {
    handleGameOver();
  }
}

/* Check answer helper functions */
let handleCorrectPress = () => {
  if (userPattern.length == gamePattern.length) {
    setTimeout(() => {
      nextSequence();
    }, 1000);
  }
}

let handleGameOver = () => {
  $("h1").text("Game Over, Press Any Key to Restart");
  resetGame();
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 250);
}

let resetGame = () => {
  level = 0;
  userPattern = [];
  gamePattern = [];
  gameStarted = false;
}

// Listen for user key press to start the game
$(document).on("keydown", () => {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});
