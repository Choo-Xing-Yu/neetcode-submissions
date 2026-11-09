class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isAnagram(s: string, t: string): boolean {
        const sMap = this.toMap(s);

        for (const xt of [...t]) {
            const sCount = sMap.get(xt);
            const newCount = sCount - 1;
            if (newCount === 0) {
                sMap.delete(xt);
            } else {
                sMap.set(xt, newCount);
            }
        }

        return sMap.size === 0;
    }

    toMap(s: string): Map<string, number> {
        const m = new Map<string, number>();
        for (const xs of [...s]) {
            if (!m.has(xs)) m.set(xs, 0);
            m.set(xs, m.get(xs) + 1);
        }
        return m;
    }
}
