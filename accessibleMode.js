// const namedColours = {
//   option1: {
//     name: "coral",
//     rgb: "rgb(255, 127, 80)"
//   },
//   option2: {
//     name: "cornflower blue",
//     rgb: "rgb(100, 149, 237)"
//   },
//   option3: {
//     name: "goldenrod",
//     rgb: "rgb(218, 165, 32)"
//   },
//   option4: {
//     name: "olive",
//     rgb: "rgb(128, 128, 0)"
//   },
//   option5: {
//     name: "aqua",
//     rgb: "rgb(0, 255, 255)"
//   },
//   option6: {
//     name: "chocolate",
//     rgb: "rgb(210, 105, 30)"
//   },
//   option7: {
//     name: "firebrick",
//     rgb: "rgb(178, 34, 34)"
//   },
//   option8: {
//     name: "lemon chiffon",
//     rgb: "rgb(255, 250, 205)"
//   },
//   option9: {
//     name: "light salmon",
//     rgb: "rgb(255,160,122)"
//   },
//   option10: {
//     name: "salmon",
//     rgb: "rgb(250,128,114)"
//   },
//   option11: {
//     name: "dark salmon",
//     rgb: "rgb(233,150,122)"
//   },
//   option12: {
//     name: "lemon chiffon",
//     rgb: "rgb(255, 250, 205)"
//   },
//   option13: {
//     name: "light coral",
//     rgb: "rgb(240,128,128)"
//   },
//   option14: {
//     name: "indian red",
//     rgb: "rgb(205,92,92)"
//   }
// };

// const $button = $(".colourButton");
// setButtonColour = function(button, value) {
//   $(button).css("background-color", `${value}`);
// };

// setButtonName = function(button, name) {
//   $(button).html(`${name}`);
// };

// for (let i = 0; i < $button.length; i++) {
//   const keys = Object.keys(namedColours);
//   const randomIndex = Math.floor(Math.random() * keys.length);
//   const item = namedColours[keys[randomIndex]];
//   console.log(item.name);
//   setButtonColour($button[i], `${item.rgb}`);
//   setButtonName($("h3")[i], `${item.name}`);
// }

const $buttons = $(".colourButton");
const $h3 = $("h3");

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
    })
    .catch(handleError);
}
