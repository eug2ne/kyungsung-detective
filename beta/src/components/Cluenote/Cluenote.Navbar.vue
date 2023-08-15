<template>
  <span class="float scroll-arrow left"
    @mouseenter.prevent="startScroll(-5)"
    @mouseleave.prevent="stopScroll"
    v-show="this.showArrow_left">
    {{ '<' }}
  </span>
  <nav id="cluenote-navbar" ref="navbar">
    <span style="position: relative">
      <ul class="wrapper" style="padding-left: 20px" ref="storyWrapper">
        <li class="index" @click="clickStory(storyKey, $event)" @hover.stop.prevent
          v-for="storyKey, index in Object.keys(this.cluenoteData)" :key="storyKey.id"
          :class="{ focus: this.showstoryKey === storyKey, 'shift-back': index%2===0, 'shift-front': index%2===1 }"
        >
          <button class="story pixel-borders--2"
            :class="{ focus: this.showstoryKey === storyKey }"
          >
            {{ storyKey }}
          </button>
        </li>
        <li class="index" @click="clickStory(undefined, $event)" @hover.stop.prevent
          v-for="n in 16 - Object.keys(this.cluenoteData).length" :key="n.id"
          :class="{
              'shift-back': Object.keys(this.cluenoteData).length%2===0 ? n%2===1 : n%2===0,
              'shift-front': Object.keys(this.cluenoteData).length%2===0 ? n%2===0 : n%2===1
            }"
        >
          <button class="story pixel-borders--2">
            ???
          </button>
        </li>
      </ul>
      <ul class="wrapper focus" ref="investigationWrapper" v-if="this.showstoryKey">
        <li class="index" @click="clickInvestigation(i, $event)" @hover.stop.prevent
          v-for="i in Object.keys(this.cluenoteData[this.showstoryKey])" :key="i.id"
          :class="{ 'shift-back': i%2===0, 'shift-front': i%2===1 }"
        >
          <button class="investigation pixel-borders--2" v-if="this.cluenoteData[this.showstoryKey][i]"
            :class="{ focus: this.showinvestigationIndex === i }">
            <p style="overflow: hidden;white-space: nowrap;">
              {{ this.cluenoteData[this.showstoryKey][i].title }}
            </p>
            <p v-if="this.showinvestigationIndex ===i" style="color: white">
              : {{ this.cluenoteData[this.showstoryKey][i].description }}
            </p>
          </button>
          <button class="investigation pixel-borders--2" v-else>
            ?????
          </button>
        </li>
      </ul>
    </span>
  </nav>
  <p v-if="!this.showstoryKey" style="position: absolute;top: 70px;left: 15px;margin: 10px 10px;">
    조사할 사건을 골라주세요.
  </p>
  <span class="float scroll-arrow right"
    @mouseenter.prevent="startScroll(5)"
    @mouseleave.prevent="stopScroll"
    v-show="this.showArrow_right">
    {{ '>' }}
  </span>
</template>
<script>
import { ref } from 'vue'
import { collection, doc, getDoc } from 'firebase/firestore'
import { db } from '@/firestoreDB'
import { useGameStore } from '@/game/game'

export default {
  name: 'CluenoteNavbar',
  emits: [ 'emitInvestigation' ],
  async setup() {
    const cluenoteData = ref({})

    // get user_cluelist from user-doc
    try {
      const USER_SLOTS = collection(db, `BetaUsers/${useGameStore().UID}/Games/k_detective_beta/Slots`)
      const AUTO_DOC = doc(USER_SLOTS, 'auto')
      const AUTO_SNAP = await getDoc(AUTO_DOC)

      cluenoteData.value = AUTO_SNAP.data().Clue
    } catch (err) {
      console.log(err)
    }

    return {
      cluenoteData
    }
  },
  data() {
    return {
      showstoryKey: undefined,
      showinvestigationIndex: undefined,
      navbarScroll: 0,
      showArrow_left: false,
      showArrow_right: true,
      intervalId: null
    }
  },
  watch: {
    showArrow_left(newVal) {
      this.showArrow_left = newVal
    },
    showArrow_right(newVal) {
      this.showArrow_right = newVal
    }
  },
  methods: {
    clickStory(key, e) {
      this.showstoryKey = key
      this.showinvestigationIndex = undefined
      // scroll to element
      const t_left = e.target.getBoundingClientRect().left-this.$refs.navbar.getBoundingClientRect().left-40
      this.$refs.navbar.scrollLeft = t_left
      // show scroll-arrow
      const max_scroll = this.$refs.navbar.scrollWidth - this.$refs.navbar.clientWidth
      if (this.$refs.navbar.scrollLeft > 0) {
        this.showArrow_left = true
      } else {
        this.showArrow_left = false
      } // left-arrow

      if (this.$refs.navbar.scrollLeft < max_scroll) {
        this.showArrow_right = true
      } else {
        this.showArrow_right = false
      } // right-arrow

      // reset investigation-data
      this.$emit('emitInvestigation', undefined)
    },
    clickInvestigation(index, e) {
      this.showinvestigationIndex = index
      // scroll to element
      const t_left = e.target.getBoundingClientRect().left-this.$refs.navbar.getBoundingClientRect().left-40
      this.$refs.navbar.scrollLeft = t_left
      // show scroll-arrow
      const max_scroll = this.$refs.navbar.scrollWidth - this.$refs.navbar.clientWidth
      if (this.$refs.navbar.scrollLeft > 0) {
        this.showArrow_left = true
      } else {
        this.showArrow_left = false
      } // left-arrow

      if (this.$refs.navbar.scrollLeft < max_scroll) {
        this.showArrow_right = true
      } else {
        this.showArrow_right = false
      } // right-arrow

      // emit investigation-data
      this.$emit('emitInvestigation', this.cluenoteData[this.showstoryKey][index])
    },
    startScroll(pos) {
      this.intervalId = setInterval(() => {
        this.$refs.navbar.scrollLeft += pos
        
        // show scroll-arrow
        const max_scroll = this.$refs.navbar.scrollWidth - this.$refs.navbar.clientWidth
        if (this.$refs.navbar.scrollLeft > 0) {
          this.showArrow_left = true
        } else {
          this.showArrow_left = false
        } // left-arrow

        if (this.$refs.navbar.scrollLeft < max_scroll) {
          this.showArrow_right = true
        } else {
          this.showArrow_right = false
        } // right-arrow
      })
    },
    stopScroll() {
      clearInterval(this.intervalId)
    }
  }
}
</script>

<style scoped>
.wrapper {
  height: 55px;
  margin-left: 20px;
  padding: 0;
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
  text-overflow: ellipsis;
}

.index:hover, .index:focus {
  margin: 0 20px;
}

.story {
  font-size: 25px;
  height: 49px;
  width: 100px;
  margin-left: -20px;
  padding: 10px 15px;
  background: #ffe38e;
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
  text-align: left;
  border-radius: 15px 15px 0 0;
  border-width: 3px;
  border-bottom: none;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 1), 0 3px 3px rgba(0, 0, 0, 0.3);
}

.story:hover, .story:focus, .story.focus,
.investigation:focus, .investigation:hover, .investigation.focus {
  width: fit-content;
  min-height: 60px;
  height: fit-content;
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

.float {
  z-index: 30;
}

.scroll-arrow {
  position: absolute;
  top: 0;
  width: 25px;
  height: 120px;
  font-size: 40px;
  text-align: center;
  padding-top: 40px;
  background: transparent;
}

.scroll-arrow.left {
  float: left;
  left: 0;
}

.scroll-arrow.left:hover {
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 5px 0 5px rgba(0, 0, 0, 0.5);
}

.scroll-arrow.right {
  float: right;
  right: 0;
}

.scroll-arrow.right:hover {
  background: rgba(0, 0, 0, 0.1);
  box-shadow: -5px 0 5px rgba(0, 0, 0, 0.5);
}
</style>