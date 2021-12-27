// normal quizengine
import { ref } from 'vue'
import loadlists from './loadlists'
import library from './library'
import backforth from './backforth'

const quizengine = () => {
    // import mergelist, wordlist
    const { mergelist, wordlist } = loadlists()

    // import library
    const { regression, r_regression, compare_obj, reset } = library()

    // import backforth
    const {
        pastSet,
        forwardSet,
        updatepastSet,
        updateforwardSet,
        back,
        forward } = backforth()

    // set chosen, max_chosen
    const chosen = ref([])
    const max_chosen = ref(Number)
    const ppChoice = (data, set) => {
        if (data.action === 'push') {
          // toggle isChoice/isChosen
          set[data.choice.row][data.choice.col].isChosen = true
          set[data.choice.row][data.choice.col].isChoice = false

          chosen.push(data.choice)

          if (chosen.length == max_chosen) {
              // merge()
              useMerge(this.chosen)
          }
        } else {
          // data.type === 'pop'
          // toggle isChoice/isChosen
          set[data.choice.row][data.choice.col].isChosen = false
          set[data.choice.row][data.choice.col].isChoice = true

          const i = chosen.indexOf(data.choice)
          chosen.splice(i,1)
        }
      }

    // showChoice funcs
    const useshowMerge = (set, row, col) => {
        max_chosen = 2

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
    }

    const useshowWord = (set, row, col) => {
        try {
            max_chosen = 6

            set[row][col+1].isChoice = true
            set[row+1][col].isChoice = true
            set[row+1][col+1].isChoice = true
            set[row+2][col].isChoice = true
            set[row+2][col+1].isChoice = true
          } catch (Error) {
            // WordSpaceError
            return 'WordSpaceError'
          }
    }

    // merge func
    const useMerge = (arr, set) => {
        try {
            if (this.mergelist.valid[arr[0].letter].includes(arr[1].letter)) {
                // update pastset
                set[arr[0].row][Math.min(arr[0].col, arr[1].col)].letter = mergelist.merge[`${arr[0].letter},${arr[1].letter}`]
                set[arr[0].row][Math.max(arr[0].col, arr[1].col)].letter = ''

                // normal-regression()
                regression(set, Math.max(arr[0].col, arr[1].col), arr[0].row)

                // reset()
                reset(set)
            } else {
                // MergeError
                Error('MergeError')
            }
        } catch (error) {
            return error.message
        }
    }

    // word func
    const useWord = (arr, set) => {
        let wordspace = {'0,0':null, '1,0':null, '0,1':null, '1,1':null, '0,2':null, '1,2':null}

        arr.forEach(element => {
            if (element.letter == '') {
                wordspace[`${element.col-arr[0].col},${element.row-arr[0]/row}`] = null
            } else {
                wordspace[`${element.col-arr[0].col},${element.row-arr[0]/row}`] = element.letter
            }
        })

        let index = Object.values(wordlist.value).findIndex(element => compare_obj(element, wordspace))
        try {
            if (index != -1) {
                // update pastset
                updatepastSet(set)

                set[arr[0].row][arr[0].col].letter = Object.keys(wordlist)[index]
                set[arr[0].row][arr[0].col].isWord = true
      
                delete set[arr[0].row][arr[0].col+1]
                delete set[arr[0].row+1][arr[0].col]
                delete set[arr[0].row+1][arr[0].col+1]
                delete set[arr[0].row+2][arr[0].col]
                delete set[arr[0].row+2][arr[0].col+1]
            } else {
                // WordError
                Error('WordError')
            }
        } catch (error) {
            return error.message
        }
    }

    //space func
    const useSpace = (wordspace, set) => {
        try {
            if (wordspace in Object.values(wordlist.value)) {
                // SpaceError
                Error('SpaceError')
            } else {
                // update pastset
                updatepastSet(set)

                for (let coord in wordspace) {
                  let x = parseInt(coord.split(',')[0])
                  let y = parseInt(coord.split(',')[1])
      
                  set[chosen[0].row+y][chosen[0].col+x].letter = ''
                }
            }
        } catch (error) {
            return error.message
        }
    }

    return {
        pastSet,
        forwardSet,
        back,
        forward,
        chosen,
        max_chosen,
        ppChoice,
        useshowMerge,
        useshowWord,
        useMerge,
        useWord,
        useSpace
    }
}

export default quizengine