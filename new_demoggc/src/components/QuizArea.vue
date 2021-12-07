<template>
  <div id="quiz-wrapper">
    <table ref="table" id="Quiz-area">
      <tr v-for="(item, index) in quizletterset" :key="item.id" :aria-rowindex="index">
        <Letter :action="action" :rowIndex="index" v-for="(value, name) in item" :key="name.id" :colIndex="name" :letter="value"/>
      </tr>
    </table>
    <OptionsMenu/>
  </div>
</template>

<script>
import Letter from './Letter.vue'
import OptionsMenu from './OptionsMenu.vue'
import quizletterset from '../assets/quizletterset.json'

export default {
    name: 'QuizArea',
    components: { Letter, OptionsMenu },
    data() {
      return {
        quizletterset,
        target: null,
        chosen: [],
        action: null,
        pastSet: []
      }
    },
    methods: {
    },
    mounted() {
      this.emitter.on('showChoices', (data, type) => {
        this.target = data
        this.action = type
      }),
      this.emitter.on('ppChoices', (data, type) => {
        if (type === 'push') {
          this.chosen.push(data)
        } else {
          this.chosen.pop(data)
        }

        console.log(this.chosen)
      })
    }
}
</script>