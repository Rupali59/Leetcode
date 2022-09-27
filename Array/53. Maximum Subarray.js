/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    /**
     * Kanade's algorithm
     * local_maximum at index i is the maximum of A[i] and the sum of A[i] and local_maximum at index i-1.
     * local_max(i) = max(A[i], local_max(i-1)+A[i])
     */
     var local_max= [];
     local_max[0] = nums[0];
     var global_max = local_max[0];

     for(var i=1; i<nums.length; ++i){
        local_max[i] = Math.max(nums[i], nums[i]+local_max[i-1]);
        global_max = Math.max(local_max[i], global_max);
     }
     return global_max;
};


var localMaximum = function(A, local_max, i){
    if(i == 0)
        return A[0];
    
    
    
    return local_max[i];
}


var testcases = [
    [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    [1],
    [5, 4, -1, 7, 8],
    [-2, -1]
]
var testcaseAnswers = [
    6, 1, 23, -1
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