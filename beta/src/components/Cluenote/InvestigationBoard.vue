<template>
  <div id="investigation-board" class="board pixel-borders--1">
    <div v-if="!this.investigationData" class="notice">
      추가된 단서가 없습니다.
    </div>
    <div v-else>
      <!-- investigation-scope board -->
      <button class="pixel-borders--2" :class="{ open: this.scope_open, close: !this.scope_open }"
        @click="this.scope_open = !this.scope_open">
        {{ this.scope_open ? '>>' : '<<' }}
      </button>
      <div id="investigation-scope" class="board pixel-borders--1"
        :class="{ open: this.scope_open, close: !this.scope_open }">
        <div class="scope">
          <h3 class="title">범행 방법</h3>
        </div>
        <div class="scope">
          <h3 class="title">동기</h3>
        </div>
      </div>

      <!-- timeline -->
      <div class="wrapper timeline">
        <div class="event">
          <h3 class="title">???</h3>
          <p class="description">????? ?????</p>
        </div>
      </div>

      <!-- clues -->
      <div class="wrapper clue">
        <div style="width: 450px">
          <h3 class="title">{{ this.investigationData.clues[0].title }}</h3>
          <p class="description">{{ this.investigationData.clues[0].description }}</p>
        </div>
        <div class="wrapper">
          <div class="subclue">
            <h3 class="title">???</h3>
            <p class="description">????? ?????</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TimelineEvent from './TimelineEvent.vue'
import SubClue from './SubClue.vue'

export default {
  name: 'InvestigationBoard',
  props: [ 'investigationData' ],
  components: { TimelineEvent, SubClue },
  data() {
    return {
      scope_open: true
    }
  }
}
</script>
<style scoped>
#investigation-board {
  top: 130px;
  width: 1210px;
  height: 630px;
  padding: 10px; 
}

#investigation-scope {
  right: 0px;
  width: 300px;
  height: 600px;
  padding: 5px;
  border-right: none;
}

#investigation-scope.close {
  display: none;
}

.notice {
  text-align: center;
  line-height: 460px;
  font-size: 25px;
}

.scope {
  width: 270px;
  min-height: 400px;
  height: fit-content;
  margin-bottom: 10px;
  padding: 5px;
  background-color: #80808078;
}

button {
  position: absolute;
  top: 5%;
  height: 45px;
  margin-right: -5px;
  padding: 0px 5px;
  font-size: 50px;
  text-align: right;
  color: white;
  text-shadow: -3px 0 #000;
  background-color: #a2e1e6;
  border-right: none;
  border-width: 2px;
  border-radius: 10px;
}

button.open {
  right: 300px
}

button.close {
  right: 0px
}

.wrapper {
  width: fit-content;
  padding: 10px;
  line-break: loose;
  white-space: pre-wrap;
}

.group {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 30px;
  font-weight: bold;
  margin: 0 10px;
  text-align: left;
}

.description {
  display: inline-block;
  font-size: 20px;
  text-align: left;
  line-break: auto;
  margin: 10px;
  text-align: left;
}

.float {
  z-index: 10;
}

.notice {
  text-align: center;
  line-height: 460px;
  font-size: 20px;
}

.clue {
  background-color: #bce2e5;
}

.subclue {
  flex-direction: column;
  background-color: #a2e6a5;
}
</style>