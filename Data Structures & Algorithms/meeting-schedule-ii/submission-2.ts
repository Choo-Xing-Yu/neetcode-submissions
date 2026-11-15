/**
 * Definition of Interval:
 * class Interval  {
 *   constructor(start, end) {
 *     this.start = start;
 *     this.end = end;
 *   }
 * }
 */

type Comparator<T> = (a: T, b: T) => number;

class Heap<T> {
    items: T[];
    comparator: Comparator<T>;

    constructor(list: T[], comparator: Comparator<T>) {
        this.items = list || [];
        this.comparator = comparator;
        this.buildHeap();
    }

    buildHeap(): void {
        for (let i = Math.floor(this.size() / 2) - 1; i >= 0; i--) {
            this.moveDown(i);
        }
    }

    moveDown(curIdx: number): void {
        const lastIndex = this.size() - 1;
        const items = this.items;
        while (this.leftChild(curIdx) <= lastIndex) {
            let i = this.leftChild(curIdx);

            // if i is not the last element -> compare i with i+1
            // if i was the last element, i+1 would give us index out of bound!
            if (i < lastIndex && this.comparator(items[i], items[i + 1]) > 0) {
                i++;
            }

            if (this.comparator(items[i], items[curIdx]) > 0) {
                break;
            }

            this.exchange(curIdx, i);
            curIdx = i;
        }
    }

    moveUp(curIdx: number): void {
        while (curIdx > 0) {
            let parent = this.parent(curIdx);
            if (this.comparator(this.items[curIdx], this.items[parent]) > 0) break;
            this.exchange(parent, curIdx);
            curIdx = parent;
        }
    }

    offer(value: T) {
        this.items.push(value);
        this.moveUp(this.size() - 1);
    }

    poll(): T | null {
        if (this.size() === 0) return null;

        const item = this.items[0];
        const last = this.items.pop();

        if (this.size() && last) {
            this.items[0] = last;
            this.moveDown(0);
        }

        return item;
    }

    leftChild(parent: number): number {
        return 2 * parent + 1;
    }

    rightChild(parent: number): number {
        return 2 * parent + 2;
    }

    parent(child: number): number {
        return Math.floor((child - 1) / 2);
    }

    peek(): T {
        return this.items[0];
    }

    size(): number {
        return this.items.length;
    }

    isEmpty(): boolean {
        return this.size() === 0;
    }

    exchange(i: number, j: number): void {
        let temp = this.items[i];
        this.items[i] = this.items[j];
        this.items[j] = temp;
    }
}

class Solution {
    /**
     * @param {Interval[]} intervals
     * @returns {number}
     */
    minMeetingRooms(intervals: Interval[]): number {
        if (intervals.length === 0) return 0;
        const minHeapEndTime = new Heap<number>([], (x, y) => x - y);
        const sorted = intervals.sort((x, y) => x.start - y.start);
        let roomCount = 0;
        sorted.forEach(({ start, end }, i) => {
            if (minHeapEndTime.isEmpty()) {
                minHeapEndTime.offer(end);
                roomCount++;
                return;
            }
            minHeapEndTime.offer(end);
            const canReuse = start >= minHeapEndTime.peek();
            if (canReuse) {
                minHeapEndTime.poll();
            } else {
                roomCount++;
            }
        });
        return roomCount;
    }
}
