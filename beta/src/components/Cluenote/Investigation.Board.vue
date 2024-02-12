<template>
  <InvestigationScope v-if="this.investigationData" @toggleScope="toggleBoardWidth" />
  <div id="investigation-board" ref="i_board" class="board pixel-borders--1">
    <div v-if="!this.investigationData" class="notice">
      추가된 단서가 없습니다.
    </div>
    <div v-else>
      <!-- timeline -->
      <Timeline v-if="Object.values(this.investigationData.timeline).length > 0" :timeline="this.investigationData.timeline" />

      <!-- clues -->
      <Clue v-for="clue_key in Object.keys(this.investigationData.clues)" :key="clue_key.id"
        :clue="this.investigationData.clues[clue_key]"
        @hoverSubclue="scrollToSubclue" />
    </div>
  </div>
</template>
<script>
import InvestigationScope from './Investigation.Scope.vue'
import Timeline from './Timeline.vue'
import Clue from './Clue.vue'

export default {
  name: 'InvestigationBoard',
  props: [ 'investigationData' ],
  components: { InvestigationScope, Timeline, Clue },
  data() {
    return {
      scope_open: true
    }
  },
  methods: {
    scrollToSubclue(t_left, t_top) {
      // BUG : CURRENTLY SCROLL NOT WORKING

      // const left = t_left-this.$refs.i_board.getBoundingClientRect().left+350
      // const top = t_top-this.$refs.i_board.getBoundingClientRect().top

      // const max_scroll_x = this.$refs.i_board.scrollWidth - this.$refs.i_board.clientWidth
      // const max_scroll_y = this.$refs.i_board.scrollHeight- this.$refs.i_board.clientHeight
      
      // this.$refs.i_board.scrollLeft = left/1210*max_scroll_x
      // this.$refs.i_board.scrollTop = top/630*max_scroll_y
    },
    toggleBoardWidth(open) {
      if (open) {
        this.$refs.i_board.style.width = '900px'
      } else {
        this.$refs.i_board.style.width = '1210px'
      }
    }
  }
}
</script>
<style>
#investigation-board {
  top: 160px;
  width: 1210px;
  height: 630px;
  padding: 10px;
  background-color: white;
  scroll-behavior: smooth;
}

.notice {
  text-align: center;
  line-height: 460px;
  font-size: 25px;
}

.background {
  min-height: 250px;
  margin: 10px 0 0 30px;
  background-color: #fff0df;
  transition: rotate 0.5s ease;
}

.background:hover {
  min-height: 300px;
  align-self: center;
  justify-self: center;
  border: 5px solid white;
  rotate: 0deg;
  z-index: 10;
}

.clue {
  background-color: #bce2e5;
}

.subclue {
  display: block;
  position: relative;
  width: 400px;
  min-height: 200px;
  height: fit-content;
  padding: 20px;
  margin: 15px 0 0 15px;
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.4), -20px -5px 0 rgba(255, 255, 255, 0.4) inset,
    -5px -5px 5px rgba(0, 0, 0, 0.2);
}

.rotateLeft {
  rotate: -5deg;
  align-self: flex-start;
}

.rotateRight {
  rotate: 5deg;
  align-self: flex-end;
}
</style>