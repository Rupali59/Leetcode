/**
 * @param {number[]} nums
 * @return {number}
 */

var maxProduct = function(nums) {
    var local_maxp = nums[0];
    var local_maxn = nums[0];
    var global_max = nums[0];

    for (var i = 1; i < nums.length; ++i) {
        var local_max = Math.max(nums[i], nums[i] * local_maxp, nums[i] * local_maxn);
        local_maxn = Math.min(nums[i], nums[i] * local_maxp, nums[i] * local_maxn);
        local_maxp = local_max;
        global_max = Math.max(global_max, local_max);
    }
    return global_max;
};



var testcases = [
    [2, 3, -2, 4],
    [2, 3, -2, -4],
    [-2, 0, -1],
    [-2, 3, -4],
    [-2, 3, -4, 5],
    [-2, 3, -4, 5, -6],
    [-2, 3, -4, 5, 6, -7],
    [-2, 3, -4, 0, 5, 6, -7]

]
var testcaseAnswers = [
    6,
    48,
    0,
    24,
    120,
    360,
    2520,
    30
];

testcases.map((testcase, index) => {
    var op = maxProduct(testcase);
    status = true;
    switch (typeof(testcaseAnswers[index])) {
        case "object":
            {

                if (Array.isArray(testcaseAnswers[index])) {
                    testcaseAnswers[index].map((val, i) => {
                        if (op[i] != val)
                            status = false;
                    });
                }
                break;
            }
        default:
            if (op != testcaseAnswers[index])
                status = false;
    }
    console.log("------------");
    console.log("[" + (status ? "Success" : "Error") + "] Input: " + JSON.stringify(testcase) + " | Output: " + JSON.stringify(op) + " | Expected: " + JSON.stringify(testcaseAnswers[index]));
    console.log("------------");
})
/*__________________________________________________________________________________________________________________*/