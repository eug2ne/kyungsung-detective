<template>
<div class="contents">
  <!-- answer-area -->
  <AnswerArea :answerData="this.answerConfig" :cwAccs="this.cwInstance.config ? this.cwInstance.config.accomplish : false" />

  <div class="contents">
    <div v-if="this.showDefault" id="default_page">
      <h2>아직 추리 중인 단서가 없습니다!</h2>
      <h3>맵을 돌아다니며 단서를 얻거나,<br>단서 노트에서 추리하고 싶은 단서를 선택해주세요!</h3>
    </div>
    <CrosswordArea v-else :cwData="this.cwInstance"/>
  </div>
</div>
</template>

<script>
import { ref } from 'vue'
import _ from 'lodash'
import { useGameStore } from '../game/game'
import { importSet, exportSet } from '../composables/puzzleStore'
import AnswerArea from '@/components/Crossword/AnswerArea.vue'
import CrosswordArea from '@/components/Crossword/CrosswordArea.vue'
import AccsModal from '../components/AccsModal.vue'

export default {
  name: 'Quiz',
  components: { AnswerArea, CrosswordArea, AccsModal },
  setup() {
    const cwInstance = ref({})
    const answerConfig = ref({
      answer: '????? ????? ?',
      a_underbar: '?? ???',
      a_abbr: '?? ???',
      a_def: '????? ????? ????? ????? ?? ???'
    })
    const showDefault = ref(true)

    // import set from db
      
    // create async load func.
    const load = async () => {
      const { id, path } = useGameStore().puzzle

      if (!id) return

      try {
        const { cw_instance, answer_config } = await importSet(id, path)

        cwInstance.value = cw_instance
        answerConfig.value = answer_config
        showDefault.value = false
      } catch (err) {
        console.log(err)
      }
    }
    
    // load data from db
    load()

    return { cwInstance, answerConfig, showDefault }
  },
  unmounted() {
    // update db when page destroyed
    exportSet(this.cw_instance)
  }
}
</script>

<style>
.contents {
  position: relative;
  width: 1210px;
  margin: 0 auto;
}

.help-icon, .help-icon:focus {
  display: block;
  position: static;
  top: 0%;
  float: right;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: slategrey;
  margin: 5px;
  font-size: 25px;
  color: #fff700;
}

.controls {
  width: 995px;
  height: 70px;
  padding: 15px;
  text-align: center;
  justify-content: space-between;
  background-color: #b3fffe;
}

#default_page {
  display: block;
  width: 1160px;
  height: 400px;
  text-align: center;
  font-size: 25px;
  background-color: #ffefd5;
  border-spacing: 2px;
  box-shadow: 0 0 0 4px #ffefd5, 0 0 0 calc(4px + 6px) #101935,
    0 0 0 calc(4px + 6px + 15px) #ffefd5;
  margin: 35px auto 15px;
  padding: 50px;
}
</style>