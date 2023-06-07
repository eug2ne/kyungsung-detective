import { ref } from 'vue'
import _ from 'lodash'
import quizengine from "./quizlibrary/quizengine"
import backforth from './quizlibrary/backforth'

// import event, data
// >> update db
// >> return quizletterset
const quiz = (data, instance, answerset) => {
    const quizletterset = instance.quizletterset
    const chosen = instance.chosen
    const reverse = instance.reverse
    const backset = instance.backset
    const forwardset = instance.forwardset
    let target = undefined

    // import quizengine
    const {
        back,
        forward,
        useMerge,
        useWord,
        useSpace
    } = quizengine(reverse)

    const { updatepastSet } = backforth()

    switch (data.event) {
        case 'toggleTarget':
            quizletterset[data.row][data.col].isTarget = !quizletterset[data.row][data.col].isTarget

            if (quizletterset[data.row][data.col].isTarget) {
                chosen.length = 0
                chosen.push({'row': data.row, 'col': data.col, 'letter': data.letter})

                // reset any other target in set
                if (!instance.id) {
                    // Rules page
                    for (let r=0;r<3;r++) {
                        for (let c=0;c<6;c++) {
                            if (!quizletterset[r][c]||quizletterset[r][c].isWord||(r==data.row&&c==data.col)) {
                                // pass
                            } else {
                                quizletterset[r][c].isTarget = false
                                quizletterset[r][c].isChoice = false
                                quizletterset[r][c].isChosen = false
                            }
                        }
                    }
                } else {
                    // Quiz page
                    for (let r=0;r<6;r++) {
                        for (let c=0;c<15;c++) {
                            if (!quizletterset[r][c]||quizletterset[r][c].isWord||(r==data.row&&c==data.col)) {
                                // pass
                            } else {
                                quizletterset[r][c].isTarget = false
                                quizletterset[r][c].isChoice = false
                                quizletterset[r][c].isChosen = false
                            }
                        }
                    }
                }
            } else {
                // reset chosen
                chosen.length = 0
            }
            break

        case 'ppChoice':
            if (data.action === 'push') {
                // toggle isChoice/isChosen
                quizletterset[data.choice.row][data.choice.col].isChosen = true
                quizletterset[data.choice.row][data.choice.col].isChoice = false
      
                chosen.push(data.choice)
      
                if (chosen.length == instance.max_chosen) {
                    // reset quizletterset
                    if (!instance.id) {
                        // Rules page
                        for (let r=0;r<3;r++) {
                            for (let c=0;c<6;c++) {
                                if (!quizletterset[r][c]||quizletterset[r][c].isWord) {
                                    // pass
                                } else {
                                    quizletterset[r][c].isTarget = false
                                    quizletterset[r][c].isChoice = false
                                    quizletterset[r][c].isChosen = false
                                }
                            }
                        }
                    } else {
                        // Quiz page
                        for (let r=0;r<6;r++) {
                            for (let c=0;c<15;c++) {
                                if (!quizletterset[r][c]||quizletterset[r][c].isWord) {
                                    // pass
                                } else {
                                    quizletterset[r][c].isTarget = false
                                    quizletterset[r][c].isChoice = false
                                    quizletterset[r][c].isChosen = false
                                }
                            }
                        }
                    }
                    // merge()
                    useMerge(chosen, quizletterset, backset)
                }
            } else {
                // data.action === 'pop'
                // toggle isChoice/isChosen
                quizletterset[data.choice.row][data.choice.col].isChosen = false
                quizletterset[data.choice.row][data.choice.col].isChoice = true
      
                const i = chosen.indexOf(data.choice)
                chosen.splice(i,1)
            }
            break

        case 'backQuiz':
            if (backset.length !== 0) {
                instance.quizletterset = _.cloneDeep(back(backset, forwardset, quizletterset))
            } else {
                // IndexError
                throw Error('IndexError')
            }
            break

        case 'forwardQuiz':
            if (forwardset.length !== 0) {
                instance.quizletterset = _.cloneDeep(forward(backset, forwardset, quizletterset))
            } else {
                // IndexError
                throw Error('IndexError')
            }
            break

        case 'Refresh':
            updatepastSet(backset, instance.quizletterset)
            instance.quizletterset = _.cloneDeep(data.defaultSet)
            break

        case 'showMerge':
            instance.max_chosen = 2

            target = chosen[0]

            try {
                quizletterset[target.row][target.col+1].isChoice = true
                quizletterset[target.row][target.col-1].isChoice = true
            } catch (err) {
                (quizletterset[target.row][target.col+1]) ? 
                    quizletterset[target.row][target.col+1].isChoice = true : quizletterset[target.row][target.col-1].isChoice = true
            }
            break

        case 'showWord':
            instance.max_chosen = 6

            target = chosen[0]
            try {
                quizletterset[target.row][target.col+1].isChoice = true
                quizletterset[target.row+1][target.col].isChoice = true
                quizletterset[target.row+1][target.col+1].isChoice = true
                quizletterset[target.row+2][target.col].isChoice = true
                quizletterset[target.row+2][target.col+1].isChoice = true
            } catch (error) {
                // reset quizletterset
                if (!instance.id) {
                    // Rules page
                    for (let r=0;r<3;r++) {
                        for (let c=0;c<6;c++) {
                            if (!quizletterset[r][c]||quizletterset[r][c].isWord) {
                                // pass
                            } else {
                                quizletterset[r][c].isTarget = false
                                quizletterset[r][c].isChoice = false
                                quizletterset[r][c].isChosen = false
                            }
                        }
                    }
                } else {
                    // Quiz page
                    for (let r=0;r<6;r++) {
                        for (let c=0;c<15;c++) {
                            if (!quizletterset[r][c]||quizletterset[r][c].isWord) {
                                // pass
                            } else {
                                quizletterset[r][c].isTarget = false
                                quizletterset[r][c].isChoice = false
                                quizletterset[r][c].isChosen = false
                            }
                        }
                    }
                }
                // WordSpaceError
                throw Error('WordSpaceError')
            }
            break

        case 'Word':
            // reset quizletterset
            if (!instance.id) {
                // Rules page
                for (let r=0;r<3;r++) {
                    for (let c=0;c<6;c++) {
                        if (!quizletterset[r][c]||quizletterset[r][c].isWord) {
                            // pass
                        } else {
                            quizletterset[r][c].isTarget = false
                            quizletterset[r][c].isChoice = false
                            quizletterset[r][c].isChosen = false
                        }
                    }
                }
            } else {
                // Quiz page
                for (let r=0;r<6;r++) {
                    for (let c=0;c<15;c++) {
                        if (!quizletterset[r][c]||quizletterset[r][c].isWord) {
                            // pass
                        } else {
                            quizletterset[r][c].isTarget = false
                            quizletterset[r][c].isChoice = false
                            quizletterset[r][c].isChosen = false
                        }
                    }
                }
            }
            useWord(chosen, quizletterset, backset, answerset)
            break

        case 'Space':
            // reset quizletterset
            if (!instance.id) {
                // Rules page
                for (let r=0;r<3;r++) {
                    for (let c=0;c<6;c++) {
                        if (!quizletterset[r][c]||quizletterset[r][c].isWord) {
                            // pass
                        } else {
                            quizletterset[r][c].isTarget = false
                            quizletterset[r][c].isChoice = false
                            quizletterset[r][c].isChosen = false
                        }
                    }
                }
            } else {
                // Quiz page
                for (let r=0;r<6;r++) {
                    for (let c=0;c<15;c++) {
                        if (!quizletterset[r][c]||quizletterset[r][c].isWord) {
                            // pass
                        } else {
                            quizletterset[r][c].isTarget = false
                            quizletterset[r][c].isChoice = false
                            quizletterset[r][c].isChosen = false
                        }
                    }
                }
            }
            // create wordspace
            try {
                let wordspace = {'0,0':null, '1,0':null, '0,1':null, '1,1':null, '0,2':null, '1,2':null}
                target = chosen[0]

                for (let r=0;r<3;r++) {
                    let row = quizletterset[target.row+r]

                    for (let c=0;c<2;c++) {
                        if (row[target.col+c].letter == '') {
                            wordspace[`${c},${r}`] = null
                        } else {
                            wordspace[`${c},${r}`] = row[target.col+c].letter
                        }
                    }
                }

                useSpace(wordspace, quizletterset, target, backset)
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