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
     * @return {boolean}
     */
    isBalanced(root: TreeNode | null): boolean {
        if (root === null) return true;
        const leftHeight = this.getHeight(root.left);
        const rightHeight = this.getHeight(root.right);
        return (Math.abs(leftHeight - rightHeight) <= 1) && this.isBalanced(root.left) && this.isBalanced(root.right)
    }

    getHeight(root: TreeNode | null, height: number = 0) {
        if (root === null) return height;
        return Math.max(this.getHeight(root.left, height + 1), this.getHeight(root.right, height + 1));
    }
}
