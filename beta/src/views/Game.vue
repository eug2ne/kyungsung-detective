<template>
  <div id="game">
    <div ref="game-container" id="game-container" class="contents" />
  </div>
</template>

<script>
import { auth } from '../firestoreDB'
import { useGameStore } from '../game/game'
import game from '../game/game'

export default {
  name: 'Game',
  props: ['progress'],
  data() {
    return {
      gameInstance: null
    }
  },
  mounted() {
    // page reload >> redirect to Home.vue to refresh user-auth
    if (!auth.currentUser) {
      this.$router.replace('/')
      return
    }

    this.$nextTick(() => {
      this.gameInstance = new game('game-container')
      this.gameInstance.create()
    })

    useGameStore().$subscribe((mutation, state) => {
      if (mutation.payload.progress) {
        // progress-event
        setTimeout(() => {
          this.gameInstance.progress(state.progress.id)
        }, 3000)
      }
    })
  },
  beforeUnmount() {
    if (!this.gameInstance) return

    this.gameInstance.destroy()
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
