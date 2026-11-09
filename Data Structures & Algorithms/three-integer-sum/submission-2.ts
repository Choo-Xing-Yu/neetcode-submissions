class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    threeSum(nums: number[]): number[][] {
        const ans = [];
        const sorted = nums.sort((a, b) => a - b);
        for (let i = 0; i < sorted.length - 2; i ++) {
            if (i > 0 && nums[i] === nums[i - 1]) continue;
            const num = sorted[i];
            let left = i + 1;
            let right = sorted.length - 1;
            while (left < right) {
                const sum = num + nums[left] + nums[right];
                const isCandidate = sum === 0;
                if (isCandidate) {
                    const arr = [num, nums[left], nums[right]];
                    ans.push(arr);

                    while (nums[left] === nums[left + 1]) left++;
                    while (nums[right] === nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }

        return ans;
    }

}
