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
     * @param {TreeNode} p
     * @param {TreeNode} q
     * @return {TreeNode}
     */
    lowestCommonAncestor(
        root: TreeNode | null,
        p: TreeNode | null,
        q: TreeNode | null,
    ) {
        const pPath = this.getPathToTarget(root, p);
        const qPath = this.getPathToTarget(root, q);
        const shorter = pPath.length < qPath.length ? pPath : qPath;
        const longer = pPath.length >= qPath.length ? pPath : qPath;

        for (let i = shorter.length - 1; i >= 0; i--) {
            for (let j = longer.length - 1; j >= 0; j--) {
                const s = shorter[i];
                const l = longer[j];
                if (s === l) return s;
            }
        }

        return p; // wont happen
    }

    getPathToTarget(root: TreeNode | null, target: TreeNode | null, path: Array<TreeNode> = []): Array<TreeNode> {
        if (root === null || target === null) return path;
        path.push(root);
        if (root === target) return path;
        // root !== target
        const left = this.getPathToTarget(root.left, target, [...path]);
        const right = this.getPathToTarget(root.right, target, [...path]);
        return left.includes(target) ? left : right;
    }
}
