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
    <div v-else class="clue" v-for="clue in this.show" :key="clue.id">
      <div class="cluewrapper">
        <h3>{{ clue.title }}</h3>
        <p>
          {{ clue.description }}
          <router-link v-if="clue.quiz_id" :to="{ path: '/Map/Quiz', params: { quiz_id: clue.quiz_id } }">(단서 해결하러 가기)</router-link>
        </p>
      </div>

      <div class="subclue" v-for="subclue in clue.subClues" :key="subclue.id">
        <div class="subcluewrapper" v-if="subclue.require">
          <h3>{{ subclue.title }}</h3>
          <p>{{ subclue.descript }}</p>
        </div>

        <div class="subcluewrapper" v-else>
          <h3>아직 잠겨있습니다</h3>
          <p>
            <router-link :to="{ path: '/Map/Quiz', params: { quiz_id: clue.quiz_id } }">
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
import { auth, db } from '../firestoreDB'
import { collection, doc, getDoc } from 'firebase/firestore';

export default {
  data() {
    return {
      show: ref([])
    }
  },
  setup() {
    const cluelist = ref({})

    const user = auth.currentUser

    // get user_cluelist from db
    const load = async () => {
      const UsersRef = collection(db, 'Users')
      const userRef = doc(UsersRef, user.uid)
      const userSnap = await getDoc(userRef)

      cluelist.value = userSnap.data().clues
    }

    load()

    return {
      cluelist
    }
  },
  methods: {
    showClue(story) {
      this.show = this.cluelist[story]
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