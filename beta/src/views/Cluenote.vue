<template>
  <Suspense>
    <CluenoteNavbar @emitInvestigation="showInvestigation" />
    <template #fallback>
      <p>단서노트 정보를 불러오고 있습니다...</p>
    </template>
  </Suspense>

  <button id="investigation-verification-button" class="pixel-borders--2" v-if="this.investigationData&&this.investigationData.i_scope"
    @click="verifyInvestigation">
    사건입증 
  </button>
  <InvestigationBoard :investigationData="this.investigationData" />

  <div class="invisible-behind"></div>
</template>

<script>
import { useGameStore } from '@/game/game'
import CluenoteNavbar from '@/components/Cluenote/Cluenote.Navbar.vue'
import InvestigationBoard from '@/components/Cluenote/Investigation.Board.vue';
import InvestigationScope from '@/components/Cluenote/Investigation.Scope.vue'
import Clue from '@/components/Cluenote/Clue.vue'

export default {
  name: 'Cluenote',
  props: ['progress'],
  components: { CluenoteNavbar, InvestigationBoard, InvestigationScope, Clue },
  data() {
    return {
      investigationData: null
    }
  },
  methods: {
    showInvestigation(i_data) {
      this.investigationData = i_data
    },
    verifyInvestigation() {
      // check stage-key + investigationData.index
      if ((this.investigationData.index === 1&&useGameStore().stage.key != 'Test2Stage')
      ||this.investigationData.index === 2&&useGameStore().stage.key != 'Test3Stage') return

      // emit verification event
      useGameStore().$patch({ progress: { id: 'verification', message: '사건을 입증하러 갑니다...', route: this.investigationData.index } })
    }
  }
};
</script>

<style>
.invisible-behind {
  height: 800px;
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

#investigation-verification-button {
  position: absolute;
  top: 120px;
  right: 0;
  width: 120px;
  height: 40px;
  padding: 5px;
  color: white;
  font-size: 20px;
  line-height: 120%;
  border-radius: 20px 20px 0 0;
  border-bottom: none;
  background-color: #5d9beb;
  box-shadow: 0 -5px 0 inset rgba(0, 0, 0, 0.5), -5px -5px 0 rgba(0, 0, 0, 0.2);
}

.board {
  position: absolute;
  display: inline-block;
  overflow: scroll;
  background-color: #ffff;
  scrollbar-width: 0px;
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