class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    threeSum(nums: number[]): number[][] {
        const dedupSet = new Set<string>();
        const ans = [];
        const sorted = nums.sort((a, b) => a - b);
        for (let i = 0; i < sorted.length - 2; i ++) {
            const num = sorted[i];
            let left = i + 1;
            let right = sorted.length - 1;
            while (left < right) {
                const sum = num + nums[left] + nums[right];
                const isCandidate = sum === 0;
                const arr = [num, nums[left], nums[right]];
                const hashKey = JSON.stringify(arr.sort((x, y) => x - y));
                if (!dedupSet.has(hashKey) && isCandidate) {
                    ans.push(arr);
                    dedupSet.add(hashKey);
                }
                if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }

        return ans;
    }

}
