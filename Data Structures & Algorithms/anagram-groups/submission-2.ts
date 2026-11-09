class Solution {
    /**
     * @param {string[]} strs
     * @return {string[][]}
     */
    groupAnagrams(strs: string[]): string[][] {
        // <hashKey, Array<s>>
        const m: Record<string, string[]> = {};
        for (const s of strs) {
            const key = this.toHashKey(s);
            if (!m[key]) m[key] = [];
            const arr = m[key];
            arr.push(s);
        }

        const ans: string[][] = [];
        for (const values of Object.values(m)) {
            ans.push(values);
        }

        return ans;
    }

    // idea is 26 char array join into a key
    toHashKey(s: string): string {
        const arr = new Array(26).fill(0);
        for (const xs of [...s]) {
            const i = xs.charCodeAt(0) - 97;
            arr[i]++;
        }
        return arr.map((x) => String(x)).join(',');
    }
}
