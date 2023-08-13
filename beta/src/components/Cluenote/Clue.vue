<template>
  <div class="wrapper clue lock" v-if="!clue">
    <!-- if clue not exist, show locked-image -->
    <h3 class="title">아직 획득하지 못 한 단서입니다.</h3>
  </div>
  <div class="wrapper clue" v-else>
    <div style="width: 450px">
      <h3 class="title">{{ this.clue.title }}</h3>
      <p class="description">{{ this.clue.description }}</p>
      <div class="source" :class="{ 'npc': this.clue.source.type === 'NPC', 'item': this.clue.source.type === 'Item' }">
        <p class="description">(출처: {{ this.clue.source.name }})</p>
      </div>
    </div>
    <div class="wrapper">
      <div class="background" :class="{ rotateLeft: index%2 == 0, rotateRight: index%2 == 1 }" v-for="(subclue, index) in Object.values(clue.subClues)" :key="subclue.id">
        <div v-if="!subclue" class="subclue unknown">
          <h3 class="title">???</h3>
          <p class="description">????? ???? ????? ??? ????, ??????????? ?????????? ????, ??? ?? ????????</p>
        </div>
        <div v-else class="subclue" :class="{ unlock: subclue.reveal, lock: !subclue.reveal }"
          draggable="true" @dragstart="dragSubclue($event, subclue)">
          <div v-if="subclue.reveal">
            <h3 class="title">{{ subclue.title }}</h3>
            <p class="description">{{ subclue.description }}</p>
          </div>

          <div v-else>
            <h3 class="title">?? ? ???</h3>
              <p class="description" v-if="subclue.quiz_id" @click="toQuiz(subclue.quiz_id, subclue.clue_ref)">
                (퍼즐 풀고 단서 얻으러가기)
              </p>
              <p class="description" v-else>
                ???? ???? ????? ??? ???? ??????????? ?????????? ???? ????? ??? ????
              </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '@/game/game.js'

export default {
  name: 'Clue',
  props: [ 'clue' ],
  data() {
    return {
      redCircle: require('@/assets/blob-haikei.svg')
    }
  },
  methods: {
    dragSubclue(e, subclue) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('subclueIndex', subclue.index)
      e.dataTransfer.setData('clueIndex', subclue.c_index)
    },
    toQuiz(quiz_id, route) {
      // update default-quizID
      const path = `BetaUsers/${useGameStore().UID}/Games/k_detective_beta/Slots/auto/Quizs/${quiz_id}`
      useGameStore().$patch({ puzzle: { id: quiz_id, path: path, route: route } })
    }
  }
}
</script>

<style scoped>
.clue {
  align-items: stretch;
  justify-content: flex-start;
  padding: 15px;
  height: fit-content;
}

.background {
  min-height: 250px;
  margin: 10px 0 0 30px;
  background-color: #fff0df;
  transition: rotate 0.5s ease;
}

.background:hover {
  position: absolute;
  min-height: 300px;
  align-self: center;
  justify-self: center;
  border: 5px solid white;
  rotate: 0deg;
  z-index: 10;
}

.rotateLeft {
  rotate: -5deg;
  align-self: flex-start;
}

.rotateRight {
  rotate: 5deg;
  align-self: flex-end;
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

.lock p {
  cursor: pointer;
  text-decoration: white underline;
  font-weight: bold;
}
</style>