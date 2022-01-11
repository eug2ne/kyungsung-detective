<template>
  <ul id="timeline">
    <li @click="showClue(story)" class="story" v-for="story in cluelist" :key="story.id">
      {{ story.story }}
    </li>
  </ul>

  <div id="clue-board">
    <div class="clue" v-for="clue in this.show" :key="clue.id">
      <div class="cluewrapper" v-if="clue.achieve">
        <h3>{{ clue.title }}</h3>
        <p><a v-if="clue.a" :href="clue.a">{{ clue.descript }}</a></p>
      </div>

      <div class="cluewrapper" v-else>
        <h3>아직 얻지못한 단서입니다</h3>
      </div>

      <div class="subclue" v-for="subclue in clue.subclue" :key="subclue.id">
        <div class="subcluewrapper" v-if="subclue.achieve">
          <h3>{{ subclue.title }}</h3>
          <p>{{ subclue.descript }}</p>
        </div>

        <div class="subcluewrapper" v-else>
          <h3>아직 잠겨있습니다</h3>
          <p>
            <router-link :to="subclue.link">
              퍼즐 풀고 단서 얻으러가기
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  data() {
    return {
      cluelist: ref([]),
      show: ref([])
    }
  },
  beforeMount() {
    // fetch('http://localhost:3000/cluelist')
    //   .then(response => response.json())
    //   .then(data => this.cluelist = data)
    //   .catch(error => console.log(error.message))
  },
  methods: {
    showClue(story) {
      this.show = story.clues
    }
  }
}
</script>

<style scoped>
ul#timeline {
  width: 150px;
  display: inline-block;
}

div#clue-board {
  width: 400px;
  height: 500px;
  display: inline-block;
}

div.clue {
  width: 250px;
  height: 200px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
</style>