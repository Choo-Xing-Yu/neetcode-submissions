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
     * @return {number[][]}
     */
    levelOrder(root: TreeNode | null): number[][] {
        const m = new Map<number, number[]>();
        const highestLevel = this.dfs(root, m);
        const ans: number[][] = [];
        for (let i = 1; i <= highestLevel; i++) {
            if (m.has(i)) ans.push(m.get(i));
        }
        return ans;
    }

    // returns highest level seen in m
    dfs(root: TreeNode | null, m: Map<number, number[]>, level: number = 1): number {
        if (root === null) return level;
        if (!m.has(level)) m.set(level, []);
        m.get(level).push(root.val);
        return Math.max(this.dfs(root.left, m, level + 1), this.dfs(root.right, m, level + 1));
    }
}
