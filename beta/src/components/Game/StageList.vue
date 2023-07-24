<template>
  <div class="stage-list">
    <div class="stage pixel-borders--2">
      <h3 class="stage-title">부엌에서</h3>
      <p class="stage-description">
        어머니의 부고 소식을 듣고 오랜만에 한국으로 돌아온 사미. 앞으로 어떻게 해야할지 고민하는데...
      </p>
      <button class="stage-select pixel-borders--1" @click="resetStage('BreakfastStage')">처음부터</button>
    </div>
    <div class="stage pixel-borders--2">
      <h3 class="stage-title">첫번째 탐정시험</h3>
      <p class="stage-description">
        탐정시험을 보러 경무대로 온 사미. 과연 무사히 탐정시험을 치를 수 있을 것인가.
      </p>
      <button class="stage-select pixel-borders--1" @click="resetStage('Test1Stage')">처음부터</button>
    </div>
    <div class="stage pixel-borders--2">
      <h3 class="stage-title">두번째 탐정시험</h3>
      <p class="stage-description">
        두번째 탐정시험은 가상의 사건을 해결하는 모의수사. 가상의 사건이지만 긴장의 끈을 놓아서는 안된다!
      </p>
      <button class="stage-select pixel-borders--1" @click="resetStage('Test2Stage')">처음부터</button>
    </div>
    <div class="stage unknown pixel-borders--2">
      <h3 class="stage-title">coming soon...</h3>
      <p class="stage-description">????? ?????</p>
    </div>
  </div>
</template>
<script>
import { useGameStore } from '@/game/game'

export default {
  name: 'StageList',
  methods: {
    async resetStage(stageKey) {
      await useGameStore().resetStage('k_detective_beta', stageKey)
      this.emitter.emit('reload')
    }
  }
}
</script>
<style scoped>
.stage {
  margin: 10px 0;
  padding: 20px;
  background-color: #9dbbd1d6;
}

.unknown {
  background-color: #d19d9dd6;
}

ul {
  display: flex;
  height: fit-content;
  flex-direction: row-reverse;
  align-self: flex-end;
  align-items: flex-end;
  padding: 0;
}

li {
  padding: 0px;
}

h3 {
  text-decoration: underline;
  text-decoration-color: white;
}

button {
  margin: 10px 10px 0 0;
  padding: 5px;
  color: white;
  font-size: 10px;
  background-color: #00000096;
}
</style>