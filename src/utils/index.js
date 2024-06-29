export function isNumeric(str) {
  if (typeof str != 'string') return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

export function ascii_to_hexa(str) {
  // Initialize an empty array to store the hexadecimal values
  var arr1 = [];

  // Iterate through each character in the input string
  for (var n = 0, l = str.length; n < l; n++) {
    // Convert the ASCII value of the current character to its hexadecimal representation
    var hex = Number(str.charCodeAt(n)).toString(16);

    // Push the hexadecimal value to the array
    arr1.push(hex);
  }

  // Join the hexadecimal values in the array to form a single string
  return arr1.join('');
}

export function hex_to_ascii(str1) {
  // Convert the input hexadecimal string to a regular string
  var hex = str1.toString();
  // Initialize an empty string to store the resulting ASCII characters
  var str = '';
  // Iterate through the hexadecimal string, processing two characters at a time
  for (var n = 0; n < hex.length; n += 2) {
    // Extract two characters from the hexadecimal string and convert them to their ASCII equivalent
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  // Return the resulting ASCII string
  return str;
}
