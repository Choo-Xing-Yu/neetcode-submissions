class Solution {
    /**
     * @param {number[][]} matrix
     * @param {number} target
     * @return {boolean}
     */
    searchMatrix(matrix: number[][], target: number): boolean {
        return this.bs(matrix.flat(), target);
    }

    bs(arr: number[], target: number, start: number = 0, end: number = arr.length - 1): boolean {
        if (start > end) return false;
        const mid = Math.floor((start + end) / 2);
        return arr[mid] === target
            || this.bs(arr, target, start, mid - 1)
            || this.bs(arr, target, mid + 1, end);
    }
}
