import { ref } from 'vue'
import importSet from "./quizlibrary/importSet"
import exportSet from './quizlibrary/exportSet'
import quizengine from "./quizlibrary/quizengine"

const quizletterset = ref({})
const chosen = ref([])
const reverse = ref(Boolean)
const max_chosen = ref(Number)
const backset = ref([])
const forwardset = ref([])

// import event, data
// >> update db
// >> return quizletterset
const quiz = async (data, id, user) => {
    // import quizinstance from db
    const {
        defaultSet,
        user_id,
        quizinstance
    } = await importSet(id, user)

    quizletterset.value = quizinstance.quizletterset
    chosen.value = quizinstance.chosen
    reverse.value = quizinstance.reverse
    max_chosen.value = quizinstance.max_chosen
    backset.value = quizinstance.backset
    forwardset.value = quizinstance.forwardset

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
            quizletterset.value[data.row][data.col].isTarget = !quizletterset.value[data.row][data.col].isTarget

            if (quizletterset.value[data.row][data.col].isTarget) {
                chosen.value.length = 0
                chosen.value.push({'row': data.row, 'col': data.col, 'letter': data.letter})

                // reset any other target in quizletterset
                for (let r=0;r<Object.keys(quizletterset.value).length;r++) {
                    for (let c=0;c<Object.keys(quizletterset.value[r]).length;c++) {
                        if (r==data.row&&c==data.col) {
                        // pass
                        } else {
                        quizletterset.value[r][c].isTarget = false
                        quizletterset.value[r][c].isChoice = false
                        quizletterset.value[r][c].isChosen = false
                        }
                    }
                }
            }
            break

        case 'ppChoice':
            if (data.action === 'push') {
                // toggle isChoice/isChosen
                quizletterset.value[data.choice.row][data.choice.col].isChosen = true
                quizletterset.value[data.choice.row][data.choice.col].isChoice = false
      
                chosen.value.push(data.choice)
      
                if (chosen.value.length == max_chosen.value) {
                    // merge()
                    useMerge(chosen.value, quizletterset.value)
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

        case 'refreshQuiz':
            quizletterset.value = defaultSet.value
            break

        case 'backQuiz':
            quizletterset.value = back(backset.value, quizletterset.value)
            break

        case 'forwardQuiz':
            quizletterset.value = forward(backset.value, quizletterset.value)
            break

        case 'showMerge':
            useshowMerge(quizletterset.value, data.row, data.col)
            break

        case 'showWord':
            useshowWord(quizletterset.value, data.row, data.col)
            break

        case 'Merge':
            useMerge(chosen.value, quizletterset.value)
            break

        case 'Word':
            useWord(chosen.value, quizletterset.value)
            break

        case 'Space':
            // create wordspace
            try {
                let wordspace = {'0,0':null, '1,0':null, '0,1':null, '1,1':null, '0,2':null, '1,2':null}
                const target = chosen.value[0]

                for (let r=0;r<3;r++) {
                    let row = quizletterset[target.row+r]

                    for (let c=0;c<2;c++) {
                        if (row[target.col+c] == '') {
                            wordspace[`${c},${r}`] = null
                        } else {
                            wordspace[`${c},${r}`] = row[target.col+c]
                        }
                    }
                }

                useSpace(wordspace, quizletterset.value)
            } catch {
                // WordSpaceError
                return 'WordSpaceError'
            }
            break
    }

    // update db
    exportSet({
        quizletterset: quizletterset.value,
        chosen: chosen.value,
        max_chosen: max_chosen.value,
        reverse: reverse.value,
        backset: backset.value,
        forwardset: forwardset.value
    }, user_id)

    return quizletterset
}

export default quiz