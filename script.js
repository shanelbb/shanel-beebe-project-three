const app = {};

// **** APP STARTING PAGE ****
app.landingPage = function () {
  app.gamePage.hide();
  app.final.hide();
};

// resets background to original color
app.resetBackground = () => {
  app.background.attr("style", "background-color: #4aafbc");
};

// resets answerMessage under color app.buttons to original message
app.answerMessageReset = () => {
  app.answerMessage.html("Choose carefully!");
  app.answerMessage.removeClass("bold");
};

// resets the colour name label to blank between each turn in named mode
app.nameReset = () => {
  app.label.html("");
};

// resets background color and answer message
app.resetPlay = () => {
  app.resetBackground();
  app.answerMessageReset();
  app.nameReset();
};

// starts score at 0
app.score = 0;

app.resetScore = () => {
  app.score = 0;
  return app.score;
};

// Sets max number of questions played per round
app.maxQuestions = 10;
app.questionCounter = 0;

// Move user to next question. Called when "next color" button is clicked
app.setNextQ = () => {
  app.resetPlay();
  app.questionCounter++;
  app.endGame();
};

// Function called when the correct answer is selected in each mode
app.correctAnswer = function (colorValue) {
  app.score++;
  app.answerMessage.html("Correct!");
  app.answerMessage.addClass("bold");
  app.background.css(`background-color`, colorValue); // changes bg colour to correct colour
  app.buttons.css(`background-color`, colorValue); //changes all colour buttons to the correct colour
  app.buttons.off("click"); // disables all answer buttons once one answer has been submitted
};

// wrong answer function
app.wrongAnswer = () => {
  app.answerMessage.html("Wrong answer");
  app.answerMessage.addClass("bold");
  app.resetBackground();
  app.buttons.off("click"); // disables all answer buttons once one answer has been submitted
};

// ends game after user answers 10 questions; displays final score screen
app.endGame = () => {
  if (app.questionCounter === app.maxQuestions) {
    app.gamePage.hide();
    app.final.show();
    app.finalScore.html(`Your final score is:
    <span class="bold">${app.score} / 10</span>`);
  }
};

// resets app.questionCounter to 0 when user starts game over
app.resetCounter = () => {
  app.questionCounter = 0;
  return app.questionCounter;
};

// **** RESETS GAME TO START PAGE *****
app.reset = () => {
  app.landingPage();
  app.startPage.show();
  app.resetPlay();
  app.resetScore();
  app.resetCounter();
};

// ********** SETS UP GAME IN NAMED MODE *********
app.namedMode = function () {
  // generates a random hex value to use with the endpoint url to get button colours from api
  const makeHexValue = () => {
    let hexCode = "";
    const hexValues = "0123456789abcdef";

    while (hexCode.length < 6) {
      hexCode += hexValues[Math.floor(Math.random() * hexValues.length)];
    }
    return hexCode;
  };

  // sets button colours using rgb values taken from the api call results
  const setButtonColour = function (button, red, green, blue) {
    $(button).css("background-color", `rgb(${red}, ${green}, ${blue})`);
  };

  // adds name of colour to the label beneath each button
  const setButtonName = function (el, name) {
    el.append(name);
  };

  // generates a random numer between 0 and 3 or number of buttons - 1. ** Must be inside this function to keep the correct answer random
  const answerButton = Math.floor(Math.random() * (app.buttons.length - 1));

  // api url
  const endpoint = "https://api.color.pizza/v1/";

  // what to do in case of error from api call
  function handleError(err) {
    setButtonName(app.label, `<label>(${err.statusText}</label>)`);
  }

  for (let i = 0; i < app.buttons.length; i++) {
    // Loops through each button to set a button colour and name taken from the api
    $.ajax({
      url: `${endpoint}${makeHexValue()}?noduplicates=true`,
      dataType: "json",
      method: "GET",
    })
      .then(function (res) {
        const html = `${res.colors[0].name}`;
        setButtonName(app.label[i], html);
        const r = res.colors[0].rgb.r;
        const g = res.colors[0].rgb.g;
        const b = res.colors[0].rgb.b;
        setButtonColour(app.buttons[i], r, g, b);

        // if value of answerButton equals index of app.buttons appends the corresponding colour code to the h2 with the class of colorValue
        if (i === answerButton) {
          app.colourValue.html(`Guess which colour matches this colour code:
  <span class="bold">rgb(${r}, ${g}, ${b})</span>`);
        }

        // event handler to take in user guess and respond according to whether they are right or wrong
        $(app.buttons[i])
          .off() // .off keeps click from firing multiple times, .one makes correct answer only clickable once to accumulate a point.
          .one("click", function () {
            if (this === app.buttons[answerButton]) {
              app.correctAnswer(`rgb(${r}, ${g}, ${b})`);
            } else {
              app.wrongAnswer();
              // change all colour buttons to correct colour
              app.buttons.css(
                `background-color`,
                `${app.buttons[answerButton].style.backgroundColor}`
              );
            }
          });
      })
      .catch(handleError);
  }
};

//  ****** SETS UP GAME IN RGB MODE *******
app.rgbMode = function () {
  // sets the button color using an rgb value
  const setRGBButtonColour = function (button, red, green, blue) {
    $(button).css(`background-color`, `rgb(${red}, ${green}, ${blue})`);
  };

  // generates a random number between 0 and 255
  const makeRGBValue = () => {
    return Math.floor(Math.random() * 256);
  };

  // generates a random numer between 0 and 3 or number of buttons - 1. ** Must be inside this function to keep the correct answer random
  const answerButton = Math.floor(Math.random() * (app.buttons.length - 1));

  for (let i = 0; i < app.buttons.length; i++) {
    // loops through each button to set them each to a random rgb value
    const red = makeRGBValue();
    const green = makeRGBValue();
    const blue = makeRGBValue();
    setRGBButtonColour(app.buttons[i], red, green, blue);

    // if value of answerButton equals index of app.buttons appends the corresponding colour code to the h2 with the class of colorValue
    if (i === answerButton) {
      app.colourValue.html(`Guess which colour matches this colour code:
  <span class="bold">rgb(${red}, ${green}, ${blue})</span>`);
    }

    // event handler to take in user guess and respond according to whether they are right or wrong
    $(app.buttons[i])
      .off() // .off keeps click from firing multiple times, .one makes correct answer only clickable once to accumulate a point.
      .one("click", function () {
        if (this === app.buttons[answerButton]) {
          app.correctAnswer(`rgb(${red}, ${green}, ${blue})`);
        } else {
          app.wrongAnswer();
          // change all colour buttons to correct colour
          app.buttons.css(
            `background-color`,
            `${app.buttons[answerButton].style.backgroundColor}`
          );
        }
      });
  }
};

//  ****** SETS UP GAME IN HSL MODE *******
app.hslMode = function () {
  // sets the button color using an hsl value
  const setHSLButtonColour = function (button, h, s, l) {
    $(button).css(`background-color`, `hsl(${h}, ${s}%, ${l}%)`);
  };

  // generates a random number between 0 and 360 for the hue value
  const makeHValue = () => {
    return Math.floor(Math.random() * 361);
  };

  // generates a random number between 0 and 100 for the saturation and lightness values
  const makeSLValues = () => {
    return Math.floor(Math.random() * 101);
  };

  // generates a random numer between 0 and 3 or number of buttons - 1. ** Must be inside this function to keep the correct answer random
  const answerButton = Math.floor(Math.random() * (app.buttons.length - 1));

  for (let i = 0; i < app.buttons.length; i++) {
    // loops through each button to set them each to a random hsl value
    const hue = makeHValue();
    const saturation = makeSLValues();
    const light = makeSLValues();
    setHSLButtonColour(app.buttons[i], hue, saturation, light);

    // if value of answerButton equals index of app.buttons appends the corresponding colour code to the h2 with the class of colorValue
    if (i === answerButton) {
      app.colourValue.html(`Guess which colour matches this colour code:  
   <span class="bold">hsl(${hue}, ${saturation}%, ${light}%)</span>`);
    }

    // event handler to take in user guess and respond according to whether they are right or wrong
    $(app.buttons[i])
      .off() // .off keeps click from firing multiple times, .one makes correct answer only clickable once to accumulate a point.
      .one("click", function () {
        if (this === app.buttons[answerButton]) {
          app.correctAnswer(`hsl(${hue}, ${saturation}%, ${light}%)`);
        } else {
          app.wrongAnswer();
          // change all colour buttons to correct colour
          app.buttons.css(
            `background-color`,
            `${app.buttons[answerButton].style.backgroundColor}`
          );
        }
      });
  }
};

// ****** SETS UP GAME IN HEX MODE *******
app.hexMode = function () {
  // sets the button color using a hex value
  const setHexButtonColour = function (button, hex) {
    $(button).css(`background-color`, `${hex}`);
  };

  // generates a random hex value
  const makeHexValue = () => {
    let hexCode = "#";
    const hexValues = "0123456789abcdef";

    while (hexCode.length < 7) {
      hexCode += hexValues[Math.floor(Math.random() * hexValues.length)];
    }
    return hexCode;
  };

  // generates a random numer between 0 and 3 or number of button - 1. ** Must be inside this function to keep the correct answer random
  const answerButton = Math.floor(Math.random() * (app.buttons.length - 1));

  for (let i = 0; i < app.buttons.length; i++) {
    // loops through each button to set them each to a random hex value
    const hexVal = makeHexValue();
    setHexButtonColour(app.buttons[i], hexVal);

    // if value of answerButton equals index of app.buttons appends the corresponding colour code to the h2 with the class of colorValue
    if (i === answerButton) {
      app.colourValue.html(`Guess which colour matches this colour code: 
   <span class="bold">Hex ${hexVal}</span>`);
    }

    // event handler to take in user guess and respond according to whether they are right or wrong
    $(app.buttons[i])
      .off() //.off keeps click from firing multiple times, .one makes correct answer only clickable once to accumulate a point.
      .one("click", function () {
        if (this === app.buttons[answerButton]) {
          app.correctAnswer(`${hexVal}`);
        } else {
          app.wrongAnswer();
          // change all colour buttons to correct colour
          app.buttons.css(
            `background-color`,
            `${app.buttons[answerButton].style.backgroundColor}`
          );
        }
      });
  }
};

// ********* INFO MODAL FUNCTIONALITY ***********
app.modals = () => {
  const $modal = $(".modal");
  const $close = $(".close");
  const $namedInfoModal = $(".namedInfoModal");
  const $rgbInfoModal = $(".rgbInfoModal");
  const $hslInfoModal = $(".hslInfoModal");
  const $hexInfoModal = $(".hexInfoModal");

  // opens the corresponding modal when the user clicks on a ? button
  $(".namedInfo").on("click", function () {
    $namedInfoModal.css("display", "block");
  });
  $(".rgbInfo").on("click", function () {
    $rgbInfoModal.css("display", "block");
  });
  $(".hslInfo").on("click", function () {
    $hslInfoModal.css("display", "block");
  });
  $(".hexInfo").on("click", function () {
    $hexInfoModal.css("display", "block");
  });

  // instructs the event handler to close the modal on click or enter
  function handleClose(e) {
    if (e.type === "click" || e.key === "Enter") {
      $modal.css("display", "none");
    }
  }
  // closes the modal when the user clicks on <span> (x)
  $close.on("click", handleClose);

  // closes the modal with enter button when tabbing through page
  $close.on("keyup", handleClose);

  // closes the modal when the user clicks anywhere outside of it
  $(window).click(function (e) {
    if ($(e.target).is($modal)) {
      $modal.css("display", "none");
    }
  });
};

// ****** STARTS GAME WHEN LEVELE BUTTON IS CLICKED *******
app.startGame = () => {
  //sets the answer message to "choose carefully"
  app.answerMessageReset();

  // hides the landing page and reveals the game page
  $(".levelButton").on("click", function () {
    app.startPage.hide();
    app.gamePage.show();
  });

  // Takes users to the named mode when the named button is clicked
  $(".named").on("click", function () {
    app.namedMode();
    app.next.off("click").on("click", function () {
      app.namedMode();
      app.setNextQ();
    });
  });

  // takes users to rgb mode of the game when rgb button is clicked
  $(".rgb").on("click", function () {
    app.rgbMode();
    app.next.off("click").on("click", function () {
      app.rgbMode();
      app.setNextQ();
    });
  });

  // takes users to hsl mode of the game when hsl button is clicked
  $(".hsl").on("click", function () {
    app.hslMode();
    app.next.off("click").on("click", function () {
      app.hslMode();
      app.setNextQ();
    });
  });

  // takes users to hex mode of the game when hex button is clicked
  $(".hex").on("click", function () {
    app.hexMode();
    app.next.off("click").on("click", function () {
      app.hexMode();
      app.setNextQ();
    });
  });

  // resets game to landing page when start agaiin or play again buttons are clicked
  $(".resetButton").on("click", app.reset);

  $(".restart").on("click", app.reset);
};

// game initilization function
app.init = function () {
  // cached selectors
  app.answerMessage = $("#answer");
  app.background = $("body");
  app.buttons = $(".colourButton");
  app.colourValue = $("#colourValue");
  app.final = $(".finalScore");
  app.gamePage = $(".gamePage");
  app.label = $("label");
  app.next = $(".nextQuestion");
  app.finalScore = $(".finalScoreMessage");
  app.startPage = $(".startPage");

  // functions
  app.landingPage();
  app.startGame();
  app.modals();
};

// document ready function
$(function () {
  app.init();
});
