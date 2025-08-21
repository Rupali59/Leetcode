from collections import Counter


class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        characterCounts = Counter(nums)
        numElements = len(nums)
        for i in characterCounts:
            if characterCounts[i] > (numElements / 2):
                return i
