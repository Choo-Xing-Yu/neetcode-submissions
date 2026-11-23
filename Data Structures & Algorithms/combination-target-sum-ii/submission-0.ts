class Solution {
    /**
     * @param {number[]} candidates
     * @param {number} target
     * @return {number[][]}
     */
    combinationSum2(candidates: number[], target: number): number[][] {
        return this.dfs(candidates.sort((x, y) => x - y), target);
    }

    dfs(nums: number[], target: number, i: number = 0, cursum: number = 0, curset: number[] = [], res: number[][] = []): number[][] {
        if (cursum === target) {
            res.push([...curset]);
            return res;
        }

        if (cursum > target) return res;
        if (i >= nums.length) return res;


        const val = nums[i];
        curset.push(val);
        // either i pick or dont pick
        // case1: i pick and move on
        this.dfs(nums, target, i + 1, cursum + val, curset, res);
        curset.pop();

        while (i < nums.length - 1 && nums[i] === nums[i + 1]) {
            // skip duplicates
            i++;
        }
        // case2: i dont pick
        this.dfs(nums, target, i + 1, cursum, curset, res);
        return res;
    }
}
