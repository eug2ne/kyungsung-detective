// function library for useGameStore().cluenote update events
  // add clue + add subclue + add timeline

import { useGameStore } from "./game";

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