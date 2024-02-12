<template>
  <span id="scope-button" class="pixel-borders--2" v-if="this.investigationData"
    @click="toggleScope()">
    {{ this.scopeOpen ? '>>' : '<<' }}
  </span>
  <div id="investigation-scope" class="board pixel-borders--1" v-if="this.scopeOpen"
    @scroll.prevent>
    <div class="scope" @drop.prevent="dropContent($event, scope.scope)" @dragover.prevent @dragenter.prevent
      v-for="(scope, index) in this.investigationData.i_scope" :key="scope.id"
      :class="{ 'left': index%2 === 0, 'right': index%2 === 1 }"
      :style="{ 'top': `${50+200*index}px` }">
      <h3 class="title" style="position: sticky; top: 0; z-index: 100;"
        :style="{ 'background-color': index%2 === 0 ? '#00ae9a' : '#fff94c' }">
        {{ scope.scope }}
      </h3>
      <div class="group">
        <div class="subclue minimized" v-for="clue in scope.evidence" :key="clue.id">
          <span @click="deleteSubclue(clue, scope.scope)" class="x-button minimized">x</span>
          <h3 class="title minimized">{{ clue.title }}</h3>
          <p class="description minimized">{{ clue.description }}</p>
        </div>
        <div class="subclue minimized empty pixel-borders--2" v-for="index in 5-scope.evidence.length" :key="index.id">
          <h3 class="title minimized">비어있는 단서 입니다.</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import { mapWritableState } from 'pinia'
import { useGameStore } from '@/game/game'

const STAGE_CLUENOTE_MAP = {
  'Test2Stage': 1,
  'Test3Stage': 2
}
export default {
  name: 'InvestigationScope',
  computed: {
    ...mapWritableState(useGameStore, [ 'stage', 'cluenote' ]),
    investigationData() {
      const CLUENOTE_INDEX = STAGE_CLUENOTE_MAP[this.stage.key]
      return this.cluenote[CLUENOTE_INDEX]
    }
  },
  emits: [ 'toggleScope' ],
  data() {
    return {
      scopeOpen: false
    }
  },
  methods: {
    toggleScope() {
      // toggle scope-open
      this.scopeOpen = !this.scopeOpen
      this.$emit('toggleScope', this.scopeOpen)
    },
    dropContent(e, scope) {
      const subclueIndex = e.dataTransfer.getData('subclueIndex')
      const clueIndex = e.dataTransfer.getData('clueIndex')
      const eventIndex = e.dataTransfer.getData('eventIndex')

      let content = null
      if (subclueIndex === 'undefined') {
        // drop event
        content = this.investigationData.timeline[eventIndex]
      } else if (eventIndex != 'undefined') {
        // drop event.subclue
        content = this.investigationData.timeline[eventIndex].subClues[subclueIndex]
      } else {
        // drop clue.subclue
        content = this.investigationData.clues[clueIndex].subClues[subclueIndex]
      }

      // check for duplicate content
      const i = this.investigationData.i_scope.find(ele => ele.scope === scope)
        .evidence.findIndex(ele => _.isEqual(ele, content))

      if (i === -1) {
        // add content to i_scope
        this.investigationData.i_scope.find(ele => ele.scope === scope)
          .evidence.push(content)
      } else {
        // update subclue
        this.investigationData.i_scope.find(ele => ele.scope === scope)
          .evidence[i] = content
      }
    },
    deleteSubclue(subclue, scope) {
      // delete subclue from i_scope
      const i = this.investigationData.i_scope.find(ele => ele.scope === scope)
        .evidence.findIndex(ele => ele.index === subclue.index&&(ele.c_index === subclue.c_index&&ele.t_index === subclue.t_index))
      this.investigationData.i_scope.find(ele => ele.scope === scope)
        .evidence.splice(i, 1)
    }
  }
}
</script>
<style>
#investigation-scope {
  top: 160px;
  right: 0;
  width: 330px;
  height: 630px;
  margin: 15px;
  padding: 10px;
  background-color: #e9e9d2;
  border-radius: 5px;
  scrollbar-width: 5px;
  z-index: 20;
}

#scope-button {
  position: absolute;
  top: 140px;
  right: 120px;
  padding: 0 20px;
  font-size: 20px;
  background-color: #ebe25d;
  box-shadow: -5px 5px 0 rgba(0, 0, 0, 0.2);
  transform: rotate(90deg);
  z-index: 30;
}

.scope {
  width: 300px;
  height: 300px;
  margin-top: 10px;
  padding: 0 5px 5px 5px;
  overflow-y: scroll;
  scrollbar-width: none;
}

.scope .title {
  margin: 0;
  padding: 5px;
  text-align: center;
}

.scope::-webkit-scrollbar {
  display: none;
}

.left {
  background-color: #00ae9a;
}

.right {
  background-color: #fff94c;
}

.subclue.minimized {
  width: 260px;
  height: fit-content;
  padding: 10px;
  margin: 5px auto;
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

.subclue.empty {
  background-color: transparent;
  opacity: 0.6;
}
</style>