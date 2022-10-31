<template>
  <ul id="timeline">
    <button
      @click="showClue(story)"
      class="story pixel-borders--2"
      v-for="story in Object.keys(this.cluelist)"
      :key="story.id"
      type="button"
    >
      {{ story }}
    </button>
  </ul>

  <div id="clue-board" class="pixel-borders--1">
    <div v-if="!this.show.length" class="notice">
      버튼을 눌러 단서를 확인하세요.
    </div>
    <div v-else class="clues_wrapper" v-for="clue in this.show" :key="clue.id">
      <div class="clue">
        <h3>{{ clue.title }}</h3>
        <p>
          {{ clue.description }}
        </p>
      </div>

      <div class="subclue" v-for="subclue in clue.subClues" :key="subclue.id">
        <div class="subclue_unlock" v-if="subclue.require">
          <h3>{{ subclue.title }}</h3>
          <p>{{ subclue.description }}</p>
        </div>

        <div class="subclue_lock" v-else>
          <h3>아직 잠겨있습니다</h3>
          <p @click="this.$emit('subclueQuiz', subclue.quiz_id)">
            (퍼즐 풀고 단서 얻으러가기)
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="invisible-behind"></div>
</template>

<script>
import { ref } from 'vue'
import { auth, db } from '../firestoreDB'
import { collection, doc, getDoc } from 'firebase/firestore'

export default {
  data() {
    return {
      show: ref([])
    }
  },
  setup() {
    const cluelist = ref({})
    const requires = ref({})

    const user = auth.currentUser

    // get user_cluelist from db
    const load = async () => {
      const UsersRef = collection(db, 'Users')
      const userRef = doc(UsersRef, user.uid)
      const userSnap = await getDoc(userRef)

      cluelist.value = userSnap.data().Clues
      requires.value = userSnap.data().quiz_accs
    }

    load()

    return {
      cluelist,
      requires
    }
  },
  methods: {
    showClue(story) {
      this.show = this.cluelist[story]

      for (let clue of this.show) {
        for (let subclue of clue.subClues) {
          if (!subclue.quiz_id) {
            subclue.require = true
          } else {
            subclue.require = this.requires[subclue.quiz_id]
          }
        }
      }
    },
  }
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
  display: block;
  position: relative;
  float: left;
  margin-left: 20px;
}

#timeline button {
  font-family: "NeoDunggeunmo";
  font-size: 27px;
  width: 150px;
  cursor: pointer;
  display: block;
  text-align: center;
  margin: 30px 0;
  background: #E4B7AF;
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
  width: 700px;
  height: 600px;
  padding: 20px;
  display: inline-block;
  position: absolute;
  right: 10px;
  border-radius: 0;
  overflow: scroll;
}

.clues_wrapper {
  display: inline-flex;
  flex-direction: row;
  background-color: #FFDFD9;
  border-radius: 5px;
}

.clue {
  min-height: 120px;
  min-width: 380px;
  max-height: 150px;
  max-width: 500px;
  display: block;
  margin: 30px 15px;
  padding: 15px;
  background-color: #FF7D6C;
  box-shadow: 0 5px 0 rgba(0, 0, 0, 0.4), 0 5px 0 rgba(255, 255, 255, 0.4) inset,
    0 -5px 0 rgba(0, 0, 0, 0.2) inset, 0 0 0 75px #ff7d6c inset;
  border-radius: 5px;
}

.subclue_unlock {
  min-height: 120px;
  min-width: 380px;
  max-height: 150px;
  max-width: 500px;
  display: block;
  margin: 40px 15px;
  padding: 10px;
  background-color: #84C0D5;
  box-shadow: 0 5px 0 rgba(0, 0, 0, 0.4), 0 5px 0 rgba(255, 255, 255, 0.4) inset,
    0 -5px 0 rgba(0, 0, 0, 0.2) inset, 0 0 0 75px #84C0D5 inset;
  border-radius: 5px;
}

.subclue_lock {
  height: 120px;
  width: 300px;
  display: block;
  margin: 40px 15px;
  padding: 10px;
  background-color: #84C0D5;
  box-shadow: 0 5px 0 rgba(0, 0, 0, 0.4), 0 5px 0 rgba(255, 255, 255, 0.4) inset,
    0 -5px 0 rgba(0, 0, 0, 0.2) inset, 0 0 0 75px #84C0D5 inset;
  border-radius: 5px;
}

.subclue_lock h3 {
  font-size: 20px;
}

.subclue_lock p {
  cursor: pointer;
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
  color: #3B2F2C;
  margin-bottom: 20px;
}

a {
  color: #275A68;
}
</style>