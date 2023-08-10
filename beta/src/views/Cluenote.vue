<template>
  <Suspense>
    <CluenoteNavbar @emitInvestigation="showInvestigation" />
    <template #fallback>
      <p>단서노트 정보를 불러오고 있습니다...</p>
    </template>
  </Suspense>

  <InvestigationBoard :investigationData="this.investigationData" />
  <div class="invisible-behind"></div>
</template>

<script>
import CluenoteNavbar from '@/components/Cluenote/Cluenote.Navbar.vue'
import InvestigationBoard from '@/components/Cluenote/InvestigationBoard.vue';
import Clue from '@/components/Cluenote/Clue.vue'

export default {
  name: 'Cluenote',
  props: ['progress'],
  components: { CluenoteNavbar, InvestigationBoard, Clue },
  data() {
    return {
      investigationData: null
    }
  },
  methods: {
    showInvestigation(i_data) {
      this.investigationData = i_data
    }
  }
};
</script>

<style>
.invisible-behind {
  height: 760px;
}

#cluenote-navbar {
  position: absolute;
  top: 0;
  width: 1210px;
  min-height: 100px;
  margin-bottom: 10px;
  padding-top: 10px;
  overflow-x: hidden;
  scrollbar-width: none;
}

#timeline::-webkit-scrollbar {
  display: none;
}

.board {
  position: absolute;
  display: inline-block;
  overflow: scroll;
  scrollbar-width: none;
  background-color: #ffff;
}

.board::-webkit-scrollbar {
  display: none;
}

.wrapper {
  display: flex;
  flex-direction: row;
}

.shift-back {
  margin-top: -5px;
  z-index: 0;
}

.shift-front {
  align-self: flex-end;
  margin-top: 5px;
  z-index: 10;
}

.focus {
  position: relative;
  align-self: flex-end;
  z-index: 20;
}
</style>