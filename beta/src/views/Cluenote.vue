<template>
  <nav id="timeline">
    <ul class="wrapper">
      <li class="index" @click="this.story_index = n-1" @hover.stop.prevent
        v-for="n in 10" :key="n.id"
        :class="{ focus: this.story_index === n-1, 'shift-back': n%2===0, 'shift-front': n%2===1 }"
      >
        <button class="story pixel-borders--2"
          v-if="Object.keys(this.cluelist)[n-1]"
          :class="{ focus: this.story_index === n-1 }"
        >
          {{ Object.keys(this.cluelist)[n-1] }}
        </button>
        <button class="story pixel-borders--2" v-else
          :class="{ focus: this.story_index === n-1 }"
        >
          ???
        </button>
      </li>
    </ul>
    <ul class="wrapper focus" v-if="this.i_list">
      <li class="index" @click="this.investigation_index = i" @hover.stop.prevent
        v-for="i in Object.keys(this.i_list)" :key="i.id"
        :class="{ focus: this.investigation_index === i, 'shift-back': i%2===0, 'shift-front': i%2===1 }"
      >
        <button class="investigation pixel-borders--2" v-if="this.i_list[i]"
          :class="{ focus: this.investigation_index === i }">
          <p style="overflow: hidden;white-space: nowrap;">
            {{ this.i_list[i].title }}
          </p>
        </button>
        <button class="investigation pixel-borders--2" v-else
          :class="{ focus: this.investigation_index === i }">
          ?????
        </button>
      </li>
    </ul>
    <p v-else style="margin: 10px 10px;">조사할 사건을 골라주세요.</p>
  </nav>

  <InvestigationBoard />
</template>

<script>
import { ref } from 'vue'
import { db } from '../firestoreDB'
import { collection,doc, getDoc } from 'firebase/firestore'
import { useGameStore } from '../game/game'
import InvestigationBoard from '@/components/Cluenote/InvestigationBoard.vue'

export default {
  name: 'Cluenote',
  props: ['progress'],
  components: { InvestigationBoard },
  computed: {
    i_list() {
      return Object.values(this.cluelist)[this.story_index]
    },
    showInvestigation() {
      return this.i_list[this.investigation_index]
    }
  },
  data() {
    return {
      story_index: undefined,
      investigation_index: undefined
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
      console.log(cluelist.value)
    }

    load('k_detective_beta')

    return {
      cluelist
    }
  },
  methods: {
    clickIndex(n) {
      this.story_index = n
      console.log(this.story_index)
    }
  }
};
</script>

<style scoped>
#timeline {
  position: relative;
  width: 1210px;
  min-height: 100px;
  height: fit-content;
  margin-bottom: 10px;
}

.wrapper {
  display: flex;
  flex-direction: row;
  height: 55px;
  margin-left: 20px;
  padding: 0;
  cursor: none;
  border-bottom: #000000ba 1px solid;
  box-shadow: 20px 0 0 transparent inset;
  white-space: nowrap;
}

.index {
  position: relative;
  font-family: "NeoDunggeunmo";
  text-align: center;
  padding: 0;
  cursor: pointer;
}

.index:hover, .index:focus {
  margin: 0 20px;
}

.shift-back {
  margin-top: -5px;
  z-index: 0;
}

.shift-front {
  margin-top: 5px;
  z-index: 10;
}

.story {
  font-size: 25px;
  height: 49px;
  width: 100px;
  background: #ffe38e;
  margin-left: -20px;
  padding: 10px 15px;
  border-radius: 15px 15px 0 0;
  border-width: 3px;
  border-bottom: none;
  box-shadow: -5px -5px 0 rgba(0, 0, 0, 0.2), 0 -5px 0 rgba(0, 0, 0, 0.2) inset,
    0 1px 0 rgba(0, 0, 0, 1), 0 3px 3px rgba(0, 0, 0, 0.3);
}

.investigation {
  font-size: 20px;
  width: 150px;
  height: 50px;
  margin: 0 20px;
  padding: 5px 10px;
  background: #b1a0d6;
  border-radius: 15px 15px 0 0;
  border-width: 3px;
  border-bottom: none;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 1), 0 3px 3px rgba(0, 0, 0, 0.3);
}

.story:hover, .story:focus, .story.focus,
.investigation:focus, .investigation:hover, .investigation.focus {
  width: fit-content;
  height: 60px;
  background: #d9d9d9;
  box-shadow: 0 -5px 0 rgba(0, 0, 0, 0.2) inset, 0 1px 0 rgba(0, 0, 0, 1);
}

.story:hover, .story:focus, .story.focus {
  min-width: 120px;
}

.investigation:hover, .investigation:focus, .investigation.focus {
  min-width: 150px;
}

.story.focus, .investigation.focus {
  background-color: #e69c9c;
}

.focus {
  position: relative;
  z-index: 20;
}
</style>