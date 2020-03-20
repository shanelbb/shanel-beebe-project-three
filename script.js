const app = {};

// cached selectors
const $answerMessage = $("#answer");
const $background = $("body");
const $buttons = $(".colourButton");
const $colorValue = $("#colourValue");
const $final = $(".finalScore");
const $gamePage = $(".gamePage");
const $h3 = $("h3");
const $next = $(".nextQuestion");
const $score = $(".finalScoreMessage");
const $startPage = $(".startPage");

// **** APP STARTING PAGE ****
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

const nameReset = () => {
  $h3.html("");
};

// resets background color and answer message
const resetPlay = () => {
  resetBackGround();
  answerMessageReset();
  nameReset();
};

// starts score at 0
let score = 0;

const resetScore = () => {
  score = 0;
  return score;
};

// Sets max number of questions played per round
const maxQuestions = 10;
let questionCounter = 0;

// Move user to next question. Called when "next color" button is clicked
const setNextQ = () => {
  resetPlay();
  questionCounter++;
  endGame();
};

// Function called when the correct answer is selected in each mode
const correctAnswer = function(colorValue) {
  score++;
  $answerMessage.html("Correct!");
  $background.css(`background-color`, colorValue); // changes bg colour to correct colour
  $buttons.css(`background-color`, colorValue); //changes all colour buttons to the correct colour
  $buttons.off("click"); // disables all answer buttons once one answer has been submitted
};

// Wrong answer function
const wrongAnswer = () => {
  $answerMessage.html("Wrong answer!");
  $buttons.css(`background-color`, `#adadad`); // changes all colour buttons to grey
  resetBackGround();
  $buttons.off("click"); // disables all answer buttons once one answer has been submitted
};

// Function called after user answers 10 questions; displays final score screen
const endGame = () => {
  if (questionCounter === maxQuestions) {
    $gamePage.hide();
    $final.show();
    $score.html(`Your final score is: </br>
    <span class="bold">${score} / 10</span>`);
  }
};

// resets questionCounter to 0
const resetCounter = () => {
  questionCounter = 0;
  return questionCounter;
};

// **** RESETS GAME TO START PAGE *****
app.reset = () => {
  app.landingPage();
  $startPage.show();
  resetPlay();
  resetScore();
  resetCounter();
};

//  ****** SETS UP GAME IN RGB MODE *******
const rgbMode = function() {
  // a function to set the button color using an rgb value
  const setRGBButtonColour = function(button, red, green, blue) {
    $(button).css(`background-color`, `rgb(${red}, ${green}, ${blue})`);
  };

  // a function to generate a random number between 0 and 255
  const makeRGBValue = () => {
    return Math.floor(Math.random() * 256);
  };

  // generates a random numer between 0 and 3 or number of buttons - 1. ** Must be inside this function to keep the correct answer random
  const answerButton = Math.floor(Math.random() * ($buttons.length - 1));

  // a loop to set each button to a random rgb value
  for (let i = 0; i < $buttons.length; i++) {
    const red = makeRGBValue();
    const green = makeRGBValue();
    const blue = makeRGBValue();
    setRGBButtonColour($buttons[i], red, green, blue);

    // if value of answerButton equals index of $buttons displays the corresponding colour code in the h2 with the class of colorValue
    if (i === answerButton) {
      $colorValue.html(`Guess which colour matches this colour code: </br>
  <span class="bold">rgb(${red}, ${green}, ${blue})</span>`);
    }

    // event handler that displays "Correct" or "Wrong" based on user input.
    $($buttons[i])
      .off() // .off keeps click from firing multiple times, .one makes correct answer only clickable once to accumulate a point.
      .one("click", function() {
        if (this === $buttons[answerButton]) {
          correctAnswer(`rgb(${red}, ${green}, ${blue})`);
        } else {
          wrongAnswer();
        }
      });
  }
};

//  ****** SETS UP GAME IN HSL MODE *******
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

  // generates a random numer between 0 and 3 or number of buttons - 1. ** Must be inside this function to keep the correct answer random
  const answerButton = Math.floor(Math.random() * ($buttons.length - 1));

  // a loop to set each button to a random hsl value
  for (let i = 0; i < $buttons.length; i++) {
    const hue = makeHValue();
    const saturation = makeSLValues();
    const light = makeSLValues();
    setHSLButtonColour($buttons[i], hue, saturation, light);

    // if value of answerButton equals index of $buttons displays the corresponding colour code in the h2 with the class of colorValue
    if (i === answerButton) {
      $colorValue.html(`Guess which colour matches this colour code: </br> 
   <span class="bold">hsl(${hue}, ${saturation}%, ${light}%)</span>`);
    }

    // event handler that displays "Correct" or "Wrong" based on user input.
    $($buttons[i])
      .off() // .off keeps click from firing multiple times, .one makes correct answer only clickable once to accumulate a point.
      .one("click", function() {
        if (this === $buttons[answerButton]) {
          correctAnswer(`hsl(${hue}, ${saturation}%, ${light}%)`);
        } else {
          wrongAnswer();
        }
      });
  }
};

// ****** SETS UP GAME IN HEX MODE *******
const hexMode = function() {
  // a function to set the button color using a hex value
  const setHexButtonColour = function(button, hex) {
    $(button).css(`background-color`, `${hex}`);
  };

  // a function to generate a random hex value by iterating over a string
  const makeHexValue = () => {
    let hexCode = "#";
    const hexValues = "0123456789abcdef";

    while (hexCode.length < 7) {
      hexCode += hexValues[Math.floor(Math.random() * hexValues.length)];
    }
    return hexCode;
  };

  // generates a random numer between 0 and 3 or number of button - 1. ** Must be inside this function to keep the correct answer random
  const answerButton = Math.floor(Math.random() * ($buttons.length - 1));

  // a loop to set each button to a random hex value
  for (let i = 0; i < $buttons.length; i++) {
    const hexVal = makeHexValue();
    setHexButtonColour($buttons[i], hexVal);

    // if value of answerButton equals index of $buttons displays the corresponding colour code in the h2 with the class of colorValue
    if (i === answerButton) {
      $colorValue.html(`Guess which colour matches this colour code: </br> 
   <span class="bold">Hex ${hexVal}</span>`);
    }

    // event handler that displays "Correct" or "Wrong" based on user input.
    $($buttons[i])
      .off() //.off keeps click from firing multiple times, .one makes correct answer only clickable once to accumulate a point.
      .one("click", function() {
        if (this === $buttons[answerButton]) {
          correctAnswer(`${hexVal}`);
        } else {
          wrongAnswer();
        }
      });
  }
};

const namedMode = function() {
  const makeHexValue = () => {
    let hexCode = "";
    const hexValues = "0123456789abcdef";

    while (hexCode.length < 6) {
      hexCode += hexValues[Math.floor(Math.random() * hexValues.length)];
    }
    return hexCode;
  };

  const setButtonColour = function(button, red, green, blue) {
    $(button).css("background-color", `rgb(${red}, ${green}, ${blue})`);
  };

  const setButtonName = function(button, name) {
    button.append(name);
  };

  const answerButton = Math.floor(Math.random() * ($buttons.length - 1));

  const endpoint = "https://api.color.pizza/v1/";

  function handleError(err) {
    console.log("Oh NO!!");
    console.log(err);
  }

  for (let i = 0; i < $buttons.length; i++) {
    $.ajax({
      url: `${endpoint}${makeHexValue()}?noduplicates=true`,
      dataType: "json",
      method: "GET"
    })
      .then(function(res) {
        const html = `${res.colors[0].name}`;
        setButtonName($h3[i], html);
        const r = res.colors[0].rgb.r;
        const g = res.colors[0].rgb.g;
        const b = res.colors[0].rgb.b;
        setButtonColour($buttons[i], r, g, b);

        if (i === answerButton) {
          $colorValue.html(`Guess which colour matches this colour code: </br>
  <span class="bold">rgb(${r}, ${g}, ${b})</span>`);
        }

        // event handler that displays "Correct" or "Wrong" based on user input.
        $($buttons[i])
          .off() // .off keeps click from firing multiple times, .one makes correct answer only clickable once to accumulate a point.
          .one("click", function() {
            if (this === $buttons[answerButton]) {
              correctAnswer(`rgb(${r}, ${g}, ${b})`);
            } else {
              wrongAnswer();
            }
          });
      })
      .catch(handleError);
  }
};

// ********* INFO MODAL FUNCTIONALITY ***********
app.modal = () => {
  // Gets the modal
  const $modal = $(".infoModal");
  // Gets the <span> (x)
  const $close = $(".close");

  // Opens the modal when the user clicks on the button
  $("#infoBtn").on("click", function() {
    $modal.css("display", "block");
  });

  // Instructs the event handler to close the modal on click or enter
  function handleClose(e) {
    if (e.type === "click" || e.key === "Enter") {
      $modal.css("display", "none");
    }
  }
  // Closes the modal when the user clicks on <span> (x)
  $close.on("click", handleClose);

  // Closes the modal with enter button when tabbing through page
  $close.on("keyup", handleClose);

  // Closes the modal when the user clicks anywhere outside of it
  $(window).click(function(e) {
    if ($(e.target).is($modal)) {
      $modal.css("display", "none");
    }
  });
};

// ****** STARTS GAME WHEN LEVELE BUTTON IS CLICKED *******
app.startGame = () => {
  //sets the answer message to "choose carefully"
  answerMessageReset();

  // hides the landing page and reveals the game page
  $(".levelButton").on("click", function() {
    $startPage.hide();
    $gamePage.show();
  });

  // Takes users to the named mode when the named button is clicked
  $(".named").on("click", function() {
    namedMode();
    $next.off("click").on("click", function() {
      namedMode();
      setNextQ();
    });
  });

  // takes users to rgb mode of the game when rgb button is clicked
  $(".rgb").on("click", function() {
    rgbMode();
    $next.off("click").on("click", function() {
      rgbMode();
      setNextQ();
    });
  });

  // takes users to hsl mode of the game when hsl button is clicked
  $(".hsl").on("click", function() {
    hslMode();
    $next.off("click").on("click", function() {
      hslMode();
      setNextQ();
    });
  });

  // takes users to hex mode of the game when hex button is clicked
  $(".hex").on("click", function() {
    hexMode();
    $next.off("click").on("click", function() {
      hexMode();
      setNextQ();
    });
  });

  // resets game to landing page when restart or start over buttons are clicked
  $(".resetButton")
    .off("click")
    .on("click", app.reset);

  $(".restart")
    .off("click")
    .on("click", app.reset);
};

// game initilization function
app.init = function() {
  app.landingPage();
  app.startGame();
  app.modal();
};

// document ready function
$(function() {
  app.init();
});
