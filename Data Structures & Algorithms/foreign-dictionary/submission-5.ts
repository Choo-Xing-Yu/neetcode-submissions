class Solution {
    /**
     * @param {string[]} words
     * @returns {string}
     */
    foreignDictionary(words: string[]): string {
        if (words.length === 0) return "";
        // words are already in sorted order
        // so we need to decide dictionary ordering
        // we construct the DAG graph to get topo sort order
        // answer is just toposorted
        // directed edge here means parent preceeds child in dictionary order

        const adj = new Map<string, Set<string>>();
        const allChars = new Set<string>();
        for (let i = 0; i < words.length; i++) {
            const s1 = words[i];
            s1.split('').forEach((c) => allChars.add(c))
            for (let j = i + 1; j < words.length; j++) {
                const s2 = words[j];
                s2.split('').forEach((c) => allChars.add(c));

                const pos = this.firstUniqueCharPos(s1, s2);
                if (pos === -1) {
                    // since s1 shd've been before s2 due to input constraint
                    // if s1.length > s2.length && they dont have firstUniqueCharPos
                    // means s2 is a prefix of s1, which is a contradiction to
                    // a topo sorted order
                    if (s1.length > s2.length) return '';
                    continue;
                }
                const s1c = s1[pos];
                const s2c = s2[pos];
                // this means s1c < s2c
                if (!adj.has(s1c)) adj.set(s1c, new Set());
                adj.get(s1c).add(s2c);
            }
        }

        return this.khan(adj, allChars);
    }

    khan(adj: Map<string, Set<string>>, allChars: Set<string>): string {
        // setup incoming edge count first
        const incoming = new Array(26).fill(0);
        for (const c of allChars) {
            if (!adj.has(c)) continue;
            for (const child of adj.get(c) || []) {
                const index = child.charCodeAt(0) - 'a'.charCodeAt(0);
                incoming[index]++;
            }
        }

        // then run khan
        const queue: string[] = Array.from(allChars).filter(
            (c) => incoming[c.charCodeAt(0) - "a".charCodeAt(0)] === 0,
        );
        const order: string[] = [];
        while (queue.length > 0) {
            const char = queue.pop();
            order.push(char);

            // update incoming first;
            const children = Array.from(adj.get(char) || []);
            for (const child of children) {
                const index = child.charCodeAt(0) - 'a'.charCodeAt(0);
                if (--incoming[index] === 0) queue.push(child);
            }
        }


        return order.length !== allChars.size ? "" : order.join("");
    }

    firstUniqueCharPos(s1: string, s2: string) {
        for (let i = 0; i < Math.min(s1.length, s2.length); i++) {
            if (s1[i] !== s2[i]) return i;
        }

        // means either s1 or s2 is prefix of the other
        // 'aaa' and 'aaaa'
        return -1;
    }
}
