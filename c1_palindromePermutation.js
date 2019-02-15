var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

/*
suite
  .add('palindromePermutation1', function() {
    palindromePermutation1('taco cat');
  })
  .add('palindromePermutation2', function() {
    palindromePermutation2('taco cat');
  })
  .add('palindromePermutation3', function() {
    palindromePermutation3('taco cat');
  })
  .add('palindromePermutation4', function() {
    palindromePermutation4('taco cat');
  })
  .add('palindromePermutation5', function() {
    palindromePermutation5('taco cat');
  })
  .add('palindromePermutation6', function() {
    palindromePermutation6('taco cat');
  })
  .add('palindromePermutation7', function() {
    palindromePermutation7('taco cat');
  })
  .add('palindromePermutation8', function() {
    palindromePermutation8('taco cat');
  })
  .add('palindromePermutation9', function() {
    palindromePermutation9('taco cat');
  })
  .add('palindromePermutation10', function() {
    palindromePermutation10('taco cat');
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });
*/

function palindromePermutation2(str) {
  let chars = {};
  let currChar = 0;
  let isPerm = true;
  let mulligan = false;
  // pump in the characters
  str.split('').forEach(function(char) {
    if (char !== ' ') {
      currChar = char.toLowerCase();
      if (chars[currChar] === undefined) {
        chars[currChar] = 0;
      }
      chars[char]++;
    }
  });
  // check if remainder for each letter, first remainder = mulligan = true,
  // then, second remainder = milligan true... making isPerm false.
  Object.keys(chars).forEach(function(char) {
    if (chars[char] % 2 > 0) {
      if (mulligan) {
        isPerm = false;
      } else {
        mulligan = true;
      }
    }
  });
  return isPerm;
}

/**
 * CHECK PERMUTATION
 *
 *
 * I: string
 * O: boolean
 * C: optimize
 * E: empty string, spaces between and in front and at end, >2 of the same
 * characters, even and odd chars
 */

// time complexity: O(n)
// space complexity: O(n) ..likely

// from ChirpinmermaidCodes
let palindromePermutation3 = s => {
  //if even: then there must be 2 of every character
  //if odd: there must be only one unique char
  //use hash table to store letters
  //if we see the same letter again, delete from hash
  //check hash table at the end: odd, then we should have 1 key left, and
  // if even, then we should  have 0 keys left
  let hash = {};
  let charCount = 0;

  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    if (c === ' ') {
      continue;
    }
    if (hash[c]) {
      delete hash[c];
    } else {
      hash[c] = true;
    }
    charCount++;
  }
  if (charCount % 2 === 0) {
    return Object.keys(hash).length === 0;
  } else {
    return Object.keys(hash).length === 1;
  }
};

// algos sol
// time: O(2n)
function palindromePermutation4(str) {
  let table = build_char_frequency(str);
  return check_odd(table);
}

function build_char_frequency(str) {
  let table = {};
  for (let i = 0; i < str.length; i++) {
    if (table[str[i]]) {
      table[str[i]] += 1;
    } else {
      table[str[i]] = 1;
    }
  }
  return table;
}

function check_odd(obj) {
  let result = false;
  Object.values(obj).map(count => {
    if (count % 2 === 0) {
      result = true;
    }
  });
  return result;
}

// CTCI JS Sol
// 0(N) TIME -- O(N) SPACE
function palindromePermutation5(str) {
  if (!str) return false;

  str = str.toLowerCase();

  const letterMap = new Set();
  for (const letter of str) {
    if (letter !== ' ') {
      if (letterMap.has(letter)) letterMap.delete(letter);
      else letterMap.add(letter);
    }
  }

  return letterMap.size <= 1;
}

// ctci
function palindromePermutation6(str) {
  if (!str.length) return null;

  const memo = {};
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (!memo[char]) {
      memo[char] = true;
    } else {
      memo[char] = !memo[char];
    }
  }

  let count = 0;
  for (let char in memo) {
    if (memo[char]) count++;
  }

  return count <= 1;
}

// CTCI JS
var palindromePermutation7 = function(string) {
  // create object literal to store charcount
  var chars = {};
  var currChar;
  var mulligan = false;
  var isPerm = true;
  // pump characters in, spaces not counted, all lowercase
  string.split('').forEach(char => {
    if (char !== ' ') {
      currChar = char.toLowerCase();
      if (chars[currChar] === undefined) {
        chars[currChar] = 0;
      }
      chars[currChar]++;
    }
  });
  // check that all chars are even count, except for one exception
  Object.keys(chars).forEach(char => {
    if (chars[char] % 2 > 0) {
      // if more than one exception, return false
      if (mulligan) {
        isPerm = false; // return in a forEach statment doesn't flow out of function scope
      } else {
        mulligan = true;
      }
    }
  });
  // if not return true
  return isPerm;
};

// CTCI ES5
/**
 * Go through characters in string and set flag to indicate if there is an
 * odd number of that character. If there is more than one character with an
 * odd number of occurences then it cannot be a palindrome.
 *
 * N = |str|
 * Time: O(N)
 * Additional space: O(N)
 */
function palindromePermutation8(str) {
  if (!str) {
    return false;
  }

  let chars = new Set();
  for (let char of str) {
    if (char !== ' ') {
      if (chars.has(char)) {
        chars.delete(char);
      } else {
        chars.add(char);
      }
    }
  }

  return chars.size <= 1;
}

// ctci javascript
function palindromePermutation9(str) {
  // ignore whitespace and case
  const strCopy = str.replace(/[^\w]/g, '').toLowerCase();

  // build letter hash
  const map = {};
  for (let ch of strCopy) {
    map[ch] = ++map[ch] || 1;
  }

  // a permuation of a palindrome can have at most one odd letter count
  let counter = 0;
  for (let ch in map) {
    counter += map[ch] % 2;
  }

  // if true sum is 0 or 1
  return counter < 2;
}

// JS Algos
var palindromePermutation10 = function(str) {
  var hash = {};
  for (var i = 0; i < str.length; i++) {
    var ele = str[i];
    if (!hash[ele]) {
      hash[ele] = 1;
    } else {
      hash[ele]++;
    }
  }
  var count = 0;
  for (var key in hash) {
    if (hash[key] % 2 !== 0) {
      count++;
    }
    if (count > 1) {
      return false;
    }
  }
  return true;
};

/*
// try 1 (needed help w/finding permutations b/c forgot recursion gets n!)
// time: O(xn!)
// space: O(n) b/c of call stack

// Pseudocode
// function getAllPermutations (string)
// define results
// if string is a single character
//   add the character to results
//   return results
// for each char in string
//   define innerPermutations as a char of string
//   set innerPermutations to getAllPermutations (without next char)
//   foreach string in innerPermutations
//     add defined char and innerPermutations char
// return results

function getAllPermutations1(str) {
  let results = [];

  if (str.length === 1) {
    results.push(str);
    return results;
  }

  for (let i = 0; i < str.length; i++) {
    let firstChar = str[i];
    var charsLeft = str.substring(0, i) + str.substring(i + 1);
    let innerPermutations = getAllPermutations1(charsLeft);
    for (let j = 0; j < innerPermutations.length; j++) {
      results.push(firstChar + innerPermutations[j]);
    }
  }
  return results;
}

function palindromePermutationX1(str) {
  let strArr = str
    .toLowerCase()
    .split('')
    .filter(function(el) {
      return el !== ' ';
    })
    .join('');
  let perms = getAllPermutations1(strArr);
  if (perms.length > 0) {
    return true;
  } else {
    return false;
  }
}

// I got owned by the solutions in ctci, since they all avoided
// the task of finding all the permutations through O(n!)(b/c infeasible)
// Now to check how the person actually solved it JS.
*/

/*
// fail to implement bitmasks, b/c 'how to make bitVector quickly' in JS.
function palindromePermutationX2(str) {
  let bitVector = createBitVector(str);
  return bitVector == 0 || checkExactlyOneBitSet(bitVector);
}

function createBitVector(str) {
  let bitVector = 0;
  for (char)
}
  let chars = {};
  let currChar = 0;
  let checker = 0;
  // pump in the characters
  str.split('').forEach(function(char) {
    if (char !== ' ') {
      currChar = char.toLowerCase();
      if (chars[currChar] === undefined) {
        chars[currChar] = 0;
      }
      chars[char]++;
    }
  });
  // check if remainder for each letter, first remainder = mulligan = true,
  // then, second remainder = milligan true... making isPerm false.
  Object.keys(chars).forEach(function(char) {
    let val = char.charCodeAt(0) - 'a'.charCodeAt(0);
    let mask = 1 << val;
    if (checker & (mask == 0)) {
    }
  });
  return isPerm;
}
*/

// console.log(
//   palindromePermutation1('taco cat') === true,
//   palindromePermutation1('atco cat') === true,
//   palindromePermutation1(' rac ecar rara ') === true,
//   palindromePermutation1('aabbc') === true,
//   palindromePermutation1('aaaabbbbcc') === true,
//   palindromePermutation1('') === true,
//   palindromePermutation1('chirpingmermaid') === false,
//   palindromePermutation1('aabc') === false,
//   palindromePermutation1('aabccc') === false
// );

console.log(
  palindromePermutation2('taco cat') === true,
  palindromePermutation2('atco cat') === true,
  palindromePermutation2(' rac ecar rara ') === true,
  palindromePermutation2('aabbc') === true,
  palindromePermutation2('aaaabbbbcc') === true,
  palindromePermutation2('') === true,
  palindromePermutation2('chirpingmermaid') === false,
  palindromePermutation2('aabc') === false,
  palindromePermutation2('aabccc') === false
);

console.log(
  palindromePermutation3('taco cat') === true,
  palindromePermutation3('atco cat') === true,
  palindromePermutation3(' rac ecar rara ') === true,
  palindromePermutation3('aabbc') === true,
  palindromePermutation3('aaaabbbbcc') === true,
  palindromePermutation3('') === true,
  palindromePermutation3('chirpingmermaid') === false,
  palindromePermutation3('aabc') === false,
  palindromePermutation3('aabccc') === false
);

console.log(
  palindromePermutation4('taco cat') === true,
  palindromePermutation4('atco cat') === true,
  palindromePermutation4(' rac ecar rara ') === true,
  palindromePermutation4('aabbc') === true,
  palindromePermutation4('aaaabbbbcc') === true,
  palindromePermutation4('') === true,
  palindromePermutation4('chirpingmermaid') === false,
  palindromePermutation4('aabc') === false,
  palindromePermutation4('aabccc') === false
);

console.log(
  palindromePermutation5('taco cat') === true,
  palindromePermutation5('atco cat') === true,
  palindromePermutation5(' rac ecar rara ') === true,
  palindromePermutation5('aabbc') === true,
  palindromePermutation5('aaaabbbbcc') === true,
  palindromePermutation5('') === true,
  palindromePermutation5('chirpingmermaid') === false,
  palindromePermutation5('aabc') === false,
  palindromePermutation5('aabccc') === false
);

console.log(
  palindromePermutation6('taco cat') === true,
  palindromePermutation6('atco cat') === true,
  palindromePermutation6(' rac ecar rara ') === true,
  palindromePermutation6('aabbc') === true,
  palindromePermutation6('aaaabbbbcc') === true,
  palindromePermutation6('') === true,
  palindromePermutation6('chirpingmermaid') === false,
  palindromePermutation6('aabc') === false,
  palindromePermutation6('aabccc') === false
);

console.log(
  palindromePermutation7('taco cat') === true,
  palindromePermutation7('atco cat') === true,
  palindromePermutation7(' rac ecar rara ') === true,
  palindromePermutation7('aabbc') === true,
  palindromePermutation7('aaaabbbbcc') === true,
  palindromePermutation7('') === true,
  palindromePermutation7('chirpingmermaid') === false,
  palindromePermutation7('aabc') === false,
  palindromePermutation7('aabccc') === false
);

console.log(
  palindromePermutation8('taco cat') === true,
  palindromePermutation8('atco cat') === true,
  palindromePermutation8(' rac ecar rara ') === true,
  palindromePermutation8('aabbc') === true,
  palindromePermutation8('aaaabbbbcc') === true,
  palindromePermutation8('') === true,
  palindromePermutation8('chirpingmermaid') === false,
  palindromePermutation8('aabc') === false,
  palindromePermutation8('aabccc') === false
);

console.log(
  palindromePermutation9('taco cat') === true,
  palindromePermutation9('atco cat') === true,
  palindromePermutation9(' rac ecar rara ') === true,
  palindromePermutation9('aabbc') === true,
  palindromePermutation9('aaaabbbbcc') === true,
  palindromePermutation9('') === true,
  palindromePermutation9('chirpingmermaid') === false,
  palindromePermutation9('aabc') === false,
  palindromePermutation9('aabccc') === false
);

console.log(
  palindromePermutation10('taco cat') === true,
  palindromePermutation10('atco cat') === true,
  palindromePermutation10(' rac ecar rara ') === true,
  palindromePermutation10('aabbc') === true,
  palindromePermutation10('aaaabbbbcc') === true,
  palindromePermutation10('') === true,
  palindromePermutation10('chirpingmermaid') === false,
  palindromePermutation10('aabc') === false,
  palindromePermutation10('aabccc') === false
);

// console.log(
//   palindromePermutation11('taco cat') === true,
//   palindromePermutation11('atco cat') === true,
//   palindromePermutation11(' rac ecar rara ') === true,
//   palindromePermutation11('aabbc') === true,
//   palindromePermutation11('aaaabbbbcc') === true,
//   palindromePermutation11('') === true,
//   palindromePermutation11('chirpingmermaid') === false,
//   palindromePermutation11('aabc') === false,
//   palindromePermutation11('aabccc') === false
// );

// results:
// palindromePermutation1 x 33,795 ops/sec ±3.76% (48 runs sampled)
// palindromePermutation2 x 664,872 ops/sec ±1.39% (50 runs sampled)
// palindromePermutation4 x 862,641 ops/sec ±3.78% (48 runs sampled)
// Fastest is palindromePermutation4
