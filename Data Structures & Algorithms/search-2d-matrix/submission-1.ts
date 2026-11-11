class Solution {
    /**
     * @param {number[][]} matrix
     * @param {number} target
     * @return {boolean}
     */
    searchMatrix(matrix: number[][], target: number): boolean {
        return matrix.flat().includes(target);
    }

    bs(arr: number[], target: number, start: number, end: number): boolean {
        if (start > end) return false;
        const mid = Math.floor((start + end) / 2);
        return arr[mid] === target
            || this.bs(arr, target, start, end - 1)
            || this.bs(arr, target, mid + 1, end);
    }
}
