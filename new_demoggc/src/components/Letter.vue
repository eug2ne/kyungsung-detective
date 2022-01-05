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
        this.$emit('clickOnLetter', {'row':parseInt(this.rowIndex), 'col':parseInt(this.colIndex), 'letter':this.letter, 'target':this.isTarget, 'x':event.clientX, 'y':event.clientY})
      }
    }
  },
  watch: {
    isWord: function(val) {
      if (val) {
        this.$refs.td.setAttribute('rowspan', 3)
        this.$refs.td.setAttribute('colspan', 2)
      } else {
        // pass
      }
    }
  }
}
</script>

<style>
td {
  display: table-cell;
  height: 60px;
  width: 60px;
  margin: 2px;
  text-align: center;
  font-size: 25px;
  color: #1D1009;
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

td.word {
  width: 120px;
  height: 180px;
  background-color: #275A68;
}

td.answer {
  background-color: #FF7D6C;
}
</style>