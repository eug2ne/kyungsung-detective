<template>
    <td ref="td" @click="clickOn" @clickOnTarget="console.log(this.isTarget)" :class="{ target:isTarget, choice:isChoice, answer:isAnswer }" :aria-rowindex="rowIndex" :aria-colindex="colIndex">
        {{ letter }}
    </td>
</template>

<script>
export default {
  name: 'Letter',
  props: ['rowIndex', 'colIndex', 'letter'],
  data() {
    return {
      isTarget: false,
      isChoice: false,
      isAnswer: false
    }
  },
  methods: {
    clickOn() {
      this.isTarget = true
      this.$emit('clickOnTarget')
    }
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
  background-color: #E4B7AF;
}

td.answer {
  background-color: #FF7D6C;
}
</style>
