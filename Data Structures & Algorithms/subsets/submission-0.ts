class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    subsets(nums: number[]): number[][] {
        return this.dfs(0, nums);
    }

    dfs(i: number, nums: number[], res: number[][] = [], curset: number[] = []): number[][] {
        if (i >= nums.length) {
            res.push([...curset]);
            return res;
        }

        curset.push(nums[i]);

        this.dfs(i + 1, nums, res, curset);

        curset.pop();

        this.dfs(i + 1, nums, res, curset);
        return res;
    }
}
