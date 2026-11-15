/**
 * Definition of Interval:
 * class Interval  {
 *   constructor(start, end) {
 *     this.start = start;
 *     this.end = end;
 *   }
 * }
 */

class Solution {
    /**
     * @param {Interval[]} intervals
     * @returns {boolean}
     */
    canAttendMeetings(intervals: Interval[]): boolean {
        return intervals
            .sort((x, y) => x.start - y.start)
            .reduce((acc, cur, i) => {
                if (i === 0) return true;
                const prev = intervals[i - 1];
                return acc && prev.end <= cur.start;
            }, true);
    }
}
