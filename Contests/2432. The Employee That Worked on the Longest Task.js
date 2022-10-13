/**
 * @param {number} n
 * @param {number[][]} logs
 * @return {number}
 */
var hardestWorker = function(n, logs) {
    // return hardestWorkerBruteForce(n, logs);
    return hardestWorkerOptimized(n, logs);
};


/*
    Best Case: O(Math.max(n, logs.length))
    Worst Case: 
*/
var hardestWorkerBruteForce = function(n, logs) {
    var timeWorked = new Array(n + 1).fill(0);
    var start = 0;

    for (var i = 0; i < logs.length; ++i) {
        timeWorked[logs[i][0]] = (logs[i][1] - start);
        start = logs[i][1];
    }
    console.table(timeWorked);
    var maxId = 0,
        maxTime = timeWorked[maxId];
    for (var id = 1; id <= n; ++id) {
        if (timeWorked[id] > maxTime && id > maxId) {
            maxId = id;
            maxTime = timeWorked[id];
        }
    }
    return maxId;
};



/*
    Best Case: O(Math.max(n, logs.length))
    Worst Case: 
*/
var hardestWorkerOptimized = function(n, logs) {
    var maxId = logs[0][0],
        maxTime = logs[0][1];
    var start = maxTime;

    for (var i = 1; i < logs.length; ++i) {
        var id = logs[i][0];
        var leaveTime = logs[i][1];
        timeWorked = leaveTime - start;
        start = leaveTime;
        if (timeWorked >= maxTime) {
            maxId = timeWorked == maxTime ? Math.min(id, maxId) : id;
            maxTime = timeWorked;
        }
        // console.log({timeWorked, maxTime, id, maxId});
    }
    return maxId;
};

/*__________________________________________________________________________________________________________________*/
var testcases = [{
        n: 10,
        logs: [
            [0, 3],
            [2, 5],
            [0, 9],
            [1, 15]
        ],
        result: 1
    },
    {
        n: 26,
        logs: [
            [1, 1],
            [3, 7],
            [2, 12],
            [7, 17]
        ],
        result: 3
    },
    {
        n: 2,
        logs: [
            [0, 10],
            [1, 20]
        ],
        result: 0
    },{
        n:70,
        logs:[[36,3],[1,5],[12,8],[25,9],[53,11],[29,12],[52,14]],
        result:12
    }
]

testcases.map((testcase, index) => {
    /***************************/
    var output = hardestWorker(testcase.n, testcase.logs);
    /***************************/
    status = true;
    showErrorOnly = false;
    var expected = testcase.result;
    switch (typeof(expected)) {
        case "object":
            {

                if (Array.isArray(expected)) {
                    expected.map((val, i) => {
                        if (output[i] != val)
                            status = false;
                    });
                }
                break;
            }
        default:
            if (output != expected)
                status = false;
    }

    if ((showErrorOnly && !status) || !showErrorOnly) {

        var inputKeys = Object.keys(testcase);
        inputKeys.splice(inputKeys.indexOf("result"));
        var input = {};
        inputKeys.map(y => { input[y] = testcase[y] });

        console.log("------------");
        console.log("[" + (status ? "Success" : "Error") + "] Input: " + JSON.stringify(input).slice(0, 100) + " | Output: " + JSON.stringify(output) + " | Expected: " + JSON.stringify(testcase.result));
        console.log("------------");
    }
})
/*__________________________________________________________________________________________________________________*/