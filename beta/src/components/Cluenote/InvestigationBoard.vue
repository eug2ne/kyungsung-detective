<template>
  <div id="investigation-board" class="pixel-borders--1">
    <!-- <div class="notice" v-if="!this.i_list">
      조사할 사건을 골라주세요.
    </div>
    <div class="notice" v-else-if="!this.showInvestigation">
      아직 얻은 단서가 없습니다.
    </div> -->
    <div class="abstract wrapper">
      <h3 class="title" style="margin: 10px;">사건 개요 :</h3>
      <p class="description">????? ?????</p>
      <div class="invisible-box" style="width: 10px"/>
    </div>
    <ul class="timeline wrapper">
      <li>
        <TimelineEvent />
      </li>
    </ul>
    <ul class="clue wrapper">
      <li>
        <SubClue />
      </li>
    </ul>

    <div class="important">

    </div>
  </div>
</template>
<script>
import TimelineEvent from './TimelineEvent.vue'
import SubClue from './SubClue.vue'

export default {
  name: 'InvestigationBoard',
  components: { TimelineEvent, SubClue }
}
</script>
<style>
#investigation-board {
  width: 1210px;
  height: 500px;
  padding: 10px;
  display: inline-block;
  border-radius: 0;
  overflow: scroll;
  background-color: #ffff;
}

.wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 20px;
  padding: 10px;
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

.abstract {
  width: 1160px;
  height: 60px;
  margin: 0 auto 20px;
  padding: 5px;
  justify-content: space-between;
  background-color: #a2e1e6;
}

.clue {
  background-color: #bce2e5;
}

.subclue {
  flex-direction: column;
  background-color: #a2e6a5;
}
</style>