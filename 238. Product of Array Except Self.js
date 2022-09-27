/**
 * https://leetcode.com/problems/product-of-array-except-self/
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    var size = nums.length;
    var product = Array(size).fill(1);;

    for (var i = 1; i < size; ++i)
        product[i] = nums[i - 1] * product[i - 1];

    var temp = 1;
    for (var i = size - 1; i >= 0; --i) {
        product[i] *= temp;
        temp *= nums[i];
    }
    
    return product;
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
    console.log((status ? "Success" : "Error") + ": " + testcase + " Output: " + op + " Expected: " + testcaseAnswers[index]);
    console.log("------------");
})
/*__________________________________________________________________________________________________________________*/