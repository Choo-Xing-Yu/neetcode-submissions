class Solution {
    /**
     * @param {number} numCourses
     * @param {number[][]} prerequisites
     * @return {number[]}
     */
    findOrder(numCourses: number, prerequisites: number[][]): number[] {
        return this.khan(numCourses, prerequisites);
    }
    
    toAdjList(numCourses: number, prerequisites: number[][]) {
        const adjList = prerequisites.reduce(
            (acc, cur) => {
                const [dest, src] = cur;
                if (!acc[src]) acc[src] = new Set();
                acc[src].add(dest);
                return acc;
            },
            {} as Record<number, Set<number>>,
        );

        for (let i = 0; i < numCourses; i++) {
            if (!adjList[i]) adjList[i] = new Set();
        }
        return adjList;
    }

    khan(numCourses: number, prerequisites: number[][]): number[] {
        const adjList = this.toAdjList(numCourses, prerequisites);
        const inorder = new Array(numCourses).fill(0);
        for (const [dest, _] of prerequisites) {
            inorder[dest]++;
        }
        const order: number[] = [];
        const queue: number[] = [];
        for (let i = 0; i < inorder.length; i++) {
            if (inorder[i] === 0) queue.push(i);
        }

        while (queue.length > 0) {
            const cur = queue.shift();
            order.push(cur);
            const children = adjList[cur];
            for (const child of children) {
                inorder[child]--;
                if (inorder[child] === 0) queue.push(child);
            }
        }

        return order.length === numCourses ? order : [];
    }
}
