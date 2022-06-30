<template>
  <td @click="clickonLetter" ref="td"
  :class="{ target:isTarget, choice:isChoice, chosen:isChosen, answer:isAnswer, word:isWord }" :aria-rowindex="rowIndex" :aria-colindex="colIndex">
      {{ letter }}
  </td>
</template>

<script>
export default {
  name: 'Letter',
  props: ['rowIndex', 'colIndex', 'letter', 'isTarget', 'isChoice', 'isChosen', 'isAnswer', 'isWord'],
  methods: {
    clickonLetter(event) {
      if (this.isChoice||this.isChosen) {
        // update chosen
        if (this.isChoice) {
          this.$emit('toggleChoice', {'choice':{'row':parseInt(this.rowIndex), 'col':parseInt(this.colIndex), 'letter':this.letter}, 'action':'push'})
        } else {
          this.$emit('toggleChoice', {'choice':{'row':parseInt(this.rowIndex), 'col':parseInt(this.colIndex), 'letter':this.letter}, 'action':'pop'})
        }
      }
      else if (this.isWord) {
        // pass
      } else {
        // toggletarget() || forceword()
        this.$emit('clickOnLetter', {'row':parseInt(this.rowIndex), 'col':parseInt(this.colIndex), 'letter':this.letter, 'x':event.clientX, 'y':event.clientY})
      }
    }
  },
  watch: {
    isWord(val) {
      if (val) {
        console.log('word span')
        this.$refs.td.setAttribute('rowspan', 3)
        this.$refs.td.setAttribute('colspan', 2)
      } else {
        this.$refs.td.setAttribute('rowspan', 1)
        this.$refs.td.setAttribute('colspan', 1)
      }
    }
  },
  mounted() {
    if (this.isWord) {
      this.$refs.td.setAttribute('rowspan', 3)
      this.$refs.td.setAttribute('colspan', 2)
    } else {
      // pass
    }
  }
}
</script>

<style>
td {
  width: calc(885px / 15);
  height: calc(885px / 15);
  text-align: center;
  font-family: "Sam3KRFont";
  font-size: 30px;
  color: #1d1009;
  background-color: #ffe2b3;
}

td.target {
  background-color: #806233;
  color: white;
}

td.choice {
  background-color: #ccb58f;
}

td.chosen {
  background-color: #806233;
  color: white;
}

td.word {
  background-color: #275A68;
  color: white;
}

td.answer {
  background-color: #ffc466;
}
</style>