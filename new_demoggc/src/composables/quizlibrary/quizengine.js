import _ from 'lodash'
import library from './library'
import backforth from './backforth'
import mergelist from '../../assets/loadlists/valid_mergewordlist.json'
import wordlist from '../../assets/loadlists/wordlist.json'

const quizengine = (reverse) => { 
    // import library
    const { regression, compare_obj, reset } = library()

    // import backforth
    const {
        updatepastSet,
        updateforwardSet,
        back,
        forward
    } = backforth()

    // showChoice funcs
    const useshowMerge = (set, row, col) => {
        switch (col) {
            case 0:
                set[row][col+1].isChoice = true
                break
  
            case 14:
                set[row][col-1].isChoice = true
                break
  
            default:
                set[row][col-1].isChoice = true
                set[row][col+1].isChoice = true
        }

        return set
    }

    const useshowWord = (set, row, col) => {
        try {
            set[row][col+1].isChoice = true
            set[row+1][col].isChoice = true
            set[row+1][col+1].isChoice = true
            set[row+2][col].isChoice = true
            set[row+2][col+1].isChoice = true
        } catch (Error) {
            // WordSpaceError
            throw 'WordSpaceError'
        }

        return set
    }

    // merge func
    const useMerge = (arr, set, pastSet) => {
        if (mergelist.valid[arr[0].letter].includes(arr[1].letter)) {
            // update pastset
            updatepastSet(pastSet, reset(set))

            if (reverse) {
                // apply reverse-engine
                set[arr[0].row][Math.max(arr[0].col, arr[1].col)].letter = mergelist.merge[`${arr[0].letter},${arr[1].letter}`]
                set[arr[0].row][Math.min(arr[0].col, arr[1].col)].letter = ''

                // reverse-regression()
                regression(set, Math.min(arr[0].col, arr[1].col), arr[0].row, reverse)
            } else {
                // apply normal-engine
                set[arr[0].row][Math.min(arr[0].col, arr[1].col)].letter = mergelist.merge[`${arr[0].letter},${arr[1].letter}`]
                set[arr[0].row][Math.max(arr[0].col, arr[1].col)].letter = ''

                // normal-regression()
                regression(set, Math.max(arr[0].col, arr[1].col), arr[0].row, reverse)
            }

            // reset()
            reset(set)
        } else {
            // MergeError
            throw Error('MergeError')
        }
        
        return arr, set, pastSet
    }

    // word func
    const useWord = (arr, set, pastSet) => {
        let wordspace = {'0,0':null, '1,0':null, '0,1':null, '1,1':null, '0,2':null, '1,2':null}

        arr.forEach(element => {
            if (element.letter == '') {
                wordspace[`${element.col-arr[0].col},${element.row-arr[0].row}`] = null
            } else {
                wordspace[`${element.col-arr[0].col},${element.row-arr[0].row}`] = element.letter
            }
        })

        const index = Object.values(wordlist).findIndex(element => compare_obj(element, wordspace))
        if (index != -1) {
            // update pastset
            updatepastSet(pastSet, reset(set))

            set[arr[0].row][arr[0].col].letter = Object.keys(wordlist)[index]
            set[arr[0].row][arr[0].col].isWord = true
      
            // delete letter in wordspace
            delete set[arr[0].row][arr[0].col+1]
            delete set[arr[0].row+1][arr[0].col]
            delete set[arr[0].row+1][arr[0].col+1]
            delete set[arr[0].row+2][arr[0].col]
            delete set[arr[0].row+2][arr[0].col+1]
        } else {
            // WordError
            throw Error('WordError')
        }

        return arr, set, pastSet
    }

    //space func
    const useSpace = (wordspace, set, target, pastSet) => {
        if (_.some(Object.values(wordlist), wordspace)) {
            // SpaceError
            throw Error('SpaceError')
        } else {
            // update pastset
            updatepastSet(pastSet, reset(set))

            for (let coord in wordspace) {
                let x = parseInt(coord.split(',')[0])
                let y = parseInt(coord.split(',')[1])
      
                set[target.row+y][target.col+x].letter = ''
            }
        }

        return set, pastSet
    }

    return {
        back,
        forward,
        useshowMerge,
        useshowWord,
        useMerge,
        useWord,
        useSpace
    }
}

export default quizengine