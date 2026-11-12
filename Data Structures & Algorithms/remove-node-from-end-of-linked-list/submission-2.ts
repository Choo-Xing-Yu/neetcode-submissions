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
     * @param {number} n
     * @return {ListNode}
     */
    removeNthFromEnd(head: ListNode | null, n: number): ListNode {
        return this.removeNthFromStart(head, this.getLength(head) - n);
    }

    removeNthFromStart(head: ListNode | null, n: number): ListNode {
        if (head === null) return head;
        if (n === 0) return head.next;
        head.next = this.removeNthFromStart(head.next, n - 1);
        return head;
    }

    getLength(head:ListNode | null): number {
        if (head === null) return 0;
        return 1 + this.getLength(head.next);
    }
}
