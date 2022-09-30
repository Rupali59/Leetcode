/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    if (nums.length == 1)
        return nums[0];
    var half = (nums.length / 2);
    var firstHalfMin = findMin(nums.slice(0, half));
    var secondHalfMin = findMin(nums.slice(half));
    return Math.min(firstHalfMin, secondHalfMin);
};


/*__________________________________________________________________________________________________________________*/
var testcases = [
    [3, 4, 5, 1, 2],
    [4, 5, 6, 7, 0, 1, 2],
    [11, 13, 15, 17],
]
var testcaseAnswers = [
    1,
    0,
    11
];

testcases.map((testcase, index) => {
    /**************************/
    var op = findMin(testcase);
    /**************************/
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