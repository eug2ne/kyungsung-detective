import Phaser from "phaser"
import Pinia from 'pinia'
import { useGameStore } from '@/game/game.js'
import { Investigation, Clue, subClue, event } from "../GameObjects/ClueDataStructure"

interface storeInterface {
  store: Pinia.Store
}

export default class cluenoteInterface implements storeInterface {
  store: Pinia.Store = useGameStore()
  p_index: number // investigation index (same through out stage)

  constructor(p_index: number) {
    this.p_index = p_index
  }

  addInvestigation(investigation: Investigation): string {
    // add investigation to cluenote
    this.store.$patch((state: any) => {
      state.cluenote[this.p_index] = investigation
    })

    return '새로운 사건이 단서노트에 추가되었습니다.'
  }

  addClue(clue: Clue) {
    const { index } = clue

    // add clue to cluenote
    this.store.$patch((state: any) => {
      state.cluenote[this.p_index].clues[index] = clue
    })
  }

  addEvent(event: event): string {
    const { index } = event

    // add timeline-event to cluenote
    this.store.$patch((state: any) => {
      state.cluenote[this.p_index].timeline[index] = event
    })

    return '시간선에 새로운 사건이 추가되었습니다.'
  }

  addSubClue(subClue: subClue): string {
    const { t_index, c_index, index } = subClue

    // add subclue to cluenote
    this.store.$patch((state: any) => {
      // clue.subclue
      if (c_index) state.cluenote[this.p_index].clues[c_index].subClues[index] = subClue
      // timeline-event.subclue
      else if (t_index) state.cluenote[this.p_index].timeline[t_index].subClues[index] = subClue
    })

    return '새로운 단서가 단서노트에 추가되었습니다.'
  }

  updateSubClue(subClue: subClue): string {
    const { t_index, c_index, index } = subClue

    // add subclue to cluenote
    this.store.$patch((state: any) => {
      // clue.subclue
      if (c_index) state.cluenote[this.p_index].clues[c_index].subClues[index] = subClue
      // timeline-event.subclue
      else if (t_index) state.cluenote[this.p_index].timeline[t_index].subClues[index] = subClue
    })

    return '기존 단서의 정보가 갱신되었습니다.'
  }
}