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
     * @return {number}
     */
    goodNodes(root: TreeNode | null): number {
        return this.dfs(root);
    }

    dfs(root: TreeNode | null, biggestValInPath: number = -101): number {
        if (root === null) return 0;
        const isBigger = root.val >= biggestValInPath;
        return (
            (isBigger ? 1 : 0) +
            this.dfs(root.right, Math.max(root.val, biggestValInPath)) +
            this.dfs(root.left, Math.max(root.val, biggestValInPath))
        );
    }
}
