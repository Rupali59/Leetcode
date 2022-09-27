/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    if (nums.length == 1)
        return nums[0];

    var maxVal = nums[0];

    var calcArray = nums.map(x => {
        maxVal = Math.max(maxVal, x);
        return x;
    });

    for (var i = 2; i <= nums.length; ++i) {
        j = i-1;
        for (k = 0; k < nums.length - i + 1; ++k) {
            calcArray[k] = calcArray[k] + nums[k + j];
            maxVal = Math.max(maxVal, calcArray[k]);
        }
        calcArray.pop();
    }
    return maxVal;
};


var testcases = [
    [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    [1],
    [5, 4, -1, 7, 8],
    [-2,-1]
]
var testcaseAnswers = [
    6, 1, 23,-1
];

testcases.map((testcase, index) => {
    var op = maxSubArray(testcase);
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