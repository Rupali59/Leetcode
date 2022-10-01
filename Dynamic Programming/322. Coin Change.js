/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */

var coinChange = function(coins, amount) {
    return coinChangeBruteForce(coins, amount);
}

function coinChangeBruteForce(coins, amount) {
    coins.sort((a, b) => { return b - a });
    console.log(coins);
    var coinChangeTable = new Array(amount).fill(Infinity);
    coins.map(x => coinChangeTable[x] = 1);
    coinChangeTable[0] = -1;
    CCBF(coins, amount, coinChangeTable);
    return coinChangeTable ? coinVal : -1;
}

function CCBF(coins, amount, coinChangeTable) {
    if (isFinite(coinChangeTable[amount]))
        return coinChangeTable[amount];
    console.log(amount);
    console.table(coinChangeTable);
    var minCount = Infinity;
    coins.map(x => {
        if (x <= amount)
            minCount = Math.min(minCount, CCBF(coins, amount - x, coinChangeTable) + 1);
    });
    coinChangeTable[amount] = minCount;
    return coinChangeTable[amount];
}


/*__________________________________________________________________________________________________________________*/
var testcases = [
    // { coins: [1, 2, 5], amount: 11 },
    { coins: [2], amount: 3 },
    // { coins: [1], amount: 0 },
    // { coins: [186, 419, 83, 408], amount: 6249 }
]
var testcaseAnswers = [
    3, -1, 0, 19
];


testcases.map((testcase, index) => {
    /***************************/
    var op = coinChange(testcase.coins, testcase.amount);
    /***************************/
    status = true;
    showErrorOnly = true;
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
    if ((showErrorOnly && !status) || !showErrorOnly) {
        console.log("------------");
        console.log("[" + (status ? "Success" : "Error") + "] Input: " + JSON.stringify(testcase) + " | Output: " + JSON.stringify(op) + " | Expected: " + JSON.stringify(testcaseAnswers[index]));
        console.log("------------");
    }
})
/*__________________________________________________________________________________________________________________*/