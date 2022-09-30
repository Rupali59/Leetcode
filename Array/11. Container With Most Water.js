/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    return maxAreaOptimized(height);
};

var maxAreaBruteForce = function(height) {
    var area = 0;
    for (var i = 0; i < height.length; ++i) {
        for (var j = i + 1; j < height.length; ++j) {
            local_max = Math.min(height[i], height[j]) * (j - i);
            area = Math.max(area, local_max);
        }
    }
    return area;
}

var maxAreaOptimized = function(height) {
    var area = 0;
    var i = 0;
    j = height.length-1;
    while (i < j) {
        localMinVal = Math.min(height[i], height[j]);
        localArea = localMinVal * (j - i);
        area = Math.max(area, localArea);
        if (height[i] < height[j])
            i++;
        else
            j--;
    }

    return area;
}

/*__________________________________________________________________________________________________________________*/
var testcases = [
    [1, 1],
    [1, 8, 6, 2, 5, 4, 8, 3, 7],
]
var testcaseAnswers = [
    1,
    49
];

testcases.map((testcase, index) => {
    var op = maxArea(testcase);
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