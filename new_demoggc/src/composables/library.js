const library = () => {
    // regression func
    // used for merge
    const regression = (set, max_col, row) => {
        if (set[row][max_col+1] == undefined||
            set[row][max_col+1].isWord) {
            set[row][max_col].letter = ''
        } else {
            set[row][max_col].letter = set[row][max_col+1].letter
            regression(set, max_col+1, row, reverse = false)
        }   
    }

    // reverse-regression func
    // used for merge
    const r_regression = (set, max_col, row) => {
        if (set[row][max_col-1] == undefined||
            set[row][max_col-1].isWord) {
            set[row][max_col].letter = ''
        } else {
            set[row][max_col].letter = set[row][max_col-1].letter
                r_regression(set, max_col-1, row)
        }
    }

    // compare 2 objects
    // if identical, return true
    // else, return false
    const compare_obj = (a, b) => {
        let n = 0
        let compare = true
        while (compare && n < 6) {
          if (Object.values(a)[n] === Object.values(b)[n]) {
            n = n + 1
          } else {
            compare = false
          }
        }

        return compare
    }

    // reset func
    const reset = (set) => {
        for (let r=0;r<6;r++) {
            for (let c=0;c<15;c++) {
                set[r][c].isTarget = false
                set[r][c].isChoice = false
                set[r][c].isChosen = false
            }
        }
    }

    return { regression, r_regression, compare_obj, reset }
}

export default library