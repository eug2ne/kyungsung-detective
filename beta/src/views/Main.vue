<template>
  <div id="router-view" class="pixel-borders--1">
    <h3 id="progress-message" class="animate__animated animate__flash animate__slower" v-if="this.progress.message">
      {{ this.progress.message }}
    </h3>
    <Navbar @toContent="changeContent" @toggleStageSelect="this.showStageSelect = !this.showStageSelect" />
    <StageSelectPopup v-if="this.showStageSelect" @closeSlotPopup="this.showStageSelect = false" />
    <div class="contents">
      <Game v-show="showContent[0]&&this.$route.path=='/Game'" />
      <Inventory v-if="showContent[1]&&this.$route.path=='/Game'" />
      <Cluenote v-if="showContent[2]&&this.$route.path=='/Game'" :progress="progress" />
      <Quiz v-if="showContent[3]&&this.$route.path=='/Game'" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'pinia'
import { useGameStore } from '../game/game'
import Navbar from '../components/Navbar.vue'
import StageSelectPopup from '@/components/Game/StageSelectPopup.vue'
import EmailPopup from '@/components/Game/EmailPopup.vue'
import Game from './Game.vue'
import Inventory from './Inventory.vue'
import Cluenote from './Cluenote.vue'
import Quiz from './Quiz.vue'

export default {
  name: 'Main',
  components: { Navbar, StageSelectPopup, EmailPopup, Game, Inventory, Cluenote, Quiz },
  data() {
    return {
      showContent: {
        0: true,
        1: false,
        2: false,
        3: false
      },
      nav_pointer: 0, // default show game
      showStageSelect: false
    }
  },
  computed: {
    ...mapState(useGameStore, ['progress', 'game_clear'])
  },
  methods: {
    changeContent() {
      // set route to Main
      if (this.$route.name != 'Main') {
        this.$router.replace('/Game')
      }

      this.showContent[0] = false
      this.showContent[1] = false
      this.showContent[2] = false
      this.showContent[3] = false

      this.showContent[this.nav_pointer] = true
    }
  },
  mounted() {
    useGameStore().$subscribe((mutation) => {
      if (!mutation.payload) return // ignore other events

      if (mutation.payload.puzzle) {
        // redirect to Quiz.vue
        this.nav_pointer = 3
        this.changeContent()
      } else if (mutation.payload.progress) {
        if (mutation.payload.progress.message) {
          setTimeout(() => {
            this.progress.message = null
          }, 3000)
        } else if (mutation.payload.progress.id) {
          // redirect to Game.vue
          setTimeout(() => {
            this.nav_pointer = 0
            this.changeContent()
          }, 3000)
        }
      }
    })
  }
}
</script>

<style scoped>
.contents {
  margin-top: 10px;
}

.between-box {
  flex-grow: 1;
}

.invisible-box {
  width: 25px;
  height: 80px;
}

#progress-message {
  margin: 10px;
  padding: 5px;
  background-color: #b0eeff;
}

h3 {
  text-align: center;
  font-size: 30px;
}
</style>