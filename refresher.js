// Explain what this code outputs and why:

var i;
for (i = 0; i < 5; i++) {
  console.log(i)
}
console.log(i);

// Output 0 1 2 3 4 5 
// This outputs 0 1 2 3 4 5 because i is declared in the variable scope. 
//At each pass in the for loop, i is logged to the console,
// outputing the number increasing by one each time up to 4.
// At the last setting of i, i is equal to 5. Therefore when it is
// logged after the for loop it out puts 5.

// Explain what this code outputs and why:

var count = 0;
console.log('before');
for (var i = 0; i < count; i++) {
  console.log('during');
}
console.log('after');

// Output 'before' and then 'after'
// It does not output 'during' since count is already 0 and i is set to 0.
// Therefore i will never be less than 0. 
// It never enters the for loop.

// Write a function that uses a simple for loop and:
// Takes as its only argument an array of numbers (values)
// Returns the sum of all the values in the array, excluding the first two and last two values in the array
// Returns 0 if the array contains 4 or fewer values

var exceptionSum = function(array) {
  var result = 0
  for (var i = 2; i < array.length-2; i++) {
    result += array[i];
  }
  return result;
}

// Write a new function for the previous problem using the .forEach() method on arrays (documented here).  
// .forEach() is like underscore's _.each()

var exceptionSumForEach = function(array) {
  var result = 0;
  array.forEach(function(item, index){
    if (!(index < 2) && !(index > array.length-3) {
      result += item;
    }
  });
  return result;
}

// Write a new function for the previous problem using the .reduce() method on arrays (documented here).  
// .reduce() is like underscore's _.reduce()

var reduceSum = function(array) {
  return array.reduce(function(sum, current, index) {
    if (index <= 1) {
      sum = 0;
    }
    if (index > 1 && index < array.length-2) {
      return sum + current; 
    } else {
      return sum;
    }
  });
}

// Using .reduce(), write a function that:
// Takes as its input an array of integers (whole numbers)
// Returns an array containing two values where:
// The first value is the count of all the even numbers in the original input array
// The second value is the count of all the odd numbers in the original input array
// Your function should only call .reduce() once

var arrayEvenOdd = function(array) {
  return array.reduce(function(start, current){
    if (current % 2 === 0) {
    start[0] = (start[0]||0) + current;
    } else {
      start[1] = (start[1] || 0) + current;
    }
    return start;
  }, []);
}

//Explain whether this is a good or bad way to determine whether an argument was passed to the function or not, and why:

var fn = function(foobar) {
  if (!foobar) {   // <- is this good or bad?
    console.log('wasn\'t passed foobar');
  }
};

//  This is not a good way to check for wether an argument has been passed because it 
//  the string will still log if any falsy value is passed to fn.

//Look at the following code and explain what's assigned to the variable “foo” and what's assigned to the variable “bar”:

var fn = function() {
  console.log('hello world');
};
var foo = fn;
var bar = fn();

// the function declaration is assinged to the variable foo while the result or value that the function
// results in is assigned to bar. In this case, bar will be assigned to undefined since the fn has no return.

//Explain clearly what this does, when you would use it, and why it works:

var args = Array.prototype.slice.call(arguments);

// This would be used when we want to change the arguments, which is an array-like object,
// into an actual array, so that we can use array methods on it.

// Write a function called "plusOne" that:
// Takes another function as its only argument – we can call that argument "origFn"
// Assume that any function that would be passed to plusOne as origFn takes some arguments and returns a number
// Returns a new function such that:
// When the new function is called with some arguments, it will return whatever number origFn would return for those same arguments, plus 1
// Here's an example to show how plusOne could be used:
// var addThem = function(a, b) {
//   return a + b;
// };
// var addThemPlus1 = plusOne(addThem);
// console.log(addThemPlus1(7, 4));  // should log 12 <--Shouldn't this be 11?

var plusOne = function(origFn) {
  return function() {
    return origFn.call(this, argument);
  }
};

// Write a function to solve the following problem:
// A robot can move (step) in 4 directions: north, west, south, and east (N,W,S,E)
// Use recursion to output all permutations of directions the robot can make in 3 moves
// As an example of the expected output for 2 moves, the robot can go:
// NN, NW, NS, NE, WN, WW, WS, WE, SN, SW, SS, SE, EN, EW, ES, EE
// The expected output for 3 moves would start something like this:
// NNN, NNW, NNS, ….


var roundsPermutation = function(rounds){
  var directions = ['N', 'S', 'E', 'W'];
  var results = '';
  
  var combinations = function(round, temp) {
    if (round === 0) {
      results+=temp + ', ';
      return;
    }
    for (var i = 0; i < directions.length; i++) {
        combinations(round-1, temp+directions[i]);
    }
  };
  combinations(rounds, '');
  results = results.split('').slice(0, -2).join('');
  return results;
};

//Look at the following code and explain why it logs “this === window”:

var obj = {
  logIt: function() {
    if (this === obj) {
      console.log('this === obj');
    } else if (this === window) {
      console.log('this === window');    
    } else {
      console.log('this === ???');      
    }
  }
};

var fn = obj.logIt;

fn();

//This returns 'this === window' because when fn is assigned to obj.logIt, it is being assigned 
//only to the function without regard for the object in which it was created. Thus when it is invoked
// The this looks for what the function is bound to, but since the function is not bound to anything 
// it binds itself to the window object.

//Look at the following code (similar to above) and without changing obj, 
//refactor what's passed to setTimeout so that, when executed, the code logs “this === obj”:

var obj = {
  logIt: function() {
    if (this === obj) {
      console.log('this === obj');
    } else if (this === window) {
      console.log('this === window');    
    } else {
      console.log('this === ???');      
    }
  }
};

var fn = obj.logIt;

setTimeout(fn.bind(obj), 100);

//Figure out what this code logs and explain why:

var i = 123;
var fn = function() {
  console.log(i);
};
i = 7;
setTimeout(fn, 1000);
i = 42;
setTimeout(fn, 1000);

// It will log 42, 42 because setTimeout runs the callback function after one second at which point 
// i will equal 42. 

//Figure out what this code logs and explain why:

var n = 6;
var fn = function(value) {
  value++;
};
fn(n);
console.log(n);

// This will output 6 because when n is passed into fn it is as if a variable in is being created in
// the local scope of the function fn. Therefore it will not affect the global variable n.

//Figure out what this code logs and explain why:

var a = [6];
var fn = function(array) {
  array[0]++;
};
fn(a);
console.log(a);

// This will log [7] because when 'a' is passed into fn, array receives a reference to the same array that 'a'
// is referencing (copy-reference not value-reference). Hence when the value at index 0 is mutated,
// this is the same index 0 of the array which a is referencing. 

//Figure out what this code does and explain why:

var fn = function() {
  console.log('hi');
};
var wow = fn;
fn = undefined;
wow();
fn();

// When wow is called 'hi' is logged to the console. When fn is called 'TypeError fn is not a function' is logged to the console.
// This happens again because when wow is assigned to fn, it is assigned to the reference of the fn function not fn itself.
// Thus when fn is set to undefined (which is why the console throws the error that it is not a function),
// this does not affect the reference of 'wow' which is still pointing to the function that fn was originally poining to.

// Do the following: 

// Write a function that, given a string, outputs (logs) 
//a separate count for each (English language) vowel in the string ('a', 'e', 'i', 'o', 'u' – ignore 'y') 
//– consider upper and lower case letters to be the same 
//– you can suppress outputting any vowel counts that are zero
// Example:
// Input: "Hello There!!!"
// Output:
//     e: 3
//     o: 1

var vowelCount = function(str){
  var vowels = ['a', 'e', 'i', 'o', 'u'];
  var temp = {};
  str = str.toLowerCase();
  for (var i = 0; i < str.length; i++) {
    if (vowels.indexOf(str[i]) !== -1 && !temp[str[i]]) {
      temp[str[i]] = 1;
    } else if (vowels.indexOf(str[i]) !== -1 && temp[str[i]]) {
      temp[str[i]]++;
    }
  }
  for (var key in temp) {
    console.log(key + ':' + temp[key]);
  }
}

// Write another function that, given a string, outputs a separate count for each (English language)
// consonant in the string (all the letters except 'a', 'e', 'i', 'o', 'u' – also, 
//no spaces, numbers, or punctuation) – consider upper and lower case letters to be the same 
//– you can suppress outputting any consonant counts that are zero
// Example:
// Input: "Hello There!!!"
// Output:
//   h: 2
//   l: 2
//   r: 1
//   t: 1


var consonantCount = function(str){
  var vowels = ['a', 'e', 'i', 'o', 'u'];
  var temp = {};
  str = str.toLowerCase().replace(/[^a-z]/g, '');
  for (var i = 0; i < str.length; i++) {
    if (vowels.indexOf(str[i]) === -1 && !temp[str[i]]) {
      temp[str[i]] = 1;
    } else if (vowels.indexOf(str[i]) === -1 && temp[str[i]]) {
      temp[str[i]]++;
    }
  }
  for (var key in temp) {
    console.log(key + ':' + temp[key]);
  }
}

// Combine these two function into one:
// The new function should take an additional argument, "doVowels"
// if doVowels is true, count vowels
// if doVowels is false, count consonants
// Never count spaces, numbers, or punctuation
// Make sure your code is DRY ("don't repeat yourself")

var vowelConsonantCount = function(str, doVowel) {
  var vowels = ['a', 'e', 'i', 'o', 'u'];
  var temp = {};
  str = str.toLowerCase().replace(/[^a-z]/g, '');
  for (var i = 0; i < str.length; i++) {
    if (doVowel) {
      if (vowels.indexOf(str[i]) !== -1 && !temp[str[i]]) {
        temp[str[i]] = 1;
      } else if (vowels.indexOf(str[i]) !== -1 && temp[str[i]]) {
        temp[str[i]]++;
      }
    } else {
      if (vowels.indexOf(str[i]) === -1 && !temp[str[i]]) {
        temp[str[i]] = 1;
      } else if (vowels.indexOf(str[i]) === -1 && temp[str[i]]) {
        temp[str[i]]++;
      }
    }
  }
  for (var key in temp) {
    console.log(key + ':' + temp[key]);
  }
}







