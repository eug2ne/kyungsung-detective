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
    clickonLetter() {
      if (this.isChoice||this.isChosen) {
        // update chosen
        if (this.isChoice) {
          this.$emit('toggleChoice', {'choice':{'row':this.rowIndex, 'col':parseInt(this.colIndex)}, 'action':'push'})
        } else {
          this.$emit('toggleChoice', {'choice':{'row':this.rowIndex, 'col':parseInt(this.colIndex)}, 'action':'pop'})
        }
      } else {
        // toggletarget() || forceword()
        this.$emit('clickOnLetter', {'row':this.rowIndex, 'col':parseInt(this.colIndex), 'target':this.isTarget})
      }
    }
  },
  watch: {
    isWord: function(val) {
      if (val) {
        this.$refs.td.setAttribute('rowspan', 3)
        this.$refs.td.setAttribute('colspan', 2)
      }
    }
  }
}
</script>

<style>
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

td.word {
  background-color: #275A68;
}

td.answer {
  background-color: #FF7D6C;
}
</style>