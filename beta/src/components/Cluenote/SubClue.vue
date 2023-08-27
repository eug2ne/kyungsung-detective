<template>
  <div class="subclue"
    :class="{ unknown: !subclue, unlock: subclue ? subclue.reveal : false, lock: subclue ? !subclue.reveal : false }"
    :draggable="subclue ? subclue.reveal : false" @dragstart.self="dragSubclue($event, subclue)">
    <div v-if="!subclue">
      <h3 class="title">
        {{ "?".repeat(Math.floor(Math.random()*5) + 1) }}
      </h3>
      <p class="description">
        ????? ???? ????? ??? ????, ??????????? ?????????? ????, ??? ?? ????????
      </p>
    </div>
    <div v-else-if="!subclue.reveal">
      <h3 class="title">
        {{ "?".repeat(Math.floor(Math.random()*5) + 1) }}
      </h3>
      <p class="description" v-if="subclue.quiz_id"
        @click="toQuiz(subclue.quiz_id, clue.subClues[subclue_key].clue_ref)">
        (퍼즐 풀고 단서 얻으러가기)
      </p>
      <p class="description" v-else>
        ????? ???? ????? ??? ????, ??????????? ?????????? ????, ??? ?? ????????
      </p>
    </div>
    <div v-else>
      <h3 class="title">{{ subclue.title }}</h3>
      <p class="description">{{ subclue.description }}</p>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '@/game/game.js'

export default {
  name: 'SubClue',
  props: [ 'subclue' ],
  methods: {
    toQuiz(quiz_id, route) {
      // update default-quizID
      const path = `BetaUsers/${useGameStore().UID}/Games/k_detective_beta/Slots/auto/Quizs/${quiz_id}`
      useGameStore().$patch({ puzzle: { id: quiz_id, path: path, route: route } })
    },
    dragSubclue(e, subclue) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('subclueIndex', subclue.index)
      e.dataTransfer.setData('clueIndex', subclue.c_index)
      e.dataTransfer.setData('eventIndex', subclue.t_index)
    }
  }
}
</script>