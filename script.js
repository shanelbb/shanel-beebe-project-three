/* 
GUESS THAT COLOUR GAME

This program is a game that will allow a user to choose between 
a set of coloured buttons to guess which colour corresponds with the
displayed colour code. 

1. Create a starting page with buttons representing the skill 
level the user wants to play (easy, medium, hard) 
2. If "easy" **** MVP *****
        display RGB colour mode; 
      if "medium" 
        display HSL colour mode;
      if "hard"  **** STRETCH GOAL *****
        display HEX colour mode;  */
$(".easy").on("click", function() {
  $(".startPage").addClass("hidden");
  $(".gamePage").append(
    `<h2 id="colourValue"></h2>
      <div id="buttonWrapper">
        <button class="colourButton"></button>
        <button class="colourButton"></button>
        <button class="colourButton"></button>
        <button class="colourButton"></button>
        <!-- <button class="colourButton"></button>
          <button class="colourButton"></button> -->
      </div>
      <h2 id="answer"></h2>

      <div id="reset">
        <button class="playAgain">Play Again</button>
        <button id="resetButton" class="resetButton">
          Reset Game
        </button>
      </div>`
  );
});

/* 3. make a function that sets the color of each selection button.
4. make a function that sets the colour value randomly.
    - function 1 : generates RGB code *** MVP ***
    - function 2 : generates HSL code
    - function 3 : generates HEX code *** STRETCH GOAL ***
5. make a function that starts the game in the preferred mode
6. make one of the generated colours match the displayed color code
7. add an event listener so when the color buttons are pressed the 
user gets a message saying either correct or wrong. 
8. If correct set the background color of the page to correct color
9. If wrong display a message like "Wrong. Try Again" 
10. On game page have 1 button that let's user guess again and 1 
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
