/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     constructor(val = 0, left = null, right = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */

class Solution {
    /**
     * @param {TreeNode} root
     * @return {number[]}
     */
    rightSideView(root: TreeNode | null): number[] {
        // idea is to construct level-order sorted
        // and get the right most val
        const sorted: number[][] = [];
        this.levelOrderSorted(root, 0, sorted);

        return sorted.reduce((acc, cur) => {
            acc.push(cur[cur.length - 1])
            return acc;
        }, [] as number[])
    }

    levelOrderSorted(root: TreeNode | null, level: number, ans: number[][]): void {
        if (root === null) return;
        if (!ans[level]) ans.push([]);
        ans[level].push(root.val);
        this.levelOrderSorted(root.left, level + 1, ans);
        this.levelOrderSorted(root.right, level + 1, ans);
    }
}
