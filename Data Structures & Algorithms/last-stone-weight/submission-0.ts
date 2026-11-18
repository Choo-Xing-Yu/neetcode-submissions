type Comparator<T> = (a: T, b: T) => number;

class Heap<T> {
  items: T[];
  comparator: Comparator<T>;

  constructor(list: T[] | null | undefined, comparator: Comparator<T>) {
    this.items = list ? [...list] : [];
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
      const r = this.rightChild(curIdx);

      if (r <= lastIndex && this.comparator(items[i], items[r]) > 0) {
        i = r;
      }

      if (this.comparator(items[i], items[curIdx]) >= 0) {
        break;
      }

      this.exchange(curIdx, i);
      curIdx = i;
    }
  }

  moveUp(curIdx: number): void {
    while (curIdx > 0) {
      let parent = this.parent(curIdx);
      if (this.comparator(this.items[curIdx], this.items[parent]) >= 0) break;
      this.exchange(parent, curIdx);
      curIdx = parent;
    }
  }

  offer(value: T): void {
    this.items.push(value);
    this.moveUp(this.size() - 1);
  }

  poll(): T | null {
    if (this.size() === 0) return null;

    const item = this.items[0];
    const last = this.items.pop()!;

    if (this.size() > 0) {
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

  peek(): T | null {
    return this.size() === 0 ? null : this.items[0];
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
     * @param {number[]} stones
     * @return {number}
     */
    lastStoneWeight(stones: number[]): number {
        const maxHeap = new Heap<number>(stones, (x, y) => y - x);
        while (!maxHeap.isEmpty()) {
            const x1 = maxHeap.poll();
            if (maxHeap.isEmpty()) return x1;
            const x2 = maxHeap.poll();
            maxHeap.offer(Math.abs(x1 - x2));
        }
        return 0;
    }
}
