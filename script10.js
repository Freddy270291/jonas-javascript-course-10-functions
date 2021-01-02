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
