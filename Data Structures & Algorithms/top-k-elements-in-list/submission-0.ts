class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    topKFrequent(nums: number[], k: number): number[] {
        // <val, freq>
        const m = nums.reduce((acc, cur) => {
            if (!acc[cur]) acc[cur] = 0;
            acc[cur]++;
            return acc;
        }, {});

        const arr = [];
        for (const [val, freq] of Object.entries(m)) {
            arr.push([val, freq]);
        }

        arr.sort((x, y) => y[1] - x[1]);

        const ans = [];
        for (let i = 0; i < k; i++) {
            ans.push(arr[i][0]);
        }
        return ans;
    }
}
