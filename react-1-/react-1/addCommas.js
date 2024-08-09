function addCommas(number) {
    // Convert the number to a string
    let numStr = number.toString();
    
    // Handle negative numbers
    if (numStr[0] === '-') {
        return '-' + addCommas(-number);
    }
    
    // Handle numbers with decimals
    if (numStr.includes('.')) {
        let [integerPart, fractionalPart] = numStr.split('.');
        return parseInt(integerPart).toLocaleString() + '.' + fractionalPart;
    }
    
    // Add commas to the integer part
    return parseInt(numStr).toLocaleString();
  }
  
  module.exports = addCommas;