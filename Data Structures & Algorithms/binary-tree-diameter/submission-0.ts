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
    diameterOfBinaryTree(root: TreeNode | null): number {
        if (root === null) return 0;
        const left = this.dfs(root.left);
        const right = this.dfs(root.right);
        const d = left + right;
        return Math.max(d, this.diameterOfBinaryTree(root.left), this.diameterOfBinaryTree(root.right))
    }

    dfs(root: TreeNode | null, height: number = 0): number {
        if (root === null) return height;
        const leftHeight = this.dfs(root.left, height + 1);
        const rightHeight = this.dfs(root.right, height + 1);
        return Math.max(leftHeight, rightHeight);
    }
}
