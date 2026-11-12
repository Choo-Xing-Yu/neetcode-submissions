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
     * @return {void}
     */
    reorderList(head: ListNode | null): void {
        // collect into arr first
        const arr: ListNode[] = [];
        let start = head;
        while (start !== null) {
            arr.push(start);
            start = start.next;
        }
        const n = arr.length;
        const collectionArray: ListNode[] = []
        let x = 1;
        let t = 0;
        for (let i = 0; i < arr.length; i++) {
            if (i % 2 === 0) {
                collectionArray.push(arr[t]);
                t++;
            } else {
                collectionArray.push(arr[n - x]);
                x++;
            }
        }
        // reorder based on arr
        head = collectionArray[0] || null;
        head.next = collectionArray[1] || null
        for (let i = 1; i < collectionArray.length - 1; i++) {
            collectionArray[i].next = collectionArray[i + 1]
        }
        collectionArray[collectionArray.length - 1].next = null;
    }
}
