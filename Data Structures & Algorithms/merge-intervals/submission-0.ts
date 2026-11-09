class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number[][]}
     */
    merge(intervals: number[][]): number[][] {
        // first multi sort asc
        const sorted = intervals.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
        const ans = [];
        while (sorted.length > 0) {
            // pop first
            const curInterval = sorted.shift();

            if (ans.length === 0) {
                ans.push(curInterval);
                continue;
            }

            const [start, end] = curInterval;
            const latestInterval = ans[ans.length - 1];
            const [latestStart, latestEnd] = latestInterval;
            // check if can merge
            const canMerge = latestEnd >= start;
            if (canMerge) {
                latestInterval[0] = Math.min(start, latestStart);
                latestInterval[1] = Math.max(end, latestEnd);
            } else {
                ans.push(curInterval);
            }
        }

        return ans;
    }
}
