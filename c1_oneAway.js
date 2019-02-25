var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

suite
  .add('oneAway1', function() {
    oneAway1('pale', 'bale');
  })
  .add('oneAway2', function() {
    oneAway2('pale', 'bale');
  })
  .add('oneAway3', function() {
    oneAway3('pale', 'bale');
  })
  .add('oneAway4', function() {
    oneAway4('pale', 'bale');
  })
  .add('oneAway5', function() {
    oneAway5('pale', 'bale');
  })
  .add('oneAway6', function() {
    oneAway6('pale', 'bale');
  })
  .add('oneAway7', function() {
    oneAway7('pale', 'bale');
  })
  .add('oneAway8', function() {
    oneAway8('pale', 'bale');
  })
  .add('oneAway9', function() {
    oneAway9('pale', 'bale');
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });

/**
 * ONE AWAY
 *
 *
 * I: string
 * O: boolean
 * C: optimize
 * E: empty string
 */

// time complexity: O(n)
// space complexity: O(n)

// try 1
function oneAway1(s1, s2) {
  // could be 3 loops within each other, each checking one edit for all chars
  // but this would be O(n^3) which would be inefficient.
  // Another method: pick the longest string, find index of difference, then
  // perform operations on it. Or, if 2 differences occur, then likely there is
  // more than one edit necessary.
  if (s2.length > s1.length) {
    let temp = s1;
    s1 = s2;
    s2 = temp;
  }
  let arr1 = s1.split('');
  let arr2 = s2.split('');
  let count = 0;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      // if the 2 chars are not equal, if s2 correct char is either forward 1,
      // or back 1. And if not, then there are more than 2 edits, so exit.
      if (arr2[i + 1] === arr1[i]) {
        arr2.splice(i, 1);
        i--;
      } else if (arr2[i] === arr1[i + 1]) {
        arr2.splice(i, 0, arr1[i]);
        i--;
      } else if (arr2[i] !== arr1[i]) {
        arr2[i] = arr1[i];
      } else {
        return false;
      }
      count++;
    }
    if (count > 1) {
      return false;
    }
  }
  return true;
}

/**
 * ONE AWAY
 *
 * I: 2 strings
 * O: boolean
 * C: optimize
 * E: empty string
 */

// time complexity: O(n) ... the longest string
// space complexity: O(n) ... not many vars... constant, and
// doesn't depend on the length of the string.

// ChirpingmermaidCodes1
// PseudoCode
// If insert, then s1's churrent char should match s2's next
// char, if s2 is the longer string.
// If remove, then s1s next char should match s2's current
// char.
// If replaced, then s1's current char should match s2's next
// char.

// max one edit
// if diff in lengths is greater then max edit, return false

// iterate through stings at the same time, checking for
// differences.
// store maxLength for the forloop condition.
// - On each iteration, check for differences, then decrement
// the number of edits,and if it drops below 0, then return
// false.

// If everything passes and loop is done, then return true.

let oneAway2 = (s1, s2) => {
  let edits = 1;
  let maxLen = Math.max(s1.length, s2.length);
  let diff = Math.abs(s1.length - s2.length);

  if (diff > edits) {
    return false;
  }

  // We will have two indices in the forloop.
  // Keep iterating until the greater of the two finishes.
  // so just say, if either are true, then we're not done yet.
  for (let i = 0, j = 0; i < maxLen || j < maxLen; i++, j++) {
    let c1 = s1[i];
    let c2 = s2[j];

    if (c1 !== c2) {
      edits--;
      if (edits < 0) {
        return false;
      }
      // Where we look at insert, remove, and replace
      if (c1 === s2[j + 1]) {
        // inserted (if replaced, same as inserted, in terms of edits)
        j++;
      } else if (s1[i + 1] === c2) {
        //removed
        i++;
      }
    }
  }

  return true;
};

// ctci javascript
function oneAway3(left, right) {
  // lengths differ by more than one?
  if (Math.abs(left.length - right.length) > 1) {
    return false;
  }

  for (
    let diff = 0, indexLeft = 0, indexRight = 0;
    indexLeft < left.length || indexRight < right.length;
    ++indexLeft, ++indexRight
  ) {
    if (left[indexLeft] !== right[indexRight]) {
      // is there more than one diff?
      if (++diff === 2) {
        return false;
      }
      // when the current chars differ, increment R/L index if appropriate
      if (left[indexLeft + 1] === right[indexRight]) {
        // char inserted in left string or removed from right
        ++indexLeft;
      } else if (left[indexLeft] === right[indexRight + 1]) {
        // char inserted in right string, or removed from left
        ++indexRight;
      }
    }
  }

  return true;
}

// ChirpingmermaidCodes2
// time complexity: O(n)
// space complexity: O(n)
let oneAway4 = (s1, s2) => {
  let edits = 1;
  let long = s1.length > s2.length ? s1 : s2;
  let short = s1.length <= s2.length ? s1 : s2;

  let maxLen = Math.max(s1.length, s2.length);
  let diff = long.length - short.length;

  if (diff > edits) {
    return false;
  }

  // We will have two indices in the forloop.
  // Keep iterating until the greater of the two finishes.
  // so just say, if either are true, then we're not done yet.
  for (let i = 0, j = 0; i < maxLen || j < maxLen; i++, j++) {
    let c1 = long[i];
    let c2 = short[j];

    if (c1 !== c2) {
      edits--;
      if (edits < 0) {
        return false;
      }
      // inserted or removed
      if (long[i + 1] === c2) {
        i++;
      }
    }
  }

  return true;
};

// CTCI-Javascript
var oneAway5 = function(string1, string2) {
  // insert a char for str1 -> remove a char for str2
  var checkOneMissing = function(first, second) {
    if (first.length !== second.length - 1) {
      return false;
    } else {
      var mulligan = false;
      var fP = 0; // first Pointer
      var sP = 0; // second Pointer
      while (fP < first.length) {
        if (first[fP] !== second[sP]) {
          if (mulligan) {
            return false;
          } else {
            mulligan = true;
            sP++; // second length is longer
          }
        } else {
          fP++;
          sP++;
        }
      }
      return true;
    }
  };

  var checkOneDiff = function(first, second) {
    if (first.length !== second.length) {
      return false;
    } else {
      var mulligan = false;
      var fP = 0; // first Pointer
      var sP = 0; // second Pointer
      while (fP < first.length) {
        if (first[fP] !== second[sP]) {
          if (mulligan) {
            return false; // more than one mismatch
          } else {
            mulligan = true; // use up mulligan
          }
        }
        fP++;
        sP++;
      }
      return true;
    }
  };
  // insert a char for str1 -> remove a char for str2
  // check one diff

  // console log checks
  // console.log(string1, string2, 'checkMiss', checkOneMissing(string1, string2));
  // console.log(string2, string1, 'checkMiss', checkOneMissing(string2, string1));
  // console.log(string1, string2, 'checkDiff', checkOneDiff(string1, string2));

  return (
    checkOneMissing(string1, string2) ||
    checkOneMissing(string2, string1) ||
    checkOneDiff(string1, string2)
  );
};

//CTCI JS Sols
function oneAway6(str1, str2) {
  const str1Length = str1.length,
    str2Length = str2.length;

  if (Math.abs(str1Length - str2Length) > 1) return false;

  const isInsertion = str1Length < str2Length,
    isDeletedChar = !isInsertion && str1Length !== str2Length;

  let isEdited = false,
    i,
    x;

  for (i = x = 0; i < str1Length && x < str2Length; i++, x++) {
    if (str1[i] !== str2[x]) {
      if (isEdited) return false;
      if (isInsertion) i--;
      else if (isDeletedChar) x--;
      isEdited = true;
    }
  }

  return true;
}

// ctci
function oneAway7(a, b) {
  if (!a.length || !b.length) return null;
  if (Math.abs(a.length - b.length) > 1) return false;

  if (a.length === b.length) return replace(a, b);
  if (a.length < b.length) {
    return insert(a, b);
  } else {
    return insert(b, a);
  }
}

function replace(a, b) {
  let edit = false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      if (edit) return false;
      edit = true;
    }
  }

  return true;
}

function insert(a, b) {
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] !== b[j]) {
      if (i !== j) return false;
      j++;
    } else {
      i++;
      j++;
    }
  }

  return true;
}

// CTCI ES5
function oneAway8(str1, str2) {
  // if lengths differ by more than 1 then can't be true
  if (Math.abs(str1.length - str2.length) > 1) {
    return false;
  }

  let isEdited = false;
  for (let i = 0, j = 0; i < str1.length && j < str2.length; ++i, ++j) {
    if (str1[i] !== str2[j]) {
      if (isEdited) {
        // second edit
        return false;
      }

      if (str1.length > str2.length) {
        --j; // decrease j, we are deleting char from str1
      } else if (str1.length < str2.length) {
        --i; // decrease i, we are deleting char from str2
      }
      isEdited = true;
    }
  }

  return true;
}

// stackhouse
function oneAway9(s1, s2) {
  // Cracking the Coding Interview 1.5
  // There are three types of edits that can be performed on strings: insert a character, remove a
  // character, or replace a character. Given two strings, write a function to check if they are one
  // edit (or zero edits) away.
  // EXAMPLE
  // pale,  ple  -> true
  // pales, pale -> true
  // pale,  bale -> true
  // pale,  bake -> false

  s1_length = s1.length;
  s2_length = s2.length;
  // If one string is more than a character longer, then one operation cannot make them equivalent.
  if (Math.abs(s1_length - s2_length) > 1) {
    return false;
  } else {
    let i = 0;
    // Find the index of the first string difference.
    while (s1.charAt(i) === s2.charAt(i) && i < s1_length && i < s2_length) {
      i++;
    }
    // If the strings are the same length, and the strings are identical after i,
    // then a single replace edit will make them equivalent.
    if (s1_length === s2_length) {
      return s2.slice(i + 1, s2_length) === s1.slice(i + 1, s1_length);
    } else {
      // Remove the character at i from the longer string.
      // Remove and insert can be caught with one test.
      s1_length > s2_length
        ? (s1 = s1.slice(0, i) + s1.slice(i + 1, s1_length))
        : (s2 = s2.slice(0, i) + s2.slice(i + 1, s2_length));
      return s1 === s2;
    }
  }
}

console.log(
  oneAway1('pale', 'ple') === true,
  oneAway1('pales', 'pale') === true,
  oneAway1('pale', 'bale') === true,
  oneAway1('pale', 'bake') === false
);
console.log(
  oneAway2('pale', 'ple') === true,
  oneAway2('pales', 'pale') === true,
  oneAway2('pale', 'bale') === true,
  oneAway2('pale', 'bake') === false
);
console.log(
  oneAway3('pale', 'ple') === true,
  oneAway3('pales', 'pale') === true,
  oneAway3('pale', 'bale') === true,
  oneAway3('pale', 'bake') === false
);
console.log(
  oneAway4('pale', 'ple') === true,
  oneAway4('pales', 'pale') === true,
  oneAway4('pale', 'bale') === true,
  oneAway4('pale', 'bake') === false
);
console.log(
  oneAway5('pale', 'ple') === true,
  oneAway5('pales', 'pale') === true,
  oneAway5('pale', 'bale') === true,
  oneAway5('pale', 'bake') === false
);
console.log(
  oneAway6('pale', 'ple') === true,
  oneAway6('pales', 'pale') === true,
  oneAway6('pale', 'bale') === true,
  oneAway6('pale', 'bake') === false
);
console.log(
  oneAway7('pale', 'ple') === true,
  oneAway7('pales', 'pale') === true,
  oneAway7('pale', 'bale') === true,
  oneAway7('pale', 'bake') === false
);
console.log(
  oneAway8('pale', 'ple') === true,
  oneAway8('pales', 'pale') === true,
  oneAway8('pale', 'bale') === true,
  oneAway8('pale', 'bake') === false
);
console.log(
  oneAway9('pale', 'ple') === true,
  oneAway9('pales', 'pale') === true,
  oneAway9('pale', 'bale') === true,
  oneAway9('pale', 'bake') === false
);
// console.log(
//   oneAway10('pale', 'ple') === true,
//   oneAway10('pales', 'pale') === true,
//   oneAway10('pale', 'bale') === true,
//   oneAway10('pale', 'bake') === false
// );

// results
// oneAway1 x 1,961,166 ops/sec ±3.33% (47 runs sampled)
// oneAway2 x 10,773,908 ops/sec ±1.03% (50 runs sampled)
// oneAway3 x 10,033,913 ops/sec ±2.38% (52 runs sampled)
// oneAway4 x 11,600,783 ops/sec ±4.03% (47 runs sampled)
// oneAway5 x 19,917,695 ops/sec ±4.08% (52 runs sampled)
// oneAway6 x 20,508,817 ops/sec ±2.49% (49 runs sampled)
// oneAway7 x 21,357,260 ops/sec ±2.08% (50 runs sampled)
// oneAway8 x 20,681,569 ops/sec ±1.84% (52 runs sampled)
// oneAway9 x 51,764,699 ops/sec ±2.72% (47 runs sampled)
// Fastest is oneAway9
