// What does the following code return?

new Set([1, 1, 2, 2, 3, 4]) 
// it will return {1,2,3,4}



// What does the following code return?

// [...new Set("referee")].join("");
// // it will retuen 'ref



// What does the Map m look like after running the following code?

let m = new Map();
m.set([1,2,3], true);
m.set([1, 2, 3], false);
//  0: {Array(3) => true}
//  1: {Array(3) => false}



// Write a function called hasDuplicate which accepts an array and returns true or false
// if that array contains a duplicate

const hasDuplicate = (arr) => new Set(arr).size !== arr.length;



// Write a function called vowelCount which accepts a string and returns a map
// where the keys are numbers and the values are the count of the vowels in the string.

const vowelCount = ([...str]) => {
    const vowels = "aeiou";
    const map = new Map();
    for (let letter of str) {
        if (vowels.includes(letter)) {
            if (map.has(letter)) {
                map.set(letter, map.get(letter) + 1)
            }
            else {
                map.set(letter, 1)
            }
        }
    }
    return (map);
};