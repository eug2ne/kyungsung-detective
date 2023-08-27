import { useGameStore } from "./game";

// function library for useGameStore().cluenote update events
  // add clue + add subclue + add timeline
const DUMMY_CLUE = {
  title: '??? ??',
  description: '????? ???? ????? ??? ????, ??????????? ???????? ????',
  index: 0,
  subClues: {}
}
const DUMMY_EVENT = {
  title: '?? ???',
  description: '????? ???? ????? ??? ????, ??????????? ???????? ????',
  index: 0,
  subClues: {}
}

export const spliceOption = (key, id, option, add) => {
  // delete option + change to add
  // (if option not provided, only push add to npc.options)
  if (useGameStore().stage.scenes_config[key].npc[id].options.includes(add)) return
  
  if (!option) {
    // option not provided, only push add to npc.options
    if (useGameStore().stage.scenes_config[key].npc[id].options.includes('option-suspicion')) {
      // option-suspicion always last
      const n = useGameStore().stage.scenes_config[key].npc[id].options.length
      useGameStore().$patch((state) => {
        state.stage.scenes_config[key].npc[id].options.splice(n-2, 1, add)
      })
    } else {
      useGameStore().$patch((state) => {
        state.stage.scenes_config[key].npc[id].options.push(add)
      })
    }
  } else {
    // delete option + change to add
    const i = useGameStore().stage.scenes_config[key].npc[id].options.findIndex(ele => ele === option)

    if (i === -1) return
    useGameStore().$patch((state) => {
      state.stage.scenes_config[key].npc[id].options.splice(i, 1, add)
    })
  }
}

export const addInvestigation = (p_index, investigation) => {
  // add investigation to cluenote
  useGameStore().$patch((state) => {
    state.cluenote[p_index] = investigation
  })

  return '새로운 사건이 단서노트에 추가되었습니다.'
}

export const addClue = (p_index, clue) => {
  const { index } = clue

  // add clue to cluenote
  useGameStore().$patch((state) => {
    if (state.cluenote[p_index].clues[index]&&state.cluenote[p_index].clues[index].subClues) {
      // dummy clue exist
      state.cluenote[p_index].clues[index].title = clue.title
      state.cluenote[p_index].clues[index].description = clue.description
      state.cluenote[p_index].clues[index].source = clue.source
      state.cluenote[p_index].clues[index].related = clue.related
    } else {
      state.cluenote[p_index].clues[index] = clue
    }
  })

  return '새로운 단서가 단서노트에 추가되었습니다.'
}

export const addEvent = (p_index, ...args) => {
  for (let event of args) {
    const { index } = event

    // add timeline-event to cluenote
    useGameStore().$patch((state) => {
      if (state.cluenote[p_index].timeline[index]&&state.cluenote[p_index].timeline[index].subClues) {
        // dummy event exist
        state.cluenote[p_index].timeline[index].title = event.title
        state.cluenote[p_index].timeline[index].description = event.description
        state.cluenote[p_index].timeline[index].source = event.source
      } else {
        state.cluenote[p_index].timeline[index] = event
      }
    })
  }

  return '시간선에 새로운 사건이 추가되었습니다.'
}

export const addSubClue = (p_index, ...args) => {
  for (let subClue of args) {
    const { t_index, c_index, index } = subClue

    // add subclue to cluenote
    useGameStore().$patch((state) => {
      if (c_index != undefined) {
        // clue.subclue
        if (!state.cluenote[p_index].clues[c_index]) {
          // if clue not exist, add dummy-clue
          state.cluenote[p_index].clues[c_index] = DUMMY_CLUE
          state.cluenote[p_index].clues[c_index].index = c_index
        }
        state.cluenote[p_index].clues[c_index].subClues[index] = subClue
      } else if (t_index != undefined) {
        // timeline-event.subclue
        if (!state.cluenote[p_index].timeline[t_index]) {
          // if event not exist, add dummy-event
          state.cluenote[p_index].timeline[t_index] = DUMMY_EVENT
          state.cluenote[p_index].timeline[t_index].index = t_index
        }
        state.cluenote[p_index].timeline[t_index].subClues[index] = subClue
      }
    })
  }

  return '새로운 단서가 단서노트에 추가되었습니다.'
}

export const updateSubClue = (p_index, subClue) => {
  const { t_index, c_index, index } = subClue

  // add subclue to cluenote
  useGameStore().$patch((state) => {
    if (c_index != undefined) {
      // clue.subclue
      state.cluenote[p_index].clues[c_index].subClues[index] = subClue
    } else if (t_index != undefined) {
      // timeline-event.subclue
      state.cluenote[p_index].timeline[t_index].subClues[index] = subClue
    }
  })

  return '기존 단서의 정보가 갱신되었습니다.'
}