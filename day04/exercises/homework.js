// Task 1:   Temperature converter
// Write celsiusToFahrenheit(c) using a function with a return statement. Test with 0, 100, and a negative number.


function celsiusToFahrenheit(celsius){
    if(typeof celsius !=='number'|| Number.isNaN(celsius)){
        throw new Error("invalid input");
    }
    return (celsius * 9/5) + 32;

}

// console.log(celsiusToFahrenheit(0));
// console.log(celsiusToFahrenheit(100));
// console.log(celsiusToFahrenheit(-40));

//

// Task 2: Simple calculator
// A function calculate(a, b, operator) that handles +, -, *, / using if/else, returning the result.

function calculate(a, b, operator){
    if(typeof a !=='number'|| typeof b !=='number'|| Number.isNaN(a)|| Number.isNaN(b)){
        throw new Error("Invalid operands: a and b must be valid numberst");
    }

    switch(operator){
        case '+':
            return a+b;
        break;
        case '-':
            return a-b;
        break;
        case '*':
            return a*b;
        break;
        case '/':
            if(b===0) throw new Error("division by zero");
            return a/b;
        break;
        default:
            throw new Error(`invalid operator:${operator}`);
            
    }

}

// console.log(calculate(10, 5, '+'));
// console.log(calculate(10, 5, '-'));
// console.log(calculate(10, 5, '*'));
// console.log(calculate(10, 5, '/'));

//

// Task 3: Array sort/filter challenge
// Given an array of numbers, write a loop that filters out only the even numbers into a new array, then logs its length.

let numbers = [1,2,3,4,5,6,7,8,9,10];
let evenNumbers = [];

for(let i=0; i<numbers.length; i++){
    const val = numbers[i];
    if(typeof val === 'number' && Number.isFinite(val) &&val%2===0){
        evenNumbers.push(numbers[i]);
    }
}

console.log(evenNumbers.length);
console.log(evenNumbers);
console.log(numbers);

//

//