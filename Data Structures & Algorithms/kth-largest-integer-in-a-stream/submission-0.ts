class KthLargest {

    nums: number[]
    k: number;
    /**
     * @param {number} k
     * @param {number[]} nums
     */
    constructor(k: number, nums: number[]) {
        this.k = k;
        this.nums = nums;
    }

    /**
     * @param {number} val
     * @return {number}
     */
    add(val: number): number {
        this.nums.push(val);
        this.nums.sort((x, y) => x - y);
        return this.nums[this.nums.length - this.k];
    }
}
