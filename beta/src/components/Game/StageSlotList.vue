<template>
  <div class="slot-list">
    <Suspense>
      <StageSlot :mode="this.mode"/>

      <template #fallback>
        <p>loading slots...</p>
      </template>
    </Suspense>
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
  font-size: 20px;
  background-color: #00000096;
}
</style>