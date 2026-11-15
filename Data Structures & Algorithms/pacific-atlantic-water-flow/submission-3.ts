class Solution {
    /**
     * @param {number[][]} heights
     * @return {number[][]}
     */
    pacificAtlantic(heights: number[][]): number[][] {
        const directions = ["u", "d", "l", "r"] as const;
        const PACIFIC_OCEAN_KEY = "p" as const;
        const ALANTIC_OCEAN_KEY = "a" as const;
        const OCEANS = [PACIFIC_OCEAN_KEY, ALANTIC_OCEAN_KEY] as const;
        // key and value are coordinates
        // special key 'p' and 'a' will represent corresponding oceans
        const adj = new Map<string, Set<string>>();
        // construct the adj first
        // node = coordinates
        // edges = canFlow
        for (let i = 0; i < heights.length; i++) {
            const row = heights[i];
            for (let j = 0; j < row.length; j++) {
                const isFirstRow = i === 0;
                const isFirstCol = j === 0;
                const isLastRow = i === heights.length - 1;
                const isLastCol = j === row.length - 1;
                const key = [i, j].map(String).join(",");
                if (!adj.has(key)) adj.set(key, new Set());
                const children = adj.get(key);
                // ============ handle ocean pathing ============
                if (isFirstRow || isFirstCol) {
                    // all first row and first col can goto pacific ocean
                    children.add(PACIFIC_OCEAN_KEY);
                    // if last col or last row, also can go alantic
                    if (isLastRow || isLastCol) {
                        children.add(ALANTIC_OCEAN_KEY);
                    }
                }
                if (isLastRow || isLastCol) {
                    // all last row and last col can goto alantic
                    children.add(ALANTIC_OCEAN_KEY);
                }
                // ============ handle ocean pathing ============

                // ============ handle adj cell flow ============
                directions.forEach((dir) => {
                    if (this.canFlow(heights, dir, i, j)) {
                        const targetI = dir === "u" ? i - 1 : dir === "d" ? i + 1 : i;
                        const targetj = dir === "l" ? j - 1 : dir === "r" ? j + 1 : j;
                        const targetKey = [targetI, targetj].map(String).join(",");
                        children.add(targetKey);
                    }
                });

                // ============ handle adj cell flow ============
            }
        }
        const ans = [];
        for (let i = 0; i < heights.length; i++) {
            for (let j = 0; j < heights[0].length; j++) {
                const key = [i, j].join(",");
                if (
                    OCEANS.map((ocean) => this.canFlowToOcean(adj, key, ocean)).reduce(
                        (acc, cur) => acc && cur,
                        true,
                    )
                ) {
                    ans.push([i, j]);
                }
            }
        }
        return ans;
    }

    canFlowToOcean(
        adj: Map<string, Set<string>>,
        key: string,
        ocean: "a" | "p",
        visiting: Set<string> = new Set(),
        visited: Set<string> = new Set(),
    ): boolean {
        if (visited.has(key)) return true;
        if (visiting.has(key)) return false;
        const children = Array.from(adj.get(key) || []);
        visiting.add(key);
        if (children.includes(ocean)) return true; // can go ocean
        const res = children.some((child) =>
            this.canFlowToOcean(adj, child, ocean, visiting, visited),
        );
        if (res) visited.add(key);
        return res;
    }

    canFlow(heights: number[][], dir: "u" | "d" | "l" | "r", i: number, j: number): boolean {
        // handle ocean case, already previously handled
        if (i === 0 && dir === "u") return false;
        if (j === 0 && dir === "l") return false;
        if (i === heights.length - 1 && dir === "d") return false;
        if (j === heights.length - 1 && dir === "r") return false;
        const targetI = dir === "u" ? i - 1 : dir === "d" ? i + 1 : i;
        const targetj = dir === "l" ? j - 1 : dir === "r" ? j + 1 : j;
        const target = heights[targetI][targetj];
        const cell = heights[i][j];
        return target <= cell;
    }
}
