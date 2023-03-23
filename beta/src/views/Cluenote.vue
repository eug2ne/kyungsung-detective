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
    <div v-if="!this.show[0]" class="notice">
      버튼을 눌러 단서를 확인하세요.
    </div>
    <div class="clue-wrapper" v-else v-for="clue_id in Object.keys(this.show)" :key="clue_id.id">
      <Clue :clue="this.show[clue_id]" :requires="this.requires"/>
    </div>
  </div>
  <div class="invisible-behind"></div>
</template>

<script>
import { ref } from 'vue'
import { auth, db } from '../firestoreDB'
import { collection, doc, getDoc } from 'firebase/firestore'
import Clue from '@/components/Cluenote/Clue.vue'

export default {
  name: 'Cluenote',
  props: ['progress'],
  components: { Clue },
  data() {
    return {
      show: ref({})
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

      // this.show = { 0:{/Clue/}, 1:{/Clue/}, ... }
      // for (let clue of Object.values(this.show)) {
      //   if (!clue) continue

      //   if (!clue.subClues[0]) continue
      //   for (let subclue_group of Object.values(clue.subClues)) {
      //     console.log(subclue_group)
      //     for (let subclue of subclue_group) {
      //       if (!subclue.quiz_id) {
      //         subclue.get = subclue.reveal
      //       } else {
      //         subclue.get = this.requires[subclue.quiz_id]
      //       }
      //     }
      //   }
      // }
    }
  },
  updated() {
    if (Object.keys(this.cluelist).length > 0) {
      if (this.progress) {
        // show accomplished-clue
        const story = this.progress.route.split('.')[0]
        console.log(story)
        this.showClue(story)
      }
    }
  }
};
</script>

<style>
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
  text-align: left;
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
  width: 820px;
  height: 600px;
  padding: 20px;
  display: inline-block;
  position: absolute;
  right: 10px;
  border-radius: 0;
  overflow: scroll;
  background-color: #ffff;
}

.notice {
  text-align: center;
  line-height: 460px;
  font-size: 20px;
}

.clue-wrapper {
  position: relative;
  width: 770px;
  height: fit-content;
  margin-bottom: 30px;
  padding: 10px;
  border-style: solid;
  border-width: 3px;
  border-radius: 2px;
  border-color: #e6c4a2;
  border-image-slice: 4;
  border-image-width: 2;
  border-image-outset: 0;
  border-image-source: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12'><path d='M2 2h2v2H2zM4 0h2v2H4zM10 4h2v2h-2zM0 4h2v2H0zM6 0h2v2H6zM8 2h2v2H8zM8 8h2v2H8zM6 10h2v2H6zM0 6h2v2H0zM10 6h2v2h-2zM4 10h2v2H4zM2 8h2v2H2z' fill='%23e6c4a2' /></svg>");
}
</style>