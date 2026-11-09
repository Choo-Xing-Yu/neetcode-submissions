class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    longestConsecutive(nums: number[]): number {
        const s = new Set(nums);
        const seqStarts = [];
        let ans = 0;
        for (const num of nums) {
            if (!s.has(num - 1)) seqStarts.push(num);
        }
        for (let start of seqStarts) {
            let curLength = 1;
            while (s.has(start + 1)) {
                curLength++;
                start++;
            }
            ans = Math.max(ans, curLength);
        }
        return ans;
    }
}
