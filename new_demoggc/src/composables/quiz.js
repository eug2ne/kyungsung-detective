import { ref } from 'vue'
import _ from 'lodash'
import quizengine from "./quizlibrary/quizengine"

const quizletterset = ref({})
const chosen = ref([])
const reverse = ref()
const backset = ref([])
const forwardset = ref([])
const target = ref({})

// import event, data
// >> update db
// >> return quizletterset
const quiz = (data, instance) => {
    quizletterset.value = instance.quizletterset
    chosen.value = instance.chosen
    reverse.value = instance.reverse
    backset.value = instance.backset
    forwardset.value = instance.forwardset

    // import quizengine
    const {
        back,
        forward,
        useshowMerge,
        useshowWord,
        useMerge,
        useWord,
        useSpace
    } = quizengine(reverse.value)

    switch (data.event) {
        case 'toggleTarget':
            console.log('toggleTarget')
            quizletterset.value[data.row][data.col].isTarget = !quizletterset.value[data.row][data.col].isTarget

            if (quizletterset.value[data.row][data.col].isTarget) {
                chosen.value.length = 0
                chosen.value.push({'row': data.row, 'col': data.col, 'letter': data.letter})

                // reset any other target in set
                if (instance.id) {
                    // Rules page
                    for (let r=0;r<3;r++) {
                        for (let c=0;c<6;c++) {
                            if (!quizletterset.value[r][c]||quizletterset.value[r][c].isWord||(r==data.row&&c==data.col)) {
                                // pass
                            } else {
                                quizletterset.value[r][c].isTarget = false
                                quizletterset.value[r][c].isChoice = false
                                quizletterset.value[r][c].isChosen = false
                            }
                        }
                    }
                } else {
                    // Quiz page
                    for (let r=0;r<6;r++) {
                        for (let c=0;c<15;c++) {
                            if (!quizletterset.value[r][c]||quizletterset.value[r][c].isWord||(r==data.row&&c==data.col)) {
                                // pass
                            } else {
                                quizletterset.value[r][c].isTarget = false
                                quizletterset.value[r][c].isChoice = false
                                quizletterset.value[r][c].isChosen = false
                            }
                        }
                    }
                }
            } else {
                // reset chosen
                chosen.value.length = 0
            }
            break

        case 'ppChoice':
            console.log('ppChoice')
            if (data.action === 'push') {
                // toggle isChoice/isChosen
                quizletterset.value[data.choice.row][data.choice.col].isChosen = true
                quizletterset.value[data.choice.row][data.choice.col].isChoice = false
      
                chosen.value.push(data.choice)
      
                if (chosen.value.length == instance.max_chosen) {
                    // merge()
                    useMerge(chosen.value, quizletterset.value, backset.value)
                }
            } else {
                // data.action === 'pop'
                // toggle isChoice/isChosen
                quizletterset.value[data.choice.row][data.choice.col].isChosen = false
                quizletterset.value[data.choice.row][data.choice.col].isChoice = true
      
                const i = chosen.value.indexOf(data.choice)
                chosen.value.splice(i,1)
            }
            break

        case 'backQuiz':
            console.log('backQuiz')
            if (backset.value.length !== 0) {
                instance.quizletterset = _.cloneDeep(back(backset.value, forwardset.value, quizletterset.value))
            } else {
                // IndexError
                throw Error('IndexError')
            }
            break

        case 'forwardQuiz':
            console.log('forwardQuiz')
            if (forwardset.value.length !== 0) {
                instance.quizletterset = _.cloneDeep(forward(backset.value, forwardset.value, quizletterset.value))
            } else {
                // IndexError
                throw Error('IndexError')
            }
            break

        case 'showMerge':
            console.log('showMerge')
            instance.max_chosen = 2

            target.value = chosen.value[0]

            switch (target.value.col) {
                case 0:
                    quizletterset.value[target.value.row][target.value.col+1].isChoice = true
                    break
      
                case 14:
                    quizletterset.value[target.value.row][target.value.col-1].isChoice = true
                    break
      
                default:
                    quizletterset.value[target.value.row][target.value.col-1].isChoice = true
                    quizletterset.value[target.value.row][target.value.col+1].isChoice = true
            }
            break

        case 'showWord':
            console.log('showWord')
            instance.max_chosen = 6

            target.value = chosen.value[0]
            try {
                quizletterset.value[target.value.row][target.value.col+1].isChoice = true
                quizletterset.value[target.value.row+1][target.value.col].isChoice = true
                quizletterset.value[target.value.row+1][target.value.col+1].isChoice = true
                quizletterset.value[target.value.row+2][target.value.col].isChoice = true
                quizletterset.value[target.value.row+2][target.value.col+1].isChoice = true
            } catch (error) {
                // WordSpaceError
                throw Error('WordSpaceError')
            }
            break

        case 'Word':
            console.log('Word')
            useWord(chosen.value, quizletterset.value, backset.value)
            break

        case 'Space':
            console.log('Space')
            // create wordspace
            try {
                let wordspace = {'0,0':null, '1,0':null, '0,1':null, '1,1':null, '0,2':null, '1,2':null}
                target.value = chosen.value[0]

                for (let r=0;r<3;r++) {
                    let row = quizletterset.value[target.value.row+r]

                    for (let c=0;c<2;c++) {
                        if (row[target.value.col+c].letter == '') {
                            wordspace[`${c},${r}`] = null
                        } else {
                            wordspace[`${c},${r}`] = row[target.value.col+c].letter
                        }
                    }
                }

                useSpace(wordspace, quizletterset.value, target.value, backset.value)
            } catch (error) {
                if (error.message == 'SpaceError') {
                    // SpaceError
                    throw Error('SpaceError')                  
                } else {
                    // WordspaceError
                    throw Error('WordspaceError')
                }

            }
            break
    }

    return instance
}

export default quiz