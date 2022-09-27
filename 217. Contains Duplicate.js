/**
 * https://leetcode.com/problems/contains-duplicate/
 * @param {number[]} nums
 * @return {boolean}
 */

var containsDuplicate = function(nums) {
    var hash = new Map();
    i = 0;
    while (i < nums.length) {
        if (!hash.has(nums[i])) {
            hash.set(nums[i], 1);
        } else
            return true;
        i++;
    }
    return false;
};


var testcases = [
    [1, 2, 3, 1],
    [1, 2, 3, 4],
    [1, 1, 1, 3, 3, 4, 3, 2, 4, 2],
]
var testcaseAnswers = [true, false, true];
testcases.map((testcase, index) => {
    var op = containsDuplicate(testcase);
    if (op != testcaseAnswers[index])
        console.log("Error: " + testcase + " Output: " + op + " Expected: " + testcaseAnswers[index]);
    // else
    //     console.log("Success: " + testcase + " Output: " + op + " Expected: " + testcaseAnswers[index]);
})