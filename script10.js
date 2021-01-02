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
