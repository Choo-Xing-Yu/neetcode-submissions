class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    maxArea(heights: number[]): number {
        let left = 0;
        let right = heights.length - 1;
        let ans = 0;

        while (left < right) {
            const l = heights[left];
            const r = heights[right];
            const base = right - left;
            const vol = base * Math.min(l, r);
            ans = Math.max(ans, vol);
            if (l > r) {
                // keep left
                right--;
            } else {
                left++;
            }
        }

        return ans;
    }
}
