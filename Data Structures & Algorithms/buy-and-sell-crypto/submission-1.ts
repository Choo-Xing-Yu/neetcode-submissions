class Solution {
    /**
     * @param {number[]} prices
     * @return {number}
     */
    maxProfit(prices: number[]): number {
        let left = 0;
        let right = left + 1;
        let ans = 0;
        while (right < prices.length) {
            const sellPrice = prices[right];
            const buyPrice = prices[left];
            if (buyPrice < sellPrice) {
                const profit = sellPrice - buyPrice;
                ans = Math.max(ans, profit);
            } else {
                // means sell at loss
                // try set sell price as buy price
                left = right;
            }
            right++;
        }
        return ans;
    }
}
