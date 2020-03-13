/* 
GUESS THAT COLOUR GAME

This program is a game that will allow a user to choose between 
a set of coloured buttons to guess which colour corresponds with the
displayed colour code. 

1. Create a starting page with buttons representing the skill 
level the user wants to play (easy, medium, hard) 

2. Make function that brings up a start page when one of the level button is pressed.
*/

/* 3. If "easy" **** MVP *****
        display RGB colour mode;
      if "medium"
        display HSL colour mode;
      if "hard"  **** STRETCH GOAL *****
      display HEX colour mode;  

 4. make a function that sets the color of each selection button.*/

/*5. make a function that sets the colour value randomly.
    - function 1 : generates RGB code *** MVP ***
    - function 2 : generates HSL code
    - function 3 : generates HEX code *** STRETCH GOAL ***
6. make a function that starts the game in the preferred mode
7. make one of the generated colours match the displayed color code
8. add an event listener so when the color buttons are pressed the 
user gets a message saying either correct or wrong. 
9. If correct set the background color of the page to correct color
10. If wrong display a message like "Wrong. Try Again" 
11. On game page have 1 button that let's user guess again and 1 
button that let user reset the game to beginning difficulty choices

**************** STRETCH GOALS *********************
1. Make a score counter function
2. Make a function that causes the correct answer to be revealed when user guesses the wrong choice. 
3. Add a button that lets user move on to next set of colours. 
4. Have final score display after 10 guesses 
 5. Have button to reset game to beginning

************ ACCESSIBILITY CONSIDERATIONS ***********
1. Create an accessiblity mode with only named colours
have the colour names displayed on the buttons. users guess which one matches the rgb value. 

*/

$(function() {
  const buttons = $(".colourButton");

  let colorValue;
  colorValue = $("#colourValue");

  const rgbMode = function() {
    const setRGBButtonColour = function(button, red, green, blue) {
      $(button).attr(
        "style",
        "background-color: rgb(" + red + "," + green + "," + blue + ");"
      );
    };

    const makeRGBValue = () => {
      return Math.ceil(Math.random() * 255);
    };

    for (let i = 0; i < buttons.length; i++) {
      const red = makeRGBValue();
      const green = makeRGBValue();
      const blue = makeRGBValue();
      setRGBButtonColour(buttons[i], red, green, blue);
    }
  };

  const hslMode = function() {
    const setHSLButtonColour = function(button, h, s, l) {
      $(button).attr(
        "style",
        "background-color: hsl(" + h + "," + s + "%," + l + "%);"
      );
    };

    const makeHValue = () => {
      return Math.ceil(Math.random() * 360);
    };

    const makeSLValues = () => {
      return Math.ceil(Math.random() * 100);
    };

    for (let i = 0; i < buttons.length; i++) {
      const hue = makeHValue();
      const saturation = makeSLValues();
      const light = makeSLValues();
      setHSLButtonColour(buttons[i], hue, saturation, light);
    }
  };

  const hexMode = function() {
    const setHexButtonColour = function(button, hex) {
      $(button).attr(`style`, `background-color: ${hex};`);
    };

    const makeHexValue = () => {
      let hexCode = "#";
      const hexValues = "0123456789abcdef";

      while (hexCode.length < 7) {
        hexCode += hexValues[Math.floor(Math.random() * hexValues.length)];
      }
      return hexCode;
    };

    for (let i = 0; i < buttons.length; i++) {
      const hexVal = makeHexValue();
      setHexButtonColour(buttons[i], hexVal);
      console.log(hexVal);
    }
  };

  const landingPage = function() {
    $(".gamePage").hide();
  };

  const answerMessage = $("#answer");

  const startGame = () => {
    const answerButton = Math.ceil(Math.random() * (buttons.length - 1));
    const background = $("body");

    $(".levelButton").on("click", function() {
      $(".startPage").hide();
      $(".gamePage").show();
    });

    $(".easy").on("click", function() {
      rgbMode();
    });

    $(".medium").on("click", function() {
      hslMode();
    });

    $(".hard").on("click", function() {
      hexMode();
    });

    answerMessage.html("Choose carefully!");
    background.attr("style", "background-color: rgb(128, 128, 128)");
  };

  const init = function() {
    landingPage();
    startGame();
  };

  init();
});
