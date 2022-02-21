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
})

// Generates a random number between 0 and 3, to be used to index buttonColors
let nextSequence = () => {
  let num = Math.floor(Math.random() * 4);
  let chosenColor = buttonColors[num];
  gamePattern.push(chosenColor);

  animateButton(chosenColor);
}

// Listen for user key press to start the game
$(document).on("keydown", () => {
  nextSequence();
});
