<template>
  <div :id="containerId" v-if="downloaded" />
  <div class="placeholder" v-else>로딩 중 ...</div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
  components: { Navbar },
  data() {
    return {
      downloaded: false,
      gameInstance: null,
      containerId: 'game-container'
    }
  },
  async mounted() {
    const game = await import(/* webpackChunkName: "game" */ '../game/game.js')
    this.downloaded = true
    this.$nextTick(() => {
      this.gameInstance = game.launch(this.containerId)
    })
  },
  destroyed() {
    this.gameInstance.destroy(false)
  }
}
</script>

<style>
.placeholder {
  color: white;
  background: black;
  font-size: 2rem;
  width: calc(2800px / 3);
  height: calc(1981px / 3);
  line-height: calc(1981px / 3);
  text-align: center;
}
</style>
