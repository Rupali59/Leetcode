class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        num_elements = len(nums)
        k %= num_elements
        if(k==0):
            return
        cycles = math.gcd(num_elements, k)
        
        
        for i in range(cycles):
            gcd = math.gcd(i, num_elements)
            start=i
            next_el = (start + k) % num_elements
            while next_el != start:
                nums[start], nums[next_el] = nums[next_el], nums[start]
                next_el = (next_el + k) % num_elements