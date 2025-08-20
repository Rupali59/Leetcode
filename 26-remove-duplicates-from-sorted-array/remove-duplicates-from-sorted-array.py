class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        numsLength = len(nums)
        if numsLength < 2:
            return numsLength

        i = numsLength - 1
        while i >= 0 and numsLength > 1:
            if nums[i] == nums[i - 1]:
                nums.pop(i)
                numsLength -= 1
            i -= 1
        return numsLength
