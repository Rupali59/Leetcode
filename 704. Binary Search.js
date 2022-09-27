/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
        return bsearch(nums, target, 0, nums.length);
};

var bsearch = function(nums, target, start, end){
    if(start == end)
        return target == nums[start]? start : -1;
    if(start+1 == end){
        if(target == nums[start])
            return start;
        if(target == nums[end])
            return end;
        return -1;
    }
    var centre = Math.ceil((start+end)/2);
    if(target == nums[centre])
        return centre;
    if(target<nums[centre])
        return bsearch(nums, target, start, centre);
    if(target> nums[centre])
        return bsearch(nums, target, centre, end);
}