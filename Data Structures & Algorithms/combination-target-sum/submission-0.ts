class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @returns {number[][]}
     */
    combinationSum(nums: number[], target: number): number[][] {
        return this.dfs(nums, 0, target);
    }

    dfs(nums: number[], i: number, target: number, curset: number[] = [], cursum: number = 0, res: number[][] = []): number[][] {
        if (target === cursum) {
            res.push([...curset])
            return res;
        }
        if (i >= nums.length || cursum > target) return res;
        curset.push(nums[i]);
        this.dfs(nums, i, target, curset, cursum + nums[i], res);
        curset.pop();
        this.dfs(nums, i + 1, target, curset, cursum, res);
        return res;
    }
}
