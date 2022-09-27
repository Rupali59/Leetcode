/**
 * https://leetcode.com/problems/product-of-array-except-self/
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    var size = nums.length;
    var before = [],
        after = [];
    before[0] = 1;
    after[size - 1] = 1;

    for (var i = 1; i < size; ++i) {
        before[i] = before[i - 1] * nums[i - 1];
        after[size - 1 - i] = after[size - i] * nums[size - i];
    }
    return nums.map((x, i) => { return before[i] * after[i] });
};


/*__________________________________________________________________________________________________________________*/
var testcases = [
    [1, 2, 3, 4],
    [-1, 1, 0, -3, 3],
]
var testcaseAnswers = [
    [24, 12, 8, 6],
    [0, 0, 9, 0, 0]
];

testcases.map((testcase, index) => {
    var op = productExceptSelf(testcase);
    status = "Success";
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
                status = "Error";
    }

    console.log(status + ": " + testcase + " Output: " + op + " Expected: " + testcaseAnswers[index]);

})
/*__________________________________________________________________________________________________________________*/