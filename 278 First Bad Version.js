/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        return bsearch(1, n);
    };

    function bsearch(start, end) {
        if (start == end)
            return end;
        if (start + 1 == end) {
            if (bsearch(start))
                return start;
            return end;

        }
        var centre = Math.ceil((start + end) / 2);
        if (isBadVersion(centre))
            return bsearch(start, centre);
        else
            return bsearch(centre + 1, end);


    }
};