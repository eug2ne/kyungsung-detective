<template>
  <div class="popup">
    <ul>
      <li v-if="!this.showStageList">
        <button class="show-stage-list pixel-borders--1" @click="this.showStageList = true">스테이지 선택</button>
      </li>
      <li v-else>
        <button class="show-slot-list pixel-borders--1" @click="this.showStageList = false">저장슬롯 보기</button>
      </li>
    </ul>
    <StageList v-if="this.showStageList"/>
    <StageSlotList v-else @closeSlot="this.showSlot=false" />
  </div>
</template>

<script>
import StageSlotList from './StageSlotList.vue'
import StageList from './StageList.vue'

export default {
  name: 'StageSelectPopup',
  components: { StageList, StageSlotList },
  data() {
    return {
      showStageList: false
    }
  }
}
</script>

<style scoped>
.popup {
  width: 500px;
  height: fit-content;
  top: 8%;
  left: 8%;
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffffd6;
  z-index: 100;
}

.show-stage-list {
  background-color: #eb5d5dd4;
}

.show-slot-list {
  background-color: #5d9bebd4;
}

span {
  margin: 0;
  padding: 0;
}

li {
  margin: 0;
  padding: 0px;
}

button {
  margin: 25px 0 0 0;
  padding: 5px;
  color: white;
  font-size: 15px;
}
</style>