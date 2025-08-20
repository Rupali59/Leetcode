class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        numsLength = len(nums)
        i = 0
        j = i + 1
        while i < j and j < numsLength:
            if nums[i] != nums[j]:
                i+=1
                nums[i], nums[j] = nums[j], nums[i]
            j += 1
        del nums[i + 1 :]
        return len(nums)
