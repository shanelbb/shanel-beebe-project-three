/*
************ ACCESSIBILITY CONSIDERATIONS ***********
1. Create an accessiblity mode with only named colours
have the colour names displayed on the buttons. users guess which one matches the rgb value. 
*/

const app = {};

// cached selectors
const $buttons = $(".colourButton");
const $background = $("body");
const $colorValue = $("#colourValue");
const $answerMessage = $("#answer");
const $gamePage = $(".gamePage");
const $startPage = $(".startPage");
const $next = $(".nextQuestion");
const $final = $(".finalScore");
const $score = $(".finalScoreMessage");

// keeps gamePage hiddend until level button is clicked
app.landingPage = function() {
  $gamePage.hide();
  $final.hide();
};

// resets background to original color
const resetBackGround = () => {
  $background.attr("style", "background-color: #adadad");
};

// resets answerMessage under color $buttons to original message
const answerMessageReset = () => {
  $answerMessage.html("Choose carefully!");
};

// resets background color and answer message
const resetPlay = () => {
  resetBackGround();
  answerMessageReset();
};

// resets game to startPage
app.reset = () => {
  app.landingPage();
  $startPage.show();
  resetPlay();
  resetScore();
  resetCounter();
};

let score = 0;

const resetScore = () => {
  score = 0;
  return score;
};

const maxQuestions = 10;
let questionCounter = 0;

// Move user to next question. Called when "next color" button is clicked
const setNextQ = () => {
  resetPlay();
  questionCounter++;
  endGame();
};

const endGame = () => {
  if (questionCounter === maxQuestions) {
    $gamePage.hide();
    $final.show();
    $score.html(`Your final score is: </br>
    ${score} / 10`);
  }
};

const resetCounter = () => {
  questionCounter = 0;
  return questionCounter;
};

// sets the game up in rgb/easy mode
const rgbMode = function() {
  // a function to set the button color using an rgb value
  const setRGBButtonColour = function(button, red, green, blue) {
    $(button).css(`background-color`, `rgb(${red}, ${green}, ${blue})`);
  };

  // a function to generate a random number between 0 and 255
  const makeRGBValue = () => {
    return Math.floor(Math.random() * 256);
  };

  // generates a random numer between 0 and 3 or number of buttons - 1.
  const answerButton = Math.floor(Math.random() * ($buttons.length - 1));

  // a loop to set each button to a random rgb value
  for (let i = 0; i < $buttons.length; i++) {
    const red = makeRGBValue();
    const green = makeRGBValue();
    const blue = makeRGBValue();
    setRGBButtonColour($buttons[i], red, green, blue);

    // if value of answerButton equals index of $buttons (above) display the corresponding colour code in the h2 with the class of colorValue

    if (i === answerButton) {
      $colorValue.html(`Colour Code: </br>
   rgb(${red}, ${green}, ${blue})`);
    }

    // event handler that displays "Correct" or "Wrong" based on user input. Also changes background to correct answer colour.
    $($buttons[i])
      .off()
      .one("click", function() {
        if (this === $buttons[answerButton]) {
          score++;
          console.log(score);
          $answerMessage.html("Correct!");
          $background.css(`background-color`, `rgb(${red}, ${green}, ${blue})`);
          $buttons.css(`background-color`, `rgb(${red}, ${green}, ${blue})`);
        } else {
          $answerMessage.html("Wrong answer!");
          $buttons.css(`background-color`, `#adadad`);
          resetBackGround();
          console.log(score);
        }
      });
  }
};

const hslMode = function() {
  // a function to set the button color using an hsl value
  const setHSLButtonColour = function(button, h, s, l) {
    $(button).css(`background-color`, `hsl(${h}, ${s}%, ${l}%)`);
  };

  // a function to generate a random number between 0 and 360 for the hue value
  const makeHValue = () => {
    return Math.floor(Math.random() * 361);
  };

  // a function to generate a random number between 0 and 100 for the saturation and lightness values
  const makeSLValues = () => {
    return Math.floor(Math.random() * 101);
  };

  // generates a random numer between 0 and 3 or number of buttons - 1.
  const answerButton = Math.floor(Math.random() * ($buttons.length - 1));

  // a loop to set each button to a random hsl value
  for (let i = 0; i < $buttons.length; i++) {
    const hue = makeHValue();
    const saturation = makeSLValues();
    const light = makeSLValues();
    setHSLButtonColour($buttons[i], hue, saturation, light);

    // if value of answerButton equals index of $buttons (above) display the corresponding colour code in the h2 with the class of colorValue

    if (i === answerButton) {
      $colorValue.html(`Colour Code: </br> 
   hsl(${hue}, ${saturation}%, ${light}%)`);
    }

    $($buttons[i])
      .off()
      .one("click", function() {
        if (this === $buttons[answerButton]) {
          score++;
          $answerMessage.html("Correct!");
          $background.css(
            `background-color`,
            `hsl(${hue}, ${saturation}%, ${light}%)`
          );
          $buttons.css(
            `background-color`,
            `hsl(${hue}, ${saturation}%, ${light}%)`
          );
        } else {
          $answerMessage.html("Wrong answer!");
          $buttons.css(`background-color`, `#adadad`);
          resetBackGround();
        }
      });
  }
};

const hexMode = function() {
  const setHexButtonColour = function(button, hex) {
    $(button).css(`background-color`, `${hex}`);
  };

  const makeHexValue = () => {
    let hexCode = "#";
    const hexValues = "0123456789abcdef";

    while (hexCode.length < 7) {
      hexCode += hexValues[Math.floor(Math.random() * hexValues.length)];
    }
    return hexCode;
  };

  // generates a random numer between 0 and 3 or number of button - 1.
  const answerButton = Math.floor(Math.random() * ($buttons.length - 1));

  for (let i = 0; i < $buttons.length; i++) {
    const hexVal = makeHexValue();
    setHexButtonColour($buttons[i], hexVal);

    if (i === answerButton) {
      $colorValue.html(`Colour Code: </br> 
   ${hexVal}`);
    }

    $($buttons[i])
      .off()
      .one("click", function() {
        if (this === $buttons[answerButton]) {
          score++;
          $answerMessage.html("Correct!");
          $background.css(`background-color`, `${hexVal}`);
          $buttons.css(`background-color`, `${hexVal}`);
        } else {
          $answerMessage.html("Wrong answer!");
          $buttons.css(`background-color`, `#adadad`);
          resetBackGround();
        }
      });
  }
};

app.startGame = () => {
  answerMessageReset();

  $(".levelButton").on("click", function() {
    $startPage.hide();
    $gamePage.show();
  });

  $(".easy").on("click", function() {
    rgbMode();
    $next.off("click").on("click", function() {
      rgbMode();
      setNextQ();
    });
  });

  $(".medium").on("click", function() {
    hslMode();
    $next.off("click").on("click", function() {
      hslMode();
      setNextQ();
    });
  });

  $(".hard").on("click", function() {
    hexMode();
    $next.off("click").on("click", function() {
      hexMode();
      setNextQ();
    });
  });

  $(".resetButton")
    .off("click")
    .on("click", app.reset);

  $(".restart")
    .off("click")
    .on("click", function() {
      app.reset();
    });
};

app.init = function() {
  app.landingPage();
  app.startGame();
};

$(function() {
  app.init();
});
