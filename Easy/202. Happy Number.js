/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
    return check(n, 1000);
};
var check = function(n, i) {
    if (n == 1)
        return true;
    if (i < 0)
        return false;
    else {
        return check(n.toString().split('').map(Number).reduce((a, b) => a + (b * b), 0), i-1);
    }
};