class Solution {
    /**
     * @param {number} numCourses
     * @param {number[][]} prerequisites
     * @return {boolean}
     */
    canFinish(numCourses: number, prerequisites: number[][]): boolean {
        if (prerequisites.length === 0) return true;
        if (numCourses === 0) return true;
        // build adjList first
        const adjList: Record<number, Set<number>> = prerequisites.reduce(
            (acc, cur) => {
                const [dest, src] = cur;
                if (!acc[src]) acc[src] = new Set();
                acc[src].add(dest);
                return acc;
            },
            {} as Record<number, Set<number>>,
        );

        const visiting = new Set<number>();
        for (let i = 0; i < numCourses; i++) {
            if (this.hasCycle(adjList, i, visiting)) return false;
        }
        return true;
    }

    hasCycle(
        adjList: Record<number, Set<number>>,
        node: number,
        visiting: Set<number> = new Set(),
    ): boolean {
        if (visiting.has(node)) return true;
        visiting.add(node);
        for (const child of adjList[node] || []) {
            if (this.hasCycle(adjList, child, visiting)) return true;
        }
        adjList[node]?.clear();
        visiting.delete(node);
        return false;
    }
}
