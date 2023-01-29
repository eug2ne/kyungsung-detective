<template>
  <div id="router-view" class="pixel-borders--1">
    <Navbar @toContent="changeContent" />
    <div class="contents">
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
import { useGameStore } from '../game/game'
import Navbar from '../components/Navbar.vue'
import Game from './Game.vue'
import Inventory from './Inventory.vue'
import Cluenote from './Cluenote.vue'
import Quiz from './Quiz.vue'

export default {
  name: 'Main',
  components: { Navbar, Game, Inventory, Cluenote, Quiz },
  data() {
    return {
      showContent: {
        game: true,
        inventory: false,
        cluenote: false,
        quiz: false
      },
      progress: null
    }
  },
  methods: {
    changeContent(content) {
      this.showContent.game = false
      this.showContent.inventory = false
      this.showContent.cluenote = false
      this.showContent.quiz = false

      this.showContent[content] = true
    }
  },
  mounted() {
    useGameStore().$subscribe((mutation, state) => {
      if (!mutation.payload) return // ignore other events

      if (mutation.payload.quiz_id) {
        // redirect to Quiz.vue
        this.changeContent('quiz')
      } else if (mutation.payload.progress) {
        this.progress = _.cloneDeep(mutation.payload.progress)
        // redirect to Cluenote.vue
        this.changeContent('cluenote')

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
nav {
  position: sticky;
  width: calc(935px + 50px);
  height: 80px;
  display: flex;
  margin: 15px 0 0 0;
  z-index: 1;
}

.contents {
  margin-top: 10px;
}

.icon {
  margin: 15px;
  width: 50px;
  height: 50px;
}

.between-box {
  flex-grow: 1;
}

.invisible-box {
  width: 25px;
  height: 80px;
}

ul {
  align-self: flex-end;
  display: flex;
  align-items: flex-end;
}

li {
  padding: 0;
}

p {
  color: white;
  text-shadow: 2px 2px #000;
  padding: 0 20px;
  background: hsl(0, 0%, 60%);
  border-radius: 24px 24px 0 0;
  border-width: 5px;
  border-bottom: none;
  line-height: 70px;
  position: relative;
  bottom: 5px;
  right: 5px;
  font-size: 28px;
}

p:hover {
  color: black;
  text-shadow: 2px 2px rgba(255, 255, 255, 0.7);
  background: white;
  line-height: 75px;
  position: relative;
  bottom: 0;
  font-size: 28px;
}
</style>