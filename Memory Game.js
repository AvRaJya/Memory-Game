const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more

function idGen() {
  let id = Math.floor(Math.random() * 1000000000);
  return id;
}

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let count = 0;
let previousColor;
let cardId;
let previousCard;
// TODO: Implement this function!
function handleCardClick(event) {
  if (count === 2) {
    return;
  }
  // you can use event.target to see which element was clicked
  const currentColor = event.target.getAttribute(`class`);

  if (cardId === event.target.id) {
    console.log(
      'you cannot click on the same card multiple times to get a "pair"'
    );
    return;
  } else {
    event.target.id = idGen();
    // let cardId = event.target.id;
    cardId = event.target.id;

    //today I learned that "let x = y;" and "x = y;" is not the same thing?
  }

  event.target.classList.toggle("flip");

  event.target.style.backgroundColor = currentColor;

  const currentCard = document.getElementById(event.target.id);
  const currentCardId = event.target.id;

  count++;

  //removing and adding event listeners

  if (count === 2) {
    if (previousCard.classList.value === event.target.classList.value) {
      count = 0;
    }
    if (!(currentColor === previousColor)) {
      //   currentCard.classList.remove(`flip`);
      currentCard.classList.add(`flip`);

      //   event.target.classList.remove(`flip`);

      setTimeout(function () {
        currentCard.classList.remove(`flip`);
        previousCard.classList.remove(`flip`);
      }, 1000);

      setTimeout(function () {
        currentCard.classList.add(`flip`);

        previousCard.classList.add(`flip`);

        currentCard.style.backgroundColor = ``;
        previousCard.style.backgroundColor = ``;

        setTimeout(function () {
          currentCard.classList.remove(`flip`);
          previousCard.classList.remove(`flip`);

          previousCard = currentCard;
          console.log(previousCard);
          count = 0;
          // cardId = ``;
        }, 1000);
      }, 1500);

      //   event.target.style.backgroundColor = "";
    } else {
      currentCard.removeEventListener("click", handleCardClick);
      previousCard.removeEventListener("click", handleCardClick);
    }

    cardId = idGen();
  } else {
    previousCard = document.getElementById(event.target.id);
  }

  previousColor = currentColor;

  console.log(event.target.getAttribute(`class`));

  console.log("you just clicked", event.target);
}

// when the DOM loads
createDivsForColors(shuffledColors);
