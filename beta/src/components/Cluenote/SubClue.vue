<template>
  <div class="subclue" :class="{ focus: this.focus }"
    @mouseenter.prevent="this.focus = true" @mouseleave.self="this.focus = false">
    <h3 class="title">?????</h3>
    <p class="description">????? ?????</p>
    <ul class="wrapper related" :class="{ expanded: this.focus, minimized: !this.focus }">
      <li class="subclue" :class="{ expanded: this.focus, minimized: !this.focus }">
        <h3 class="title" :class="{ minimized: !this.focus }">related subclue</h3>
        <p v-if="this.focus" class="description">related subclue description</p>
      </li>
      <li class="subclue">
        <h3 class="title" :class="{ minimized: !this.focus }">related subclue</h3>
        <p v-if="this.focus" class="description">related subclue description</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { useGameStore } from '@/game/game.js'

export default {
  name: 'SubClue',
  data() {
    return {
      focus: false,
      redCircle: require('@/assets/blob-haikei.svg')
    }
  },
  methods: {
    toQuiz(quiz_id, route) {
      // update default-quizID
      const path = `BetaUsers/${useGameStore().UID}/Games/k_detective_beta/Slots/auto/Quizs/${quiz_id}`
      useGameStore().$patch({ puzzle: { id: quiz_id, path: path, route: route } })
    }
  }
}
</script>
<style>
.rotateLeft {
  rotate: -5deg;
}

.rotateRight {
  rotate: 5deg;
}

.transitionLeft {
  rotate: -5deg;
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.4), -20px -5px 0 rgba(255, 255, 255, 0.4) inset,
    -5px -5px 5px rgba(0, 0, 0, 0.2);
}

.transitionRight {
  rotate: 5deg;
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.4), -20px 5px 0 rgba(255, 255, 255, 0.4) inset,
    -5px -5px 5px rgba(0, 0, 0, 0.2);
}

.lock {
  background-color: #ff7d6c;
  z-index: 50;
}

.unlock {
  background-color: #4b8292;
}

.unknown {
  width: 350px;
  min-height: 250px;
  height: fit-content;
  background-color: #e8ded5;
}
</style>