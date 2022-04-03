<template>
  <ul id="timeline">
    <button
      @click="showClue(story)"
      class="story pixel-borders--2"
      v-for="story in cluelist"
      :key="story.id"
      type="button"
    >
      {{ story.story }}
    </button>
  </ul>

  <div id="clue-board" class="pixel-borders--1">
    <div v-if="!this.show.length" class="notice">
      버튼을 눌러 단서를 확인하세요.
    </div>
    <div v-else class="clue" v-for="clue in this.show" :key="clue.id">
      <div class="cluewrapper" v-if="clue.achieve">
        <h3>{{ clue.title }}</h3>
        <p>
          <a v-if="clue.a" :href="clue.a">{{ clue.descript }}</a>
        </p>
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
  <div class="invisible-behind"></div>
</template>

<script>
import { ref } from 'vue'
import cluelist from '../assets/cluelist.json'

export default {
  data() {
    return {
      show: ref([])
    };
  },
  methods: {
    showClue(story) {
      this.show = story.clues
    },
  },
};
</script>

<style scoped>
body {
  display: flex;
  flex-direction: row;
}

.invisible-behind {
  height: 600px;
}

#timeline {
  width: 150px;
  display: inline-block;
  position: relative;
  left: 60px;
  float: left;
}

#timeline button {
  font-family: "NeoDunggeunmo";
  font-size: 27px;
  width: 150px;
  cursor: pointer;
  display: block;
  text-align: center;
  margin: 30px 0;
  background: #ad2f1f;
  padding: 15px;
  box-shadow: 0 5px 0 rgba(0, 0, 0, 0.4), 0 5px 0 rgba(255, 255, 255, 0.4) inset,
    0 -5px 0 rgba(0, 0, 0, 0.2) inset, 0 0 0 75px #ff7d6c inset;
  border-radius: 5px;
}

#timeline button:focus {
  box-shadow: none;
  box-shadow: 0 5px 0 rgba(255, 255, 255, 0.4) inset,
    0 -5px 0 rgba(0, 0, 0, 0.2) inset, 0 0 0 75px #ff7d6c inset;
  position: relative;
  bottom: -5px;
}

#clue-board {
  width: 650px;
  height: 500px;
  padding: 20px;
  display: inline-block;
  position: relative;
  right: 30px;
  float: right;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.4) inset;
  border-radius: 0;
}

.clue {
  display: block;
}

.notice {
  text-align: center;
  line-height: 460px;
  font-size: 20px;
}

h3 {
  font-size: 25px;
}

p {
  font-size: 18px;
  color: #419dbe;
  margin-bottom: 20px;
}
</style>