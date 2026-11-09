class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    twoSum(nums: number[], target: number): number[] {
        // value to index
        const m = new Map<number, number>();

        for (let i = 0; i < nums.length; i++) {
            const val = nums[i];
            const diff = target - val;
            if (m.has(diff)) {
                const otherIdx = m.get(diff);
                return i > otherIdx ? [otherIdx, i] : [i, otherIdx];
            }
            m.set(nums[i], i);
        }
        return []
    }
}
