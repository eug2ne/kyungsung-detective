<template>
  <td @click="clickonLetter"
  :class="{ target:isTarget, choice:isChoice, answer:isAnswer }" :aria-rowindex="rowIndex" :aria-colindex="colIndex">
      {{ letter }}
  </td>
</template>

<script>
export default {
  name: 'Letter',
  props: ['rowIndex', 'colIndex', 'letter', 'action'],
  data() {
    return {
      isTarget: false,
      isChoice: false,
      isChosen: false,
      isAnswer: false
    }
  },
  methods: {
    clickonLetter() {
      if (this.isChoice||this.isChosen) {
        // toggle isChoice/isChosen
        this.isChosen = !this.isChosen
        this.isChoice = !this.isChosen

        if (this.isChosen) {
          this.emitter.emit('ppChoices', {'row':this.rowIndex, 'col':parseInt(this.colIndex), 'letter':this.letter}, 'push')
        } else {
          this.emitter.emit('ppChoice', {'row':this.rowIndex, 'col':parseInt(this.colIndex), 'letter':this.letter}, 'pop')
        }
      } else if (this.isTarget&&this.action == 'word') {
        this.emitter.emit('forceWord')
      } else {
        // toggle isTarget
        this.isTarget = !this.isTarget
        this.emitter.emit('toggleShow', this.isTarget)

        if (this.isTarget) {
          this.emitter.emit('targetUpdate', {'row':this.rowIndex, 'col':parseInt(this.colIndex), 'letter':this.letter})
        }
      }
    }
  },
  mounted() {
    this.emitter.on('targetUpdate', (data) => {
      if (this.rowIndex == data.row && this.colIndex == data.col) {
        this.isTarget = true
      } else {
          this.isTarget = false
          this.isChoice = false
          this.isChosen = false
        }
    }),
    this.emitter.on('showChoices', (data) => {
      console.log(data.target)
      if (data.type === 'merge') {
        if ((this.rowIndex == data.target.row&&this.colIndex == data.target.col-1)||(this.rowIndex == data.target.row&&this.colIndex == data.target.col+1)) {
          this.isChoice = true
        }
      } else if (data.type === 'word') {
        if ((this.rowIndex == data.taret.row&&this.colIndex == data.target.col+1)||((data.target.row < this.rowIndex&&this.rowIndex < data.target.row+3)&&(data.target.col-1 < this.colIndex&&this.colIndex < data.target.col+2))) {
          this.isChoice = true
        }
      } else {
        this.emitter.emit('space')
      }
    })
  }
}
</script>

<style scoped>
td {
  height: 90px;
  width: 90px;
  margin: 10px;
  background-color: #E4B7AF;
}

td.target {
  background-color: #B0EEFF;
}

td.choice {
  background-color: #FFDFD9;
}

td.chosen {
  background-color: #84C0D5;
}

td.answer {
  background-color: #FF7D6C;
}
</style>