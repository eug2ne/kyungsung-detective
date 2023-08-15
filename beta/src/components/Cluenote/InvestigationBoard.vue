<template>
  <div id="investigation-board" class="board pixel-borders--1">
    <div v-if="!this.investigationData" class="notice">
      추가된 단서가 없습니다.
    </div>
    <div v-else>
      <!-- investigation-scope board -->
      <button id="investigation-scope-button" class="pixel-borders--2" v-if="this.investigationData.i_scope"
        :class="{ open: this.scope_open, close: !this.scope_open }"
        @click="this.scope_open = !this.scope_open">
        {{ this.scope_open ? '>>' : '<<' }}
      </button>
      <button id="investigation-verification-button" class="pixel-borders--2" v-if="this.investigationData.i_scope"
        :class="{ open: this.scope_open, close: !this.scope_open }" @click="verifyInvestigation">
        사건입증 
      </button>
      <div id="investigation-scope" class="board pixel-borders--1" v-if="this.investigationData.i_scope"
        :class="{ open: this.scope_open, close: !this.scope_open }">
        <div class="scope" @drop.prevent="dropSubclue($event, scope.scope)" @dragover.prevent @dragenter.prevent
          v-for="scope in this.investigationData.i_scope" :key="scope.id">
          <h3 class="title">{{ scope.scope }}</h3>
          <div class="group">
            <div class="subclue minimized" v-for="clue in scope.evidence" :key="clue.id"
              draggable="true" @dragstart="dragSubclue($event, clue)">
              <span @click="deleteSubclue(clue, scope.scope)" class="x-button minimized">x</span>
              <h3 class="title minimized">{{ clue.title }}</h3>
              <p class="description minimized">{{ clue.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- timeline -->
      <div class="wrapper timeline">
        <div class="event">
          <h3 class="title">???</h3>
          <p class="description">????? ?????</p>
        </div>
      </div>

      <!-- clues -->
      <Clue v-for="clue_key in Object.keys(this.investigationData.clues)" :key="clue_key.id"
        :clue="this.investigationData.clues[clue_key]" />
    </div>
  </div>
</template>
<script>
import { useGameStore } from '@/game/game'
import Clue from './Clue.vue'
import TimelineEvent from './TimelineEvent.vue'

export default {
  name: 'InvestigationBoard',
  props: [ 'investigationData' ],
  components: { TimelineEvent, Clue },
  data() {
    return {
      scope_open: true
    }
  },
  methods: {
    dropSubclue(e, scope) {
      const subclueIndex = e.dataTransfer.getData('subclueIndex')
      const clueIndex = e.dataTransfer.getData('clueIndex')
      const clue = this.investigationData.clues[clueIndex].subClues[subclueIndex]

      // check for duplicate subclue
      const i = this.investigationData.i_scope.find(ele => ele.scope === scope)
        .evidence.findIndex(ele => ele.index == subclueIndex&&ele.c_index == clueIndex)

      if (i === -1) {
        // add subclue to i_scope
        this.investigationData.i_scope.find(ele => ele.scope === scope)
          .evidence.push(clue)
      } else {
        // update subclue
        this.investigationData.i_scope.find(ele => ele.scope === scope)
          .evidence[i] = clue
      }
    },
    dragSubclue(e, subclue) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('subclueIndex', subclue.index)
      e.dataTransfer.setData('clueIndex', subclue.c_index)
    },
    deleteSubclue(subclue, scope) {
      // delete subclue from i_scope
      const i = this.investigationData.i_scope.findIndex(ele => ele.index === subclue.index&&ele.c_index === ele.subclue)
      this.investigationData.i_scope.find(ele => ele.scope === scope).evidence.splice(i, 1)
    },
    verifyInvestigation() {
      // emit verification event
      useGameStore().$patch({ progress: { id: 'verification', message: '사건을 입증하러 갑니다...', data: this.investigationData.i_scope } })
    }
  }
}
</script>
<style>
#investigation-board {
  top: 130px;
  width: 1210px;
  height: 630px;
  padding: 10px; 
}

#investigation-scope {
  right: 0px;
  width: 300px;
  height: 600px;
  padding: 5px;
  border-right: none;
  background: transparent;
  z-index: 100;
}

#investigation-scope.close {
  display: none;
}

#investigation-scope-button {
  position: absolute;
  top: 5%;
  height: 45px;
  margin-right: -3px;
  padding: 0px 5px;
  font-size: 50px;
  text-align: right;
  color: white;
  text-shadow: -3px 0 #000;
  background-color: #a2e1e6;
  border-right: none;
  border-width: 2px;
  border-radius: 10px;
  z-index: 100;
}

#investigation-verification-button {
  position: absolute;
  top: 15%;
  width: 40px;
  height: 120px;
  padding: 5px;
  color: white;
  font-size: 20px;
  line-height: 120%;
  writing-mode: vertical-rl;
  vertical-align: middle;
  border-radius: 20px 0 0 20px;
  border-right: none;
  background-color: #5d9beb;
  z-index: 100;
}

.open {
  right: 300px
}

.close {
  right: 0px
}

.notice {
  text-align: center;
  line-height: 460px;
  font-size: 25px;
}

.scope {
  width: 270px;
  min-height: 400px;
  height: fit-content;
  margin-top: 0;
  margin-bottom: 10px;
  padding: 5px;
  background-color: #80808078;
}

.clue {
  background-color: #bce2e5;
}

.subclue {
  display: block;
  position: relative;
  width: 350px;
  min-height: 200px;
  height: fit-content;
  padding: 20px;
  margin: 15px 0 0 15px;
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.4), -20px -5px 0 rgba(255, 255, 255, 0.4) inset,
    -5px -5px 5px rgba(0, 0, 0, 0.2);
}

.subclue.minimized {
  width: 260px;
  min-height: 260px;
  padding: 10px;
  margin: 5px 0;
  background: white;
}

.title.minimized {
  font-size: 20px;
}

.description.minimized {
  font-size: 15px;
}

.x-button.minimized {
  margin: 0 10px 5px;
  padding: 0;
  font-size: 25px;
  color: grey;
  text-shadow: none;
}
</style>