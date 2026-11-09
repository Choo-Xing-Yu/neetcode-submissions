class Solution {
    /**
     * @param {character[][]} board
     * @return {boolean}
     */
    isValidSudoku(board: string[][]): boolean {
        const validRows = new Set<number>();
        const validCols = new Set<number>();
        const validSubboxes = new Set<number>();
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[0].length; col++) {
                if (!validRows.has(row)) {
                    const validRow = this.isValidRow(board, row);
                    if (!validRow) return false;
                    validRows.add(row);
                }
                if (!validCols.has(col)) {
                    const validCol = this.isValidCol(board, col);
                    if (!validCol) return false;
                    validCols.add(col);
                }
                const subboxId = this.toSubboxId(row, col);
                if (!validSubboxes.has(subboxId)) {
                    const validSubbox = this.isValidSubbox(board, subboxId);
                    if (!validSubbox) return false;
                    validSubboxes.add(subboxId);
                }
            }
        }
        return true;
    }

    isValidRow(board: string[][], rowNum: number): boolean {
        const s = new Set();
        for (let i = 0; i < board[rowNum].length; i++) {
            const val = board[rowNum][i];
            if (val === '.') continue;
            if (s.has(val)) return false;
            s.add(val);
        }
        return true;
    }

    isValidCol(board: string[][], colNum: number): boolean {
        const s = new Set();
        for (let i = 0; i < board.length; i++) {
            const val = board[i][colNum];
            if (val === '.') continue;
            if (s.has(val)) return false;
            s.add(val);
        }
        return true;
    }

    isValidSubbox(board: string[][], subboxId: number): boolean {
        const s = new Set<string>();
        const startRow = Math.floor((subboxId - 1) / 3) * 3;
        const startCol = ((subboxId - 1) % 3) * 3;

        for (let r = startRow; r < startRow + 3; r++) {
            for (let c = startCol; c < startCol + 3; c++) {
                const val = board[r][c];
                if (val === '.') continue;
                if (s.has(val)) return false;
                s.add(val);
            }
        }
        return true;
    }

    toSubboxId(rowNum: number, colNum: number) {
        return Math.floor(rowNum / 3) * 3 + Math.floor(colNum / 3) + 1;
    }
}
