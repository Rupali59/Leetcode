/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {

    var keyDict = {
        "I": 1,
        "V": 5,
        "X": 10,
        "L": 50,
        "C": 100,
        "D": 500,
        "M": 1000
    };

    var number = keyDict[s[s.length -1]];
    var maxVal = number;
    //read from right to left
    for (i = s.length - 2; i > -1; --i) {
        if (keyDict[s[i]] < maxVal) {
            number -= keyDict[s[i]];
        } else {
            number += keyDict[s[i]]
            if (keyDict[s[i]] > maxVal) {
                maxVal = keyDict[s[i]]
            }
        }
    }
    return number;
};

console.log(romanToInt("III"));