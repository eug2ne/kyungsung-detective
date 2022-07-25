const library = () => {
    // regression func
    // used for merge
    const regression = (set, max_col, row, reverse) => {
        if (reverse) {
            // reverse-regression
            if (set[row][max_col-1] == undefined||
                set[row][max_col-1].isWord) {
                set[row][max_col].letter = ''
            } else {
                set[row][max_col].letter = set[row][max_col-1].letter
                    regression(set, max_col-1, row, reverse)
            }
        } else {
            // normal-regression
            if (set[row][max_col+1] == undefined||
                set[row][max_col+1].isWord) {
                set[row][max_col].letter = ''
            } else {
                set[row][max_col].letter = set[row][max_col+1].letter
                regression(set, max_col+1, row, reverse)
            }
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
        Object.values(set).forEach((row) => {
            Object.values(row).forEach((col) => {
                if (col.isWord) {
                    // pass
                } else {
                    col.isTarget = false
                    col.isChoice = false
                    col.isChosen = false
                }
            })
        })

        return set
    }

    return { regression, compare_obj, reset }
}

export default library