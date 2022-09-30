/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    // return threeSumBruteForce(nums);
    return sortedThreeSum(nums);
};


/*
 * a = 0   -> n-2
 * b = a+1 -> n-1
 * c = b+1 -> n
 */
var threeSumBruteForce = function(nums) {
    var ops = [];

    for (var a = 0; a < nums.length - 2; ++a) {
        for (var b = a + 1; b < nums.length - 1; ++b) {
            for (var c = b + 1; c < nums.length; ++c) {
                if (nums[a] + nums[b] + nums[c] == 0)
                    ops.push([nums[a], nums[b], nums[c]]);
            }
        }
    }

    return removeDuplicates(ops);
}


var sortedThreeSum = function(nums) {
    nums.sort((a, b) => a - b);

    var ops = [];
    
    for (i = 0; i < nums.length - 2; ++i) {
        var k = nums.length - 1;

        for (j = i + 1; j < nums.length - 1; ++j) {
            if (k <= j)
                break;

            // console.log([i, j, k], [nums[i], nums[j], nums[k]]);
            var sum = -1 * (nums[i] + nums[j]);
            while (nums[k] > sum)
                k--;
             if (k <= j)
                break;
            // console.log([i, j, k], [nums[i], nums[j], nums[k]]);
            if (nums[k] == sum) {
                // console.log(["E:", i, j, k], [nums[i], nums[j], nums[k]]);
                ops.push([nums[i], nums[j], nums[k]]);
            }
            while (nums[k] == sum)
                k--;

            // console.log([i, j, k], [nums[i], nums[j], nums[k]]);
            // console.log("____________________________________");

        }
    }

    return removeDuplicates(ops);
}



function removeDuplicates(ops) {
    if (ops.length < 2)
        return ops;
    var remove = [];
    var hashes = [];
    ops.map((x, i) => {
        var hash = getHash(x);
        if (hashes.indexOf(hash) < 0)
            hashes.push(hash);
        else {
            remove.push(i);
        }
    });
    remove.sort(function(a, b) { return b - a; }).map(x => ops.splice(x, 1));
    return ops
}


function getHash(array) {
    return JSON.stringify(Object.fromEntries(array.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())));
}

/*__________________________________________________________________________________________________________________*/
var testcases = [
    [-1, 0, 1, 2, -1, -4],
    [0, 1, 1],
    [0, 0, 0],
    [1, 2, -2, -1],
    [3, -2, 1, 0],
    [3, 0, -2, -1, 1, 2],
    [1,2,-2,-1],
    [-1,0,1,2,-1,-4,-2,-3,3,0,4]
]
var testcaseAnswers = [
    [
        [-1, -1, 2],
        [-1, 0, 1]
    ],
    [],
    [
        [0, 0, 0]
    ],
    [],
    [],
    [
        [-2, -1, 3],
        [-2, 0, 2],
        [-1, 0, 1]
    ],
    [],
    [[-4,0,4],[-4,1,3],[-3,-1,4],[-3,0,3],[-3,1,2],[-2,-1,3],[-2,0,2],[-1,-1,2],[-1,0,1]]
];

testcases.map((testcase, index) => {
    /**************************/
    var op = threeSum(testcase);
    var isOrderSpecific = false;
    /**************************/
    console.log("------------");
    console.log("[" + (isSame(op, testcaseAnswers[index], isOrderSpecific) ? "Success" : "Error") + "] Input: " + JSON.stringify(testcase) + " | Output: " + JSON.stringify(op) + " | Expected: " + JSON.stringify(testcaseAnswers[index]));
    console.log("------------");
});

function isSame(actual, expected, isOrderSpecific) {
    if (typeof(actual) != typeof(expected))
        return false;
    switch (typeof(expected)) {
        case "object":
            {
                if (Array.isArray(expected)) {
                    if (expected.length != actual.length)
                        return false;
                    if (expected.length == 0)
                        return actual.length == 0;
                    if (isOrderSpecific) {
                        for (var i = 0; i < expected.length; ++i) {
                            if (!isSame(expected[i], actual[i]))
                                return false;
                            return true;
                        }
                    } else
                        return checkAllItems(expected, actual, []) >= 0;
                }
                break;
            }
        default:
            return actual === expected;
    }
}


function checkAllItems(expected, actual, ignore) {
    //needs to be fixed
    if (expected == "")
        return 0;

    var idx = find(expected[0], actual, ignore);
    if (idx < 0) {
        return -1;
    }
    ignore.push(idx);
    ignore = Array.from(new Set(ignore));
    ignore.sort((a, b) => { return b - a; })
    return checkAllItems(expected.slice(1), actual, ignore);
}


function find(target, actual, ignore) {
    ignore.map(x => actual.slice(x));
    if (typeof(target) != "object")
        return actual.indexOf(target);
    else {
        for (var i = 0; i < actual.length; ++i) {
            var result = checkAllItems(target, actual[i], ignore);
            if (result >= 0)
                return i;
        }
    }
    return -1;
}
/*__________________________________________________________________________________________________________________*/