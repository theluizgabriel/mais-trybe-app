// An Object
const obj = { 1: 5, 2: 7, 3: 0, 4: 0, 5: 0 };

// Using Object.keys() and map() function
// to convert convert an Object {} to an
// Array [] of key-value pairs

const result = Object.keys(obj).map((key) =>
  // Using Number() to convert key to number type
  // Using obj[key] to retrieve key value
  [Number(key), obj[key]]);

// Printing values
for (let i = 0; i < result.length; i++) {
  for (let z = 0; z < result[i].length; z++) {
    document.write(`${result[i][z]} `);
  }
  document.write('</br>');
}
