class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    productExceptSelf(nums: number[]): number[] {
        const prefix: number[] = new Array(nums.length).fill(0);
        let prefixProduct = 1;
        for (let i = 0; i < nums.length; i++) {
            prefixProduct *= nums[i];
            prefix[i] = prefixProduct
        }

        const suffix: number[] = new Array(nums.length).fill(0);
        let suffixProduct = 1;
        for (let i = nums.length - 1; i >= 0; i--) {
            suffixProduct *= nums[i];
            suffix[i] = suffixProduct
        }

        console.log(prefix, suffix);
        const ans = [];

        for (let i = 0; i < nums.length; i++) {
            if (i === 0) {
                ans.push(suffix[i + 1]);
            } else if (i === nums.length - 1) {
                ans.push(prefix[i - 1]);
            } else {
                ans.push(prefix[i - 1] * suffix[i + 1]);
            }
        }
        return ans;
    }
}
