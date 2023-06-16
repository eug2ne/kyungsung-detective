// function library for useGameStore().cluenote update events
  // add clue + add subclue + add timeline

import { useGameStore } from "./game";

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

export const addClue = (clue, index) => {
  // add clue to designated index
  useGameStore().$patch((state) => {
    state.cluenote[index] = clue
  })
}

export const addSubClue = (subclue, index, s_index) => {
  // add subclue to clue of designated index
  useGameStore().$patch((state) => {
    // check subclue-update redundancy
    if (_.some(state.cluenote[index].subClues[s_index], subclue)) return
    else if (subclue.quiz_id&&state.cluenote[index].subClues[s_index].find(ele => ele.quiz_id === subclue.quiz_id)) return
    
    state.cluenote[index].subClues[s_index].push(subclue)
  })
}

export const addTimeline = (timeline, index, t_index, percent) => {
  // add timeline to clue of designated index as designated timeline-index
  useGameStore().$patch((state) => {
    // check timeline-update redundancy
    if (_.isEqual(state.cluenote[index].timelineData.timeline[t_index], timeline)) return
    
    state.cluenote[index].timelineData.timeline[t_index] = timeline
    // add percent to timelineData.complete (if timelineData.complete === 1, timeline complete)
    state.cluenote[index].timelineData.complete += percent
  })

  return useGameStore().cluenote[index].timelineData.complete
}