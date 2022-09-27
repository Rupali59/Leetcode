/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var i = 0;
    while (i < nums.length) {
        var complimentary = target - nums[i];
        for (var j = i + 1; j < nums.length; ++j)
            if (nums[j] == complimentary)
                return [i, j];
        i++;
    }
};