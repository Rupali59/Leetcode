/**
 * @param {number} n
 * @return {number}
 * https://leetcode.com/problems/climbing-stairs/
 */
var climbStairs = function(n) {
    var arr = new Array(n);
    arr[0]=1, arr[1]=2;
    return climbStairsR(n-1, arr);
};

var climbStairsR = function(n, arr) { 
    if (n < 0)
        return 0;
    if (arr[n])
        return arr[n];
    arr[n] = climbStairsR(n - 1, arr) + climbStairsR(n - 2, arr);
    return arr[n];
};


/*__________________________________________________________________________________________________________________*/
var testcases = [
    2,3
]
var testcaseAnswers = [
    2,3
];

testcases.map((testcase, index) => {
    /***************************/
    var op = climbStairs(testcase);
    /***************************/
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