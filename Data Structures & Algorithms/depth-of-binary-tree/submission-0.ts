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
    maxDepth(root: TreeNode | null): number {
        return this.dfs(root);
    }

    dfs(root: TreeNode | null, depth: number = 0): number {
        if (root === null) return depth;
        return Math.max(this.dfs(root.left, depth + 1), this.dfs(root.right, depth + 1));
    }
}
