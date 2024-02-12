<template>
  <div id="crossword-area" class="contents" style="overflow: hidden;">
    <LetterArea />
    <CrosswordPointer :config="this.cwData.config" @inputLetter="dropLetter" @spaceDown="clickLetter"/>
    <!-- cw-accomplish modal-->
    <div class="popup" id="accs-modal" v-if="this.cwData.config.accomplish">
      <h3 class="title">단서 해결!</h3>
    </div>
    <!-- cw-definition -->
    <div class="definition" v-for="data in this.cwData.data" :key="data.id"
      :style="{
        top: `${data.def_config.config.pos.y*65+40}px`,
        left: `${data.def_config.config.pos.x*65+10}px`,
        width: `${data.def_config.config.width}px`,
        height: `${data.def_config.config.height}px`
      }">
      <h3 class="title">{{ data.id+1 }}</h3>
      <p class="description">{{ data.def_config.definition }}</p>
    </div>
    <!-- merge-bridge -->
    <div v-for="data in this.cwData.data" :key="data.id">
      <div class="merge-bridge" v-for="merge in data.merge_list" :key="merge.id"
        :class="{
          vertical: data.type === 'vertical',
          reverse: getMergebridgeReverse(data, merge)
        }"
        :style="{
          top: `${data.type === 'horizontal'
            ? (getMergebridgeReverse(data, merge) ?  data.config.start_pos.y*65+165 : data.config.start_pos.y*65+50) : getMergebridgeStartPos(data)+parseInt(merge.split(',')[0])*65}px`,
          left: `${data.type === 'vertical'
            ? (getMergebridgeReverse(data, merge) ? data.config.start_pos.x*63-45 : data.config.start_pos.x*65+40 ) : getMergebridgeStartPos(data)+parseInt(merge.split(',')[0])*65}px`
        }"
      >
        <img :src="merge_bridge">
        <button class="merge-button" @click="clickMerge(data, merge)">
          합치기
        </button>
      </div>
    </div>
    <!-- crossword -->
    <table>
      <tr v-for="h in this.height" :key="h.id">
        <td v-for="w in this.width" :key="w.id"
          :class="{
            show: tdShow(w, h),
            fill: tdContent(w, h)&&typeof(tdContent(w, h)) != 'number',
            first: tdFirst(w, h),
            correct: tdCorrect(w, h),
            title: typeof(tdContent(w, h)) === 'number',
            reset: tdContent(w, h) === -1
          }"
          @click="clickLetter(w, h)"
        >
          <img v-if="tdContent(w, h) === -1" :src="reset_img" alt="reset" @click="clickReset($event, w, h)">
          {{ tdContent(w, h) === -1 ? undefined : tdContent(w, h) }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import _ from 'lodash'
import { useGameStore } from '@/game/game'
import { tdShowArray, tdData, showMerge, mergeLetter, deleteLetter, resetCrossWord, checkAnswer } from '@/composables/puzzleengine'
import merge_bridge from '@/assets/merge_bridge.svg'
import reset_img from '@/assets/refresh-page-option.png'
import CrosswordPointer from './CrosswordPointer.vue'
import LetterArea from './LetterArea.vue'

export default {
  name: 'CrosswordArea',
  components: { CrosswordPointer, LetterArea },
  props: [ 'cwData' ],
  data() {
    return {
      merge_bridge: merge_bridge,
      reset_img: reset_img,
      width: 20,
      height: 13,
      getMergebridgeStartPos: (data) => {
        return data.type === 'horizontal' ?
          data.config.start_pos.x*65+20 : (data.config.start_pos.y+1)*65+80
      },
      getMergebridgeReverse: (data, merge) => {
        return data.point.index%2 === 1 ?
          parseInt(merge.split(',')[0]) % 2 === 0 : parseInt(merge.split(',')[0]) % 2 === 1
      }
    }
  },
  created() {
    this.height = this.cwData.config.center.y+this.cwData.config.height.o_bottom+3
  },
  methods: {
    tdShow(w, h) {
      // return td-show
      return tdShowArray(w, h, this.cwData).includes(true)
    },
    tdFirst(w, h) {
      // return td-first
      if (!tdData(w, h, this.cwData)) return

      const { id, td_index } = tdData(w, h, this.cwData)
      return this.cwData.data[id].first_abbr&&td_index === 0
    },
    tdCorrect(w, h) {
      // return td-correct
      if (!tdData(w, h, this.cwData)) return

      const { id, td_index } = tdData(w, h, this.cwData)
      if (td_index === this.cwData.data[id].point.index) {
        const point = this.cwData.data[this.cwData.data[id].point.to]
        // check all data.correct for point
        return this.cwData.data[id].correct||point.correct
      } else {
        return this.cwData.data[id].correct && !(td_index === -1||td_index === this.cwData.data[id].length.c_value)
      }
    },
    tdContent(w, h) {
      // if coord in crossword, return content for td
      // else, return undefined

      if (!this.tdShow(w, h)) return // coord not in crossword, return undefined

      const { id, td_index } = tdData(w, h, this.cwData)
      if (td_index === -1) {
        // td content is crossword title
        return id+1
      } else if (td_index === this.cwData.data[id].length.c_value) {
        // td content is reset button
        return -1
      } else {
        // td content is letter
        return this.cwData.data[id].letter_list[td_index]
      }
    },
    dropLetter(coord, letter) {
      const { x, y } = coord
      // if (this.tdFirst(x+1, y+1)) return // td-first (no interaction)
      const { id, td_index } = tdData(x+1, y+1, this.cwData)
      // if (data.correct) return // td-correct (no interaction)
      if (this.cwData.data[id].correct) return

      // assign letter to letter-list
      this.cwData.data[id].letter_list[td_index] = letter

      // delete merges
      this.cwData.data[id].merge_list.forEach((merge, index) => {
        if (merge.split(',').includes(`${td_index}`)) {
          // delete merge on all restored space
          this.cwData.data[id].merge_list.splice(index, 1)
        }
      })
      // check valid merges
      const valid_merges = showMerge(this.cwData.data[id], td_index)
      // add valid merges to data
      this.cwData.data[id].merge_list = this.cwData.data[id].merge_list.concat(valid_merges)
      
      // check points
      const point = td_index === this.cwData.data[id].point.index
      if (point) {
        // drop letter to point-data
        const { to } = this.cwData.data[id].point
        const p_index = this.cwData.data[to].point.index
        this.cwData.data[to].letter_list[p_index] = letter

        // check merge on point-data
        const valid_merges = showMerge(this.cwData.data[to], p_index)
        this.cwData.data[to].merge_list = this.cwData.data[to].merge_list.concat(valid_merges)
      }

      // check answer
      checkAnswer(this.cwData, id, point)
      if (Object.values(this.cwData.data).every(ele => ele.correct)) {
        console.log('cw accomplish')
        // crossword accomplish
        this.cwData.config.accomplish = true
        this.emitter.emit('cwAccomplish') // emit cw-accomplish event

        setTimeout(() => {
          useGameStore().$patch({ progress: { id: this.cwData.id }})
        }, 500)
      }
    },
    clickLetter(w, h) {
      const { id, td_index } = tdData(w, h, this.cwData)
      // if (data.correct) return // td-correct (no interaction)
      if (this.cwData.data[id].correct) return
      // check point.correct
      const point = this.cwData.data[this.cwData.data[id].point.to]
      if (td_index === this.cwData.data[id].point.index&&point.correct) return

      // delete letter
      deleteLetter(this.cwData, this.cwData.data[id], td_index)
    },
    clickMerge(data, merge) {
      // merge letters
      mergeLetter(this.cwData, data, merge)
      
      // check answer
      checkAnswer(this.cwData, data.id, false)
      if (Object.values(this.cwData.data).every(ele => ele.correct)) {
        // crossword accomplish
        this.cwData.config.accomplish = true
        this.emitter.emit('cwAccomplish') // emit cw-accomplish event

        setTimeout(() => {
          useGameStore().$patch({ progress: { id: this.cwData.id }})
        }, 500)
      }
    },
    clickReset(event, w, h) {
      // rotate reset icon
      event.target.classList.add('rotate')
      setTimeout(() => {
        event.target.classList.remove('rotate')
      }, 1000)

      // reset crossword
      const { id, td_index } = tdData(w, h, this.cwData)
      const data = this.cwData.data[id]
      resetCrossWord(this.cwData, data)
    }
  }
}
</script>

<style scoped>
#crossword-area {
  min-height: 500px;
  margin-top: 20px;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #aeaeae94;
}

#accs-modal {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 300px;
  z-index: 1050;
  top: 100px;
  text-align: left;
  text-shadow: 0 0 0 #ffff;
  background-color: rgb(106, 230, 255);
  padding: 25px;
}

.definition {
  position: absolute;
  margin: 5px 10px;
  transform-origin: center;
  background-color: #ffff;
}

table {
  width: fit-content;
  height: fit-content;
  margin: 60px auto 0;
  justify-self: center;
  align-self: center;
  border-spacing: 5px;
}

td {
  min-width: 60px;
  max-width: 60px;
  height: 60px;
  text-align: center;
  font-size: 30px;
  font-family: 'DOSIyagiMedium';
  line-height: 50px;
  background-color: #e2e2e2;
}

td.show {
  background-color: #ffff;
}

td.fill {
  background-color: #F9ECCC;
}

td.first {
  border: thick double #C44536;
}

td.title {
  border-radius: 10px;
}

td.correct {
  color: #ffff;
  background-color: #02C39A;
  border: thick double #101935;
}

.merge-bridge {
  position: absolute;
  width: 100px;
  justify-content: center;
  align-content: center;
  pointer-events: none;
  z-index: 20;
}

.merge-bridge.vertical img {
  transform: rotate(90deg);
}

.merge-bridge.reverse img {
  transform: rotate(180deg);
}

.merge-bridge.vertical.reverse img {
  transform: rotate(270deg);
}

.merge-button {
  position: absolute;
  top: 15px;
  left: 25px;
  font-family: "NeoDunggeunmo";
  font-size: 15px;
  text-decoration: #ffff underline;
  padding: 3px;
  color: #ffffff;
  background-color: #ff1e1eb7;
  border: none;
  justify-self: center;
  align-self: center;
  pointer-events: auto;
  cursor: pointer;
  z-index: 5;
}

.vertical .merge-button {
  top: 20px;
  left: 25px;
}

.reset {
  width: 50px;
  height: 50px;
  justify-self: center;
  align-self: center;
}
</style>