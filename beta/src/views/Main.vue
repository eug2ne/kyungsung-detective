<template>
  <div id="router-view" class="pixel-borders--1">
    <Navbar @toContent="changeContent" />
    <div class="contents">
      <EmailPopup v-if="game_clear"/>
      <Game v-show="showContent.game&&this.$route.path=='/Game'" />
      <Inventory v-if="showContent.inventory&&this.$route.path=='/Game'" />
      <Cluenote v-if="showContent.cluenote&&this.$route.path=='/Game'" :progress="progress" />
      <Quiz v-if="showContent.quiz&&this.$route.path=='/Game'" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'pinia'
import { useGameStore } from '../game/game'
import Navbar from '../components/Navbar.vue'
import EmailPopup from '@/components/Game/EmailPopup.vue'
import Game from './Game.vue'
import Inventory from './Inventory.vue'
import Cluenote from './Cluenote.vue'
import Quiz from './Quiz.vue'

export default {
  name: 'Main',
  components: { Navbar, EmailPopup, Game, Inventory, Cluenote, Quiz },
  data() {
    return {
      showContent: {
        game: true,
        inventory: false,
        cluenote: false,
        quiz: false
      }
    }
  },
  computed: {
    ...mapState(useGameStore, ['progress', 'game_clear'])
  },
  methods: {
    changeContent(content) {
      // set route to Main
      if (this.$route.name != 'Main') {
        this.$router.replace('/Game')
      }

      this.showContent.game = false
      this.showContent.inventory = false
      this.showContent.cluenote = false
      this.showContent.quiz = false

      this.showContent[content] = true
    }
  },
  mounted() {
    useGameStore().$subscribe((mutation) => {
      if (!mutation.payload) return // ignore other events

      if (mutation.payload.quiz) {
        // redirect to Quiz.vue
        this.changeContent('quiz')
      } else if (mutation.payload.progress) {
        // redirect to Game.vue
        setTimeout(() => {
          this.changeContent('game')
        }, 3000)
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
</style>