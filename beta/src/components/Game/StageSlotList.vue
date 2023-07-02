<template>
  <div class="slot-list">
    <Suspense>
      <StageSlot :mode="this.mode"/>

      <template #fallback>
        <p>loading slots...</p>
      </template>
    </Suspense>
    <ul>
      <li>
        <span @click="this.$emit('closeSlot')" class="x-button">x</span>
      </li>
    </ul>
  </div>
</template>

<script>
import StageSlot from './StageSlot.vue'

export default {
  name: 'StageSlotList',
  emits: [ 'closeSlot' ],
  props: [ 'mode' ],
  components: { StageSlot }
}
</script>

<style scoped>
.x-button {
  margin: 0px;
  font-size: 30px;
}

.slot-list {
  display: flex;
  flex-direction: column-reverse;
}
</style>