/**
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val = 0, next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */

class Solution {
    /**
     * @param {ListNode} head
     * @return {boolean}
     */
    hasCycle(head: ListNode | null): boolean {
        return this.dfs(head);
    }

    dfs(head: ListNode | null, s: Set<number> = new Set(), index: number = 0, m: Map<ListNode, number> = new Map()): boolean {
        if (head === null) return false;
        let i = index;
        if (m.has(head)) {
            i = m.get(head);
        } else {
            m.set(head, i);
        }
        if (s.has(i)) return true;
        s.add(i);
        return this.dfs(head.next, s, i + 1, m);
    }
}
