<template>
  <div class="help-popup" :style="{ top: `${this.y}px`, left: `${this.x}px` }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'QuizHelp',
  props: [ 'x', 'y' ],
  created() {
    console.log(this.x, this.y)
  }
}
</script>

<style scoped>
.help-popup {
  display: block;
  position: absolute;
  z-index: 1000;
  width: 300px;
  min-height: 100px;
  height: fit-content;
  padding: 15px;
  line-break: loose;
  background-color: aliceblue;
}
</style>