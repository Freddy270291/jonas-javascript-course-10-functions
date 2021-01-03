'use strict';

/* 01. Default parameters - the parameters are set by default, so we don't have to pass them manually in case we don't want to change the default */
/*
const bookings = [];

const createBooking = function (
  flightNum = 'flight number not available',
  numPassengers = 1,
  price = 100 * numPassengers // anche in base ad altre variabili dichiarate prima!!
) {
  // old way to set default parameters (in case some data is missing)
  // numPassengers = numPassengers || 1; // Because it is a falsy value with "or", so if the first one is false it will take the second one (1) as default parameter
  // price = price || 100;
  // flightNum = flightNum || 'flight number not available';

  // New way: insert the default parameter in the function above ('numPassengers = 1')

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 3);

// we can not skip a parameter (3000 is the price):  createBooking('LH123', 3000);
// there is a trick: set the parameter we want to skip as undefined (falsy):
createBooking('ABC45', undefined, 3000);
*/

/* 02. HOW PASSING ARGUMENTS WORK: VALUE vs REFERENCE */
const flight = 'LH234';
const federico = {
  name: 'Federico Giovannini',
  passport: 1234567890,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 1234567890) {
    alert('Check in');
  } else {
    alert('wrong passport');
  }
};

/*
checkIn(flight, federico);
console.log(flight);
console.log(federico);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};

newPassport(federico); // This is no longer the same as the original one
checkIn(flight, federico);
console.log(federico);
*/
// JS does not have passing by reference, only passing by VALUE

/* 03. FUNCTIONS ACCEPTING CALLBACK FUNCTIONS */
/*
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase(); // takes any string and return one without spaces and all lower cases
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function = Function with another function as parameter
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformedby: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

const sayHi = function (name) {
  console.log(`Hi ${name}!`);
};
['Federico', 'Tizio', 'Caio'].forEach(sayHi); // Callback function: sayHi
*/

/* 04. FUNCTIONS RETURNING OTHER FUNCTIONS */
/*
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Federico');

greet('Hello')('Federico'); // La prima parte "greet(..) è una funzione, non un valore!"

const greetArr = greeting => name => console.log(`${greeting} ${name}`); // con arrows
*/

// 05. THE CALL AND APPLY METHODS
/*
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Federico Giovannini');
lufthansa.book(369, 'Tizio Caio');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book; // invece che ripetere la stessa funzione tutte le volte, possiamo assegnarla prendendola dalla stringa..però il "this" per una regular function è "undefined"!
// Bisogna dire esplicitamente quale è il valore del THIS con CALL o APPLY
book.call(eurowings, 23, 'Sarah William'); // il primo parametro è il valore del THIS
console.log(eurowings);
book.call(lufthansa, 230, 'Mary Cooper');
console.log(lufthansa);

// Apply method (non più usato molto): come il Call method ma non riceve una lista di argomenti dopo la variabile THIS ma un array di argomenti:
const flightData = [583, 'George Cooper'];
book.apply(eurowings, flightData);
console.log(eurowings);

// invece di usare Apply si usa Call + the spread operator:
book.call(eurowings, ...flightData); // esattamente uguale alla riga 145
console.log(eurowings);
*/

// 06. THE BIND METHOD - Allows to manually set the This keyword forevery function call
// The difference is that BIND does not call immediately the function, instead it returns a new function with this bound this keyword
/*
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};
const book = lufthansa.book;
const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);

bookEW(234, 'Steven Williams');

// PARTIAL APPLICATION: We can use the BIND fuction to create a function with other specific parameters (ex. a specific flight)
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Federico Giovannini'); // basta il nome perché il numero del volo è stato già fissato prima!

// WIth Event Listeners
lufthansa.planes = 300; // THe company has 300 planes
lufthansa.buyPlane = function () {
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); // We have to bind the THIS keyword

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.22, 200));

const addVAT = addTax.bind(null, 0.23); // we want to pre-set the VAT value, skippiamo the THIS keyword con "null"
console.log(addVAT(200));
*/

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
/*
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),

  // Get answer
  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    console.log(answer);

    // Register answer
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;
    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Pool results: ${this.answers.join(', ')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
*/

// 07. IMMEDIATELY INVOKED FUNCTION EXPRESSIONS (IIFE)
// It's a function esecuted once and then never again
/*
(function () {
  console.log('This will never run again');
})(); // we write a function without assigning any variable, we WRAP it into a PARENTHESYS and then call it immediately with a ()

// The same with an arrow function:
(() => console.log('This will ALSO never run again'))();
*/

// 08. CLOSURES - Any function always has access to the variable environment of the execution context in which the function was created, even after the execution context is gone
// Thanks to the closure, a function does not lose connection to variables that existed at function birthplace
// We don't create closure manually, it happens automatically in certain situations
/*
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
booker();
booker();
booker();

// A closure is the closed-over VARIABLE ENVIRONMENT of the execution context in which a function was created,even AFTER that execution context is gone;
// A closure gives a function access to all the variables OF ITS PARENT FUNCTION, even AFTER that parent function has returned. The function keeps a REFERENCE to its outer scope, which PRESERVES the scope chain throughout time.
// A closure makes sure that a function doesn't lose connection to VARIABLES THAT EXISTED AT THE FUNCTION'S BIRTH PLACE
// A closure is likea backpack that a function carries around wherever it goes. This backpack has all the VARIABLES THAT WERE PRESENT IN THE ENVIRONMENT WHERE THE FUNCTION WAS CREATED.

console.dir(booker);
*/
/*
// Example 1
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
h();
f();

// Example 2 - Timer

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups,each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(180, 3);
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
