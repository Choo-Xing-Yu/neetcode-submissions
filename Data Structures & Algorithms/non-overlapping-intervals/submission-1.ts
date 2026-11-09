class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number}
     */
    eraseOverlapIntervals(intervals: number[][]): number {
        const arr = intervals.sort((a, b) => a[1] - b[1]);

        const ans = [arr[0]];
        for (let i = 1; i < arr.length; i++) {
            const [curStart, curEnd] = arr[i];
            const [prevStart, prevEnd] = ans[ans.length - 1];
            const isOverlapping = prevEnd > curStart;
            if (!isOverlapping) {
                ans.push(arr[i]);
            }
        }
        console.log(ans)

        return intervals.length - ans.length;
    }
}
