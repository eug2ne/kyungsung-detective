<template>
  <div :id="containerId" v-if="downloaded" />
  <div class="placeholder" v-else>로딩 중 ...</div>
</template>

<script>
import game from '../game/game'

export default {
  name: 'Game',
  data() {
    return {
      downloaded: false,
      gameInstance: null,
      containerId: 'game-container'
    }
  },
  mounted() {
    this.downloaded = true
    this.$nextTick(() => {
      this.gameInstance = new game(this.containerId)
      // this.gameInstance: Phaser.Game
    })
    this.$nextTick(() => {
      this.gameInstance.create()
    })
  },
  async beforeUnmount() {
    console.log('before unmount')
    await this.gameInstance.destroy() 
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
