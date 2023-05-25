<template>
  <div class="clue" v-if="!clue">
    <!-- if clue not exist, show locked-image -->
    <h3>아직 획득하지 못 한 단서입니다.</h3>
  </div>
  <div class="clue" v-else>
    <h2>{{ clue.title }}</h2>
    <p class="clue-description">
      {{ clue.description }}
    </p>

    <div class="subclue-wrapper">
      <div class="subclue-wrapper paper" :class="{ rotateLeft: index%2 == 0, rotateRight: index%2 == 1 }" v-for="(subclue_group, index) in Object.values(clue.subClues)" :key="subclue_group.id">
        <img v-if="index%3 == 1&&subclue_group.length > 0" :src="redCircle" alt="" srcset="">
        <div v-if="subclue_group.length == 0" class="subclue unknown" :class="{ transitionLeft: index%2 == 0, transitionRight: index%2 == 1 }">
          <h3>???</h3>
          <p>????? ???? ????? ??? ????, ??????????? ?????????? ????, ??? ?? ????????</p>
        </div>
        <div v-else class="subclue" :class="{ transitionLeft: index%2 == 0, transitionRight: index%2 == 1, unlock: subclue.reveal, lock: !subclue.reveal }" v-for="(subclue, index) in subclue_group" :key="subclue.id">
          <div v-if="subclue.reveal">
            <h3>{{ subclue.title }}</h3>
            <p>{{ subclue.description }}</p>
          </div>

          <div v-else>
            <h3>?? ? ???</h3>
              <p v-if="subclue.quiz_id" @click="toQuiz(subclue.quiz_id, subclue.clue_ref)">
                (퍼즐 풀고 단서 얻으러가기)
              </p>
              <p v-else>
                ???? ???? ????? ??? ???? ??????????? ?????????? ???? ????? ??? ????
              </p>
          </div>
        </div>
      </div>
    </div>

    <Timeline v-if="clue.timelineData" :timeline="clue.timelineData.timeline" />
  </div>
</template>

<script>
import { useGameStore } from '@/game/game.js'
import Timeline from './Timeline.vue'

export default {
  name: 'Clue',
  props: [ 'clue' ],
  components: { Timeline },
  data() {
    return {
      redCircle: require('@/assets/blob-haikei.svg')
    }
  },
  methods: {
    toQuiz(quiz_id, route) {
      // update default-quizID
      useGameStore().$patch({ quiz: { id: quiz_id, route: route } })
    }
  }
}
</script>

<style scoped>
.clue {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: flex-start;
  padding: 10px;
  height: fit-content;
}

.subclue-wrapper {
  display: flex;
  width: 350px;
  min-height: 280px;
  height: fit-content;
  flex-direction: column;
  justify-items: flex-start;
  justify-content: flex-start;
  margin-top: 20px;
  margin-right: 10px;
  text-align: center;
  z-index: 20;
}

.paper {
  background-color: #fff0df;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2),
    -5px -5px 5px rgba(0, 0, 0, 0.2);
}

.subclue {
  position: relative;
  width: 350px;
  min-height: 200px;
  height: fit-content;
  display: block;
  padding: 20px;
  margin-bottom: -10px;
}

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

h3 {
  display: inline;
  font-size: 30px;
  padding: 5px;
  text-align: left;
  line-break: loose;
}

h2 {
  display: inline;
  font-size: 30px;
  padding: 5px;
}

p {
  display: inline-block;
  font-size: 18px;
  text-align: left;
  line-break: loose;
  color: #3B2F2C;
  margin: 10px;
  margin-bottom: 20px;
  padding: 5px;
  box-shadow: -5px 0 0 rgba(0, 0, 0, 0.3);
}

.lock p {
  cursor: pointer;
  font-weight: bold;
}

img {
  width: 600px;
  height: 100%;
  position: absolute;
  translate: -120px;
  opacity: 0.6;
  z-index: 50;
}
</style>