/**
 * https://leetcode.com/problems/contains-duplicate/
 * @param {number[]} nums
 * @return {boolean}
 */

var containsDuplicate = function(nums) {
    var hash = {};
    nums.map(digit => {
        if (!hash[digit]) {
            hash[digit] = 1;
        } else
            return false;
    });
    return true;
};