<template>
  <td @click="clickonLetter"
  :class="{ target:isTarget, choice:isChoice, chosen:isChosen, answer:isAnswer }" :aria-rowindex="rowIndex" :aria-colindex="colIndex">
      {{ letter }}
  </td>
</template>

<script>
export default {
  name: 'Letter',
  props: ['rowIndex', 'colIndex', 'letter', 'isTarget', 'isChoice', 'isChosen', 'isAnswer'],
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
  mounted() {
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