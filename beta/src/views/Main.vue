<template>
  <div id="router-view" class="pixel-borders--1">
    <Navbar @showMap="this.showGCQ('map')" @showCluenote="this.showGCQ('cluenote')" @showQuiz="this.showGCQ('quiz')"/>
    <div class="contents">
      <Game v-show="this.show&&this.showGame" :progress="progress"/>
      <Cluenote v-if="this.show&&this.showCluenote" @subclueQuiz="setQuizID" @clueProgress="openGame"/>
      <Quiz v-if="this.show&&this.showQuiz" @stageProgress="openCluenote" :_quiz_id="_quiz_id"/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Game from './Game.vue'
import Cluenote from './Cluenote.vue'
import Quiz from './Quiz.vue'

export default {
  name: 'Main',
  components: { Navbar, Game, Cluenote, Quiz },
  data() {
    return {
      showGame: true,
      showCluenote: false,
      showQuiz: false,
      _quiz_id: 'default',
      progress: ''
    }
  },
  computed: {
    show() {
      if (this.$route.path == '/Game') {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    showGCQ(name) {
      this.$router.push('/Game') // set router-route to /Game

      switch (name) {
        case 'map':
          this.showGame = true
          this.showCluenote = false
          this.showQuiz = false
          break

        case 'cluenote':
          this.showGame = false
          this.showCluenote = true
          this.showQuiz = false
          break

        case 'quiz':
          this.showGame = false
          this.showCluenote = false
          this.showQuiz = true
          break
      }
    },
    setQuizID(quiz_id) {
      this._quiz_id = quiz_id
      this.showCluenote = false
      this.showQuiz = true
    },
    openCluenote(story) {
      this.showQuiz = false
      this.showCluenote = true // switch to Cluenote

      setTimeout(() => {
        this.emitter.emit('clueAccomplish', story)
      }, 1000)
    },
    openGame(story) {
      this.showCluenote = false
      this.showGame = true // switch to Game

      this.progress = story
    }
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