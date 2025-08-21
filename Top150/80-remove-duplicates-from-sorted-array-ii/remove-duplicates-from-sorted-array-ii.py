class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        maxDuplcateElements = 1
        counter = maxDuplcateElements
        i = 0
        j = i + 1
        numsLength = len(nums)
        while j < numsLength and i < j:
            if nums[i] == nums[j]:
                if counter > 0:
                    counter -= 1
                    nums[i + 1], nums[j] = nums[j], nums[i + 1]
                    i += 1
            else:
                if counter == 0:
                    counter = maxDuplcateElements
                nums[i + 1], nums[j] = nums[j], nums[i + 1]
                i += 1
                    
            j += 1
        k = i + 1
        for j in range(numsLength - 1, i, -1):
            nums.pop(j)
        return k
