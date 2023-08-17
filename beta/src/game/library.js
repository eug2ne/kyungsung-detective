import { useGameStore } from "./game";

// function library for useGameStore().cluenote update events
  // add clue + add subclue + add timeline
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

export const addInvestigation = (investigation, p_index) => {
  // add investigation to cluenote
  useGameStore().$patch((state) => {
    state.cluenote[p_index] = investigation
  })

  return '새로운 사건이 단서노트에 추가되었습니다.'
}

export const addClue = (clue, p_index) => {
  const { index } = clue

  // add clue to cluenote
  useGameStore().$patch((state) => {
    state.cluenote[p_index].clues[index] = clue
  })
}

export const addEvent = (event, p_index) => {
  const { index } = event

  // add timeline-event to cluenote
  useGameStore().$patch((state) => {
    state.cluenote[p_index].timeline[index] = event
  })

  return '시간선에 새로운 사건이 추가되었습니다.'
}

export const addSubClue = (subClue, p_index) => {
  const { t_index, c_index, index } = subClue

  // add subclue to cluenote
  useGameStore().$patch((state) => {
    // clue.subclue
    if (c_index) state.cluenote[p_index].clues[c_index].subClues[index] = subClue
    // timeline-event.subclue
    else if (t_index) state.cluenote[p_index].timeline[t_index].subClues[index] = subClue
  })

  return '새로운 단서가 단서노트에 추가되었습니다.'
}

export const updateSubClue = (subClue, p_index) => {
  const { t_index, c_index, index } = subClue

  // add subclue to cluenote
  useGameStore().$patch((state) => {
    // clue.subclue
    if (c_index) state.cluenote[p_index].clues[c_index].subClues[index] = subClue
    // timeline-event.subclue
    else if (t_index) state.cluenote[p_index].timeline[t_index].subClues[index] = subClue
  })

  return '기존 단서의 정보가 갱신되었습니다.'
}