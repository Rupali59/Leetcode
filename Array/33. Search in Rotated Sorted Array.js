/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    return searchArr(nums, target, 0, nums.length - 1);
};

var searchArr = function(nums, target, start, end) {
    if (start == end)
        return nums[start] == target ? start : -1;

    if (start == end - 1) {
        if (nums[start] == target)
            return start;
        if (nums[end] == target)
            return end;
        return -1;
    }
    var half = Math.floor((start + end) / 2);
    var firstHalfSearch = searchArr(nums, target, start, half);
    if (firstHalfSearch >= 0)
        return firstHalfSearch;
    var secondHalfSearch = searchArr(nums, target, half + 1, end);
    return secondHalfSearch;
};


/*__________________________________________________________________________________________________________________*/
var testcases = [
    { nums: [4, 5, 6, 7, 0, 1, 2], target: 0 },
    { nums: [4, 5, 6, 7, 0, 1, 2], target: 3 },
    { nums: [1], target: 0 }
]
var testcaseAnswers = [
    4,
    -1,
    -1
];

testcases.map((testcase, index) => {
    /**************************/
    var op = search(testcase["nums"], testcase["target"]);
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