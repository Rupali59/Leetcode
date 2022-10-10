/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */

var coinChange = function(coins, amount) {
    var DP = new Array(amount + 1).fill(0);
    DP[0] = 0;

    // var result = coinChangeBruteForce(coins, amount, 0);
    var result = coinChangeDP(coins, amount, DP);
    // console.table(DP);
    return result == Infinity ? -1 : result;
}

/*  Brute Force
    minimize ∑x[i] i:0->coins.length 
    such that ∑x[i].coins[i] = S
    Use backtracking to check which combination {x[0],x[1], x[2] ...  x[coins.length]} = S
    Max frequency x[i] = S//coins[i];
*/
var coinChangeBruteForce = function(coins, amount, idx) {
    // console.log({ idx: idx, amount: amount });
    if (amount == 0)
        return 0;
    if (idx < coins.length && amount > 0) {
        var minCost = Infinity;
        var selectedIdxMax = Math.floor(amount / coins[idx]);
        for (var i = 0; i <= selectedIdxMax; ++i) {
            result = coinChangeBruteForce(coins, amount - (coins[idx] * i), idx + 1);
            if (result > -1) {
                minCost = Math.min(result + i, minCost);
                // console.table({ i: i, idx: idx, amount: amount, minCost: minCost, current: result + i });
            }
        }
        return minCost != Infinity ? minCost : -1;
    } else {
        return -1;
    }
}


/*  Dynamic Programming
    Let n = coins.length
    F[S] = min(F[S-coins[i]]+1), i:0->n if S-coins[i]>=0
    F[S] = 0, when S=0
    F[S] = -1, when S-coins[i] ∀i <0
*/
var coinChangeDP = function(coins, S, F) {
    // console.log({ S, coins });
    if (S < 0)
        return -1;
    if (S == 0)
        return 0;
    if (F[S] != 0)
        return F[S];
    var minCoins = Infinity;
    coins.map(coin => {
        if (S >= coin) {
            // console.table({ coin, F, remaining: (S - coin) })
            var result = coinChangeDP(coins, S - coin, F);
            if (result >= 0)
                minCoins = Math.min(minCoins, result+1);
            // console.table({ minCoins, coin, F, remaining: (S - coin), result })
        }
    });
    F[S] = (minCoins == Infinity) ? -1 : minCoins;
    // console.table({ S, F, coins, minCoins});
    return minCoins;
}

/*__________________________________________________________________________________________________________________*/
var testcases = [
    // { coins: [1, 2, 5], amount: 11, result: 3 },
    // { coins: [2], amount: 3, result: -1 },
    // { coins: [1], amount: 0, result: 0 },
    { coins: [186, 419, 83, 408], amount: 6249, result: 20 }
]

testcases.map((testcase, index) => {
    /***************************/
    var output = coinChange(testcase.coins, testcase.amount);
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
        console.log("[" + (status ? "Success" : "Error") + "] Input: " + JSON.stringify(input).slice(0,100) + " | Output: " + JSON.stringify(output) + " | Expected: " + JSON.stringify(testcase.result));
        console.log("------------");
    }
})
/*__________________________________________________________________________________________________________________*/