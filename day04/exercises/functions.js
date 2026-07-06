// function squre (n){
//     return n*n;
// }

// function greet (name, timeOfDay){
//     return `Good ${timeOfDay} ${name}`;
// }
// // testing
// console.log(squre(2));
// console.log(greet("Ramesh","morning"));

import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

async function prompt(question) {
  const rl = readline.createInterface({ input, output });
  const response = await rl.question(question);
  rl.close();
  return response;
}

async function guessingGame() {
  function generateNum() {
    let randomNum = Math.floor(Math.random() * 100)+1;
   // console.log(randomNum);
    return randomNum;
  }

  let randomNum = generateNum();
  async function getInput() {
    while (true) {
      let userGuess = Number(await prompt("guess a number between 1-100 : "));
      if (isNaN(userGuess)) {
        console.log("give a valid input"); // shown immediately
        continue; // ask again, don't move on
      }
      return userGuess;
    }
  }
  let userGuess = await getInput();

  while (userGuess !== randomNum) {
    const fail = "try again";
    console.log(fail);
    userGuess = await getInput();
  }
  return "you found the correct number";
}

async function main() {
  const result = await guessingGame();
  console.log(result);
}

main();




// Task 1:   Temperature converter
// Write celsiusToFahrenheit(c) using a function with a return statement. Test with 0, 100, and a negative number.