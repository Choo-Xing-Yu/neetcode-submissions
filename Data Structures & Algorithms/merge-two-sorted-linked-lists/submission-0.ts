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
     * @param {ListNode} list1
     * @param {ListNode} list2
     * @return {ListNode}
     */
    mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode {
        if (list1 === null) return list2;
        if (list2 === null) return list1;
        if (list1.val < list2.val) {
            // pick list1
            list1.next = this.mergeTwoLists(list1.next, list2);
            return list1
        }
        // else list2.val smaller
        list2.next = this.mergeTwoLists(list1, list2.next);
        return list2;
    }
}
