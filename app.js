const delimiterFlag = "//";
//if no delimiter specified, program will use default
const delimiterDefault = ",";

function Add(numbers) {
    /**
     * Returns sum of individual numbers in input string
     *  
     */
    let total = 0;
    let numArray = numsToArray(numbers);
    let negatives = [];

    numArray.forEach(element => {
        if(element < 0) negatives.push(element);
        // numbers less than 1000 excluded
        else if (element < 1000) total += element;
    });
    
    try {
        if (negatives.length > 0) throw 'Negatives not allowed. List: ' + negatives;
        return total;
    } 
    catch(e) {
        console.error(e);
    }
}

function numsToArray(numbers) {
    /**
     * Helper function, turns input into array of individual numbers
     */
    let numArray = [];
    let delimiterList = [];

    if(!numbers) {
        return [0];
    }

    // if custom delimiters flagged in input, make array of delimiters
    if(numbers.slice(0, delimiterFlag.length) == delimiterFlag) {
        //the string of delimiters is cut off at first newline
        delimiterStr = numbers.slice(delimiterFlag.length, numbers.indexOf("\n"))
        delimiterList = getDelimiters(delimiterStr);

        numbers = numbers.slice(numbers.indexOf("\n"))
    }

    // remove newline characters from input string
    numbers = numbers.replace(/(\n|\r|\r\n)/g, '');

    //each number split by delimiter(s) into array
    if(delimiterList.length > 0) {
        numArray = numbers.split(new RegExp(delimiterList.join('|')));
    }
    else {
        numArray = numbers.split(delimiterDefault);
    }
    numArray = numArray.map(x => parseInt(x));

    return numArray;
}

function getDelimiters(delimiterStr) {
    /**
     * Helper function, returns array of delimiters from input string
     */
    let delimiter = "";
    let delimiterList = [];

    for (i = 0; i < delimiterStr.length; i++) {
        // build multi-letter delimiters
        if(delimiterStr[i] === delimiterStr[i + 1]) {
            //double backlash ensures special characters are escaped
            delimiter += "\\" + delimiterStr[i];
        }
        // push distinct delimiters onto array
        else {
            delimiter += "\\" + delimiterStr[i];
            delimiterList.push(delimiter);
            delimiter = "";
        }
    }
    return delimiterList;
}

console.log(Add("")); //expect 0
console.log(Add("1,3,5")) //expect 9
console.log(Add("1\n,3,6")) //expect 10
console.log(Add("//^\n5^62\n^99^100")) //expect 266
console.log(Add("//^\n5^62^99^-100")) //expect exception
console.log(Add("//^\n5^62^99^1001")) //expect 166
console.log(Add("//^**-\n3-4^7**2-4^7**0^8000")); //expect 27