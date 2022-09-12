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
          <p>
            <router-link v-if="subclue.quiz_id" :to="{ name: 'Quiz', params: { quiz_id: subclue.quiz_id } }">
              (퍼즐 풀고 단서 얻으러가기)
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
import { auth, db } from '../firestoreDB'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'

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
      requires.value = userSnap.data().requires
    }

    load()

    return {
      cluelist
    }
  },
  methods: {
    showClue(story) {
      this.show = this.cluelist[story]

      const load = async (subclue) => {
        if (!subclue.quiz_id) {
          subclue.require = true
        } else {
          subclue.require = userSnap.data().quiz_accs[subclue.quiz_id]
          await updateDoc(userRef, {
            present_id: subclue.quiz_id
          })
        }
      }

      for (let clue in this.cluelist) {
        for (let subclue in clue.subClues) {
          load(subclue)
        }
      }
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
  right: 30px;
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
  height: 120px;
  width: 300px;
  display: block;
  margin: 30px 15px;
  padding: 15px;
  background-color: #FF7D6C;
  box-shadow: 0 5px 0 rgba(0, 0, 0, 0.4), 0 5px 0 rgba(255, 255, 255, 0.4) inset,
    0 -5px 0 rgba(0, 0, 0, 0.2) inset, 0 0 0 75px #ff7d6c inset;
  border-radius: 5px;
}

.subclue_unlock {
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