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
      <Clue :clue="this.show[clue_id]" />
    </div>
  </div>
  <div class="invisible-behind"></div>
</template>

<script>
import { ref } from 'vue'
import { db } from '../firestoreDB'
import { collection,doc, getDoc } from 'firebase/firestore'
import { useGameStore } from '../game/game'
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

    // get user_cluelist from user-doc
    const load = async (gameKey) => {
      const USER_SLOTS = collection(db, `BetaUsers/${useGameStore().UID}/Games/${gameKey}/Slots`)
      const AUTO_DOC = doc(USER_SLOTS, 'auto')
      const AUTO_SNAP = await getDoc(AUTO_DOC)

      cluelist.value = AUTO_SNAP.data().Clue
    }

    load('k_detective_beta')

    return {
      cluelist
    }
  },
  methods: {
    showClue(story) {
      this.show = this.cluelist[story]
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