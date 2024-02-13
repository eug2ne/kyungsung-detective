<template>
  <div id="game">
    <div ref="game-container" id="game-container" /> 
  </div>
</template>

<script>
import { auth, db } from '../firestoreDB'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import game, { useGameStore } from '../game/game'

export default {
  name: 'Game',
  props: ['progress'],
  data() {
    return {
      gameInstance: null
    }
  },
  mounted() {
    // page reload
    if (!auth.currentUser) {
      // redirect to Home.vue to refresh user-auth
      this.$router.replace('/')
      return
    }

    this.$nextTick(() => {
      this.gameInstance = new game('game-container')
      this.gameInstance.create()
    })

    useGameStore().$subscribe((mutation, state) => {
      if (!mutation.payload) return // ignore other events

      if (mutation.payload.stage) {
        // watch stage-config change >> save game-progress to db
        useGameStore().saveAuto(this.gameInstance.key, '시작')
      } else if (mutation.payload.progress) {
        if (!mutation.payload.progress.id) return
        // watch quiz-progress event
        setTimeout(() => {
          this.gameInstance.progress(state.progress.id)
        }, 3000)
      }
    })

    // reload page
    this.emitter.on('reload', async () => {
      this.$router.go()
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
